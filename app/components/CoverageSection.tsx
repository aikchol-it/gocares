'use client';

import React, { useState } from 'react';

const districts = [
  { name: 'อำเภอเมืองชลบุรี', tag: 'ศูนย์กลางบริการ', eta: '15-20 นาที', note: 'รพ.เอกชล, รพ.เอกชล อ่างศิลา, รพ.ชลบุรี, ม.บูรพา' },
  { name: 'อำเภอศรีราชา', tag: 'พื้นที่หลัก', eta: '20-30 นาที', note: 'รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา, สมิติเวช ศรีราชา' },
  { name: 'อำเภอบ้านบึง', tag: 'พื้นที่บริการ', eta: '25-35 นาที', note: 'รพ.บ้านบึง และคลินิกเฉพาะทาง' },
  { name: 'อำเภอพานทอง', tag: 'พื้นที่บริการ', eta: '25-35 นาที', note: 'รพ.พานทอง และสถานพยาบาลใกล้เคียง' },
  { name: 'อำเภอพนัสนิคม', tag: 'พื้นที่บริการ', eta: '30-40 นาที', note: 'รพ.พนัสนิคม' },
  { name: 'อำเภอบางละมุง (พัทยา)', tag: 'พื้นที่หลัก', eta: '35-45 นาที', note: 'รพ.กรุงเทพพัทยา, รพ.บางละมุง' },
  { name: 'อำเภอบ่อทอง', tag: 'พื้นที่บริการ', eta: '45-60 นาที', note: 'บริการนัดหมายล่วงหน้า' },
  { name: 'อำเภอหนองใหญ่', tag: 'พื้นที่บริการ', eta: '45-60 นาที', note: 'บริการนัดหมายล่วงหน้า' },
];

export default function CoverageSection() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

  return (
    <section className="ahc-coverage-section" id="coverage-area">
      <div className="ahc-container">
        <div className="ahc-section-header">
          <span className="ahc-section-tag">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>พื้นที่ให้บริการ</span>
          </span>
          <h2 className="ahc-section-title">ครอบคลุมทุกอำเภอในจังหวัดชลบุรี</h2>
          <p className="ahc-section-subtitle">
            รถตู้บริการพร้อมคนขับและผู้ดูแลเดินทางไปรับถึงหน้าบ้าน และพาไปส่งได้ทุกโรงพยาบาลทั้งภาครัฐและเอกชน
          </p>
        </div>

        <div className="ahc-coverage-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '32px' }}>
          {districts.map((d) => (
            <div
              key={d.name}
              className={`ahc-coverage-card ${selectedDistrict.name === d.name ? 'active' : ''}`}
              onClick={() => setSelectedDistrict(d)}
              style={{
                background: selectedDistrict.name === d.name ? 'var(--ahc-blue-light)' : '#ffffff',
                border: `1.5px solid ${selectedDistrict.name === d.name ? 'var(--ahc-blue)' : 'var(--ahc-border)'}`,
                borderRadius: '16px',
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ahc-blue)' }}>{d.name}</span>
                <span style={{ fontSize: '11px', background: 'rgba(0, 70, 128, 0.08)', padding: '2px 8px', borderRadius: '12px', color: 'var(--ahc-blue)' }}>
                  {d.tag}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--ahc-text-secondary)', margin: '0 0 6px 0' }}>{d.note}</p>
              <span style={{ fontSize: '12px', color: 'var(--ahc-green-dark)', fontWeight: 600 }}>เวลารับล่วงหน้าโดยประมาณ: {d.eta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
