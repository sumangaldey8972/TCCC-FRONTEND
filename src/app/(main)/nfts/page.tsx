import {
    Image,
    Sparkles,
    Layers,
    ShieldCheck,
    Wallet,
    Clock,
} from "lucide-react";

export default function NFTsComingSoonPage() {
    return (
        <main className="min-h-screen bg-background text-text-primary flex items-center justify-center px-6">
            <div className="max-w-5xl w-full text-center space-y-16">
                {/* Hero */}
                <section className="space-y-6">
                    <div className="flex justify-center">
                        <div className="p-4 rounded-2xl bg-text-primary/10 border border-text-white/20">
                            <Image className="w-6 h-6 md:w-12 md:h-12" />
                        </div>
                    </div>

                    <h1 className="text-xl md:text-6xl font-bold tracking-tight">
                        NFTs
                        <span className="block text-text-primary">
                            Coming Soon
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-text-primary/60 text-sm md:text-lg">
                        A next-generation NFT ecosystem built for creators,
                        collectors, and Web3 brands — designed for discovery,
                        ownership, and long-term value.
                    </p>
                </section>

                {/* Features */}
                <section className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8">
                    <Feature
                        icon={<Sparkles />}
                        title="Curated Collections"
                        description="Discover handpicked NFT drops from verified creators and Web3 projects."
                    />

                    <Feature
                        icon={<Layers />}
                        title="Multi-Chain Ready"
                        description="Support for leading blockchains to ensure flexibility and accessibility."
                    />

                    <Feature
                        icon={<Wallet />}
                        title="Creator First"
                        description="Tools and visibility designed to empower artists and NFT brands."
                    />

                    <Feature
                        icon={<ShieldCheck />}
                        title="Secure Ownership"
                        description="Transparent minting and ownership backed by blockchain security."
                    />

                    <Feature
                        icon={<Image />}
                        title="Premium Assets"
                        description="High-quality digital assets built for collectors and communities."
                    />

                    <Feature
                        icon={<Clock />}
                        title="Launching Soon"
                        description="We’re preparing the NFT platform for a seamless public launch."
                    />
                </section>

                {/* CTA */}
                <section className="space-y-6">
                    <p className="text-text-primary/60 text-sm md:text-lg">
                        The NFT experience is almost here.
                    </p>

                    <button
                        disabled
                        className="text-xs md:text-lg py-2 px-4 md:px-8 md:py-4 rounded-sm md:rounded-xl bg-text-primary/10 border border-text-white/20 text-text-primary cursor-not-allowed"
                    >
                        NFT Access — Coming Soon
                    </button>
                </section>
            </div>
        </main>
    );
}

function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="p-2 md:p-6 rounded-sm md:rounded-2xl bg-text-primary/5 border border-text-primary/10 hover:border-text-primary/20 transition">
            <div className="flex items-center justify-center w-4 h-4 md:w-12 md:h-12 rounded-xl bg-text-primary/10 mb-4 mx-auto">
                {icon}
            </div>
            <h3 className="text-xs sm:text-sm md:text-xl font-semibold mb-2">
                {title}
            </h3>
            <p className="text-text-primary/60 text-xxs sm:text-xs md:text-sm">
                {description}
            </p>
        </div>
    );
}
