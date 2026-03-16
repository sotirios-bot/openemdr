'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Brain, CheckCircle, ArrowRight, Lock, Zap, Shield, Clock, Infinity, Star } from 'lucide-react'

const FEATURES = [
  { icon: Infinity, label: 'Unlimited sessions', sub: 'Use it daily, weekly — no limits ever' },
  { icon: Shield, label: 'All protocols included', sub: 'Trauma, PTSD, grief, anxiety, phobias' },
  { icon: Clock, label: 'Track your progress', sub: 'Before/after distress scoring (SUD scale)' },
  { icon: Zap, label: 'Instant access', sub: 'Start your first session in minutes' },
]

function CheckoutContent() {
  const searchParams = useSearchParams()
  const cancelled = searchParams.get('cancelled')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')

    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const data = await res.json()

    if (!res.ok || !data.url) {
      setError(data.error ?? 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    window.location.href = data.url
  }

  return (
    <div className="dark hero-gradient min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-10 items-center">

        {/* Left — value proposition */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <Brain className="w-7 h-7 text-purple-400" />
            Open EMDR
          </Link>

          <div>
            <h1 className="text-4xl font-black text-white leading-tight mb-3">
              One payment.<br />
              <span className="gradient-text">Unlimited healing.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Most therapy costs $150–$300 per session. Open EMDR gives you
              unlimited sessions for a single one-time payment. No subscriptions. No renewals. Ever.
            </p>
          </div>

          <ul className="space-y-4">
            {FEATURES.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/50 text-sm">{sub}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="glass-card rounded-xl p-4 space-y-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-white/70 text-sm italic">
              "After years of expensive therapy sessions I was skeptical. Three weeks in and
              the flashbacks are almost completely gone."
            </p>
            <p className="text-white/40 text-xs">— Verified customer</p>
          </div>
        </div>

        {/* Right — payment */}
        <div className="w-full max-w-sm">
          <div className="glass-card rounded-2xl p-8 space-y-5">

            {cancelled && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-400 text-sm">
                Payment was cancelled — no charge was made. Ready when you are.
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Price */}
            <div className="text-center border-b border-white/10 pb-5">
              <p className="text-white/40 text-sm mb-2">Open EMDR — Lifetime Access</p>
              <div className="flex items-start justify-center gap-1">
                <span className="text-xl font-bold text-white/50 mt-3">US$</span>
                <span className="text-7xl font-black text-white leading-none">49</span>
              </div>
              <p className="text-white/40 text-sm mt-2">One-time · No subscription · Forever</p>
            </div>

            {/* What's included */}
            <ul className="space-y-2.5">
              {[
                'Unlimited EMDR sessions — forever',
                'All trauma & anxiety protocols',
                'Distress tracking (SUD scale)',
                'Access on any device, anytime',
                '30-day money-back guarantee',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-white/75 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Redirecting to checkout…' : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay $49 — Get Lifetime Access
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-white/30 text-xs flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3" />
              Secured by Stripe · 256-bit encryption
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  )
}
