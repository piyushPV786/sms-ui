import { Box, Card, Grid } from '@mui/material'
import { ProfileInfo } from '.'
import { personalkeyrmationData } from './data'
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
          {personalkeyrmationData?.map((item: any) => (
            <ProfileInfo
              key={item?.name}
              label={item?.name}
              info={
                item?.key2
                  ? `${studentDetails[0][item?.key]} ${studentDetails[0][item?.key2]}`
                  : studentDetails[0][item?.key]
              }
            />
          ))}
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
