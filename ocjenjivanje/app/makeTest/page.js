'use client'
import React from 'react';
import { useState ,useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button, Grid ,TextField } from '@mui/material';
import axios from 'axios';
import { HOST } from '../consts';
import Loading from '../src/components/Loading';
import InputLabel from '@mui/material/InputLabel';
import { FormControl, FormLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
          collectionName:'tests',
          data:{
            groups:groups,
            qnum:pickedG,
            ...formData
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
const [open, setOpen] = useState(false);
const [groups, setGroups] = useState([]);
const [questionNum, setQuestionNum] = useState([]);
const [pickedG, setPickedG] = useState([]);
    useEffect(()=>{
      setOpen(true)
    axios.post(HOST+'/read', {
      collectionName:'grupe'
    },{ headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
    }})
    .then(function (response) {
     setOpen(false)
     var dd=response.data.filter(item=>item.idNastavnika===localStorage.getItem('id'))
     var prom=[]
      axios.post(HOST+'/read', {
          collectionName:'questions'
        },{ headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
        }})
        .then(function (response) { 
          var arg=new Array(dd.length).fill(0)
          for(var i =0;i<dd.length;i++)
          {
           arg[i]=response.data.filter(item4=>item4.grupa===dd[i]._id).length
          }
          setQuestionNum(arg)
          setGroups(dd)
          var ttt=dd.length
          setPickedG(new Array(ttt).fill(0))
          console.log('eee',dd,arg,new Array(ttt).fill(0))
          setOpen(false)
        }).catch(()=>{
          console.log('kdsfjdsa')
        })
    
    })
    .catch(function (error) {
      console.log(error);
      setOpen(false)
    });
     
     },[]);
  return (
    <div className='flex min-h-[1080px] items-center justify-center' >
      <Loading open={open}></Loading>
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Napravite novi test
            </Typography>
            <form>
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
            <p className='mt-5'>Odaberi broj pitanja po grupama</p>
         {
          questionNum.map((item,index)=>{
              return (
                <FormControl fullWidth className='my-3'>
          <InputLabel id="demo-simple-select-label">{groups[index].grupa}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pickedG[index]}
              label="Grupa"
              onChange={(e)=>{
                console.log('dfsdf',pickedG[index])
               setPickedG(pickedG.map((eee,indexa)=>{
                  if(indexa===index)
                  {  console.log('adf',index,indexa)
               
                    return e.target.value
                  }
                  else 
                  { 
                    console.log('adf',indexa)
                    return eee
                  }
                }))
              }}
            >
              {console.log('eejre',item)}
               {
                Array.from({ length:(item+1) }, (_, indexc) => indexc).map(item1=>
                {return   <MenuItem value={item1}>{item1}</MenuItem>
                })
              }
              
            </Select>
          </FormControl>
              )
          })
         }
         <Button   className='mx-auto bg-slate-700'
          variant="contained"
          color="primary"
          onClick={handleSubmit}>Napravi test</Button>
        </Container>
    </div>
  );
}

export default MakeGroup;