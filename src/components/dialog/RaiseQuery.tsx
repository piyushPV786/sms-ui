import { yupResolver } from '@hookform/resolvers/yup'

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import {
  Box,
  Grid,
  Dialog,
  Button,
  DialogActions,
  Typography,
  DialogTitle,
  DialogContent,
  TextField,
  Theme,
  FormControl,
  Autocomplete,
  FormHelperText
} from '@mui/material'
import Styles from './RaiseQuery.module.css'
import Card from '@mui/material/Card'

// ** Third Party Library
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'

// ** Icons Imports
import { CloseCircleOutline } from 'mdi-material-ui'
import {
  downloadSuccess,
  ErrorMessage,
  FileError,
  FileType,
  QueryDocumentCode,
  QueryFileSize,
  QueryLimit,
  raiseQueryMessage,
  status
} from 'src/context/common'
import { calculateFileSize } from 'src/utils'
import { CommonService, StudentService } from 'src/service'
import { errorToast } from 'src/@core/components/common/Toast'
import { IQueryDefaultValues, IQueryType } from 'src/types/common'
import { successToastBottomRight } from '../common'

const schema = yup.object().shape({
  subject: yup.string().required(raiseQueryMessage.subject),
  category: yup.string().required(raiseQueryMessage.category),
  description: yup.string().required(raiseQueryMessage.description),
  file: yup.mixed()
})

interface IRaiseQuery {
  studentCode: string | undefined
  getQueriesList: () => void
  category: IQueryType[]
}

const RaiseQuery = ({ category, studentCode, getQueriesList }: IRaiseQuery) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    unregister,
    watch,
    reset,
    control,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<IQueryDefaultValues>({
    mode: 'onChange',
    defaultValues: {
      subject: '',
      category: '',
      description: '',
      file: null
    },
    resolver: yupResolver(schema)
  })

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.pdf']
    },
    multiple: false,
    maxSize: QueryFileSize.maxSize,
    onDrop: acceptedFiles => (setValue('file', acceptedFiles[0]), clearErrors('file'))
  })

  const submitRaiseQuery = async (data: IQueryDefaultValues) => {
    setDisable(true)
    const API_Payload = {
      studentCode,
      subject: data.subject,
      category: data.category,
      description: data.description,
      fileName: data.file && data.file.name,
      fileType: data.file && data.file.type,
      documentTypeCode: QueryDocumentCode.code
    }
    const response = await StudentService?.createQuery(API_Payload)

    if (response?.data?.statusCode === status.successCodeOne && response) {
      if (data.file !== null) {
        const files = {
          filename: `${response?.data?.data?.documentName}`,
          filetype: data.file && data.file.type,
          file: data.file,
          studentCode: studentCode
        }

        const documentUploadResponse = await CommonService?.documentUpload(files)
        if (documentUploadResponse) {
          successToastBottomRight(downloadSuccess.queryCreated)
          getQueriesList()
        } else {
          errorToast(ErrorMessage.Error)
        }
      } else {
        successToastBottomRight(downloadSuccess.queryCreated)
        getQueriesList()
      }
    } else {
      errorToast(ErrorMessage.Error)
    }
    setDisable(false)
    handleDiscard()
  }

  const handleDiscard = () => {
    setValue('subject', '')
    setValue('category', '')
    setValue('description', '')
    setValue('file', null)
    setShow(false)
    reset()
  }

  const fileRejectionItems = fileRejections.map(({ file }) => {
    const customErrors = []
    if (file.size > QueryFileSize.maxSize) {
      customErrors.push(FileError.fileSizeError)
    }
    if (!FileType.includes(file.type)) {
      customErrors.push(FileError.fileTypeError)
    }

    return (
      <>
        <Typography fontSize='small' key={file?.name} color='error'>
          {calculateFileSize(file?.size)}
        </Typography>
        {customErrors.map((e, i) => (
          <Typography fontSize='small' color='error' key={i}>
            {e}
          </Typography>
        ))}
      </>
    )
  })

  return (
    <Grid>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          size='small'
          variant='outlined'
          onClick={() => setShow(true)}
          sx={{
            position: 'absolute',
            backgroundColor: theme => theme.palette.common.white,
            color: theme => theme.palette.primary.light,
            borderColor: theme => theme.palette.primary.light
          }}
        >
          RAISE QUERY
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' open={show} onClose={handleDiscard} onBackdropClick={handleDiscard}>
        <DialogTitle>
          <Box className={Styles.Title}>Raise Query</Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(submitRaiseQuery)}>
          <DialogContent>
            <Grid item xs={12} mb={3} mt={2}>
              <Controller
                name='subject'
                control={control}
                defaultValue={watch('subject')}
                render={({ field: { value, onChange, ...register } }) => (
                  <TextField
                    {...register}
                    label={
                      <span>
                        Subject<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    inputProps={{
                      maxlength: QueryLimit.Subject
                    }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <FormControl fullWidth>
                {category && (
                  <Autocomplete
                    fullWidth
                    id='category'
                    {...register('category')}
                    style={{ width: '100%' }}
                    options={category}
                    value={category?.find(i => i.code.toString() == watch('category').toString()) ?? null}
                    onChange={(_, value) => {
                      value && setValue('category', value.code.toString())
                      clearErrors('category')
                    }}
                    getOptionLabel={option => option.name.toString()}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={
                          <span>
                            Category<span style={{ color: 'red' }}> *</span>
                          </span>
                        }
                        variant='outlined'
                        fullWidth
                      />
                    )}
                  />
                )}
                <FormHelperText sx={{ color: 'red' }}>{errors.category && errors.category?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} mb={3}>
              <Controller
                name='description'
                control={control}
                defaultValue={watch('description')}
                render={({ field: { value, onChange, ...register } }) => (
                  <TextField
                    {...register}
                    label={
                      <span>
                        Description<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    inputProps={{
                      maxlength: QueryLimit.Description
                    }}
                    multiline
                    rows={3}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <Box width='100%'>
                <Typography
                  variant='body2'
                  fontWeight='bold'
                  gutterBottom
                  sx={{ color: (theme: Theme) => theme.palette.grey[600] }}
                >
                  Supporting Document, If any
                  <Typography
                    variant='body2'
                    fontStyle='italic'
                    fontSize='small'
                    gutterBottom
                    sx={{ color: (theme: Theme) => theme.palette.grey[600] }}
                  >
                    Only PNG, JPEG and PDF files with max size of 500kb
                  </Typography>
                </Typography>
                <Grid container xs={8} alignItems='center' spacing={2} sx={{ pt: 2, pb: 2 }}>
                  <Grid item xs={3}>
                    <Button variant='contained' size='small' {...getRootProps()}>
                      <input {...getInputProps()} />
                      Browse
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
                    <Card onClick={e => e.stopPropagation()}>
                      {!!watch('file') && (
                        <Box className={Styles.Document}>
                          <Box display='flex'>
                            <Box textAlign='start' sx={{ pl: 2 }}>
                              <Typography variant='body1' color='primary' fontSize='small'>
                                {watch('file')?.name}
                              </Typography>
                              <Typography variant='body2' fontSize='small'>
                                {calculateFileSize(Number(watch('file')?.size))}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CloseCircleOutline color='error' onClick={() => unregister('file')} />
                          </Box>
                        </Box>
                      )}
                    </Card>

                    {fileRejectionItems ? (
                      <Typography className='file-size' variant='body2'>
                        {fileRejectionItems}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={handleDiscard}>
              Discard
            </Button>
            <Button variant='contained' color='primary' type='submit' disabled={disable}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RaiseQuery
