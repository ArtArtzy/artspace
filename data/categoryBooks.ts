export type CategoryBook = {
  title: string;
  author: string;
  category: string;
  episodes: string;
  views: string;
  likes: string;
  image: string;
};

export type CategorySection = {
  title: string;
  subtitle: string;
  books: CategoryBook[];
};

const sectionTemplates = [
  { prefix: "นิยาย", suffix: "แนะนำ", subtitle: "เรื่องใหม่ที่คัดมาให้ตรงกับหมวดหมู่นี้" },
  { prefix: "แฟนฟิค", suffix: "น่าอ่าน", subtitle: "ต่อยอดเรื่องราวที่คุณรักในมุมมองใหม่" },
  { prefix: "การ์ตูน", suffix: "มาแรง", subtitle: "เรื่องราวภาพสวยที่กำลังถูกพูดถึง" },
];

const baseCategoryBooks: Record<string, CategoryBook[]> = {
  โรแมนติก: [
    { title: "จดหมายใต้แสงดาว", author: "Mirae", category: "โรแมนติก", episodes: "18", views: "214K", likes: "8.4K", image: "/images/category-books/romantic-01.webp" },
    { title: "คาเฟ่ของวันพรุ่งนี้", author: "PloyJune", category: "โรแมนติก", episodes: "24", views: "382K", likes: "12.1K", image: "/images/category-books/romantic-02.webp" },
    { title: "ฤดูฝนที่เราพบกัน", author: "RainNote", category: "โรแมนติก", episodes: "31", views: "295K", likes: "10.6K", image: "/images/category-books/romantic-03.webp" },
    { title: "เพลงเดียวกันในคืนยาว", author: "Lune", category: "โรแมนติก", episodes: "16", views: "188K", likes: "7.9K", image: "/images/category-books/romantic-04.webp" },
    { title: "กุหลาบบนชานชาลา", author: "NanaDraw", category: "โรแมนติก", episodes: "42", views: "510K", likes: "19.8K", image: "/images/category-books/romantic-05.webp" },
    { title: "ทะเลสีส้มกับคำตอบ", author: "MochiMelt", category: "โรแมนติก", episodes: "27", views: "341K", likes: "13.2K", image: "/images/category-books/romantic-06.webp" },
  ],
  วาย: [
    { title: "แรงโน้มถ่วงของเรา", author: "BlueOrbit", category: "วาย", episodes: "22", views: "278K", likes: "11.7K", image: "/images/category-books/bl-01.webp" },
    { title: "ห้องเรียนหลังเลิกเรียน", author: "NorthStar", category: "วาย", episodes: "35", views: "460K", likes: "18.4K", image: "/images/category-books/bl-02.webp" },
    { title: "เสียงเพลงในวันที่ฝนตก", author: "CloudyBoy", category: "วาย", episodes: "19", views: "231K", likes: "9.2K", image: "/images/category-books/bl-03.webp" },
    { title: "บันทึกของคนข้างเวที", author: "StageDoor", category: "วาย", episodes: "28", views: "316K", likes: "12.5K", image: "/images/category-books/bl-04.webp" },
    { title: "เพื่อนร่วมทีมคนโปรด", author: "PencilFox", category: "วาย", episodes: "41", views: "525K", likes: "20.1K", image: "/images/category-books/bl-05.webp" },
    { title: "สถานีปลายทางของเรา", author: "NekoRain", category: "วาย", episodes: "26", views: "304K", likes: "11.9K", image: "/images/category-books/bl-06.webp" },
  ],
  ยูริ: [
    { title: "สวนดอกไม้ของเรา", author: "Fleur", category: "ยูริ", episodes: "20", views: "241K", likes: "10.3K", image: "/images/category-books/yuri-01.webp" },
    { title: "ฤดูร้อนที่ปลายคลื่น", author: "SoraMild", category: "ยูริ", episodes: "29", views: "367K", likes: "14.6K", image: "/images/category-books/yuri-02.webp" },
    { title: "สีที่เธอวาดให้ฉัน", author: "CanvasCat", category: "ยูริ", episodes: "17", views: "205K", likes: "8.7K", image: "/images/category-books/yuri-03.webp" },
    { title: "ดาวตกบนดาดฟ้า", author: "Lumi", category: "ยูริ", episodes: "25", views: "319K", likes: "12.8K", image: "/images/category-books/yuri-04.webp" },
    { title: "ร้านดอกไม้วันเสาร์", author: "Mame", category: "ยูริ", episodes: "36", views: "428K", likes: "17.3K", image: "/images/category-books/yuri-05.webp" },
    { title: "เทศกาลที่มีเรา", author: "PeachMint", category: "ยูริ", episodes: "21", views: "282K", likes: "10.9K", image: "/images/category-books/yuri-06.webp" },
  ],
  แฟนตาซี: [
    { title: "ผู้พิทักษ์ประตูหมอก", author: "Eira", category: "แฟนตาซี", episodes: "33", views: "492K", likes: "20.5K", image: "/images/category-books/fantasy-01.webp" },
    { title: "มังกรแห่งเกาะลอยฟ้า", author: "AkiStudio", category: "แฟนตาซี", episodes: "28", views: "415K", likes: "16.8K", image: "/images/category-books/fantasy-02.webp" },
    { title: "คาถาในคืนดาวพราว", author: "StarRune", category: "แฟนตาซี", episodes: "24", views: "339K", likes: "13.7K", image: "/images/category-books/fantasy-03.webp" },
    { title: "บันทึกนักเวทฝึกหัด", author: "RuneFox", category: "แฟนตาซี", episodes: "18", views: "267K", likes: "10.1K", image: "/images/category-books/fantasy-04.webp" },
    { title: "น้ำตกคริสตัล", author: "MoonVale", category: "แฟนตาซี", episodes: "37", views: "560K", likes: "22.4K", image: "/images/category-books/fantasy-05.webp" },
    { title: "คำสัญญาเหนือเมฆา", author: "WindyPage", category: "แฟนตาซี", episodes: "30", views: "398K", likes: "15.6K", image: "/images/category-books/fantasy-06.webp" },
  ],
  จีนโบราณ: [
    { title: "จันทร์เหนือวังหลวง", author: "HanYue", category: "จีนโบราณ", episodes: "32", views: "421K", likes: "17.9K", image: "/images/category-books/china-01.webp" },
    { title: "กลิ่นเหมยในสายหมอก", author: "LanZhi", category: "จีนโบราณ", episodes: "26", views: "318K", likes: "12.7K", image: "/images/category-books/china-02.webp" },
    { title: "พู่กันแห่งหุบเขา", author: "MoXian", category: "จีนโบราณ", episodes: "21", views: "254K", likes: "9.8K", image: "/images/category-books/china-03.webp" },
    { title: "เงาจันทร์ริมธารา", author: "QingHe", category: "จีนโบราณ", episodes: "38", views: "477K", likes: "18.6K", image: "/images/category-books/china-04.webp" },
    { title: "ประตูแดงใต้จันทร์เต็มดวง", author: "JadeInk", category: "จีนโบราณ", episodes: "29", views: "392K", likes: "14.9K", image: "/images/category-books/china-05.webp" },
    { title: "คมกระบี่ในเรือนหอม", author: "BaiLing", category: "จีนโบราณ", episodes: "34", views: "448K", likes: "17.2K", image: "/images/category-books/china-06.webp" },
  ],
  เกิดใหม่: [
    { title: "ชีวิตที่สองของนักปรุงยา", author: "Re:Mint", category: "เกิดใหม่", episodes: "27", views: "376K", likes: "14.4K", image: "/images/category-books/isekai-01.webp" },
    { title: "ประตูสู่วันเริ่มต้น", author: "NewDawn", category: "เกิดใหม่", episodes: "23", views: "305K", likes: "11.8K", image: "/images/category-books/isekai-02.webp" },
    { title: "บันทึกชีวิตใหม่ในเมืองเวท", author: "SecondPage", category: "เกิดใหม่", episodes: "31", views: "414K", likes: "16.1K", image: "/images/category-books/isekai-03.webp" },
    { title: "เข็มทิศของผู้ย้อนเวลา", author: "ClockBloom", category: "เกิดใหม่", episodes: "19", views: "228K", likes: "8.9K", image: "/images/category-books/isekai-04.webp" },
    { title: "ป่าเรืองแสงหลังความฝัน", author: "NagiWorld", category: "เกิดใหม่", episodes: "35", views: "489K", likes: "18.7K", image: "/images/category-books/isekai-05.webp" },
    { title: "รุ่งอรุณของราชอาณาจักรใหม่", author: "Aster", category: "เกิดใหม่", episodes: "25", views: "333K", likes: "12.6K", image: "/images/category-books/isekai-06.webp" },
  ],
  ลึกลับ: [
    { title: "จดหมายจากห้องปิดตาย", author: "InkNoir", category: "ลึกลับ", episodes: "20", views: "266K", likes: "10.8K", image: "/images/category-books/mystery-01.webp" },
    { title: "คดีเงาในคฤหาสน์หมอก", author: "Morrow", category: "ลึกลับ", episodes: "29", views: "387K", likes: "15.2K", image: "/images/category-books/mystery-02.webp" },
    { title: "แว่นขยายกับกุญแจทองเหลือง", author: "ClueBox", category: "ลึกลับ", episodes: "17", views: "198K", likes: "7.6K", image: "/images/category-books/mystery-03.webp" },
    { title: "ประตูที่ซ่อนในหอสมุด", author: "PageTurner", category: "ลึกลับ", episodes: "24", views: "294K", likes: "11.5K", image: "/images/category-books/mystery-04.webp" },
    { title: "หอนาฬิกาที่ไม่เคยหยุด", author: "TimeLock", category: "ลึกลับ", episodes: "33", views: "436K", likes: "17.4K", image: "/images/category-books/mystery-05.webp" },
    { title: "ตั๋วเที่ยวเดียวกับกระเป๋าปริศนา", author: "RailMyst", category: "ลึกลับ", episodes: "22", views: "318K", likes: "12.2K", image: "/images/category-books/mystery-06.webp" },
  ],
  สยองขวัญ: [
    { title: "บ้านเงียบหลังเที่ยงคืน", author: "NightHush", category: "สยองขวัญ", episodes: "18", views: "355K", likes: "17.6K", image: "/images/category-books/horror-01.webp" },
    { title: "เสียงเรียกจากป่าจันทร์", author: "PaleMoon", category: "สยองขวัญ", episodes: "26", views: "421K", likes: "21.3K", image: "/images/category-books/horror-02.webp" },
    { title: "ตุ๊กตาบนชั้นฝุ่น", author: "DollRoom", category: "สยองขวัญ", episodes: "15", views: "241K", likes: "12.2K", image: "/images/category-books/horror-03.webp" },
    { title: "ทางเดินที่ไฟไม่เคยติด", author: "BlueShadow", category: "สยองขวัญ", episodes: "23", views: "306K", likes: "14.8K", image: "/images/category-books/horror-04.webp" },
    { title: "ม่านแดงในโรงละครร้าง", author: "CurtainCall", category: "สยองขวัญ", episodes: "30", views: "399K", likes: "19.1K", image: "/images/category-books/horror-05.webp" },
    { title: "เงาจันทร์เหนือทะเลสาบดำ", author: "StillWater", category: "สยองขวัญ", episodes: "21", views: "288K", likes: "13.7K", image: "/images/category-books/horror-06.webp" },
  ],
  แอ๊กชั่น: [
    { title: "หมัดแรกเหนือเส้นขอบฟ้า", author: "RushLine", category: "แอ๊กชั่น", episodes: "34", views: "512K", likes: "20.8K", image: "/images/category-books/action-01.webp" },
    { title: "เส้นทางนักล่าบนยอดเขา", author: "PeakRunner", category: "แอ๊กชั่น", episodes: "28", views: "406K", likes: "16.5K", image: "/images/category-books/action-02.webp" },
    { title: "ภารกิจนักสำรวจเมืองลับ", author: "AtlasX", category: "แอ๊กชั่น", episodes: "25", views: "331K", likes: "12.9K", image: "/images/category-books/action-03.webp" },
    { title: "ความเร็วใต้แสงนีออน", author: "Nitro", category: "แอ๊กชั่น", episodes: "19", views: "278K", likes: "10.4K", image: "/images/category-books/action-04.webp" },
    { title: "คมดาบกลางแสงอาทิตย์", author: "SunEdge", category: "แอ๊กชั่น", episodes: "37", views: "548K", likes: "22.1K", image: "/images/category-books/action-05.webp" },
    { title: "หนีข้ามฟ้าในคืนฝนพรำ", author: "Rooftop", category: "แอ๊กชั่น", episodes: "23", views: "362K", likes: "14.7K", image: "/images/category-books/action-06.webp" },
  ],
  ไซไฟ: [
    { title: "นครไซแอนซ์ใต้แสงฟ้า", author: "NeonAster", category: "ไซไฟ", episodes: "30", views: "445K", likes: "17.9K", image: "/images/category-books/scifi-01.webp" },
    { title: "เสียงเรียกจากยานดวงดาว", author: "OrbitNote", category: "ไซไฟ", episodes: "24", views: "338K", likes: "13.1K", image: "/images/category-books/scifi-02.webp" },
    { title: "สวนเรืองแสงบนดาวไกล", author: "XenoBloom", category: "ไซไฟ", episodes: "18", views: "244K", likes: "9.6K", image: "/images/category-books/scifi-03.webp" },
    { title: "ตลาดฝนฮอโลแกรม", author: "PixelNova", category: "ไซไฟ", episodes: "27", views: "371K", likes: "14.2K", image: "/images/category-books/scifi-04.webp" },
    { title: "แอนดรอยด์ในห้องทดลอง", author: "ZeroOne", category: "ไซไฟ", episodes: "32", views: "486K", likes: "19.3K", image: "/images/category-books/scifi-05.webp" },
    { title: "สถานีวงโคจรสีคราม", author: "BlueVector", category: "ไซไฟ", episodes: "21", views: "295K", likes: "11.4K", image: "/images/category-books/scifi-06.webp" },
  ],
  คอมเมดี้: [
    { title: "คาเฟ่วุ่นวายของคุณป้า", author: "LaughBean", category: "คอมเมดี้", episodes: "16", views: "287K", likes: "13.9K", image: "/images/category-books/comedy-01.webp" },
    { title: "แก๊งแมวป่วนชั้นหนังสือ", author: "MewMew", category: "คอมเมดี้", episodes: "22", views: "401K", likes: "21.7K", image: "/images/category-books/comedy-02.webp" },
    { title: "ออฟฟิศนี้มีแต่เรื่องฮา", author: "DeskJoke", category: "คอมเมดี้", episodes: "25", views: "356K", likes: "17.5K", image: "/images/category-books/comedy-03.webp" },
    { title: "ครัวอลเวงเมนูพิเศษ", author: "ChefOops", category: "คอมเมดี้", episodes: "19", views: "312K", likes: "15.1K", image: "/images/category-books/comedy-04.webp" },
    { title: "เทศกาลนี้มีแต่ความพัง", author: "Balloony", category: "คอมเมดี้", episodes: "28", views: "438K", likes: "20.4K", image: "/images/category-books/comedy-05.webp" },
    { title: "เพื่อนซี้พันกันวันปาร์ตี้", author: "HappyLoop", category: "คอมเมดี้", episodes: "23", views: "329K", likes: "15.8K", image: "/images/category-books/comedy-06.webp" },
  ],
};

