"use client"

import { useEffect } from "react"

const PixelGrid = () => {
    useEffect(() => {
        const createPixelGrid = () => {
            const container = document.querySelector('.pixel-grid-container')
            if (!container) return

            // Clear existing grid
            container.innerHTML = ''

            // Create pixel grid
            const gridSize = 15
            for (let i = 0; i < gridSize * gridSize; i++) {
                const pixel = document.createElement('div')
                pixel.className = 'pixel-cell'

                // Random animation delay
                const delay = Math.random() * 3
                const duration = 1 + Math.random() * 2

                pixel.style.animationDelay = `${delay}s`
                pixel.style.animationDuration = `${duration}s`

                container.appendChild(pixel)
            }
        }

        createPixelGrid()

        // Handle window resize
        const handleResize = () => createPixelGrid()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div className="pixel-grid-container absolute inset-0 grid grid-cols-15 grid-rows-15 gap-0.5 p-1" />
            <style jsx>{`
                @keyframes pixelGlow {
                    0%, 100% {
                        opacity: 0.1;
                        background-color: rgba(4, 7, 32, 0.05);
                    }
                    50% {
                        opacity: 0.3;
                        background-color: rgba(4, 7, 32, 0.15);
                    }
                }
                
                .pixel-grid-container {
                    display: grid;
                    grid-template-columns: repeat(15, 1fr);
                    grid-template-rows: repeat(15, 1fr);
                }
                
                .pixel-cell {
                    border: 0.5px solid rgba(4, 7, 32, 0.05);
                    animation: pixelGlow infinite ease-in-out;
                }
            `}</style>
        </>
    )
}

export default PixelGrid