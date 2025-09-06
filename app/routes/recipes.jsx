// app/routes/recipes.jsx
import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';

/**
 * /recipes sayfası: kart grid + erişilebilir modal (dialog)
 * Not: Veriyi istersen /app/data altına taşıyabiliriz; şimdilik inline.
 */
export const meta = () => [
  {title: 'Tarifler — HerbalMode'},
  {
    name: 'description',
    content: 'Pratik, besleyici ve lezzetli HerbalMode tarifleri.',
  },
];

const featuredRecipes = [
  {
    id: 1,
    title: 'Çıtır Fıstıklı Müsli',
    desc: 'Aromatik vanilya dokunuşuyla zenginleşen, fıstık ve tohumlarla dolu çıtır bir enerji kaynağı! Formül 1 Vanilya Aromalı ve Heartwell™ ile hazırlanan bu müsli, hem kahvaltıda hem de gün ortasında sağlıklı bir atıştırmalık olarak mükemmel bir seçim.',
    image: '/images/recipe1.webp',
    time: '45 dk',
    prepTime: '15 dk',
    cookTime: '30 dk',
    serves: '1',
    totalTime: '45 dk',
    ingredientsLeft: [
      '2 ölçek (52 g) Formül 1 Vanilyalı Aromalı',
      '8 ölçek (61 g) Heartwell™',
      '125 gr hindistan cevizi yağı',
      '150 ml bal veya agave şurubu',
      '1 çay kaşığı vanilya özü',
      '500 gr yulaf gevreği veya tahıl karışımı',
    ],
    ingredientsRight: [
      '100 gr file badem',
      '100 gr kıyılmış kaju fıstığı',
      '100 gr kurutulmuş hindistan cevizi',
      '100 gr kabak çekirdeği',
      '100 gr ayçiçeği çekirdeği',
      '250 gr doğranmış kuru meyve karışımı',
    ],
    tip: 'Bir veya iki çay kaşığı tarçın ekleyebilirsiniz. Çeşitlilik için farklı fındık, tohum ve kurutulmuş meyve kombinasyonlarını deneyin.',
    instructions: [
      {
        title: 'Fırını Hazırlayın',
        items: ["Fırını önceden 170°C'ye (150°C fanlı) ısıtın."],
      },
      {
        title: 'Islak Karışımı Hazırlayın',
        items: [
          'Hindistan cevizi yağı, bal veya agave şurubu ve vanilya özünü küçük bir tencerede eritin.',
        ],
      },
      {
        title: 'Kuru Malzemeleri Karıştırın',
        items: [
          'Yulaf gevreği, badem, kaju fıstığı, hindistan cevizi, kabak ve ayçiçeği çekirdeklerini geniş bir kapta karıştırın.',
        ],
      },
      {
        title: 'Karışımı Birleştirin ve Pişirin',
        items: [
          'Eritilmiş karışımı kuru karışıma dökün ve iyice karıştırın.',
          'Müsliyi geniş bir tepsiye yayın ve fırında 25 dakika pişirin.',
          'Her 5 dakikada bir karıştırın, böylece eşit şekilde kızarır.',
        ],
      },
      {
        title: 'Soğutma ve Son Eklemeler',
        items: [
          'Fırından çıkarın ve sık sık karıştırarak soğumaya bırakın.',
          'Soğuyunca Formül 1 Vanilyalı Aromalı, Heartwell™ ve kuru meyveyi ekleyin ve karıştırın.',
        ],
      },
      {
        title: 'Saklama',
        items: [
          'Hava geçirmez bir kaba koyun.',
          'Oda sıcaklığında saklayın. Bir aya kadar tazeliğini korur.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Pancarlı Humus',
    desc: 'Canlı pancar rengiyle göz alıcı, lezzetiyle cezbedici! Formül 3 Pro-Boost ile zenginleştirilmiş bu pancarlı humus; protein açısından yüksek, şeker oranı düşük ve atıştırmalıklarınıza sağlıklı bir dokunuş katmak için ideal.',
    image: '/images/recipe2.webp',
    time: '20 dk',
    prepTime: '20 dk',
    cookTime: '-',
    serves: '1',
    totalTime: '20 dk',
    ingredientsLeft: [
      '4 ölçek (24 g) Formül 3 Pro-Boost',
      '2 küçük pancar (175 g)',
      '1 x 400 g konserve nohut',
      '2 yemek kaşığı doğranmış kişniş',
      '2 çay kaşığı öğütülmüş kimyon',
    ],
    ingredientsRight: [
      '1 yemek kaşığı tahin',
      '1 yemek kaşığı limon suyu',
      '3 yemek kaşığı sızma zeytinyağı',
      '1 çay kaşığı susam (süsleme)',
      'Kişniş yaprakları (süsleme)',
    ],
    tip: 'Humusu buzdolabında saklarsanız üzerini örtün. Biraz acı istiyorsanız, içerisine doğranmış kırmızı biber ekleyebilirsiniz.',
    instructions: [
      {
        title: 'Pancarı Hazırlayın',
        items: [
          'Pancarları soyun, parçalara ayırın ve mutfak robotuna yerleştirin.',
        ],
      },
      {
        title: 'Nohutu Ekleyin',
        items: [
          'Konserve nohutu süzün, suyunu saklayın.',
          'Nohutları pancarla birlikte robota ekleyin.',
        ],
      },
      {
        title: 'Diğer Malzemeleri Ekleyin',
        items: [
          "Kişniş, kimyon, tahin, limon suyu, zeytinyağı ve Pro-Boost'u ilave edin.",
          'Karışımı nohut suyu ile yumuşatarak pürüzsüz hale getirin.',
        ],
      },
      {
        title: 'Servis',
        items: [
          'Hazır karışımı kaseye alın.',
          'Üzerine susam ve kişniş yaprakları serpin ve soğuk servis edin.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Kepekli Bazlama',
    desc: 'Protein ve lif açısından zengin bu yumuşacık kepekli bazlama, Heartwell™ ve Formül 3 Pro-Boost ile hazırlanıyor. Sağlıklı malzemelerle evde kolayca yapabileceğin bu bazlama, her türlü tarifin yanında enfes bir eşlikçi!',
    image: '/images/recipe3.webp',
    time: '60 dk',
    prepTime: '45 dk',
    cookTime: '15 dk',
    serves: '6',
    totalTime: '60 dk',
    ingredientsLeft: [
      '2 ölçek (15 g) Heartwell™',
      '2 ölçek (12 g) Formül 3 Pro-Boost',
      '125 gr yüksek kepekli un',
      '125 gr organik beyaz un',
      '½ çay kaşığı tuz',
    ],
    ingredientsRight: [
      '½ çay kaşığı öğütülmüş kişniş',
      '½ çay kaşığı kimyon',
      '½ çay kaşığı kırmızı biber (acı/tatlı)',
      '125 ml ılık su',
      '50 ml sızma zeytinyağı',
    ],
    tip: 'Bazlamaları sıcakken temiz bir bezle sararsanız yumuşak kalmasını sağlarsınız. Dilerseniz taze otlar ya da sarımsaklı soslarla da lezzetlendirebilirsiniz.',
    instructions: [
      {
        title: 'Hamuru Hazırlayın',
        items: [
          'Tüm kuru malzemeleri bir kaseye koyun ve karıştırın.',
          'Ortada bir çukur açıp ılık su ve zeytinyağını ekleyin, karıştırarak hamur oluşturun.',
        ],
      },
      {
        title: 'Yoğurma ve Dinlendirme',
        items: [
          'Hamuru 5-7 dakika yoğurun, pürüzsüz olana kadar devam edin.',
          'Top haline getirip yağlayın, örtün ve 30 dakika dinlendirin.',
        ],
      },
      {
        title: 'Şekil Verme',
        items: [
          'Hamuru 6 parçaya bölün.',
          'Her parçayı yaklaşık 20 cm çapında daire haline getirin.',
        ],
      },
      {
        title: 'Pişirme',
        items: [
          'Tavayı önceden ısıtın.',
          'Her bazlamayı iki tarafı kahverengi lekeler oluşana kadar pişirin.',
        ],
      },
      {
        title: 'Saklama ve Servis',
        items: [
          'Sıcak bazlamaları bezle sarın, üst üste koyabilirsiniz.',
          'Dilerseniz bütün servis yapın veya dilimleyerek sunun.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Hızlı Bezelye ve Nane Çorbası',
    desc: 'Ferahlatıcı nane ve bezelyenin mükemmel uyumu! Formül 1 Vanilya Aromalı ve Pro-Boost ile zenginleştirilen bu iç açıcı çorba, sadece 15 dakikada hazırlanıyor ve günün her saati için hafif ama besleyici bir seçenek sunuyor.',
    image: '/images/recipe4.webp',
    time: '15 dk',
    prepTime: '15 dk',
    cookTime: '-',
    serves: '4',
    totalTime: '15 dk',
    ingredientsLeft: [
      '½ ölçek (13 g) Formül 1 Vanilya Aromalı',
      '2 ölçek (12 g) Formül 3 Pro-Boost',
      '6 adet taze soğan (50 g, dilimlenmiş)',
      '300 g dondurulmuş bezelye',
    ],
    ingredientsRight: [
      '800 ml kaynar sebze suyu',
      '1 yemek kaşığı nane yaprağı (kabaca rendelenmiş)',
      'Tuz ve karabiber (isteğe bağlı)',
    ],
    tip: 'Bu çorba nane yerine kişniş ve doğranmış yeşil biberle de hazırlanabilir. Soğuk yaz günlerinde soğuk olarak da servis edilebilir.',
    instructions: [
      {
        title: 'Hazırlık',
        items: [
          'Taze soğanları doğrayın ve bezelye ile birlikte blendera koyun.',
        ],
      },
      {
        title: 'Pişirme',
        items: [
          'Üzerine kaynar sebze suyunu dökün.',
          'Nane yapraklarını ekleyin ve 1-2 dakika yumuşamasını bekleyin.',
        ],
      },
      {
        title: 'Karıştırma',
        items: [
          'Formül 1 Vanilya Aromalı ve Formül 3 Pro-Boost’u ilave edin.',
          'Karışımı tamamen pürüzsüz hale gelene kadar blenderdan geçirin.',
        ],
      },
      {
        title: 'Servis',
        items: [
          'Tuz ve karabiberle tatlandırın.',
          'Sıcak veya soğuk olarak servis yapın.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Çilekli Kivili',
    desc: 'Çilek, kivi ve portakalın ferah buluşması! Formül 1 Vanilya Aromalı ile hazırlanan bu meyveli shake; protein açısından zengin, serinletici ve sadece 5 dakikada hazır sağlıklı bir atıştırmalık.',
    image: '/images/recipe5.webp',
    time: '5 MIN',
    prepTime: '5 dk',
    cookTime: '1 dk',
    serves: '1',
    totalTime: '5 dk',
    ingredientsLeft: [
      '250 ml yarım yağlı süt (%1,5 yağ)',
      '75 gr donmuş çilek',
      '1 adet çok olgun kivi',
    ],
    ingredientsRight: [
      '1/2 adet orta boy portakal',
      '2 çorba kaşığı (26 g) Formül 1 Vanilya Aromalı Shake Karışımı',
    ],
    tip: 'Bardağınızı kivi dilimleriyle süsleyerek görsel olarak da iştah açıcı bir sunum yapabilirsiniz. Yaz aylarında buz ilavesiyle ekstra serinletici olur.',
    instructions: [
      {
        title: 'Meyveleri Hazırlayın',
        items: ['Portakalı iri parçalara bölün.', 'Kiviyi soyup doğrayın.'],
      },
      {
        title: 'Blenderdan Geçirin',
        items: [
          'Tüm malzemeleri (süt, meyveler ve Formül 1) blendera ekleyin.',
          'İstediğiniz kıvama gelene kadar karıştırın.',
        ],
      },
      {
        title: 'Servis',
        items: [
          'Shake’i hemen servis edin.',
          'İsteğe bağlı olarak kivi dilimleriyle süsleyin.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Belçika Usulü Enerji Waffle',
    desc: 'Çikolata lezzetiyle buluşan protein dolu bir hafta sonu keyfi! Herbalife24® RB ProMax ile hazırlanan bu Belçika usulü waffle, hem doyurucu hem de spor sonrası için ideal bir kahvaltı alternatifi.',
    image: '/images/recipe6.webp',
    time: '22 dk',
    prepTime: '12 dk',
    cookTime: '10 dk',
    serves: '3',
    totalTime: '22 dk',
    ingredientsLeft: [
      '2 ölçek (100 g) Herbalife24® RB ProMax',
      '2 yumurta',
      '25 ml yarım yağlı süt',
      '50 g sade un',
    ],
    ingredientsRight: [
      '½ çay kaşığı kabartma tozu',
      '2 çay kaşığı bitkisel yağ',
      '80 g taze çilek (servis için)',
    ],
    tip: "Waffle'ları taze meyveler, yoğurt ya da az miktarda bal ile süsleyerek protein dengesini koruyabilir ve sunumunuzu zenginleştirebilirsiniz.",
    instructions: [
      {
        title: 'Hamuru Hazırlayın',
        items: [
          'Bir kapta yumurta, süt, Herbalife24® RB ProMax, un, yağ ve kabartma tozunu birleştirin.',
          'Pürüzsüz kıvam alana kadar karıştırın.',
        ],
      },
      {
        title: 'Waffle’ları Pişirin',
        items: [
          'Waffle makinesini önceden ısıtın.',
          'Hamuru makineye dökün ve 2-3 dakika ya da dışı çıtır olana kadar pişirin.',
        ],
      },
      {
        title: 'Servis',
        items: [
          "Sıcak waffle'ları taze çilek ve sevdiğiniz diğer malzemelerle servis edin.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Muzlu Fındıklı Chia Shake',
    desc: 'Kremsi dokusu, yüksek lif ve bitki bazlı protein içeriğiyle dengeli bir içecek arayanlar için birebir! Tri Blend Select Muz Aromalı ile hazırlanan bu shake, vegan beslenenler için mükemmel bir seçenek.',
    image: '/images/recipe7.webp',
    time: '5 dk',
    prepTime: '5 dk',
    cookTime: '-',
    serves: '1',
    totalTime: '5 dk',
    ingredientsLeft: [
      '1 ölçek (40 g) Tri Blend Select Muz Aromalı',
      '250 ml su',
      '1 adet muz',
    ],
    ingredientsRight: [
      '½ yemek kaşığı chia tohumu',
      '½ yemek kaşığı fındık ezmesi',
    ],
    tip: 'Shake’i önceden hazırlayıp 10 dakika buzdolabında bekletirsen chia tohumları hafifçe şişer, kıvamı daha yoğun olur. Buz ilavesiyle serinletici etki artırılabilir.',
    instructions: [
      {
        title: 'Malzemeleri Ekleyin',
        items: [
          'Tri Blend Select, su, muz, chia tohumu ve fındık ezmesini blendera koyun.',
        ],
      },
      {
        title: 'Karıştırın',
        items: ['Tüm malzemeleri pürüzsüz kıvam alana kadar karıştırın.'],
      },
      {
        title: 'Servis',
        items: [
          'Shake’i uzun bir bardakta servis edin.',
          'İsteğe bağlı olarak üzerine muz dilimleri veya chia serpebilirsiniz.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Enerji Topları',
    desc: 'Dakikalar içinde hazırlanan bu mini enerji topları, hareketli günlerde sana sağlıklı bir destek sunar. Herbalife24® RB ProMax ile yapılan bu lezzetli atıştırmalıklar, ekstra protein ve yoğun çikolata tadıyla enerji dolu bir mola vaat ediyor.',
    image: '/images/recipe8.webp',
    time: '75 dk',
    prepTime: '15 dk',
    cookTime: '60 dk',
    serves: '20',
    totalTime: '75 dk',
    ingredientsLeft: [
      '1 ölçek (50 g) Herbalife24® RB ProMax',
      '50 gr öğütülmüş yulaf gevreği',
      '30 g kakao tozu',
      '40 gr kurutulmuş hindistan cevizi',
    ],
    ingredientsRight: [
      '70 ml şekersiz soya içeceği',
      '1 çay kaşığı bal',
      'Kaplama için: ezilmiş fındık, hindistan cevizi veya tohum (isteğe bağlı)',
    ],
    tip: 'Vegan bir versiyon için Herbalife24® RB ProMax yerine 2 ölçek Formül 1 Çikolata Aromalı kullanabilir, bal yerine agave veya akçaağaç şurubu tercih edebilirsiniz.',
    instructions: [
      {
        title: 'Kuru Malzemeleri Hazırlayın',
        items: [
          'Yulaf gevreğini blender’da ince hale gelene kadar çekin.',
          'Bir kaba alın ve kakao tozu, kurutulmuş hindistan cevizi ve ProMax ile karıştırın.',
        ],
      },
      {
        title: 'Islak Karışımı Ekleyin',
        items: [
          'Balı ve şekersiz soya içeceğini karışıma dökün.',
          'Karışım yapışkan ve şekil verilebilir hale gelene kadar yoğurun.',
        ],
      },
      {
        title: 'Toplar Oluşturun',
        items: [
          'Karışımdan küçük parçalar alıp yuvarlayarak toplar oluşturun.',
          'Dilerseniz dışını ezilmiş fındık, hindistan cevizi veya tohumlarla kaplayın.',
        ],
      },
      {
        title: 'Soğutun ve Servis Edin',
        items: [
          'Enerji toplarını buzdolabında en az 1 saat bekletin.',
          'Soğuk olarak servis edin veya saklayın.',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Kremalı Mantar Çorbası',
    desc: 'Yoğun günlerde kurtarıcı bir kase lezzet! Formül 3 Pro-Boost ile zenginleştirilen bu kremalı mantar çorbası; doyurucu, besleyici ve önceden hazırlayıp dondurabileceğin pratik bir öğün alternatifi.',
    image: '/images/recipe9.webp',
    time: '45 dk',
    prepTime: '15 dk',
    cookTime: '30 dk',
    serves: '1',
    totalTime: '45 dk',
    ingredientsLeft: [
      '2 ölçek (12 g) Formül 3 Pro-Boost',
      '2 yemek kaşığı zeytinyağı',
      '1 büyük soğan (150 g, doğranmış)',
      '1 diş sarımsak (ince doğranmış)',
      '1 çay kaşığı taze rendelenmiş zencefil',
    ],
    ingredientsRight: [
      '300 g doğranmış mantar',
      '200 ml az yağlı hindistan cevizi sütü',
      '700 ml az tuzlu sebze suyu',
      'Bir çimdik karabiber',
    ],
    tip: 'Bu çorbayı önceden hazırlayıp porsiyonlayarak dondurabilirsiniz. Isıttığınızda taze çekilmiş karabiberle lezzetini artırabilirsiniz.',
    instructions: [
      {
        title: 'Soteleme',
        items: [
          'Zeytinyağını tencereye dökün, soğan ve sarımsağı ekleyin.',
          'Karabiberle tatlandırıp kapağı kapatın, yumuşayana kadar pişirin.',
        ],
      },
      {
        title: 'Mantarları Ekleyin',
        items: [
          'Doğranmış mantarları ve rendelenmiş zencefili ekleyin.',
          'Orta-yüksek ateşte, kapak kapalı şekilde pişirin.',
        ],
      },
      {
        title: 'Sütlü Karışımı Hazırlayın',
        items: [
          'Hindistan cevizi sütünü bir kapta Formül 3 Pro-Boost ile karıştırın.',
          'Sebze suyunu ekleyin ve birlikte çırpın.',
        ],
      },
      {
        title: 'Kaynatın ve Servis Edin',
        items: [
          'Karışımı tencereye dökün ve kaynamaya bırakın.',
          '2 dakika kaynattıktan sonra tatlandırın ve sıcak servis edin.',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Muzlu Yulaflı Vegan Kurabiye',
    desc: 'Bitki bazlı, hafif ve besleyici! Tri Blend Select Muz Aromalı ile hazırlanan bu yumuşacık vegan kurabiyeler, hem lif hem de protein kaynağı olarak tatlı isteğinizi suçluluk duymadan karşılar.',
    image: '/images/recipe10.webp',
    time: '40 dk',
    prepTime: '15 dk',
    cookTime: '25 dk',
    serves: '8',
    totalTime: '40 dk',
    ingredientsLeft: [
      '1 ölçek (40 g) Tri Blend Select Muz Aromalı',
      '1 olgun muz',
      '80 g yulaf lapası (glutensiz olabilir)',
      '60 ml şekersiz badem içeceği',
    ],
    ingredientsRight: [
      '40 g kuru kayısı',
      '½ çay kaşığı tarçın',
      '4 çay kaşığı organik hindistan cevizi şekeri',
    ],
    tip: 'Kurabiyeler oda sıcaklığına geldikten sonra hava almayan bir kapta 2-3 gün boyunca saklanabilir. Yanına badem sütüyle servis edebilirsin!',
    instructions: [
      {
        title: 'Fırın Hazırlığı',
        items: [
          'Fırını 170°C (fanlı 150°C) dereceye ısıt.',
          'Fırın tepsisine yağlı kağıt ser.',
        ],
      },
      {
        title: 'Karışımı Hazırlayın',
        items: [
          'Tüm malzemeleri (2 çay kaşığı şekeri ayır) mutfak robotuna ekleyin.',
          'Koyu bir hamur elde edene kadar karıştırın.',
        ],
      },
      {
        title: 'Kurabiyeleri Oluşturun',
        items: [
          'Hamurdan 1/8’lik parçalar alıp tepsiye koyun ve 8 cm çapında yayın.',
          'Kalan şekeri üzerlerine serpin.',
        ],
      },
      {
        title: 'Pişirme ve Soğutma',
        items: [
          'Kurabiyeleri yaklaşık 20 dakika, üstü kahverengileşene kadar pişirin.',
          'Izgara teline alarak soğumaya bırakın.',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Çikolatalı Fondan',
    desc: 'Yoğun çikolata tadı, yumuşak iç dokusu ve yüksek protein içeriğiyle bu fondanlar tatlı krizlerine sağlıklı bir çözüm sunar. Herbalife24® RB ProMax ile hazırlanan bu lezzetli atıştırmalık, egzersiz sonrası ödülünüz olmaya aday!',
    image: '/images/recipe11.webp',
    time: '25 dk',
    prepTime: '15 dk',
    cookTime: '10 dk',
    serves: '1',
    totalTime: '25 dk',
    ingredientsLeft: [
      '1 porsiyon (50 g) Herbalife24® RB ProMax',
      '1 yumurta',
      '2 yumurta akı',
      '2 çay kaşığı pudra şekeri',
    ],
    ingredientsRight: [
      '2 yemek kaşığı kakao tozu',
      '3 yemek kaşığı az yağlı yoğurt (servis için)',
      '80 gr taze çilek (servis için)',
    ],
    tip: 'Fondanların ortası hafif cıvık kalmalı. Aksi takdirde kek gibi olur ve fondan özelliğini kaybeder.',
    instructions: [
      {
        title: 'Fırın ve Kalıp Hazırlığı',
        items: [
          'Fırını 180°C (fanlı 160°C) dereceye ısıt.',
          '3 küçük kek kalıbını (ramekin) yağla.',
        ],
      },
      {
        title: 'Karışımı Hazırlayın',
        items: [
          'Kuru malzemeleri geniş bir kaseye eleyin.',
          'Yumurta ve yumurta aklarını ekleyin.',
          'Tüm malzemeleri çırparak yoğun bir karışım elde edin.',
        ],
      },
      {
        title: 'Pişirme',
        items: [
          'Hazırladığın karışımı kalıplara eşit şekilde dökün.',
          '8-10 dakika pişirin; dışı sertleşmiş, içi hafif akışkan kalmalı.',
        ],
      },
      {
        title: 'Servis',
        items: [
          '2 dakika dinlendirin, ardından ters çevirerek tabaklara alın.',
          'Az yağlı yoğurt ve taze çilek ile sıcak servis yapın.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Çikolatalı Mousse Cheesecake',
    desc: 'Tatlıdan vazgeçmeden formunu korumak isteyenler için ideal! Formül 1 Çikolatalı Aromalı ile hazırlanan bu mousse dokulu cheesecake, porsiyon başına sadece 182 kcal ve 8 gram protein içeriyor. Yeni yıl sofralarına hafif ama etkileyici bir dokunuş.',
    image: '/images/recipe12.jpeg',
    time: '195 dk',
    prepTime: '15 dk',
    cookTime: '180 dk',
    serves: '12',
    totalTime: '195 dk',
    ingredientsLeft: [
      '1 ölçü Herbalife Multi-fiber',
      '65 g öğütülmüş badem',
      '135 g kuru vişne',
      '2 yemek kaşığı badem yağı',
    ],
    ingredientsRight: [
      '8 ölçek Herbalife Formül 1 Çikolata Aromalı',
      '120 ml kaynar su',
      '120 ml yarım yağlı süt',
      '2 yemek kaşığı aromasız jelatin',
      '225 g çırpılmış krem peynir',
      '350 g vanilya aromalı yağsız yoğurt',
    ],
    tip: 'Üzeri dilimlenmiş çilek ya da ahududu ile süslenebilir. Servisten önce 3 saat buzdolabında bekletmeyi unutmayın.',
    instructions: [
      {
        title: 'Kalıbı Hazırla',
        items: [
          '23 cm çapında çıkarılabilir tabanlı kek kalıbını yağlayın ve kenara alın.',
        ],
      },
      {
        title: 'Tabanı Hazırlayın',
        items: [
          'Multi-fiber, badem, vişne ve badem yağını robotta karıştırın.',
          'Kalıba aktarın ve bastırarak düzleştirin. Buzdolabına koyun.',
        ],
      },
      {
        title: 'Dolgu Kısmı',
        items: [
          'Jelatini kaynar su ile eritip karıştırın.',
          'Formül 1, krem peynir, yoğurt ve sütü mikserle pürüzsüz olana kadar çırpın.',
          'Jelatini ekleyip çırpmaya devam edin.',
        ],
      },
      {
        title: 'Soğutma ve Servis',
        items: [
          'Karışımı kalıba döküp düzleştirin, üzerini örtün.',
          'Buzdolabında en az 3 saat bekletin.',
          'Servisten önce taze meyvelerle süsleyin.',
        ],
      },
    ],
  },
];

export default function RecipesRoute() {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({top: 0, behavior: 'auto'});
      navigate(location.pathname + location.search, {
        replace: true,
        state: null,
      });
    }
  }, [location.pathname, location.search, location.state, navigate]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = activeRecipe ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = prev || 'unset';
    };
  }, [activeRecipe]);

  return (
    <section className="bg-[#E4F2EA] text-[#3E7D5E] min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
        Modunu Yükselten Tarifler
      </h2>

      {/* Vite ile birebir: mt kaldırıldı */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {featuredRecipes.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              className="bg-[#eaf580] rounded-xl text-[#3E1E12] shadow-lg overflow-hidden text-left 
                         focus:outline-none focus:ring-4 focus:ring-[#3E7D5E]/30 transition transform active:scale-[0.99]"
              onClick={() => setActiveRecipe(recipe)}
              aria-label={`${recipe.title} detaylarını aç`}
            >
              {/* --- GÖRSEL alanı: sabit h-[..] kaldırıldı, aspect ratio eklendi --- */}
              <div className="overflow-hidden  rounded-t-xl">
                <img
                  loading="lazy"
                  src={recipe.image}
                  alt={recipe.title}
                  className="block w-full h-[360px] object-cover"
                  decoding="async"
                />
              </div>

              {/* --- METİN --- */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-[#FFBD39] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
                    Tarif
                  </span>
                  <span className="bg-[#FFBD39] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
                    {recipe.time}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-snug">
                  {recipe.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium mt-2 line-clamp-3 sm:line-clamp-4">
                  {recipe.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <RecipeModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(null)}
      />
    </section>
  );
}

function RecipeModal({recipe, onClose}) {
  const [isVisible, setIsVisible] = useState(false);
  const closeBtnRef = useRef(null);
  const headingId = 'recipe-heading';

  // Açılış animasyonu
  useEffect(() => {
    if (!recipe) return;
    const t = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(t);
  }, [recipe]);

  // ESC ile kapat + odak
  useEffect(() => {
    if (!recipe) return;
    const onEsc = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onEsc);
    // açıldığında Kapat butonuna odak ver
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      window.removeEventListener('keydown', onEsc);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  if (!recipe) return null;

  // Mobil: alttan; Desktop: sağdan
  const panelHidden = 'translate-y-full md:translate-y-0 md:translate-x-[110%]';
  const panelShown = 'translate-y-0 md:translate-x-0';

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      {/* Arka plan kapatıcı */}
      <button
        type="button"
        aria-label="Modalı kapat"
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 sm:bg-black/70"
      />

      {/* Panel */}
      <div
        className={`absolute right-0 bottom-0 left-0 md:left-auto md:top-0 bg-[#eaf580] text-[#3E1E12]
                    rounded-t-2xl md:rounded-xl shadow-2xl w-full md:max-w-3xl
                    h-[92vh] sm:h-[88vh] md:h-auto md:max-h-[92vh] overflow-y-auto
                    transform transition-transform duration-300 ease-out
                    ${isVisible ? panelShown : panelHidden}`}
      >
        {/* Üst şerit */}
        <div className="sticky top-0 z-10 bg-[#eaf580] border-b border-[#3E1E12]/20 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFBD39] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
              TARİF
            </span>
            <span className="bg-[#FFBD39] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
              {recipe.time}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleClose}
            className="text-2xl sm:text-3xl font-bold text-[#3E1E12]
             hover:text-[#FFBD39] transition-colors
             focus:outline-none
             focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3E1E12]"
            aria-label="Kapat"
          >
            &times;
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-6">
          <h2
            id={headingId}
            className="text-2xl sm:text-3xl font-extrabold mt-4 mb-2 pr-10"
          >
            {recipe.title}
          </h2>

          <p className="text-[#3E1E12]/90 mb-4 text-sm sm:text-base">
            {recipe.desc}
          </p>

          <div className="w-full rounded-md overflow-hidden mb-4 sm:mb-6">
            <div className="w-full aspect-[16/9] sm:aspect-[3/2]">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Breakdown */}
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase">
            Detaylar
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#3E1E12] mb-6 sm:mb-8 text-xs sm:text-sm text-center rounded-md overflow-hidden">
            <DetailItem label="Hazırlama Süresi" value={recipe.prepTime} />
            <DetailItem label="Pişirme Süresi" value={recipe.cookTime} />
            <DetailItem label="Porsiyon" value={recipe.serves} />
            <DetailItem label="Toplam Süre" value={recipe.totalTime} isLast />
          </div>

          {/* Ingredients */}
          <h3 className="text-xl sm:text-2xl font-bold mb-2 uppercase">
            Malzemeler
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-sm mb-4">
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredientsLeft.map((item) => (
                <li key={`L-${recipe.id}-${item}`}>{item}</li>
              ))}
            </ul>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredientsRight.map((item) => (
                <li key={`R-${recipe.id}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>

          {recipe.tip && (
            <div className="flex items-start gap-2 mb-6 sm:mb-8">
              <span className="text-xl sm:text-2xl" aria-hidden="true">
                💡
              </span>
              <p className="text-sm sm:text-base text-[#3E1E12]">
                {recipe.tip}
              </p>
            </div>
          )}

          {/* Instructions */}
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase">
            Talimatlar
          </h3>
          {recipe.instructions.map((step, idx) => (
            <div key={`${recipe.id}-${step.title}`} className="mb-4 sm:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#3E1E12] flex items-center justify-center font-bold text-[#3E1E12]">
                  {idx + 1}
                </div>
                <h4 className="text-base sm:text-lg font-semibold">
                  {step.title}
                </h4>
              </div>
              <ul className="list-disc list-inside text-sm sm:text-base pl-2 text-[#3E1E12]/90 space-y-1">
                {step.items.map((it) => (
                  <li key={`${step.title}-${it}`}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* keyframes (Tailwind arbitary yerine düz CSS) */}
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0.98); opacity: .8; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
function DetailItem({label, value, isLast = false}) {
  return (
    <div className={`p-2 sm:p-3 ${isLast ? '' : 'border-r border-[#3E1E12]'}`}>
      <div className="font-bold">{label}</div>
      <div>{value}</div>
    </div>
  );
}
