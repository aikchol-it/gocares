'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SiteContent } from '../lib/site-content-types';

type PkgKey = 'pkg1' | 'pkg2' | 'pkg3' | 'pkg4';

const PKG_KEYS: PkgKey[] = ['pkg1', 'pkg2', 'pkg3', 'pkg4'];

const DISTRICTS = [
  'อำเภอเมืองชลบุรี',
  'อำเภอพานทอง',
  'อำเภอบ้านบึง',
  'อำเภอพนัสนิคม',
  'อำเภอศรีราชา',
  'อำเภอบางละมุง (พัทยา)',
  'อำเภอบ่อทอง',
  'อำเภอหนองใหญ่',
];

const MAP_DISTRICTS = [
  {
    key: 'mueang',
    name: 'อำเภอเมืองชลบุรี',
    x: 31.08,
    y: 24.03,
    low: true,
    detail: 'ครอบคลุมใจกลางเมือง โรงพยาบาลเอกชล 1 และเอกชล 2 รถรับ-ส่งถึงบ้านอย่างรวดเร็วภายใน 15-20 นาที',
    distance: 'ฟรีระยะทาง 10 - 30 กม. ตามแพ็กเกจที่เลือก',
  },
  {
    key: 'phanthong',
    name: 'อำเภอพานทอง',
    x: 41.06,
    y: 13.26,
    below: true,
    detail: 'เชื่อมต่อนิคมอมตะนครและพื้นที่อยู่อาศัย เดินทางสู่โรงพยาบาลเอกชลสะดวกผ่านทางด่วนและมอเตอร์เวย์',
    distance: 'ระยะทางเฉลี่ย 18 - 25 กม. อยู่ในโควตาแพ็กเกจผู้ดูแล+รถ',
  },
  {
    key: 'phanat',
    name: 'อำเภอพนัสนิคม',
    x: 54.49,
    y: 9.53,
    below: true,
    detail: 'มีผู้สูงอายุพักอาศัยหนาแน่น เหมาะสำหรับนัดหมายโรคประจำตัว ฟอกไต และตรวจสุขภาพประจำปี',
    distance: 'ระยะทางเฉลี่ย 25 - 32 กม.',
  },
  {
    key: 'banbueng',
    name: 'อำเภอบ้านบึง',
    x: 47.97,
    y: 26.93,
    low: true,
    detail: 'บริการครอบคลุมทั้งเขตเทศบาลบ้านบึงและชุมชนโดยรอบ เดินทางสู่ รพ.เอกชล ประมาณ 25-30 นาที',
    distance: 'ระยะทางเฉลี่ย 15 - 22 กม. ฟรีค่าเดินทางในแพ็กเกจผู้ดูแล+รถ',
  },
  {
    key: 'bothong',
    name: 'อำเภอบ่อทอง',
    x: 77.13,
    y: 27.75,
    low: true,
    detail: 'บริการนัดหมายล่วงหน้า รถรับส่งปลอดภัย ผู้ดูแลเตรียมความพร้อมก่อนออกเดินทาง',
    distance: 'ระยะทางประมาณ 45 - 55 กม. มีการประเมินส่วนต่างระยะทางล่วงหน้าอย่างโปร่งใส',
  },
  {
    key: 'sriracha',
    name: 'อำเภอศรีราชา',
    x: 34.15,
    y: 39.35,
    detail: 'ครอบคลุมทั้งตัวเมืองศรีราชา บางพระ อ่าวอุดม เดินทางสะดวก ปลอดภัยด้วยรถมาตรฐาน',
    distance: 'ระยะทางเฉลี่ย 20 - 28 กม. อยู่ในโควตาแพ็กเกจผู้ดูแล+รถ',
  },
  {
    key: 'nongyai',
    name: 'อำเภอหนองใหญ่',
    x: 59.86,
    y: 45.98,
    detail: 'บริการนัดหมายพิเศษสำหรับผู้ป่วยเคมีบำบัดและพบแพทย์เฉพาะทาง',
    distance: 'ระยะทางประมาณ 40 - 50 กม.',
  },
  {
    key: 'banglamung',
    name: 'อำเภอบางละมุง (พัทยา)',
    x: 32.62,
    y: 59.24,
    detail: 'ครอบคลุมพัทยา นาเกลือ และบางละมุง บริการพาพบแพทย์ทั้ง รพ.เอกชล และสถานพยาบาลชั้นนำ',
    distance: 'ระยะทางประมาณ 40 - 50 กม. นัดหมายล่วงหน้าเพื่อจัดคิวรถเฉพาะ',
  },
];

const HOSPITALS = [
  'โรงพยาบาลเอกชล (ถ.พระยาสัจจา)',
  'โรงพยาบาลเอกชล อ่างศิลา (ถ.อ่างศิลา)',
  'โรงพยาบาลชลบุรี (รพ.รัฐ)',
  'โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา',
  'โรงพยาบาลมหาวิทยาลัยบูรพา',
  'โรงพยาบาลสมเด็จพระนางเจ้าสิริกิติ์',
  'อื่นๆ',
];

