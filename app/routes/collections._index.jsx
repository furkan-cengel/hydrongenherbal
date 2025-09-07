// app/routes/collections._index.jsx
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
// NOT: Şimdilik _shopify_base altındaki sürümü kullanıyoruz.
// Bunu components köküne taşırsan import'u ~/components/PaginatedResourceSection yaparsın.
import {PaginatedResourceSection} from '~/components/_shopify_base/PaginatedResourceSection';

/** @type {import('react-router').MetaFunction} */
export const meta = () => [
  {title: 'HerbalMode | Koleksiyonlar'},
  {rel: 'canonical', href: '/collections'},
];

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request}) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 4});

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
  ]);

  return {collections};
}

function loadDeferredData() {
  return {};
}

export default function Collections() {
  /** @type {LoaderReturnData} */
  const {collections} = useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#3E1E12] mb-6">
        Koleksiyonlar
      </h1>

      <PaginatedResourceSection
        connection={collections}
        resourcesClassName="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {({node: collection, index}) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

/**
 * @param {{
 *   collection: CollectionFragment;
 *   index: number;
 * }}
 */
function CollectionItem({collection, index}) {
  return (
    <Link
      className="group block rounded-2xl overflow-hidden border border-black/5 hover:shadow-md transition"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
          sizes="(min-width: 45em) 400px, 100vw"
          className="w-full h-auto"
        />
      )}
      <h5 className="p-4 text-[#3E1E12] font-semibold group-hover:text-[#c1a852]">
        {collection.title}
      </h5>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
