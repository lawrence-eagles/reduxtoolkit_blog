import { useSelector } from "react-redux";
import { selectPostSliceState } from "./postSlice";
import { Link } from "react-router";

const PostList = () => {
  const { posts, status, error } = useSelector(selectPostSliceState);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      {status === "loading" && <h1>Loading...</h1>}
      {status === "failed" && <p>{error}</p>}
      {status === "success" &&
        sortedPosts.map((post) => (
          <Link key={post.id} to={`post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
        ))}
    </div>
  );
};

export default PostList;
