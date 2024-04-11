// ** Next Import
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, Box, FormHelperText, Theme, FormControl, Autocomplete, TextField } from '@mui/material'
import { FileUpload, TrashCanOutline } from 'mdi-material-ui'

import Styles from './Fileupload.module.css'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FileSize, ICommonData, projectStudentDocumentMessage } from 'src/context/common'
import { IUploadDocumentParam } from 'src/context/types'
import { StyledLink } from 'src/styles/styled'

const schema = yup.object().shape({
  file: yup.mixed().required('Please upload any File'),
  fileType: yup.string().required('File Type required')
})

interface IFileUploadProps {
  uploadFile: (param: IUploadDocumentParam) => void
  documentType: ICommonData[]
}

const FileUploadCard = ({ uploadFile, documentType }: IFileUploadProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    unregister,
    clearErrors,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (param: any) => {
    reset()
    setValue('fileType', '')

    uploadFile(param)
  }
  const { getRootProps, getInputProps, fileRejections, open } = useDropzone({
    accept: {
      'image/*': ['.pdf']
    },
    maxFiles: 1,
    maxSize: FileSize.maxSize,
    noClick: true,
    onDrop: acceptedFiles => (setValue('file', acceptedFiles[0]), clearErrors('file'))
  })

  return (
    <>
      <Card>
        <CardContent sx={{ backgroundColor: '#4f958e' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant='h6' sx={{ color: theme => theme.palette.common.white }}>
                  FILE UPLOAD
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid xs={12}>
                  <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg, padding: 0 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Grid container {...getRootProps()}>
                        <Box width='100%' className={Styles.UploadDocsContainer}>
                          <Box width='100%' className='text-center' marginTop={2}>
                            <FileUpload fontSize='large' color='primary' />
                            <input {...register('file')} {...getInputProps()} />

                            <Box className={Styles.GreenFormHeading}>
                              Drag and drop, or <span className={Styles.Text}>browse</span> your files
                            </Box>
                            <Typography variant='caption' sx={{ color: (theme: Theme) => theme.palette.grey[600] }}>
                              Only PNG, JPEG and PDF files with max size of 2MB
                            </Typography>
                            <Box width='100%' onClick={e => e.stopPropagation()}>
                              {!!watch('file') && (
                                <Box className={Styles.Document}>
                                  <Box>
                                    <Box textAlign='start'>
                                      <StyledLink>{watch('file')?.name}</StyledLink>
                                    </Box>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <TrashCanOutline color='error' onClick={() => unregister('file')} />
                                  </Box>
                                </Box>
                              )}
                            </Box>
                            {!!errors?.file && <FormHelperText error>{`${errors?.file?.message}`}</FormHelperText>}

                            {fileRejections.length > 0
                              ? fileRejections.map(({ errors }) =>
                                  errors.map(({ code }) => (
                                    <FormHelperText key={code} sx={{ textAlign: 'center' }} error>
                                      {projectStudentDocumentMessage[code]}
                                    </FormHelperText>
                                  ))
                                )
                              : null}
                          </Box>
                        </Box>
                        {watch('file') === undefined && (
                          <Grid xs={12} display='flex' justifyContent='center'>
                            <Button
                              variant='contained'
                              sx={{ backgroundColor: '#4f958e' }}
                              type='button'
                              onClick={open}
                            >
                              BROWSE
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} sx={{ pt: 4 }}>
                  <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg, padding: 0 }}>
                    <CardContent sx={{ p: 5 }}>
                      <FormControl fullWidth>
                        <Autocomplete
                          fullWidth
                          {...register('fileType')}
                          style={{ width: '100%' }}
                          options={documentType}
                          onChange={(_, value) => {
                            value && setValue('fileType', value.name)

                            clearErrors('fileType')
                          }}
                          value={documentType?.find((i: ICommonData) => i.name == watch('fileTypes')?.toString())}
                          getOptionLabel={option => option.name}
                          renderInput={params => (
                            <TextField {...params} label='Select File Type' variant='outlined' fullWidth />
                          )}
                        />
                        <FormHelperText sx={{ color: 'red' }}>
                          {errors?.fileType && `${errors.fileType?.message}`}
                        </FormHelperText>
                      </FormControl>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sx={{ pt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Button variant='contained' color='inherit' type='submit'>
                      UPLOAD
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default FileUploadCard
