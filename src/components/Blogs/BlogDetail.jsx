// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { blogs } from "../../data/blogs";
import { getSeoData } from "../../lib/seoUtil";
import { SafeImage } from "../../lib/SafeImage";
import ReactMarkdown from "react-markdown";
import FreeDemoForm from "../ContactUs/FreeDemoForm";

/**
 * TableSection - renders a table from an array of row objects
 * tableData: [ { ColA: "v", ColB: "v" }, { ColA: "v2", ColB: "v2" } ]
 * 
 */
const BlogContent = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a 
            {...props} 
            style={{
              color: '#2563eb',
              textDecoration: 'underline',
              fontWeight: '500',
            }}
            className="hover:text-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const TableSection = ({ tableData, title }) => {
  if (!tableData || !Array.isArray(tableData) || tableData.length === 0) return null;

  const headers = Object.keys(tableData[0]);

  return (
    <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
      {title && <div className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">{title}</div>}
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200 capitalize">
                {h.replace(/([A-Z])/g, " $1")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rIndex) => (
            <tr key={rIndex} className="odd:bg-white even:bg-slate-50 dark:even:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              {headers.map((h, cIndex) => (
                <td key={cIndex} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function BlogDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.slice(1);
  const seo = getSeoData(path);
  const [isCopied, setIsCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Get post by slug
  const post = blogs.find((p) => String(p.slug) === String(slug));

  // Redirect if not found
  useEffect(() => {
    if (!post) navigate("/blogs");
  }, [post, navigate]);

  if (!post) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  /**
   * parseContent
   *
   * - Splits content into lines
   * - Treats headings (#, ##, ###), list items and paragraphs as "blocks"
   * - Inserts table components after blocks whose number is in post.insertTableAfter
   * - Uses post.tables with the same order as insertTableAfter
   */
  const parseContent = (content) => {
    const lines = content.split("\n");
    const elements = [];
    let blockIndex = 0;   // counts blocks (heading, paragraph, list block)
    let tableIndex = 0;   // which table to render next

    // Helper to push a block and then possibly insert a table
    const pushBlockAndMaybeTable = (nodeKey, node) => {
      blockIndex++;
      elements.push(node);
      // if we should insert a table after this block
      if (Array.isArray(post.insertTableAfter) && post.insertTableAfter.includes(blockIndex)) {
        const tableData = post.tables?.[tableIndex];
        const tableTitle = post.tableTitles?.[tableIndex]; // optional titles
        if (tableData && tableData.length > 0) {
          elements.push(<TableSection key={`table-${blockIndex}-${tableIndex}`} tableData={tableData} title={tableTitle} />);
        }
        tableIndex++;
      }
    };

    // Iterate lines; group consecutive list items into one <ul>
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const line = raw.trim();

      if (!line) {
        // empty line -> skip (no block increment)
        continue;
      }

      // Table marker support (optional) - if you prefer markers like [TABLE1] in content
      if (line.startsWith("[TABLE")) {
        // ignore marker here because we're using insertTableAfter mechanism,
        // but if content has markers you could map them here.
        continue;
      }

      // Headings
      if (line.startsWith("### ")) {
        pushBlockAndMaybeTable(`h3-${i}`, (
          <h3 key={`h3-${i}`} className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">
            {line.replace(/^###\s+/, "")}
          </h3>
        ));
        continue;
      }
      if (line.startsWith("## ")) {
        pushBlockAndMaybeTable(`h2-${i}`, (
          <h2 key={`h2-${i}`} className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
            {line.replace(/^##\s+/, "")}
          </h2>
        ));
        continue;
      }
      if (line.startsWith("# ")) {
        pushBlockAndMaybeTable(`h1-${i}`, (
          <h1 key={`h1-${i}`} className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-8">
            {line.replace(/^#\s+/, "")}
          </h1>
        ));
        continue;
      }

      // List: lines starting with "- " or "- **"
      if (line.startsWith("- ")) {
        // collect contiguous list lines
        const listItems = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith("- ")) {
          listItems.push(lines[j].trim().replace(/^-+\s*/, ""));
          j++;
        }
        // advance outer loop
        i = j - 1;
        pushBlockAndMaybeTable(`ul-${i}`, (
          <ul key={`ul-${i}`} className="my-6 space-y-2">
            {listItems.map((li, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-slate-700 dark:text-slate-300">{li}</span>
              </li>
            ))}
          </ul>
        ));
        continue;
      }

      // Paragraph / normal text
      pushBlockAndMaybeTable(`p-${i}`, (
        <p key={`p-${i}`} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg">
          {line}
        </p>
      ));
    }

    return elements;
  };

  const relatedPosts = blogs.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220] transition-colors duration-300 mt-14">
      {/* SEO */}
      <title>{seo?.metaTitle || post.title}</title>
      <meta name="description" content={post.excerpt || seo?.metaDescription} />
      <link rel="canonical" href={seo?.canonicalTag} />

      <main className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
        <article className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">

          {/* Featured Image */}
          <div className="relative h-64 lg:h-80 w-full overflow-hidden">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Header */}
          <div className="px-6 lg:px-8 py-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {post.tag}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">• {post.readTime} • {post.date}</span>
              </div>

              <Link to="/blogs" aria-label="Back to all articles" className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all articles
              </Link>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">{post.title}</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{post.excerpt}</p>

            {/* Author & Share */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-6 border-t border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <SafeImage src="/icons/small-logo.svg" alt="IT Accurate logo" className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 p-2" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{post.author}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Published on {post.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">Share this article:</span>
                <button onClick={copyToClipboard} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all duration-200">
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

          {/* Content + tables */}
          <div className="px-6 lg:px-8 pb-12">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {parseContent(post.content)}
            </div>

            {showForm && <FreeDemoForm onClose={() => setShowForm(false)} title1={`Start Your Learning Journey in ${post.tag}`} title2={"Talk to Our Expert"} />}

            {/* CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Ready to Start Your Journey?</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">Join IT Accurate and become job-ready with our comprehensive training programs.</p>
              <button onClick={() => setShowForm(true)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300">Book Free Demo Class</button>
            </div>
          </div>
        </article>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} to={`/blog/${related.slug}`} className="group bg-white dark:bg-[#0f172a] rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden hover:-translate-y-1 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={related.img} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-2">{related.tag}</span>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">{related.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{related.excerpt}</p>
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
