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
    // params: {
    //   _page: 1,
    //   _limit: 10,
    // },
  });
  return res.data;
});
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (postData: { userId: string; title: string; body: string }) => {
    const res = await axios.post(POSTS_URL, postData);
    return res.data;
  }
);
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postData: InitialPostDataT) => {
    try {
      const res = await axios.put(`${POSTS_URL}/${postData.id}`, postData);

      return res.data;
    } catch (error) {
      console.log(error);
      //In jsonplaceholder API you can't update posts that you created it will return error 500
      //
      //return error
      return postData;
    }
  }
);
export const deletePost = createAsyncThunk('posts/deletePost', async (postId: string) => {
  const res = await axios.delete(`${POSTS_URL}/${postId}`);
  return { data: res.data, postId };
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
          post.id = post.id.toString();
          post.userId = post.userId.toString();
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
        id: action.payload.id.toString(),
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
    //Update Post
    builder.addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log('Update could not complete');
        console.log(action.payload);
        return;
      }
      state.status = 'succeeded';
      const updatedPost = {
        ...action.payload,
        id: action.payload.id.toString(),
        userId: action.payload.userId.toString(),
        date: new Date().toISOString(),
        reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      };
      const newPosts = state.posts.filter((post) => post.id !== action.payload.id.toString());
      state.posts = [...newPosts, updatedPost];
    });
    //Delete Post
    builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<{ postId: string }>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.postId);
    });
  },
});

//Selectors
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export const selectPostById = (postId: string) => {
  return (state: RootState) => state.posts.posts.find((post) => post.id === postId);
};

//Actions
export const { addPost, addReaction } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

//Types
interface PostsStateT {
  posts: Array<PostT>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | SerializedError;
}
export interface PostT {
  id: string;
  userId: string;
  date: string;
  title: string;
  body: string;
  reactions: PostsReactionsT;
}
export interface InitialPostDataT {
  id: string;
  userId: string;
  title: string;
  body: string;
}
export interface PostsReactionsT {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
