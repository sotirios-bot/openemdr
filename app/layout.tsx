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
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}` }} />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}
