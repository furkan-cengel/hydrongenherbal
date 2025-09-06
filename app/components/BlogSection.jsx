import {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {Link} from 'react-router';
import {blogsData, storiesData, newsData} from '~/data/allContentData'; // Vite: src/data → Hydrogen: app/data

const TABS = [
  {id: 'blog', label: 'Blog'},
  {id: 'stories', label: 'Başarı Hikayeleri'},
  {id: 'news', label: 'Haberler'},
];

const mapToCardData = (item) => ({
  img: item.image,
  title: item.title,
  tag: item.tags?.[0],
  count: item.content?.length ?? 0,
  min: item.readTime?.split(' ')?.[0] ?? '0',
  date: item.date,
  link: `/${item.type}/${item.slug}`,
});

function ArrowIcon({rotation = 0}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="transition-transform group-hover:scale-110"
      style={{transform: `rotate(${rotation}deg)`}}
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="#436d33"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke="#436d33"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogSection() {
  const [activeTab, setActiveTab] = useState('blog');

  // Swiper'ı sadece client'ta yükle
  const [swiperReady, setSwiperReady] = useState(false);
  const [SwiperPkg, setSwiperPkg] = useState(null);
  const [SwiperMods, setSwiperMods] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (typeof window === 'undefined') return;
      const reactPkg = await import('swiper/react');
      const mods = await import('swiper/modules');
      await import('swiper/css');
      await import('swiper/css/effect-coverflow');
      await import('swiper/css/navigation');
      if (!mounted) return;
      setSwiperPkg({
        Swiper: reactPkg.Swiper,
        SwiperSlide: reactPkg.SwiperSlide,
      });
      setSwiperMods({
        EffectCoverflow: mods.EffectCoverflow,
        Navigation: mods.Navigation,
      });
      setSwiperReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const tabContent = useMemo(
    () => ({
      blog: blogsData.map(mapToCardData),
      stories: storiesData.map(mapToCardData),
      news: newsData.map(mapToCardData),
    }),
    [],
  );

  const blogPosts = tabContent[activeTab] || [];

  const arrowButtonClasses =
    'group w-12 h-12 bg-gradient-to-tr from-[#eaf580] to-[#b2cc68] rounded-full  border-2 border-white/50 flex items-center justify-center transition-transform hover:scale-105';

  const handleTab = useCallback((id) => setActiveTab(id), []);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="blog" className="py-16 sm:py-20 bg-[#f7fbd1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TABS */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 relative z-40">
          <div className="flex gap-2 justify-start w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                className={`relative px-5 py-2 rounded-xl text-sm sm:text-base font-semibold
                       transition-all duration-200 border focus:outline-none
                      focus-visible:ring-2 focus-visible:ring-[#b2cc68] focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#f7fbd1] will-change-transform
                       ${
                         activeTab === tab.id
                           ? 'bg-[#eaf580] border-[#b2cc68] text-[#436d33] shadow-md hover:shadow-lg hover:-translate-y-0.5'
                           : 'bg-white/80 border-transparent text-gray-700 hover:bg-white hover:text-[#436d33] hover:shadow-md hover:-translate-y-0.5'
                       }
                     `}
                type="button"
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SLIDER (client) / FALLBACK (SSR) */}
        <div className="relative">
          {swiperReady && SwiperPkg && SwiperMods ? (
            <SwiperPkg.Swiper
              effect="coverflow"
              key={`${activeTab}-${blogPosts.length}`}
              rebuildOnUpdate
              observer
              observeParents
              grabCursor
              centeredSlides
              spaceBetween={30}
              loop={blogPosts.length > 3}
              watchSlidesProgress
              coverflowEffect={{
                rotate: 15,
                stretch: 0,
                depth: 150,
                modifier: 1.2,
                slideShadows: false,
              }}
              navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={(swiper) => {
                // geri gelince/first mount'ta sağlam bağlamak için
                setTimeout(() => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
              modules={[SwiperMods.EffectCoverflow, SwiperMods.Navigation]}
              className="blog-swiper"
              style={{paddingBottom: '70px'}}
              breakpoints={{
                320: {slidesPerView: 1.1, spaceBetween: 15},
                640: {slidesPerView: 1.5, spaceBetween: 20},
                1024: {slidesPerView: 2.2, spaceBetween: 30},
                1280: {slidesPerView: 2.5, spaceBetween: 40},
              }}
            >
              {blogPosts.map((post) => (
                <SwiperPkg.SwiperSlide key={post.link}>
                  {({isActive}) => (
                    <Link
                      to={post.link}
                      className={`rounded-2xl bg-white p-4 sm:p-6 flex flex-col items-center transition-all duration-500 h-full ${
                        isActive
                          ? 'scale-100 shadow-2xl opacity-100 z-20'
                          : 'scale-90 opacity-60 z-10'
                      }`}
                    >
                      <div className="block w-full h-40 sm:h-48 mb-4 overflow-hidden rounded-xl">
                        <img
                          src={post.img}
                          alt={post.title}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-between flex-grow w-full text-center">
                        <div className="flex items-center gap-2 mb-2">
                          {post.tag ? (
                            <span className="bg-[#e2efb3] text-[#4f7330] text-xs font-semibold px-3 py-1 rounded-full">
                              {post.tag}
                            </span>
                          ) : null}
                          <span className="bg-[#fbd35b]/60 text-[#7a6618] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            +{post.count}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold leading-tight mb-2 text-gray-800">
                          {post.title}
                        </h2>
                        <div className="flex gap-3 items-center text-gray-500 text-sm mt-auto">
                          <span>{post.min} min</span>
                          <span className="opacity-30">|</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </SwiperPkg.SwiperSlide>
              ))}
            </SwiperPkg.Swiper>
          ) : (
            // SSR fallback: basit grid
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {blogPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.link}
                  to={post.link}
                  className="rounded-2xl bg-white p-4 sm:p-6 flex flex-col h-full shadow"
                >
                  <div className="block w-full h-40 sm:h-48 mb-4 overflow-hidden rounded-xl">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col flex-grow text-center">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      {post.tag ? (
                        <span className="bg-[#e2efb3] text-[#4f7330] text-xs font-semibold px-3 py-1 rounded-full">
                          {post.tag}
                        </span>
                      ) : null}
                      <span className="bg-[#fbd35b]/60 text-[#7a6618] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        +{post.count}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold leading-tight mb-2 text-gray-800">
                      {post.title}
                    </h2>
                    <div className="flex gap-3 items-center text-gray-500 text-sm mt-auto justify-center">
                      <span>{post.min} min</span>
                      <span className="opacity-30">|</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Arrows */}
          <div className="absolute bottom-0 left-0 z-30 flex items-center gap-3">
            <button
              ref={prevRef}
              type="button"
              className={arrowButtonClasses}
              aria-label="Önceki"
            >
              <ArrowIcon rotation={180} />
            </button>
            <button
              ref={nextRef}
              type="button"
              className={arrowButtonClasses}
              aria-label="Sonraki"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
