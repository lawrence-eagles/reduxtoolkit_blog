import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectPostById, selectPostSliceState } from "./postSlice";

const SinglePost = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postid)));
  const { editPostStatus } = useSelector(selectPostSliceState);

  const navigate = useNavigate();

  const onDeletePostClick = () => {
    try {
      dispatch(deletePost(Number(postid))).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <button onClick={onDeletePostClick} type="button">
            Delete Post
          </button>
        </article>
      )}
    </>
  );
};

export default SinglePost;
