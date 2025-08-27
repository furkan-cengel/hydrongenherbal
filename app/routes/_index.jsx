// app/routes/_index.jsx
import {useEffect, useRef} from 'react';

// Landing bileşenleri
import Hero from '~/components/Hero';
import Categories from '~/components/Categories';
import Features from '~/components/Features';
import Recipes from '~/components/Recipes';
import BlogSection from '~/components/BlogSection';

/** @type {import('react-router').MetaFunction} */
export const meta = () => [
  {title: 'HerbalMode — Home'},
  {name: 'description', content: 'Herbalife ürünleri, tarifler ve içerikler.'},
];

export default function IndexRoute() {
  const featuredRef = useRef(null);

  // Scroll restoration kontrolü
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Browser'ın otomatik scroll restoration'ını kapat
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Sayfa yüklendiğinde en üste git
      window.scrollTo(0, 0);
    }

    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // GSAP/ScrollTrigger refresh
  useEffect(() => {
    let timer;
    let refreshAnimations;

    (async () => {
      if (typeof window === 'undefined') return;

      const {default: gsap} = await import('gsap');
      const {ScrollTrigger} = await import('gsap/ScrollTrigger');

      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch {
        /* already registered */
      }

      refreshAnimations = () => {
        try {
          ScrollTrigger.refresh();
        } catch {
          /* noop */
        }
      };

      window.addEventListener('load', refreshAnimations, {passive: true});
      window.addEventListener('resize', refreshAnimations);

      timer = window.setTimeout(refreshAnimations, 200);
    })();

    return () => {
      if (typeof window !== 'undefined' && refreshAnimations) {
        window.removeEventListener('load', refreshAnimations);
        window.removeEventListener('resize', refreshAnimations);
      }
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="landing overflow-x-hidden">
      <section id="hero">
        <Hero />
      </section>

      <section id="categories" className="min-h-screen bg-[#f7fbd1]">
        <Categories ref={featuredRef} />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="recipes">
        <Recipes />
      </section>

      <section id="blog">
        <BlogSection />
      </section>
    </div>
  );
}
