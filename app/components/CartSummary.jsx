// app/components/_shopify_base/CartSummary.jsx
import {CartForm, Money} from '@shopify/hydrogen';
import {useRef} from 'react';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({cart, layout}) {
  const className = layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      {/* Subtotal */}
      <dl className="space-y-3">
        <div className="flex justify-between items-center py-2">
          <dt className="text-sm text-gray-600">Ara Toplam</dt>
          <dd className="text-sm font-medium text-[#3E7D5E]">
            {cart.cost?.subtotalAmount?.amount ? (
              <Money data={cart.cost?.subtotalAmount} />
            ) : (
              '₺0'
            )}
          </dd>
        </div>
        
        {/* Discount Code Section */}
        <CartDiscounts discountCodes={cart.discountCodes} />
        
        {/* Gift Card Section */}
        <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
        
        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <dt className="text-base font-semibold text-[#3E7D5E]">Toplam</dt>
          <dd className="text-base font-bold text-[#3E7D5E]">
            {cart.cost?.totalAmount?.amount ? (
              <Money data={cart.cost?.totalAmount} />
            ) : (
              '₺0'
            )}
          </dd>
        </div>
      </dl>
      
      {/* Checkout Button */}
      <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-6">
      <a 
        href={checkoutUrl} 
        target="_self"
        className="block w-full bg-[#3E7D5E] text-white text-center py-3 px-6 rounded-full font-semibold hover:bg-[#2a5a3f] transition-colors shadow-lg"
      >
        Ödemeye Geç →
      </a>
      
      <p className="text-center text-xs text-gray-500 mt-3">
        Kargo ve vergiler ödeme sırasında hesaplanır
      </p>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({discountCodes}) {
  const codes = discountCodes
    ?.filter((discount) => discount.applicable)
    ?.map(({code}) => code) || [];

  return (
    <div className="space-y-2">
      {/* Show existing discount */}
      {codes.length > 0 && (
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">İndirim</span>
            <span className="text-xs bg-[#eaf580] text-[#436d33] px-2 py-1 rounded-full font-medium">
              {codes.join(', ')}
            </span>
          </div>
          <UpdateDiscountForm>
            <button 
              type="submit"
              className="text-xs text-red-500 hover:text-red-700"
            >
              Kaldır
            </button>
          </UpdateDiscountForm>
        </div>
      )}

      {/* Add discount code input */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2">
          <input 
            type="text" 
            name="discountCode" 
            placeholder="İndirim kodu"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7D5E]/20 focus:border-[#3E7D5E]"
          />
          <button 
            type="submit"
            className="px-4 py-2 text-sm bg-[#eaf580] text-[#436d33] rounded-lg font-medium hover:bg-[#dff570] transition-colors"
          >
            Uygula
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
 * }}
 */
function CartGiftCard({giftCardCodes}) {
  const appliedGiftCardCodes = useRef([]);
  const giftCardCodeInput = useRef(null);
  const codes = giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code) {
    const formattedCode = code.replace(/\s/g, '');
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    if (giftCardCodeInput.current) {
      giftCardCodeInput.current.value = '';
    }
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  if (codes.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Show existing gift card */}
      {codes.length > 0 && (
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hediye Kartı</span>
            <span className="text-xs bg-[#eaf580] text-[#436d33] px-2 py-1 rounded-full font-medium">
              {codes.join(', ')}
            </span>
          </div>
          <UpdateGiftCardForm>
            <button 
              type="submit"
              onClick={removeAppliedCode}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Kaldır
            </button>
          </UpdateGiftCardForm>
        </div>
      )}

      {/* Add gift card input */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
      >
        <div className="flex gap-2">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Hediye kartı kodu"
            ref={giftCardCodeInput}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7D5E]/20 focus:border-[#3E7D5E]"
          />
          <button 
            type="submit"
            className="px-4 py-2 text-sm bg-[#eaf580] text-[#436d33] rounded-lg font-medium hover:bg-[#dff570] transition-colors"
          >
            Uygula
          </button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

/**
 * @param {{
 *   giftCardCodes?: string[];
 *   saveAppliedCode?: (code: string) => void;
 *   children: React.ReactNode;
 * }}
 */
function UpdateGiftCardForm({giftCardCodes, saveAppliedCode, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code);
        }
        return children;
      }}
    </CartForm>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */