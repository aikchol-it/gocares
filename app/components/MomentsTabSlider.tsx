'use client';

import React, { useState } from 'react';

const tabs = [
  {
    key: 'book',
    label: '1. จองและนัดหมาย',
    tag: 'Step 1: Book & Plan',
    title: 'จองง่าย เลือกแพ็กเกจตามความต้องการ',
    desc: 'เลือกวัน เวลา และโรงพยาบาลปลายทางได้ล่วงหน้า แจ้งประวัติสุขภาพเบื้องต้นเพื่อให้ทีมงานจัดเตรียมผู้ดูแลและยานพาหนะที่เหมาะสมที่สุด',
    bullet1: 'เลือกแพ็กเกจได้ตามระยะเวลา (4 ชม. หรือ 6 ชม.)',
    bullet2: 'แจ้งข้อมูลข้อจำกัดการเคลื่อนไหว เช่น ใช้วีลแชร์ หรือต้องการความช่วยเหลือพิเศษ',
    img: '/assets/step_1_book_plan.webp',
  },
  {
    key: 'pickup',
    label: '2. ไปรับที่บ้าน',
    tag: 'Step 2: Home Pickup',
    title: 'ไปรับตรงเวลาถึงหน้าบ้าน ช่วยเตรียมตัว',
    desc: 'ผู้ดูแลเดินทางไปถึงบ้านตามเวลานัดหมาย ช่วยจัดเตรียมยา บัตรประชาชน ใบนัดแพทย์ และช่วยพยุงขึ้นรถอย่างปลอดภัย',
    bullet1: 'ตรวจวัดสัญญาณชีพเบื้องต้นก่อนออกเดินทาง (ความดันโลหิต, ชีพจร)',
    bullet2: 'รถตู้มาตรฐานพร้อมทางลาดและพื้นที่สำหรับผู้ใช้วีลแชร์',
    img: '/assets/step_2_pickup_home.webp',
  },
  {
    key: 'arrival',
    label: '3. ถึงโรงพยาบาล',
    tag: 'Step 3: Hospital Care',
    title: 'ดูแลตลอดเวลา ไม่ปล่อยให้อยู่ตามลำพัง',
    desc: 'ช่วยกดบัตรคิว ยื่นเอกสารสิทธิการรักษา เข็นรถพาไปยังแผนกตรวจต่างๆ และอยู่เคียงข้างเป็นเพื่อนระหว่างนั่งรอ',
    bullet1: 'พาไปตรวจเลือด เอกซเรย์ หรือตรวจพิเศษตามจุดต่างๆ ในโรงพยาบาล',
    bullet2: 'ช่วยจัดหาน้ำดื่ม อาหารว่าง และพาเข้าห้องน้ำอย่างระมัดระวัง',
    img: '/assets/step_3_arrival_aikchol.webp',
  },
  {
    key: 'consult',
    label: '4. พบแพทย์และรับยา',
    tag: 'Step 4: Doctor Consult',
    title: 'เข้าห้องตรวจด้วย สรุปคำสั่งแพทย์ชัดเจน',
    desc: 'ได้รับความยินยอมจากครอบครัวเพื่อเข้าห้องตรวจร่วม บันทึกคำแนะนำแพทย์ ถามซ้ำจุดที่ไม่เข้าใจ และรับยากลับบ้าน',
    bullet1: 'ทบทวนวิธีรับประทานยากับเภสัชกรอย่างละเอียด',
    bullet2: 'ถ่ายภาพฉลากยาและบันทึกวันนัดหมายตรวจครั้งถัดไป',
    img: '/assets/step_4_doctor_consult.webp',
  },
  {
    key: 'report',
    label: '5. ส่งกลับและรายงาน',
    tag: 'Step 5: Safe Return & LINE Report',
    title: 'พาส่งถึงเตียงนอน สรุปรายงานผ่าน LINE',
    desc: 'พาเดินทางกลับถึงบ้านอย่างปลอดภัย ดูแลจนเข้าบ้านเรียบร้อย พร้อมส่งรายงานสรุปผลการตรวจและภาพถ่ายให้ครอบครัวผ่าน LINE ทันที',
    bullet1: 'สรุปคำวินิจฉัยแพทย์ รายการยา และวันนัดตรวจครั้งถัดไปอย่างเป็นระบบ',
    bullet2: 'ครอบครัวที่ทำงานอยู่สามารถติดตามความคืบหน้าได้ตลอดทั้งวัน',
    img: '/assets/step_5_service_report.webp',
  },
];

export default function MomentsTabSlider() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="ahc-moments-section" id="care-moments">
      <div className="ahc-container">
        <div className="ahc-section-header">
          <span className="ahc-section-tag">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>ประสบการณ์การดูแลแบบครบวงจร</span>
          </span>
          <h2 className="ahc-section-title">อุ่นใจทุกนาที ตั้งแต่ออกจากบ้านจนกลับถึงเตียง</h2>
          <p className="ahc-section-subtitle">
            เราออกแบบทุกขั้นตอนเพื่อลดความกังวลของลูกหลาน และมอบความสบายใจสูงสุดให้แก่ผู้สูงอายุ
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="ahc-moment-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`ahc-moment-tab-btn ${activeTab.key === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Card */}
        <div className="ahc-moment-content-card">
          <div className="ahc-moment-card-grid">
            <div className="ahc-moment-card-info">
              <span className="ahc-moment-tag">{activeTab.tag}</span>
              <h3 className="ahc-moment-title">{activeTab.title}</h3>
              <p className="ahc-moment-desc">{activeTab.desc}</p>
              <div className="ahc-moment-bullets">
                <div className="ahc-moment-bullet-item">
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{activeTab.bullet1}</span>
                </div>
                <div className="ahc-moment-bullet-item">
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{activeTab.bullet2}</span>
                </div>
              </div>
            </div>

            <div className="ahc-moment-card-media">
              <img
                src={activeTab.img}
                alt={activeTab.title}
                className="ahc-moment-card-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
