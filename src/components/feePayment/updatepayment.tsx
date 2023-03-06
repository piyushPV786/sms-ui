// ** Next Import

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Updatepayment = () => {
  const router = useRouter()

  const handlePay = () => {
    router.push('/payment/checkout')
  }

  return (
    <>
      <Card>
        <CardContent sx={{ backgroundColor: '#4f958e' }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ color: theme => theme.palette.common.white, mb: '15px' }}>
              UPCOMING PAYMENT
            </Typography>
          </Grid>

          <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg }}>
            <CardContent>
              <Grid xs={12} sx={{ display: 'flex' }}>
                <Grid container rowSpacing={1}>
                  <Grid item xs={12}>
                    <Typography variant='h6' sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                      THIRD SEMESTER
                    </Typography>
                  </Grid>

                  <Grid container sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Grid item xs={6}>
                      <label>Due Date</label>
                      <Typography variant='h6' sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                        20-05-2023
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <label>total amount</label>
                      <Typography variant='h6' sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                        R 1500
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={handlePay}
                    sx={{ position: 'absolute', borderRadius: '25px' }}
                  >
                    Pay
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  )
}

export default Updatepayment
