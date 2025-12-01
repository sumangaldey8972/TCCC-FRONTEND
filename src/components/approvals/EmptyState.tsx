import { motion } from "framer-motion";

const EmptyState = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const iconVariants = {
        animate: {
            opacity: [0.5, 1, 0.5],
        }
    };

    return (
        <motion.div
            className="mt-8 sm:mt-12 text-center px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 1 }}
        >
            <motion.div
                animate="animate"
                variants={iconVariants}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="inline-block"
            >
                <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-text-primary/30 mx-auto mb-3 sm:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </motion.div>
            <p className="text-text-primary/60 text-sm sm:text-base">More approval types coming soon...</p>
        </motion.div>
    );
};

export default EmptyState;