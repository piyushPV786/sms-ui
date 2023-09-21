import { useEffect, useState } from 'react'
import { status } from 'src/context/common'
import { CommonService } from 'src/service'
import { commonListTypes } from 'src/types/dataTypes'

const UseCustomHook = () => {
  const [language, setLanguage] = useState<commonListTypes[]>([])
  const [nationality, setNationality] = useState<commonListTypes[]>([])
  const [nationalityStatus, setNationalityStatus] = useState<commonListTypes[]>([])
  const [country, setCountry] = useState<commonListTypes[]>([])
  const [gender, setGender] = useState<commonListTypes[]>([])
  const [race, setRace] = useState<commonListTypes[]>([])
  const [studentTypes, setStudentTypes] = useState<commonListTypes[]>([])
  const [studyModes, setStudyModes] = useState<Array<commonListTypes>>([])
  const [industry, setIndustry] = useState<Array<commonListTypes>>([])

  const getCountryData = async () => {
    const response = await CommonService.getCountryData()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setCountry(response.data.data)
    }
  }
  const getLanguage = async () => {
    const response = await CommonService.getLanguage()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setLanguage(response.data.data)
    }
  }
  const getGenderDetails = async () => {
    const response = await CommonService.getGenderList()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setGender(response.data.data)
    }
  }
  const getNationalityData = async () => {
    const response = await CommonService.getNationalityList()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setNationality(response.data.data)
    }
  }
  const getStudyModeData = async () => {
    const response = await CommonService.getStudyMode()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setStudyModes(response.data.data)
    }
  }
  const getStudentTypeData = async () => {
    const response = await CommonService.getStudentType()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setStudentTypes(response.data.data)
    }
  }
  const getNationalityStatus = async () => {
    const response = await CommonService.getNationalityStatus()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setNationalityStatus(response.data.data)
    }
  }
  const getRaceDetails = async () => {
    const response = await CommonService.getRace()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setRace(response.data.data)
    }
  }
  const getIndustryDetail = async () => {
    const response = await CommonService.getIndustryDetails()
    if (response?.status === status.successCode && response?.data?.data?.length) {
      setIndustry(response?.data?.data)
    }
  }

  useEffect(() => {
    getCountryData()
    getLanguage()
    getNationalityData()
    getNationalityStatus()
    getGenderDetails()
    getRaceDetails()
    getStudyModeData()
    getStudentTypeData()
    getIndustryDetail()
  }, [])

  return { language, nationality, nationalityStatus, country, gender, race, studentTypes, studyModes, industry }
}

export default UseCustomHook
