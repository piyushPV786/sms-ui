import { customStatus, disableStatus, docRejectStatus, docType, status, statusColor } from '../common/Constants'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { FileUploadContainer, InnerContainer, ShortTypography, StyleLabel } from '../common/style'
import { fileValidation } from 'src/utils'
import { LinearProgressWithLabel } from '../common'
import { UseDownloadDeclarationLatter, UsePreviewFile } from './customHook/UseDocumentHook'
import { Close, EyeOutline } from 'mdi-material-ui'
import { documentCriteria } from 'src/context/common'
import { useBackdrop } from './context/BackdropContext'

export const StyledMessage = () => {
  return (
    <label className='form-label'>
      All the documents with
      <span className='text-danger'> * </span>
      are Required.
    </label>
  )
}

export const StyledLabel = (props: any) => {
  const { required = false, style = { marginTop: props?.hideLabel ? '18px' : 'auto', display: 'inline' } } = {
    ...props
  }

  return (
    <Typography style={style} variant='body1'>
      {props?.children} {required && !props?.forceHide && <span className='text-danger'>*</span>}
    </Typography>
  ) as any
}

export const getStatus = (value: any) => {
  if (value) {
    if (value?.length > 0) {
      return customStatus.UPLOADED
    } else {
      return customStatus.UPLOADPENDING
    }
  } else {
    return customStatus.UPLOADPENDING
  }
}

export const BursaryFeilds = ({ element }: any) => {
  const [countryCodeRef, setCountryCode] = useState<any>('ZA')
  const { register } = useFormContext()

  const onCountryChange = (value: string | any) => {
    if (value) {
      setCountryCode(value)
    }
  }
  if (element?.code !== docType.BURSARYLETTER) {
    return <></>
  }

  return (
    <Grid container sm={12} md={12} mb={2} columnSpacing={2} rowSpacing={2} mt={1}>
      <Grid sm={4} md={4} item>
        <StyledLabel required={element?.required}>Bursary Name</StyledLabel>
        <TextField
          size='small'
          {...register(`${element.code}Name`, {
            required: element?.required
          })}
          className='form-control'
          type={'text'}
          placeholder={'e.g 10 church street'}
        />
      </Grid>
      <Grid sm={4} md={4} item>
        <StyledLabel required={element?.required}>Bursary Email Address</StyledLabel>
        <TextField
          size='small'
          {...register(`${element.code}Email`, {
            required: element?.required
          })}
          className='form-control'
          type={'text'}
          placeholder={'e.g 10 church street'}
        />
      </Grid>
      <Grid sm={4} md={4} item>
        <StyledLabel required={element?.required}>Bursary Phone Number</StyledLabel>
        <PhoneInput
          {...register(`${element.code}Phone`, {
            required: element?.required
          })}
          fullWidth
          id='2'
          international
          countryCallingCodeEditable={false}
          defaultCountry={countryCodeRef}
          placeholder='Select Country Code*'
          onCountryChange={(value: any) => {
            onCountryChange(value)
          }}
          onChange={e => {
            console.log(e)
          }}
        />
      </Grid>
    </Grid>
  )
}

export const DeclarationComponent = ({ element, masterData }: any) => {
  const { downloadDeclarationLatter } = UseDownloadDeclarationLatter()
  const { watch } = useFormContext()
  const fileWatch = watch(element?.code)?.file ? watch(element?.code)?.file : watch(element?.code)
  if (element?.code !== docType.DECLARATIONFORM) {
    return <></>
  }

  return (
    <Grid sm={12} xs={12} item>
      <InnerContainer className='mobile-block'>
        <Box>
          <Typography textAlign='left' marginRight={2} variant='caption'>
            Please download the declaration form, print, fill it out and upload it here
          </Typography>
        </Box>
        <Button
          size='small'
          disabled={!fileWatch?.length}
          variant='contained'
          onClick={() => {
            downloadDeclarationLatter(masterData)
          }}
          style={{ padding: '6px 18px' }}
        >
          Download Declaration form
        </Button>
      </InnerContainer>
    </Grid>
  )
}

export const Reject = ({ element }: any) => {
  const { watch } = useFormContext()

  return (
    docRejectStatus?.includes(watch(element?.code)?.status) &&
    watch(element?.code)?.comment && (
      <Grid item sm={12} xs={12}>
        <Alert severity='error' variant='standard' className='errorColor'>
          <AlertTitle>Reason for Rejection </AlertTitle>
          <Typography className='mr-2'>{watch(element?.code)?.comment}</Typography>
        </Alert>
      </Grid>
    )
  )
}

export const Info = () => {
  return (
    <Grid item sm={12} xs={12}>
      <Alert severity='warning' variant='standard' className='infoColor'>
        <AlertTitle>Certified document required </AlertTitle>
        <Typography className='mr-2'></Typography>
      </Alert>
    </Grid>
  )
}

