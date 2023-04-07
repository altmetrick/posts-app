import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = [
  { id: '1', title: 'Hello World', content: 'Hi everybody, how are you doing!' },
  { id: '2', title: 'The weather is nice', content: 'Today the weather is very bright and shiny' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ title: string; content: string }>) => {
      state.push({
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
      });
    },
  },
});

//Selectors
export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
