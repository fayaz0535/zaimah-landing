import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ZAIMAH Technologies`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 32px 80px" }}>
          <Link
            href="/blog"
            style={{ fontSize: 13, color: "var(--indigo)", textDecoration: "none", display: "inline-block", marginBottom: 32 }}
          >
            ← Back to Blog
          </Link>

          <div className="blog-post-header">
            <span className="blog-tag">{post.category}</span>
            <h1 style={{ fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", margin: "12px 0 10px", lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--ink-faint)", marginBottom: 32 }}>
              <span>{new Date(post.date).toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <p style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.75, borderLeft: "2px solid var(--indigo)", paddingLeft: 16 }}>
              {post.excerpt}
            </p>
          </div>

          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <Link href="/blog" style={{ fontSize: 13, color: "var(--indigo)", textDecoration: "none" }}>
              ← All articles
            </Link>
            <Link
              href="/#contact"
              style={{ fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--indigo)", padding: "9px 18px", borderRadius: 8, textDecoration: "none" }}
            >
              Talk to us about AI →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
