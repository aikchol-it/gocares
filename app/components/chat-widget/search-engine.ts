import {
  MOCK_KNOWLEDGE_BASE,
  KnowledgeEntry,
  DEFAULT_FALLBACK_ANSWER,
  FALLBACK_TOPICS
} from './knowledge-base';

export interface SearchResult {
  found: boolean;
  entryId?: string;
  answer: string;
  category?: string;
  title?: string;
  followUpSuggestions: string[];
  actionLabel?: string;
  actionUrl?: string;
  actionType?: 'booking' | 'line' | 'call' | 'url';
}

function cleanThaiTokens(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[?.,!~()#*\/\\_:\-—"'`[\]]/g, ' ')
    .replace(/\s+/g, '');
}

// Static lookup table mapping exact normalized phrases to KnowledgeEntry
const PHRASE_INDEX: Record<string, KnowledgeEntry> = {};

for (const entry of MOCK_KNOWLEDGE_BASE) {
  PHRASE_INDEX[cleanThaiTokens(entry.title)] = entry;
  PHRASE_INDEX[cleanThaiTokens(entry.category)] = entry;

  for (const q of entry.questions) {
    PHRASE_INDEX[cleanThaiTokens(q)] = entry;
  }

  for (const sug of entry.followUpSuggestions) {
    const key = cleanThaiTokens(sug);
    if (!PHRASE_INDEX[key]) {
      PHRASE_INDEX[key] = entry;
    }
  }
}

// Canonical aliases for common user prompts and suggestion topics
const CANONICAL_TOPIC_IDS: Record<string, string> = {
  'แพ็กเกจและอัตราค่าบริการ': 'price-packages',
  'อัตราค่าบริการและแพ็กเกจมีอะไรบ้าง': 'price-packages',
  'ราคาค่าบริการ': 'price-packages',
  'บริการรับ-ส่งผู้ป่วยฟอกไต': 'dialysis-service',
  'มีบริการรับ-ส่งผู้ป่วยฟอกไตไหม': 'dialysis-service',
  'บริการดูแลผู้ป่วยเคมีบำบัด/ฉายแสง': 'chemo-service',
  'บริการดูแลผู้ป่วยเคมีบำบัด': 'chemo-service',
  'การดูแลผู้ใช้วีลแชร์และยานพาหนะ': 'wheelchair-support',
  'รองรับผู้ป่วยนั่งรถเข็นไหม': 'wheelchair-support',
  'พื้นที่ให้บริการในจังหวัดชลบุรี': 'coverage-area',
  'พื้นที่ให้บริการครอบคลุมที่ไหนบ้างในชลบุรี': 'coverage-area',
  'โรงพยาบาลและคลินิกปลายทาง': 'hospital-destinations',
  'ไปโรงพยาบาลรัฐหรือโรงพยาบาลอื่นนอกจากเอกชลได้ไหม': 'hospital-destinations',
  'การรายงานสถานะผ่าน line': 'line-report',
  'ครอบครัวติดตามสถานะทาง line ได้อย่างไร': 'line-report',
  'สิ่งที่ต้องเตรียมในวันเดินทาง': 'preparation-guide',
  'ต้องเตรียมเอกสารและยาส่งให้ผู้ดูแลอย่างไรบ้าง': 'preparation-guide',
  'ขั้นตอนการจองและติดต่อ line oa': 'booking-method',
  'ต้องจองล่วงหน้ากี่วันและติดต่อช่องทางไหน': 'booking-method',
  'มาตรฐานความปลอดภัยและคุณภาพของผู้ดูแล': 'caregiver-standard',
  'ผู้ดูแลผ่านการฝึกอบรมและไว้ใจได้ไหม': 'caregiver-standard',
  'บริการ go cares เหมาะกับใคร และทำไมถึงคุ้มค่า': 'target-groups-and-value',
  'จุดเด่นของ go cares คืออะไร': 'target-groups-and-value',
  'เวลาและวันเปิดให้บริการ': 'service-hours',
  'เปิดกี่โมง': 'service-hours',
  'วิธีการชำระเงิน': 'payment-methods',
  'ญาตินั่งรถไปด้วยได้ไหม': 'family-accompany',
  'กรณีฉุกเฉิน': 'emergency-policy',
  'สวัสดี': 'greetings',
  'สวัสดีครับ': 'greetings',
  'สวัสดีค่ะ': 'greetings'
};

for (const [phrase, targetId] of Object.entries(CANONICAL_TOPIC_IDS)) {
  const targetEntry = MOCK_KNOWLEDGE_BASE.find((e) => e.id === targetId);
  if (targetEntry) {
    PHRASE_INDEX[cleanThaiTokens(phrase)] = targetEntry;
  }
}

function buildFoundResult(entry: KnowledgeEntry): SearchResult {
  return {
    found: true,
    entryId: entry.id,
    answer: entry.answers && entry.answers.length > 0 ? entry.answers[0] : DEFAULT_FALLBACK_ANSWER,
    category: entry.category,
    title: entry.title,
    followUpSuggestions: entry.followUpSuggestions || [],
    actionLabel: entry.actionLabel,
    actionUrl: entry.actionUrl,
    actionType: entry.actionType
  };
}

/**
 * High-intelligence search function:
 * 1. Stage 1: Direct exact / normalized suggestion mapping (100% guarantee for suggestions)
 * 2. Stage 2: Question & title containment
 * 3. Stage 3: Multi-keyword density & intent scoring
 */
export function searchKnowledgeBase(query: string, currentPathname?: string): SearchResult {
  const rawQuery = (query || '').trim();
  if (!rawQuery) {
    return {
      found: false,
      answer: DEFAULT_FALLBACK_ANSWER,
      followUpSuggestions: FALLBACK_TOPICS.slice(0, 5),
      actionLabel: 'โทรสายด่วน 063 920 4765',
      actionUrl: 'tel:0639204765',
      actionType: 'call'
    };
  }

  const compactQ = cleanThaiTokens(rawQuery);

  // -------------------------------------------------------------
  // STAGE 1: Direct Suggestion & Canonical Phrase Lookup
  // -------------------------------------------------------------
  if (PHRASE_INDEX[compactQ]) {
    return buildFoundResult(PHRASE_INDEX[compactQ]);
  }

  // Check if any registered suggestion phrase is contained in or contains the compact query
  for (const phrase in PHRASE_INDEX) {
    if (phrase.length >= 4 && (compactQ === phrase || compactQ.startsWith(phrase) || phrase.startsWith(compactQ))) {
      return buildFoundResult(PHRASE_INDEX[phrase]);
    }
  }

  // -------------------------------------------------------------
  // STAGE 2 & 3: Multi-Tier Intent & Keyword Scoring
  // -------------------------------------------------------------
  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of MOCK_KNOWLEDGE_BASE) {
    let score = 0;

    // A. Question matching
    for (const q of entry.questions) {
      const compactQuestion = cleanThaiTokens(q);
      if (compactQ === compactQuestion) {
        score += 120;
      } else if (compactQ.includes(compactQuestion)) {
        score += 80;
      } else if (compactQuestion.includes(compactQ) && compactQ.length >= 4) {
        score += 60;
      }
    }

    // B. Keyword matching (weighted by keyword specificity)
    for (const kw of entry.keywords) {
      const compactKw = cleanThaiTokens(kw);
      if (!compactKw) continue;

      if (compactQ === compactKw) {
        score += 50;
      } else if (compactQ.includes(compactKw)) {
        score += compactKw.length > 3 ? 20 + compactKw.length : 10;
      }
    }

    // C. Title & Category matching
    const compactTitle = cleanThaiTokens(entry.title);
    if (compactQ.includes(compactTitle) || compactTitle.includes(compactQ)) {
      score += 35;
    }

    const compactCat = cleanThaiTokens(entry.category);
    if (compactQ.includes(compactCat) || compactCat.includes(compactQ)) {
      score += 25;
    }

    // D. Domain intent rules
    if (entry.id === 'price-packages' && (compactQ.includes('ราคา') || compactQ.includes('กี่บาท') || compactQ.includes('แพ็กเกจ') || compactQ.includes('เท่าไหร่') || compactQ.includes('ค่าบริการ') || compactQ.includes('ค่าใช้จ่าย'))) {
      score += 45;
    }
    if (entry.id === 'dialysis-service' && (compactQ.includes('ฟอกไต') || compactQ.includes('ล้างไต') || compactQ.includes('ไตวาย') || compactQ.includes('ศูนย์ไต'))) {
      score += 50;
    }
    if (entry.id === 'chemo-service' && (compactQ.includes('คีโม') || compactQ.includes('เคมีบำบัด') || compactQ.includes('มะเร็ง') || compactQ.includes('ฉายแสง'))) {
      score += 50;
    }
    if (entry.id === 'wheelchair-support' && (compactQ.includes('รถเข็น') || compactQ.includes('วีลแชร์') || compactQ.includes('wheelchair') || compactQ.includes('เดินไม่ได้') || compactQ.includes('พยุง'))) {
      score += 45;
    }
    if (entry.id === 'coverage-area' && (compactQ.includes('ศรีราชา') || compactQ.includes('พัทยา') || compactQ.includes('บ้านบึง') || compactQ.includes('พานทอง') || compactQ.includes('พนัสนิคม') || compactQ.includes('บ่อทอง') || compactQ.includes('หนองใหญ่') || compactQ.includes('ชลบุรี') || compactQ.includes('แถวไหน') || compactQ.includes('พื้นที่'))) {
      score += 45;
    }
    if (entry.id === 'hospital-destinations' && (compactQ.includes('รพ') || compactQ.includes('โรงพยาบาล') || compactQ.includes('เอกชล') || compactQ.includes('สมเด็จ') || compactQ.includes('มบูรพา') || compactQ.includes('รพรัฐ'))) {
      score += 45;
    }
    if (entry.id === 'line-report' && (compactQ.includes('line') || compactQ.includes('ไลน์') || compactQ.includes('รายงาน') || compactQ.includes('ติดตาม') || compactQ.includes('ส่งรูป'))) {
      score += 45;
    }
    if (entry.id === 'preparation-guide' && (compactQ.includes('เตรียม') || compactQ.includes('เอกสาร') || compactQ.includes('ยา') || compactQ.includes('บัตรประชาชน'))) {
      score += 45;
    }
    if (entry.id === 'booking-method' && (compactQ.includes('จอง') || compactQ.includes('ติดต่อ') || compactQ.includes('เบอร์') || compactQ.includes('โทร') || compactQ.includes('สายด่วน') || compactQ.includes('ล่วงหน้า'))) {
      score += 45;
    }
    if (entry.id === 'caregiver-standard' && (compactQ.includes('ผู้ดูแล') || compactQ.includes('คนขับ') || compactQ.includes('อบรม') || compactQ.includes('ไว้ใจ') || compactQ.includes('cpr') || compactQ.includes('ปลอดภัย'))) {
      score += 45;
    }
    if (entry.id === 'service-hours' && (compactQ.includes('เวลา') || compactQ.includes('กี่โมง') || compactQ.includes('เสาร์') || compactQ.includes('อาทิตย์') || compactQ.includes('วันหยุด'))) {
      score += 45;
    }
    if (entry.id === 'payment-methods' && (compactQ.includes('ชำระ') || compactQ.includes('จ่ายเงิน') || compactQ.includes('โอนเงิน') || compactQ.includes('บัตรเครดิต'))) {
      score += 45;
    }
    if (entry.id === 'family-accompany' && (compactQ.includes('ญาติ') || compactQ.includes('ไปด้วย') || compactQ.includes('กี่คน') || compactQ.includes('ผู้ติดตาม'))) {
      score += 45;
    }
    if (entry.id === 'emergency-policy' && (compactQ.includes('ฉุกเฉิน') || compactQ.includes('1669') || compactQ.includes('รถกู้ชีพ'))) {
      score += 50;
    }
    if (entry.id === 'greetings' && (compactQ.includes('สวัสดี') || compactQ.includes('หวัดดี') || compactQ.includes('ดีครับ') || compactQ.includes('ดีค่ะ') || compactQ.includes('hello') || compactQ.includes('hi'))) {
      score += 50;
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // Threshold check: score >= 15 indicates a confident match
  if (bestEntry && bestScore >= 15) {
    return buildFoundResult(bestEntry);
  }

  // -------------------------------------------------------------
  // STAGE 4: Friendly Fallback with Guaranteed Suggestion Chips
  // -------------------------------------------------------------
  return {
    found: false,
    answer: DEFAULT_FALLBACK_ANSWER,
    followUpSuggestions: [
      'อัตราค่าบริการและแพ็กเกจมีอะไรบ้าง?',
      'มีบริการรับ-ส่งผู้ป่วยฟอกไตไหม?',
      'พื้นที่ให้บริการครอบคลุมที่ไหนบ้างในชลบุรี?',
      'ไปโรงพยาบาลรัฐหรือโรงพยาบาลอื่นนอกจากเอกชลได้ไหม?',
      'ต้องจองล่วงหน้ากี่วันและติดต่อช่องทางไหน?'
    ],
    actionLabel: 'โทรสายด่วน 063 920 4765',
    actionUrl: 'tel:0639204765',
    actionType: 'call'
  };
}
