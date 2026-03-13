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
      <body className="bg-white min-h-screen antialiased">
        {/* Runs before React hydration — clears stale 'theme' key from old site,
            only applies dark if user explicitly chose it via new key */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            localStorage.removeItem('theme');
            if (localStorage.getItem('openemdr-theme') === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch(e) {}
        ` }} />
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}
