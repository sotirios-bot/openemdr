import Link from 'next/link'
import { Brain } from 'lucide-react'
import EMDRTool from '@/components/EMDRTool'

export default function PreviewPage() {
  return (
    <div className="hero-gradient min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 dark:border-white/5 dark:bg-[#08081a]/80">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="font-bold text-slate-900 dark:text-white">Open EMDR</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-yellow-600 text-xs font-semibold bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full dark:text-yellow-400 dark:bg-yellow-400/10 dark:border-yellow-400/20">
              Preview Mode
            </span>
            <Link
              href="/auth/signup"
              className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Lifetime Access — $49
            </Link>
          </div>
        </div>
      </nav>

      <EMDRTool />
    </div>
  )
}
