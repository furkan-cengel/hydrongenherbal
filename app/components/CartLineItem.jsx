<<<<<<< HEAD
=======
// app/components/CartLineItem.jsx
>>>>>>> 5b99f58 (improvements)
import {CartForm, Image} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';

/**
<<<<<<< HEAD
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
=======
 * A single line item in the cart
>>>>>>> 5b99f58 (improvements)
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 * }}
 */
export function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();

  return (
<<<<<<< HEAD
    <li key={id} className="cart-line">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          height={100}
          loading="lazy"
          width={100}
        />
      )}

      <div>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
        >
          <p>
            <strong>{product.title}</strong>
          </p>
        </Link>
        <ProductPrice price={line?.cost?.totalAmount} />
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} />
=======
    <li className="bg-white rounded-xl border border-[#e4f2ea] p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        {image && (
          <Link
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className="flex-shrink-0 block"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f7fbd1]">
              <Image
                alt={title}
                aspectRatio="1/1"
                data={image}
                loading="lazy"
                className="object-cover w-full h-full hover:scale-105 transition-transform"
              />
            </div>
          </Link>
        )}

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className="text-[#3E7D5E] hover:text-[#2a5a3f] transition-colors"
          >
            <h3 className="font-semibold text-sm line-clamp-1">{product.title}</h3>
          </Link>
          
          {/* Variant Options */}
          {selectedOptions && selectedOptions.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <span 
                  key={option.name}
                  className="text-xs text-gray-500 bg-[#f7fbd1] px-2 py-0.5 rounded-full"
                >
                  {option.name}: {option.value}
                </span>
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="mt-2 text-sm font-medium text-[#3E7D5E]">
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end justify-between gap-2">
          {/* Remove Button */}
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesRemove}
            inputs={{lineIds: [id]}}
          >
            <button 
              type="submit"
              disabled={!!line.isOptimistic}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              aria-label="Ürünü kaldır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </CartForm>
          
          {/* Quantity Selector */}
          <CartLineQuantity line={line} />
        </div>
>>>>>>> 5b99f58 (improvements)
      </div>
    </li>
  );
}

/**
<<<<<<< HEAD
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
=======
 * Quantity controls for cart line
>>>>>>> 5b99f58 (improvements)
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
<<<<<<< HEAD
    <div className="cart-line-quantity">
      <small>Quantity: {quantity} &nbsp;&nbsp;</small>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <span>&#8722; </span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
=======
    <div className="flex items-center gap-1 bg-[#f7fbd1] rounded-full p-1">
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{
          lines: [{id: lineId, quantity: prevQuantity}]
        }}
      >
        <button
          type="submit"
          aria-label="Azalt"
          disabled={quantity <= 1 || !!isOptimistic}
          className="w-7 h-7 flex items-center justify-center text-[#3E7D5E] hover:bg-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg leading-none">−</span>
        </button>
      </CartForm>
      
      <span className="w-8 text-center text-sm font-semibold text-[#3E7D5E]">
        {quantity}
      </span>
      
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{
          lines: [{id: lineId, quantity: nextQuantity}]
        }}
      >
        <button
          type="submit"
          aria-label="Artır"
          disabled={!!isOptimistic}
          className="w-7 h-7 flex items-center justify-center text-[#3E7D5E] hover:bg-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg leading-none">+</span>
        </button>
      </CartForm>
>>>>>>> 5b99f58 (improvements)
    </div>
  );
}

<<<<<<< HEAD
/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({lineIds, disabled}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button disabled={disabled} type="submit">
        Remove
      </button>
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @returns
 * @param {string[]} lineIds - line ids affected by the update
 */
function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
=======
/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
>>>>>>> 5b99f58 (improvements)
