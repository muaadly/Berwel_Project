import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { RTLProvider } from '@/components/rtl-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.berwel.ly'),
  title: 'Berwel - A Website for Libyan Music',
  description: 'A Website for Libyan Music',
  generator: 'Berwel Music Library',
  openGraph: {
    title: 'Berwel - A Website for Libyan Music',
    description: 'A Website for Libyan Music',
    type: 'website',
    siteName: 'Berwel',
    url: 'https://www.berwel.ly',
    images: [
      {
        url: '/images/Light_Mode_Logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Berwel Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berwel - A Website for Libyan Music',
    description: 'A Website for Libyan Music',
    images: ['/images/Light_Mode_Logo.jpeg'],
    creator: '@berwel_ly',
  },
  icons: {
    icon: '/Data/Berwel Data Org/Logoo.png',
    apple: '/Data/Berwel Data Org/Logoo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/Data/Berwel Data Org/Logoo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Data/Berwel Data Org/Logoo.png" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <RTLProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </RTLProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
