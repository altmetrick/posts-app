import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    userId: '',
    title: 'Hello World',
    content: 'Hi everybody, how are you doing!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    userId: '',
    title: 'The weather is nice',
    content: 'Today the weather is very bright and shiny',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ title: string; content: string; userId: string }>) => {
      state.push({
        ...action.payload,
        id: nanoid(),
        date: new Date().toISOString(),
      });
    },
  },
});

//Selectors
export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
