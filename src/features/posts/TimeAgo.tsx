import { formatDistanceToNow, parseISO } from 'date-fns';

const TimeAgo: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  let timeAgo = '';

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);

    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span className="time-ago">
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
