import type { Metadata } from 'next';
import { getSiteContent } from '../lib/site-content';
import V2Home from './V2Home';
import './v2.css';

export const metadata: Metadata = {
  title: 'GO CARES by AIKCHOL NEXT — ผู้ดูแลพาไปหาหมอ ระดับโรงพยาบาล',
  description:
    'ผู้ดูแลมืออาชีพจากโรงพยาบาลเอกชล ไปรับถึงบ้าน อยู่ข้าง ๆ ตลอดการรักษา และส่งรายงานให้ครอบครัวผ่าน LINE ครอบคลุม 8 อำเภอชลบุรี',
};

export default function V2Page() {
  return <V2Home content={getSiteContent()} />;
}
