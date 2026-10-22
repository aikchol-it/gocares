import { NextResponse } from 'next/server';

// CR3: Enhanced AI Search with expanded knowledge base + improved scoring
// Uses local keyword matching with TF-IDF-style scoring + synonym expansion

interface KnowledgeItem {
  id: string;
  title: string;
  keywords: string[];
  synonyms: string[];
  category: string;
  answer: string;
  actionLabel: string;
  actionType: 'booking' | 'line' | 'call';
  actionPkg?: string;
  priority: number; // Higher = show first in default results
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'price-packages',
    title: 'อัตราค่าบริการและราคาแพ็กเกจ GO CARES',
    keywords: ['ราคา', 'แพ็กเกจ', 'กี่บาท', 'ค่าบริการ', 'เท่าไหร่', 'package', 'price', 'cost', 'บาท', 'ค่าใช้จ่าย'],
    synonyms: ['ค่าตัว', 'ค่าจ้าง', 'ค่าเดินทาง', 'แพง', 'ถูก', 'ราคาเท่าไหร่'],
    category: 'ค่าบริการ',
    answer: 'GO CARES คิดตามเวลาและระยะทาง มี 4 แพ็กเกจ: Economic 3 ชม. 500 บาท (ฟรี 10 กม.), Standard I 5 ชม. 900 บาท (ฟรี 10 กม.), Standard II 5 ชม. 1,200 บาท (รวม 30 กม.), บริการอื่นๆ 8 ชม. 1,400 บาท (ฟรี 10 กม. แรก เกิน 12 บาท/กม.) เกินเวลา 150 บาท/ชม. ไม่รวมค่ารักษาพยาบาลและค่ายา ราคาโปรโมชั่นถึง 31 มกราคม 2570',
    actionLabel: 'เปิดแบบฟอร์มจองบริการ',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 10,
  },
  {
    id: 'dialysis-service',
    title: 'บริการรับ-ส่งและดูแลผู้ป่วยฟอกไต (Hemodialysis)',
    keywords: ['ฟอกไต', 'ไตวาย', 'ล้างไต', 'ไต', 'dialysis', 'hemodialysis', 'ฟอก'],
    synonyms: ['ไตเสื่อม', 'ไตพิการ', 'ล้างไตสัปดาห์ละ', 'ฟอกเลือด'],
    category: 'บริการเฉพาะโรค',
    answer: 'GO CARES มีบริการพาผู้ป่วยฟอกไตตามรอบนัดหมายประจำ รถรับ-ส่งถึงบ้าน ช่วยเข็นรถ ประสานพยาบาลห้องฟอกไต อยู่ดูแลระหว่างรอ 3-4 ชั่วโมง และพากลับเข้าบ้านอย่างปลอดภัย ครอบครัวติดตามสถานะได้ผ่าน LINE ตลอดเวลา',
    actionLabel: 'จองบริการดูแลผู้ป่วยฟอกไต',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 9,
  },
  {
    id: 'chemo-service',
    title: 'บริการรับ-ส่งผู้ป่วยทำเคมีบำบัด / ฉายแสง (Chemotherapy)',
    keywords: ['คีโม', 'เคมีบำบัด', 'มะเร็ง', 'ฉายแสง', 'chemo', 'chemotherapy', 'cancer', 'ยาพิษ'],
    synonyms: ['โรคมะเร็ง', 'เนื้องอก', 'ฉีดยามะเร็ง'],
    category: 'บริการเฉพาะโรค',
    answer: 'ดูแลผู้ป่วยมะเร็งที่รับยาเคมีบำบัดหรือฉายแสง ผู้ดูแลผ่านอบรมการเฝ้าระวังอาการอ่อนเพลีย คลื่นไส้ ช่วยพยุง รับยาแทน และพาส่งถึงเตียงบ้านปลอดภัย เราเข้าใจว่าผู้ป่วยมะเร็งต้องการการดูแลพิเศษ',
    actionLabel: 'จองแพ็กเกจดูแลผู้ป่วยคีโม',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 9,
  },
  {
    id: 'wheelchair-accessibility',
    title: 'การรองรับผู้สูงอายุที่ใช้รถเข็น (Wheelchair)',
    keywords: ['รถเข็น', 'wheelchair', 'เดินไม่ได้', 'พยุง', 'ทางลาด', 'นั่งรถเข็น', 'ขาอ่อนแรง'],
    synonyms: ['วีลแชร์', 'ช่วยเดิน', 'พยุงเดิน', 'ไม้ค้ำ', 'วอล์คเกอร์'],
    category: 'ยานพาหนะและอุปกรณ์',
    answer: 'รถตู้บริการของ GO CARES ออกแบบรองรับผู้สูงอายุและผู้ใช้วีลแชร์โดยเฉพาะ มีทางลาดพื้นที่ยึดตรึงรถเข็น ผู้ดูแลช่วยพยุงเข็นรถตลอดทุกจุดตรวจในโรงพยาบาล โดยไม่ปล่อยให้อยู่ตามลำพัง',
    actionLabel: 'ปรึกษาเรื่องรถเข็นและยานพาหนะ',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 8,
  },
  {
    id: 'pickup-coverage',
    title: 'พื้นที่บริการรับ-ส่งในจังหวัดชลบุรี',
    keywords: ['พื้นที่', 'รับส่ง', 'บ้าน', 'ที่พัก', 'ชลบุรี', 'ศรีราชา', 'พานทอง', 'บ้านบึง', 'พนัสนิคม', 'พัทยา', 'บางละมุง', 'area', 'โซน', 'เขต'],
    synonyms: ['ครอบคลุมไหม', 'ไปได้ไหม', 'มีบริการที่'],
    category: 'พื้นที่ให้บริการ',
    answer: 'ให้บริการครอบคลุมทั่วจังหวัดชลบุรี: อ.เมืองชลบุรี, อ.ศรีราชา, อ.บ้านบึง, อ.พานทอง, อ.พนัสนิคม, อ.บางละมุง (พัทยา), อ.บ่อทอง, และ อ.หนองใหญ่ รถไปรับตรงเวลาถึงหน้าบ้าน ไม่ต้องออกไปรอที่ไหน',
    actionLabel: 'ตรวจสอบพื้นที่และจองคิว',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 8,
  },
  {
    id: 'hospitals-coverage',
    title: 'ไปโรงพยาบาลรัฐ หรือโรงพยาบาลอื่นๆ นอกเหนือจากเอกชล ได้ไหม?',
    keywords: ['รพ', 'โรงพยาบาล', 'รพ.ชลบุรี', 'สมเด็จ', 'ม.บูรพา', 'รพ.รัฐ', 'คลินิก', 'เอกชล', 'hospital', 'โรงหมอ'],
    synonyms: ['ไปได้ทุกที่ไหม', 'เฉพาะเอกชลไหม', 'รพ.รัฐได้ไหม'],
    category: 'โรงพยาบาลปลายทาง',
    answer: 'สามารถพาไปได้ทุกโรงพยาบาลทั้งรัฐและเอกชนในชลบุรี เช่น โรงพยาบาลเอกชล, รพ.เอกชล อ่างศิลา, โรงพยาบาลชลบุรี (รพ.รัฐ), รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา, รพ.มหาวิทยาลัยบูรพา รวมถึงคลินิกเฉพาะทางต่างๆ',
    actionLabel: 'ระบุโรงพยาบาลปลายทางในแบบฟอร์ม',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 8,
  },
  {
    id: 'line-reporting',
    title: 'การรายงานสถานะครอบครัวผ่าน LINE ตลอดเวลา',
    keywords: ['line', 'ไลน์', 'รายงาน', 'อัปเดต', 'ติดตาม', 'รูปภาพ', 'ครอบครัว', 'report', 'สถานะ'],
    synonyms: ['แจ้งข่าว', 'บอกให้รู้', 'ส่งรูป', 'แชท'],
    category: 'การสื่อสาร',
    answer: 'ผู้ดูแลส่งภาพถ่ายและข้อความรายงานผ่าน LINE เป็นระยะ ได้แก่ เมื่อถึงบ้านผู้สูงอายุ, เมื่อถึงโรงพยาบาล, ระหว่างรอตรวจ, บันทึกคำสั่งแพทย์, รูปภาพยาพร้อมวิธีใช้ เพื่อให้ลูกหลานที่ทำงานสบายใจ',
    actionLabel: 'แชทสอบถามทาง LINE OA',
    actionType: 'line',
    priority: 7,
  },
  {
    id: 'booking-advance',
    title: 'ต้องจองล่วงหน้ากี่วัน?',
    keywords: ['จองล่วงหน้า', 'นัดหมาย', 'วันนัด', 'ด่วน', 'กี่วัน', 'เวลาทำการ', 'book', 'จอง', 'ล่วงหน้า'],
    synonyms: ['จองวันนี้ได้ไหม', 'พรุ่งนี้ได้ไหม', 'เดี๋ยวนี้ได้ไหม'],
    category: 'ขั้นตอนการจอง',
    answer: 'แนะนำจองล่วงหน้าอย่างน้อย 1-2 วัน เพื่อจัดเตรียมยานพาหนะและผู้ดูแลที่เหมาะสม กรณีเคสด่วนโทรสายด่วน 063 920 4765 เพื่อตรวจสอบคิวว่างได้ทันที',
    actionLabel: 'โทรสายด่วน 063 920 4765',
    actionType: 'call',
    priority: 7,
  },
  {
    id: 'caregiver-qualification',
    title: 'ผู้ดูแลของ GO CARES มีคุณสมบัติอย่างไร?',
    keywords: ['ผู้ดูแล', 'พนักงาน', 'คุณสมบัติ', 'อบรม', 'ประสบการณ์', 'caregiver', 'ไว้ใจได้ไหม'],
    synonyms: ['น่าเชื่อถือไหม', 'ดูแลดีไหม', 'มีความรู้ไหม', 'ผ่านการฝึกอบรม'],
    category: 'เกี่ยวกับบริการ',
    answer: 'ผู้ดูแลทุกคนผ่านการคัดเลือกและอบรมโดยโรงพยาบาลเอกชล มีความรู้ด้านการช่วยเหลือผู้สูงอายุ การสังเกตอาการผิดปกติ การสื่อสารกับแพทย์พยาบาล และการรายงานผ่าน LINE ครอบครัว พร้อมรวมประกันอุบัติเหตุตลอดการบริการ',
    actionLabel: 'สอบถามเพิ่มเติมทาง LINE',
    actionType: 'line',
    priority: 6,
  },
  {
    id: 'insurance',
    title: 'มีประกันอุบัติเหตุระหว่างบริการหรือไม่?',
    keywords: ['ประกัน', 'ประกันภัย', 'อุบัติเหตุ', 'insurance', 'เกิดอุบัติเหตุ', 'ล้ม'],
    synonyms: ['คุ้มครองไหม', 'ความรับผิดชอบ', 'หากเกิดเหตุ'],
    category: 'ความปลอดภัย',
    answer: 'ทุกแพ็กเกจรวมประกันอุบัติเหตุส่วนบุคคลสำหรับผู้รับบริการตลอดระยะเวลาบริการ หากเกิดเหตุไม่คาดคิด ทีมงาน GO CARES และโรงพยาบาลเอกชลพร้อมดูแลทันที',
    actionLabel: 'จองบริการพร้อมประกัน',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 6,
  },
  {
    id: 'elderly-care',
    title: 'บริการดูแลผู้สูงอายุทั่วไป (ไม่ได้ป่วยหนัก)',
    keywords: ['ผู้สูงอายุ', 'แก่', 'อาม่า', 'อากง', 'คุณยาย', 'คุณตา', 'พ่อแม่', 'ผู้สูงวัย', 'senior', 'elderly'],
    synonyms: ['พาพ่อแม่', 'พาคุณยาย', 'พาผู้สูงอายุ', 'ดูแลผู้เฒ่า'],
    category: 'บริการหลัก',
    answer: 'GO CARES เชี่ยวชาญดูแลผู้สูงอายุทุกระดับ ตั้งแต่การพาไปตรวจสุขภาพประจำปี ฉีดวัคซีน พบแพทย์เฉพาะทาง ไปจนถึงการดูแลผู้ป่วยโรคเรื้อรัง ด้วยความอบอุ่นและเป็นกันเอง เหมือนลูกหลานแท้ๆ',
    actionLabel: 'จองบริการดูแลผู้สูงอายุ',
    actionType: 'booking',
    actionPkg: 'pkg1',
    priority: 9,
  },
  {
    id: 'how-to-contact',
    title: 'ติดต่อสอบถามและจองบริการ GO CARES ได้อย่างไร?',
    keywords: ['ติดต่อ', 'สอบถาม', 'โทร', 'เบอร์', 'contact', 'how', 'วิธี'],
    synonyms: ['ช่องทางติดต่อ', 'คุยกับใคร', 'โทรหาใคร'],
    category: 'ช่องทางติดต่อ',
    answer: 'ติดต่อ GO CARES ได้ 3 ช่องทาง: (1) โทรสายด่วน 063 920 4765 ตลอดเวลาทำการ, (2) แชท LINE OA: @407eqbwl หรือ lin.ee/RbECVC5, (3) กรอกแบบฟอร์มจองบริการในเว็บไซต์นี้ เจ้าหน้าที่ติดต่อกลับภายใน 30 นาที',
    actionLabel: 'กรอกแบบฟอร์มจองบริการ',
    actionType: 'booking',
    actionPkg: 'pkg2',
    priority: 7,
  },
];

