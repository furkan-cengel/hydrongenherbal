// app/components/Toast.jsx
import {useState, useEffect, createContext, useContext} from 'react';

// Toast Context
const ToastContext = createContext();

export function ToastProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = {id, message, type};
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{addToast, removeToast}}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Container
function ToastContainer({toasts, removeToast}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

// Individual Toast
function Toast({toast, onClose}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const bgColors = {
    success: 'bg-gradient-to-r from-[#3E7D5E] to-[#2a5a3f]',
    error: 'bg-gradient-to-r from-red-500 to-red-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600',
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${bgColors[toast.type]}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        min-w-[300px] max-w-md border border-white/10
      `}
    >
      {/* Icon with pulse animation */}
      <div className="flex-shrink-0">
        <div className="p-1.5 bg-white/20 rounded-full">
          {icons[toast.type]}
        </div>
      </div>
      
      {/* Message */}
      <p className="flex-1 text-white font-medium text-sm">
        {toast.message}
      </p>
      
      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-2 text-white/70 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Cart Success Toast - Özel sepet bildirimi
export function CartSuccessToast({productName, quantity = 1}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold">Ürün sepete eklendi! 🎉</p>
        <p className="text-white/90 text-sm">
          {quantity} adet {productName}
        </p>
      </div>
    </div>
  );
}