const PILLARS = [
  {
    num: 'I',
    title: 'ผู้ดูแลที่ผ่านมาตรฐานโรงพยาบาล',
    desc: 'คัดกรองประวัติอย่างเข้มงวด ผ่านการอบรมการดูแลผู้สูงอายุ การปฐมพยาบาล และการเคลื่อนย้ายผู้ป่วยตามมาตรฐานโรงพยาบาลเอกชล',
  },
  {
    num: 'II',
    title: 'รถรับ-ส่งเฉพาะ ไม่มีผู้โดยสารร่วม',
    desc: 'รถตู้ GO CARES สะอาด แอร์เย็น รองรับรถเข็น พร้อมผู้ดูแลช่วยพยุงขึ้น-ลงอย่างถูกวิธีในทุกเที่ยว',
  },
  {
    num: 'III',
    title: 'รายงานตรงถึงครอบครัว ผ่าน LINE',
    desc: 'อัปเดตทุกขั้นตอนระหว่างวัน พร้อม Service Report สรุปผลตรวจ รายการยา และรูปถ่ายฉลากยาหลังจบเคส',
  },
];

const FEATURES: Record<PkgKey, string[]> = {
  pkg1: [
    '3 ชั่วโมง สำหรับนัดใกล้บ้าน',
    'ฟรีค่าเดินทาง 10 กม.',
    'อยู่ด้วยตลอดการตรวจ',
    'รายงานครอบครัวผ่าน LINE',
  ],
  pkg2: [
    '5 ชั่วโมง สำหรับนัดครึ่งวัน',
    'ฟรีค่าเดินทาง 10 กม.',
    'ผู้ดูแล 1:1 ตลอดการเดินทาง',
    'รายงานสรุปหลังจบเคส',
  ],
  pkg3: [
    '5 ชั่วโมง สำหรับนัดครึ่งวัน',
    'รวมค่าเดินทาง 30 กม.',
    'ผู้ดูแล 1:1 ตลอดการเดินทาง',
    'รายงานสรุปหลังจบเคส',
  ],
  pkg4: [
    '8 ชั่วโมง สำหรับธุระทั้งวัน',
    'พาไปธนาคาร ราชการ หรือซื้อของ',
    'ฟรี 10 กม. แรก เกิน 12 บาท/กม.',
    'ไปได้ทุกที่ในจังหวัดชลบุรี',
  ],
};

const RISKS = [
  {
    risk: 'ลื่นล้มระหว่างทาง หรือในโรงพยาบาล',
    impact:
      'การล้มคือสาเหตุการบาดเจ็บอันดับต้นของผู้สูงอายุ พื้นโรงพยาบาลที่ลื่นยิ่งเพิ่มความเสี่ยง',
    fix: 'ผู้ดูแลพยุงและเดินเคียงข้างตลอด รวมถึงช่วยขึ้น-ลงรถและใช้ลิฟต์อย่างถูกวิธี',
  },
  {
    risk: 'จำคำสั่งแพทย์ได้ไม่ครบ',
    impact:
      'ในห้องตรวจมีข้อมูลจำนวนมากในเวลาสั้น ผู้สูงอายุอาจเข้าใจคลาดเคลื่อนหรือลืมสิ่งที่แพทย์กำชับ',
    fix: 'ผู้ดูแลเข้าห้องตรวจด้วย จดทุกคำแนะนำ ถามซ้ำจุดที่ไม่ชัด และส่งให้ครอบครัวอ่านทันที',
  },
  {
    risk: 'กินยาผิดหลังกลับบ้าน',
    impact:
      'แพทย์ปรับยาใหม่แล้วยังกินยาเดิมซ้ำซ้อน เป็นความผิดพลาดที่พบบ่อยที่สุดหลังกลับบ้าน',
    fix: 'ผู้ดูแลทวนวิธีใช้ยากับเภสัชกร ถ่ายรูปฉลากยา และระบุชัดเจนว่าตัวไหนหยุด ตัวไหนเริ่มใหม่',
  },
];

const TIMELINE = [
  { time: '08:00', title: 'รับที่บ้าน', desc: 'ผู้ดูแลถึงบ้านตรงเวลา ตรวจความดันและชีพจรก่อนออกเดินทาง' },
  { time: '08:30', title: 'ถึงโรงพยาบาล', desc: 'อำนวยความสะดวกเปิดสิทธิ รับบัตรคิว และพาไปยังจุดตรวจ' },
  { time: '09:15', title: 'เข้าห้องตรวจ', desc: 'อยู่ข้าง ๆ ร่วมฟัง และจดคำแนะนำของแพทย์อย่างละเอียด' },
  { time: '10:30', title: 'รับยา', desc: 'ทวนวิธีใช้กับเภสัชกร ถ่ายรูปฉลากยา และแจ้งยาที่หยุดหรือเริ่มใหม่' },
  { time: '11:30', title: 'ส่งกลับบ้าน', desc: 'ดูแลจนเข้าบ้านเรียบร้อย พร้อมส่ง Service Report ให้ครอบครัว' },
];

const CHECKLIST = [
  'บัตรประชาชน และบัตรโรงพยาบาล',
  'ใบนัด หรือข้อมูลนัดหมาย',
  'ยาที่ใช้อยู่ทั้งหมด (สำคัญที่สุด)',
  'สิทธิการรักษาที่ใช้',
  'เบอร์ติดต่อฉุกเฉินของญาติ',
];

