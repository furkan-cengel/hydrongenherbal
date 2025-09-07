// app/routes/products._index.jsx
import {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import {Link, useLocation, useNavigate, useLoaderData} from 'react-router';

// UI parçaları (senin mevcut komponentlerin)
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

// Kategori başlıklarını sabit tutuyoruz:
const categories = [
  'Tüm Ürünler',
  'Temel Beslenme',
  'İçecekler',
  'Atıştırmalıklar',
  'Dış Beslenme',
  'Takviye Edici Gıdalar',
  'Aktif Yaşam Ürünleri',
];

// Bu eşlemede Shopify’da oluşturacağın **koleksiyon handle**’larını kullanıyoruz.
// Lütfen Shopify’da aşağıdaki başlıklara karşılık gelen koleksiyonları oluştur:
// (Örnek handle’lar: turkce karakter/boşluk içermesin)
const CATEGORY_TO_COLLECTION_HANDLE = {
  'Temel Beslenme': 'temel-beslenme',
  İçecekler: 'icecekler',
  Atıştırmalıklar: 'atistirmaliklar',
  'Dış Beslenme': 'dis-beslenme',
  'Takviye Edici Gıdalar': 'takviye-edici-gidalar',
  'Aktif Yaşam Ürünleri': 'aktif-yasam-urunleri',
};

// Marquee metinleri
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

/**
 * LOADER
 * - URL’de ?category= varsa ilgili koleksiyonun ürünlerini getirir
 * - yoksa genel ürün akışından ürünleri getirir
 * Not: Basitlik adına ilk 48 ürünü alıyoruz; “Daha Fazla Göster” client-side slice ile çalışıyor.
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const handle =
    category && CATEGORY_TO_COLLECTION_HANDLE[category]
      ? CATEGORY_TO_COLLECTION_HANDLE[category]
      : null;

  const {storefront} = context;

  if (handle) {
    const data = await storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {handle, first: 48},
    });

    const nodes = data?.collection?.products?.nodes ?? [];
    // UI’nin beklediği forma yakın hafif normalize
    const items = nodes.map((p) => ({
      id: p.id,
      handle: p.handle,
      name: p.title,
      img: p.featuredImage?.url ?? '',
      hoverImg: null, // ileride 2. görseli eklersek doldururuz
      badge: p.vendor || '', // istersen vendor’ı rozet gibi gösterebilirsin
      description: p.description || '',
    }));

    return {
      source: 'collection',
      category: category || 'Tüm Ürünler',
      title: data?.collection?.title ?? category ?? 'Ürünler',
      items,
    };
  }

  // Tüm ürünler akışı
  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {first: 48},
  });
  const nodes = data?.products?.nodes ?? [];
  const items = nodes.map((p) => ({
    id: p.id,
    handle: p.handle,
    name: p.title,
    img: p.featuredImage?.url ?? '',
    hoverImg: null,
    badge: p.vendor || '',
    description: p.description || '',
  }));

  return {
    source: 'all',
    category: 'Tüm Ürünler',
    title: 'Tüm Ürünler',
    items,
  };
}

export default function ProductsRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const {items, category: loaderCategory, title} = useLoaderData();

  const categoryFromUrl = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return sp.get('category');
  }, [location.search]);

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || loaderCategory || 'Tüm Ürünler',
  );
  const [showCount, setShowCount] = useState(getPerPage());
  const productsSectionRef = useRef(null);
  const firstRenderRef = useRef(true);

  // URL değişince aktif kategori güncelle
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
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (activeCategory === 'Tüm Ürünler') {
      if (typeof window !== 'undefined') {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
    } else {
      productsSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activeCategory]);

  // Kategori seçim handler (URL paramını değiştiriyoruz)
  const handleCategorySelect = useCallback(
    (cat) => {
      setActiveCategory(cat);
      if (cat === 'Tüm Ürünler') {
        navigate('/products', {replace: false, preventScrollReset: false});
      } else {
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

  const visibleProducts = useMemo(
    () => (items || []).slice(0, showCount),
    [items, showCount],
  );

  const canLoadMore = (items || []).length > showCount;

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
              {activeCategory === 'Tüm Ürünler' ? 'Tüm Ürünler' : title}
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

function ProductCard({product}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/products/${product.handle}`} className="block h-full">
      <div
        className="h-full bg-white rounded-2xl shadow-sm border border-[#ebeaf8] 
                   flex flex-col overflow-hidden transition-all duration-200 
                   hover:shadow-lg hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-full bg-[#E4F2EA] relative">
          <div className="aspect-[4/5] sm:aspect-[3/4]">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#E4F2EA] to-[#d1e8d8] animate-pulse" />
            )}

            <img
              src={product.img}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              decoding="async"
            />

            {/* Hover resmi ileride eklenecek */}
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
              className="inline-flex w-fit whitespace-nowrap 
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
}

/** ================= GraphQL Queries ================= **/

// Genel ürün akışı (ilk 48)
const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts($first: Int!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        description
        vendor
        featuredImage {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

// Koleksiyon → ürünleri
const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $handle: String!
    $first: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          vendor
          featuredImage {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
