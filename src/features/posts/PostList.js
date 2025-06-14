import React from 'react'
import { useSelector } from 'react-redux'

const PostList = () => {
    const {posts} = useSelector(state=> state.posts);
    console.log("posts", posts)
    
  return (
    <div>
      
    </div>
  )
}

export default PostList
