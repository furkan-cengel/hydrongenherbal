// app/components/Header.jsx
import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <strong>{shop.name}</strong>
      </NavLink>

      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />

      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({menu, primaryDomainUrl, viewport, publicStoreDomain}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink end onClick={close} prefetch="intent" style={activeLinkStyle} to="/">
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button className="header-menu-mobile-toggle reset" onClick={() => open('mobile')}>
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({count}) {
  const {open} = useAside();
  return (
    <button
      type="button"
      onClick={() => open('cart')}
      className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-50"
    >
      <span className="font-medium">Sepet</span>
      <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full px-1 text-xs font-bold text-white bg-emerald-600">
        {typeof count === 'number' ? count : 0}
      </span>
    </button>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {id: 'gid://shopify/MenuItem/461609500728', title: 'Collections', type: 'HTTP', url: '/collections', items: []},
    {id: 'gid://shopify/MenuItem/461609533496', title: 'Blog', type: 'HTTP', url: '/blogs/journal', items: []},
    {id: 'gid://shopify/MenuItem/461609566264', title: 'Policies', type: 'HTTP', url: '/policies', items: []},
    {id: 'gid://shopify/MenuItem/461609599032', title: 'About', type: 'PAGE', url: '/pages/about', items: []},
  ],
};

function activeLinkStyle({isActive, isPending}) {
  return {fontWeight: isActive ? 'bold' : undefined, color: isPending ? 'grey' : 'black'};
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/** @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<import('storefrontapi.generated').CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
