// ** Next Import
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, Box, FormHelperText, Theme } from '@mui/material'
import { CloseCircleOutline, FileUpload } from 'mdi-material-ui'

import Styles from './Fileupload.module.css'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { calculateFileSize } from 'src/utils'
import { FileSize, projectStudentDocumentMessage } from 'src/context/common'

const schema = yup.object().shape({
  file: yup.mixed().required('Please upload any File')
})

const FileUploadCard = () => {
  const onSubmit = (param: any) => {
    console.log('fileData', param) //when api call remove console
  }

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    unregister,
    clearErrors,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const { getRootProps, getInputProps, fileRejections, open } = useDropzone({
    accept: {
      'image/*': ['.pdf']
    },
    multiple: false,
    maxSize: FileSize.maxSize,
    onDrop: acceptedFiles => (setValue('file', acceptedFiles[0]), clearErrors('file'))
  })

  return (
    <>
      <Card>
        <CardContent sx={{ backgroundColor: '#4f958e' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
              <Typography variant='h6' sx={{ color: theme => theme.palette.common.white, mb: '15px' }}>
                FILE UPLOAD
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg, padding: 0 }}>
                <CardContent sx={{ p: 0 }}>
                  <Grid item xs={12}>
                    <Grid container {...getRootProps()}>
                      <Box width='100%' className={Styles.UploadDocsContainer}>
                        <Box width='100%' className='text-center' marginTop={2}>
                          <FileUpload fontSize='large' color='primary' />
                          <input {...register('file')} {...getInputProps()} />

                          <Box className={Styles.GreenFormHeading}>
                            Drag and drop, or <span className={Styles.Text}>browse</span> your files
                          </Box>
                          <Typography
                            variant='body2'
                            gutterBottom
                            sx={{ color: (theme: Theme) => theme.palette.grey[600] }}
                          >
                            Only PNG, JPEG and PDF files with max size of 2MB
                          </Typography>
                          <Box width='100%' onClick={e => e.stopPropagation()}>
                            {!!watch('file') && (
                              <Box className={Styles.Document}>
                                <Box>
                                  <Box textAlign='start'>
                                    <Typography variant='body1'>{watch('file')?.name}</Typography>
                                    <Typography variant='body2'>{calculateFileSize(watch('file')?.size)}</Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <CloseCircleOutline color='error' onClick={() => unregister('file')} />
                                </Box>
                              </Box>
                            )}
                          </Box>
                          {!!errors?.file && <FormHelperText error>{errors?.file?.message}</FormHelperText>}

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
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid sx={{ pt: 4 }}>
                <Box>
                  {watch('file') ? (
                    <Button variant='contained' color='inherit' type='submit'>
                      UPLOAD
                    </Button>
                  ) : (
                    <Button variant='contained' color='inherit' type='button' onClick={open}>
                      BROWSE
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default FileUploadCard
