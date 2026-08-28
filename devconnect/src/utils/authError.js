export function getAuthErrorMessage(error) {
  const message = error?.message || String(error || '');
  if (/failed to fetch|fetch failed|network request failed/i.test(message)) {
    return 'The authentication service is unavailable. The Supabase URL or key needs to be updated.';
  }
  return message || 'Something went wrong. Please try again.';
}
