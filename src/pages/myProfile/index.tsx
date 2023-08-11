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
import styles from './profile.module.css'

import { AvatarProps, Typography } from '@mui/material'

const PreviewCard = () => {
  const router = useRouter()
  const Avatar = styled(CustomAvatar)<AvatarProps>(({}) => ({
    width: 150,
    height: 150
  }))

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={10}>
        <Grid item xs={6}>
          <DyncamicBreadcrumb asPath={router.asPath} />
        </Grid>
      </Grid>
      <Grid container xs={12} sx={{ display: 'flex' }}>
        <Grid className='d-flex' sm={3} xs={12} item>
          <Grid xs={12} sm={11}>
            <Card sx={{ padding: 8 }}>
              <Grid className='d-flex' sx={{ justifyContent: 'center' }}>
                <Avatar alt='R' src='/student/images/avatars/1.png' />
              </Grid>
              <Grid className='d-flex' sx={{ justifyContent: 'center', marginTop: 8 }}>
                <Button
                  variant='contained'
                  sx={{ background: 'linear-gradient(90deg, rgba(80,149,142,1) 100%, rgba(1,133,85,1) 0%)' }}
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
            <Grid sm={12} xs={12} columnGap={4} container>
              <Grid sm={3} xs={12} item>
                <Button variant='contained' fullWidth>
                  PERSONAL INFORMATION
                </Button>
              </Grid>
              <Grid sm={3.6} xs={12} item>
                <Button variant='outlined' fullWidth>
                  EDUCATION & COURSE DETAILS
                </Button>
              </Grid>
              <Grid sm={2.4} xs={12} item>
                <Button variant='outlined' fullWidth>
                  SPONSOR DETAILS
                </Button>
              </Grid>
              <Grid sm={2} xs={12} item>
                <Button variant='outlined' fullWidth>
                  KIN DETAILS
                </Button>
              </Grid>
            </Grid>

            <Grid container xs={12} sx={{ marginTop: 10 }}>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Name</Typography>
                <Typography className={styles.lable}>Sam Anderson</Typography>
              </Grid>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Gender</Typography>
                <Typography className={styles.lable}>Male</Typography>
              </Grid>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Date of Birth</Typography>
                <Typography className={styles.lable}>05/05/1986</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 10 }}>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Email</Typography>
                <Typography className={styles.lable}>Samanderson@gmail.com</Typography>
              </Grid>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Mobile Number</Typography>
                <Typography className={styles.lable}>+91 2323232323</Typography>
              </Grid>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Race</Typography>
                <Typography className={styles.lable}>Asian</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 10 }}>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Nationality</Typography>
                <Typography className={styles.lable}>Indian</Typography>
              </Grid>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Home Language</Typography>
                <Typography className={styles.lable}>Hindi</Typography>
              </Grid>
              <Grid sm={4} xs={4} item>
                <Typography className={styles.childLable}>Identification Document Type / Id No</Typography>
                <Typography className={styles.lable}>Passport / Z9850526</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 10 }} columnGap={25}>
              <Grid sm={5} xs={12} item>
                POSTAL ADDRESS
                <Card sx={{ height: 130, padding: 7, marginTop: 1 }}>
                  110 Church Street, Western Cape Mumbai, MaharastraIndia, 636809
                </Card>
              </Grid>
              <Grid sm={5} xs={12} item>
                RESIDENTAL ADDRESS
                <Card sx={{ height: 130, padding: 7, marginTop: 1 }}>
                  110 Church Street, Western Cape Mumbai, MaharastraIndia, 636809
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PreviewCard
