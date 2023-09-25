import {useState,useEffect } from "react";
import axios from "axios";
import { HOST } from "@/app/consts";
import Qusetion from "./Question";
const Test =({})=>{
    
    const [questions, setQuestions] = useState([]);
useEffect(()=>{
    //setOpen(true)
    axios.post(HOST+'/read', {
      collectionName:'questions'
    },{ headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
    }})
    .then(function (response) {
      console.log('response',response);
    
      setQuestions(response.data)
     // setOpen(false)
    })
    .catch(function (error) {
      console.log(error);
     // setOpen(false)
    });
},[]);
return (
    <>{
questions.map(question=><Qusetion question={question}></Qusetion>)
}</>

);
};

export default Test;