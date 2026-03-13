import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Open EMDR – Heal From Trauma Online',
  description: 'Experience deep, transformative healing from trauma with our guided EMDR therapy tool. Start for free today.',
  keywords: 'EMDR, trauma therapy, online therapy, PTSD, anxiety, bilateral stimulation, healing',
  openGraph: {
    title: 'Open EMDR – Heal From Trauma Online',
    description: 'Experience deep, transformative healing from trauma with our guided EMDR therapy tool.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Runs synchronously before first paint — only honors openemdr-theme key.
          Stale theme=dark from the old site is completely ignored. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.getItem('openemdr-theme') === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch(e) {}
        ` }} />
      </head>
      <body className="bg-white min-h-screen antialiased">
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}
