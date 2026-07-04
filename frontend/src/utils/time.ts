export const getRelativeTime = (
  date: string,
) => {
  const diff =
    Date.now() -
    new Date(date).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";

  if (mins < 60)
    return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24)
    return `${hrs} hr ago`;

  const days = Math.floor(hrs / 24);

  if (days === 1)
    return "Yesterday";

  if (days < 7)
    return `${days} days ago`;

  return new Date(date).toLocaleDateString();
};