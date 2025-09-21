<<<<<<< HEAD
import {useLoaderData} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/CartMain';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Cart`}];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({actionHeaders}) => actionHeaders;

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

=======
// app/routes/cart.jsx
import {useLoaderData} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {data} from '@shopify/remix-oxygen'; // json yerine data kullanıyoruz
import {CartMain} from '~/components/CartMain';

export const meta = () => [{title: `Hydrogen | Cart`}];

export const headers = ({actionHeaders}) => actionHeaders;

/** @param {import('@shopify/remix-oxygen').ActionFunctionArgs} args */
export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);
  if (!action) throw new Error('No action provided');

  let result;
>>>>>>> 5b99f58 (improvements)
  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;
<<<<<<< HEAD

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

=======
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];
      discountCodes.push(...inputs.discountCodes);
>>>>>>> 5b99f58 (improvements)
      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesUpdate: {
      const formGiftCardCode = inputs.giftCardCode;
<<<<<<< HEAD

      // User inputted gift card code
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

      // Combine gift card codes already applied on cart
      giftCardCodes.push(...inputs.giftCardCodes);

      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
=======
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];
      giftCardCodes.push(...inputs.giftCardCodes);
      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity({...inputs.buyerIdentity});
      break;
>>>>>>> 5b99f58 (improvements)
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
<<<<<<< HEAD
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return json(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

/**
 * @param {LoaderFunctionArgs}
 */
=======

  // AddToCartButton'dan gelecek
  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    headers.set('Location', redirectTo);
    return data(
      {
        cart: result.cart,
        errors: result.errors,
        warnings: result.warnings,
        analytics: {cartId},
      },
      {status: 303, headers},
    );
  }

  return data(
    {
      cart: result.cart,
      errors: result.errors,
      warnings: result.warnings,
      analytics: {cartId},
    },
    {status: 200, headers},
  );
}

/** @param {import('@shopify/remix-oxygen').LoaderFunctionArgs} args */
>>>>>>> 5b99f58 (improvements)
export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}

export default function Cart() {
<<<<<<< HEAD
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

=======
  const cart = useLoaderData();
>>>>>>> 5b99f58 (improvements)
  return (
    <div className="cart">
      <h1>Cart</h1>
      <CartMain layout="page" cart={cart} />
    </div>
  );
}
<<<<<<< HEAD

/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').HeadersFunction} HeadersFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
=======
>>>>>>> 5b99f58 (improvements)
