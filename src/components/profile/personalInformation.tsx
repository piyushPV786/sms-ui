import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import { ProfileInfo } from '.'
import { Pencil } from 'mdi-material-ui'
import { addressTypes } from 'src/types/dataTypes'
import UseCustomHook from '../common/CustomHook'
import { DDMMYYYDateFormat, DateFormat, compareDates, getName } from 'src/utils'

interface IProps {
  handleEditDialogOpen: () => void
  studentDetails: any
  address: addressTypes[]
}

const PersonalInformation = ({ handleEditDialogOpen, address, studentDetails }: IProps) => {
  const { country, gender, language, nationality, nationalityStatus, race, identificationType } = UseCustomHook()
  const Address = address?.sort((a: addressTypes, b: addressTypes) => a?.addressType?.localeCompare(b?.addressType))

  return (
    <Box>
      {!!studentDetails && (
        <Grid container xs={12} sx={{ marginTop: 10 }}>
          <ProfileInfo label='Name' info={`${studentDetails['firstName']} ${studentDetails['lastName']}`} />
          <ProfileInfo label='Gender' info={`${getName(gender, studentDetails['gender'])}`} />
          <ProfileInfo label='Date of Birth' info={`${DDMMYYYDateFormat(studentDetails['dateOfBirth'])}`} />
          <ProfileInfo label='Email' info={`${studentDetails['email']}`} />
          <ProfileInfo label='Mobile Number' info={`+${studentDetails['mobileCountryCode']} ${studentDetails['mobileNumber']}`} />
          <ProfileInfo label='Home Language' info={`${getName(language, studentDetails['language'])}`} />
          <ProfileInfo label='Race' info={`${getName(race, studentDetails['race'])}`} />
          <ProfileInfo
            label='Nationality Status'
            info={`${getName(nationalityStatus, studentDetails['nationality'])}`}
          />
          <ProfileInfo label='Nationality' info={`${getName(nationality, studentDetails['nationality'])}`} />
          <ProfileInfo
            label='Identification Document Type / Id No'
            info={`${getName(identificationType, studentDetails['identificationDocumentType'])} / ${studentDetails['identificationNumber']
              }`}
          >
            {studentDetails['identificationDocumentType'] === "PASSPORT" && (
              <Box sx={{ borderLeft: (theme) => compareDates(new Date(studentDetails['passportExpiryDate']), new Date()) === -1 ? `5px solid ${theme.palette.error.main}` : `5px solid ${theme.palette.success.main}` }}>
                <Box
                  sx={{
                    backgroundColor: compareDates(new Date(studentDetails['passportExpiryDate']), new Date()) === -1 ? `#FFEAEB` : `#F4FFF0`,
                    paddingLeft: 2
                  }}
                >
                  <Typography variant='h6' color={theme => compareDates(new Date(studentDetails['passportExpiryDate']), new Date()) === -1 ? theme.palette.error.main : theme.palette.success.main}>
                    <label>Date of Expiry : </label>
                    {DateFormat(studentDetails['passportExpiryDate'])}
                  </Typography>
                </Box>
              </Box>
            )}
          </ProfileInfo>
        </Grid>
      )}
      {!!studentDetails && Address && (
        <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
          {address?.map((item: any) => (
            <>
              <Grid sm={5} xs={12} item key={item?.id}>
                <Typography variant='h6' sx={{ color: '#4f958d' }}>{`${item?.addressType}  ADDRESS`}</Typography>

                <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative', background: '#e0ece8' }}>
                  {`${item?.street},   ${item?.city}, ${item.stateName}, ${getName(country, item?.country)}, ${item?.zipcode
                    }`}
                  {item?.addressType === 'POSTAL' && (
                    <IconButton
                      aria-label='fingerprint'
                      color='success'
                      onClick={handleEditDialogOpen}
                      sx={{ position: 'absolute', top: '5px', right: '5px', background: '#4f958d' }}
                    >
                      <Pencil style={{ color: 'white' }} />
                    </IconButton>
                  )}
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default PersonalInformation
