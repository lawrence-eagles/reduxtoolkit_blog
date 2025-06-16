import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { selectPostById, updatePost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

const EditPost = () => {
  const { postid } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postid)));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);

  const onEditPostClick = () => {
    const newPost = { id: post.id, title, body, userid: post.userId };
    try {
      dispatch(updatePost(newPost)).unwrap();
      setTitle("");
      setBody("");
      navigate(`/post/${postid}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {post && (
        <form>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <button type="button" onClick={onEditPostClick}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPost;
