'use client';

import React from 'react';

interface StepFeaturesProps {
  onSelectBooking: (pkg?: string) => void;
}

const stepsData = [
  {
    step: 1,
    title: '1. ไปรับที่บ้านและพากลับ',
    desc: 'ผู้ดูแลไปถึงบ้านตามเวลานัด ช่วยเตรียมตัวและช่วยขึ้นลงรถ จนพากลับถึงบ้านและดูให้เข้าบ้านเรียบร้อย',
    img: '/assets/step_feature_1.webp',
  },
  {
    step: 2,
    title: '2. วัดสัญญาณชีพก่อนเดินทาง',
    desc: 'วัดความดันโลหิต ชีพจร และประเมินความพร้อมเบื้องต้น หากพบสิ่งผิดปกติจะแจ้งครอบครัวและปรึกษาพยาบาลทันที',
    img: '/assets/step_feature_2.webp',
  },
  {
    step: 3,
    title: '3. อยู่ด้วยตลอดในโรงพยาบาล',
    desc: 'จัดคิว ยื่นเอกสาร พาไปตามจุดต่างๆ และอยู่เป็นเพื่อนระหว่างรอ ไม่ปล่อยให้ผู้สูงอยู่นั่งรอตามลำพัง',
    img: '/assets/step_feature_3.webp',
  },
  {
    step: 4,
    title: '4. จดบันทึกคำแนะนำแพทย์',
    desc: 'เข้าห้องตรวจด้วยเมื่อได้รับความยินยอม จดสิ่งที่แพทย์สั่ง ถามซ้ำจุดที่ไม่ชัด และบันทึกวันนัดครั้งถัดไป',
    img: '/assets/step_feature_4.webp',
  },
  {
    step: 5,
    title: '5. รับยาและทวนวิธีใช้',
    desc: 'รับยาแทนได้ ทวนวิธีใช้ยากับเภสัชกร ถ่ายรูปฉลากยา และแจ้งชัดเจนว่ายาตัวไหนหยุด ตัวไหนเริ่มใหม่',
    img: '/assets/step_feature_5.webp',
  },
  {
    step: 6,
    title: '6. รายงานครอบครัวผ่าน LINE',
    desc: 'อัปเดตเป็นระยะระหว่างวัน และสรุปทั้งหมดหลังกลับถึงบ้าน ครอบครัวที่ทำงานอยู่สามารถติดตามได้ตลอดเวลา',
    img: '/assets/step_feature_6.webp',
  },
];

export default function StepFeatures({ onSelectBooking }: StepFeaturesProps) {
  return (
    <section className="ahc-included-section" id="what-is-included">
      <div className="ahc-container">
        <div className="ahc-section-header">
          <span className="ahc-section-tag">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="var(--ahc-yellow)" stroke="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>รายละเอียดความคุ้มค่า</span>
          </span>
          <h2 className="ahc-section-title">สิ่งที่รวมอยู่ในราคาค่าบริการ</h2>
          <p className="ahc-section-subtitle">
            ให้คุณมั่นใจว่าคนที่คุณรักจะได้รับการดูแลอย่างเอาใจใส่ในทุกนาที ตั้งแต่ต้นจนจบ ครอบคลุมการดูแลครบทั้ง 6 ด้านสำคัญ
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="ahc-included-grid">
          {stepsData.map((item) => (
            <div
              key={item.step}
              className="ahc-included-card"
              onClick={() => onSelectBooking('pkg2')}
            >
              <div className="ahc-included-card-img-wrap">
                <img
                  src={item.img}
                  alt={item.title}
                  className="ahc-included-card-img"
                  loading="lazy"
                />
                <span className="ahc-included-step-badge">ขั้นตอนที่ {item.step}</span>
              </div>
              <div className="ahc-included-card-body">
                <h3 className="ahc-included-card-title">{item.title}</h3>
                <p className="ahc-included-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Disclaimers & Transparency Cards */}
        <div className="ahc-disclaimers-grid">
          <div className="ahc-notice-card ahc-notice-card-danger">
            <div className="ahc-notice-icon">
              <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-danger-text)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="ahc-notice-content">
              <h4 className="ahc-notice-title" style={{ color: 'var(--ahc-danger-text)' }}>ไม่ใช่บริการฉุกเฉิน</h4>
              <p className="ahc-notice-desc">กรณีฉุกเฉินวิกฤต หรือมีอาการรุนแรงกะทันหัน โปรดโทร 1669 ทันที</p>
            </div>
          </div>

          <div className="ahc-notice-card ahc-notice-card-warning">
            <div className="ahc-notice-icon">
              <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-gold)" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="ahc-notice-content">
              <h4 className="ahc-notice-title" style={{ color: 'var(--ahc-blue-dark)' }}>ไม่มีหัตถการทางการแพทย์</h4>
              <p className="ahc-notice-desc">ผู้ดูแลทำหน้าที่ช่วยอำนวยความสะดวก ดูแลความปลอดภัย ไม่มีการวินิจฉัยหรือฉีดยา</p>
            </div>
          </div>

          <div className="ahc-notice-card ahc-notice-card-info">
            <div className="ahc-notice-icon">
              <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-blue)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="ahc-notice-content">
              <h4 className="ahc-notice-title" style={{ color: 'var(--ahc-blue)' }}>ค่ารักษาพยาบาลแยกต่างหาก</h4>
              <p className="ahc-notice-desc">ค่าบริการครอบคลุมการเดินทางและผู้ดูแล ไม่รวมค่าตรวจ ยา หรือค่ารักษาของโรงพยาบาล</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
