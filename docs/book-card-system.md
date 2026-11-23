# Book Card Design System

มาตรฐานสำหรับ Card ปกเรื่องที่ใช้ในหน้าแรกและหน้าหมวดอ่าน โดยเน้นให้ขนาดปก ข้อความ และพฤติกรรม Hover เป็นระบบเดียวกัน

## Card anatomy

เรียงลำดับองค์ประกอบดังนี้:

1. Cover image
2. Completion or ranking badge when applicable
3. Book title
4. Author
5. จำนวนตอน ยอดอ่าน และยอดไลก์ ตามด้วยความคืบหน้าการอ่านเมื่อมีข้อมูล
6. Hover overlay สำหรับชื่อเรื่อง เรื่องย่อ และปุ่มอ่าน

## Layout tokens

| Token | Value | Usage |
| --- | ---: | --- |
| Cover ratio | `2 / 3` | อัตราส่วนปกมาตรฐาน |
| Card radius | `9px` | กรอบ Card หลัก |
| Cover radius | `7px` | กรอบรูปปก |
| Card padding | `4px` | ระยะหายใจรอบ Card |
| Cover-to-title gap | `8px` | ระยะระหว่างปกกับชื่อเรื่อง |

## Typography tokens

| Element | Size | Weight | Line height | Usage |
| --- | ---: | ---: | ---: | --- |
| `.book-card-overlay-title` | `14px` | `600` | `20px` | ชื่อเรื่องบน Hover |
| `.book-card-description` | `11px` | `400` | `1.45` | เรื่องย่อบน Hover |
| `.book-card-action` | `11px` | `600` | `32px` | ปุ่ม “อ่านเลย” |

เรื่องย่อบน Hover ใช้ขนาดมาตรฐานทั่วไป `11px` และ line-height `1.45` สำหรับหน้าแรกและหน้าหมวดอ่านก่อนเข้าสู่ระบบบนอุปกรณ์ที่รองรับ Hover ใช้ขนาด `13px` ตาม `text-ds-body-sm` และ line-height `1.6` ที่ `2xl` เพิ่มเป็น `12px` ในหน้าทั่วไปและ `14px` สำหรับหน้าก่อนเข้าสู่ระบบดังกล่าว โดยแสดงสูงสุด 6 บรรทัด

การ์ดหนังสือใช้ชื่อเรื่องขนาด `15px` ตาม `text-ds-body` น้ำหนัก `500` และ line-height `1.6` ทุกขนาดจอ แสดงได้สูงสุด 2 บรรทัด การ์ดในกริดสำรองความสูง 2 บรรทัดเพื่อให้ข้อมูลใต้ชื่อเรื่องเรียงตรงกันในแต่ละแถว

ชื่อผู้แต่งใช้ `text-ds-body` ขนาด `15px` และสถิติใช้ `text-ds-body-sm` ขนาด `13px` ทุกขนาดจอ ตามหัวข้อ Typography ใน `docs/design-system.md`

หน้าแรกและหน้าหมวดอ่านแสดง Tag “จบ” ที่มุมขวาบนของภาพปกเฉพาะเรื่องที่มีสถานะจบแล้ว ข้อมูลใต้ชื่อเรื่องประกอบด้วยชื่อผู้เขียน จำนวนตอน ยอดอ่าน และยอดไลก์

ปกในกลุ่ม “Top 20 ยอดนิยม” แสดงเลขอันดับ 1–20 ที่มุมซ้ายบนตามลำดับที่แสดง

การ์ดหนังสือแสดงไอคอนตัว C ในวงกลมหน้าชื่อการ์ตูน และตัว F ในวงกลมหน้าชื่อแฟนฟิค เรื่องที่อ่านแบบแชทแสดงไอคอนรูปมือถือหน้าชื่อเรื่องต่อจากไอคอนประเภท (ถ้ามี)

จำนวนตอน ยอดอ่าน และยอดไลก์ใช้ไอคอนเอกสาร ดวงตา และหัวใจตามลำดับ พร้อมคำอธิบายสำหรับ screen reader และ tooltip หากพื้นที่ไม่พอให้ขึ้นบรรทัดใหม่ระหว่างชุดไอคอนและตัวเลข

## Color tokens

### Default

```text
Card background: transparent
Card border: transparent
Cover fallback: #18201c
Title: #ffffff
Author: var(--arn-color-text-muted)
Metadata: var(--arn-color-text-muted)
```

### Hover

```text
Card border: rgba(255,255,255,.12)
Card background: rgba(255,255,255,.025)
Card shadow: 0 12px 26px rgba(19,230,104,.10)
Overlay base: #07100c
Overlay text: #ffffff
Overlay description: rgba(255,255,255,.70)
Action background: #1be27e
Action text: #07100c
```

## Hover behavior

- Card เลื่อนขึ้นเล็กน้อยไม่เกิน `2px`
- รูปปกขยายไม่เกิน `1.04`
- ใช้ Transition ประมาณ `200–300ms`
- Overlay ใช้ Gradient จากด้านล่างขึ้นด้านบน
- เรื่องย่อแสดงไม่เกิน `6` บรรทัดในพื้นที่ Hover ปัจจุบัน
- ปุ่มอ่านอยู่ด้านล่างของ Overlay และมีความสูง `32px`
- ใช้ `pointer-events-none` กับ Overlay เพื่อให้ทั้ง Card ยังคงกดได้เป็นลิงก์เดียว
- ต้องมี `focus-visible` ring สำหรับการใช้งานด้วยคีย์บอร์ด

## Responsive behavior

- ที่ `2xl` (`1536px` ขึ้นไป) ช่องว่างแนวนอนระหว่างการ์ดเรื่องในกริดและแถวเลื่อนลดลงครึ่งหนึ่งจากขนาด `xl` โดยคงระยะห่างระหว่างแถวไว้
- Desktop: แสดง Hover overlay เมื่ออุปกรณ์รองรับ Hover
- Touch device: ไม่ควรพึ่งพา Hover เพื่อแสดงข้อมูลสำคัญ
- ชื่อเรื่องและ Metadata หลักต้องแสดงอยู่ใต้ปกเสมอ
- ถ้าพื้นที่แคบ ให้ลดจำนวนบรรทัดของเรื่องย่อก่อนลดขนาด Font

## Implementation notes

หน้าแรก หน้ารวมเรื่อง และกริดเรื่องในหน้านิยาย แฟนฟิค และการ์ตูนใช้ `components/BookCard.tsx` ร่วมกัน

การ์ดในหน้าแรก หน้าหมวดอ่าน หน้ารายละเอียดเรื่อง และส่วนเรื่องโปรดในโปรไฟล์ใช้ส่วนข้อมูลจาก `components/BookCardInfo.tsx` และไอคอนสถิติจาก `components/StoryMetadata.tsx`

ก่อนเพิ่มค่า `text-[...]` แบบเฉพาะจุด ให้ตรวจเอกสารนี้ก่อน เพื่อป้องกันขนาด Card แต่ละหน้าคลาดเคลื่อนกัน
