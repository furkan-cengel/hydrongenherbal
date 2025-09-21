// app/routes/$type.$slug.jsx
<<<<<<< HEAD
import {useEffect, useMemo, useRef} from 'react';
import {useLoaderData} from 'react-router';
import {getContentBySlug} from '~/data/allContentData';
import {useBlogScrollSpy} from '~/hooks/useBlogScrollSpy';

/** @type {import('@shopify/remix-oxygen').LoaderFunctionArgs} */
export async function loader({params}) {
  const {type, slug} = params;

  // Slug'dan içeriği bul
  const content = getContentBySlug(slug);

  // İçerik yoksa ya da type eşleşmiyorsa 404
=======
import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useLoaderData} from 'react-router';
import {getContentBySlug, blogsData, storiesData, newsData} from '~/data/allContentData';
import {useBlogScrollSpy} from '~/hooks/useBlogScrollSpy';

/** ================= LOADER + META ================= */

export async function loader({params}) {
  const {type, slug} = params;
  const content = getContentBySlug(slug);

>>>>>>> 5b99f58 (improvements)
  if (!content || !content.type || content.type !== type) {
    throw new Response('Not Found', {status: 404});
  }

  return {content};
}

<<<<<<< HEAD
/** @type {import('react-router').MetaFunction} */
=======
>>>>>>> 5b99f58 (improvements)
export const meta = ({data, params}) => {
  const base = 'HerbalMode';
  const t = data?.content?.title
    ? `${data.content.title} | ${params.type?.toUpperCase?.() || 'İçerik'} | ${base}`
    : `${params.type?.toUpperCase?.() || 'İçerik'} | ${base}`;
  const firstPara =
    data?.content?.content?.[0]?.paragraphs?.[0] ??
    'Herbalife üzerine yazılar, haberler ve başarı hikayeleri.';
  return [
    {title: t},
    {name: 'description', content: `${firstPara}`.slice(0, 160)},
  ];
};

<<<<<<< HEAD
export default function ContentDetailRoute() {
  const {content} = useLoaderData();
  const contentRef = useRef(null);

  // Sayfa açılışında en üste al
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'scrollRestoration' in window.history
    ) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      window.scrollTo({top: 0, left: 0, behavior: 'auto'});
      requestAnimationFrame(() =>
        window.scrollTo({top: 0, left: 0, behavior: 'auto'}),
      );
      return () => {
        window.history.scrollRestoration = prev || 'auto';
      };
    } else if (typeof window !== 'undefined') {
      window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    }
=======
/** ================= HELPERS ================= */

