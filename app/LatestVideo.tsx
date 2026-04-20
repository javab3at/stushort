import VideoPicker from "./VideoPicker";

const CHANNEL_ID = "UCbqvSjdnrbWcQwPNdSGeN0g";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;

const PINNED_IDS = ["pnkgD5Iip2M", "PRvQ15W-waE", "K10OiegurCw"];

export type Video = { id: string; title: string };

async function getLatestVideo(): Promise<Video | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const xml = await res.text();
    const firstEntry = xml.split("<entry>")[1] ?? "";
    const idMatch = firstEntry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = firstEntry.match(/<title>([^<]+)<\/title>/);
    if (!idMatch) return null;
    return {
      id: idMatch[1],
      title: titleMatch?.[1] ?? "Latest video"
    };
  } catch {
    return null;
  }
}

async function getTitleFromOEmbed(id: string): Promise<string> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return "YouTube video";
    const json = (await res.json()) as { title?: string };
    return json.title ?? "YouTube video";
  } catch {
    return "YouTube video";
  }
}

export default async function LatestVideo() {
  const [latest, ...pinned] = await Promise.all([
    getLatestVideo(),
    ...PINNED_IDS.map(async (id) => ({ id, title: await getTitleFromOEmbed(id) }))
  ]);

  const videos: Video[] = [];
  const seen = new Set<string>();
  for (const v of [latest, ...pinned]) {
    if (!v || seen.has(v.id)) continue;
    seen.add(v.id);
    videos.push(v);
  }

  if (videos.length === 0) return null;

  return (
    <section id="video" className="section">
      <h2>Latest on YouTube</h2>
      <VideoPicker videos={videos} channelUrl={CHANNEL_URL} />
    </section>
  );
}
