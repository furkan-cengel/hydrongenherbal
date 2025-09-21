// app/routes/recipes.jsx
import {useEffect, useRef, useState} from 'react';
<<<<<<< HEAD
import {useLocation, useNavigate} from 'react-router';

/**
 * /recipes sayfası: kart grid + erişilebilir modal (dialog)
 * Not: Veriyi istersen /app/data altına taşıyabiliriz; şimdilik inline.
 */
=======
import {useLocation, useNavigate, Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';

>>>>>>> 5b99f58 (improvements)
export const meta = () => [
  {title: 'Tarifler — HerbalMode'},
  {
    name: 'description',
    content: 'Pratik, besleyici ve lezzetli HerbalMode tarifleri.',
  },
];

<<<<<<< HEAD
=======
const PRODUCT_LINKS = {
  'Formül 1 Vanilyalı Aromalı': {
    handle: 'formul-1-ogun-yerine-gecen-besleyici-shake-karisimi-vanilya',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/vanilya_e2254cf9-d30c-4f4f-a86e-011ca195a1bb.webp?v=1757240598',
    price: '1.649,00'
  },
  'Formül 1 Vanilya Aromalı': {
    handle: 'formul-1-ogun-yerine-gecen-besleyici-shake-karisimi-vanilya',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/vanilya_e2254cf9-d30c-4f4f-a86e-011ca195a1bb.webp?v=1757240598',
    price: '1.649,00'
  },
  'Heartwell™': {
    handle: 'heartwell-vanilya',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/heartwell_e14efd26-5088-4bd2-baef-685979ddf5f2.webp?v=1757240615',
    price: '2.199,00'
  },
  'Formül 3 Pro-Boost': {
    handle: 'formul-3-pro-boost-notr',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/proboost_05b00773-98aa-428d-9e92-97fa08b011ec.webp?v=1757240617',
    price: '2.399,00'
  },
  'Herbalife24® RB ProMax': {
    handle: 'herbalife24-rb-promax-cikolata',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/promax_1b737198-16d2-44e0-9504-97ba7aefce02.webp?v=1757240637',
    price: '3.599,00'
  },
  'Tri Blend Select Muz Aromalı': {
    handle: 'tri-blend-select-muz',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/blend_5f3efae8-6311-40e3-ba39-c8553710161f.webp?v=1757240604',
    price: '2.999,00'
  },
  'Formül 1 Çikolata Aromalı': {
    handle: 'formul-1-ogun-yerine-gecen-besleyici-shake-karisimi-cikolata',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/cikolata_0411222a-d7a9-47dd-8913-bd8ed663ad95.webp?v=1757240600',
    price: '1.649,00'
  },
  'Herbalife Multi-fiber': {
    handle: 'multi-fiber-elma',
    image: 'https://cdn.shopify.com/s/files/1/0761/4765/4889/files/multifiber_f79d941f-8e32-4a38-8a81-8d25404156c8.png?v=1757240614',
    price: '899,00'
  },
};

>>>>>>> 5b99f58 (improvements)
const featuredRecipes = [
  {
    id: 1,
    title: 'Çıtır Fıstıklı Müsli',
<<<<<<< HEAD
    desc: 'Aromatik vanilya dokunuşuyla zenginleşen, fıstık ve tohumlarla dolu çıtır bir enerji kaynağı! Formül 1 Vanilya Aromalı ve Heartwell™ ile hazırlanan bu müsli, hem kahvaltıda hem de gün ortasında sağlıklı bir atıştırmalık olarak mükemmel bir seçim.',
=======
    desc: 'Aromatik vanilya dokunuşuyla zenginleşen, fıstık ve tohumlarla dolu çıtır bir enerji kaynağı!',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe1.webp',
    time: '45 dk',
    prepTime: '15 dk',
    cookTime: '30 dk',
<<<<<<< HEAD
    serves: '1',
    totalTime: '45 dk',
=======
    serves: '6',
    totalTime: '45 dk',
    difficulty: 'Kolay',
    category: 'breakfast',
    calories: '320',
    protein: '12g',
    carbs: '45g',
    fat: '8g',
    fiber: '6g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
=======
    relatedProducts: [
      {name: 'Formül 1 Vanilyalı Aromalı', handle: 'formul-1-vanilya', price: '249.90'},
      {name: 'Heartwell™', handle: 'heartwell', price: '189.90'},
    ],
>>>>>>> 5b99f58 (improvements)
  },
  {
    id: 2,
    title: 'Pancarlı Humus',
<<<<<<< HEAD
    desc: 'Canlı pancar rengiyle göz alıcı, lezzetiyle cezbedici! Formül 3 Pro-Boost ile zenginleştirilmiş bu pancarlı humus; protein açısından yüksek, şeker oranı düşük ve atıştırmalıklarınıza sağlıklı bir dokunuş katmak için ideal.',
=======
    desc: 'Canlı pancar rengiyle göz alıcı, lezzetiyle cezbedici! Protein açısından yüksek atıştırmalık.',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe2.webp',
    time: '20 dk',
    prepTime: '20 dk',
    cookTime: '-',
<<<<<<< HEAD
    serves: '1',
    totalTime: '20 dk',
=======
    serves: '4',
    totalTime: '20 dk',
    difficulty: 'Kolay',
    category: 'snack',
    calories: '180',
    protein: '8g',
    carbs: '22g',
    fat: '7g',
    fiber: '5g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
        items: [
          'Pancarları soyun, parçalara ayırın ve mutfak robotuna yerleştirin.',
        ],
=======
        items: ['Pancarları soyun, parçalara ayırın ve mutfak robotuna yerleştirin.'],
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
  },
  {
    id: 3,
    title: 'Kepekli Bazlama',
    desc: 'Protein ve lif açısından zengin bu yumuşacık kepekli bazlama, Heartwell™ ve Formül 3 Pro-Boost ile hazırlanıyor. Sağlıklı malzemelerle evde kolayca yapabileceğin bu bazlama, her türlü tarifin yanında enfes bir eşlikçi!',
=======
    relatedProducts: [
      {name: 'Formül 3 Pro-Boost', handle: 'formul-3-pro-boost', price: '169.90'},
    ],
  },
  {
    id: 3,
    title: 'Çilekli Kivili Shake',
    desc: 'Çilek, kivi ve portakalın ferah buluşması! Protein açısından zengin, serinletici shake.',
    image: '/images/recipe5.webp',
    time: '5 dk',
    prepTime: '5 dk',
    cookTime: '-',
    serves: '1',
    totalTime: '5 dk',
    difficulty: 'Çok Kolay',
    category: 'drink',
    calories: '220',
    protein: '15g',
    carbs: '28g',
    fat: '4g',
    fiber: '4g',
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
          "Shake'i hemen servis edin.",
          'İsteğe bağlı olarak kivi dilimleriyle süsleyin.',
        ],
      },
    ],
    relatedProducts: [
      {name: 'Formül 1 Vanilya Aromalı', handle: 'formul-1-vanilya', price: '249.90'},
    ],
  },
  {
    id: 4,
    title: 'Çikolatalı Mousse Cheesecake',
    desc: 'Tatlıdan vazgeçmeden formunu korumak isteyenler için ideal! Porsiyon başına sadece 182 kcal.',
    image: '/images/recipe12.jpeg',
    time: '195 dk',
    prepTime: '15 dk',
    cookTime: '180 dk',
    serves: '12',
    totalTime: '195 dk',
    difficulty: 'Orta',
    category: 'dessert',
    calories: '182',
    protein: '8g',
    carbs: '18g',
    fat: '9g',
    fiber: '3g',
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
        items: ['23 cm çapında çıkarılabilir tabanlı kek kalıbını yağlayın ve kenara alın.'],
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
          'Karışımı kalıba dökün düzleştirin, üzerini örtün.',
          'Buzdolabında en az 3 saat bekletin.',
          'Servisten önce taze meyvelerle süsleyin.',
        ],
      },
    ],
    relatedProducts: [
      {name: 'Formül 1 Çikolata Aromalı', handle: 'formul-1-cikolata', price: '249.90'},
      {name: 'Herbalife Multi-fiber', handle: 'multi-fiber', price: '149.90'},
    ],
  },
  {
    id: 5,
    title: 'Kepekli Bazlama',
    desc: 'Protein ve lif açısından zengin bu yumuşacık kepekli bazlama, sağlıklı malzemelerle evde kolayca yapılabilir.',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe3.webp',
    time: '60 dk',
    prepTime: '45 dk',
    cookTime: '15 dk',
    serves: '6',
    totalTime: '60 dk',
<<<<<<< HEAD
=======
    difficulty: 'Kolay',
    category: 'breakfast',
    calories: '150',
    protein: '6g',
    carbs: '24g',
    fat: '4g',
    fiber: '4g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: 'Bazlamaları sıcakken temiz bir bezle sararsanız yumuşak kalmasını sağlarsınız. Dilerseniz taze otlar ya da sarımsaklı soslarla da lezzetlendirebilirsiniz.',
=======
    tip: 'Bazlamaları sıcakken temiz bir bezle sararsanız yumuşak kalmasını sağlarsınız.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
  },
  {
    id: 4,
    title: 'Hızlı Bezelye ve Nane Çorbası',
    desc: 'Ferahlatıcı nane ve bezelyenin mükemmel uyumu! Formül 1 Vanilya Aromalı ve Pro-Boost ile zenginleştirilen bu iç açıcı çorba, sadece 15 dakikada hazırlanıyor ve günün her saati için hafif ama besleyici bir seçenek sunuyor.',
=======
    relatedProducts: [
      {name: 'Heartwell™', handle: 'heartwell', price: '189.90'},
      {name: 'Formül 3 Pro-Boost', handle: 'formul-3-pro-boost', price: '169.90'},
    ],
  },
  {
    id: 6,
    title: 'Hızlı Bezelye ve Nane Çorbası',
    desc: 'Ferahlatıcı nane ve bezelyenin mükemmel uyumu! Sadece 15 dakikada hazır.',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe4.webp',
    time: '15 dk',
    prepTime: '15 dk',
    cookTime: '-',
    serves: '4',
    totalTime: '15 dk',
<<<<<<< HEAD
=======
    difficulty: 'Çok Kolay',
    category: 'soup',
    calories: '120',
    protein: '7g',
    carbs: '18g',
    fat: '3g',
    fiber: '4g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: 'Bu çorba nane yerine kişniş ve doğranmış yeşil biberle de hazırlanabilir. Soğuk yaz günlerinde soğuk olarak da servis edilebilir.',
=======
    tip: 'Bu çorba nane yerine kişniş ve doğranmış yeşil biberle de hazırlanabilir.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
          'Formül 1 Vanilya Aromalı ve Formül 3 Pro-Boost’u ilave edin.',
=======
          'Formül 1 Vanilya Aromalı ve Formül 3 Pro-Boost\'u ilave edin.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
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
=======
    relatedProducts: [
      {name: 'Formül 1 Vanilya Aromalı', handle: 'formul-1-vanilya', price: '249.90'},
      {name: 'Formül 3 Pro-Boost', handle: 'formul-3-pro-boost', price: '169.90'},
    ],
  },
  {
    id: 7,
    title: 'Belçika Usulü Enerji Waffle',
    desc: 'Çikolata lezzetiyle buluşan protein dolu bir hafta sonu keyfi!',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe6.webp',
    time: '22 dk',
    prepTime: '12 dk',
    cookTime: '10 dk',
    serves: '3',
    totalTime: '22 dk',
<<<<<<< HEAD
=======
    difficulty: 'Kolay',
    category: 'breakfast',
    calories: '240',
    protein: '18g',
    carbs: '28g',
    fat: '6g',
    fiber: '2g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: "Waffle'ları taze meyveler, yoğurt ya da az miktarda bal ile süsleyerek protein dengesini koruyabilir ve sunumunuzu zenginleştirebilirsiniz.",
=======
    tip: 'Waffle\'ları taze meyveler, yoğurt ya da az miktarda bal ile süsleyebilirsiniz.',
>>>>>>> 5b99f58 (improvements)
    instructions: [
      {
        title: 'Hamuru Hazırlayın',
        items: [
          'Bir kapta yumurta, süt, Herbalife24® RB ProMax, un, yağ ve kabartma tozunu birleştirin.',
          'Pürüzsüz kıvam alana kadar karıştırın.',
        ],
      },
      {
<<<<<<< HEAD
        title: 'Waffle’ları Pişirin',
=======
        title: 'Waffle\'ları Pişirin',
>>>>>>> 5b99f58 (improvements)
        items: [
          'Waffle makinesini önceden ısıtın.',
          'Hamuru makineye dökün ve 2-3 dakika ya da dışı çıtır olana kadar pişirin.',
        ],
      },
      {
        title: 'Servis',
        items: [
<<<<<<< HEAD
          "Sıcak waffle'ları taze çilek ve sevdiğiniz diğer malzemelerle servis edin.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Muzlu Fındıklı Chia Shake',
    desc: 'Kremsi dokusu, yüksek lif ve bitki bazlı protein içeriğiyle dengeli bir içecek arayanlar için birebir! Tri Blend Select Muz Aromalı ile hazırlanan bu shake, vegan beslenenler için mükemmel bir seçenek.',
=======
          'Sıcak waffle\'ları taze çilek ve sevdiğiniz diğer malzemelerle servis edin.',
        ],
      },
    ],
    relatedProducts: [
      {name: 'Herbalife24® RB ProMax', handle: 'herbalife24-rb-promax', price: '299.90'},
    ],
  },
  {
    id: 8,
    title: 'Muzlu Fındıklı Chia Shake',
    desc: 'Kremsi dokusu, yüksek lif ve bitki bazlı protein içeriğiyle dengeli bir içecek!',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe7.webp',
    time: '5 dk',
    prepTime: '5 dk',
    cookTime: '-',
    serves: '1',
    totalTime: '5 dk',
<<<<<<< HEAD
=======
    difficulty: 'Çok Kolay',
    category: 'drink',
    calories: '280',
    protein: '12g',
    carbs: '35g',
    fat: '8g',
    fiber: '7g',
>>>>>>> 5b99f58 (improvements)
    ingredientsLeft: [
      '1 ölçek (40 g) Tri Blend Select Muz Aromalı',
      '250 ml su',
      '1 adet muz',
    ],
    ingredientsRight: [
      '½ yemek kaşığı chia tohumu',
      '½ yemek kaşığı fındık ezmesi',
    ],
<<<<<<< HEAD
    tip: 'Shake’i önceden hazırlayıp 10 dakika buzdolabında bekletirsen chia tohumları hafifçe şişer, kıvamı daha yoğun olur. Buz ilavesiyle serinletici etki artırılabilir.',
=======
    tip: 'Shake\'i önceden hazırlayıp 10 dakika buzdolabında bekletirsen chia tohumları hafifçe şişer.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
          'Shake’i uzun bir bardakta servis edin.',
=======
          'Shake\'i uzun bir bardakta servis edin.',
>>>>>>> 5b99f58 (improvements)
          'İsteğe bağlı olarak üzerine muz dilimleri veya chia serpebilirsiniz.',
        ],
      },
    ],
