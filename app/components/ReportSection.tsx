import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function ReportSection({ content }: { content: SiteContent }) {
  return (
    <section className="ahc-report-section">
      <div className="ahc-container ahc-report-grid">
        <div className="ahc-phone-mockup-wrap ahc-reveal ahc-delay-1">
          <img
            src={content.images.reportMockup}
            alt="Aikchol GO CARES Mobile Service Report"
            className="ahc-phone-img"
          />
        </div>

        <div className="ahc-report-details ahc-reveal ahc-delay-2">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <span>ความสบายใจของลูกหลาน</span>
          </span>
          <h2 style={{ fontSize: '36px', color: 'var(--ahc-blue)', lineHeight: 1.25, marginBottom: '16px' }}>
            รู้ความคืบหน้าตลอดวัน<br />ผ่าน LINE Service Report
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--ahc-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            แม้คุณต้องทำงานหรือติดประชุม คุณจะไม่พลาดทุกช่วงเวลาสำคัญของผู้ใหญ่ที่คุณรัก ด้วยการรายงานสดผ่าน LINE
            และสรุปรายงานกิจกรรมฉบับสมบูรณ์หลังจบเคส
          </p>

          <div className="ahc-timeline-feed">
            <div className="ahc-feed-node">
              <div className="ahc-feed-time">08:00 น. — ถึงบ้านผู้รับบริการ</div>
              <div className="ahc-feed-title">Pick Up & วัดสัญญาณชีพ</div>
              <div className="ahc-feed-desc">วัดความดัน 126/82 มม.ปรอท ชีพจร 74 ปกติ พร้อมออกเดินทางด้วยรถ GO CARES</div>
            </div>

            <div className="ahc-feed-node">
              <div className="ahc-feed-time">08:35 น. — ถึงโรงพยาบาลเอกชล</div>
              <div className="ahc-feed-title">Arrival & ลงทะเบียน</div>
              <div className="ahc-feed-desc">เปิดสิทธิการรักษา รับบัตรคิวพบ นพ.สมชาย แผนกอายุรกรรม คิวที่ 14</div>
            </div>

            <div className="ahc-feed-node">
              <div className="ahc-feed-time">09:15 น. — เข้าห้องตรวจแพทย์</div>
              <div className="ahc-feed-title">Consultation & บันทึกคำสั่ง</div>
              <div className="ahc-feed-desc">
                คุณหมอสั่งปรับลดยาความดันตัวเดิมลง และนัดเจาะเลือดตรวจน้ำตาลสะสมอีก 3 เดือน
              </div>
            </div>

            <div className="ahc-feed-node">
              <div className="ahc-feed-time">10:00 น. — รับยาและส่งกลับบ้าน</div>
              <div className="ahc-feed-title">Medication & Send Back</div>
              <div className="ahc-feed-desc">
                รับยาเรียบร้อย ถ่ายรูปฉลากยา 3 ตัวส่งให้ในแชท และส่งคุณแม่ถึงบ้านปลอดภัยเวลา 11:30 น.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
