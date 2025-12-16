"use client";

import appClient from "@/lib/appClient";
import { CategoryInterface } from "@/type/category.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import {
    Home,
    ChevronRight,
    Search,
    Sparkles,
    Star,
    Folder,
    ArrowRight,
    Layers,
    Grid3x3,
    ListTree,
    Plus,
    Minus,
    Newspaper,
    TrendingUp,
    Hash,
    Tag,
    Bookmark,
    Clock,
    Flame,
    BookOpen,
    Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsAndBlogsWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);
    const [data, setData] = useState<CategoryInterface[]>([]);
    const [subCategories, setSubCategories] = useState<CategoryInterface[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [featuredCategories, setFeaturedCategories] = useState<CategoryInterface[]>([]);
    const [showAllSubCategories, setShowAllSubCategories] = useState(false);

    const categoriesRef = useRef<HTMLDivElement>(null);
    const subCategoriesRef = useRef<HTMLDivElement>(null);

    // Get current subcategory from URL
    const currentSubCategory = useMemo(() => {
        const segments = path.split('/').filter(Boolean);
        return segments.length > 2 ? segments[2] : null;
    }, [path]);

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
            router.push(`/news-blogs?q=${encodeURIComponent(searchQuery)}`);
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

    const handleSubCategoryClick = (subCat: CategoryInterface) => {
        handleSubCategorySelect(subCat);
        // Scroll subcategories into view
        setTimeout(() => {
            subCategoriesRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    };

    // Get trending categories
    const trendingCategories = useMemo(() => {
        if (featuredCategories.length >= 3) {
            return featuredCategories.slice(0, 3);
        }
        return data.slice(0, 3);
    }, [data, featuredCategories]);

    // Filter out the current category from the list
    const filteredCategories = useMemo(() => {
        return data.filter(cat => cat._id !== selectedCategory?._id);
    }, [data, selectedCategory]);

    // Display limited subcategories initially
    const displayedSubCategories = useMemo(() => {
        if (showAllSubCategories) {
            return subCategories;
        }
        return subCategories.slice(0, 6);
    }, [subCategories, showAllSubCategories]);

    return (
        <div className="min-h-screen bg-background">
            {/* Traditional Header Section */}
            <div className="border-b border-text-primary/10 bg-gradient-to-r from-background to-background/95">
                <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3">
                    {/* Compact Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleNavigate("/news-blogs")}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-text-primary/5 transition-colors group"
                            >
                                <Home className="w-4 h-4 text-text-primary/70 group-hover:text-text-primary" />
                                <span className="text-sm font-medium text-text-primary/80 group-hover:text-text-primary">
                                    News Home
                                </span>
                            </button>

                            {selectedCategory && (
                                <>
                                    <ChevronRight className="w-3 h-3 text-text-primary/40" />
                                    <div onClick={() => router.push(`/news-blogs/${selectedCategory.name}`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer">
                                        <Folder className="w-4 h-4 text-text-primary" />
                                        <span className="text-sm font-semibold text-text-primary capitalize">
                                            {selectedCategory.name}
                                        </span>
                                    </div>
                                </>
                            )}

                            {currentSubCategory && (
                                <>
                                    <ChevronRight className="w-3 h-3 text-text-primary/40" />
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100">
                                        <Tag className="w-3 h-3 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-700 capitalize">
                                            {currentSubCategory.replace(/-/g, ' ')}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <form onSubmit={handleSearch} className="hidden sm:block">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-primary/50" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-48 lg:w-64 pl-10 pr-4 py-1.5 bg-background border border-text-primary/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-text-primary/30 focus:border-text-primary/30"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Main Navigation - Compact Categories */}
                    <div className="relative">
                        {loading ? (
                            <div className="flex items-center gap-2 py-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-8 bg-text-primary/10 rounded-lg animate-pulse w-24" />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
                                {/* Home */}
                                <motion.button
                                    onClick={() => handleNavigate("/news-blogs")}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border flex items-center gap-1.5 ${isHomePage
                                        ? 'bg-text-primary text-background border-transparent shadow-sm'
                                        : 'border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5'
                                        }`}
                                >
                                    <Newspaper className="w-4 h-4" />
                                    All News
                                </motion.button>

                                {/* Featured Categories */}
                                {featuredCategories.slice(0, 2).map((cat) => (
                                    <motion.button
                                        key={cat._id}
                                        onClick={() => handleCategorySelect(cat)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border flex items-center gap-1.5 ${selectedCategory?._id === cat._id
                                            ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-300 text-amber-700'
                                            : 'border-text-primary/20 hover:border-amber-300 hover:bg-amber-50'
                                            }`}
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        {cat.name}
                                    </motion.button>
                                ))}

                                {/* Other Categories */}
                                {data.slice(0, 6).map((cat) => {
                                    if (featuredCategories.some(f => f._id === cat._id)) return null;
                                    const isSelected = selectedCategory?._id === cat._id;
                                    return (
                                        <motion.button
                                            key={cat._id}
                                            onClick={() => handleCategorySelect(cat)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border flex items-center gap-1.5 ${isSelected
                                                ? 'bg-text-primary/10 border-text-primary text-text-primary'
                                                : 'border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5'
                                                }`}
                                        >
                                            <Folder className="w-3 h-3" />
                                            {cat.name}
                                        </motion.button>
                                    );
                                })}

                                {data.length > 7 && (
                                    <button
                                        onClick={() => handleNavigate("/news-blogs/categories")}
                                        className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5 transition-all text-sm font-medium flex items-center gap-1.5"
                                    >
                                        <Compass className="w-3 h-3" />
                                        More
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4">
                {/* Subcategories Section - Only show when a category is selected */}
                <AnimatePresence>
                    {selectedCategory && !isHomePage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4"
                            ref={subCategoriesRef}
                        >
                            <div className="bg-gradient-to-r from-background to-background/95 rounded-xl border border-text-primary/10 p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <ListTree className="w-4 h-4 text-text-primary/60" />
                                            <span className="text-sm font-semibold text-text-primary">
                                                Topics in {selectedCategory.name}
                                            </span>
                                        </div>
                                        <span className="text-xs px-1.5 py-0.5 bg-text-primary/10 rounded text-text-primary/70">
                                            {subCategories.length}
                                        </span>
                                    </div>

                                    {subCategories.length > 6 && (
                                        <button
                                            onClick={() => setShowAllSubCategories(!showAllSubCategories)}
                                            className="flex items-center gap-1 px-2 py-1 text-xs bg-text-primary/5 hover:bg-text-primary/10 rounded transition-colors"
                                        >
                                            {showAllSubCategories ? (
                                                <>
                                                    <Minus className="w-3 h-3" />
                                                    Show Less
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-3 h-3" />
                                                    Show More
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {loadingSubCategories ? (
                                    <div className="flex items-center justify-center py-3">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-text-primary border-t-transparent"></div>
                                    </div>
                                ) : subCategories.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {/* All Topics Button */}
                                        <button
                                            onClick={() => handleNavigate(`/news-blogs/${selectedCategory.slug || selectedCategory.name}`)}
                                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1 ${!currentSubCategory
                                                ? 'bg-text-primary text-background border-transparent'
                                                : 'border-text-primary/20 hover:border-text-primary hover:bg-text-primary/5'
                                                }`}
                                        >
                                            <BookOpen className="w-3 h-3" />
                                            All Topics
                                        </button>

                                        {/* Subcategory Tags */}
                                        {displayedSubCategories.map((subCat) => {
                                            const isActive = currentSubCategory === (subCat.slug || subCat.name.toLowerCase().replace(/\s+/g, '-'));
                                            return (
                                                <motion.button
                                                    key={subCat._id}
                                                    onClick={() => handleSubCategoryClick(subCat)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1 ${isActive
                                                        ? subCat.isFeatured
                                                            ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-300 text-amber-700'
                                                            : 'bg-text-primary/10 border-text-primary text-text-primary'
                                                        : 'border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5'
                                                        }`}
                                                >
                                                    {subCat.isFeatured ? (
                                                        <Star className="w-3 h-3" />
                                                    ) : (
                                                        <Hash className="w-3 h-3" />
                                                    )}
                                                    {subCat.name}
                                                    {isActive && (
                                                        <div className="w-1.5 h-1.5 bg-text-primary rounded-full ml-1" />
                                                    )}
                                                </motion.button>
                                            );
                                        })}

                                        {/* View All Button */}
                                        {subCategories.length > 6 && !showAllSubCategories && (
                                            <button
                                                onClick={() => setShowAllSubCategories(true)}
                                                className="px-2.5 py-1.5 rounded-lg border border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5 transition-all text-xs font-medium flex items-center gap-1"
                                            >
                                                <Plus className="w-3 h-3" />
                                                +{subCategories.length - 6} more
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-4 border border-text-primary/10 rounded-lg bg-text-primary/5">
                                        <Grid3x3 className="w-5 h-5 text-text-primary/40 mx-auto mb-1" />
                                        <p className="text-sm text-text-primary/60">No topics available</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Page Content */}
                <div className="bg-background rounded-xl">
                    {children}
                </div>

                {/* Mobile Search */}
                <div className="sm:hidden mt-4">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-primary/50" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search in news..."
                                className="w-full pl-10 pr-4 py-2 bg-background border border-text-primary/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-text-primary/30 focus:border-text-primary/30"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Quick Actions Footer */}
            {!isHomePage && (
                <div className="border-t border-text-primary/10 mt-6">
                    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-primary/60">Quick Access:</span>
                                <div className="flex items-center gap-1">
                                    {trendingCategories.map((cat) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => handleCategorySelect(cat)}
                                            className="px-2 py-0.5 text-xs bg-text-primary/5 hover:bg-text-primary/10 rounded transition-colors"
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="text-xs text-text-primary/60 hover:text-text-primary flex items-center gap-1"
                            >
                                <ArrowRight className="w-3 h-3 rotate-90" />
                                Back to top
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}