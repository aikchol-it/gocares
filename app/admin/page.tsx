'use client';

import React, { useState, useEffect, useCallback } from 'react';
import '../globals.css';

/* ========================================================================
   TYPE DEFINITIONS
   ======================================================================== */
interface Lead {
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

interface ContentItem {
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

interface TrackingData {
  total: number;
  eventCounts: Record<string, number>;
  dailyCounts: Record<string, number>;
  events: Array<{
    id: string;
    event: string;
    timestamp: string;
    data?: Record<string, unknown>;
  }>;
}

type ActiveTab = 'leads' | 'content' | 'analytics' | 'campaigns';
type ContentModalMode = 'create' | 'edit' | null;

/* ========================================================================
   STYLE HELPERS
   ======================================================================== */
const STATUS_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  published: { bg: '#dcfce7', color: '#166534', label: '📢 เผยแพร่แล้ว' },
  draft: { bg: '#fef9c3', color: '#854d0e', label: '📝 ร่าง' },
  archived: { bg: '#f1f5f9', color: '#64748b', label: '🗄️ เก็บถาวร' },
};

const TYPE_LABEL: Record<string, string> = {
  announcement: '📣 ประกาศ',
  campaign: '🎯 แคมเปญ',
  faq: '❓ FAQ',
  pricing: '💰 ราคา',
  config: '⚙️ ตั้งค่าระบบ',
};

/* ========================================================================
   MAIN COMPONENT
   ======================================================================== */
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('leads');

  /* ---- Leads State ---- */
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  /* ---- Content State ---- */
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [contentFilter, setContentFilter] = useState<string>('');
  const [contentModal, setContentModal] = useState<ContentModalMode>(null);
  const [editingItem, setEditingItem] = useState<Partial<ContentItem> | null>(null);
  const [savingContent, setSavingContent] = useState(false);
  const [contentMsg, setContentMsg] = useState('');

  /* ---- Tracking/Analytics State ---- */
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  /* ---- Campaign State ---- */
  const [campaigns, setCampaigns] = useState<ContentItem[]>([]);

