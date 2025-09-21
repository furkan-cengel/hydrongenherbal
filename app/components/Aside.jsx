<<<<<<< HEAD
import {createContext, useContext, useEffect, useState} from 'react';

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
=======
// app/components/Aside.jsx
import {createContext, useContext, useEffect, useState} from 'react';

>>>>>>> 5b99f58 (improvements)
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  useEffect(() => {
<<<<<<< HEAD
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
    >
      <button className="close-outside" onClick={close} />
      <aside>
        <header>
          <h3>{heading}</h3>
          <button className="close reset" onClick={close} aria-label="Close">
            &times;
          </button>
        </header>
        <main>{children}</main>
=======
    if (expanded) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          close();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [close, expanded]);

  // Prevent body scroll when aside is open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expanded]);

  if (!expanded) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
        aria-label="Kapat"
      />
      
      {/* Panel */}
      <aside
        className={[
          'relative h-full w-[92vw] sm:w-[450px] max-w-[450px] bg-white shadow-2xl',
          'transition-transform duration-300 transform-gpu',
          'flex flex-col',
          'border-l border-gray-200',
          'z-10',
        ].join(' ')}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#f7fbd1]">
          <h3 className="text-lg font-bold text-[#3E7D5E]">{heading}</h3>
          <button
            type="button"
            className="p-2 -m-2 text-2xl leading-none text-[#3E7D5E] hover:text-[#2a5a3f] transition-colors"
            onClick={close}
            aria-label="Kapat"
          >
            ✕
          </button>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">{children}</div>
        </main>
>>>>>>> 5b99f58 (improvements)
      </aside>
    </div>
  );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');
<<<<<<< HEAD

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
=======
  
  return (
    <AsideContext.Provider 
      value={{
        type, 
        open: setType, 
        close: () => setType('closed')
>>>>>>> 5b99f58 (improvements)
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
<<<<<<< HEAD
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
/**
 * @typedef {{
 *   type: AsideType;
 *   open: (mode: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */

/** @typedef {import('react').ReactNode} ReactNode */
=======
  const ctx = useContext(AsideContext);
  if (!ctx) throw new Error('useAside must be used within an AsideProvider');
  return ctx;
}
>>>>>>> 5b99f58 (improvements)
