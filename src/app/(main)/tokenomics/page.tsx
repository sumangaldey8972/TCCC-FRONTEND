"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import * as THREE from "three"
import {
    Coins,
    TrendingUp,
    PieChart,
    Zap,
    BarChart3,
    Wallet,
    Lock,
    Target,
    DollarSign,
    Users
} from "lucide-react"

export default function TokenomicsComingSoon() {
    const threeContainerRef = useRef<HTMLDivElement>(null)
    const threeSceneRef = useRef<{
        scene: THREE.Scene
        camera: THREE.PerspectiveCamera
        renderer: THREE.WebGLRenderer
        coins: THREE.Group
        timeline: gsap.core.Timeline
    } | null>(null)
    const animationFrameRef = useRef<number>(0)

    // Initialize Three.js Scene
    useEffect(() => {
        if (!threeContainerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0xffffff, 10, 100)

        const camera = new THREE.PerspectiveCamera(
            45,
            threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 15

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })
        renderer.setSize(
            threeContainerRef.current.clientWidth,
            threeContainerRef.current.clientHeight
        )
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        threeContainerRef.current.innerHTML = ''
        threeContainerRef.current.appendChild(renderer.domElement)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x040720, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(10, 10, 5)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        // Create floating 3D coins
        const coinsGroup = new THREE.Group()

        // Create different coin types
        const coinMaterials = [
            new THREE.MeshStandardMaterial({
                color: 0x00ff88,
                metalness: 0.9,
                roughness: 0.1,
                emissive: 0x004422,
                emissiveIntensity: 0.2
            }),
            new THREE.MeshStandardMaterial({
                color: 0xffaa00,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0x442200,
                emissiveIntensity: 0.2
            }),
            new THREE.MeshStandardMaterial({
                color: 0x0088ff,
                metalness: 0.85,
                roughness: 0.15,
                emissive: 0x002244,
                emissiveIntensity: 0.2
            }),
            new THREE.MeshStandardMaterial({
                color: 0xff0088,
                metalness: 0.9,
                roughness: 0.1,
                emissive: 0x440022,
                emissiveIntensity: 0.2
            })
        ]

        // Create coins in a spherical arrangement
        const coinCount = 20
        for (let i = 0; i < coinCount; i++) {
            const size = 0.2 + Math.random() * 0.3
            const geometry = new THREE.CylinderGeometry(size, size, 0.05, 32)
            const material = coinMaterials[Math.floor(Math.random() * coinMaterials.length)]
            const coin = new THREE.Mesh(geometry, material)

            // Position in a sphere
            const radius = 5 + Math.random() * 3
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI

            coin.position.x = radius * Math.sin(phi) * Math.cos(theta)
            coin.position.y = radius * Math.sin(phi) * Math.sin(theta)
            coin.position.z = radius * Math.cos(phi)

            coin.rotation.x = Math.random() * Math.PI
            coin.rotation.y = Math.random() * Math.PI

            coin.castShadow = true
            coin.receiveShadow = true

            coinsGroup.add(coin)
        }

        // Add central token symbol
        const tokenGeometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16)
        const tokenMaterial = new THREE.MeshStandardMaterial({
            color: 0x040720,
            metalness: 0.95,
            roughness: 0.05,
            emissive: 0x000000,
            emissiveIntensity: 0.5
        })
        const token = new THREE.Mesh(tokenGeometry, tokenMaterial)
        token.position.set(0, 0, 0)
        token.castShadow = true
        token.receiveShadow = true
        coinsGroup.add(token)

        scene.add(coinsGroup)

        // GSAP Timeline for 3D animations
        const timeline = gsap.timeline({ repeat: -1 })

        // Rotate the entire group
        timeline.to(coinsGroup.rotation, {
            y: Math.PI * 2,
            duration: 20,
            ease: "none"
        }, 0)

        // Float coins animation
        coinsGroup.children.forEach((coin, i) => {
            if (coin === token) return

            timeline.to(coin.position, {
                y: `+=${1 + Math.random()}`,
                duration: 2 + Math.random() * 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            }, i * 0.1)

            timeline.to(coin.rotation, {
                y: Math.PI * 2,
                duration: 10 + Math.random() * 10,
                ease: "none",
                repeat: -1
            }, i * 0.1)
        })

        // Animate central token
        timeline.to(token.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut"
        }, 0)

        timeline.to(token.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 15,
            ease: "none",
            repeat: -1
        }, 0)

        // Mouse move interaction
        const handleMouseMove = (event: MouseEvent) => {
            if (!threeContainerRef.current) return

            const rect = threeContainerRef.current.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            gsap.to(camera.position, {
                x: x * 2,
                y: y * 2,
                duration: 1,
                ease: "power2.out"
            })
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            if (!threeContainerRef.current) return

            camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(
                threeContainerRef.current.clientWidth,
                threeContainerRef.current.clientHeight
            )
        }

        window.addEventListener('resize', handleResize)

        // Store references for cleanup
        threeSceneRef.current = {
            scene,
            camera,
            renderer,
            coins: coinsGroup,
            timeline
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }

            if (threeSceneRef.current) {
                threeSceneRef.current.timeline.kill()
                threeSceneRef.current.renderer.dispose()
            }
        }
    }, [])



    const features = [
        {
            icon: <PieChart className="w-6 h-6" />,
            title: "Token Distribution",
            description: "Transparent allocation breakdown"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Price Charts",
            description: "Real-time price tracking"
        },
        {
            icon: <Wallet className="w-6 h-6" />,
            title: "Wallet Integration",
            description: "Connect your crypto wallet"
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Analytics Dashboard",
            description: "Detailed metrics and insights"
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Security Features",
            description: "Advanced protection systems"
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Staking Rewards",
            description: "Earn passive income"
        }
    ]

    const stats = [
        { label: "Total Supply", value: "Coming Soon", icon: <Coins /> },
        { label: "Market Cap", value: "TBA", icon: <DollarSign /> },
        { label: "Holders", value: "Growing", icon: <Users /> },
        { label: "Transactions", value: "Live Soon", icon: <Zap /> }
    ]

    return (
        <div className="bg-gradient-to-b from-background to-bg-secondary relative">
            {/* 3D Animation Container */}
            <div
                ref={threeContainerRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    opacity: 0.15,
                    mixBlendMode: 'screen'
                }}
            />

            {/* Main Content */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                    <div className="max-w-6xl mx-auto">
                        {/* Header with 3D text effect */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12 lg:mb-20"
                        >
                            <motion.div
                                className="relative inline-block mb-6"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-text-primary/20 to-text-primary/40 blur-xl rounded-2xl" />
                                <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-background/80 backdrop-blur-sm rounded-xl border border-text-primary/10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-text-primary/10 to-text-primary/20 flex items-center justify-center">
                                        <Coins className="w-6 h-6 text-text-primary/70" />
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-text-primary to-text-primary/70 bg-clip-text text-transparent">
                                        Tokenomics
                                    </h1>
                                </div>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl lg:text-2xl text-text-primary/60 max-w-3xl mx-auto leading-relaxed"
                            >
                                We're building a comprehensive tokenomics dashboard with real-time data,
                                advanced analytics, and powerful tools for cryptocurrency investors.
                            </motion.p>
                        </motion.div>

                        {/* Countdown Timer with 3D effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-16 lg:mb-24"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-2">
                                    Launching Soon
                                </h2>
                                <p className="text-text-primary/50">
                                    We're working hard to bring you the best tokenomics experience
                                </p>
                            </div>
                        </motion.div>

                        {/* Features Grid with 3D card effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mb-16 lg:mb-24"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-2">
                                    What's Coming
                                </h2>
                                <p className="text-text-primary/50 max-w-2xl mx-auto">
                                    Explore the powerful features we're building for your tokenomics analysis
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{
                                            delay: 0.7 + index * 0.1,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            y: -8,
                                            rotateX: 5,
                                            boxShadow: "0 25px 50px rgba(4, 7, 32, 0.2)",
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            perspective: '1000px'
                                        }}
                                        className="relative bg-background border border-text-primary/10 rounded-xl p-6 hover:border-text-primary/20 transition-all duration-300"
                                    >
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-text-primary/5 to-transparent opacity-50" />
                                        <div className="relative flex items-start gap-4">
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className="p-3 rounded-lg bg-gradient-to-br from-text-primary/5 to-text-primary/10"
                                            >
                                                <div className="text-text-primary">
                                                    {feature.icon}
                                                </div>
                                            </motion.div>
                                            <div>
                                                <h3 className="font-semibold text-text-primary mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-text-primary/60 text-sm">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-20px) translateX(-20px);
            opacity: 0.4;
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
        </div>
    )
}