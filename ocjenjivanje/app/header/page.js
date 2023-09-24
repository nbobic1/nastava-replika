'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import Head from 'next/head'


export default function Header() {
  const router = useRouter()


  return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        ovdke
        <Head>
        <Button variant="outlined" onClick={() => router.push('/login')}>Login</Button>
        <Button variant="outlined" onClick={() => router.push('/register')}>Register</Button>
        </Head>
       
      </div>
  )
}
