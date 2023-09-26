'use client'
import Test from "../src/components/Test";
import { useEffect ,useState} from "react";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import axios from "axios";
import Loading from "../src/components/Loading";
import { useRouter } from 'next/navigation'
import { HOST } from "../consts";
const TestList =({})=>{
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false);
    const [startedTest, setStartedTest] = useState([]);
    const router = useRouter();
    
    
    useEffect(()=>{
        axios.post(HOST+'/read', {
            collectionName:'tests'
          },{ headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }})
          .then(function (response) {
            console.log('response',response)
            setTests(response.data)
            setOpen(false)
          })
          .catch(function (error) {
            console.log(error);
            setOpen(false)
          });
    
    },[]);



    useEffect(()=>{
        axios.post(HOST+'/read', {
            collectionName:'startTest'
          },{ headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }})
          .then(function (response) {
            console.log('response',response);
            setStartedTest(response.data)
            setOpen(false)
          })
          .catch(function (error) {
            console.log(error);
            setOpen(false)
          });
    
    },[]);

    const predjiNaTest = (id, naziv) => {
        console.log("ID je" + id)
        localStorage.setItem('idtesta', id);
        localStorage.setItem('nazivTesta', naziv)

        axios.post(HOST+'/add', {
            collectionName:'startTest',
            data:{
              pokrenuo: 1,
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

        router.push('/Test')
    }


return(
    <div className="w-full min-h-[1080px] p-20">
        <h3 className="text-center p-10 ">Testovi</h3>
    <Loading open={open}/>
    {console.log("FIlter " + tests.filter(item1=> {return startedTest.map(item2 => {return item2.testId !== item1._id})}))}
    {
        tests.filter(item1=> {return startedTest.filter(item2 => {return item2.testId !== item1._id}).length>0}).map(item=>{
            return (
                <Card className="my-3 p-5">
                    <Typography variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Datum: {item.startDate}    Pocetak testa: {item.startTime}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Trajanje testa: {item.duration} minuta
                    </Typography>
                    <Button onClick={() => {predjiNaTest(item._id, item.title)}} variant="outlined" className="font-bold py-2 px-4 rounded">Pristupi testu</Button>
                </Card>
            )
        })
    }
    </div>
);
};

export default TestList;