import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ 
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '🎲 Ludo Star 2.0 - Play Now!',
  description: 'Beautiful Ludo board game with anonymous play, AI opponents, and stunning animations. No signup required!',
  keywords: 'ludo, board game, multiplayer, online game, ludo star',
  authors: [{ name: 'Ludo Star Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#1A1A2E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1A1A2E',
              color: '#fff',
              border: '2px solid #FFD700',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
            },
            success: {
              iconTheme: {
                primary: '#06FFA5',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#E63946',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
