import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ArrowRight, Waves, GitBranch, Zap, Users } from "lucide-react"
import { useLenis } from "@/hooks/useLenis"

gsap.registerPlugin(ScrollTrigger)

const FLOW_STAGES = [
  { key: "todo", label: "To do", color: "var(--color-paper-dim)" },
  { key: "progress", label: "In progress", color: "var(--color-progress)" },
  { key: "done", label: "Done", color: "var(--color-done)" },
]

const FEATURES = [
  {
    icon: GitBranch,
    title: "Branch-aware boards",
    body: "Tasks link straight to the PR that closes them, so status updates itself as work ships.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    body: "Keyboard-first everywhere. Create, assign, and move a task without touching the mouse.",
  },
  {
    icon: Users,
    title: "Made for teams",
    body: "See exactly who's holding what, and where things are actually stuck — not just what's overdue.",
  },
]

export default function Landing() {
  useLenis()
  const heroRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const ctx = gsap.context(() => {
      // --- Headline reveal: word-by-word rise on load ---
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll("[data-word]")
        gsap.from(words, {
          opacity: 0,
          y: prefersReducedMotion ? 0 : 24,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.15,
        })
      }

      // --- Flow-line hero: path draws in, nodes pulse along it ---
      if (pathRef.current && !prefersReducedMotion) {
        const length = pathRef.current.getTotalLength()
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          delay: 0.4,
        })

        nodesRef.current.forEach((node, i) => {
          if (!node) return
          gsap.from(node, {
            opacity: 0,
            scale: 0.4,
            duration: 0.5,
            delay: 0.6 + i * 0.35,
            ease: "back.out(2.2)",
          })
        })
      } else {
        nodesRef.current.forEach((node) => node && gsap.set(node, { opacity: 1, scale: 1 }))
      }

      // --- Feature cards: staggered scroll reveal ---
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll("[data-feature]")
        gsap.from(cards, {
          opacity: 0,
          y: prefersReducedMotion ? 0 : 32,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="bg-ink text-paper">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-flow" />
            <span className="font-display text-sm font-medium">TaskFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm text-paper-dim transition-colors hover:text-paper"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-flow px-4 py-2 text-sm font-medium text-paper shadow-[0_0_0_1px_rgba(108,92,231,0.4)] transition-colors hover:bg-flow-dim"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            ref={headlineRef}
            className="font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl"
          >
            <span data-word className="inline-block">Work</span>{" "}
            <span data-word className="inline-block">that</span>{" "}
            <span data-word className="inline-block text-flow">moves</span>{" "}
            <span data-word className="inline-block">as</span>{" "}
            <span data-word className="inline-block">fast</span>
            <br />
            <span data-word className="inline-block">as</span>{" "}
            <span data-word className="inline-block">your</span>{" "}
            <span data-word className="inline-block">team</span>{" "}
            <span data-word className="inline-block">does.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-paper-dim sm:text-lg">
            TaskFlow tracks every task as it moves from idea to done —
            no stale boards, no status meetings, just a board that stays honest.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/register"
              className="group flex items-center gap-2 rounded-lg bg-flow px-5 py-2.5 text-sm font-medium text-paper shadow-[0_0_0_1px_rgba(108,92,231,0.4)] transition-colors hover:bg-flow-dim"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-ink-line px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-raised"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Signature flow-line animation */}
        <div className="relative mx-auto mt-20 max-w-3xl">
          <svg
            viewBox="0 0 720 160"
            className="w-full"
            role="img"
            aria-label="Diagram showing a task moving through to-do, in-progress, and done stages"
          >
            <path
              ref={pathRef}
              d="M 60 120 C 200 120, 220 40, 360 40 C 500 40, 520 120, 660 120"
              fill="none"
              stroke="var(--color-ink-line)"
              strokeWidth="2"
            />
          </svg>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 sm:px-10">
            {FLOW_STAGES.map((stage, i) => (
              <div
                key={stage.key}
                ref={(el) => {
                  nodesRef.current[i] = el
                }}
                className="flex flex-col items-center gap-2"
                style={{ marginTop: i === 1 ? "-4.5rem" : "0.5rem" }}
              >
                <div
                  className="h-3 w-3 rounded-full ring-4 ring-ink"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="font-mono text-xs text-paper-dim">{stage.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="border-t border-ink-line px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Everything a small team actually needs.
            </h2>
            <p className="mt-3 text-paper-dim">
              No workflow automation you'll never configure. No permissions matrix.
              Just a board your team will actually keep updated.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                data-feature
                className="rounded-xl border border-ink-line bg-ink-raised p-6 transition-colors hover:border-flow/40"
              >
                <feature.icon className="h-5 w-5 text-flow" />
                <h3 className="mt-4 font-display text-base font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm text-paper-dim">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-line px-6 py-24 text-center">
        <h2 className="font-display text-2xl font-medium sm:text-3xl">
          Set up your board in under a minute.
        </h2>
        <Link
          to="/register"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-flow px-5 py-2.5 text-sm font-medium text-paper shadow-[0_0_0_1px_rgba(108,92,231,0.4)] transition-colors hover:bg-flow-dim"
        >
          Create your workspace
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t border-ink-line px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-paper-dim">
          <span>TaskFlow</span>
          <span>Built for teams that ship.</span>
        </div>
      </footer>
    </div>
  )
}
