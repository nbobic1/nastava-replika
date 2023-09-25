'use client'
import {
    TextField,
    Button,
    Typography,
    Container,
    FormControlLabel,
    Checkbox,
    FormGroup,
  } from '@mui/material';
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import React, { useState,useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loading from '../src/components/Loading';
import axios from 'axios';
import { HOST } from '../consts';

const MakeQusetion = () => {
  const [groupe, setGroupe] = useState([]);
  const [group, setGroup] = useState(undefined);
  const [bod, setBod] = useState(0);
  const [negBod, setNegBod] = useState(0);
    const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctOption, setCorrectOption] = useState('');
  const [otvorenMult, setOtvorenMult] = useState(true);
  const [otvorenSignl, setOtvorenSingl] = useState(false);
  const [otvorenDopuni, setOtvorenDopuni] = useState(false);
const [text, setText] = useState('');
  const handleAddQuestion = () => {
    // Implement logic to add the question, options, and correct answers
    setOpen(true) 
    var type=otvorenMult? 2:otvorenSignl?1:0
    console.log({
      bodovi:bod,
      negbodovi:negBod,
      question:question,
      correctAnswers:type===2?correctAnswers:type===1?correctOption:text,
      type:type,
      grupa:group,
      options:options
  })
  if(false)
    axios.post(HOST+'/add', {
        collectionName:'questions',
        data:{
          bodovi:bod,
          negbodovi:negBod,
          question:question,
          correctAnswers:type===2?correctAnswers:type===1?correctOption:text,
          type:type,
          grupa:group,
          options:options
      }
      },{ headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
      }})
      .then(function (response) {
        console.log(response);
        setOpen(false)
        router.push('/login')
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false)
      });
    // Reset the form
    // setQuestion('');
    // setOptions(['']);
    // setCorrectAnswers([]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

    const handleAddOption = () => {
        const updatedOptions = [...options, ''];
        setOptions(updatedOptions);
      };
    
      const handleCheckboxChange = (index) => {
        const updatedCorrectAnswers = [...correctAnswers];
        if (updatedCorrectAnswers.includes(index)) {
          // If the option is already marked as correct, unmark it
          updatedCorrectAnswers.splice(updatedCorrectAnswers.indexOf(index), 1);
        } else {
          // Mark the option as correct
          updatedCorrectAnswers.push(index);
        }
        setCorrectAnswers(updatedCorrectAnswers);
      };
    
      

      const handleMulti = ( ) =>{
        if(!otvorenMult){
          setOtvorenMult(true);
          setOtvorenSingl(false);
          setOtvorenDopuni(false)
        }else{
          setOtvorenMult(false)
        }
      }
      const handleSingle = ( ) =>{
        if(!otvorenSignl){
          setOtvorenSingl(true);
          setOtvorenDopuni(false);
          setOtvorenMult(false);
        }else{
          setOtvorenSingl(false)
        }
      }
      const handleDopuni = ( ) =>{
        if(!otvorenDopuni){
          setOtvorenDopuni(true);
          setOtvorenMult(false)
          setOtvorenSingl(false)
        }else{
          setOtvorenDopuni(false)
        }
      }
     const groupChange=(e) => {
      setGroup(e.target.value)
    };
    const [open, setOpen] = useState(false);
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
      setGroupe(response.data)
    })
    .catch(function (error) {
      console.log(error);
      setOpen(false)
    });
     
     },[]);

    return(
        <div className='flex min-h-[1080px]  w-full place-content-start pt-20 ' style={{display: 'block'}}>
          <div className='flex-row justify-around flex mb-5'>
        <Loading open={open}/> 
            <Button
            className='my-5 bg-slate-700'
            variant="contained"
            color="primary"
            onClick={handleMulti}
            >Dodaj pitanje sa vise tacnih odgovora
            </Button>
            <Button
            className='my-5 bg-slate-700'
            variant="contained"
            color="primary"
            onClick={handleSingle}
            >Dodaj pitanje sa jednim tacnim odgovorom
            </Button>
            <Button
            className='my-5 bg-slate-700'
            variant="contained"
            color="primary"
            onClick={handleDopuni}
            >Dodaj pitanje sa dopunjavanjem
            </Button>
        </div>
      
        <Container maxWidth="sm" >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={group}
              label="Grupa"
              onChange={groupChange}
            >
              {
                console.log('#',groupe)
                }
                {
                
                groupe.map(item=>
                {return   <MenuItem value={item._id}>{item.grupa}</MenuItem>
                })
              }
              
            </Select>
          </FormControl>
        <TextField
          fullWidth
          label="Pitanje"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
        />
         <TextField
          fullWidth
          label="Broj bodova"
          type='number'
          variant="outlined"
          value={bod}
          onChange={(e) => setBod(e.target.value)}
          margin="normal"

/> <TextField
          fullWidth
          label="Broj negativnih bodova"
          variant="outlined"
          type='number'
          value={negBod}
          onChange={(e) => setNegBod(e.target.value)}
          margin="normal"
        />
        </Container>
      {/* ovo ovdje je multiple question predtavlja */}
        {otvorenMult&&
      <Container maxWidth="sm" >
       
      <Typography  gutterBottom>
            Dodaj pitanje sa vise odgovora
      </Typography>
      <form>
       
        {options.map((option, index) => (
          <FormGroup key={index}>
            <TextField
              fullWidth
              label={`Odgovor ${index + 1}`}
              variant="outlined"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={correctAnswers.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  color="primary"
                />
              }
              label="Tacan odgovor"
            />
          </FormGroup>
        ))}
        <Button
          className='my-5 bg-slate-700'
          variant="contained"
          color="primary"
          onClick={handleAddOption}
        >
          Add Option
        </Button>
      </form>
    </Container>}

  {/* ovdje se nalazi single question*/}
  { otvorenSignl&&
  <Container maxWidth="sm" >
      <Typography  gutterBottom>
        Add Single Correct Answer Question
      </Typography>
      <form>
       
        {options.map((option, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Option ${index + 1}`}
            variant="outlined"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            margin="normal"
          />
        ))}
        <FormControl component="fieldset">
          <FormLabel component="legend">Correct Option</FormLabel>
          <RadioGroup
            aria-label="correctOption"
            name="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            {options.map((_, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={`Option ${index + 1}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <br/>
        <Button
          className=' bg-slate-700'
          variant="contained"
          color="primary"
          onClick={handleAddOption}
        >
          Add Option
        </Button>
      </form>
    </Container>
}


    {/* ovaj dio predstavlja dopunjavanje pitanje */}
    {otvorenDopuni&&
    <Container maxWidth="sm"  >
      <Typography  >
            Dodaj pitanje sa vise odgovora
      </Typography>
      <form>
      
         <TextField
          fullWidth
          label="Odgovor na pitanje"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="normal"
        />
      </form>
    </Container>
}
<div className='w-full flex justify-center'>
    <Button disabled={group===undefined}
          className='my-6 bg-slate-700'
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
        >
          Dodaj Pitanje
        </Button>
      </div>
        </div>
    )
}

export default MakeQusetion;