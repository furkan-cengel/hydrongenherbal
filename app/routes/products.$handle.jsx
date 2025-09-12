// app/routes/products.$handle.jsx
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
  }

  return {
    product,
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
    </div>
  );
}

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
      }
    }
  }
`;
