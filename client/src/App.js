import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  // console.log(isLoggedIn);
  // let [loggedIn, setLoggedIn] = useState(false);
  // if(localStorage.getItem("userId") != null) {
  //   setLoggedIn(true);
  // }
  // useEffect(() => {
  //   if(localStorage.getItem("userId") != null) {
  //     setLoggedIn(true);
  //   }
  // }, [])
  return (
    <React.Fragment>

      <header>
        <Header />
      </header>


      <main>
        <Routes>
          {/* <Route path = "/auth" element = {<Auth/>} />
          <Route path = "/blogs" element = {<Blogs/>} />
          <Route path = "/blogs/add" element = {<AddBlog/>} />
          <Route path = "/myBlogs" element = {<UserBlogs/>} />
          <Route path = "/myBlogs/:id" element = {<BlogDetail/>} /> */}
          {!isLoggedIn ? (
            <>
              {/* <Route path="/*" element={<Navigate to="/auth"/>} /> */}
              <Route path="/auth" element={<Auth/>} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
            </>
          )}
        </Routes>
      </main>


    </React.Fragment>
  );
}

export default App;
