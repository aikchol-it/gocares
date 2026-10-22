export interface SiteMenu {
  id: string;
  label: string;
  href: string;
}

export interface SiteHero {
  kicker: string;
  headline: string;
  headlineAccent: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  bookBtnText: string;
  lineBtnText: string;
  callBtnText: string;
}

export interface SiteContact {
  hotlinePhone: string;
  lineOaId: string;
  lineOaUrl: string;
}

export interface SitePackageItem {
  id: string;
  name: string;
  sub: string;
  price5h: string;
  price8h: string;
}

export interface SiteMomentItem {
  id: string;
  stepNumber: number;
  tag: string;
  title: string;
  desc: string;
  bullet1: string;
  bullet2: string;
  image: string;
}

export interface SitePersonaItem {
  id: string;
  num: number;
  title: string;
  desc: string;
  image: string;
}

export interface SiteServiceStepItem {
  id: string;
  step: number;
  title: string;
  desc: string;
  image: string;
}

export interface SiteAppointmentItem {
  id: string;
  num: number;
  title: string;
  desc: string;
  image: string;
}

export interface SiteImages {
  logo: string;
  heroPoster: string;
  videoPoster: string;
  mapImage: string;
  reportMockup: string;
}

export interface SiteContent {
  menus: SiteMenu[];
  hero: SiteHero;
  contact: SiteContact;
  packages: {
    pkg1: SitePackageItem;
    pkg2: SitePackageItem;
    pkg3: SitePackageItem;
  };
  moments: SiteMomentItem[];
  personas: SitePersonaItem[];
  serviceSteps: SiteServiceStepItem[];
  appointments: SiteAppointmentItem[];
  images: SiteImages;
  announcement: {
    enabled: boolean;
    text: string;
  };
  updatedAt: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  menus: [
    { id: 'm1', label: 'บริการครบวงจร', href: '#care-moments' },
    { id: 'm2', label: 'วิดีโอแนะนำ', href: '#video-tour' },
    { id: 'm3', label: 'อัตราค่าบริการ', href: '#pricing' },
    { id: 'm4', label: 'พื้นที่ชลบุรี', href: '#coverage-area' },
    { id: 'm5', label: 'คำถามพบบ่อย', href: '#faq' },
  ],
  hero: {
    kicker: 'GO CARES by AIKCHOL NEXT · โรงพยาบาลเอกชล',
    headline: 'พาคนที่คุณรักไปหาหมอ',
    headlineAccent: 'อุ่นใจเหมือนคุณไปด้วยทุกก้าว',
    bullet1: '<strong>รถรับ-ส่งถึงบ้าน</strong> พร้อมผู้ดูแล 1:1 ช่วยพยุง รองรับรถเข็น',
    bullet2: '<strong>เข้าห้องตรวจ &amp; จดคำสั่งหมอ</strong> ทวนยา ป้องกันกินผิด',
    bullet3: '<strong>LINE Report สดทุกขั้นตอน</strong> แม้ติดงานก็อุ่นใจ',
    bookBtnText: 'จองเดี๋ยวนี้  เริ่ม 1,300.-',
    lineBtnText: 'LINE ปรึกษา',
    callBtnText: 'โทรฟรี',
  },
  contact: {
    hotlinePhone: '063 920 4765',
    lineOaId: '@407eqbwl',
    lineOaUrl: 'https://lin.ee/RbECVC5',
  },
  packages: {
    pkg1: {
      id: 'pkg1',
      name: 'แพ็กเกจมาตรฐาน',
      sub: 'พาผู้สูงอายุไปพบแพทย์ ณ โรงพยาบาล',
      price5h: '1,000',
      price8h: '1,500',
    },
    pkg2: {
      id: 'pkg2',
      name: 'แพ็กเกจผู้ดูแล + รถ',
      sub: 'พาพบแพทย์ พร้อมรถรับ-ส่งเฉพาะตลอดเส้นทาง',
      price5h: '1,300',
      price8h: '1,900',
    },
    pkg3: {
      id: 'pkg3',
      name: 'แพ็กเกจพาทำกิจกรรม',
      sub: 'พาไปทำธุระ นัดหมายพิเศษ หรือพักผ่อน',
      price5h: '1,500',
      price8h: '2,200',
    },
  },
  moments: [
    {
      id: 'book',
      stepNumber: 1,
      tag: 'Step 1: Book & Plan',
      title: 'นัดหมาย & วางแผนการเดินทางอย่างรัดกุม',
      desc: 'ทีมงานสอบถามประวัติและวางแผนการเดินทาง ยืนยันข้อมูลผู้รับบริการและเวลานัดหมายล่วงหน้า ให้คุณมั่นใจตั้งแต่นาทีแรก',
      bullet1: 'เจ้าหน้าที่ผู้เชี่ยวชาญประสานงานและจัดสรรผู้ดูแลที่เหมาะสมกับอาการ',
      bullet2: 'ยืนยันวัน เวลา สถานที่ และเส้นทางล่วงหน้าอย่างโปร่งใส ไร้กังวล',
      image: 'assets/step_1_book_plan.webp',
    },
    {
      id: 'mobility',
      stepNumber: 2,
      tag: 'Step 2: Home to Hospital Mobility',
      title: 'รถรับ-ส่งเฉพาะ ถึงหน้าบ้าน ปลอดภัยทุกเส้นทาง',
      desc: 'ผู้ดูแลเดินทางไปรับตรงเวลา ช่วยเตรียมตัว ช่วยพยุงขึ้นรถตู้ GO CARES อย่างถูกวิธี รองรับรถเข็นและอุปกรณ์ช่วยเดิน',
      bullet1: 'ตรวจวัดสัญญาณชีพ ความดัน และชีพจรก่อนออกเดินทาง',
      bullet2: 'รถสะอาด แอร์เย็น ได้มาตรฐานความปลอดภัยของโรงพยาบาลเอกชล',
      image: 'assets/step_2_pickup_home.webp',
    },
    {
      id: 'hospital',
      stepNumber: 3,
      tag: 'Step 3: Arrival & Registration',
      title: 'ถึงโรงพยาบาลเอกชล สะดวกสบายทุกขั้นตอน',
      desc: 'พยุงลงจากรถ ดูแลนั่งรถเข็น อำนวยความสะดวกเปิดสิทธิการรักษา ประสานงานรับบัตรคิว และพาไปยังจุดตรวจต่างๆ อย่างราบรื่น',
      bullet1: 'ชำนาญขั้นตอนโรงพยาบาลเอกชล ไม่ต้องเดินวนหรือเหนื่อยล้า',
      bullet2: 'ดูแลอย่างใกล้ชิดและเป็นเพื่อนคุยคลายความวิตกกังวลตลอดเวลา',
      image: 'assets/step_3_arrival_aikchol.webp',
    },
    {
      id: 'consultation',
      stepNumber: 4,
      tag: 'Step 4: Medical Consultation',
      title: 'เข้าห้องตรวจด้วยกัน จดคำสั่งแพทย์ และทวนวิธีใช้ยา',
      desc: 'ช่วยจดคำแนะนำของคุณหมออย่างละเอียด ถามซ้ำจุดที่ไม่ชัดเจน และตรวจสอบยาตัวใหม่กับเภสัชกร ป้องกันการกินยาผิดซ้ำซ้อน',
      bullet1: 'ถ่ายรูปฉลากยาทุกตัว แจ้งชัดเจนว่ายาตัวไหนหยุด ตัวไหนเริ่มใหม่',
      bullet2: 'บันทึกวันนัดครั้งถัดไปและผลตรวจส่งให้ครอบครัวเห็นแนวโน้ม',
      image: 'assets/step_4_doctor_consult.webp',
    },
    {
      id: 'report',
      stepNumber: 5,
      tag: 'Step 5: Send Back & Service Report',
      title: 'ส่งกลับบ้านปลอดภัย พร้อมสรุป Service Report ผ่าน LINE',
      desc: 'ส่งกลับถึงบ้านอย่างปลอดภัย ตรวจความเรียบร้อย และส่งรายงานสรุปกิจกรรมฉบับสมบูรณ์พร้อมรูปถ่ายให้ครอบครัวทราบทันที',
      bullet1: 'สบายใจ ไร้กังวล ติดตามได้ทุกนาทีแม้ไม่ได้ลางานไปด้วย',
      bullet2: 'ครอบครัวได้รับรายงาน Service Report ทั้งรายการยาและคำแนะนำครบถ้วน',
      image: 'assets/step_5_service_report.webp',
    },
  ],
  personas: [
    {
      id: 'persona_1',
      num: 1,
      title: 'ครอบครัวที่ลางานไม่ได้',
      desc: 'นัดโรงพยาบาลมักใช้เวลาครึ่งวันถึงเต็มวัน การลางานทุกครั้งกระทบทั้งหน้าที่การงานและรายได้ ให้ GO CARES เป็นตัวแทนความห่วงใย คุณทำงานได้อย่างสบายใจโดยมีผู้ดูแลมืออาชีพไปแทน',
      image: 'assets/personas/persona_1_busy_family.webp',
    },
    {
      id: 'persona_2',
      num: 2,
      title: 'ผู้สูงอายุที่อยู่คนเดียว',
      desc: 'ลูกหลานอยู่ต่างจังหวัดหรือต่างประเทศ ต้องการคนที่ไว้ใจได้ไปโรงพยาบาลด้วย คอยดูแลพาเดิน เข้าห้องตรวจ และรายงานสถานะพร้อมรูปถ่ายให้ครอบครัวทราบตลอดวัน พ่อแม่ไม่เหงาและหมดห่วง',
      image: 'assets/personas/persona_2_alone_elderly.webp',
    },
    {
      id: 'persona_3',
      num: 3,
      title: 'ผู้ที่เดินหรือทรงตัวลำบาก',
      desc: 'ต้องใช้วอล์กเกอร์ ไม้เท้า หรือนั่งรถเข็น ต้องการคนช่วยพยุงและช่วยขึ้น-ลงรถอย่างถูกวิธีตามหลักการยศาสตร์ ลดความเสี่ยงลื่นล้มหรือบาดเจ็บ ปลอดภัยตั้งแต่ออกจากบ้านจนถึงเตียงนอน',
      image: 'assets/personas/persona_3_mobility_impaired.webp',
    },
    {
      id: 'persona_4',
      num: 4,
      title: 'ผู้ที่ต้องไป รพ. ประจำ',
      desc: 'ผู้ป่วยฟอกไตสัปดาห์ละ 2-3 ครั้ง หรือรับยาเคมีบำบัดตามรอบ เป็นนัดหมายที่เลื่อนไม่ได้และร่างกายมักอ่อนเพลีย ครอบครัวสามารถจองเป็นแพ็กเกจประจำล่วงหน้าได้ทั้งเดือนอย่างต่อเนื่อง',
      image: 'assets/personas/persona_4_regular_patient.webp',
    },
  ],
  serviceSteps: [
    {
      id: 'step_1',
      step: 1,
      title: '1. ไปรับที่บ้านและพากลับ',
      desc: 'ผู้ดูแลไปถึงบ้านตามเวลานัด ช่วยเตรียมตัวและช่วยขึ้นลงรถ จนพากลับถึงบ้านและดูให้เข้าบ้านเรียบร้อย',
      image: 'assets/step_feature_1.webp',
    },
    {
      id: 'step_2',
      step: 2,
      title: '2. วัดสัญญาณชีพก่อนเดินทาง',
      desc: 'วัดความดันโลหิต ชีพจร และประเมินความพร้อมเบื้องต้น หากพบสิ่งผิดปกติจะแจ้งครอบครัวและปรึกษาพยาบาลทันที',
      image: 'assets/step_feature_2.webp',
    },
    {
      id: 'step_3',
      step: 3,
      title: '3. อยู่ด้วยตลอดในโรงพยาบาล',
      desc: 'จัดคิว ยื่นเอกสาร พาไปตามจุดต่างๆ และอยู่เป็นเพื่อนระหว่างรอ ไม่ปล่อยให้ผู้สูงอยู่นั่งรอตามลำพัง',
      image: 'assets/step_feature_3.webp',
    },
    {
      id: 'step_4',
      step: 4,
      title: '4. จดบันทึกคำแนะนำแพทย์',
      desc: 'เข้าห้องตรวจด้วยเมื่อได้รับความยินยอม จดสิ่งที่แพทย์สั่ง ถามซ้ำจุดที่ไม่ชัด และบันทึกวันนัดครั้งถัดไป',
      image: 'assets/step_feature_4.webp',
    },
    {
      id: 'step_5',
      step: 5,
      title: '5. รับยาและทวนวิธีใช้',
      desc: 'รับยาแทนได้ ทวนวิธีใช้ยากับเภสัชกร ถ่ายรูปฉลากยา และแจ้งชัดเจนว่ายาตัวไหนหยุด ตัวไหนเริ่มใหม่',
      image: 'assets/step_feature_5.webp',
    },
    {
      id: 'step_6',
      step: 6,
      title: '6. รายงานครอบครัวผ่าน LINE',
      desc: 'อัปเดตเป็นระยะระหว่างวัน และสรุปทั้งหมดหลังกลับถึงบ้าน ครอบครัวที่ทำงานอยู่สามารถติดตามได้ตลอดเวลา',
      image: 'assets/step_feature_6.webp',
    },
  ],
  appointments: [
    {
      id: 'apt1',
      num: 1,
      title: '1. ตรวจสุขภาพประจำปี',
      desc: 'ดูแลช่วงงดน้ำงดอาหาร พาไปตรวจครบทุกจุด และรับผลตรวจครบก่อนกลับ',
      image: 'assets/step_feature_3.webp',
    },
    {
      id: 'apt2',
      num: 2,
      title: '2. โรคประจำตัว เบาหวาน ความดัน',
      desc: 'จดผลระดับน้ำตาลและความดัน ให้ครอบครัวเห็นแนวโน้ม และทวนยาใหม่ทุกครั้ง',
      image: 'assets/appointment_type_2.webp',
    },
    {
      id: 'apt3',
      num: 3,
      title: '3. ฟอกไต (Hemodialysis)',
      desc: 'ไป-กลับตามรอบสัปดาห์ละ 2-3 ครั้ง สังเกตอาการอ่อนเพลีย และพากลับปลอดภัย',
      image: 'assets/appointment_type_3.webp',
    },
    {
      id: 'apt4',
      num: 4,
      title: '4. เคมีบำบัด & ฉายรังสี',
      desc: 'อยู่เป็นเพื่อนรอบยาว สังเกตอาการข้างเคียง และดูแลระหว่างเดินทางกลับ',
      image: 'assets/appointment_type_4.webp',
    },
    {
      id: 'apt5',
      num: 5,
      title: '5. กายภาพบำบัด',
      desc: 'พาไปทำคอร์สฟื้นฟูต่อเนื่อง หรือพิจารณาเปลี่ยนเป็นกายภาพที่บ้านแทนได้',
      image: 'assets/appointment_type_5.webp',
    },
    {
      id: 'apt6',
      num: 6,
      title: '6. คุณแม่ตั้งครรภ์',
      desc: 'ระวังภาวะเสี่ยง ครรภ์เป็นพิษ ลื่นล้ม ประสานงานจุดตรวจและฟังผลแพทย์ครบถ้วน',
      image: 'assets/appointment_type_6.webp',
    },
    {
      id: 'apt7',
      num: 7,
      title: '7. ทันตกรรม & จักษุ',
      desc: 'ดูแลหลังหัตถการที่มองไม่ชัดชั่วคราวหรือชาปาก ซึ่งเป็นช่วงที่เดินทางกลับเองลำบาก',
      image: 'assets/appointment_type_7.webp',
    },
    {
      id: 'apt8',
      num: 8,
      title: '8. นัดพบแพทย์เฉพาะทาง',
      desc: 'พบแพทย์เฉพาะทางทุกแผนก ทั้งโรงพยาบาลรัฐและเอกชน พร้อมสรุปผลตรวจละเอียด',
      image: 'assets/appointment_type_8.webp',
    },
  ],
  images: {
    logo: 'assets/aikchol_next_logo.webp',
    heroPoster: 'assets/hero_companion.webp',
    videoPoster: 'assets/ahc_video_poster.webp',
    mapImage: 'assets/chonburi_map.webp',
    reportMockup: 'assets/mobile_report_mockup.webp',
  },
  announcement: {
    enabled: true,
    text: 'เปิดบริการทุกวันในเขตชลบุรี พร้อมรถรับ-ส่งถึงบ้าน ติดต่อสอบถามได้ตลอด 24 ชั่วโมง',
  },
  updatedAt: new Date().toISOString(),
};

