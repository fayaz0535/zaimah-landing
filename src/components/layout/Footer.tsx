import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">

      {/* CTA bar */}
      <div className="footer-cta-bar">
        <div className="footer-cta-text">
          <div className="footer-cta-title">Ready to move faster than your competition?</div>
          <div className="footer-cta-sub">Book a discovery call · Try funnl free · Request SprintX demo</div>
        </div>
        <a href="/#contact" className="footer-cta-btn">Get in Touch →</a>
      </div>

      {/* 4-column grid */}
      <div className="footer-cols">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="lz">Z</span>
            <span className="la">A</span>
            <span className="li">I</span>
            <span className="lm">MAH</span>
            <span className="footer-lsub">Technologies</span>
          </div>
          <p className="footer-tagline">Think Forward. Build Different.</p>
          <div className="footer-shams">
            <span>📍</span> SHAMS FZE · Dubai, UAE
          </div>
        </div>

        {/* Products */}
        <div className="footer-col">
          <div className="footer-col-title">Products</div>
          <a href="https://funnl.zaimahtech.ae" className="footer-link">funnl</a>
          <a href="https://sprintx.zaimahtech.ae" className="footer-link">SprintX</a>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <div className="footer-col-title">Resources</div>
          <Link href="/blog" className="footer-link">Blog</Link>
          <a href="/#about" className="footer-link">About</a>
          <a href="/#contact" className="footer-link">Contact</a>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <div className="footer-col-title">Legal</div>
          <Link href="/privacy" className="footer-link">Privacy policy</Link>
          <Link href="/terms" className="footer-link">Terms of service</Link>
          <div className="footer-col-title" style={{ marginTop: '16px' }}>Connect</div>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/company/zaimahtech"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:fayaz@zaimahtech.ae"
              className="footer-social-icon"
              aria-label="Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
          <div className="footer-hours">Mon–Fri, 9am–6pm GST</div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© 2026 ZAIMAH Technologies FZE · All rights reserved</span>
        <span>SHAMS Free Zone, Sharjah, UAE</span>
      </div>

    </footer>
  );
}
