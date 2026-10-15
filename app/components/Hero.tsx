'use client';

import React from 'react';

interface HeroProps {
  onOpenBooking: (pkg?: string) => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="ahc-cinematic-hero-section" id="hero">
      <div className="ahc-container">
        <div className="ahc-hero-cinematic-wrapper">
          {/* Ambient Background Video */}
          <video
            id="ahcHeroBgVideo"
            className="ahc-hero-bg-media"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero_companion.webp"
          >
            <source src="/Hospital_02_clean.mp4" type="video/mp4" />
          </video>

          {/* Scrim Gradient */}
          <div className="ahc-hero-scrim-gradient"></div>

          {/* Glass Floating Hero Card */}
          <div className="ahc-hero-floating-card">
            <div className="ahc-hero-pill-badge">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>บริการทางการแพทย์มาตรฐานโรงพยาบาลเอกชล ชลบุรี</span>
            </div>

            <h1 className="ahc-hero-title">
              หมดห่วงเรื่องพาพ่อแม่ไปหาหมอ <br />
              <span className="ahc-hero-title-accent">ผู้ดูแลมืออาชีพพร้อมรถรับ-ส่งถึงบ้าน</span>
            </h1>

            <p className="ahc-hero-desc">
              ช่วยเตรียมตัว นั่งรถเป็นเพื่อน จัดคิว ยื่นเอกสาร สรุปผลแพทย์ และรายงานครอบครัวผ่าน LINE ตลอดเวลา
              อุ่นใจเหมือนมีพยาบาลในครอบครัวพาไปเอง
            </p>

            <div className="ahc-hero-btn-row">
              <button
                type="button"
                className="ahc-btn ahc-btn-gold ahc-hero-cta"
                onClick={() => onOpenBooking('pkg2')}
              >
                <span>จองผู้ดูแลพร้อมรถทันที</span>
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a
                href="https://lin.ee/RbECVC5"
                target="_blank"
                rel="noreferrer"
                className="ahc-btn ahc-btn-line"
              >
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>ปรึกษาทาง LINE</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="ahc-hero-trust-badges">
              <div className="ahc-trust-badge-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green-dark)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ผู้ดูแลผ่านการฝึกอบรมการปฐมพยาบาล</span>
              </div>
              <div className="ahc-trust-badge-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green-dark)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ประกันอุบัติเหตุคุ้มครองทุกเที่ยว</span>
              </div>
              <div className="ahc-trust-badge-item">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="var(--ahc-green-dark)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>ครอบคลุมทุกโรงพยาบาลในชลบุรี</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
