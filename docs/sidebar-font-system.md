# Sidebar Font System

มาตรฐานขนาดตัวอักษรสำหรับ Sidebar ของ ARN SPACE ใช้ร่วมกันทุกหน้าและทุกการ์ด เพื่อให้ลำดับชั้นของข้อมูล อ่านง่าย และไม่เกิดการกำหนดขนาดแบบเฉพาะจุดซ้ำ ๆ

## Tokens

| Class | Size | Weight | Line height | ใช้กับ |
| --- | ---: | ---: | ---: | --- |
| `.sidebar-title` | 17px | 500 | 1.25 | หัวข้อหลักของการ์ด Sidebar |
| `.sidebar-link` | 11px | 500 | 1.25 | ลิงก์เสริม เช่น “ดูทั้งหมด” |
| `.sidebar-item-title` | 12px | 500 | 1.25 | ชื่อเรื่อง ชื่อนักเขียน ชื่อหัวข้อ |
| `.sidebar-meta` | 11px | 400 | 1.25 | ผู้เขียน ตอน จำนวน หรือข้อมูลประกอบ |
| `.sidebar-caption` | 10px | 400 | 1.35 | วันที่ ข้อความรอง และรายละเอียดที่สำคัญรองลงมา |
| `.sidebar-body` | 13px | 400 | 1.5 | รีวิว คำอธิบาย และข้อความเนื้อหา |
| `.sidebar-button` | 10px | 500 | 1 | ปุ่มย่อย เช่น “เขียนรีวิว” หรือ “เริ่มอ่าน” |
| `.sidebar-stat-value` | 14px | 600 | 1 | ตัวเลขสถิติย่อย |
| `.sidebar-stat-hero` | 24px | 600 | 1 | ตัวเลขสถิติหลัก |

## Guidelines

- หัวข้อ Sidebar ทุกการ์ดใช้ `.sidebar-title` ขนาด 17px เหมือนกัน
- หลีกเลี่ยงข้อความที่ผู้ใช้ต้องอ่านต่ำกว่า 10px และใช้ 11px เป็นค่าปกติสำหรับข้อความภาษาไทย
- ใช้ `.sidebar-meta` กับชื่อผู้เขียนและข้อมูลรายการที่ต้องอ่านชัดเจน
- ใช้ `.sidebar-caption` เฉพาะข้อมูลรอง เช่น วันที่หรือข้อความสถานะ
- ใช้ line-height ของ token แทนการเพิ่ม margin เพื่อควบคุมความสูงของรายการ
- กรณีต้องปรับให้แน่น ให้ลด spacing หรือ padding ก่อนลดขนาด Font
- สีและน้ำหนักเฉพาะสถานะสามารถเติม Tailwind utility ต่อท้ายได้ โดยไม่เปลี่ยนขนาดของ token

## Usage

```tsx
<h2 className="sidebar-title">อ่านจบล่าสุด</h2>
<h3 className="sidebar-item-title">Sky of Tomorrow</h3>
<p className="sidebar-meta">AkiStudio</p>
<p className="sidebar-caption">อ่านจบเมื่อ 1 วันที่แล้ว</p>
<Link className="sidebar-button">เขียนรีวิว</Link>
```

เมื่อเพิ่ม Sidebar ใหม่ ให้เลือก class จากชุดนี้ก่อนเขียน `text-[...]` แบบเฉพาะจุด
