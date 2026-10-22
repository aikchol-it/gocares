import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function AppointmentsSection({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-appointments-section">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20"></path>
            </svg>
            <span>ครอบคลุมทุกแผนกการรักษา</span>
          </span>
          <h2 className="ahc-section-title">ประเภทนัดหมายที่ GO CARES ดูแลได้</h2>
          <p className="ahc-section-subtitle">
            ดูแลได้ทุกประเภทนัด ทั้งโรงพยาบาลรัฐและเอกชน รวมถึงคลินิกเฉพาะทาง ไม่จำกัดว่าต้องเป็นโรงพยาบาลใด
            สิ่งที่ต่างกันคือระยะเวลาที่ใช้ ซึ่งทีมงานจะประเมินให้ตอนจอง
          </p>
        </div>

        <div className="ahc-appointments-grid">
          {content.appointments.map((apt, index) => (
            <div key={apt.id} className={`ahc-apt-card ahc-reveal ahc-delay-${(index % 4) + 1}`}>
              <div className="ahc-apt-badge-wrap">
                <img src={apt.image} alt={apt.title} className="ahc-apt-img" />
              </div>
              <div className="ahc-apt-content">
                <h3 className="ahc-apt-title">{apt.title}</h3>
                <p className="ahc-apt-desc">{apt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