const supplementalCovers = [
  { title: "หน้าต่างของความทรงจำ", author: "StoryLab", episodes: "18", views: "224K", likes: "8.2K", image: "/images/book-between-lines.webp" },
  { title: "แผนที่กลางสายลม", author: "MapleInk", episodes: "25", views: "310K", likes: "11.6K", image: "/images/book-sky-tomorrow.webp" },
  { title: "คืนที่ดาวตก", author: "Starlit", episodes: "21", views: "286K", likes: "10.4K", image: "/images/book-kissed-stars.webp" },
  { title: "ร้านหนังสือริมคลอง", author: "CanalPage", episodes: "16", views: "198K", likes: "7.5K", image: "/images/book-summer-lessons.webp" },
  { title: "บทสนทนาใต้ฝน", author: "RainScript", episodes: "30", views: "347K", likes: "13.8K", image: "/images/book-photographs-rain.webp" },
  { title: "เมืองที่ซ่อนแสง", author: "HiddenGlow", episodes: "27", views: "392K", likes: "15.1K", image: "/images/book-city-echoes.webp" },
  { title: "บันทึกจากชั้นสาม", author: "ThirdShelf", episodes: "19", views: "246K", likes: "9.3K", image: "/images/book-our-classroom.webp" },
  { title: "เส้นทางสีคราม", author: "AzureLine", episodes: "23", views: "278K", likes: "10.9K", image: "/images/book-parallel-world.webp" },
  { title: "บ้านหลังฤดูร้อน", author: "SummerHouse", episodes: "32", views: "415K", likes: "16.2K", image: "/images/book-last-house.webp" },
  { title: "เงาสะท้อนในกระจก", author: "MirrorInk", episodes: "20", views: "239K", likes: "9.1K", image: "/images/book-blood-moon.webp" },
  { title: "เรื่องเล่าหลังม่าน", author: "Backstage", episodes: "26", views: "326K", likes: "12.7K", image: "/images/book-villains-side.webp" },
  { title: "จุดหมายในหน้าถัดไป", author: "NextChapter", episodes: "29", views: "364K", likes: "14.3K", image: "/images/book-love-parallel.webp" },
];

