'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'ต้องจองบริการล่วงหน้าอย่างน้อยกี่วัน?',
    a: 'แนะนำให้จองล่วงหน้าอย่างน้อย 1-2 วัน เพื่อให้ทีมงานจัดเตรียมผู้ดูแลและยานพาหนะที่ตรงกับความต้องการของผู้สูงอายุได้อย่างสมบูรณ์แบบที่สุด กรณีมีคิวด่วน สามารถโทรสอบถามสายด่วน 063 920 4765 ได้ตลอดเวลาทำการ',
  },
  {
    q: 'หากผู้สูงอายุต้องใช้วีลแชร์ (Wheelchair) สามารถใช้บริการได้หรือไม่?',
    a: 'สามารถใช้บริการได้แน่นอนครับ รถตู้ของ GO CARES ออกแบบมาเพื่อรองรับผู้ใช้วีลแชร์โดยเฉพาะ มีทางลาดขึ้น-ลง และจุดยึดตรึงมาตรฐานความปลอดภัย รวมถึงผู้ดูแลจะช่วยเข็นรถให้ตลอดการตรวจในโรงพยาบาล',
  },
  {
    q: 'บริการนี้พาไปโรงพยาบาลรัฐ หรือโรงพยาบาลอื่นๆ นอกเหนือจากเอกชลได้หรือไม่?',
    a: 'สามารถพาไปได้ทุกโรงพยาบาลทั้งภาครัฐและเอกชนในจังหวัดชลบุรี เช่น โรงพยาบาลชลบุรี (รพ.รัฐ), โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา, โรงพยาบาลมหาวิทยาลัยบูรพา, หรือคลินิกเฉพาะทาง',
  },
  {
    q: 'ผู้ดูแลมีทักษะทางการแพทย์หรือไม่?',
    a: 'ผู้ดูแลของเราผ่านการฝึกอบรมการปฐมพยาบาลเบื้องต้น (First Aid & CPR) การวัดสัญญาณชีพ การพยุงตัว และการเคลื่อนย้ายผู้สูงอายุ แต่จะไม่ทำหัตถการทางการแพทย์ เช่น การฉีดยา หรือการเจาะเลือด',
  },
  {
    q: 'ลูกหลานที่ทำงานอยู่จะทราบความคืบหน้าอย่างไร?',
    a: 'ผู้ดูแลจะส่งภาพถ่ายและข้อความสรุปผ่าน LINE อย่างต่อเนื่อง ตั้งแต่นาทีที่ไปถึงบ้าน, ถึงโรงพยาบาล, ขณะรอตรวจ, บันทึกคำแนะนำแพทย์, รายการยา และเมื่อส่งคุณพ่อคุณแม่กลับถึงเตียงนอนเรียบร้อย',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="ahc-faq-section" id="faq">
      <div className="ahc-container">
        <div className="ahc-section-header">
          <span className="ahc-section-tag">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>คลายข้อสงสัย</span>
          </span>
          <h2 className="ahc-section-title">คำถามที่พบบ่อย (FAQ)</h2>
          <p className="ahc-section-subtitle">
            รวมคำถามที่ครอบครัวสอบถามเข้ามาบ่อยที่สุดเกี่ยวกับการใช้บริการ GO CARES
          </p>
        </div>

        <div className="ahc-faq-container" style={{ maxWidth: '860px', margin: '36px auto 0' }}>
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`ahc-faq-item ${isOpen ? 'open' : ''}`}
                style={{
                  border: '1.5px solid var(--ahc-border)',
                  borderRadius: '16px',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                <button
                  type="button"
                  className="ahc-faq-question-btn"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--ahc-blue)' }}>
                    {item.q}
                  </span>
                  <svg
                    className="ahc-icon ahc-icon-sm"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {isOpen && (
                  <div
                    className="ahc-faq-answer"
                    style={{
                      padding: '0 24px 22px',
                      fontSize: '15px',
                      color: 'var(--ahc-text-secondary)',
                      lineHeight: '1.65',
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
