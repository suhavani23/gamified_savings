"use client"

export const useConfetti = () => {
  const triggerConfetti = (elementId?: string) => {
    const canvas = document.createElement("canvas")
    const target = elementId ? document.getElementById(elementId) : document.body

    if (!target) return

    const rect = target.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    canvas.style.position = "absolute"
    canvas.style.top = rect.top + "px"
    canvas.style.left = rect.left + "px"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"

    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")!
    const particles: any[] = []

    // Create confetti particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 8 + 2,
        color: ["#8B5CF6", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 2,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity
        p.vx *= 0.99 // air resistance

        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height)
        ctx.fillRect(p.x, p.y, p.size, p.size)

        if (p.y > canvas.height) {
          particles.splice(i, 1)
        }
      })

      ctx.globalAlpha = 1

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate)
      } else {
        document.body.removeChild(canvas)
      }
    }

    animate()
  }

  return { triggerConfetti }
}
