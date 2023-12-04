import { Box, Grid } from '@mui/material'
import { ProfileInfo } from '.'
import UseCustomHook from '../common/CustomHook'
import { getName } from 'src/utils'

interface IProps {
  userProfileDetails: any
  qualificationData: any
}

const EducationInformation = ({ userProfileDetails, qualificationData }: IProps) => {
  const { studyModes, studentTypes } = UseCustomHook()
  const qualificationName = (code: string) => {
    let result = code
    if (qualificationData) {
      result = qualificationData?.find((item: any) => item?.code === code)?.name
    }

    return result
  }

  return (
    <Box>
      {!!userProfileDetails && userProfileDetails?.education && (
        <Grid container xs={12} sx={{ marginTop: 10 }}>
          <ProfileInfo label='Admitted Qualification' info={`${userProfileDetails?.education?.programName}`} />
          <ProfileInfo
            label='Study Mode & Fee Plan'
            info={`${getName(studyModes, userProfileDetails?.education?.studyModeCode)}`}
          />
          <ProfileInfo
            label='Highest Qualification'
            info={`${qualificationName(userProfileDetails?.education?.qualificationCode)}`}
          />
          <ProfileInfo label='High School Name' info={`${userProfileDetails?.education?.highSchoolName}`} />
          <ProfileInfo
            label='Are you an international degree holder?'
            info={`${userProfileDetails?.education?.isInternationDegree ? 'Yes' : 'No'}`}
          />
          <ProfileInfo
            label='Student Type'
            info={`${getName(studentTypes, userProfileDetails?.education?.studentTypeCode)}`}
          />
        </Grid>
      )}
    </Box>
  )
}

export default EducationInformation
