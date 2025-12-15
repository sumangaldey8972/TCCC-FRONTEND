export interface CategoryData {
    _id: string;
    name: string;
    slug: string;
}

export interface TagData {
    _id: string;
    name: string;
    slug: string;
}

export interface CreatedBy {
    _id: string;
    email: string;
}


export interface NewsItem {
    _id: string
    heading: string
    subheading: string
    slug: string
    author: string
    description: string
    excerpt: string
    image: string
    category: {
        _id: string
        name: string
        slug: string
    }
    parentCategory: {
        _id: string
        name: string
        slug: string
    }
    tags: Array<{
        _id: string
        name: string
        slug: string
    }>
    publishedAt: string
    viewsCount: number
    likesCount: number
    commentsCount: number
    isFeatured: boolean,
    credibilityScore?: number
}
