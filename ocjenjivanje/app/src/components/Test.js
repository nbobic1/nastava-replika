import {useState,useEffect } from "react";
import axios from "axios";
import { HOST } from "@/app/consts";
import Qusetion from "./Question";
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation'
const Test =({})=>{
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [bodovi, setBodovi] = useState(0);
    const [open, setOpen] = useState(false);
    const [kraj, setKraj] = useState(false);


    const predajTest = () => {
      axios.post(HOST+'/add', {
        collectionName:'rezultati',
        data:{
          bodovi:bodovi,
          testId: localStorage.getItem('idtesta'),
          nazivTesta: localStorage.getItem('nazivTesta'),
          username: localStorage.getItem('username')
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
        setOpen(false)
      });
      router.push('/testList')
    }


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
      axios.post(HOST+'/read', {
        collectionName:'tests'
      },{ headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
      }})
      .then(function (response1) {
        var qq=[]
        console.log('respons1e',response1);
      var testID=response1.data.filter(it=>{
       return it._id===localStorage.getItem('idtesta')
      })[0]
      for(var i=0;i<testID.groups.length;i++)
      {
        
        var tempq=response.data.filter(ed=>{return ed.grupa===testID.groups[i]._id})
        console.log('#','dsfaf',tempq)
        
        qq=[...qq,...getRandomItemsFromArray(tempq,testID.qnum[i])]
      }
      console.log('jukajll',testID)
        setQuestions(qq)
       // setOpen(false)
      }) .catch(function (error) {
        console.log(error);
       // setOpen(false)
      });
    })
    .catch(function (error) {
      console.log(error);
     // setOpen(false)
    });
},[]);


return (
    <div className="min-h-[1080px]">
    <>{
        questions.map(question=><Qusetion question={question} bodovi={bodovi} setBodovi={setBodovi}>
          <div>{console.log("KADA se vrati broj bodova iznosi " +bodovi)}</div>
        </Qusetion>)
      }</>
      <Button onClick={predajTest} className='my-5 bg-slate-700'
          variant="contained"
          color="primary"
          >Zavrsi test</Button>
      </div>
      

);
};
function getRandomItemsFromArray(arr, numItems) {
  if (numItems >= arr.length) {
    return arr.slice(); // Return a copy of the entire array
  }

  const shuffled = arr.slice(); // Create a copy of the original array
  let i = arr.length;
  const result = [];

  while (i-- && result.length < numItems) {
    const index = Math.floor((i + 1) * Math.random());
    const item = shuffled[index];
    shuffled[index] = shuffled[i];
    result.push(item);
  }

  return result;
}
export default Test;