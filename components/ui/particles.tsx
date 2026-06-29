import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("")
  const n = parseInt(hex, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

type Circle = {
  x: number; y: number; translateX: number; translateY: number
  size: number; alpha: number; targetAlpha: number
  dx: number; dy: number; magnetism: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 80,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#006AFF",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = mousePos.x - rect.left - w / 2
      const y = mousePos.y - rect.top - h / 2
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current = { x, y }
      }
    }
  }, [mousePos])

  useEffect(() => {
    if (canvasRef.current) ctx.current = canvasRef.current.getContext("2d")
    initCanvas()
    animRef.current = requestAnimationFrame(animate)
    window.addEventListener("resize", initCanvas)
    return () => {
      window.removeEventListener("resize", initCanvas)
      cancelAnimationFrame(animRef.current)
    }
  }, [color])

  useEffect(() => { initCanvas() }, [refresh])

  const rgb = hexToRgb(color)

  function initCanvas() {
    if (!containerRef.current || !canvasRef.current || !ctx.current) return
    circles.current = []
    canvasSize.current.w = containerRef.current.offsetWidth
    canvasSize.current.h = containerRef.current.offsetHeight
    canvasRef.current.width = canvasSize.current.w * dpr
    canvasRef.current.height = canvasSize.current.h * dpr
    canvasRef.current.style.width = `${canvasSize.current.w}px`
    canvasRef.current.style.height = `${canvasSize.current.h}px`
    ctx.current.scale(dpr, dpr)
    for (let i = 0; i < quantity; i++) drawCircle(newCircle())
  }

  function newCircle(): Circle {
    const { w, h } = canvasSize.current
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.5 + 0.05).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  function drawCircle(circle: Circle, update = false) {
    if (!ctx.current) return
    const { x, y, translateX, translateY, size, alpha } = circle
    ctx.current.translate(translateX, translateY)
    ctx.current.beginPath()
    ctx.current.arc(x, y, size, 0, 2 * Math.PI)
    ctx.current.fillStyle = `rgba(${rgb.join(",")}, ${alpha})`
    ctx.current.fill()
    ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (!update) circles.current.push(circle)
  }

  function animate() {
    if (!ctx.current) return
    ctx.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    circles.current.forEach((c, i) => {
      const { w, h } = canvasSize.current
      const edge = [c.x + c.translateX - c.size, w - c.x - c.translateX - c.size, c.y + c.translateY - c.size, h - c.y - c.translateY - c.size]
      const closest = Math.min(...edge)
      const fade = Math.min(closest / 20, 1)
      if (fade > 1) { c.alpha = Math.min(c.alpha + 0.02, c.targetAlpha) }
      else { c.alpha = c.targetAlpha * fade }
      c.x += c.dx + vx
      c.y += c.dy + vy
      c.translateX += (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease
      c.translateY += (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease
      drawCircle(c, true)
      if (c.x < -c.size || c.x > w + c.size || c.y < -c.size || c.y > h + c.size) {
        circles.current.splice(i, 1)
        drawCircle(newCircle())
      }
    })
    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <div ref={containerRef} className={cn("pointer-events-none", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
