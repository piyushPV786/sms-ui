import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material'
import { DownloadBox } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { AcademicService } from 'src/service'
import { downloadFile } from 'src/utils'
import { successToastBottomRight } from '../common'
import { downloadSuccess } from 'src/context/common'
import { getName } from 'src/utils'

interface ICategory {
  programCode: string | null
  url: string
  courseCode: string | null
}
const ExamTicket = ({ module }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })
  const [open, setOpen] = useState<boolean>(false)
  const [category, setCategory] = useState<ICategory[]>([])
  const auth = useAuth()
  const examTicket = async () => {
    const response = await AcademicService.getExamTicket(auth?.user?.studentCode)
    if (response?.length > 0) {
      setCategory(response)
    }
  }

  useEffect(() => {
    examTicket()
  }, [])

  const getFileName = (url: string) => {
    const urlParts = url?.split('/')
    if (urlParts) {
      return urlParts[urlParts?.length - 1]?.split('?')[0]
    }
  }

  const onSubmit = (data: FieldValues) => {
    const item = category?.find((item: ICategory) => item?.courseCode === data?.courseCode)
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!item?.url) {
      const fileName = getFileName(item?.url)
      !!fileName && downloadFile(item?.url, fileName)
      successToastBottomRight(`${fileName} ${downloadSuccess.download}`)
    }
  }

  return (
    <Grid>
      <Box display='flex' onClick={() => setOpen(true)}>
        <Box display='contents'>
          <DownloadBox />
        </Box>
        <Box pl={1}>Download Exam Ticket</Box>
      </Box>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={(event, reason) => {
          reason !== 'backdropClick' && setOpen(!open)
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            display='flex'
            justifyContent='center'
            fontWeight='bold'
            color={theme => theme.palette.primary.main}
            bgcolor='#c5e3d9'
          >
            Download Exam Ticket
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} px={10} py={5} marginTop={3}>
              <Controller
                name='courseCode'
                control={control}
                rules={{ required: 'Exam Name is Required' }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    key={field.value}
                    options={category}
                    onChange={(_, value) => field.onChange(value?.courseCode)}
                    getOptionLabel={option =>
                      module
                        ? getName(module, option?.courseCode?.toString() as any)
                        : (option?.courseCode?.toString() as any)
                    }
                    isOptionEqualToValue={option => (option as any)?.code === field?.value}
                    value={category?.find(item => item?.courseCode === field?.value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Select Exam'
                        variant='outlined'
                        fullWidth
                        required
                        error={!!errors?.category}
                        helperText={!!errors?.category && `${errors?.category?.message}`}
                        sx={{
                          '& .MuiInputLabel-asterisk': {
                            color: theme => theme.palette.error.main
                          }
                        }}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Download
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default ExamTicket
