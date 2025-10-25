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
  menu: string
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
  searchOurLibrary: string
  searchBerwel: string
  singers: string
  maloofEntries: string
  berwelSoundcloudPlaylist: string
  listenOnSoundcloud: string
  soundcloudDescription: string
  contactUs: string
  name: string
  email: string
  subject: string
  message: string
  sendMessage: string
  
  // Library
  discoverTitle: string
  discoverSubtitle: string
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
  searchLibyanSongs: string
  showFilters: string
  clearFilter: string
  play: string
  category: string
  singerName: string
  songName: string
  entryNumber: string
  entryRhythm: string
  entryType: string
  entryName: string
  showingEntries: string
  previous: string
  next: string
  
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
  songInformation: string
  addLyrics: string
  lyricsStatus: string
  otherSongs: string
  otherSingers: string
  
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
  backToLibrary: string
  entryInformation: string
  addNotes: string
  postComment: string
  noCommentsYet: string
  beFirstToComment: string
  noNoteAvailable: string
  edit: string
  delete: string
  save: string
  cancel: string
  otherEntries: string
  maloofEntries: string
  noOtherEntriesFound: string
  download: string
  
  // Analytics
  analyticsTitle: string
  totalSongs: string
  totalEntries: string
  totalUsers: string
  popularSongs: string
  popularEntries: string
  recentActivity: string
  uniqueSingers: string
  fullyWrittenSongs: string
  maloofEntries: string
  songsNotYetWritten: string
  songsWithOnlyBeginningWritten: string
  viewAllSongsWithoutLyrics: string
  viewAllSongsWithPartialLyrics: string
  dataSource: string
  exploreLibrary: string
  
  // About
  aboutTitle: string
  aboutDescription: string
  mission: string
  vision: string
  team: string
  
  // Contact
  contactTitle: string
  contactDescription: string
  contactIntro: string
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
  email: string
  phone: string
  
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
  
  // About page
  aboutPlatform: string
  projectTitle: string
  projectDescription: string
  projectMission: string
  libraryTitle: string
  libraryItems: string[]
  contributeTitle: string
  contributeDescription: string
  contributeItems: string[]
  contributeEnd: string
  whyMattersTitle: string
  whyMattersDescription: string
  whyMattersEnd: string
  supportTitle: string
  supportDescription: string
  donateButton: string
  sponsorsTitle: string
  sponsorsDescription: string
  
  // Sponsor names
  libyanHouseForOudStudies: string
  boursa: string
  creativeSolution: string
  alfadaiaAI: string
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
    menu: 'Menu',
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
    heroDescription: 'An interactive digital platform that connects people with their cultural roots through traditional Libyan music and Malouf entries.',
    exploreButton: 'Explore Library',
    learnMoreButton: 'Learn More',
    searchOurLibrary: 'Search Our Library',
    searchBerwel: 'Search Berwel...',
    quickLinks: 'Quick Links',
    libyanSongs: 'Libyan Songs',
    maloofEntries: 'Maloof Entries',
    berwelSoundcloudPlaylist: 'Berwel Soundcloud Playlist',
    listenOnSoundcloud: 'Listen on SoundCloud',
    soundcloudDescription: 'Discover Berwel\'s curated Libyan music playlist and more on our official SoundCloud channel.',
    contactUs: 'Contact Us',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Library
    discoverTitle: 'Music Library',
    discoverSubtitle: 'Explore our collection of traditional Libyan songs and Maloof passages',
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
    searchLibyanSongs: 'Search Libyan songs...',
    showFilters: 'Show Filters',
    clearFilter: 'Clear Filter',
    play: 'Play',
    category: 'Category',
    singerName: 'Singer Name',
    songName: 'Song Name',
    entryNumber: 'Entry Number',
    entryRhythm: 'Entry Rhythm',
    entryType: 'Entry Type',
    entryName: 'Entry Name',
    showingEntries: 'Showing {from} to {to} of {total} Entries',
    previous: 'Previous',
    next: 'Next',
    
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
    songInformation: 'Song Information',
    addLyrics: 'Add Lyrics',
    lyricsStatus: 'Lyrics Status',
    otherSongs: 'Other Songs',
    otherSingers: 'Other Singers',
    
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
    backToLibrary: 'Back to Library',
    entryInformation: 'Entry Information',
    addNotes: 'Add Notes',
    postComment: 'Post Comment',
    noCommentsYet: 'No comments yet.',
    beFirstToComment: 'Be the first to comment!',
    noNoteAvailable: 'No note available for this entry.',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    otherEntries: 'Other Entries',
    maloofEntries: 'Maloof Entries',
    noOtherEntriesFound: 'No other entries found.',
    download: 'Download',
    
    // Analytics
    analyticsTitle: 'Analytics',
    totalSongs: 'Total Songs',
    totalEntries: 'Total Entries',
    totalUsers: 'Total Users',
    popularSongs: 'Popular Songs',
    popularEntries: 'Popular Entries',
    recentActivity: 'Recent Activity',
    uniqueSingers: 'Unique Singers',
    fullyWrittenSongs: 'Fully Written Songs',
    maloofEntries: 'Maloof Entries',
    songsNotYetWritten: 'Songs Not Yet Written',
    songsWithOnlyBeginningWritten: 'Songs with Only Beginning Written',
    viewAllSongsWithoutLyrics: 'View All Songs Without Lyrics',
    viewAllSongsWithPartialLyrics: 'View All Songs with Partial Lyrics',
    dataSource: 'Data is sourced from the Libyan Songs and Maloof Entries collections.',
    exploreLibrary: 'Explore the library for more details and enjoy the music archive!',
    
    // About
    aboutTitle: 'About Berwel',
    aboutDescription: 'Learn more about our mission to preserve Libyan musical heritage',
    mission: 'Our Mission',
    vision: 'Our Vision',
    team: 'Our Team',
    
    // Contact
    contactTitle: 'Contact Us',
    contactDescription: 'Get in touch with us for any questions or feedback',
    contactIntro: 'Have a question, suggestion, or want to get involved? Fill out the form below and we\'ll get back to you soon.',
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
    email: 'Email',
    phone: 'Phone',
    
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
    
    // About page
    aboutTitle: 'About Berwel',
    aboutDescription: 'Berwel is an interactive digital platform dedicated to documenting, preserving, and sharing Libya\'s musical heritage—from folk songs to Malouf and Muwashahat. Built by a community of music lovers, researchers, and technologists, Berwel brings Libya\'s diverse sonic history into the digital age.',
    aboutPlatform: 'The platform allows users to listen to Libyan songs, explore lyrics, discover the stories behind them, and learn about the artists, poets, composers, and cultural movements that shaped them. With a searchable and growing database of more than 1,200 songs, 170 Malouf entries, and a rich set of artist profiles and musical metadata, Berwel offers a living archive of Libya\'s voice—accessible to all.',
    projectTitle: 'The Berwel Project',
    projectDescription: 'Berwel was born in 2021 from a simple question: Why isn\'t there a central online space for Libyan music? What started as a passion project among friends—writing down lyrics, collecting songs, and sharing stories—grew into a larger mission to preserve and revitalize Libya\'s musical identity.',
    projectMission: 'In a time when much of our cultural memory is at risk of being lost or scattered, Berwel offers a new kind of archive: one that is open, participatory, and rooted in love for this art. The project seeks to bridge generations by making traditional music more discoverable, searchable, and meaningful for new audiences.',
    libraryTitle: 'What You\'ll Find in this version',
    libraryItems: ['A searchable digital library of Libyan songs', 'Song lyrics, artist bios, composer credits, and musical context', 'Malouf and Muwashahat entries with maqam, rhythm, and lyrical breakdowns'],
    contributeTitle: 'How You Can Contribute',
    contributeDescription: 'Berwel is not a closed archive—it\'s a living platform. We welcome anyone passionate about Libyan music, language, or cultural history to join us.',
    contributeItems: [
      'Add and correct content: If you know lyrics or details we\'re missing, submit them! Every entry goes through review before publishing.',
      'Help with transcription: Listen to rare or old recordings and help us write out the lyrics.',
      'Collect and curate: Help us gather content from books, recordings, social media, or your family\'s oral history.',
      'Join our digital team: If you have web, design, or audio editing skills, your help is especially valuable.'
    ],
    contributeEnd: 'No matter your background—whether you\'re a student, artist, techie, or someone who just loves Libyan music—your input matters.',
    whyMattersTitle: 'Why It Matters',
    whyMattersDescription: 'Libya\'s musical traditions are as diverse as its geography, dialects, and communities. But decades of instability, neglect, and the lack of formal digital archives have left this heritage vulnerable. Berwel aims to change that—not just by saving the past, but by making it part of the future.',
    whyMattersEnd: 'Join us in building something meaningful. Let\'s reconnect the sounds of Libya—together.',
    supportTitle: 'Support Berwel on GoFundMe',
    supportDescription: 'Help us document and preserve the metadata of traditional Libyan music. Your support makes a difference!',
    donateButton: 'Donate on GoFundMe',
    sponsorsTitle: 'Sponsors',
    sponsorsDescription: 'This is a Libyan House for Oud Studies project, with support from Boursa for trading and investment, Creative Solution for advertising, and Alfadaia AI for Software Development.',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    library: 'المكتبة',
    analytics: 'بيانات',
    about: 'عن المشروع',
    contact: 'تواصل معنا',
    registerNow: 'سجل الآن',
    signOut: 'تسجيل الخروج',
    toggleTheme: 'تبديل المظهر',
    toggleLanguage: 'تبديل اللغة',
    
    // Common
    loading: 'جاري التحميل...',
    search: 'بحث',
    menu: 'القائمة',
    searchPlaceholder: 'ابحث عن الأغاني أو الدخلات أو المطربين...',
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
    heroTitle: 'موقع للموسيقا الليبية',
    heroSubtitle: 'برول هو منصّة رقمية تفاعلية تهدف إلى توثيق وإحياء الموروث الموسيقي الليبي.',
    heroDescription: 'أكثر من 1200 أغنية ليبية و170 دخلة مالوف ليبي موثقة على موقعنا. يتيح الموقع للجميع استكشاف الأغاني الليبية، الاستماع إليها، قراءة كلماتها، والتعرّف على القصص والسياقات الثقافية خلفها. نرحب بكل مساهمة في سبيل بناء مكتبة موسيقية متكاملة حيّة تُعبّر عن تنوّع ليبيا وصوتها الأصيل.',
    exploreButton: 'استكشف المكتبة',
    learnMoreButton: 'اعرف المزيد',
    searchOurLibrary: 'ابحث في مكتبتنا',
    searchBerwel: 'ابحث في برول...',
    quickLinks: 'روابط سريعة',
    libyanSongs: 'الأغاني الليبية',
    maloofEntries: 'دخلات مالوف',
    berwelSoundcloudPlaylist: 'قائمة تشغيل برول على SoundCloud',
    listenOnSoundcloud: 'استمع على SoundCloud',
    soundcloudDescription: 'اكتشف قائمة تشغيل برول المختارة للموسيقى الليبية والمزيد على قناتنا الرسمية على SoundCloud.',
    contactUs: 'تواصل معنا',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    
    // Library
    discoverTitle: 'مكتبة الموسيقى',
    discoverSubtitle: 'استكشف مجموعتنا من الأغاني الليبية التقليدية ومقاطع المالوف',
    libyanSongs: 'الأغاني الليبية',
    maloofEntries: 'دخلات مالوف',
    singers: 'المطربون',
    categories: 'الفئات',
    allCategories: 'جميع الفئات',
    filterBy: 'تصفية حسب',
    sortBy: 'ترتيب حسب',
    newest: 'الأحدث',
    oldest: 'الأقدم',
    alphabetical: 'أبجدي',
    searchLibyanSongs: 'ابحث في الأغاني الليبية...',
    showFilters: 'إظهار الفلتر',
    clearFilter: 'مسح',
    play: 'تشغيل',
    category: 'الفئة',
    singerName: 'اسم المطرب',
    songName: 'اسم الأغنية',
    entryNumber: 'رقم الدخلة',
    entryRhythm: 'الإيقاع',
    entryType: 'الطبع',
    entryName: 'اسم الدخلة',
    showingEntries: 'عرض {from} إلى {to} من {total} دخلة',
    previous: 'السابق',
    next: 'التالي',
    
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
    songInformation: 'معلومات الأغنية',
    addLyrics: 'إضافة كلمات',
    lyricsStatus: 'حالة الكلمات',
    otherSongs: 'أغاني أخرى',
    otherSingers: 'مطربون آخرون',
    
    // Maloof details
    maloofEntry: 'مدخل المالوف',
    entryType: 'الطبع',
    entryRhythm: 'الإيقاع',
    entryLyrics: 'كلمات الدخلة',
    notes: 'الملاحظات',
    like: 'إعجاب',
    liked: 'أعجبني',
    share: 'مشاركة',
    comments: 'التعليقات',
    addComment: 'أضف تعليق',
    commentPlaceholder: 'اكتب تعليقك...',
    backToLibrary: 'العودة إلى المكتبة',
    entryInformation: 'معلومات الدخلة',
    addNotes: 'إضافة ملاحظات',
    postComment: 'نشر التعليق',
    noCommentsYet: 'لا توجد تعليقات بعد.',
    beFirstToComment: 'كن أول من يعلق!',
    noNoteAvailable: 'لا توجد ملاحظة متاحة لهذا المدخل.',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    otherEntries: 'دخلات أخرى',
    maloofEntries: 'دخلات مالوف',
    noOtherEntriesFound: 'لم يتم العثور على دخلات أخرى.',
    download: 'تحميل',
    
    // Analytics
    analyticsTitle: 'التحليلات',
    totalSongs: 'إجمالي الأغاني',
    totalEntries: 'إجمالي الدخلات',
    totalUsers: 'إجمالي المستخدمين',
    popularSongs: 'الأغاني الشائعة',
    popularEntries: 'الدخلات الشائعة',
    recentActivity: 'النشاط الأخير',
    uniqueSingers: 'المطربون الفريدون',
    fullyWrittenSongs: 'الأغاني المكتوبة بالكامل',
    maloofEntries: 'دخلات مالوف',
    songsNotYetWritten: 'الأغاني غير المكتوبة بعد',
    songsWithOnlyBeginningWritten: 'الأغاني المكتوبة جزئياً',
    viewAllSongsWithoutLyrics: 'عرض جميع الأغاني بدون كلمات',
    viewAllSongsWithPartialLyrics: 'عرض جميع الأغاني ذات الكلمات الجزئية',
    dataSource: 'البيانات مستمدة من مجموعات الأغاني الليبية ودخلات مالوف.',
    exploreLibrary: 'استكشف المكتبة للمزيد من التفاصيل واستمتع بأرشيف الموسيقى!',
    
    // About
    aboutTitle: 'حول برول',
    aboutDescription: 'اعرف المزيد عن مهمتنا في الحفاظ على التراث الموسيقي الليبي',
    mission: 'مهمتنا',
    vision: 'رؤيتنا',
    team: 'فريقنا',
    
    // Contact
    contactTitle: 'اتصل بنا',
    contactDescription: 'تواصل معنا لأي أسئلة أو ملاحظات',
    contactIntro: 'هل لديك سؤال أو اقتراح أو تريد المشاركة؟ املأ النموذج أدناه وسنرد عليك قريباً.',
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
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف المحمول',
    
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
    
    // About page
    aboutTitle: 'منصة برول',
    aboutDescription: 'برول هو منصة رقمية تفاعلية متخصصة في الموروث الموسيقي الليبي من أغاني، مالوف، موشحات، وموسيقا شعبية. يسهّل على المهتمين والباحثين والمحبين الوصول إلى هذا التراث ومشاركته مع الأجيال الجديدة والقديمة، عبر تجربة سلسة لاكتشاف الفنانين، الاستماع لأعمالهم الخالدة، وقراءة كلمات الأغاني والمعلومات المتعلقة بها من ملحنين، شعراء، ومؤدين.',
    aboutPlatform: '',
    projectTitle: 'مشروع برول',
    projectDescription: 'جاء مشروع برول انطلاقًا من تنوع فنوننا الشعبية وأهمية الحفاظ عليها وتوثيقها، وهو نتاج مبادرة مجتمعية تحت اسم "مشروع برول". يهدف إلى أرشفة التراث الغنائي الليبي رقميًا، ونشره إلى العالم كجزء حيّ من الهوية الثقافية الليبية، في صورة أرشيف ثقافي نابض يعكس تنوّع وبراعة الفنانين الليبيين، ويمثّل مرجعًا مهمًا للباحثين والموسيقيين والمهتمين في دراساتهم ومشاريعهم.',
    projectMission: '📅 كيف بدأ؟ انطلقت فكرة برول عام 2021 بعد ملاحظة الغياب شبه التام لأرشيف رقمي شامل يوثق جماليات الأغنية الليبية بمختلف ألوانها. دفعنا هذا الغياب إلى التحرك بدافع الشغف والتراث، وبدأنا رحلة طويلة في جمع الأغاني والمعلومات من مصادر متفرقة: من الإنترنت، والكتب، والباحثين المختصين. بعد سنوات من الجهد والعمل في الظل، يخرج هذا المشروع اليوم إلى النور كبوابة إلكترونية تتيح للجميع تذوّق جمال الألحان والكلمات، والوصول إلى هذا الفن من منظور حديث، يربط الماضي بالحاضر ويعرّف العالم بروح ليبيا.',
    libraryTitle: '📚 مكتبة برول',
    libraryItems: ['تضم المكتبة الرقمية في برول أكثر من 1200 أغنية و170 دخلة مالوف وموشحات، بالإضافة إلى معلومات تفصيلية عن أكثر من 20 فنانًا ليبيًا. تشمل المكتبة كلمات الأغاني، معلومات عن الشعراء والملحنين، نوتات موسيقية، ومقابلات صوتية ومرئية مع باحثين وفنانين ليبيين مختصين. وتستمر المكتبة بالتحديث والنمو عبر مساهمات الفريق والمجتمع.'],
    contributeTitle: '🧑‍🤝‍🧑 المساهمون',
    contributeDescription: 'هذا المشروع ثمرة تعاون بين مجموعة من عشاق التراث الليبي: موسيقيين، مبرمجين، باحثين، ومهتمين بالإرث الثقافي. تولّى بعضهم مهمة جمع وتوثيق الأغاني من مصادر إلكترونية ومكتوبة، بينما تكفّل فريق من المطوّرين ببناء الموقع وتصميمه وبرمجته ليعكس روح الموسيقا التي يحتويها بأسلوب بسيط وحديث.',
    contributeItems: [
      '✋ ادعم التراث وساهم معنا هل لديك شغف بالموسيقا الليبية؟ هل تتقن لهجة محلية أو تحب كتابة كلمات الأغاني؟ هل تجيد البحث أو التعامل مع أدوات رقمية بسيطة؟ برول يرحّب بك.',
      'برول ليس أرشيفًا مغلقًا، بل مشروع حيّ يمكن لكل فرد المساهمة في تطويره وتوسيعه. نحن نبحث على الدوام عن مساهمين شغوفين قادرين على المشاركة في مراحل التجميع، التصحيح، أو التوثيق.',
      '🛠️ كيف تساهم؟ تنقسم المساهمة إلى ثلاث مراحل رئيسية: الإدخال والمراجعة: يمكن لأي مستخدم اقتراح إضافات أو تصحيحات على محتوى الأغاني، وتتم مراجعتها من قبل فريق مختص قبل النشر.',
      'المسح والتجميع الإلكتروني: يقوم المتطوعون بجمع المعلومات من الإنترنت، ومنصات التواصل، والتعليقات، ثم يتم تنقيحها وإدخالها إلى قاعدة البيانات. رقمنة الكلمات: فريق من المتطوعين يستمعون إلى الأغاني ويكتبون كلماتها بدقة، ليتم تحويلها إلى نصوص قابلة للبحث والقراءة.'
    ],
    contributeEnd: 'ساهم معنا في إحياء تراثنا الليبي!',
    whyMattersTitle: 'لماذا تهمنا مساهمتك؟',
    whyMattersDescription: 'تتنوع التقاليد الموسيقية في ليبيا بتنوع جغرافيتها ولهجاتها ومجتمعاتها. لكن عقودًا من الاضطراب والإهمال، إلى جانب غياب الأرشفة الرسمية، جعلت هذا التراث عرضة للضياع. يسعى برول إلى تغيير ذلك — لا بمجرد إنقاذ الماضي، بل بجعله جزءًا من المستقبل.',
    whyMattersEnd: 'هذا المشروع هو مشروع للدار الليبية لدراسات العود، بدعم من شركة بورصة المالية، وشركة الحل البديع للدعاية والإعلان، وتطوير الموقع الالكتروني من قبل شركة الفضائية.',
    supportTitle: '💚 ادعم برول على GoFundMe',
    supportDescription: 'ساعدنا في توثيق والحفاظ على البيانات الوصفية للموسيقى الليبية التقليدية. دعمك يحدث فرقاً!',
    donateButton: 'تبرع على GoFundMe',
    sponsorsTitle: 'الرعاة',
    sponsorsDescription: 'هذا مشروع للدار الليبية لدراسات العود، بدعم من بورصة للتجارة والاستثمار، الحل البديع للدعاية والإعلان، وتطوير الموقع الإلكتروني من قبل الفضائية الذكية.',
    
    // Sponsor names
    libyanHouseForOudStudies: 'الدار الليبية لدراسات العود',
    boursa: 'بورصة',
    creativeSolution: 'الحل البديع',
    alfadaiaAI: 'الفضائية الذكية',
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
