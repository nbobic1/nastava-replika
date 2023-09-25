
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
const Loading =({open})=>{
return (
<Dialog     
  open={open}
>
    <div className=" overflow-hidden p-10" >
        
    <CircularProgress ></CircularProgress>
    </div>
</Dialog>
);
};

export default Loading;