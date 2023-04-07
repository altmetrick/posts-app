import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { sub } from 'date-fns';
import { PostsReactionsT } from '.';

const initialState = [
  {
    id: '1',
    userId: '',
    title: 'Hello World',
    content: 'Hi everybody, how are you doing!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    userId: '',
    title: 'The weather is nice',
    content: 'Today the weather is very bright and shiny',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 1,
      wow: 0,
      heart: 2,
      rocket: 0,
      coffee: 0,
    },
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
        reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      });
    },
    addReaction: (
      state,
      action: PayloadAction<{ postId: string; reaction: keyof PostsReactionsT }>
    ) => {
      const post = state.find((post) => post.id === action.payload.postId);

      if (post) {
        post.reactions[action.payload.reaction]++;
      }
    },
  },
});

//Selectors
export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost, addReaction } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
