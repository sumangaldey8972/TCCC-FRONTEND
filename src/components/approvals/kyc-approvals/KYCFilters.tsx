"use client";

import { FilterState } from "@/type/table";
import { X, Filter } from "lucide-react";

interface KYCFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    showMobileFilters: boolean;
    onMobileFiltersToggle: (show: boolean) => void;
}

const KYCFilters = ({ filters, onFiltersChange, showMobileFilters, onMobileFiltersToggle }: KYCFiltersProps) => {
    const statusOptions = [
        { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
        { value: 'approved', label: 'Approved', color: 'bg-green-500' },
        { value: 'rejected', label: 'Rejected', color: 'bg-red-500' },
        { value: 'on-hold', label: 'On Hold', color: 'bg-orange-500' },
        { value: 'paused', label: 'Paused', color: 'bg-purple-500' }
    ];

    const handleStatusChange = (status: string) => {
        const newStatus = filters.status.includes(status)
            ? filters.status.filter(s => s !== status)
            : [...filters.status, status];

        onFiltersChange({ ...filters, status: newStatus });
    };

    const handleDateChange = (field: 'start' | 'end', value: string) => {
        onFiltersChange({
            ...filters,
            dateRange: { ...filters.dateRange, [field]: value }
        });
    };

    const handleClearAll = () => {
        onFiltersChange({
            status: [],
            dateRange: { start: "", end: "" },
            searchTerm: ""
        });
    };

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Status Filter */}
            <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Status</h3>
                <div className="space-y-2">
                    {statusOptions.map(option => (
                        <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.status.includes(option.value)}
                                onChange={() => handleStatusChange(option.value)}
                                className="w-4 h-4 text-cyan-600 border-text-primary/30 rounded focus:ring-cyan-500"
                            />
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                                <span className="text-text-primary group-hover:text-cyan-400 transition-colors">
                                    {option.label}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Date Range Filter */}
            <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Date Range</h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm text-text-primary/70 mb-1">From</label>
                        <input
                            type="date"
                            value={filters.dateRange.start}
                            onChange={(e) => handleDateChange('start', e.target.value)}
                            className="w-full px-3 py-2 border border-text-primary/20 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text-primary/70 mb-1">To</label>
                        <input
                            type="date"
                            value={filters.dateRange.end}
                            onChange={(e) => handleDateChange('end', e.target.value)}
                            className="w-full px-3 py-2 border border-text-primary/20 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={handleClearAll}
                className="w-full px-4 py-2 bg-text-primary/10 border border-text-primary/20 rounded-lg text-text-primary hover:bg-text-primary/20 transition-colors"
            >
                Clear All Filters
            </button>
        </div>
    );

    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden lg:block w-80">
                <div className="bg-text-primary/5 border border-text-primary/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-text-primary">Filters</h2>
                        <Filter className="w-5 h-5 text-text-primary/70" />
                    </div>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Filters Button */}
            <button
                onClick={() => onMobileFiltersToggle(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
                <Filter size={16} />
                Filters
            </button>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
                <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
                    <div className="absolute right-0 top-0 h-full w-80 bg-background border-l border-text-primary/20 shadow-xl">
                        <div className="p-6 h-full overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-text-primary">Filters</h2>
                                <button
                                    onClick={() => onMobileFiltersToggle(false)}
                                    className="p-1 hover:bg-text-primary/10 rounded"
                                >
                                    <X size={20} className="text-text-primary" />
                                </button>
                            </div>
                            <FilterContent />
                            <button
                                onClick={() => onMobileFiltersToggle(false)}
                                className="w-full mt-6 px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default KYCFilters;