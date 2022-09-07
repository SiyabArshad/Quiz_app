import React, {createContext,useState, useEffect} from 'react';
import {getAuth,onAuthStateChanged } from 'firebase/auth';
export const AuthContext= createContext({userPresent:false,user:null})
export default function FirebaseAuthContext(props){
    
   const auth=getAuth()
    let [state,changeState] = useState({
        userDataPresent:false,
        
        user:null,
        listener:null
    })

    useEffect(()=>{
        
        if(state.listener==null){
        
       
        changeState({...state,listener:onAuthStateChanged(auth,(user)=>{
            
           if(user)
            changeState(oldState=>({...oldState,userDataPresent:true,user:user}));
            else
            changeState(oldState=>({...oldState,userDataPresent:true,user:null}));
        })});
        
    }
    return ()=>{
      if(state.listener)
        state.listener()
    }
    
    },[])
  
  
  
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}