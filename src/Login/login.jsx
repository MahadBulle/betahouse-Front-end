import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Box, Stack, IconButton, Typography, Alert,  Button, Divider, Breadcrumbs, Link } from "@mui/material"
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import jscookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../ContextApi/UserContext';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Betahouse realstate company
      </Link>{'   '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const YupValidate = yup.object({
        email: yup.string().required('Please enter your email address'),
        password: yup.string().required("Please enter your password"),
    
      });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({ resolver: yupResolver(YupValidate) })


//   const handleLogin = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

const usenav = useNavigate()
const {setIsLogin}= useUserContext();
const {mutateAsync,isLoading,isError,error,data:response}= useMutation({
    mutationFn: async (data) => {
        return await axios.post ('https://betahousebackendapi.vercel.app/login',data)

    },
    onError:(err)=>{
        console.log('Error',err)
    }
})


  const handleLogin = (data) => {
   
    // console.log("xogta",data);
    mutateAsync(data).then((res) => {
        // console.log("Login  Accepted",res.data.AccessToken);
        jscookie.set('token',res.data.AccessToken);
        if(res.status === 200){
            setIsLogin(true);
            usenav('/dashboard')
        }
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Betahouse Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
        
                {isError && <Alert severity="error">Incorrect email or password</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus 
                {...register("email")}
              />
               {errors.email ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </Typography>
                ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
               {errors.password ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.password.message}
                  </Typography>
                ) : null}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 8 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
