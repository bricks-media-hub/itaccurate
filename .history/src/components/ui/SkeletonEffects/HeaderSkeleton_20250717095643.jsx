

export const HeaderSkeleton = () => {
    return (
        <header className="fixed top-0 z-50 w-full dark:bg-gray-800 bg-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    {/* Logo Skeleton */}
                    <div className="flex items-center">
                        <div className="h-12 w-32 rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                    </div>

                    {/* Desktop Navigation Skeleton - Hidden on mobile */}
                    <div className="hidden md:flex items-center space-x-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-1">
                                <div className="h-5 w-5 rounded-full dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                                <div className="h-4 w-16 rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                            </div>
                        ))}

                        {/* Search Bar Skeleton */}
                        <div className="relative ml-4 w-48">
                            <div className="h-8 rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                        </div>

                        {/* Theme Toggle Skeleton */}
                        <div className="ml-4 h-8 w-8 rounded-full dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                    </div>

                    {/* Mobile Menu Button Skeleton */}
                    <div className="md:hidden flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                        <div className="h-8 w-8 rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>

                {/* Mobile Menu Skeleton - Only visible when open (you might control this with state) */}
                <div className="md:hidden mt-2 space-y-2 pb-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-10 w-full rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                            {/* Submenu items - conditionally rendered */}
                            {i === 1 && (
                                <div className="ml-4 space-y-2">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="h-8 w-full rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="h-10 w-full rounded-md dark:bg-gray-700 bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        </header>
    );
};