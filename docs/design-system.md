# ARN SPACE Design System

เอกสารกลางสำหรับควบคุมภาพรวมของ ARN SPACE ให้ทุกหน้าใช้ภาษาเดียวกัน ทั้งสี ฟอนต์ ระยะห่าง พื้นผิว Card และพฤติกรรมของ Component

## หลักการออกแบบ

1. **อ่านง่ายก่อนตกแต่ง** — ตัวอักษรหลักต้องชัด มี contrast และไม่ลดขนาดเพื่อยัดข้อมูลให้แน่นเกินไป
2. **Dark literary space** — พื้นที่หลักเป็นโทน charcoal/forest green มี emerald เป็นสี action หลัก
3. **มี accent ตามประเภทเนื้อหา** — นิยาย แฟนฟิค และการ์ตูนมีสีประจำหมวด แต่ยังต้องใช้พื้นผิว ฟอนต์ และโครงสร้างร่วมกัน
4. **สม่ำเสมอข้ามหน้า** — Card, ปุ่ม, chip, Sidebar และระยะห่างควรเลือกจาก token เดียวกัน
5. **Interaction ต้องมองเห็นได้** — Hover, focus, active และ disabled ต้องแยกจากกันชัดเจน และใช้ `focus-visible` เสมอ

## Source of truth

- CSS tokens และ primitive classes: `app/globals.css`
- Tailwind aliases: `tailwind.config.ts`
- กติกาการเขียน/แก้โค้ด: `docs/vibe-code-rules.md`
- กติกา Sidebar ที่ละเอียด: `docs/sidebar-font-system.md`
- กติกา Book Card ที่ละเอียด: `docs/book-card-system.md`

ถ้าค่าที่เขียนใน Component ขัดกับเอกสารนี้ ให้ยึด token ใน `globals.css` และเอกสารนี้เป็นหลัก

## Color tokens

### Global palette

| Token | Value | ใช้กับ |
| --- | --- | --- |
| `--arn-color-canvas` | `#080D0B` | พื้นหลังหน้าเว็บ |
| `--arn-color-surface` | `#0B1512` | พื้นผิว Card ชั้นล่าง |
| `--arn-color-surface-raised` | `#101E18` | Card ที่ยกขึ้น/Section |
| `--arn-color-surface-soft` | `#151B18` | Input, chip, inactive control |
| `--arn-color-border` | `#1C332A` | เส้นขอบมาตรฐาน |
| `--arn-color-border-strong` | `#285845` | เส้นขอบ Hover/Secondary |
| `--arn-color-text-primary` | `#F5F7F4` | หัวข้อและข้อความหลัก |
| `--arn-color-text-muted` | `rgba(245,247,244,.72)` | Body และคำอธิบาย |
| `--arn-color-text-subtle` | `rgba(245,247,244,.55)` | Metadata |
| `--arn-color-text-faint` | `rgba(245,247,244,.40)` | Caption ที่เป็นข้อมูลรอง |
| `--arn-color-accent` | `#12DF8A` | Action หลัก/สถานะ active |
| `--arn-color-accent-strong` | `#1BE27E` | Link และข้อความเน้น |
| `--arn-color-accent-soft` | `#8AFFC0` | Hover highlight |
| `--arn-color-accent-ink` | `#03150D` | ตัวอักษรบนปุ่มสีเขียว |

### Section accents

| Section | Token | Value |
| --- | --- | --- |
| นิยาย | `--arn-accent-novel` | `#21D98B` Emerald |
| แฟนฟิค | `--arn-accent-fanfic` | `#B86CFF` Violet |
| การ์ตูน | `--arn-accent-cartoon` | `#39C7FF` Cyan |
| ชุมชน | `--arn-accent-community` | `#12DF8A` Community Emerald |

สีประจำ Section ใช้กับ active state, icon, badge, progress และเส้นเน้นเท่านั้น ไม่ควรเปลี่ยนพื้นหลังทั้งหน้า

### Status colors

- Success: `--arn-status-success`
- Info: `--arn-status-info`
- Warning: `--arn-status-warning`
- Danger: `--arn-status-danger`

## Typography

ฟอนต์หลักของทุกหน้าใช้ **Prompt** ผ่าน `font-sans` และ `--font-prompt` เท่านั้น ห้ามเพิ่มฟอนต์ใหม่ในหน้าใดหน้าหนึ่งโดยไม่มีเหตุผลด้านภาษา/การเข้าถึง

