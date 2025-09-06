// app/routes/products._index.jsx
import {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import {Link, useLocation, useNavigate} from 'react-router';
import {products} from '~/data/productsData';
import CategoryButton from '~/components/CategoryButton';
import MarqueeText from '~/components/MarqueeText';

export const meta = () => [
  {title: 'HerbalMode — Ürünler'},
  {
    name: 'description',
    content:
      'Tüm Herbalife ürünleri: Temel Beslenme, İçecekler, Atıştırmalıklar, Dış Beslenme, Takviyeler ve Aktif Yaşam.',
  },
];

const categories = [
  'Tüm Ürünler',
  'Temel Beslenme',
  'İçecekler',
  'Atıştırmalıklar',
  'Dış Beslenme',
  'Takviye Edici Gıdalar',
  'Aktif Yaşam Ürünleri',
];

const MARQUEE_ITEMS = [
  'BİLİMSEL DESTEKLİ TAKVİYELER',
  'HER GÜN İYİ YAŞAM ALIŞKANLIKLARI',
  'SAĞLIKLI RUTİNLERİN GÜCÜ',
];

function getPerPage() {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 768 ? 12 : 8;
  }
  return 12;
}

export default function ProductsRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  const categoryFromUrl = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return sp.get('category');
  }, [location.search]);

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || 'Tüm Ürünler',
  );
  const [showCount, setShowCount] = useState(getPerPage());
  const productsSectionRef = useRef(null);
  const firstRenderRef = useRef(true);

  // URL'den kategori takip
  useEffect(() => {
    const newCategory = categoryFromUrl || 'Tüm Ürünler';
    if (newCategory !== activeCategory) setActiveCategory(newCategory);
  }, [categoryFromUrl, activeCategory]);

  // Kategori değişince sayfa başına ürün sayısını resetle
  useEffect(() => {
    setShowCount(getPerPage());
  }, [activeCategory]);

  // Resize optimize
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const per = getPerPage();
        setShowCount((prev) => {
          if (prev === per) return prev;
          return prev < per ? per : prev;
        });
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Kategori değişince scroll davranışı
  useEffect(() => {
    // İlk render'da dokunma
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (activeCategory === 'Tüm Ürünler') {
      // Hero'ya
      if (typeof window !== 'undefined') {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
    } else {
      // Ürün gridine
      productsSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activeCategory]);

  // Kategori seçim handler
  const handleCategorySelect = useCallback(
    (cat) => {
      setActiveCategory(cat);
      if (cat === 'Tüm Ürünler') {
        // Parametreyi sil → hero'dan başla (scroll reset serbest)
        navigate('/products', {replace: false, preventScrollReset: false});
      } else {
        // Querystring ekle → üstte zıplamayı engelle
        const sp = new URLSearchParams();
        sp.set('category', cat);
        navigate(`/products?${sp.toString()}`, {
          replace: false,
          preventScrollReset: true,
        });
      }
    },
    [navigate],
  );

  // Liste verileri
  const filteredProducts = useMemo(
    () =>
      activeCategory === 'Tüm Ürünler'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, showCount),
    [filteredProducts, showCount],
  );

  const canLoadMore = showCount < filteredProducts.length;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section
        className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center 
                   bg-gradient-to-r from-[#cacbda] to-[#e1e3ff] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-contain"
          style={{backgroundImage: "url('/images/road.png')"}}
        />

        <div className="relative z-10 text-center -translate-y-24 md:-translate-y-32">
          <h1 className="text-4xl md:text-6xl font-bold text-[#3E7D5E] drop-shadow-xl">
            Sağlıklı Yaşam <br /> Yolculuğuna Başla
          </h1>
        </div>

        <img
          src="/images/shopping.gif"
          alt="Dekoratif element"
          className="absolute right-2 sm:right-6 md:right-8 bottom-12 sm:bottom-28 md:bottom-10
                     w-36 sm:w-48 md:w-72 h-auto z-20"
          loading="lazy"
        />

        {/* Marquee */}
        <MarqueeText
          items={MARQUEE_ITEMS}
          repeatCount={4}
          durationSec={48}
          containerClass="overflow-hidden w-full bg-[#f8f8fe] py-3 border-b border-[#e3e1fa] absolute left-0 bottom-0 z-20"
          trackClass="flex whitespace-nowrap animate-marquee-custom"
          itemClass="mx-10 text-[#436d33] font-semibold text-base"
        />

        <style>{`
          .animate-marquee-custom { 
            display: inline-flex; 
            min-width: 100%; 
            animation: marquee-custom 22s linear infinite; 
          }
          @keyframes marquee-custom { 
            0% { transform: translateX(0%);} 
            100% { transform: translateX(-50%);} 
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* Products Grid */}
      <div ref={productsSectionRef} className="w-full py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#436d33]/80 mb-2">
              {activeCategory === 'Tüm Ürünler'
                ? 'Tüm Ürünler'
                : activeCategory}
            </h2>
            <p className="text-base md:text-lg text-[#436d33] max-w-2xl">
              Tüm ürünlerimiz bilim destekli, modern ve fonksiyonel formüllerle
              hazırlanmıştır.
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 md:items-start">
            {/* Sidebar Desktop */}
            <aside className="hidden md:block md:w-1/5 lg:w-1/6">
              <div className="sticky top-24 flex flex-col gap-3">
                {categories.map((cat) => (
                  <CategoryButton
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => handleCategorySelect(cat)}
                    variant="sidebar"
                  />
                ))}
              </div>
            </aside>

            {/* Mobile Filter Chips */}
            <div className="md:hidden -mx-4 px-4 mb-6">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => (
                  <CategoryButton
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => handleCategorySelect(cat)}
                    variant="chip"
                  />
                ))}
              </div>
            </div>

            {/* Grid */}
            <main className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                {visibleProducts.length === 0 ? (
                  <div className="col-span-full text-center text-[#436d33] text-lg opacity-70 py-20">
                    Bu kategoride ürün bulunamadı.
                  </div>
                ) : (
                  visibleProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))
                )}
              </div>

              {canLoadMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setShowCount((c) => c + getPerPage())}
                    className="bg-[#edeafd] hover:bg-[#eaf580]/80 text-[#436d33] font-bold py-3 px-8 rounded-full shadow-lg transition"
                  >
                    Daha Fazla Göster
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCard = function ProductCard({product}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div
        className="h-full bg-white rounded-2xl shadow-sm border border-[#ebeaf8] 
                   flex flex-col overflow-hidden transition-all duration-200 
                   hover:shadow-lg hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-full bg-[#E4F2EA] relative">
          <div className="aspect-[4/5] sm:aspect-[3/4]">
            {/* Placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#E4F2EA] to-[#d1e8d8] animate-pulse" />
            )}

            {/* Main image */}
            <img
              src={product.img}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300
                         ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              decoding="async"
            />

            {/* Hover image */}
            {hovered && product.hoverImg && (
              <img
                src={product.hoverImg}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            )}
          </div>
        </div>

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          {product.badge && (
            <span
              className="inline-flex w-fit   whitespace-nowrap 
                           bg-[#E4F2EA] text-[#3E7D5E] text-[10px] sm:text-xs
                           font-semibold px-2.5 py-1 rounded-full mb-2 truncate"
            >
              {product.badge}
            </span>
          )}

          <h3 className="text-[#3E7D5E] font-bold text-sm sm:text-base leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
