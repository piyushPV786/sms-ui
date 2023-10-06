import axios, { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'
import { status } from 'src/context/common'

interface ICommonDocumentUploadParamTypes {
  filename: string
  filetype: string
  file: File
  studentCode: string | undefined
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

  async getProfileSource(filename: string, studentCode: string | undefined) {
    nProgress.start()
    const endUrlName = apiEndPoints.document
    try {
      const response = await this.apiServer.get(`${endUrlName}?filename=${filename}&studentCode=${studentCode}`)
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
    const endUrlName = `${apiEndPoints.uploadFileUrl}?filename=${param.filename}&filetype=${param.filetype}&studentCode=${param.studentCode}`

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

  async getFileUrl(fileName: string, studentCode: string | undefined) {
    nProgress.start()
    const endUrlName = apiEndPoints.getFileUrl
    try {
      const response = await this.apiServer.get(`${endUrlName}?filename=${fileName}&studentCode=${studentCode}`)
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
  async getGenderList() {
    nProgress.start()
    const endUrlName = apiEndPoints.gender
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching Gender detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getNationalityList() {
    nProgress.start()
    const endUrlName = apiEndPoints.nationality
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching Nationality detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getNationalityStatus() {
    nProgress.start()
    const endUrlName = apiEndPoints.nationalityStatus
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching Nationality  Status detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getRace() {
    nProgress.start()
    const endUrlName = apiEndPoints.race
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching Race detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getLanguage() {
    nProgress.start()
    const endUrlName = apiEndPoints.language
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching language detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getStudentType() {
    nProgress.start()
    const endUrlName = apiEndPoints.studentType
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

  async getStudyMode() {
    nProgress.start()
    const endUrlName = apiEndPoints.studyMode
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching Study Mode detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getIndustryDetails() {
    nProgress.start()
    const endUrlName = apiEndPoints.industry
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching industry detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getCurrencyList() {
    nProgress.start()
    const endUrlName = apiEndPoints.currency
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching currency list ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
}
