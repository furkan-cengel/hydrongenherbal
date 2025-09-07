// app/components/HmodeHeader.jsx
import {useEffect, useRef, useState} from 'react';
import {Link, useRouteLoaderData} from 'react-router';
import Logo from '~/components/Logo';

const navLinks = [
  {to: '/products', text: 'Ürünler'},
  {to: '/#categories', text: 'Kategoriler'},
  {to: '/#features', text: 'Özellikler'},
  {to: '/#recipes', text: 'Tarifler'},
  {to: '/#blog', text: 'Blog'},
];

export default function HmodeHeader() {
  /** @type {{ cart?: { totalQuantity?: number } }} */
  const rootData = useRouteLoaderData('root');
  const cartQty = rootData?.cart?.totalQuantity ?? 0;

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

          {/* Sağ üst aksiyonlar + menü butonu */}
          <div className="flex items-center gap-3">
            {/* Desktop quick actions */}
            <div className="hidden sm:flex items-center gap-2 text-[#3E7D5E]">
              <Link
                to="/search"
                aria-label="Ara"
                className="p-2 rounded-md hover:bg-gray-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7D5E]/50 focus-visible:ring-offset-2"
              >
                {/* search icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    strokeWidth="2"
                  ></line>
                </svg>
              </Link>

              <Link
                to="/account"
                aria-label="Hesabım"
                className="p-2 rounded-md hover:bg-gray-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7D5E]/50 focus-visible:ring-offset-2"
              >
                {/* user icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 21a8 8 0 10-16 0" strokeWidth="2" />
                  <circle cx="12" cy="7" r="4" strokeWidth="2" />
                </svg>
              </Link>

              <Link
                to="/cart"
                aria-label="Sepet"
                className="relative p-2 rounded-md hover:bg-gray-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7D5E]/50 focus-visible:ring-offset-2"
              >
                {/* cart icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h11l2-7H6.4" strokeWidth="2" />
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                </svg>
                {cartQty > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#3E7D5E] text-white text-[10px] flex items-center justify-center">
                    {cartQty}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile: Menü butonu */}
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

            {/* Mobile quick actions */}
            <div className="flex items-center gap-6 pt-6">
              <Link
                to="/search"
                onClick={(e) => handleLinkClick(e, '/search')}
                className="text-xl font-semibold text-[#3E7D5E] hover:text-[#c1a852]"
              >
                Ara
              </Link>
              <Link
                to="/account"
                onClick={(e) => handleLinkClick(e, '/account')}
                className="text-xl font-semibold text-[#3E7D5E] hover:text-[#c1a852]"
              >
                Hesabım
              </Link>
              <Link
                to="/cart"
                onClick={(e) => handleLinkClick(e, '/cart')}
                className="relative text-xl font-semibold text-[#3E7D5E] hover:text-[#c1a852]"
              >
                Sepet{cartQty > 0 ? ` (${cartQty})` : ''}
              </Link>
            </div>
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
