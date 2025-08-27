export default function CategoryButton({
  label,
  active = false,
  onClick,
  variant = 'sidebar', // "sidebar" | "chip"
}) {
  const classesByVariant = {
    sidebar: active
      ? 'bg-[#436d33]/90 text-white px-5 py-2 rounded-full font-semibold shadow-sm transition'
      : 'border border-[#436d33]/60 text-[#436d33]/90 px-5 py-2 rounded-full font-semibold hover:bg-[#E4F2EA] transition',
    chip: active
      ? 'shrink-0 bg-[#436d33]/90 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm'
      : 'shrink-0 border border-[#436d33]/60 text-[#436d33]/90 text-xs px-3 py-1.5 rounded-full font-semibold bg-white',
  };

  return (
    <button onClick={onClick} className={classesByVariant[variant]}>
      {label}
    </button>
  );
}