/* ============================================================
   Enhanced Scoring Algorithm
   - Title exact match: +20
   - Title contains query: +15
   - Answer contains query: +8
   - Category match: +10
   - Keyword exact match: +12
   - Keyword partial match: +6
   - Synonym match: +8
   - Multi-word query bonus
   ============================================================ */

function scoreItem(item: KnowledgeItem, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return item.priority;

  let score = 0;
  const titleLow = item.title.toLowerCase();
  const answerLow = item.answer.toLowerCase();
  const catLow = item.category.toLowerCase();

  // Title matches
  if (titleLow === q) score += 20;
  else if (titleLow.includes(q)) score += 15;

  // Answer match
  if (answerLow.includes(q)) score += 8;

  // Category match
  if (catLow.includes(q)) score += 10;

  // Keyword matches
  item.keywords.forEach((kw) => {
    const kwLow = kw.toLowerCase();
    if (kwLow === q) score += 12;
    else if (q.includes(kwLow) || kwLow.includes(q)) score += 6;
  });

  // Synonym matches
  item.synonyms.forEach((syn) => {
    const synLow = syn.toLowerCase();
    if (synLow === q) score += 8;
    else if (q.includes(synLow) || synLow.includes(q)) score += 4;
  });

  // Multi-word query: check each word individually
  const words = q.split(/\s+/).filter((w) => w.length >= 2);
  if (words.length > 1) {
    words.forEach((word) => {
      if (titleLow.includes(word)) score += 4;
      if (answerLow.includes(word)) score += 2;
      item.keywords.forEach((kw) => {
        if (kw.toLowerCase().includes(word) || word.includes(kw.toLowerCase())) score += 3;
      });
    });
  }

  return score;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { query?: string };
    const query = (body.query || '').trim();

    if (!query) {
      // Return top items by priority
      const defaults = [...KNOWLEDGE_BASE].sort((a, b) => b.priority - a.priority).slice(0, 5);
      return NextResponse.json({
        results: defaults,
        header: 'บริการและคำถามที่พบบ่อย',
        total: KNOWLEDGE_BASE.length,
      });
    }

    const scored = KNOWLEDGE_BASE.map((item) => ({
      item,
      score: scoreItem(item, query),
    }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    return NextResponse.json({
      results: scored,
      header: scored.length
        ? `ผลการค้นหาสำหรับ "${query}" (${scored.length} รายการ)`
        : `ไม่พบข้อมูลที่ตรงกับ "${query}" — ลองโทร 063 920 4765 หรือแชท LINE OA`,
      total: scored.length,
    });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
