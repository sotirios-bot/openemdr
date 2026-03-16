'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Brain, CheckCircle, ArrowRight, Lock, ShieldCheck,
  Infinity, Zap, Clock, Star, AlertTriangle
} from 'lucide-react'

const FEATURES = [
  { icon: Infinity, title: 'Unlimited sessions', desc: 'Use it daily, weekly — no caps, no expiry, ever' },
  { icon: Zap, title: 'All protocols included', desc: 'Trauma, PTSD, grief, anxiety, phobias & more' },
  { icon: Clock, title: 'Track your progress', desc: 'Before & after distress scores (SUD scale) every session' },
  { icon: Brain, title: 'Access anywhere, forever', desc: 'Any device, any time — this is yours for life' },
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
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg text-slate-900">Open EMDR</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5" />
            Secured by Stripe
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 max-w-sm">
            {/* Step 1 — done */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-500 line-through">Create account</span>
            </div>
            {/* Connector */}
            <div className="flex-1 h-px bg-purple-200 max-w-[60px]" />
            {/* Step 2 — active */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                2
              </div>
              <span className="text-sm font-semibold text-slate-900">Complete purchase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — what you get */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight mb-3">
                One payment.<br />Unlimited healing — forever.
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Traditional therapy costs $150–$300 per session.
                Open EMDR gives you unlimited sessions for a single one-time payment.
                No subscriptions, no renewals, ever.
              </p>
            </div>

            <ul className="space-y-4">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{title}</p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Testimonial */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "In New York City, a therapist costs $350 an hour. Open EMDR costs a tiny
                fraction of that. In my 1st session, at home on my computer, my anxiety went
                from 9 to 3 out of 10."
              </p>
              <p className="text-slate-400 text-xs">— Roberto E., Registered Nurse, New York</p>
            </div>
          </div>

          {/* Right — order summary + payment */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

              {/* Price header */}
              <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-6 text-white text-center">
                <p className="text-purple-200 text-sm mb-2">Open EMDR — Lifetime Access</p>
                <div className="flex items-start justify-center gap-1">
                  <span className="text-xl font-bold text-purple-200 mt-3">US$</span>
                  <span className="text-6xl font-black text-white leading-none">49</span>
                </div>
                <p className="text-purple-200 text-sm mt-2">One-time · No subscription · Forever</p>
              </div>

              <div className="p-6 space-y-5">

                {cancelled && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2 text-amber-700 text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    Payment was cancelled — no charge was made. Ready when you are.
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* What's included */}
                <ul className="space-y-2.5">
                  {[
                    'Unlimited EMDR sessions — forever',
                    'All trauma & anxiety protocols',
                    'Distress tracking (SUD scale)',
                    'Access on any device, anytime',
                    '30-day money-back guarantee',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-slate-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition text-sm"
                >
                  {loading ? (
                    'Redirecting to checkout…'
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Unlock Lifetime Access — $49
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  Secured by Stripe · 256-bit encryption
                </div>

              </div>
            </div>

            <p className="text-center text-slate-400 text-xs mt-4">
              By purchasing you agree to our{' '}
              <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
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
