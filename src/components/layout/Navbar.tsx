'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isBlog = pathname?.startsWith('/blog');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setIsDark(current === 'dark');
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
    e.preventDefault();
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
      sessionStorage.setItem('scrollTo', sectionId);
    }
  }

  return (
    <nav className="nav">
      <div className="logo-wrap">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="logo-top">
            <span className="lz">Z</span>
            <span className="la">A</span>
            <span className="li">I</span>
            <span className="lm">MAH</span>
          </div>
          <div className="lsub">Technologies</div>
        </Link>
      </div>

      <div className="nav-links">
        <a href="/" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
        <a href="/#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
        <a href="/#products" onClick={(e) => handleNavClick(e, 'products')}>Products</a>
        <a href="/#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
        <Link
          href="/blog"
          style={isBlog ? { color: 'var(--indigo)', fontWeight: 600 } : undefined}
        >
          Blog
        </Link>
        <a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
      </div>

      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <a
          href="/#contact"
          className="nav-cta"
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          Get in Touch
        </a>
      </div>

      <button className="nav-hamburger" aria-label="Open menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
