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
          <div className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 border-t-primary animate-spin" />
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

export default function CaseStudiesCTA() {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const res = await fetch("/api/content?category=case-studies&limit=3");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudies();
  }, []);

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
          {t("caseStudies.title")}
        </h2>

        <Link
          href={`/${language}/case-studies`}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 transition-colors"
        >
          {t("caseStudies.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`p-4 ${i < 2 ? "border-r border-dashed border-neutral-300 dark:border-neutral-700" : ""}`}>
                <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 relative mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 border-t-primary animate-spin" />
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-16 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                  <div className="h-2.5 w-[80%] rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                  <div className="h-1.5 w-[60%] rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                </div>
              </div>
            ))
          : posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/${language}/case-studies/${post.slug}`}
                  className={`group block p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border-dashed border-neutral-300 dark:border-neutral-700 ${index < posts.length - 1 ? "max-sm:border-b sm:border-r" : ""}`}
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
                    {/* Corner brackets */}
                    <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
                    <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
                    <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
                    <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
                  </div>

                  {/* Meta */}
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
    </section>
  );
}
