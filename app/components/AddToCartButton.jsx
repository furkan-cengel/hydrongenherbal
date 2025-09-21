<<<<<<< HEAD
=======
// app/components/AddtoCartButton.jsx
>>>>>>> 5b99f58 (improvements)
import {CartForm} from '@shopify/hydrogen';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   onClick?: () => void;
 * }}
 */
<<<<<<< HEAD
export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
=======
export function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines}}>
      {(fetcher) => (
        <>
          {analytics ? (
            <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
          ) : null}
>>>>>>> 5b99f58 (improvements)
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

<<<<<<< HEAD
/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
=======
>>>>>>> 5b99f58 (improvements)
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
