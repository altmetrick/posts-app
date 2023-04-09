import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [
    {
      id: '1asdf',
      userId: '',
      title: 'Hello World',
      body: 'Hi everybody, how are you doing!',
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
      id: '2sdfsd',
      userId: '',
      title: 'The weather is nice',
      body: 'Today the weather is very bright and shiny',
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
        thumbsUp: 1,
        wow: 0,
        heart: 2,
        rocket: 0,
        coffee: 0,
      },
    },
  ],
  status: 'idle',
  error: null,
} as PostsStateT;

//Thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get(POSTS_URL, {
    params: {
      _page: 1,
      _limit: 10,
    },
  });
  return res.data;
});
export const addNewPost = createAsyncThunk('posts/AddNewPost', async (postData: {}) => {
  const res = await axios.post(POSTS_URL, postData);
  return res.data;
});

//

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ title: string; body: string; userId: string }>) => {
      state.posts.push({
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
      const post = state.posts.find((post) => post.id === action.payload.postId);

      if (post) {
        post.reactions[action.payload.reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch Posts
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //Add date and reactions to loaded posts
        let min = 1;
        const transformedPosts = action.payload.map((post: any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(transformedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
    //Add New Post
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts.push({
        ...action.payload,
        date: new Date().toISOString(),
        reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      });
    });
  },
});

//Selectors
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

//Actions
export const { addPost, addReaction } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

//Types
interface PostsStateT {
  posts: Array<PostT>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | SerializedError;
}
export interface PostsReactionsT {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
export interface PostT {
  id: string;
  userId: string;
  date: string;
  title: string;
  body: string;
  reactions: PostsReactionsT;
}
