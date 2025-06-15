import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addPost } from "./postSlice";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSavePostClicked = () => {
    try {
      const newPost = { title, body, userid: nanoid() };
      dispatch(addPost(newPost)).unwrap();
    } catch (error) {
      console.log("error", error.message);
    }

    setTitle("");
    setBody("");
    navigate("/");
  };

  return (
    <form>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="button" onClick={onSavePostClicked}>
        Submit
      </button>
    </form>
  );
};

export default AddPost;
