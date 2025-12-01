
export type TransactionStatus = "approved" | "rejected" | "pending" | "pause" | "hold" | string;

export type TransactionType = "add" | "withdraw" | string

export interface Transaction {
    _id: number;
    userId: {
        userName: string,
        email: string
    };
    amount: number;
    currencyType: string;
    transactionId: string;
    screenshot: string;
    status: TransactionStatus;
    transactionType: TransactionType;
    actionTakenBy?: {
        userName: string;
        firstName: string;
        lastName: string;
        _id: string;
        email: string;
    };
    actionTakenAt?: string;
    remarks?: string;
    createdAt: string
}


export interface StatusHistory {
    _id: string;
    transactionId: string;
    changeType: string;
    changedBy: string;
    remarks: string | null;
    createdAt: string;
    updatedAt: string;
    oldData?: TransactionData;
    newData?: TransactionData;
}

export interface TransactionData {
    status: string;
    actionTakenBy?: {
        _id: string;
        userName: string;
        email: string;
    };
    remarks?: string;
    actionTakenAt?: string;
    userId: {
        _id?: string,
        email?: string,
        userName?: string
    }
}

export interface StatusHistoryResponse {
    status: boolean;
    statusCode: number;
    data: StatusHistory[];
}

export interface StatusHistoryDrawerProps {
    transaction: Transaction;
    isOpen: boolean;
    onClose: () => void;
}