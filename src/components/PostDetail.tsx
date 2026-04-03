import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { GhostPost } from "@/lib/ghost";

interface PostDetailProps {
  post: GhostPost;
  language: string;
  backPath: string;
  backLabel: string;
}

export default function PostDetail({ post, language, backPath, backLabel }: PostDetailProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.feature_image || undefined,
    datePublished: post.published_at,
    author: post.authors[0]
      ? {
          "@type": "Person",
          name: post.authors[0].name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Lagrange Engineering",
      url: "https://lagrangeengineering.ro",
    },
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back link */}
      <Link
        href={`/${language}${backPath}`}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>

      {/* Header */}
      <header>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag.slug}
              className="text-[9px] font-mono font-medium text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-300 dark:border-neutral-600 px-2 py-0.5"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
          {post.title}
        </h1>

        {/* Excerpt as meta description hook */}
        {post.excerpt && (
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mt-4 font-mono text-xs text-neutral-400 dark:text-neutral-500">
          {post.authors[0] && (
            <div className="flex items-center gap-2">
              {post.authors[0].profile_image && (
                <Image
                  src={post.authors[0].profile_image}
                  alt={post.authors[0].name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{post.authors[0].name}</span>
            </div>
          )}
          <span className="text-neutral-300 dark:text-neutral-600">/</span>
          <time dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString(
              language === "ro" ? "ro-RO" : "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            )}
          </time>
          {post.reading_time > 0 && (
            <>
              <span className="text-neutral-300 dark:text-neutral-600">/</span>
              <span>{post.reading_time} min read</span>
            </>
          )}
        </div>
      </header>

      {/* Feature image */}
      {post.feature_image && (
        <div className="relative aspect-[2/1] mt-8 overflow-hidden rounded-lg">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="mt-10 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-neutral-100 prose-pre:dark:bg-neutral-900 prose-code:text-primary prose-code:before:content-none prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Bottom nav */}
      <div className="mt-16 pt-8 border-t border-dashed border-neutral-300 dark:border-neutral-700">
        <Link
          href={`/${language}${backPath}`}
          className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </div>
    </article>
  );
}
