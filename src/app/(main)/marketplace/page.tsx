import {
    Store,
    Layers,
    ShoppingBag,
    ShieldCheck,
    BarChart3,
    Clock,
} from "lucide-react";

export default function MarketplaceComingSoonPage() {
    return (
        <main className="min-h-screen bg-background text-text-primary flex items-center justify-center px-6">
            <div className="max-w-5xl w-full text-center space-y-16">
                {/* Hero */}
                <section className="space-y-6">
                    <div className="flex justify-center">
                        <div className="p-4 rounded-2xl bg-text-primary/10 border border-text-white/20">
                            <Store className="w-6 h-6 md:w-12 md:h-12" />
                        </div>
                    </div>

                    <h1 className="text-xl md:text-6xl font-bold tracking-tight">
                        Marketplace
                        <span className="block text-text-primary">
                            Coming Soon
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-text-primary/60 text-sm md:text-lg">
                        A unified marketplace designed for Web3 growth — connecting
                        advertisers, publishers, and premium crypto traffic in one powerful
                        ecosystem.
                    </p>
                </section>

                {/* Features */}
                <section className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8">
                    <Feature
                        icon={<ShoppingBag />}
                        title="Curated Inventory"
                        description="Access high-quality ad placements from trusted crypto and blockchain publishers."
                    />

                    <Feature
                        icon={<Layers />}
                        title="Unified Marketplace"
                        description="Discover, compare, and launch campaigns across multiple formats in one place."
                    />

                    <Feature
                        icon={<BarChart3 />}
                        title="Transparent Pricing"
                        description="Clear rates, performance insights, and full visibility into campaign results."
                    />

                    <Feature
                        icon={<ShieldCheck />}
                        title="Safe & Verified"
                        description="Quality-controlled publishers and fraud-protected traffic by design."
                    />

                    <Feature
                        icon={<Store />}
                        title="Built for Scale"
                        description="Whether you’re buying or selling traffic, the marketplace grows with you."
                    />

                    <Feature
                        icon={<Clock />}
                        title="Launching Soon"
                        description="We’re preparing the marketplace for a seamless and secure launch."
                    />
                </section>

                {/* CTA */}
                <section className="space-y-6">
                    <p className="text-text-primary/60 text-sm md:text-lg">
                        The marketplace experience is launching soon.
                    </p>

                    <button
                        disabled
                        className="text-xs md:text-lg py-2 px-4 md:px-8 md:py-4 rounded-sm md:rounded-xl bg-text-primary/10 border border-text-white/20 text-text-primary cursor-not-allowed"
                    >
                        Marketplace Access — Coming Soon
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
