# ARN SPACE Vibe Code Rules

กติกานี้ใช้เป็น checklist ทุกครั้งที่เพิ่มหรือแก้หน้าเว็บ เพื่อให้โค้ดที่สร้างต่อจากนี้ยังคงอยู่ใน Design System เดียวกัน

## ก่อนเริ่มแก้โค้ด

1. อ่าน `docs/design-system.md` และเอกสารเฉพาะส่วนที่เกี่ยวข้องก่อน
2. ตรวจว่าหน้านั้นอยู่ใน Section ใด: นิยาย, แฟนฟิค, การ์ตูน หรือชุมชน
3. ค้นหา Component ที่มีอยู่แล้วก่อนสร้างใหม่ เช่น `TopMenu`, `Footer`, Sidebar tokens และ Card patterns
4. ถ้าเป็นค่า global ให้เพิ่ม token ใน `app/globals.css`/`tailwind.config.ts` ไม่เขียนซ้ำใน Component

## กฎที่ห้ามละเมิด

- ห้ามเพิ่ม font family ใหม่ในหน้าเดียว
- ห้ามใช้สีสุ่มที่ไม่อยู่ใน token ยกเว้นสีจากรูปภาพหรือสถานะที่มีเหตุผลชัดเจน
- ห้ามสร้าง `text-[...]`, `bg-[#...]`, `border-[#...]` ซ้ำสำหรับค่าที่มี token อยู่แล้ว
- ห้ามลดข้อความที่ผู้ใช้ต้องอ่านต่ำกว่า 10px เพื่อแก้ปัญหาพื้นที่ไม่พอ; ให้ลด spacing หรือใช้ truncation ก่อน
- ห้ามใช้ `font-bold` กับข้อความทุกระดับจน hierarchy หาย; ใช้ 400/500/600/700 ตาม role
- ห้ามทำ Card, ปุ่ม หรือ chip รูปแบบใหม่ถ้า primitive เดิมรองรับอยู่แล้ว
- ห้ามทำ active, hover และ disabled ให้ใช้สี/ความสว่างเหมือนกัน
- ห้ามใช้ emoji เป็น icon หลักของระบบ หากมี SVG icon ที่เหมาะสมอยู่แล้ว
- ห้ามเพิ่ม inline style ถ้าใช้ Tailwind token หรือ class กลางได้
- ห้ามทำให้ Hero กว้างเกิน `1400px`

## กฎการเลือก Token

### สี

ใช้ `bg-arn-canvas`, `bg-arn-surface`, `bg-arn-raised`, `border-arn-border`, `text-arn-text`, `text-arn-muted` หรือ CSS variables ที่ระบุใน Design System

ใช้ `section-novel`, `section-fanfic`, `section-cartoon` สำหรับ accent ของ Section เท่านั้น ไม่ใช้ accent ของนิยายกับหน้าแฟนฟิค/การ์ตูน

### ฟอนต์

ใช้ `font-sans` เป็นค่าเริ่มต้น และเลือก role จาก `text-ds-*` เมื่อเป็น heading/body/meta ใหม่

สำหรับ Sidebar ให้ใช้ class ที่มีอยู่:

- `.sidebar-title`
- `.sidebar-link`
- `.sidebar-item-title`
- `.sidebar-meta`
- `.sidebar-caption`
- `.sidebar-body`
- `.sidebar-button`

### ระยะห่างและรูปทรง

ใช้ `ds-1` ถึง `ds-16` เป็นหลัก และใช้ radius `ds-sm`, `ds-md`, `ds-lg`, `ds-xl` เมื่อเหมาะสม

## กฎตามชนิด Component

### Page shell

- ใช้พื้นหลัง `var(--arn-color-canvas)` หรือ `bg-arn-canvas`
- เนื้อหาหลัก desktop จำกัดไม่เกิน `1400px`
- Header/Top menu ต้องไม่เปลี่ยนความสูงและ z-index โดยไม่มีเหตุผล
- ทุกหน้า content-heavy ต้องมี loading/empty state ที่อ่านได้

### Card

- ใช้ `ds-card` เป็นฐาน
- ขอบมาตรฐาน `--arn-color-border`
- Hover เปลี่ยน border หรือยกไม่เกิน 2px และ transition ประมาณ 180–300ms
- Card ที่กดได้ต้องห่อด้วย Link หรือมีปุ่มที่ชัดเจน และต้องมี focus state

### Button

- Primary action ใช้ `.ds-button-primary`
- Secondary action ใช้ `.ds-button-secondary`
- ปุ่มต้องมีข้อความที่บอกผลลัพธ์ เช่น “เข้าร่วม”, “บันทึก”, “ดูรายละเอียด”
- ถ้าเป็น action ที่ยังไม่สร้างหน้า ให้ใช้ระบบ unbuilt popup ของโปรเจกต์ ไม่สร้าง route หลอกใหม่

### Filter / tab / dropdown

- Active state ใช้ accent ของ Section
- Filter ที่เลือกได้ต้องมี `aria-pressed` หรือ tab semantics ที่เหมาะสม
- Dropdown ต้องมี label ที่เข้าถึงได้ และไม่ซ่อนตัวเลือกสำคัญไว้เฉพาะ icon

### รูปภาพ

- ใช้ `next/image` และระบุ `alt`, `sizes` ที่เหมาะสม
- Asset ใหม่ต้องอยู่ใน `public/images` และตั้งชื่ออธิบายหน้าที่ เช่น `community-events-hero.webp`
- ถ้าต้องสร้างภาพใหม่ ใช้ ImageGen และตรวจ composition ก่อนผูกเข้ากับหน้า
- อย่าใส่ข้อความสำคัญไว้ในภาพ หากข้อความนั้นควรแก้/แปล/เข้าถึงได้จาก HTML

## กฎ responsive

- Desktop เป็น baseline ของโปรเจกต์ แต่ต้องรักษา hierarchy บนจอแคบ
- ลด spacing และจำนวนคอลัมน์ก่อนลด font
- ตาราง/รายการยาวต้องมีวิธีจัดการ overflow ที่อ่านได้
- อย่าให้ปุ่มหรือ filter ที่สำคัญถูกตัดจนกดไม่ได้

## ก่อนส่งงาน

- ตรวจว่าใช้ token/primitive ที่มีอยู่แล้ว
- ตรวจว่า active, hover, focus และ disabled แยกกันชัดเจน
- ตรวจ alt text, keyboard focus และ semantic element
- รัน `npm.cmd run build`
- ตรวจ `git diff` ว่าไม่มีการแก้ไฟล์นอกขอบเขตโดยไม่ตั้งใจ
- ถ้าเพิ่ม token ใหม่ ให้เพิ่มทั้งใน `app/globals.css`, `tailwind.config.ts` และเอกสาร Design System
