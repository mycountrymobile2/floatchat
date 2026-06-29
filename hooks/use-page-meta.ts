import { useEffect } from "react"

interface PageMeta {
  title?: string
  description?: string
}

/**
 * Applies a page's title + meta description to the DOM.
 *
 * This is a Vite SPA, so Next.js-style `export const metadata` objects are
 * never read by a framework — pass that object here to actually apply it.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    if (meta.title) document.title = meta.title
    if (meta.description) {
      const el = document.querySelector('meta[name="description"]')
      if (el) el.setAttribute("content", meta.description)
    }
  }, [meta.title, meta.description])
}
