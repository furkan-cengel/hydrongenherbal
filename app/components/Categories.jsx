// app/components/Categories.jsx - FLASH PROBLEMI DÜZELTMESİ + Smooth handoff to #features
import {useEffect, forwardRef, useRef, useState} from 'react';
import {Link} from 'react-router';
import {featuredProductsData} from '~/data/categoriesData';

const Categories = forwardRef(function Categories(_, forwardedRef) {
  const localRef = useRef(null);
  const [isGSAPLoaded, setIsGSAPLoaded] = useState(false);

  useEffect(() => {
    let mm;
    let ctx;

    const initGSAP = async () => {
      if (typeof window === 'undefined') return;

      const rootEl = (forwardedRef && forwardedRef.current) || localRef.current;
      if (!rootEl) return;

      try {
        const gsap = (await import('gsap')).default;
        const {ScrollTrigger} = await import('gsap/ScrollTrigger');

        gsap.registerPlugin(ScrollTrigger);

        // GSAP yüklendiğini işaretle
        setIsGSAPLoaded(true);

        ctx = gsap.context(() => {
          mm = gsap.matchMedia();

          mm.add('(min-width: 1024px)', () => {
            const panels = gsap.utils.toArray('.product-panel', rootEl);
            const panelsContainer = rootEl.querySelector('.panels-container');

            if (!panels.length || !panelsContainer) return;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: rootEl,
                pin: true,
                scrub: 1, // mevcut davranışını koruyoruz
                start: 'top top',
                anticipatePin: 1,
                invalidateOnRefresh: true,
                end: () =>
                  '+=' + (panelsContainer.scrollWidth - window.innerWidth),

                // pin kalkarken hafif bir refresh
                onComplete: () => {
                  ScrollTrigger.refresh();
                },

                // ✅ Yatay akış bittiğinde, aşağı yönde çıkışta #features'a yumuşak geçiş
                onLeave: (self) => {
                  // sadece ileri (aşağı) yönde
                  if (self.direction <= 0) return;

                  // hedef section
                  const features = document.getElementById('features');
                  if (!features) return;

                  // pin tamamen kalksın diye 1 frame beklet
                  requestAnimationFrame(() => {
                    const rect = features.getBoundingClientRect();
                    const targetY = window.scrollY + rect.top;

                    // sadece ekranda değilse (kısa sayfalarda gereksiz sıçramayı önle)
                    const inView =
                      rect.top < window.innerHeight &&
                      rect.bottom > 0 &&
                      Math.abs(rect.top) < 16;

                    if (!inView) {
                      window.scrollTo({
                        top: targetY,
                        behavior: 'smooth',
                      });
                    }
                  });
                },
              },
            });

            tl.to(panels, {
              xPercent: -100 * (panels.length - 1),
              ease: 'power2.out',
              duration: 0.1,
              force3D: true,
            });
          });
        }, rootEl);
      } catch (error) {
        console.error('GSAP initialization error:', error);
      }
    };

    const timer = setTimeout(initGSAP, 50);

    return () => {
      clearTimeout(timer);
      if (mm) mm.revert();
      if (ctx) ctx.revert();
    };
  }, [forwardedRef]);

  const buildCategoryHref = (name) =>
    name === 'Tüm Ürünler'
      ? '/products'
      : `/products?category=${encodeURIComponent(name)}`;

  return (
    <section
      ref={forwardedRef ?? localRef}
      className="relative bg-[#f7fbd1] min-h-screen"
      id="categories"
      style={{zIndex: 10}}
    >
      <div className="panels-container w-full flex flex-col lg:flex-row">
        {featuredProductsData.map((product, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={product.id}
              className={`product-panel w-full lg:w-screen lg:h-screen flex-shrink-0 flex flex-col ${
                isFirst ? 'lg:grid lg:grid-cols-5' : 'lg:flex'
              } gap-8 p-8 items-center justify-center bg-gray-50 first:pt-32 lg:first:pt-8 border-b lg:border-b-0 border-gray-200`}
            >
              {/* İLK KART İÇİN SOL TARAF (Metin) */}
              {isFirst && (
                <div className="w-full lg:col-span-2 text-center lg:text-left">
                  {product.promoText && (
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#436d33]/80 leading-tight mb-8 lg:mb-0">
                      Senin yolculuğun{' '}
                      <span
                        className="text-[#365729] font-extrabold"
                        style={{textShadow: '1px 1px 4px rgba(0,0,0,0.2)'}}
                      >
                        burada
                      </span>{' '}
                      başlıyor.
                    </h2>
                  )}
                </div>
              )}

              {/* GÖRSEL BÖLÜMÜ - İlk kart sağda, diğerleri solda */}
              <div
                className={`${
                  isFirst ? 'lg:col-span-3 w-full' : 'w-full lg:w-3/5 lg:ml-5'
                } flex items-center justify-center`}
              >
                <div className="relative w-full max-w-md lg:max-w-none lg:w-[65vw] xl:w-[55vw] mx-auto aspect-[4/3]">
                  {/* Arka Plan Görseli */}
                  {product.bgAsset && (
                    <img
                      src={product.bgAsset}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-contain z-10 ${
                        product.id % 2 === 0
                          ? 'rotate-[2deg]'
                          : 'rotate-[-10deg]'
                      }`}
                      loading="eager"
                    />
                  )}

                  {/* Ana Ürün Görseli - Link ile sarılmış */}
                  <Link
                    to={buildCategoryHref(product.name)}
                    className="absolute inset-0 z-20 flex items-center justify-center -translate-y-16 lg:-translate-y-24"
                    aria-label={`${product.name} kategorisini görüntüle`}
                  >
                    <img
                      src={product.imgSrc}
                      alt={product.name}
                      className={`object-contain drop-shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 max-w-[75%] max-h-[75%] sm:max-w-[80%] sm:max-h-[80%] lg:-translate-x-[-2.5rem] ${
                        product.id % 2 === 0
                          ? 'rotate-[-6deg]'
                          : 'rotate-[6deg]'
                      }`}
                      loading="eager"
                    />
                  </Link>

                  {/* Masaüstü Başlığı */}
                  <h2
                    className="hidden lg:block absolute bottom-1/4 left-[10%] -translate-y-18 lg:-translate-y-28 text-xl xl:text-2xl font-bold text-left z-30 uppercase lg:-translate-x-4"
                    style={{color: product.textColor}}
                  >
                    {product.name}
                  </h2>
                </div>
              </div>

              {/* Mobil & Tablet Başlığı */}
              <div className="w-full text-center mt-4 lg:hidden">
                <h2
                  className="text-xl sm:text-2xl font-bold uppercase"
                  style={{color: product.textColor}}
                >
                  {product.name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className={`w-full text-center bg-gray-50 lg:bg-transparent pb-20 lg:pb-0 lg:fixed lg:bottom-20 lg:left-1/2 lg:-translate-x-1/2 lg:z-30 transition-opacity duration-300 ${
          !isGSAPLoaded ? 'lg:opacity-0' : 'lg:opacity-100'
        }`}
      >
        <Link
          to="/products"
          className="inline-block bg-[#3e7d5e] text-white font-semibold px-8 py-3 rounded-full uppercase tracking-wider shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Tüm Ürünleri Gör <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Görsel bir köprü: categories → features */}
      <div
        aria-hidden
        className="h-16 bg-gradient-to-b from-[#f7fbd1] to-[#E4F2EA]"
      />
    </section>
  );
});

export default Categories;
