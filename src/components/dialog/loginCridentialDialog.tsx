import Close from 'mdi-material-ui/Close'

import { Dialog, DialogContent, Grid, IconButton } from '@mui/material'
import Image from 'next/image'

import Link from 'next/link'
import { GreenFormHeading } from '../common/style'
import { RoutePaths } from '../common/Constants'

const LoginCredentialDialog = ({ openCredentialDialog, setOpenCredentialDialog, applicationDetail }: any) => {
  const url: any = process.env.NEXT_PUBLIC_CREDENTIAL_URL + RoutePaths.StudentDashboard
  
return (
    <div>
      <Dialog
        open={openCredentialDialog}
        maxWidth='lg'
        onClose={() => {
          setOpenCredentialDialog(false)
        }}
      >
        <Grid className='d-flex justify-content-end p-3'>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCredentialDialog(false)
            }}
          >
            <Close />
          </IconButton>
        </Grid>
        <DialogContent className='mb-5'>
          <Grid container sm={12} xs={12} md={12} className='d-flex justify-content-center align-items-center p-2'>
            <Grid md={12} item className='text-center mb-2'>
              <Image
                width='190'
                height='150'
                src={`${process.env.NEXT_PUBLIC_STUDENT_BASE_URL}/images/pay.png`}
                alt={'PayIcon'}
              />
            </Grid>
            <Grid item md={12} className='text-center mb-2'>
              <GreenFormHeading style={{ fontSize: '24px' }}>Welcome to Regenesys!</GreenFormHeading>
            </Grid>
            <Grid item md={12} className='text-center'>
              <p>
                Your Login ID Created Successfully for ReGenius and <br />
                Student Management System (SMS)
              </p>
            </Grid>

            <Grid container md={12} sm={12} className='mt-3' rowSpacing={2} columnSpacing={10}>
              <Grid item md={6} sm={6} className='text-center'>
                <h6>ReGenius URL</h6>
                <Link href={process.env.NEXT_PUBLIC_PAYMENT_REGENIUS_REDIRECTION_URL || ''} target='blank'>
                  {process.env.NEXT_PUBLIC_PAYMENT_REGENIUS_REDIRECTION_URL}
                </Link>
              </Grid>
              <Grid item md={6} sm={6} className='text-center'>
                <h6>Student Management System URL (SMS)</h6>
                <Link href={url} target='blank'>
                  {url}
                </Link>
              </Grid>
            </Grid>
            <Grid container md={12} sm={12} className='mt-3' rowSpacing={2} columnSpacing={10}>
              <Grid item md={6} sm={6} className='text-center'>
                <p>Username</p>
                <h5>{applicationDetail?.username}</h5>
              </Grid>
              <Grid item md={6} sm={6} className='text-center'>
                <p>Password</p>
                <h5>{applicationDetail?.password}</h5>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginCredentialDialog
