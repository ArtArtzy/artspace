"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import type { ReadModeId } from "@/components/ReadSubMenu";
import type { NovelDetails } from "@/data/novelDetails";
import styles from "./StoryReaderPage.module.css";

type Chapter = NovelDetails["episodes"][number];
type ReaderPreferences = { size: number; theme: "night" | "paper"; width: "narrow" | "wide" };

const skyChapter = [
  "เสียงระฆังจากหอคอยทิศตะวันออกดังขึ้นสามครั้งในยามที่เมืองทั้งเมืองควรหลับใหล เรนเงยหน้าจากแผนที่เก่าใต้แสงตะเกียง เปลวไฟสั่นวูบทั้งที่หน้าต่างปิดสนิท แล้วเข็มทิศทองเหลืองบนโต๊ะก็หมุนกลับทิศอย่างช้า ๆ ราวกับกำลังฟังเสียงบางอย่างจากใต้พื้นดิน",
  "ลูนาวางถ้วยชาลงข้างมือเขา “มันเริ่มอีกแล้วใช่ไหม” เธอถาม ดวงตาสะท้อนแสงดาวจากหน้าต่างสูง เรนพยักหน้า เขาไม่ได้บอกเธอว่าตั้งแต่คืนก่อน เขาฝันถึงสะพานหินที่ทอดไปกลางท้องฟ้า และมีใครคนหนึ่งยืนรออยู่ปลายทางพร้อมเรียกชื่อที่เขาจำไม่ได้",
  "บนแผนที่มีรอยหมึกจาง ๆ ปรากฏขึ้นตรงหุบเขานอกกำแพงเมือง เป็นเส้นทางที่ไม่เคยอยู่ตรงนั้นมาก่อน มันลากผ่านป่าสน ข้ามแม่น้ำที่แห้งไปเมื่อหลายร้อยปีก่อน แล้วสิ้นสุดตรงเครื่องหมายรูปดาวซึ่งถูกขูดทับซ้ำหลายครั้ง เรนเอานิ้วแตะขอบกระดาษ ความเย็นแล่นขึ้นมาตามปลายนิ้วจนเขาต้องชักมือกลับ",
  "“ถ้าแผนที่กำลังชี้ทาง มันก็ต้องการให้เราไปถึงที่ไหนสักแห่ง” ลูนาพูด เธอเปิดสมุดบันทึกเล่มเล็กที่พกติดตัวมาตลอด ตั้งแต่ทั้งคู่เริ่มตามหาต้นกำเนิดของเศษดาว “แต่ก่อนออกเดินทาง เราต้องรู้ก่อนว่าทำไมชื่อของเธอถึงหายไปจากบันทึกทุกเล่ม”",
  "คำถามนั้นทำให้ห้องเงียบลง เรนมองช่องว่างบนหน้ากระดาษซึ่งควรเป็นชื่อของเขา ลายมือของพ่อเขียนไว้ครบทุกบรรทัด ยกเว้นตรงนั้น เหลือเพียงรอยขูดสีเทาและรอยไหม้เล็ก ๆ ที่ขอบ เขาเคยคิดว่าเป็นความผิดพลาดของคนคัดลอก แต่ตอนนี้เริ่มไม่แน่ใจว่าความทรงจำที่มีอยู่เป็นของตัวเองทั้งหมดหรือไม่",
  "ก่อนรุ่งสาง ทั้งสองออกจากหอจดหมายเหตุทางประตูหลัง เมืองยังจมอยู่ในหมอกและร้านรวงยังไม่เปิด มีเพียงช่างทำขนมปังตรงหัวมุมที่ยกมือทักลูนาเหมือนทุกเช้า เรนหยุดมองป้ายร้านที่เขียนชื่อถนนด้วยหมึกสีน้ำเงิน ป้ายเดียวกันกับที่เขาเห็นในความฝันจนจำรอยแตกตรงมุมได้ทุกเส้น",
  "เมื่อพ้นกำแพงเมือง ลมเหนือพัดแรงขึ้น กลีบดอกไม้สีเงินปลิวสวนทางกับทิศลมและลอยสูงขึ้นไปบนฟ้า เข็มทิศหยุดหมุน หันปลายเข็มไปทางสะพานหินที่ไม่มีอยู่ในแผนที่เดิม ลูนาขมวดคิ้ว “ถ้ามันพาเราไปยังสถานที่ในฝัน เธอจะยังอยากไปไหม”",
  "เรนใช้เวลาคิดอยู่ครู่หนึ่ง “ฉันอยากรู้ว่าทำไมทุกคนถึงพยายามลืมมัน” เขาตอบ “แล้วถ้าคำตอบเกี่ยวกับฉันจริง ๆ ฉันก็อยากได้ยินจากคนที่อยู่ที่นั่น ไม่ใช่จากหน้ากระดาษที่ถูกแก้ไขแล้ว”",
  "สะพานปรากฏขึ้นเมื่อดวงอาทิตย์แตะขอบฟ้า หินแต่ละก้อนโปร่งใสราวแก้วและมีแสงไหลอยู่ข้างใน ใต้สะพานไม่มีหุบเหว แต่เป็นทะเลหมู่เมฆที่เคลื่อนช้า ๆ ไกลออกไป ยอดหอคอยของเมืองอีกแห่งโผล่พ้นหมอกขึ้นมา ลูนาจับข้อมือเรนไว้แน่นพอให้เขารู้ว่าเธอกลัว แต่ไม่มากพอจะรั้งเขาไว้",
  "ก้าวแรกทำให้เสียงระฆังดังขึ้นอีกครั้ง คราวนี้เสียงมาจากใต้เท้า ทุกก้าวที่เดินไปบนสะพานจะปรากฏภาพสั้น ๆ ในแสงของหิน—มือเด็กคนหนึ่งกำลังวาดดาวบนหน้าต่าง เสียงหัวเราะในห้องครัว และผู้หญิงที่สวมผ้าคลุมสีน้ำเงินกำลังเอ่ยคำสัญญา ภาพสุดท้ายทำให้เรนหยุดเดิน เพราะน้ำเสียงนั้นเหมือนเสียงของแม่ที่เขาจำได้จากความฝัน",
  "ลูนาก้มมองพื้นหิน “ฉันเห็นสถานีรถไฟ” เธอกระซิบ “ทั้งที่ฉันไม่เคยมาที่นี่มาก่อน” บนกระจกใสมีภาพหญิงสาวอีกคนยืนอยู่ข้างเธอ ใบหน้าคล้ายกันจนแทบแยกไม่ออก ทว่าคนในภาพมีรอยแผลเป็นเหนือคิ้วซ้าย ลูนาลูบรอยแผลของตัวเองโดยไม่รู้ตัว",
  "กลางสะพานมีเสาหินเตี้ยตั้งอยู่ บนยอดวางกล่องจดหมายไม้เก่า ภายในมีจดหมายฉบับหนึ่งจ่าหน้าถึงเรน ลายมือบนซองเป็นลายมือของเขาเอง แต่วันที่ระบุคือวันพรุ่งนี้ เรนลังเลก่อนเปิดอ่าน กระดาษด้านในมีเพียงประโยคเดียว—“หากเธอจำทุกอย่างได้ ลูนาจะไม่มีวันกลับบ้าน”",
  "ลูนาถอยออกจากเขาหนึ่งก้าว เสียงลมรอบสะพานสงบลงจนได้ยินเพียงเสียงกระดาษในมือเรน “นี่เป็นคำเตือน หรือคำขู่” เธอถาม เขาไม่ตอบทันที เพราะใต้ข้อความมีรอยหมึกอีกชั้นที่กำลังจางหาย ราวกับมีใครกำลังเขียนต่อจากอีกฟากหนึ่งของเวลา",
  "เข็มทิศส่องแสงขึ้นและฝาเปิดเอง เศษดาวชิ้นเล็กซ่อนอยู่ด้านใน พร้อมภาพสะท้อนของคนสามคนแทนที่จะเป็นสอง เรนเห็นตัวเองในวัยเด็ก เห็นลูนาที่สวมเสื้อคลุมแบบเดียวกับในกระจก และเห็นเงาคนที่สามยืนหันหลังอยู่ไกลออกไป เงานั้นยกมือขึ้นเคาะกระจกจากอีกด้าน",
  "เสียงเคาะดังขึ้นจริง ๆ จากเสาหินใต้กล่องจดหมาย หนึ่งครั้ง สองครั้ง แล้วหยุด เรนพับจดหมายเก็บไว้โดยไม่ให้ลูนาหยุดมอง เขารู้ว่าความลับไม่อาจปลอดภัยขึ้นเพียงเพราะเลือกไม่พูด แต่ในวินาทีนั้น เขาต้องการเวลาอีกเล็กน้อยเพื่อหาคำตอบที่ไม่ทำให้เธอต้องเลือกระหว่างความจริงกับบ้านของตัวเอง",
  "ทั้งคู่เดินต่อไปยังปลายสะพาน เมื่อหมอกเปิดออก ประตูเมืองที่ไม่ปรากฏบนแผนที่ก็เผยตัวอยู่ตรงหน้า เหนือซุ้มประตูมีชื่อสลักไว้เพียงครึ่งเดียว อีกครึ่งถูกลบจนเหลือร่องลึก เรนยกมือแตะหิน และเป็นครั้งแรกที่เขาจำเสียงของแม่ได้ชัดเจน—“ถ้าลูกกลับมา อย่ามาคนเดียว”",
  "ลูนาหันมามองเขา เหมือนรู้ว่าเขาเพิ่งได้ยินบางสิ่ง “เราจะเข้าไปด้วยกัน” เธอบอก ก่อนที่เขาจะทันตอบ ประตูค่อย ๆ เปิดออกเอง และมีแสงอุ่นจากเมืองด้านในทอดยาวมาถึงปลายเท้า ขณะเดียวกัน เข็มทิศกลับชี้ย้อนกลับไปยังบ้านของเธอ",
  "เรนเก็บเข็มทิศลงกระเป๋า เขายังไม่รู้ว่าจดหมายมาจากอนาคตจริงหรือไม่ และไม่รู้ว่าเงาคนที่สามเป็นใคร แต่เขาเริ่มเข้าใจแล้วว่าการเดินทางครั้งนี้ไม่ได้ถามเพียงว่าใครเป็นคนลบชื่อของเขา มันกำลังถามด้วยว่าเมื่อความทรงจำกลับคืนมา เขาจะยอมเสียอะไรเพื่อรักษาคนที่เดินเคียงข้างกันมาตลอด",
];