<<<<<<< HEAD
  },
  {
    id: 8,
    title: 'Enerji Topları',
    desc: 'Dakikalar içinde hazırlanan bu mini enerji topları, hareketli günlerde sana sağlıklı bir destek sunar. Herbalife24® RB ProMax ile yapılan bu lezzetli atıştırmalıklar, ekstra protein ve yoğun çikolata tadıyla enerji dolu bir mola vaat ediyor.',
=======
    relatedProducts: [
      {name: 'Tri Blend Select Muz Aromalı', handle: 'tri-blend-select-muz', price: '269.90'},
    ],
  },
  {
    id: 9,
    title: 'Enerji Topları',
    desc: 'Dakikalar içinde hazırlanan mini enerji topları, hareketli günlerde sana sağlıklı bir destek sunar.',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe8.webp',
    time: '75 dk',
    prepTime: '15 dk',
    cookTime: '60 dk',
    serves: '20',
    totalTime: '75 dk',
<<<<<<< HEAD
=======
    difficulty: 'Kolay',
    category: 'snack',
    calories: '85',
    protein: '4g',
    carbs: '10g',
    fat: '3g',
    fiber: '2g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: 'Vegan bir versiyon için Herbalife24® RB ProMax yerine 2 ölçek Formül 1 Çikolata Aromalı kullanabilir, bal yerine agave veya akçaağaç şurubu tercih edebilirsiniz.',
=======
    tip: 'Vegan bir versiyon için bal yerine agave veya akçaağaç şurubu tercih edebilirsiniz.',
>>>>>>> 5b99f58 (improvements)
    instructions: [
      {
        title: 'Kuru Malzemeleri Hazırlayın',
        items: [
<<<<<<< HEAD
          'Yulaf gevreğini blender’da ince hale gelene kadar çekin.',
=======
          'Yulaf gevreğini blender\'da ince hale gelene kadar çekin.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
  },
  {
    id: 9,
    title: 'Kremalı Mantar Çorbası',
    desc: 'Yoğun günlerde kurtarıcı bir kase lezzet! Formül 3 Pro-Boost ile zenginleştirilen bu kremalı mantar çorbası; doyurucu, besleyici ve önceden hazırlayıp dondurabileceğin pratik bir öğün alternatifi.',
=======
    relatedProducts: [
      {name: 'Herbalife24® RB ProMax', handle: 'herbalife24-rb-promax', price: '299.90'},
    ],
  },
  {
    id: 10,
    title: 'Kremalı Mantar Çorbası',
    desc: 'Yoğun günlerde kurtarıcı bir kase lezzet! Doyurucu, besleyici ve pratik bir öğün alternatifi.',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe9.webp',
    time: '45 dk',
    prepTime: '15 dk',
    cookTime: '30 dk',
<<<<<<< HEAD
    serves: '1',
    totalTime: '45 dk',
=======
    serves: '4',
    totalTime: '45 dk',
    difficulty: 'Kolay',
    category: 'soup',
    calories: '140',
    protein: '6g',
    carbs: '16g',
    fat: '5g',
    fiber: '3g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: 'Bu çorbayı önceden hazırlayıp porsiyonlayarak dondurabilirsiniz. Isıttığınızda taze çekilmiş karabiberle lezzetini artırabilirsiniz.',
=======
    tip: 'Bu çorbayı önceden hazırlayıp porsiyonlayarak dondurabilirsiniz.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
  },
  {
    id: 10,
    title: 'Muzlu Yulaflı Vegan Kurabiye',
    desc: 'Bitki bazlı, hafif ve besleyici! Tri Blend Select Muz Aromalı ile hazırlanan bu yumuşacık vegan kurabiyeler, hem lif hem de protein kaynağı olarak tatlı isteğinizi suçluluk duymadan karşılar.',
=======
    relatedProducts: [
      {name: 'Formül 3 Pro-Boost', handle: 'formul-3-pro-boost', price: '169.90'},
    ],
  },
  {
    id: 11,
    title: 'Muzlu Yulaflı Vegan Kurabiye',
    desc: 'Bitki bazlı, hafif ve besleyici! Hem lif hem de protein kaynağı vegan kurabiyeler.',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe10.webp',
    time: '40 dk',
    prepTime: '15 dk',
    cookTime: '25 dk',
    serves: '8',
    totalTime: '40 dk',
<<<<<<< HEAD
=======
    difficulty: 'Kolay',
    category: 'dessert',
    calories: '95',
    protein: '3g',
    carbs: '14g',
    fat: '3g',
    fiber: '2g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: 'Kurabiyeler oda sıcaklığına geldikten sonra hava almayan bir kapta 2-3 gün boyunca saklanabilir. Yanına badem sütüyle servis edebilirsin!',
=======
    tip: 'Kurabiyeler oda sıcaklığına geldikten sonra hava almayan bir kapta 2-3 gün saklanabilir.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
          'Hamurdan 1/8’lik parçalar alıp tepsiye koyun ve 8 cm çapında yayın.',
=======
          'Hamurdan 1/8\'lik parçalar alıp tepsiye koyun ve 8 cm çapında yayın.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
  },
  {
    id: 11,
    title: 'Çikolatalı Fondan',
    desc: 'Yoğun çikolata tadı, yumuşak iç dokusu ve yüksek protein içeriğiyle bu fondanlar tatlı krizlerine sağlıklı bir çözüm sunar. Herbalife24® RB ProMax ile hazırlanan bu lezzetli atıştırmalık, egzersiz sonrası ödülünüz olmaya aday!',
=======
    relatedProducts: [
      {name: 'Tri Blend Select Muz Aromalı', handle: 'tri-blend-select-muz', price: '269.90'},
    ],
  },
  {
    id: 12,
    title: 'Çikolatalı Fondan',
    desc: 'Yoğun çikolata tadı, yumuşak iç dokusu ve yüksek protein içeriğiyle tatlı krizlerine sağlıklı çözüm!',
>>>>>>> 5b99f58 (improvements)
    image: '/images/recipe11.webp',
    time: '25 dk',
    prepTime: '15 dk',
    cookTime: '10 dk',
<<<<<<< HEAD
    serves: '1',
    totalTime: '25 dk',
=======
    serves: '3',
    totalTime: '25 dk',
    difficulty: 'Orta',
    category: 'dessert',
    calories: '165',
    protein: '14g',
    carbs: '18g',
    fat: '5g',
    fiber: '2g',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
    tip: 'Fondanların ortası hafif cıvık kalmalı. Aksi takdirde kek gibi olur ve fondan özelliğini kaybeder.',
=======
    tip: 'Fondanların ortası hafif cıvık kalmalı. Aksi takdirde kek gibi olur.',
>>>>>>> 5b99f58 (improvements)
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
<<<<<<< HEAD
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
=======
    relatedProducts: [
      {name: 'Herbalife24® RB ProMax', handle: 'herbalife24-rb-promax', price: '299.90'},
>>>>>>> 5b99f58 (improvements)
    ],
  },
];

<<<<<<< HEAD
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
=======
// Filter categories
const CATEGORIES = [
  {id: 'all', label: 'Tümü', icon: '🍽️'},
  {id: 'breakfast', label: 'Kahvaltı', icon: '🥞'},
  {id: 'snack', label: 'Atıştırmalık', icon: '🥨'},
  {id: 'drink', label: 'İçecek', icon: '🥤'},
  {id: 'dessert', label: 'Tatlı', icon: '🍰'},
  {id: 'soup', label: 'Çorba', icon: '🍲'},
];

export default function RecipesRoute() {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Filter recipes based on category and search
  const filteredRecipes = featuredRecipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || 
      recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
>>>>>>> 5b99f58 (improvements)

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = activeRecipe ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = prev || 'unset';
    };
  }, [activeRecipe]);

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f7fbd1]/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#E4F2EA] to-[#f7fbd1] pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3E7D5E]/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3E7D5E] mb-4">
              Sağlıklı Tarifler
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Herbalife ürünleriyle hazırlayabileceğiniz lezzetli ve besleyici tarifler
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tarif ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3E7D5E]/50"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200 whitespace-nowrap
                  ${activeCategory === cat.id
                    ? 'bg-[#3E7D5E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-600">
          {filteredRecipes.length} tarif bulundu
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setActiveRecipe(recipe)}
            />
