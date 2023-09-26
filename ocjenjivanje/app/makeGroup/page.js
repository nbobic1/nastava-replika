'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button, Grid ,TextField } from '@mui/material';
import axios from 'axios';
import Loading from '../src/components/Loading';
import { HOST } from '../consts';
const MakeGroup = () => {
    const [grupe, setGrupe] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    useEffect(() => {
        axios.post(HOST+'/read', {
            collectionName:'grupe'
          },{ headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }})
          .then(function (response) {
            console.log('response',response);
            if(response.data.length>0)
            {
              setGrupe(response.data)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    const handleSubmit = (event) => {
        console.log("Form data je " + formData.title)
      setOpen(true);
      axios.post(HOST+'/add', {
          collectionName:'grupe',
          data:{
            grupa: formData.title,
            idNastavnika: localStorage.getItem('id')
        }
        },{ headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
        }})
        .then(function (response) {
          console.log(response);
          setOpen(false)
        })
        .catch(function (error) {
          console.log(error);
        });
      //event.preventDefault();
      // Handle form submission here
    };


  return (
    <div className='flex h-screen items-center justify-center place-content-start' >
      <Loading open={open}></Loading>
        <Container maxWidth="sm" className='place-content-start'>
            <Typography variant="h4" gutterBottom>
                Napravite novu grupu
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        fullWidth
                        label="Naziv grupe"
                        name="title"
                        variant="outlined"
                        value={formData.title}
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