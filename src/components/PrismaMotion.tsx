import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { type ReactNode, useMemo, useRef } from 'react'

type WordsPullUpProps = {
  text: string
  className?: string
  showAsterisk?: boolean
}

type WordsPullUpMultiStyleSegment = {
  text: string
  className?: string
}

type WordsPullUpMultiStyleProps = {
  segments: WordsPullUpMultiStyleSegment[]
  className?: string
}

type AnimatedLetterProps = {
  letter: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}

export function WordsPullUp({ text, className, showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.8 })
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text])

  return (
    <span ref={ref} className={['inline-flex flex-wrap justify-center', className].filter(Boolean).join(' ')}>
      {words.map((word, index) => {
        const isFinalWord = index === words.length - 1

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            <span className={showAsterisk && isFinalWord ? 'relative inline-block pr-[0.35em]' : undefined}>
              {word}
              {showAsterisk && isFinalWord ? (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none">*</sup>
              ) : null}
            </span>
            {index < words.length - 1 ? <span aria-hidden="true">&nbsp;</span> : null}
          </motion.span>
        )
      })}
    </span>
  )
}

export function WordsPullUpMultiStyle({ segments, className }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.8 })

  const words = useMemo(
    () =>
      segments.flatMap((segment) =>
        segment.text
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => ({ word, className: segment.className })),
      ),
    [segments],
  )

  return (
    <span ref={ref} className={['inline-flex flex-wrap justify-center', className].filter(Boolean).join(' ')}>
      {words.map((entry, index) => (
        <motion.span
          key={`${entry.word}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={['relative inline-block', entry.className].filter(Boolean).join(' ')}
        >
          {entry.word}
          {index < words.length - 1 ? <span aria-hidden="true">&nbsp;</span> : null}
        </motion.span>
      ))}
    </span>
  )
}

export function AnimatedLetter({ letter, index, total, progress }: AnimatedLetterProps) {
  const safeTotal = Math.max(total, 1)
  const start = Math.max(0, index / safeTotal - 0.1)
  const end = Math.min(1, index / safeTotal + 0.05)
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre-wrap align-baseline">
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  )
}

type RevealParagraphProps = {
  text: string
  className?: string
}

export function RevealParagraph({ text, className }: RevealParagraphProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const letters = Array.from(text)

  return (
    <div ref={ref} className={className}>
      <p className="flex flex-wrap justify-center leading-[1.15]">
        {letters.map((letter, index) => (
          <AnimatedLetter key={`${letter}-${index}`} letter={letter} index={index} total={letters.length} progress={scrollYProgress} />
        ))}
      </p>
    </div>
  )
}

export type { ReactNode }