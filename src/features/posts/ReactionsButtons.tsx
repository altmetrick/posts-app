import { PostT, addReaction, PostsReactionsT } from './postsSlice';
import { useAppDispatch } from '../../app/store';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionsButtons: React.FC<{ post: PostT }> = ({ post }) => {
  const dispatch = useAppDispatch();

  // Object.entries(reactionEmoji) => [ ['thumbsUp', '👍'],...]
  const renderedReactions = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        className="reaction-button"
        onClick={() => {
          dispatch(addReaction({ postId: post.id, reaction: name as keyof PostsReactionsT }));
        }}
      >
        {emoji} {post?.reactions[name as keyof PostsReactionsT]}
      </button>
    );
  });

  return <div>{renderedReactions}</div>;
};

export default ReactionsButtons;