const generalChapter = [
  "ฝนโปรยลงบนหลังคาเมืองเก่าตั้งแต่ก่อนฟ้าสาง หยดน้ำไหลตามรางทองแดงแล้วตกลงบนพื้นหินเป็นจังหวะไม่สม่ำเสมอ ตัวเอกยืนอยู่ใต้ชายคาร้านที่ปิดไฟ มองถนนเส้นเดิมซึ่งวันนี้ดูแปลกตาไปเพราะมีจดหมายฉบับหนึ่งวางอยู่บนม้านั่ง ไม่มีชื่อผู้ส่ง มีเพียงตราประทับที่เขาคิดว่าตัวเองเคยเห็นในวัยเด็ก",
  "กระดาษด้านในมีกลิ่นจาง ๆ ของควันและหมึกเก่า ข้อความสั้น ๆ บอกให้ไปพบกันที่สถานีปลายทางก่อนรถเที่ยวสุดท้าย พร้อมคำเตือนว่าอย่าพาใครไปด้วย เขาอ่านซ้ำสองครั้ง พยายามหาคำอธิบายที่สมเหตุสมผล แต่ความทรงจำที่ไม่อยากนึกถึงก็กลับชัดขึ้นมาทีละน้อย",
  "เมื่อไปถึงสถานี ผู้คนบางตากว่าที่คิด เสียงประกาศดังแผ่วจากลำโพงที่มีเสียงรบกวน ม้านั่งแถวสุดท้ายมีใครบางคนนั่งหันหลังให้ เสื้อคลุมเปียกฝนและกระเป๋าใบเล็กวางข้างตัว เขาจำท่าทางนั้นได้ก่อนเห็นใบหน้าเสียอีก",
  "“นึกว่าจะไม่มาแล้ว” อีกฝ่ายพูดโดยไม่หันกลับมา น้ำเสียงยังเหมือนเดิมทุกอย่าง ยกเว้นความเหนื่อยล้าที่ซ่อนอยู่ใต้ถ้อยคำ ตัวเอกนั่งลงเว้นระยะหนึ่งที่นั่ง ระหว่างพวกเขามีเรื่องที่ไม่เคยพูดถึงวางอยู่มากกว่ากระเป๋าเดินทางทั้งใบ",
  "รถไฟเที่ยวสุดท้ายเลื่อนเวลาออกไปอีกสิบห้านาที สถานีจึงเงียบพอให้ได้ยินเสียงฝนที่กระทบหลังคา ทั้งคู่เริ่มคุยเรื่องเล็กน้อย—ร้านอาหารที่เคยไป ถนนที่เปลี่ยนไป และคนรู้จักที่ย้ายออกจากเมือง—จนบทสนทนาค่อย ๆ เดินมาถึงวันที่ต่างคนต่างเลือกหายไปจากชีวิตของกันและกัน",
  "ไม่มีใครขอโทษทันที คำขอโทษที่เตรียมมาในใจดูเล็กเกินไปเมื่อวางลงตรงหน้าอีกฝ่าย พวกเขาจึงเริ่มจากการเล่าความจริงคนละส่วน สิ่งที่ตอนนั้นเข้าใจผิด สิ่งที่กลัวจะพูด และสิ่งที่ยังเสียใจแม้เวลาจะผ่านไปหลายปี",
  "บนชานชาลา แสงไฟกะพริบครั้งหนึ่งก่อนกลับมาติด เสียงล้อเหล็กจากทางโค้งดังใกล้เข้ามา อีกฝ่ายยื่นตั๋วใบหนึ่งให้ ตรงมุมมีข้อความเขียนด้วยลายมือที่ตัวเอกจำได้ว่าเป็นของใครบางคนซึ่งจากไปนานแล้ว ประโยคนั้นทำให้ความเงียบระหว่างทั้งคู่เปลี่ยนความหมายไป",
  "“ถ้าเราขึ้นรถไฟขบวนนี้ เรื่องทั้งหมดจะเริ่มใหม่ได้ไหม” เขาถาม คำตอบไม่ได้มาในทันที อีกฝ่ายมองแสงจากปลายรางแล้วค่อยส่ายหน้า “คงเริ่มใหม่ไม่ได้ แต่เราอาจเลือกได้ว่าจะพามันไปต่อยังไง”",
  "ประตูรถไฟเปิดออกพร้อมลมอุ่นและกลิ่นฝุ่นจากเบาะเก่า ตัวเอกมองตั๋วในมือก่อนมองคนข้าง ๆ ไม่มีใครสัญญาว่าทุกอย่างจะง่ายขึ้น ไม่มีใครบอกว่าความเชื่อใจจะกลับมาเหมือนเดิม แต่การก้าวขึ้นไปด้วยกันอาจเป็นคำตอบที่พอสำหรับคืนนี้",
  "รถไฟเคลื่อนออกจากสถานีช้า ๆ เมืองที่คุ้นเคยค่อย ๆ ถอยไปหลังหน้าต่าง ในกระจกมีเงาของคนสองคนซ้อนอยู่กับแสงไฟริมทาง ตัวเอกวางจดหมายไว้บนโต๊ะพับ ไม่ได้เก็บซ่อนเหมือนที่เคยทำ และเป็นครั้งแรกในรอบนานที่เขาไม่รีบหันหนีจากคำถามที่ยังตอบไม่ได้",
  "เมื่อถึงสถานีถัดไป มือถือของเขาสั่นขึ้น หน้าจอแสดงข้อความจากหมายเลขที่ไม่มีชื่อผู้ติดต่อ: “อย่าเชื่อสิ่งที่เขาเล่า เรื่องคืนนั้นยังมีอีกคนอยู่ด้วย” เขาเงยหน้าขึ้น อีกฝ่ายกำลังมองออกไปนอกหน้าต่างโดยไม่รู้ว่าข้อความนั้นมาถึงแล้ว",
  "เขาเลือกไม่ส่งโทรศัพท์ให้ดูในทันที แต่ไม่ได้ลบข้อความทิ้ง เขาบันทึกเวลาและหมายเลขไว้ แล้วเริ่มถามคำถามใหม่ทีละข้อ รถไฟวิ่งต่อไปในคืนฝนพรำ ขณะที่ความจริงซึ่งทั้งคู่หลีกเลี่ยงมานานเริ่มเผยให้เห็นว่าการกลับมาพบกันครั้งนี้อาจไม่ใช่เรื่องบังเอิญ",
];

