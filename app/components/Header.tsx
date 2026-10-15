'use client';

import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenBooking: (pkg?: string) => void;
  onOpenSearch: () => void;
}

export default function Header({ onOpenBooking, onOpenSearch }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="ahc-floating-header-wrapper">
      <header className={`ahc-floating-header ${scrolled ? 'scrolled' : ''}`} id="ahcFloatingHeader">
        <a href="#" className="ahc-logo-group">
          <img src="/assets/aikchol_next_logo.webp" alt="Aikchol Next Logo" className="ahc-brand-logo-img" />
          <div className="ahc-brand-separator"></div>
          <div className="ahc-brand-text-block">
            <span className="ahc-brand-name">GO CARES</span>
            <span className="ahc-brand-sub">โรงพยาบาลเอกชล</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary Navigation">
          <ul className={`ahc-nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`} id="ahcNavMenu">
            <li><a href="#care-moments" className="ahc-nav-link" onClick={() => setMobileMenuOpen(false)}>บริการครบวงจร</a></li>
            <li><a href="#what-is-included" className="ahc-nav-link" onClick={() => setMobileMenuOpen(false)}>6 ขั้นตอนดูแล</a></li>
            <li><a href="#pricing" className="ahc-nav-link" onClick={() => setMobileMenuOpen(false)}>อัตราค่าบริการ</a></li>
            <li><a href="#coverage-area" className="ahc-nav-link" onClick={() => setMobileMenuOpen(false)}>พื้นที่ชลบุรี</a></li>
            <li><a href="#faq" className="ahc-nav-link" onClick={() => setMobileMenuOpen(false)}>คำถามพบบ่อย</a></li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="ahc-header-actions">
          {/* AI Search Trigger (CR.md Item 3) */}
          <button
            type="button"
            className="ahc-search-trigger-btn"
            onClick={onOpenSearch}
            aria-label="ค้นหาบริการหรือสอบถามคำถาม AI"
            title="ค้นหาบริการ / FAQ (Ctrl+K)"
          >
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="ahc-search-trigger-label">ค้นหา AI</span>
          </button>

          {/* Hotline */}
          <a href="tel:0639204765" className="ahc-hotline-pill" title="โทรสายด่วน">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>063 920 4765</span>
          </a>

          {/* Booking CTA */}
          <button
            type="button"
            className="ahc-btn ahc-btn-gold ahc-nav-cta-btn"
            onClick={() => onOpenBooking('pkg2')}
          >
            <span>จองบริการ</span>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="ahc-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="เปิดเมนู"
          >
            <svg className="ahc-icon ahc-icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
