'use client'
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button, TextField } from '@mui/material';
import axios from 'axios';
import { HOST } from '../consts';
const Register = () => {
    const [selectedRole, setSelectedRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRoleChange = (event) => {
      setSelectedRole(event.target.value);
    };
    
    const blackButtonStyle = {
        backgroundColor: 'black',
        color: 'white', // Optional: Set text color to white for contrast
      };
    

    const handleSubmit = (event) => {
       
      axios.post(HOST+'/add', {
          collectionName:'users',
          data:{
            username:email.target.value,
            password:password.target.value,
            role:selectedRole
        }
        },{ headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
        }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //event.preventDefault();
      // Handle form submission here
    };
  return (
    <div className='flex h-screen items-center justify-center' >
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register as a {selectedRole === 'student' ? 'Student' : 'Professor'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <RadioGroup value={selectedRole} onChange={handleRoleChange} row>
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel value="professor" control={<Radio />} label="Professor" />
          </RadioGroup>
            <TextField
              onChange = { (e) => {setEmail(e)}}
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
            />        
            <TextField
              onChange = { (e) => {setPassword(e)}}
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
            />
        
        </form>  
        <Button onClick={handleSubmit} variant="contained" color="primary" style={blackButtonStyle} fullWidth>
            Register
          </Button>
      </Paper>
    </Container>
    </div>
  );
}

export default Register;