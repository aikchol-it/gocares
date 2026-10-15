import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// CR5: Content Management API
// Supports create/update/publish/unpublish for marketing content and campaigns

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
  // Campaign-specific fields
  campaignStartDate?: string;
  campaignEndDate?: string;
  campaignTarget?: string;
  campaignObjective?: string;
  // Config-specific fields (pricing, contact info, etc.)
  configKey?: string;
  configValue?: string;
}

const dataDir = path.join(process.cwd(), 'data');
const contentFile = path.join(dataDir, 'content.json');

const DEFAULT_CONTENT: ContentItem[] = [
  {
    id: 'config_hotline',
    type: 'config',
    title: 'เบอร์โทรสายด่วน',
    body: '063 920 4765',
    status: 'published',
    configKey: 'hotlinePhone',
    configValue: '063 920 4765',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'config_line_oa',
    type: 'config',
    title: 'LINE Official Account',
    body: '@407eqbwl',
    status: 'published',
    configKey: 'lineOaId',
    configValue: '@407eqbwl',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'config_line_short',
    type: 'config',
    title: 'LINE OA Short URL',
    body: 'https://lin.ee/RbECVC5',
    status: 'published',
    configKey: 'lineOaShortUrl',
    configValue: 'https://lin.ee/RbECVC5',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'config_pkg1_price',
    type: 'config',
    title: 'ราคาแพ็กเกจ 1 (มาตรฐาน 4 ชม.)',
    body: '1,000',
    status: 'published',
    configKey: 'pkg1Price',
    configValue: '1,000',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'config_pkg2_price',
    type: 'config',
    title: 'ราคาแพ็กเกจ 2 (ผู้ดูแล + รถ)',
    body: '1,300',
    status: 'published',
    configKey: 'pkg2Price',
    configValue: '1,300',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'config_pkg3_price',
    type: 'config',
    title: 'ราคาแพ็กเกจ 3 (ทำกิจกรรม 6 ชม.)',
    body: '1,500',
    status: 'published',
    configKey: 'pkg3Price',
    configValue: '1,500',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'announce_001',
    type: 'announcement',
    title: 'แบนเนอร์ประชาสัมพันธ์หลัก',
    body: 'เปิดบริการทุกวันในเขตชลบุรี พร้อมรถรับ-ส่งถึงบ้าน',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Marketing',
    tags: ['banner', 'main'],
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

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: Request) {
  try {
    ensureFile();
    const body = await req.json() as Partial<ContentItem>;

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
    const body = await req.json() as Partial<ContentItem> & { id: string };

    if (!body.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
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

    // Handle status transitions
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

