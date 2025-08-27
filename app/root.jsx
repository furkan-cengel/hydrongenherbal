import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import favicon from '~/assets/favicon.svg';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';

// Kendi layout'un
import HmodeLayout from './components/HmodeLayout';

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://shop.app'},
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'}, // Ekle
    {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
    {
      rel: 'preload',
      as: 'image',
      href: '/images/features.webp',
      fetchpriority: 'high',
      type: 'image/webp',
    },
  ];
}

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  // MaÄŸaza envâ€™leri tanÄ±mlÄ± mÄ±?
  const hasStore =
    Boolean(env?.PUBLIC_STORE_DOMAIN) &&
    Boolean(env?.PUBLIC_STOREFRONT_API_TOKEN) &&
    Boolean(env?.PUBLIC_STOREFRONT_ID) &&
    Boolean(env?.PUBLIC_CHECKOUT_DOMAIN);

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env?.PUBLIC_STORE_DOMAIN ?? null,
    shop: hasStore
      ? getShopAnalytics({
          storefront,
          publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
        })
      : null,
    consent: hasStore
      ? {
          checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
          storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
          withPrivacyBanner: false,
          // localize the privacy banner
          country: args.context.storefront.i18n.country,
          language: args.context.storefront.i18n.language,
        }
      : null,
  };
}

/**
 * Load data necessary for rendering content above the fold.
 * Åžu an kritik veri kullanmÄ±yoruz.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData() {
  return {};
}

/**
 * Load data for rendering content below the fold (deferred).
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const {customerAccount, cart} = context;

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
  };
}

/**
 * @param {{children?: React.ReactNode}}
 */
export function Layout({children}) {
  const nonce = useNonce();
  /** @type {RootLoader} */
  const data = useRouteLoaderData('root');

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss} />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />
        <Meta />
        <Links />
      </head>
      <body>
        {data?.shop ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <HmodeLayout>{children}</HmodeLayout>
          </Analytics.Provider>
        ) : (
          <HmodeLayout>{children}</HmodeLayout>
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

/** @typedef {LoaderReturnData} RootLoader */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
