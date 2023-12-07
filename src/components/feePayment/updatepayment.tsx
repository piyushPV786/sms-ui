// ** Next Import

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { DDMMYYYDateFormat, getSymbol, programCodeToName } from 'src/utils'
import { UpdatePayment, UpdatepaymentItem } from 'src/types/common'

const Updatepayment = ({ allProgram, rows, programCode, currencyList }: UpdatePayment) => {
  const router = useRouter()

  const handlePay = (
    amount: string | null,
    feeModeCode: string | null,
    currencyCode: string | null,
    dueDate: string,
    applicationCode: string,
    qualificaion: string
  ) => {
    router.push(
      `/payment/checkout/${amount}/${feeModeCode}/${currencyCode}/${dueDate}/${applicationCode}/${qualificaion}`
    )
  }

  return (
    <>
      <Card>
        <CardContent sx={{ backgroundColor: '#4f958e' }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ color: theme => theme.palette.common.white, mb: '15px' }}>
              UPCOMING PAYMENTS
            </Typography>
          </Grid>
          {rows.map((item: UpdatepaymentItem) => {
            return (
              <Card key={item.id} sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg, mb: 2 }}>
                <CardContent>
                  <Grid xs={12} sx={{ display: 'flex' }}>
                    <Grid container rowSpacing={1}>
                      <Grid item xs={12}>
                        <Typography variant='h6' sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                          {programCodeToName(allProgram, programCode)}
                        </Typography>
                      </Grid>
                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Grid item xs={6}>
                          <label>Qualification</label>
                          <Typography variant='h6' sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                            {item?.programName}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <label>Payment Mode</label>
                          <Typography variant='h6' sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                            {item?.feeModeCode}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Grid item xs={6}>
                          <label>Due Date</label>
                          <Typography variant='h6' sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                            {item.dueDate ? DDMMYYYDateFormat(new Date(item.dueDate)) : '-'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <label>Due Amount</label>
                          <Typography variant='h6' sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                            {getSymbol(currencyList, item.currencyCode)}
                            &nbsp;
                            {item.dueAmount}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button
                        size='small'
                        variant='contained'
                        onClick={() => {
                          handlePay(
                            String(item.dueAmount),
                            item?.feeModeCode,
                            item.currencyCode,
                            item.dueDate,
                            item?.applicationCode,
                            String(item?.programName)
                          )
                        }}
                        sx={{ position: 'absolute', borderRadius: '25px' }}
                      >
                        Pay
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}

export default Updatepayment
