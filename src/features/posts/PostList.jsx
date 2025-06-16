import { useSelector } from "react-redux";
import { selectPostSliceState } from "./postSlice";
import PostItem from "./PostItem";

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
        sortedPosts.map((post) => <PostItem post={post} key={post.id} />)}
    </div>
  );
};

export default PostList;
