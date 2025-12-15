"use client";

import appClient from "@/lib/appClient";
import { CategoryInterface } from "@/type/category.type";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import {
    Home,
    ChevronRight,
    Search,
    Sparkles,
    Star,
    Hash,
    Folder,
    FolderTree,
    ChevronDown,
    Newspaper,
    ArrowRight,
    Layers,
    Grid3x3,
    ListTree,
    Plus,
    Minus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsAndBlogsWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);
    const [data, setData] = useState<CategoryInterface[]>([]);
    const [subCategories, setSubCategories] = useState<CategoryInterface[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [featuredCategories, setFeaturedCategories] = useState<CategoryInterface[]>([]);
    const [showAllSubCategories, setShowAllSubCategories] = useState(false);

    const categoriesRef = useRef<HTMLDivElement>(null);
    const subCategoriesRef = useRef<HTMLDivElement>(null);

    // Use useMemo to compute derived values efficiently
    const { isHomePage, currentCategorySlug } = useMemo(() => {
        const segments = path.split('/').filter(Boolean);
        const isHome = segments.length === 1 && segments[0] === 'news-blogs';
        const categorySlug = segments.length > 1 ? segments[1] : null;

        return {
            isHomePage: isHome,
            currentCategorySlug: categorySlug
        };
    }, [path]);

    // Find current category based on slug
    const selectedCategory = useMemo(() => {
        if (!currentCategorySlug) return null;
        return data.find(cat =>
            cat.slug === currentCategorySlug ||
            cat.name.toLowerCase() === currentCategorySlug.toLowerCase()
        );
    }, [data, currentCategorySlug]);

    const handleCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await appClient.get("/api/category/get", {
                params: {
                    search: "",
                    page: 1,
                    limit: 100,
                    isActive: true,
                    sortBy: 'name',
                    sortOrder: 'asc'
                },
            });

            if (response.data.status) {
                const allCategories = response.data.categories.docs;
                // Get parent categories (null parent or empty parent)
                const parentCategories = allCategories.filter(
                    (category: CategoryInterface) =>
                        !category.parent || category.parent === null
                );

                const featured = allCategories.filter(
                    (category: CategoryInterface) => category.isFeatured
                );

                setData(parentCategories);
                setFeaturedCategories(featured);
            }
        } catch (error) {
            console.log("getting error while category list", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleCategories();
    }, [handleCategories]);

    const handleGetSubCategories = useCallback(async (parentCategoryName: string) => {
        if (!parentCategoryName) {
            setSubCategories([]);
            return;
        }

        setLoadingSubCategories(true);
        try {
            const response = await appClient.get("/api/category/getSubCategory", {
                params: {
                    parentCategoryName: parentCategoryName,
                    page: 1,
                    limit: 100,
                    isActive: true
                },
            });

            if (response.data.status) {
                const allSubCategories = response.data.subCategories?.docs || [];
                setSubCategories(allSubCategories);
            }
        } catch (error) {
            console.log("getting error while fetching subcategories", error);
            setSubCategories([]);
        } finally {
            setLoadingSubCategories(false);
        }
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            handleGetSubCategories(selectedCategory.name);
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory, handleGetSubCategories]);

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/news-blogs/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    };

    const handleCategorySelect = (category: CategoryInterface) => {
        const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
        handleNavigate(`/news-blogs/${slug}`);
    };

    const handleSubCategorySelect = (subCategory: CategoryInterface) => {
        const parentSlug = selectedCategory?.slug || selectedCategory?.name.toLowerCase().replace(/\s+/g, '-');
        const subSlug = subCategory.slug || subCategory.name.toLowerCase().replace(/\s+/g, '-');
        handleNavigate(`/news-blogs/${parentSlug}/${subSlug}`);
    };

    const handleScrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const handleScrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Get trending categories (featured or first 3)
    const trendingCategories = useMemo(() => {
        if (featuredCategories.length >= 3) {
            return featuredCategories.slice(0, 3);
        }
        return data.slice(0, 3);
    }, [data, featuredCategories]);

    // Filter out the current category from the list to avoid duplication
    const filteredCategories = useMemo(() => {
        return data.filter(cat => cat._id !== selectedCategory?._id);
    }, [data, selectedCategory]);

    // Display limited subcategories initially
    const displayedSubCategories = useMemo(() => {
        if (showAllSubCategories) {
            return subCategories;
        }
        return subCategories.slice(0, 8);
    }, [subCategories, showAllSubCategories]);

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <main className="container mx-auto px-2 sm:px-6 lg:px-8 py-2">

                {/* Breadcrumb - Show when on category page */}
                {!isHomePage && selectedCategory && (
                    <div className="flex items-center text-sm text-text-primary/70">
                        <button
                            onClick={() => handleNavigate("/news-blogs")}
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                        >
                            <Home className="w-2 h-2 md:w-4 md:h-4" />
                            <span>Home</span>
                        </button>
                        <ChevronRight className="w-2 h-2 md:w-4 md:h-4 mx-3 text-gray-400" />
                        <div className="flex items-center gap-2">
                            <Folder className="w-2 h-2 md:w-4 md:h-4 text-blue-500" />
                            <span className="font-medium text-text-primary capitalize">{selectedCategory.name}</span>
                        </div>
                    </div>
                )}


                {/* Main Categories Navigation */}
                <div className="relative mb-2">
                    <div className="flex items-center justify-between mb-4">
                        {/* Scroll buttons - only show if there are many categories */}
                        {data.length > 5 && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleScrollLeft(categoriesRef)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors border border-text-primary/20"
                                    aria-label="Scroll left"
                                >
                                    <ChevronRight className="w-2 h-2 md:w-4 md:h-4 text-text-primary/70 rotate-180" />
                                </button>
                                <button
                                    onClick={() => handleScrollRight(categoriesRef)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors border border-text-primary/20"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-2 h-2 md:w-4 md:h-4 text-text-primary/70" />
                                </button>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-text-primary border-t-transparent mx-auto mb-3"></div>
                                <p className="text-sm text-gray-500">Loading categories...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div
                                ref={categoriesRef}
                                className="flex gap-2 overflow-x-auto scrollbar-hide snap-x"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {/* Home Button - Always show */}
                                <motion.button
                                    onClick={() => handleNavigate("/news-blogs")}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`text-sm flex-shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-xl transition-all snap-start border flex items-center gap-2 ${isHomePage
                                        ? 'bg-text-primary text-background border-transparent shadow-lg'
                                        : 'bg-background border-gray-200 text-text-primary hover:border-text-primary hover:shadow-md'
                                        }`}
                                >
                                    <Home className="w-3 h-3 md:w-5 md:h-5" />
                                    <span className="text-sm font-medium">Home</span>
                                </motion.button>

                                {/* If on category page, show current category as selected */}
                                {selectedCategory && !isHomePage && (
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-sm flex-shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-xl bg-text-primary text-background shadow-lg flex items-center gap-2"
                                    >
                                        <Folder className="w-3 h-3 md:w-5 md:h-5" />
                                        <span className="text-sm font-medium capitalize">{selectedCategory.name}</span>
                                        {selectedCategory.isFeatured && (
                                            <Sparkles className="w-2 h-2 md:w-4 md:h-4 text-yellow-300" />
                                        )}
                                    </motion.div>
                                )}

                                {/* Category Cards - filter out current category if on category page */}
                                {filteredCategories.map((cat) => {
                                    const isFeatured = cat.isFeatured;
                                    return (
                                        <motion.button
                                            key={cat._id}
                                            onClick={() => handleCategorySelect(cat)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`text-sm flex-shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-xl transition-all snap-start border flex items-center gap-2 ${isFeatured
                                                ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 hover:shadow-md'
                                                : 'bg-background border-gray-200 hover:border-text-primary hover:shadow-md'
                                                }`}
                                        >
                                            {isFeatured ? (
                                                <Star className="w-3 h-3 md:w-5 md:h-5 text-amber-500" />
                                            ) : (
                                                <Folder className="w-3 h-3 md:w-5 md:h-5 text-gray-500" />
                                            )}
                                            <span className={`text-sm font-medium capitalize ${isFeatured ? 'text-amber-700' : 'text-text-primary'}`}>
                                                {cat.name}
                                            </span>
                                            {isFeatured && (
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xxs">
                                                    Featured
                                                </span>
                                            )}
                                        </motion.button>
                                    );
                                })}

                                {/* View All Button */}
                                {data.length > 8 && (
                                    <button
                                        onClick={() => handleNavigate("/news-blogs/categories")}
                                        className="flex-shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-xl border border-text-primary/20 bg-background hover:border-text-primary hover:text-text-primary transition-all flex items-center gap-2 text-sm"
                                    >
                                        <span className="font-medium">View All</span>
                                        <ArrowRight className="w-2 h-2 md:w-4 md:h-4" />
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>


                {/* Hero Section */}
                <div className="mb-2">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 md:gap-6 mb-2">
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <div>
                                    <h1 className="text-lg md:text-2xl font-bold text-text-primary capitalize">
                                        {isHomePage ? " News | Blogs" : selectedCategory?.name}
                                    </h1>
                                    <p className="text-xs md:text-sm text-text-primary/70 mt-1">
                                        {isHomePage ? "Stay updated with the latest breaking news" : selectedCategory?.description}
                                    </p>
                                </div>
                            </div>

                            {/* Search Bar - Only show on home page */}
                            {isHomePage && (
                                <form onSubmit={handleSearch} className="max-w-md mt-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search news, topics, or articles..."
                                            className="text-sm w-full pl-10 pr-4 py-2.5 bg-background rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-text-primary/70 focus:border-transparent transition-all"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-text-primary text-background rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Stats/Quick Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                            {trendingCategories.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-text-primary/70">Trending Topics</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingCategories.map((cat) => (
                                            <button
                                                key={cat._id}
                                                onClick={() => handleCategorySelect(cat)}
                                                className="capitalize px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all text-xs font-medium"
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Subcategories Section - Only show when a category is selected */}
                <AnimatePresence>
                    {selectedCategory && !isHomePage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4"
                        >
                            <div className="border-t border-gray-200">
                                <div className="flex items-center justify-between">

                                    {/* Subcategory stats and controls */}
                                    <div className="flex items-center">
                                        {subCategories.length > 8 && (
                                            <button
                                                onClick={() => setShowAllSubCategories(!showAllSubCategories)}
                                                className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors m-1"
                                            >
                                                {showAllSubCategories ? (
                                                    <>
                                                        <Minus className="w-3 h-3" />
                                                        Show Less
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="w-3 h-3" />
                                                        Show All ({subCategories.length})
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        {subCategories.length > 5 && (
                                            <>
                                                <button
                                                    onClick={() => handleScrollLeft(subCategoriesRef)}
                                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-text-primary/20"
                                                    aria-label="Scroll left"
                                                >
                                                    <ChevronRight className="w-3 h-3 text-text-primary/70 rotate-180" />
                                                </button>
                                                <button
                                                    onClick={() => handleScrollRight(subCategoriesRef)}
                                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-text-primary/20"
                                                    aria-label="Scroll right"
                                                >
                                                    <ChevronRight className="w-3 h-3 text-text-primary/70" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {loadingSubCategories ? (
                                    <div className="flex justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                                    </div>
                                ) : subCategories.length > 0 ? (
                                    <>
                                        <div
                                            ref={subCategoriesRef}
                                            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 pt-2"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            {displayedSubCategories.map((subCat) => (
                                                <motion.button
                                                    key={subCat._id}
                                                    onClick={() => handleSubCategorySelect(subCat)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-text-primary/20 bg-background hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-2 group"
                                                >
                                                    <div className={`p-1.5 rounded-md ${subCat.isFeatured
                                                        ? 'bg-gradient-to-br from-yellow-50 to-amber-50'
                                                        : 'bg-background '
                                                        }`}>
                                                        <Layers className={`w-3 h-3 md:w-4 md:h-4 ${subCat.isFeatured ? 'text-amber-500' : 'text-text-primary'}`} />
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="text-xs md:text-sm font-medium text-text-primary capitalize">
                                                            {subCat.name}
                                                        </span>
                                                    </div>
                                                    {subCat.isFeatured && (
                                                        <Star className="w-2 h-2 md:w-3 md:h-3 text-amber-500" />
                                                    )}
                                                </motion.button>
                                            ))}

                                            {/* View All Subcategories Button */}
                                            {subCategories.length > 8 && !showAllSubCategories && (
                                                <button
                                                    onClick={() => setShowAllSubCategories(true)}
                                                    className="flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-text-primary/20 bg-background hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-2"
                                                >
                                                    <div className="p-1.5 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50">
                                                        <ListTree className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                                                    </div>
                                                    <span className="text-xs md:text-sm font-medium text-text-primary">
                                                        +{subCategories.length - 8} more
                                                    </span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Subcategory count */}
                                        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                                                    {subCategories.length} subcategories
                                                </span>
                                                {subCategories.filter(sc => sc.isFeatured).length > 0 && (
                                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
                                                        {subCategories.filter(sc => sc.isFeatured).length} featured
                                                    </span>
                                                )}
                                            </div>
                                            {subCategories.length > 0 && (
                                                <button
                                                    onClick={() => handleNavigate(`/news-blogs/${selectedCategory.slug || selectedCategory.name}/all`)}
                                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    Browse all →
                                                </button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-6 border border-text-primary/20 rounded-xl bg-gray-50">
                                        <Grid3x3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">No subcategories available</p>
                                        <p className="text-xs text-gray-500 mt-1">This category doesn't have any sub-topics yet</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>



                {/* Page Content */}
                <div className="bg-background rounded-2xl shadow-sm overflow-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}