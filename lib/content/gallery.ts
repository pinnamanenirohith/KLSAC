// Maps a gallery folder slug -> number of photos in public/gallery/<slug>/
// Update counts whenever new photos are added.
export const GALLERY_COUNTS: Record<string, number> = {
  'dance':            10,
  'music':            19,
  'photography':       5,
  'short-film':       37,
  'fashion':          16,
  'arts':            100,
  'literature':      143,
  'marathon':          6,
  'independence-day': 29,
};

// Maps club slug -> gallery folder slug
export const CLUB_GALLERY: Record<string, string> = {
  'dance-club':           'dance',
  'swara-music-club':     'music',
  'photography-club':     'photography',
  'short-film-makers-club': 'short-film',
  'vastraa-fashion-club': 'fashion',
  'arts-painting-club':   'arts',
  'vachas-club':          'literature',
  'marathon-club':        'marathon',
};

// Returns the first N photo URLs for a given gallery slug.
export function getGalleryPhotos(gallerySlug: string, max = 8): string[] {
  const count = Math.min(GALLERY_COUNTS[gallerySlug] ?? 0, max);
  return Array.from({ length: count }, (_, i) =>
    `/gallery/${gallerySlug}/${String(i + 1).padStart(2, '0')}.jpg`,
  );
}

// Returns gallery photos for a club by its slug.
export function getClubGalleryPhotos(clubSlug: string, max = 8): string[] {
  const gallerySlug = CLUB_GALLERY[clubSlug];
  if (!gallerySlug) return [];
  return getGalleryPhotos(gallerySlug, max);
}
