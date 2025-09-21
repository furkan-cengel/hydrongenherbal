// app/routes/products.$handle.jsx
<<<<<<< HEAD
import {useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';
import {ProductImage} from '~/components/ProductImage';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductForm} from '~/components/ProductForm';

export const meta = ({data}) => {
  const p = data?.product;
  if (!p) return [{title: 'Ürün bulunamadı'}];
  const title = p.seo?.title || p.title;
  const desc = p.seo?.description || p.description?.slice(0, 160) || '';
  return [
    {title},
    {name: 'description', content: desc},
    {property: 'og:title', content: title},
    {property: 'og:description', content: desc},
    {property: 'og:type', content: 'product'},
  ];
};

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  const data = await storefront.query(PRODUCT_QUERY, {variables: {handle}});
  const product = data?.product ?? null;
  if (!product) {
    throw new Response('Not found', {status: 404});
=======
import {useState, useEffect, useRef, useMemo} from 'react';
import {useLoaderData, Link, useNavigate} from 'react-router';
import {
  Analytics,
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
  getVariantUrl,
} from '@shopify/hydrogen';
import {redirect} from '@shopify/remix-oxygen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import { useToast } from '~/components/Toast';

export const meta = ({data}) => {
  const product = data?.product;
  if (!product) return [{title: 'Ürün bulunamadı'}];
  
  const title = product.seo?.title || product.title;
  const description = product.seo?.description || product.description?.slice(0, 160) || '';
  
  return [
    {title: `${title} | HerbalMode`},
    {name: 'description', content: description},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'product'},
    {property: 'og:image', content: product.featuredImage?.url},
  ];
};

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;
  
  const selectedOptions = getSelectedProductOptions(request).filter(
    option => option.value !== 'Default Title',
  );

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response('Product not found', {status: 404});
  }

  // Get recommended products from the same collection
  const recommendedProducts = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {
      productId: product.id,
    },
  });
  let recommended = recommendedProducts?.productRecommendations || [];
  if (!recommended.length) {
    const firstCollectionHandle = product.collections?.nodes?.[0]?.handle;
    if (firstCollectionHandle) {
      const relatedRes = await storefront.query(RELATED_BY_COLLECTION_QUERY, {
        variables: { handle: firstCollectionHandle },
      });
      recommended =
        relatedRes?.collection?.products?.nodes?.filter(p => p.id !== product.id) || [];
    }
  }
  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      option => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    if (!product.selectedVariant) {
      return redirectToFirstVariant({product, request});
    }
>>>>>>> 5b99f58 (improvements)
  }

  return {
    product,
<<<<<<< HEAD
    selectedVariant: product.selectedOrFirstAvailableVariant ?? null,
    productOptions: [], // şimdilik boş
  };
}

export default function ProductPage() {
  const {product, selectedVariant, productOptions} = useLoaderData();

  // Analytics payload (gerekli alanlar güvence altına alındı)
  const price = selectedVariant?.price?.amount
    ? selectedVariant.price
    : {amount: '0.00', currencyCode: 'TRY'};

  const variantTitle =
    selectedVariant?.title ||
    selectedVariant?.selectedOptions?.map((o) => o.value).join(' / ') ||
    'Default';
  const analyticsProducts = [
    {
      id: product?.id ?? 'gid://shopify/Product/DUMMY',
      title: product?.title ?? 'Sample Product',
      vendor: product?.vendor ?? 'HerbalMode', // <-- EKLENDİ
      price, // MoneyV2: {amount, currencyCode}
      variantId: selectedVariant?.id ?? 'gid://shopify/ProductVariant/DUMMY',
      // İsteğe bağlı alanlar:
      // productType: product?.productType ?? '',
      // sku: selectedVariant?.sku ?? '',
      variantTitle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fefefe] px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 md:pt-36 pb-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:sticky md:top-28">
          <ProductImage image={selectedVariant?.image} />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E7D5E] leading-tight">
            {product.title}
          </h1>

          {product.vendor ? (
            <span className="inline-block bg-[#E4F2EA] text-[#3E7D5E] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-fit">
              {product.vendor}
            </span>
          ) : null}

          {product.description ? (
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          ) : null}

          <ProductPrice
            price={selectedVariant?.price}
            compareAtPrice={selectedVariant?.compareAtPrice}
          />

          <div className="mt-2">
            <ProductForm
              productOptions={productOptions || []}
              selectedVariant={selectedVariant}
            />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <Analytics.ProductView data={{products: analyticsProducts}} />
=======
    recommendedProducts: recommended,
    variants: product.variants.nodes,
  };
}

