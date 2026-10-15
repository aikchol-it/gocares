'use client';

import React, { useState, useEffect } from 'react';
import { trackLeadFormSubmitted, trackBookingModalOpen } from '../lib/tracking';


interface BookingModalProps {
  isOpen: boolean;
  initialPkg?: string;
  onClose: () => void;
}

export default function BookingModal({ isOpen, initialPkg = 'pkg2', onClose }: BookingModalProps) {
  const [selectedPkg, setSelectedPkg] = useState(initialPkg);
  const [patientName, setPatientName] = useState('');
  const [patientRelation, setPatientRelation] = useState('บุตร / ธิดา');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactLineId, setContactLineId] = useState('');
  const [district, setDistrict] = useState('อำเภอเมืองชลบุรี');
  const [hospital, setHospital] = useState('โรงพยาบาลเอกชล (ถ.พระยาสัจจา)');
  const [hospitalOther, setHospitalOther] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialPkg) setSelectedPkg(initialPkg);
    if (isOpen) {
      trackBookingModalOpen(initialPkg || selectedPkg);
    }
  }, [initialPkg, isOpen]);

  if (!isOpen) return null;

  const pkgMap: Record<string, string> = {
    pkg1: 'แพ็กเกจ 1: มาตรฐาน 4 ชม. (เริ่ม 1,000 บ.)',
    pkg2: 'แพ็กเกจ 2: ผู้ดูแล + รถรับส่งถึงบ้าน (เริ่ม 1,300 บ.)',
    pkg3: 'แพ็กเกจ 3: บริการพาทำกิจกรรม 6 ชม. (เริ่ม 1,500 บ.)',
  };

  const handleHospitalOtherInput = (val: string) => {
    // Validation: Support TH / EN / Number / Punctuation
    const cleaned = val.replace(/[^a-zA-Z0-9ก-๙\s\.\(\)\/\-\,\_]/g, '');
    setHospitalOther(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalHospital = hospital === 'อื่นๆ' 
      ? (hospitalOther.trim() || 'โรงพยาบาลอื่นๆ (ไม่ระบุชื่อ)') 
      : hospital;

    const chosenPkgName = pkgMap[selectedPkg] || selectedPkg;

    // 1. Format Rich Message for LINE OA
    const messageLines = [
      'สวัสดีครับ/ค่ะ สนใจจองบริการ GO CARES by AIKCHOL NEXT',
      '---------------------------------------',
      `📦 แพ็กเกจที่เลือก: ${chosenPkgName}`,
      `👵 ข้อมูลผู้ป่วย: ${patientName}`,
      `🤝 ความสัมพันธ์: ${patientRelation}`,
      `👤 ผู้ติดต่อประสานงาน: ${contactName}`,
      `📞 เบอร์โทรศัพท์: ${contactPhone}`,
      `💬 LINE ID: ${contactLineId || 'ไม่ได้ระบุ'}`,
      `📍 อำเภอที่พัก: ${district}`,
      `🏥 โรงพยาบาลปลายทาง: ${finalHospital}`,
      '---------------------------------------',
      '(ส่งข้อมูลผ่านระบบ Next.js GO CARES by AIKCHOL NEXT)'
    ];

    const fullMessage = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(fullMessage);

    // 2. Clipboard fallback
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullMessage).catch(() => {});
    }

    // 3. Post lead to Next.js API (/api/booking)
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          patientRelation,
          contactName,
          contactPhone,
          contactLineId,
          district,
          hospital: finalHospital,
          isOtherHospital: hospital === 'อื่นๆ',
          package: chosenPkgName,
          submittedAt: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to post booking to API:', err);
    }

    // 4. Track Marketing Events (CR Item 4) — pushes to dataLayer + server /api/tracking
    trackLeadFormSubmitted({
      packageName: chosenPkgName,
      patientRelation,
      district,
      hospital: finalHospital,
      isOtherHospital: hospital === 'อื่นๆ',
      hasLineId: Boolean(contactLineId),
    });

    // 5. Open LINE OA Directly (CR2: @407eqbwl / lin.ee/RbECVC5)
    const LINE_OA_ID = '@407eqbwl';
    const LINE_OA_SHORT = 'https://lin.ee/RbECVC5';
    // Use line.me deep link with pre-filled message; fallback to short URL
    const lineUrl = `https://line.me/R/ti/p/~${LINE_OA_ID}?text=${encodedMessage}`;
    window.open(lineUrl, '_blank');

    setIsSubmitting(false);
    alert(`ขอบคุณครับ/ค่ะ ข้อมูลของคุณถูกส่งต่อไปยัง LINE Official (${LINE_OA_ID}) เรียบร้อยแล้ว!\n\nเจ้าหน้าที่จะติดต่อกลับที่เบอร์ ${contactPhone} หรือ LINE ID "${contactLineId || '-'}" โดยเร็วที่สุด\n(ระบบได้คัดลอกข้อความสรุปไว้ให้ท่านเรียบร้อยแล้ว)`);
    onClose();
  };

  return (
    <div className="ahc-modal-backdrop open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ahc-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="ahc-modal-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>จองบริการ GO CARES by AIKCHOL NEXT</h3>
            <p style={{ fontSize: '13px', color: '#e0f2fe', margin: '4px 0 0 0' }}>
              กรอกข้อมูลเพื่อประเมินการเดินทางและยืนยันนัดหมาย (ไม่มีค่าใช้จ่ายล่วงหน้า)
            </p>
          </div>
          <button type="button" className="ahc-modal-close-btn" onClick={onClose} aria-label="ปิดหน้าต่าง">
            <svg className="ahc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ahc-modal-body">
          {/* Package Choice Grid */}
          <div className="ahc-form-group">
            <label className="ahc-form-label">เลือกแพ็กเกจที่ต้องการ:</label>
            <div className="ahc-package-select-grid">
              <div
                className={`ahc-pkg-choice ${selectedPkg === 'pkg1' ? 'selected' : ''}`}
                onClick={() => setSelectedPkg('pkg1')}
              >
                <div>มาตรฐาน</div>
                <div style={{ fontSize: '11px', color: 'var(--ahc-text-muted)' }}>เริ่ม 1,000 บ.</div>
              </div>
              <div
                className={`ahc-pkg-choice ${selectedPkg === 'pkg2' ? 'selected' : ''}`}
                onClick={() => setSelectedPkg('pkg2')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="var(--ahc-yellow)" stroke="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>ผู้ดูแล + รถ</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ahc-blue)', fontWeight: 700 }}>เริ่ม 1,300 บ.</div>
              </div>
              <div
                className={`ahc-pkg-choice ${selectedPkg === 'pkg3' ? 'selected' : ''}`}
                onClick={() => setSelectedPkg('pkg3')}
              >
                <div>ทำกิจกรรม</div>
                <div style={{ fontSize: '11px', color: 'var(--ahc-text-muted)' }}>เริ่ม 1,500 บ.</div>
              </div>
            </div>
          </div>

          {/* Section 1: ข้อมูลผู้รับการดูแล (ผู้ป่วย) */}
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
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcPatientRelation">ความสัมพันธ์กับผู้ป่วย:</label>
              <select
                id="ahcPatientRelation"
                className="ahc-form-select"
                value={patientRelation}
                onChange={(e) => setPatientRelation(e.target.value)}
              >
                <option value="บุตร / ธิดา">บุตร / ธิดา</option>
                <option value="คู่สมรส">คู่สมรส</option>
                <option value="ญาติ / หลาน">ญาติ / หลาน</option>
                <option value="ผู้ดูแลประจำ">ผู้ดูแลประจำ</option>
                <option value="ตนเอง (ผู้ป่วยรับบริการเอง)">ตนเอง (ผู้ป่วยรับบริการเอง)</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
          </div>

          {/* Section 2: ข้อมูลผู้ติดต่อ / ผู้ประสานงาน */}
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
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>

          <div className="ahc-form-row-2col">
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcContactPhone">
                เบอร์โทรศัพท์ติดต่อกลับ: <span style={{ color: 'var(--ahc-danger-text)' }}>*</span>
              </label>
              <input
                type="tel"
                id="ahcContactPhone"
                className="ahc-form-input"
                placeholder="08X-XXX-XXXX"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcContactLineId">
                LINE ID (สำหรับส่งรายงาน): <span style={{ color: 'var(--ahc-green)', fontSize: '11px' }}>(แนะนำ)</span>
              </label>
              <input
                type="text"
                id="ahcContactLineId"
                className="ahc-form-input"
                placeholder="เช่น wipha_care หรือ เบอร์โทร"
                value={contactLineId}
                onChange={(e) => setContactLineId(e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: สถานที่และโรงพยาบาล */}
          <div className="ahc-form-section-header" style={{ marginTop: '6px' }}>
            <span className="ahc-form-section-badge">3</span>
            <span className="ahc-form-section-text">สถานที่และโรงพยาบาลปลายทาง</span>
          </div>

          <div className="ahc-form-row-2col">
            <div className="ahc-form-group">
              <label className="ahc-form-label" htmlFor="ahcCustDistrict">อำเภอที่พักอาศัย (ในชลบุรี):</label>
              <select
                id="ahcCustDistrict"
                className="ahc-form-select"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
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
              <label className="ahc-form-label" htmlFor="ahcCustHospital">โรงพยาบาลปลายทาง:</label>
              <select
                id="ahcCustHospital"
                className="ahc-form-select"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              >
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

          {/* Dynamic Field when 'อื่นๆ' is selected */}
          {hospital === 'อื่นๆ' && (
            <div
              className="ahc-form-group"
              style={{
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
                value={hospitalOther}
                onChange={(e) => handleHospitalOtherInput(e.target.value)}
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div style={{ marginTop: '10px' }}>
            <button
              type="submit"
              className="ahc-btn ahc-btn-primary"
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันข้อมูลและส่งต่อทาง LINE ทันที'}</span>
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <p style={{ fontSize: '12px', color: 'var(--ahc-text-muted)', textAlign: 'center', marginTop: '8px' }}>
              หรือโทรสายด่วนโดยตรงได้ที่{' '}
              <a href="tel:0639204765" style={{ color: 'var(--ahc-blue)', fontWeight: 700 }}>
                063 920 4765
              </a>{' '}
              ตลอดเวลาทำการ
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
