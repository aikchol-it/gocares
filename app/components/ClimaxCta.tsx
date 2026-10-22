import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function ClimaxCta({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-climax-cta-section">
      <div className="ahc-climax-ambient-glow"></div>
      <div className="ahc-container ahc-climax-inner ahc-reveal">
        <span className="ahc-badge-care" style={{ marginBottom: '16px' }}>
          ENHANCING FAMILY HAPPINESS
        </span>
        <h2 className="ahc-climax-title">
          อย่าปล่อยให้คนที่คุณรัก<br />ต้องไปโรงพยาบาลตามลำพัง
        </h2>
        <p className="ahc-climax-sub">
          มอบความอุ่นใจ ความปลอดภัย และรอยยิ้มให้คนที่คุณรัก... ให้ GO CARES เป็นตัวแทนความห่วงใยในทุกย่างก้าว<br />
          เริ่มต้นวางแผนการดูแลสุขภาพที่ดีกว่าเดิม ปรึกษาทีมงานมืออาชีพจากโรงพยาบาลเอกชลได้ฟรี ไม่มีค่าใช้จ่ายล่วงหน้า
        </p>

        <div className="ahc-climax-btns">
          <button className="ahc-btn ahc-btn-gold" data-open-booking data-pkg="pkg2">
            <span>จองผู้ดูแลพร้อมรถ (แนะนำ)</span>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <a href={`tel:${content.contact.hotlinePhone.replace(/\s+/g, '')}`} className="ahc-btn ahc-btn-outline-white">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>โทรปรึกษาฟรี {content.contact.hotlinePhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
