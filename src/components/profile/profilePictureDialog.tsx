import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  styled
} from '@mui/material'
import { Close, FileUploadOutline } from 'mdi-material-ui'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const AcceptanceLatterContainer = styled(Box)(() => ({
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '100%',
  minHeight: '100%',
  padding: ' 1rem',
  width: '100%',
  overflow: 'hidden',
  border: '2px dashed #757575',
  cursor: 'pointer'
}))

interface IProps {
  handleImageChange: (arg0: any) => void
  selectedImage: any
  setProfileModal: any
  openProfileModal: boolean
  updateProfilePhoto: any
}

const ProfilePictureDialog = ({
  handleImageChange,
  selectedImage,
  setProfileModal,
  openProfileModal,
  updateProfilePhoto
}: IProps) => {
  const [profileImage, setProfileImage] = useState<any>(null)
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize: 1024 * 1024,
    onDrop: file => onFileChange(file)
  })

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <>
        <Typography key={profileImage?.name} color='error'>
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

  const onFileChange = (file: any) => {
    handleImageChange(file)
    setProfileImage(file)
  }
  const remove = (file: any) => {
    acceptedFiles.splice(file, 1) // remove the file from the array
    setProfileImage(null)
  }

  return (
    <Dialog
      open={openProfileModal}
      PaperProps={{ style: { minWidth: '500px' } }}
      onClose={(event, reason) => {
        reason !== 'backdropClick' && setProfileModal(!openProfileModal)
      }}
    >
      <DialogTitle align='center' color='primary' style={{ background: '#dbe7e3', maxHeight: '70px' }}>
        CHANGE PHOTO
      </DialogTitle>
      <DialogContent>
        <Box mt={10}>
          <AcceptanceLatterContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <Box textAlign={'center'}>
              <FileUploadOutline fontSize='large' color='primary' />
              <Box mb={4} mt={4} fontWeight={'bold'}>
                Drag and drop, or browse your files
              </Box>
              <Typography variant='body2' fontSize={12}>
                Only PNG, JPEG file with max size of 200kb
              </Typography>
            </Box>
          </AcceptanceLatterContainer>
          {profileImage?.length > 0 && (
            <Box
              mt={5}
              style={{
                background: '#dbe7e3',
                maxHeight: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                color: 'white',
                borderRadius: '4px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt='Cindy Baker' src={selectedImage} />
                <Box ml={3}>
                  <Typography>{profileImage[0]?.name}</Typography>
                  <Typography variant='body2'>
                    {Math.round(acceptedFiles[0]?.size / 100) / 10 > 1000
                      ? `${(Math.round(acceptedFiles[0]?.size / 100) / 10000).toFixed(1)} mb`
                      : `${(Math.round(acceptedFiles[0]?.size / 100) / 10).toFixed(1)} kb`}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  remove(acceptedFiles[0])
                }}
              >
                <Close color='error' />
              </Box>
            </Box>
          )}
          {fileRejectionItems && (
            <Typography className='file-size' variant='body2'>
              {fileRejectionItems}
            </Typography>
          )}
        </Box>
        <DialogActions>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Button
              variant='contained'
              style={{ background: 'white', color: 'grey', borderColor: 'grey', marginRight: '10px' }}
              onClick={() => {
                setProfileModal(!openProfileModal)
                setProfileImage(null)
              }}
            >
              Cancel
            </Button>
            <Button
              style={{ background: '#4f958d', color: 'white' }}
              variant='contained'
              type='submit'
              onClick={() => {
                updateProfilePhoto()
                setProfileImage(null)
                setProfileModal(false)
              }}
            >
              Save
            </Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default ProfilePictureDialog