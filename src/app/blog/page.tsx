import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | ZAIMAH Technologies",
  description:
    "Insights on AI, WhatsApp automation, and software for UAE businesses — from the team at ZAIMAH Technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 32px 80px" }}>
          <p className="eyebrow indigo">Blog</p>
          <h1 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 8 }}>
            Insights on AI for UAE Business
          </h1>
          <p style={{ fontSize: 14, color: "var(--ink-light)", maxWidth: 480, lineHeight: 1.75, marginBottom: 48 }}>
            Practical articles on AI strategy, WhatsApp automation, and building software in the UAE market.
          </p>

          <div className="blog-grid">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
                style={{ textDecoration: "none" }}
              >
                <div className="blog-card-body">
                  <span className="blog-tag">{post.category}</span>
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span>{new Date(post.date).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="blog-read-more">Read article →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
