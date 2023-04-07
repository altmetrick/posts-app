import PostsList from './PostsList';
import AddPostForm from './AddPostForm';

//types
export interface PostT {
  id: string;
  title: string;
  content: string;
}

//
export * from './postsSlice';

//components
export { PostsList };
export { AddPostForm };
