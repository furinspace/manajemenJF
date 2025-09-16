import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manajemen JF',
    short_name: 'Manajemen JF',
    description: 'Sistem manajemen manufaktur lengkap untuk JF Manufacturing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F0F9FF',
    theme_color: '#7DD3FC',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