  /* ======================================================================
     DATA FETCHING
     ====================================================================== */
  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/booking');
      if (res.ok) {
        const data = (await res.json()) as { leads: Lead[] };
        setLeads(data.leads || []);
      }
    } catch {
      // silent
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  const fetchContent = useCallback(async () => {
    setLoadingContent(true);
    try {
      const url = contentFilter ? `/api/content?type=${contentFilter}` : '/api/content';
      const res = await fetch(url);
      if (res.ok) {
        const data = (await res.json()) as { items: ContentItem[] };
        setContentItems(data.items || []);
        setCampaigns((data.items || []).filter((i) => i.type === 'campaign'));
      }
    } catch {
      // silent
    } finally {
      setLoadingContent(false);
    }
  }, [contentFilter]);

  const fetchTracking = useCallback(async () => {
    setLoadingTracking(true);
    try {
      const res = await fetch('/api/tracking?limit=1000');
      if (res.ok) {
        const data = (await res.json()) as TrackingData;
        setTrackingData(data);
      }
    } catch {
      // silent
    } finally {
      setLoadingTracking(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    if (activeTab === 'content' || activeTab === 'campaigns') fetchContent();
    if (activeTab === 'analytics') fetchTracking();
  }, [activeTab, fetchContent, fetchTracking]);

  /* ======================================================================
     CONTENT CRUD
     ====================================================================== */
  const openCreateModal = (type: ContentItem['type'] = 'announcement') => {
    setEditingItem({ type, status: 'draft', body: '' });
    setContentModal('create');
  };

  const openEditModal = (item: ContentItem) => {
    setEditingItem({ ...item });
    setContentModal('edit');
  };

  const closeModal = () => {
    setContentModal(null);
    setEditingItem(null);
  };

  const handleSaveContent = async () => {
    if (!editingItem?.title) {
      setContentMsg('❌ กรุณาระบุชื่อเนื้อหา');
      return;
    }
    setSavingContent(true);
    try {
      const method = contentModal === 'edit' ? 'PUT' : 'POST';
      const res = await fetch('/api/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setContentMsg('✅ บันทึกเรียบร้อยแล้ว');
        closeModal();
        fetchContent();
      } else {
        setContentMsg('❌ บันทึกไม่สำเร็จ กรุณาลองใหม่');
      }
    } catch {
      setContentMsg('❌ เกิดข้อผิดพลาด');
    } finally {
      setSavingContent(false);
      setTimeout(() => setContentMsg(''), 3000);
    }
  };

  const handleStatusChange = async (item: ContentItem, newStatus: ContentItem['status']) => {
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, status: newStatus }),
      });
      fetchContent();
    } catch {
      // silent
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm('ต้องการลบเนื้อหานี้หรือไม่?')) return;
    try {
      await fetch(`/api/content?id=${id}`, { method: 'DELETE' });
      fetchContent();
    } catch {
      // silent
    }
  };

  /* ======================================================================
     LEADS EXPORT
     ====================================================================== */
  const exportLeadsToCsv = () => {
    if (!leads.length) return;
    const headers = ['ID', 'วันเวลาที่ส่ง', 'ชื่อผู้ป่วย', 'ความสัมพันธ์', 'ชื่อผู้ติดต่อ', 'เบอร์โทรศัพท์', 'LINE ID', 'อำเภอ', 'โรงพยาบาลปลายทาง', 'เลือกอื่นๆ หรือไม่', 'แพ็กเกจ'];
    const rows = leads.map((l) => [
      l.id || '',
      l.submittedAt || '',
      `"${l.patientName}"`,
      `"${l.patientRelation}"`,
      `"${l.contactName}"`,
      `"${l.contactPhone}"`,
      `"${l.contactLineId || '-'}"`,
      `"${l.district}"`,
      `"${l.hospital}"`,
      l.isOtherHospital ? 'ใช่' : 'ไม่ใช่',
      `"${l.package}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_gocares_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ======================================================================
     COMPUTED ANALYTICS
     ====================================================================== */
  const totalLeads = leads.length;
  const packageCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.package] = (acc[l.package] || 0) + 1;
    return acc;
  }, {});
  const districtCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.district] = (acc[l.district] || 0) + 1;
    return acc;
  }, {});
  const otherHospitalCount = leads.filter((l) => l.isOtherHospital).length;
  const hasLineIdCount = leads.filter((l) => l.contactLineId).length;

  const topEvents = trackingData
    ? Object.entries(trackingData.eventCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    : [];

  const recentDays = trackingData
    ? Object.entries(trackingData.dailyCounts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-14)
    : [];

  const maxDailyCount = recentDays.length ? Math.max(...recentDays.map((d) => d[1])) : 1;

  /* ======================================================================
     RENDER
     ====================================================================== */
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'var(--ahc-font-sans, sans-serif)', fontSize: '14px' }}>

      {/* ---- Top Navbar ---- */}
      <nav style={{ background: '#002e52', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/assets/aikchol_next_logo.webp" alt="Logo" style={{ height: '32px', background: '#fff', borderRadius: '6px', padding: '2px 6px' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '17px', fontWeight: 700 }}>GO CARES — Marketing Management &amp; Analytics</h1>
            <span style={{ fontSize: '11px', color: '#93c5fd' }}>ระบบจัดการเนื้อหา, แคมเปญ และวิเคราะห์การตลาด (CR Items 4 &amp; 5)</span>
          </div>
        </div>
        <a href="/" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px' }}>
          ← กลับหน้าเว็บไซต์
        </a>
      </nav>

      {/* ---- Main Container ---- */}
      <div style={{ maxWidth: '1300px', margin: '32px auto', padding: '0 20px' }}>

        {/* ---- Navigation Tabs ---- */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid #e2e8f0', marginBottom: '28px', flexWrap: 'wrap' }}>
          {([
            { id: 'leads', label: `📋 ข้อมูลลูกค้า (${totalLeads})` },
            { id: 'content', label: '✏️ จัดการเนื้อหา (CMS)' },
            { id: 'campaigns', label: '🎯 แคมเปญการตลาด' },
            { id: 'analytics', label: '📊 วิเคราะห์การตลาด' },
          ] as { id: ActiveTab; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 18px',
                border: 'none',
                background: 'none',
                fontWeight: 600,
                fontSize: '14px',
                color: activeTab === tab.id ? '#004680' : '#64748b',
                borderBottom: activeTab === tab.id ? '3px solid #004680' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================================
            TAB 1: LEADS
            ================================================================ */}
        {activeTab === 'leads' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680' }}>รายการจองบริการและประสานงานล่าสุด</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  ข้อมูลแยกชื่อผู้ป่วย, ชื่อผู้ติดต่อ, LINE ID และโรงพยาบาลตาม CR Item 1
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={fetchLeads} style={{ background: '#e2e8f0', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  🔄 รีเฟรช
                </button>
                <button type="button" onClick={exportLeadsToCsv} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  📥 ส่งออก CSV
                </button>
              </div>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                { label: 'Lead ทั้งหมด', value: totalLeads, color: '#004680' },
                { label: 'ระบุ LINE ID', value: hasLineIdCount, color: '#16a34a', sub: `${totalLeads ? ((hasLineIdCount / totalLeads) * 100).toFixed(0) : 0}%` },
                { label: 'รพ. อื่นๆ', value: otherHospitalCount, color: '#b45309', sub: `${totalLeads ? ((otherHospitalCount / totalLeads) * 100).toFixed(0) : 0}%` },
              ].map((kpi) => (
                <div key={kpi.label} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{kpi.label}</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                  {kpi.sub && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{kpi.sub}</div>}
                </div>
              ))}
            </div>

            {loadingLeads ? (
              <p>กำลังโหลดข้อมูล...</p>
            ) : leads.length === 0 ? (
              <div style={{ background: '#fff', padding: '48px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '16px' }}>ยังไม่มีข้อมูลการจองในระบบ</p>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '1.5px solid #cbd5e1', textAlign: 'left' }}>
                      {['เวลา', 'ผู้ป่วย', 'ผู้ติดต่อ / เบอร์', 'LINE ID', 'อำเภอ', 'โรงพยาบาล', 'แพ็กเกจ'].map((h) => (
                        <th key={h} style={{ padding: '12px 14px', fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr key={lead.id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '11px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>
                          {new Date(lead.submittedAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        <td style={{ padding: '11px 14px' }}>
                          <strong>{lead.patientName}</strong>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>({lead.patientRelation})</div>
                        </td>
                        <td style={{ padding: '11px 14px' }}>
                          <div>{lead.contactName}</div>
                          <a href={`tel:${lead.contactPhone}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>{lead.contactPhone}</a>
                        </td>
                        <td style={{ padding: '11px 14px', color: lead.contactLineId ? '#15803d' : '#94a3b8' }}>
                          {lead.contactLineId ? `🟢 ${lead.contactLineId}` : '—'}
                        </td>
                        <td style={{ padding: '11px 14px' }}>{lead.district}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <span>{lead.hospital}</span>
                          {lead.isOtherHospital && (
                            <span style={{ marginLeft: '6px', fontSize: '10px', background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                              ระบุอื่นๆ
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '11px 14px', fontWeight: 500, color: '#004680' }}>{lead.package}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            TAB 2: CONTENT CMS
            ================================================================ */}
        {activeTab === 'content' && (
          <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680' }}>จัดการเนื้อหาบนเว็บไซต์ (Content CMS)</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  Marketing สามารถเพิ่ม / แก้ไข / เผยแพร่ / ยกเลิก Content โดยไม่ต้องรอ IT
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <select
                  value={contentFilter}
                  onChange={(e) => setContentFilter(e.target.value)}
                  style={{ padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
                >
                  <option value="">ทุกประเภท</option>
                  <option value="announcement">📣 ประกาศ</option>
                  <option value="campaign">🎯 แคมเปญ</option>
                  <option value="faq">❓ FAQ</option>
                  <option value="config">⚙️ ตั้งค่า</option>
                </select>
                <button type="button" onClick={fetchContent} style={{ background: '#e2e8f0', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  🔄
                </button>
                <button type="button" onClick={() => openCreateModal('announcement')} style={{ background: '#004680', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  + เพิ่มเนื้อหาใหม่
                </button>
              </div>
            </div>

            {contentMsg && (
              <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', background: contentMsg.startsWith('✅') ? '#dcfce7' : '#fef2f2', color: contentMsg.startsWith('✅') ? '#166534' : '#dc2626', fontWeight: 600 }}>
                {contentMsg}
              </div>
            )}

            {loadingContent ? (
              <p>กำลังโหลดเนื้อหา...</p>
            ) : contentItems.length === 0 ? (
              <div style={{ background: '#fff', padding: '48px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b' }}>ยังไม่มีเนื้อหาในระบบ กด &quot;+ เพิ่มเนื้อหาใหม่&quot; เพื่อเริ่มต้น</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {contentItems.map((item) => {
                  const badge = STATUS_BADGE[item.status] || STATUS_BADGE.draft;
                  return (
                    <div key={item.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                            {TYPE_LABEL[item.type] || item.type}
                          </span>
                          <span style={{ fontSize: '12px', background: badge.bg, color: badge.color, padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                            {badge.label}
                          </span>
                          {item.tags?.map((t) => (
                            <span key={t} style={{ fontSize: '11px', background: '#eff6ff', color: '#1e40af', padding: '2px 6px', borderRadius: '4px' }}>#{t}</span>
                          ))}
                        </div>
                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{item.title}</h3>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as 'vertical' }}>
                          {item.body}
                        </p>
                        <div style={{ marginTop: '8px', fontSize: '11.5px', color: '#94a3b8', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          <span>สร้าง: {new Date(item.createdAt).toLocaleDateString('th-TH')}</span>
                          {item.publishedAt && <span>เผยแพร่: {new Date(item.publishedAt).toLocaleDateString('th-TH')}</span>}
                          {item.author && <span>โดย: {item.author}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
                        <button type="button" onClick={() => openEditModal(item)} style={{ background: '#f1f5f9', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                          ✏️ แก้ไข
                        </button>
                        {item.status !== 'published' && (
                          <button type="button" onClick={() => handleStatusChange(item, 'published')} style={{ background: '#dcfce7', color: '#166534', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                            📢 เผยแพร่
                          </button>
                        )}
                        {item.status === 'published' && (
                          <button type="button" onClick={() => handleStatusChange(item, 'draft')} style={{ background: '#fef9c3', color: '#854d0e', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                            ⏸ ยกเลิกการเผยแพร่
                          </button>
                        )}
                        {item.status !== 'archived' && (
                          <button type="button" onClick={() => handleStatusChange(item, 'archived')} style={{ background: '#f1f5f9', color: '#64748b', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                            🗄️ เก็บถาวร
                          </button>
                        )}
                        <button type="button" onClick={() => handleDeleteContent(item.id)} style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                          🗑️ ลบ
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            TAB 3: CAMPAIGNS
            ================================================================ */}
        {activeTab === 'campaigns' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680' }}>แคมเปญการตลาด (Campaign Management)</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  สร้างและติดตามแคมเปญ พร้อมกำหนด Objective, Target, และระยะเวลา
                </p>
              </div>
              <button type="button" onClick={() => openCreateModal('campaign')} style={{ background: '#004680', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                + สร้างแคมเปญใหม่
              </button>
            </div>

            {contentMsg && (
              <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', background: contentMsg.startsWith('✅') ? '#dcfce7' : '#fef2f2', color: contentMsg.startsWith('✅') ? '#166534' : '#dc2626', fontWeight: 600 }}>
                {contentMsg}
              </div>
            )}

            {campaigns.length === 0 ? (
              <div style={{ background: '#fff', padding: '48px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '16px' }}>ยังไม่มีแคมเปญในระบบ</p>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>กด &quot;+ สร้างแคมเปญใหม่&quot; เพื่อเริ่มต้น</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {campaigns.map((camp) => {
                  const badge = STATUS_BADGE[camp.status] || STATUS_BADGE.draft;
                  return (
                    <div key={camp.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '12px', background: badge.bg, color: badge.color, padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>{badge.label}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button type="button" onClick={() => openEditModal(camp)} style={{ background: 'none', border: '1.5px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                            ✏️
                          </button>
                          <button type="button" onClick={() => handleDeleteContent(camp.id)} style={{ background: 'none', border: '1.5px solid #fecaca', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                            🗑️
                          </button>
                        </div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{camp.title}</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{camp.body}</p>
                      {(camp.campaignObjective || camp.campaignTarget) && (
                        <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {camp.campaignObjective && (
                            <div style={{ fontSize: '12.5px', color: '#334155' }}>
                              <strong style={{ color: '#004680' }}>Objective:</strong> {camp.campaignObjective}
                            </div>
                          )}
                          {camp.campaignTarget && (
                            <div style={{ fontSize: '12.5px', color: '#334155' }}>
                              <strong style={{ color: '#004680' }}>Target:</strong> {camp.campaignTarget}
                            </div>
                          )}
                        </div>
                      )}
                      {(camp.campaignStartDate || camp.campaignEndDate) && (
                        <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                          {camp.campaignStartDate && <span>📅 เริ่ม: {camp.campaignStartDate}</span>}
                          {camp.campaignEndDate && <span>📅 สิ้นสุด: {camp.campaignEndDate}</span>}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                        {camp.status !== 'published' && (
                          <button type="button" onClick={() => handleStatusChange(camp, 'published')} style={{ flex: 1, background: '#dcfce7', color: '#166534', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                            📢 เปิดแคมเปญ
                          </button>
                        )}
                        {camp.status === 'published' && (
                          <button type="button" onClick={() => handleStatusChange(camp, 'archived')} style={{ flex: 1, background: '#f1f5f9', color: '#64748b', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                            ⏹ ปิดแคมเปญ
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            TAB 4: ANALYTICS DASHBOARD
            ================================================================ */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680' }}>วิเคราะห์พฤติกรรมผู้ใช้งาน (Marketing Analytics)</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  ข้อมูล Tracking Events จาก dataLayer — วิเคราะห์ Content &amp; Campaign Performance
                </p>
              </div>
              <button type="button" onClick={fetchTracking} style={{ background: '#e2e8f0', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                🔄 รีเฟรช
              </button>
            </div>

            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Lead ทั้งหมด', value: totalLeads, color: '#004680', sub: 'ส่งต่อ LINE OA 100%' },
                { label: 'Event รวม (Tracking)', value: trackingData?.total || 0, color: '#7c3aed', sub: 'จาก dataLayer' },
                { label: 'Lead มี LINE ID', value: hasLineIdCount, color: '#16a34a', sub: `${totalLeads ? ((hasLineIdCount / totalLeads) * 100).toFixed(1) : 0}% ของ Lead ทั้งหมด` },
                { label: 'เลือก รพ. อื่นๆ', value: otherHospitalCount, color: '#b45309', sub: `${totalLeads ? ((otherHospitalCount / totalLeads) * 100).toFixed(1) : 0}% ของ Lead ทั้งหมด` },
              ].map((kpi) => (
                <div key={kpi.label} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{kpi.label}</div>
                  <div style={{ fontSize: '30px', fontWeight: 700, color: kpi.color, margin: '4px 0' }}>{kpi.value}</div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* 2-col layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>

              {/* Package Distribution */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
                <h4 style={{ margin: '0 0 16px', fontSize: '15px', color: '#004680' }}>📦 แพ็กเกจที่เลือกมากที่สุด</h4>
                {Object.keys(packageCounts).length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>ยังไม่มีข้อมูล</p>
                ) : (
                  Object.entries(packageCounts).sort((a, b) => b[1] - a[1]).map(([pkg, count]) => (
                    <div key={pkg} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{pkg}</span>
                        <strong>{count} เคส ({((count / totalLeads) * 100).toFixed(0)}%)</strong>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${(count / totalLeads) * 100}%`, height: '100%', background: '#0284c7', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* District Distribution */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
                <h4 style={{ margin: '0 0 16px', fontSize: '15px', color: '#004680' }}>📍 อำเภอที่ใช้บริการมากที่สุด</h4>
                {Object.keys(districtCounts).length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>ยังไม่มีข้อมูล</p>
                ) : (
                  Object.entries(districtCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([district, count]) => (
                    <div key={district} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                        <span>{district}</span>
                        <strong>{count}</strong>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${(count / Math.max(...Object.values(districtCounts))) * 100}%`, height: '100%', background: '#2DCCD3', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Top Tracking Events */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
                <h4 style={{ margin: '0 0 16px', fontSize: '15px', color: '#004680' }}>🎯 Tracking Events ที่เกิดขึ้นบ่อย</h4>
                {loadingTracking ? (
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>กำลังโหลด...</p>
                ) : topEvents.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>ยังไม่มี event ถูกบันทึก</p>
                ) : (
                  topEvents.map(([event, count]) => (
                    <div key={event} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                      <code style={{ fontSize: '12px', background: '#f8fafc', padding: '2px 8px', borderRadius: '4px', color: '#334155' }}>{event}</code>
                      <span style={{ fontWeight: 600, color: '#004680' }}>{count}x</span>
                    </div>
                  ))
                )}
              </div>

              {/* Daily Activity Chart */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
                <h4 style={{ margin: '0 0 16px', fontSize: '15px', color: '#004680' }}>📈 กิจกรรมรายวัน (14 วันล่าสุด)</h4>
                {recentDays.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>ยังไม่มีข้อมูล</p>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px', padding: '0 4px' }}>
                    {recentDays.map(([day, count]) => (
                      <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                        <div
                          title={`${day}: ${count} events`}
                          style={{
                            width: '100%',
                            height: `${Math.max(8, (count / maxDailyCount) * 80)}px`,
                            background: '#0284c7',
                            borderRadius: '3px 3px 0 0',
                            cursor: 'default',
                          }}
                        />
                        <span style={{ fontSize: '9px', color: '#94a3b8', transform: 'rotate(-45deg)', transformOrigin: 'top right', whiteSpace: 'nowrap' }}>
                          {day.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* GTM / Tracking Setup Guide */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px dashed #cbd5e1', padding: '24px', gridColumn: 'span 2' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#004680' }}>⚙️ Tracking Setup Guide (CR Item 4)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '13px', color: '#334155' }}>
                  <div>
                    <strong style={{ color: '#004680', display: 'block', marginBottom: '8px' }}>📌 Events ที่ระบบ Track อยู่แล้ว:</strong>
                    <ul style={{ margin: 0, paddingLeft: '16px', lineHeight: 2 }}>
                      <li><code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>lead_form_submitted</code> — ส่งฟอร์มจองบริการ</li>
                      <li><code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>booking_modal_open</code> — เปิด Booking Modal</li>
                      <li><code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>ai_search_open</code> — เปิด AI Search</li>
                      <li><code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>ai_search_query</code> — พิมพ์ค้นหา</li>
                      <li><code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>line_oa_click</code> — คลิก LINE OA</li>
                      <li><code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>phone_call_click</code> — คลิกโทรสายด่วน</li>
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: '#004680', display: 'block', marginBottom: '8px' }}>🔧 การเชื่อมต่อ GTM / GA4:</strong>
                    <ol style={{ margin: 0, paddingLeft: '16px', lineHeight: 2 }}>
                      <li>ติดตั้ง Google Tag Manager (GTM) ใน layout.tsx</li>
                      <li>สร้าง Trigger ใน GTM ตาม event names ด้านซ้าย</li>
                      <li>เชื่อม GA4 Events ผ่าน GTM Configuration Tag</li>
                      <li>ข้อมูลพร้อม Pass ผ่าน <code style={{ fontSize: '11px', background: '#f8fafc', padding: '1px 5px', borderRadius: '3px' }}>window.dataLayer</code></li>
                    </ol>
                    <div style={{ marginTop: '12px', padding: '10px', background: '#fef9c3', borderRadius: '8px', fontSize: '12px', color: '#854d0e' }}>
                      💡 Marketing ควรกำหนด Objective / Event / Data ที่ต้องการก่อน IT implement
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ================================================================
          CONTENT / CAMPAIGN EDIT MODAL
          ================================================================ */}
      {contentModal && editingItem && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,45,84,0.7)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={closeModal}
        >
          <div
            style={{ background: '#fff', borderRadius: '20px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,45,84,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ background: '#004680', color: '#fff', padding: '20px 24px', borderRadius: '20px 20px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '17px' }}>
                {contentModal === 'create' ? '+ เพิ่มเนื้อหาใหม่' : '✏️ แก้ไขเนื้อหา'}
              </h3>
              <button type="button" onClick={closeModal} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Type */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#334155' }}>ประเภทเนื้อหา:</label>
                <select
                  value={editingItem.type || 'announcement'}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as ContentItem['type'] })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                >
                  <option value="announcement">📣 ประกาศ</option>
                  <option value="campaign">🎯 แคมเปญการตลาด</option>
                  <option value="faq">❓ FAQ / คำถามที่พบบ่อย</option>
                  <option value="config">⚙️ ตั้งค่าระบบ (ราคา / ติดต่อ)</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#334155' }}>
                  ชื่อ / หัวข้อ: <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="ชื่อเนื้อหาหรือแคมเปญ"
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Body */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#334155' }}>เนื้อหา / รายละเอียด:</label>
                <textarea
                  value={editingItem.body || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, body: e.target.value })}
                  placeholder="รายละเอียดเนื้อหา..."
                  rows={4}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              {/* Campaign-specific fields */}
              {editingItem.type === 'campaign' && (
                <>
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <strong style={{ fontSize: '13px', color: '#004680' }}>🎯 ข้อมูลแคมเปญ (Campaign Details):</strong>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#64748b' }}>Objective (วัตถุประสงค์):</label>
                      <input
                        type="text"
                        value={editingItem.campaignObjective || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, campaignObjective: e.target.value })}
                        placeholder="เช่น เพิ่ม Lead จากกลุ่มผู้ดูแลผู้ป่วยฟอกไต"
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#64748b' }}>Target Audience:</label>
                      <input
                        type="text"
                        value={editingItem.campaignTarget || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, campaignTarget: e.target.value })}
                        placeholder="เช่น ลูกหลานอายุ 30-50 ปีในชลบุรี"
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#64748b' }}>วันเริ่มต้น:</label>
                        <input
                          type="date"
                          value={editingItem.campaignStartDate || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, campaignStartDate: e.target.value })}
                          style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#64748b' }}>วันสิ้นสุด:</label>
                        <input
                          type="date"
                          value={editingItem.campaignEndDate || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, campaignEndDate: e.target.value })}
                          style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Config-specific fields */}
              {editingItem.type === 'config' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#64748b' }}>Config Key:</label>
                    <input
                      type="text"
                      value={editingItem.configKey || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, configKey: e.target.value })}
                      placeholder="เช่น hotlinePhone"
                      style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#64748b' }}>Config Value:</label>
                    <input
                      type="text"
                      value={editingItem.configValue || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, configValue: e.target.value })}
                      placeholder="เช่น 063 920 4765"
                      style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                    />
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#334155' }}>สถานะการเผยแพร่:</label>
                <select
                  value={editingItem.status || 'draft'}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as ContentItem['status'] })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                >
                  <option value="draft">📝 ร่าง (Draft) — ยังไม่เผยแพร่</option>
                  <option value="published">📢 เผยแพร่ (Published) — แสดงผลแล้ว</option>
                  <option value="archived">🗄️ เก็บถาวร (Archived) — ปิดใช้งาน</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#334155' }}>ผู้สร้าง (Author):</label>
                <input
                  type="text"
                  value={editingItem.author || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                  placeholder="ชื่อผู้สร้างเนื้อหา"
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                <button type="button" onClick={closeModal} style={{ flex: 1, padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', background: '#fff', color: '#64748b' }}>
                  ยกเลิก
                </button>
                <button type="button" onClick={handleSaveContent} disabled={savingContent} style={{ flex: 2, padding: '12px', background: '#004680', color: '#fff', border: 'none', borderRadius: '8px', cursor: savingContent ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 600, opacity: savingContent ? 0.7 : 1 }}>
                  {savingContent ? 'กำลังบันทึก...' : contentModal === 'create' ? '+ บันทึกเนื้อหา' : '💾 บันทึกการแก้ไข'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
