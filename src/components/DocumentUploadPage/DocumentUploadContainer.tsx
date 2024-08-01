import { Card, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  BursaryFeilds,
  DeclarationComponent,
  ErrorHandling,
  FileRegister,
  Info,
  Reject,
  StyledLabel,
  getStatus
} from './components'
import styled from '@emotion/styled'
import { CertifiedDocument, disableStatus, status, statusColor } from '../common/Constants'
import { UseUploadDocumentHook } from './customHook/UseUploadDocumentHook'
import { DocumentServices } from 'src/service'

export const DocumentUploadContainer = ({ element, masterData, setDocumentProgress }: any) => {
  const { watch } = useFormContext()
  const { uploadDocument, uploadProgress, documentCode, setUploadProgress } = UseUploadDocumentHook(masterData)
  useEffect(() => {
    if (uploadProgress > 0) {
      setDocumentProgress(element, uploadProgress, documentCode)
    }
  }, [uploadProgress])
  const removeDocumnet = async (documentCode: string) => {
    await DocumentServices?.documentRemove(documentCode)
  }
  const onRemoveFile = (docCode: string) => {
    setUploadProgress(0)
    removeDocumnet(documentCode ? documentCode : docCode)
  }

  return (
    <Card sx={{ mb: 4, padding: 4, mt: 1 }}>
      <Grid container spacing={1} padding={3}>
        <Grid item sm={12} xs={12} padding={2}>
          <Typography textAlign='left' component='header' sx={{ fontFamily: 'roboto-medium', fontSize: '14px' }}>
            <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
            <Status
              status={watch(element?.code)?.status ? watch(element?.code)?.status : getStatus(watch(element?.code))}
            >
              {watch(element?.code)?.status
                ? status[watch(element?.code)?.status]
                : status[getStatus(watch(element?.code))]}
            </Status>
          </Typography>
        </Grid>
        <BursaryFeilds element={element} masterData={masterData} />
        <DeclarationComponent element={element} masterData={masterData} />
        <Reject element={element} />
        {CertifiedDocument.includes(element?.code) && <Info />}
        {!disableStatus.includes(watch(element?.code)?.status) && (
          <FileRegister element={element} uploadDocument={uploadDocument} uploadProgress={uploadProgress} />
        )}
        <ErrorHandling
          element={element}
          masterData={masterData}
          uploadProgress={uploadProgress}
          onRemoveFile={onRemoveFile}
        />
      </Grid>
    </Card>
  )
}

const Status = styled.span<{ status: string; noBg?: boolean }>`
  ${({ status }) => {
    return `
      background:${statusColor[status]?.background};
      color:${statusColor[status]?.text};
      font-family: inherit;
      `
  }};
  ${({ noBg = false }) =>
    noBg &&
    `
  background:transparent !important;
  box-shadow: none!important;
  text-transform: capitalize!important;
  `};
  padding: 4px 10px;
  border-radius: 4px;
  margin-left: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: roboto-medium;
  font-size: 14px;
`
