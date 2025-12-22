import {
    Rocket,
    Target,
    BarChart3,
    ShieldCheck,
    Users,
    Clock,
} from "lucide-react";

export default function AdvertiserComingSoonPage() {
    return (
        <main className="min-h-screen bg-background text-text-primary flex items-center justify-center px-6">
            <div className="max-w-5xl w-full text-center space-y-16">
                {/* Hero Section */}
                <section className="space-y-6">
                    <div className="flex justify-center">
                        <div className="p-4 rounded-2xl bg-text-primary/10 border border-text-primary/20">
                            <Rocket className="w-6 h-6 md:w-12 md:h-12" />
                        </div>
                    </div>

                    <h1 className="text-xl md:text-6xl font-bold tracking-tight">
                        Advertiser Platform
                        <span className="block text-text-primary/80">
                            Coming Soon
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-text-primary/60 text-sm md:text-lg">
                        A next-generation advertising platform built for crypto, blockchain,
                        and Web3 projects that demand real reach, real users, and real
                        performance.
                    </p>
                </section>

                {/* Features */}
                <section className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    <Feature
                        icon={<Target />}
                        title="Precision Targeting"
                        description="Reach high-intent crypto-native audiences across premium Web3 publishers."
                    />

                    <Feature
                        icon={<BarChart3 />}
                        title="Performance Driven"
                        description="Run data-backed campaigns optimized for conversions, not just clicks."
                    />

                    <Feature
                        icon={<Users />}
                        title="Quality Traffic"
                        description="No bots. No junk. Only real users from trusted crypto ecosystems."
                    />

                    <Feature
                        icon={<ShieldCheck />}
                        title="Transparent & Secure"
                        description="Clear reporting, trusted placements, and full control over your campaigns."
                    />

                    <Feature
                        icon={<Rocket />}
                        title="Built to Scale"
                        description="From early-stage launches to global Web3 brands, scale without friction."
                    />

                    <Feature
                        icon={<Clock />}
                        title="Launching Soon"
                        description="We’re finalizing the platform to deliver the best advertiser experience."
                    />
                </section>

                {/* CTA */}
                <section className="space-y-6">
                    <p className="text-text-primary/60 text-sm md:text-lg">
                        We’re opening advertiser access soon.
                    </p>

                    <button
                        disabled
                        className="text-xs md:text-lg py-2 px-4 md:px-8 md:py-4 rounded-sm md:rounded-xl bg-text-primary/10 border border-text-primary/20 text-text-primary cursor-not-allowed"
                    >
                        Advertiser Access — Coming Soon
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
            <h3 className="text-xs sm:text-sm md:text-xl font-semibold mb-2">{title}</h3>
            <p className="text-text-primary/60 text-xxs sm:text-xs md:text-sm">{description}</p>
        </div>
    );
}
