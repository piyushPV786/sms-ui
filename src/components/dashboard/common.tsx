import { useRouter } from 'next/router'
import UseCardActionHook from './customHook/UseCardActionHook'
import { Button, Grid } from '@mui/material'
import RmatCredentialDialog from '../dialog/rmatDetailsDialog'
import LoginCredentialDialog from '../dialog/loginCridentialDialog'

export const ActionButtons = ({ applicationDetail }: any) => {
  const router = useRouter()
  const {
    isRmatBTN,
    isPayBTN,
    payBtnTitle,
    isUploadBTN,
    isBursaryBTN,
    isUploadBTNTitle,
    isAdamiteBTN,
    setOpenCredentialDialog,
    openCredentialDialog,
    rmatOpen,
    setRmatOpen,
    getRmatDetails
  } = UseCardActionHook(applicationDetail)

  return (
    <Grid container spacing={2}>
      <LoginCredentialDialog
        openCredentialDialog={openCredentialDialog}
        setOpenCredentialDialog={setOpenCredentialDialog}
        applicationDetail={applicationDetail}
      />
      <RmatCredentialDialog rmatOpen={rmatOpen} setRmatOpen={setRmatOpen} />

      {isRmatBTN && (
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              getRmatDetails()
            }}
          >
            Take RMAT Test
          </Button>
        </Grid>
      )}

      {isPayBTN && (
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              router.push(`/new-prog-payment/${applicationDetail?.applicationCode}`)
            }}
          >
            {payBtnTitle}
          </Button>
        </Grid>
      )}
      {isUploadBTN && (
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              router.push(`/upload-documents/${applicationDetail?.applicationCode}`)
            }}
          >
            {isUploadBTNTitle}
          </Button>
        </Grid>
      )}
      {isBursaryBTN && (
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              router.push(`/upload-documents/${applicationDetail?.applicationCode}`)
            }}
          >
            Upload Bursary Letter
          </Button>
        </Grid>
      )}
      {isAdamiteBTN && (
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              setOpenCredentialDialog(true)
            }}
          >
            view login credentials
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
