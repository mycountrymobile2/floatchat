import React, { useState, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export interface Testimonial {
  id: number | string
  quote: string
  name: string
  username: string
  avatar: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoPlayMs?: number
}

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3
  if (width >= 768) return 2
  return 1
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  autoPlayMs = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  )
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)
      const oldVisible = getVisibleCount(windowWidth)
      const newVisible = getVisibleCount(newWidth)
      if (oldVisible !== newVisible) {
        const maxIdx = testimonials.length - newVisible
        if (currentIndex > maxIdx) setCurrentIndex(Math.max(0, maxIdx))
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [windowWidth, currentIndex, testimonials.length])

  useEffect(() => {
    if (!isAutoPlaying) return
    autoPlayRef.current = setInterval(() => {
      const visible = getVisibleCount(windowWidth)
      const maxIdx = testimonials.length - visible
      if (currentIndex >= maxIdx) {
        setDirection(-1)
        setCurrentIndex((p) => p - 1)
      } else if (currentIndex <= 0) {
        setDirection(1)
        setCurrentIndex((p) => p + 1)
      } else {
        setCurrentIndex((p) => p + direction)
      }
    }, autoPlayMs)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, currentIndex, windowWidth, direction, autoPlayMs, testimonials.length])

  const visibleCount = getVisibleCount(windowWidth)
  const maxIndex = testimonials.length - visibleCount
  const canGoNext = currentIndex < maxIndex
  const canGoPrev = currentIndex > 0

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const goNext = () => {
    if (canGoNext) {
      setDirection(1)
      setCurrentIndex((p) => Math.min(p + 1, maxIndex))
      pauseAutoPlay()
    }
  }
  const goPrev = () => {
    if (canGoPrev) {
      setDirection(-1)
      setCurrentIndex((p) => Math.max(p - 1, 0))
      pauseAutoPlay()
    }
  }
  const goToSlide = (i: number) => {
    setCurrentIndex(i)
    pauseAutoPlay()
  }

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const threshold = 30
    if (info.offset.x < -threshold && canGoNext) goNext()
    else if (info.offset.x > threshold && canGoPrev) goPrev()
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Nav */}
      <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 space-x-2 mb-4 sm:mb-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous testimonial"
          className={`p-2 rounded-full transition-all duration-300 ${
            canGoPrev
              ? "bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-[#1D4ED8]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Next testimonial"
          className={`p-2 rounded-full transition-all duration-300 ${
            canGoNext
              ? "bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-[#1D4ED8]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Track */}
      <div className="overflow-hidden relative px-2 sm:px-0">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className={`flex-shrink-0 w-full ${
                visibleCount === 3 ? "md:w-1/3" : visibleCount === 2 ? "md:w-1/2" : "w-full"
              } p-2`}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98, cursor: "grabbing" }}
              style={{ cursor: "grab" }}
            >
              <motion.div
                className="relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full bg-white border border-slate-200 shadow-[0_10px_30px_-15px_rgba(15,42,74,0.18)]"
                whileHover={{
                  boxShadow:
                    "0 20px 40px -20px rgba(59,130,246,0.25), 0 10px 20px -10px rgba(59,130,246,0.12)",
                }}
              >
                {/* Decorative Quote */}
                <div className="absolute -top-4 -left-4 opacity-10">
                  <Quote
                    size={windowWidth < 640 ? 40 : 60}
                    className="text-[#3B82F6]"
                  />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <p className="text-sm sm:text-base text-slate-700 font-medium mb-5 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <img
                          width={48}
                          height={48}
                          src={t.avatar}
                          alt={t.name}
                          loading="lazy"
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#3B82F6]/20"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.3, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-sm sm:text-base text-[#0F2A4A]">
                          {t.name}
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm">{t.username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 sm:mt-8">
        {Array.from({ length: testimonials.length - visibleCount + 1 }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative mx-1 focus:outline-none"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <motion.div
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? "bg-[#3B82F6]" : "bg-slate-300"
              }`}
              animate={{ scale: i === currentIndex ? [1, 1.2, 1] : 1 }}
              transition={{
                duration: 1.5,
                repeat: i === currentIndex ? Infinity : 0,
                repeatDelay: 1,
              }}
            />
            {i === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#3B82F6]/30"
                animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider
