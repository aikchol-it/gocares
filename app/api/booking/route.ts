import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface LeadData {
  id?: string;
  patientName: string;
  patientRelation: string;
  contactName: string;
  contactPhone: string;
  contactLineId?: string;
  district: string;
  hospital: string;
  isOtherHospital?: boolean;
  package: string;
  submittedAt: string;
}

const dataDir = path.join(process.cwd(), 'data');
const leadsFile = path.join(dataDir, 'leads.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(leadsFile)) {
    fs.writeFileSync(leadsFile, JSON.stringify([]), 'utf-8');
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  try {
    ensureDataFile();
    const content = fs.readFileSync(leadsFile, 'utf-8');
    const leads = JSON.parse(content) as LeadData[];
    return NextResponse.json({ leads }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ leads: [] }, { headers: corsHeaders });
  }
}

export async function POST(req: Request) {
  try {
    ensureDataFile();
    const body = (await req.json()) as LeadData;

    const leadWithId: LeadData = {
      ...body,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    const content = fs.readFileSync(leadsFile, 'utf-8');
    const existing = JSON.parse(content) as LeadData[];
    existing.unshift(leadWithId);

    // Keep last 500 leads
    if (existing.length > 500) existing.length = 500;

    fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json(
      {
        success: true,
        leadId: leadWithId.id,
        message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to record booking' },
      { status: 500, headers: corsHeaders }
    );
  }
}

