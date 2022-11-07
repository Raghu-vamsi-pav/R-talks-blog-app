import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import {heroku} from "../credentials.js";
import {GoogleAPI, GoogleLogin} from "react-google-oauth";




const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const successResponseGoogle = () => {
  //   console.log("Hi");
  // }

  // const failureResponseGoogle = () => {
  //   console.log("Failed");
  // }

  const oAuthButton = (
    //   <GoogleAPI
    //   // className="google-login"
    //   clientId="489518891349-o5o24ttupduu4uecp6peics35qbcvkkr.apps.googleusercontent.com"
    //   //onUpdateSigninStatus = {(response) => console.log(response)}
      
    // >
      <div>
        <GoogleLogin 
          googleGetAuthResponse = {(response) => console.log(response)} 
          onLoginSuccess = {async (response) => {
              let tokenId = response.Bc.id_token;
              let data = await axios.post(`http://127.0.0.1:5000/api/user/login-google`, {
                tokenId: tokenId
              }).catch((err) => console.log(err))
              localStorage.setItem("userId", data.user._id);
            }
          }

          onLoginFailure = {(err) => console.log(err)}
          />
      </div>
    // </GoogleAPI>
  )

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://r-talks.herokuapp.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs.name);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => {
          console.log(data.user);
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: 'black', borderRadius: 10, marginTop: 2 }}
          >
            Submit
          </Button>
          {oAuthButton}
          <Button
            variant="contained"
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 10, marginTop: 2 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;



// import { Box, Button, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const naviagte = useNavigate();
//   const dispath = useDispatch();
//   const [inputs, setInputs] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [isSignup, setIsSignup] = useState(false);
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   const sendRequest = async (type = "login") => {
//     const res = await axios
//       .post(`https://r-talks.herokuapp.com/api/user/${type}`, {
//         name: inputs.name,
//         email: inputs.email,
//         password: inputs.password,
//       })
//       .catch((err) => console.log(err));

//     const data = await res.data;
//     console.log(data);
//     return data;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(inputs);
//     if (isSignup) {
//       sendRequest("signup")
//         .then((data) => localStorage.setItem("userId", data.user._id))
//         .then(() => dispath(authActions.login()))
//         .then(() => naviagte("/blogs"));
//     } else {
//       sendRequest()
//         .then((data) => localStorage.setItem("userId", data.user._id))
//         .then(() => dispath(authActions.login()))
//         .then(() => naviagte("/blogs"));
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box
//           maxWidth={400}
//           display="flex"
//           flexDirection={"column"}
//           alignItems="center"
//           justifyContent={"center"}
//           boxShadow="10px 10px 20px #ccc"
//           padding={3}
//           margin="auto"
//           marginTop={5}
//           borderRadius={5}
//         >
//           <Typography variant="h2" padding={3} textAlign="center">
//             {isSignup ? "Signup" : "Login"}
//           </Typography>
//           {isSignup && (
//             <TextField
//               name="name"
//               onChange={handleChange}
//               value={inputs.name}
//               placeholder="Name"
//               margin="normal"
//             />
//           )}{" "}
//           <TextField
//             name="email"
//             onChange={handleChange}
//             value={inputs.email}
//             type={"email"}
//             placeholder="Email"
//             margin="normal"
//           />
//           <TextField
//             name="password"
//             onChange={handleChange}
//             value={inputs.password}
//             type={"password"}
//             placeholder="Password"
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             color="warning"
//           >
//             Submit
//           </Button>
//           <Button
//             onClick={() => setIsSignup(!isSignup)}
//             sx={{ borderRadius: 3, marginTop: 3 }}
//           >
//             Change To {isSignup ? "Login" : "Signup"}
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default Auth;