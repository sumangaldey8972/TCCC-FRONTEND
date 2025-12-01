import { motion } from "framer-motion";


interface PageHeaderProps {
    title: string;
    subtitle: string
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {


    return (
        <div className="mb-6 sm:mb-8">
            <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 px-4 sm:px-0"
                initial="hidden"
                animate="visible"
            >
                {title}
            </motion.h1>

            <motion.p
                className="text-base sm:text-lg text-text-primary/80 font-light max-w-2xl px-4 sm:px-0"
                initial="hidden"
                animate="visible"
            >
                {subtitle}
            </motion.p>
        </div>
    );
};

export default PageHeader;