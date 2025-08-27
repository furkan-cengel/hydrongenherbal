import { useState } from "react";

// Yeniden kullanılabilir Accordion bileşeni
export default function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-lg text-[#333] focus:outline-none"
      >
        <span>{title}</span>
        {/* Açık/Kapalı durumuna göre ikonu döndür */}
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* İçerik, sadece 'isOpen' true olduğunda gösterilir */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen mt-4" : "max-h-0"
        }`}
      >
        <div className="text-[#333] text-base leading-relaxed pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
