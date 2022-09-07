import ReactLoading from "react-loading"
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import {getFirestore} from "firebase/firestore"
import { collection,  doc,addDoc,getDocs,getDoc,updateDoc } from "firebase/firestore"; 
import app from "../firebase.js"
import Navigation from "./Navigation"
const Input = styled('input')({
  display: 'none',
});
const Quantity = () => {
    const db = getFirestore(app);
    const [open, setOpen] = React.useState(true);
    const [clicked, setclicked] = React.useState(false);
    const[ftpq,setftpq]=React.useState(1)
    const[mesage,setmessage]=React.useState(false)
const[loading,setloading]=React.useState(false)
const[err,seterr]=React.useState("");
const [statuserr, setstatuserr] = React.useState(true);
const getudatedreq=async()=>{
    setloading(true)
        const upDocRef = doc(db, "quantity", "yFcnpi1wTjcE4LZpD9sP");
        const docSnap = await getDoc(upDocRef);  
  if (docSnap.exists()) {
    setftpq(docSnap.data().icnf)
    setloading(false)
  } else {
    setstatuserr(false)
    setmessage(true)
    seterr("Update operation failed no quantity found")
    console.log("No such document!");
    setloading(false)
    setTimeout(() => {
      window.location.reload(true)
    },2000);  
  }}
const updatequantity=async()=>{
    try{
        const upDocRef = doc(db, "quantity","yFcnpi1wTjcE4LZpD9sP");
        await updateDoc(upDocRef, {
            icnf:ftpq,
          });
          setstatuserr(true)
      setmessage(true)
      seterr("No.Questions Updated Sucessfully")
      setclicked(true)
      setTimeout(() => {
        window.location.reload(true)
      },2000);  
    }
      catch(e)
      {
        setstatuserr(false)
      setmessage(true)
      seterr("something went wrong server error try again")
      setTimeout(() => {
        window.location.reload(true)
      },2000);
      }
}
React.useEffect(()=>{
    getudatedreq()
},[])

  return (
    <>
    <Navigation></Navigation>
  {!loading?<div style={{ width: '100%',padding:"1rem" }}>
    <Typography variant="h6" gutterBottom>
    CC Questions number
    </Typography>
    {
        mesage&&
    <Box  className="isc">
    <Collapse in={open}>
      <Alert
      style={{backgroundColor:!statuserr&&"#ff9999"}}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {err}!
      </Alert>
    </Collapse>
  </Box>
    }
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          color={"success"}
          required
          id="ICNF"
          name="ICNF"
          label="ICNF"
          type="number"
          fullWidth
          autoComplete="Enter Question Quantity ICNF"
          variant="standard"
          onChange={(e)=>setftpq(e.target.value)}
          InputProps={{ inputProps: { min: 1, max: 50 } }}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
      <Button disabled={clicked} onClick={updatequantity}  variant="contained" style={{backgroundColor:"#548a3e"}}>
                  Update
      </Button>
      </Grid>
      <Grid  xs={12}>
      <Typography style={{padding:"15px 0px 0px 15px"}} >
      Number of questions for ICNF is <span style={{color:"red"}}>{ftpq}</span>
    </Typography>
    </Grid>
    </Grid>
  </div>:<div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
 <ReactLoading type="bubbles" color="#548a3e" height="100px" width="100px" />
    </div>
}   </>
  )
}

export default Quantity