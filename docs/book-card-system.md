# Book Card Design System

มาตรฐานสำหรับ Card ปกเรื่องที่ใช้ในหน้าแรกและหน้าหมวดอ่าน โดยเน้นให้ขนาดปก ข้อความ และพฤติกรรม Hover เป็นระบบเดียวกัน

## Card anatomy

เรียงลำดับองค์ประกอบดังนี้:

1. Cover image
2. Category/status badge
3. Book title
4. Author
5. Story metadata หรือ reading progress
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
| `.book-card-title` | `13px` | `500` | `20px` | ชื่อเรื่องใต้ปก |
| `.book-card-author` | `11px` | `400` | `16px` | ชื่อนักเขียน |
| `.book-card-meta` | `10px` | `400` | `15px` | ตอน ยอดวิว ยอดถูกใจ หรือสถานะ |
| `.book-card-overlay-title` | `14px` | `600` | `20px` | ชื่อเรื่องบน Hover |
| `.book-card-description` | `11px` | `400` | `1.45` | เรื่องย่อบน Hover |
| `.book-card-action` | `11px` | `600` | `32px` | ปุ่ม “อ่านเลย” |

เรื่องย่อบน Hover ต้องใช้ขนาด `11px` เป็นมาตรฐาน ไม่ลดต่ำกว่า `10px` เพื่อให้ยังอ่านง่ายบน Card ขนาดเล็ก

## Color tokens

### Default

```text
Card background: transparent
Card border: transparent
Cover fallback: #18201c
Title: #ffffff
Author: rgba(255,255,255,.45)
Metadata: rgba(255,255,255,.35)
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

- Desktop: แสดง Hover overlay เมื่ออุปกรณ์รองรับ Hover
- Touch device: ไม่ควรพึ่งพา Hover เพื่อแสดงข้อมูลสำคัญ
- ชื่อเรื่องและ Metadata หลักต้องแสดงอยู่ใต้ปกเสมอ
- ถ้าพื้นที่แคบ ให้ลดจำนวนบรรทัดของเรื่องย่อก่อนลดขนาด Font

## Implementation notes

ปัจจุบัน Card หลักอยู่ใน:

- `components/BookDiscovery.tsx`
- `components/ReadDiscovery.tsx`

เมื่อมีการปรับ Card ให้แก้ทั้งสองไฟล์ให้ใช้ค่าเดียวกัน โดยเฉพาะเรื่องย่อบน Hover ซึ่งต้องคงไว้ที่ `11px` และ `line-height: 1.45`

ก่อนเพิ่มค่า `text-[...]` แบบเฉพาะจุด ให้ตรวจเอกสารนี้ก่อน เพื่อป้องกันขนาด Card แต่ละหน้าคลาดเคลื่อนกัน
