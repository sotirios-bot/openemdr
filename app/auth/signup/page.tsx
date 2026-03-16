'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, Eye, EyeOff, CheckCircle, ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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
      router.push('/checkout')
      router.refresh()
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
          <p className="text-slate-500">
            We sent a confirmation link to{' '}
            <strong className="text-slate-700">{email}</strong>.
            Click it to verify your account and continue to payment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg text-slate-900">Open EMDR</span>
          </Link>
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-600 font-medium hover:text-purple-700">
              Log in
            </Link>
          </p>
        </div>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 max-w-sm">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                1
              </div>
              <span className="text-sm font-semibold text-slate-900">Create account</span>
            </div>
            {/* Connector */}
            <div className="flex-1 h-px bg-slate-200 max-w-[60px]" />
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold shrink-0">
                2
              </div>
              <span className="text-sm font-medium text-slate-400">Complete purchase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — value prop */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight mb-3">
                Start your healing journey today
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Create your free account, then complete your one-time purchase to unlock
                unlimited EMDR sessions — forever.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                { title: 'Unlimited sessions', desc: 'Use it as often as you need — daily, weekly, no limits ever' },
                { title: 'All protocols included', desc: 'Trauma, PTSD, grief, anxiety, phobias and more' },
                { title: 'Track your progress', desc: 'Before/after distress scoring with the SUD scale' },
                { title: 'Instant access', desc: 'Start your first session in minutes after payment' },
              ].map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{title}</p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-semibold text-sm">30-day money-back guarantee</p>
                <p className="text-slate-500 text-sm">
                  If you're not satisfied, email us within 30 days for a full refund. No questions asked.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Create your account</h2>
              <p className="text-slate-400 text-sm mb-6">Step 1 of 2 — free, takes 30 seconds</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition text-sm"
                >
                  {loading ? (
                    'Creating account…'
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs pt-1">
                  <Lock className="w-3 h-3" />
                  <span>
                    By continuing you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
                  </span>
                </div>
              </form>
            </div>

            {/* Trust strip */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No credit card until step 2</span>
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Secured by Stripe</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
