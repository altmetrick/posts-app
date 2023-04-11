import './App.css';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { PostsList, AddPostForm, SinglePost, EditPostForm } from './features/posts';
import { SingleUser, UsersList } from './features/users';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path={'post'}>
            <Route index element={<AddPostForm />} />
            <Route path={':postId'} element={<SinglePost />} />
            <Route path={'edit/:postId'} element={<EditPostForm />} />
          </Route>

          <Route path={'users'}>
            <Route index element={<UsersList />} />
            <Route path={':userId'} element={<SingleUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
