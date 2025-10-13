/**
 * Gets the current time from the server using the date header
 *
 * Don't trust user's configured time to be right, hence query the server - we
 * can afford to be slightly off as long was we're approximately consistent
 *
 * Fall back to user's configured time if none of the APIs can be reached
 */
export const getTime = async (): Promise<Date> => {
  const response = await fetch("/logaze/", { method: "HEAD" });
  const dateString = response.headers.get("Date");
  return dateString ? new Date(dateString) : new Date();
};
