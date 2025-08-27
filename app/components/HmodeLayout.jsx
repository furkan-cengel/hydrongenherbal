import HmodeHeader from '~/components/HmodeHeader';
import HmodeFooter from '~/components/HmodeFooter';

export default function HmodeLayout({children}) {
  return (
    <>
      <HmodeHeader />
      <main>{children}</main>
      <HmodeFooter />
    </>
  );
}
