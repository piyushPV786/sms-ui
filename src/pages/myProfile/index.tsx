// ** Next Import

// ** MUI Imports
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import DyncamicBreadcrumb from 'src/components/Dynamicbreadcrumb'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { AvatarProps } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useState } from 'react'
import EditPostalAddressDialog from './editPostalddressDialog'
import { FormProvider, useForm } from 'react-hook-form'
import { Pencil } from 'mdi-material-ui'
import { ProfileInfo } from 'src/components/profile'
import { personalInformationData } from 'src/components/profile/data'

const editIconStyle = {
  position: 'absolute',
  left: '90%',
  top: 10,
  background: '#4f958d',
  width: '30px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  padding: '1rem'
}

const defaultValues = {
  address: '110 Church Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  pincode: '636809'
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}
const PreviewCard = () => {
  const router = useRouter()
  const methods = useForm({ defaultValues: defaultValues, reValidateMode: 'onChange', criteriaMode: 'all' })

  const FormProviderComp = ({ children }: any) => {
    return <FormProvider {...methods}>{children}</FormProvider>
  }

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const AvatarWithStyles = styled(CustomAvatar)<AvatarProps>(({}) => ({
    width: 150,
    height: 150
  }))
  const handleCloseSnackbar = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }
  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0]

    if (imageFile) {
      if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/png') {
        if (imageFile.size <= 800000) {
          const imageUrl = URL.createObjectURL(imageFile)
          setSelectedImage(imageUrl)
        } else {
          setSnackbarMessage('Image size should be less than 800KB')
          setOpenSnackbar(true)
        }
      } else {
        setSnackbarMessage('Only JPEG or PNG images are allowed')
        setOpenSnackbar(true)
      }
    }
  }

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true)
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false)
  }

  const onSubmit = (data: any) => {
    // You can handle the form submission here
    // data will contain the form values
    console.log(data)
    handleEditDialogClose()
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={10}>
        <Grid item xs={6}>
          <DyncamicBreadcrumb asPath={router.asPath} />
        </Grid>
      </Grid>
      <Grid container xs={12} sx={{ display: 'flex' }}>
        <Grid className='d-flex' sm={3} xs={12} item>
          <Grid xs={12} sm={11}>
            <Card sx={{ padding: 8 }}>
              <Grid className='d-flex' sx={{ justifyContent: 'center' }}>
                {selectedImage ? (
                  <AvatarWithStyles alt='R' src={selectedImage} />
                ) : (
                  <AvatarWithStyles alt='R' src='/student/images/avatars/1.png' />
                )}
              </Grid>
              <Grid className='d-flex' sx={{ justifyContent: 'center', marginTop: 8 }}>
                <input
                  accept='image/jpeg, image/png'
                  type='file'
                  style={{ display: 'none' }}
                  id='upload-image-input'
                  onChange={handleImageChange}
                />
                <label htmlFor='upload-image-input'>
                  <Button
                    variant='contained'
                    component='span'
                    sx={{ background: 'linear-gradient(90deg, rgba(80,149,142,1) 100%, rgba(1,133,85,1) 0%)' }}
                  >
                    CHANGE PHOTO
                  </Button>
                </label>
              </Grid>
              <Grid className='d-flex' sx={{ justifyContent: 'center', marginTop: 12 }}>
                Allowed PNG or JPEG. Max size of 800K
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Grid sm={9} xs={12} item>
          <Card sx={{ padding: 5 }}>
            <Grid sm={12} xs={12} columnGap={4} container>
              <Grid sm={3} xs={12} item>
                <Button variant='contained' fullWidth>
                  PERSONAL INFORMATION
                </Button>
              </Grid>
              <Grid sm={3.6} xs={12} item>
                <Button variant='outlined' fullWidth>
                  EDUCATION & COURSE DETAILS
                </Button>
              </Grid>
              <Grid sm={2.4} xs={12} item>
                <Button variant='outlined' fullWidth>
                  SPONSOR DETAILS
                </Button>
              </Grid>
              <Grid sm={2} xs={12} item>
                <Button variant='outlined' fullWidth>
                  KIN DETAILS
                </Button>
              </Grid>
            </Grid>

            <Grid container xs={12} sx={{ marginTop: 10 }}>
              {personalInformationData?.map(item => (
                <ProfileInfo key={item?.name} label={item?.name} info={item?.info} />
              ))}
            </Grid>
            <Grid container sx={{ marginTop: 10 }} columnGap={25}>
              <Grid sm={5} xs={12} item>
                POSTAL ADDRESS{' '}
                <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative' }}>
                  110 Church Street, Western Cape Mumbai, MaharastraIndia, 636809
                  <div onClick={handleEditDialogOpen} style={editIconStyle as any}>
                    <Pencil style={{ color: 'white' }} />
                  </div>
                </Card>
              </Grid>
              <Grid sm={5} xs={12} item>
                RESIDENTAL ADDRESS
                <Card sx={{ height: 130, padding: 7, marginTop: 1 }}>
                  110 Church Street, Western Cape Mumbai, MaharastraIndia, 636809
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <FormProviderComp>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <EditPostalAddressDialog
            onSubmit={onSubmit}
            editDialogOpen={editDialogOpen}
            handleEditDialogClose={handleEditDialogClose}
          />
        </form>
      </FormProviderComp>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='error'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PreviewCard
