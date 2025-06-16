import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPostById, selectPostSliceState } from "./postSlice";

const SinglePost = () => {
  const { postid } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postid)));
  const { editPostStatus } = useSelector(selectPostSliceState);

  const navigate = useNavigate();

  return (
    <>
      {!post && <h2>Post not found</h2>}

      {editPostStatus === "loading" && <h2>Loading...</h2>}

      {editPostStatus !== "loading" && (
        <article>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button
            type="button"
            onClick={() => navigate(`/post/edit/${postid}`)}
          >
            Edit Post
          </button>
          <button type="button">Delete Post</button>
        </article>
      )}
    </>
  );
};

export default SinglePost;
