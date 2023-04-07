import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts';
import { usersReducer } from '../features/users';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

//@ts-ignore
window.store = store;

//types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//typed hooks
export * from './hooks';
