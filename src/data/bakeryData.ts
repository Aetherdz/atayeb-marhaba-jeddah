export type Language = 'ar' | 'en';

export type PageId = 'home' | 'products' | 'gallery' | 'branches' | 'contact';

export type ProductCategory = 'all' | 'savory' | 'sweets' | 'seasonal';

export type GalleryCategory = 'all' | 'savory' | 'sweets';

export type BranchRoadFilter =
  | 'all'
  | 'prince-sultan'
  | 'king-abdulaziz'
  | 'prince-mohammed';

export interface BakeryPhoto {
  id: string;
  url: string;
  category: Exclude<GalleryCategory, 'all'>;
  title: Record<Language, string>;
  caption: Record<Language, string>;
  productId: string;
}

export interface FeaturedProduct {
  id: string;
  category: Exclude<ProductCategory, 'all'>;
  imageUrl: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  varieties?: Record<Language, string[]>;
}

export interface AdditionalProduct {
  id: string;
  category: Exclude<ProductCategory, 'all'>;
  name: Record<Language, string>;
  description: Record<Language, string>;
}

export interface StoreQuote {
  id: string;
  text: Record<Language, string>;
  context: Record<Language, string>;
  postUrl: string;
}

export interface JeddahBranch {
  id: string;
  address: string;
  district: Record<Language, string>;
  roadKey: Exclude<BranchRoadFilter, 'all'>;
  road: Record<Language, string>;
}

export interface CategoryPhotoCard {
  id: string;
  title: Record<Language, string>;
  imageUrl: string;
  targetCategory: ProductCategory;
}

export interface FaqItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface MankoushehVariety {
  id: string;
  label: Record<Language, string>;
}

export const INSTAGRAM_URL = 'https://www.instagram.com/atayeb_marhaba/';

export const DELIVERY_APPS = [
  'Ninja',
  'Hungerstation',
  'Keeta',
  'Jahez',
  'Noon',
] as const;

