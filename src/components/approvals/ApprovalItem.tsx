import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ApprovalItemProps {
    item: {
        name: string;
        href: string;
        type: string;
        isChildren: boolean;
        description: string
    };
    index: number;
}

const ApprovalItem = ({ item, index }: ApprovalItemProps) => {

    const router = useRouter()

    const handleNavigate = (route: string) => {
        router.push(`/approvals/${route}`)
    }

    return (
        <motion.div
            className="bg-text-primary/10 text-text-primary p-4 rounded-lg border border-text-primary/20 cursor-pointer group w-full"
            whileHover="hover"
            whileTap="tap"
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-center justify-between">
                <div onClick={() => handleNavigate(item.href)} className="flex items-center space-x-3 flex-1 min-w-0">
                    <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    />
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                        <p className="text-text-primary/70 text-sm truncate">
                            {item.description}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0 ml-2"
                    transition={{ duration: 0.2 }}
                >
                    <svg
                        className="w-5 h-5 text-text-primary/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ApprovalItem;