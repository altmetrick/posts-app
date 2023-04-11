import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchUsers } from './features/users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchPosts } from './features/posts';

//Fetching post and users on initial render
// so after reloading with url (like /post/1) it will be shown correctly
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
