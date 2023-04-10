import { Link, useParams } from 'react-router-dom';
import { selectPostById } from './postsSlice';
import { useAppSelector } from '../../app/store';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';

const SinglePost = () => {
  const { postId } = useParams();

  let post = null;
  if (postId) {
    post = useAppSelector(selectPostById(postId));
  }

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }

  return (
    <article key={post.id} className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__content">{post.body}</p>

      <p className="post__info">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <Link to={`/post/edit/${post.id}`}> Edit Post</Link>
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default SinglePost;
