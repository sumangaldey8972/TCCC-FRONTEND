type ApiEndPoints = {
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
        get: (page: string, limit: string) => string,
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
    }
}

export const BASE_API_URL = "https://api.thecoincartel.club/"
// export const BASE_API_URL = "http://localhost:8080/"
// 

export const API_ENDPOINTS: ApiEndPoints = {
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
        get: (page, limit) => `/news?page=${page}&limit=${limit}`,
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
    }
}
