// src/pages/BlogDetail.jsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getSeoData } from "../../lib/seoUtil";
import { useLocation } from 'react-router-dom';
import { SafeImage } from '../../lib/SafeImage';
import FreeDemoForm from '../ContactUs/FreeDemoForm';
import { blogs } from '../../data/blogs';

export default function BlogDetail() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.slice(1);
    const seo = getSeoData(path);
    const [isCopied, setIsCopied] = useState(false);
    const [showForm, setShowForm] = useState(false);



    const post = blogs.find(p => String(p.id) === String(id));

    if (!post) {
        navigate('/blogs');
        return null;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    // Parse content with proper heading hierarchy
    const parseContent = (content) => {
        const lines = content.split('\n').filter(line => line.trim());
        const elements = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">{line.replace('### ', '')}</h3>);
            } else if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">{line.replace('## ', '')}</h2>);
            } else if (line.startsWith('# ')) {
                elements.push(<h1 key={i} className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-8">{line.replace('# ', '')}</h1>);
            } else if (line.startsWith('- **')) {
                // List items
                const listItems = [line];
                while (lines[i + 1] && lines[i + 1].startsWith('- **')) {
                    listItems.push(lines[++i].trim());
                }
                elements.push(
                    <ul key={i} className="my-6 space-y-2">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">•</span>
                                <span className="text-slate-700 dark:text-slate-300">{item.replace('- **', '').replace('**', '')}</span>
                            </li>
                        ))}
                    </ul>
                );
            } else if (line.startsWith('#### ')) {
                elements.push(<h4 key={i} className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">{line.replace('#### ', '')}</h4>);
            } else {
                elements.push(<p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg">{line}</p>);
            }
        }

        return elements;
    };

    const relatedPosts = blogs.filter(p => p.id !== post.id).slice(0, 2);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1220] transition-colors duration-300 mt-14">
            <title>{seo.metaTitle || post.title}</title>
            <meta name="description" content={post.excerpt || seo.metaDescription} />
            <link rel="canonical" href={seo.canonicalTag} />


            <main className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
                <article className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                    {/* Featured Image */}
                    <div className="relative h-64 lg:h-80 w-full overflow-hidden">
                        <img
                            src={post.img}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Article Header */}
                    <div className="px-6 lg:px-8 py-8">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                    {post.tag}
                                </span>

                                <span className="text-slate-500 dark:text-slate-400 text-sm">•</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">{post.readTime}</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">•</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">{post.date}</span>
                            </div>

                            <Link
                                to="/blogs"
                                aria-label="Back to all articles"
                                className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                                {/* left arrow */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to all articles
                            </Link>
                        </div>


                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">
                            {post.title}
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>

                        {/* Author Info and Social Share */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-6 border-t border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <SafeImage
                                    src="/icons/small-logo.svg"
                                    alt="IT Accurate logo"
                                    className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 p-2"
                                />
                                <div>
                                    <div className="font-semibold text-slate-900 dark:text-slate-100">{post.author}</div>
                                    <div className="text-slate-500 dark:text-slate-400 text-sm">Published on {post.date}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Share this article:</span>
                                <button
                                    onClick={copyToClipboard}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all duration-200"
                                >
                                    {isCopied ? (
                                        <>
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy Link
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="px-6 lg:px-8 pb-12">
                        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-ul:text-slate-700 dark:prose-ul:text-slate-300">
                            {parseContent(post.content)}
                        </div>

                        {showForm && (
                            <FreeDemoForm
                                onClose={() => setShowForm(false)}
                                title1={`Start Your Learning Journey in ${post.tag}`}
                                title2={"Talk to Our Expert"}
                            />
                        )}

                        {/* Call to Action */}
                        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                    Ready to Start Your Journey?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                                    Join IT Accurate and become job-ready with our comprehensive training programs.
                                </p>
                                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5" onClick={() => setShowForm(true)}>
                                    Book Free Demo Class
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.id}`}
                                    className="group bg-white dark:bg-[#0f172a] rounded-xl shadow-lg dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={relatedPost.img}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                {relatedPost.tag}
                                            </span>
                                            <span className="text-slate-500 dark:text-slate-400 text-sm">{relatedPost.readTime}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}