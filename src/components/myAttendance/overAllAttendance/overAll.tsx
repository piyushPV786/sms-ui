// ** Next Import
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { IRow } from 'src/context/common'

interface IOverAllProps {
  tableData: IRow[] | any
}

const OverAllCard = ({ tableData }: IOverAllProps) => {
  const { handleSubmit, reset } = useForm()
  const [totalClassSum, setTotalClassSum] = useState<number>()
  const [totalAttendSum, setTotalAttendSum] = useState<number>()
  const [ratio, setRatio] = useState<any>()

  const theme = useTheme()

  const progressOptions: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },

    stroke: { lineCap: 'round' },

    colors: [hexToRGBA(theme.palette.primary.main, 1)],

    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },

        dataLabels: {
          name: { show: false },

          value: {
            offsetY: 5
          }
        }
      }
    },

    grid: {
      padding: {
        bottom: -12
      }
    },

    states: {
      hover: {
        filter: { type: 'none' }
      },

      active: {
        filter: { type: 'none' }
      }
    }
  }

  const onSubmit = (param: any) => {
    console.log('param', param) //console remove when api call
    reset()
  }

  useEffect(() => {
    if (Array.isArray(tableData)) {
      const { totalClassSum, totalAttendSum } = tableData.reduce(
        (accumulator, item) => {
          accumulator.totalClassSum += item.totalClass
          accumulator.totalAttendSum += item.totalAttend

          return accumulator
        },
        { totalClassSum: 0, totalAttendSum: 0 }
      )

      const ratio = totalAttendSum === 0 ? totalAttendSum : (totalAttendSum / totalClassSum) * 100
      setTotalClassSum(totalClassSum)
      setTotalAttendSum(totalAttendSum)
      setRatio(ratio)
    }
  }, [tableData])

  return (
    <>
      <Card>
        <CardContent sx={{ backgroundColor: '#4f958e' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <Typography variant='h6' sx={{ color: theme => theme.palette.common.white }}>
                      OVERALL ATTENDANCE %
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Grid xs={12}>
                  <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg, padding: 0 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Grid container>
                        <Box sx={{ display: 'flex' }}>
                          <Box
                            width='100%'
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              pl: '25px',
                              gap: '5px'
                            }}
                          >
                            <Box width='100%' marginTop={2}>
                              <Typography variant='caption' sx={{ color: (theme: Theme) => theme.palette.grey[600] }}>
                                Total Class
                              </Typography>
                              <Typography>{totalClassSum} Mins</Typography>
                            </Box>
                            <Box sx={{ border: '1px solid #9E9E9E', mr: 1, mt: 2 }}></Box>
                            <Box width='100%'>
                              <Typography variant='caption' sx={{ color: (theme: Theme) => theme.palette.grey[600] }}>
                                Total Attended
                              </Typography>
                              <Typography>{totalAttendSum} Mins</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ border: '1px solid #9E9E9E', ml: 6, mr: 6, mt: 2 }}></Box>
                          <Box sx={{ width: '200px', mt: 5 }}>
                            <ReactApexcharts
                              type='radialBar'
                              height={119}
                              series={[Math.floor(ratio)]}
                              options={progressOptions}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default OverAllCard
