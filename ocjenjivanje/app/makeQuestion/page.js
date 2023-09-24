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
  import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import React, { useState } from 'react';


const MakeQusetion = () => {
    const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctOption, setCorrectOption] = useState('');
  const [otvorenMult, setOtvorenMult] = useState('hidden');
  const [otvorenSignl, setOtvorenSingl] = useState('hidden');
  const [otvorenDopuni, setOtvorenDopuni] = useState('hidden');

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
    
      const handleAddQuestion = () => {
        // Implement logic to add the question, options, and correct answers
        console.log('Question:', question);
        console.log('Options:', options);
        console.log('Correct Answers:', correctAnswers);
        // Reset the form
        setQuestion('');
        setOptions(['']);
        setCorrectAnswers([]);
      };

      const handleMulti = ( ) =>{
        if(otvorenMult==='hidden'){
          setOtvorenMult('visible');
          setOtvorenSingl('hidden');
          setOtvorenDopuni('hidden')
        }else{
          setOtvorenMult('hidden')
        }
      }
      const handleSingle = ( ) =>{
        if(otvorenSignl==='hidden'){
          setOtvorenSingl('visible');
          setOtvorenDopuni('hidden');
          setOtvorenMult('hidden');
        }else{
          setOtvorenSingl('hidden')
        }
      }
      const handleDopuni = ( ) =>{
        if(otvorenDopuni==='hidden'){
          setOtvorenDopuni('visible');
          setOtvorenMult('hidden')
          setOtvorenSingl('hidden')
        }else{
          setOtvorenDopuni('hidden')
        }
      }
      

    return(
        <div className='flex h-screen w-full place-content-start ' style={{display: 'block'}}>
          <div className='flex-row justify-around flex mb-5'>
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

      {/* ovo ovdje je multiple question predtavlja */}
        
      <Container maxWidth="sm"  sx={{ visibility: otvorenMult}}>
      <Typography variant="h4" gutterBottom>
            Dodaj pitanje sa vise odgovora
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Pitanje"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
        />
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
    </Container>

  {/* ovdje se nalazi single question*/}
  <Container maxWidth="sm" sx={{ visibility: otvorenSignl}}>
      <Typography variant="h4" gutterBottom>
        Add Single Correct Answer Question
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
        />
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
            row
            aria-label="correctOption"
            name="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            {options.map((_, index) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                control={<Radio />}
                label={`Option ${index + 1}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </form>
    </Container>



    {/* ovaj dio predstavlja dopunjavanje pitanje */}
    <Container maxWidth="sm"  sx={{ visibility: otvorenDopuni}}>
      <Typography variant="h4" gutterBottom>
            Dodaj pitanje sa vise odgovora
      </Typography>
      <form>
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
          label="Odgovor na pitanje"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
        />
      </form>
    </Container>
    <Button
          className='my-6 bg-slate-700'
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
        >
          Dodaj Pitanje
        </Button>
        </div>
    )
}

export default MakeQusetion;