import Link from 'next/link'
import { CheckCircle, ArrowRight, Brain, Zap, Shield, Clock, Infinity } from 'lucide-react'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  // Verify payment with Stripe and immediately unlock access — don't wait for webhook
  const sessionId = searchParams.session_id
  if (sessionId) {
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
      const userId = stripeSession.metadata?.user_id

      if (stripeSession.payment_status === 'paid' && userId) {
        const supabase = createAdminClient()
        await supabase
          .from('profiles')
          .update({
            has_paid: true,
            stripe_payment_intent_id: stripeSession.payment_intent as string,
            payment_date: new Date().toISOString(),
          })
          .eq('id', userId)
      }
    } catch {
      // If Stripe verification fails, webhook will still fire as a backup
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg text-slate-900">Open EMDR</span>
          </Link>
        </div>
      </header>

      {/* Step indicator — all done */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-400 line-through">Create account</span>
            </div>
            <div className="flex-1 h-px bg-green-200 max-w-[60px]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-400 line-through">Complete purchase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-8">

        {/* Success icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">You're in. Let's heal.</h1>
            <p className="text-slate-500 text-lg">
              Your lifetime access is active — starting right now.
            </p>
          </div>
        </div>

        {/* What was unlocked */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left space-y-4">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
            What you unlocked
          </p>
          {[
            { icon: Infinity, text: 'Unlimited EMDR sessions — use it as often as you need' },
            { icon: Shield, text: 'All trauma protocols: PTSD, grief, anxiety, phobias & more' },
            { icon: Clock, text: 'Before/after distress tracking to measure your progress' },
            { icon: Zap, text: 'Access on any device, any time — yours forever' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-slate-700 text-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-purple-600" />
              </div>
              {text}
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-8 rounded-xl transition text-base"
        >
          <Brain className="w-5 h-5" />
          Start Your First Session
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-slate-400 text-xs">
          A receipt has been sent to your email by Stripe.
        </p>
      </div>
    </div>
  )
}
