import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import credentials from "../credentials";


const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  }); 
  // console.log(backend, CLIENT_ID);
  let backend = credentials.backend;
  const handleCallbackResponse = (response) => {
    axios.post(`${backend}/api/user/login-google`, {
      tokenId : response.credential
    }).then(res => {
      console.log(res);
      localStorage.setItem("userId", res.data.user._id);
    }).then(() => dispath(authActions.login()))
    .then(() => naviagte("/blogs"))
    .catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    /*global google*/
    
      google.accounts.id.initialize({
        client_id: credentials.CLIENT_ID,
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signUpBtn"),
        {theme: "outline", size:"large"}
      )
  }, []);

  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`${backend}/api/user/${type}`, {
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
          <div id="signUpBtn" style={{marginTop:"30px auto"}}></div>
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