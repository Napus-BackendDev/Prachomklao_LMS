export function extractYoutubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // แบบ youtu.be/VIDEO_ID
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.replace('/', '');
    }

    // แบบ youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.searchParams.has('v')) {
      return parsedUrl.searchParams.get('v');
    }

    // แบบ embed หรือ shorts
    const match = parsedUrl.pathname.match(/\/(embed|shorts)\/([^/?]+)/);
    return match ? match[2] : null;
  } catch {
    return null;
  }
}
