'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, Eye, EyeOff, ArrowRight, CheckCircle, Zap, Shield, Clock, Infinity } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const BENEFITS = [
  { icon: Infinity, text: 'Unlimited sessions — no caps, no expiry' },
  { icon: Shield, text: 'All trauma & anxiety protocols included' },
  { icon: Clock, text: 'Track your healing progress over time' },
  { icon: Zap, text: 'Start in under 2 minutes, from anywhere' },
]

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      // Email confirmation is disabled — user is signed in immediately
      router.push('/checkout')
      router.refresh()
      return
    }

    // Email confirmation is required
    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="dark hero-gradient min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center space-y-4">
          <CheckCircle className="w-14 h-14 text-green-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Check your email</h2>
          <p className="text-white/60">
            We sent a confirmation link to <strong className="text-white">{email}</strong>.
            Click it to activate your account and complete your purchase.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="dark hero-gradient min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-10 items-center">

        {/* Left — marketing */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <Brain className="w-7 h-7 text-purple-400" />
            Open EMDR
          </Link>

          <div>
            <h1 className="text-4xl font-black text-white leading-tight mb-3">
              Unlimited healing.<br />
              <span className="gradient-text">One payment. Forever.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Science-backed EMDR therapy from your home. No subscriptions,
              no session limits — just deep, lasting relief.
            </p>
          </div>

          <ul className="space-y-3">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </li>
            ))}
          </ul>

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2.5 text-green-400 text-sm font-semibold">
            <CheckCircle className="w-4 h-4 shrink-0" />
            30-day money-back guarantee
          </div>
        </div>

        {/* Right — signup form */}
        <div className="w-full max-w-sm">
          <div className="glass-card rounded-2xl p-8 space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold text-white">Create your account</h2>
              <p className="text-white/40 text-sm mt-1">Then complete your one-time purchase</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="input-field pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Creating account…' : (
                  <>Continue to Payment <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-center text-white/30 text-xs">
                By signing up you agree to our{' '}
                <Link href="/terms" className="underline hover:text-white/50">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-white/50">Privacy Policy</Link>.
              </p>
            </form>
          </div>

          <p className="text-center text-white/40 text-sm mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
