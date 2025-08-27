import {useState} from 'react';
import {Link} from 'react-router'; // Hydrogen'de react-router kullanılır

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/"
      className="block select-none relative w-32 sm:w-40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src="/images/Logoson.png"
        alt="Herbalmode Logo"
        className={`h-full w-full object-contain transition-transform duration-300 ${
          hovered ? '-translate-y-20 opacity-0' : 'translate-y-0'
        }`}
        draggable="false"
      />
      <span
        className={`
          absolute text-xl font-bold
          text-[#3E7D5E] text-center ml-8
          transition-all duration-300
          ${hovered ? 'opacity-100 -translate-y-25' : 'opacity-0 translate-y-0'}
        `}
        style={{
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Modunu Yükselt
      </span>
    </Link>
  );
}
