import {
  categoryBooks,
  fanficFandomByCategory,
  type CategoryBook,
} from "@/data/categoryBooks";
import { discoverySections } from "@/data/discoverySections";
import { resolveStoryStatus } from "@/data/storyStatus";
import { recommendedWriters } from "@/components/writerData";
import type { ReadModeId } from "@/components/ReadSubMenu";

const extraNovels: CategoryBook[] = [
  {
    title: "The Starless Archive",
    author: "Moonlit",
    category: "ลึกลับ",
    episodes: "32",
    views: "482K",
    likes: "12.6K",
    image: "/images/book-city-echoes.webp",
  },
  {
    title: "The Clockwork Garden",
    author: "AkiStudio",
    category: "แฟนตาซี",
    episodes: "24",
    views: "386K",
    likes: "10.8K",
    image: "/images/category-books/fantasy-04.webp",
  },
];

const catalog = [
  ...discoverySections.flatMap((section) => section.books),
  ...extraNovels,
  ...Object.values(categoryBooks).flat(),
];

function displayTitle(book: CategoryBook) {
  return book.title
    .replace(new RegExp(`^${book.category} · `), "")
    .replace(new RegExp(`^แฟนฟิค${book.category}: `), "")
    .replace(new RegExp(`^การ์ตูน${book.category}: `), "")
    .replace(/\s·\s(?:บทพิเศษ|ฤดูใหม่|ความทรงจำอีกด้าน|หลังวันนั้น)$/, "");
}

function readMode(book: CategoryBook): ReadModeId {
  if (book.title.startsWith("การ์ตูน")) return "cartoon" as const;
  if (book.title.startsWith("แฟนฟิค") || /\([^()]+\)\s*$/.test(book.title))
    return "fanfic" as const;
  return "novel" as const;
}

const genreSynopses: Record<string, string> = {
  แฟนตาซี:
    "เมื่อหมู่เกาะลอยฟ้าเริ่มร่วงหล่นจากท้องฟ้าทีละแห่ง ‘เรน’ เด็กหนุ่มผู้ซ่อมเข็มทิศในเมืองชายขอบ ได้รับจดหมายจากพ่อที่หายตัวไปเมื่อสิบปีก่อน จดหมายนั้นพาเขาไปพบกับ ‘ลูนา’ นักอ่านแผนที่ดวงดาว ผู้เชื่อว่าดินแดนเหนือเมฆยังซ่อนวันพรุ่งนี้เอาไว้ ทั้งคู่จึงออกเดินทางตามเส้นทางที่ไม่มีอยู่บนแผนที่ โดยไม่รู้ว่าทุกครั้งที่ใช้เข็มทิศ ความทรงจำหนึ่งจะหายไปตลอดกาล",
  โรแมนติก:
    "‘นับดาว’ กลับมาเปิดร้านหนังสือเล็ก ๆ ของคุณยาย หลังจากใช้ชีวิตในเมืองใหญ่มานานห้าปี ที่นี่เธอพบ ‘ธาม’ ลูกค้าประจำที่ชอบทิ้งข้อความสั้น ๆ ไว้ในหนังสือมือสอง จากคำทักทายที่ไม่มีชื่อผู้ส่ง ค่อย ๆ กลายเป็นบทสนทนาที่ช่วยเยียวยาสองหัวใจ แต่เมื่ออดีตที่ต่างคนต่างเก็บไว้เดินทางกลับมา ทั้งคู่จะกล้าเขียนตอนจบครั้งใหม่ด้วยกันหรือเปล่า",
  ลึกลับ:
    "จดหมายที่ไม่มีผู้ส่งมาถึง ‘เมธา’ ในคืนเดียวกับที่หอนาฬิกาเก่าหยุดเดิน ภายในมีภาพถ่ายของคนเจ็ดคน และวันเวลาของเหตุการณ์ที่ยังไม่เกิดขึ้น ยิ่งตามหาความจริง เขายิ่งพบว่าคนในภาพล้วนเกี่ยวข้องกับการหายตัวไปของน้องสาวเมื่อสิบสองปีก่อน และชื่อสุดท้ายในจดหมายก็คือชื่อของเขาเอง",
  สยองขวัญ:
    "บ้านเช่าริมป่ามีกฎเพียงสามข้อ ห้ามเปิดหน้าต่างหลังเที่ยงคืน ห้ามตอบเสียงเรียกจากชั้นบน และห้ามนับจำนวนคนที่โต๊ะอาหาร ‘ริน’ คิดว่ามันเป็นเพียงเรื่องเล่าของเจ้าของบ้าน จนคืนแรกที่เธอได้ยินเสียงแม่ผู้จากไปแล้วเรียกชื่อเธอจากห้องที่ถูกล็อก",
  วาย: "‘เหนือ’ กับ ‘คราม’ เคยเป็นเพื่อนสนิทที่ห่างกันไปโดยไม่มีคำลา การกลับมาพบกันในโปรเจกต์ปีสุดท้ายทำให้ทั้งคู่ต้องเริ่มบทสนทนาที่ค้างอยู่ใหม่อีกครั้ง ระหว่างงานที่ต้องส่ง เพลงที่เคยฟังด้วยกัน และความรู้สึกที่ไม่เคยเปลี่ยน ใครสักคนจะยอมพูดความจริงก่อนฤดูฝนนี้จบลงหรือไม่",
  ยูริ: "เมื่อ ‘พิมพ์’ ย้ายกลับมาอยู่บ้านริมทะเล เธอได้พบกับ ‘อุ่น’ นักวาดภาพผู้มองเห็นสีสันในวันที่เธอเห็นเพียงความว่างเปล่า จากการช่วยกันฟื้นฟูสตูดิโอเล็ก ๆ กลายเป็นความผูกพันที่ค่อย ๆ เติบโต ท่ามกลางคลื่นลม ความฝัน และคำสัญญาว่าครั้งนี้จะไม่ปล่อยมือกันง่าย ๆ",
};

