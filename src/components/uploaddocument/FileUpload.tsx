// ** Next Import

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'

const FileUpload = () => {
  const handlePay = () => {
    // setShow(true)
  }

  return (
    <>
      <Card>
        <CardContent sx={{ backgroundColor: '#4f958e' }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ color: theme => theme.palette.common.white, mb: '15px' }}>
              FILE UPLOAD
            </Typography>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg }}>
              <CardContent>
                <Grid xs={12} sx={{ display: 'flex' }}>
                  <Grid container rowSpacing={1}>
                    skdahfgksahdgkhdsg sdagsadgsadg sadgsagsgasg asdgsagsagdasgsadg sadgsaggsa
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 8
              }}
            >
              <Button
                size='small'
                onClick={handlePay}
                sx={{
                  position: 'absolute',
                  borderRadius: '5px',
                  backgroundColor: theme => theme.palette.customColors.bodyBg
                }}
              >
                BROWSE
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default FileUpload
