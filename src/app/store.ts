import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

//@ts-ignore
window.store = store;

//types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//typed hooks
export * from './hooks';