export const JEDDAH_BRANCHES: readonly JeddahBranch[] = [
  {
    id: 'al-rawdah',
    address: '2330 Prince Sultan Rd, Al Rawdah, Jeddah 23435, Saudi Arabia',
    district: { ar: 'الروضة', en: 'Al Rawdah' },
    roadKey: 'prince-sultan',
    road: { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
  },
  {
    id: 'al-marwah',
    address: 'Prince Mohammed Bin Abdulaziz St, Al Marwah, Jeddah 23543',
    district: { ar: 'المروة', en: 'Al Marwah' },
    roadKey: 'prince-mohammed',
    road: {
      ar: 'شارع الأمير محمد بن عبدالعزيز',
      en: 'Prince Mohammed Bin Abdulaziz St',
    },
  },
  {
    id: 'al-khalidiyyah',
    address: 'Prince Sultan Rd, Al Khalidiyyah, Jeddah 23422',
    district: { ar: 'الخالدية', en: 'Al Khalidiyyah' },
    roadKey: 'prince-sultan',
    road: { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
  },
  {
    id: 'al-hamra',
    address: 'King Abdulaziz Rd, Al Hamra, Jeddah 23321',
    district: { ar: 'الحمراء', en: 'Al Hamra' },
    roadKey: 'king-abdulaziz',
    road: { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
  },
  {
    id: 'al-salamah',
    address: 'King Abdulaziz Rd, Al-Salamah, Jeddah 23525',
    district: { ar: 'السلامة', en: 'Al-Salamah' },
    roadKey: 'king-abdulaziz',
    road: { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
  },
  {
    id: 'al-safa',
    address: 'Prince Sultan Rd, Al Safa, Jeddah 23453',
    district: { ar: 'الصفا', en: 'Al Safa' },
    roadKey: 'prince-sultan',
    road: { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
  },
  {
    id: 'abhur-al-janubiyah',
    address: 'King Abdulaziz Rd, Abhur Al Janubiyah, Jeddah 23731',
    district: { ar: 'أبحر الجنوبية', en: 'Abhur Al Janubiyah' },
    roadKey: 'king-abdulaziz',
    road: { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
  },
] as const;

export const JEDDAH_BRANCH_ADDRESSES: readonly string[] = JEDDAH_BRANCHES.map(
  (b) => b.address
);

export function getGoogleMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const MANKOUSHEH_VARIETIES: readonly MankoushehVariety[] = [
  { id: 'zaatar', label: { ar: 'زعتر', en: 'Za’atar' } },
  { id: 'meat', label: { ar: 'لحم', en: 'Meat' } },
  { id: 'cheese', label: { ar: 'جبنة', en: 'Cheese' } },
  { id: 'lahm-bi-ajeen', label: { ar: 'لحم بعجين', en: 'Lahm bi Ajeen' } },
] as const;

export const PHOTOS: readonly BakeryPhoto[] = [
  {
    id: 'tiramisu',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/DgDdvfuu1hK/media/?size=l&output=jpg',
    category: 'sweets',
    title: {
      ar: 'تيراميسو',
      en: 'Tiramisu',
    },
    caption: {
      ar: 'طبقات من اللطافة المغموسة بنكهة القهوة الفاخرة والكاكاو المر',
      en: 'Delicate layers steeped in fine coffee and rich bitter cocoa',
    },
    productId: 'tiramisu',
  },
  {
    id: 'loqmah-box',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/DgC9YvRODHs/media/?size=l&output=jpg',
    category: 'savory',
    title: {
      ar: 'بوكس اللقمة',
      en: 'Loqmah Box',
    },
    caption: {
      ar: 'بوكس مناقيش صغيرة متنوعة تختار أصنافها على ذوقك',
      en: 'An assorted mini mankousheh box with your choice of varieties',
    },
    productId: 'loqmah-box',
  },
  {
    id: 'lahm-bi-ajeen',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/DgBfYoDt48i/media/?size=l&output=jpg',
    category: 'savory',
    title: {
      ar: 'منقوشة اللحم بعجين',
      en: 'Lahm bi Ajeen Mankousheh',
    },
    caption: {
      ar: 'أصل المنقوشة — زعتر، لحم، جبنة، ولحم بعجين',
      en: 'The origin of mankousheh — za’atar, meat, cheese, and lahm bi ajeen',
    },
    productId: 'mankousheh',
  },
  {
    id: 'five-cakes',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/DgAyj3JurXW/media/?size=l&output=jpg',
    category: 'sweets',
    title: {
      ar: 'كيك أنيق',
      en: 'Elegant Cakes',
    },
    caption: {
      ar: 'كيكة بلاك فورست، كيكة وايت فورست، كيكة فيريرو روشيه، كيكة الجزر، وكيكة الفراولة',
      en: 'Black Forest, White Forest, Ferrero Rocher, Carrot, and Strawberry cakes',
    },
    productId: 'elegant-cakes',
  },
  {
    id: 'sourdough',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Df9rjv3Optx/media/?size=l&output=jpg',
    category: 'savory',
    title: {
      ar: 'خبز الساوردو بالبذور',
      en: 'Seeded Sourdough Bread',
    },
    caption: {
      ar: 'خبز الساوردو بالبذور',
      en: 'Seeded sourdough bread',
    },
    productId: 'sourdough',
  },
  {
    id: 'baton-sale',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Df8FsHHurVV/media/?size=l&output=jpg',
    category: 'savory',
    title: {
      ar: 'باتون ساليه',
      en: 'Baton Salé',
    },
    caption: {
      ar: 'بنكهات سمسم وحبة البركة وكمون وسماق',
      en: 'Flavored with sesame, black seed, cumin, and sumac',
    },
    productId: 'baton-sale',
  },
] as const;

export const FEATURED_PRODUCTS: readonly FeaturedProduct[] = [
  {
    id: 'tiramisu',
    category: 'sweets',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgDdvfuu1hK/media/?size=l&output=jpg',
    name: {
      ar: 'تيراميسو',
      en: 'Tiramisu',
    },
    description: {
      ar: 'طبقات من اللطافة المغموسة بنكهة القهوة الفاخرة والكاكاو المر.',
      en: 'Delicate layers steeped in fine coffee flavor and bitter cocoa.',
    },
    varieties: {
      ar: ['حلويات منوعة'],
      en: ['Assorted Sweets'],
    },
  },
  {
    id: 'loqmah-box',
    category: 'savory',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgC9YvRODHs/media/?size=l&output=jpg',
    name: {
      ar: 'بوكس اللقمة',
      en: 'Loqmah Box',
    },
    description: {
      ar: 'بوكس مناقيش صغيرة متنوعة تختار أصنافها على ذوقك.',
      en: 'An assorted mini mankousheh box where you choose the varieties to your taste.',
    },
    varieties: {
      ar: ['زعتر', 'لحم', 'جبنة', 'لحم بعجين'],
      en: ['Za’atar', 'Meat', 'Cheese', 'Lahm bi Ajeen'],
    },
  },
  {
    id: 'mankousheh',
    category: 'savory',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgBfYoDt48i/media/?size=l&output=jpg',
    name: {
      ar: 'مناقيش',
      en: 'Mankousheh',
    },
    description: {
      ar: 'أصل المنقوشة بتشكيلة من الأصناف المختارة بعناية.',
      en: 'The origin of mankousheh in carefully crafted varieties.',
    },
    varieties: {
      ar: ['زعتر', 'لحم', 'جبنة', 'لحم بعجين'],
      en: ['Za’atar', 'Meat', 'Cheese', 'Lahm bi Ajeen'],
    },
  },
  {
    id: 'elegant-cakes',
    category: 'sweets',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgAyj3JurXW/media/?size=l&output=jpg',
    name: {
      ar: 'كيك أنيق',
      en: 'Elegant Cakes',
    },
    description: {
      ar: 'تشكيلة كيك أنيق وحلويات منوعة.',
      en: 'A curated selection of elegant cakes.',
    },
    varieties: {
      ar: [
        'كيكة بلاك فورست',
        'كيكة وايت فورست',
        'كيكة فيريرو روشيه',
        'كيكة الجزر',
        'كيكة الفراولة',
      ],
      en: [
        'Black Forest Cake',
        'White Forest Cake',
        'Ferrero Rocher Cake',
        'Carrot Cake',
        'Strawberry Cake',
      ],
    },
  },
  {
    id: 'sourdough',
    category: 'savory',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/Df9rjv3Optx/media/?size=l&output=jpg',
    name: {
      ar: 'خبز الساوردو بالبذور',
      en: 'Seeded Sourdough Bread',
    },
    description: {
      ar: 'خبز الساوردو بالبذور من أصناف المخبز.',
      en: 'Seeded sourdough bread from our bakery selection.',
    },
  },
  {
    id: 'baton-sale',
    category: 'savory',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/Df8FsHHurVV/media/?size=l&output=jpg',
    name: {
      ar: 'باتون ساليه',
      en: 'Baton Salé',
    },
    description: {
      ar: 'أصابع باتون ساليه مقرمشة بنكهات متنوعة.',
      en: 'Crisp baton salé sticks in assorted savory flavors.',
    },
    varieties: {
      ar: ['سمسم', 'حبة البركة', 'كمون', 'سماق'],
      en: ['Sesame', 'Black Seed', 'Cumin', 'Sumac'],
    },
  },
] as const;

export const ADDITIONAL_PRODUCTS: readonly AdditionalProduct[] = [
  {
    id: 'pastries',
    category: 'savory',
    name: {
      ar: 'معجنات',
      en: 'Pastries',
    },
    description: {
      ar: 'معجنات مختارة بعناية.',
      en: 'Carefully selected pastries.',
    },
  },
  {
    id: 'raqaq-marhaba',
    category: 'savory',
    name: {
      ar: 'رقاق مرحبا',
      en: 'Raqaq Marhaba',
    },
    description: {
      ar: 'من أصناف اطايب مرحبا.',
      en: 'A signature specialty from Atayeb Marhaba.',
    },
  },
  {
    id: 'ramadan-items',
    category: 'seasonal',
    name: {
      ar: 'أصناف رمضان',
      en: 'Ramadan Specialties',
    },
    description: {
      ar: 'أصناف رمضان المتنوعة من اطايب مرحبا.',
      en: 'Ramadan specialties from Atayeb Marhaba.',
    },
  },
] as const;

export const STORE_QUOTES: readonly StoreQuote[] = [
  {
    id: 'tiramisu-quote',
    text: {
      ar: '«التيراميسو عندنا حكاية ثانية.. طبقات من اللطافة المغموسة بنكهة القهوة الفاخرة والكاكاو المر»',
      en: '“Our Tiramisu is another story.. delicate layers steeped in fine coffee flavor and bitter cocoa”',
    },
    context: {
      ar: 'تيراميسو',
      en: 'Tiramisu',
    },
    postUrl: 'https://www.instagram.com/p/DgDdvfuu1hK/',
  },
  {
    id: 'box-quote',
    text: {
      ar: '«لو البوكس على ذوقك.. إيش تختار فيه؟»',
      en: '“If the box were made to your taste.. what would you pick inside?”',
    },
    context: {
      ar: 'بوكس اللقمة',
      en: 'Loqmah Box',
    },
    postUrl: 'https://www.instagram.com/p/DgC9YvRODHs/',
  },
] as const;

export const CATEGORY_PHOTO_CARDS: readonly CategoryPhotoCard[] = [
  {
    id: 'cat-mankousheh',
    title: { ar: 'مناقيش', en: 'Mankousheh' },
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgBfYoDt48i/media/?size=l&output=jpg',
    targetCategory: 'savory',
  },
  {
    id: 'cat-pastries',
    title: { ar: 'معجنات', en: 'Pastries' },
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/Df8FsHHurVV/media/?size=l&output=jpg',
    targetCategory: 'savory',
  },
  {
    id: 'cat-cakes',
    title: { ar: 'كيك', en: 'Cakes' },
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgAyj3JurXW/media/?size=l&output=jpg',
    targetCategory: 'sweets',
  },
  {
    id: 'cat-sweets',
    title: { ar: 'حلويات', en: 'Sweets' },
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgDdvfuu1hK/media/?size=l&output=jpg',
    targetCategory: 'sweets',
  },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'faq-occasion-cakes',
    question: {
      ar: 'ما أنواع الكيك الأنيق المتوفرة للمناسبات؟',
      en: 'Which elegant cakes are available for occasions?',
    },
    answer: {
      ar: 'تجد أصناف الكيك الأنيق المتوفرة مع صورها في صفحة المنتجات.',
      en: 'You can view all available elegant cakes with photos on the Products page.',
    },
  },
  {
    id: 'faq-loqmah-box',
    question: {
      ar: 'كيف أختار تشكيلة «بوكس اللقمة»؟',
      en: 'How can I choose the Loqmah Box assortment?',
    },
    answer: {
      ar: '«بوكس اللقمة» بوكس مناقيش صغيرة متنوعة تختار أصنافها على ذوقك؛ راجع تفاصيله في صفحة المنتجات.',
      en: 'The Loqmah Box is an assorted mini mankousheh box tailored to your taste; see full details on the Products page.',
    },
  },
  {
    id: 'faq-seasonal-items',
    question: {
      ar: 'هل تتوفر أصناف موسمية؟',
      en: 'Are seasonal specialties available?',
    },
    answer: {
      ar: 'نعم، تتوفر أصناف رمضان ضمن تشكيلة اطايب مرحبا في صفحة المنتجات.',
      en: 'Yes, Ramadan specialties are available within Atayeb Marhaba’s selection on the Products page.',
    },
  },
] as const;

export const UI_COPY = {
  brandFull: {
    ar: 'اطايب مرحبا | Atayeb Marhaba',
    en: 'Atayeb Marhaba | اطايب مرحبا',
  },
  brandShort: {
    ar: 'اطايب مرحبا',
    en: 'Atayeb Marhaba',
  },
  cityLabel: {
    ar: 'مخبز في جدة',
    en: 'Bakery in Jeddah',
  },
  cityFooter: {
    ar: 'جدة، المملكة العربية السعودية',
    en: 'Jeddah, Saudi Arabia',
  },
  bio: {
    ar: 'أصل المنقوشة، طاقم محترف، معجنات مختارة بعناية، كيك أنيق وحلويات منوعة، أصناف متعددة، خبرة يُشهد لها.',
    en: 'The origin of mankousheh, a professional team, carefully selected pastries, elegant cakes and assorted sweets, diverse varieties, proven expertise.',
  },
  nav: {
    home: { ar: 'الرئيسية', en: 'Home' },
    products: { ar: 'المنتجات', en: 'Products' },
    gallery: { ar: 'المعرض', en: 'Gallery' },
    branches: { ar: 'الفروع', en: 'Branches' },
    contact: { ar: 'التواصل', en: 'Contact' },
  },
  actions: {
    switchToEn: 'Switch to English',
    switchToAr: 'التبديل إلى العربية',
    toggleTheme: { ar: 'تبديل المظهر', en: 'Toggle theme' },
    viewAllProducts: { ar: 'تصفح جميع المنتجات', en: 'Explore all products' },
    viewGallery: { ar: 'عرض المعرض', en: 'View gallery' },
    viewBranches: { ar: 'فروع جدة', en: 'Jeddah Branches' },
    openInMaps: { ar: 'خرائط Google', en: 'Google Maps' },
    copyAddress: { ar: 'نسخ العنوان', en: 'Copy address' },
    copied: { ar: 'تم النسخ', en: 'Copied' },
    clearSearch: { ar: 'مسح البحث', en: 'Clear search' },
    resetFilters: { ar: 'إعادة ضبط التصفية', en: 'Reset filters' },
    instagramCta: { ar: 'راسلنا على إنستغرام', en: 'Message us on Instagram' },
    close: { ar: 'إغلاق', en: 'Close' },
    next: { ar: 'التالي', en: 'Next' },
    previous: { ar: 'السابق', en: 'Previous' },
    goToProducts: { ar: 'الانتقال إلى المنتجات', en: 'Go to Products' },
  },
  home: {
    heroLine1: { ar: 'اطايب مرحبا', en: 'Atayeb Marhaba' },
    heroLine2: { ar: 'مخبز في جدة', en: 'Bakery in Jeddah' },
    heroSubtitle: {
      ar: 'من المناقيش والمعجنات إلى الكيك والحلويات.',
      en: 'From mankousheh and pastries to cakes and sweets.',
    },
    heroProductsCta: { ar: 'المنتجات', en: 'Products' },
    heroBranchesCta: { ar: 'فروع جدة', en: 'Jeddah Branches' },
    stripTitle: { ar: 'لقطات من المخبز', en: 'From the Bakery' },
    stripHint: {
      ar: 'انقر على أي صورة لعرضها بحجم كبير',
      en: 'Select any photo to preview it above',
    },
    categoriesTitle: { ar: 'الأقسام', en: 'Categories' },
    quotesTitle: { ar: 'من حسابنا على إنستغرام', en: 'From Our Instagram' },
    originalPostLink: { ar: 'من المنشور الأصلي', en: 'From the original post' },
    productsHeading: { ar: 'منتجاتنا', en: 'Our Products' },
    productsSubheading: {
      ar: 'تشكيلة مختارة من المناقيش والمعجنات والكيك والحلويات.',
      en: 'A curated selection of mankousheh, pastries, cakes, and sweets.',
    },
  },
  loqmahCard: {
    title: { ar: 'بوكس اللقمة على ذوقك', en: 'Loqmah Box to Your Taste' },
    quote: {
      ar: '«لو البوكس على ذوقك.. إيش تختار فيه؟»',
      en: '“If the box were made to your taste.. what would you pick inside?”',
    },
    instruction: {
      ar: 'اختر أصناف المناقيش التي تفضلها في البوكس:',
      en: 'Pick your preferred mankousheh varieties for the box:',
    },
    selectedLabel: { ar: 'تشكيلتك المختارة:', en: 'Your selected mix:' },
    emptyPrompt: {
      ar: 'اختر صنفاً واحداً أو أكثر لعرض تشكيلتك.',
      en: 'Select one or more varieties to preview your mix.',
    },
  },
  howToOrder: {
    title: { ar: 'كيف تطلب', en: 'How to Order' },
    subtitle: {
      ar: 'مسارات الطلب والتواصل المتاحة لدى اطايب مرحبا في جدة.',
      en: 'Available ways to order and connect with Atayeb Marhaba in Jeddah.',
    },
    step1Title: { ar: 'تطبيقات التوصيل', en: 'Delivery Apps' },
    step1Desc: {
      ar: 'الطلب متاح عبر التطبيقات التالية بالاسم:',
      en: 'Ordering is available through these apps:',
    },
    step2Title: { ar: 'فروع جدة', en: 'Jeddah Branches' },
    step2Desc: {
      ar: 'عناوين فروع جدة عبر خرائط Google',
      en: 'Jeddah branch addresses via Google Maps',
    },
    step3Title: { ar: 'إنستغرام', en: 'Instagram' },
    step3Desc: {
      ar: 'المراسلة عبر الحساب الرسمي @atayeb_marhaba',
      en: 'Message via official account @atayeb_marhaba',
    },
  },
  faq: {
    title: { ar: 'أسئلة شائعة', en: 'Frequently Asked Questions' },
    subtitle: {
      ar: 'إجابات مختصرة من المعلومات الموثّقة عن الأصناف.',
      en: 'Brief verified answers about our offerings.',
    },
  },
  products: {
    pageTitle: { ar: 'المنتجات', en: 'Products' },
    pageSubtitle: {
      ar: 'من المناقيش والمعجنات إلى الكيك والحلويات.',
      en: 'From mankousheh and pastries to cakes and sweets.',
    },
    searchPlaceholder: {
      ar: 'ابحث عن صنف أو نكهة (مثل: زعتر، فيريرو، سماق، ساوردو...)',
      en: 'Search item or flavor (e.g. za’atar, Ferrero, sumac, sourdough...)',
    },
    noResults: {
      ar: 'لا توجد أصناف مطابقة لبحثك الحالي.',
      en: 'No items match your current search.',
    },
    moreHeading: { ar: 'أصناف أخرى من المخبز', en: 'More From the Bakery' },
    filters: {
      all: { ar: 'الكل', en: 'All' },
      savory: { ar: 'مناقيش ومخبوزات', en: 'Savory & Breads' },
      sweets: { ar: 'كيك وحلويات', en: 'Cakes & Sweets' },
      seasonal: { ar: 'أصناف موسمية', en: 'Seasonal' },
    },
  },
  gallery: {
    pageTitle: { ar: 'المعرض', en: 'Gallery' },
    pageSubtitle: {
      ar: 'صور حقيقية من أصناف اطايب مرحبا في جدة.',
      en: 'Authentic photography of Atayeb Marhaba creations in Jeddah.',
    },
    filters: {
      all: { ar: 'الكل', en: 'All' },
      savory: { ar: 'مالح ومخبوزات', en: 'Savory & Breads' },
      sweets: { ar: 'كيك وحلويات', en: 'Cakes & Sweets' },
    },
  },
  branches: {
    pageTitle: { ar: 'فروع جدة', en: 'Jeddah Branches' },
    pageSubtitle: {
      ar: 'ابحث بالحي أو الطريق، وانسخ العنوان أو افتحه مباشرة في خرائط Google.',
      en: 'Search by district or road, copy any address, or open it directly in Google Maps.',
    },
    searchPlaceholder: {
      ar: 'ابحث بالحي أو الطريق (مثل: الروضة، السلامة، Prince Sultan...)',
      en: 'Search by district or road (e.g. Al Rawdah, Al-Salamah, Prince Sultan...)',
    },
    noResults: {
      ar: 'لا توجد عناوين مطابقة لبحثك الحالي.',
      en: 'No addresses match your current search.',
    },
    roadFilters: {
      all: { ar: 'الكل', en: 'All' },
      'prince-sultan': { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
      'king-abdulaziz': { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
      'prince-mohammed': {
        ar: 'شارع الأمير محمد بن عبدالعزيز',
        en: 'Prince Mohammed Bin Abdulaziz St',
      },
    },
  },
  contact: {
    pageTitle: { ar: 'التواصل والطلب', en: 'Contact & Ordering' },
    pageSubtitle: {
      ar: 'تواصل معنا عبر إنستغرام أو اطلب عبر تطبيقات التوصيل المتاحة.',
      en: 'Reach out to us on Instagram or order through available delivery apps.',
    },
    bioSourceLabel: {
      ar: 'من سيرة حساب إنستغرام',
      en: 'From our Instagram bio',
    },
    instagramCardTitle: { ar: 'إنستغرام', en: 'Instagram' },
    instagramCardDesc: {
      ar: 'تواصل معنا وتابع أحدث الأصناف عبر حسابنا الرسمي على إنستغرام.',
      en: 'Connect with us and follow our latest creations on our official Instagram account.',
    },
    facebookTitle: { ar: 'فيسبوك', en: 'Facebook' },
    facebookText: {
      ar: 'تتوفر صفحتنا على فيسبوك باسم Atayeb Marhaba.',
      en: 'Our Facebook page is available under the name Atayeb Marhaba.',
    },
    deliveryTitle: { ar: 'الطلب عبر تطبيقات التوصيل', en: 'Order via Delivery Apps' },
    deliveryText: {
      ar: 'الطلب متاح عبر تطبيقات التوصيل التالية:',
      en: 'Ordering is available through the following delivery apps:',
    },
  },
} as const;