const chapterNames = [
  "จดหมายจากวันพรุ่งนี้",
  "เข็มทิศที่ไม่ชี้ทิศเหนือ",
  "ผู้มาเยือนหลังฝน",
  "แผนที่ที่หายไป",
  "ประตูอีกด้านของเมือง",
  "คำสัญญาใต้แสงดาว",
  "เสียงกระซิบในห้องสมุด",
  "ก่อนตะวันลับขอบฟ้า",
  "บนเส้นทางที่ไม่รู้จัก",
  "ความลับของคนเดินทาง",
  "วันที่เราได้พบกัน",
  "ดาวดวงสุดท้าย",
  "ชื่อที่ถูกลืม",
  "ระหว่างความจริงกับความฝัน",
  "คืนที่โลกเงียบงัน",
  "ใต้ฟ้าเดียวกัน",
  "ร่องรอยบนกระดาษ",
  "เมื่อคำตอบอยู่ใกล้กว่าที่คิด",
  "คนที่ยังรออยู่",
  "การเดินทางครั้งใหม่",
  "แสงจากความมืด",
  "คำสัญญาในวันนั้น",
  "เส้นทางที่แตกต่าง",
  "เราจะได้พบกันอีกไหม",
  "ก่อนพระอาทิตย์ตก",
  "ความจริงที่ถูกซ่อนไว้",
];

export function getNovelDetails(
  requestedTitle: string,
  requestedMode?: ReadModeId,
) {
  const title = requestedTitle.trim().slice(0, 160);
  const source = catalog.find(
    (book) =>
      (book.title === title ||
        displayTitle(book) === title ||
        (requestedMode === "fanfic" &&
          `${displayTitle(book)} (${fanficFandomByCategory[book.category] ?? "Original Universe"})` ===
            title)) &&
      (!requestedMode || readMode(book) === requestedMode),
  );
  const book = source ?? {
    ...discoverySections[0].books[1],
    title,
    author: "AkiStudio",
  };
  const mode = requestedMode ?? readMode(book);
  const writer = recommendedWriters.find(
    (item) => item.name.toLowerCase() === book.author.toLowerCase(),
  );
  const count = Math.max(1, Number.parseInt(book.episodes, 10) || 26);
  const status = resolveStoryStatus(book);
  const sameGenre = catalog.filter(
    (item) =>
      item.category === book.category &&
      item.title !== book.title &&
      readMode(item) === mode,
  );
  const relatedBooks = Array.from(
    new Map(
      sameGenre.map((item) => [
        displayTitle(item),
        { ...item, title: displayTitle(item) },
      ]),
    ).values(),
  ).slice(0, 8);
  const date = new Date(Date.UTC(2026, 9, 2));
  const episodes = Array.from({ length: count }, (_, index) => {
    const number = count - index;
    const episode = {
      number,
      title: chapterNames[(number - 1) % chapterNames.length],
      date: date.toISOString().slice(0, 10),
      locked: status === "ongoing" && number === count,
      isNew: index === 0,
    };
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() === 5 ? 3 : 4));
    return episode;
  });

  return {
    ...book,
    title: displayTitle(book),
    mode,
    storageTitle: requestedTitle,
    subtitle: title === "Sky of Tomorrow" ? "ท้องฟ้าแห่งวันพรุ่งนี้" : "",
    status,
    rating: "4.8",
    reviewCount: 326,
    ageRating: /ผู้ใหญ่|เรท/.test(book.category) ? "18+" : "15+",
    synopsis:
      genreSynopses[book.category] ??
      "ชีวิตธรรมดาของคนสองคนเปลี่ยนไป เมื่อจดหมายฉบับหนึ่งพาพวกเขากลับไปพบความฝันที่เคยทิ้งไว้ ระหว่างทางมีทั้งมิตรภาพ ความลับ และทางเลือกที่ไม่อาจย้อนกลับ เรื่องราวของการค้นหาตัวเองและการเริ่มต้นใหม่ แม้จะยังไม่รู้ว่าวันพรุ่งนี้จะเป็นอย่างไร",
    authorAvatar: writer?.image ?? "/images/profile-arn.webp",
    authorSlug: writer?.slug ?? book.author.toLowerCase().replace(/\s+/g, "-"),
    authorBio:
      writer?.bio ??
      "เขียนเรื่องราวเล็ก ๆ ที่อยากให้คุณพกติดหัวใจไปด้วย ขอบคุณที่เดินทางมาด้วยกันนะครับ",
    authorFollowers: writer?.followers ?? "8.1K",
    authorWorks: writer?.works ?? "11",
    tags: [book.category, "การเดินทาง", "มิตรภาพ", "เติบโต", "ความทรงจำ"],
    episodes,
    relatedBooks,
    authorBooks: Array.from(
      new Map(
        catalog
          .filter(
            (item) => item.author === book.author && item.title !== book.title,
          )
          .map((item) => [
            displayTitle(item),
            { ...item, title: displayTitle(item) },
          ]),
      ).values(),
    ).slice(0, 8),
    continueEpisode: Math.min(12, count),
  };
}

export type NovelDetails = ReturnType<typeof getNovelDetails>;