>>>>>>> 5b99f58 (improvements)
          ))}
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(null)}
      />
    </div>
  );
}

function RecipeCard({recipe, onClick}) {
  const categoryLabels = {
    breakfast: 'Kahvaltı',
    snack: 'Atıştırmalık', 
    drink: 'İçecek',
    dessert: 'Tatlı',
    soup: 'Çorba'
  };

  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur text-[#3E7D5E] text-xs font-semibold px-3 py-1 rounded-full">
            {categoryLabels[recipe.category] || 'Tarif'}
          </span>
        </div>
        
        {/* Time Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/50 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
            ⏱ {recipe.time}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#3E7D5E] transition-colors">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {recipe.desc}
        </p>
        
        {/* Quick Info */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {recipe.serves} kişilik
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {recipe.difficulty || 'Orta'}
          </span>
          {recipe.calories && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {recipe.calories} kcal
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ProductTooltip({ product, isVisible, position }) {
  if (!isVisible || !product) return null;

  return (
    <div 
      className="absolute z-[60] bg-white rounded-lg shadow-2xl border border-gray-200 p-3 w-64 pointer-events-none transition-all duration-200"
      style={{
        bottom: position.bottom,
        left: position.left,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      <div className="flex gap-3">
        <div className="w-20 h-20 bg-gradient-to-br from-[#f7fbd1] to-[#E4F2EA] rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[#3E7D5E]"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></div>';
            }}
          />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
          <p className="text-xs text-gray-500 mb-2">Herbalife Nutrition</p>
          <div className="text-lg font-bold text-[#3E7D5E]">₺{product.price}</div>
        </div>
      </div>
    </div>
  );
}

// RecipeDetailModal Component - Düzeltilmiş versiyon
function RecipeDetailModal({recipe, onClose}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ bottom: 0, left: 0 });
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipe) return;
    const t = setTimeout(() => setIsVisible(true), 10);
    
    // Check if recipe is in favorites
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setIsFavorite(favorites.includes(recipe.id));
    
    return () => clearTimeout(t);
  }, [recipe]);

