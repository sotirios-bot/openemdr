'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, CheckCircle, ChevronRight, Volume2, VolumeX } from 'lucide-react'

type Phase = 'prepare' | 'focus' | 'active' | 'rest' | 'rate' | 'complete'
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
      <div className="flex justify-between text-xs text-slate-400 dark:text-white/40">
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
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white'
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
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Ratings
  const [sudBefore, setSudBefore] = useState(5)
  const [sudAfter, setSudAfter] = useState(5)

  // Session state
  const [phase, setPhase] = useState<Phase>('prepare')
  const [currentSet, setCurrentSet] = useState(1)
  const [timeLeft, setTimeLeft] = useState(SET_DURATION)
  const [isPaused, setIsPaused] = useState(false)
  const [dotStarted, setDotStarted] = useState(false)

  // Dot animation
  const [dotX, setDotX] = useState(0) // 0 = left, 1 = right
  const posRef = useRef(0)
  const dirRef = useRef(1)
  const rafRef = useRef<number>()
  const lastTimeRef = useRef<number>()

  // Audio
  const audioCtxRef = useRef<AudioContext | null>(null)
  const soundEnabledRef = useRef(true)

  useEffect(() => {
    soundEnabledRef.current = soundEnabled
  }, [soundEnabled])

  function playTone(side: 'left' | 'right') {
    if (!soundEnabledRef.current) return
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = ctx.createStereoPanner()

      osc.connect(gain)
      gain.connect(panner)
      panner.connect(ctx.destination)

      osc.frequency.value = 440
      osc.type = 'sine'
      panner.pan.value = side === 'left' ? -1 : 1

      const now = ctx.currentTime
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.25, now + 0.02)
      gain.gain.linearRampToValueAtTime(0, now + 0.12)

      osc.start(now)
      osc.stop(now + 0.15)
    } catch {
      // AudioContext not available in this environment
    }
  }

  // ── Dot animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'active' || isPaused || !dotStarted) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    const speedMs = SPEED_MS[speed]
    lastTimeRef.current = undefined

    const animate = (now: number) => {
      const elapsed = now - (lastTimeRef.current ?? now)
      lastTimeRef.current = now

      const prevDir = dirRef.current
      posRef.current += (dirRef.current * elapsed) / speedMs

      if (posRef.current >= 1) { posRef.current = 1; dirRef.current = -1 }
      if (posRef.current <= 0) { posRef.current = 0; dirRef.current = 1 }

      // Play tone when direction flips (dot reached an edge)
      // dirRef === -1 → just hit right side; dirRef === 1 → just hit left side
      if (dirRef.current !== prevDir) {
        playTone(dirRef.current === -1 ? 'right' : 'left')
      }

      setDotX(posRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase, speed, isPaused, dotStarted])

  // ── Countdown timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'active' || isPaused || !dotStarted) return
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
  }, [phase, timeLeft, isPaused, currentSet, dotStarted])

  // ── Helpers ────────────────────────────────────────────────────────────────
  function startSession() {
    posRef.current = 0
    dirRef.current = 1
    setCurrentSet(1)
    setTimeLeft(SET_DURATION)
    setIsPaused(false)
    setPhase('focus')
  }

  function beginActive() {
    setDotStarted(false)
    setPhase('active')
  }

  function startNextSet() {
    posRef.current = 0
    dirRef.current = 1
    setCurrentSet((s) => s + 1)
    setTimeLeft(SET_DURATION)
    setIsPaused(false)
    setDotStarted(false)
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
          <p className="text-slate-500 text-sm dark:text-white/50">Follow the steps below to prepare for your EMDR session.</p>
        </div>

        {/* Step 1 — Protocol */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest dark:text-purple-400">Step 1 — Choose a protocol</p>
          <div className="flex flex-wrap gap-2">
            {PROTOCOLS.map((p) => (
              <button
                key={p}
                onClick={() => setProtocol(p)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  protocol === p
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Target */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest dark:text-purple-400">Step 2 — Describe your target</p>
          <p className="text-slate-500 text-sm dark:text-white/50">Briefly describe the memory, feeling, or event you want to work on.</p>
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
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest dark:text-purple-400">Step 3 — Rate your current distress (SUD)</p>
          <p className="text-slate-500 text-sm dark:text-white/50">When you focus on this memory right now, how distressing is it? (0 = none, 10 = extreme)</p>
          <SudScale value={sudBefore} onChange={setSudBefore} />
        </div>

        {/* Step 4 — Speed */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest dark:text-purple-400">Step 4 — Choose eye movement speed</p>
          <div className="flex gap-3">
            {(['slow', 'medium', 'fast'] as Speed[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm capitalize transition-all ${
                  speed === s
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Step 5 — Bilateral sound */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest dark:text-purple-400">Step 5 — Bilateral sound</p>
          <p className="text-slate-500 text-sm dark:text-white/50">
            A soft tone alternates between left and right ears in sync with the dot. Use headphones for the full bilateral effect.
          </p>
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              soundEnabled
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? 'Sound on' : 'Sound off'}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-2 text-sm text-slate-600 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-white/70">
          <p className="font-semibold text-slate-900 dark:text-white">Before you begin:</p>
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

  if (phase === 'focus') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-10">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-center">
            <p className="text-purple-600 font-semibold text-sm uppercase tracking-widest mb-2 dark:text-purple-400">
              Before you begin
            </p>
            <h2 className="text-2xl font-bold">Ground Yourself</h2>
            <p className="text-slate-500 text-sm mt-2 dark:text-white/50">
              Take a moment to connect with your target before the eye movements start.
            </p>
          </div>

          {target && (
            <div className="glass-card rounded-2xl p-5 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 dark:text-white/40">Your target</p>
              <p className="text-slate-700 text-sm italic dark:text-white/80">"{target}"</p>
            </div>
          )}

          <div className="space-y-3">
            {[
              {
                num: '1',
                title: 'Bring the memory to mind',
                body: 'Let the image or memory surface naturally. You don\'t need to analyze it — just notice it.',
              },
              {
                num: '2',
                title: 'Find the negative belief',
                body: 'What does this say about you? (e.g., "I am helpless," "I am not safe," "It was my fault")',
              },
              {
                num: '3',
                title: 'Scan your body',
                body: 'Where do you feel this right now? Chest, stomach, throat? Just notice — don\'t try to change it.',
              },
              {
                num: '4',
                title: 'Hold it all lightly',
                body: 'Keep the memory, belief, and body sensation gently in mind as the dot begins to move.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-4 glass-card rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0 dark:bg-purple-500/20 dark:text-purple-300">
                  {num}
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{title}</p>
                  <p className="text-slate-500 text-sm mt-0.5 dark:text-white/50">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {soundEnabled && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-white/30">
              <Volume2 className="w-3.5 h-3.5" />
              Bilateral sound enabled — headphones recommended
            </div>
          )}

          <button
            onClick={beginActive}
            className="btn-primary w-full flex items-center justify-center gap-2 text-base"
          >
            Start Eye Movements
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={resetAll}
            className="w-full text-center text-slate-400 hover:text-slate-600 text-sm transition-colors dark:text-white/30 dark:hover:text-white/60"
          >
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'active') {
    const dotSizePx = 72
    const dotPercent = dotX * 100

    return (
      <div className="flex flex-col items-center min-h-[calc(100vh-80px)] py-8 px-4 gap-8">

        {/* Visual instructions — top */}
        <div className="flex items-center justify-center gap-8 w-full max-w-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">👁️</div>
            <p className="text-slate-600 dark:text-white/70 text-sm font-medium text-center">Follow<br/>the dot</p>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">🧠</div>
            <p className="text-slate-600 dark:text-white/70 text-sm font-medium text-center">Notice what<br/>comes up</p>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">😮‍💨</div>
            <p className="text-slate-600 dark:text-white/70 text-sm font-medium text-center">Just let<br/>it pass</p>
          </div>
        </div>

        {/* Set info */}
        <div className="text-center space-y-1">
          <p className="text-purple-600 font-semibold text-sm dark:text-purple-400">
            Set {currentSet} of {SETS_PER_SESSION}
          </p>
          <p className="text-slate-500 text-sm dark:text-white/50">Keep your head still · eyes only</p>
        </div>

        {/* Dot track — front and center */}
        <div className="w-full max-w-5xl flex-1 flex items-center">
          <div
            className="relative w-full bg-slate-100 dark:bg-white/5 rounded-3xl overflow-hidden"
            style={{ height: 200 }}
          >
            {/* Track line */}
            <div className="absolute inset-y-0 left-8 right-8 flex items-center">
              <div className="w-full h-px bg-slate-200 dark:bg-white/10" />
            </div>

            {/* Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-none"
              style={{
                left: `calc(${dotPercent * 0.88 + 6}%)`,
                width: dotSizePx,
                height: dotSizePx,
              }}
            >
              <div
                className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-violet-600 shadow-lg animate-pulse-slow"
                style={{ boxShadow: '0 0 40px rgba(124,58,237,0.9), 0 0 80px rgba(124,58,237,0.5)' }}
              />
            </div>
          </div>
        </div>

        {/* Controls / Start button */}
        {!dotStarted ? (
          <div className="flex flex-col items-center gap-3 pb-4">
            <button
              onClick={() => setDotStarted(true)}
              className="btn-primary flex items-center gap-2 px-10 py-4 text-base"
            >
              <Play className="w-5 h-5" /> I&apos;m Ready — Begin
            </button>
            <button onClick={resetAll} className="text-slate-400 hover:text-slate-600 text-sm transition-colors dark:text-white/30 dark:hover:text-white/60">
              Back to setup
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 pb-4">
            <div className="text-4xl font-mono font-bold text-slate-700 dark:text-white/80">
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="btn-secondary flex items-center gap-2 px-6 py-3"
              >
                {isPaused ? <><Play className="w-4 h-4" /> Resume</> : <><Pause className="w-4 h-4" /> Pause</>}
              </button>
              <button
                onClick={() => setSoundEnabled((v) => !v)}
                className="btn-secondary flex items-center gap-2 px-4 py-3"
                title={soundEnabled ? 'Mute sound' : 'Enable sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button onClick={resetAll} className="btn-secondary flex items-center gap-2 px-6 py-3">
                <RotateCcw className="w-4 h-4" /> Stop
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (phase === 'rest') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center space-y-8">
        <div className="glass-card rounded-3xl p-10 max-w-md w-full space-y-6">
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-widest dark:text-purple-400">
            Set {currentSet} complete
          </p>
          <h2 className="text-2xl font-bold">Take a breath</h2>
          <p className="text-slate-600 text-sm leading-relaxed dark:text-white/60">
            What came up for you? Notice any sensations, images, emotions, or thoughts. You don't need to do anything with them — just observe.
          </p>
          <p className="text-slate-400 text-sm dark:text-white/40">
            Set {currentSet + 1} of {SETS_PER_SESSION} when you're ready.
          </p>
          <button onClick={startNextSet} className="btn-primary w-full flex items-center justify-center gap-2">
            Continue to Next Set
            <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={resetAll} className="text-slate-400 hover:text-slate-600 text-sm transition-colors dark:text-white/30 dark:hover:text-white/60">
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
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2 dark:text-green-400">Session complete</p>
            <h2 className="text-2xl font-bold">How do you feel now?</h2>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <p className="text-slate-500 text-sm dark:text-white/50">
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
          <div className="w-20 h-20 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto dark:bg-purple-500/10 dark:border-purple-500/20">
            <CheckCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Session Complete</h2>
            <p className="text-slate-500 text-sm dark:text-white/50">{protocol}</p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{sudBefore}</p>
                <p className="text-slate-400 text-xs mt-1 dark:text-white/40">Before</p>
              </div>
              <div className="flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-slate-300 dark:text-white/20" />
              </div>
              <div>
                <p className={`text-3xl font-black ${improved ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>{sudAfter}</p>
                <p className="text-slate-400 text-xs mt-1 dark:text-white/40">After</p>
              </div>
            </div>

            {improved ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 dark:bg-green-500/10 dark:border-green-500/20">
                <p className="text-green-600 font-semibold text-sm dark:text-green-400">
                  {diff >= 3 ? '🌟 Significant improvement' : '✓ Noticeable improvement'} — distress reduced by {diff} point{diff !== 1 ? 's' : ''}
                </p>
                <p className="text-slate-500 text-xs mt-1 dark:text-white/50">
                  That's real progress. Be gentle with yourself — healing takes time.
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-4 dark:bg-white/5">
                <p className="text-slate-600 text-sm dark:text-white/60">
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
