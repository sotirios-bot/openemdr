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
      <body className="min-h-screen antialiased bg-white">
        {/* Runs before React hydration to apply saved theme without flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');document.body.style.backgroundColor='#08081a'}}catch(e){}` }} />
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}
