"use client";

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import Pagination from "@/components/common/Pagination";
import appClient from "@/lib/appClient";
import { FilterState, PaginationInfo as PaginationInfoType } from "@/type/table";
import { KYCData } from "@/type/kyc";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import KYCFilters from "@/components/approvals/kyc-approvals/KYCFilters";
import ActionModal from "@/components/approvals/kyc-approvals/ActionModal";

const Page = () => {
    const [filters, setFilters] = useState<FilterState>({
        status: [],
        dateRange: { start: "", end: "" },
        searchTerm: ""
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedKYC, setSelectedKYC] = useState<KYCData | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);

    const [kycData, setKycData] = useState<KYCData[]>([]);
    const [pagination, setPagination] = useState<PaginationInfoType>({
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
        page: 1,
        totalPages: 0,
        totalDocs: 0,
        limit: 10
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [debounceSearch, setDebounceSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(filters.searchTerm);
            setPagination(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.searchTerm]);

    const handleGetKYC = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await appClient.get("/api/approvals/kyc-approvals/get-kyc", {
                params: {
                    status: JSON.stringify(filters.status),
                    dateRange: JSON.stringify(filters.dateRange),
                    searchTerm: debounceSearch,
                    page: pagination.page,
                    limit: pagination.limit,
                },
            });

            console.log(response);

            if (response.data.status) {
                const { kyc } = response.data;
                setKycData(kyc.docs);
                setPagination(prev => ({
                    ...prev,
                    totalDocs: kyc.totalDocs,
                    totalPages: kyc.totalPages,
                    hasNextPage: kyc.hasNextPage,
                    hasPrevPage: kyc.hasPrevPage,
                    nextPage: kyc.nextPage,
                    prevPage: kyc.prevPage,
                }));
            } else {
                setError("Failed to fetch KYC requests");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            setError(errorMessage || "Failed to load KYC requests. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [filters, debounceSearch, pagination.page, pagination.limit]);

    useEffect(() => {
        handleGetKYC();
    }, [handleGetKYC]);

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
    };

    const handleLimitChange = (limit: number) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
    };

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleRowClick = (kyc: KYCData) => {
        setSelectedKYC(kyc);
        setShowActionModal(true);
    };

    const handleActionComplete = () => {
        setShowActionModal(false);
        setSelectedKYC(null);
        handleGetKYC(); // Refresh data
    };

    // Table Columns Definition for KYC
    const columns = [
        {
            key: "user",
            header: "User Information",
            cell: (item: KYCData) => (
                <div>
                    <div className="font-medium text-text-primary">{item.user.userName}</div>
                    <div className="text-xs text-text-primary/70">{item.user.email}</div>
                </div>
            )
        },
        {
            key: "country",
            header: "Country",
            cell: (item: KYCData) => (
                <div className="font-medium text-text-primary">
                    {item.country}
                </div>
            )
        },
        {
            key: "status",
            header: "Status",
            cell: (item: KYCData) => (
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${item.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                    item.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            item.status === 'on-hold' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                'bg-purple-100 text-purple-800 border border-purple-200' // paused
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            key: "createdAt",
            header: "Submitted",
            cell: (item: KYCData) => (
                <div className="text-sm">
                    <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-text-primary/50">
                        {new Date(item.createdAt).toLocaleTimeString()}
                    </div>
                </div>
            )
        },
        {
            key: "reviewedBy",
            header: "Last Action By",
            cell: (item: KYCData) => (
                item.reviewedBy ? (
                    <div>
                        <div className="font-medium text-text-primary">{item.reviewedBy.userName}</div>
                        <div className="text-xs text-text-primary/70">{item.reviewedBy.email}</div>
                    </div>
                ) : (
                    <span className="text-text-primary/50 text-sm">Not reviewed</span>
                )
            )
        },
        {
            key: "documents",
            header: "Documents",
            cell: (item: KYCData) => (
                <div className="text-sm text-text-primary/70">
                    {Object.keys(item.documents).length} files
                </div>
            )
        },
        {
            key: "actions",
            header: "Actions",
            cell: (item: KYCData) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(item);
                    }}
                    className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
                >
                    Review
                </button>
            )
        }
    ];

    return (
        <motion.div
            className="bg-background text-text-primary min-h-screen py-4 sm:py-6"
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <PageHeader
                    title="KYC Approvals"
                    subtitle="Review and verify user identity documentation for platform compliance."
                />

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <KYCFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        showMobileFilters={showMobileFilters}
                        onMobileFiltersToggle={setShowMobileFilters}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-text-primary">{pagination.totalDocs}</div>
                                <div className="text-sm text-text-primary/70">Total Requests</div>
                            </div>
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {kycData.filter(k => k.status === 'pending').length}
                                </div>
                                <div className="text-sm text-text-primary/70">Pending Review</div>
                            </div>
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {kycData.filter(k => k.status === 'approved').length}
                                </div>
                                <div className="text-sm text-text-primary/70">Approved</div>
                            </div>
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {kycData.filter(k => k.status === 'on-hold' || k.status === 'paused').length}
                                </div>
                                <div className="text-sm text-text-primary/70">On Hold/Paused</div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <DataTable
                            data={kycData}
                            columns={columns}
                            loading={loading}
                            onRowClick={handleRowClick}
                            emptyMessage="No KYC verification requests found"
                        />

                        {/* Pagination */}
                        {kycData.length > 0 && (
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onLimitChange={handleLimitChange}
                            />
                        )}
                    </div>
                </div>

                {/* Action Modal */}
                {showActionModal && selectedKYC && (
                    <ActionModal
                        kyc={selectedKYC}
                        onClose={() => setShowActionModal(false)}
                        onActionComplete={handleActionComplete}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default Page;