import ReactLoading from "react-loading"
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import {getFirestore} from "firebase/firestore"
import { getStorage,ref,getDownloadURL,uploadBytesResumable ,deleteObject } from "firebase/storage"
import { collection,  doc,addDoc,getDocs,getDoc,serverTimestamp } from "firebase/firestore"; 
import app from "../firebase.js"
import Navigation from "./Navigation"
import { useHistory } from 'react-router-dom';
const Input = styled('input')({
  display: 'none',
});
const storage=getStorage(app)
export default function Addquestions() {
  const[ddbtn,setddbtn]=React.useState(false)
  const history =useHistory()
  const[file1,setfile1]=React.useState('')
  const[img,setimg]=React.useState('')
  const[question,setquestion]=React.useState("")
const[option1,setoption1]=React.useState("")
const[option2,setoption2]=React.useState("")
const[option3,setoption3]=React.useState("")
const[option4,setoption4]=React.useState("")
const[option5,setoption5]=React.useState("")
const[option,setoption]=React.useState("")
const [preview,setpreview]=React.useState('')
const[options,setoptions]=React.useState([])
const[mesage,setmessage]=React.useState(false)
const[loading,setloading]=React.useState(false)
const [open, setOpen] = React.useState(true);
const [statuserr, setstatuserr] = React.useState(true);
const [clicked, setclicked] = React.useState(false);
const[err,seterr]=React.useState("");
const[dms,setdms]=React.useState(false)
const[catg,setcatg]=React.useState("ICNF")
const db = getFirestore(app);
let[num,setnum]=React.useState(0)
let[num1,setnum1]=React.useState(0)
const[dpotions,setdpoptions]=React.useState([]);
const questionsform=()=>{
    if(question!="")
    {
      getDocs(collection(db, "questions")).then((querySnapshot) =>{       
        querySnapshot.forEach((documentSnapshot)=>{
          if(documentSnapshot.data().question===question)
            {
                setnum(num++)
                setdpoptions(documentSnapshot.data().options)
            }
            //start 
            //end
            
        });
    //pcode
      if(num==0)
  {
    options.push(option1)
    options.push(option2)
    options.push(option3)
    options.push(option4)
    options.push(option5)
    let newoptions1=[...new Set(options)]
    let newoptions=newoptions1.filter(element => {
      return element !== '';
    });
    if(newoptions.includes(option))
   {
    dataupload(question,newoptions,option,catg)
   }
   else
   {
    setstatuserr(false)
    setmessage(true)
    seterr("Question not Saved! The correct answer does not match any given option")
    setTimeout(() => {
      setdms(true)
    }, 2000);
    setdms(false)
   }
  }
  else{
    //
    options.push(option1)
    options.push(option2)
    options.push(option3)
    options.push(option4)
    options.push(option5)
    let newoptions1=[...new Set(options)]
    let newoptions=newoptions1.filter(element => {
      return element !== '';
    });
    for(let i=0;i<newoptions.length;i++)
    {
      if(dpotions.includes(newoptions[i]))
      {
        setnum1(num1++)
        setstatuserr(false)
        setmessage(true)
        seterr("Question Already Present in the database")
        setTimeout(() => {
          setdms(true)
          }, 2000);
        setdms(false)
        return false
      }
    }
    if(newoptions.includes(option)&&num1===0)
   {
    dataupload(question,newoptions,option,catg)
   }
   else
   {
    setstatuserr(false)
    setmessage(true)
    seterr("Question not Saved! The correct answer does not match any given option")
    setTimeout(() => {
      setdms(true)
    }, 2000);
    setdms(false)
   }
    //
/*

    setstatuserr(false)
    setmessage(true)
    seterr("Question Already Present in the database")
    setTimeout(() => {
      setdms(true)
    }, 2000);
    setdms(false)
 */
  }
    //endpcode
        
    }).catch((error)=>{
        console.log(error);
    });
           
       
    }    
    else
    {
      setstatuserr(false)
        setmessage(true)
        seterr("Form has missing filled")
        setTimeout(() => {
          setdms(true)
        }, 2000);
        setdms(false)
      }
    
}
const dataupload=(question,options,option,catg)=>{
  try{
    if(!file1)
    {
      const docRef = addDoc(collection(db, "questions"), {
        question:question,
        options:options,
        option:option,
        category:catg,
        img:img,
        timestamp:serverTimestamp(),
        
      }).then(()=>{
        setstatuserr(true)
        setmessage(true)
        seterr("Question Added")
            setloading(false)
            setTimeout(() => {
              window.location.reload(true)
            }, 2000);
            setdms(false)
      });   
    }
    else if(file1.size>1e+6)
    {
      setstatuserr(false)
      setmessage(true)
      seterr("Image Size greater than 1mb")
      setTimeout(() => {
        setdms(true)
      }, 2000);
      setdms(false)
    }
    else{
      setloading(true)
      const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, 'questions/' + file1.name);
    const uploadTask = uploadBytesResumable(storageRef, file1, metadata);
    uploadTask.on('state_changed',
  (snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
  }, 
  (error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      setmessage(true)
      seterr("something went wrong"+error.code)
      setloading(false)
      setTimeout(() => {
        setdms(true)
      }, 2000);
      setdms(false)
      // User doesn't have permission to access the object
      break;
    case 'storage/canceled':
      setmessage(true)
      seterr("something went wrong")
      setloading(false)
      setTimeout(() => {
        setdms(true)
      }, 2000);
      setdms(false)
      // User canceled the upload
      break;
  
    // ...
  
    case 'storage/unknown':
      setmessage(true)
      seterr("something went wrong")
      // Unknown error occurred, inspect error.serverResponse
      setloading(false)
      setTimeout(() => {
        setdms(true)
      }, 2000);
      setdms(false)
      break;
  
  }
  }, 
  () => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    setimg(downloadURL)
    const docRef = addDoc(collection(db, "questions"), {
      question:question,
      options:options,
      option:option,
      category:catg,
      img:img||downloadURL,
      timestamp:serverTimestamp()
      
    }).then(()=>{
      setstatuserr(true)
      setmessage(true)
      seterr("Question Added")
          setloading(false)
        setTimeout(() => {
          window.location.reload(true)
        }, 2000);
        });
    
  });
  }
  );
      } 
}
catch(e)
{
  setstatuserr(false)
  setmessage(true)
  seterr("Something went wrong server error try again")
  setTimeout(() => {
    window.location.reload(true)
  },2000);
}
}
    const deletebutton=()=>{
setfile1("")
setimg("")
setpreview("")
    }
    return (
      <>
      <Navigation></Navigation>
    {!loading?<div style={{ width: '100%',padding:"1rem" }}>
      <Typography variant="h6" gutterBottom>
      CC Question form
      </Typography>
      {
          mesage&&
      <Box sx={{ display:dms&&"none" }}  className="isc" >
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
          {err}.
        </Alert>
      </Collapse>
    </Box>
      }
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="question"
            name="Question"
            label="Enter your question here"
            fullWidth
            autoComplete="Enter Question"
            variant="standard"
            onChange={(e)=>setquestion(e.target.value)}
            color={"success"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="optionA"
            name="OptionA"
            label="OptionA"
            fullWidth
            autoComplete="Enter Question "
            variant="standard"
            onChange={(e)=>setoption1(e.target.value)}
            color={"success"}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          color={"success"}

            required
            id="optionB"
            name="OptionB"
            label="OptionB"
            fullWidth
            autoComplete="Enter Question "
            variant="standard"
            onChange={(e)=>setoption2(e.target.value)}
          />
                  </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          color={"success"}

            required
            id="optionC"
            name="OptionC"
            label="OptionC"
            fullWidth
            autoComplete="Enter Question"
            variant="standard"
            onChange={(e)=>setoption3(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          color={"success"}

            required
            id="optionD"
            name="OptionD"
            label="OptionD"
            fullWidth
            autoComplete="Enter Question"
            variant="standard"
            onChange={(e)=>setoption4(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          color={"success"}

            required
            id="optionE"
            name="OptionE"
            label="OptionE"
            fullWidth
            autoComplete="Enter Question"
            variant="standard"
            onChange={(e)=>setoption5(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          color={"success"}

            required
            id="CorrectOption"
            name="CorrectOption"
            label="CorrectOption"
            fullWidth
            autoComplete="Enter Question Exam App"
            variant="standard"
            onChange={(e)=>setoption(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          color={"success"}

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={catg}
          onChange={(e)=>setcatg(e.target.value)}
          label="Category"
        >
          <MenuItem value="ICNF">ICNF</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file"  onChange={(e)=>{
          setfile1(e.target.files[0])
          const objurl=URL.createObjectURL(e.target.files[0])
          setpreview(objurl)
          e.target.value=""
        }} type="file" />
        <IconButton style={{color:"#548a3e"}} aria-label="upload picture" component="span">
          <PhotoCamera/>
        </IconButton>
      </label>
        <Button  variant="contained" onClick={deletebutton} component="span" style={{backgroundColor:"red",display:preview==""&&"none"}}>
          Delete
        </Button>       
    </Stack>
    
</Grid>

        <Grid item xs={12} sm={6}>
        <Button onClick={questionsform}  variant="contained" style={{backgroundColor:"#548a3e"}}>
                    Save Question
        </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{display:preview==""&&"none"}}>
<img src={preview} style={{height:"200px",width:"200px",backgroundPosition:"cover"}}></img>
        </Grid>
      </Grid>
    </div>:<div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <ReactLoading type="bubbles" color="#548a3e" height="100px" width="100px" />
      </div>
 }   </>
  );
}