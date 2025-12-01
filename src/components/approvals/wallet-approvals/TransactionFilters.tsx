"use client";

import { FilterState } from "@/type/table";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    showMobileFilters: boolean;
    onMobileFiltersToggle: (show: boolean) => void;
}

const TransactionFilters = ({
    filters,
    onFiltersChange,
    showMobileFilters,
    onMobileFiltersToggle
}: TransactionFiltersProps) => {

    const statusOptions = [
        { value: "approved", label: "Approved" },
        { value: "paused", label: "Paused" },
        { value: "on-hold", label: "Hold" },
        { value: "pending", label: "Pending" },
        { value: "rejected", label: "Rejected" },
    ];

    const typeOptions = [
        { value: "add", label: "Add Funds" },
        { value: "withdraw", label: "Withdraw" }
    ];

    const handleStatusChange = (status: string) => {
        const newStatus = filters.status.includes(status)
            ? filters.status.filter(s => s !== status)
            : [...filters.status, status];

        onFiltersChange({ ...filters, status: newStatus });
    };

    const handleTypeChange = (type: string) => {
        const currentTypes = filters.transactionType ?? [];
        const newType = currentTypes.includes(type)
            ? currentTypes.filter(t => t !== type)
            : [...currentTypes, type];

        onFiltersChange({ ...filters, transactionType: newType });
    };

    const handleDateChange = (field: 'start' | 'end', value: string) => {
        onFiltersChange({
            ...filters,
            dateRange: { ...filters.dateRange, [field]: value }
        });
    };

    const clearFilters = () => {
        onFiltersChange({
            status: [],
            transactionType: [],
            dateRange: { start: "", end: "" },
            searchTerm: ""
        });
    };

    const filterContent = (
        <div className="space-y-4">
            {/* Status Filter */}
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                <div className="space-y-2">
                    {statusOptions.map(option => (
                        <label key={option.value} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.status.includes(option.value)}
                                onChange={() => handleStatusChange(option.value)}
                                className="rounded border-text-primary/20 text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Type Filter */}
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Transaction Type</label>
                <div className="space-y-2">
                    {typeOptions.map(option => (
                        <label key={option.value} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.transactionType?.includes(option.value)}
                                onChange={() => handleTypeChange(option.value)}
                                className="rounded border-text-primary/20 text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Date Range */}
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
                <div className="space-y-2">
                    <input
                        type="date"
                        value={filters.dateRange.start}
                        onChange={(e) => handleDateChange('start', e.target.value)}
                        className="w-full px-3 py-2 border border-text-primary/20 rounded-md text-sm bg-background text-text-primary"
                    />
                    <input
                        type="date"
                        value={filters.dateRange.end}
                        onChange={(e) => handleDateChange('end', e.target.value)}
                        className="w-full px-3 py-2 border border-text-primary/20 rounded-md text-sm bg-background text-text-primary"
                    />
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm border border-text-primary/20 rounded-md hover:bg-text-primary/5 transition-colors text-text-primary"
            >
                Clear Filters
            </button>
        </div>
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => onMobileFiltersToggle(!showMobileFilters)}
                    className="flex items-center space-x-2 px-4 py-2 border border-text-primary/20 rounded-md text-sm text-text-primary hover:bg-text-primary/5"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filters</span>
                </button>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
                {showMobileFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden mb-6 p-4 border border-text-primary/20 rounded-md bg-background"
                    >
                        {filterContent}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-6 p-4 border border-text-primary/20 rounded-md bg-background">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Filters</h3>
                    {filterContent}
                </div>
            </div>
        </>
    );
};

export default TransactionFilters;