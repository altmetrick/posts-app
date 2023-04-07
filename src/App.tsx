import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PostsList, AddPostForm } from './features/posts';

function App() {
  return (
    <main className="main-container">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
