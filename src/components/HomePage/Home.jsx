import { Alert, Box, Breadcrumbs, Button, Grid, Stack, TextField,Link ,Typography  } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostQuery, GetQuery } from '../../../Shared/ReactQuery';
import { getAll,AddData  } from '../../../Shared/apiCRUD';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // get data
  useEffect(() => {
    const HSett = async () => {
      const {data} = await getAll('/homesetting');
  
      setValue('Title', data[0]?.Title);
      setValue('name', data[0]?.name);
      setValue('location', data[0]?.location);
      setValue('logo', data[0]?.logo);
      setValue('Complaint_Email', data[0]?.Complaint_Email);
      setValue('email', data[0]?.email);
      setValue('Complaint_Phone', data[0]?.Complaint_Phone);
      setValue('facebook', data[0]?.facebook);
      setValue('tiktok', data[0]?.tiktok);
      setValue('twitter', data[0]?.twitter);
      setValue('instagram', data[0]?.instagram);
      setValue('HeroTitle', data[0]?.HeroTitle);
      setValue('HeroDescription', data[0]?.HeroDescription);
      setValue('heroImage', data[0]?.heroImage);
      setValue('footerText', data[0]?.footerText);
    };
    HSett();
  }, []);


  // const { mutateAsync } = PostQuery('/homesitting', 'homesitting');
  const AddHomesetting = async (data) => {
    console.log(data);
    try {
      await AddData('/homesetting',data).then(() => {
        toast.success('this data has been updated successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
     {/* breadcrumbs */}

     <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Dashboard
        </Link>

        <Typography color="text.primary">Home setting</Typography>
      </Breadcrumbs>


      {/* end */}
      <Box p={4}>
      <Alert severity="info">Home Setting</Alert>
        <Box component={'form'} onSubmit={handleSubmit(AddHomesetting)}>
          <Box sx={{ width: '400px,' }} mt={2}>
            <Grid container spacing={2}>
              
              <Grid xs={12} md={4} m={2}>
                <TextField label='Title' id='Title' name='Title' {...register('Title')} variant='outlined' size='small' fullWidth/>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField  label='name'  id='name' {...register('name')} variant='outlined' size='small' fullWidth  />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='location'
                  {...register('location')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='logo'
                  {...register('logo')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='Complaint_Email'
                  {...register('Complaint_Email')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='email'
                  {...register('email')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='Complaint_Phone'
                  {...register('Complaint_Phone')}
                  type='number'
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='facebook'
                  {...register('facebook')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='tiktok'
                  {...register('tiktok')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='twitter'
                  {...register('twitter')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='instagram'
                  {...register('instagram')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='HeroTitle'
                  {...register('HeroTitle')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  {...register('HeroDescription')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='heroImage'
                  {...register('heroImage')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField
                  label='footerText'
                  {...register('footerText')}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' size='small' fullWidth>
              {' '}
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;