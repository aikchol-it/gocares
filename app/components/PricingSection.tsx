import React from 'react';
import { SiteContent } from '../lib/site-content-types';

const PKGS = ['pkg1', 'pkg2', 'pkg3', 'pkg4'] as const;

const FEATURES: Record<(typeof PKGS)[number], string[]> = {
  pkg1: [
    '3 ชั่วโมง สำหรับนัดใกล้บ้าน',
    'เจ้าหน้าที่อยู่ด้วยตลอดการตรวจ',
    'จัดคิว ยื่นบัตร และรับยาให้',
    'สรุปผลให้ครอบครัวทาง LINE',
  ],
  pkg2: [
    '5 ชั่วโมง สำหรับนัดครึ่งวัน',
    'เจ้าหน้าที่อยู่ด้วยตลอดการตรวจ',
    'จัดคิว ยื่นบัตร และรับยาให้',
    'สรุปผลให้ครอบครัวทาง LINE',
  ],
  pkg3: [
    '5 ชั่วโมง พร้อมระยะทาง 30 กม.',
    'เจ้าหน้าที่อยู่ด้วยตลอดการตรวจ',
    'จัดคิว ยื่นบัตร และรับยาให้',
    'สรุปผลให้ครอบครัวทาง LINE',
  ],
  pkg4: [
    '8 ชั่วโมง สำหรับธุระทั้งวัน',
    'พาไปธนาคาร ราชการ หรือซื้อของ',
    'ฟรี 10 กม. แรก เกินคิด 12 บาท/กม.',
    'ไปได้ทุกที่ในจังหวัดชลบุรี',
  ],
};

function CheckIcon() {
  return (
    <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export default function PricingSection({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-pricing-section" id="pricing">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>ราคาเริ่มต้น 500 บาท</span>
          </span>
          <h2 className="ahc-section-title">ค่าบริการ GO CARES by AIKCHOL NEXT</h2>
        </div>

        <div className="ahc-pricing-grid">
          {PKGS.map((key, i) => {
            const pkg = content.packages[key];
            const featured = key === 'pkg2';
            return (
              <div
                key={key}
                className={`ahc-price-card ahc-reveal ahc-delay-${i + 1}${featured ? ' ahc-price-card-recommended' : ''}`}
              >
                {featured && (
                  <div className="ahc-recommended-crown-badge">
                    <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>แนะนำ ยอดนิยม</span>
                  </div>
                )}

                <div className="ahc-price-card-header">
                  <h3 className="ahc-price-card-title">{pkg.name}</h3>
                  <p className="ahc-price-card-sub">{pkg.sub}</p>
                </div>

                <div className="ahc-price-amount-box">
                  <div className="ahc-price-number">{pkg.price} บาท</div>
                  <div className="ahc-price-unit">/ {pkg.hours} ชั่วโมง · {pkg.distance}</div>
                </div>

                <ul className="ahc-price-features-list">
                  {FEATURES[key].map((feature) => (
                    <li key={feature} className="ahc-price-feature-item">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`ahc-btn ${featured ? 'ahc-btn-primary' : 'ahc-btn-outline'}`}
                  data-open-booking
                  data-pkg={key}
                >
                  จองแพ็กเกจนี้
                </button>
              </div>
            );
          })}
        </div>

        <p
          className="ahc-reveal"
          style={{ textAlign: 'right', color: 'var(--ahc-danger-text)', fontWeight: 700, fontSize: '13px', margin: '14px 0 0' }}
        >
          ราคาโปรโมชั่นถึง 31 มกราคม 2570
        </p>
        <p style={{ fontSize: '13px', color: 'var(--ahc-text-muted)', margin: '10px 0 0' }}>
          * ไม่รวมค่ารักษาพยาบาล ค่ายา และค่าที่จอดรถ · พารถไปธุระได้ทุกที่ในจังหวัดชลบุรี
        </p>
      </div>
    </section>
  );
}
