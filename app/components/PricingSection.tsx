import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function PricingSection({ content }: { content: SiteContent }) {
  const { pkg1, pkg2 } = content.packages;

  return (
    <section className="ahc-pricing-section" id="pricing">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>อัตราค่าบริการที่โปร่งใส</span>
          </span>
          <h2 className="ahc-section-title">อัตราค่าบริการ GO CARES by AIKCHOL NEXT</h2>
          <p className="ahc-section-subtitle">
            คุ้มค่า เข้าถึงง่าย และโปร่งใส ตั้งแต่ไปรับที่บ้านจนถึงส่งกลับเข้าบ้านอย่างปลอดภัย ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
        </div>

        <div className="ahc-pricing-toggle-wrap ahc-reveal ahc-delay-1">
          <button className="ahc-pricing-toggle-btn active" data-hours="5">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>5 ชั่วโมง (ครึ่งวัน)</span>
          </button>
          <button className="ahc-pricing-toggle-btn" data-hours="8">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>8 ชั่วโมง (เต็มวัน)</span>
          </button>
        </div>

        <div className="ahc-pricing-grid">
          <div className="ahc-price-card ahc-reveal ahc-delay-1">
            <div className="ahc-price-card-header">
              <div className="ahc-price-pkg-num">1</div>
              <h3 className="ahc-price-card-title">แพ็กเกจมาตรฐาน</h3>
              <p className="ahc-price-card-sub">พาผู้สูงอายุไปพบแพทย์ ณ โรงพยาบาล</p>
            </div>

            <div className="ahc-price-amount-box">
              <div className="ahc-price-number" id="ahcPricePkg1">{pkg1.price5h} บาท</div>
              <div className="ahc-price-unit" id="ahcUnitPkg1">/ บริการ 5 ชั่วโมง (ครึ่งวัน)</div>
            </div>

            <ul className="ahc-price-features-list">
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span>
                  <strong>ไปรับถึงบ้าน:</strong> ผู้ดูแลไปช่วยเตรียมตัว ช่วยขึ้นลงรถ และดูแลส่งเข้าบ้านเรียบร้อย
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <span>
                  <strong>ฟรีค่าเดินทางไป-กลับ:</strong> จากโรงพยาบาลจนถึงที่พัก ในระยะทาง 10 กม.
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>
                  <strong>เคียงข้างตลอดการตรวจ:</strong> จัดคิว ยื่นบัตร จดคำแนะนำแพทย์ และช่วยรับยา
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>
                  <strong>รายงานครอบครัว:</strong> อัปเดตสถานะและสรุปผลตรวจผ่าน LINE
                </span>
              </li>
            </ul>

            <button className="ahc-btn ahc-btn-outline" data-open-booking data-pkg="pkg1">
              เลือกแพ็กเกจนี้
            </button>
          </div>

          <div className="ahc-price-card ahc-price-card-recommended ahc-reveal ahc-delay-2">
            <div className="ahc-recommended-crown-badge">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>แนะนำ ยอดนิยม</span>
            </div>

            <div className="ahc-price-card-header">
              <div className="ahc-price-pkg-num">2</div>
              <h3 className="ahc-price-card-title">แพ็กเกจผู้ดูแล + รถ</h3>
              <p className="ahc-price-card-sub">พาพบแพทย์ พร้อมรถรับ-ส่งเฉพาะตลอดเส้นทาง</p>
            </div>

            <div className="ahc-price-amount-box">
              <div className="ahc-price-number" id="ahcPricePkg2">{pkg2.price5h} บาท</div>
              <div className="ahc-price-unit" id="ahcUnitPkg2">/ บริการ 5 ชั่วโมง (ครึ่งวัน)</div>
            </div>

            <ul className="ahc-price-features-list">
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <span>
                  <strong>รถรับ-ส่งเฉพาะถึงหน้าบ้าน:</strong> ปลอดภัย สะอาด ได้มาตรฐาน แอร์เย็นสบาย รองรับรถเข็น
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  <strong>รวมค่าเดินทาง 30 กม.:</strong> ครอบคลุมระยะทางไป-กลับจากโรงพยาบาลถึงที่พัก 30 กม.
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>
                  <strong>ผู้ดูแลส่วนตัวประกบตลอด:</strong> ตั้งแต่ก้าวออกจากบ้าน จนถึงกลับเข้าบ้านอย่างปลอดภัย
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <span>
                  <strong>Service Report ฉบับสมบูรณ์:</strong> รายการยาที่ปรับเปลี่ยน ข้อควรระวัง และรูปถ่ายฉลากยา
                </span>
              </li>
            </ul>

            <button className="ahc-btn ahc-btn-primary" data-open-booking data-pkg="pkg2">
              <span>จองแพ็กเกจผู้ดูแล + รถ</span>
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div className="ahc-price-card ahc-reveal ahc-delay-3">
            <div className="ahc-price-card-header">
              <div className="ahc-price-pkg-num">3</div>
              <h3 className="ahc-price-card-title">บริการพาทำกิจกรรมต่างๆ</h3>
              <p className="ahc-price-card-sub">ธุระส่วนตัว ทำธุรกรรม ช้อปปิ้ง นัดสังสรรค์</p>
            </div>

            <div className="ahc-price-amount-box">
              <div className="ahc-price-number">1,500 บาท</div>
              <div className="ahc-price-unit">/ บริการ 8 ชั่วโมง (เริ่มต้น)</div>
            </div>

            <ul className="ahc-price-features-list">
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>
                  <strong>ดูแลทำธุระครบวงจร:</strong> พาไปธนาคาร ศูนย์ราชการ ซื้อของ หรือพบปะญาติมิตร
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>
                  <strong>ผู้ช่วยเคียงข้างดูแลความปลอดภัย:</strong> ช่วยถือของ ช่วยเดิน และคอยระมัดระวังตลอดวัน
                </span>
              </li>
              <li className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-price-feature-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>
                  <strong>หมายเหตุค่าเดินทาง:</strong> อัตรานี้ยังไม่รวมค่าเดินทางไป-กลับในการทำธุระต่างๆ
                </span>
              </li>
            </ul>

            <button className="ahc-btn ahc-btn-outline" data-open-booking data-pkg="pkg3">
              ปรึกษาจัดทริปทำธุระ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
