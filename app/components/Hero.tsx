import React from 'react';
import { SiteContent } from '../lib/site-content-types';

export default function Hero({ content }: { content: SiteContent }) {
  const { hero, contact, images } = content;
  const telHref = `tel:${contact.hotlinePhone.replace(/\s+/g, '')}`;
  const bullets = [hero.bullet1, hero.bullet2, hero.bullet3];

  return (
    <section className="ahc-cinematic-hero-section" id="hero">
      <div className="ahc-container">
        <div className="ahc-hero-cinematic-wrapper ahc-reveal">
          <video
            id="ahcHeroBgVideo"
            className="ahc-hero-bg-media"
            autoPlay
            loop
            muted
            playsInline
            poster={images.heroPoster}
          >
            <source src="Hospital_02_clean.mp4" type="video/mp4" />
          </video>

          <div className="ahc-hero-scrim-gradient"></div>

          <button id="ahcVideoToggle" className="ahc-hero-video-toggle" aria-label="หยุดวิดีโอ" title="หยุด / เล่นวิดีโอ">
            <svg id="ahcVideoPauseIcon" className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            <svg
              id="ahcVideoPlayIcon"
              className="ahc-icon ahc-icon-sm"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ display: 'none' }}
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>

          <div className="ahc-hero-floating-card">
            <div className="ahc-hero-kicker-tag">
              <span className="ahc-pulse-dot"></span>
              <span>{hero.kicker}</span>
            </div>

            <h1 className="ahc-hero-headline">
              {hero.headline}
              <br />
              <span className="ahc-hero-headline-accent">{hero.headlineAccent}</span>
            </h1>

            <ul className="ahc-hero-feature-bullets">
              {bullets.map((bullet, index) => (
                <li key={index}>
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: bullet }} />
                </li>
              ))}
            </ul>

            <div className="ahc-hero-btn-row">
              <button className="ahc-btn ahc-btn-gold" data-open-booking data-pkg="pkg2" id="heroBtnBook">
                <span>{hero.bookBtnText}</span>
              </button>
              <a
                href={contact.lineOaUrl}
                target="_blank"
                rel="noopener"
                className="ahc-btn ahc-btn-line"
                id="heroBtnLine"
                title="ติดต่อผ่าน LINE"
              >
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                <span>{hero.lineBtnText}</span>
              </a>
              <a href={telHref} className="ahc-btn ahc-btn-ghost-call" id="heroBtnCall" title="โทรปรึกษาฟรี">
                <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{hero.callBtnText}</span>
              </a>
            </div>

            <div className="ahc-hero-trust-row">
              <span className="ahc-trust-chip">
                <svg className="ahc-icon" style={{ width: '13px', height: '13px' }} viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                ผู้ดูแลผ่านการอบรม
              </span>
              <span className="ahc-trust-chip">
                <svg className="ahc-icon" style={{ width: '13px', height: '13px' }} viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                รับรองโดยรพ.เอกชล
              </span>
              <span className="ahc-trust-chip">
                <svg className="ahc-icon" style={{ width: '13px', height: '13px' }} viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                8 อำเภอ ชลบุรี
              </span>
            </div>
          </div>

          <div className="ahc-hero-corner-badge">
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" style={{ color: 'var(--ahc-green)' }}>
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
              <circle cx="17" cy="18" r="2"></circle>
              <circle cx="7" cy="18" r="2"></circle>
            </svg>
            <span>รองรับบริการ • 8 อำเภอ ในชลบุรี</span>
          </div>
        </div>
      </div>
    </section>
  );
}
