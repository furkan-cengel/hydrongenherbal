<<<<<<< HEAD
import HmodeHeader from '~/components/HmodeHeader';
import HmodeFooter from '~/components/HmodeFooter';

export default function HmodeLayout({children}) {
  return (
    <>
      <HmodeHeader />
      <main>{children}</main>
      <HmodeFooter />
=======
// app/components/HmodeLayout.jsx
import HmodeHeader from '~/components/HmodeHeader';
import HmodeFooter from '~/components/HmodeFooter';
import CartAside from '~/components/CartAside';
import { ToastProvider } from './Toast';

export default function HmodeLayout({children, cartPromise}) {
  return (
    <>
    <ToastProvider>

    
      <HmodeHeader cart={cartPromise} />
      <main >{children}</main>
      <HmodeFooter />
      <CartAside /> {/* sağdan overlay */}
      </ToastProvider>
>>>>>>> 5b99f58 (improvements)
    </>
  );
}
