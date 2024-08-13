import { Card, CardContent, Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { CommonEnums, applicationFeesStatus, feeMode } from '../common/Constants';
import { useForm } from 'react-hook-form';
import { useEffect, useCallback, useState } from 'react';
import { FinalFees } from './components';

const OrderSummeryCard = ({ studyModes, fees, masterData, updateFeeMode, onUploadDocument }: any) => {
  const methods = useForm();
  const { register, watch, setValue, reset, clearErrors } = methods;
  const data = watch('feeModeCode');
  const [isFeeModeSelected, setIsFeeModeSelected] = useState(false);
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  
  const handleFeeModeUpdate = useCallback(() => {
    if (data) {
      updateFeeMode(data);
      setIsFeeModeSelected(true);
    }
  }, [data, updateFeeMode]);

  
  useEffect(() => {
    handleFeeModeUpdate();
  }, [data, handleFeeModeUpdate]);

  
  const isApplicationStatusValid = !applicationFeesStatus.includes(masterData?.applicationData?.status);

  
  const isFeeModeAllowed = isApplicationStatusValid && masterData?.applicationData?.eligibility &&
    !masterData?.applicationData?.eligibility[0]?.accessProgram;

  
  const sortedFees = studyModes?.fees
    ?.filter((item: { feeMode: feeMode; }) => item?.feeMode !== feeMode.APPLICATION && item?.feeMode !== feeMode.TOTAL)
    .sort((a: { feeMode: string; }, b: { feeMode: string; }) => {
      const aStartsWithA = a.feeMode.startsWith('A');
      const bStartsWithA = b.feeMode.startsWith('A');

      return aStartsWithA === bStartsWithA ? 0 : aStartsWithA ? -1 : 1;
    })
    .reverse();

  
  const handleUploadClick = async () => {
    setIsUploadInProgress(true);
    try {
      await onUploadDocument();
    } finally {
      setIsUploadInProgress(false);
    }
  };

  
  const handleCancelClick = () => {
    
    reset();
    clearErrors();
    setIsFeeModeSelected(false);
    setIsUploadInProgress(false); 
  };

  
  useEffect(() => {
    console.log('isUploadInProgress:', isUploadInProgress);
    console.log('isFeeModeSelected:', isFeeModeSelected);
    console.log('Form Values:', methods.getValues());
  }, [isUploadInProgress, isFeeModeSelected]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <Typography variant='h6' mb={5} color='primary'>
              ORDER SUMMARY
            </Typography>

            
            <Grid container spacing={2} mb={5}>
              <Grid item md={6} xs={12}>
                <Typography variant='h6' color='secondary'>
                  Interested Qualification
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                  <strong>{masterData?.feeData?.programName}</strong>
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant='h6' color='secondary'>
                  {fees?.label} ({fees?.amount})
                </Typography>
                <Typography variant='body1'>
                  <strong>{fees?.amount} {fees?.helpText}</strong>
                </Typography>
              </Grid>
            </Grid>

            
            <Grid container spacing={2} mb={5}>
              <Grid item md={6} xs={12}>
                <Typography variant='h6' color='secondary'>
                  Fee Category
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                  <strong>{fees?.label}</strong>
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant='h6' color='secondary'>
                  Study Mode
                </Typography>
                <Typography variant='body1'>
                  <strong>{studyModes?.studyModeCode}</strong> ({studyModes?.helpText})
                </Typography>
              </Grid>
            </Grid>

            
            {isFeeModeAllowed && (
              <Grid item md={12} xs={12}>
                <Typography variant='h6' color='secondary' mb={2}>
                  Fee Mode
                </Typography>
                <FormControl component='fieldset'>
                  <RadioGroup
                    aria-label='fee-mode'
                    {...register('feeModeCode', { required: 'Please select Fee mode' })}
                    row 
                    onChange={(e) => {
                      setValue('feeModeCode', e.target.value);
                      setIsFeeModeSelected(true); 
                    }}
                  >
                    {sortedFees?.map((item: any) => (
                      <Grid item xs={12} sm={6} md={4} key={item?.feeMode} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <FormControlLabel
                          value={item?.feeMode}
                          control={
                            <Radio
                              disabled={
                                item?.feeMode === feeMode?.MONTHLY &&
                                masterData?.applicationData?.status === CommonEnums?.MONTHLY_PAYMENT_REJECT
                              }
                            />
                          }
                          label={
                            <strong>
                              {item?.feeMode}
                              <Typography sx={{ pl: 2 }}>R{item?.fee}</Typography>
                            </strong>
                          }
                        />
                      </Grid>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
          </Grid>

          
          <Grid item md={6} xs={12}>
            <FinalFees masterData={masterData} studyModes={studyModes} fees={fees} />
          </Grid>
        </Grid>

        
        {isFeeModeSelected && (
          <Grid container justifyContent='flex-end' mt={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleUploadClick}
              disabled={isUploadInProgress} 
            >
              Upload Document
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleCancelClick}
              style={{ marginLeft: '16px' }}
            >
              Cancel
            </Button>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderSummeryCard;
