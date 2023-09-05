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
import { AvatarProps, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import EditPostalAddressDialog from '../../components/profile/editPostalddressDialog'

import { useAuth } from 'src/hooks/useAuth'
import { CommonService, StudentService } from 'src/service'
import PersonalInformation from 'src/components/profile/personalInformation'
import { status } from 'src/context/common'
import EducationInformation from 'src/components/profile/educationInformation'
import SponsorInformation from 'src/components/profile/sponsorInformation'
import EmploymentInformation from 'src/components/profile/employmetInformation'
import KinInformation from 'src/components/profile/kinInformation'
import { successToast } from 'src/components/common'
import ProfilePictureDialog from 'src/components/profile/profilePictureDialog'

const PreviewCard = () => {
  const router = useRouter()
  const auth = useAuth()

  const [qualificationData, setQualificationData] = useState<any>(null)
  const [userProfileDetails, setUserProfileDetails] = useState<any>(null)
  const [studentDetails, setStudentDetails] = useState(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [countryData, setCountryData] = useState(null)
  const [stateData, setStateData] = useState(null)
  const [openProfileModal, setProfileModal] = useState<boolean>(false)
  const AvatarWithStyles = styled(CustomAvatar)<AvatarProps>(({}) => ({
    width: 150,
    height: 150
  }))

  const handleImageChange = (file: any) => {
    const imageFile = file[0]

    const imageUrl = URL.createObjectURL(imageFile)
    setSelectedImage(imageUrl)
  }

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true)
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false)
  }

  const onSubmit = async (data: any) => {
    if (auth?.user?.studentCode) {
      const addressUpdateResponse = await StudentService?.updateAddress(data, auth?.user?.studentCode)
      if (addressUpdateResponse?.status === status?.successCode) {
        successToast('Data Updated Successfully')
        getStudentDetails()
        handleEditDialogClose()
      }
    }
  }
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(+newValue)
  }

  useEffect(() => {
    getUserProfileDetails()
    getStudentDetails()
    getQualificationData()
    getCountryData()
  }, [])

  const getStudentDetails = async () => {
    if (auth?.user?.studentCode) {
      const userProfileResponse = await StudentService?.UserProfile(auth?.user?.studentCode)
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

  const getQualificationData = async () => {
    const qualificationResponse = await CommonService?.getQualificationData()
    if (qualificationResponse?.data?.data) {
      setQualificationData(qualificationResponse?.data?.data)
    }
  }

  const getCountryData = async () => {
    const countryResponse = await CommonService?.getCountryData()
    if (countryResponse?.data?.data) {
      setCountryData(countryResponse?.data?.data)
    }
  }

  const getStateData = async (countryCode: string) => {
    const stateResponse = await CommonService?.getStateData(countryCode)
    if (stateResponse?.data?.data) {
      setStateData(stateResponse?.data?.data)
    }
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
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
        <ProfilePictureDialog
          handleImageChange={handleImageChange}
          selectedImage={selectedImage}
          setProfileModal={setProfileModal}
          openProfileModal={openProfileModal}
        />
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
                <Button
                  variant='contained'
                  component='span'
                  sx={{ background: 'linear-gradient(90deg, rgba(80,149,142,1) 100%, rgba(1,133,85,1) 0%)' }}
                  onClick={() => setProfileModal(!openProfileModal)}
                >
                  CHANGE PHOTO
                </Button>
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
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                  scrollButtons='auto'
                  variant='scrollable'
                >
                  <Tab label='Personal Information' {...a11yProps(0)} />
                  {!!userProfileDetails?.education?.id && <Tab label='Education & Course Details' {...a11yProps(1)} />}
                  {!!userProfileDetails?.sponsor?.id && <Tab label='Sponsor Details' {...a11yProps(2)} />}
                  {!!userProfileDetails?.employment?.id && <Tab label='Employment Details' {...a11yProps(3)} />}
                  {!!userProfileDetails?.kin?.id && <Tab label='Kin Details' {...a11yProps(4)} />}
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PersonalInformation handleEditDialogOpen={handleEditDialogOpen} studentDetails={studentDetails} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <EducationInformation userProfileDetails={userProfileDetails} qualificationData={qualificationData} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <SponsorInformation userProfileDetails={userProfileDetails} qualificationData={qualificationData} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <EmploymentInformation userProfileDetails={userProfileDetails} qualificationData={qualificationData} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <KinInformation userProfileDetails={userProfileDetails} qualificationData={qualificationData} />
              </CustomTabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <EditPostalAddressDialog
        studentDetails={studentDetails}
        onSubmit={onSubmit}
        editDialogOpen={editDialogOpen}
        handleEditDialogClose={handleEditDialogClose}
        getStateData={getStateData}
        countryData={countryData}
        stateData={stateData}
      />
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default PreviewCard
