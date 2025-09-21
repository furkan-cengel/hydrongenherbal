// app/routes/products._index.jsx
<<<<<<< HEAD
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

// Shopify koleksiyon handle eşlemesi
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
 * - “İçecekler” için olası Unicode handle varyasyonlarını dener, yine boşsa tag/product_type fallback araması yapar
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const handle =
    category && CATEGORY_TO_COLLECTION_HANDLE[category]
      ? CATEGORY_TO_COLLECTION_HANDLE[category]
      : null;

  const {storefront} = context;

  // İçecekler için olası handle adayları (İ/ i / i̇ farkları)
  const getHandleCandidates = (h) => {
    if (!h) return [];
    if (h === 'icecekler') {
      return ['icecekler', 'içecekler', 'i̇cecekler'];
    }
    return [h];
  };

  if (handle) {
    let data;
    const tried = [];

    // 1) Handle adaylarını sırayla dene
    for (const h of getHandleCandidates(handle)) {
      tried.push(h);
      const res = await storefront.query(COLLECTION_PRODUCTS_QUERY, {
        variables: {handle: h, first: 48},
      });
      if (res?.collection) {
        data = res;
        break;
      }
    }

    let nodes = data?.collection?.products?.nodes ?? [];

    // 2) Koleksiyon bulunamadıysa ya da boşsa -> ürün arama fallback'i
    if (!data || nodes.length === 0) {
      const searchQuery = [
        'tag:"İçecekler"',
        'tag:"icecekler"',
        'product_type:"İçecekler"',
        'product_type:"icecekler"',
      ].join(' OR ');

      const searchRes = await storefront.query(PRODUCTS_SEARCH_QUERY, {
        variables: {first: 48, query: searchQuery},
      });

      nodes = searchRes?.products?.nodes ?? [];

      if (nodes.length === 0) {
        console.warn(
          `[products._index] Collection fallback da boş. category="${category}", tried handles=[${tried.join(
            ', ',
          )}]`,
        );
      }
    }

    const items = nodes.map((p) => ({
      id: p.id,
      handle: p.handle,
      name: p.title,
      img: p.featuredImage?.url ?? '',
      hoverImg: null, // İleride 2. görseli eklemek istersen
      badge: p.vendor || '',
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
=======
import {useEffect, useRef, useState, useCallback} from 'react';
import {Link, useLocation, useNavigate, useLoaderData} from 'react-router';
import {getPaginationVariables, Image, Money} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useToast} from '~/components/Toast';

export const meta = () => [
  {title: 'HerbalMode – Ürünler'},
  {
    name: 'description',
    content:
      'Tüm Herbalife ürünleri: Temel Beslenme, İçecekler, Atıştırmalıklar ve daha fazlası.',
  },
];

// Collection handles mapping
const COLLECTIONS = [
  {id: 'all', label: 'Tüm Ürünler', handle: null, icon: ''},
  {id: 'temel-beslenme', label: 'Temel Beslenme', handle: 'temel-beslenme', icon: ''},
  {id: 'icecekler', label: 'İçecekler', handle: 'icecekler', icon: ''}, // düzeltildi
  {id: 'atistirmaliklar', label: 'Atıştırmalıklar', handle: 'atistirmaliklar', icon: ''},
  {id: 'dis-beslenme', label: 'Dış Beslenme', handle: 'dis-beslenme', icon: ''},
  {id: 'takviye', label: 'Takviye Edici Gıdalar', handle: 'takviye-edici-gidalar', icon: ''},
  {id: 'aktif-yasam', label: 'Aktif Yaşam Ürünleri', handle: 'aktif-yasam-urunleri', icon: ''},
];

/**
 * LOADER - Fetches products based on collection or all products
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const rawCollection = url.searchParams.get('collection');
  const searchQuery = (url.searchParams.get('q') || '').trim();
  const sortKey = 'BEST_SELLING'; // dropdown yok, sabit

  // Türkçe karakter ve noktalı-i sorunları için güvenli handle
  const collectionHandle = rawCollection ? normalizeHandle(rawCollection) : null;

  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  let products;
  let collection = null;

  // 1) Arama varsa: Shopify Search API (sadece ürün)
  if (searchQuery) {
    const {products: searchConn} = await storefront.query(PRODUCT_SEARCH_QUERY, {
      variables: {
        ...paginationVariables,
        term: searchQuery,
      },
    });
    products = searchConn;
  }
  // 2) Koleksiyon seçiliyse
  else if (collectionHandle) {
    const collectionResult = await storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {
        ...paginationVariables,
        handle: collectionHandle,
        sortKey,
      },
    });

    if (!collectionResult?.collection) {
      throw new Response('Collection not found', {status: 404});
    }

    collection = collectionResult.collection;
    products = collection.products;
  }
  // 3) Tüm ürünler
  else {
    const allProductsResult = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {
        ...paginationVariables,
        sortKey,
      },
    });
    products = allProductsResult.products;
  }

  return {
    products,
    collection,
    searchQuery,
    sortKey,
    appliedFilters: {
      collection: collectionHandle,
      search: searchQuery,
      sort: sortKey,
    },
  };
}

/** Türkçe handle normalizasyonu (örn. İçecekler → icecekler) */
function normalizeHandle(s) {
  return s
    .toLowerCase()
    .replaceAll('ı', 'i')
    .replaceAll('İ', 'i')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ProductsRoute() {
  const {products, searchQuery, appliedFilters} = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // URL'deki handle → id eşlemesi (ilk render)
  const initialCollectionId = appliedFilters.collection
    ? COLLECTIONS.find((c) => c.handle === appliedFilters.collection)?.id ?? 'all'
    : 'all';

  const [activeCollection, setActiveCollection] = useState(initialCollectionId);
  const [searchInput, setSearchInput] = useState(searchQuery || '');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const searchTimeoutRef = useRef(null);

  // Kategori değişimi
  const handleCollectionChange = useCallback(
    (collectionId) => {
      const collection = COLLECTIONS.find((c) => c.id === collectionId);
      const params = new URLSearchParams(location.search);

      if (collection.handle) {
        params.set('collection', collection.handle);
      } else {
        params.delete('collection');
      }

      params.delete('q'); // kategori değişince aramayı temizle
      setSearchInput('');
      setActiveCollection(collectionId);
      navigate(`/products?${params.toString()}`);
    },
    [location.search, navigate],
  );

  // Arama (debounce)
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      if (searchInput !== searchQuery) {
        const params = new URLSearchParams(location.search);
        if (searchInput) params.set('q', searchInput);
        else params.delete('q');
        navigate(`/products?${params.toString()}`);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchInput, searchQuery, location.search, navigate]);

  // Son query'i (sadece /products için) sessionStorage'a yaz
  useEffect(() => {
    if (location.pathname !== '/products') return;
    sessionStorage.setItem('products:lastQuery', location.search || '');
  }, [location.pathname, location.search]);

  // Sayfa yenilenince (hard reload) kaldığın query'e geri dön
  useEffect(() => {
    // Modern API
    const nav = performance.getEntriesByType?.('navigation')?.[0];
    const isReload = nav
      ? nav.type === 'reload'
      : performance.navigation && performance.navigation.type === 1; // eski tarayıcı fallback

    if (!isReload) return;
    if (location.pathname !== '/products') return;

    const last = sessionStorage.getItem('products:lastQuery');
    if (last != null && last !== location.search) {
      navigate(`/products${last}`, {replace: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // yalnızca ilk mount

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f7fbd1]/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#E4F2EA] to-[#f7fbd1] pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3E7D5E]/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3E7D5E] mb-4">
              Ürünlerimiz
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
>>>>>>> 5b99f58 (improvements)
              Tüm ürünlerimiz bilim destekli, modern ve fonksiyonel formüllerle
              hazırlanmıştır.
            </p>
          </div>

<<<<<<< HEAD
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
=======
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3E7D5E]/50"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters + View Controls */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Collection Pills */}
            <div
              className="
                flex items-center gap-2
                sm:flex-wrap sm:overflow-visible
                overflow-x-auto no-scrollbar
                flex-1
              "
            >
              {COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => handleCollectionChange(col.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCollection === col.id
                      ? 'bg-[#3E7D5E] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{col.icon}</span>
                  <span>{col.label}</span>
                </button>
              ))}
            </div>

            {/* View Controls only (no sort) */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  aria-label="Grid view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  aria-label="List view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sadece "Filtreleri Temizle" (adet yazısı kaldırıldı) */}
      {(searchQuery || appliedFilters.collection) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setSearchInput('');
                setActiveCollection('all');
                navigate('/products');
              }}
              className="text-sm text-[#3E7D5E] hover:text-[#2a5a3f] font-medium"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>
      )}

      {/* Products Grid / List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {products?.nodes?.length > 0 ? (
          <PaginatedResourceSection
            connection={products}
            resourcesClassName={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
                : 'space-y-4'
            }
          >
            {({node: product, index}) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                loading={index < 8 ? 'eager' : 'lazy'}
              />
            )}
          </PaginatedResourceSection>
        ) : (
          <div className="text-center py-20">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Ürün bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">Farklı bir kategori veya arama terimi deneyin</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({product, viewMode, loading}) {
  const {addToast} = useToast();
  const isListView = viewMode === 'list';
  const firstVariant = product.variants?.nodes?.[0];

  const handleAddToCart = () => {
    addToast(
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-sm opacity-90">Sepete eklendi!</p>
        </div>
      </div>,
      'success',
      3000,
    );

    // Analytics
    window.gtag?.('event', 'add_to_cart', {
      value: firstVariant?.price?.amount,
      currency: firstVariant?.price?.currencyCode,
      items: [
        {
          item_id: firstVariant?.id,
          item_name: product.title,
          price: firstVariant?.price?.amount,
          quantity: 1,
        },
      ],
    });
  };

  if (isListView) {
    return (
      <div className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
        <Link to={`/products/${product.handle}`} className="w-32 h-32 flex-shrink-0">
          {product.featuredImage && (
            <Image
              alt={product.featuredImage.altText || product.title}
              aspectRatio="1/1"
              data={product.featuredImage}
              loading={loading}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </Link>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <Link to={`/products/${product.handle}`}>
            <h3 className="font-semibold text-[#3E7D5E] hover:text-[#2a5a3f] transition-colors">
              {product.title}
            </h3>
            {product.vendor && <span className="text-xs text-gray-500">{product.vendor}</span>}
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <Money data={product.priceRange.minVariantPrice} className="text-lg font-bold text-[#3E7D5E]" />
            {firstVariant && (
              <AddToCartButton
                disabled={!firstVariant.availableForSale}
                onClick={handleAddToCart}
                lines={[{merchandiseId: firstVariant.id, quantity: 1}]}
              >
                <button
                  type="button"
                  className="p-2 rounded-full bg-[#3E7D5E] text-white hover:bg-[#2a5a3f] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!firstVariant.availableForSale}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </AddToCartButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link to={`/products/${product.handle}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#f7fbd1] to-[#E4F2EA]">
          {product.featuredImage && (
            <Image
              alt={product.featuredImage.altText || product.title}
              aspectRatio="1/1"
              data={product.featuredImage}
              loading={loading}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#3E7D5E] px-4 py-2 rounded-full font-medium -translate-y-2 group-hover:translate-y-0">
              Hızlı Bak
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.handle}`}>
          {product.vendor && (
            <span className="text-xs text-gray-500 uppercase tracking-wider">{product.vendor}</span>
          )}
          <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-[#3E7D5E] transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <Money data={product.priceRange.minVariantPrice} className="text-lg font-bold text-[#3E7D5E]" />
          {firstVariant && (
            <AddToCartButton
              disabled={!firstVariant.availableForSale}
              onClick={handleAddToCart}
              lines={[{merchandiseId: firstVariant.id, quantity: 1}]}
            >
              <button
                type="button"
                className="p-2 rounded-full bg-[#3E7D5E] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#2a5a3f] disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!firstVariant.availableForSale}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </AddToCartButton>
          )}
        </div>
      </div>
>>>>>>> 5b99f58 (improvements)
    </div>
  );
}

<<<<<<< HEAD
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

            {/* Hover resmi (ileride eklenecekse kullanılır) */}
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
=======
/* ===================== GraphQL ===================== */

const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    handle
    title
    featuredImage { id altText url width height }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
  }
`;

const PRODUCT_SEARCH_QUERY = `#graphql
  query ProductSearch(
    $country: CountryCode
    $language: LanguageCode
    $term: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country:$country, language:$language) {
    products: search(
      query: $term
      types: [PRODUCT]
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
      sortKey: RELEVANCE
    ) {
      nodes {
        ... on Product {
          id
          handle
          title
          vendor
          featuredImage { id url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 1) {
            nodes {
              id
              title
              availableForSale
              price { amount currencyCode }
            }
          }
        }
      }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
    }
  }
`;


const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductSortKeys
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
      sortKey: $sortKey
    ) {
      nodes {
        id
        handle
        title
        vendor
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 1) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
          }
        }
      }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
>>>>>>> 5b99f58 (improvements)
    }
  }
`;

<<<<<<< HEAD
// Koleksiyon → ürünleri
const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $handle: String!
    $first: Int!
=======
const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductCollectionSortKeys
>>>>>>> 5b99f58 (improvements)
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
<<<<<<< HEAD
      products(first: $first) {
=======
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: $sortKey
      ) {
>>>>>>> 5b99f58 (improvements)
        nodes {
          id
          handle
          title
<<<<<<< HEAD
          description
          vendor
          featuredImage {
            url
            altText
            width
            height
          }
        }
=======
          vendor
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 1) {
            nodes {
              id
              title
              availableForSale
              price { amount currencyCode }
            }
          }
        }
        pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
>>>>>>> 5b99f58 (improvements)
      }
    }
  }
`;
<<<<<<< HEAD

// Fallback: tag / product_type ile ürün arama
const PRODUCTS_SEARCH_QUERY = `#graphql
  query ProductsSearch(
    $first: Int!
    $query: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
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

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
=======
>>>>>>> 5b99f58 (improvements)
