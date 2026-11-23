import HeroCarousel, { type HeroCarouselSlide } from "@/components/HeroCarousel";
import PageTitleBar from "@/components/PageTitleBar";
import type { ReadModeId } from "@/components/ReadSubMenu";

type ReadHeroStory = {
  id: string;
  title: string;
  hrefTitle: string;
  author: string;
  description: string;
  alt: string;
};

const novelSlides: ReadHeroStory[] = [
  {
    title: "Sky of Tomorrow",
    hrefTitle: "Sky of Tomorrow",
    author: "AkiStudio",
    id: "sky-of-tomorrow",
    description: "ออกเดินทางข้ามหมู่เกาะลอยฟ้า สู่โลกที่ความหวังอยู่เหนือทะเลเมฆ",
    alt: "ภาพโปรโมตนิยาย Sky of Tomorrow ในโลกแฟนตาซีเหนือหมู่เกาะลอยฟ้า",
  },
  {
    title: "Lemon Days",
    hrefTitle: "Lemon Days",
    author: "sorani",
    id: "lemon-days",
    description: "ความทรงจำในสวนเลมอน กับวันธรรมดาที่ค่อย ๆ กลายเป็นวันพิเศษ",
    alt: "ภาพโปรโมตนิยาย Lemon Days บนสวนดาดฟ้าที่เต็มไปด้วยต้นเลมอน",
  },
  {
    title: "Blood Moon",
    hrefTitle: "Blood Moon",
    author: "Kuroi",
    id: "blood-moon",
    description: "ใต้แสงจันทร์สีเลือด ความลับของเมืองเก่ากำลังตื่นขึ้น",
    alt: "ภาพโปรโมตนิยาย Blood Moon ใต้แสงจันทร์สีเลือด",
  },
  {
    title: "The Starless Archive",
    hrefTitle: "The Starless Archive",
    author: "Moonlit",
    id: "starless-archive",
    description: "ในหอดูดาวกลางทะเล มีความลับที่แม้แต่ท้องฟ้าก็ไม่อาจบันทึกไว้",
    alt: "ภาพโปรโมตนิยาย The Starless Archive ในหอดูดาวกลางทะเล",
  },
  {
    title: "The Clockwork Garden",
    hrefTitle: "The Clockwork Garden",
    author: "AkiStudio",
    id: "clockwork-garden",
    description: "ท่ามกลางสวนที่เคลื่อนไหวด้วยฟันเฟือง ใครบางคนกำลังตามหาอดีตของตัวเอง",
    alt: "ภาพโปรโมตนิยาย The Clockwork Garden ในสวนจักรกลกลางหุบเขา",
  },
];

const fanficSlides: ReadHeroStory[] = [
  {
    title: "Not Just Friends (BTS)",
    hrefTitle: "Not Just Friends (BTS)",
    author: "purplemoon",
    id: "not-just-friends",
    description: "ค่ำคืนริมแม่น้ำ กับความรู้สึกที่อาจมากกว่าคำว่าเพื่อน",
    alt: "ภาพโปรโมตแฟนฟิค Not Just Friends (BTS) ในเมืองยามค่ำคืน",
  },
  {
    title: "Echoes of Us (Stray Kids)",
    hrefTitle: "Echoes of Us (Stray Kids)",
    author: "velvetnote",
    id: "echoes-of-us",
    description: "เมื่อเสียงปรบมือเงียบลง คำพูดที่ค้างไว้ยังดังก้องอยู่หลังเวที",
    alt: "ภาพโปรโมตแฟนฟิค Echoes of Us (Stray Kids) หลังเวทีคอนเสิร์ต",
  },
  {
    title: "Moonlit Promise (BTS)",
    hrefTitle: "Moonlit Promise (BTS)",
    author: "purplemoon",
    id: "moonlit-promise",
    description: "ใต้แสงจันทร์เหนือเมืองใหญ่ คำสัญญาหนึ่งค่อย ๆ เปลี่ยนความสัมพันธ์",
    alt: "ภาพโปรโมตแฟนฟิค Moonlit Promise (BTS) บนสวนดาดฟ้ายามค่ำคืน",
  },
  {
    title: "The Last Spell (Fantasy AU)",
    hrefTitle: "The Last Spell (Fantasy AU)",
    author: "RunePage",
    id: "the-last-spell",
    description: "ในหอจดหมายเหตุแห่งเวทมนตร์ คาถาสุดท้ายอาจเขียนชะตาขึ้นใหม่",
    alt: "ภาพโปรโมตแฟนฟิค The Last Spell (Fantasy AU) ในหอจดหมายเหตุเวทมนตร์",
  },
  {
    title: "Midnight Signal (ENHYPEN)",
    hrefTitle: "Midnight Signal (ENHYPEN)",
    author: "AkiMoon",
    id: "midnight-signal",
    description: "สัญญาณวิทยุยามเที่ยงคืนพาสองคนกลับมาฟังเพลงเดียวกัน",
    alt: "ภาพโปรโมตแฟนฟิค Midnight Signal (ENHYPEN) บนดาดฟ้ายามค่ำคืน",
  },
];

const cartoonSlides: ReadHeroStory[] = [
  {
    title: "มังกรเหนือเมฆา",
    hrefTitle: "การ์ตูนแฟนตาซี: มังกรเหนือเมฆา",
    author: "CloudDragon",
    id: "dragon-above-clouds",
    description: "บินข้ามทะเลเมฆไปกับมังกร แล้วค้นพบดินแดนที่ซ่อนอยู่บนฟ้า",
    alt: "ภาพโปรโมตการ์ตูน มังกรเหนือเมฆา ในโลกเหนือหมู่เมฆ",
  },
  {
    title: "นครโฮโลแกรม",
    hrefTitle: "การ์ตูนไซไฟ: นครโฮโลแกรม",
    author: "NeonPanel",
    id: "hologram-city",
    description: "เมืองแห่งอนาคตมีเรื่องให้ค้นหาอยู่เบื้องหลังแสงของโฮโลแกรม",
    alt: "ภาพโปรโมตการ์ตูน นครโฮโลแกรม ในเมืองแห่งอนาคต",
  },
  {
    title: "ปาร์ตี้พันสายรุ้ง",
    hrefTitle: "การ์ตูนคอมเมดี้: ปาร์ตี้พันสายรุ้ง",
    author: "JoyPanel",
    id: "rainbow-party",
    description: "เพื่อน ๆ ชวนกันไปงานเทศกาลที่เต็มไปด้วยสีสันและเสียงหัวเราะ",
    alt: "ภาพโปรโมตการ์ตูน ปาร์ตี้พันสายรุ้ง ในเทศกาลสีสันสดใส",
  },
  {
    title: "หอนาฬิกาคืนฝน",
    hrefTitle: "การ์ตูนลึกลับ: หอนาฬิกาคืนฝน",
    author: "NoirPanel",
    id: "rain-clocktower",
    description: "ฝนตกไม่หยุด และหอนาฬิกาเก่ากำลังบอกใบ้ถึงความลับของเมือง",
    alt: "ภาพโปรโมตการ์ตูน หอนาฬิกาคืนฝน ในเมืองเก่ายามค่ำคืน",
  },
  {
    title: "ปราสาทบนฟ้า",
    hrefTitle: "การ์ตูนเกิดใหม่: ปราสาทบนฟ้า",
    author: "DawnPanel",
    id: "sky-castle",
    description: "เหนือทะเลเมฆยามเย็น ปราสาทลอยฟ้ารอให้ใครสักคนไปถึง",
    alt: "ภาพโปรโมตการ์ตูน ปราสาทบนฟ้า เหนือทะเลเมฆ",
  },
];

const heroes: Record<ReadModeId, { label: string; path: string; actionArtId: string; stories: ReadHeroStory[] }> = {
  novel: { label: "นิยาย", path: "/read", actionArtId: "fantasy", stories: novelSlides },
  fanfic: { label: "แฟนฟิค", path: "/read/fanfic", actionArtId: "boylove", stories: fanficSlides },
  cartoon: { label: "การ์ตูน", path: "/read/cartoon", actionArtId: "readathon", stories: cartoonSlides },
};

const slidesByMode = Object.fromEntries(
  Object.entries(heroes).map(([mode, hero]) => [mode, hero.stories.map((story): HeroCarouselSlide => {
    const image = `/images/read-banners/${mode}/${story.id}`;
    return {
      id: story.id,
      title: story.title,
      category: hero.label,
      description: story.description,
      author: story.author,
      imageAlt: story.alt,
      href: `${hero.path}?title=${encodeURIComponent(story.hrefTitle)}`,
      bookmarkTitle: story.hrefTitle,
      actionLabel: "อ่านเรื่องนี้",
      actionArtId: hero.actionArtId,
      art: {
        desktop: `${image}-pc-art-title.webp`,
        tablet: `${image}-tablet-art-title.webp`,
        mobile: `${image}-mobile-art-title.webp`,
      },
    };
  })]),
) as Record<ReadModeId, HeroCarouselSlide[]>;

export default function ReadHero({ activeMode }: { activeMode: ReadModeId }) {
  return (
    <>
      <HeroCarousel key={activeMode} ariaLabel={`${heroes[activeMode].label}แนะนำ`} slides={slidesByMode[activeMode]} />
      <PageTitleBar variant={activeMode} />
    </>
  );
}
