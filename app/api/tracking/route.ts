import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// CR4: Server-side tracking event storage
// Stores all user interaction events for marketing analytics dashboard

interface TrackingEvent {
  id: string;
  event: string;
  timestamp: string;
  sessionId?: string;
  page?: string;
  data?: Record<string, unknown>;
  userAgent?: string;
  referrer?: string;
}

const dataDir = path.join(process.cwd(), 'data');
const eventsFile = path.join(dataDir, 'tracking_events.json');

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, '[]', 'utf-8');
}

export async function GET(req: Request) {
  try {
    ensureFile();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '500');
    const eventType = url.searchParams.get('event') || '';
    const from = url.searchParams.get('from') || '';
    const to = url.searchParams.get('to') || '';

    const raw = fs.readFileSync(eventsFile, 'utf-8');
    let events = JSON.parse(raw) as TrackingEvent[];

    if (eventType) events = events.filter((e) => e.event === eventType);
    if (from) events = events.filter((e) => e.timestamp >= from);
    if (to) events = events.filter((e) => e.timestamp <= to);

    // Compute summary metrics
    const total = events.length;
    const eventCounts: Record<string, number> = {};
    const dailyCounts: Record<string, number> = {};

    events.forEach((ev) => {
      eventCounts[ev.event] = (eventCounts[ev.event] || 0) + 1;
      const day = ev.timestamp.slice(0, 10);
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });

    return NextResponse.json({
      events: events.slice(0, limit),
      total,
      eventCounts,
      dailyCounts,
    });
  } catch {
    return NextResponse.json({ events: [], total: 0, eventCounts: {}, dailyCounts: {} });
  }
}

export async function POST(req: Request) {
  try {
    ensureFile();
    const body = await req.json() as Omit<TrackingEvent, 'id' | 'timestamp'>;

    if (!body.event) {
      return NextResponse.json({ error: 'event is required' }, { status: 400 });
    }

    const newEvent: TrackingEvent = {
      ...body,
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
    };

    const raw = fs.readFileSync(eventsFile, 'utf-8');
    const existing = JSON.parse(raw) as TrackingEvent[];
    existing.unshift(newEvent);

    // Keep last 5000 events
    if (existing.length > 5000) existing.length = 5000;
    fs.writeFileSync(eventsFile, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json({ success: true, id: newEvent.id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    ensureFile();
    fs.writeFileSync(eventsFile, '[]', 'utf-8');
    return NextResponse.json({ success: true, message: 'All events cleared' });
  } catch {
    return NextResponse.json({ error: 'Failed to clear events' }, { status: 500 });
  }
}

