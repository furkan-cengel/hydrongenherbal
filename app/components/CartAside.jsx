// app/components/CartAside.jsx
import {Suspense} from 'react';
import {Await, useRouteLoaderData} from 'react-router';
import {Aside} from '~/components/Aside';
import {CartMain} from '~/components/CartMain';

export default function CartAside() {
  const data = useRouteLoaderData('root');
  const cartPromise = data?.cart ?? null;

  return (
    <Aside type="cart" heading="Sepetim">
      <Suspense 
        fallback={
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3E7D5E]"></div>
          </div>
        }
      >
        <Await 
          resolve={cartPromise} 
          errorElement={
            <div className="text-center py-8 text-red-500">
              Sepet yüklenemedi. Lütfen sayfayı yenileyiniz.
            </div>
          }
        >
          {(cart) => <CartMain layout="aside" cart={cart} />}
        </Await>
      </Suspense>
    </Aside>
  );
}