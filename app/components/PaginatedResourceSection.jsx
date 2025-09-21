// app/components/_shopify_base/PaginatedResourceSection.jsx
import {Pagination} from '@shopify/hydrogen';
import {useId} from 'react';

/**
 * Brand-styled pagination wrapper
 * - Grid/List içeriklerini children ile render eder
 * - "Öncekiler" & "Daha Fazla" butonları marka diline göre tasarlandı
 */
export function PaginatedResourceSection({
  connection,
  resourcesClassName,
  children,
  className = '',
}) {
  const id = useId();

  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => (
        <section
          aria-labelledby={`section-${id}`}
          className={className}
        >
          {/* Content */}
          <div className={resourcesClassName}>
            {nodes.map((node, index) => children({node, index}))}
          </div>

          {/* Pager */}
          <div className="mt-10 flex items-center justify-center gap-3">
         

            <NextLink
              className={pagerBtnClass('primary')}
              prefetch="intent"
            >
              <span>Daha Fazla</span>
              <ChevronRight />
            </NextLink>
          </div>

          {/* Loading bar */}
          {isLoading && (
            <div className="mt-4 h-1 w-40 mx-auto overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-1/2 animate-[pulse_1s_ease-in-out_infinite] bg-emerald-400/70" />
            </div>
          )}
        </section>
      )}
    </Pagination>
  );
}

/* ---------- UI helpers ---------- */

function pagerBtnClass(variant) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ' +
    'disabled:pointer-events-none';
  const brandPrimary =
    'bg-[#3E7D5E] text-white shadow-md hover:shadow-lg hover:bg-[#2a5a3f] ' +
    'focus-visible:ring-[#3E7D5E]';
  const brandSecondary =
    'bg-white text-[#3E7D5E] border border-[#3E7D5E]/20 hover:border-[#3E7D5E]/40 ' +
    'hover:bg-[#E4F2EA] focus-visible:ring-[#3E7D5E]';

  return [
    base,
    variant === 'primary' ? brandPrimary : brandSecondary,
    // a11y: aria-disabled için stiller
    '[&[aria-disabled=true]]:opacity-50 [&[aria-disabled=true]]:pointer-events-none',
  ].join(' ');
}

function ChevronLeft() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
