type ApiEndPoints = {
    auth: {
        signin: string,
        signUp: string,
        verifyOtp: string,
        refresh: string,
        logout: string,
        profilePicture: string,
        personalInfo: string,
        addressInfo: string,
        cryptoInfo: string,
        getUserInfo: (userId: string) => string
    },
    approvals: {
        wallet: {
            getTransaction: (searchTerm: string, status: string[], transactionType: string[], dateRange: { start?: string, end?: string }, page: string, limit: string) => string,
            action: string
        },
        kyc: {
            getKyc: (searchTerm: string, status: string[], transactionType: string[], dateRange: { start?: string, end?: string }, page: string, limit: string) => string,
            action: string
        }
    },
    wallet: {
        createTransaction: string,
        getTransactionByUserId: (userId: string, status: string[], transactionType: string[], dateRange: { start?: string, end?: string }, searchTerm: string, page: string, limit: string) => string,
        getTransactionHisotry: (transactionId: string) => string,
        get: (search: string, page: string, limit: string) => string
    },
    investment: {
        create: string,
        get: (userId: string, page: string, limit: string) => string
    }

}

// export const BASE_API_URL = "http://localhost:8080/"

export const BASE_API_URL = "https://coin-x-backend-zeta.vercel.app/"


export const API_ENDPOINTS: ApiEndPoints = {
    auth: {
        signin: "/auth/sign-in",
        signUp: "/auth/sign-up",
        verifyOtp: "/auth/verify-otp",
        refresh: "/auth/refresh",
        logout: "/auth/logout",
        profilePicture: "/auth/profile-picture",
        personalInfo: "/auth/personal-information",
        addressInfo: "/auth/address-information",
        cryptoInfo: "/auth/crypto-information",
        getUserInfo: (userId) => `/auth/get-user-info?userId=${userId}`
    },
    approvals: {
        wallet: {
            getTransaction: (searchTerm, status, transactionType, dateRange, page, limit) => `/transaction/all-user?status=${encodeURIComponent(JSON.stringify(status))}&transactionType=${encodeURIComponent(JSON.stringify(transactionType))}&page=${page}&limit=${limit}&dateRange=${encodeURIComponent(JSON.stringify(dateRange))}&searchTerm=${searchTerm}`,
            action: "/transaction/action"
        },
        kyc: {
            getKyc: (searchTerm, status, transactionType, dateRange, page, limit) => `/kyc/all-user?status=${encodeURIComponent(JSON.stringify(status))}&transactionType=${encodeURIComponent(JSON.stringify(transactionType))}&page=${page}&limit=${limit}&dateRange=${encodeURIComponent(JSON.stringify(dateRange))}&searchTerm=${searchTerm}`,
            action: "/kyc/action"
        }
    },
    wallet: {
        createTransaction: "/transaction",
        getTransactionByUserId: (userId, status, transactionType, dateRange, searchTerm, page, limit) => `/transaction/userId?userId=${userId}&status=${encodeURIComponent(JSON.stringify(status))}&transactionType=${encodeURIComponent(JSON.stringify(transactionType))}&dateRange=${encodeURIComponent(JSON.stringify(dateRange))}&searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
        getTransactionHisotry: (getTransactionHisotry) => `/transaction/history-by-transId?transactionId=${getTransactionHisotry}`,
        get: (search, page, limit) => `/wallet/get?search=${search}&page=${page}&limit=${limit} `
    },
    investment: {
        create: "/investment",
        get: (userId, page, limit) => `/investment/user-id?userId=${userId}&page=${page}&limit=${limit}`
    }
} 
