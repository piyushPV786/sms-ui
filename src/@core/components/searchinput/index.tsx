import { TextField, FormHelperText } from '@mui/material'
import { Information } from 'mdi-material-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { downloadSuccess } from 'src/context/common'

const SearchBox = ({ handleFilter, style }: { handleFilter: (arg0: string) => void; style?: any }) => {
  const [helperText, setHelperText] = useState<boolean>(false)
  const { register, watch } = useForm()
  useEffect(() => {
    const query: string = watch('search')
    let timeoutId: any = null
    query
      ? query.length > 2
        ? setHelperText(false)
        : setHelperText(true)
      : (handleFilter && handleFilter(''), setHelperText(false))
    timeoutId =
      query?.length > 2
        ? setTimeout(() => {
            handleFilter && handleFilter(query)
          }, 2000)
        : null

    return () => {
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('search')])

  return (
    <React.Fragment>
      <TextField
        {...register('search')}
        size='small'
        placeholder='Search...'
        style={style!}
        sx={{ mr: 2, maxWidth: '280px', width: '100%', '& css-hdw1oc': { float: 'none' } }}
      />
      {helperText ? (
        <FormHelperText sx={{ display: 'flex', alignItems: 'center' }}>
          <Information fontSize='small' /> &nbsp;
          {downloadSuccess.searchErrorMessage}
        </FormHelperText>
      ) : null}
    </React.Fragment>
  )
}

export default SearchBox
