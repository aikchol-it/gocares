import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function TopBar({ content }: { content: SiteContent }) {
  const telHref = `tel:${content.contact.hotlinePhone.replace(/\s+/g, '')}`;

  return (
    <aside className="ahc-topbar" aria-label="Announcement & Mission Bar">
      <div className="ahc-container ahc-topbar-inner">
        <div className="ahc-topbar-left">
          <span className="ahc-mission-pill">AHC MISSION</span>
          <span className="ahc-topbar-text">
            <strong>Enhancing Family Happiness:</strong> ให้ทุกการไปโรงพยาบาลของคนที่คุณรัก ปลอดภัยและอุ่นใจที่สุดในชลบุรี
          </span>
        </div>
        <div className="ahc-topbar-right">
          <a href={telHref} className="ahc-topbar-hotline">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>
              สายด่วน: <strong>{content.contact.hotlinePhone}</strong>
            </span>
          </a>
          <button id="ahcSeniorModeBtn" className="ahc-font-toggle-btn" aria-label="ปรับขนาดตัวอักษร">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
            <span>A+ ตัวหนังสือใหญ่</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
