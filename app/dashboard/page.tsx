import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Brain, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import EMDRTool from '@/components/EMDRTool'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_paid')
    .eq('id', user.id)
    .single()

  if (!profile?.has_paid) redirect('/checkout')

  return (
    <div className="hero-gradient min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#08081a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-white">Open EMDR</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm hidden sm:block">{user.email}</span>
            <form action="/auth/signout" method="POST">
              <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <EMDRTool />
    </div>
  )
}
