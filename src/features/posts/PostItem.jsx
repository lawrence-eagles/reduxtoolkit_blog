import { Link, useNavigate } from "react-router";
import TimeAgo from "./TimeAgo";

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  return (
    <article>
      <div>
        <Link key={post.id} to={`post/${post.id}`}>
          <h2>{post.title}</h2>
          <TimeAgo timestamp={post.date} />
        </Link>
      </div>

      <div>
        <button type="button" onClick={() => navigate(`/post/${post.id}`)}>
          View
        </button>
        <button type="button" onClick={() => navigate(`/post/edit/${post.id}`)}>
          Edit
        </button>
      </div>
    </article>
  );
};

export default PostItem;
