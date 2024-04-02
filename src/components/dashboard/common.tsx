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
    <Grid
      container
      sx={{
        justifyContent: 'flex-end'
      }}
      className='d-flex flex-row'
      sm={9}
      spacing={1}
    >
      <LoginCredentialDialog
        openCredentialDialog={openCredentialDialog}
        setOpenCredentialDialog={setOpenCredentialDialog}
        applicationDetail={applicationDetail}
      />
      <RmatCredentialDialog rmatOpen={rmatOpen} setRmatOpen={setRmatOpen} />

      {isRmatBTN && (
        <Grid item>
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              getRmatDetails()
            }}
          >
            Take RMAT Test
          </Button>
        </Grid>
      )}

      {isPayBTN && (
        <Grid item>
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              router.push(`/new-prog-payment/${applicationDetail?.applicationCode}`)
            }}
          >
            {payBtnTitle}
          </Button>
        </Grid>
      )}
      {isUploadBTN && (
        <Grid item>
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              router.push(`/upload-documents/${applicationDetail?.applicationCode}`)
            }}
          >
            {isUploadBTNTitle}
          </Button>
        </Grid>
      )}
      {isBursaryBTN && (
        <Grid item>
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              router.push(`/upload-documents/${applicationDetail?.applicationCode}`)
            }}
          >
            Upload Bursary Letter
          </Button>
        </Grid>
      )}
      {isAdamiteBTN && (
        <Grid item>
          <Button
            variant='contained'
            size='small'
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
