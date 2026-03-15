import Link from 'next/link'
import {
  Brain,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronDown,
  Star,
  ArrowRight,
  Heart,
  Zap,
  Lock,
  CheckCircle,
} from 'lucide-react'

// ─── Static data ────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      'After experiencing the trauma of my husband\'s death, it was like my brain was glitching out. After 3 sessions of Open EMDR, I slept all night — the first time since his death. I even dreamed!',
    name: 'Patricia S.',
    location: 'Verified Client',
  },
  {
    quote:
      'After a horrific workplace accident, I thought I\'d never be whole again. With Open EMDR, I am more calm, more focused. My panic attacks that happened 5–10 times a day now come around once every couple of months.',
    name: 'Jerid B.',
    location: 'El Paso, TX',
  },
  {
    quote:
      'I had tried regular talk therapy, but it never went deep enough. Open EMDR helped me reach a kernel in my mind that had been unreachable before — and dissolved it. I feel less tense, less fraught.',
    name: 'David S.',
    location: 'Israel',
  },
  {
    quote:
      'I was diagnosed with Complex PTSD from my abusive childhood. After just 5 sessions, it\'s like I\'m fusing together after being shattered. The healing and re-connection to myself is incredible!',
    name: 'Ros W.',
    location: 'London, UK',
  },
  {
    quote:
      'In New York City, a therapist costs $350 an hour. Open EMDR costs a tiny fraction of that. In my 1st session, at home on my computer, my Anxiety went from 9 to 3 out of 10. I could function normally again.',
    name: 'Roberto E.',
    location: 'Registered Nurse, New York',
  },
  {
    quote:
      'I\'ve lived with PTSD flashbacks for over a decade. After just two sessions with Open EMDR, the nightmares stopped. I finally feel present — calm, hopeful, and free from the grip of the past.',
    name: 'Sarah M.',
    location: 'Melbourne, Australia',
  },
]

const differences = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: 'Rapid Results',
    subtitle: 'An immediate sense of calm',
    body:
      'Many clients notice an immediate sense of calm and peace after their very first session. Emotional burdens begin to dissipate, replaced by feelings of clarity and inner peace.',
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-600" />,
    title: 'Effective Healing',
    subtitle: 'Goes straight to the root',
    body:
      'Unlike talk therapy, EMDR reaches deep into your subconscious — where traumatic memories are buried — and uses bilateral stimulation to safely reprocess them.',
  },
  {
    icon: <Lock className="w-6 h-6 text-blue-500" />,
    title: 'Safe & Private',
    subtitle: 'Heal on your own terms',
    body:
      'Work through your trauma in the safety and privacy of your home, on your own schedule. No judgment, no self-consciousness, no appointments required.',
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    title: 'Measurable Difference',
    subtitle: '9 in 10 clients feel improvement',
    body:
      'Based on data from thousands of sessions: 9 in 10 clients report a noticeable improvement in emotional distress after a single session.',
  },
]

const conditions = [
  'Addiction', 'Anxiety', 'Childhood Trauma', 'Depression',
  'Grief', 'PTSD & Trauma', 'Anger', 'Phobias & Fears',
  'Low Self-Esteem', 'Stress',
]

const faqs = [
  {
    q: 'Is EMDR scientifically tested?',
    a: 'Yes. EMDR is recognised by the World Health Organization (WHO), the American Psychological Association (APA), the US Department of Veterans Affairs, and many other medical authorities as an effective treatment for PTSD and trauma.',
  },
  {
    q: 'Why is EMDR so effective?',
    a: 'EMDR uses bilateral stimulation (typically eye movements) to help the brain reprocess traumatic memories that are "stuck." This reaches the root cause of pain rather than just managing symptoms.',
  },
  {
    q: 'Can beginners use Open EMDR?',
    a: 'Absolutely. Open EMDR is designed to be simple and intuitive, even if you\'ve never done EMDR before. Step-by-step instructions guide you through every session.',
  },
  {
    q: 'Is it safe to do EMDR on my own?',
    a: 'Open EMDR uses self-guided protocols designed for use without a therapist. However, if you have severe or complex trauma, we recommend working alongside a licensed therapist. Always take breaks if you feel overwhelmed.',
  },
  {
    q: 'Is this a one-time payment?',
    a: 'Yes. Pay once and get unlimited access to Open EMDR — forever. No subscriptions, no hidden fees.',
  },
]

// ─── Components ─────────────────────────────────────────────────────────────

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

