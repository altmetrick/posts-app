import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PostsList, AddPostForm } from './features/posts';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePost from './features/posts/SinglePost';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path={'post'}>
            <Route index element={<AddPostForm />} />
            <Route path={':postId'} element={<SinglePost />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
