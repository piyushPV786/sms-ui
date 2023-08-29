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
import { AvatarProps, Tab } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import EditPostalAddressDialog from './editPostalddressDialog'
import { FormProvider, useForm } from 'react-hook-form'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useAuth } from 'src/hooks/useAuth'
import { StudentService } from 'src/service'
import PersonalInformation from 'src/components/profile/personalInformation'
import { status } from 'src/context/common'
import EducationInformation from 'src/components/profile/educationInformation'

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
  const auth = useAuth()

  const FormProviderComp = ({ children }: any) => {
    return <FormProvider {...methods}>{children}</FormProvider>
  }
  const [userProfileDetails, setUserProfileDetails] = useState<any>(null)
  const [studentDetails, setStudentDetails] = useState(null)
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
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    getUserProfileDetails()
    getStudentDetails()
  }, [])

  const getStudentDetails = async () => {
    if (auth?.user?.studentCode) {
      const userProfileResponse = await StudentService?.UserProfile(auth?.user?.studentCode)
      console.log('userProfileResponse', userProfileResponse)
      if (userProfileResponse?.status === status?.successCode && userProfileResponse?.data?.data) {
        setStudentDetails(userProfileResponse?.data?.data)
      }
    }
  }

  const getUserProfileDetails = async () => {
    if (auth?.user?.studentCode) {
      const userProfileResponse = await StudentService?.getUserProfileDetails(auth?.user?.studentCode)
      if (userProfileResponse?.status === status?.successCode && userProfileResponse?.data?.data) {
        setUserProfileDetails(userProfileResponse?.data?.data)
      }
    }
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
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label='lab API tabs example'>
                    <Tab label='Personal Information' value='1' />
                    {!!userProfileDetails?.education?.id && <Tab label='Education & Course Details' value='2' />}
                    {!!userProfileDetails?.sponsor?.id && <Tab label='Sponsor Details' value='3' />}
                    {!!userProfileDetails?.kin?.id && <Tab label='Kin Details' value='4' />}
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  <PersonalInformation handleEditDialogOpen={handleEditDialogOpen} studentDetails={studentDetails} />
                </TabPanel>
                <TabPanel value='2'>
                  <EducationInformation userProfileDetails={userProfileDetails} />
                </TabPanel>
                <TabPanel value='3'>Item Three</TabPanel>
                <TabPanel value='4'>Item Three</TabPanel>
              </TabContext>
            </Box>
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
