<<<<<<< HEAD
=======
// app/components/CartMain.jsx
>>>>>>> 5b99f58 (improvements)
import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
<<<<<<< HEAD
import {CartSummary} from './_shopify_base/CartSummary';

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * @param {CartMainProps}
 */
export function CartMain({layout, cart: originalCart}) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
=======
import {CartSummary} from '~/components/CartSummary';

/**
 * @param {CartMainProps}
 */
export function CartMain({layout, cart: originalCart}) {
>>>>>>> 5b99f58 (improvements)
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
<<<<<<< HEAD
      <div className="cart-details">
        <div aria-labelledby="cart-lines">
          <ul>
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
=======
      
      {cartHasItems && (
        <div className="cart-details">
          <div aria-labelledby="cart-lines">
            <ul className="space-y-4">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
          
          {/* Divider */}
          <hr className="my-6 border-gray-200" />
          
          {/* Cart Summary */}
          <CartSummary cart={cart} layout={layout} />
        </div>
      )}
>>>>>>> 5b99f58 (improvements)
    </div>
  );
}

<<<<<<< HEAD
/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({hidden = false}) {
  const {close} = useAside();
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link to="/collections" onClick={close} prefetch="viewport">
        Continue shopping →
=======
function CartEmpty({hidden = false, layout}) {
  const {close} = useAside();
  
  return (
    <div hidden={hidden} className="text-center py-12">
      <div className="mb-6">
        <svg 
          className="mx-auto h-16 w-16 text-gray-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Sepetiniz boş
      </h3>
      
      <p className="text-sm text-gray-500 mb-6">
        Alışverişe başlamak için ürünlerimizi keşfedin
      </p>
      
      <Link 
        to="/products" 
        onClick={layout === 'aside' ? close : undefined}
        prefetch="viewport"
        className="inline-block bg-[#3E7D5E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2a5a3f] transition-colors"
      >
        Alışverişe Başla →
>>>>>>> 5b99f58 (improvements)
      </Link>
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
<<<<<<< HEAD
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
=======
/** @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
>>>>>>> 5b99f58 (improvements)
