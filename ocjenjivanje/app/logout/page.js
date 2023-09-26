'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
const Logout =({})=>{

    const router = useRouter()
    useEffect(()=>{
        localStorage.removeItem('role')
        localStorage.removeItem('username')
        router.push('/login')
    },[]);
    return (<></>)
};

export default Logout;