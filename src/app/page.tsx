"use client";

import RightSideNewsSection from "@/components/landing/RightSideNewsSection";
import Scroll3DPageSwap from "@/components/landing/Scroll3DPageSwap";
import DottedMapExtreme from "@/components/ui/dotted-map";
import WorldMap from "@/components/ui/world-map";
import { useAppSelector } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { FaTelegramPlane, FaDiscord, FaArrowRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {

  const router = useRouter()

  const socialLinks = [
    {
      name: "Telegram",
      icon: <FaTelegramPlane className="w-5 h-5" />,
      href: "https://t.me/thecoin_cartel",
      color: "hover:text-[#0088cc] hover:border-[#0088cc]",
    },
    {
      name: "X",
      icon: <FaXTwitter className="w-5 h-5" />,
      href: "https://x.com/thecoin_cartel",
      color: "hover:text-[#000000] hover:border-[#000000]",
    },
    // {
    //   name: "Discord",
    //   icon: <FaDiscord className="w-5 h-5" />,
    //   href: "#",
    //   color: "hover:text-[#5865F2] hover:border-[#5865F2]",
    // }
  ];


  const user = useAppSelector((store) => store.auth.user)

  console.log({ user })

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 -z-10 -top-0">
          {/* <DottedMapExtreme /> */}
          <WorldMap />
        </div>

        {/* Hero Content */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-20">

          {/* Left Section – Hero Text */}
          <div className="space-y-6 md:space-y-8">
            <div className="relative">
              <div
                className="
      backdrop-blur-xs
      bg-text-primary/5
      border border-text-primary/10
      rounded-2xl
      p-3 md:px-8 md:py-10
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
    "
              >
                <div>
                  <h1 className="text-4xl font-light leading-tight tracking-tight">
                    <span className="gold-embossed">The Cartel Club —</span>
                    <br />
                    <span className="text-3xl text-text-primary/80 font-normal">
                      Your Gateway to Web3, Blockchain & Decentralized Crypto News,
                      Advertising, and Growth
                    </span>
                  </h1>
                </div>

                <p className="mt-6 text-xl md:text-2xl text-text-primary/90 leading-relaxed">
                  Join The Cartel and maximize your reach in the crypto ecosystem.
                </p>

                <p className="mt-3 text-lg md:text-xl text-text-primary">
                  Your Gateway to Crypto Media & Market Intelligence.
                </p>
              </div>
            </div>


            <div className="flex flex-row items-stretch sm:items-center gap-4 w-full max-w-2xl">
              <button onClick={() => window.location.replace("/consult-with-us")} className="group relative overflow-hidden px-2 md:px-6 py-2 md:py-4 text-xs md:text-base font-medium bg-text-primary/90 text-background rounded-sm md:rounded-lg transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  CONSULT WITH US
                  <FaArrowRight className="w-2 h-2 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>

              <button onClick={() => window.location.replace("/advertise-with-us")} className="bg-background group relative overflow-hidden px-2 md:px-6 py-2 md:py-4 text-xs md:text-base font-medium border-2 border-text-primary/30 text-text-primary rounded-sm md:rounded-lg transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 hover:border-text-primary/60 hover:bg-background/90">
                <span className="relative z-10">ADVERTISE WITH US</span>
              </button>
            </div>

          </div>

          {/* Right Section */}
          <div className="h-auto lg:h-full w-full flex">
            <RightSideNewsSection />
          </div>

        </section>

        {/* Social Media Section - Compact */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-2 text-text-primary">
              Connect With Us
            </h2>
            <p className="text-text-primary/70 text-sm md:text-base max-w-xl mx-auto">
              Follow our latest updates across platforms
            </p>
          </div>

          {/* Compact Social Links - Horizontal Layout */}
          <div className="hidden md:flex flex-wrap justify-center gap-3 md:gap-4">
            {socialLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-4 py-3 md:px-5 md:py-3 bg-white/5 backdrop-blur-sm border border-text-primary/10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <div className={`p-2 rounded-lg bg-text-primary/5 transition-colors ${platform.color}`}>
                  {platform.icon}
                </div>
                <span className={`font-medium text-sm md:text-base transition-colors ${platform.color.split(' ')[0]}`}>
                  {platform.name}
                </span>
                <FaArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Alternative: Icon-only version for smallest screens */}
          <div className="flex justify-center gap-3 mt-6 md:hidden">
            {socialLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-text-primary/10 transition-all duration-300 hover:scale-110 active:scale-95 ${platform.color}`}
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </section>
      </div>


      <Scroll3DPageSwap />

    </>
  );
}