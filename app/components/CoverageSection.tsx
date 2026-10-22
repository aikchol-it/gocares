import React from 'react';
import { SiteContent } from '../lib/site-content-types';

const hotspots = [
  { key: 'mueang', left: '31.08%', top: '24.03%', title: 'อำเภอเมืองชลบุรี' },
  { key: 'phanthong', left: '41.06%', top: '13.26%', title: 'อำเภอพานทอง' },
  { key: 'phanat', left: '54.49%', top: '9.53%', title: 'อำเภอพนัสนิคม' },
  { key: 'banbueng', left: '47.97%', top: '26.93%', title: 'อำเภอบ้านบึง' },
  { key: 'bothong', left: '77.13%', top: '27.75%', title: 'อำเภอบ่อทอง' },
  { key: 'sriracha', left: '34.15%', top: '39.35%', title: 'อำเภอศรีราชา' },
  { key: 'nongyai', left: '59.86%', top: '45.98%', title: 'อำเภอหนองใหญ่' },
  { key: 'banglamung', left: '32.62%', top: '59.24%', title: 'อำเภอบางละมุง (พัทยา)' },
];

const chips = [
  { key: 'mueang', label: 'เมืองชลบุรี' },
  { key: 'phanthong', label: 'พานทอง' },
  { key: 'banbueng', label: 'บ้านบึง' },
  { key: 'phanat', label: 'พนัสนิคม' },
  { key: 'bothong', label: 'บ่อทอง' },
  { key: 'nongyai', label: 'หนองใหญ่' },
  { key: 'sriracha', label: 'ศรีราชา' },
  { key: 'banglamung', label: 'บางละมุง (พัทยา)' },
];

const checklist = [
  {
    num: 1,
    color: 'var(--ahc-blue)',
    title: 'บัตรประชาชน และบัตรโรงพยาบาล',
    desc: 'วางไว้ในจุดที่หยิบง่าย และแจ้งผู้ดูแลว่าอยู่ตรงไหน',
  },
  {
    num: 2,
    color: 'var(--ahc-green-dark)',
    title: 'ใบนัด หรือข้อมูลนัดหมาย',
    desc: 'ระบุแผนก ชื่อแพทย์ และเวลานัด สามารถถ่ายรูปส่งมาทาง LINE ตอนจองได้',
  },
  {
    num: 3,
    color: 'var(--ahc-yellow-dark)',
    title: 'ยาที่ใช้อยู่ทั้งหมด (สำคัญที่สุด)',
    desc: 'รวมวิตามินและอาหารเสริม จัดใส่ถุงเดียวไปด้วย เพื่อให้แพทย์เห็นครบก่อนสั่งยาใหม่',
  },
  {
    num: 4,
    color: '#ef4444',
    title: 'สิทธิการรักษาที่ใช้',
    desc: 'บัตรทอง, ประกันสังคม, ข้าราชการ หรือประกันสุขภาพเอกชน แจ้งล่วงหน้าเพื่อยื่นเอกสารได้ถูกช่อง',
  },
  {
    num: 5,
    color: '#8b5cf6',
    title: 'เบอร์ติดต่อฉุกเฉิน',
    desc: 'เบอร์ญาติที่สามารถตัดสินใจแทนได้ เผื่อกรณีที่แพทย์ต้องการปรึกษาครอบครัวโดยตรง',
  },
];

