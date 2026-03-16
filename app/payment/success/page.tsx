import Link from 'next/link'
import { CheckCircle, ArrowRight, Brain, Zap, Shield, Clock } from 'lucide-react'
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
    <div className="dark hero-gradient min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">

        {/* Success badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-green-400/15 border-2 border-green-400/40 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white mb-2">You're in. Let's heal.</h1>
            <p className="text-white/60 text-lg">
              Your lifetime access is active — starting right now.
            </p>
          </div>
        </div>

        {/* Quick wins */}
        <div className="glass-card rounded-2xl p-6 text-left space-y-4">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">What you unlocked</p>
          {[
            { icon: Zap, text: 'Unlimited EMDR sessions — use it as often as you need' },
            { icon: Shield, text: 'All trauma protocols: PTSD, grief, anxiety, phobias & more' },
            { icon: Clock, text: 'Before/after distress tracking to measure your progress' },
            { icon: Brain, text: 'Access on any device, any time — yours forever' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 text-white/80 text-sm">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5 text-purple-400" />
              </div>
              {text}
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="btn-primary inline-flex items-center gap-2 text-base"
        >
          <Brain className="w-5 h-5" />
          Start Your First Session
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-white/30 text-xs">
          A receipt has been sent to your email by Stripe.
        </p>
      </div>
    </div>
  )
}
