import { motion } from "framer-motion"
import { Shield, Globe, Users, Network } from "lucide-react"

const InnovationPrinciples = () => {
    const principles = [
        {
            icon: Shield,
            title: "Decentralization",
            description: "No single point of control or failure",
            color: "from-purple-600/10 to-pink-600/10"
        },
        {
            icon: Globe,
            title: "Transparency",
            description: "Open, verifiable information flow",
            color: "from-blue-600/10 to-cyan-600/10"
        },
        {
            icon: Users,
            title: "Community",
            description: "Collective intelligence and governance",
            color: "from-emerald-600/10 to-green-600/10"
        },
        {
            icon: Network,
            title: "Security",
            description: "Trust through cryptographic proof",
            color: "from-amber-500/10 to-orange-500/10"
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
        >
            <div className="text-center mb-5 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Our <span className="text-primary">Web3 Principles</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Building the future with trust, transparency, and community
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {principles.map((principle, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="group"
                    >
                        <div className="h-full bg-gradient-to-b from-background to-background/50 rounded-xl border border-primary/20 p-2 md:p-6 hover:border-primary/40 transition-all duration-300 shadow-lg">
                            <div className={`w-8 h-8 md:w-14 md:h-14 mb-2 md:mb-6 bg-gradient-to-br ${principle.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20`}>
                                <principle.icon className="w-3 h-3 md:w-7 md:h-7 text-primary" />
                            </div>
                            <h3 className="text-xs md:text-xl font-bold text-foreground mb-2 md:mb-3">
                                {principle.title}
                            </h3>
                            <p className="text-xxs md:text-sm text-muted-foreground">
                                {principle.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default InnovationPrinciples