export interface InvestmentReturns {
    investment: number;
    monthlyReturn: number;
    totalReturn: number;
    totalAmount: number;
    bonus: number;
    totalReturnPercent: number;
    annualReturnPercent: number;
    selectedMonths: number;
}

export interface Investment {
    _id: string;
    userId: string;
    asset: string;
    amount: number;
    period: number;
    type: 'flexible' | 'locked';
    returns: InvestmentReturns;
    status: 'active' | 'completed' | 'cancelled';
    startDate: string;
    endDate: string;
    closedAt: string | null;
    remarks: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface InvestmentsResponse {
    docs: Investment[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}