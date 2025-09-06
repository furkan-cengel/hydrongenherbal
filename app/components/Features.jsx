export default function Features() {
  const stats = [
    {
      id: 'metabolism',
      title: 'Metabolizma Desteği',
      percentage: '96%',
      desc: "Kullanıcıların %96'sı Herbalife ürünlerinin metabolizma üzerinde olumlu etkilerini fark etti.*",
    },
    {
      id: 'digestion',
      title: 'Sindirim Rahatlığı',
      percentage: '93%',
      desc: 'Ürünleri kullandıktan sonra sindirim süreçlerinde iyileşme yaşadığını belirtti.*',
    },
    {
      id: 'energy',
      title: 'Enerji Seviyesi',
      percentage: '91%',
      desc: 'Gün içindeki enerji seviyelerinin arttığını ifade etti.*',
    },
    {
      id: 'recommendation',
      title: 'Tavsiye Oranı',
      percentage: '95%',
      desc: 'Herbalife ürünlerini ailesine veya arkadaşlarına tavsiye etti.*',
    },
  ];

  return (
    <section
      id="features"
      className="w-full  bg-[#E4F2EA] py-16 sm:py-20 px-4 sm:px-6 lg:px-8  xl:py-6"
      aria-labelledby="features-heading"
    >
      <div className="w-full max-w-7xl mx-auto lg:min-h-[70vh] xl:min-h-screen flex flex-col lg:flex-col gap-8 lg:gap-18 items-center justify-center">
        {/* Görsel */}
        <div className="w-full lg:w-1/3 flex justify-center items-center px-4">
          <img
            src="https://cdn.shopify.com/s/files/1/0761/4765/4889/files/features_1.webp?v=1756625885"
            alt="Herbalife ürün görseli"
            loading="eager"
            decoding="async"
            className="w-full max-w-[380px] sm:max-w-xs md:max-w-sm lg:max-w-xl object-contain"
          />
        </div>

        {/* Başlıklar */}
        <div className="w-full lg:w-2/3">
          <p className="uppercase text-[#3E7D5E] font-semibold tracking-wide mb-4 text-center lg:text-left">
            Gerçek insanlar, gerçek sonuçlar
          </p>
          <h2
            id="features-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#3E7D5E] mb-10 leading-tight text-center lg:text-left"
          >
            Kullanıcılarımızdan ilham alın
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" role="list">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="border-l-2 border-l-[#3E7D5E] pl-6"
                role="listitem"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-[#3E7D5E] mb-2">
                  {stat.percentage}
                </h3>
                <p className="text-base text-[#3E7D5E]/90 font-medium">
                  {stat.title}
                </p>
                <p className="text-sm text-[#3E7D5E]/70 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#3E7D5E]/60 italic mt-8">
            *Veriler, 4 haftalık kullanıcı deneyimi sonrası alınan geri
            bildirimlere dayanmaktadır.
          </p>
        </div>
      </div>
    </section>
  );
}
