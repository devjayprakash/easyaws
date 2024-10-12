'use client'

import { useCallback, useEffect, useRef } from 'react'

const CanvasEffect: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const draw = useCallback((ctx: CanvasRenderingContext2D) => {
        const dots: any[] = []

        canvasRef.current!.width = window.innerWidth
        canvasRef.current!.height = window.innerHeight

        for (let i = 0; i < 100; i++) {
            dots.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                connected_with: [],
                v_x: Math.random() * 2 - 1,
                v_y: Math.random() * 2 - 1,
            })
        }

        const proximity = 250

        const animationLoop = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

            ctx.strokeStyle = '#f97316'

            for (let i = 0; i < dots.length; i++) {
                for (let j = 0; j < dots[i].connected_with.length; j++) {
                    ctx.beginPath()
                    ctx.moveTo(dots[i].x, dots[i].y)
                    ctx.lineTo(
                        dots[dots[i].connected_with[j]].x,
                        dots[dots[i].connected_with[j]].y
                    )
                    ctx.stroke()
                }

                ctx.arc(dots[i].x, dots[i].y, 2, 0, Math.PI * 2)
                ctx.fillStyle = '#ffedd5'
                ctx.fill()

                dots[i].x += dots[i].v_x
                dots[i].y += dots[i].v_y

                if (dots[i].x > window.innerWidth || dots[i].x < 0) {
                    dots[i].v_x *= -1
                }
                if (dots[i].y > window.innerHeight || dots[i].y < 0) {
                    dots[i].v_y *= -1
                }

                for (let j = 0; j < dots.length; j++) {
                    const distance = Math.sqrt(
                        Math.pow(dots[i].x - dots[j].x, 2) +
                            Math.pow(dots[i].y - dots[j].y, 2)
                    )

                    if (distance < proximity) {
                        ctx.beginPath()
                        ctx.moveTo(dots[i].x, dots[i].y)
                        ctx.lineTo(dots[j].x, dots[j].y)
                        ctx.stroke()
                        ctx.closePath()
                    }
                }
            }

            requestAnimationFrame(animationLoop)
        }

        animationLoop()
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current

        if (canvas) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            const ctx = canvas.getContext('2d')

            if (ctx) {
                draw(ctx)
            }
        }
    }, [])

    return (
        <div className="absolute -z-10">
            <canvas
                ref={canvasRef}
                className="w-full h-screen top-0 left-0 z-0"
            ></canvas>
        </div>
    )
}

export default CanvasEffect
