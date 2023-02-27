// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'

const updatepayment = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ color: '#509898', mb: '15px' }}>
              UPCOMING PAYMENT
            </Typography>
          </Grid>
          <Card sx={{ backgroundColor: '#BCDCE5' }}>
            <CardContent>
              <Grid container rowSpacing={1}>
                <Grid item>
                  <Typography variant='h6' sx={{ mb: '15px' }}>
                    THIRD SEMESTER
                  </Typography>
                </Grid>
                <Grid item xs={4} className='text-right'></Grid>
              </Grid>

              <Grid container sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Grid item xs={4}>
                  <label>Due Date</label>
                  <Typography>20-05-2023</Typography>
                </Grid>
                <Grid item xs={4}>
                  <label>total amount</label>
                  <Typography>R 1500</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    size='small'
                    variant='contained'
                    //onClick={() => setShow(true)}
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

export default updatepayment