const FAQS = [
  {
    q: 'ผู้ดูแลของ GO CARES เป็นใคร',
    a: 'ผู้ดูแลทุกคนผ่านการคัดกรองประวัติอย่างเข้มงวด และผ่านหลักสูตรการดูแลผู้สูงอายุ การพยาบาลเบื้องต้น การปฐมพยาบาล CPR และการเคลื่อนย้ายผู้ป่วยตามมาตรฐานของโรงพยาบาลเอกชล',
  },
  {
    q: 'ต้องจองล่วงหน้านานเท่าไร',
    a: 'แนะนำให้จองล่วงหน้า 1-2 วัน เพื่อจัดเตรียมผู้ดูแลและรอบรถที่เหมาะสม สำหรับผู้ป่วยที่นัดประจำ เช่น ฟอกไต หรือเคมีบำบัด สามารถจองเป็นแพ็กเกจรายสัปดาห์หรือรายเดือนได้',
  },
  {
    q: 'ไปโรงพยาบาลอื่นได้หรือไม่',
    a: 'ได้ ทั้งโรงพยาบาลรัฐ เอกชน และคลินิกเฉพาะทางในจังหวัดชลบุรี ทีมงานจะประเมินเวลาและระยะทางล่วงหน้าอย่างโปร่งใสก่อนยืนยัน',
  },
  {
    q: 'หากใช้เวลาเกินแพ็กเกจ',
    a: 'คิดเพิ่มชั่วโมงละ 150 บาท ทีมงานแจ้งก่อนคิดทุกครั้ง ไม่มีบวกทีหลังโดยไม่แจ้ง',
  },
  {
    q: 'ครอบครัวจะติดตามความคืบหน้าได้อย่างไร',
    a: 'ผู้ดูแลอัปเดตสถานะผ่านกลุ่ม LINE ครอบครัว เช่น ถึงบ้านแล้ว ผลวัดความดัน คิวพบแพทย์ ฉลากยาใหม่ และเวลาเดินทางกลับ พร้อมรายงานสรุปหลังจบเคส',
  },
];

const STEP_SHORT: Record<string, string> = {
  book: 'นัดหมาย',
  mobility: 'รับที่บ้าน',
  hospital: 'ถึงโรงพยาบาล',
  consultation: 'เข้าห้องตรวจ',
  report: 'ส่งกลับบ้าน',
};

const NAV_LINKS = [
  { href: '#pricing', label: 'ค่าบริการ' },
  { href: '#standard', label: 'มาตรฐานการดูแล' },
  { href: '#journey', label: 'หนึ่งวันกับเรา' },
  { href: '#news', label: 'กิจกรรมและข่าวสาร' },
  { href: '#coverage', label: 'พื้นที่ให้บริการ' },
  { href: '#faq', label: 'คำถาม' },
];

// ตัวอย่างเนื้อหา รอลูกค้ายืนยันหัวข้อ รูป และวันที่จริงก่อนเผยแพร่
const NEWS = [
  {
    tag: 'อบรมทีม',
    date: 'กันยายน 2569',
    title: 'อบรมผู้ดูแลประจำไตรมาส 3',
    desc: 'ทบทวนการเคลื่อนย้ายผู้ป่วย การปฐมพยาบาล และการรายงานผลให้ครอบครัว ตามมาตรฐานโรงพยาบาลเอกชล',
    image: 'assets/step_4_doctor_consult.webp',
  },
  {
    tag: 'พื้นที่ให้บริการ',
    date: 'สิงหาคม 2569',
    title: 'ขยายพื้นที่ให้บริการครบ 8 อำเภอชลบุรี',
    desc: 'เพิ่มทีมผู้ดูแลในอำเภอบ่อทองและหนองใหญ่ พร้อมประเมินเส้นทางและแจ้งราคาก่อนยืนยันทุกครั้ง',
    image: 'assets/step_2_pickup_home.webp',
  },
  {
    tag: 'กิจกรรมชุมชน',
    date: 'กรกฎาคม 2569',
    title: 'ให้คำปรึกษาผู้สูงอายุในชุมชน',
    desc: 'ทีมงานออกบูธให้คำแนะนำการเตรียมตัวก่อนไปโรงพยาบาล และวิธีสังเกตอาการที่ควรพบแพทย์',
    image: 'assets/step_3_arrival_aikchol.webp',
  },
];

