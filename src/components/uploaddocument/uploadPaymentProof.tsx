import { Box, Grid, Theme, Typography } from '@mui/material'
import { CloseCircleOutline, FileUpload } from 'mdi-material-ui'
import { calculateFileSize } from 'src/utils'
import Styles from './uploadPaymentProof.module.css'
import { useDropzone } from 'react-dropzone'
import { FileSize } from 'src/context/common'
import { UploadPaymentProofTypes } from './uploadPaymentProofTypes'

const UploadPaymentProof = ({ setValue, clearErrors, watch, unregister, name }: UploadPaymentProofTypes) => {
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.pdf', '.jpeg', '.png']
    },
    multiple: false,
    maxSize: FileSize.maxSize,
    onDrop: acceptedFiles => (setValue(name, acceptedFiles[0]), clearErrors(name))
  })
  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <>
        <Typography key={file?.name} color='error'>
          {Math.round(file.size / 100) / 10 > 1000
            ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
            : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
        </Typography>

        {errors.map(e => (
          <Typography color='error' key={e.code}>
            {e.message}
          </Typography>
        ))}
      </>
    )
  })

  return (
    <Grid container {...getRootProps()}>
      <Box width='100%' className={Styles.UploadDocsContainer}>
        <Box width='100%' className='text-center'>
          <FileUpload fontSize='large' color='primary' />
          <input {...getInputProps()} />

          <Box className={Styles.GreenFormHeading}>
            Drag and drop, or <span className={Styles.Text}>browse</span> your file
          </Box>
          <Typography variant='body2' gutterBottom sx={{ color: (theme: Theme) => theme.palette.grey[600] }}>
            Only PNG, JPEG and PDF files with max size of 2MB
          </Typography>
          <Box width='100%' onClick={e => e.stopPropagation()}>
            {!!watch(name) && (
              <Box className={Styles.Document}>
                <Box display='flex'>
                  <Box textAlign='start' sx={{ pl: 2 }}>
                    <Typography variant='body1' color='primary'>
                      {watch(name)?.name}
                    </Typography>
                    <Typography variant='body2'>{calculateFileSize(watch(name)?.size)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CloseCircleOutline color='error' onClick={() => unregister(name)} />
                </Box>
              </Box>
            )}
          </Box>
          {fileRejectionItems ? (
            <Typography className='file-size' variant='body2'>
              {fileRejectionItems}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Grid>
  )
}

export default UploadPaymentProof
