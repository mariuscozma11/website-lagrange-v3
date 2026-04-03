"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { GooeyInput } from "@/components/ui/gooey-input";
import type { GhostPost, GhostTag } from "@/lib/ghost";

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
  categoryTag: "case-studies" | "articles" | "technical-demos";
  titleKey: string;
  titleAccentKey: string;
  descriptionKey: string;
  basePath: string;
}

export default function ContentListing({
  categoryTag,
  titleKey,
  titleAccentKey,
  descriptionKey,
  basePath,
}: ContentListingProps) {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [tags, setTags] = useState<GhostTag[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>(() => {
    const tagParam = searchParams.get("tag");
    return tagParam ? tagParam.split(",").filter(Boolean) : [];
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  // Debounce search - wait 400ms after user stops typing
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: categoryTag,
        page: String(page),
      });
      if (activeTags.length > 0) {
        params.set("tags", activeTags.join(","));
      }
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      }

      const res = await fetch(`/api/content?${params}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(data.pagination.pages);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryTag, page, activeTags, debouncedSearch]);

  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch("/api/content/tags");
      const data = await res.json();
      setTags(data.tags);
    } catch {
      setTags([]);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const toggleTag = (slug: string) => {
    setPage(1);
    setActiveTags((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setActiveTags([]);
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

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

      {/* Filters + Search */}
      <section className="max-w-[1440px] mx-auto px-6 pb-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Search */}
          <div className="flex justify-start">
            <GooeyInput
              placeholder={t("content.search")}
              value={search}
              onValueChange={setSearch}
              collapsedWidth={120}
              expandedWidth={280}
              expandedOffset={40}
            />
          </div>

          {/* Clear filters */}
          {(activeTags.length > 0 || search) && (
            <button
              onClick={clearFilters}
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              {t("content.clearFilters")}
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => {
            const isActive = activeTags.includes(tag.slug);
            return (
              <button
                key={tag.slug}
                onClick={() => toggleTag(tag.slug)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-primary/50"
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
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
              {posts.map((post, index) => (
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
                    {/* Image */}
                    <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden mb-4">
                      {post.feature_image ? (
                        <PostImage src={post.feature_image} alt={post.title} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded bg-primary/10" />
                        </div>
                      )}
                      {/* Corner brackets on image */}
                      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
                      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
                      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
                      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
                    </div>

                    {/* Meta line */}
                    <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                      {post.authors[0] && (
                        <span>{post.authors[0].name}</span>
                      )}
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

                    {/* Title */}
                    <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
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

            {/* Pagination */}
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