function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  throw redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {status: 302},
  );
}

// — İlk cümleyi (veya ilk paragrafı) çek, çok uzunsa kısalt —
function extractFirstSentence(text, maxChars = 220) {
  if (!text) return '';
  const firstPara = text.trim().split(/\n+/)[0];               // ilk paragraf
  const m = firstPara.match(/(.+?[.!?])(\s|$)/);               // ilk cümle
  const sentence = (m ? m[1] : firstPara).trim();
  return sentence.length > maxChars ? sentence.slice(0, maxChars - 1) + '…' : sentence;
}


export default function ProductPage() {
  const {product, recommendedProducts, variants} = useLoaderData();
  const shortBlurb = extractFirstSentence(
  product?.seo?.description || product?.description || ''
);

  const {open} = useAside();
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);
  const {addToast} = useToast();
  const selectedVariant = product.selectedVariant;
  const images = product.media.nodes.filter(media => media.mediaContentType === 'IMAGE');

  // --- Description UX helpers ---
  const description = product.description || '';
 

  const descData = useMemo(() => {
    const raw = (description || '').replace(/\s+/g, ' ').trim();
    if (!raw) return {highlights: [], restText: '', badges: [], warning: ''};

    // Cümlelere böl (Türkçe büyük harfleri de kapsar)
    const sentences = raw.split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜÂÎÛ])/u);
    // Kısa ve vurucu ilk cümlelerden "Öne Çıkanlar"
    const highlights = sentences.filter((s) => s && s.length <= 160).slice(0, 5);
    const restText = sentences.slice(highlights.length).join(' ');

    // Rozetler (metindeki anahtar kelimelere göre)
    const badges = [];
    const add = (t) => { if (!badges.includes(t)) badges.push(t); };
    if (/nemlendir|nemli|nemlendirme/i.test(raw)) add('Nemlendirme');
    if (/temizler|temizleme|arındır|arindir/i.test(raw)) add('Nazik Temizlik');
    if (/günlük|gunluk/i.test(raw)) add('Günlük Kullanım');
    if (/hassas/i.test(raw)) add('Hassas Ciltlere Uygun');
    if (/dermatolojik/i.test(raw)) add('Dermatolojik Test');
    if (/aloe|bitki|doğal|dogal|botanik/i.test(raw)) add('Bitkisel İçerik');
    if (/paraben|sülfat|sulfat/i.test(raw)) add('Nazik Formül');

    // "Uyarı" bölümü varsa al
    const warnMatch = raw.match(/uyarı[:\s-]?(.*)$/i);
    const warning = warnMatch?.[0] || '';

    return {highlights, restText, badges, warning};
  }, [description]);

  // Breadcrumbs data
  const breadcrumbs = [
    {name: 'Ana Sayfa', path: '/'},
    {name: 'Ürünler', path: '/products'},
    {name: product.title, path: null},
  ];

  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f7fbd1]/20 py-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {crumb.path ? (
                <Link to={crumb.path} className="text-gray-600 hover:text-[#3E7D5E] transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{crumb.name}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className="relative bg-gradient-to-br from-[#f7fbd1] to-[#E4F2EA] rounded-2xl overflow-hidden aspect-square"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {images[selectedImage] && (
                <Image
                  ref={imageRef}
                  data={images[selectedImage].image}
                  aspectRatio="1/1"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-in' : ''
                  }`}
                />
              )}
              
              {/* Sale Badge */}
              {selectedVariant?.compareAtPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  İndirimde
                </div>
              )}
              
              {/* Zoom Hint */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-xs text-gray-600 opacity-0 hover:opacity-100 transition-opacity">
                🔍 Yakınlaştırmak için üzerine gelin
              </div>
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((media, index) => (
                  <button
                    key={media.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#3E7D5E] shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      data={media.image}
                      aspectRatio="1/1"
                      className="w-full h-full object-cover"
                    />
                    {index === 3 && images.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                        +{images.length - 4}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Vendor */}
            <div>
              {product.vendor && (
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  {product.vendor}
                </p>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.title}
              </h1>
            </div>

            {/* Rating (Mock) */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">4.0 (127 değerlendirme)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#3E7D5E]">
                  <Money data={selectedVariant?.price} />
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    <Money data={selectedVariant.compareAtPrice} />
                  </span>
                )}
              </div>
              {selectedVariant?.compareAtPrice && (
                <p className="text-sm text-red-600 font-medium">
                  {Math.round(
                    ((selectedVariant.compareAtPrice.amount - selectedVariant.price.amount) /
                      selectedVariant.compareAtPrice.amount) *
                      100
                  )}% indirim
                </p>
              )}
            </div>

            {/* Short Description */}
        {shortBlurb && (
  <p className="text-gray-700 bg-[#f7fbd1]/40 border border-[#E4F2EA] rounded-xl px-4 py-3 leading-relaxed">
    {shortBlurb}
  </p>
)}


            {/* Variant Selector */}
            {product.options.length > 0 && product.options.some(opt => opt.name !== 'Title') && (
              <div className="space-y-4">
                <VariantSelector
                  handle={product.handle}
                  options={product.options.filter(opt => opt.name !== 'Title')}
                  variants={variants}
                >
                  {({option}) => (
                    <div key={option.name} className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const isActive = selectedVariant?.selectedOptions?.find(
                            opt => opt.name === option.name
                          )?.value === value;
                          
                          const matchingVariant = variants.find(variant =>
                            variant.selectedOptions.some(
                              opt => opt.name === option.name && opt.value === value
                            )
                          );
                          
                          const linkUrl = matchingVariant 
                            ? `/products/${product.handle}?${matchingVariant.selectedOptions
                                .map(opt => `${encodeURIComponent(opt.name)}=${encodeURIComponent(opt.value)}`)
                                .join('&')}`
                            : '#';
                          
                          return (
                            <Link
                              key={option.name + value}
                              to={linkUrl}
                              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                                isActive
                                  ? 'border-[#3E7D5E] bg-[#3E7D5E] text-white'
                                  : 'border-gray-300 hover:border-gray-400'
                              } ${!matchingVariant ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={!matchingVariant ? (e) => e.preventDefault() : undefined}
                            >
                              {value}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </VariantSelector>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-900">Adet:</label>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <AddToCartButton
                  disabled={!selectedVariant || !selectedVariant.availableForSale}
                  onClick={() => {
                      addToast(
    <div className="flex items-center gap-3">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <div>
        <p className="font-medium">{product.title}</p>
        <p className="text-sm opacity-90">{quantity} adet sepete eklendi!</p>
      </div>
    </div>,
    'success',
    3000
  );
                    window.gtag?.('event', 'add_to_cart', {
                      value: selectedVariant.price.amount * quantity,
                      currency: selectedVariant.price.currencyCode,
                      items: [{
                        item_id: selectedVariant.id,
                        item_name: product.title,
                        price: selectedVariant.price.amount,
                        quantity: quantity,
                      }]
                    });
                  }}
                  lines={
                    selectedVariant
                      ? [{merchandiseId: selectedVariant.id, quantity}]
                      : []
                  }
                  className="flex-1"
                >
                  <span className="w-full block bg-[#3E7D5E] text-white py-3 px-8 rounded-full font-semibold text-center hover:bg-[#2a5a3f] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                    {selectedVariant?.availableForSale ? 'Sepete Ekle' : 'Stokta Yok'}
                  </span>
                </AddToCartButton>

                <button
                  onClick={() => {
                    // Add to favorites logic
                  }}
                  className="p-3 border-2 border-gray-300 rounded-full hover:border-[#3E7D5E] hover:text-[#3E7D5E] transition-colors flex-shrink-0"
                  aria-label="Favorilere Ekle"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f7fbd1] rounded-lg">
                  <svg className="w-5 h-5 text-[#3E7D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Garantili Ürün</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f7fbd1] rounded-lg">
                  <svg className="w-5 h-5 text-[#3E7D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Güvenli Alışveriş</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f7fbd1] rounded-lg">
                  <svg className="w-5 h-5 text-[#3E7D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Hızlı Teslimat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f7fbd1] rounded-lg">
                  <svg className="w-5 h-5 text-[#3E7D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Kolay İade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8  ">
              {['description', 'usage', 'ingredients', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  type='button'
                  role='tab'
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-[#3E7D5E] border-b-2 border-[#3E7D5E]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'description' && 'Açıklama'}
                  {tab === 'usage' && 'Kullanım'}
                  {tab === 'ingredients' && 'İçerik'}
                  {tab === 'reviews' && 'Değerlendirmeler (127)'}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Rozetler */}
                {descData.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {descData.badges.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f7fbd1] text-[#3E7D5E] text-xs font-semibold"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                {/* Öne çıkanlar + Detay */}
                {descData.highlights.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 md:p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-3">Öne Çıkanlar</h3>
                      <ul className="space-y-2 text-gray-700">
                        {descData.highlights.map((s, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#E4F2EA]">
                              <svg className="w-3.5 h-3.5 text-[#3E7D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 md:p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-3">Detaylı Açıklama</h3>
                      <p className={`text-gray-600  line-clamp-6' }`}>
                        {descData.restText || description}
                      </p>
                     
                    </div>
                  </div>
                ) : (
                  // Fallback: sadece açıklama
                  <div className="prose max-w-none text-gray-600">
                    <p className={` 'line-clamp-6' `}>
                      {description || 'Ürün açıklaması henüz eklenmemiş.'}
                    </p>
             
                  </div>
                )}

                {/* Uyarı metni yakalanmışsa */}
                {descData.warning && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    {descData.warning}
                  </div>
                )}
              </div>
            )}

           {activeTab === 'usage' && (
  <section className="grid md:grid-cols-3 gap-6">
    {/* Adım adım kullanım – sol kart */}
    <div className="md:col-span-2 p-6 rounded-xl bg-white shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E4F2EA] text-[#3E7D5E]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        Kullanım Talimatları
      </h3>

      <ol className="mt-4 space-y-4">
        {[
          'Günde 1–2 kez, tercihen öğünlerle birlikte alınız.',
          'Bol su ile tüketiniz.',
          'Tavsiye edilen günlük dozu aşmayınız.',
          'Çocukların ulaşamayacağı yerlerde saklayınız.',
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="mt-0.5 inline-flex h-8 min-w-[2rem] w-8 items-center justify-center rounded-full bg-[#f7fbd1] text-[#3E7D5E] font-semibold">
              {i + 1}
            </span>
            <p className="text-gray-700">{step}</p>
          </li>
        ))}
      </ol>
    </div>

    {/* İpuçları / bilgi – sağ kart */}
    <aside className="p-6 rounded-xl bg-[#f7fbd1]/40 border border-[#E4F2EA]">
      <h4 className="text-base font-semibold text-[#2a5a3f] flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
        İpuçları
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {[
          'Düzenli kullanımda en iyi sonuç alınır.',
          'Serin ve kuru yerde muhafaza ediniz.',
          'Hassasiyet durumunda kullanımı durdurup uzmana danışınız.',
        ].map((tip, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 text-[#3E7D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </aside>
  </section>
)}


            {activeTab === 'ingredients' && (
              <div className="prose max-w-none text-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">İçindekiler</h3>
                <p>Protein karışımı, vitamin ve mineral kompleksi, doğal aroma vericiler, tatlandırıcılar.</p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Uyarı:</strong> Hamile ve emziren kadınlar, kronik hastalığı olanlar kullanmadan önce doktoruna danışmalıdır.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Müşteri Değerlendirmeleri</h3>
                  <button className="bg-[#3E7D5E] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2a5a3f] transition-colors">
                    Değerlendirme Yaz
                  </button>
                </div>
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium">Ahmet Y.</span>
                      <span className="text-sm text-gray-500">• 2 hafta önce</span>
                    </div>
                    <p className="text-gray-600">
                      Ürün gerçekten kaliteli. Hızlı kargo ve güzel paketleme için teşekkürler.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommended Products */}
       {/* Recommended Products */}
{recommendedProducts.length > 0 && (
  <div className="mt-16">
    <h2 className="text-2xl font-bold text-gray-900 mb-8">Benzer Ürünler</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {recommendedProducts.slice(0, 4).map((p) => {
        const v = p?.variants?.nodes?.[0];
        return (
          <div
            key={p.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <Link to={`/products/${p.handle}`} className="block">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#f7fbd1] to-[#E4F2EA]">
                {p.featuredImage && (
                  <Image
                    data={p.featuredImage}
                    aspectRatio="1/1"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}

                {/* Quick View overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#3E7D5E] px-4 py-2 rounded-full font-medium -translate-y-2 group-hover:translate-y-0">
                    Hızlı Bak
                  </span>
                </div>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${p.handle}`}>
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#3E7D5E] transition-colors">
                  {p.title}
                </h3>
              </Link>

              <div className="mt-2 flex items-center justify-between">
                <Money
                  data={p.priceRange.minVariantPrice}
                  className="text-lg font-bold text-[#3E7D5E]"
                />

                {/* Add to cart (hover'da görünür) */}
                {v && (
                  <AddToCartButton
                    disabled={!v.availableForSale}
                    onClick={() => {
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
                            <p className="font-medium">{p.title}</p>
                            <p className="text-sm opacity-90">Sepete eklendi!</p>
                          </div>
                        </div>,
                        'success',
                        3000
                      );
                      window.gtag?.('event', 'add_to_cart', {
                        value: v.price?.amount,
                        currency: v.price?.currencyCode,
                        items: [{ item_id: v.id, item_name: p.title, price: v.price?.amount, quantity: 1 }],
                      });
                    }}
                    lines={[{ merchandiseId: v.id, quantity: 1 }]}
                  >
                    <button
                      type="button"
                      className="p-2 rounded-full bg-[#3E7D5E] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#2a5a3f] disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={!v.availableForSale}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </AddToCartButton>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
>>>>>>> 5b99f58 (improvements)
    </div>
  );
}

<<<<<<< HEAD
const PRODUCT_QUERY = `#graphql
  query ProductByHandle($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      handle
      title
      vendor
      description
      seo { title description }
      selectedOrFirstAvailableVariant(
        selectedOptions: []
        ignoreUnknownOptions: true
        caseInsensitiveMatch: true
      ) {
        id
        title
        availableForSale
        image { id url altText width height }
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions {name value}
=======
// GraphQL Queries
const PRODUCT_QUERY = `#graphql
  query Product(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      seo {
        title
        description
      }
        collections(first: 2) {
        nodes { id handle title }
      }
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query ProductRecommendations(
    $productId: ID!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
           variants(first: 1) {
       nodes {
         id
         availableForSale
         price { amount currencyCode }
       }
     }
    }
  }
`;

const RELATED_BY_COLLECTION_QUERY = `#graphql
  query RelatedByCollection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      products(first: 8) {
        nodes {
          id
          handle
          title
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
        }
>>>>>>> 5b99f58 (improvements)
      }
    }
  }
`;
