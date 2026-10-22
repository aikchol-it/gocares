import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSiteContent, saveSiteContent, SiteContent } from '@/app/lib/site-content';

// CR5: Content Management API
// Supports:
// 1. Live site content (menus, hero, texts, images, pricing)
// 2. Marketing announcements & campaigns

export interface ContentItem {
  id: string;
  type: 'announcement' | 'campaign' | 'faq' | 'pricing' | 'config';
  title: string;
  body: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  tags?: string[];
  campaignStartDate?: string;
  campaignEndDate?: string;
  campaignTarget?: string;
  campaignObjective?: string;
  configKey?: string;
  configValue?: string;
}

const dataDir = path.join(process.cwd(), 'data');
const contentFile = path.join(dataDir, 'content.json');

const DEFAULT_CONTENT: ContentItem[] = [
  {
    id: 'announce_001',
    type: 'announcement',
    title: 'แบนเนอร์ประชาสัมพันธ์หลัก',
    body: 'เปิดบริการทุกวันในเขตชลบุรี พร้อมรถรับ-ส่งถึงบ้าน ติดต่อได้ 24 ชม.',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Marketing',
    tags: ['banner', 'main'],
  },
  {
    id: 'campaign_001',
    type: 'campaign',
    title: 'แคมเปญเปิดตัว GO CARES ชลบุรี',
    body: 'ส่วนลดพิเศษสำหรับผู้ใช้บริการครั้งแรกในเขตอำเภอเมืองและศรีราชา',
    status: 'published',
    campaignStartDate: '2026-10-01',
    campaignEndDate: '2026-12-31',
    campaignTarget: 'ครอบครัวที่มีผู้สูงอายุ',
    campaignObjective: 'สร้างการรับรู้และทดลองใช้งาน',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Marketing',
    tags: ['promotion', 'launch'],
  },
];

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(contentFile)) {
    fs.writeFileSync(contentFile, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf-8');
  }
}

export async function GET(req: Request) {
  try {
    ensureFile();
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || '';
    const status = url.searchParams.get('status') || '';

    const raw = fs.readFileSync(contentFile, 'utf-8');
    let items = JSON.parse(raw) as ContentItem[];

    if (type) items = items.filter((i) => i.type === type);
    if (status) items = items.filter((i) => i.status === status);

    const siteContent = getSiteContent();

    return NextResponse.json({
      siteContent,
      items,
    });
  } catch {
    return NextResponse.json({ siteContent: getSiteContent(), items: [] });
  }
}

export async function POST(req: Request) {
  try {
    ensureFile();
    const body = (await req.json()) as Partial<ContentItem> & { siteContent?: SiteContent };

    // If updating siteContent directly via POST
    if (body.siteContent) {
      saveSiteContent(body.siteContent);
      return NextResponse.json({
        success: true,
        siteContent: getSiteContent(),
        message: 'บันทึกข้อมูลเนื้อหาเว็บไซต์เรียบร้อยแล้ว',
      });
    }

    if (!body.title || !body.type) {
      return NextResponse.json({ error: 'title and type are required' }, { status: 400 });
    }

    const newItem: ContentItem = {
      id: `${body.type}_${Date.now()}`,
      type: body.type,
      title: body.title,
      body: body.body || '',
      status: body.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: body.author,
      tags: body.tags,
      campaignStartDate: body.campaignStartDate,
      campaignEndDate: body.campaignEndDate,
      campaignTarget: body.campaignTarget,
      campaignObjective: body.campaignObjective,
      configKey: body.configKey,
      configValue: body.configValue,
    };

    if (newItem.status === 'published') {
      newItem.publishedAt = new Date().toISOString();
    }

    const raw = fs.readFileSync(contentFile, 'utf-8');
    const existing = JSON.parse(raw) as ContentItem[];
    existing.unshift(newItem);
    fs.writeFileSync(contentFile, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json({ success: true, item: newItem });
  } catch {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    ensureFile();
    const body = (await req.json()) as { siteContent?: SiteContent } & Partial<ContentItem> & {
      id?: string;
    };

    // If updating site content (menus, hero, texts, images, pricing)
    if (body.siteContent) {
      saveSiteContent(body.siteContent);
      return NextResponse.json({
        success: true,
        siteContent: getSiteContent(),
        message: 'อัปเดตข้อมูลเว็บไซต์เรียบร้อยแล้ว',
      });
    }

    if (!body.id) {
      return NextResponse.json({ error: 'id or siteContent is required' }, { status: 400 });
    }

    const raw = fs.readFileSync(contentFile, 'utf-8');
    const existing = JSON.parse(raw) as ContentItem[];
    const idx = existing.findIndex((i) => i.id === body.id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const updated: ContentItem = {
      ...existing[idx],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    if (body.status === 'published' && !updated.publishedAt) {
      updated.publishedAt = new Date().toISOString();
    }
    if (body.status === 'archived' && !updated.archivedAt) {
      updated.archivedAt = new Date().toISOString();
    }

    existing[idx] = updated;
    fs.writeFileSync(contentFile, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json({ success: true, item: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    ensureFile();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const raw = fs.readFileSync(contentFile, 'utf-8');
    const existing = JSON.parse(raw) as ContentItem[];
    const filtered = existing.filter((i) => i.id !== id);
    fs.writeFileSync(contentFile, JSON.stringify(filtered, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
