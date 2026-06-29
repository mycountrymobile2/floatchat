import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  className?: string
}

export function WordRotate({ words, duration = 3000, className }: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(p => (p + 1) % words.length), duration)
    return () => clearInterval(id)
  }, [words, duration])

  return (
    /*
     * All words live in the same grid cell (col-start-1 row-start-1) forever —
     * nothing mounts or unmounts, so the h1 never reflows.
     * The grid width = widest word at all times.
     */
    <span className="inline-grid" aria-live="polite" aria-atomic="true">
      {words.map((word, wi) => {
        const isActive = wi === index
        return (
          <motion.span
            key={word}
            aria-hidden={!isActive}
            className={cn(
              "col-start-1 row-start-1 inline-flex justify-start",
              className,
            )}
            /* whole-word fade-out when leaving */
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={
              isActive
                ? { duration: 0 }          // snap visible instantly; letters handle their own enter
                : { duration: 0.45, ease: "easeOut", delay: 0.5 }
            }
          >
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                style={{ display: char === " " ? "inline" : "inline-block", whiteSpace: "pre" }}
                /* letter-by-letter stagger on enter */
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  isActive
                    ? { duration: 0.5, delay: ci * 0.08, ease: [0.455, 0.03, 0.515, 0.955] }
                    : { duration: 0 }      // exit handled by parent fade, not per-letter
                }
                initial={{ opacity: 0 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        )
      })}
    </span>
  )
}
