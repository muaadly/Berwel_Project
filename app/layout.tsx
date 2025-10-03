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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, minimal-ui" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="Berwel" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/Data/Berwel Data Org/Logoo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Data/Berwel Data Org/Logoo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Simple solution: Hide only elements at the very bottom of the screen
            function hideBottomNavigation() {
              // Only run on mobile
              if (window.innerWidth > 768) return;
              
              // Find elements at the bottom of the screen
              const elements = document.querySelectorAll('*');
              elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                // Only hide elements that are at the very bottom (last 100px)
                if (rect.bottom > window.innerHeight - 100 && rect.top < window.innerHeight) {
                  // Check if it contains Arabic navigation text
                  const text = el.textContent || '';
                  if (text.includes('القائمة') || text.includes('الرئيسية') || text.includes('المكتبة') || text.includes('بيانات')) {
                    el.style.display = 'none';
                  }
                }
              });
            }
            
            // Run when page loads
            window.addEventListener('load', hideBottomNavigation);
            // Run after a short delay to catch dynamic elements
            setTimeout(hideBottomNavigation, 2000);
          `
        }} />
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