>>>>>>> 5b99f58 (improvements)
  useEffect(() => {
    if (!recipe) return;
    const onEsc = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onEsc);
<<<<<<< HEAD
    // açıldığında Kapat butonuna odak ver
=======
>>>>>>> 5b99f58 (improvements)
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      window.removeEventListener('keydown', onEsc);
      clearTimeout(t);
    };
<<<<<<< HEAD
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

=======
  }, [recipe]);
 const handleProductHover = (product, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const parentRect = event.currentTarget.closest('.overflow-y-auto').getBoundingClientRect();
    
    setTooltipPosition({
      bottom: parentRect.bottom - rect.top + 10,
      left: Math.max(10, Math.min(rect.left - parentRect.left, parentRect.width - 280)),
    });
    setHoveredProduct(product);
  };

  const handleProductLeave = () => {
    setHoveredProduct(null);
  };

  const handleProductClick = (productHandle) => {
    handleClose();
    setTimeout(() => {
      window.location.href = `/products/${productHandle}`;
    }, 300);
  };
>>>>>>> 5b99f58 (improvements)
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

<<<<<<< HEAD
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
=======
  const handlePrint = () => {
    window.print();
  };



  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(id => id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const shareViaWhatsApp = () => {
    const text = `${recipe.title} tarifi: ${recipe.desc}\n\nDetaylar için: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `HerbalMode Tarif: ${recipe.title}`;
    const body = `Merhaba,\n\nSize ${recipe.title} tarifini paylaşmak istiyorum.\n\n${recipe.desc}\n\nMalzemeler:\n${recipe.ingredientsLeft.join('\n')}\n${recipe.ingredientsRight.join('\n')}\n\nDetaylı tarif için: ${window.location.href}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  if (!recipe) return null;

  // Extract Herbalife products from ingredients
 const herbaProducts = recipe.ingredientsLeft
    .concat(recipe.ingredientsRight)
    .filter(ing => Object.keys(PRODUCT_LINKS).some(product => ing.includes(product)))
    .map(ing => {
      const productName = Object.keys(PRODUCT_LINKS).find(product => ing.includes(product));
      const productData = PRODUCT_LINKS[productName];
      return {
        name: productName,
        handle: productData.handle,
        image: productData.image,
        price: productData.price,
        fullIngredient: ing,
      };
    });

  const categoryLabels = {
    breakfast: 'Kahvaltı',
    snack: 'Atıştırmalık', 
    drink: 'İçecek',
    dessert: 'Tatlı',
    soup: 'Çorba'
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
>>>>>>> 5b99f58 (improvements)
      />

      {/* Panel */}
      <div
<<<<<<< HEAD
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
=======
        className={`absolute right-0 top-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl
                    transform transition-transform duration-300 ease-out overflow-y-auto
                    ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
          <ProductTooltip 
          product={hoveredProduct}
          isVisible={!!hoveredProduct}
          position={tooltipPosition}
        />
        {/* Header with Image */}
        <div className="relative">
          <div className="aspect-video relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Close Button */}
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {categoryLabels[recipe.category] || 'Tarif'}
                </span>
                <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ⏱ {recipe.time}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-white/90 text-sm">{recipe.desc}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 p-6 bg-gradient-to-b from-[#f7fbd1] to-white">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.prepTime}</div>
            <div className="text-xs text-gray-600">Hazırlık</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.cookTime || '-'}</div>
            <div className="text-xs text-gray-600">Pişirme</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.serves}</div>
            <div className="text-xs text-gray-600">Porsiyon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.calories || '250'}</div>
            <div className="text-xs text-gray-600">Kalori</div>
          </div>
        </div>

        {/* Herbalife Products Section - DÜZELTME: onClick eklendi */}
        {herbaProducts.length > 0 && (
          <div className="px-6 py-4 bg-gradient-to-r from-[#E4F2EA] to-[#f7fbd1]">
            <h3 className="text-sm font-bold text-[#3E7D5E] mb-3">Bu Tarifte Kullanılan Herbalife Ürünleri</h3>
            <div className="flex flex-wrap gap-2">
              {herbaProducts.map((product, index) => (
                <button
                  key={index}
                  onClick={() => handleProductClick(product.handle)}
                  onMouseEnter={(e) => handleProductHover(product, e)}
                  onMouseLeave={handleProductLeave}
                  className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg text-sm font-medium text-[#3E7D5E] hover:bg-[#3E7D5E] hover:text-white transition-colors group relative"
                >
                  <span>{product.name}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="px-6 flex gap-6">
            {[
              {id: 'ingredients', label: 'Malzemeler'},
              {id: 'instructions', label: 'Yapılışı'},
              {id: 'nutrition', label: 'Besin Değerleri'},
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#3E7D5E] border-[#3E7D5E]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Ana Malzemeler</h4>
                  <ul className="space-y-2">
                    {recipe.ingredientsLeft.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#3E7D5E] mt-1">•</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Ek Malzemeler</h4>
                  <ul className="space-y-2">
                    {recipe.ingredientsRight.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#3E7D5E] mt-1">•</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {recipe.tip && (
                <div className="mt-6 p-4 bg-[#f7fbd1] rounded-xl">
                  <div className="flex gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-semibold text-[#3E7D5E] mb-1">İpucu</h4>
                      <p className="text-sm text-gray-700">{recipe.tip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3E7D5E] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <ul className="space-y-1">
                      {step.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.calories || '250'}</div>
                  <div className="text-sm text-gray-600">Kalori</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.protein || '15g'}</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.carbs || '22g'}</div>
                  <div className="text-sm text-gray-600">Karbonhidrat</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.fat || '8g'}</div>
                  <div className="text-sm text-gray-600">Yağ</div>
                </div>
              </div>
              {recipe.fiber && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#3E7D5E]">{recipe.fiber}</div>
                  <div className="text-sm text-gray-600">Lif</div>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-4">
                * Besin değerleri 1 porsiyon için hesaplanmıştır ve yaklaşık değerlerdir.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Action Buttons - DÜZELTME: Yeni butonlar eklendi */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex-1 bg-[#3E7D5E] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#2a5a3f] transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Tarifi Yazdır
            </button>
            
            {/* Favorite Button */}
            <button 
              onClick={toggleFavorite}
              className={`p-3 border-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'border-red-500 text-red-500 bg-red-50' 
                  : 'border-gray-300 hover:border-[#3E7D5E] hover:text-[#3E7D5E]'
              }`}
              aria-label="Favorilere ekle"
            >
              <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            {/* Share Dropdown */}
            <div className="relative group">
              <button className="p-3 border-2 border-gray-300 rounded-full hover:border-[#3E7D5E] hover:text-[#3E7D5E] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              
              {/* Share Menu */}
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                  <button
                    onClick={shareViaWhatsApp}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={shareViaEmail}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    E-posta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 5b99f58 (improvements)