export const FileRegister = ({ element, uploadDocument,uploadProgress}: any) => {
  const { register } = useFormContext()
  const { open, toggleBackdrop } = useBackdrop()
  useEffect(() => {
    if (uploadProgress === 100) {
      toggleBackdrop(false)
    } 
  }, [uploadProgress])
  const productImageField = register(`${element.code}`, {
    validate: value => {
      return fileValidation(value, element)
    }
  })
  const fileOnChange = (event: any) => {
    toggleBackdrop(true)
    if (fileValidation(event?.target?.files, element) !== true) {
      return
    }
    uploadDocument(event?.target?.files, element)

    return event
  }

  return (
    <Grid item sm={12} xs={12}>
      <FileUploadContainer className='upload-box'>
      <Backdrop sx={{  backgroundColor: 'transparent', color: '#fff', }} open={open}>
        <CircularProgress color='primary' />
      </Backdrop>
        <Box display={'flex'} alignItems={'center'}>
          <StyleLabel htmlFor={`${element?.code}`}>
            {/* <span className='labelTitle'>Browse</span> */}
            <input
              multiple={false}
              {...productImageField}
              onChange={e => {
                productImageField?.onChange(e)
                fileOnChange(e)
              }}
              id={`${element?.code}`}
              className='d-none'
              accept='image/jpeg, application/pdf'
              type='file'
              style={{ display: 'none' }}
            />
            <Button
              variant='contained'
              color='primary'
              component='label'
              htmlFor={`${element?.code}`}
              disableRipple
              sx={{
                ':hover': {
                  bgcolor: 'primary.main',
                  boxShadow: 'none'
                }
              }}
              size='small'
            >
              Browse
            </Button>
          </StyleLabel>
          <Typography variant='body2'>Click on browse and Select all files to be uploaded from your machine</Typography>
        </Box>
      </FileUploadContainer>
    </Grid>
  )
}

export const HandleAction = ({ element, masterData, onRemoveFile }: any) => {
  const { watch, setValue } = useFormContext()
  const fileWatch = watch(element?.code)?.file ? watch(element?.code)?.file : watch(element?.code)
  const { getFileUrl } = UsePreviewFile()
  const handleRemoveFiles = () => {
    setValue(element?.code, undefined)
    onRemoveFile()
  }

  if (!fileWatch || fileWatch?.length === 0 || !fileWatch[0]?.name) {
    return <></>
  }

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#f5f5f5',
        borderLeft: `5px solid ${'green'}`
      }}
      className='p-3  mt-3  '
      sm={12}
      xs={12}
      md={12}
      lg={12}
    >
      <Grid sm={10} xs={6} item display={'flex'} alignItems={'center'}>
        <Typography variant='h6' marginLeft={2}>
          {fileWatch && fileWatch[0]?.name}
        </Typography>
      </Grid>
      <Grid sm={2} xs={6} item className='d-flex flex-row  '>
        <IconButton
          onClick={() => {
            getFileUrl(fileWatch[0], masterData)
          }}
        >
          <Typography color={'green'}>
            <EyeOutline />
          </Typography>
        </IconButton>
        {!disableStatus.includes(watch(element?.code)?.status) && (
          <IconButton
            onClick={() => {
              handleRemoveFiles()
            }}
          >
            <Typography color={'error'}>
              <Close />
            </Typography>
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

export const ErrorHandling = ({ element, masterData, uploadProgress, onRemoveFile }: any) => {
  const {
    formState: { errors }
  } = useFormContext()

  return (
    <Grid item sm={12} xs={12}>
      {!!uploadProgress && <LinearProgressWithLabel value={uploadProgress} />}
      {errors[element.code] && <Typography color={'error'}>{errors[element.code]?.message as any}</Typography>}
      <HandleAction element={element} masterData={masterData} onRemoveFile={onRemoveFile} />
    </Grid>
  )
}

export const DeclarationListitems = (props: any) => {
  const { text, code, isShow } = props

  const { watch } = useFormContext()

  if (isShow) {
    return (
      <ListItem
        key={text}
        dense
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          marginRight: '5px',
          padding: '0px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ListItemText
          id={text}
          primary={
            code ? (
              <ShortTypography className='h6'>{text}</ShortTypography>
            ) : (
              <Typography className='h6'>{text}</Typography>
            )
          }
        />
        {code && (
          <ShortTypography
            sx={{
              color: `${
                watch(code)?.status ? statusColor[watch(code).status]?.text : statusColor[getStatus(watch(code))]?.text
              }`,
              textAlign: 'end'
            }}
          >
            {watch(code)?.status ? status[watch(code)?.status] : status[getStatus(watch(code))]}
          </ShortTypography>
        )}
      </ListItem>
    )
  } else {
    return null
  }
}

export const DocumentStatus = ({ masterData }: any) => {
  return (
    <>
      <Card sx={{ marginTop: '12px' }}>
        <Box padding={3}>
          <Typography textAlign='left' component='header' fontWeight='bold' className='m-2'>
            Document Status
          </Typography>
          <List>
            {masterData?.documentFormData?.map((item: any) => (
              <DeclarationListitems key={item?.code} text={item?.name} code={item?.code} isShow={item?.show} />
            ))}
          </List>
        </Box>
      </Card>
      <Card sx={{ marginTop: '12px' }}>
        <Box padding={3}>
          <Typography component='header' fontWeight='bold'>
            Document Acceptance Criteria
          </Typography>
          <List>
            {documentCriteria?.map(({ text }: any) => (
              <DeclarationListitems key={text} text={text} isShow={true} />
            ))}
          </List>
        </Box>
      </Card>
    </>
  )
}