/** Paylaşım butonları (X, Facebook, WhatsApp) */
function ShareBar({title, url}) {
  const encodedUrl = encodeURIComponent(url || '');
  const encodedText = encodeURIComponent(title || '');
  const links = [
    {k: 'X',  href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`},
    {k: 'Fb', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`},
    {k: 'Wa', href: `https://wa.me/?text=${encodedText}%20-%20${encodedUrl}`},
  ];

  return (
    <div className="flex flex-col gap-3 items-end">
      <span className="text-xs tracking-wide text-[#7a8f54] self-end">PAYLAŞ</span>
      <div className="flex flex-col gap-2">
        {links.map((s) => (
          <a
            key={s.k}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-[#eaf580] border border-[#dfeaa6] text-[#365729] grid place-items-center hover:scale-105 transition"
            aria-label={`Paylaş: ${s.k}`}
          >
            <span className="font-semibold">{s.k}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/** Alt bölüm: “Bunları da sevebilirsiniz” */
function YouMayAlsoLike({currentType, currentSlug}) {
  const pool =
    currentType === 'blog'
      ? blogsData
      : currentType === 'stories'
      ? storiesData
      : currentType === 'news'
      ? newsData
      : [];

  const items = pool.filter((x) => x.slug !== currentSlug).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <h3 className="text-2xl font-bold text-[#365729] mb-6">Bunları da sevebilirsiniz</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <Link
            key={it.slug}
            to={`/${it.type}/${it.slug}`}
            className="group rounded-2xl bg-white border border-[#e4f2ea] shadow-sm hover:shadow-xl transition overflow-hidden"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-[#f7fbd1] to-[#E4F2EA] overflow-hidden">
              {it.image ? (
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              ) : null}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {it.tags?.[0] ? (
                  <span className="bg-[#e2efb3] text-[#4f7330] text-xs font-semibold px-3 py-1 rounded-full">
                    {it.tags[0]}
                  </span>
                ) : null}
                {it.readTime ? (
                  <span className="bg-[#fbd35b]/60 text-[#7a6618] text-xs px-2 py-1 rounded-full">
                    {it.readTime}
                  </span>
                ) : null}
              </div>
              <h4 className="font-semibold text-gray-900 group-hover:text-[#3E7D5E] transition line-clamp-2">
                {it.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** ================= PAGE ================= */

export default function ContentDetailRoute() {
  const {content} = useLoaderData();
  const contentRef = useRef(null);
  const [pageUrl, setPageUrl] = useState('');

  // SSR → CSR: paylaşım URL'si
  useEffect(() => {
    if (typeof window !== 'undefined') setPageUrl(window.location.href);
  }, []);

  // En üste al
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      window.scrollTo({top: 0, left: 0, behavior: 'auto'});
      requestAnimationFrame(() => window.scrollTo({top: 0, left: 0, behavior: 'auto'}));
      return () => (window.history.scrollRestoration = prev || 'auto');
    }
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
>>>>>>> 5b99f58 (improvements)
  }, [content?.slug]);

  const isArticle =
    content?.type === 'blog' ||
    content?.type === 'story' ||
    content?.type === 'news';

<<<<<<< HEAD
  // İçindekiler başlıkları
=======
  // İçindekiler
>>>>>>> 5b99f58 (improvements)
  const headings = useMemo(() => {
    if (!isArticle || !content?.content) return [];
    return content.content.map((c) => ({id: c.id, label: c.heading}));
  }, [isArticle, content]);

  const {activeHeading, progress} = useBlogScrollSpy(headings, contentRef);
  const progressPct = Math.round(progress * 100);

<<<<<<< HEAD
  // Key üretimi için yardımcı (index yerine metinden stabil key)
=======
>>>>>>> 5b99f58 (improvements)
  const k = (prefix, sectionId, text) =>
    `${prefix}-${sectionId}-${String(text).slice(0, 32)}`;

  return (
<<<<<<< HEAD
    <section className="bg-[#f7fbd1] min-h-screen pt-24 px-4 sm:px-6 lg:px-8 py-24">
=======
    <section className="bg-[#f7fbd1] min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-24">
>>>>>>> 5b99f58 (improvements)
      {/* Mobil üst progress bar */}
      <div className="fixed top-0 left-0 w-full h-[5px] z-[60] md:hidden">
        <div
          className="h-full bg-[#8e9954]/95 transition-[width] duration-100"
          style={{width: `${progressPct}%`}}
        />
      </div>

      {/* HEADER */}
<<<<<<< HEAD
      <div className="w-full pb-12 pt-10 bg-gradient-to-b from-[#f7fbd1] via-[#f4fad7] to-[#eefadc] flex flex-col items-center gap-10">
=======
      <div className="w-full pb-6 pt-10 bg-gradient-to-b from-[#f7fbd1] via-[#f4fad7] to-[#eefadc] flex flex-col items-center gap-10">
>>>>>>> 5b99f58 (improvements)
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#365729] leading-tight drop-shadow">
            {content.title}
          </h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center items-center text-sm text-[#789748] font-medium">
            {content.date ? <span>{content.date}</span> : null}
            {content.author ? (
              <>
                <span className="opacity-40">·</span>
                <span>{content.author}</span>
              </>
            ) : null}
            {content.readTime ? (
              <>
                <span className="opacity-40">·</span>
                <span>{content.readTime}</span>
              </>
            ) : null}
          </div>
          {Array.isArray(content.tags) && content.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {content.tags.map((tag) => (
                <span
                  key={`tag-${tag}`}
                  className="bg-[#e2efb3] text-[#4f7330] px-3 py-1 rounded-full text-xs capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {content.image ? (
          <div className="w-full flex justify-center relative">
            <div className="absolute w-[70vw] sm:w-[60vw] max-w-2xl h-64 blur-2xl sm:blur-[32px] rounded-3xl bg-gradient-to-tr from-[#eaf580] via-[#f7fbd1] to-[#c9e99a] top-4 left-1/2 -translate-x-1/2" />
            <img
              src={content.image}
              alt={content.title}
              loading="lazy"
              className="relative z-10 w-full max-w-md md:max-w-xl lg:max-w-2xl rounded-2xl shadow-2xl border border-[#e4f2ea] object-cover"
            />
          </div>
        ) : null}
      </div>

<<<<<<< HEAD
      {/* MAIN */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 relative pt-12 px-2 items-start">
        {/* İçindekiler — tablet & desktop */}
        {isArticle && headings.length > 0 && (
          <aside className="hidden md:block w-full md:w-80 md:sticky md:top-24 mb-10 md:mb-0 z-10">
            <div className="bg-white/90 rounded-2xl border border-[#e4f2ea] px-6 py-6 shadow-xl relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[#3E7D5E]">
                  İçindekiler
                </h3>
                <div className="text-xs text-[#8e9954] font-medium">
                  %{progressPct}
                </div>
              </div>
              <div className="h-2 w-full bg-[#f7fbd1] rounded-full mb-3">
                <div
                  className="h-full bg-[#b2cc68] rounded-full transition-all"
                  style={{width: `${progressPct}%`}}
                />
              </div>
              <ul className="space-y-1 text-[#365729] font-medium text-sm">
                {headings.map((h) => (
                  <li key={`toc-${h.id}`}>
                    <a
                      href={`#${h.id}`}
                      aria-current={activeHeading === h.id ? 'true' : undefined}
                      className={`block px-2 py-1 rounded transition ${
                        activeHeading === h.id
                          ? 'bg-[#eaf580]/90 text-[#436d33] font-bold'
                          : 'hover:bg-[#eaf580]/60'
                      }`}
                    >
                      {h.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* İçerik */}
        <article
          className="flex-1 bg-white/95 rounded-2xl shadow-xl border border-[#e4f2ea] px-6 sm:px-8 py-10 prose max-w-none"
=======
      {/* MAIN GRID:
          lg: [İçerik | İçindekiler | Paylaş]
       */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_80px] gap-8 relative pt-4 px-2 items-start">
        {/* İÇERİK */}
        <article
          className="bg-white/95 rounded-2xl shadow-xl border border-[#e4f2ea] px-6 sm:px-8 py-10 prose max-w-none order-1"
>>>>>>> 5b99f58 (improvements)
          ref={contentRef}
        >
          {content.content?.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-8 scroll-mt-32"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#436d33] mb-3">
                {section.heading}
              </h2>

              {section.paragraphs?.map((p) => (
                <p key={k('p', section.id, p)}>{p}</p>
              ))}

              {section.listItems && (
                <ul className="list-disc list-inside my-4 space-y-2">
                  {section.listItems.map((item) => (
                    <li key={k('li', section.id, item)}>{item}</li>
                  ))}
                </ul>
              )}

              {section.finalParagraphs?.map((p) => (
                <p key={k('fp', section.id, p)} className="mt-4">
                  {p}
                </p>
              ))}
            </section>
          ))}
<<<<<<< HEAD
        </article>
=======

          {/* ---- Alt öneriler ---- */}
          <YouMayAlsoLike currentType={content.type} currentSlug={content.slug} />
        </article>

        {/* İÇİNDEKİLER */}
        {isArticle && headings.length > 0 && (
          <aside className="hidden md:block order-2 md:sticky md:top-24 self-start">
            <div className="bg-white/90 rounded-2xl border border-[#e4f2ea] px-6 py-6 shadow-xl relative w-full md:w-80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[#3E7D5E]">İçindekiler</h3>
                <div className="text-xs text-[#8e9954] font-medium">%{progressPct}</div>
              </div>
              <div className="h-2 w-full bg-[#f7fbd1] rounded-full mb-3">
                <div
                  className="h-full bg-[#b2cc68] rounded-full transition-all"
                  style={{width: `${progressPct}%`}}
                />
              </div>
              <ul className="space-y-1 text-[#365729] font-medium text-sm">
                {headings.map((h) => (
                  <li key={`toc-${h.id}`}>
                    <a
                      href={`#${h.id}`}
                      aria-current={activeHeading === h.id ? 'true' : undefined}
                      className={`block px-2 py-1 rounded transition ${
                        activeHeading === h.id
                          ? 'bg-[#eaf580]/90 text-[#436d33] font-bold'
                          : 'hover:bg-[#eaf580]/60'
                      }`}
                    >
                      {h.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* PAYLAŞ */}
        <aside className="hidden lg:block order-3 sticky top-24 self-start">
          <ShareBar title={content.title} url={pageUrl} />
        </aside>
>>>>>>> 5b99f58 (improvements)
      </div>
    </section>
  );
}