const freshSectionBooks: Record<string, { fanfic: CategoryBook; cartoon: CategoryBook }> = {
  โรแมนติก: {
    fanfic: { title: "แฟนฟิคโรแมนติก: ตั๋วเที่ยวเดียว", author: "VelvetNote", category: "โรแมนติก", episodes: "18", views: "276K", likes: "10.5K", image: "/images/category-books/fanfic-romantic-new.webp" },
    cartoon: { title: "การ์ตูนโรแมนติก: ประภาคารสีส้ม", author: "SunPanel", category: "โรแมนติก", episodes: "22", views: "334K", likes: "13.1K", image: "/images/category-books/cartoon-romantic-new.webp" },
  },
  วาย: {
    fanfic: { title: "แฟนฟิควาย: หน้าต่างวันฝนตก", author: "BlueDraft", category: "วาย", episodes: "20", views: "289K", likes: "11.2K", image: "/images/category-books/fanfic-bl-new.webp" },
    cartoon: { title: "การ์ตูนวาย: ชานชาลาสีคราม", author: "FrameTwo", category: "วาย", episodes: "24", views: "348K", likes: "14.2K", image: "/images/category-books/cartoon-bl-new.webp" },
  },
  ยูริ: {
    fanfic: { title: "แฟนฟิคยูริ: สมุดสเก็ตช์ฤดูร้อน", author: "LilacInk", category: "ยูริ", episodes: "19", views: "252K", likes: "10.1K", image: "/images/category-books/fanfic-yuri-new.webp" },
    cartoon: { title: "การ์ตูนยูริ: ร้านดอกไม้ริมทาง", author: "PetalPop", category: "ยูริ", episodes: "23", views: "321K", likes: "12.7K", image: "/images/category-books/cartoon-yuri-new.webp" },
  },
  แฟนตาซี: {
    fanfic: { title: "แฟนฟิคแฟนตาซี: คัมภีร์ประตูแสง", author: "RunePage", category: "แฟนตาซี", episodes: "21", views: "342K", likes: "14.8K", image: "/images/category-books/fanfic-fantasy-new.webp" },
    cartoon: { title: "การ์ตูนแฟนตาซี: มังกรเหนือเมฆา", author: "CloudDragon", category: "แฟนตาซี", episodes: "26", views: "418K", likes: "18.1K", image: "/images/category-books/cartoon-fantasy-new.webp" },
  },
  จีนโบราณ: {
    fanfic: { title: "แฟนฟิคจีนโบราณ: โคมไฟริมนที", author: "JadeLetter", category: "จีนโบราณ", episodes: "20", views: "298K", likes: "11.9K", image: "/images/category-books/fanfic-china-new.webp" },
    cartoon: { title: "การ์ตูนจีนโบราณ: กลิ่นเหมยใต้จันทร์", author: "InkMoon", category: "จีนโบราณ", episodes: "25", views: "371K", likes: "15.4K", image: "/images/category-books/cartoon-china-new.webp" },
  },
  เกิดใหม่: {
    fanfic: { title: "แฟนฟิคเกิดใหม่: เข็มทิศบทใหม่", author: "RebornInk", category: "เกิดใหม่", episodes: "22", views: "309K", likes: "12.3K", image: "/images/category-books/fanfic-isekai-new.webp" },
    cartoon: { title: "การ์ตูนเกิดใหม่: ปราสาทบนฟ้า", author: "DawnPanel", category: "เกิดใหม่", episodes: "27", views: "396K", likes: "16.2K", image: "/images/category-books/cartoon-isekai-new.webp" },
  },
  ลึกลับ: {
    fanfic: { title: "แฟนฟิคลึกลับ: กุญแจในจดหมายเก่า", author: "ClueWriter", category: "ลึกลับ", episodes: "18", views: "284K", likes: "11.6K", image: "/images/category-books/fanfic-mystery-new.webp" },
    cartoon: { title: "การ์ตูนลึกลับ: หอนาฬิกาคืนฝน", author: "NoirPanel", category: "ลึกลับ", episodes: "24", views: "362K", likes: "14.7K", image: "/images/category-books/cartoon-mystery-new.webp" },
  },
  สยองขวัญ: {
    fanfic: { title: "แฟนฟิคสยองขวัญ: โคมไฟในทางเดิน", author: "AfterDark", category: "สยองขวัญ", episodes: "17", views: "311K", likes: "15.8K", image: "/images/category-books/fanfic-horror-new.webp" },
    cartoon: { title: "การ์ตูนสยองขวัญ: ม่านแดงโรงละคร", author: "GhoulFrame", category: "สยองขวัญ", episodes: "21", views: "347K", likes: "17.2K", image: "/images/category-books/cartoon-horror-new.webp" },
  },
  แอ๊กชั่น: {
    fanfic: { title: "แฟนฟิคแอ๊กชั่น: ไล่ล่าบนหลังคา", author: "FastDraft", category: "แอ๊กชั่น", episodes: "23", views: "391K", likes: "16.9K", image: "/images/category-books/fanfic-action-new.webp" },
    cartoon: { title: "การ์ตูนแอ๊กชั่น: เส้นทางยอดเขา", author: "PeakPanel", category: "แอ๊กชั่น", episodes: "28", views: "447K", likes: "19.5K", image: "/images/category-books/cartoon-action-new.webp" },
  },
  ไซไฟ: {
    fanfic: { title: "แฟนฟิคไซไฟ: แผนที่เนบิวลา", author: "OrbitPen", category: "ไซไฟ", episodes: "20", views: "328K", likes: "13.4K", image: "/images/category-books/fanfic-scifi-new.webp" },
    cartoon: { title: "การ์ตูนไซไฟ: นครโฮโลแกรม", author: "NeonPanel", category: "ไซไฟ", episodes: "26", views: "429K", likes: "18.2K", image: "/images/category-books/cartoon-scifi-new.webp" },
  },
  คอมเมดี้: {
    fanfic: { title: "แฟนฟิคคอมเมดี้: คาเฟ่แก้วล้ม", author: "OopsWriter", category: "คอมเมดี้", episodes: "16", views: "267K", likes: "12.8K", image: "/images/category-books/fanfic-comedy-new.webp" },
    cartoon: { title: "การ์ตูนคอมเมดี้: ปาร์ตี้พันสายรุ้ง", author: "JoyPanel", category: "คอมเมดี้", episodes: "22", views: "385K", likes: "19.4K", image: "/images/category-books/cartoon-comedy-new.webp" },
  },
};

export const categoryBooks: Record<string, CategoryBook[]> = Object.fromEntries(
  Object.entries(baseCategoryBooks).map(([category, books], categoryIndex) => [
    category,
    [
      ...books,
      freshSectionBooks[category].fanfic,
      ...supplementalCovers.slice(categoryIndex % supplementalCovers.length).concat(supplementalCovers.slice(0, categoryIndex % supplementalCovers.length)).slice(0, 5).map((cover) => ({
        ...cover,
        title: `${category} · ${cover.title}`,
        category,
      })),
      freshSectionBooks[category].cartoon,
      ...supplementalCovers.slice((categoryIndex + 5) % supplementalCovers.length).concat(supplementalCovers.slice(0, (categoryIndex + 5) % supplementalCovers.length)).slice(0, 5).map((cover) => ({
        ...cover,
        title: `${category} · ${cover.title}`,
        category,
      })),
    ],
  ]),
) as Record<string, CategoryBook[]>;

export function getCategorySections(category: string): CategorySection[] {
  const books = categoryBooks[category] ?? [];
  return sectionTemplates.map((template, index) => ({
    title: `${template.prefix}${category}${template.suffix}`,
    subtitle: template.subtitle,
    books: books.slice(index * 6, index * 6 + 6),
  }));
}
