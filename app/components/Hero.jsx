import {useState, useEffect, useRef} from 'react';

const words = ['Değiştir', 'Yenile', 'Canlandır', 'Geliştir'];
const cardsData = [
  {
    id: 1,
    src: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/chocolate.webp?v=1756624245',
    zIndex: 'z-30',
  },
  {
    id: 2,
    src: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/ahududu.webp?v=1756624246',
    zIndex: 'z-20',
  },
  {
    id: 3,
    src: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/seftali.webp?v=1756624246',
    zIndex: 'z-10',
  },
];

const AnimatedWord = ({currentWordIndex}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [isOld, setIsOld] = useState(true);
  const [isSmall, setIsSmall] = useState(true);

  useEffect(() => {
    if (currentWordIndex === 0) {
      setIsSwapped(false);
      const timer = setTimeout(() => setIsSwapped(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    if (currentWordIndex === 1) {
      setIsOld(true);
      const timer = setTimeout(() => setIsOld(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    if (currentWordIndex === 3) {
      setIsSmall(true);
      const timer = setTimeout(() => setIsSmall(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(fadeInTimer);
  }, []);

  switch (currentWordIndex) {
    case 0:
      return (
        <div
          className={`word-transition-wrapper ${isVisible ? 'is-visible' : ''}`}
        >
          <div className={`word-swapper ${isSwapped ? 'swapped' : ''}`}>
            <span className="word-degistir">Değiştir</span>
            <span className="word-hayatini">Hayatını</span>
          </div>
        </div>
      );
    case 1:
      return (
        <div
          className={`word-transition-wrapper ${isVisible ? 'is-visible' : ''}`}
        >
          Hayatını <br />
          <span className={`word-yenile ${isOld ? 'eski-gorunum' : ''}`}>
            Yenile
          </span>
        </div>
      );
    case 2:
      return (
        <div
          className={`word-transition-wrapper ${isVisible ? 'is-visible' : ''}`}
        >
          Hayatını <br />
          <span className="word-canlandir-pulse">Canlandır</span>
        </div>
      );
    case 3:
      return (
        <div
          className={`word-transition-wrapper ${isVisible ? 'is-visible' : ''}`}
        >
          Hayatını <br />
          <span className={`word-gelistir ${isSmall ? 'kucuk-hali' : ''}`}>
            Geliştir
          </span>
        </div>
      );
    default:
      return null;
  }
};

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const sectionRef = useRef(null);
  const gifRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleDiscoverClick = () => {
    const nextSection = document.getElementById('categories');
    if (nextSection) nextSection.scrollIntoView({behavior: 'smooth'});
  };

  // GSAP animasyonları — yalnızca client'ta dinamik importla çalıştır
  useEffect(() => {
    let tl;
    let gifTl;

    (async () => {
      if (typeof window === 'undefined' || !sectionRef.current) return;

      const gsapMod = (await import('gsap')).default;
      const {ScrollTrigger} = await import('gsap/ScrollTrigger');
      gsapMod.registerPlugin(ScrollTrigger);

      const cards = Array.from(
        sectionRef.current.querySelectorAll('.fan-card'),
      );

      if (cards.length >= 3) {
        tl = gsapMod.timeline({delay: 0.5});
        tl.to(
          cards[1],
          {
            xPercent: 32,
            yPercent: 2,
            rotation: 20,
            ease: 'power2.out',
            duration: 1,
          },
          '<',
        ).to(
          cards[2],
          {
            xPercent: -32,
            yPercent: -5,
            rotation: -20,
            ease: 'power2.out',
            duration: 1.2,
          },
          '<',
        );
      }

      if (gifRef.current) {
        gifTl = gsapMod.timeline({repeat: -1, repeatDelay: 4});
        gifTl
          .to(gifRef.current, {
            y: '4rem',
            rotation: -15,
            duration: 2.5,
            ease: 'circ.out',
          })
          .to(
            gifRef.current,
            {y: '100%', rotation: 0, duration: 2.5, ease: 'circ.in'},
            '+=5.8',
          );
      }
    })();

    return () => {
      if (tl) tl.kill();
      if (gifTl) gifTl.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Safe area padding helpers */
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        
        /* Prevent overlays on mobile */
        @supports (padding-top: env(safe-area-inset-top)) {
          .hero-container {
            padding-top: max(env(safe-area-inset-top), 20px);
          }
        }
        
        .word-transition-wrapper { opacity: 0; transition: opacity 0.4s ease-in-out; }
        .word-transition-wrapper.is-visible { opacity: 1; }
        .word-swapper { position: relative; height: 110px;
          --left-position: 50%;
          --transform-centering: translateX(-50%);
          --translateX-anim: 30px; 
          --translateY-anim: 15px;
          --targetY-anim: 55px;
        }
        @media (min-width: 1024px) { 
          .word-swapper { height: 130px; --left-position: 0%; --transform-centering: translateX(0%); --translateX-anim: 60px; --translateY-anim: 27px; --targetY-anim: 75px; } 
        }
        .word-swapper span { position: absolute; width: max-content; left: var(--left-position); transform: var(--transform-centering); }
        .word-hayatini { top: var(--targetY-anim); transform: var(--transform-centering); }
        @keyframes curve-to-bottom { 
          0%{transform:var(--transform-centering) translate(0,0);} 
          50%{transform:var(--transform-centering) translate(var(--translateX-anim),var(--translateY-anim)) rotate(5deg);} 
          100%{transform:var(--transform-centering) translate(0,var(--targetY-anim));} 
        }
        @keyframes curve-to-top { 
          0%{transform:var(--transform-centering) translate(0,0);} 
          50%{transform:var(--transform-centering) translate(calc(-1 * var(--translateX-anim)), calc(-1 * var(--translateY-anim))) rotate(-5deg);} 
          100%{transform:var(--transform-centering) translate(0, calc(-1 * var(--targetY-anim)));} 
        }
        .word-swapper.swapped .word-degistir { animation: curve-to-bottom 1s ease-in-out forwards; }
        .word-swapper.swapped .word-hayatini { animation: curve-to-top 1s ease-in-out forwards; }
        .word-degistir { color: #3E7D5E; }
        .word-yenile { color: #3E7D5E; transition: all 1s ease-out; }
        .word-yenile.eski-gorunum { color: grey; filter: grayscale(100%) blur(1px); opacity: 0.8; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .word-canlandir-pulse { display: inline-block; color: #3E7D5E; animation: pulse 0.5s infinite ease-in-out; }
        .word-gelistir { display: inline-block; font-size: 2.5rem; color: #3E7D5E; transition: all 0.5s cubic-bezier(0.68,-0.55,0.27,1.55); }
        @media (min-width: 640px) { .word-gelistir { font-size: 3rem; } }
        .word-gelistir.kucuk-hali { font-size: 1.25rem; }
        @media (min-width: 640px) { .word-gelistir.kucuk-hali { font-size: 1.5rem; } }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full min-h-screen pt-32 pb-16 lg:h-screen lg:pt-0 lg:pb-0 bg-gradient-to-r from-[#E4F2EA] to-white relative overflow-hidden"
      >
        <img
          ref={gifRef}
          src="https://cdn.shopify.com/s/files/1/0761/4765/4889/files/hero.gif?v=1756624575"
          alt="Animated element"
          className="w-32 sm:w-48 lg:w-72 h-auto absolute bottom-0 left-0 transform translate-y-full z-0"
        />

        <div className="w-full h-full flex flex-col lg:flex-row p-4">
          {/* SOL: metin */}
          <div
            className="
            w-full lg:w-2/5 
            flex flex-col justify-center items-center lg:items-start 
            text-center lg:text-left 
            px-4 sm:px-8 lg:px-12 xl:px-20 
            gap-4 
            order-2 lg:order-1 
            z-10
            /* Mobilde metin için ekstra üst boşluk */
            mt-8 sm:mt-10 lg:mt-0
          "
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 leading-tight min-h-[120px] sm:min-h-[150px]">
              <AnimatedWord
                key={currentWordIndex}
                currentWordIndex={currentWordIndex}
              />
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              Sen de Herbalife&apos;ın doğal içerikli ürünleriyle hayatına
              denge, enerji ve canlılık kat!
            </p>
            <button
              className="bg-[#3e7d5e] text-white font-semibold py-3 px-8 rounded-md text-base sm:text-lg shadow-lg w-fit hover:bg-green-700 transition-colors"
              onClick={handleDiscoverClick}
            >
              Keşfet
            </button>
          </div>

          {/* SAĞ: görsel fan - Mobilde daha aşağıda başlasın */}
          <div
            className="
              w-full lg:w-3/5 
              relative flex items-center justify-center 
              order-1 lg:order-2
              z-[1]
              /* Mobil ve tablet için özel konumlandırma */
              h-[400px] sm:h-[450px] md:h-[500px] lg:h-full
              /* Görselleri aşağı kaydır - overlay'i önle */
              mt-4 sm:mt-6 md:mt-8 lg:mt-0
              /* Ekstra safe padding mobil için */
              pt-[calc(env(safe-area-inset-top)+1rem)] lg:pt-0
            "
          >
            {/* Görsel container - boyutları ayarla */}
            <div
              className="
              relative 
              /* Mobilde daha küçük boyutlar */
              w-56 h-72           /* mobile: 224px x 288px */
              sm:w-72 sm:h-80     /* small: 288px x 320px */
              md:w-80 md:h-96     /* tablet: 320px x 384px */
              lg:w-[32rem] lg:h-[34rem]   /* desktop */
              xl:w-[40rem] xl:h-[38rem]   /* xl desktop */
              /* Konumlandırma düzeltmesi */
              transform 
              translate-y-0       /* Varsayılan olarak kaydırma yok */
              sm:translate-y-4    /* Small ekranlarda hafif aşağı */
              md:translate-y-6    /* Tablet'te biraz daha aşağı */
              lg:translate-y-0    /* Desktop'ta sıfırla */
            "
            >
              {cardsData.map((card) => (
                <div
                  key={card.id}
                  className={`fan-card absolute inset-0 ${card.zIndex}`}
                >
                  <img
                    src={card.src}
                    alt={`Ürün ${card.id}`}
                    className="w-full h-full object-contain drop-shadow-xl"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
