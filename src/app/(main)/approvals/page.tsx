"use client";

import ApprovalItem from "@/components/approvals/ApprovalItem";
import EmptyState from "@/components/approvals/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import { motion } from "framer-motion";


const Page = () => {
    const items = [
        { name: "Wallet Approvals", href: "/wallet-approvals", description: " Manage wallet transaction approvals and permissions", type: "link", isChildren: false },
        { name: "KYC Approvals", href: "/kyc-approvals", description: "Review and approve user identity verification requests.", type: "link", isChildren: false },
    ];

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.6
            }
        }
    };

    return (
        <motion.div
            className="bg-background text-text-primary min-h-screen py-4 sm:py-6"

            initial="hidden"
            animate="visible"
        >
            <div className="max-w-6xl mx-auto">
                <PageHeader title="Approvals Section" subtitle=" Manage and maintain all your approvals from one centralized place with complete control and visibility." />


                {/* Approval Items Section */}
                <motion.div
                    className="px-4 sm:px-6 max-w-4xl mx-auto"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Your Approvals</h2>

                    <div className="space-y-3 sm:space-y-4">
                        {items.map((item, index) => (
                            <ApprovalItem
                                key={item.name}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>

                    <EmptyState />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Page;