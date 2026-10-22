import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function StepFeatures({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-included-section" id="whats-included">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>รายละเอียดความคุ้มค่า</span>
          </span>
          <h2 className="ahc-section-title">สิ่งที่รวมอยู่ในราคาค่าบริการ</h2>
          <p className="ahc-section-subtitle">
            ให้คุณมั่นใจว่าคนที่คุณรักจะได้รับการดูแลอย่างเอาใจใส่ในทุกนาที ตั้งแต่ต้นจนจบ ครอบคลุมการดูแลครบทั้ง 6
            ด้านสำคัญ
          </p>
        </div>

        <div className="ahc-included-grid">
          {content.serviceSteps.map((step, index) => (
            <div key={step.id} className={`ahc-included-card ahc-reveal ahc-delay-${(index % 3) + 1}`}>
              <div className="ahc-included-card-img-wrap">
                <img src={step.image} alt={step.title} className="ahc-included-card-img" />
                <span className="ahc-included-step-badge">ขั้นตอนที่ {step.step}</span>
              </div>
              <div className="ahc-included-card-body">
                <h3 className="ahc-included-card-title">{step.title}</h3>
                <p className="ahc-included-card-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ahc-disclaimers-grid ahc-reveal ahc-delay-2">
          <div className="ahc-notice-card ahc-notice-card-danger">
            <div className="ahc-notice-icon">
              <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" style={{ color: 'var(--ahc-danger-text)' }}>
                <circle cx="12" cy="4" r="2"></circle>
                <path d="m10.5 9 1 5h4"></path>
                <path d="M7 19a5 5 0 1 0 5-5"></path>
                <path d="M12 14v5"></path>
              </svg>
            </div>
            <div className="ahc-notice-content">
              <h4>กรณีใช้รถพยาบาลฉุกเฉิน</h4>
              <p>
                กรณีผู้ที่ต้องใช้รถเข็นพิเศษหรือเคลื่อนย้ายลำบาก และครอบครัวที่ไม่สะดวกจัดรถเอง ต้องใช้รถพยาบาล
                คิดค่าใช้จ่ายแยกจากค่าบริการตามระดับการดูแล
              </p>
            </div>
          </div>

          <div className="ahc-notice-card ahc-notice-card-danger">
            <div className="ahc-notice-icon">
              <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" style={{ color: 'var(--ahc-danger-text)' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <div className="ahc-notice-content">
              <h4>สิ่งที่ไม่รวมในราคา</h4>
              <ul>
                <li>ค่ารักษาพยาบาลและค่ายาที่โรงพยาบาลเรียกเก็บ</li>
                <li>ค่าที่จอดรถ</li>
                <li>ค่าอาหารระหว่างวัน</li>
              </ul>
            </div>
          </div>

          <div className="ahc-notice-card ahc-notice-card-info">
            <div className="ahc-notice-icon">
              <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" style={{ color: 'var(--ahc-blue)' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="ahc-notice-content">
              <h4>ความโปร่งใสด้านราคา แจ้งล่วงหน้าเสมอ</h4>
              <p>
                หากงานใช้เวลานานกว่าที่ประเมินไว้มาก หรือต้องการการดูแลระดับสูงกว่าปกติ ทีมจะแจ้งส่วนต่างให้ทราบก่อนเสมอ
                ไม่เรียกเก็บเพิ่มภายหลังโดยไม่แจ้งล่วงหน้า
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
