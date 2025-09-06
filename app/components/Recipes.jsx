// app/components/Recipes.jsx
import {useEffect, useRef, useState, useCallback} from 'react';
import {Link} from 'react-router'; // Projen 'react-router-dom' kullanıyorsa burayı ona çevir
import MarqueeText from '~/components/MarqueeText';

const recipesData = [
  {
    id: 1,
    title: 'Tarhanalı Mantar Çorbası',
    thumbnailSrc: '/images/recipes/thumbnailcorba.jpeg',
    videoSrc:
      'https://cdn.shopify.com/videos/c/o/v/5c5b03a523514fa19b56d8e437ad8232.mp4',
  },
  {
    id: 2,
    title: 'Sebzeli Pizza',
    thumbnailSrc: '/images/recipes/thumbnailpizza.jpeg',
    videoSrc:
      'https://cdn.shopify.com/videos/c/o/v/1617d4e99b934ce6b55400a2da9026bc.mp4',
  },
  {
    id: 3,
    title: 'Falafel',
    thumbnailSrc: '/images/recipes/thumbnailfalafel.jpeg',
    videoSrc:
      'https://cdn.shopify.com/videos/c/o/v/ce0f412e04444fe3bb62e1d227891c6e.mp4',
  },
  {
    id: 4,
    title: 'Şeftalili Soğuk Çay',
    thumbnailSrc: '/images/recipes/thumbnailseftalisogukcay.jpeg',
    videoSrc:
      'https://cdn.shopify.com/videos/c/o/v/64bd00fda5c649c4a6dcde2a89e8ef4f.mp4',
  },
  {
    id: 5,
    title: 'Kahveli Cheesecake',
    thumbnailSrc: '/images/recipes/thumbnailkahvelicheesecake.jpeg',
    videoSrc:
      'https://cdn.shopify.com/videos/c/o/v/c410e13a3894495ab7fb5edd23eff1fd.mp4',
  },
  {
    id: 6,
    title: 'Mango-Kavun Dondurma',
    thumbnailSrc: '/images/recipes/thumbnailmangokavundondurma.jpeg',
    videoSrc:
      'https://cdn.shopify.com/videos/c/o/v/27b1ae2c1ed94d58b6af36f117c9a1c0.mp4',
  },
];

export default function Recipes() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleMouseEnter = useCallback((index) => {
    const v = videoRefs.current[index];
    v?.play?.();
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const v = videoRefs.current[index];
    if (v) {
      v.pause?.();
      v.currentTime = 0;
    }
  }, []);

  // ESC ile modal kapat
  useEffect(() => {
    if (!selectedVideo) return;
    const onKey = (e) => e.key === 'Escape' && setSelectedVideo(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedVideo]);

  // Modal açıkken body scroll kilidi
  useEffect(() => {
    if (!selectedVideo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'unset';
    };
  }, [selectedVideo]);

  // Ekran dışında kalan videoları otomatik durdur
  useEffect(() => {
    if (!videoRefs.current.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => !entry.isIntersecting && entry.target.pause?.(),
        ),
      {root: null, threshold: 0.05},
    );
    videoRefs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  const MARQUEE_ITEMS = [
    '🥑 Sağlıklı Tarif Videoları ile Keyifli Beslenme Yolculuğu',
  ];

  // Overlay click/keyboard
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setSelectedVideo(null);
  };
  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedVideo(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="recipes"
      className="relative w-full overflow-hidden bg-[#f7fbd1] py-16 px-4 lg:h-screen lg:p-4 lg:flex lg:flex-col lg:items-center lg:justify-center"
    >
      <MarqueeText
        items={MARQUEE_ITEMS}
        repeatCount={4}
        durationSec={20}
        containerClass="marquee-container w-full  bg-[#eaf580] text-[#436d33] overflow-x-hidden py-2  shadow-lg text-xl sm:text-2xl  font-semibold backdrop-blur-sm relative marquee-scrollbar xl:min-h-[50px] xl:py-4 xl:translate-y-5  "
        trackClass="marquee-track flex whitespace-nowrap tracking-widest"
        itemClass="mx-8 "
      />

      {/* Mobil/Tablet: GRID — Desktop: overlap row */}
      <div
        className="
         w-full max-w-5xl mx-auto mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 sm:gap-6 lg:mt-0 xl:mt-12 lg:flex lg:flex-row lg:justify-center lg:h-[60vh] lg:items-center xl:h-full xl:items-start
        "
      >
        {recipesData.map((recipe, index) => (
          <div
            key={recipe.id}
            className="
              recipe-card group w-full aspect-[3/4] bg-white rounded-2xl shadow-xl border-4 border-stone-100 relative transition-transform duration-300 z-10 lg:w-54 lg:h-[480px] xl:w-72 xl:h-[540px] lg:aspect-auto xl:flex-shrink-0 lg:mr-[-62px]
              "
            style={{transform: `rotate(${recipe.id % 2 === 1 ? -2 : 1}deg)`}}
            onClick={() => setSelectedVideo(recipe.videoSrc)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            role="button"
            tabIndex={0}
            aria-label={`${recipe.title} videosunu aç`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedVideo(recipe.videoSrc);
              }
            }}
          >
            {/* Thumbnail arkaplan */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${recipe.thumbnailSrc})`,
                backgroundSize: 'cover', // cover yerine contain
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />

            {/* Video hover */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={recipe.videoSrc} type="video/mp4" />
            </video>

            {/* Play ikon */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 group-hover:opacity-0">
              <svg
                width="48"
                height="48"
                viewBox="0 0 64 64"
                fill="none"
                className="drop-shadow-lg sm:w-16 sm:h-16"
              >
                <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.45)" />
                <polygon points="26,20 50,32 26,44" fill="white" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div
          onClick={handleOverlayClick}
          onKeyDown={handleOverlayKeyDown}
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="button"
          tabIndex={0}
          aria-label="Tarif videosu penceresini kapat"
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden bg-white/5"
            role="dialog"
            aria-modal="true"
            aria-label="Tarif videosu"
          >
            {/* Close mobil/tablet */}
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-[3000] inline-flex items-center justify-center w-10 h-10 rounded-full
                  bg-[#eaf580] text-[#365729] shadow-xl border border-white/70
                  transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#eaf580]/70
                  lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="relative w-full z-0">
              <video
                className="w-full max-h-[90vh] h-auto block"
                controls
                autoPlay
                loop
              >
                <source src={selectedVideo} type="video/mp4" />
                <track kind="captions" />
              </video>
            </div>
          </div>
        </div>
      )}

      {/* CTA butonu */}
      <div className="text-center mt-12 lg:mt-8 relative z-30">
        <Link
          to="/recipes"
          className="inline-block bg-[#eaf580] text-[#436d33] font-semibold px-8 py-3 rounded-full uppercase tracking-wider  transition-all duration-300 ease-in-out hover:scale-105 mb-4"
        >
          Tüm Tarifleri Gör <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
