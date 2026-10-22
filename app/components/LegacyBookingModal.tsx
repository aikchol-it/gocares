import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function LegacyBookingModal({ content }: { content: SiteContent }) {
  const tel = `tel:${content.contact.hotlinePhone.replace(/\s+/g, '')}`;

  return (
    <div className="ahc-modal-backdrop" id="ahcBookingModal" role="dialog" aria-modal="true" aria-labelledby="ahcModalTitle">
      <div className="ahc-modal-card">
        <div className="ahc-modal-header">
          <div>
            <h3 id="ahcModalTitle" style={{ margin: 0, fontSize: '20px' }}>
              จองบริการ GO CARES by AIKCHOL NEXT
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--ahc-text-muted)', margin: '4px 0 0 0' }}>
              กรอกข้อมูลเพื่อให้เจ้าหน้าที่ติดต่อกลับเพื่อยืนยันนัดหมายและประเมินการเดินทาง (ไม่มีค่าใช้จ่ายล่วงหน้า)
            </p>
          </div>
          <button className="ahc-modal-close-btn" id="ahcModalClose" aria-label="ปิดหน้าต่าง">
            <svg className="ahc-icon" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form id="ahcBookingForm" className="ahc-modal-body">
          <input
            type="hidden"
            id="ahcSelectedPackage"
            defaultValue="แพ็กเกจผู้ดูแล + รถ (แนะนำ)"
          />

          <div className="ahc-form-group">
            <label className="ahc-form-label">เลือกแพ็กเกจที่ต้องการ:</label>
            <div className="ahc-package-select-grid">
              <div className="ahc-pkg-choice" data-pkg="pkg1">
                <div>มาตรฐาน</div>
                <div style={{ fontSize: '11px', color: 'var(--ahc-text-muted)' }}>เริ่ม 1,000 บ.</div>
              </div>
              <div className="ahc-pkg-choice selected" data-pkg="pkg2">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" style={{ color: 'var(--ahc-yellow)' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>ผู้ดูแล + รถ</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ahc-blue)', fontWeight: 700 }}>เริ่ม 1,300 บ.</div>
              </div>
              <div className="ahc-pkg-choice" data-pkg="pkg3">
                <div>ทำกิจกรรม</div>
                <div style={{ fontSize: '11px', color: 'var(--ahc-text-muted)' }}>เริ่ม 1,500 บ.</div>
              </div>
            </div>
          </div>

          <div className="ahc-form-section-header">
            <span className="ahc-form-section-badge">1</span>
            <span className="ahc-form-section-text">ข้อมูลผู้รับการดูแล (ผู้ป่วย)</span>
          </div>

          <div className="ahc-form-row-2col">
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcPatientName">
                ชื่อ-นามสกุล ผู้ป่วย / ผู้สูงอายุ: <span style={{ color: 'var(--ahc-danger-text)' }}>*</span>
              </label>
              <input
                type="text"
                id="ahcPatientName"
                className="ahc-form-input"
                placeholder="เช่น คุณแม่สมศรี ใจดี"
                required
              />
            </div>
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcPatientRelation">
                ความสัมพันธ์กับผู้ป่วย:
              </label>
              <select id="ahcPatientRelation" className="ahc-form-select">
                <option value="บุตร / ธิดา">บุตร / ธิดา</option>
                <option value="คู่สมรส">คู่สมรส</option>
                <option value="ญาติ / หลาน">ญาติ / หลาน</option>
                <option value="ผู้ดูแลประจำ">ผู้ดูแลประจำ</option>
                <option value="ตนเอง (ผู้ป่วยรับบริการเอง)">ตนเอง (ผู้ป่วยรับบริการเอง)</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
          </div>

          <div className="ahc-form-section-header" style={{ marginTop: '6px' }}>
            <span className="ahc-form-section-badge">2</span>
            <span className="ahc-form-section-text">ข้อมูลผู้ติดต่อ / ผู้ประสานงาน</span>
          </div>

          <div className="ahc-form-group">
            <label className="ahc-form-label" htmlFor="ahcContactName">
              ชื่อ-นามสกุล ผู้ติดต่อ / ผู้ประสานงาน: <span style={{ color: 'var(--ahc-danger-text)' }}>*</span>
            </label>
            <input
              type="text"
              id="ahcContactName"
              className="ahc-form-input"
              placeholder="เช่น คุณวิภา (ลูกสาว)"
              required
            />
          </div>

          <div className="ahc-form-row-2col">
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcContactPhone">
                เบอร์โทรศัพท์ติดต่อกลับ: <span style={{ color: 'var(--ahc-danger-text)' }}>*</span>
              </label>
              <input type="tel" id="ahcContactPhone" className="ahc-form-input" placeholder="08X-XXX-XXXX" required />
            </div>
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcContactLineId">
                LINE ID (สำหรับส่งรายงาน):{' '}
                <span style={{ color: 'var(--ahc-green)', fontSize: '11px' }}>(แนะนำ)</span>
              </label>
              <input
                type="text"
                id="ahcContactLineId"
                className="ahc-form-input"
                placeholder="เช่น wipha_care หรือ เบอร์โทร"
              />
            </div>
          </div>

          <div className="ahc-form-section-header" style={{ marginTop: '6px' }}>
            <span className="ahc-form-section-badge">3</span>
            <span className="ahc-form-section-text">สถานที่และโรงพยาบาลปลายทาง</span>
          </div>

          <div className="ahc-form-row-2col">
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcCustDistrict">
                อำเภอที่พักอาศัย (ในชลบุรี):
              </label>
              <select id="ahcCustDistrict" className="ahc-form-select" required>
                <option value="อำเภอเมืองชลบุรี">อำเภอเมืองชลบุรี</option>
                <option value="อำเภอพานทอง">อำเภอพานทอง</option>
                <option value="อำเภอบ้านบึง">อำเภอบ้านบึง</option>
                <option value="อำเภอพนัสนิคม">อำเภอพนัสนิคม</option>
                <option value="อำเภอศรีราชา">อำเภอศรีราชา</option>
                <option value="อำเภอบางละมุง">อำเภอบางละมุง (พัทยา)</option>
                <option value="อำเภอบ่อทอง">อำเภอบ่อทอง</option>
                <option value="อำเภอหนองใหญ่">อำเภอหนองใหญ่</option>
              </select>
            </div>

            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcCustHospital">
                โรงพยาบาลปลายทาง:
              </label>
              <select id="ahcCustHospital" className="ahc-form-select">
                <option value="โรงพยาบาลเอกชล (ถ.พระยาสัจจา)">โรงพยาบาลเอกชล (ถ.พระยาสัจจา)</option>
                <option value="โรงพยาบาลเอกชล อ่างศิลา (ถ.อ่างศิลา)">โรงพยาบาลเอกชล อ่างศิลา (ถ.อ่างศิลา)</option>
                <option value="โรงพยาบาลชลบุรี (รพ.รัฐ)">โรงพยาบาลชลบุรี (รพ.รัฐ)</option>
                <option value="โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา">โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา</option>
                <option value="โรงพยาบาลมหาวิทยาลัยบูรพา">โรงพยาบาลมหาวิทยาลัยบูรพา</option>
                <option value="โรงพยาบาลสมเด็จพระนางเจ้าสิริกิติ์">โรงพยาบาลสมเด็จพระนางเจ้าสิริกิติ์</option>
                <option value="อื่นๆ">อื่นๆ (ระบุชื่อโรงพยาบาล/คลินิก)</option>
              </select>
            </div>
          </div>

          <div
            className="ahc-form-group"
            id="ahcHospitalOtherGroup"
            style={{
              display: 'none',
              background: 'var(--ahc-blue-50, #f0f7ff)',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px dashed var(--ahc-blue)',
            }}
          >
            <label className="ahc-form-label" htmlFor="ahcCustHospitalOther" style={{ color: 'var(--ahc-blue)', fontWeight: 600 }}>
              ระบุชื่อโรงพยาบาลหรือสถานพยาบาลปลายทาง:{' '}
              <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--ahc-text-muted)' }}>
                (รองรับ TH / EN / Number)
              </span>
            </label>
            <input
              type="text"
              id="ahcCustHospitalOther"
              className="ahc-form-input"
              placeholder="เช่น รพ.กรุงเทพพัทยา, Samitivej Sriracha, ศูนย์ฟอกไต 2"
              maxLength={120}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="ahc-btn ahc-btn-primary" style={{ width: '100%' }}>
              <span>ยืนยันข้อมูลและส่งต่อทาง LINE ทันที</span>
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <p style={{ fontSize: '12px', color: 'var(--ahc-text-muted)', textAlign: 'center', marginTop: '8px' }}>
              หรือโทรสายด่วนโดยตรงได้ที่{' '}
              <a href={tel} style={{ color: 'var(--ahc-blue)', fontWeight: 700 }}>
                {content.contact.hotlinePhone}
              </a>{' '}
              ตลอดเวลาทำการ
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
