import PostsList from './PostsList';
import AddPostForm from './AddPostForm';

//types
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
  title: string;
  content: string;
  reactions: PostsReactionsT;
}

//
export * from './postsSlice';

//components
export { PostsList };
export { AddPostForm };
