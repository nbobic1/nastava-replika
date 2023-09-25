'use client'
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { HOST } from '../consts';
import { Co2Sharp } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Loading from '../src/components/Loading';
const Login = () => {
  const { handleSubmit, control } = useForm();
  const router = useRouter()
    const [open, setOpen] = useState(false);
  const onSubmit = (data) => {
setOpen(true)
    axios.post(HOST+'/read', {
      collectionName:'users'
    },{ headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
    }})
    .then(function (response) {
      console.log('response',response);
      if(response.data.filter(item=>item.username===data.email&&item.password===data.password).length>0)
      {
        localStorage.setItem('username', response.data.filter(item=>item.username===data.email&&item.password===data.password)[0].username)
        localStorage.setItem('role',response.data.filter(item=>item.username===data.email&&item.password===data.password)[0].role)
        localStorage.setItem('id', response.data.filter(item=>item.username===data.email&&item.password===data.password)[0]._id)
        if(localStorage.getItem('role') === 'professor'){
          router.push('/makeGroup')
        }
        else {
          router.push('/testList')
        }
      }
      setOpen(false)
    })
    .catch(function (error) {
      console.log(error);
      setOpen(false)
    });
  };
  const blackButtonStyle = {
    backgroundColor: 'black',
    color: 'white', // Optional: Set text color to white for contrast
  };

  return (
   <div >
     <Loading open={open}/> 
<div className='flex h-screen items-center justify-center' >
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          )}
        />
        <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            style={blackButtonStyle}
        >
          Login
        </Button>
      </form>
    </Container>
    </div>
   </div>
   
  );
}

export default Login;