function TestimonialCard({ quote, name, location }: (typeof testimonials)[0]) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col gap-4 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
      <StarRating />
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs">{location}</p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/40 transition-colors">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
        <span className="font-semibold text-slate-900 dark:text-white pr-4">{q}</span>
        <ChevronDown className="w-5 h-5 text-purple-500 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <p className="px-5 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{a}</p>
    </details>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-[#08081a] min-h-screen text-slate-900 dark:text-slate-100">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200 dark:border-white/5 bg-white/90 dark:bg-[#08081a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Open EMDR</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">
              Log in
            </Link>
            <Link href="/auth/signup" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Start Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-4 text-center relative overflow-hidden">
        {/* Subtle background bloom */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-100/70 dark:bg-purple-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-full px-4 py-1.5 text-purple-600 dark:text-purple-400 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Online Eye Movement (EMDR) Therapy
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 tracking-tight text-slate-900 dark:text-white">
            Finally,{' '}
            <span className="gradient-text">Deeper Transformative</span>
            <br />
            Healing from Trauma
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Unlike traditional therapy that treats the surface, EMDR goes deep — to your subconscious mind where trauma is buried.
            Experience profound, lasting relief from the comfort of your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth/signup" className="btn-primary flex items-center gap-2 text-lg">
              Start Healing Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full px-5 py-2.5 text-green-700 dark:text-green-400 text-sm font-bold shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              One-time payment · Unlimited sessions forever
            </div>
          </div>

          {/* Social proof bar */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 10,000+ sessions completed</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 9 in 10 clients feel improvement</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Recognised by WHO & APA</span>
          </div>
        </div>
      </section>

      {/* ── What is EMDR ── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-[#0f0f2a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">What is EMDR?</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
                Therapy that Goes to the{' '}
                <span className="gradient-text">Root of Trauma</span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Maybe you've tried traditional therapies and found they don't go deep enough to produce lasting change.
                  Maybe you've heard about EMDR from a therapist or friend and wondered if it could help.
                </p>
                <p>
                  If you feel powerless to escape from the flashbacks and trauma... if you believe you'll never feel normal or joy or peace again... <strong className="text-slate-900 dark:text-white">let EMDR try.</strong>
                </p>
                <p>
                  EMDR uses bilateral stimulation — a gently moving visual target — to help your brain safely reprocess "stuck" traumatic memories, bringing profound and lasting relief.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 space-y-6 border border-slate-200 dark:border-white/10 shadow-sm">
              {[
                { icon: <Brain className="w-5 h-5 text-purple-600" />, text: 'Reaches the root cause, not just symptoms' },
                { icon: <ShieldCheck className="w-5 h-5 text-green-500" />, text: 'Recognised by WHO, APA & US Veterans Affairs' },
                { icon: <Clock className="w-5 h-5 text-blue-500" />, text: 'Results often felt in the very first session' },
                { icon: <Heart className="w-5 h-5 text-rose-500" />, text: 'Safe, private, and available anytime' },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">{icon}</div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What makes it different ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Why Open EMDR</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">What Makes EMDR Different?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {differences.map((d, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/40 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">{d.icon}</div>
                <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest mb-1">{d.subtitle}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{d.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-[#0f0f2a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Real Client Stories</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Deep Healing, Lasting Results</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Conditions ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Conditions We Address</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-slate-900 dark:text-white">
            Let EMDR Heal Your Pain From:
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {conditions.map((c) => (
              <span key={c} className="bg-white dark:bg-slate-800 px-5 py-2.5 rounded-full text-slate-700 dark:text-slate-300 font-medium text-sm border border-slate-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/40 hover:text-purple-700 dark:hover:text-purple-400 transition-colors cursor-default shadow-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-[#0f0f2a]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl p-10 text-center text-white shadow-xl">
            <p className="text-purple-200 font-semibold text-sm uppercase tracking-widest mb-4">The Data Speaks</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
              9 in 10 Clients
            </h2>
            <p className="text-xl text-purple-100 mb-8">Feel a noticeable improvement after a single session</p>
            <div className="grid sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
              {[
                { stat: '90%', label: 'Report improvement after 1 session' },
                { stat: '60%', label: 'Report significant improvement (3+ points)' },
                { stat: '10k+', label: 'Sessions tracked in our data' },
              ].map(({ stat, label }, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-white">{stat}</p>
                  <p className="text-purple-200 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Simple Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Nothing to Lose — But Your Pain</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10">
            One-time payment. Unlimited sessions. Access forever.
          </p>

          <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full px-5 py-2 text-green-700 dark:text-green-400 text-sm font-bold mb-6">
                <CheckCircle className="w-4 h-4 text-green-500" />
                One-time payment · Unlimited sessions forever
              </div>
              <div className="flex items-start justify-center gap-1">
                <span className="text-2xl font-bold text-slate-400 mt-3">US$</span>
                <span className="text-7xl font-black text-slate-900 dark:text-white">49</span>
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Pay once · Access forever · No subscription</p>
            </div>

            <ul className="space-y-3 text-left mb-8">
              {[
                'Unlimited EMDR sessions — forever',
                'Multiple protocols: Trauma, PTSD, Grief, Anxiety & more',
                'SUD distress tracking before & after each session',
                'Speed controls & session timer',
                'Available anytime, on any device',
                'No appointments, no subscriptions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/auth/signup" className="btn-primary w-full flex items-center justify-center gap-2 text-base">
              Get Lifetime Access
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-4 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Secure payment via Stripe · Money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-[#0f0f2a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
            Yes, You Can Live{' '}
            <span className="gradient-text">Free From Pain</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Even if you have tried everything else and nothing worked — just give Open EMDR a try.
            You <em>can</em> live free from the flashbacks, memories, triggers, and anxiety plaguing you.
          </p>
          <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2 text-lg">
            Start Healing Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-4">Secure checkout · Instant access</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FAQItem key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 dark:border-white/5 py-10 px-4 bg-slate-50 dark:bg-[#0f0f2a]">
        <div className="max-w-5xl mx-auto space-y-6">
          <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed text-center max-w-2xl mx-auto">
            Open EMDR is an online self-guided Eye Movement Desensitization and Reprocessing (EMDR) tool that helps individuals process trauma, anxiety, PTSD, grief, and stress from the comfort of home. Using bilateral stimulation and evidence-based protocols, Open EMDR makes deep psychological healing accessible to everyone — no therapist appointments needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 dark:text-slate-500 text-sm pt-6 border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-slate-600 dark:text-slate-300">Open EMDR</span>
            </div>
            <p>© {new Date().getFullYear()} Open EMDR. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
              <Link href="/auth/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
