import React from 'react';
import { SiteContent } from '../lib/site-content-types';

const tabs = [
  {
    key: 'book',
    label: '1. นัดหมาย & วางแผน',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </>
    ),
  },
  {
    key: 'mobility',
    label: '2. รับส่งถึงบ้านปลอดภัย',
    icon: (
      <>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
        <circle cx="17" cy="18" r="2"></circle>
        <circle cx="7" cy="18" r="2"></circle>
      </>
    ),
  },
  {
    key: 'hospital',
    label: '3. เคียงข้างในโรงพยาบาล',
    icon: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </>
    ),
  },
  {
    key: 'consultation',
    label: '4. จดคำสั่ง & ทวนวิธีใช้ยา',
    icon: (
      <>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
        <path d="m8.5 8.5 7 7"></path>
      </>
    ),
  },
  {
    key: 'report',
    label: '5. รายงานสด & ส่งกลับบ้าน',
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </>
    ),
  },
];

export default function MomentsTabSlider({ content }: { content: SiteContent }) {
  const first = content.moments[0];

  return (
    <section className="ahc-moments-section" id="care-moments">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>COMPLETE CARE FROM HOME TO HOSPITAL</span>
          </span>
          <h2 className="ahc-section-title">ดูแลครบวงจรตั้งแต่ก้าวออกจากบ้าน จนถึงส่งกลับเข้าบ้าน</h2>
          <p className="ahc-section-subtitle">
            เปลี่ยนความกังวลใจของครอบครัว เป็นความอุ่นใจที่สัมผัสได้ — ไม่ใช่แค่รถรับส่ง แต่คือ Personal Caregiver &amp;
            Companion ที่อยู่เคียงข้างเสมือนคนในครอบครัวทุกย่างก้าว
          </p>
        </div>

        <div className="ahc-moments-tabs-nav ahc-reveal ahc-delay-1">
          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              className={`ahc-moment-tab-btn ${index === 0 ? 'active' : ''}`}
              data-moment={tab.key}
            >
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                {tab.icon}
              </svg>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="ahc-moment-display-card ahc-reveal ahc-delay-2">
          <div className="ahc-moment-card-content">
            <span id="ahcMomentTag" className="ahc-badge-sea" style={{ marginBottom: '14px' }}>
              {first.tag}
            </span>
            <h3
              id="ahcMomentTitle"
              style={{ fontSize: '28px', fontWeight: 500, color: 'var(--ahc-blue)', marginBottom: '14px', lineHeight: 1.3 }}
            >
              {first.title}
            </h3>
            <p
              id="ahcMomentDesc"
              style={{ fontSize: '16px', fontWeight: 300, color: 'var(--ahc-text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}
            >
              {first.desc}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--ahc-text-secondary)' }}>
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" style={{ color: 'var(--ahc-green)', marginTop: '3px' }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span id="ahcMomentBullet1">{first.bullet1}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--ahc-text-secondary)' }}>
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" style={{ color: 'var(--ahc-green)', marginTop: '3px' }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span id="ahcMomentBullet2">{first.bullet2}</span>
              </li>
            </ul>

            <button className="ahc-btn ahc-btn-primary" data-open-booking data-pkg="pkg2">
              <span>จองบริการ / ปรึกษานัดหมาย</span>
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div className="ahc-moment-card-media">
            <img id="ahcMomentImg" src={first.image} alt={first.title} className="ahc-moment-card-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
