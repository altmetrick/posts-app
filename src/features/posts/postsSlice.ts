import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = [
  { id: '1', userId: '', title: 'Hello World', content: 'Hi everybody, how are you doing!' },
  {
    id: '2',
    userId: '',
    title: 'The weather is nice',
    content: 'Today the weather is very bright and shiny',
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
      });
    },
  },
});

//Selectors
export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
