'use client';

import { useEffect } from 'react';

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

// Loads the same scripts as index.html, in order: Lenis -> app.js -> video toggle.
export default function LegacyScripts() {
  useEffect(() => {
    if ((window as any).__legacyLoaded) return;
    (window as any).__legacyLoaded = true;
    (async () => {
      await loadScript('https://unpkg.com/lenis@1.1.20/dist/lenis.min.js');
      await loadScript('/app.js');
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
