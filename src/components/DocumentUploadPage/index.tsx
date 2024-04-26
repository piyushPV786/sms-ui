import { Card, Grid, Box, Button } from '@mui/material'

import { FormProvider, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { DocumentStatus, StyledMessage } from './components'
import { UseDocumentAction, UseDocumentHook } from './customHook/UseDocumentHook'
import { setDocumentValue } from 'src/utils'
import { DocumentUploadContainer } from './DocumentUploadContainer'

const DocumentUploadPage = (props: any) => {
  const methods = useForm({ mode: 'all' })
  const { applicationCode, leadCode } = props

  const { masterData } = UseDocumentHook(applicationCode, leadCode)
  const { saveAsDraft, submitDocument, progress, setDocumentProgress } = UseDocumentAction()
  const { handleSubmit } = methods

  useEffect(() => {
    if (masterData?.documents) {
      setDocumentValue(masterData?.documents, methods.setValue)
    }
  }, [masterData?.documents])
  const uploadValue: any = Object.values(progress)
  const disable = uploadValue?.length ? uploadValue?.every((val: { percent: number }) => val?.percent === 100) : false

  return (
    <FormProvider {...methods}>
      <form>
        <Grid container sm={12} xs={12} md={12} display={'flex'} justifyContent={'center'}>
          <Grid container sm={11} spacing={3}>
            <Grid item sm={9}>
              <StyledMessage />
              {masterData?.documentFormData?.map((element: { show: any }) => {
                if (element?.show) {
                  return (
                    <>
                      <DocumentUploadContainer
                        element={element}
                        masterData={masterData}
                        setDocumentProgress={setDocumentProgress}
                      />
                    </>
                  )
                }
              })}
            </Grid>
            <Grid item sm={3} className='pt-3'>
              <Box className='sticky-wrapper'>
                <Card className='p-2 mt-5'>
                  <Box display={'flex'} flexDirection={'column'} sx={{ p: 3 }} gap={2}>
                    <Button
                      variant='outlined'
                      disabled={!disable}
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault()
                        const data = methods.watch()
                        saveAsDraft(data, masterData)
                      }}
                      sx={{ color: '#198754', fontSize: '13px', fontWeight: '500', textTransform: 'none' }}
                    >
                      Save As Draft
                    </Button>

                    <Button
                      variant='contained'
                      disabled={!disable}
                      type='button'
                      onClick={handleSubmit(d => submitDocument(d, masterData))}
                      sx={{ fontSize: '13px', fontWeight: '500', textTransform: 'none' }}
                    >
                      Submit Documents
                    </Button>
                  </Box>
                </Card>
                <DocumentStatus masterData={masterData} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default DocumentUploadPage
