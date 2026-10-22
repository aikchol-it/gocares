import React from 'react';

const rows = [
  {
    icon: (
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </>
    ),
    risk: '1. ลื่นล้มระหว่างทาง หรือในโรงพยาบาล',
    impact:
      'การล้มเป็นสาเหตุการบาดเจ็บอันดับต้นในผู้สูงอายุ พื้นโรงพยาบาลที่ลื่นกับความแออัดยิ่งเพิ่มความเสี่ยงสูง',
    solution:
      'ผู้ดูแลพยุงและเดินคู่ตลอด รวมถึงช่วยขึ้น-ลงรถและใช้ลิฟต์อย่างถูกวิธี ป้องกันอุบัติเหตุ 100%',
  },
  {
    icon: (
      <>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <line x1="9" y1="12" x2="15" y2="12"></line>
        <line x1="9" y1="16" x2="13" y2="16"></line>
      </>
    ),
    risk: '2. จำคำแนะนำแพทย์ได้ไม่ครบ',
    impact:
      'ในห้องตรวจมีข้อมูลจำนวนมากในเวลาสั้น ผู้สูงอายุไม่น้อยกลับบ้านโดยจำได้ไม่ครบ หรือเข้าใจคลาดเคลื่อน',
    solution:
      'ผู้ดูแลเข้าห้องตรวจด้วย ช่วยจดบันทึกทุกคำแนะนำ ถามซ้ำจุดที่ไม่ชัด และส่งสรุปให้ครอบครัวอ่านทันที',
  },
  {
    icon: (
      <>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
        <path d="m8.5 8.5 7 7"></path>
      </>
    ),
    risk: '3. กินยาผิดหลังกลับบ้าน',
    impact:
      'จุดที่พลาดบ่อยที่สุดคือเมื่อแพทย์เปลี่ยนยาใหม่ แล้วผู้สูงอายุยังกินยาเดิมต่อพร้อมกันจนยาซ้ำซ้อน',
    solution:
      'ผู้ดูแลทวนวิธีใช้ยากับเภสัชกร ถ่ายรูปฉลากยา และแจ้งครอบครัวชัดเจนว่ายาตัวไหนหยุด ตัวไหนเริ่ม',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </>
    ),
    risk: '4. สับสนขั้นตอน จนใช้เวลานานเกิน',
    impact:
      'ระบบโรงพยาบาลมีหลายจุด ตั้งแต่ยื่นบัตร เจาะเลือด รอผล ชำระเงิน ทำให้เดินวนและเหนื่อยล้าเกินจำเป็น',
    solution:
      'ผู้ดูแลชำนาญขั้นตอนโรงพยาบาล จัดคิวและพาไปตามจุดต่างๆ อย่างราบรื่น ไม่ต้องนั่งรอเคว้งคนเดียว',
  },
  {
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </>
    ),
    risk: '5. พลาดนัดครั้งต่อไป',
    impact: 'การขาดนัดติดต่อกันทำให้โรคเบาหวาน ความดัน หรือโรคหัวใจขาดการติดตามจนอาการกำเริบ',
    solution: 'ผู้ดูแลบันทึกวันนัดครั้งถัดไปในระบบ และแจ้งเตือนครอบครัวล่วงหน้า สามารถจองคิวรถล่วงหน้าได้',
  },
  {
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    ),
    risk: '6. ความวิตกกังวล จนไม่อยากไป',
    impact: 'ผู้สูงอายุจำนวนมากเลื่อนนัดเพราะกลัวผลตรวจ หรือกลัวเป็นภาระลูกหลานที่ต้องลางานพาไป',
    solution: 'ผู้ดูแลอยู่เป็นเพื่อน ให้กำลังใจดูแลอย่างอบอุ่น ทำให้ผู้สูงอายุรู้สึกอุ่นใจและไปพบแพทย์สม่ำเสมอ',
  },
];

export default function ComparisonSection() {
  return (
    <section className="ahc-comparison-section" id="why-gocares">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-care" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>ความเสี่ยงที่ครอบครัวกังวล</span>
          </span>
          <h2 className="ahc-section-title">ทำไมผู้สูงอายุไม่ควรไปโรงพยาบาลคนเดียว ?</h2>
          <p className="ahc-section-subtitle">
            ความเสี่ยงหลักไม่ใช่แค่การเดินทาง แต่คือสิ่งที่เกิดขึ้นหลังกลับบ้าน: จำคำแนะนำแพทย์ไม่ครบ ทานยาผิด
            และอาจพลาดนัดครั้งต่อไป เหตุการณ์เหล่านี้ส่งผลต่อการควบคุมโรคประจำตัวโดยตรง —
            การมีผู้ดูแลเคียงข้างจึงมีค่ามากกว่าแค่มีคนขับรถพาไป
          </p>
        </div>

        <div className="ahc-comparison-table-wrap ahc-reveal ahc-delay-1">
          <div className="ahc-table-header-grid">
            <div className="ahc-header-pill ahc-header-pill-danger">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>ความเสี่ยงเมื่อไปพบแพทย์คนเดียว</span>
            </div>
            <div className="ahc-header-pill ahc-header-pill-neutral">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 14 14"></polyline>
              </svg>
              <span>ผลกระทบที่อาจเกิดขึ้น</span>
            </div>
            <div className="ahc-header-pill ahc-header-pill-solution">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>ผู้ดูแล GO CARES ช่วยตรงไหน</span>
            </div>
          </div>

          {rows.map((row) => (
            <div className="ahc-table-row-grid" key={row.risk}>
              <div className="ahc-table-cell-risk">
                <div className="ahc-risk-icon-wrap">
                  <svg className="ahc-icon" viewBox="0 0 24 24">
                    {row.icon}
                  </svg>
                </div>
                <span>{row.risk}</span>
              </div>
              <div className="ahc-table-cell-impact">{row.impact}</div>
              <div className="ahc-table-cell-solution">
                <div className="ahc-solution-icon-wrap">
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>{row.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
