import { AnimatePresence, motion, type Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const getRandom = (max: number) => Math.floor(Math.random() * max)

interface HyperTextProps {
  text: string
  duration?: number
  className?: string
  animateOnLoad?: boolean
}

const framerProps: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 3 },
}

export function HyperText({ text, duration = 800, className, animateOnLoad = true }: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""))
  const [trigger, setTrigger] = useState(false)
  const iterations = useRef(0)
  const firstRender = useRef(true)

  const start = () => {
    iterations.current = 0
    setTrigger(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && firstRender.current) {
        clearInterval(interval)
        firstRender.current = false
        return
      }
      if (iterations.current < text.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " " ? l : i <= iterations.current ? text[i] : alphabets[getRandom(26)],
          ),
        )
        iterations.current += 0.1
      } else {
        setTrigger(false)
        clearInterval(interval)
      }
    }, duration / (text.length * 10))
    return () => clearInterval(interval)
  }, [text, duration, trigger, animateOnLoad])

  return (
    <span
      className="flex cursor-default overflow-hidden"
      onMouseEnter={start}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn("font-mono", letter === " " ? "w-3" : "", className)}
            variants={framerProps}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}
