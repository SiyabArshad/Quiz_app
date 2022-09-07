import ReactLoading from "react-loading"
import "./style.css"
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {getFirestore,doc, deleteDoc,orderBy,onSnapshot} from "firebase/firestore"
import { collection,  getDocs,query } from "firebase/firestore"; 
import app from "../firebase.js"
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom";
import Navigation from "./Navigation"
export default function Questions() {
  const[loading,setloading]=React.useState(false)
  const [open, setOpen] = React.useState(true);
  const [ubtn, setubtn] = React.useState(false);
  const[mesage,setmessage]=React.useState(false)
  const [statuserr, setstatuserr] = React.useState(true);
  const[err,seterr]=React.useState("");
  const[dbquestions,setdbquestions]=React.useState([])
  const db = getFirestore(app);
  const readingdata=()=>{
    setloading(true)
    const q=query(collection(db, "questions"),orderBy('timestamp','desc'))
    getDocs(q).then((res)=>{
      const quests=res.docs.map(doc=>({
        data:doc.data(),
        id:doc.id
      }))
      setdbquestions(quests)
      setloading(false)
    }).catch((e)=>{
      setstatuserr(false)
      setmessage(true)
        seterr("Server issue")
        setloading(false)
      console.log("error")
    })
}
React.useEffect(()=>{
  readingdata()
},[])
  const handleDelete =async (id) => {
  try{
    await deleteDoc(doc(db, "questions", id));
    setstatuserr(true)
    setmessage(true)
    seterr("Deleted Successfully")
    window.alert("Question Deleted!")
    setTimeout(() => {
      window.location.reload(true)
    },2000);
  }
  catch(e){
    setstatuserr(false)
    setmessage(true)
    seterr("Deletion failed")
    setTimeout(() => {
      window.location.reload(true)
    },2000);
  }
  };
  return (
    <div style={{overflow:"hidden"}}>
    <Navigation></Navigation>
   {!loading?<div style={{ width: '100%',padding:"1rem",display:ubtn&&"none" }} >
    <h2 style={{margin:"1rem 0rem",fontSize:"1.2rem",fontWeight:"500",fontFamily:"sans-serif"}}>CC Questions</h2>
    {
          mesage&&
      <Box  className="isc">
      <Collapse in={open} >
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
      <div style={{overflowX:"auto"}}>
     <table className="mntbl">
       <thead>
        <th>no</th>
        <th>Question</th>
        <th>Category</th>
        <th>Edit</th>
        <th>Delete</th>
       </thead>
       <tbody>
         {
           dbquestions.map((v,i)=>{
              return(
                <tr key={i}>
           <td>{i+1}</td>
           <td className="desx">{v.data.question}</td>
           <td className="desx">{v.data.category}</td>
           <td><Link className="link"  to={`updatequestion/${v.id}`}><button className="update">
             Edit
           </button>
           </Link>
           </td>
           <td><button onClick={()=>handleDelete(v.id)} className="delete">
             Delete
           </button></td>
            </tr>
              )
             })
         }
       </tbody>
     </table>
</div>
    </div>:<div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <ReactLoading type="bubbles" color="#548a3e" height="100px" width="100px" />
      </div>
   }</div>    
  );
}
