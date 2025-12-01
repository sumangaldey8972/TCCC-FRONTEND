// types/kyc.ts
export interface KYCUser {
    userId: string;
    userName: string;
    email: string;
}

export interface KYCDocuments {
    idFront: string;
    idBack: string;
    selfie: string;
    additional: string[];
}

export interface KYCReviewer {
    _id: string;
    userName: string;
    email: string;
}

export interface KYCHistory {
    action: string;
    _id: string;
    createdAt: string;
    actionBy?: string;
}

export interface KYCData {
    _id: string;
    user: KYCUser;
    documents: KYCDocuments;
    country: string;
    status: 'pending' | 'approved' | 'rejected' | 'on-hold' | 'paused';
    reviewedBy: KYCReviewer | null;
    remarks: string | null;
    history: KYCHistory[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface KYCResponse {
    status: boolean;
    statusCode: number;
    kyc: {
        docs: KYCData[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage: number | null;
        nextPage: number | null;
    };
}