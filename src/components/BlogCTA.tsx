"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { GhostPost } from "@/lib/ghost";

function PostImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 border-t-primary animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default function BlogCTA() {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/content?category=articles&limit=4");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-sm font-bold text-primary">
          {t("blog.title")}
        </h2>

        <Link
          href={`/${language}/blog`}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 transition-colors"
        >
          {t("blog.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>

      {loading ? (
        /* Loading skeleton */
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-1 border-b lg:border-b-0 lg:border-r border-dashed border-neutral-300 dark:border-neutral-700 pb-6 lg:pb-0 lg:pr-6">
            <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-800 animate-pulse mb-4" />
            <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-700 animate-pulse mb-3" />
            <div className="h-4 w-[80%] bg-neutral-200 dark:bg-neutral-700 animate-pulse mb-2" />
            <div className="h-2 w-[60%] bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          </div>
          <div className="lg:flex-1 flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 border-b border-dashed border-neutral-300 dark:border-neutral-700 pb-4 last:border-b-0">
                <div className="w-20 h-20 shrink-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-1.5 w-16 bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                  <div className="h-2.5 w-[90%] bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                  <div className="h-1.5 w-[50%] bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : posts.length === 0 ? null : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Featured post - large */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:flex-1 border-b lg:border-b-0 lg:border-r border-dashed border-neutral-300 dark:border-neutral-700 pb-6 lg:pb-0 lg:pr-6"
            >
              <Link
                href={`/${language}/blog/${featured.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden mb-4">
                  {featured.feature_image ? (
                    <PostImage src={featured.feature_image} alt={featured.title} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded bg-primary/10" />
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                  {featured.authors[0] && <span>{featured.authors[0].name}</span>}
                  <span className="text-neutral-300 dark:text-neutral-600">/</span>
                  <span>
                    {new Date(featured.published_at).toLocaleDateString(
                      language === "ro" ? "ro-RO" : "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </span>
                  {featured.reading_time > 0 && (
                    <>
                      <span className="text-neutral-300 dark:text-neutral-600">/</span>
                      <span>{featured.reading_time} min</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors line-clamp-2">
                  {featured.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
                  {featured.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.slug}
                      className="text-[9px] font-mono font-medium text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-300 dark:border-neutral-600 px-2 py-0.5"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          )}

          {/* Rest - compact list */}
          <div className="lg:flex-1 flex flex-col">
            {rest.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/${language}/blog/${post.slug}`}
                  className="group flex gap-4 py-4 border-b border-dashed border-neutral-300 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors -mx-2 px-2 rounded"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                    {post.feature_image ? (
                      <PostImage src={post.feature_image} alt={post.title} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded bg-primary/10" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-1 font-mono text-[9px] text-neutral-400 dark:text-neutral-500">
                      <span>
                        {new Date(post.published_at).toLocaleDateString(
                          language === "ro" ? "ro-RO" : "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                      {post.reading_time > 0 && (
                        <>
                          <span className="text-neutral-300 dark:text-neutral-600">/</span>
                          <span>{post.reading_time} min</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt - hide on small */}
                    <p className="hidden sm:block mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
