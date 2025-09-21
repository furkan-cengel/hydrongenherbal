import {Link, useNavigate} from 'react-router';
import {AddToCartButton} from './AddToCartButton';
<<<<<<< HEAD
import {useAside} from './Aside';

/**
 * @param {{
 *   productOptions: MappedProductOptions[];
=======
// import {useAside} from './Aside'; // mini sepet kullanmıyorsan gerek yok

/**
 * @param {{
 *   productOptions?: MappedProductOptions[];
>>>>>>> 5b99f58 (improvements)
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 * }}
 */
export function ProductForm({productOptions = [], selectedVariant}) {
  const navigate = useNavigate();
<<<<<<< HEAD
  const {open} = useAside();
=======
  // const {open} = useAside();

>>>>>>> 5b99f58 (improvements)
  return (
    <div className="product-form">
      {(productOptions ?? []).map((option) => {
        if (!option) return null;
<<<<<<< HEAD
        // If there is only a single value in the option values, don't display the option
        if (!option.optionValues || option.optionValues.length === 1)
          return null;
=======
        if (!option.optionValues || option.optionValues.length === 1) return null;
>>>>>>> 5b99f58 (improvements)

        return (
          <div className="product-options" key={option.name}>
            <h5>{option.name}</h5>
            <div className="product-options-grid">
              {(option.optionValues ?? []).map((value) => {
                if (!value) return null;
<<<<<<< HEAD
=======

>>>>>>> 5b99f58 (improvements)
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
<<<<<<< HEAD
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
=======
>>>>>>> 5b99f58 (improvements)
                  return (
                    <Link
                      className="product-options-item"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
<<<<<<< HEAD
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
=======
                        border: selected ? '1px solid black' : '1px solid transparent',
>>>>>>> 5b99f58 (improvements)
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
<<<<<<< HEAD
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`product-options-item${
                        exists && !selected ? ' link' : ''
                      }`}
                      key={option.name + name}
                      style={{
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
                        opacity: available ? 1 : 0.3,
                      }}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
=======
                }

                return (
                  <button
                    type="button"
                    className={`product-options-item${exists && !selected ? ' link' : ''}`}
                    key={option.name + name}
                    style={{
                      border: selected ? '1px solid black' : '1px solid transparent',
                      opacity: available ? 1 : 0.3,
                    }}
                    disabled={!exists}
                    onClick={() => {
                      if (!selected) {
                        navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  >
                    <ProductOptionSwatch swatch={swatch} name={name} />
                  </button>
                );
>>>>>>> 5b99f58 (improvements)
              })}
            </div>
            <br />
          </div>
        );
      })}
<<<<<<< HEAD
      <AddToCartButton
        route="/cart"
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
=======

      <AddToCartButton
        // onClick={() => open('cart')} // mini sepet yoksa gerek yok
        redirectTo="/cart" // 👈 açıkça belirtiyoruz (AddToCartButton default'u da /cart)
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        lines={
          selectedVariant
            ? [{merchandiseId: selectedVariant.id, quantity: 1}]
>>>>>>> 5b99f58 (improvements)
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

/**
 * @param {{
 *   swatch?: Maybe<ProductOptionValueSwatch> | undefined;
 *   name: string;
 * }}
 */
function ProductOptionSwatch({swatch, name}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
<<<<<<< HEAD
      style={{
        backgroundColor: color || 'transparent',
      }}
=======
      style={{backgroundColor: color || 'transparent'}}
>>>>>>> 5b99f58 (improvements)
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Maybe} Maybe */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').ProductOptionValueSwatch} ProductOptionValueSwatch */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
