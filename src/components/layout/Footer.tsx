export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="footer-logo">
          <span className="lz">Z</span>
          <span className="la">A</span>
          <span className="li">I</span>
          <span className="lm">MAH</span>
          <span className="lsub" style={{ marginLeft: "6px" }}>Technologies</span>
        </div>
        <p className="footer-tagline">Think Forward. Build Different.</p>
        <p className="footer-copy">© 2026 ZAIMAH Technologies FZE · Built in Dubai</p>
        <p className="footer-reg">SHAMS Free Zone, Sharjah, UAE</p>
      </div>

      <div className="footer-col">
        <div className="footer-col-title">Products</div>
        <a href="https://funnl.zaimahtech.ae" target="_blank" rel="noopener noreferrer" className="footer-link">funnl</a>
        <a href="https://sprintx.zaimahtech.ae" target="_blank" rel="noopener noreferrer" className="footer-link">SprintX</a>
        <a href="/blog" className="footer-link">Blog</a>
      </div>

      <div className="footer-col">
        <div className="footer-col-title">Company</div>
        <a href="/#about" className="footer-link">About</a>
        <a href="/#contact" className="footer-link">Contact</a>
        <a href="/privacy" className="footer-link">Privacy policy</a>
        <a href="/terms" className="footer-link">Terms of service</a>
      </div>

      <div className="footer-col">
        <div className="footer-col-title">Connect</div>
        <a href="https://www.linkedin.com/company/zaimahtech" target="_blank" rel="noopener noreferrer" className="footer-link">
          LinkedIn
        </a>
        <a href="mailto:fayaz@zaimahtech.ae" className="footer-link">fayaz@zaimahtech.ae</a>
        <div className="footer-link" style={{ cursor: "default" }}>Mon–Fri, 9am–6pm GST</div>
      </div>
    </footer>
  );
}
