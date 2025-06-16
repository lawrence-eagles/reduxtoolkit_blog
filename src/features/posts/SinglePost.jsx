import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchPostById, selectPostSliceState } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";

const SinglePost = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, singlePostStatus, singlePostError } =
    useSelector(selectPostSliceState);

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
    <div>
      {singlePostStatus === "loading" && <h2>Loading...</h2>}
      {singlePostStatus === "failed" && <p>{singlePostError}</p>}
      {singlePostStatus === "success" && (
        <article>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button type="button" onClick={navigate(`edit/${postid}`)}>
            Edit Post
          </button>
          <button type="button">Delete Post</button>
        </article>
      )}
    </div>
  );
};

export default SinglePost;
