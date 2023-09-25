'use client'
import Test from "../src/components/Test";
import { useEffect ,useState} from "react";
import Card from '@mui/material/Card';
import axios from "axios";
import Loading from "../src/components/Loading";
import { HOST } from "../consts";
const TestList =({})=>{
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        axios.post(HOST+'/read', {
            collectionName:'tests'
          },{ headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }})
          .then(function (response) {
            console.log('response',response);
          
            setTests(response.data)
            setOpen(false)
          })
          .catch(function (error) {
            console.log(error);
            setOpen(false)
          });
    
    },[]);
return(
    <div className="w-full min-h-[1080px] p-20">
        <h3 className="text-center p-10 ">Testovi</h3>
    <Loading open={open}/>
    {
        tests.map(item=>{
            return (
                <Card className="my-3 p-5">
                    <p>{item.title}</p>
                </Card>
            )
        })
    }
    </div>
);
};

export default TestList;