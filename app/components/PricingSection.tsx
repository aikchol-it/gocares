'use client';

import React, { useState } from 'react';

interface PricingSectionProps {
  onSelectBooking: (pkg?: string) => void;
}

export default function PricingSection({ onSelectBooking }: PricingSectionProps) {
  const [selectedDuration, setSelectedDuration] = useState<'4hr' | '6hr'>('4hr');

  return (
    <section className="ahc-pricing-section" id="pricing">
      <div className="ahc-container">
        <div className="ahc-section-header">
          <span className="ahc-section-tag">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>อัตราค่าบริการที่โปร่งใส</span>
          </span>
          <h2 className="ahc-section-title">เลือกแพ็กเกจที่ตรงกับความต้องการของคุณ</h2>
          <p className="ahc-section-subtitle">
            ไม่มีค่าใช้จ่ายแอบแฝง รวมประกันอุบัติเหตุและผู้ดูแลที่ผ่านการฝึกอบรมเรียบร้อยแล้ว
          </p>

          {/* Duration Toggle */}
          <div className="ahc-pricing-duration-toggle">
            <button
              type="button"
              className={`ahc-duration-btn ${selectedDuration === '4hr' ? 'active' : ''}`}
              onClick={() => setSelectedDuration('4hr')}
            >
              ระยะเวลา 4 ชั่วโมง (มาตรฐาน)
            </button>
            <button
              type="button"
              className={`ahc-duration-btn ${selectedDuration === '6hr' ? 'active' : ''}`}
              onClick={() => setSelectedDuration('6hr')}
            >
              ระยะเวลา 6 ชั่วโมง (สำหรับคิวตรวจยาว / ทำกิจกรรม)
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="ahc-pricing-cards-grid">
          {/* Package 1 */}
          <div className="ahc-price-card">
            <div className="ahc-price-card-header">
              <span className="ahc-price-pkg-badge">แพ็กเกจที่ 1</span>
              <h3 className="ahc-price-pkg-name">บริการมาตรฐาน (พบที่ รพ.)</h3>
              <p className="ahc-price-pkg-desc">ผู้ดูแลรอรับที่โรงพยาบาล เหมาะสำหรับครอบครัวที่สะดวกมาส่งเอง</p>
              <div className="ahc-price-amount-wrap">
                <span className="ahc-price-currency">฿</span>
                <span className="ahc-price-number">{selectedDuration === '4hr' ? '1,000' : '1,300'}</span>
                <span className="ahc-price-unit">/ ครั้ง</span>
              </div>
            </div>

            <div className="ahc-price-features-list">
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ผู้ดูแลรอรับที่จุดนัดพบในโรงพยาบาล</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ช่วยจัดคิว ยื่นเอกสารสิทธิการรักษา</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>เข้าห้องตรวจร่วมและจดบันทึกคำสั่งแพทย์</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>รับยาแทนและทบทวนวิธีใช้ยากับเภสัชกร</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ส่งสรุปรายงานครอบครัวผ่าน LINE ตลอดเวลา</span>
              </div>
            </div>

            <button
              type="button"
              className="ahc-btn ahc-btn-outline ahc-price-cta"
              onClick={() => onSelectBooking('pkg1')}
            >
              <span>เลือกแพ็กเกจนี้</span>
            </button>
          </div>

          {/* Package 2 (Recommended) */}
          <div className="ahc-price-card ahc-price-card-recommended">
            <div className="ahc-price-card-ribbon">แนะนำยอดนิยม</div>
            <div className="ahc-price-card-header">
              <span className="ahc-price-pkg-badge" style={{ background: 'var(--ahc-blue)', color: '#ffffff' }}>
                แพ็กเกจที่ 2
              </span>
              <h3 className="ahc-price-pkg-name">ผู้ดูแล + รถรับ-ส่งถึงบ้าน</h3>
              <p className="ahc-price-pkg-desc">ไปรับถึงหน้าบ้าน นั่งรถเป็นเพื่อน ดูแลตลอดเวลาจนส่งเข้าบ้าน</p>
              <div className="ahc-price-amount-wrap">
                <span className="ahc-price-currency">฿</span>
                <span className="ahc-price-number">{selectedDuration === '4hr' ? '1,300' : '1,600'}</span>
                <span className="ahc-price-unit">/ ครั้ง</span>
              </div>
            </div>

            <div className="ahc-price-features-list">
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span><strong>รถตู้รับ-ส่งถึงหน้าบ้าน</strong> (ในเขตชลบุรี)</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>วัดสัญญาณชีพ (ความดัน, ชีพจร) ก่อนออกเดินทาง</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>รองรับผู้สูงอายุใช้วีลแชร์ (Wheelchair Ramp)</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ดูแลตลอดเวลาในโรงพยาบาล เข้าห้องตรวจร่วม</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ส่งถึงเตียงนอนที่บ้าน + รายงาน LINE ครบถ้วน</span>
              </div>
            </div>

            <button
              type="button"
              className="ahc-btn ahc-btn-gold ahc-price-cta"
              onClick={() => onSelectBooking('pkg2')}
            >
              <span>เลือกแพ็กเกจนี้ (แนะนำ)</span>
            </button>
          </div>

          {/* Package 3 */}
          <div className="ahc-price-card">
            <div className="ahc-price-card-header">
              <span className="ahc-price-pkg-badge">แพ็กเกจที่ 3</span>
              <h3 className="ahc-price-pkg-name">บริการพาทำกิจกรรม</h3>
              <p className="ahc-price-pkg-desc">พาไปทำธุระส่วนตัว ท่องเที่ยว ช้อปปิ้ง หรือทำบุญไหว้พระ</p>
              <div className="ahc-price-amount-wrap">
                <span className="ahc-price-currency">฿</span>
                <span className="ahc-price-number">{selectedDuration === '4hr' ? '1,500' : '1,800'}</span>
                <span className="ahc-price-unit">/ ครั้ง</span>
              </div>
            </div>

            <div className="ahc-price-features-list">
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>รถรับ-ส่งถึงหน้าบ้านพร้อมผู้ดูแลมืออาชีพ</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>พาไปทำบุญไหว้พระ ทานอาหาร หรือเดินห้าง</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ช่วยถือสัมภาระ เข็นรถ และดูแลความปลอดภัย</span>
              </div>
              <div className="ahc-price-feature-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>รายงานภาพถ่ายให้ครอบครัวตลอดการทำกิจกรรม</span>
              </div>
            </div>

            <button
              type="button"
              className="ahc-btn ahc-btn-outline ahc-price-cta"
              onClick={() => onSelectBooking('pkg3')}
            >
              <span>เลือกแพ็กเกจนี้</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
