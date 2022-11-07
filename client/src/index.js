import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/index'
//import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {GoogleAPI, GoogleLogin} from "react-google-oauth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <GoogleOAuthProvider clientId="489518891349-52j0b32hlaadrd14g97n23kqmol6o5ek.apps.googleusercontent.com"> */}
  <GoogleAPI
      // className="google-login"
      clientId="489518891349-o5o24ttupduu4uecp6peics35qbcvkkr.apps.googleusercontent.com"
      //onUpdateSigninStatus = {(response) => console.log(response)}
      
    >
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </GoogleAPI>
  {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
