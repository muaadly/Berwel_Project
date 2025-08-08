import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Berwel - A Website for Libyan Music',
  description: 'A Website for Libyan Music',
  generator: 'Berwel Music Library',
  openGraph: {
    title: 'Berwel - A Website for Libyan Music',
    description: 'A Website for Libyan Music',
    type: 'website',
    images: [
      {
        url: '/Data/Berwel Data Org/Logoo.png',
        width: 1200,
        height: 630,
        alt: 'Berwel Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berwel - A Website for Libyan Music',
    description: 'A Website for Libyan Music',
    images: ['/Data/Berwel Data Org/Logoo.png'],
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
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
