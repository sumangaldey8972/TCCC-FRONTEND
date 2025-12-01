import { motion } from "framer-motion";

const StatsGrid = () => {
    const stats = [
        { value: "1", label: "Active Approvals" },
        { value: "0", label: "Pending Requests" },
        { value: "100%", label: "Security Score" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-3 sm:p-4 text-center"
                >
                    <p className="text-xl sm:text-2xl font-bold text-text-primary mb-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-text-primary/70">{stat.label}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StatsGrid;