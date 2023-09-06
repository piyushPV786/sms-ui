import { Box, Card, Grid, IconButton } from '@mui/material'
import { ProfileInfo } from '.'
import { Pencil } from 'mdi-material-ui'

interface IProps {
  handleEditDialogOpen: () => void
  studentDetails: any
}

const PersonalInformation = ({ handleEditDialogOpen, studentDetails }: IProps) => {
  return (
    <Box>
      {!!studentDetails && (
        <Grid container xs={12} sx={{ marginTop: 10 }}>
          <ProfileInfo label='Name' info={`${studentDetails['firstName']} ${studentDetails['lastName']}`} />
          <ProfileInfo label='Gender' info={`${studentDetails['gender']}`} />
          <ProfileInfo label='Date of Birth' info={`${studentDetails['dateOfBirth']}}`} />
          <ProfileInfo label='Email' info={`${studentDetails['email']}`} />
          <ProfileInfo
            label='Mobile Number'
            info={`+${studentDetails['mobileCountryCode']} ${studentDetails['mobileNo']}`}
          />
          <ProfileInfo label='Home Language' info={`${studentDetails['homeLanguage']}`} />
          <ProfileInfo label='Race' info={`${studentDetails['race']}`} />
          <ProfileInfo label='Nationality Status' info={`${studentDetails['nationality']}`} />
          <ProfileInfo label='Nationality' info={`${studentDetails['nationality']}`} />
          <ProfileInfo
            label='Identification Document Type / Id No'
            info={`${studentDetails['identificationDocumentType']} / ${studentDetails['idNo']}`}
          />
        </Grid>
      )}
      {!!studentDetails && studentDetails?.address && (
        <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
          {studentDetails?.address?.map((item: any) => (
            <Grid sm={5} xs={12} item key={item?.id}>
              {item?.addressType}
              <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative', background: '#e0ece8' }}>
                {`${item?.street} ${item?.state} ${item?.state} ${item?.city} ${item?.country} ${item?.zipcode}`}
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
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default PersonalInformation
