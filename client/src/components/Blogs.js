import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import {heroku} from "../credentials.js";
// import {heroku} from "./../../credentials";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`https://r-talks.herokuapp.com/api/blog`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  if(blogs == null) {
    return <div></div>
  } else {
    console.log(blogs);
    return (
      <div>
        {
          blogs.map((blog, index) => (
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.name}
              key = {index}
            />
          ))}
      </div>
    );
  }
 
};

export default Blogs;