export default function CoverageSection({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-coverage-prep-section" id="coverage-area">
      <div className="ahc-container ahc-two-col-grid">
        <div className="ahc-map-card ahc-reveal ahc-delay-1">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>พื้นที่ให้บริการ</span>
          </span>
          <h3 style={{ fontSize: '24px', color: 'var(--ahc-blue)', marginBottom: '8px' }}>
            จังหวัดชลบุรี ครอบคลุม 8 อำเภอ
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--ahc-text-secondary)', marginBottom: '20px' }}>
            คลิกเลือกอำเภอที่ท่านพักอาศัย เพื่อดูรายละเอียดระยะทางและการเดินทาง
          </p>

          <div className="ahc-map-img-wrap" id="ahcMapContainer">
            <img
              src={content.images.mapImage}
              alt="แผนที่ให้บริการจังหวัดชลบุรี GO CARES"
              className="ahc-map-img"
              id="ahcMapImg"
            />

            <div className="ahc-map-spotlight" id="ahcMapSpotlight"></div>

            <div className="ahc-map-hotspots" id="ahcMapHotspots">
              {hotspots.map((spot, index) => (
                <button
                  key={spot.key}
                  type="button"
                  className={`ahc-map-hotspot ${index === 0 ? 'active' : ''}`}
                  data-district={spot.key}
                  style={{ left: spot.left, top: spot.top }}
                  title={spot.title}
                  aria-label={spot.title}
                ></button>
              ))}
            </div>

            <div className="ahc-map-active-pin" id="ahcMapActivePin" style={{ left: '31.08%', top: '24.03%' }}>
              <div className="ahc-pin-pulse"></div>
              <div className="ahc-pin-glow"></div>
              <div className="ahc-pin-marker">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="ahc-pin-badge" id="ahcPinBadge">
                <span className="ahc-pin-badge-title" id="ahcPinTitle">อำเภอเมืองชลบุรี</span>
                <span className="ahc-pin-badge-sub">
                  <span className="ahc-live-dot"></span>พื้นที่ให้บริการ GO CARES
                </span>
              </div>
            </div>
          </div>

          <div className="ahc-district-chips">
            {chips.map((chip, index) => (
              <button
                key={chip.key}
                className={`ahc-district-chip ${index === 0 ? 'active' : ''}`}
                data-district={chip.key}
              >
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#ffffff',
              borderRadius: 'var(--ahc-radius-md)',
              border: '1.5px solid var(--ahc-border)',
            }}
          >
            <strong id="ahcDistrictName" style={{ color: 'var(--ahc-blue)', fontSize: '16px' }}>
              อำเภอเมืองชลบุรี
            </strong>
            <p id="ahcDistrictDetail" style={{ fontSize: '13px', color: 'var(--ahc-text-secondary)', marginTop: '4px' }}>
              ครอบคลุมใจกลางเมือง โรงพยาบาลเอกชล 1 และเอกชล 2 รถรับ-ส่งถึงบ้านอย่างรวดเร็วภายใน 15-20 นาที
            </p>
            <span
              id="ahcDistrictDistance"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--ahc-line-green)',
                fontWeight: 600,
                marginTop: '6px',
              }}
            >
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>ฟรีระยะทาง 10 - 30 กม. ตามแพ็กเกจที่เลือก</span>
            </span>
          </div>
        </div>

        <div className="ahc-checklist-card ahc-reveal ahc-delay-2" id="checklist">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ahc-badge-care">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              <span>สิ่งที่ต้องเตรียมให้เรา</span>
            </span>
            <span id="ahcChecklistCount" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ahc-blue)' }}>
              เตรียมพร้อม 0/5 อย่าง
            </span>
          </div>

          <h3 style={{ fontSize: '24px', color: 'var(--ahc-blue)', margin: '12px 0 6px' }}>เตรียม 5 อย่างก่อนเดินทาง</h3>
          <p style={{ fontSize: '14px', color: 'var(--ahc-text-secondary)', lineHeight: 1.5 }}>
            ที่มักลืมกันมากที่สุดคือยาที่กินอยู่ ซึ่งแพทย์จำเป็นต้องเห็นก่อนสั่งยาใหม่เพื่อไม่ให้ยาตีกัน
            คลิกเพื่อตรวจเช็กความพร้อม:
          </p>

          <div className="ahc-checklist-items">
            {checklist.map((item) => (
              <div className="ahc-check-item" key={item.num}>
                <div className="ahc-check-num" style={{ background: item.color }}>
                  {item.num}
                </div>
                <div className="ahc-check-text">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'var(--ahc-blue-light)',
              border: '1.5px dashed var(--ahc-blue)',
              padding: '14px 18px',
              borderRadius: 'var(--ahc-radius-md)',
              fontSize: '13px',
              color: 'var(--ahc-text-navy)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" style={{ color: 'var(--ahc-blue)', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>
              <strong>แจ้งเพิ่มเติมถ้ามี:</strong> ประวัติแพ้ยา, ต้องงดน้ำงดอาหารก่อนตรวจ, ใช้รถเข็นหรือออกซิเจน,
              หรือมีภาวะความจำถดถอย
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
