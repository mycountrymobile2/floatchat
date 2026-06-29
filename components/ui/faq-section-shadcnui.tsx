import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useId, useState, type ReactNode } from "react"

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  description?: string
  defaultOpenIndex?: number | null
  footer?: ReactNode
  className?: string
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description = "Everything you need to know.",
  defaultOpenIndex = 0,
  footer,
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)
  const baseId = useId()

  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4 inline-flex rounded-full bg-[#3B82F6]/10 p-3"
            aria-hidden="true"
          >
            <HelpCircle className="h-8 w-8 text-[#1D4ED8]" aria-hidden="true" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
            {description}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const questionId = `${baseId}-question-${index}`
            const answerId = `${baseId}-answer-${index}`
            const isOpen = openIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Card
                  className={`overflow-hidden bg-card transition-colors duration-200 ${
                    isOpen ? "border-[#3B82F6]/40 shadow-sm" : "border-border"
                  }`}
                >
                  <CardHeader>
                    <motion.button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[#3B82F6]/70"
                      whileHover={{ x: 4 }}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      id={questionId}
                    >
                      <span
                        className={`text-base sm:text-lg font-semibold transition-colors ${
                          isOpen ? "text-[#1D4ED8]" : "text-foreground"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                        className="shrink-0 ml-4"
                      >
                        <ChevronDown
                          className={`h-5 w-5 ${isOpen ? "text-[#3B82F6]" : "text-muted-foreground"}`}
                        />
                      </motion.div>
                    </motion.button>
                  </CardHeader>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        role="region"
                        id={answerId}
                        aria-labelledby={questionId}
                      >
                        <CardContent className="pt-0">
                          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {footer ? <div className="mt-10 text-center">{footer}</div> : null}
      </div>
    </div>
  )
}

export default FAQSection
