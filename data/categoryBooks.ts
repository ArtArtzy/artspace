import type { StoryStatus } from "@/data/storyStatus";

export type CategoryBook = {
  title: string;
  author: string;
  category: string;
  episodes: string;
  views: string;
  likes: string;
  image: string;
  status?: StoryStatus;
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

export const fanficFandomByCategory: Record<string, string> = {
  "โรแมนติก": "Harry Potter",
  "วาย": "BTS",
  "ยูริ": "Genshin Impact",
  "แฟนตาซี": "The Lord of the Rings",
  "จีนโบราณ": "ปรมาจารย์ลัทธิมาร",
  "เกิดใหม่": "Solo Leveling",
  "ลึกลับ": "Sherlock Holmes",
  "สยองขวัญ": "The Conjuring",
  "แอ๊กชั่น": "Marvel",
  "ไซไฟ": "Star Wars",
  "คอมเมดี้": "SEVENTEEN",
  "รักผู้ใหญ่": "Bridgerton",
  "วายห้องลับ": "BTS",
  "ยูริห้องลับ": "The Last of Us",
  "ดราม่าเข้มข้น": "Taylor Swift",
  "โรแมนซ์แฟนตาซี": "Twilight",
  "เกมและโลกเสมือน": "Final Fantasy",
  "อนิเมะ": "One Piece",
  "แฟชั่นและไลฟ์สไตล์": "BLACKPINK",
  "เรทผู้ใหญ่": "Wednesday",
  "โรแมนติกผู้ใหญ่": "Bridgerton",
  "อนิเมะผู้ใหญ่": "Attack on Titan",
};

const fanficStoryTitlesByCategory: Record<string, string[]> = {
  โรแมนติก: ["จดหมายที่ส่งไม่ถึงเธอ", "ฤดูรักบนชานชาลา", "บทเพลงของวันพรุ่งนี้", "คาเฟ่หลังฝนตก", "เงาสะท้อนของคำรัก", "คืนที่ดาวกลับมา", "เพื่อนบ้านคนโปรด", "ภาพถ่ายใบเดิม", "ระยะห่างระหว่างเรา"],
  วาย: [
    "ห้องข้างกันในคืนฝน", "กัปตันทีมของหัวใจ", "เสียงเพลงจากชั้นสาม", "เพื่อนสนิทคิดเกินเลย", "สัญญาหลังเลิกเรียน", "บันทึกของคนข้างเวที", "ฤดูหนาวที่มีนาย", "ข้อความสุดท้ายในแชต", "ดาวเหนือของผม",
    "ห้องล็อกเกอร์หลังเสียงเพลง", "แชตสุดท้ายก่อนขึ้นเวที", "เจ้าของร่มสีกรม", "เที่ยงคืนที่ห้องซ้อม", "จังหวะหัวใจข้างเวที", "แสงไฟในสตูดิโอเก่า", "เพลงที่เราไม่กล้าร้อง", "วันหยุดของกัปตันทีม", "จดหมายจากห้องแต่งตัว", "เมื่อฝนหยุดที่สถานี", "คู่แข่งคนโปรด", "ระยะห่างหนึ่งที่นั่ง", "ภาพโพลารอยด์ใบสุดท้าย", "เสียงกระซิบหลังม่าน", "ทะเลในวันซ้อมเต้น", "สัญญาใต้ไฟนีออน", "คนที่ยืนข้างผม", "รองเท้าคู่เดิมบนเวที", "ห้องสมุดหลังเลิกเรียน", "วันที่เราเปลี่ยนท่อนร้อง", "กาแฟแก้วที่สอง", "ดอกไม้ในกล่องเครื่องดนตรี", "ฝนดาวตกของเรา", "บทเพลงจากชั้นดาดฟ้า", "ไฟล์เสียงที่ไม่เคยส่ง", "ทางกลับบ้านสายเดิม", "นักเต้นกับนักแต่งเพลง", "ความลับใต้แสงแฟลช", "คืนซ้อมก่อนคอนเสิร์ต", "หลังเสียงปรบมือจางลง"
  ],
  ยูริ: [
    "ดอกไม้ในสมุดวาด", "ร้านกาแฟริมทะเล", "เธอในวันอาทิตย์", "เส้นสีของเรา", "จดหมายจากเรือนกระจก", "เพลงรักของคนขี้อาย", "ก่อนฤดูร้อนจะจบ", "ข้างหน้าต่างบานเดิม", "ทางกลับบ้านของเรา",
    "คืนที่ดาวตกบนชิงช้า", "กลิ่นฝนบนผ้าพันคอ", "คำสารภาพใต้ต้นซากุระ", "ร้านหนังสือของเธอ", "แสงเทียนบนระเบียง", "ฤดูหนาวที่เราพบกัน", "เจ้าของแมวข้างห้อง", "ภาพวาดที่ยังไม่เสร็จ", "เสียงเปียโนในวันฝนตก", "ทะเลสาบหลังโรงเรียน", "ดอกไม้ที่บานช้า", "เส้นทางจักรยานของเรา", "จดหมายจากเมืองไกล", "คู่แข่งชมรมดนตรี", "คาเฟ่หลังเลิกเรียน", "กล้องฟิล์มของคนขี้ลืม", "คืนดูหนังใต้ผ้าห่ม", "ความลับในตู้ล็อกเกอร์", "แสงอาทิตย์ของฉัน", "เพื่อนบ้านชั้นสาม", "ช่อดอกไม้วันเกิด", "บันทึกเสียงของฤดูร้อน", "หมวกสีแดงริมทะเล", "วันที่เธอจับมือฉัน", "ห้องซ้อมเต้นของเรา", "ดาวเหนือในหน้าต่าง", "ขนมปังยามเช้า", "กลิ่นลาเวนเดอร์ในจดหมาย", "คืนงานเทศกาล", "ปลายทางของหัวใจ"
  ],
  แฟนตาซี: ["คำสาปแห่งหุบเขาคราม", "คู่หูแห่งประตูเวท", "เจ้าชายกับนักล่ามังกร", "ภารกิจในคืนดาวตก", "ดาบที่เลือกผู้กล้า", "ร้านยาของแม่มด", "คำทำนายใต้แสงจันทร์", "บันทึกผู้พิทักษ์คนใหม่", "เมืองลับเหนือเมฆ"],
  จีนโบราณ: ["ตำรารักใต้เงาจันทร์", "แม่ทัพผู้ไม่เคยยิ้ม", "ปิ่นหยกขององค์หญิง", "จดหมายจากเรือนเหมย", "กระบี่คู่ใต้หิมะ", "บุปผาในวังวน", "ชะตาที่ผูกด้วยด้ายแดง", "คืนวสันต์ริมธารา", "สัญญาหน้าศาลา"],
  เกิดใหม่: ["รีเซ็ตชีวิตครั้งที่สอง", "นักปรุงยาในเมืองใหม่", "ฉันตื่นมาเป็นตัวร้าย", "บันทึกของผู้ย้อนเวลา", "โลกนี้มีเธออีกครั้ง", "ภารกิจเปลี่ยนชะตา", "ร้านขนมของผู้กล้า", "อดีตที่ขอแก้ไข", "เริ่มต้นใหม่ใต้ดาวเดิม"],
  ลึกลับ: ["รหัสลับในจดหมาย", "เสียงเคาะห้องหมายเลขเจ็ด", "เงาในภาพถ่ายเก่า", "คดีคืนฝนตกที่สถานีปลายทาง", "ห้องสมุดหลังเที่ยงคืน", "สมุดบันทึกของคนหาย", "นาฬิกาที่เดินถอยหลัง", "ความลับใต้บันได", "ทางออกที่ไม่มีในแผนที่"],
  สยองขวัญ: ["เสียงเรียกจากโรงละคร", "บ้านเช่าหลังป่าช้า", "ตุ๊กตาตัวสุดท้าย", "คืนที่ไฟดับทั้งเมือง", "เงาใต้เตียงของเรา", "บันทึกเวรยาม", "ทางเดินชั้นใต้ดิน", "ห้องเรียนที่ไม่มีชื่อ", "คำสาปจากเทปเก่า"],
  แอ๊กชั่น: ["ภารกิจลับบนเส้นขอบฟ้า", "นักซิ่งแห่งเมืองนีออน", "ทีมศูนย์พิชิตคืนเดือด", "ล่าข้ามเขตอันตราย", "ผู้คุ้มกันคนสุดท้าย", "รหัสแดงบนดาดฟ้า", "หนีออกจากเมืองปิดตาย", "นักสืบสายลุย", "เส้นทางของคนไม่ยอมแพ้"],
  ไซไฟ: ["สัญญาณจากดาวไกล", "รักในสถานีวงโคจร", "ผู้โดยสารคนสุดท้าย", "เมืองจำลองของเรา", "ภารกิจข้ามเวลา", "ดวงจันทร์ดวงที่สิบสาม", "บันทึกจากยานไร้นาม", "โปรแกรมหัวใจเทียม", "วันที่โลกหยุดหมุน"],
  คอมเมดี้: ["รักวุ่นวายในออฟฟิศ", "คาเฟ่นี้มีแต่เรื่อง", "เพื่อนบ้านตัวป่วน", "ภารกิจจีบคนข้างโต๊ะ", "ร้านอาหารของคนซุ่มซ่าม", "ชมรมคนแพ้เกม", "แผนรักฉบับไม่ตั้งใจ", "บ้านนี้มีแมวเป็นหัวหน้า", "วันหยุดที่วุ่นที่สุด"],
};

const cartoonStoryTitlesByCategory: Record<string, string[]> = {
  โรแมนติก: ["โปสการ์ดจากปลายฟ้า", "ฤดูร้อนที่เราพบกัน", "ร้านดอกไม้หลังเลิกเรียน", "เพลงรักริมหน้าต่าง", "แสงเย็นบนระเบียง", "เจ้าของร่มสีเหลือง", "วันหยุดของหัวใจ", "ทางกลับบ้านสายเดิม", "ภาพวาดของเรา"],
  วาย: ["จังหวะหัวใจบนชานชาลา", "เพลงของคนข้างห้อง", "ร่มคันเดียวในวันฝนตก", "ห้องซ้อมหมายเลขเจ็ด", "เพื่อนร่วมวงคนโปรด", "ดาวตกหลังเวที", "สัญญาใต้แสงไฟ", "ทางเดินที่เราเดินด้วยกัน", "เสียงเพลงจากหน้าต่าง"],
  ยูริ: ["เรือนกระจกของวันพรุ่งนี้", "ช่อดอกไม้ของเธอ", "กล้องฟิล์มในวันฝนพรำ", "สองเราใต้ต้นซากุระ", "คาเฟ่ข้างทะเลสาบ", "บันทึกสีลาเวนเดอร์", "จักรยานคันเดียวกัน", "แสงดาวในห้องวาดภาพ", "จดหมายที่เขียนถึงเธอ"],
  แฟนตาซี: ["ผู้พิทักษ์แห่งสวนเมฆ", "หอคอยของนักเวทฝึกหัด", "แผนที่สู่หุบเขาคราม", "เจ้าหญิงกับจิ้งจอกเงิน", "คัมภีร์ใต้แสงดาว", "เมืองลับเหนือสายรุ้ง", "ดาบแห่งรุ่งอรุณ", "ร้านชาของแม่มด", "คำสัญญาแห่งปีกมังกร"],
  จีนโบราณ: ["บุปผาริมธาราจันทร์", "ศาลารักใต้สายหมอก", "ปิ่นหยกของคุณหนู", "กระบี่เงาจันทร์", "จดหมายจากเรือนชา", "แม่ทัพกับสาวช่างวาด", "กลิ่นเหมยในคืนหิมะ", "ด้ายแดงผูกชะตา", "วสันต์กลางหุบเขา"],
  เกิดใหม่: ["ชีวิตใหม่ในเมืองลอยฟ้า", "เข็มทิศของวันเริ่มต้น", "ฉันกลับมาเปลี่ยนชะตา", "ร้านขนมของนางเอก", "บันทึกจากโลกใบที่สอง", "ภารกิจหัวใจในรอบใหม่", "เจ้าหญิงแห่งฤดูถัดไป", "อดีตที่ฉันจะไม่พลาด", "รุ่งอรุณของชีวิตใหม่"],
  ลึกลับ: ["เงาปริศนาในหอนาฬิกา", "กุญแจห้องใต้หลังคา", "คดีลับริมแม่น้ำ", "ภาพถ่ายที่ไม่มีคนถ่าย", "เสียงเรียกจากชั้นสี่", "แผนที่ของบ้านร้าง", "จดหมายในกล่องดนตรี", "คืนที่เข็มนาฬิกาหยุดเดิน", "ความลับหลังหน้าต่าง"],
  สยองขวัญ: ["โรงหนังรอบเที่ยงคืน", "เสียงฝีเท้าหลังม่าน", "บ้านพักริมป่าหมอก", "ตุ๊กตาที่จำชื่อเราได้", "ห้องเรียนหลังเสียงระฆัง", "บันไดสู่ชั้นที่ไม่มีอยู่", "เงาในกระจกบานเก่า", "เทปเสียงจากคืนฝนตก", "สวนสนุกร้างยามตีสาม"],
  แอ๊กชั่น: ["นักวิ่งแห่งเมืองนีออน", "ภารกิจเหนือเส้นขอบฟ้า", "ทีมเงาพิทักษ์นคร", "รหัสลับบนดาดฟ้า", "ผู้คุ้มกันแห่งทางด่วน", "ไล่ล่าผ่านเมืองลอยฟ้า", "หมัดแรกของรุ่งอรุณ", "สายลับร้านสะดวกซื้อ", "เส้นทางของคนไม่ถอย"],
  ไซไฟ: ["สถานีปลายทางดาวเคราะห์", "สัญญาณรักจากวงโคจร", "นครกระจกแห่งอนาคต", "นักบินของดวงจันทร์สีฟ้า", "โปรแกรมหัวใจดวงใหม่", "บันทึกจากยานที่หายไป", "ตลาดกลางคืนบนดาวอังคาร", "ประตูข้ามเวลาของเรา", "แสงสุดท้ายจากกาแล็กซี"],
  คอมเมดี้: ["ชมรมป่วนชั้นดาดฟ้า", "แมวหลุดกับวันหยุดอลเวง", "คาเฟ่ที่เจ้านายเป็นเด็กฝึก", "ภารกิจทำอาหารครั้งแรก", "เพื่อนบ้านข้างห้องสุดฮา", "ปาร์ตี้นี้ไม่มีใครพร้อม", "แก๊งส่งของหลงทาง", "โรงเรียนนี้มีแต่เรื่องวุ่น", "วันซวยของฮีโร่จำเป็น"],
};

const yaNewCartoonTitles = [
  "จังหวะหัวใจใต้แสงดาว",
  "ห้องสมุดหลังฝนซา",
  "เข็มกลัดสีเงินของนาย",
  "วันหยุดของนายแบบฝึกหัด",
  "ขนมปังยามเช้าของเรา",
  "ทีมบาสกับคนข้างสนาม",
  "กระดาษโน้ตจากชั้นดาดฟ้า",
  "ดาวเหนือในห้องดนตรี",
  "ฤดูหนาวที่ปลายชานชาลา",
  "เจ้าของร้านแผ่นเสียง",
  "ภาพสะท้อนในกระจกบานฟ้า",
  "นักวาดกับคนส่งดอกไม้",
  "สายลมจากห้องเรียนข้าง ๆ",
  "คำตอบในกล่องดินสอ",
  "แสงไฟหลังเลิกงาน",
  "คู่หูแห่งเมืองลอยฟ้า",
  "คืนดูดาวของคนขี้ลืม",
  "รองเท้าผ้าใบคู่เดิม",
  "จดหมายจากเรือนกระจก",
  "ทางกลับบ้านใต้ฝนดาว",
];

const yaNewCartoonAuthors = [
  "BlueFrame", "RainPanel", "NeonSketch", "MangoInk", "CourtSide",
  "RooftopLine", "NorthChord", "WinterPanel", "VinylMoon", "AzureMirror",
  "PetalDraft", "BreezeNote", "PencilSignal", "AfterGlow", "SkyPilot",
  "StarMori", "SneakerDay", "GlassGarden", "MeteorWalk", "CloudLetter",
];

const generatedFanficCoverPool = [
  "/images/fanfic-covers/fanfic-romance-train.png",
  "/images/fanfic-covers/fanfic-bl-neon.png",
  "/images/fanfic-covers/fanfic-yuri-seaside.png",
  "/images/fanfic-covers/fanfic-fantasy-gate.png",
  "/images/fanfic-covers/fanfic-ancient-moon.png",
  "/images/fanfic-covers/fanfic-rebirth-forest.png",
  "/images/fanfic-covers/fanfic-mystery-letter.png",
  "/images/fanfic-covers/fanfic-horror-theater.png",
  "/images/fanfic-covers/fanfic-action-rooftop.png",
  "/images/fanfic-covers/fanfic-scifi-station.png",
  "/images/fanfic-covers/ai/fanfic-realistic-train-letter.png",
  "/images/fanfic-covers/ai/fanfic-bl-neon-2.png",
  "/images/fanfic-covers/ai/fanfic-yuri-seaside-2.png",
  "/images/fanfic-covers/ai/fanfic-fantasy-gate-2.png",
  "/images/fanfic-covers/ai/fanfic-ancient-lantern-2.png",
  "/images/fanfic-covers/ai/fanfic-mystery-envelope-2.png",
  "/images/fanfic-covers/ai/fanfic-horror-theater-2.png",
  "/images/fanfic-covers/ai/fanfic-action-rooftop-2.png",
  "/images/fanfic-covers/ai/fanfic-scifi-greenhouse-2.png",
  "/images/fanfic-covers/ai/fanfic-rebirth-shrine-2.png",
  "/images/fanfic-covers/ai/fanfic-comedy-cafe-2.png",
  "/images/fanfic-covers/ai/fanfic-ancient-snow-scroll-2.png",
];

const additionalFanficCoverCandidates = [
  ...["romantic", "bl", "yuri", "fantasy", "china", "isekai", "mystery", "horror", "action", "scifi", "comedy"].flatMap((slug) => Array.from({ length: 6 }, (_, index) => `/images/category-books/${slug}-${String(index + 1).padStart(2, "0")}.webp`)),
  ...["romantic", "bl", "yuri", "fantasy", "china", "isekai", "mystery", "horror", "action", "scifi", "comedy"].flatMap((slug) => [`/images/category-books/fanfic-${slug}-new.webp`, `/images/category-books/cartoon-${slug === "romantic" ? "romantic" : slug === "bl" ? "bl" : slug === "yuri" ? "yuri" : slug === "fantasy" ? "fantasy" : slug === "china" ? "china" : slug === "isekai" ? "isekai" : slug === "mystery" ? "mystery" : slug === "horror" ? "horror" : slug === "action" ? "action" : slug === "scifi" ? "scifi" : "comedy"}-new.webp`]),
  ...[
    "/images/category-books/generated/adult-anime.png",
    "/images/category-books/generated/adult-romance.png",
    "/images/category-books/generated/adult-romance-2.png",
    "/images/category-books/generated/anime-adventure.png",
    "/images/category-books/generated/fashion-lifestyle.png",
    "/images/category-books/generated/intense-drama.png",
    "/images/category-books/generated/mature-rated.png",
    "/images/category-books/generated/romance-fantasy.png",
    "/images/category-books/generated/secret-bl.png",
    "/images/category-books/generated/secret-yuri.png",
    "/images/category-books/generated/virtual-world.png",
  ],
  ...["between-lines", "blood-moon", "city-echoes", "kissed-stars", "last-house", "lemon-days", "love-parallel", "not-just-friends", "our-classroom", "parallel-world", "photographs-rain", "pixel-heart", "rewrite-end", "roses-fire", "sky-tomorrow", "summer-lessons", "tulip-bound", "villains-side"].map((slug) => `/images/book-${slug}.webp`),
  ...Array.from({ length: 120 }, (_, index) => `/images/fanfic-covers/derived/fanfic-derived-${index + 1}.webp`),
];

const fanficAuthors = ["VelvetNote", "MoonDraft", "RainyPage", "BlueLetter", "StarArchive", "NamiCloud", "SoraScript", "NightClover", "AsterInk", "PlotSailor"];

const yaNewFanficCoverPool = Array.from({ length: 30 }, (_, index) => `/images/fanfic-covers/ya-new/ya-${String(index + 1).padStart(2, "0")}.webp`);
let yaNewFanficCoverCursor = 0;

function takeYaNewFanficCover() {
  const cover = yaNewFanficCoverPool[yaNewFanficCoverCursor];
  yaNewFanficCoverCursor += 1;
  if (!cover) throw new Error("Not enough new ya fanfic cover assets");
  return cover;
}

const yuriNewFanficCoverPool = Array.from({ length: 30 }, (_, index) => `/images/fanfic-covers/yuri-new/yuri-${String(index + 1).padStart(2, "0")}.webp`);
let yuriNewFanficCoverCursor = 0;

function takeYuriNewFanficCover() {
  const cover = yuriNewFanficCoverPool[yuriNewFanficCoverCursor];
  yuriNewFanficCoverCursor += 1;
  if (!cover) throw new Error("Not enough new yuri fanfic cover assets");
  return cover;
}

const cartoonNewCoverPool = [
  ...Array.from({ length: 72 }, (_, index) => `/images/cartoon-covers/generated/cartoon-${String(index + 1).padStart(2, "0")}.webp`),
  ...Array.from({ length: 120 }, (_, index) => `/images/fanfic-covers/derived/fanfic-derived-${index + 1}.webp`),
];
let cartoonNewCoverCursor = 0;
const usedCartoonCoverPaths = new Set<string>();

function takeCartoonNewCover() {
  while (cartoonNewCoverCursor < cartoonNewCoverPool.length && usedCartoonCoverPaths.has(cartoonNewCoverPool[cartoonNewCoverCursor])) {
    cartoonNewCoverCursor += 1;
  }

  const cover = cartoonNewCoverPool[cartoonNewCoverCursor];
  cartoonNewCoverCursor += 1;
  if (!cover) throw new Error("Not enough unique cartoon cover assets");
  usedCartoonCoverPaths.add(cover);
  return cover;
}

const additionalCategoryNames = [
  "รักผู้ใหญ่",
  "วายห้องลับ",
  "ยูริห้องลับ",
  "ดราม่าเข้มข้น",
  "โรแมนซ์แฟนตาซี",
  "เกมและโลกเสมือน",
  "อนิเมะ",
  "แฟชั่นและไลฟ์สไตล์",
  "เรทผู้ใหญ่",
  "โรแมนติกผู้ใหญ่",
  "อนิเมะผู้ใหญ่",
] as const;

const additionalCategoryCoverPools: Record<string, string[]> = {
  "รักผู้ใหญ่": ["/images/category-books/generated/adult-romance.png", "/images/category-books/romantic-01.webp", "/images/category-books/romantic-02.webp", "/images/category-books/romantic-03.webp", "/images/category-books/romantic-04.webp", "/images/category-books/romantic-05.webp", "/images/category-books/romantic-06.webp", "/images/book-between-lines.webp", "/images/book-sky-tomorrow.webp", "/images/book-kissed-stars.webp"],
  "วายห้องลับ": ["/images/category-books/generated/secret-bl.png", "/images/category-books/bl-01.webp", "/images/category-books/bl-02.webp", "/images/category-books/bl-03.webp", "/images/category-books/bl-04.webp", "/images/category-books/bl-05.webp", "/images/category-books/bl-06.webp", "/images/category-books/generated/adult-romance-2.png", "/images/book-city-echoes.webp", "/images/book-love-parallel.webp"],
  "ยูริห้องลับ": ["/images/category-books/generated/secret-yuri.png", "/images/category-books/yuri-01.webp", "/images/category-books/yuri-02.webp", "/images/category-books/yuri-03.webp", "/images/category-books/yuri-04.webp", "/images/category-books/yuri-05.webp", "/images/category-books/yuri-06.webp", "/images/category-books/cartoon-yuri-new.webp", "/images/book-summer-lessons.webp", "/images/book-photographs-rain.webp"],
  "ดราม่าเข้มข้น": ["/images/category-books/generated/intense-drama.png", "/images/category-books/mystery-01.webp", "/images/category-books/mystery-02.webp", "/images/category-books/mystery-03.webp", "/images/category-books/mystery-04.webp", "/images/category-books/mystery-05.webp", "/images/category-books/mystery-06.webp", "/images/book-blood-moon.webp", "/images/book-last-house.webp", "/images/book-city-echoes.webp"],
  "โรแมนซ์แฟนตาซี": ["/images/category-books/generated/romance-fantasy.png", "/images/category-books/fantasy-01.webp", "/images/category-books/fantasy-02.webp", "/images/category-books/fantasy-03.webp", "/images/category-books/fantasy-04.webp", "/images/category-books/fantasy-05.webp", "/images/category-books/fantasy-06.webp", "/images/book-sky-tomorrow.webp", "/images/book-kissed-stars.webp", "/images/category-books/cartoon-fantasy-new.webp"],
  "เกมและโลกเสมือน": ["/images/category-books/generated/virtual-world.png", "/images/category-books/scifi-01.webp", "/images/category-books/scifi-02.webp", "/images/category-books/scifi-03.webp", "/images/category-books/scifi-04.webp", "/images/category-books/scifi-05.webp", "/images/category-books/scifi-06.webp", "/images/book-parallel-world.webp", "/images/category-books/cartoon-scifi-new.webp", "/images/category-books/fanfic-scifi-new.webp"],
  "อนิเมะ": ["/images/category-books/generated/anime-adventure.png", "/images/category-books/cartoon-romantic-new.webp", "/images/category-books/cartoon-fantasy-new.webp", "/images/category-books/cartoon-isekai-new.webp", "/images/category-books/cartoon-mystery-new.webp", "/images/category-books/cartoon-horror-new.webp", "/images/category-books/cartoon-action-new.webp", "/images/category-books/cartoon-scifi-new.webp", "/images/category-books/cartoon-yuri-new.webp", "/images/category-books/cartoon-comedy-new.webp"],
  "แฟชั่นและไลฟ์สไตล์": ["/images/category-books/generated/fashion-lifestyle.png", "/images/category-books/romantic-02.webp", "/images/category-books/romantic-04.webp", "/images/category-books/romantic-05.webp", "/images/category-books/yuri-01.webp", "/images/category-books/yuri-03.webp", "/images/book-summer-lessons.webp", "/images/book-photographs-rain.webp", "/images/book-between-lines.webp", "/images/book-love-parallel.webp"],
  "เรทผู้ใหญ่": ["/images/category-books/generated/mature-rated.png", "/images/category-books/mystery-01.webp", "/images/category-books/mystery-02.webp", "/images/category-books/mystery-03.webp", "/images/category-books/mystery-04.webp", "/images/category-books/mystery-05.webp", "/images/category-books/mystery-06.webp", "/images/category-books/horror-01.webp", "/images/category-books/horror-02.webp", "/images/category-books/horror-03.webp"],
  "โรแมนติกผู้ใหญ่": ["/images/category-books/generated/adult-romance-2.png", "/images/category-books/romantic-01.webp", "/images/category-books/romantic-02.webp", "/images/category-books/romantic-03.webp", "/images/category-books/romantic-04.webp", "/images/category-books/romantic-05.webp", "/images/category-books/romantic-06.webp", "/images/book-love-parallel.webp", "/images/book-summer-lessons.webp", "/images/book-kissed-stars.webp"],
  "อนิเมะผู้ใหญ่": ["/images/category-books/generated/adult-anime.png", "/images/category-books/scifi-01.webp", "/images/category-books/scifi-02.webp", "/images/category-books/scifi-03.webp", "/images/category-books/scifi-04.webp", "/images/category-books/scifi-05.webp", "/images/category-books/scifi-06.webp", "/images/category-books/cartoon-scifi-new.webp", "/images/category-books/cartoon-action-new.webp", "/images/book-parallel-world.webp"],
};

const additionalCategoryStoryTitles: Record<string, string[]> = {
  "รักผู้ใหญ่": ["คืนที่เราเลือกกันและกัน", "เส้นขอบฟ้าของคำสัญญา", "บทสนทนาในห้องสีชา", "หลังฝนพรำที่ปลายทาง", "ระยะห่างของหัวใจ", "จดหมายจากฤดูหนาว", "แสงไฟในคืนเงียบ", "วันพรุ่งนี้ที่มีเรา", "รักครั้งนี้ไม่ขอหลบซ่อน", "บ้านหลังเดิมของความทรงจำ"],
  "วายห้องลับ": ["ประตูบานที่ไม่มีชื่อ", "ความลับใต้แสงจันทร์", "คืนนี้มีเพียงเรา", "เงาในห้องสมุดเก่า", "เมื่อคำลาไม่เคยเกิดขึ้น", "แผนที่ของคนหลงทาง", "เสียงกระซิบหลังม่าน", "ห้องที่เก็บฤดูร้อน", "รอยหมึกบนจดหมายลับ", "ผู้รักษาความลับของผม"],
  "ยูริห้องลับ": ["สวนลับหลังเรือนกระจก", "กลิ่นดอกไม้ในคืนฝน", "เราสองคนใต้แสงจันทร์", "บทเพลงของคนที่รอคอย", "หน้าต่างบานที่เจ็ด", "ความทรงจำสีลาเวนเดอร์", "ก่อนฤดูหนาวจะมาถึง", "เธอในภาพถ่ายเก่า", "ซ่อนรักไว้ในสมุดบันทึก", "ปลายทางของคำว่าบ้าน"],
  "ดราม่าเข้มข้น": ["วันที่จดหมายไม่ถูกส่ง", "ฝนตกในวันที่เราจากกัน", "เสียงเงียบของคนในบ้าน", "เศษแก้วของความทรงจำ", "ฤดูที่ไม่มีเธอ", "ระหว่างทางกลับบ้าน", "คนแปลกหน้าในรูปถ่าย", "บทสุดท้ายของคำขอโทษ", "เมืองที่เราทิ้งไว้", "เมื่อหัวใจต้องเริ่มใหม่"],
  "โรแมนซ์แฟนตาซี": ["เจ้าหญิงแห่งสวนจันทรา", "คำสาปรักแห่งปราสาทหมอก", "กุหลาบของราชันย์เงา", "ดวงดาวเหนือบัลลังก์", "พันธสัญญาแห่งฤดูใบไม้ผลิ", "นักพยากรณ์กับเจ้าชายต้องห้าม", "มนตรารักกลางหุบเขา", "มงกุฎในคืนไร้ดาว", "เมื่อจอมเวทตกหลุมรัก", "อาณาจักรสุดท้ายของเรา"],
  "เกมและโลกเสมือน": ["ผู้เล่นคนสุดท้ายของนครลอยฟ้า", "ภารกิจลับในโลกเสมือน", "รีเซ็ตครั้งนี้ขอมีเธอ", "ดันเจี้ยนใต้แสงนีออน", "ทีมศูนย์กับภารกิจพิชิตบอส", "คำสั่งลับจากระบบกลาง", "เกมรักของผู้เล่นเงา", "เมืองจำลองที่ไม่มีทางออก", "ชีวิตใหม่ในเซิร์ฟเวอร์ที่สิบสาม", "ก่อนโลกจะถูกรีเซ็ต"],
  "อนิเมะ": ["ดาวตกของชมรมหลังเลิกเรียน", "ฤดูร้อนของเราในเมืองลอยฟ้า", "นักเดินทางกับจิ้งจอกสีคราม", "ร้านขนมของวันพรุ่งนี้", "บันทึกเสียงจากดวงจันทร์", "ห้องเรียนที่ซ่อนอยู่ในสายลม", "สัญญาใต้ต้นซากุระ", "รถไฟเที่ยวสุดท้ายสู่ทะเลดาว", "เจ้าของร้านเวทมนตร์มือใหม่", "ภาพวาดของวันวาน"],
  "แฟชั่นและไลฟ์สไตล์": ["ห้องตัดเย็บริมหน้าต่าง", "ฤดูกาลของผ้าไหม", "รันเวย์ใต้แสงอาทิตย์", "ช่างภาพกับชุดเดรสสีฟ้า", "แบรนด์เล็กของความฝันใหญ่", "ดอกไม้บนปกนิตยสาร", "สไตลิสต์คนใหม่ในเมืองเก่า", "รองเท้าคู่แรกของเรา", "แฟชั่นวีคกับหัวใจที่หลงทาง", "คอลเลกชันสุดท้ายของฤดูร้อน"],
  "เรทผู้ใหญ่": ["ห้องหมายเลขสิบสาม", "เงื่อนงำในโรงแรมแกรนด์", "รอยเท้าบนพรมแดง", "คดีคืนฝนตก", "ความจริงหลังประตูไม้", "ผู้โดยสารเที่ยวสุดท้าย", "ภาพวาดที่หายไป", "เสียงโทรศัพท์ยามเที่ยงคืน", "บันทึกของนักสืบไร้นาม", "คืนที่เมืองไม่หลับ"],
  "โรแมนติกผู้ใหญ่": ["เช้าที่เราพบกันอีกครั้ง", "ดินเนอร์ใต้แสงดาว", "บ้านพักริมทะเลของเรา", "ความสัมพันธ์ที่เริ่มจากคำลา", "ฤดูรักในเมืองใหญ่", "ข้อตกลงของหัวใจ", "เธอคือคำตอบของวันวาน", "จังหวะรักบนถนนสายเก่า", "ความทรงจำในห้องรับแขก", "ปลายทางที่เราเลือกเอง"],
  "อนิเมะผู้ใหญ่": ["นครนีออนใต้ฝนดาว", "ปีกเหล็กของผู้พิทักษ์", "รหัสลับจากเมืองจันทรา", "สถานีปลายทางของหุ่นยนต์", "เพลงสุดท้ายของนักบิน", "มหานครที่ไม่มีพระอาทิตย์", "ตำนานดาบแสงสีคราม", "เงาสะท้อนในโลกอนาคต", "ผู้ส่งสารจากกาแล็กซีไกล", "คืนที่เครื่องจักรฝันได้"],
};

const generatedCategoryBooks: Record<string, CategoryBook[]> = Object.fromEntries(
  additionalCategoryNames.map((category, categoryIndex) => {
    const createBooks = (kind: "novel" | "fanfic" | "cartoon") => Array.from({ length: 10 }, (_, index) => {
      const cover = supplementalCovers[(categoryIndex * 3 + index) % supplementalCovers.length];
      const storyTitle = additionalCategoryStoryTitles[category][index];
      const titlePrefix = kind === "fanfic"
        ? `แฟนฟิค${category}: `
        : kind === "cartoon"
          ? `การ์ตูน${category}: `
          : `${category} · `;

      return {
        ...cover,
        title: `${titlePrefix}${storyTitle}`,
        author: cover.author,
        category,
        episodes: String(14 + ((categoryIndex + index) * 4) % 25),
        views: `${220 + ((categoryIndex * 47 + index * 29) % 520)}K`,
        likes: `${(8 + ((categoryIndex * 1.8 + index * 1.3) % 15)).toFixed(1)}K`,
        image: additionalCategoryCoverPools[category][index],
      };
    });

    return [category, [...createBooks("novel"), ...createBooks("fanfic"), ...createBooks("cartoon")]];
  }),
) as Record<string, CategoryBook[]>;

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

Object.assign(categoryBooks, generatedCategoryBooks);

const uniqueFanficCoverPool = Array.from(new Set([
  ...generatedFanficCoverPool,
  ...additionalFanficCoverCandidates,
]));
const usedFanficCoverPaths = new Set<string>();
let fanficCoverCursor = 0;

function takeUnusedFanficCover() {
  while (fanficCoverCursor < uniqueFanficCoverPool.length && usedFanficCoverPaths.has(uniqueFanficCoverPool[fanficCoverCursor])) {
    fanficCoverCursor += 1;
  }

  const cover = uniqueFanficCoverPool[fanficCoverCursor];
  fanficCoverCursor += 1;
  if (!cover) throw new Error("Not enough unique fanfic cover assets");

  usedFanficCoverPaths.add(cover);
  return cover;
}

for (const books of Object.values(categoryBooks)) {
  for (const book of books) {
    if (!book.title.startsWith("แฟนฟิค")) continue;

    book.image = takeUnusedFanficCover();
  }
}

for (const [categoryIndex, [category, books]] of Object.entries(categoryBooks).entries()) {
  const existingFanficCount = books.filter((book) => book.title.startsWith("แฟนฟิค")).length;
  const targetFanficCount = category === "วาย" || category === "ยูริ" ? 40 : 10;
  const missingFanficCount = Math.max(0, targetFanficCount - existingFanficCount);
  if (missingFanficCount === 0) continue;

  const storyTitles = fanficStoryTitlesByCategory[category] ?? Array.from({ length: missingFanficCount }, (_, index) => `เรื่องราวบทใหม่ ${index + 1}`);
  const newFanficBooks = storyTitles.slice(0, missingFanficCount).map((storyTitle, index) => ({
    title: `แฟนฟิค${category}: ${storyTitle} (${fanficFandomByCategory[category] ?? "Original Universe"})`,
    author: fanficAuthors[(categoryIndex + index) % fanficAuthors.length],
    category,
    episodes: String(16 + ((categoryIndex + index * 3) % 24)),
    views: `${190 + ((categoryIndex * 37 + index * 43) % 620)}K`,
    likes: `${(7.1 + ((categoryIndex * 0.7 + index * 0.9) % 13)).toFixed(1)}K`,
    image: category === "วาย" && index >= 9
      ? takeYaNewFanficCover()
      : category === "ยูริ" && index >= 9
        ? takeYuriNewFanficCover()
        : takeUnusedFanficCover(),
  }));

  books.push(...newFanficBooks);
}

for (const [category, books] of Object.entries(categoryBooks)) {
  const existingCartoonCount = books.filter((book) => book.title.startsWith("การ์ตูน")).length;
  const missingCartoonCount = Math.max(0, 10 - existingCartoonCount);
  if (missingCartoonCount === 0) continue;

  const storyTitles = cartoonStoryTitlesByCategory[category] ?? [];
  const newCartoonBooks = storyTitles.slice(0, missingCartoonCount).map((storyTitle, index) => ({
    title: `การ์ตูน${category}: ${storyTitle}`,
    author: ["PanelDawn", "FrameBloom", "StorySketch", "CloudInk", "PixelMori"][index % 5],
    category,
    episodes: String(18 + ((index * 5) % 22)),
    views: `${260 + ((index * 41) % 360)}K`,
    likes: `${(9.2 + ((index * 0.8) % 8)).toFixed(1)}K`,
    image: takeCartoonNewCover(),
  }));

  books.push(...newCartoonBooks);
}

categoryBooks["วาย"].push(...yaNewCartoonTitles.map((storyTitle, index) => ({
  title: `การ์ตูนวาย: ${storyTitle}`,
  author: yaNewCartoonAuthors[index],
  category: "วาย",
  episodes: String(18 + ((index * 3) % 25)),
  views: `${380 + ((index * 43) % 420)}K`,
  likes: `${(11.4 + ((index * 0.9) % 12)).toFixed(1)}K`,
  image: `/images/cartoon-covers/ya-new/ya-${String(index + 1).padStart(2, "0")}.webp`,
})));

for (const books of Object.values(categoryBooks)) {
  for (const book of books) {
    if (book.title.startsWith("การ์ตูน")) usedCartoonCoverPaths.add(book.image);
  }
}

const seenCartoonCoverPaths = new Set<string>();
for (const books of Object.values(categoryBooks)) {
  for (const book of books) {
    if (!book.title.startsWith("การ์ตูน")) continue;
    if (seenCartoonCoverPaths.has(book.image)) book.image = takeCartoonNewCover();
    seenCartoonCoverPaths.add(book.image);
  }
}

export function getCategorySections(category: string): CategorySection[] {
  const books = categoryBooks[category] ?? [];
  return sectionTemplates.map((template, index) => ({
    title: `${template.prefix}${category}${template.suffix}`,
    subtitle: template.subtitle,
    books: books.slice(index * 6, index * 6 + 6),
  }));
}
