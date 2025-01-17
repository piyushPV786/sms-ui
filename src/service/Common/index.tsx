import axios, { AxiosInstance } from 'axios'
import { baseApiURL, apiEndPoints } from '../Config'
import nProgress from 'nprogress'
import { status } from 'src/context/common'

interface ICommonDocumentUploadParamTypes {
  filename: string
  filetype: string
  file?: File
  studentCode: string | undefined
}

interface statusPayloadType {
  source: string
  status: string
  aapCode: string
  paymentMode: string
}
export default class Common {
  apiServer: AxiosInstance
  baseUrl = `${baseApiURL}/`
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async getQualificationData() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.qualification
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

  async setStatus(payload: statusPayloadType) {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.status
    try {
      const response = await this.apiServer.post(endUrlName, payload)
      nProgress.done()

      const result = response?.data?.data ? response?.data?.data : {}

      return result
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getIdentificationTypeList() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.identificationType

    try {
      const response = await this.apiServer.get(endUrlName)

      return response
    } catch (err: any) {
      console.log('Error Fetching IdentificationType List ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }

  async getCountryData() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.country
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
    const endUrlName = this.baseUrl + apiEndPoints.document
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
    const endUrlName = `${this.baseUrl + apiEndPoints.state}/${countryCode}`
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
    const endUrlName = `${this.baseUrl + apiEndPoints.uploadFileUrl}?filename=${param.filename}&filetype=${
      param.filetype
    }&studentCode=${param.studentCode}`

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

      // eslint-disable-next-line no-unsafe-finally
      return response
    }
  }

  async getFileUrl(fileName: string, studentCode: string | undefined) {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.getFileUrl
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
    const endUrlName = this.baseUrl + apiEndPoints.documentType
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
    const endUrlName = this.baseUrl + apiEndPoints.gender
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
    const endUrlName = this.baseUrl + apiEndPoints.nationality
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
    const endUrlName = this.baseUrl + apiEndPoints.nationalityStatus
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
    const endUrlName = this.baseUrl + apiEndPoints.race
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
    const endUrlName = this.baseUrl + apiEndPoints.language
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
    const endUrlName = this.baseUrl + apiEndPoints.studentType
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
    const endUrlName = this.baseUrl + apiEndPoints.studyMode
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response?.data?.data ? response?.data?.data : null
    } catch (err: any) {
      console.log('Error fetching Study Mode detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getIndustryDetails() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.industry
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
    const endUrlName = this.baseUrl + apiEndPoints.currency
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
  async getQueryType() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.queryType
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching query type ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getQueryStatus() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.queryStatus
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching query status ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getFileLink(fileName: any, studentCode: any) {
    const url = `${this.baseUrl}common/document?filename=${fileName}&studentCode=${studentCode}`
    const response = await this.apiServer.get(url)

    return response?.data?.data ? response?.data?.data : null
  }

  async getFileSignUrl(fileName: any, filetype: any, studentCode: any) {
    const url = `${this.baseUrl}common/document/upload?filename=${fileName}&filetype=${filetype}&&studentCode=${studentCode}`
    const response = await this.apiServer.get(url)

    return response?.data?.data ? response?.data?.data : null
  }

  async DocumentType() {
    const url = `${this.baseUrl}${apiEndPoints?.commonDocuments}?projectDocument=false`
    const response = await this.apiServer.get(url)

    return response?.data?.data ? response?.data?.data : null
  }

  async DocumentCode() {
    const url = `${this.baseUrl}${apiEndPoints?.documentCode}`
    const response = await this.apiServer.get(url)

    return response?.data?.data ? response?.data?.data : null
  }

  async uploadDocumentToAws(url: any, files: any, setUploadPercent: any) {
    const response = await axios.put(url, files, {
      onUploadProgress: setUploadPercent
    })

    return response ? response : null
  }
}
