export type Language = 'ar' | 'en';

export type PageId = 'home' | 'products' | 'gallery' | 'branches' | 'contact';

export type ProductCategory = 'all' | 'savory' | 'sweets' | 'seasonal';

export interface BakeryPhoto {
  id: string;
  url: string;
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
}

export const INSTAGRAM_URL = 'https://www.instagram.com/atayeb_marhaba/';

export const DELIVERY_APPS = [
  'Ninja',
  'Hungerstation',
  'Keeta',
  'Jahez',
  'Noon',
] as const;

export const JEDDAH_BRANCH_ADDRESSES: readonly string[] = [
  '2330 Prince Sultan Rd, Al Rawdah, Jeddah 23435, Saudi Arabia',
  'Prince Mohammed Bin Abdulaziz St, Al Marwah, Jeddah 23543',
  'Prince Sultan Rd, Al Khalidiyyah, Jeddah 23422',
  'King Abdulaziz Rd, Al Hamra, Jeddah 23321',
  'King Abdulaziz Rd, Al-Salamah, Jeddah 23525',
  'Prince Sultan Rd, Al Safa, Jeddah 23453',
  'King Abdulaziz Rd, Abhur Al Janubiyah, Jeddah 23731',
] as const;

export function getGoogleMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const PHOTOS: readonly BakeryPhoto[] = [
  {
    id: 'tiramisu',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/DgDdvfuu1hK/media/?size=l&output=jpg',
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
    imageUrl: 'https://images.weserv.nl/?url=www.instagram.com/p/DgDdvfuu1hK/media/?size=l&output=jpg',
    name: {
      ar: 'تيراميسو',
      en: 'Tiramisu',
    },
    description: {
      ar: 'طبقات من اللطافة المغموسة بنكهة القهوة الفاخرة والكاكاو المر.',
      en: 'Delicate layers steeped in fine coffee flavor and bitter cocoa.',
    },
  },
  {
    id: 'loqmah-box',
    category: 'savory',
    imageUrl: 'https://images.weserv.nl/?url=www.instagram.com/p/DgC9YvRODHs/media/?size=l&output=jpg',
    name: {
      ar: 'بوكس اللقمة',
      en: 'Loqmah Box',
    },
    description: {
      ar: 'بوكس مناقيش صغيرة متنوعة تختار أصنافها على ذوقك.',
      en: 'An assorted mini mankousheh box where you choose the varieties to your taste.',
    },
  },
  {
    id: 'mankousheh',
    category: 'savory',
    imageUrl: 'https://images.weserv.nl/?url=www.instagram.com/p/DgBfYoDt48i/media/?size=l&output=jpg',
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
    imageUrl: 'https://images.weserv.nl/?url=www.instagram.com/p/DgAyj3JurXW/media/?size=l&output=jpg',
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
    imageUrl: 'https://images.weserv.nl/?url=www.instagram.com/p/Df9rjv3Optx/media/?size=l&output=jpg',
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
    imageUrl: 'https://images.weserv.nl/?url=www.instagram.com/p/Df8FsHHurVV/media/?size=l&output=jpg',
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
    id: 'assorted-sweets',
    category: 'sweets',
    name: {
      ar: 'حلويات منوعة',
      en: 'Assorted Sweets',
    },
    description: {
      ar: 'كيك أنيق وحلويات منوعة بأصناف متعددة.',
      en: 'Assorted sweets across diverse varieties.',
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
    openInMaps: { ar: 'عرض على خرائط غوغل', en: 'Search on Google Maps' },
    instagramCta: { ar: 'راسلنا على إنستغرام', en: 'Message us on Instagram' },
    close: { ar: 'إغلاق', en: 'Close' },
    next: { ar: 'التالي', en: 'Next' },
    previous: { ar: 'السابق', en: 'Previous' },
  },
  home: {
    stripTitle: { ar: 'لقطات من المخبز', en: 'From the Bakery' },
    quotesTitle: { ar: 'بصوت اطايب مرحبا', en: 'In Our Words' },
    productsHeading: { ar: 'منتجاتنا', en: 'Our Products' },
    productsSubheading: {
      ar: 'تشكيلة مختارة من المناقيش والمعجنات والكيك والحلويات.',
      en: 'A curated selection of mankousheh, pastries, cakes, and sweets.',
    },
  },
  products: {
    pageTitle: { ar: 'المنتجات', en: 'Products' },
    pageSubtitle: {
      ar: 'مناقيش، بوكس اللقمة، معجنات، كيك أنيق، حلويات منوعة، تيراميسو، خبز الساوردو بالبذور، باتون ساليه، رقاق مرحبا، وأصناف رمضان.',
      en: 'Mankousheh, Loqmah Box, pastries, elegant cakes, assorted sweets, tiramisu, seeded sourdough bread, baton salé, Raqaq Marhaba, and Ramadan specialties.',
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
  },
  branches: {
    pageTitle: { ar: 'فروع جدة', en: 'Jeddah Branches' },
    pageSubtitle: {
      ar: 'اختر العنوان للانتقال مباشرة إلى البحث في خرائط غوغل.',
      en: 'Select any address to open a direct search on Google Maps.',
    },
  },
  contact: {
    pageTitle: { ar: 'التواصل والطلب', en: 'Contact & Ordering' },
    pageSubtitle: {
      ar: 'تواصل معنا عبر إنستغرام أو اطلب عبر تطبيقات التوصيل المتاحة.',
      en: 'Reach out to us on Instagram or order through available delivery apps.',
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
