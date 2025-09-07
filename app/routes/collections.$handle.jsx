// app/routes/collections.$handle.jsx
import {redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
// NOT: Şimdilik _shopify_base altındaki sürümleri kullanıyoruz.
import {PaginatedResourceSection} from '~/components/_shopify_base/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import ProductItem from '~/components/_shopify_base/ProductItem';

/**
 * @type {import('react-router').MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  const title = data?.collection?.title
    ? `HerbalMode | ${data.collection.title}`
    : 'HerbalMode | Koleksiyon';
  const canonical = data?.collection?.handle
    ? `/collections/${data.collection.handle}`
    : '/collections';
  return [{title}, {rel: 'canonical', href: canonical}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 8});

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  // Localized handle kontrolü
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {collection};
}

function loadDeferredData() {
  return {};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const {collection} = useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#3E1E12]">
        {collection.title}
      </h1>
      {collection.description ? (
        <p className="mt-2 text-[#3E1E12]/80">{collection.description}</p>
      ) : null}

      <div className="mt-8">
        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
