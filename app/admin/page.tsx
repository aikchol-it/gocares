'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../globals.css';
import {
  SiteContent,
  DEFAULT_SITE_CONTENT,
  SiteMenu,
  SiteAppointmentItem,
} from '@/app/lib/site-content-types';
import {
  Menu,
  FileText,
  Image as ImageIcon,
  Users,
  Megaphone,
  BarChart3,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Upload,
  Check,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';

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

type ActiveTab = 'site-text' | 'site-menu' | 'site-media' | 'leads' | 'campaigns' | 'analytics';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('site-text');

  /* ---- Site Content State (Live on Homepage) ---- */
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loadingSiteContent, setLoadingSiteContent] = useState(true);
  const [savingSiteContent, setSavingSiteContent] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  /* ---- Media Assets State ---- */
  type UploadTargetSection =
    | 'logo'
    | 'heroPoster'
    | 'videoPoster'
    | 'mapImage'
    | 'reportMockup'
    | 'moment'
    | 'persona'
    | 'serviceStep'
    | 'appointment';

  const [availableAssets, setAvailableAssets] = useState<string[]>([]);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadTarget, setCurrentUploadTarget] = useState<{
    section: UploadTargetSection;
    index?: number;
  } | null>(null);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'brand' | 'moments' | 'personas' | 'steps' | 'appointments'>('all');

  /* ---- Leads State ---- */
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  /* ---- Campaigns State ---- */
  const [campaigns, setCampaigns] = useState<ContentItem[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Partial<ContentItem> | null>(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  /* ---- Tracking State ---- */
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  const getApiUrl = (endpoint: string) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${basePath}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  };

  const getAssetUrl = (url?: string) => {
    if (!url) return '/assets/aikchol_next_logo.webp';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    let clean = url.replace(/^\/+/, '');
    if (!clean.startsWith('assets/')) {
      clean = `assets/${clean}`;
    }
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${basePath}/${clean}`;
  };

  /* ======================================================================
     FETCH INITIAL DATA
     ====================================================================== */
  const fetchSiteData = useCallback(async () => {
    setLoadingSiteContent(true);
    try {
      const res = await fetch(getApiUrl('/api/content'));
      if (res.ok) {
        const data = await res.json();
        if (data.siteContent) {
          setSiteContent(data.siteContent);
        }
        if (data.items) {
          setCampaigns(data.items.filter((i: ContentItem) => i.type === 'campaign'));
        }
      }
    } catch (err) {
      console.error('Failed to load site content:', err);
    } finally {
      setLoadingSiteContent(false);
    }
  }, []);

  const fetchAssetsList = useCallback(async () => {
    try {
      const res = await fetch(getApiUrl('/api/upload'));
      if (res.ok) {
        const data = await res.json();
        if (data.assets) setAvailableAssets(data.assets);
      }
    } catch {
      // silent
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch(getApiUrl('/api/booking'));
      if (res.ok) {
        const data = await res.json();
        if (data.leads) setLeads(data.leads);
      }
    } catch {
      // silent
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  const fetchTracking = useCallback(async () => {
    setLoadingTracking(true);
    try {
      const res = await fetch(getApiUrl('/api/tracking?limit=1000'));
      if (res.ok) {
        const data = await res.json();
        setTrackingData(data);
      }
    } catch {
      // silent
    } finally {
      setLoadingTracking(false);
    }
  }, []);

  useEffect(() => {
    fetchSiteData();
    fetchAssetsList();
    fetchLeads();
    fetchTracking();
  }, [fetchSiteData, fetchAssetsList, fetchLeads, fetchTracking]);

  /* ======================================================================
     SAVE SITE CONTENT TO API & DISK
     ====================================================================== */
  const handleSaveSiteContent = async () => {
    setSavingSiteContent(true);
    setSaveStatus(null);
    try {
      const res = await fetch(getApiUrl('/api/content'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteContent }),
      });
      if (res.ok) {
        setSaveStatus({
          type: 'success',
          text: '✅ บันทึกข้อมูลและอัปเดตหน้าเว็บไซต์จริงเรียบร้อยแล้ว!',
        });
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      setSaveStatus({
        type: 'error',
        text: '❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง',
      });
    } finally {
      setSavingSiteContent(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('คุณต้องการรีเซ็ตข้อความและเมนูกลับเป็นค่าเริ่มต้นของระบบใช่หรือไม่?')) {
      setSiteContent(DEFAULT_SITE_CONTENT);
      setSaveStatus({
        type: 'success',
        text: 'รีเซ็ตกลับเป็นค่าเริ่มต้นแล้ว (อย่าลืมกดปุ่มบันทึกเพื่อใช้งานจริง)',
      });
    }
  };

  /* ======================================================================
     IMAGE UPLOAD HANDLER
     ====================================================================== */
  const triggerImageUpload = (
    section: UploadTargetSection,
    index?: number
  ) => {
    setCurrentUploadTarget({ section, index });
    fileInputRef.current?.click();
  };

  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      // If already webp or svg, no conversion needed
      if (file.type === 'image/webp' || file.type === 'image/svg+xml') {
        resolve(file);
        return;
      }
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }
              const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
              const webpFile = new File([blob], `${baseName}.webp`, { type: 'image/webp' });
              resolve(webpFile);
            },
            'image/webp',
            0.88
          );
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(file);
        };
        img.src = objectUrl;
      } catch {
        resolve(file);
      }
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile || !currentUploadTarget) return;

    setUploadingFor(currentUploadTarget.section);

    // Convert JPG / PNG to WebP in browser
    const file = await convertToWebP(rawFile);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(getApiUrl('/api/upload'), {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const uploadedUrl = data.url;

        // Add to available assets list
        setAvailableAssets((prev) => [uploadedUrl, ...prev.filter((a) => a !== uploadedUrl)]);

        // Assign to siteContent
        setSiteContent((prev) => {
          const next = { ...prev };
          if (currentUploadTarget.section === 'logo') {
            next.images.logo = uploadedUrl;
          } else if (currentUploadTarget.section === 'heroPoster') {
            next.images.heroPoster = uploadedUrl;
          } else if (currentUploadTarget.section === 'videoPoster') {
            next.images.videoPoster = uploadedUrl;
          } else if (currentUploadTarget.section === 'mapImage') {
            next.images.mapImage = uploadedUrl;
          } else if (currentUploadTarget.section === 'reportMockup') {
            next.images.reportMockup = uploadedUrl;
          } else if (
            currentUploadTarget.section === 'moment' &&
            currentUploadTarget.index !== undefined &&
            next.moments?.[currentUploadTarget.index]
          ) {
            next.moments[currentUploadTarget.index].image = uploadedUrl;
          } else if (
            currentUploadTarget.section === 'persona' &&
            currentUploadTarget.index !== undefined &&
            next.personas?.[currentUploadTarget.index]
          ) {
            next.personas[currentUploadTarget.index].image = uploadedUrl;
          } else if (
            currentUploadTarget.section === 'serviceStep' &&
            currentUploadTarget.index !== undefined &&
            next.serviceSteps?.[currentUploadTarget.index]
          ) {
            next.serviceSteps[currentUploadTarget.index].image = uploadedUrl;
          } else if (
            currentUploadTarget.section === 'appointment' &&
            currentUploadTarget.index !== undefined &&
            next.appointments?.[currentUploadTarget.index]
          ) {
            next.appointments[currentUploadTarget.index].image = uploadedUrl;
          }
          return next;
        });

        const wasConverted = !rawFile.name.endsWith('.webp') && !rawFile.name.endsWith('.svg');
        setSaveStatus({
          type: 'success',
          text: wasConverted
            ? `⚡ แปลงไฟล์เป็น .webp และอัปโหลดสำเร็จ (${data.filename}) กดบันทึกเพื่อแสดงผลบนหน้าเว็บ`
            : `✅ อัปโหลดรูปภาพสำเร็จ (${data.filename}) กดบันทึกเพื่อแสดงผลบนหน้าเว็บ`,
        });
      } else {
        alert('อัปโหลดไฟล์ไม่สำเร็จ กรุณาใช้ไฟล์รูปภาพ PNG, JPG, WebP หรือ SVG');
      }
    } catch {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่ออัปโหลดรูปภาพ');
    } finally {
      setUploadingFor(null);
      setCurrentUploadTarget(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  /* ======================================================================
     MENU OPERATIONS
     ====================================================================== */
  const handleAddMenu = () => {
    const newMenu: SiteMenu = {
      id: `menu_${Date.now()}`,
      label: 'เมนูใหม่',
      href: '#',
    };
    setSiteContent((prev) => ({
      ...prev,
      menus: [...prev.menus, newMenu],
    }));
  };

  const handleUpdateMenu = (id: string, field: 'label' | 'href', value: string) => {
    setSiteContent((prev) => ({
      ...prev,
      menus: prev.menus.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }));
  };

  const handleDeleteMenu = (id: string) => {
    if (confirm('คุณต้องการลบเมนูนี้ใช่หรือไม่?')) {
      setSiteContent((prev) => ({
        ...prev,
        menus: prev.menus.filter((m) => m.id !== id),
      }));
    }
  };

  const handleMoveMenu = (index: number, direction: 'up' | 'down') => {
    setSiteContent((prev) => {
      const menus = [...prev.menus];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= menus.length) return prev;
      const temp = menus[index];
      menus[index] = menus[targetIndex];
      menus[targetIndex] = temp;
      return { ...prev, menus };
    });
  };

  /* ======================================================================
     RENDER
     ====================================================================== */
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'inherit', fontSize: '14px' }}>
      {/* Hidden file input for media uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        style={{ display: 'none' }}
      />

      {/* Sticky Header Container: Top Brand Bar + Navigation Tabs */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#002e52',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Top Navbar */}
        <div
          style={{
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src={getAssetUrl(siteContent.images.logo)}
              alt="Logo"
              style={{ height: '36px', background: '#fff', borderRadius: '8px', padding: '4px 8px' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#fff' }}>
                  GO CARES — Management &amp; Marketing Console
                </h1>
                <span style={{ fontSize: '11px', background: '#2DCCD3', color: '#002d54', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                  Live Editor
                </span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#93c5fd' }}>
                ระบบแก้ไขเมนู, ข้อความ, รูปภาพ, ข้อมูลการจอง และวิเคราะห์การตลาด
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: 500,
              }}
            >
              <span>ดูหน้าเว็บจริง</span>
              <ExternalLink size={14} />
            </a>

            <button
              type="button"
              onClick={handleSaveSiteContent}
              disabled={savingSiteContent}
              style={{
                background: '#2DCCD3',
                color: '#002d54',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: savingSiteContent ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(45, 204, 211, 0.4)',
              }}
            >
              <Save size={15} />
              <span>{savingSiteContent ? 'กำลังบันทึก...' : 'บันทึกขึ้นหน้าเว็บ'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navbar: Navigation Tabs (Stick together with header!) */}
        <div
          style={{
            background: '#002542',
            padding: '0 24px',
            display: 'flex',
            gap: '4px',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'site-text', label: '📝 แก้ไขเนื้อหา & ข้อความ', icon: FileText },
            { id: 'site-menu', label: '🧭 จัดการเมนูนำทาง', icon: Menu },
            { id: 'site-media', label: '🖼️ จัดการรูปภาพ (Media)', icon: ImageIcon },
            { id: 'leads', label: `📋 ข้อมูลลูกค้า (${leads.length})`, icon: Users },
            { id: 'campaigns', label: '🎯 แคมเปญ & ประกาศ', icon: Megaphone },
            { id: 'analytics', label: '📊 วิเคราะห์การตลาด', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                style={{
                  padding: '11px 16px',
                  border: 'none',
                  background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '13.5px',
                  color: isActive ? '#2DCCD3' : '#94a3b8',
                  borderBottom: isActive ? '3px solid #2DCCD3' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={16} color={isActive ? '#2DCCD3' : '#94a3b8'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Save Status Notification Banner */}
      {saveStatus && (
        <div
          style={{
            background: saveStatus.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: saveStatus.type === 'success' ? '#166534' : '#991b1b',
            padding: '12px 24px',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '14px',
            borderBottom: `1px solid ${saveStatus.type === 'success' ? '#86efac' : '#fca5a5'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {saveStatus.type === 'success' ? <Check size={18} /> : <RotateCcw size={18} />}
          <span>{saveStatus.text}</span>
        </div>
      )}

      {/* Main Container */}
      <div style={{ maxWidth: '1300px', margin: '24px auto', padding: '0 20px' }}>


        {/* ================================================================
            TAB 1: SITE TEXT & HEADINGS EDITOR
            ================================================================ */}
        {activeTab === 'site-text' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680', fontWeight: 700 }}>
                  แก้ไขข้อความหน้าแรก (Hero, ติดต่อ, และราคา)
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  แก้ไขข้อความแล้วกด &quot;บันทึกขึ้นหน้าเว็บ&quot; ข้อมูลจะปรากฏบนหน้าเว็บไซต์จริงทันที
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <RotateCcw size={14} />
                  <span>รีเซ็ตเริ่มต้น</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveSiteContent}
                  disabled={savingSiteContent}
                  style={{ background: '#004680', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={14} />
                  <span>{savingSiteContent ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</span>
                </button>
              </div>
            </div>

            {/* Hero Section Card */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <Sparkles size={18} color="#2DCCD3" />
                <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                  1. ส่วนหัวเว็บไซต์ (Hero Section)
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    ข้อความ Eyebrow / Kicker Tag
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero.kicker}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, kicker: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    ข้อความพาดหัวหลัก (Headline บรรทัด 1)
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero.headline}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, headline: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    ข้อความพาดหัวรองเน้นสี (Headline Accent บรรทัด 2)
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero.headlineAccent}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, headlineAccent: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Bullet points */}
              <div style={{ marginTop: '18px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '13px' }}>
                  จุดเด่นบริการ 3 ข้อ (Hero Feature Bullets)
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    value={siteContent.hero.bullet1}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, bullet1: e.target.value } })}
                    placeholder="จุดเด่นข้อที่ 1"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                  <input
                    type="text"
                    value={siteContent.hero.bullet2}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, bullet2: e.target.value } })}
                    placeholder="จุดเด่นข้อที่ 2"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                  <input
                    type="text"
                    value={siteContent.hero.bullet3}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, bullet3: e.target.value } })}
                    placeholder="จุดเด่นข้อที่ 3"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              {/* Button text */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    ข้อความปุ่มจอง (Book Button)
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero.bookBtnText}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, bookBtnText: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    ข้อความปุ่ม LINE (LINE Button)
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero.lineBtnText}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, lineBtnText: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    ข้อความปุ่มโทร (Call Button)
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero.callBtnText}
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, callBtnText: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
              </div>
            </div>

            {/* Contact & Hotline Section Card */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <Phone size={18} color="#004680" />
                <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                  2. ข้อมูลติดต่อ &amp; LINE OA
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    เบอร์โทรสายด่วน (Hotline Phone)
                  </label>
                  <input
                    type="text"
                    value={siteContent.contact.hotlinePhone}
                    onChange={(e) => setSiteContent({ ...siteContent, contact: { ...siteContent.contact, hotlinePhone: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    LINE Official ID
                  </label>
                  <input
                    type="text"
                    value={siteContent.contact.lineOaId}
                    onChange={(e) => setSiteContent({ ...siteContent, contact: { ...siteContent.contact, lineOaId: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>
                    LINE Official Short URL (ลิงก์แอดไลน์)
                  </label>
                  <input
                    type="text"
                    value={siteContent.contact.lineOaUrl}
                    onChange={(e) => setSiteContent({ ...siteContent, contact: { ...siteContent.contact, lineOaUrl: e.target.value } })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Packages Card */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>💰</span>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                  3. อัตราค่าบริการแพ็กเกจ (Pricing Packages)
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {/* Package 1 */}
                <div style={{ padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: '#f8fafc' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#004680', fontWeight: 700 }}>แพ็กเกจ 1: Economic</h4>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ชื่อแพ็กเกจ</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg1.name}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg1: { ...siteContent.packages.pkg1, name: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ราคา (บาท)</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg1.price}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg1: { ...siteContent.packages.pkg1, price: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Package 2 */}
                <div style={{ padding: '16px', border: '2px solid #2DCCD3', borderRadius: '10px', background: '#f0fdfa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, color: '#004680', fontWeight: 700 }}>แพ็กเกจ 2: Standard I</h4>
                    <span style={{ fontSize: '10px', background: '#FFB81C', color: '#002d54', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>ยอดนิยม</span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ชื่อแพ็กเกจ</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg2.name}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg2: { ...siteContent.packages.pkg2, name: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ราคา (บาท)</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg2.price}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg2: { ...siteContent.packages.pkg2, price: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Package 3 */}
                <div style={{ padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: '#f8fafc' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#004680', fontWeight: 700 }}>แพ็กเกจ 3: Standard II</h4>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ชื่อแพ็กเกจ</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg3.name}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg3: { ...siteContent.packages.pkg3, name: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ราคา (บาท)</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg3.price}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg3: { ...siteContent.packages.pkg3, price: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Package 4 */}
                <div style={{ padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: '#f8fafc' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#004680', fontWeight: 700 }}>แพ็กเกจ 4: บริการอื่นๆ</h4>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ชื่อแพ็กเกจ</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg4.name}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg4: { ...siteContent.packages.pkg4, name: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ราคา (บาท)</label>
                    <input
                      type="text"
                      value={siteContent.packages.pkg4.price}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        packages: { ...siteContent.packages, pkg4: { ...siteContent.packages.pkg4, price: e.target.value } }
                      })}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 2: SITE MENUS EDITOR
            ================================================================ */}
        {activeTab === 'site-menu' && (
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680', fontWeight: 700 }}>
                  จัดการเมนูนำทาง (Navigation Menus)
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  เพิ่ม ลบ แก้ไขชื่อ และจัดลำดับเมนูบน Header ของเว็บไซต์ (มีผลทั้งหน้าจอคอมพิวเตอร์และมือถือ)
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleAddMenu}
                  style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', padding: '8px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={15} />
                  <span>เพิ่มเมนูใหม่</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveSiteContent}
                  disabled={savingSiteContent}
                  style={{ background: '#004680', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} />
                  <span>{savingSiteContent ? 'กำลังบันทึก...' : 'บันทึกเมนู'}</span>
                </button>
              </div>
            </div>

            {/* Menu Items Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 16px', width: '60px' }}>ลำดับ</th>
                    <th style={{ padding: '12px 16px' }}>ชื่อเมนู (Label)</th>
                    <th style={{ padding: '12px 16px' }}>ลิงก์ปลายทาง (Href / Section ID)</th>
                    <th style={{ padding: '12px 16px', width: '140px', textAlign: 'center' }}>จัดตำแหน่ง</th>
                    <th style={{ padding: '12px 16px', width: '80px', textAlign: 'center' }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {siteContent.menus.map((menuItem, idx) => (
                    <tr key={menuItem.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#94a3b8' }}>
                        {idx + 1}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <input
                          type="text"
                          value={menuItem.label}
                          onChange={(e) => handleUpdateMenu(menuItem.id, 'label', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                        />
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <input
                          type="text"
                          value={menuItem.href}
                          onChange={(e) => handleUpdateMenu(menuItem.id, 'href', e.target.value)}
                          placeholder="เช่น #pricing หรือ https://..."
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                        />
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleMoveMenu(idx, 'up')}
                            disabled={idx === 0}
                            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: idx === 0 ? '#f8fafc' : '#ffffff', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                            title="เลื่อนขึ้น"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveMenu(idx, 'down')}
                            disabled={idx === siteContent.menus.length - 1}
                            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: idx === siteContent.menus.length - 1 ? '#f8fafc' : '#ffffff', cursor: idx === siteContent.menus.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === siteContent.menus.length - 1 ? 0.4 : 1 }}
                            title="เลื่อนลง"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteMenu(menuItem.id)}
                          style={{ color: '#ef4444', background: '#fee2e2', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
                          title="ลบเมนูนี้"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 3: MEDIA & IMAGE MANAGER (ALL 5 SECTIONS)
            ================================================================ */}
        {activeTab === 'site-media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header info & Save bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680', fontWeight: 700 }}>
                  จัดการรูปภาพเว็บไซต์ครบทุกจุด (Media &amp; Image Manager)
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  แก้ไขและเปลี่ยนรูปภาพได้ครบทั้ง 5 ส่วนสำคัญบนเว็บไซต์ พร้อมแปลงไฟล์เป็น .webp ให้อัตโนมัติ
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => triggerImageUpload('heroPoster')}
                  style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', padding: '8px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Upload size={14} />
                  <span>อัปโหลดรูปภาพใหม่</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveSiteContent}
                  disabled={savingSiteContent}
                  style={{ background: '#004680', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={14} />
                  <span>{savingSiteContent ? 'กำลังบันทึก...' : 'บันทึกรูปภาพทั้งหมด'}</span>
                </button>
              </div>
            </div>

            {/* Sub-filter Section Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: '#ffffff', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', alignSelf: 'center', marginRight: '4px' }}>หมวดหมู่รูปภาพ:</span>
              {[
                { id: 'all', label: 'ทั้งหมด (28 จุด)' },
                { id: 'brand', label: '🌟 แบรนด์ & สื่อหลัก (5)' },
                { id: 'moments', label: '⏱️ 5 ขั้นตอนการดูแล (5)' },
                { id: 'personas', label: '👥 บริการนี้เหมาะกับใคร (4)' },
                { id: 'steps', label: '📦 สิ่งที่รวมในบริการ (6)' },
                { id: 'appointments', label: '🏥 ประเภทนัดหมาย (8)' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setMediaFilter(btn.id as any)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: mediaFilter === btn.id ? 700 : 500,
                    border: '1px solid',
                    borderColor: mediaFilter === btn.id ? '#004680' : '#e2e8f0',
                    background: mediaFilter === btn.id ? '#004680' : '#f8fafc',
                    color: mediaFilter === btn.id ? '#ffffff' : '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* ================================================================
                SECTION 1: BRAND & CORE MEDIA (Logo, Hero, Video, Map, Report)
                ================================================================ */}
            {(mediaFilter === 'all' || mediaFilter === 'brand') && (
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                      1. รูปภาพแบรนด์และสื่อหลัก (Brand &amp; Core Media)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      โลโก้หัวเว็บ, วิดีโอโปสเตอร์, แผนที่ครอบคลุมชลบุรี และภาพตัวอย่าง LINE Report
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    5 รูปภาพ
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {/* Logo */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680' }}>โลโก้แบรนด์ (Aikchol Next Logo)</span>
                      <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Header</span>
                    </div>
                    <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '10px' }}>
                      <img src={getAssetUrl(siteContent.images.logo)} alt="Logo Preview" style={{ maxHeight: '75px', maxWidth: '85%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                        <select
                          value={siteContent.images.logo}
                          onChange={(e) => setSiteContent({ ...siteContent, images: { ...siteContent.images, logo: e.target.value } })}
                          style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff' }}
                        >
                          {availableAssets.map((asset) => (
                            <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerImageUpload('logo')}
                        style={{ width: '100%', padding: '7px 12px', background: '#ffffff', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <Upload size={13} />
                        <span>อัปโหลดโลโก้ใหม่</span>
                      </button>
                    </div>
                  </div>

                  {/* Hero Poster */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680' }}>รูปภาพพื้นหลัง Hero (Hero Poster)</span>
                      <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Hero Banner</span>
                    </div>
                    <div style={{ height: '120px', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#ffffff' }}>
                      <img src={getAssetUrl(siteContent.images.heroPoster)} alt="Hero Poster Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                        <select
                          value={siteContent.images.heroPoster}
                          onChange={(e) => setSiteContent({ ...siteContent, images: { ...siteContent.images, heroPoster: e.target.value } })}
                          style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff' }}
                        >
                          {availableAssets.map((asset) => (
                            <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerImageUpload('heroPoster')}
                        style={{ width: '100%', padding: '7px 12px', background: '#ffffff', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <Upload size={13} />
                        <span>อัปโหลดรูปภาพใหม่</span>
                      </button>
                    </div>
                  </div>

                  {/* Video Tour Poster */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680' }}>ภาพปกวิดีโอแนะนำ (Video Tour)</span>
                      <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Video Tour</span>
                    </div>
                    <div style={{ height: '120px', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#ffffff' }}>
                      <img src={getAssetUrl(siteContent.images.videoPoster)} alt="Video Poster Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                        <select
                          value={siteContent.images.videoPoster}
                          onChange={(e) => setSiteContent({ ...siteContent, images: { ...siteContent.images, videoPoster: e.target.value } })}
                          style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff' }}
                        >
                          {availableAssets.map((asset) => (
                            <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerImageUpload('videoPoster')}
                        style={{ width: '100%', padding: '7px 12px', background: '#ffffff', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <Upload size={13} />
                        <span>อัปโหลดภาพปกใหม่</span>
                      </button>
                    </div>
                  </div>

                  {/* Coverage Map */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680' }}>แผนที่บริการชลบุรี (Coverage Map)</span>
                      <span style={{ fontSize: '11px', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Coverage</span>
                    </div>
                    <div style={{ height: '120px', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={getAssetUrl(siteContent.images.mapImage || 'assets/chonburi_map.webp')} alt="Coverage Map Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                        <select
                          value={siteContent.images.mapImage || 'assets/chonburi_map.webp'}
                          onChange={(e) => setSiteContent({ ...siteContent, images: { ...siteContent.images, mapImage: e.target.value } })}
                          style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff' }}
                        >
                          {availableAssets.map((asset) => (
                            <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerImageUpload('mapImage')}
                        style={{ width: '100%', padding: '7px 12px', background: '#ffffff', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <Upload size={13} />
                        <span>อัปโหลดแผนที่ใหม่</span>
                      </button>
                    </div>
                  </div>

                  {/* LINE Service Report Mockup */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680' }}>LINE Report Mockup (ภาพมือถือ)</span>
                      <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Report Mockup</span>
                    </div>
                    <div style={{ height: '120px', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={getAssetUrl(siteContent.images.reportMockup || 'assets/mobile_report_mockup.webp')} alt="Report Mockup Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                        <select
                          value={siteContent.images.reportMockup || 'assets/mobile_report_mockup.webp'}
                          onChange={(e) => setSiteContent({ ...siteContent, images: { ...siteContent.images, reportMockup: e.target.value } })}
                          style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff' }}
                        >
                          {availableAssets.map((asset) => (
                            <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerImageUpload('reportMockup')}
                        style={{ width: '100%', padding: '7px 12px', background: '#ffffff', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <Upload size={13} />
                        <span>อัปโหลดภาพม็อกอัปใหม่</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================
                SECTION 2: CARE MOMENTS (5 STEPS TABS & VIDEO TIMELINE)
                ================================================================ */}
            {(mediaFilter === 'all' || mediaFilter === 'moments') && (
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                      2. ภาพแท็บ 5 ขั้นตอนการดูแล (Care Moments 1 - 5)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      แสดงบนแท็บเลื่อนสไลเดอร์ "ดูแลครบวงจรตั้งแต่ก้าวออกจากบ้าน" และไทม์ไลน์วิดีโอ
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    5 ขั้นตอน
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {(siteContent.moments || []).map((moment, idx) => (
                    <div key={moment.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680', lineHeight: 1.3 }}>
                          {moment.title}
                        </span>
                        <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          Step {moment.stepNumber || idx + 1}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={getAssetUrl(moment.image)} alt={moment.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Controls: Select from assets & Upload button */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                          <select
                            value={moment.image}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setSiteContent((prev) => {
                                const moments = [...(prev.moments || [])];
                                moments[idx].image = newUrl;
                                return { ...prev, moments };
                              });
                            }}
                            style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff', color: '#0f172a' }}
                          >
                            {availableAssets.map((asset) => (
                              <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => triggerImageUpload('moment', idx)}
                          style={{ width: '100%', padding: '7px 12px', background: '#f8fafc', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.15s' }}
                        >
                          <Upload size={13} />
                          <span>อัปโหลดรูปภาพใหม่</span>
                        </button>
                      </div>

                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.45, minHeight: '34px' }}>
                        {moment.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================================
                SECTION 3: PERSONAS ("บริการนี้เหมาะกับใคร ?", 4 CARDS)
                ================================================================ */}
            {(mediaFilter === 'all' || mediaFilter === 'personas') && (
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                      3. ภาพกลุ่มผู้รับบริการ (Personas: บริการนี้เหมาะกับใคร ? 1 - 4)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      แสดงในการ์ด 4 กลุ่มเป้าหมาย เช่น ครอบครัวที่ลางานไม่ได้, ผู้สูงอายุอยู่คนเดียว ฯลฯ
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    4 กลุ่ม
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {(siteContent.personas || []).map((persona, idx) => (
                    <div key={persona.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680', lineHeight: 1.3 }}>
                          {persona.title}
                        </span>
                        <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          Persona #{persona.num || idx + 1}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={getAssetUrl(persona.image)} alt={persona.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Controls: Select from assets & Upload button */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                          <select
                            value={persona.image}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setSiteContent((prev) => {
                                const personas = [...(prev.personas || [])];
                                personas[idx].image = newUrl;
                                return { ...prev, personas };
                              });
                            }}
                            style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff', color: '#0f172a' }}
                          >
                            {availableAssets.map((asset) => (
                              <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => triggerImageUpload('persona', idx)}
                          style={{ width: '100%', padding: '7px 12px', background: '#f8fafc', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.15s' }}
                        >
                          <Upload size={13} />
                          <span>อัปโหลดรูปภาพใหม่</span>
                        </button>
                      </div>

                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.45, minHeight: '34px' }}>
                        {persona.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================================
                SECTION 4: SERVICE STEPS ("สิ่งที่รวมอยู่ในราคาค่าบริการ", 6 CARDS)
                ================================================================ */}
            {(mediaFilter === 'all' || mediaFilter === 'steps') && (
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                      4. ภาพสิ่งที่รวมอยู่ในราคาค่าบริการ (Service Steps 1 - 6)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      แสดงในการ์ด 6 ขั้นตอนสำคัญที่รวมอยู่ในแพ็กเกจ
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    6 ขั้นตอน
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {(siteContent.serviceSteps || []).map((step, idx) => (
                    <div key={step.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680', lineHeight: 1.3 }}>
                          {step.title}
                        </span>
                        <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          ขั้นตอนที่ {step.step || idx + 1}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={getAssetUrl(step.image)} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Controls: Select from assets & Upload button */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                          <select
                            value={step.image}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setSiteContent((prev) => {
                                const serviceSteps = [...(prev.serviceSteps || [])];
                                serviceSteps[idx].image = newUrl;
                                return { ...prev, serviceSteps };
                              });
                            }}
                            style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff', color: '#0f172a' }}
                          >
                            {availableAssets.map((asset) => (
                              <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => triggerImageUpload('serviceStep', idx)}
                          style={{ width: '100%', padding: '7px 12px', background: '#f8fafc', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.15s' }}
                        >
                          <Upload size={13} />
                          <span>อัปโหลดรูปภาพใหม่</span>
                        </button>
                      </div>

                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.45, minHeight: '34px' }}>
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================================
                SECTION 5: APPOINTMENT CARDS (1 - 8)
                ================================================================ */}
            {(mediaFilter === 'all' || mediaFilter === 'appointments') && (
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#004680', fontWeight: 700 }}>
                      5. รูปภาพประเภทนัดหมายที่ดูแลได้ (Appointment Cards 1 - 8)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>แสดงในส่วนประเภทนัดหมายที่ GO CARES ดูแลพาไปพบแพทย์</span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    8 การ์ด
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {(siteContent.appointments || []).map((apt, idx) => (
                    <div key={apt.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#004680', lineHeight: 1.3 }}>
                          {apt.title}
                        </span>
                        <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          Card #{apt.num}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={getAssetUrl(apt.image)} alt={apt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Controls: Select from assets & Upload button */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>เลือกจากคลังรูปภาพ:</span>
                          <select
                            value={apt.image}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setSiteContent((prev) => {
                                const appointments = [...prev.appointments];
                                appointments[idx].image = newUrl;
                                return { ...prev, appointments };
                              });
                            }}
                            style={{ width: '100%', minWidth: 0, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#fff', color: '#0f172a' }}
                          >
                            {availableAssets.map((asset) => (
                              <option key={asset} value={asset}>{asset.replace('assets/', '')}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => triggerImageUpload('appointment', idx)}
                          style={{ width: '100%', padding: '7px 12px', background: '#f8fafc', color: '#004680', border: '1px dashed #004680', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.15s' }}
                        >
                          <Upload size={13} />
                          <span>อัปโหลดรูปภาพใหม่</span>
                        </button>
                      </div>

                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.45, minHeight: '34px' }}>
                        {apt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            TAB 4: BOOKING LEADS
            ================================================================ */}
        {activeTab === 'leads' && (
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680', fontWeight: 700 }}>
                  ข้อมูลผู้รับบริการและผู้ติดต่อ (Leads)
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  บันทึกข้อมูลจากฟอร์มจองหน้าเว็บ แยกชื่อผู้ป่วย, ชื่อผู้ติดต่อ, เบอร์โทร, LINE ID และโรงพยาบาล
                </p>
              </div>
              <button
                type="button"
                onClick={fetchLeads}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
              >
                รีเฟรชข้อมูล
              </button>
            </div>

            {leads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                <Users size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                <p>ยังไม่มีข้อมูลการจองในระบบ</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '10px 14px' }}>เวลาส่ง</th>
                      <th style={{ padding: '10px 14px' }}>ชื่อผู้ป่วย (ความสัมพันธ์)</th>
                      <th style={{ padding: '10px 14px' }}>ชื่อผู้ติดต่อ / ประสานงาน</th>
                      <th style={{ padding: '10px 14px' }}>เบอร์โทรศัพท์</th>
                      <th style={{ padding: '10px 14px' }}>LINE ID</th>
                      <th style={{ padding: '10px 14px' }}>โรงพยาบาล</th>
                      <th style={{ padding: '10px 14px' }}>แพ็กเกจ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>
                          {new Date(lead.submittedAt).toLocaleString('th-TH')}
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: '#004680' }}>
                          {lead.patientName} {lead.patientRelation ? `(${lead.patientRelation})` : ''}
                        </td>
                        <td style={{ padding: '10px 14px' }}>{lead.contactName}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <a href={`tel:${lead.contactPhone}`} style={{ color: '#0284c7', textDecoration: 'none' }}>
                            {lead.contactPhone}
                          </a>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          {lead.contactLineId ? (
                            <span style={{ background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '999px', fontSize: '12px' }}>
                              {lead.contactLineId}
                            </span>
                          ) : '-'}
                        </td>
                        <td style={{ padding: '10px 14px' }}>{lead.hospital}</td>
                        <td style={{ padding: '10px 14px' }}>{lead.package}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            TAB 5: CAMPAIGNS
            ================================================================ */}
        {activeTab === 'campaigns' && (
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680', fontWeight: 700 }}>
                  แคมเปญการตลาด &amp; ประชาสัมพันธ์ (Marketing Campaigns)
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  จัดการแคมเปญและโปรโมชันตามวัตถุประสงค์การตลาด (CR Item 5)
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {campaigns.map((camp) => (
                <div key={camp.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#004680', fontWeight: 700 }}>{camp.title}</h3>
                    <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
                      เผยแพร่แล้ว
                    </span>
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>{camp.body}</p>
                  <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>กลุ่มเป้าหมาย:</strong> {camp.campaignTarget || '-'}</div>
                    <div><strong>วัตถุประสงค์:</strong> {camp.campaignObjective || '-'}</div>
                    <div><strong>ระยะเวลา:</strong> {camp.campaignStartDate || '-'} ถึง {camp.campaignEndDate || '-'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 6: ANALYTICS & TRACKING
            ================================================================ */}
        {activeTab === 'analytics' && (
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#004680', fontWeight: 700 }}>
                  แดชบอร์ดสถิติ &amp; Tracking พฤติกรรมผู้ใช้ (Marketing Analytics)
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  แสดงเหตุการณ์ที่ถูกบันทึกผ่าน Tag Tracking (CR Items 4 &amp; 5)
                </p>
              </div>
              <button
                type="button"
                onClick={fetchTracking}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
              >
                รีเฟรชสถิติ
              </button>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '18px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px' }}>
                <span style={{ fontSize: '12.5px', color: '#0369a1', fontWeight: 600 }}>Total Tracked Events</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#004680', marginTop: '6px' }}>
                  {trackingData?.total || 0}
                </div>
              </div>
              <div style={{ padding: '18px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>
                <span style={{ fontSize: '12.5px', color: '#15803d', fontWeight: 600 }}>Booking Form Submits</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#166534', marginTop: '6px' }}>
                  {trackingData?.eventCounts?.booking_submit || 0}
                </div>
              </div>
              <div style={{ padding: '18px', background: '#fefce8', border: '1px solid #fef08a', borderRadius: '10px' }}>
                <span style={{ fontSize: '12.5px', color: '#a16207', fontWeight: 600 }}>LINE OA Inquiries</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#854d0e', marginTop: '6px' }}>
                  {trackingData?.eventCounts?.line_oa_click || 0}
                </div>
              </div>
              <div style={{ padding: '18px', background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px' }}>
                <span style={{ fontSize: '12.5px', color: '#7e22ce', fontWeight: 600 }}>AI Chat Searches</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#6b21a8', marginTop: '6px' }}>
                  {trackingData?.eventCounts?.ai_search || 0}
                </div>
              </div>
            </div>

            {/* Top Events Breakdown */}
            <h3 style={{ fontSize: '15px', color: '#004680', fontWeight: 700, marginBottom: '12px' }}>
              สถิติแยกตามประเภทเหตุการณ์ (Event Breakdown)
            </h3>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '10px 14px' }}>ชื่อ Event</th>
                    <th style={{ padding: '10px 14px', width: '120px', textAlign: 'right' }}>จำนวนครั้ง</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingData && trackingData.eventCounts && Object.keys(trackingData.eventCounts).length > 0 ? (
                    Object.entries(trackingData.eventCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([ev, count]) => (
                        <tr key={ev} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: '#004680' }}>{ev}</td>
                          <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700 }}>{count}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={2} style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                        ยังไม่มีข้อมูลสถิติ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
