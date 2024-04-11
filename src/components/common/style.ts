import styled from '@emotion/styled'
import { Container, Typography } from '@mui/material'

export const InnerContainer = styled(Container)`
  background-color: #faeeda;
  padding: 16px;
  margin-top: 16px;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`

export const FileUploadContainer = styled(Container)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  border: 1px solid;
  padding: 0.7rem;
  background: #f5f5f5;
  ${({ disabled }) =>
    disabled &&
    `
  pointer-events:noneimportant;
  color: #bebdbf!important
  
  `}
`

export const StyleLabel = styled.label`
  border-radius: 4px;
  background: #008554 !important;
  border: 1px solid #008554 !important;
  color: white !important;
  cursor: pointer;
  padding: 1px 20px;
  margin-right: 10px;
`

export const ShortTypography = styled(Typography)<any>(() => ({
  fontSize: '13px !important',
  fontWeight: '700px ! important',
  maxWidth: '122px'
}))

export const GreenFormHeading = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #008554;
  margin: 0 0 2px;
  margin-right: 20px;

  @media (max-width: 510px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`
