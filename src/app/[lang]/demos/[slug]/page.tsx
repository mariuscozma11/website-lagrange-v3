import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/ghost";
import PostDetail from "@/components/PostDetail";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: "article",
      publishedTime: post.published_at,
      authors: post.authors.map((a) => a.name),
    },
  };
}

export default async function DemoDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <PostDetail
      post={post}
      language={lang}
      backPath="/demos"
      backLabel={lang === "ro" ? "Înapoi la demo-uri" : "Back to demos"}
    />
  );
}
