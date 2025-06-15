import React, { useEffect } from "react";
import { useParams } from "react-router";
import { fetchPostById, selectPostSliceState } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";

const SinglePost = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();

  const { post } = useSelector(selectPostSliceState);

  const fetchPost = (id) => {
    try {
      dispatch(fetchPostById(id)).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPost(postid);
  }, [postid]);

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
};

export default SinglePost;
