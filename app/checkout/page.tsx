'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, CheckCircle, ArrowRight, Lock } from 'lucide-react'

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { cancelled?: string }
}) {
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
    <div className="dark hero-gradient min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <Brain className="w-7 h-7 text-purple-400" />
            Open EMDR
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">One step away from healing</h1>
          <p className="text-white/50 text-sm">Pay once. Access forever.</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {searchParams.cancelled && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-400 text-sm mb-4">
              Payment was cancelled. Ready when you are.
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          {/* Price card */}
          <div className="text-center border-b border-white/10 pb-6 mb-6">
            <p className="text-white/40 text-sm mb-1">Open EMDR — Lifetime Access</p>
            <div className="flex items-start justify-center gap-1 mt-2">
              <span className="text-xl font-bold text-white/60 mt-2">US$</span>
              <span className="text-6xl font-black text-white">49</span>
            </div>
            <p className="text-white/40 text-sm mt-1">One-time · No subscription</p>
          </div>

          <ul className="space-y-3 mb-6">
            {[
              'Unlimited EMDR sessions — forever',
              'All trauma protocols included',
              'Distress tracking (SUD scale)',
              'Access on any device, anytime',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
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

          <p className="text-center text-white/30 text-xs mt-3 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secured by Stripe · Money-back guarantee
          </p>
        </div>
      </div>
    </div>
  )
}
