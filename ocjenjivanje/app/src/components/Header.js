import Link from 'next/link'
import { Button } from '@mui/material'
const Header =({})=>{
return (
<div className='absolute top-0 left-0 right-0 flex justify-around mt-3'> 
<Link href="/login">
<Button variant="outlined" >Login</Button>
</Link>
         <Link href="/register"><Button variant="outlined" >Register</Button></Link>
</div>
);
};

export default Header;