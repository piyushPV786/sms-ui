import axios, { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'
import { status } from 'src/context/common'

interface ICommonDocumentUploadParamTypes {
  filename: string
  filetype: string
  file: File
}
export default class Common {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async getQualificationData() {
    nProgress.start()
    const endUrlName = apiEndPoints.qualification
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getCountryData() {
    nProgress.start()
    const endUrlName = apiEndPoints.country
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getProfileSource(filename: string) {
    nProgress.start()
    const endUrlName = apiEndPoints.document
    try {
      const response = await this.apiServer.get(`${endUrlName}?filename=${filename}`)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getStateData(countryCode: string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.state}/${countryCode}`
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async documentUpload(param: ICommonDocumentUploadParamTypes) {
    nProgress.start()
    let response = false
    const endUrlName = `${apiEndPoints.uploadFileUrl}?filename=${param.filename}&filetype=${param.filetype}`

    try {
      const s3amazonawsUrl = await this.apiServer.get(endUrlName)
      if (s3amazonawsUrl?.data?.statusCode === status.successCode) {
        const isFileUploaded = await axios.put(decodeURIComponent(s3amazonawsUrl.data.data), param.file)
        response = isFileUploaded.status === status.successCode
      } else {
        return response
      }
    } catch (err: any) {
      console.log('Error in Upload Document to Amazon AWS S3 ========>', err?.message)
    } finally {
      nProgress.done()

      return response
    }
  }

  async getFileUrl(fileName: string) {
    nProgress.start()
    const endUrlName = apiEndPoints.getFileUrl
    try {
      const response = await this.apiServer.get(`${endUrlName}?filename=${fileName}`)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getDocumentType(projectDocument: boolean) {
    nProgress.start()
    const endUrlName = apiEndPoints.documentType
    try {
      const response = await this.apiServer.get(`${endUrlName}?projectDocument=${projectDocument}`)
      nProgress.done()

      return response?.data?.data
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
}
