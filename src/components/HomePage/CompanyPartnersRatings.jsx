import { useSelector } from "react-redux";

const CompanyPartnersRatings = () => {

    const companyRatings = useSelector((state) => state.companies.companyPartners);
    const loading = useSelector((state) => state.companies.status);
    const error = useSelector((state) => state.companies.error);

    if (loading === 'loading') {
        return <div className="text-center py-10 text-gray-400">Loading companies...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
    // Handle mouse move for 3D tilt effect
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;

        // Glow effect position
        const glow = card.querySelector('.glow-effect');
        if (glow) {
            glow.style.left = `${x - cardRect.left}px`;
            glow.style.top = `${y - cardRect.top}px`;
        }
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    return (
        <section className="p-8
    md:mt-[12vh] lg:py-[7vh] dark:bg-gray-800 bg-gray-100"> 
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 mb-2">
                    Our Valued <span className='text-blue-600'>Partners</span>
                </h2>
                <p className="text-lg dark:text-gray-300 text-gray-600">
                    Collaborating with industry leaders to deliver excellence
                </p>
            </div>

            {/* Infinite Scrolling Marquee */}
            <div className="w-full overflow-hidden py-4 ">
                <div className="relative">
                    {/* First Marquee */}
                    {Array.isArray(companyRatings) && companyRatings.length > 0 ? (
                        <div className="flex whitespace-nowrap animate-marquee">
                            {companyRatings.map((company, index) => (
                                <div
                                    key={`first-${index}`}
                                    className="inline-flex flex-col items-center mx-4 w-[180px] md:w-[200px]"
                                >
                                    <div
                                        className="relative w-full h-32 md:h-36 px-14 dark:bg-gray-700 bg-white rounded-lg transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            transformStyle: 'preserve-3d',
                                            willChange: 'transform'
                                        }}
                                    >
                                        {/* Glow effect */}
                                        <span className="glow-effect absolute w-20 h-20 bg-blue-500 dark:bg-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 pointer-events-none"></span>

                                        {/* Border effect */}
                                        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-400 dark:group-hover:border-purple-400 transition-all duration-300 pointer-events-none"></div>

                                        {/* Inner shadow effect */}
                                        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[inset_0_0_20px_rgba(59,130,246,0.2)] dark:group-hover:shadow-[inset_0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 pointer-events-none"></div>

                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="h-14 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                        />

                                        {/* Company Info */}
                                        <div className="mt-2 text-center w-full px-2">
                                            <p className="text-sm font-medium dark:text-gray-200 text-gray-700 truncate">
                                                {company.name}
                                            </p>
                                            <div className="flex items-center justify-center mt-1">
                                                <span className="text-xs font-semibold dark:text-yellow-400 text-yellow-500 mr-1">
                                                    ⭐ {company.rating}
                                                </span>
                                                <span className="text-xs dark:text-gray-400 text-gray-500">
                                                    ({company.reviews}+)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">No partners found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CompanyPartnersRatings;