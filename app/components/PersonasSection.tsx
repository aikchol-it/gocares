import React from 'react';
import { SiteContent } from '../lib/site-content-types';

const icons = [
  (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </>
  ),
  (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </>
  ),
  (
    <>
      <circle cx="12" cy="4" r="2"></circle>
      <path d="m10.5 9 1 5h4"></path>
      <path d="M7 19a5 5 0 1 0 5-5"></path>
      <path d="M12 14v5"></path>
    </>
  ),
  (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </>
  ),
];

export default function PersonasSection({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-personas-section">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-sea" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>กลุ่มผู้ใช้บริการ</span>
          </span>
          <h2 className="ahc-section-title">บริการนี้เหมาะกับใคร ?</h2>
          <p className="ahc-section-subtitle">
            ออกแบบมาเพื่อช่วยแบ่งเบาภาระของทุกครอบครัว โดยเฉพาะกลุ่มที่การไปโรงพยาบาลเป็นเรื่องยากลำบาก
            และนัดหมายที่เลื่อนไม่ได้
          </p>
        </div>

        <div className="ahc-personas-grid">
          {content.personas.map((persona, index) => (
            <div key={persona.id} className={`ahc-persona-card ahc-reveal ahc-delay-${index + 1}`}>
              <div className="ahc-persona-img-wrap">
                <img src={persona.image} alt={persona.title} className="ahc-persona-card-img" loading="lazy" />
              </div>
              <div className="ahc-persona-badge-row">
                <div className="ahc-persona-circle-icon">
                  <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24">
                    {icons[index]}
                  </svg>
                </div>
                <div className="ahc-persona-number">{persona.num}</div>
              </div>
              <h3 className="ahc-persona-title">{persona.title}</h3>
              <p className="ahc-persona-desc">{persona.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
