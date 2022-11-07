import React, {useState} from 'react'
import {AppBar, Toolbar, Typography, Box, Button, Tabs, Tab} from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar 
    position = 'sticky'
    // sx = {{background: "yellow"}}>
    sx = {{background: "linear-gradient(90deg, rgba(13,13,13,1) 0%, rgba(54,52,52,1) 70%, rgba(102,47,47,1) 100%)"}}>
      <Toolbar>
      {/*jpeg - https://ibb.co/bF939DZ https://i.ibb.co/bF939DZ/r-logo.jpg*/}
      {/* png -  https://ibb.co/8mfcLS8 */}
        <Typography variant = "h4">
          {/* <img src = "https://ibb.co/bF939DZ" width="35px"/>  */}
          <img src="https://i.ibb.co/w0jqZrF/R-Hand-Painted.png" alt="r-logo" width="40px"/>
          Talks
        </Typography>


        {isLoggedIn && <Box display = "flex" marginLeft = {"auto"} marginRight = {"auto"}>
          <Tabs value = {value} onChange = {(e,val) => setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" sx = {{color : "#f0ebeb"}} label = "All Blogs"/>
            <Tab LinkComponent={Link} to="/blogs/add" sx = {{color : "#f0ebeb"}} label = "Add Blog"/>
            <Tab LinkComponent={Link} to="/myBlogs" sx = {{color : "#f0ebeb"}} label = "My Blogs"/>
            
            <Tab label = "All Blogs"/>
            <Tab label = "All Blogs"/>
          </Tabs>
        </Box>}


        <Box display = "flex" marginLeft = "auto">
          {!isLoggedIn && <Button LinkComponent={Link} to="/auth" variant = 'contained' sx = {{margin : 1, borderRadius:10}}>
            Login
          </Button>}

          {!isLoggedIn && <Button LinkComponent={Link} to="/auth" variant = 'contained' sx = {{margin : 1, borderRadius:10}}>
            SignUp
          </Button>}

          {isLoggedIn && <Button LinkComponent={Link} to="/auth" variant = 'contained' sx = {{margin : 1, borderRadius:10}}>
            Logout
          </Button>}
          
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header