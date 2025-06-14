import { useSelector } from 'react-redux'
import { selectPostSliceState } from './postSlice';

const PostList = () => {
    const {posts, status, error} = useSelector(selectPostSliceState);
    
  return (
    <div>
      {status === "loading" && (<h1>Loading...</h1>)}
      {status === "failed" && <p>{error}</p>}
      {status === "success" && posts.map(post => (<h2 key={post.id}>{post.title}</h2>))}
    </div>
  )
}

export default PostList
