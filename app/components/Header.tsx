import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function Header({ content }: { content: SiteContent }) {
  const telHref = `tel:${content.contact.hotlinePhone.replace(/\s+/g, '')}`;

  return (
    <div className="ahc-floating-header-wrapper">
      <header className="ahc-floating-header" id="ahcFloatingHeader">
        <a href="#" className="ahc-logo-group">
          <img src={content.images.logo} alt="Aikchol Next Logo" className="ahc-brand-logo-img" />
          <div className="ahc-brand-separator"></div>
          <div className="ahc-brand-text-block">
            <span className="ahc-brand-name">GO CARES</span>
            <span className="ahc-brand-sub">โรงพยาบาลเอกชล</span>
          </div>
        </a>

        <nav aria-label="Primary Navigation">
          <ul className="ahc-nav-menu" id="ahcNavMenu">
            {content.menus.map((menu) => (
              <li key={menu.id}>
                <a href={menu.href} className="ahc-nav-link">
                  {menu.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ahc-header-actions">
          <a href={telHref} className="ahc-hotline-pill" title="โทรสายด่วน">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{content.contact.hotlinePhone}</span>
          </a>
          <button className="ahc-btn ahc-btn-gold ahc-nav-cta-btn" data-open-booking data-pkg="pkg2">
            <span>จองบริการ</span>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button className="ahc-mobile-toggle" id="ahcMobileToggle" aria-label="เปิดเมนู">
            <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
