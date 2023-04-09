import { PostT } from './postsSlice';
import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';

const PostExcerpt: React.FC<{ post: PostT }> = ({ post }) => {
  return (
    <article key={post.id} className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__content">{post.body.substring(0, 60)}...</p>

      <p className="post__info">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <Link to={`post/${post.id}`}>&nbsp; View Post</Link>
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
