"use client";

import ActionModal from "@/components/approvals/wallet-approvals/ActionModal";
import TransactionFilters from "@/components/approvals/wallet-approvals/TransactionFilters";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import Pagination from "@/components/common/Pagination";
import appClient from "@/lib/appClient";
import { FilterState, PaginationInfo as PaginationInfoType } from "@/type/table";
import { Transaction } from "@/type/transaction";
// import { FilterState, PaginationInfo as PaginationInfoType } from "@/types/table";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
    const [filters, setFilters] = useState<FilterState>({
        status: [],
        transactionType: [],
        dateRange: { start: "", end: "" },
        searchTerm: ""
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);

    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
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

    const handleGetTransaction = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await appClient.get("/api/approvals/wallet-approvals/get-transaction", {
                params: {
                    status: JSON.stringify(filters.status),
                    transactionType: JSON.stringify(filters.transactionType),
                    dateRange: JSON.stringify(filters.dateRange),
                    searchTerm: debounceSearch,
                    page: pagination.page,
                    limit: pagination.limit,
                },
            });

            console.log(response)
            if (response.data.status) {
                const { transactions } = response.data;
                setTransactionHistory(transactions.docs);
                setPagination(prev => ({
                    ...prev,
                    totalDocs: transactions.totalDocs,
                    totalPages: transactions.totalPages,
                    hasNextPage: transactions.hasNextPage,
                    hasPrevPage: transactions.hasPrevPage,
                    nextPage: transactions.nextPage,
                    prevPage: transactions.prevPage,
                }));
            } else {
                setError("Failed to fetch transactions");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            setError(errorMessage || "Failed to load transactions. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [filters, debounceSearch, pagination.page, pagination.limit]);

    useEffect(() => {
        handleGetTransaction();
    }, [handleGetTransaction]);

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
    };

    const handleLimitChange = (limit: number) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
    };

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleRowClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setShowActionModal(true);
    };

    const handleActionComplete = () => {
        setShowActionModal(false);
        setSelectedTransaction(null);
        handleGetTransaction(); // Refresh data
    };

    // Table Columns Definition
    const columns = [
        {
            key: "userId",
            header: "User",
            cell: (item: Transaction) => (
                <div>
                    <div className="font-medium text-text-primary">{item.userId.userName}</div>
                    <div className="text-xs text-text-primary/70">{item.userId.email}</div>
                </div>
            )
        },
        {
            key: "amount",
            header: "Amount",
            cell: (item: Transaction) => (
                <div className="font-medium text-text-primary">
                    {item.amount.toLocaleString()} {item.currencyType.toUpperCase()}
                </div>
            )
        },
        {
            key: "transactionType",
            header: "Type",
            cell: (item: Transaction) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${item.transactionType === 'add'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                    }`}>
                    {item.transactionType}
                </span>
            )
        },
        {
            key: "status",
            header: "Status",
            cell: (item: Transaction) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${item.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            key: "createdAt",
            header: "Created At",
            cell: (item: Transaction) => new Date(item.createdAt).toLocaleDateString()
        },
        {
            key: "actionTakenBy",
            header: "Action By",
            cell: (item: Transaction) => (
                item.actionTakenBy ? (
                    <div>
                        <div className="font-medium text-text-primary">{item.actionTakenBy.userName}</div>
                        <div className="text-xs text-text-primary/70">{item.actionTakenBy.email}</div>
                    </div>
                ) : (
                    <span className="text-text-primary/50">-</span>
                )
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
                    title="Wallet Approvals"
                    subtitle="Manage and approve all wallet transaction requests from users"
                />

                {/* Search Bar */}
                {/* <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by user name, email, or transaction ID..."
                            value={filters.searchTerm}
                            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                            className="w-full px-4 py-3 pl-10 border border-text-primary/20 rounded-lg bg-background text-text-primary placeholder-text-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div> */}

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <TransactionFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        showMobileFilters={showMobileFilters}
                        onMobileFiltersToggle={setShowMobileFilters}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-text-primary">{pagination.totalDocs}</div>
                                <div className="text-sm text-text-primary/70">Total Requests</div>
                            </div>
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {transactionHistory.filter(t => t.status === 'pending').length}
                                </div>
                                <div className="text-sm text-text-primary/70">Pending Approval</div>
                            </div>
                            <div className="bg-text-primary/5 border border-text-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {transactionHistory.filter(t => t.status === 'approved').length}
                                </div>
                                <div className="text-sm text-text-primary/70">Approved</div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <DataTable
                            data={transactionHistory}
                            columns={columns}
                            loading={loading}
                            onRowClick={handleRowClick}
                            emptyMessage="No transaction requests found"
                        />

                        {/* Pagination */}
                        {transactionHistory.length > 0 && (
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onLimitChange={handleLimitChange}
                            />
                        )}
                    </div>
                </div>

                {/* Action Modal */}
                {showActionModal && selectedTransaction && (
                    <ActionModal
                        transaction={selectedTransaction}
                        onClose={() => setShowActionModal(false)}
                        onActionComplete={handleActionComplete}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default Page;