import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormContent from './Form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ApplyForProgram, ErrorMessage, ICommonData } from 'src/context/common'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { AddMultiApplication } from './APIHook'
import { errorToast } from 'src/@core/components/common/Toast'
import { useAuth } from 'src/hooks/useAuth'
import { UserService } from 'src/service'
import { AgentEmail } from 'src/components/common/Constants'

const schema = yup.object().shape({
  qualification: yup.string().required(ApplyForProgram?.qualification),
  studyMode: yup.string().required(ApplyForProgram?.studyMode)
})
export interface IApplyNewProg {
  programData: ICommonData[]
  application?: any
}
const ApplyNewProgram = ({ programData, application }: IApplyNewProg) => {
  const [dialogShow, setDialogShow] = useState<boolean>(false)
  const [agentCode, setAgentCode] = useState<string>('')
  const methods = useForm({ mode: 'onChange', resolver: yupResolver(schema) })
  const router = useRouter()
  const auth = useAuth()
  const handleOpen = () => {
    methods?.reset()
    getUserDetails()
    setDialogShow(true)
  }
  const handleClose = () => {
    setDialogShow(false)
  }

  const AddMultiApplicationMutation = useMutation({
    mutationFn: AddMultiApplication,
    onSuccess: data => {
      router.push(`/new-prog-payment/${data?.data?.applicationCode}`)
    },
    onError: () => {
      errorToast(ErrorMessage?.Error)
    }
  })
  const getUserDetails = async () => {
    const response = await UserService.getUserByEmail(AgentEmail?.Email)
    setAgentCode(response?.code)
  }

  const OnSubmit = (data: any) => {
    const submitPayload = {
      studentCode: auth?.user?.studentCode ? auth?.user?.studentCode : '',
      education: {
        programCode: data?.qualification,
        programName: data?.qualificationName,
        studyModeCode: data?.studyMode,
        qualificationCode: null,
        socialMediaCode: null,
        applicationFees: null,
        programFees: null,
        programMode: null,
        agentCode: agentCode,
        highSchoolName: null,
        studentTypeCode: application?.education?.studentTypeCode,
        referredById: null,
        isInternationDegree: 0,
        bursaryName: null,
        bursaryId: null
      }
    }

    AddMultiApplicationMutation.mutate(submitPayload)
    setDialogShow(false)
  }

  return (
    <Grid>
      <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Typography variant='caption' color='primary' sx={{ textDecoration: 'underline' }}>
          Apply New Program
        </Typography>
      </Box>
      <Dialog open={dialogShow} maxWidth='sm' fullWidth scroll='body'>
        <DialogTitle
          display='flex'
          justifyContent='center'
          fontWeight='bold'
          color={theme => theme.palette.primary.main}
          bgcolor='#c5e3d9'
        >
          APPLY NEW PROGRAM
        </DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(OnSubmit)}>
            <DialogContent>
              <Grid sx={{ p: 4 }}>
                <FormContent programData={programData} />
              </Grid>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' type='submit'>
                Pay Application Fee
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </Grid>
  )
}

export default ApplyNewProgram
