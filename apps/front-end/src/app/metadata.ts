// src/app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'من قرآن می‌خوانم',
  description: 'قرآت روزانه ۵۰ آیه از قرآن کریم',
  applicationName: 'من قرآن می‌خوانم',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'من قرآن می‌خوانم',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    title: 'من قرآن می‌خوانم',
    description: 'قرآت روزانه ۵۰ آیه از قرآن کریم',
    url: process.env.NEXT_PUBLIC_BASE_URL
      ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
      : undefined,
    images: [
      {
        url: process.env.NEXT_PUBLIC_BASE_URL
          ? new URL(
              `${process.env.NEXT_PUBLIC_BASE_URL}/icons/android/android-launchericon-192-192.png`
            )
          : '',
        width: 192,
        height: 192,
        alt: 'Android Launcher Icon',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icons/android/android-launchericon-48-48.png',
        type: 'image/png',
        sizes: '48x48',
      },
      {
        url: '/icons/android/android-launchericon-72-72.png',
        type: 'image/png',
        sizes: '72x72',
      },
      {
        url: '/icons/android/android-launchericon-96-96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/icons/android/android-launchericon-144-144.png',
        type: 'image/png',
        sizes: '144x144',
      },
      {
        url: '/icons/android/android-launchericon-192-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/icons/android/android-launchericon-512-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: [
      { url: '/icons/ios/180.png', sizes: '180x180' },
      { url: '/icons/ios/152.png', sizes: '152x152' },
      { url: '/icons/ios/167.png', sizes: '167x167' },
      { url: '/icons/ios/192.png', sizes: '192x192' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
  },
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : undefined,
};

export const viewport = {
  themeColor: '#ffffff',
};
