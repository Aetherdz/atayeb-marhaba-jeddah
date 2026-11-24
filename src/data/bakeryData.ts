export type Language = 'ar' | 'en';

export type PageId = 'home' | 'products' | 'gallery' | 'branches' | 'contact';

export type ProductCategory = 'mnakeesh' | 'all' | 'savory' | 'sweets' | 'seasonal';

export type MnakeeshCategory =
  | 'all'
  | 'cheese'
  | 'meat'
  | 'labneh'
  | 'assorted'
  | 'sweet';

export type GalleryCategory = 'all' | 'savory' | 'sweets';

export type BranchFilterTab = 'all' | 'with-phone' | 'with-address';

export interface BakeryPhoto {
  id: string;
  url: string;
  category: Exclude<GalleryCategory, 'all'>;
  title: Record<Language, string>;
  caption: Record<Language, string>;
  productId: string;
  postUrl?: string;
}

export interface FeaturedProduct {
  id: string;
  category: Exclude<ProductCategory, 'all' | 'mnakeesh'>;
  imageUrl: string;
  objectPosition: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  varieties?: Record<Language, string[]>;
  searchTerms?: Record<Language, string[]>;
}

export interface AdditionalProduct {
  id: string;
  category: Exclude<ProductCategory, 'all' | 'mnakeesh'>;
  name: Record<Language, string>;
  description: Record<Language, string>;
}

export interface MnakeeshMenuItem {
  id: string;
  category: Exclude<MnakeeshCategory, 'all'>;
  name: Record<Language, string>;
  priceLarge: number | null;
  priceMedium: number | null;
  priceLoqmah: number | null;
  calories: number;
  allergens: Record<Language, string>;
}

