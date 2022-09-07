import React,{useEffect,useState} from "react";
import Questions from "./components/Questions";
import Addquestions from "./components/Addquestions";
import Createuser from "./components/Createuser";
import Login from "./components/Login";
import ProtectedRoute from "./Protectedroute";
import Update from "./components/Update"
import Quantity from "./components/Quantity";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  
  return (
    <>
<BrowserRouter>
    <Switch>
    <ProtectedRoute redirectTo="/login" exact path="/">
    <Questions></Questions>
    </ProtectedRoute>
    <ProtectedRoute redirectTo="/login" exact path="/createuser">
    <Createuser></Createuser>
    </ProtectedRoute>
    <ProtectedRoute redirectTo="/login" exact path="/updatequestion/:id">
    <Update></Update>
    </ProtectedRoute>
    <ProtectedRoute redirectTo="/login" exact path="/addquestion">
    <Addquestions></Addquestions>
    </ProtectedRoute>
    <ProtectedRoute redirectTo="/login" exact path="/addquantity">
    <Quantity></Quantity>
    </ProtectedRoute>
    <Route exact path= {"/login"} component={(Login)} /> 
      </Switch>
  </BrowserRouter>
    </>
  );
}

export default App;
