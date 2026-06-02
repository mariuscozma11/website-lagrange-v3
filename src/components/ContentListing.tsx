"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost";

function PostImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700/40">
          <div className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 border-t-primary animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover group-hover:scale-105 transition-all duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

interface ContentListingProps {
  titleKey: string;
  titleAccentKey: string;
  descriptionKey: string;
  basePath: string;
}

export default function ContentListing({
  titleKey,
  titleAccentKey,
  descriptionKey,
  basePath,
}: ContentListingProps) {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });

      const res = await fetch(`/api/content?${params}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(data.pagination.pages);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto pt-8 pb-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl md:text-6xl dark:text-neutral-200"
        >
          {t(titleKey)}{" "}
          <span className="text-primary">{t(titleAccentKey)}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t(descriptionKey)}
        </motion.p>
      </section>

      {/* Results */}
      <section className="max-w-[1440px] mx-auto px-6 pb-16 xl:pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-dashed border-neutral-300 dark:border-neutral-700 p-4">
                <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 relative mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 border-t-primary animate-spin" />
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1.5 w-12 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                  <div className="h-1.5 w-1 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1.5 w-16 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                </div>
                <div className="h-2.5 w-[80%] rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse mb-1.5" />
                <div className="h-1.5 w-[60%] rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse mb-3" />
                <div className="flex gap-1.5">
                  <div className="h-4 w-14 border border-dashed border-neutral-300 dark:border-neutral-600 animate-pulse" />
                  <div className="h-4 w-10 border border-dashed border-neutral-300 dark:border-neutral-600 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 dark:text-neutral-500">
              {t("content.noResults")}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={`/${language}${basePath}/${post.slug}`}
                    className="group block border border-dashed border-neutral-300 dark:border-neutral-700 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden mb-4">
                      {post.feature_image ? (
                        <PostImage src={post.feature_image} alt={post.title} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded bg-primary/10" />
                        </div>
                      )}
                      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
                      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
                      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
                      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
                    </div>

                    <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                      {post.authors[0] && <span>{post.authors[0].name}</span>}
                      <span className="text-neutral-300 dark:text-neutral-600">/</span>
                      <span>
                        {new Date(post.published_at).toLocaleDateString(
                          language === "ro" ? "ro-RO" : "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                      {post.reading_time > 0 && (
                        <>
                          <span className="text-neutral-300 dark:text-neutral-600">/</span>
                          <span>{post.reading_time} min</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
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
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
