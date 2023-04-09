import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';
import { PostT } from './postsSlice';

const PostExcerpt: React.FC<{ post: PostT }> = ({ post }) => {
  return (
    <article key={post.id} className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__content">{post.body.substring(0, 100)}...</p>

      <p className="post__info">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
