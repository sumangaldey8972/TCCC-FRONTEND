"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WhyChooseCoinCartel from "./WhyChooseUs";
import Testimonials from "./Testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Scroll3DPageSwap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const instructionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sections = sectionsRef.current;
        if (!sections.length) return;

        // Set initial styles
        gsap.set(containerRef.current, {
            perspective: 1800,
        });

        // Set initial state with staggered depth
        sections.forEach((section, i) => {
            if (i === 0) {
                // First section is visible
                gsap.set(section, {
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "brightness(1)",
                    transformOrigin: "center center"
                });
            } else {
                // Other sections are hidden in 3D space
                gsap.set(section, {
                    z: i * 800,
                    rotateX: i * -15,
                    opacity: 0,
                    scale: 0.95,
                    transformOrigin: "center center",
                    filter: "brightness(0.8)"
                });
            }
        });

        // Hide instruction after first scroll
        let instructionHidden = false;
        const hideInstruction = () => {
            if (!instructionHidden && instructionRef.current) {
                gsap.to(instructionRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power2.out"
                });
                instructionHidden = true;
                window.removeEventListener("wheel", hideInstruction);
                window.removeEventListener("touchstart", hideInstruction);
            }
        };

        window.addEventListener("wheel", hideInstruction);
        window.addEventListener("touchstart", hideInstruction);

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${(sections.length - 1) * 100}%`,
                scrub: 1.2,
                pin: true,
                anticipatePin: 1
            }
        });

        // Add sophisticated 3D transitions
        sections.forEach((section, i) => {
            if (i === 0) return;

            const prevSection = sections[i - 1];
            const progressPoint = i - 1;

            // Animate previous section out
            tl.to(prevSection, {
                z: -1000,
                rotateX: 30,
                rotateY: i % 2 === 0 ? -10 : 10, // Alternate direction
                opacity: 0,
                scale: 0.9,
                filter: "brightness(0.6) blur(5px)",
                duration: 1.5,
                ease: "power3.inOut",
                transformOrigin: "center center"
            }, progressPoint)

                // Animate current section in
                .to(section, {
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "brightness(1) blur(0px)",
                    duration: 1.5,
                    ease: "power3.inOut",
                    transformOrigin: "center center"
                }, progressPoint)

                // Add ambient animations for current section content
                .to(`.section-${i} .title`, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    stagger: 0.1
                }, progressPoint + 0.3)

                .to(`.section-${i} .subtitle`, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "power2.out"
                }, progressPoint + 0.3)

                .to(`.section-${i} .decorative-circle`, {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.2
                }, progressPoint + 0.5);
        });

        // Add parallax effect for decorative elements
        sections.forEach((section, i) => {
            const circles = section.querySelectorAll('.decorative-circle');
            circles.forEach((circle, index) => {
                gsap.to(circle, {
                    y: index % 2 === 0 ? -50 : 50,
                    scrollTrigger: {
                        trigger: section,
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.5,
                        containerAnimation: tl
                    }
                });
            });
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener("wheel", hideInstruction);
            window.removeEventListener("touchstart", hideInstruction);
        };
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">

            {/* SECTION 1 - Starting Section */}
            <section
                ref={addToRefs}
                className="page3d-sec absolute inset-0 h-screen bg-background text-text-primary flex items-center justify-center"
                style={{ zIndex: 10000 }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: `linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
                                   linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }} />
                </div>
                <WhyChooseCoinCartel />
            </section>

            {/* SECTION 2 */}
            <section
                ref={addToRefs}
                className="page3d-sec absolute inset-0 h-screen bg-background text-text-primary flex items-center justify-center"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: `linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
                                   linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }} />
                </div>
                <Testimonials />
            </section>

            {/* SECTION 3 */}
            {/* <section
                ref={addToRefs}
                className="page3d-sec absolute inset-0 h-screen bg-gradient-to-br from-[#0E0E0E] via-[#181818] to-[#222222] text-white flex items-center justify-center"
            >
                <div className="text-center px-4 section-2">
                    <h2 className="title text-4xl sm:text-5xl md:text-7xl font-light mb-6 opacity-0 translate-y-10">
                        <span className="text-gray-400">02</span>
                        <span className="block mt-2">Spatial<span className="text-blue-400"> Flow</span></span>
                    </h2>
                    <p className="subtitle max-w-2xl mx-auto text-gray-300 opacity-0 translate-y-5">
                        Navigate through volumetric spaces with intuitive scroll-based interactions
                    </p>
                </div>

                <div className="decorative-circle absolute top-20 left-20 w-40 h-40 border border-blue-500/20 rounded-full opacity-0" />
                <div className="decorative-circle absolute bottom-20 right-20 w-56 h-56 border border-cyan-500/20 rounded-full opacity-0" />
                <div className="decorative-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full opacity-0" />
            </section> */}

            {/* SECTION 4 */}
            {/* <section
                ref={addToRefs}
                className="page3d-sec absolute inset-0 h-screen bg-gradient-to-br from-[#101010] via-[#1A1A1A] to-[#242424] text-white flex items-center justify-center"
            >
                <div className="text-center px-4 section-3">
                    <h2 className="title text-4xl sm:text-5xl md:text-7xl font-light mb-6 opacity-0 translate-y-10">
                        <span className="text-gray-400">03</span>
                        <span className="block mt-2">Cinematic<span className="text-purple-400"> Motion</span></span>
                    </h2>
                    <p className="subtitle max-w-2xl mx-auto text-gray-300 opacity-0 translate-y-5">
                        Professional-grade animations with bezier curves and anticipation
                    </p>
                </div>

                <div className="decorative-circle absolute top-40 right-40 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full opacity-0" />
                <div className="decorative-circle absolute bottom-40 left-40 w-48 h-48 bg-gradient-to-tr from-pink-500/5 to-transparent rounded-full opacity-0" />
            </section> */}

            {/* SECTION 5 */}
            {/* <section
                ref={addToRefs}
                className="page3d-sec absolute inset-0 h-screen bg-gradient-to-br from-[#121212] via-[#1C1C1C] to-[#262626] text-white flex items-center justify-center"
            >
                <div className="text-center px-4 section-4">
                    <h2 className="title text-4xl sm:text-5xl md:text-7xl font-light mb-6 opacity-0 translate-y-10">
                        <span className="text-gray-400">04</span>
                        <span className="block mt-2">Immersive<span className="text-pink-400"> Layers</span></span>
                    </h2>
                    <p className="subtitle max-w-2xl mx-auto text-gray-300 opacity-0 translate-y-5">
                        Multiple depth layers creating a true 3D environment
                    </p>
                </div>

                <div className="decorative-circle absolute top-1/4 left-1/3 w-72 h-72 border border-pink-500/15 rounded-full opacity-0" />
                <div className="decorative-circle absolute bottom-1/3 right-1/3 w-36 h-36 border border-cyan-500/15 rounded-full opacity-0" />
            </section> */}

            {/* SECTION 6 */}
            {/* <section
                ref={addToRefs}
                className="page3d-sec absolute inset-0 h-screen bg-gradient-to-br from-[#141414] via-[#1E1E1E] to-[#282828] text-white flex items-center justify-center"
            >
                <div className="text-center px-4 section-5">
                    <h1 className="title text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light mb-6 opacity-0 translate-y-10">
                        <span className="text-gray-400">∞</span>
                        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                            Beyond Limits
                        </span>
                    </h1>
                    <p className="subtitle text-lg sm:text-xl text-gray-300 opacity-0 translate-y-5">
                        Redefining scroll experiences with advanced 3D transformations
                    </p>
                </div>
                <div className="decorative-circle absolute inset-0 m-auto w-[80vh] h-[80vh] border border-white/5 rounded-full opacity-0" />
            </section> */}
        </div>
    );
}