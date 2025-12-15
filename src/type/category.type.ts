export interface CategoryInterface {
    _id: string,
    name: string,
    slug: string,
    description: string,
    parent: {
        _id: string,
        name: string
    },
    banner: string,
    metaTitle: string,
    metaDescription: string,
    isFeatured: boolean,
    icon: string,
    isActive: boolean,
    createdBy: {
        _id: string,
        email: string
    },
    createdAt: string,
    updatedAt: string,
    __v: Number
}

