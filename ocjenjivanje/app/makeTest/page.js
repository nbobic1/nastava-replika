'use client'
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button, Grid ,TextField } from '@mui/material';
import axios from 'axios';
import { HOST } from '../consts';
const MakeGroup = () => {
    
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        startTime: '',
        duration: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
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
            <Typography variant="h4" gutterBottom>
                Napravite novi test
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        fullWidth
                        label="Naziv ispita"
                        name="title"
                        variant="outlined"
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        fullWidth
                        label="Datum pocetka"
                        name="startDate"
                        variant="outlined"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        fullWidth
                        label="Vrijeme pocetka"
                        name="startTime"
                        variant="outlined"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        inputProps={{
                            step: 900, // 15-minute intervals
                        }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        fullWidth
                        label="Vrijeme trajnja ispita u minutama"
                        name="duration"
                        variant="outlined"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </form>
            <Button
            onClick={handleSubmit}
            className="my-5 bg-slate-700"
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            >
            Dodaj grupu
            </Button>
        </Container>
    </div>
  );
}

export default MakeGroup;