export interface JeddahBranch {
  id: string;
  district: Record<Language, string>;
  phone?: string;
  address?: string;
  road?: Record<Language, string>;
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
export const WHATSAPP_NUMBER_INTL = '+966 55 418 0776';
export const WHATSAPP_NUMBER_RAW = '966554180776';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_RAW}`;

export function getWhatsAppOrderUrl(message?: string): string {
  if (!message) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function formatLocalPhoneToTel(localPhone: string): string {
  const digits = localPhone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `tel:+966${digits.slice(1)}`;
  }
  return `tel:+${digits}`;
}

export function formatLocalPhoneDisplay(localPhone: string): string {
  const digits = localPhone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return localPhone;
}

export const DELIVERY_APPS = [
  'Ninja',
  'Hungerstation',
  'Keeta',
  'Jahez',
  'Noon',
] as const;

export const JEDDAH_BRANCHES: readonly JeddahBranch[] = [
  {
    id: 'al-safa',
    district: { ar: 'حي الصفا', en: 'Al Safa' },
    phone: '0547709670',
    address: 'Prince Sultan Rd, Al Safa, Jeddah 23453',
    road: { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
  },
  {
    id: 'al-zahra',
    district: { ar: 'حي الزهراء', en: 'Al Zahra' },
    phone: '0592542434',
  },
  {
    id: 'abhur-al-shamaliyah',
    district: { ar: 'حي أبحر الشمالية', en: 'Abhur Al Shamaliyah' },
    phone: '0500017156',
  },
  {
    id: 'al-samer',
    district: { ar: 'حي السامر', en: 'Al Samer' },
    phone: '0502691015',
  },
  {
    id: 'al-baghdadiyah',
    district: { ar: 'حي البغدادية الغربية', en: 'Al Baghdadiyah Al Gharbiyah' },
    phone: '0570077939',
  },
  {
    id: 'al-ajaweed',
    district: { ar: 'حي الأجاويد', en: 'Al Ajaweed' },
    phone: '0599830960',
  },
  {
    id: 'al-hamdaniyah',
    district: { ar: 'حي الحمدانية', en: 'Al Hamdaniyah' },
    phone: '0597224042',
  },
  {
    id: 'al-naseem',
    district: { ar: 'حي النسيم', en: 'Al Naseem' },
    phone: '0580414006',
  },
  {
    id: 'al-bawadi',
    district: { ar: 'حي البوادي', en: 'Al Bawadi' },
    phone: '0595512808',
  },
  {
    id: 'al-basateen',
    district: { ar: 'حي البساتين', en: 'Al Basateen' },
    phone: '0556575100',
  },
  {
    id: 'al-rawdah',
    district: { ar: 'حي الروضة', en: 'Al Rawdah' },
    address: '2330 Prince Sultan Rd, Al Rawdah, Jeddah 23435, Saudi Arabia',
    road: { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
  },
  {
    id: 'al-marwah',
    district: { ar: 'حي المروة', en: 'Al Marwah' },
    address: 'Prince Mohammed Bin Abdulaziz St, Al Marwah, Jeddah 23543',
    road: {
      ar: 'شارع الأمير محمد بن عبدالعزيز',
      en: 'Prince Mohammed Bin Abdulaziz St',
    },
  },
  {
    id: 'al-khalidiyyah',
    district: { ar: 'حي الخالدية', en: 'Al Khalidiyyah' },
    address: 'Prince Sultan Rd, Al Khalidiyyah, Jeddah 23422',
    road: { ar: 'طريق الأمير سلطان', en: 'Prince Sultan Rd' },
  },
  {
    id: 'al-hamra',
    district: { ar: 'حي الحمراء', en: 'Al Hamra' },
    address: 'King Abdulaziz Rd, Al Hamra, Jeddah 23321',
    road: { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
  },
  {
    id: 'al-salamah',
    district: { ar: 'حي السلامة', en: 'Al-Salamah' },
    address: 'King Abdulaziz Rd, Al-Salamah, Jeddah 23525',
    road: { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
  },
  {
    id: 'abhur-al-janubiyah',
    district: { ar: 'حي أبحر الجنوبية', en: 'Abhur Al Janubiyah' },
    address: 'King Abdulaziz Rd, Abhur Al Janubiyah, Jeddah 23731',
    road: { ar: 'طريق الملك عبدالعزيز', en: 'King Abdulaziz Rd' },
  },
] as const;

export function getBranchMapsQuery(branch: JeddahBranch): string {
  if (branch.address) {
    return `Atayeb Marhaba ${branch.district.en}, ${branch.address}`;
  }
  return `اطايب مرحبا ${branch.district.ar} جدة`;
}

export function getGoogleMapsSearchUrl(branch: JeddahBranch): string {
  const query = branch.address ?? `اطايب مرحبا ${branch.district.ar} جدة`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getGoogleMapsEmbedUrl(branch: JeddahBranch): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(getBranchMapsQuery(branch))}&output=embed`;
}

const ALLERGEN_DAIRY_GLUTEN: Record<Language, string> = {
  ar: 'الحليب ومنتجاته · الحبوب',
  en: 'Milk & dairy · Gluten',
};

const ALLERGEN_DAIRY_GLUTEN_SOY: Record<Language, string> = {
  ar: 'الحليب ومنتجاته · الحبوب · فول الصويا ومنتجاته',
  en: 'Milk & dairy · Gluten · Soy',
};

const ALLERGEN_DAIRY_GLUTEN_MEAT: Record<Language, string> = {
  ar: 'الحليب ومنتجاته · الحبوب · اللحم',
  en: 'Milk & dairy · Gluten · Meat',
};

const ALLERGEN_SWEET: Record<Language, string> = {
  ar: 'الحبوب · المكسرات · الحليب · فول الصويا ومنتجاته',
  en: 'Gluten · Nuts · Milk · Soy',
};

