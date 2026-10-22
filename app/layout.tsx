import type { Metadata } from 'next';
import ChatWidget from './components/chat-widget/ChatWidget';

export const metadata: Metadata = {
  metadataBase: new URL('https://gocares.aikcholnext.com'),
  title: 'GO CARES by AIKCHOL NEXT — บริการผู้ดูแลพาผู้สูงอายุไปโรงพยาบาล พร้อมรถรับ-ส่ง ชลบุรี | โรงพยาบาลเอกชล',
  description: 'บริการผู้ช่วยดูแลและพาผู้สูงอายุไปพบแพทย์ ตรวจสุขภาพ ฟอกไต ทำคีโม พร้อมรถรับ-ส่งถึงบ้าน ดูแลตลอดเวลาในโรงพยาบาล สรุปผลแพทย์ รายงานครอบครัวผ่าน LINE ตลอดเวลา โดยโรงพยาบาลเอกชล ชลบุรี',
  keywords: 'ผู้ดูแลผู้สูงอายุ, รถรับส่งผู้สูงอายุ, พาไปโรงพยาบาล, ชลบุรี, โรงพยาบาลเอกชล, ฟอกไต, เคมีบำบัด, Aikchol Next, GO CARES',
  openGraph: {
    title: 'GO CARES by AIKCHOL NEXT — สบายใจทั้งครอบครัว ผู้ดูแลพาไปหาหมอพร้อมรถรับ-ส่งถึงบ้าน',
    description: 'ให้คุณหมดห่วงเรื่องพาพ่อแม่ไปหาหมอ ผู้ดูแลมืออาชีพพร้อมรถรับส่งถึงบ้าน ดูแลตลอดเวลาในโรงพยาบาล สรุปผลแพทย์ส่งตรงถึงคุณผ่าน LINE',
    type: 'website',
    locale: 'th_TH',
    images: ['/assets/web1.png'],
  },
  icons: {
    icon: '/assets/aikchol_next_logo.webp',
    shortcut: '/assets/aikchol_next_logo.webp',
    apple: '/assets/aikchol_next_logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Noto+Sans+Thai+Looped:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
