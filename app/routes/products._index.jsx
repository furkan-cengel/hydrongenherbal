// app/routes/products._index.jsx
import {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import {Link, useLocation, useNavigate} from 'react-router';
import {products} from '~/data/productsData';
import CategoryButton from '~/components/CategoryButton';
import MarqueeText from '~/components/MarqueeText';

/**
 * @type {import('react-router').MetaFunction}
 */
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

  // URL değişince state'e yansıt
  useEffect(() => {
    const newCategory = categoryFromUrl || 'Tüm Ürünler';
    if (newCategory !== activeCategory) setActiveCategory(newCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  // Kategori değişince perPage reset
  useEffect(() => {
    setShowCount(getPerPage());
  }, [activeCategory]);

  // Resize -> throttle + gereksiz setState atla
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

  // Kategori değişince kaydırma davranışı
  useEffect(() => {
    if (activeCategory === 'Tüm Ürünler') {
      if (typeof window !== 'undefined') {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
      return;
    }
    productsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [activeCategory]);

  const handleCategorySelect = useCallback(
    (cat) => {
      setActiveCategory(cat);
      if (cat === 'Tüm Ürünler') {
        navigate('/products', {replace: false});
      } else {
        const sp = new URLSearchParams(location.search);
        sp.set('category', cat);
        navigate(`/products?${sp.toString()}`, {replace: false});
      }
    },
    [location.search, navigate],
  );

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
      {/* Collections Hero */}
      <section
        className="
          w-full min-h-[90svh] md:h-screen
          flex items-center md:items-center lg:items-start justify-center
          pt-16 md:pt-20 lg:pt-24 pb-24
          bg-gradient-to-r from-[#cacbda] to-[#e1e3ff] relative
        "
      >
        <img
          src="/images/products/collectionhero.webp"
          alt="All Products"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
          decoding="async"
        />

        <div className="relative z-10 text-center ">
          <h1 className="text-5xl md:text-6xl items-start font-bold text-[#fff] drop-shadow-xl">
            Sağlıklı Yaşam <br /> Yolculuğuna Başla
          </h1>
        </div>

        <img
          src="/images/shopping.gif"
          alt="Dekoratif element"
          className="
            absolute right-2  sm:right-6 md:right-8
            bottom-12 sm:bottom-28 md:bottom-10
            w-36 sm:w-48 md:w-72 h-auto z-20
          "
          decoding="async"
        />

        {/* Alt Marquee */}
        <MarqueeText
          items={MARQUEE_ITEMS}
          repeatCount={4}
          durationSec={48}
          containerClass="overflow-hidden w-full bg-[#f8f8fe] py-3 border-b border-[#e3e1fa] absolute left-0 bottom-0 z-20"
          trackClass="flex whitespace-nowrap animate-marquee-custom"
          itemClass="mx-10 text-[#436d33] font-semibold text-base"
        />

        <style>{`
          .animate-marquee-custom { display: inline-flex; min-width: 100%; animation: marquee-custom 22s linear infinite; }
          @keyframes marquee-custom { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }

          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* Products Grid */}
      <div ref={productsSectionRef} className="w-full py-12 px-4">
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
            {/* Sidebar (md+) */}
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

            {/* Mobile Filtre Chips (md-) */}
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
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div
        className="h-full bg-white rounded-2xl shadow-sm border border-[#ebeaf8] flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-full bg-[#E4F2EA]">
          <div className="aspect-[4/5] sm:aspect-[3/4]">
            <img
              src={hovered && product.hoverImg ? product.hoverImg : product.img}
              alt={product.name}
              className="w-full h-full object-cover"
              draggable="false"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          {product.badge && (
            <span
              className="
                inline-flex w-auto whitespace-nowrap max-w-[80%]
                text-[#3E7D5E] text-[10px] sm:text-xs
                font-semibold px-2.5 py-1 rounded-full mb-2 truncate
              "
              title={product.badge}
            >
              {product.badge}
            </span>
          )}

          <h3 className="text-[#3E7D5E] font-bold text-sm sm:text-base leading-snug line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-auto" />
        </div>
      </div>
    </Link>
  );
};
