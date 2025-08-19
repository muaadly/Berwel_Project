export type Language = 'en' | 'ar'

export interface Translations {
  // Navigation
  home: string
  library: string
  analytics: string
  about: string
  contact: string
  registerNow: string
  signOut: string
  toggleTheme: string
  toggleLanguage: string
  
  // Common
  loading: string
  search: string
  searchPlaceholder: string
  noResults: string
  viewMore: string
  readMore: string
  close: string
  save: string
  cancel: string
  edit: string
  delete: string
  add: string
  remove: string
  
  // Home page
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  exploreButton: string
  learnMoreButton: string
  
  // Library
  libyanSongs: string
  maloofEntries: string
  singers: string
  categories: string
  allCategories: string
  filterBy: string
  sortBy: string
  newest: string
  oldest: string
  alphabetical: string
  
  // Song details
  songBy: string
  singer: string
  lyrics: string
  category: string
  year: string
  composer: string
  writer: string
  recordingStatus: string
  listenOnSoundcloud: string
  
  // Maloof details
  maloofEntry: string
  entryType: string
  entryRhythm: string
  entryLyrics: string
  notes: string
  like: string
  liked: string
  share: string
  comments: string
  addComment: string
  commentPlaceholder: string
  
  // Analytics
  analyticsTitle: string
  totalSongs: string
  totalEntries: string
  totalUsers: string
  popularSongs: string
  popularEntries: string
  recentActivity: string
  
  // About
  aboutTitle: string
  aboutDescription: string
  mission: string
  vision: string
  team: string
  
  // Contact
  contactTitle: string
  contactDescription: string
  name: string
  email: string
  message: string
  sendMessage: string
  contactInfo: string
  address: string
  phone: string
  
  // Footer
  footerDescription: string
  quickLinks: string
  socialMedia: string
  copyright: string
  
  // Errors
  error404: string
  error404Description: string
  error500: string
  error500Description: string
  notFound: string
  somethingWentWrong: string
  
  // Success messages
  commentAdded: string
  likeAdded: string
  likeRemoved: string
  profileUpdated: string
  messageSent: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    library: 'Library',
    analytics: 'Analytics',
    about: 'About',
    contact: 'Contact',
    registerNow: 'Register Now',
    signOut: 'Sign Out',
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Toggle language',
    
    // Common
    loading: 'Loading...',
    search: 'Search',
    searchPlaceholder: 'Search songs, entries, or singers...',
    noResults: 'No results found',
    viewMore: 'View More',
    readMore: 'Read More',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    remove: 'Remove',
    
    // Home page
    heroTitle: 'Berwel - A Website for Libyan Music',
    heroSubtitle: 'Preserving and celebrating Libya\'s rich musical heritage',
    heroDescription: 'An interactive digital platform that connects people with their cultural roots through traditional Libyan music and Maloof entries.',
    exploreButton: 'Explore Library',
    learnMoreButton: 'Learn More',
    
    // Library
    libyanSongs: 'Libyan Songs',
    maloofEntries: 'Maloof Entries',
    singers: 'Singers',
    categories: 'Categories',
    allCategories: 'All Categories',
    filterBy: 'Filter by',
    sortBy: 'Sort by',
    newest: 'Newest',
    oldest: 'Oldest',
    alphabetical: 'Alphabetical',
    
    // Song details
    songBy: 'by',
    singer: 'Singer',
    lyrics: 'Lyrics',
    category: 'Category',
    year: 'Year',
    composer: 'Composer',
    writer: 'Writer',
    recordingStatus: 'Recording Status',
    listenOnSoundcloud: 'Listen on SoundCloud',
    
    // Maloof details
    maloofEntry: 'Maloof Entry',
    entryType: 'Entry Type',
    entryRhythm: 'Entry Rhythm',
    entryLyrics: 'Entry Lyrics',
    notes: 'Notes',
    like: 'Like',
    liked: 'Liked',
    share: 'Share',
    comments: 'Comments',
    addComment: 'Add Comment',
    commentPlaceholder: 'Write your comment...',
    
    // Analytics
    analyticsTitle: 'Analytics',
    totalSongs: 'Total Songs',
    totalEntries: 'Total Entries',
    totalUsers: 'Total Users',
    popularSongs: 'Popular Songs',
    popularEntries: 'Popular Entries',
    recentActivity: 'Recent Activity',
    
    // About
    aboutTitle: 'About Berwel',
    aboutDescription: 'Learn more about our mission to preserve Libyan musical heritage',
    mission: 'Our Mission',
    vision: 'Our Vision',
    team: 'Our Team',
    
    // Contact
    contactTitle: 'Contact Us',
    contactDescription: 'Get in touch with us for any questions or feedback',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    contactInfo: 'Contact Information',
    address: 'Tripoli, Libya',
    phone: '+218 91 234 5678',
    
    // Footer
    footerDescription: 'Preserving and celebrating Libya\'s rich musical heritage through an interactive digital platform that connects people with their cultural roots.',
    quickLinks: 'Quick Links',
    socialMedia: 'Social Media',
    copyright: '© 2025 Berwel. All rights reserved. Preserving Libyan musical heritage.',
    
