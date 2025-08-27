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
    <>
      <div aria-hidden="true" className=" bg-[#E4F2EA]" />
      <section
        id="features"
        className="w-full bg-[#E4F2EA] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 relative"
        aria-labelledby="features-heading"
      >
        <div className="w-full max-w-7xl mx-auto lg:min-h-[70vh] xl:min-h-screen flex flex-col">
          <div className="flex flex-col lg:flex-col gap-8 lg:gap-12 items-center justify-start pt-8 lg:pt-16 flex-grow">
            {/* Görsel */}
            <div className="w-full lg:w-1/3 flex justify-center items-center px-4">
              <img
                src="/images/features.webp"
                alt="Herbalife ürün görseli"
                width={768}
                height={768}
                loading="eager"
                decoding="async"
                className="w-full max-w-[380px] sm:max-w-xs md:max-w-sm lg:max-w-xl object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 380px, 576px"
                style={{willChange: 'transform', transform: 'translateZ(0)'}}
              />
            </div>

            {/* Başlıklar */}
            <div className="w-full text-center flex flex-col gap-8">
              <p className="uppercase text-[#3E7D5E] font-semibold tracking-wide">
                Gerçek insanlar, gerçek sonuçlar
              </p>
              <h2
                id="features-heading"
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#3E7D5E] mt-6 leading-tight"
              >
                Kullanıcılarımızdan ilham alın
              </h2>
            </div>

            {/* İstatistikler */}
            <div className="w-full lg:w-2/3 mt-[4rem]">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                role="list"
              >
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
                    <p className="text-sm text-[#3E7D5E]/70 mt-2">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="w-full mt-auto pt-12 pb-4">
            <div className="w-full max-w-4xl mx-auto border-t border-[#3E7D5E]/20 pt-6">
              <p className="text-xs text-[#3E7D5E]/60 italic text-center">
                *Veriler, 4 haftalık kullanıcı deneyimi sonrası alınan geri
                bildirimlere dayanmaktadır.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="h-10 md:h-14 lg:h-20 bg-[#E4F2EA]" />
    </>
  );
}
