import { useSelector } from 'react-redux'
import { selectAllPosts } from './postSlice';

const PostList = () => {
    const {posts} = useSelector(selectAllPosts);
    console.log("posts", posts)
    
  return (
    <div>
      {posts.map(post => (<h2 key={post.id}>{post.title}</h2>))}
    </div>
  )
}

export default PostList