    // Errors
    error404: '404: This page could not be found.',
    error404Description: 'The page you are looking for does not exist.',
    error500: '500: Internal Server Error',
    error500Description: 'Something went wrong on our end.',
    notFound: 'Not Found',
    somethingWentWrong: 'Something went wrong',
    
    // Success messages
    commentAdded: 'Comment added successfully',
    likeAdded: 'Added to likes',
    likeRemoved: 'Removed from likes',
    profileUpdated: 'Profile updated successfully',
    messageSent: 'Message sent successfully',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    library: 'المكتبة',
    analytics: 'التحليلات',
    about: 'حول',
    contact: 'اتصل بنا',
    registerNow: 'سجل الآن',
    signOut: 'تسجيل الخروج',
    toggleTheme: 'تبديل المظهر',
    toggleLanguage: 'تبديل اللغة',
    
    // Common
    loading: 'جاري التحميل...',
    search: 'بحث',
    searchPlaceholder: 'ابحث عن الأغاني أو المداخل أو المطربين...',
    noResults: 'لم يتم العثور على نتائج',
    viewMore: 'عرض المزيد',
    readMore: 'اقرأ المزيد',
    close: 'إغلاق',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    remove: 'إزالة',
    
    // Home page
    heroTitle: 'برول - موقع للموسيقى الليبية',
    heroSubtitle: 'الحفاظ على التراث الموسيقي الليبي الغني والاحتفال به',
    heroDescription: 'منصة رقمية تفاعلية تربط الناس بجذورهم الثقافية من خلال الموسيقى الليبية التقليدية ومداخل الملوف.',
    exploreButton: 'استكشف المكتبة',
    learnMoreButton: 'اعرف المزيد',
    
    // Library
    libyanSongs: 'الأغاني الليبية',
    maloofEntries: 'مداخل الملوف',
    singers: 'المطربون',
    categories: 'الفئات',
    allCategories: 'جميع الفئات',
    filterBy: 'تصفية حسب',
    sortBy: 'ترتيب حسب',
    newest: 'الأحدث',
    oldest: 'الأقدم',
    alphabetical: 'أبجدي',
    
    // Song details
    songBy: 'لـ',
    singer: 'المطرب',
    lyrics: 'الكلمات',
    category: 'الفئة',
    year: 'السنة',
    composer: 'الملحن',
    writer: 'الكاتب',
    recordingStatus: 'حالة التسجيل',
    listenOnSoundcloud: 'استمع على SoundCloud',
    
    // Maloof details
    maloofEntry: 'مدخل الملوف',
    entryType: 'نوع المدخل',
    entryRhythm: 'إيقاع المدخل',
    entryLyrics: 'كلمات المدخل',
    notes: 'الملاحظات',
    like: 'إعجاب',
    liked: 'أعجبني',
    share: 'مشاركة',
    comments: 'التعليقات',
    addComment: 'أضف تعليق',
    commentPlaceholder: 'اكتب تعليقك...',
    
    // Analytics
    analyticsTitle: 'التحليلات',
    totalSongs: 'إجمالي الأغاني',
    totalEntries: 'إجمالي المداخل',
    totalUsers: 'إجمالي المستخدمين',
    popularSongs: 'الأغاني الشائعة',
    popularEntries: 'المداخل الشائعة',
    recentActivity: 'النشاط الأخير',
    
    // About
    aboutTitle: 'حول برول',
    aboutDescription: 'اعرف المزيد عن مهمتنا في الحفاظ على التراث الموسيقي الليبي',
    mission: 'مهمتنا',
    vision: 'رؤيتنا',
    team: 'فريقنا',
    
    // Contact
    contactTitle: 'اتصل بنا',
    contactDescription: 'تواصل معنا لأي أسئلة أو ملاحظات',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    contactInfo: 'معلومات الاتصال',
    address: 'طرابلس، ليبيا',
    phone: '+218 91 234 5678',
    
    // Footer
    footerDescription: 'الحفاظ على التراث الموسيقي الليبي الغني والاحتفال به من خلال منصة رقمية تفاعلية تربط الناس بجذورهم الثقافية.',
    quickLinks: 'روابط سريعة',
    socialMedia: 'وسائل التواصل الاجتماعي',
    copyright: '© 2025 برول. جميع الحقوق محفوظة. الحفاظ على التراث الموسيقي الليبي.',
    
    // Errors
    error404: '404: لم يتم العثور على هذه الصفحة.',
    error404Description: 'الصفحة التي تبحث عنها غير موجودة.',
    error500: '500: خطأ في الخادم الداخلي',
    error500Description: 'حدث خطأ ما من جانبنا.',
    notFound: 'غير موجود',
    somethingWentWrong: 'حدث خطأ ما',
    
    // Success messages
    commentAdded: 'تم إضافة التعليق بنجاح',
    likeAdded: 'تمت الإضافة إلى الإعجابات',
    likeRemoved: 'تمت الإزالة من الإعجابات',
    profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
    messageSent: 'تم إرسال الرسالة بنجاح',
  }
}

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key]
}

export function useTranslations() {
  const { language } = require('../components/language-provider').useLanguage()
  
  return {
    t: (key: keyof Translations) => getTranslation(language, key),
    language
  }
}
