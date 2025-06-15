import { Route, Routes } from "react-router";
import PostList from "./features/posts/PostList";
import Layout from "./components/Layout";
import AddPost from "./features/posts/AddPost";
import SinglePost from "./features/posts/SinglePost";
import EditPost from "./features/posts/EditPost";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />

          <Route path="post">
            <Route index element={<AddPost />} />
            <Route path=":postid" element={<SinglePost />} />
            <Route path="edit/:postid" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
