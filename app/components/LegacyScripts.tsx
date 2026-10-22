'use client';

import { useEffect } from 'react';

import { SiteContent } from '../lib/site-content-types';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

// Loads the same scripts as index.html, in order: Lenis -> app.js -> video toggle.
export default function LegacyScripts({ siteContent }: { siteContent?: SiteContent }) {
  useEffect(() => {
    const win = window as unknown as {
      __legacyLoaded?: boolean;
      initAhcApp?: () => void;
      __SITE_CONTENT__?: SiteContent;
    };
    if (siteContent) {
      win.__SITE_CONTENT__ = siteContent;
    }
    if (win.__legacyLoaded) return;
    win.__legacyLoaded = true;

    (async () => {
      await loadScript('https://unpkg.com/lenis@1.1.20/dist/lenis.min.js');
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      await loadScript(`${basePath}/app.js`);

      if (typeof win.initAhcApp === 'function') {
        win.initAhcApp();
      }

      // Safety fallback: ensure above-the-fold reveals are visible even before scroll
      requestAnimationFrame(() => {
        document.querySelectorAll('.ahc-reveal').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 100) {
            el.classList.add('revealed');
          }
        });
      });

      const vid = document.getElementById('ahcHeroBgVideo') as HTMLVideoElement | null;
      const btn = document.getElementById('ahcVideoToggle');
      const pauseIcon = document.getElementById('ahcVideoPauseIcon');
      const playIcon = document.getElementById('ahcVideoPlayIcon');
      if (!vid || !btn || !pauseIcon || !playIcon) return;
      btn.addEventListener('click', () => {
        if (vid.paused) {
          vid.play();
          pauseIcon.style.display = '';
          playIcon.style.display = 'none';
          btn.setAttribute('aria-label', 'หยุดวิดีโอ');
        } else {
          vid.pause();
          pauseIcon.style.display = 'none';
          playIcon.style.display = '';
          btn.setAttribute('aria-label', 'เล่นวิดีโอ');
        }
      });
    })();
  }, []);

  return null;
}
