import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bayanihan Health Portal',
    short_name: 'Bayanihan',
    description: 'Medical Assistance Finder para sa Pilipino',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0038A8',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
