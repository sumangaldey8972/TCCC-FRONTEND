type ApiEndPoints = {
    auth: {
        signIn: string;
        signUp: string;
        verifyOtp: string;
        resendOtp: string;
        forgotPassword: string
    },
    wallets: {
        add: string
    },
    coins: {
        get: (status: string, page: string, limit: string) => string;
        stats: string
    },
    plan: {
        get: string
    },
    form: {
        add: string
    },
    news: {
        get: (parentCategoryName: string, page: string, limit: string) => string,
        slug: (slug: string) => string
    },
    newsLike: {
        toggle: string,
        getCount: (newsId: string) => string
    },
    newsComment: {
        submitComments: string
    },
    pdfSignature: {
        generateSignature: string
    },
    tokenSubmission: {
        tokenSubmission: string
    },
    consultation: {
        create: string
    },
    publisher: {
        create: string
    },
    category: {
        get: (search: string, page: string, limit: string) => string,
        getSubCategory: (parentCategoryName: string, page: string, limit: string) => string
    }
}

// export const BASE_API_URL = "https://api.thecoincartel.club/"
export const BASE_API_URL = "http://localhost:8080/"
// 

export const API_ENDPOINTS: ApiEndPoints = {
    auth: {
        signIn: "/auth/sign-in",
        signUp: "/auth/sign-up",
        verifyOtp: "/auth/verify-otp",
        resendOtp: "/auth/resend-otp",
        forgotPassword: "/auth/forgot-password"
    },
    wallets: {
        add: "/wallet/add"
    },
    coins: {
        get: (status, page, limit) => `/coins?status=${status}&page=${page}&limit=${limit}`,
        stats: '/coins/stats'
    },
    plan: {
        get: '/plans'
    },
    form: {
        add: '/member'
    },
    news: {
        get: (parentCategoryName, page, limit) => `/news?parentCategoryName=${parentCategoryName}&page=${page}&limit=${limit}`,
        slug: (slug) => `/news/slug?slug=${slug}`
    },
    newsLike: {
        toggle: "/news/like/",
        getCount: (newsId) => `/news/like/${newsId}`
    },
    newsComment: {
        submitComments: "/news/comment"
    },
    pdfSignature: {
        generateSignature: "/cloudionary"
    },
    tokenSubmission: {
        tokenSubmission: "/token-submission"
    },
    consultation: {
        create: "/consultation"
    },
    publisher: {
        create: "/publisher/create"
    },
    category: {
        get: (search, page, limit) => `/category?search=${search}&page=${page}&limit=${limit}`,
        getSubCategory: (parentCategoryName, page, limit) => `/category/sub-categories?categoryName=${parentCategoryName}&page=${page}&limit=${limit}`
    }
}
