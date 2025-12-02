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

export interface NewsInterface {
    id: string;
    _id: string;
    heading: string;
    subheading: string;
    slug: string;
    author: string;
    description: string;
    excerpt: string;
    image: string;
    gallery?: string[];
    category: CategoryData;         // ✅ Now strongly typed object
    tags: TagData[];                // ✅ Array of tag objects
    status: "draft" | "published" | "archived";
    isFeatured: boolean;
    scheduledAt?: string | null;
    publishedAt?: string | null;
    createdBy: CreatedBy;
    sourceUrl?: string | null;
    credibilityScore: number;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
