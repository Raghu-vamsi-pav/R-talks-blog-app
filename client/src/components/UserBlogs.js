import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import credentials from "../credentials";
const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  // console.log(id);
  let backend = credentials.backend;
  const sendRequest = async () => {
    const res = await axios
      .get(`${backend}/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    //console.log(data.userBlogs.blogs);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.userBlogs.blogs));
  }, []);
    console.log(user);
  if(user == null) {
    return <div></div>
  } else {
  return (
    <div>
      {" "}
      {user &&
        user.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
        }
};

export default UserBlogs;
