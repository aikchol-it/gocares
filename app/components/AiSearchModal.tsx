'use client';

import React, { useState, useEffect } from 'react';
import { trackAiSearchOpen, trackAiSearchQuery, trackAiSearchAction, trackLineOaClick, trackPhoneCallClick } from '../lib/tracking';


interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  answer: string;
  actionLabel: string;
  actionType: 'booking' | 'line' | 'call';
  actionPkg?: string;
}

interface AiSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (pkg?: string) => void;
}

export default function AiSearchModal({ isOpen, onClose, onSelectBooking }: AiSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [headerText, setHeaderText] = useState('คำถามและบริการที่พบบ่อย');

  useEffect(() => {
    if (!isOpen) return;

    // Track modal open (CR4)
    trackAiSearchOpen();

    // Load initial recommendations
    fetchResults('');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const fetchResults = async (q: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      if (res.ok) {
        const data = (await res.json()) as { results: SearchResultItem[]; header: string };
        setResults(data.results || []);
        setHeaderText(data.header || 'ผลการค้นหา');
        // Track search query + result count (CR4)
        if (q) trackAiSearchQuery(q, data.results?.length || 0);
      }
    } catch (err) {
      console.error('AI search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    fetchResults(val);
  };

  const handleQuickTagClick = (tag: string) => {
    setQuery(tag);
    fetchResults(tag);
  };

  const handleAction = (item: SearchResultItem) => {
    // Track action click (CR4)
    trackAiSearchAction(item.actionType, item.title);

    onClose();
    if (item.actionType === 'booking') {
      onSelectBooking(item.actionPkg || 'pkg2');
    } else if (item.actionType === 'line') {
      trackLineOaClick('ai_search_result');
      window.open('https://lin.ee/RbECVC5', '_blank');
    } else if (item.actionType === 'call') {
      trackPhoneCallClick('ai_search_result');
      window.location.href = 'tel:0639204765';
    }
  };


  if (!isOpen) return null;

  return (
    <div className="ahc-modal-backdrop open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ahc-modal-card ahc-search-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ahc-modal-header" style={{ borderBottom: 'none', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="ahc-search-ai-icon-badge">
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '19px', color: '#ffffff' }}>ค้นหาบริการและคำถามด้วย AI</h3>
              <p style={{ fontSize: '13px', color: '#e0f2fe', margin: '2px 0 0 0' }}>
                พิมพ์คำถามภาษาไทยหรืออังกฤษ เช่น &quot;ราคาเท่าไหร่&quot;, &quot;ฟอกไต&quot;, &quot;มีรถเข็นไหม&quot;
              </p>
            </div>
          </div>
          <button type="button" className="ahc-modal-close-btn" onClick={onClose} aria-label="ปิดหน้าต่างค้นหา">
            <svg className="ahc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="ahc-search-modal-body">
          <div className="ahc-search-input-wrap">
            <svg className="ahc-icon ahc-icon-md ahc-search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="ahc-search-input"
              placeholder="พิมพ์คำถามหรือบริการที่ต้องการค้นหา..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                type="button"
                className="ahc-search-clear-btn"
                onClick={() => handleInputChange('')}
                aria-label="ล้างข้อความ"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="ahc-search-quick-tags">
            <span style={{ fontSize: '12px', color: 'var(--ahc-text-muted)', fontWeight: 500 }}>คำค้นยอดนิยม:</span>
            <button type="button" className="ahc-quick-tag-btn" onClick={() => handleQuickTagClick('ราคา')}>
              💰 ราคาค่าบริการ
            </button>
            <button type="button" className="ahc-quick-tag-btn" onClick={() => handleQuickTagClick('ฟอกไต')}>
              🩺 ผู้ป่วยฟอกไต
            </button>
            <button type="button" className="ahc-quick-tag-btn" onClick={() => handleQuickTagClick('รับส่งถึงบ้าน')}>
              🚐 ไปรับที่บ้านไหม
            </button>
            <button type="button" className="ahc-quick-tag-btn" onClick={() => handleQuickTagClick('รพ.ชลบุรี')}>
              🏥 ไป รพ.อื่นได้ไหม
            </button>
            <button type="button" className="ahc-quick-tag-btn" onClick={() => handleQuickTagClick('รถเข็น')}>
              ♿ รองรับรถเข็น
            </button>
          </div>

          {/* Results List */}
          <div className="ahc-search-results">
            <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--ahc-blue)', marginBottom: '4px' }}>
              {isLoading ? 'กำลังประมวลผลคำตอบ...' : headerText}
            </div>

            {results.length === 0 && !isLoading && (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--ahc-text-muted)' }}>
                <p style={{ fontSize: '15px', marginBottom: '8px' }}>ไม่พบข้อมูลที่ตรงกับการค้นหา</p>
                <p style={{ fontSize: '13px' }}>
                  สามารถโทรสอบถามเจ้าหน้าที่ได้โดยตรงที่{' '}
                  <a href="tel:0639204765" style={{ color: 'var(--ahc-blue)', fontWeight: 700 }}>
                    063 920 4765
                  </a>{' '}
                  หรือแชททาง LINE
                </p>
              </div>
            )}

            {results.map((item) => (
              <div key={item.id} className="ahc-search-result-card">
                <div className="ahc-search-card-top">
                  <h4 className="ahc-search-card-title">{item.title}</h4>
                  <span className="ahc-search-match-badge">{item.category}</span>
                </div>
                <p className="ahc-search-card-snippet">{item.answer}</p>
                <button
                  type="button"
                  className="ahc-search-card-action"
                  onClick={() => handleAction(item)}
                >
                  <span>{item.actionLabel}</span>
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
