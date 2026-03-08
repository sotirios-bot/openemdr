import Link from 'next/link'
import { CheckCircle, ArrowRight, Brain } from 'lucide-react'

export default function PaymentSuccessPage() {
  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">Payment confirmed!</h1>
          <p className="text-white/60 leading-relaxed">
            Welcome to Open EMDR. You now have unlimited lifetime access.
            Your healing journey starts now.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 text-left space-y-3">
          <p className="text-white/40 text-xs uppercase tracking-widest">What's included</p>
          {[
            'Unlimited EMDR sessions, forever',
            'All protocols: Trauma, PTSD, Grief, Anxiety & more',
            'Before/after distress tracking',
            'Access anytime, on any device',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-white/80 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              {item}
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
      </div>
    </div>
  )
}
