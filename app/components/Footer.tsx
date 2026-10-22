import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function Footer({ content }: { content: SiteContent }) {
  const tel = `tel:${content.contact.hotlinePhone.replace(/\s+/g, '')}`;

  return (
    <footer className="ahc-footer">
      <div className="ahc-container">
        <div className="ahc-footer-grid">
          <div className="ahc-footer-brand">
            <h4>AIKCHOL HOSPITAL (AHC)</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', marginBottom: '16px' }}>
              โรงพยาบาลเอกชล มุ่งมั่นสู่พันธกิจ <strong>&quot;Enhancing Family Happiness&quot;</strong> ด้วยบริการ GO
              CARES ดูแลพาผู้สูงอายุและผู้ป่วยไปโรงพยาบาลแบบครบวงจร
            </p>
            <div style={{ fontSize: '13px', color: 'var(--ahc-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <strong>สายด่วน GO CARES: {content.contact.hotlinePhone}</strong>
            </div>
          </div>

          <div className="ahc-footer-col">
            <h5>เมนูลัดบริการ</h5>
            <ul className="ahc-footer-links">
              <li>
                <a href="#care-moments" className="ahc-footer-link">
                  บริการครบวงจร 4 มิติ
                </a>
              </li>
              <li>
                <a href="#video-tour" className="ahc-footer-link">
                  วิดีโอจำลองการเดินทาง 19 วิ
                </a>
              </li>
              <li>
                <a href="#why-gocares" className="ahc-footer-link">
                  ความเสี่ยงผู้สูงอายุเมื่อไปคนเดียว
                </a>
              </li>
              <li>
                <a href="#pricing" className="ahc-footer-link">
                  แพ็กเกจและอัตราค่าบริการ
                </a>
              </li>
              <li>
                <a href="#coverage-area" className="ahc-footer-link">
                  พื้นที่ให้บริการ 8 อำเภอ
                </a>
              </li>
            </ul>
          </div>

          <div className="ahc-footer-col">
            <h5>โรงพยาบาลในเครือเอกชล</h5>
            <ul className="ahc-footer-links">
              <li>
                <a href="https://www.aikchol.com" target="_blank" rel="noopener" className="ahc-footer-link">
                  โรงพยาบาลเอกชล (ชลบุรี)
                </a>
              </li>
              <li>
                <a href="https://www.aikchol.com" target="_blank" rel="noopener" className="ahc-footer-link">
                  โรงพยาบาลเอกชล (อ่างศิลา)
                </a>
              </li>
              <li>
                <a href="#" className="ahc-footer-link">
                  AIKCHOL NEXT Health Ecosystem
                </a>
              </li>
            </ul>
          </div>

          <div className="ahc-footer-col">
            <h5>ที่ตั้งและติดต่อ</h5>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#ffffff' }}>โรงพยาบาลเอกชล</strong>
                <br />
                เลขที่ 68/3 หมู่ 2 ถ.พระยาสัจจา ต.บ้านสวน อ.เมืองชลบุรี จ.ชลบุรี 20000
                <br />
                โทรศัพท์: 038 939 999
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#ffffff' }}>โรงพยาบาลเอกชล อ่างศิลา</strong>
                <br />
                เลขที่ 31/2 ถ.อ่างศิลา ต.เสม็ด อ.เมืองชลบุรี จ.ชลบุรี 20000
                <br />
                โทรศัพท์: 038 939 888
              </p>
              <p style={{ margin: 0, paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <strong style={{ color: 'var(--ahc-green)' }}>สายด่วน GO CARES:</strong> {content.contact.hotlinePhone}
                <br />
                LINE Official: {content.contact.lineOaId} ({content.contact.lineOaUrl})
                <br />
                <a href={tel} style={{ color: 'inherit' }}>
                  โทร: {content.contact.hotlinePhone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="ahc-footer-bottom">
          <div>© 2026 AIKCHOL HOSPITAL PUBLIC COMPANY LIMITED. All Rights Reserved.</div>
          <div>Enhancing Family Happiness • Care Beyond the Hospital</div>
        </div>
      </div>
    </footer>
  );
}
