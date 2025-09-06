// app/components/HmodeHeader.jsx
import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import Logo from '~/components/Logo';

const navLinks = [
  {to: '/products', text: 'Ürünler'},
  {to: '/#categories', text: 'Kategoriler'},
  {to: '/#features', text: 'Özellikler'},
  {to: '/#recipes', text: 'Tarifler'},
  {to: '/#blog', text: 'Blog'},
];

export default function HmodeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const menuButtonRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // mount flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // rAF ile scroll
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      setIsScrolled(window.scrollY > 10);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    compute();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock + Escape
  useEffect(() => {
    if (!mounted) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      hasInteractedRef.current = true;
      window.addEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
      if (hasInteractedRef.current) {
        setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow || 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen, mounted]);

  const handleLinkClick = (e, to) => {
    setIsMenuOpen(false);
    if (to.startsWith('/#')) {
      e.preventDefault();
      const targetId = to.substring(2);
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled && 'bg-transparent'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <div
            className={`transition-all duration-300 ${
              isScrolled
                ? 'opacity-0 -translate-x-4 pointer-events-none'
                : 'opacity-100'
            }`}
          >
            <Logo />
          </div>

          <div>
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 rounded-md text-[#3E7D5E] hover:bg-gray-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7D5E]/50 focus-visible:ring-offset-2"
              aria-label="Menüyü aç"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16m-7 6h7'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over menu */}
      {mounted && isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-gradient-to-br from-[#E4F2EA] to-white backdrop-blur-sm animate-fadeIn"
        >
          <div className="flex flex-col items-center justify-center h-full pt-20 space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                onClick={(e) => handleLinkClick(e, link.to)}
                className="text-3xl font-bold text-[#3E7D5E] hover:text-[#c1a852] transition duration-300 transform hover:scale-105 relative group"
              >
                {link.text}
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-[#c1a852] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </>
  );
}
