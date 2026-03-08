'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, CheckCircle, ChevronRight } from 'lucide-react'

type Phase = 'prepare' | 'active' | 'rest' | 'rate' | 'complete'
type Speed = 'slow' | 'medium' | 'fast'

const SPEED_MS: Record<Speed, number> = {
  slow: 2800,
  medium: 1600,
  fast: 900,
}

const SET_DURATION = 30 // seconds per set
const SETS_PER_SESSION = 3

const PROTOCOLS = [
  'Trauma / Distressing Memory',
  'PTSD',
  'Grief & Loss',
  'Anxiety',
  'Depression',
  'Anger',
  'Childhood Trauma',
  'Phobia / Fear',
  'Stress',
  'Low Self-Esteem',
]

function SudScale({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-white/40">
        <span>0 — No distress</span>
        <span>10 — Extreme distress</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[...Array(11)].map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`w-9 h-9 rounded-lg font-semibold text-sm transition-all ${
              value === i
                ? 'bg-purple-600 text-white scale-110'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function EMDRTool() {
  // Session config
  const [protocol, setProtocol] = useState(PROTOCOLS[0])
  const [target, setTarget] = useState('')
  const [speed, setSpeed] = useState<Speed>('medium')

  // Ratings
  const [sudBefore, setSudBefore] = useState(5)
  const [sudAfter, setSudAfter] = useState(5)

  // Session state
  const [phase, setPhase] = useState<Phase>('prepare')
  const [currentSet, setCurrentSet] = useState(1)
  const [timeLeft, setTimeLeft] = useState(SET_DURATION)
  const [isPaused, setIsPaused] = useState(false)

  // Dot animation
  const [dotX, setDotX] = useState(0) // 0 = left, 1 = right
  const posRef = useRef(0)
  const dirRef = useRef(1)
  const rafRef = useRef<number>()
  const lastTimeRef = useRef<number>()

  // ── Dot animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'active' || isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    const speedMs = SPEED_MS[speed]
    lastTimeRef.current = undefined

    const animate = (now: number) => {
      const elapsed = now - (lastTimeRef.current ?? now)
      lastTimeRef.current = now

      posRef.current += (dirRef.current * elapsed) / speedMs
      if (posRef.current >= 1) { posRef.current = 1; dirRef.current = -1 }
      if (posRef.current <= 0) { posRef.current = 0; dirRef.current = 1 }

      setDotX(posRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase, speed, isPaused])

  // ── Countdown timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'active' || isPaused) return
    if (timeLeft <= 0) return

    const id = setTimeout(() => {
      if (timeLeft === 1) {
        if (currentSet < SETS_PER_SESSION) {
          setPhase('rest')
        } else {
          setPhase('rate')
        }
      } else {
        setTimeLeft((t) => t - 1)
      }
    }, 1000)

    return () => clearTimeout(id)
  }, [phase, timeLeft, isPaused, currentSet])

  // ── Helpers ────────────────────────────────────────────────────────────────
  function startSession() {
    posRef.current = 0
    dirRef.current = 1
    setCurrentSet(1)
    setTimeLeft(SET_DURATION)
    setIsPaused(false)
    setPhase('active')
  }

  function startNextSet() {
    posRef.current = 0
    dirRef.current = 1
    setCurrentSet((s) => s + 1)
    setTimeLeft(SET_DURATION)
    setIsPaused(false)
    setPhase('active')
  }

  function resetAll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setPhase('prepare')
    setCurrentSet(1)
    setTimeLeft(SET_DURATION)
    setIsPaused(false)
    setDotX(0)
    posRef.current = 0
    dirRef.current = 1
  }

  // ── Renders ────────────────────────────────────────────────────────────────

  if (phase === 'prepare') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-10 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Set Up Your Session</h2>
          <p className="text-white/50 text-sm">Follow the steps below to prepare for your EMDR session.</p>
        </div>

        {/* Step 1 — Protocol */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Step 1 — Choose a protocol</p>
          <div className="flex flex-wrap gap-2">
            {PROTOCOLS.map((p) => (
              <button
                key={p}
                onClick={() => setProtocol(p)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  protocol === p
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Target */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Step 2 — Describe your target</p>
          <p className="text-white/50 text-sm">Briefly describe the memory, feeling, or event you want to work on.</p>
          <textarea
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g. The car accident in 2019 — feeling of helplessness…"
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Step 3 — SUD rating */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Step 3 — Rate your current distress (SUD)</p>
          <p className="text-white/50 text-sm">When you focus on this memory right now, how distressing is it? (0 = none, 10 = extreme)</p>
          <SudScale value={sudBefore} onChange={setSudBefore} />
        </div>

        {/* Step 4 — Speed */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Step 4 — Choose eye movement speed</p>
          <div className="flex gap-3">
            {(['slow', 'medium', 'fast'] as Speed[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm capitalize transition-all ${
                  speed === s
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 space-y-2 text-sm text-white/70">
          <p className="font-semibold text-white">Before you begin:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Find a quiet, private place where you won't be interrupted.</li>
            <li>Hold the memory gently in mind while following the moving dot with your eyes.</li>
            <li>Let whatever comes, come — don't force it.</li>
            <li>Take a break if you feel overwhelmed — you're in control.</li>
          </ul>
        </div>

        <button
          onClick={startSession}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base"
        >
          Begin EMDR Session
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    )
  }

  if (phase === 'active') {
    const trackWidth = '100%'
    const dotSizePx = 52
    const dotPercent = dotX * 100

    return (
      <div className="flex flex-col items-center justify-between min-h-[calc(100vh-80px)] py-10 px-4">
        <div className="text-center space-y-1">
          <p className="text-purple-400 font-semibold text-sm">
            Set {currentSet} of {SETS_PER_SESSION}
          </p>
          <p className="text-white/50 text-sm">Follow the dot with your eyes only — keep your head still</p>
        </div>

        {/* Dot track */}
        <div className="w-full max-w-4xl">
          <div
            className="relative w-full bg-white/5 rounded-full overflow-hidden"
            style={{ height: 100 }}
          >
            {/* Track line */}
            <div className="absolute inset-y-0 left-6 right-6 flex items-center">
              <div className="w-full h-px bg-white/10" />
            </div>

            {/* Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-none"
              style={{
                left: `calc(${dotPercent}% * (1 - ${dotSizePx}px / 100%))`,
                // Simpler: use left with padding compensation
                left: `calc(${dotPercent * 0.88 + 6}%)`,
                width: dotSizePx,
                height: dotSizePx,
              }}
            >
              <div
                className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-violet-600 shadow-lg animate-pulse-slow"
                style={{ boxShadow: '0 0 30px rgba(124,58,237,0.8), 0 0 60px rgba(124,58,237,0.4)' }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-mono font-bold text-white/80">
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="btn-secondary flex items-center gap-2 px-6 py-3"
            >
              {isPaused ? <><Play className="w-4 h-4" /> Resume</> : <><Pause className="w-4 h-4" /> Pause</>}
            </button>
            <button onClick={resetAll} className="btn-secondary flex items-center gap-2 px-6 py-3">
              <RotateCcw className="w-4 h-4" /> Stop
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'rest') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center space-y-8">
        <div className="glass-card rounded-3xl p-10 max-w-md w-full space-y-6">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest">
            Set {currentSet} complete
          </p>
          <h2 className="text-2xl font-bold">Take a breath</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            What came up for you? Notice any sensations, images, emotions, or thoughts. You don't need to do anything with them — just observe.
          </p>
          <p className="text-white/40 text-sm">
            Set {currentSet + 1} of {SETS_PER_SESSION} when you're ready.
          </p>
          <button onClick={startNextSet} className="btn-primary w-full flex items-center justify-center gap-2">
            Continue to Next Set
            <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={resetAll} className="text-white/30 hover:text-white/60 text-sm transition-colors">
            End session
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'rate') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-center">
            <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-2">Session complete</p>
            <h2 className="text-2xl font-bold">How do you feel now?</h2>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <p className="text-white/50 text-sm">
              When you bring up that same memory now, how distressing is it? (0 = none, 10 = extreme)
            </p>
            <SudScale value={sudAfter} onChange={setSudAfter} />
          </div>

          <button
            onClick={() => setPhase('complete')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            See My Results
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'complete') {
    const diff = sudBefore - sudAfter
    const improved = diff > 0

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-purple-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Session Complete</h2>
            <p className="text-white/50 text-sm">{protocol}</p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-white">{sudBefore}</p>
                <p className="text-white/40 text-xs mt-1">Before</p>
              </div>
              <div className="flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white/20" />
              </div>
              <div>
                <p className={`text-3xl font-black ${improved ? 'text-green-400' : 'text-white'}`}>{sudAfter}</p>
                <p className="text-white/40 text-xs mt-1">After</p>
              </div>
            </div>

            {improved ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <p className="text-green-400 font-semibold text-sm">
                  {diff >= 3 ? '🌟 Significant improvement' : '✓ Noticeable improvement'} — distress reduced by {diff} point{diff !== 1 ? 's' : ''}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  That's real progress. Be gentle with yourself — healing takes time.
                </p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/60 text-sm">
                  Sometimes healing happens beneath the surface. Consider trying again tomorrow, or explore a different protocol.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetAll}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              Start New Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
