/**
 * Tekrarlı kayan yazı için yardımcı bileşen.
 * - items: string[]
 * - repeatCount: kaç kez tekrar edilsin
 * - containerClass, trackClass, itemClass: stil sınıfları
 * - durationSec: animasyon süresi (sn)
 */
export default function MarqueeText({
  items = [],
  repeatCount = 2,
  containerClass = '',
  trackClass = '',
  itemClass = '',
  durationSec = 22,
}) {
  // items'ı tekrarla
  const repeated = Array.from({length: repeatCount}).flatMap(() => items);

  // Stabil key üret (index kullanmadan): "metin-0", "metin-1", ...
  const counts = Object.create(null);
  const repeatedWithIds = repeated.map((text) => {
    const n = counts[text] ?? 0;
    counts[text] = n + 1;
    return {id: `${text}-${n}`, text};
    // Aynı metin birden çok kez geçse bile key stabil kalır.
  });

  return (
    <div
      className={containerClass}
      style={{animationDuration: `${durationSec}s`}}
    >
      <div
        className={trackClass}
        style={{animationDuration: `${durationSec}s`}}
      >
        {repeatedWithIds.map(({id, text}) => (
          <span key={id} className={itemClass}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
