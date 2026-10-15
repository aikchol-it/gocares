'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="ahc-footer" style={{ background: '#002e52', color: '#ffffff', padding: '60px 0 32px' }}>
      <div className="ahc-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/assets/aikchol_next_logo.webp" alt="Aikchol Next Logo" style={{ height: '36px', filter: 'brightness(0) invert(1)' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>GO CARES</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#93c5fd' }}>โดย โรงพยาบาลเอกชล ชลบุรี</p>
              </div>
            </div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6' }}>
              บริการผู้ช่วยดูแลและพาผู้สูงอายุไปโรงพยาบาล พร้อมรถรับ-ส่งถึงบ้าน สร้างความสุขและความสบายใจให้ทุกครอบครัวในจังหวัดชลบุรี
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '14px' }}>โรงพยาบาลปลายทาง</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>โรงพยาบาลเอกชล (ถ.พระยาสัจจา)</li>
              <li>โรงพยาบาลเอกชล อ่างศิลา</li>
              <li>โรงพยาบาลชลบุรี (รพ.รัฐ)</li>
              <li>โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา</li>
              <li>โรงพยาบาลมหาวิทยาลัยบูรพา</li>
              <li>โรงพยาบาลและคลินิกอื่นๆ ทั่วชลบุรี</li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '14px' }}>ติดต่อเรา</h5>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 10px 0' }}>
              สายด่วน 24 ชั่วโมง:{' '}
              <a href="tel:0639204765" style={{ color: '#67e8f9', fontWeight: 700 }}>
                063 920 4765
              </a>
            </p>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 10px 0' }}>
              LINE Official:{' '}
              <a href="https://lin.ee/RbECVC5" target="_blank" rel="noreferrer" style={{ color: '#67e8f9', fontWeight: 700 }}>
                @407eqbwl
              </a>
            </p>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '14px 0 0 0' }}>
              ที่อยู่: 68/3 หมู่ 2 ถนนพระยาสัจจา ตำบลบ้านสวน อำเภอเมืองชลบุรี จังหวัดชลบุรี 20000
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '24px', textAlign: 'center', fontSize: '12.5px', color: '#94a3b8' }}>
          © {new Date().getFullYear()} GO CARES by AIKCHOL NEXT — โรงพยาบาลเอกชล. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