function Icon({ name }: { name: "back" | "bookmark" | "comment" | "more" | "close" | "sun" | "moon" | "heart" | "share" }) {
  const paths: Record<string, ReactNode> = {
    back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h12" /></>,
    bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-4-6 4z" />,
    comment: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.8-3.2A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.9 13A8 8 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />,
    heart: <path d="M20.8 8.7c0 4.2-8.8 10.2-8.8 10.2S3.2 12.9 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.4" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function StoryReaderPage({ novel, episode }: { novel: NovelDetails; episode: Chapter }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preferences, setPreferences] = useState<ReaderPreferences>({ size: 19, theme: "night", width: "narrow" });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>(["ชอบจังหวะที่ค่อย ๆ เผยปมมากค่ะ อ่านแล้วอยากรู้ว่าจดหมายมาจากไหน", "บรรยากาศเหมือนเดินอยู่ในเมืองเดียวกับตัวละครเลย รอตอนต่อไปนะครับ"]);
  const backPath = novel.mode === "fanfic" ? "/read/fanfic" : novel.mode === "cartoon" ? "/read/cartoon" : "/read";
  const backHref = `${backPath}?title=${encodeURIComponent(novel.storageTitle)}`;
  const chapterLink = (number: number) => `/read/episode?title=${encodeURIComponent(novel.storageTitle)}&episode=${number}&mode=${novel.mode}`;
  const previous = novel.episodes.find((item) => item.number === episode.number - 1 && !item.locked);
  const next = novel.episodes.find((item) => item.number === episode.number + 1 && !item.locked);
  const paragraphs = useMemo(() => novel.title === "Sky of Tomorrow" ? skyChapter : generalChapter, [novel.title]);
  const modeLabel: Record<ReadModeId, string> = { novel: "นิยาย", fanfic: "แฟนฟิก", cartoon: "การ์ตูน" };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`arnspace-reader:${novel.storageTitle}`);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ReaderPreferences>;
        setPreferences((current) => ({ ...current, ...parsed }));
      }
      setBookmarked(localStorage.getItem(`arnspace-bookmark:${novel.storageTitle}:${episode.number}`) === "true");
    } catch { /* keep reader usable when storage is unavailable */ }
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / available) * 100)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [novel.storageTitle, episode.number]);

  const updatePreferences = (changes: Partial<ReaderPreferences>) => {
    const updated = { ...preferences, ...changes };
    setPreferences(updated);
    try { localStorage.setItem(`arnspace-reader:${novel.storageTitle}`, JSON.stringify(updated)); } catch { /* optional preference */ }
  };

  return (
    <main className={styles.reader} data-theme={preferences.theme} style={{ "--reader-size": `${preferences.size}px` } as CSSProperties}>
      <div className={styles.backdrop} style={{ backgroundImage: `linear-gradient(90deg, var(--reader-paper) 0%, color-mix(in srgb, var(--reader-paper) 88%, transparent) 22%, color-mix(in srgb, var(--reader-paper) 90%, transparent) 78%, var(--reader-paper) 100%), linear-gradient(0deg, var(--reader-paper), transparent 55%, var(--reader-paper)), url("${novel.image}")` }} />
      <header className={styles.topbar}>
        <Link href={backHref} className={styles.back} aria-label="กลับไปหน้ารายละเอียด"><Icon name="back" /></Link>
        <Link href={backPath} className={styles.brand}><Image src="/images/arnspace-logo.webp" alt="ARN SPACE" width={166} height={56} priority /></Link>
        <span className={styles.mode}>{modeLabel[novel.mode]}</span>
        <Link href={backHref} className={styles.storyName}>{novel.title}</Link>
        <span className={styles.separator} />
        <span className={styles.chapterName}>ตอนที่ {episode.number} — {episode.title}</span>
        <div className={styles.tools}>
          <button type="button" onClick={() => setSettingsOpen((open) => !open)} aria-expanded={settingsOpen} aria-label="ตั้งค่าการอ่าน" className={styles.toolText}>Aa</button>
          <button type="button" onClick={() => { const value = !bookmarked; setBookmarked(value); try { localStorage.setItem(`arnspace-bookmark:${novel.storageTitle}:${episode.number}`, String(value)); } catch { /* optional bookmark */ } }} aria-pressed={bookmarked} aria-label={bookmarked ? "นำออกจากที่คั่น" : "คั่นหน้าตอนนี้"} className={bookmarked ? styles.activeTool : ""}><Icon name="bookmark" /></button>
          <a href="#comments" aria-label="ไปที่ความคิดเห็น"><Icon name="comment" /></a>
          <button type="button" aria-label="การดำเนินการเพิ่มเติม" onClick={() => navigator.clipboard?.writeText(window.location.href)}><Icon name="more" /></button>
        </div>
      </header>
      <div className={styles.progressLine} aria-label={`อ่านแล้ว ${progress}%`}><div style={{ width: `${progress}%` }} /><span>{progress}%</span><small>{episode.number} / {novel.episodes.length} หน้า</small></div>

      {settingsOpen && <aside className={styles.settings} aria-label="การตั้งค่าการอ่าน">
        <div className={styles.settingsHead}><strong>การตั้งค่าการอ่าน</strong><button type="button" onClick={() => setSettingsOpen(false)} aria-label="ปิดการตั้งค่า"><Icon name="close" /></button></div>
        <label>ขนาดตัวอักษร <span>{preferences.size}px</span><input type="range" min="16" max="25" value={preferences.size} onChange={(event) => updatePreferences({ size: Number(event.target.value) })} /></label>
        <div><span>ธีมการอ่าน</span><div className={styles.settingButtons}><button type="button" aria-pressed={preferences.theme === "night"} onClick={() => updatePreferences({ theme: "night" })}><Icon name="moon" /> กลางคืน</button><button type="button" aria-pressed={preferences.theme === "paper"} onClick={() => updatePreferences({ theme: "paper" })}><Icon name="sun" /> กระดาษ</button></div></div>
        <div><span>ความกว้างเนื้อหา</span><div className={styles.settingButtons}><button type="button" aria-pressed={preferences.width === "narrow"} onClick={() => updatePreferences({ width: "narrow" })}>อ่านสบาย</button><button type="button" aria-pressed={preferences.width === "wide"} onClick={() => updatePreferences({ width: "wide" })}>กว้างขึ้น</button></div></div>
      </aside>}

      <article className={`${styles.article} ${preferences.width === "wide" ? styles.wide : ""}`}>
        <header className={styles.chapterHeader}>
          <p className={styles.eyebrow}>ตอนที่ {episode.number}</p>
          <h1>{episode.title}</h1>
          <p className={styles.bookTitle}>{novel.title}</p>
          <Link className={styles.author} href={`/writers/${novel.authorSlug}`}><Image src={novel.authorAvatar} alt="" width={34} height={34} /> <span>{novel.author}</span><span className={styles.verified}>✓</span></Link>
          <div className={styles.meta}><span>◷ &nbsp;{new Intl.DateTimeFormat("th-TH-u-ca-gregory", { dateStyle: "medium" }).format(new Date(`${episode.date}T00:00:00Z`))}</span><span>◉ &nbsp;32.6K อ่าน</span><span>▢ &nbsp;428 ความคิดเห็น</span></div>
        </header>
        <div className={styles.prose}>{paragraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
        <div className={styles.endMark}><span /> จบตอนที่ {episode.number} <span /></div>
        <div className={styles.reactions}>
          <button type="button" aria-pressed={liked} onClick={() => setLiked((value) => !value)} className={liked ? styles.selectedReaction : ""}><Icon name="heart" /> ถูกใจ <small>{liked ? "1.3K" : "1.2K"}</small></button>
          <button type="button" onClick={() => setLiked(true)}>☻ ว้าว <small>436</small></button>
          <button type="button" onClick={() => setLiked(true)}>☹ เศร้า <small>128</small></button>
          <button type="button" onClick={() => setLiked(true)}>♨ สุดยอด <small>892</small></button>
          <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)}><Icon name="share" /> แชร์</button>
        </div>
        <nav className={styles.chapterNav} aria-label="เปลี่ยนตอน">
          {previous ? <Link href={chapterLink(previous.number)}><span>← &nbsp;ตอนที่ {previous.number}</span><small>{previous.title}</small></Link> : <span />}
          {next ? <Link className={styles.next} href={chapterLink(next.number)}><span>อ่านตอนที่ {next.number} &nbsp;→</span><small>{next.title}</small></Link> : <Link className={styles.next} href={backHref}><span>กลับหน้ารายละเอียด</span></Link>}
        </nav>
        <section className={styles.authorNote}>
          <Image src={novel.authorAvatar} alt="" width={48} height={48} />
          <div><strong>{novel.author} <span>นักเขียน</span></strong><p>ขอบคุณทุกคนที่เดินทางมาถึงตอนนี้นะคะ ตอนนี้มีเบาะแสสำคัญซ่อนอยู่หลายจุด ลองสังเกตรายละเอียดเล็ก ๆ ระหว่างทาง แล้วมาคุยกันในความคิดเห็นได้เลยค่ะ ✨</p></div>
          <time>{new Intl.DateTimeFormat("th-TH-u-ca-gregory", { dateStyle: "medium" }).format(new Date(`${episode.date}T00:00:00Z`))}</time>
        </section>
        <section id="comments" className={styles.comments}>
          <div className={styles.commentsHeading}><h2>ความคิดเห็น ({comments.length + 426})</h2><button type="button">ดูทั้งหมด →</button></div>
          <form onSubmit={(event) => { event.preventDefault(); if (comment.trim()) { setComments((current) => [comment.trim(), ...current]); setComment(""); } }}><Image src="/images/profile-arn.webp" alt="" width={38} height={38} /><input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="ร่วมพูดคุยเกี่ยวกับตอนนี้..." aria-label="เขียนความคิดเห็น" /><button type="submit">ส่ง</button></form>
          {comments.map((text, index) => <div className={styles.comment} key={`${index}-${text}`}><Image src={index % 2 ? "/images/writers/moonlit.webp" : "/images/writers/purplemoon.webp"} alt="" width={36} height={36} /><div><strong>{index % 2 ? "Moonlit" : "moonlight"} <small>· {index ? "2 วันที่แล้ว" : "เมื่อครู่นี้"}</small></strong><p>{text}</p><button type="button">♡ &nbsp;ถูกใจ</button><button type="button">ตอบกลับ</button></div></div>)}
        </section>
      </article>
    </main>
  );
}
