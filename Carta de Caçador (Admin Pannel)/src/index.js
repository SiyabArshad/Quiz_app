import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseAuthContext from "./firebaseauthContext"
ReactDOM.render(
  <FirebaseAuthContext>
      <App />
  </FirebaseAuthContext>
,
  document.getElementById('root')
);
