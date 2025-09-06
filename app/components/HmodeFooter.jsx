// app/components/HmodeFooter.jsx - Root.jsx'de font yüklendi
import {useEffect, useRef} from 'react';
import {Link} from 'react-router';

export default function HmodeFooter() {
  const mascotWrapperRef = useRef(null);
  const mascotImgRef = useRef(null);

  useEffect(() => {
    let tl;
    let gsap;
    (async () => {
      if (typeof window === 'undefined') return;
      gsap = (await import('gsap')).default;

      if (!mascotImgRef.current) return;

      gsap.set(mascotImgRef.current, {x: '0%', rotate: 10, opacity: 1});
      tl = gsap.timeline({repeat: -1, repeatDelay: 4});
      tl.to(mascotImgRef.current, {
        x: '12%',
        rotate: 50,
        duration: 2.1,
        ease: 'circ.out',
      })
        .to(
          mascotImgRef.current,
          {x: '15%', rotate: 50, duration: 2.1},
          '+=2.1',
        )
        .to(mascotImgRef.current, {
          x: '-20%',
          rotate: 0,
          duration: 2.1,
          ease: 'circ.in',
        });
    })();

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <>
      {/* Oswald CSS - root.jsx'de font yüklü olduğu için sadece sınıf tanımı */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
    .font-oswald-header {
      font-family: "Oswald", sans-serif;
      font-weight: 700;
    }
  `,
        }}
      />

      <footer className="relative w-full min-h-[50vh] lg:min-h-[100vh] bg-[#E4F2EA] flex flex-col justify-end overflow-hidden">
        {/* Logo */}
        <div className="absolute top-0 left-0 sm:left-[-10px] md:left-[-20px] w-full flex items-center justify-between z-20 p-4 sm:p-6 lg:p-8">
          <Link to="/" className="block">
            <img
              src="/images/logofooter.png"
              alt="Herbalmode Logo"
              className="h-auto w-12 sm:w-20 md:w-28"
            />
          </Link>
        </div>

        {/* HMODE + Mascot */}
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="w-full flex justify-center items-end relative">
            <span className="select-none  font-oswald font-bold  text-[28.5vw] sm:text-[31vw] md:text-[33vw] h-auto text-[#3E7D5E] tracking-[0.012em] sm:tracking-normal leading-[0.9] sm:leading-[0.8] uppercase relative z-10 mt-1 mb-1 sm:mt-15 sm:mb-8 md:mt-30 md:mb-20">
              <span className="relative inline-block">
                H
                <span
                  ref={mascotWrapperRef}
                  className="absolute top-[-7px] right-[-1.20px] sm:top-[-20px] md:top-[-15x] sm:right-[-2.4px] w-13 h-14 sm:w-22 sm:h-26 md:w-26 md:h-30 md:right-[1px] lg:right-[3px] lg:w-40 lg:h-40 overflow-hidden"
                  style={{
                    transform: 'translateX(25%) translateY(50%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                >
                  <img
                    ref={mascotImgRef}
                    src="https://cdn.shopify.com/s/files/1/0761/4765/4889/files/footer.gif?v=1756626175"
                    alt="Herbalmode Maskot"
                    className="w-full h-full object-contain select-none"
                    style={{willChange: 'transform'}}
                    draggable={false}
                  />
                </span>
              </span>
              MODE
            </span>
          </div>
        </div>

        {/* Sağ üst linkler */}
        <div className="absolute top-0 right-0 p-4 sm:p-12 lg:p-8 z-30 text-[#3E7D5E] font-medium">
          <nav
            className="grid grid-cols-3 gap-x-2 gap-y-4 
                        sm:gap-x-8
                        lg:flex lg:flex-row lg:gap-x-8
                        text-[0.6rem] sm:text-sm text-center"
          >
            <Link to="/products" className="hover:text-[#c1a852] transition">
              Ürünler
            </Link>
            <Link to="/coach" className="hover:text-[#c1a852] transition">
              Koç Bul
            </Link>
            <Link to="/#stories" className="hover:text-[#c1a852] transition">
              Başarı Hikayeleri
            </Link>
            <Link to="/contact" className="hover:text-[#c1a852] transition">
              İletişim
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-[#c1a852] transition"
            >
              Gizlilik Politikası
            </Link>
            <Link to="/terms" className="hover:text-[#c1a852] transition">
              Hizmet Şartları
            </Link>
          </nav>
        </div>

        {/* Telif */}
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 z-30 text-[#3E7D5E] text-xs sm:text-sm font-medium">
          <div>
            © {new Date().getFullYear()} Herbalmode. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </>
  );
}
