// app/routes/product.$id.jsx
import {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router';
import {products} from '~/data/productsData';
import FeaturesSection from '~/components/Features';
import AccordionItem from '~/components/AccordionItem';

export default function ProductDetailRoute() {
  const {id} = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const headingId = 'nutrition-heading';

  // Modal açıkken body scroll kilidi
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'unset';
    };
  }, [isModalOpen]);

  // ESC ile modal kapatma
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Modal açıldığında kapat butonuna odak ver
  useEffect(() => {
    if (isModalOpen) {
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
  }, [isModalOpen]);

  if (!product) {
    return (
      <div className="p-10 text-center text-[#3E7D5E]">Ürün bulunamadı.</div>
    );
  }

  return (
    <>
      {/* Konteyner */}
      <div className="min-h-screen bg-[#fefefe] px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 md:pt-36 pb-16 flex flex-col items-center">
        {/* Üst: Foto & Bilgi */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full max-w-6xl items-start">
          {/* Görsel */}
          <div className="w-full md:w-1/2 md:sticky md:top-28">
            <div className="bg-[#3E7D5E] rounded-2xl p-2">
              <div className="w-full max-w-xl mx-auto aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bilgi */}
          <div className="w-full md:w-1/2 flex flex-col justify-start gap-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E7D5E] leading-tight">
              {product.name}
            </h1>

            {product.badge && (
              <span className="inline-block bg-[#E4F2EA] text-[#3E7D5E] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-fit">
                {product.badge}
              </span>
            )}

            {product.description && (
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-1">
                {product.description}
              </p>
            )}

            <div className="w-full mt-4 border-t border-gray-200 pt-4">
              {product.benefits && (
                <AccordionItem title="Temel Faydalar">
                  <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm sm:text-base">
                    {product.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </AccordionItem>
              )}

              {product.usage && (
                <AccordionItem title="Kullanım">
                  <p className="whitespace-pre-wrap text-gray-600 text-sm sm:text-base">
                    {product.usage}
                  </p>
                </AccordionItem>
              )}
            </div>

            <div className="flex flex-row sm:flex-row gap-3 mt-6">
              <button className="w-[50%] sm:w-auto sm:flex-1 bg-[#3E7D5E] text-white font-bold py-1 lg:py-4 rounded-full hover:bg-[#355f4f] transition text-md">
                Sepete Ekle
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-[50%] sm:w-auto sm:flex-1 bg-gray-100 text-[#3E7D5E] font-bold rounded-full text-md py-1 hover:bg-gray-200 transition"
              >
                İÇERİKLER &amp; BESİN DEĞERLERİ
              </button>
            </div>
          </div>
        </div>

        {/* Alt: Genel Bakış */}
        <div className="w-full max-w-6xl mt-14 md:mt-20 pt-10 md:pt-14 border-t border-gray-200">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-xl sm:text-3xl font-bold text-[#3E7D5E]">
                Genel Bakış
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 whitespace-pre-wrap">
                {product.nutrition}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-xl mx-auto rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-[16/9] sm:aspect-[4/3]">
                  <img
                    src={product.hoverImg}
                    alt={`${product.name} kullanım şekli`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturesSection />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-0 sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          {/* Arkaplan */}
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          {/* Arkaplana tıkla kapat — button olarak (a11y uyumlu) */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            aria-label="Modaldan çık"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl shadow-2xl
                       max-h-[90vh] md:max-h-[80vh] overflow-y-auto
                       p-5 sm:p-6 md:p-8 bg-white
                       translate-y-0 animate-[slideUp_0.25s_ease-out]
                       md:animate-[popIn_0.2s_ease-out]"
            role="document"
          >
            <div className="flex items-start justify-between gap-4 sticky top-0 bg-white pb-3">
              <h2
                id={headingId}
                className="text-lg sm:text-2xl font-bold text-[#3E7D5E]"
              >
                Besin Değerleri ve İçerikler
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-2xl sm:text-3xl font-bold text-gray-500 hover:text-gray-800 leading-none"
                aria-label="Kapat"
                ref={closeBtnRef}
              >
                &times;
              </button>
            </div>

            <div className="pt-2">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                {product.nutrition ||
                  'Bu ürün için besin bilgisi henüz eklenmedi.'}
              </p>

              {product.disclaimer && (
                <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
                  {product.disclaimer}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animasyon keyframes */}
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0.98); opacity: .8; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </>
  );
}
