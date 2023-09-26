// ** Next Import
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Theme, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from '@mui/material'

import { DotsVertical } from 'mdi-material-ui'
import { useForm } from 'react-hook-form'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { options } from 'src/context/common'

const OverAllCard = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const { handleSubmit, reset } = useForm()

  const handleMenuItemClick = (event: any, index: any) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (param: any) => {
    console.log('param', param) //console remove when api call
    reset()
  }

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
                    <Typography sx={{ color: ' #a1dfd8', fontSize: '13px' }}>Semester Wise</Typography>
                  </Box>
                  <Box sx={{ color: theme => theme.palette.common.white }}>
                    <Box>
                      <ButtonGroup ref={anchorRef}>
                        <Box onClick={handleToggle}>
                          <DotsVertical />
                        </Box>
                      </ButtonGroup>
                      <Popper
                        sx={{
                          zIndex: 1
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                      >
                        {({ TransitionProps }) => (
                          <Grow {...TransitionProps}>
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>
                                  {options.map((option, index) => (
                                    <MenuItem
                                      key={option}
                                      selected={index === selectedIndex}
                                      onClick={event => handleMenuItemClick(event, index)}
                                    >
                                      {option}
                                    </MenuItem>
                                  ))}
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Grid xs={12}>
                  <Grid xs={12}>
                    <Box>
                      <Typography sx={{ color: ' #a3dcd6', pb: 2 }}>{options[selectedIndex]}</Typography>
                    </Box>
                  </Grid>
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
                              <Typography>1200 Mins</Typography>
                            </Box>
                            <Box sx={{ border: '1px solid #9E9E9E', mr: 1, mt: 2 }}></Box>
                            <Box width='100%'>
                              <Typography variant='caption' sx={{ color: (theme: Theme) => theme.palette.grey[600] }}>
                                Total Attended
                              </Typography>
                              <Typography>820 Mins</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ border: '1px solid #9E9E9E', ml: 6, mr: 6, mt: 2 }}></Box>
                          <Box sx={{ width: '200px', mt: 5 }}>
                            <CircularProgressbar
                              value={65}
                              text={`${65}%`}
                              styles={{
                                path: { stroke: `	rgb(127,255,0)` },
                                text: {
                                  fill: '#000000',

                                  fontSize: '20px'
                                }
                              }}
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