const img = (src: string) => '/' + src.replace(/^\/+/, '');

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function V2Home({ content }: { content: SiteContent }) {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [drawer, setDrawer] = useState<{ open: boolean; pkg: PkgKey }>({
    open: false,
    pkg: 'pkg2',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [priceIdx, setPriceIdx] = useState(0);
  const priceRef = useRef<HTMLDivElement>(null);
  const [hospital, setHospital] = useState(HOSPITALS[0]);
  const [district, setDistrict] = useState(MAP_DISTRICTS[0].key);
  const activeSpot = MAP_DISTRICTS.find((d) => d.key === district) || MAP_DISTRICTS[0];

  const tel = `tel:${content.contact.hotlinePhone.replace(/\s+/g, '')}`;
  const lineUrl = content.contact.lineOaUrl;
  const moments = content.moments;
  const moment = moments[step] || moments[0];
  const heroPhoto = content.personas[1]?.image || content.images.heroPoster;
  const heroInset = moments[2]?.image || content.images.reportMockup;
  const finalPhoto = moments[1]?.image || content.images.heroPoster;
  const headlineTail = 'ไปหาหมอ';
  const headlineBreak = content.hero.headline.endsWith(headlineTail);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.v2 [data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!drawer.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawer((d) => ({ ...d, open: false }));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawer.open]);

  const openBooking = (pkg: PkgKey = 'pkg2') => {
    setStatus('idle');
    setDrawer({ open: true, pkg });
  };
  const closeBooking = () => setDrawer((d) => ({ ...d, open: false }));

  const goPrice = (index: number) => {
    const wrap = priceRef.current;
    const card = wrap?.querySelectorAll<HTMLElement>('[data-pkg]')[index];
    if (!wrap || !card) return;
    wrap.scrollTo({
      left:
        wrap.scrollLeft +
        card.getBoundingClientRect().left -
        wrap.getBoundingClientRect().left -
        parseFloat(getComputedStyle(wrap).paddingLeft || '0'),
      behavior: 'smooth',
    });
  };

  const onPriceScroll = () => {
    const wrap = priceRef.current;
    if (!wrap) return;
    const anchor = wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft || '0');
    let idx = 0;
    let best = Infinity;
    wrap.querySelectorAll<HTMLElement>('[data-pkg]').forEach((card, i) => {
      const distance = Math.abs(card.getBoundingClientRect().left - anchor);
      if (distance < best) {
        best = distance;
        idx = i;
      }
    });
    setPriceIdx(idx);
  };

  async function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const isOther = hospital === 'อื่นๆ';
    const payload = {
      patientName: data.get('patientName'),
      patientRelation: data.get('patientRelation'),
      contactName: data.get('contactName'),
      contactPhone: data.get('contactPhone'),
      contactLineId: data.get('contactLineId') || undefined,
      district: data.get('district'),
      hospital: isOther ? data.get('otherHospital') : hospital,
      isOtherHospital: isOther,
      package: `${content.packages[drawer.pkg].name} · ${content.packages[drawer.pkg].hours} ชั่วโมง`,
      submittedAt: new Date().toISOString(),
    };
    setStatus('sending');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('done');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="v2">
      <header className={`v2-nav${navSolid ? ' is-solid' : ''}`}>
        <div className="v2-container v2-nav-inner">
          <a className="v2-brand" href="#top" aria-label="GO CARES by AIKCHOL NEXT">
            <img src={img(content.images.logo)} alt="" width={42} height={42} />
            <span className="v2-brand-text">
              <strong>GO CARES</strong>
              <span>โดยโรงพยาบาลเอกชล</span>
            </span>
          </a>
          <nav className="v2-nav-links" aria-label="เมนูหลัก">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="v2-nav-actions">
            <a className="v2-nav-phone" href={tel}>
              {content.contact.hotlinePhone}
            </a>
            <button className="v2-btn v2-btn--gold v2-btn--sm" type="button" onClick={() => openBooking('pkg2')}>
              จองผู้ดูแล
            </button>
            <button
              className="v2-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-expanded={menuOpen}
              aria-controls="v2-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
                  <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                  <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="v2-mobile-menu" id="v2-mobile-menu" aria-label="เมนูมือถือ">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="v2-hero" id="top">
        <div className="v2-hero-glow" aria-hidden="true" />
        <div className="v2-container v2-hero-grid">
          <div className="v2-hero-copy">
            <p className="v2-eyebrow v2-eyebrow--light">GO CARES · โรงพยาบาลเอกชล</p>
            <h1 className="v2-hero-title">
              {headlineBreak ? (
                <>
                  {content.hero.headline.slice(0, -headlineTail.length)}
                  <br className="v2-hero-br" />
                  {headlineTail}
                </>
              ) : (
                content.hero.headline
              )}
              <em>{content.hero.headlineAccent}</em>
            </h1>
            <p className="v2-hero-lead">
              ผู้ดูแลมารับท่านถึงบ้าน อยู่ข้าง ๆ ทุกขั้นตอนในโรงพยาบาล
              และส่งรายงานให้ครอบครัวผ่าน LINE คุณจึงทำงานได้เต็มวันโดยไม่ต้องลางาน
            </p>
            <div className="v2-hero-actions">
              <button className="v2-btn v2-btn--gold" type="button" onClick={() => openBooking('pkg2')}>
                จองผู้ดูแล
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                  <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a className="v2-btn v2-btn--ghost" href={lineUrl} target="_blank" rel="noopener">
                LINE ปรึกษา
              </a>
            </div>
            <div className="v2-hero-meta">
              <span>
                <CheckIcon /> เริ่ม 3 ชั่วโมง {content.packages.pkg1.price} บาท
              </span>
              <span>
                <CheckIcon /> ยืนยันราคาก่อนทุกครั้ง
              </span>
            </div>
          </div>

          <div className="v2-hero-visual">
            <div className="v2-arch-outline" aria-hidden="true" />
            <figure className="v2-arch">
              <img
                src={img(heroPhoto)}
                alt="ผู้ดูแล GO CARES วัดความดันให้ผู้สูงอายุที่บ้าน"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
            <figure className="v2-hero-inset">
              <img
                src={img(heroInset)}
                alt="ผู้ดูแลพาผู้สูงอายุเข้าพบแพทย์ที่โรงพยาบาลเอกชล"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="v2-line-card">
              <span className="v2-line-dot" />
              <div>
                <strong>LINE Report</strong>
                <span>แจ้งครอบครัวทุกขั้นตอน</span>
              </div>
            </div>
            <div className="v2-seal" aria-hidden="true">
              <span>CHONBURI</span>
              <strong>AHC</strong>
              <span>HOSPITAL CARE</span>
            </div>
          </div>
        </div>

        <div className="v2-container">
          <ul className="v2-trust">
            <li>ก่อตั้งโดยโรงพยาบาลเอกชล</li>
            <li>ผู้ดูแลผ่านการฝึกอบรม</li>
            <li>LINE Report ทุกขั้นตอน</li>
            <li>ครอบคลุม 8 อำเภอชลบุรี</li>
          </ul>
        </div>
      </section>

      <section className="v2-section v2-pricing" id="pricing">
        <div className="v2-container">
          <div className="v2-section-head" data-reveal>
            <p className="v2-eyebrow">TRANSPARENT PRICING</p>
            <h2 className="v2-section-title">
              ราคาตามตาราง
              <br />
              <span className="v2-underline">ไม่มีบวกเพิ่มทีหลัง</span>
            </h2>
            <p className="v2-section-lead">
              ราคาขึ้นกับเวลาที่ใช้และระยะทางจากบ้านถึงโรงพยาบาล
              ถ้าเกินเวลา 150 บาท/ชม. เกินระยะ 12 บาท/กม. ทีมงานแจ้งก่อนคิดทุกครั้ง
            </p>
          </div>

          <div className="v2-price-grid" ref={priceRef} onScroll={onPriceScroll}>
            {PKG_KEYS.map((key, i) => {
              const pkg = content.packages[key];
              const featured = key === 'pkg2';
              return (
                <article
                  key={key}
                  data-pkg={key}
                  className={`v2-price-card${featured ? ' v2-price-card--featured' : ''}`}
                  data-reveal
                  style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                >
                  {featured && <span className="v2-crown">แนะนำ · ยอดนิยม</span>}
                  <div className="v2-price-head">
                    <h3>{pkg.name}</h3>
                    <p>{pkg.sub}</p>
                  </div>
                  <div className="v2-price-amount">
                    <strong>{pkg.price}</strong>
                    <span>บาท / {pkg.hours} ชั่วโมง · {pkg.distance}</span>
                  </div>
                  <ul className="v2-price-feats">
                    {FEATURES[key].map((feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`v2-btn ${featured ? 'v2-btn--gold' : 'v2-btn--outline'}`}
                    onClick={() => openBooking(key)}
                  >
                    จองแพ็กเกจนี้
                  </button>
                </article>
              );
            })}
          </div>
          <div className="v2-price-dots" role="group" aria-label="เลือกดูแพ็กเกจ">
            {PKG_KEYS.map((key, i) => (
              <button
                key={key}
                type="button"
                className={priceIdx === i ? 'is-active' : undefined}
                aria-label={`ดูแพ็กเกจ ${content.packages[key].name}`}
                aria-pressed={priceIdx === i}
                onClick={() => goPrice(i)}
              />
            ))}
          </div>
          <p className="v2-pricing-note">
            ราคาโปรโมชั่นถึง 31 มกราคม 2570 · ไม่รวมค่ารักษาพยาบาล ค่ายา ค่าอาหาร และค่าที่จอดรถ ·
            พารถไปธุระได้ทุกที่ในจังหวัดชลบุรี
          </p>
        </div>
      </section>

      <section className="v2-section v2-standard" id="standard">
        <div className="v2-container v2-standard-grid">
          <div className="v2-standard-intro" data-reveal>
            <p className="v2-eyebrow">THE GO CARES STANDARD</p>
            <h2 className="v2-section-title">
              ความอุ่นใจ
              <br />
              ถูกออกแบบไว้<span className="v2-underline">ทุกขั้นตอน</span>
            </h2>
            <p className="v2-section-lead">
              GO CARES เป็นบริการของโรงพยาบาลเอกชลโดยตรง ผู้ดูแลจะอยู่กับท่าน
              ตั้งแต่หน้าบ้าน ระหว่างตรวจ ไปจนถึงส่งกลับเข้าบ้าน
            </p>
            <blockquote className="v2-quote">
              “เราพาคนที่คุณรักไปโรงพยาบาล ในฐานะตัวแทนของคุณ”
            </blockquote>
          </div>
          <ol className="v2-pillars">
            {PILLARS.map((pillar, i) => (
              <li
                className="v2-pillar"
                key={pillar.num}
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="v2-pillar-num">{pillar.num}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v2-journey" id="journey">
        <div className="v2-container">
          <div className="v2-section-head" data-reveal>
            <p className="v2-eyebrow v2-eyebrow--light">A DAY WITH GO CARES</p>
            <h2 className="v2-section-title v2-section-title--light">
              หนึ่งวันของท่าน
              <br />
              <span className="v2-cyan">ในมือของเรา</span>
            </h2>
            <p className="v2-section-lead v2-section-lead--light">
              ทุกขั้นตอนถูกวางแผนไว้ล่วงหน้า และแจ้งให้ครอบครัวรู้ระหว่างวัน
            </p>
          </div>

          <div className="v2-journey-grid">
            <div className="v2-journey-list" role="tablist" aria-label="ขั้นตอนการดูแล">
              {moments.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  id={`v2-journey-tab-${m.id}`}
                  aria-controls="v2-journey-panel"
                  aria-selected={i === step}
                  className={`v2-journey-btn${i === step ? ' is-active' : ''}`}
                  onClick={() => setStep(i)}
                >
                  <span className="v2-journey-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="v2-journey-label">
                    <strong>{m.tag.replace(/^Step\s*\d+\s*:\s*/i, '')}</strong>
                    <span>{m.title}</span>
                  </span>
                  <span className="v2-journey-short">{STEP_SHORT[m.id] || m.title}</span>
                </button>
              ))}
            </div>

            {moment && (
              <div
                className="v2-journey-panel"
                data-reveal
                role="tabpanel"
                id="v2-journey-panel"
                aria-labelledby={`v2-journey-tab-${moment.id}`}
              >
                <div className="v2-journey-media">
                  <img src={img(moment.image)} alt={moment.title} loading="lazy" decoding="async" />
                  <span className="v2-journey-tag">{moment.tag}</span>
                </div>
                <div className="v2-journey-body">
                  <h3>{moment.title}</h3>
                  <p>{moment.desc}</p>
                  <ul>
                    <li>
                      <CheckIcon />
                      {moment.bullet1}
                    </li>
                    <li>
                      <CheckIcon />
                      {moment.bullet2}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="v2-section v2-news" id="news">
        <div className="v2-container">
          <div className="v2-section-head" data-reveal>
            <p className="v2-eyebrow">ACTIVITIES &amp; NEWS</p>
            <h2 className="v2-section-title">
              กิจกรรมและข่าวสาร
              <br />
              <span className="v2-underline">จากทีม GO CARES</span>
            </h2>
            <p className="v2-section-lead">
              ติดตามการอบรมทีมผู้ดูแล พื้นที่ให้บริการใหม่ และกิจกรรมในชุมชนชลบุรี
            </p>
          </div>
          <div className="v2-news-grid">
            {NEWS.map((item, i) => (
              <article
                key={item.title}
                className="v2-news-card"
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
              >
                <figure>
                  <img src={img(item.image)} alt="" loading="lazy" decoding="async" />
                </figure>
                <div className="v2-news-body">
                  <span className="v2-news-meta">
                    {item.tag} · {item.date}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-video" id="video">
        <div className="v2-container">
          <div className="v2-section-head" data-reveal>
            <p className="v2-eyebrow">VDO PRESENTATION • 1:47 นาที</p>
            <h2 className="v2-section-title">
              เส้นทางการดูแลทั้งหมด
              <br />
              <span className="v2-underline">ใน 1:47 นาที</span>
            </h2>
          </div>
          <figure className="v2-video-frame" data-reveal>
            <video controls playsInline preload="none" poster={img(content.images.videoPoster)}>
              <source src="/assets/ahc_next03_web_720p.mp4" media="(max-width: 768px)" type="video/mp4" />
              <source src="/assets/ahc_next03_web_1080p.mp4" type="video/mp4" />
              เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
            </video>
          </figure>
        </div>
      </section>

      <section className="v2-section v2-risks" id="why">
        <div className="v2-container">
          <div className="v2-section-head" data-reveal>
            <p className="v2-eyebrow">WHY WE STAY</p>
            <h2 className="v2-section-title">
              ทำไมเราไม่ปล่อยให้ท่าน
              <br />
              ไปโรงพยาบาล<span className="v2-underline">คนเดียว</span>
            </h2>
            <p className="v2-section-lead">
              ความเสี่ยงส่วนใหญ่ไม่ได้อยู่ที่การรักษา แต่อยู่ที่การเดินทางและรายละเอียดระหว่างวัน
            </p>
          </div>
          <div className="v2-risk-grid">
            {RISKS.map((item, i) => (
              <article
                key={item.risk}
                className="v2-risk"
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="v2-risk-idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.risk}</h3>
                <p className="v2-risk-impact">{item.impact}</p>
                <div className="v2-risk-fix">
                  <span>GO CARES</span>
                  <p>{item.fix}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-report" id="report">
        <div className="v2-container v2-report-grid">
          <div className="v2-report-media" data-reveal>
            <div className="v2-report-frame">
              <img
                src={img(content.images.reportMockup)}
                alt="ตัวอย่าง Service Report ที่ส่งให้ครอบครัวผ่าน LINE"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="v2-report-badge">
              <span className="v2-line-dot" /> ส่งถึงมือครอบครัว ผ่าน LINE
            </span>
          </div>
          <div className="v2-report-copy" data-reveal>
            <p className="v2-eyebrow">FAMILY TRANSPARENCY</p>
            <h2 className="v2-section-title">
              ทุกความคืบหน้า
              <br />
              <span className="v2-underline">ส่งถึงมือครอบครัว</span>
            </h2>
            <p className="v2-section-lead">
              ครอบครัวที่ติดงานหรืออยู่ต่างจังหวัด เห็นทุกความคืบหน้าเหมือนนั่งอยู่ข้าง ๆ
            </p>
            <ol className="v2-timeline">
              {TIMELINE.map((item) => (
                <li key={item.time}>
                  <span className="v2-timeline-time">{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="v2-section v2-coverage" id="coverage">
        <div className="v2-container">
          <div className="v2-section-head" data-reveal>
            <p className="v2-eyebrow">SERVICE AREA</p>
            <h2 className="v2-section-title">
              ครอบคลุมทั้งชลบุรี
              <br />
              <span className="v2-underline">8 อำเภอ</span>
            </h2>
          </div>
          <div className="v2-cover-grid">
            <figure className="v2-map" data-reveal>
              <img
                src={img(content.images.mapImage)}
                alt="แผนที่พื้นที่ให้บริการ GO CARES จังหวัดชลบุรี"
                loading="lazy"
                decoding="async"
              />
              <span className="v2-map-glow" style={{ left: `${activeSpot.x}%`, top: `${activeSpot.y}%` }} />
              {MAP_DISTRICTS.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  className={`v2-map-hotspot${district === d.key ? ' is-active' : ''}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  aria-label={d.name}
                  aria-pressed={district === d.key}
                  onClick={() => setDistrict(d.key)}
                />
              ))}
              <span
                className={`v2-map-pin${activeSpot.below ? ' is-below' : ''}${activeSpot.low ? ' is-low' : ''}`}
                style={{ left: `${activeSpot.x}%`, top: `max(${activeSpot.y}%, 52px)` }}
                aria-hidden="true"
              >
                <span className="v2-map-ring" />
                <span className="v2-map-marker">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <span className="v2-map-badge">
                  <strong>{activeSpot.name}</strong>
                  <span>
                    <i />พื้นที่ให้บริการ GO CARES
                  </span>
                </span>
              </span>
            </figure>
            <div className="v2-cover-side" data-reveal>
              <div className="v2-districts">
                {MAP_DISTRICTS.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    className={district === d.key ? 'is-active' : undefined}
                    aria-pressed={district === d.key}
                    onClick={() => setDistrict(d.key)}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
              <div className="v2-district-info" aria-live="polite">
                <strong>{activeSpot.name}</strong>
                <p>{activeSpot.detail}</p>
                <span className="v2-district-distance">
                  <CheckIcon />
                  {activeSpot.distance}
                </span>
              </div>
              <div className="v2-prep">
                <h3>เตรียม 5 อย่างก่อนเดินทาง</h3>
                <ol>
                  {CHECKLIST.map((item, i) => (
                    <li key={item}>
                      <span>{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
                <p className="v2-prep-note">
                  ยาที่ใช้อยู่ทั้งหมดสำคัญที่สุด เพราะแพทย์ต้องเห็นก่อนสั่งยาใหม่
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-section v2-faq" id="faq">
        <div className="v2-container v2-faq-grid">
          <div data-reveal>
            <p className="v2-eyebrow">QUESTIONS</p>
            <h2 className="v2-section-title">
              ยังมีคำถาม
              <br />
              <span className="v2-underline">เราพร้อมตอบ</span>
            </h2>
            <p className="v2-section-lead">หรือโทรหาทีมงานได้โดยตรงทุกวัน</p>
            <a className="v2-phone-link" href={tel}>
              {content.contact.hotlinePhone}
            </a>
          </div>
          <div className="v2-faq-list" data-reveal>
            {FAQS.map((faq, i) => (
              <div key={faq.q} className={`v2-faq-item${openFaq === i ? ' is-open' : ''}`}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{faq.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="v2-faq-a">
                  <div>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-final">
        <img src={img(finalPhoto)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="v2-container">
          <div className="v2-final-inner" data-reveal>
            <p className="v2-eyebrow v2-eyebrow--light">READY WHEN YOU ARE</p>
            <h2>
              พรุ่งนี้มีนัดหมอ
              <br />
              <em>ให้เราพาไปนะครับ</em>
            </h2>
            <p>
              จองวันนี้ ทีมงานติดต่อกลับเพื่อวางแผนการเดินทาง
              และประเมินราคาให้ทราบก่อนยืนยันทุกครั้ง
            </p>
            <div className="v2-final-actions">
              <button className="v2-btn v2-btn--gold" type="button" onClick={() => openBooking('pkg2')}>
                จองผู้ดูแล
              </button>
              <a className="v2-btn v2-btn--ghost" href={tel}>
                โทร {content.contact.hotlinePhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="v2-footer">
        <div className="v2-container v2-footer-grid">
          <div className="v2-footer-brand">
            <a className="v2-brand" href="#top">
              <img src={img(content.images.logo)} alt="" width={42} height={42} />
              <span className="v2-brand-text">
                <strong>GO CARES</strong>
                <span>โดยโรงพยาบาลเอกชล</span>
              </span>
            </a>
            <p>
              ผู้ดูแลพาผู้สูงอายุไปโรงพยาบาล ตั้งแต่ออกจากบ้านจนถึงส่งกลับ
              โดยโรงพยาบาลเอกชล จังหวัดชลบุรี
            </p>
          </div>
          <div>
            <h4>บริการ</h4>
            <ul>
              <li>
                <a href="#pricing">ค่าบริการ</a>
              </li>
              <li>
                <a href="#standard">มาตรฐานการดูแล</a>
              </li>
              <li>
                <a href="#journey">หนึ่งวันกับเรา</a>
              </li>
              <li>
                <a href="#news">กิจกรรมและข่าวสาร</a>
              </li>
              <li>
                <a href="#coverage">พื้นที่ให้บริการ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>ติดต่อ</h4>
            <ul>
              <li>
                <a href={tel}>สายด่วน {content.contact.hotlinePhone}</a>
              </li>
              <li>
                <a href={lineUrl} target="_blank" rel="noopener">
                  LINE {content.contact.lineOaId}
                </a>
              </li>
              <li>โรงพยาบาลเอกชล · อ.เมืองชลบุรี</li>
              <li>เปิดบริการทุกวัน</li>
            </ul>
          </div>
        </div>
        <div className="v2-container v2-footer-bottom">
          <span>© 2026 AIKCHOL HOSPITAL PUBLIC COMPANY LIMITED.</span>
          <a className="v2-eco-link" href="/">
            AIKCHOL NEXT Health Ecosystem
          </a>
        </div>
      </footer>

      <div className="v2-sticky">
        <a className="v2-sticky-call" href={tel} aria-label={`โทร ${content.contact.hotlinePhone}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          โทร
        </a>
        <button className="v2-btn v2-btn--gold" type="button" onClick={() => openBooking('pkg2')}>
          จองผู้ดูแล
        </button>
      </div>

      {drawer.open && (
        <div className="v2-drawer" role="dialog" aria-modal="true" aria-labelledby="v2DrawerTitle">
          <button className="v2-drawer-backdrop" type="button" aria-label="ปิดหน้าต่างจอง" onClick={closeBooking} />
          <div className="v2-drawer-card">
            <div className="v2-drawer-head">
              <div>
                <p className="v2-eyebrow">PRIVATE BOOKING</p>
                <h3 id="v2DrawerTitle">จองผู้ดูแล GO CARES</h3>
                <p>เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันนัดและประเมินเส้นทาง ไม่ต้องจ่ายล่วงหน้า</p>
              </div>
              <button className="v2-drawer-close" type="button" onClick={closeBooking} aria-label="ปิด">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {status === 'done' ? (
              <div className="v2-drawer-done">
                <span className="v2-drawer-check">
                  <CheckIcon />
                </span>
                <h4>รับข้อมูลเรียบร้อยแล้ว</h4>
                <p>เจ้าหน้าที่ GO CARES จะติดต่อกลับภายในเวลาทำการ เพื่อยืนยันการนัดหมาย</p>
                <button className="v2-btn v2-btn--gold" type="button" onClick={closeBooking}>
                  ปิด
                </button>
              </div>
            ) : (
              <form className="v2-form" onSubmit={submitBooking}>
                <div className="v2-form-pkg">
                  {PKG_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={drawer.pkg === key ? 'is-active' : ''}
                      onClick={() => setDrawer((d) => ({ ...d, pkg: key }))}
                    >
                      <span>{content.packages[key].name}</span>
                      <small>
                        {content.packages[key].hours} ชม. · {content.packages[key].price} บ.
                      </small>
                    </button>
                  ))}
                </div>

                <div className="v2-form-row">
                  <label>
                    ชื่อผู้ป่วย / ผู้สูงอายุ *
                    <input name="patientName" required placeholder="เช่น คุณแม่สมศรี ใจดี" />
                  </label>
                  <label>
                    ความสัมพันธ์
                    <select name="patientRelation" defaultValue="บุตร / ธิดา">
                      <option>บุตร / ธิดา</option>
                      <option>คู่สมรส</option>
                      <option>ญาติ / หลาน</option>
                      <option>ผู้ดูแลประจำ</option>
                      <option>ตนเอง</option>
                    </select>
                  </label>
                </div>

                <div className="v2-form-row">
                  <label>
                    ชื่อผู้ติดต่อ *
                    <input name="contactName" required placeholder="เช่น คุณวิภา (ลูกสาว)" />
                  </label>
                  <label>
                    เบอร์โทรติดต่อกลับ *
                    <input name="contactPhone" type="tel" required placeholder="08X-XXX-XXXX" />
                  </label>
                </div>

                <div className="v2-form-row">
                  <label>
                    LINE ID (สำหรับส่งรายงาน)
                    <input name="contactLineId" placeholder="เช่น wipha_care" />
                  </label>
                  <label>
                    อำเภอที่พัก *
                    <select name="district" required>
                      {DISTRICTS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  โรงพยาบาลปลายทาง
                  <select name="hospital" value={hospital} onChange={(e) => setHospital(e.target.value)}>
                    {HOSPITALS.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </label>

                {hospital === 'อื่นๆ' && (
                  <label>
                    ระบุชื่อโรงพยาบาล / คลินิก *
                    <input name="otherHospital" required maxLength={120} placeholder="เช่น รพ.กรุงเทพพัทยา" />
                  </label>
                )}

                {status === 'error' && (
                  <p className="v2-form-error">
                    ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือโทร {content.contact.hotlinePhone}
                  </p>
                )}

                <button className="v2-btn v2-btn--gold v2-form-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'กำลังส่ง...' : 'ยืนยันการจอง'}
                </button>
                <p className="v2-form-note">
                  หรือโทร <a href={tel}>{content.contact.hotlinePhone}</a> · LINE {content.contact.lineOaId}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
