'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import { HOST } from "../consts";
import Loading from "../src/components/Loading";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Rezultati = () => {

    const [rezultati, setRezultati] = useState([]);
    const [open, setOpen] = useState(false);
    const username = localStorage.getItem('username');


    useEffect(()=>{
        axios.post(HOST+'/read', {
            collectionName:'rezultati'
          },{ headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }})
          .then(function (response) {
            console.log('response',response);
            setRezultati(response.data)
            setOpen(false)
          })
          .catch(function (error) {
            console.log(error);
            setOpen(false)
          });
    
    },[]);


    return(
        <div className="w-full min-h-[1080px] p-20 items-center justify-center">
            <Loading open={open}/>
            <Card className="my-3 p-5">
               <>{rezultati.filter(item => {return item.username === username}).map(item1 => {
                    return (
                        <div>
                            <CardContent>
                                <p>Naziv ispita: {item1.nazivTesta}</p>
                            </CardContent>
                            <CardContent>
                                <p>Osvojeni bodovi: {item1.bodovi}</p>
                            </CardContent>
                        </div>
                    )
                })}
                </>
            </Card>
        </div>
    )
}

export default Rezultati;