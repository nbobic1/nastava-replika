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
import Loading from './Loading';
import axios from 'axios';
import { HOST } from '@/app/consts';
import { Quickreply } from '@mui/icons-material';

const Qusetion = ({question,bodovi,setBodovi}) => {
  const [bod, setBod] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctOption, setCorrectOption] = useState('');
const [text, setText] = useState('');
  const handleAddQuestion = () => {
    // Implement logic to add the question, options, and correct answers
    var isCorrect=false
    if(question.type===0)
    isCorrect=question.correctAnswers===text
   else  if(question.type===2)
    {
        isCorrect=arraysHaveSameItems(question.correctAnswers,correctAnswers)
    }
    else isCorrect=question.correctAnswers===correctOption
    
    var type=question.type
    console.log('da',{
        bodovi:bod,
        correctAnswers:type===2?correctAnswers:type===1?correctOption:text,
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
    setOptions(['']);
    setCorrectAnswers([]);
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
    
    const [open, setOpen] = useState(false);
    

    return(
        <div className='flex min-h-[1080px]  w-full place-content-start pt-20 ' style={{display: 'block'}}>
        <Loading open={open}/> 
         
      
       
        <p>{question.question}</p>
      {/* ovo ovdje je multiple question predtavlja */}
        {question.type===2&&
      <Container maxWidth="sm" >
       
      <form>
       
        {question.options.map((option, index) => (
          <FormGroup key={index}>
           <p>{option}</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={correctAnswers.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  color="primary"
                />
              }
            />
          </FormGroup>
        ))}
      </form>
    </Container>}

  {/* ovdje se nalazi single question*/}
  { question.type===1&&
  <Container maxWidth="sm" >
      <form>
       
       
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="correctOption"
            name="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            {options.map((_, index) => (
                <div className='flex flex-row'>
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={`Option ${index + 1}`}
              /> <p>{option}</p>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <br/>
      
      </form>
    </Container>
}


    {/* ovaj dio predstavlja dopunjavanje pitanje */}
    {question.type===0&&
    <Container maxWidth="sm"  >
    
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
    <Button 
          className='my-6 bg-slate-700'
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
        >
          Predaj Pitanje
        </Button>
      </div>
        </div>
    )
}
function arraysHaveSameItems(arr1, arr2) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Convert the arrays to Sets
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // Check if the Sets have the same size and all items in set1 are in set2
  if (set1.size !== set2.size) {
    return false;
  }

  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  return true;
}
export default Qusetion;