// ** Next Import
import React, { useRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import Image from 'next/image'

const FileUpload = () => {
  const fileUploadRef = useRef<any>(null)

  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any
    fileElement.click() as any
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
            <Card sx={{ backgroundColor: theme => theme.palette.customColors.bodyBg, padding: 0 }}>
              <CardContent sx={{ p: 0 }}>
                <Grid sx={{ display: 'flex' }}>
                  <div className='d-flex justify-content-center w-100 '>
                    <UploadDocsContainer onClick={onDocUploadClick} className='w-100'>
                      <div ref={fileUploadRef} className='text-center'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STUDENT_BASE_URL}/images/drag_drop.png`}
                          height='35'
                          width='35'
                          alt='file-upload-svgrepo'
                        />
                        <input className='d-none' accept='image/jpeg, application/pdf' type='file' />
                        <GreenFormHeading>
                          <h5 style={{ color: 'black' }}>
                            Drag and drop, or <span style={{ color: '#008554' }}>browse</span> your files
                          </h5>
                        </GreenFormHeading>
                        <p className='grey-text'>Only PNG, JPEG and PDF files with max size of 2MB</p>
                        <div onClick={e => e.stopPropagation()} className='d-flex flex-wrap'></div>

                        <div className='invalid-feedback'>Only "PDF" or "JPEG" file can be upload.</div>
                      </div>
                    </UploadDocsContainer>
                  </div>
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
                onClick={onDocUploadClick}
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

export const MainContainer = styled.div`
  background: #fff;
  width: 100%;
  margin: 1rem 0;
  height: 100%;
`
const UploadDocsContainer = styled.div`
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 400px;
  min-height: 150px;
  width: 100%;
  overflow: hidden;
  @media (max-width: 900px) {
    padding: 1rem 4.7rem;
  }
`
export const GreenFormHeading = styled.p`
  font-size: 17px;
  font-weight: 300;
  color: #a8bdce;
  margin: 0;
  @media (max-width: 510px) {
    font-size: 11px;
    img {
      width: 25px;
      height: 25px;
    }
  }
`
