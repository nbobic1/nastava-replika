'use client'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useEffect,useState } from 'react';
import { usePathname} from 'next/navigation'

const Header =({})=>{
    const [role, setRole] = useState(undefined);
    const router = usePathname()
    useEffect(()=>{
        setRole(localStorage.getItem('role'))
    },[router]);
return (
<div className='absolute top-0 left-0 right-0 flex justify-around mt-3'> 
{
role?
(
role==='professor'?
<>
    <>
        <Link href="/makeQuestion">
            <Button variant="outlined" >Napravi pitanja</Button>
        </Link>  
        <Link href="/makeTest">
            <Button variant="outlined" >Napravi test</Button>
        </Link>  
        <Link href="/makeGroup">
            <Button variant="outlined" >Napravi grupu</Button>
        </Link>
        <Link href="/logout">
            <Button variant="outlined" >Logout</Button>
        </Link>
    </>
</>
:
<>
    <>
        <Link href="/testList">
            <Button variant="outlined" >Test</Button>
        </Link>
        <Link href="/rezultati">
            <Button variant="outlined" >Rezultati</Button>
        </Link>
        <Link href="/logout">
            <Button variant="outlined" >Logout</Button>
        </Link>
    </>
</>
):
(
    <>
        <Link href="/login">
            <Button variant="outlined" >Login</Button>
        </Link>
        <Link href="/register">
            <Button variant="outlined" >Register</Button>
        </Link>
    </>
)
}

</div>
);
};

export default Header;