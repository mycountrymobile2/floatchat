import React from "react"
import { motion } from "framer-motion"

export type Testimonial = {
  text: string
  image: string
  name: string
  role: string
}

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, copyIdx) => (
          <React.Fragment key={copyIdx}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border border-border bg-card shadow-lg shadow-primary/5 max-w-xs w-full"
              >
                <p className="text-sm text-foreground leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight text-foreground leading-5">{name}</span>
                    <span className="text-xs leading-5 text-muted-foreground tracking-tight">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
