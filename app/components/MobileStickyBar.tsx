'use client';

import React from 'react';

interface MobileStickyBarProps {
  onOpenBooking: (pkg?: string) => void;
}

export default function MobileStickyBar({ onOpenBooking }: MobileStickyBarProps) {
  return (
    <aside className="ahc-mobile-sticky-bar" aria-label="แถบการกระทำด่วนบนมือถือ">
      <div className="ahc-mobile-bar-inner">
        <a href="tel:0639204765" className="ahc-btn ahc-btn-outline ahc-mobile-bar-btn">
          <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>โทรด่วน</span>
        </a>

        <a
          href="https://lin.ee/RbECVC5"
          target="_blank"
          rel="noreferrer"
          className="ahc-btn ahc-btn-line ahc-mobile-bar-btn"
        >
          <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>แชท LINE</span>
        </a>

        <button
          type="button"
          className="ahc-btn ahc-btn-primary ahc-mobile-bar-btn"
          onClick={() => onOpenBooking('pkg2')}
        >
          <span>จองผู้ดูแล</span>
        </button>
      </div>
    </aside>
  );
}