export const MNAKEESH_MENU: readonly MnakeeshMenuItem[] = [
  // Cheese (جبنة)
  {
    id: 'cheese-plain',
    category: 'cheese',
    name: { ar: 'جبنة سادة', en: 'Plain Cheese' },
    priceLarge: 12.5,
    priceMedium: 7.5,
    priceLoqmah: 5,
    calories: 808,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-akkawi',
    category: 'cheese',
    name: { ar: 'جبنة عكاوي', en: 'Akkawi Cheese' },
    priceLarge: 11.5,
    priceMedium: 7.5,
    priceLoqmah: 5,
    calories: 800,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-zaatar',
    category: 'cheese',
    name: { ar: 'جبنة وزعتر', en: 'Cheese & Za’atar' },
    priceLarge: 13.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 866,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-duqqa',
    category: 'cheese',
    name: { ar: 'جبنة ودقة', en: 'Cheese & Duqqa' },
    priceLarge: 13.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 870,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-labneh',
    category: 'cheese',
    name: { ar: 'جبنة ولبنة', en: 'Cheese & Labneh' },
    priceLarge: 14.5,
    priceMedium: 9.5,
    priceLoqmah: 5.5,
    calories: 714,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-spinach',
    category: 'cheese',
    name: { ar: 'جبنة وسبانخ', en: 'Cheese & Spinach' },
    priceLarge: 13.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 780,
    allergens: ALLERGEN_DAIRY_GLUTEN_SOY,
  },
  {
    id: 'cheese-mortadella',
    category: 'cheese',
    name: { ar: 'جبنة ومرتديلا', en: 'Cheese & Mortadella' },
    priceLarge: 13.5,
    priceMedium: 9.5,
    priceLoqmah: 5.5,
    calories: 898,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },
  {
    id: 'cheese-chicken',
    category: 'cheese',
    name: { ar: 'جبنة ودجاج', en: 'Cheese & Chicken' },
    priceLarge: 14.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 751,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-mild-sauce',
    category: 'cheese',
    name: { ar: 'جبنة وصوص بارد', en: 'Cheese & Mild Sauce' },
    priceLarge: 13.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 854,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-spicy-sauce',
    category: 'cheese',
    name: { ar: 'جبنة وصوص حار', en: 'Cheese & Spicy Sauce' },
    priceLarge: 13.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 826,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-meat',
    category: 'cheese',
    name: { ar: 'جبنة ولحم', en: 'Cheese & Meat' },
    priceLarge: 14.5,
    priceMedium: 9.5,
    priceLoqmah: 5.5,
    calories: 838,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'cheese-meat-mild',
    category: 'cheese',
    name: { ar: 'جبنة ولحم وصوص بارد', en: 'Cheese, Meat & Mild Sauce' },
    priceLarge: 14.5,
    priceMedium: 9.5,
    priceLoqmah: 5.5,
    calories: 673,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },
  {
    id: 'cheese-meat-spicy',
    category: 'cheese',
    name: { ar: 'جبنة ولحم وصوص حار', en: 'Cheese, Meat & Spicy Sauce' },
    priceLarge: 14.5,
    priceMedium: 9.5,
    priceLoqmah: 5.5,
    calories: 854,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },
  {
    id: 'cheese-extra',
    category: 'cheese',
    name: { ar: 'جبنة اكسترا', en: 'Extra Cheese' },
    priceLarge: 14.5,
    priceMedium: 9.5,
    priceLoqmah: null,
    calories: 896,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'three-cheeses',
    category: 'cheese',
    name: { ar: 'الأجبان الثلاثة', en: 'Three Cheeses' },
    priceLarge: 13.5,
    priceMedium: 8.5,
    priceLoqmah: 5,
    calories: 889,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },

  // Meat (لحم)
  {
    id: 'meat-lahm-bi-ajeen',
    category: 'meat',
    name: { ar: 'لحم بعجين', en: 'Lahm bi Ajeen' },
    priceLarge: 12.5,
    priceMedium: 7.5,
    priceLoqmah: 5,
    calories: 876,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },
  {
    id: 'meat-mild-sauce',
    category: 'meat',
    name: { ar: 'لحم وصوص بارد', en: 'Meat & Mild Sauce' },
    priceLarge: 12.5,
    priceMedium: 7.5,
    priceLoqmah: 5.5,
    calories: 882,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },
  {
    id: 'meat-spicy-sauce',
    category: 'meat',
    name: { ar: 'لحم وصوص حار', en: 'Meat & Spicy Sauce' },
    priceLarge: 12.5,
    priceMedium: 7.5,
    priceLoqmah: 5.5,
    calories: 882,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },
  {
    id: 'meat-shami',
    category: 'meat',
    name: { ar: 'لحم شامية', en: 'Shami Meat' },
    priceLarge: 12.5,
    priceMedium: 7.5,
    priceLoqmah: 5,
    calories: 954,
    allergens: ALLERGEN_DAIRY_GLUTEN_MEAT,
  },

  // Labneh (لبنة)
  {
    id: 'labneh-plain',
    category: 'labneh',
    name: { ar: 'لبنة سادة', en: 'Plain Labneh' },
    priceLarge: 10,
    priceMedium: 7,
    priceLoqmah: 4.5,
    calories: 518,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'labneh-zaatar',
    category: 'labneh',
    name: { ar: 'لبنة وزعتر', en: 'Labneh & Za’atar' },
    priceLarge: 11.5,
    priceMedium: 8,
    priceLoqmah: 4.5,
    calories: 576,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'labneh-olives',
    category: 'labneh',
    name: { ar: 'لبنة وزيتون', en: 'Labneh & Olives' },
    priceLarge: 11,
    priceMedium: 8,
    priceLoqmah: 4.5,
    calories: 568,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'labneh-honey',
    category: 'labneh',
    name: { ar: 'لبنة وعسل', en: 'Labneh & Honey' },
    priceLarge: 11,
    priceMedium: 8,
    priceLoqmah: 5,
    calories: 689,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'labneh-extra',
    category: 'labneh',
    name: { ar: 'لبنة اكسترا', en: 'Extra Labneh' },
    priceLarge: 11,
    priceMedium: 9,
    priceLoqmah: null,
    calories: 600,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },

  // Assorted (متنوع)
  {
    id: 'assorted-duqqa',
    category: 'assorted',
    name: { ar: 'دقة', en: 'Duqqa' },
    priceLarge: 8,
    priceMedium: 6,
    priceLoqmah: 4,
    calories: 757,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'assorted-duqqa-extra',
    category: 'assorted',
    name: { ar: 'دقة اكسترا', en: 'Extra Duqqa' },
    priceLarge: 9,
    priceMedium: null,
    priceLoqmah: null,
    calories: 777,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'assorted-zaatar',
    category: 'assorted',
    name: { ar: 'زعتر', en: 'Za’atar' },
    priceLarge: 10,
    priceMedium: 6,
    priceLoqmah: 4,
    calories: 586,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'assorted-zaatar-extra',
    category: 'assorted',
    name: { ar: 'زعتر اكسترا', en: 'Extra Za’atar' },
    priceLarge: 11,
    priceMedium: 8,
    priceLoqmah: 4.5,
    calories: 570,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'assorted-kishk',
    category: 'assorted',
    name: { ar: 'كشك', en: 'Kishk' },
    priceLarge: 10.5,
    priceMedium: 7.5,
    priceLoqmah: 5,
    calories: 302,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'assorted-pizza-mankousheh',
    category: 'assorted',
    name: { ar: 'بيتزا منقوشة', en: 'Mankousheh Pizza' },
    priceLarge: 15.5,
    priceMedium: null,
    priceLoqmah: null,
    calories: 366,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },
  {
    id: 'assorted-spinach',
    category: 'assorted',
    name: { ar: 'سبانخ', en: 'Spinach' },
    priceLarge: 10,
    priceMedium: 7,
    priceLoqmah: 4,
    calories: 636,
    allergens: ALLERGEN_DAIRY_GLUTEN_SOY,
  },
  {
    id: 'assorted-musakhan',
    category: 'assorted',
    name: { ar: 'دجاج مسخن', en: 'Musakhan Chicken' },
    priceLarge: 12.5,
    priceMedium: 6.5,
    priceLoqmah: 5,
    calories: 697,
    allergens: ALLERGEN_DAIRY_GLUTEN,
  },

  // Sweet (حليها)
  {
    id: 'sweet-nutella',
    category: 'sweet',
    name: { ar: 'نوتيلا', en: 'Nutella' },
    priceLarge: 11.5,
    priceMedium: 7.5,
    priceLoqmah: 5,
    calories: 757,
    allergens: ALLERGEN_SWEET,
  },
  {
    id: 'sweet-halawa-date',
    category: 'sweet',
    name: { ar: 'حلاوة ودبس التمر', en: 'Halawa & Date Syrup' },
    priceLarge: 12.5,
    priceMedium: 8.5,
    priceLoqmah: 5.5,
    calories: 777,
    allergens: ALLERGEN_SWEET,
  },
] as const;

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
    postUrl: 'https://www.instagram.com/p/DgDdvfuu1hK/',
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
    postUrl: 'https://www.instagram.com/p/DgC9YvRODHs/',
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
    objectPosition: 'object-[50%_68%]',
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
    objectPosition: 'object-[50%_66%]',
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
    objectPosition: 'object-[50%_64%]',
    name: {
      ar: 'مناقيش',
      en: 'Mankousheh',
    },
    description: {
      ar: 'أصل المنقوشة بتشكيلة من الأصناف المختارة بعناية.',
      en: 'The origin of mankousheh in carefully crafted varieties.',
    },
    varieties: {
      ar: ['جبنة', 'لحم', 'لبنة', 'متنوع', 'حليها'],
      en: ['Cheese', 'Meat', 'Labneh', 'Assorted', 'Sweet'],
    },
  },
  {
    id: 'elegant-cakes',
    category: 'sweets',
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgAyj3JurXW/media/?size=l&output=jpg',
    objectPosition: 'object-[50%_62%]',
    name: {
      ar: 'كيك أنيق',
      en: 'Elegant Cakes',
    },
    description: {
      ar: 'تشكيلة كيك أنيق وحلويات منوعة.',
      en: 'A curated selection of elegant cakes.',
    },
    varieties: {
      ar: ['بلاك فورست', 'وايت فورست', 'فيريرو روشيه', 'الجزر', 'الفراولة'],
      en: ['Black Forest', 'White Forest', 'Ferrero Rocher', 'Carrot', 'Strawberry'],
    },
    searchTerms: {
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
    objectPosition: 'object-[50%_62%]',
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
    objectPosition: 'object-[50%_66%]',
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

export const CATEGORY_PHOTO_CARDS: readonly CategoryPhotoCard[] = [
  {
    id: 'cat-mankousheh',
    title: { ar: 'مناقيش', en: 'Mankousheh' },
    imageUrl:
      'https://images.weserv.nl/?url=www.instagram.com/p/DgBfYoDt48i/media/?size=l&output=jpg',
    targetCategory: 'mnakeesh',
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
    id: 'faq-mnakeesh-prices',
    question: {
      ar: 'هل تتوفر قائمة أسعار المناقيش والسعرات الحرارية؟',
      en: 'Are Mnakeesh prices and calories available?',
    },
    answer: {
      ar: 'نعم، قائمة المناقيش الكاملة بأسعار الأحجام (كبير، وسط، لقمة) والسعرات ومسببات الحساسية معروضة في صفحة المنتجات.',
      en: 'Yes, the complete Mnakeesh menu with Large, Medium, and Loqmah prices, calories, and allergens is available on the Products page.',
    },
  },
  {
    id: 'faq-occasion-cakes',
    question: {
      ar: 'ما أنواع الكيك الأنيق المتوفرة للمناسبات؟',
      en: 'Which elegant cakes are available for occasions?',
    },
    answer: {
      ar: 'بلاك فورست، وايت فورست، فيريرو روشيه، الجزر، والفراولة؛ وللأسعار والطلب تواصل معنا عبر واتساب أو تطبيقات التوصيل.',
      en: 'Black Forest, White Forest, Ferrero Rocher, Carrot, and Strawberry cakes. Reach us on WhatsApp or delivery apps for ordering.',
    },
  },
  {
    id: 'faq-seasonal-items',
    question: {
      ar: 'هل تتوفر أصناف موسمية؟',
      en: 'Are seasonal specialties available?',
    },
    answer: {
      ar: 'نعم، تتوفر أصناف رمضان ورقاق مرحبا ضمن تشكيلة اطايب مرحبا.',
      en: 'Yes, Ramadan specialties and Raqaq Marhaba are part of Atayeb Marhaba’s selection.',
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
  sinceLabel: {
    ar: 'مخبز مرحبا · منذ 1982',
    en: 'Marhaba Bakery · Since 1982',
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
    products: { ar: 'القائمة', en: 'Menu' },
    gallery: { ar: 'المعرض', en: 'Gallery' },
    branches: { ar: 'الفروع', en: 'Branches' },
    contact: { ar: 'التواصل', en: 'Contact' },
  },
  actions: {
    switchToEn: 'Switch to English',
    switchToAr: 'التبديل إلى العربية',
    toggleTheme: { ar: 'تبديل المظهر', en: 'Toggle theme' },
    switchToDark: { ar: 'التبديل إلى الوضع الداكن', en: 'Switch to dark mode' },
    switchToLight: { ar: 'التبديل إلى الوضع الفاتح', en: 'Switch to light mode' },
    themeDarkLabel: { ar: 'داكن', en: 'Dark' },
    themeLightLabel: { ar: 'فاتح', en: 'Light' },
    browseMenu: { ar: 'تصفح القائمة والأسعار', en: 'Browse Menu & Prices' },
    viewBranches: { ar: 'فروع جدة وأرقامها', en: 'Jeddah Branches & Phones' },
    openInMaps: { ar: 'خرائط Google', en: 'Google Maps' },
    callBranch: { ar: 'اتصال مباشر', en: 'Call Branch' },
    copyAddress: { ar: 'نسخ العنوان', en: 'Copy address' },
    copyPhone: { ar: 'نسخ الرقم', en: 'Copy number' },
    copied: { ar: 'تم النسخ', en: 'Copied' },
    clearSearch: { ar: 'مسح البحث', en: 'Clear search' },
    resetFilters: { ar: 'إعادة ضبط التصفية', en: 'Reset filters' },
    orderOnWhatsapp: { ar: 'اطلب عبر واتساب', en: 'Order on WhatsApp' },
    sendBoxOnWhatsapp: { ar: 'أرسل التشكيلة على واتساب', en: 'Send Mix on WhatsApp' },
    orderOnInstagram: { ar: 'إنستغرام @atayeb_marhaba', en: 'Instagram @atayeb_marhaba' },
    originalPost: { ar: 'المنشور الأصلي', en: 'Original post' },
    close: { ar: 'إغلاق', en: 'Close' },
    next: { ar: 'التالي', en: 'Next' },
    previous: { ar: 'السابق', en: 'Previous' },
    goToProducts: { ar: 'الانتقال إلى القائمة', en: 'Go to Menu' },
  },
  home: {
    heroLine1: { ar: 'اطايب مرحبا', en: 'Atayeb Marhaba' },
    heroLine2: { ar: 'مخبز في جدة · منذ 1982', en: 'Jeddah Bakery · Since 1982' },
    heroSubtitle: {
      ar: 'أصل المنقوشة، معجنات مختارة بعناية، كيك أنيق وحلويات منوعة.',
      en: 'The origin of mankousheh, carefully crafted pastries, elegant cakes, and sweets.',
    },
    categoriesTitle: { ar: 'الأقسام', en: 'Categories' },
    browseCategoryPrefix: { ar: 'تصفح قسم', en: 'Browse category' },
    deliveryBarLabel: { ar: 'متوفر عبر تطبيقات التوصيل', en: 'Available on delivery apps' },
  },
  loqmahCard: {
    title: { ar: 'بوكس اللقمة على ذوقك', en: 'Loqmah Box to Your Taste' },
    subtitle: {
      ar: 'اختر أصنافك المفضلة وأرسل التشكيلة مباشرة عبر واتساب.',
      en: 'Pick your favorite varieties and send your mix directly on WhatsApp.',
    },
    emptyPrompt: {
      ar: 'اختر صنفاً واحداً أو أكثر لتجهيز تشكيلتك.',
      en: 'Select one or more varieties to build your mix.',
    },
    whatsappPrefix: {
      ar: 'أهلاً اطايب مرحبا، أرغب في الاستفسار عن بوكس اللقمة بالتشكيلة التالية:',
      en: 'Hello Atayeb Marhaba, I would like to inquire about a Loqmah Box with:',
    },
  },
  faq: {
    title: { ar: 'أسئلة شائعة', en: 'Frequently Asked Questions' },
    subtitle: {
      ar: 'إجابات مختصرة وموثّقة عن القائمة والأصناف.',
      en: 'Brief verified answers about the menu and items.',
    },
  },
  products: {
    pageTitle: { ar: 'القائمة والمنتجات', en: 'Menu & Products' },
    pageSubtitle: {
      ar: 'قائمة المناقيش الرسمية بالأسعار والسعرات، إلى جانب تشكيلة المخبز والحلويات.',
      en: 'Official Mnakeesh menu with prices and calories, alongside bakery specialties and sweets.',
    },
    searchPlaceholder: {
      ar: 'ابحث في القائمة أو الأصناف (مثل: عكاوي، زعتر، مسخن، نوتيلا، فيريرو...)',
      en: 'Search menu or items (e.g. Akkawi, za’atar, musakhan, Nutella, Ferrero...)',
    },
    noResults: {
      ar: 'لا توجد أصناف مطابقة لبحثك الحالي.',
      en: 'No items match your current search.',
    },
    moreHeading: { ar: 'أصناف أخرى من المخبز', en: 'More From the Bakery' },
    showcaseHeading: { ar: 'تشكيلة المخبز والحلويات', en: 'Bakery & Sweets Selection' },
    mnakeeshHeading: { ar: 'قائمة المناقيش الرسمية', en: 'Official Mnakeesh Menu' },
    currency: { ar: 'ر.س', en: 'SAR' },
    caloriesUnit: { ar: 'سعرة', en: 'cal' },
    sizeLarge: { ar: 'كبير', en: 'Large' },
    sizeMedium: { ar: 'وسط', en: 'Medium' },
    sizeLoqmah: { ar: 'لقمة', en: 'Loqmah' },
    caloriesCol: { ar: 'السعرات', en: 'Calories' },
    allergensLabel: { ar: 'مسببات الحساسية', en: 'Allergens' },
    showAllergens: { ar: 'عرض مسببات الحساسية', en: 'Show allergens' },
    hideAllergens: { ar: 'إخفاء مسببات الحساسية', en: 'Hide allergens' },
    calorieNote: {
      ar: 'ملاحظة: الاحتياج اليومي من السعرات الحرارية للرجل 2500 سعرة، وللمرأة 2000 سعرة، وللطفل 1800 سعرة.',
      en: 'Note: The daily calorie requirement for a man is 2500 cal, for a woman is 2000 cal and for a child is 1800 cal.',
    },
    orderStripTitle: {
      ar: 'للطلب أو الاستفسار عن الكيك وأصناف المخبز',
      en: 'To order or inquire about cakes & bakery items',
    },
    filters: {
      mnakeesh: { ar: 'قائمة المناقيش والأسعار', en: 'Mnakeesh Menu & Prices' },
      all: { ar: 'كل أصناف المخبز', en: 'All Bakery Items' },
      savory: { ar: 'مخبوزات ومعجنات', en: 'Savory & Breads' },
      sweets: { ar: 'كيك وحلويات', en: 'Cakes & Sweets' },
      seasonal: { ar: 'أصناف موسمية', en: 'Seasonal' },
    },
    mnakeeshCategories: {
      all: { ar: 'الكل', en: 'All' },
      cheese: { ar: 'جبنة', en: 'Cheese' },
      meat: { ar: 'لحم', en: 'Meat' },
      labneh: { ar: 'لبنة', en: 'Labneh' },
      assorted: { ar: 'متنوع', en: 'Assorted' },
      sweet: { ar: 'حليها', en: 'Sweet' },
    },
  },
  gallery: {
    pageTitle: { ar: 'المعرض', en: 'Gallery' },
    pageSubtitle: {
      ar: 'لقطات من حسابنا الرسمي على إنستغرام.',
      en: 'Highlights from our official Instagram account.',
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
      ar: 'اختر الحي لعرض الخريطة والرقم المباشر أو العنوان الكامل.',
      en: 'Select any district to view its live map, direct phone line, or full address.',
    },
    searchPlaceholder: {
      ar: 'ابحث باسم الحي أو الطريق (مثل: الصفا، الزهراء، الروضة، أبحر...)',
      en: 'Search by district or road (e.g. Al Safa, Al Zahra, Al Rawdah, Abhur...)',
    },
    noResults: {
      ar: 'لا توجد فروع مطابقة لبحثك الحالي.',
      en: 'No branches match your current search.',
    },
    tabs: {
      all: { ar: 'الكل', en: 'All' },
      'with-phone': { ar: 'بأرقام مباشرة', en: 'Direct Phone' },
      'with-address': { ar: 'بعنوان مفصّل', en: 'Street Address' },
    },
    directPhoneLabel: { ar: 'رقم الفرع للاستفسارات', en: 'Direct Branch Phone' },
    fullAddressLabel: { ar: 'العنوان', en: 'Address' },
    generalWhatsappLabel: {
      ar: 'واتساب الطلبات والاستفسارات العامة',
      en: 'General Orders & Inquiries WhatsApp',
    },
    mapTitlePrefix: { ar: 'خريطة موقع اطايب مرحبا —', en: 'Map of Atayeb Marhaba —' },
  },
  contact: {
    pageTitle: { ar: 'التواصل والطلب', en: 'Contact & Ordering' },
    pageSubtitle: {
      ar: 'تواصل معنا مباشرة عبر واتساب أو إنستغرام، أو اطلب عبر تطبيقات التوصيل.',
      en: 'Reach us directly on WhatsApp or Instagram, or order via delivery apps.',
    },
    whatsappTitle: { ar: 'واتساب', en: 'WhatsApp' },
    whatsappDesc: {
      ar: 'للطلبات السريعة والاستفسارات العامة.',
      en: 'For quick orders and general inquiries.',
    },
    instagramTitle: { ar: 'إنستغرام وفيسبوك', en: 'Instagram & Facebook' },
    facebookText: {
      ar: 'صفحة فيسبوك: Atayeb Marhaba',
      en: 'Facebook page: Atayeb Marhaba',
    },
    deliveryTitle: { ar: 'تطبيقات التوصيل', en: 'Delivery Apps' },
    deliveryDesc: {
      ar: 'متوفر في جدة عبر التطبيقات التالية:',
      en: 'Available in Jeddah through these apps:',
    },
  },
} as const;
