import { Box, Card, Grid } from '@mui/material'
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
          <ProfileInfo label='Name' info={`${studentDetails[0]['firstName']} ${studentDetails[0]['lastName']}`} />
          <ProfileInfo label='Gender' info={`${studentDetails[0]['gender']}`} />
          <ProfileInfo label='Date of Birth' info={`${studentDetails[0]['dateOfBirth']}}`} />
          <ProfileInfo label='Email' info={`${studentDetails[0]['email']}`} />
          <ProfileInfo
            label='Mobile Number'
            info={`+${studentDetails[0]['mobileCountryCode']} ${studentDetails[0]['mobileNo']}`}
          />
          <ProfileInfo label='Home Language' info={`${studentDetails[0]['homeLanguage']}`} />
          <ProfileInfo label='Race' info={`${studentDetails[0]['race']}`} />
          <ProfileInfo label='Nationality Status' info={`${studentDetails[0]['nationality']}`} />
          <ProfileInfo label='Nationality' info={`${studentDetails[0]['nationality']}`} />
          <ProfileInfo
            label='Identification Document Type / Id No'
            info={`${studentDetails[0]['identificationDocumentType']} / ${studentDetails[0]['idNo']}`}
          />
        </Grid>
      )}
      {!!studentDetails && studentDetails[0]?.address && (
        <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
          {studentDetails[0]?.address?.map((item: any) => (
            <Grid sm={5} xs={12} item key={item?.id}>
              {item?.addressType}
              <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative' }}>
                {`${item?.street} ${item?.state} ${item?.state} ${item?.city} ${item?.country} ${item?.zipcode}`}
                <div onClick={handleEditDialogOpen}>
                  <Pencil style={{ color: 'white' }} />
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default PersonalInformation
