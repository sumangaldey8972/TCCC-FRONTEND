"use client";

import { TableProps } from "@/type/table";
import { motion } from "framer-motion";

const DataTable = <T,>({
    data,
    columns,
    loading = false,
    onRowClick,
    emptyMessage = "No data found"
}: TableProps<T>) => {

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    if (loading) {
        return (
            <div className="bg-background rounded-lg border border-text-primary/20 overflow-hidden">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="p-4 border-b border-text-primary/10 animate-pulse">
                        <div className="flex space-x-4">
                            {columns.map((_, colIndex) => (
                                <div key={colIndex} className="flex-1">
                                    <div className="h-4 bg-text-primary/20 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-background rounded-lg border border-text-primary/20 p-8 text-center">
                <svg className="w-12 h-12 text-text-primary/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
                <p className="text-text-primary/60">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="bg-background rounded-lg border border-text-primary/20 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-text-primary/20 bg-text-primary/5">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-4 text-left text-xs font-medium text-text-primary/70 uppercase tracking-wider whitespace-nowrap"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-text-primary/10">
                        {data.map((item, index) => (
                            <motion.tr
                                key={index}
                                custom={index}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                onClick={() => onRowClick?.(item)}
                                className={`hover:bg-text-primary/5 transition-colors duration-200 ${onRowClick ? 'cursor-pointer' : ''
                                    }`}
                            >
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm">
                                        {column.cell ? column.cell(item) : (item[column.key as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => onRowClick?.(item)}
                        className={`bg-text-primary/5 rounded-lg p-4 border border-text-primary/20 hover:bg-text-primary/10 transition-colors duration-200 ${onRowClick ? 'cursor-pointer' : ''
                            }`}
                    >
                        {columns.map((column, colIndex) => (
                            <div key={colIndex} className="flex justify-between items-start py-2 border-b border-text-primary/10 last:border-b-0">
                                <span className="text-xs font-medium text-text-primary/70 capitalize">
                                    {column.header}:
                                </span>
                                <span className="text-sm text-text-primary text-right flex-1 ml-2">
                                    {column.cell ? column.cell(item) : (item[column.key as keyof T] as React.ReactNode)}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;