| Role | Size | Weight | Line height | Tailwind alias |
| --- | ---: | ---: | ---: | --- |
| Display | 56px | 700 | 1.08 | `text-ds-display` |
| H1 | 40px | 700 | 1.15 | `text-ds-h1` |
| H2 | 24px | 600 | 1.25 | `text-ds-h2` |
| H3 | 18px | 600 | 1.3 | `text-ds-h3` |
| Body | 15px | 400 | 1.6 | `text-ds-body` |
| Body small | 13px | 400 | 1.5 | `text-ds-body-sm` |
| Meta | 12px | 400 | 1.35 | `text-ds-meta` |
| Caption | 11px | 400 | 1.35 | `text-ds-caption` |

กฎเพิ่มเติม:

- ห้ามใช้ตัวอักษรที่อ่านได้จริงต่ำกว่า `11px`; ข้อยกเว้น `10px` ใช้ได้เฉพาะ metadata ที่ไม่สำคัญหรือ label ขนาดเล็กมาก
- ข้อความภาษาไทยบนพื้นหลังเข้มควรใช้ `11px` ขึ้นไปเพื่อรักษาความชัดเจน
- ตัวอักษรใน logo, icon หรือ notification counter ที่ไม่ใช่เนื้อหา สามารถเล็กกว่า `10px` ได้เมื่อจำเป็นต่อขนาดของ component
- หัวข้อใช้ `600` หรือ `700` ตามลำดับชั้น ไม่ใช้ `800`/`900` โดยไม่จำเป็น
- Thai body text ต้องมี line-height อย่างน้อย `1.5`
- ใช้ `truncate`, `line-clamp` หรือ responsive layout แทนการลด font จนอ่านยาก

## Spacing

ใช้ระบบฐาน 4px:

| Token | Value | ตัวอย่าง |
| --- | ---: | --- |
| `ds-1` | 4px | ระยะ icon กับ label |
| `ds-2` | 8px | ระยะภายใน chip/รายการ |
| `ds-3` | 12px | padding Card ขนาดเล็ก |
| `ds-4` | 16px | padding มาตรฐาน |
| `ds-5` | 20px | gap ระหว่างกลุ่ม |
| `ds-6` | 24px | section spacing |
| `ds-8` | 32px | ระยะ block ใหญ่ |
| `ds-10` | 40px | padding Hero |
| `ds-12` | 48px | ระยะ section เด่น |
| `ds-16` | 64px | ระยะ page-level |

ถ้าต้องใช้ค่าใหม่ ให้เป็นผลคูณของ 4px ก่อนเสมอ

## Shape, shadow และ layout

- Small radius: `6px` — ปุ่มและ control ขนาดเล็ก
- Medium radius: `8px` — Card, input, menu
- Large radius: `12px` — Hero/Section ที่ต้องการความนุ่มขึ้น
- Pill: `999px` — chip, filter, status badge
- Card shadow: `var(--arn-shadow-card)`
- Floating shadow: `var(--arn-shadow-floating)`
- Accent glow: `var(--arn-shadow-glow)`
- Desktop content max-width: `1400px`
- Community content grid: content + sidebar โดยใช้ gap เฉพาะของหน้านั้น ไม่ดึง spacing จากหน้าอ่านมาใช้ตรง ๆ

## Primitive classes

ใช้ class กลางก่อนสร้าง utility ใหม่:

```tsx
<section className="ds-card p-ds-4">...</section>
<section className="ds-section p-ds-4">...</section>
<button className="ds-button-primary px-ds-4">บันทึก</button>
<button className="ds-button-secondary px-ds-4">ยกเลิก</button>
<span className="ds-chip px-ds-3">แฟนตาซี</span>
```

Class เหล่านี้อยู่ใน `app/globals.css` และ Tailwind aliases อยู่ใน `tailwind.config.ts` โดย `.ds-card` ใช้กับ Card ทั่วไป, `.ds-section` ใช้กับ Section ที่มี heading/list ภายใน และ `.ds-input` ใช้กับช่องค้นหา/ฟอร์ม

## Accessibility baseline

- ทุกปุ่มต้องเป็น `<button>` และทุก navigation/action ที่พาไป URL ต้องเป็น `<Link>`
- Icon ที่ไม่มีความหมายสำหรับ screen reader ใช้ `aria-hidden="true"`
- Interactive element ต้องมี `focus-visible` ring
- ปุ่ม disabled ต้องยังเห็นได้ว่า disabled และห้ามใช้สีเดียวกับ active
- รูปภาพ content ต้องมี alt ที่บอกสิ่งสำคัญของรูป; รูปตกแต่งใช้ alt ว่างได้
- อย่าใช้สีเป็นตัวบอกสถานะเพียงอย่างเดียว ให้มีข้อความหรือ icon ร่วมด้วย
