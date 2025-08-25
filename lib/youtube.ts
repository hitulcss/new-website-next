
export function getYouTubeId(url: string | null): string | null {
  if (!url) return null;

  try {
    // Handle direct ID case
    if (url.length === 11 && !url.includes('/') && !url.includes('=')) {
      return url;
    }

    // Handle standard URLs
    const standardMatch = url.match(
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    );
    if (standardMatch?.[2]?.length === 11) return standardMatch[2];

    // Handle youtu.be short links
    const shortMatch = url.match(/youtu.be\/([^#&?]*)/);
    if (shortMatch?.[1]?.length === 11) return shortMatch[1];

    // Handle embed links
    const embedMatch = url.match(/embed\/([^#&?]*)/);
    if (embedMatch?.[1]?.length === 11) return embedMatch[1];

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Handle /embed/:id
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1];
    }

    // Handle youtu.be/:id
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    }

    // Handle watch?v=ID
    if (parsed.searchParams.has('v')) {
      return parsed.searchParams.get('v');
    }

    return null;
  } catch (e) {
    return null;
  }
}
