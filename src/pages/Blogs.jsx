// src/pages/Blogs.jsx
import React, { useState, useMemo } from 'react'
import MaintenancePage from '../lib/MaintenancePage'
import { getSeoData } from "../lib/seoUtil";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SafeImage } from '../lib/SafeImage';
import { blogCardDetails } from '../data/blogCardDetails';

export default function Blogs() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const seo = getSeoData(path);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Get unique tags for filter
  const tags = ['All', ...new Set(blogCardDetails.map(post => post.tag))];

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return blogCardDetails.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || post.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, blogCardDetails]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220] transition-colors duration-300 mt-14">
      {/* seo tags */}
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      <link rel="canonical" href={seo.canonicalTag} />

      {/* Enhanced Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e1b4b] py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full -translate-y-36 translate-x-36 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full translate-y-36 -translate-x-36 opacity-20 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                <SafeImage src="/icons/book.svg" alt='books' className="w-7 h-7 mr-2" />
                Latest Insights
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Blogs</span>
              </h1>
              <p className="mt-4 text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Discover expert tips, industry insights, and practical guides about technology, career growth, and innovation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto">

              <SafeImage
                src="/blog-reading.gif"
                alt="Help icon"
                className="w-[300px] h-[200px] object-contain drop-shadow-lg"
              />
            </div>

          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Tag Filter */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedTag === tag
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Showing {filteredPosts.length} of {blogCardDetails.length} articles
            </p>
            {(searchQuery || selectedTag !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1"
              >
                Clear filters
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 lg:py-24">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No articles found</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group relative bg-white dark:bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg dark:shadow-2xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-48 lg:h-56 w-full overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Tag Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/70 text-slate-800 dark:text-slate-200 backdrop-blur-sm">
                      {post.tag}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                      ⏱️ {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7">
                  <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm lg:text-base leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author and Date */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SafeImage
                        src="/icons/small-logo.svg"
                        alt="IT Accurate logo"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 p-1"
                      />
                      <div className="text-sm">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{post.author}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs">{post.date}</div>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 group/btn"
                    >
                      Read
                      <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500 pointer-events-none"></div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12 lg:mt-16">
            <button className="px-8 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all duration-300 hover:-translate-y-0.5 border border-slate-200 dark:border-slate-700">
              Load More Articles
            </button>
          </div>
        )}
      </main>
    </div>
  );
}