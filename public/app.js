/**
 * AIKCHOL HOSPITAL (AHC) — GO CARES Controller
 * Inspiration: Included Health & Maven Clinic (Clean, Interactive, High-Motion)
 * Base Design: DESIGN-main.md ("Enhancing Family Happiness")
 */

((fn) => { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
  initLenisSmoothScroll();
  initFloatingHeaderScroll();
  initScrollReveal();
  initMomentsTabSlider();
  initVideoController();
  initPricingToggle();
  initPricingCardSelection();
  initDistrictSelector();
  initChecklist();
  initFaqAccordion();
  initSeniorMode();
  initBookingModal();
  initMobileMenu();
  initMarketingTracking();
  initSmartAISearch();
});

/* --------------------------------------------------------------------------
   0. Lenis Ultra-Smooth Momentum Scrolling (Included Health & Maven Standard)
   -------------------------------------------------------------------------- */
function initLenisSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false
    });

    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            window.lenis.scrollTo(targetEl, { offset: -90 });
          }
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   1. Maven Clinic Style: Floating Header Scroll Effect
   -------------------------------------------------------------------------- */
function initFloatingHeaderScroll() {
  const header = document.getElementById('ahcFloatingHeader');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.ahc-reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   3. Included Health Style: Care Moments Interactive Tab Slider
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   3. Included Health Style: Care Moments Interactive Tab Slider (5 Steps)
   -------------------------------------------------------------------------- */
function initMomentsTabSlider() {
  const tabBtns = document.querySelectorAll('.ahc-moment-tab-btn');
  const titleEl = document.getElementById('ahcMomentTitle');
  const descEl = document.getElementById('ahcMomentDesc');
  const tagEl = document.getElementById('ahcMomentTag');
  const imgEl = document.getElementById('ahcMomentImg');
  const bullet1 = document.getElementById('ahcMomentBullet1');
  const bullet2 = document.getElementById('ahcMomentBullet2');

  const momentsData = {
    'book': {
      tag: 'Step 1: Book & Plan',
      title: 'นัดหมาย & วางแผนการเดินทางอย่างรัดกุม',
      desc: 'ทีมงานสอบถามประวัติและวางแผนการเดินทาง ยืนยันข้อมูลผู้รับบริการและเวลานัดหมายล่วงหน้า ให้คุณมั่นใจตั้งแต่นาทีแรก',
      b1: 'เจ้าหน้าที่ผู้เชี่ยวชาญประสานงานและจัดสรรผู้ดูแลที่เหมาะสมกับอาการ',
      b2: 'ยืนยันวัน เวลา สถานที่ และเส้นทางล่วงหน้าอย่างโปร่งใส ไร้กังวล',
      img: 'assets/step_1_book_plan.webp'
    },
    'mobility': {
      tag: 'Step 2: Home to Hospital Mobility',
      title: 'รถรับ-ส่งเฉพาะ ถึงหน้าบ้าน ปลอดภัยทุกเส้นทาง',
      desc: 'ผู้ดูแลเดินทางไปรับตรงเวลา ช่วยเตรียมตัว ช่วยพยุงขึ้นรถตู้ GO CARES อย่างถูกวิธี รองรับรถเข็นและอุปกรณ์ช่วยเดิน',
      b1: 'ตรวจวัดสัญญาณชีพ ความดัน และชีพจรก่อนออกเดินทาง',
      b2: 'รถสะอาด แอร์เย็น ได้มาตรฐานความปลอดภัยของโรงพยาบาลเอกชล',
      img: 'assets/step_2_pickup_home.webp'
    },
    'hospital': {
      tag: 'Step 3: Arrival & Registration',
      title: 'ถึงโรงพยาบาลเอกชล สะดวกสบายทุกขั้นตอน',
      desc: 'พยุงลงจากรถ ดูแลนั่งรถเข็น อำนวยความสะดวกเปิดสิทธิการรักษา ประสานงานรับบัตรคิว และพาไปยังจุดตรวจต่างๆ อย่างราบรื่น',
      b1: 'ชำนาญขั้นตอนโรงพยาบาลเอกชล ไม่ต้องเดินวนหรือเหนื่อยล้า',
      b2: 'ดูแลอย่างใกล้ชิดและเป็นเพื่อนคุยคลายความวิตกกังวลตลอดเวลา',
      img: 'assets/step_3_arrival_aikchol.webp'
    },
    'consultation': {
      tag: 'Step 4: Medical Consultation',
      title: 'เข้าห้องตรวจด้วยกัน จดคำสั่งแพทย์ และทวนวิธีใช้ยา',
      desc: 'ช่วยจดคำแนะนำของคุณหมออย่างละเอียด ถามซ้ำจุดที่ไม่ชัดเจน และตรวจสอบยาตัวใหม่กับเภสัชกร ป้องกันการกินยาผิดซ้ำซ้อน',
      b1: 'ถ่ายรูปฉลากยาทุกตัว แจ้งชัดเจนว่ายาตัวไหนหยุด ตัวไหนเริ่มใหม่',
      b2: 'บันทึกวันนัดครั้งถัดไปและผลตรวจส่งให้ครอบครัวเห็นแนวโน้ม',
      img: 'assets/step_4_doctor_consult.webp'
    },
    'report': {
      tag: 'Step 5: Send Back & Service Report',
      title: 'ส่งกลับบ้านปลอดภัย พร้อมสรุป Service Report ผ่าน LINE',
      desc: 'ส่งกลับถึงบ้านอย่างปลอดภัย ตรวจความเรียบร้อย และส่งรายงานสรุปกิจกรรมฉบับสมบูรณ์พร้อมรูปถ่ายให้ครอบครัวทราบทันที',
      b1: 'สบายใจ ไร้กังวล ติดตามได้ทุกนาทีแม้ไม่ได้ลางานไปด้วย',
      b2: 'ครอบครัวได้รับรายงาน Service Report ทั้งรายการยาและคำแนะนำครบถ้วน',
      img: 'assets/step_5_service_report.webp'
    },
    'line': {
      tag: 'Step 5: Send Back & Service Report',
      title: 'ส่งกลับบ้านปลอดภัย พร้อมสรุป Service Report ผ่าน LINE',
      desc: 'ส่งกลับถึงบ้านอย่างปลอดภัย ตรวจความเรียบร้อย และส่งรายงานสรุปกิจกรรมฉบับสมบูรณ์พร้อมรูปถ่ายให้ครอบครัวทราบทันที',
      b1: 'สบายใจ ไร้กังวล ติดตามได้ทุกนาทีแม้ไม่ได้ลางานไปด้วย',
      b2: 'ครอบครัวได้รับรายงาน Service Report ทั้งรายการยาและคำแนะนำครบถ้วน',
      img: 'assets/step_5_service_report.webp'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.dataset.moment;
      const data = momentsData[key];
      if (data) {
        if (tagEl) tagEl.textContent = data.tag;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (bullet1) bullet1.textContent = data.b1;
        if (bullet2) bullet2.textContent = data.b2;
        if (imgEl) {
          imgEl.style.opacity = '0.3';
          imgEl.style.transform = 'scale(0.96)';
          setTimeout(() => {
            imgEl.src = data.img;
            imgEl.style.opacity = '1';
            imgEl.style.transform = 'scale(1)';
          }, 150);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Video Showcase Controller & Chapter Sync (Hospital_02.mp4)
   -------------------------------------------------------------------------- */
function initVideoController() {
  const video = document.getElementById('ahcMainVideo');
  const playBtn = document.getElementById('ahcBigPlayBtn');
  const playIconBtn = document.getElementById('ahcPlayIconBtn');
  const muteBtn = document.getElementById('ahcMuteBtn');
  const restartBtn = document.getElementById('ahcRestartBtn');
  const progressFill = document.getElementById('ahcProgressFill');
  const progressTrack = document.getElementById('ahcProgressTrack');
  const timeDisplay = document.getElementById('ahcTimeDisplay');
  const chapterPill = document.getElementById('ahcCurrentChapterPill');
  const chapterBtns = document.querySelectorAll('.ahc-chapter-btn');
  const liveCardTitle = document.getElementById('ahcLiveStepTitle');
  const liveCardDesc = document.getElementById('ahcLiveStepDesc');
  const liveCardThumb = document.getElementById('ahcLiveStepThumb');

  if (!video) return;

  const chapters = [
    { start: 0.0, end: 21.0, num: 1, title: 'Book & Plan', thTitle: '1. นัดหมาย & วางแผนการเดินทาง', desc: 'ทีมงานสอบถามประวัติและวางแผนการเดินทาง ยืนยันข้อมูลผู้รับบริการและเวลานัดหมายล่วงหน้า', img: 'assets/step_1_book_plan.webp' },
    { start: 21.0, end: 42.0, num: 2, title: 'Pick Up at Home', thTitle: '2. รับจากบ้าน ตรงเวลา ปลอดภัย', desc: 'ผู้ดูแลส่วนตัวเดินทางไปถึงบ้านตรงเวลา ช่วยเตรียมตัว ช่วยพยุงขึ้นรถตู้ GO CARES อย่างถูกวิธี', img: 'assets/step_2_pickup_home.webp' },
    { start: 42.0, end: 64.0, num: 3, title: 'Arrival & Registration', thTitle: '3. ถึงโรงพยาบาลเอกชล & ช่วยลงทะเบียน', desc: 'พยุงลงจากรถ ดูแลนั่งรถเข็น อำนวยความสะดวกเปิดสิทธิการรักษา ประสานงานรับบัตรคิวทุกจุด', img: 'assets/step_3_arrival_aikchol.webp' },
    { start: 64.0, end: 86.0, num: 4, title: 'During Consultation', thTitle: '4. เคียงข้างระหว่างพบแพทย์', desc: 'เข้าห้องตรวจร่วมกับผู้ป่วย ช่วยจดบันทึกคำสั่งแพทย์และแนวทางการรักษา ไม่ตกหล่นทุกรายละเอียด', img: 'assets/step_4_doctor_consult.webp' },
    { start: 86.0, end: 115.0, num: 5, title: 'Send Back & Service Report', thTitle: '5. ส่งกลับบ้าน & สรุปรายงาน', desc: 'ส่งกลับถึงบ้านอย่างปลอดภัย ตรวจความเรียบร้อย และส่งรายงานสรุปกิจกรรมให้ครอบครัวผ่าน LINE ทันที', img: 'assets/step_5_service_report.webp' }
  ];

  // Set initial chapter live card
  if (liveCardThumb && chapters[0].img) {
    liveCardThumb.src = chapters[0].img;
    liveCardThumb.alt = chapters[0].thTitle;
  }
  function togglePlay() {
    if (video.paused) {
      video.play();
      updatePlayIcons(true);
    } else {
      video.pause();
      updatePlayIcons(false);
    }
  }

  function updatePlayIcons(isPlaying) {
    if (playBtn) {
      playBtn.innerHTML = '<svg class="ahc-icon ahc-icon-xl" viewBox="0 0 24 24" style="stroke:#ffffff; fill:#ffffff; margin-left: 4px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }
    if (playIconBtn) {
      playIconBtn.innerHTML = isPlaying 
        ? '<svg class="ahc-icon ahc-icon-sm" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>' 
        : '<svg class="ahc-icon ahc-icon-sm" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }
    const frame = video.closest('.ahc-video-frame');
    if (frame) {
      if (isPlaying) frame.classList.remove('paused');
      else frame.classList.add('paused');
    }
  }

  video.addEventListener('play', () => updatePlayIcons(true));
  video.addEventListener('pause', () => updatePlayIcons(false));

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (playIconBtn) playIconBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted 
        ? '<svg class="ahc-icon ahc-icon-sm" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>' 
        : '<svg class="ahc-icon ahc-icon-sm" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      video.currentTime = 0;
      video.play();
      updatePlayIcons(true);
    });
  }

  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      video.currentTime = clickPos * (video.duration || 107.2);
    });
  }

  video.addEventListener('timeupdate', () => {
    const cur = video.currentTime || 0;
    const dur = (video.duration && !isNaN(video.duration)) ? video.duration : 107.2;
    const pct = (cur / dur) * 100;
    if (progressFill) progressFill.style.width = pct + '%';

    if (timeDisplay) {
      const curM = Math.floor(cur / 60);
      const curS = Math.floor(cur % 60);
      const durM = Math.floor(dur / 60);
      const durS = Math.floor(dur % 60);
      timeDisplay.textContent = `${curM}:${curS < 10 ? '0' : ''}${curS} / ${durM}:${durS < 10 ? '0' : ''}${durS}`;
    }

    const currentChapter = chapters.find(ch => cur >= ch.start && cur < ch.end) || chapters[chapters.length - 1];
    
    if (currentChapter) {
      if (chapterPill) {
        chapterPill.textContent = `ขั้นตอนที่ ${currentChapter.num}: ${currentChapter.title}`;
      }

      chapterBtns.forEach((btn, idx) => {
        if (idx === currentChapter.num - 1) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      if (liveCardTitle) liveCardTitle.textContent = `${currentChapter.thTitle} (${currentChapter.title})`;
      if (liveCardDesc) liveCardDesc.textContent = currentChapter.desc;
      if (liveCardThumb && currentChapter.img) {
        if (!liveCardThumb.src.endsWith(currentChapter.img)) {
          liveCardThumb.src = currentChapter.img;
          liveCardThumb.alt = currentChapter.thTitle;
        }
      }
    }
  });

  chapterBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const seekTime = parseFloat(btn.dataset.time || 0);
      video.currentTime = seekTime;
      const targetChapter = chapters[idx];
      if (targetChapter) {
        if (chapterPill) chapterPill.textContent = `ขั้นตอนที่ ${targetChapter.num}: ${targetChapter.title}`;
        chapterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (liveCardTitle) liveCardTitle.textContent = `${targetChapter.thTitle} (${targetChapter.title})`;
        if (liveCardDesc) liveCardDesc.textContent = targetChapter.desc;
        if (liveCardThumb && targetChapter.img) {
          liveCardThumb.src = targetChapter.img;
          liveCardThumb.alt = targetChapter.thTitle;
        }
      }
      video.play();
      updatePlayIcons(true);
    });
  });

  video.addEventListener('ended', () => {
    updatePlayIcons(false);
  });
}

/* --------------------------------------------------------------------------
   5. Pricing Duration Switcher (5 Hours vs 8 Hours)
   -------------------------------------------------------------------------- */
function initPricingToggle() {
  const toggleBtns = document.querySelectorAll('.ahc-pricing-toggle-btn');
  const pricePkg1 = document.getElementById('ahcPricePkg1');
  const pricePkg2 = document.getElementById('ahcPricePkg2');
  const unitPkg1 = document.getElementById('ahcUnitPkg1');
  const unitPkg2 = document.getElementById('ahcUnitPkg2');

  const prices = {
    '5': {
      pkg1: '1,000 บาท',
      pkg2: '1,300 บาท',
      unit: '/ บริการ 5 ชั่วโมง (ครึ่งวัน)'
    },
    '8': {
      pkg1: '1,500 บาท',
      pkg2: '1,800 บาท',
      unit: '/ บริการ 8 ชั่วโมง (เต็มวัน)'
    }
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const hours = btn.dataset.hours;
      if (prices[hours]) {
        if (pricePkg1) pricePkg1.textContent = prices[hours].pkg1;
        if (pricePkg2) pricePkg2.textContent = prices[hours].pkg2;
        if (unitPkg1) unitPkg1.textContent = prices[hours].unit;
        if (unitPkg2) unitPkg2.textContent = prices[hours].unit;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5b. Pricing Card Interactive Selection (Blue Border Tracking)
   -------------------------------------------------------------------------- */
function initPricingCardSelection() {
  const cards = document.querySelectorAll('.ahc-price-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => {
        c.classList.remove('ahc-price-card-recommended');
        c.classList.remove('active');
        const btn = c.querySelector('button[data-open-booking]');
        if (btn) {
          btn.classList.remove('ahc-btn-primary');
          btn.classList.add('ahc-btn-outline');
        }
      });

      card.classList.add('ahc-price-card-recommended');
      card.classList.add('active');

      const activeBtn = card.querySelector('button[data-open-booking]');
      if (activeBtn) {
        activeBtn.classList.remove('ahc-btn-outline');
        activeBtn.classList.add('ahc-btn-primary');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Chonburi District Directory & Details
   -------------------------------------------------------------------------- */
function initDistrictSelector() {
  const chips = document.querySelectorAll('.ahc-district-chip');
  const hotspots = document.querySelectorAll('.ahc-map-hotspot');
  const activePinEl = document.getElementById('ahcMapActivePin');
  const pinTitleEl = document.getElementById('ahcPinTitle');
  const spotlightEl = document.getElementById('ahcMapSpotlight');
  const districtNameEl = document.getElementById('ahcDistrictName');
  const districtDetailEl = document.getElementById('ahcDistrictDetail');
  const districtDistanceEl = document.getElementById('ahcDistrictDistance');

  // Exact geographic coordinates corresponding to ChonBuri-map.png (1303 x 1207)
  const districtCoords = {
    'mueang': { x: 31.08, y: 24.03, badgeBelow: false },
    'phanthong': { x: 41.06, y: 13.26, badgeBelow: true },
    'phanat': { x: 54.49, y: 9.53, badgeBelow: true },
    'banbueng': { x: 47.97, y: 26.93, badgeBelow: false },
    'bothong': { x: 77.13, y: 27.75, badgeBelow: false },
    'sriracha': { x: 34.15, y: 39.35, badgeBelow: false },
    'nongyai': { x: 59.86, y: 45.98, badgeBelow: false },
    'banglamung': { x: 32.62, y: 59.24, badgeBelow: false }
  };

  const districtData = {
    'mueang': {
      name: 'อำเภอเมืองชลบุรี',
      detail: 'ครอบคลุมใจกลางเมือง โรงพยาบาลเอกชล 1 และเอกชล 2 รถรับ-ส่งถึงบ้านอย่างรวดเร็วภายใน 15-20 นาที',
      distance: 'ฟรีระยะทาง 10 - 30 กม. ตามแพ็กเกจที่เลือก'
    },
    'phanthong': {
      name: 'อำเภอพานทอง',
      detail: 'เชื่อมต่อนิคมอมตะนครและพื้นที่อยู่อาศัย เดินทางสู่โรงพยาบาลเอกชลสะดวกผ่านทางด่วนและมอเตอร์เวย์',
      distance: 'ระยะทางเฉลี่ย 18 - 25 กม. อยู่ในโควตาแพ็กเกจผู้ดูแล+รถ'
    },
    'banbueng': {
      name: 'อำเภอบ้านบึง',
      detail: 'บริการครอบคลุมทั้งเขตเทศบาลบ้านบึงและชุมชนโดยรอบ เดินทางสู่ รพ.เอกชล ประมาณ 25-30 นาที',
      distance: 'ระยะทางเฉลี่ย 15 - 22 กม. ฟรีค่าเดินทางในแพ็กเกจผู้ดูแล+รถ'
    },
    'phanat': {
      name: 'อำเภอพนัสนิคม',
      detail: 'มีผู้สูงอายุพักอาศัยหนาแน่น เหมาะสำหรับนัดหมายโรคประจำตัว ฟอกไต และตรวจสุขภาพประจำปี',
      distance: 'ระยะทางเฉลี่ย 25 - 32 กม.'
    },
    'bothong': {
      name: 'อำเภอบ่อทอง',
      detail: 'บริการนัดหมายล่วงหน้า รถรับส่งปลอดภัย ผู้ดูแลเตรียมความพร้อมก่อนออกเดินทาง',
      distance: 'ระยะทางประมาณ 45 - 55 กม. มีการประเมินส่วนต่างระยะทางล่วงหน้าอย่างโปร่งใส'
    },
    'nongyai': {
      name: 'อำเภอหนองใหญ่',
      detail: 'บริการนัดหมายพิเศษสำหรับผู้ป่วยเคมีบำบัดและพบแพทย์เฉพาะทาง',
      distance: 'ระยะทางประมาณ 40 - 50 กม.'
    },
    'sriracha': {
      name: 'อำเภอศรีราชา',
      detail: 'ครอบคลุมทั้งตัวเมืองศรีราชา บางพระ อ่าวอุดม เดินทางสะดวก ปลอดภัยด้วยรถมาตรฐาน',
      distance: 'ระยะทางเฉลี่ย 20 - 28 กม. อยู่ในโควตาแพ็กเกจผู้ดูแล+รถ'
    },
    'banglamung': {
      name: 'อำเภอบางละมุง (พัทยา)',
      detail: 'ครอบคลุมพัทยา นาเกลือ และบางละมุง บริการพาพบแพทย์ทั้ง รพ.เอกชล และสถานพยาบาลชั้นนำ',
      distance: 'ระยะทางประมาณ 40 - 50 กม. นัดหมายล่วงหน้าเพื่อจัดคิวรถเฉพาะ'
    }
  };

  function selectDistrict(key) {
    if (!districtData[key] || !districtCoords[key]) return;

    // Update chips
    chips.forEach(c => {
      c.classList.toggle('active', c.dataset.district === key);
    });

    // Update hotspots
    hotspots.forEach(h => {
      h.classList.toggle('active', h.dataset.district === key);
    });

    // Update map active pin (only shows the selected district)
    const coord = districtCoords[key];
    if (activePinEl) {
      activePinEl.style.left = coord.x + '%';
      activePinEl.style.top = coord.y + '%';
      activePinEl.classList.toggle('badge-below', !!coord.badgeBelow);
    }

    if (pinTitleEl) {
      pinTitleEl.textContent = districtData[key].name;
    }

    // Update spotlight focus on map
    if (spotlightEl) {
      spotlightEl.style.setProperty('--spot-x', coord.x + '%');
      spotlightEl.style.setProperty('--spot-y', coord.y + '%');
    }

    // Update info box below map
    if (districtNameEl) districtNameEl.textContent = districtData[key].name;
    if (districtDetailEl) districtDetailEl.textContent = districtData[key].detail;
    if (districtDistanceEl) districtDistanceEl.textContent = districtData[key].distance;
  }

  // Click on chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.district;
      selectDistrict(key);
    });
  });

  // Click directly on map hotspots
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      const key = hotspot.dataset.district;
      selectDistrict(key);
    });
  });

  // Initialize with default district
  selectDistrict('mueang');
}

/* --------------------------------------------------------------------------
   7. Interactive Checklist
   -------------------------------------------------------------------------- */
function initChecklist() {
  const items = document.querySelectorAll('.ahc-check-item');
  const countEl = document.getElementById('ahcChecklistCount');

  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      updateCheckCount();
    });
  });

  function updateCheckCount() {
    const checked = document.querySelectorAll('.ahc-check-item.checked').length;
    if (countEl) countEl.textContent = `เตรียมพร้อม ${checked}/5 อย่าง`;
  }
}

/* --------------------------------------------------------------------------
   8. Included Health & Maven Style: Interactive FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.ahc-faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.ahc-faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close others for clean accordion behavior
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Senior Accessibility Mode (Font Magnifier)
   -------------------------------------------------------------------------- */
function initSeniorMode() {
  const toggleBtn = document.getElementById('ahcSeniorModeBtn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('senior-mode');
    const isSenior = document.body.classList.contains('senior-mode');
    const label = toggleBtn.querySelector('span') || toggleBtn;
    label.textContent = isSenior ? 'A- ขนาดตัวอักษรปกติ' : 'A+ ตัวหนังสือใหญ่';
  });
}

/* --------------------------------------------------------------------------
   10. Booking Modal & Flow (CR.md Item 1 & 2)
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const backdrop = document.getElementById('ahcBookingModal');
  const openBtns = document.querySelectorAll('[data-open-booking]');
  const closeBtn = document.getElementById('ahcModalClose');
  // Let native wheel/touch scrolling happen inside modals (Lenis ignores these)
  document.querySelectorAll('.ahc-modal-backdrop').forEach(m => m.setAttribute('data-lenis-prevent', ''));
  const pkgChoices = document.querySelectorAll('.ahc-pkg-choice');
  const bookingForm = document.getElementById('ahcBookingForm');
  const selectedPkgInput = document.getElementById('ahcSelectedPackage');
  const hospitalSelect = document.getElementById('ahcCustHospital');
  const hospitalOtherGroup = document.getElementById('ahcHospitalOtherGroup');
  const hospitalOtherInput = document.getElementById('ahcCustHospitalOther');

  if (!backdrop) return;

  // CR Item 2: Configurable LINE OA ID (Aikchol Next or dedicated Go Cares)
  const LINE_OA_ID = '@aikcholnext';

  function openModal(preselectedPkg) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    if (preselectedPkg) {
      pkgChoices.forEach(c => {
        if (c.dataset.pkg === preselectedPkg) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });
      if (selectedPkgInput) selectedPkgInput.value = preselectedPkg;
    }
    // CR Tracking
    trackMarketingEvent('booking_modal_opened', { preselectedPkg: preselectedPkg || 'pkg2' });
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkg = btn.dataset.pkg || 'pkg2';
      openModal(pkg);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  pkgChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      pkgChoices.forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');
      if (selectedPkgInput) selectedPkgInput.value = choice.dataset.pkg;
      trackMarketingEvent('package_selected', { package: choice.dataset.pkg });
    });
  });

  // CR Item 1: เมื่อเลือก “อื่นๆ” ให้แสดง Field สำหรับกรอกชื่อโรงพยาบาล (รองรับ TH / EN / Number)
  if (hospitalSelect && hospitalOtherGroup) {
    hospitalSelect.addEventListener('change', () => {
      const isOther = hospitalSelect.value === 'อื่นๆ';
      hospitalOtherGroup.style.display = isOther ? 'block' : 'none';
      if (hospitalOtherInput) {
        hospitalOtherInput.required = isOther;
        if (isOther) {
          hospitalOtherInput.focus();
          trackMarketingEvent('hospital_other_option_chosen');
        }
      }
    });
  }

  // CR Item 1: Validation TH / EN / Number
  if (hospitalOtherInput) {
    hospitalOtherInput.addEventListener('input', (e) => {
      const clean = e.target.value.replace(/[^a-zA-Z0-9ก-๙\s\.\(\)\/\-\,\_]/g, '');
      if (clean !== e.target.value) {
        e.target.value = clean;
      }
    });
  }

  // CR Item 1 & 2: Form Submission & Direct LINE OA Link
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('ahcPatientName')?.value.trim() || '';
      const patientRelation = document.getElementById('ahcPatientRelation')?.value || 'บุตร / ธิดา';
      const contactName = document.getElementById('ahcContactName')?.value.trim() || '';
      const contactPhone = document.getElementById('ahcContactPhone')?.value.trim() || '';
      const contactLineId = document.getElementById('ahcContactLineId')?.value.trim() || '';
      const district = document.getElementById('ahcCustDistrict')?.value || '';
      const hospitalSelected = hospitalSelect?.value || 'โรงพยาบาลเอกชล (ถ.พระยาสัจจา)';
      
      const finalHospital = (hospitalSelected === 'อื่นๆ')
        ? (hospitalOtherInput?.value.trim() || 'โรงพยาบาลอื่นๆ (ไม่ระบุชื่อ)')
        : hospitalSelected;

      const pkgMap = {
        'pkg1': 'แพ็กเกจ 1: มาตรฐาน (เริ่ม 1,000 บ.)',
        'pkg2': 'แพ็กเกจ 2: ผู้ดูแล + รถ (เริ่ม 1,300 บ.)',
        'pkg3': 'แพ็กเกจ 3: บริการพาทำกิจกรรม (เริ่ม 1,500 บ.)'
      };
      const rawPkg = selectedPkgInput?.value || 'pkg2';
      const pkg = pkgMap[rawPkg] || rawPkg;

      // Format rich appointment message for LINE OA
      const lineMessageLines = [
        'สวัสดีครับ/ค่ะ สนใจจองบริการ GO CARES by AIKCHOL NEXT',
        '---------------------------------------',
        `📦 แพ็กเกจที่เลือก: ${pkg}`,
        `👵 ข้อมูลผู้ป่วย: ${patientName}`,
        `🤝 ความสัมพันธ์: ${patientRelation}`,
        `👤 ผู้ติดต่อประสานงาน: ${contactName}`,
        `📞 เบอร์โทรศัพท์: ${contactPhone}`,
        `💬 LINE ID: ${contactLineId || 'ไม่ได้ระบุ'}`,
        `📍 อำเภอที่พัก: ${district}`,
        `🏥 โรงพยาบาลปลายทาง: ${finalHospital}`,
        '---------------------------------------',
        '(ส่งข้อมูลผ่านระบบแบบฟอร์มเว็บไซต์ GO CARES)'
      ];
      const fullMessageText = lineMessageLines.join('\n');
      const encodedMessage = encodeURIComponent(fullMessageText);

      // Save lead locally (Free CRM / Local storage log)
      saveLeadData({
        patientName,
        patientRelation,
        contactName,
        contactPhone,
        contactLineId,
        district,
        hospital: finalHospital,
        isOtherHospital: hospitalSelected === 'อื่นๆ',
        package: pkg,
        submittedAt: new Date().toISOString()
      });

      // CR Item 4: Track Event in dataLayer
      trackMarketingEvent('lead_form_submitted', {
        package_name: pkg,
        patient_relation: patientRelation,
        district: district,
        hospital: finalHospital,
        is_other_hospital: hospitalSelected === 'อื่นๆ',
        has_line_id: Boolean(contactLineId)
      });

      // Auto copy to clipboard for user convenience (if browser fails to prefill in LINE)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullMessageText).catch(() => {});
      }

      // Open LINE OA directly
      const lineUrl = `https://line.me/R/ti/p/~${LINE_OA_ID}?text=${encodedMessage}`;
      window.open(lineUrl, '_blank');

      alert(`ขอบคุณครับ/ค่ะ ข้อมูลของคุณถูกส่งต่อไปยัง LINE Official (${LINE_OA_ID}) เรียบร้อยแล้ว!\n\nเจ้าหน้าที่จะติดต่อกลับที่เบอร์ ${contactPhone} หรือ LINE ID "${contactLineId || '-'}" โดยเร็วที่สุด\n(ระบบได้คัดลอกข้อความสรุปไว้ให้ท่านเรียบร้อยแล้ว)`);
      
      bookingForm.reset();
      if (hospitalOtherGroup) hospitalOtherGroup.style.display = 'none';
      closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   11. Marketing & Analytics Tracking Engine (CR.md Item 4 - 100% Free)
   -------------------------------------------------------------------------- */
function initMarketingTracking() {
  // Setup GTM / GA4 standard dataLayer
  window.dataLayer = window.dataLayer || [];

  // Track phone calls
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      const tel = link.getAttribute('href').replace('tel:', '');
      trackMarketingEvent('contact_phone_call', { phone_number: tel });
    });
  });

  // Track direct LINE button clicks
  document.querySelectorAll('a[href*="line.me"]').forEach(link => {
    link.addEventListener('click', () => {
      trackMarketingEvent('contact_line_oa_click', { href: link.getAttribute('href') });
    });
  });

  // Expose marketing report function in developer console
  window.getMarketingAnalyticsReport = function() {
    const events = JSON.parse(localStorage.getItem('ahc_marketing_events') || '[]');
    const leads = JSON.parse(localStorage.getItem('ahc_leads') || '[]');
    console.table(leads);
    return {
      totalEvents: events.length,
      totalLeads: leads.length,
      eventsSummary: events.reduce((acc, ev) => {
        acc[ev.event] = (acc[ev.event] || 0) + 1;
        return acc;
      }, {}),
      recentLeads: leads
    };
  };
}

function trackMarketingEvent(eventName, payload = {}) {
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };

  // Push to dataLayer for GA4 / GTM
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }

  // Local storage logging for instant analytics without backend
  try {
    const maxEvents = 150;
    const existing = JSON.parse(localStorage.getItem('ahc_marketing_events') || '[]');
    existing.push(eventData);
    if (existing.length > maxEvents) existing.shift();
    localStorage.setItem('ahc_marketing_events', JSON.stringify(existing));
  } catch (e) {}
}

function saveLeadData(lead) {
  try {
    const existing = JSON.parse(localStorage.getItem('ahc_leads') || '[]');
    existing.push(lead);
    localStorage.setItem('ahc_leads', JSON.stringify(existing));
  } catch (e) {}
}

/* --------------------------------------------------------------------------
   12. Smart AI / Natural Language Instant Search (CR.md Item 3 - 100% Free)
   -------------------------------------------------------------------------- */
function initSmartAISearch() {
  const searchModal = document.getElementById('ahcSearchModal');
  const searchTrigger = document.getElementById('ahcSearchTrigger');
  const searchClose = document.getElementById('ahcSearchModalClose');
  const searchInput = document.getElementById('ahcSearchInput');
  const searchClear = document.getElementById('ahcSearchClearBtn');
  const searchResults = document.getElementById('ahcSearchResults');
  const quickTags = document.querySelectorAll('.ahc-quick-tag-btn');

  if (!searchModal || !searchInput || !searchResults) return;

  // Built-in Knowledge Base of GO CARES
  const knowledgeBase = [
    {
      id: 'price-packages',
      title: 'อัตราค่าบริการและราคาแพ็กเกจ GO CARES',
      keywords: ['ราคา', 'แพ็กเกจ', 'กี่บาท', 'ค่าบริการ', 'เท่าไหร่', 'package', 'price', 'cost'],
      category: 'ค่าบริการ',
      answer: 'GO CARES มี 3 แพ็กเกจหลัก: 1) แพ็กเกจมาตรฐาน 4 ชม. เริ่มต้น 1,000 บาท (ดูแลใน รพ.), 2) แพ็กเกจผู้ดูแล + รถรับส่ง เริ่มต้น 1,300 บาท (แนะนำ มีรถตู้รับ-ส่งถึงบ้าน), 3) บริการพาทำกิจกรรม 6 ชม. เริ่มต้น 1,500 บาท รวมประกันอุบัติเหตุและรายงาน LINE ตลอดการบริการ',
      actionLabel: 'เปิดแบบฟอร์มจองบริการ',
      actionType: 'booking',
      actionPkg: 'pkg2'
    },
    {
      id: 'dialysis-service',
      title: 'บริการรับ-ส่งและดูแลผู้ป่วยฟอกไต (Hemodialysis)',
      keywords: ['ฟอกไต', 'ไตวาย', 'ล้างไต', 'ไต', 'dialysis', 'hemodialysis'],
      category: 'บริการเฉพาะโรค',
      answer: 'GO CARES มีบริการพาผู้ป่วยฟอกไตตามรอบนัดหมายเป็นประจำ มีรถรับ-ส่งถึงบ้าน ช่วยเข็นรถ ประสานพยาบาลห้องฟอกไต อยู่ดูแลระหว่างรอ และพากลับเข้าบ้านอย่างปลอดภัย ครอบครัวติดตามสถานะได้ผ่าน LINE ตลอดเวลา',
      actionLabel: 'จองบริการดูแลผู้ป่วยฟอกไต',
      actionType: 'booking',
      actionPkg: 'pkg2'
    },
    {
      id: 'chemo-service',
      title: 'บริการรับ-ส่งผู้ป่วยทำเคมีบำบัด / ฉายแสง (Chemotherapy)',
      keywords: ['คีโม', 'เคมีบำบัด', 'มะเร็ง', 'ฉายแสง', 'chemo', 'chemotherapy', 'cancer'],
      category: 'บริการเฉพาะโรค',
      answer: 'ดูแลผู้ป่วยมะเร็งที่ต้องรับยาเคมีบำบัดหรือฉายแสง ผู้ดูแลผ่านการฝึกอบรมการเฝ้าระวังอาการอ่อนเพลีย คลื่นไส้ ช่วยพยุง รับยาแทน และพาส่งถึงเตียงนอนที่บ้านอย่างปลอดภัย',
      actionLabel: 'จองแพ็กเกจดูแลผู้ป่วยคีโม',
      actionType: 'booking',
      actionPkg: 'pkg2'
    },
    {
      id: 'wheelchair-accessibility',
      title: 'การรองรับผู้สูงอายุที่ใช้รถเข็น (Wheelchair)',
      keywords: ['รถเข็น', 'wheelchair', 'เดินไม่ได้', 'พยุง', 'ทางลาด', 'นั่งรถเข็น'],
      category: 'ยานพาหนะและอุปกรณ์',
      answer: 'รถตู้บริการของ GO CARES ออกแบบมาเพื่อรองรับผู้สูงอายุและผู้ใช้วีลแชร์โดยเฉพาะ มีทางลาด/พื้นที่ยึดตรึงรถเข็น และผู้ดูแลช่วยพยุงเข็นรถตลอดทุกจุดตรวจในโรงพยาบาลโดยไม่ปล่อยให้อยู่ตามลำพัง',
      actionLabel: 'ปรึกษาเรื่องรถเข็นและยานพาหนะ',
      actionType: 'booking',
      actionPkg: 'pkg2'
    },
    {
      id: 'pickup-coverage',
      title: 'พื้นที่บริการรับ-ส่งในจังหวัดชลบุรี',
      keywords: ['พื้นที่', 'รับส่ง', 'บ้าน', 'ที่พัก', 'ชลบุรี', 'ศรีราชา', 'พานทอง', 'บ้านบึง', 'พนัสนิคม', 'พัทยา', 'บางละมุง', 'area'],
      category: 'พื้นที่ให้บริการ',
      answer: 'ให้บริการครอบคลุมทั่วจังหวัดชลบุรี ได้แก่ อ.เมืองชลบุรี, อ.ศรีราชา, อ.บ้านบึง, อ.พานทอง, อ.พนัสนิคม, อ.บางละมุง (พัทยา), อ.บ่อทอง และ อ.หนองใหญ่ รถไปรับตรงเวลาถึงหน้าบ้าน',
      actionLabel: 'ตรวจสอบพื้นที่และจองคิว',
      actionType: 'booking',
      actionPkg: 'pkg2'
    },
    {
      id: 'hospitals-coverage',
      title: 'ไปโรงพยาบาลรัฐ หรือ โรงพยาบาลอื่นๆ นอกเหนือจากเอกชล ได้ไหม?',
      keywords: ['รพ', 'โรงพยาบาล', 'รพ.ชลบุรี', 'สมเด็จ', 'ม.บูรพา', 'รพ.รัฐ', 'คลินิก', 'เอกชล', 'hospital'],
      category: 'โรงพยาบาลปลายทาง',
      answer: 'สามารถพาไปได้ทุกโรงพยาบาลทั้งภาครัฐและเอกชนในชลบุรี เช่น โรงพยาบาลเอกชล, รพ.เอกชล อ่างศิลา, โรงพยาบาลชลบุรี (รพ.รัฐ), รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา, รพ.มหาวิทยาลัยบูรพา รวมถึงคลินิกเฉพาะทาง',
      actionLabel: 'ระบุโรงพยาบาลปลายทางในแบบฟอร์ม',
      actionType: 'booking',
      actionPkg: 'pkg2'
    },
    {
      id: 'line-reporting',
      title: 'การรายงานสถานะครอบครัวผ่าน LINE ตลอดเวลา',
      keywords: ['line', 'ไลน์', 'รายงาน', 'อัปเดต', 'ติดตาม', 'รูปภาพ', 'ครอบครัว', 'report'],
      category: 'การสื่อสาร',
      answer: 'ผู้ดูแลจะส่งภาพถ่ายและข้อความรายงานผ่าน LINE เป็นระยะ เช่น เมื่อถึงบ้านคุณยาย, เมื่อถึงโรงพยาบาล, ขณะรอตรวจ, บันทึกคำสั่งแพทย์, และรูปภาพยาพร้อมวิธีใช้ เพื่อให้ลูกหลานที่ทำงานอยู่สบายใจ',
      actionLabel: 'แชทสอบถามทาง LINE OA',
      actionType: 'line'
    },
    {
      id: 'booking-advance',
      title: 'ต้องจองล่วงหน้ากี่วัน?',
      keywords: ['จองล่วงหน้า', 'นัดหมาย', 'วันนัด', 'ด่วน', 'กี่วัน', 'เวลาทำการ', 'book'],
      category: 'ขั้นตอนการจอง',
      answer: 'แนะนำจองล่วงหน้าอย่างน้อย 1-2 วัน เพื่อจัดเตรียมยานพาหนะและผู้ดูแลที่เหมาะสมที่สุด กรณีเคสด่วนสามารถโทรติดต่อสายด่วน 063 920 4765 เพื่อตรวจสอบคิวว่างได้ทันที',
      actionLabel: 'โทรสายด่วน 063 920 4765',
      actionType: 'call'
    }
  ];

  function openSearch() {
    searchModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    setTimeout(() => searchInput.focus(), 100);
    renderResults(knowledgeBase.slice(0, 4), 'คำถามและบริการที่พบบ่อย');
    trackMarketingEvent('search_modal_opened');
  }

  function closeSearch() {
    searchModal.classList.remove('open');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // Keyboard shortcut Ctrl+K / Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      closeSearch();
    }
  });

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      if (searchClear) searchClear.style.display = 'none';
      renderResults(knowledgeBase.slice(0, 4), 'คำถามและบริการที่พบบ่อย');
      return;
    }

    if (searchClear) searchClear.style.display = 'block';

    const matched = knowledgeBase.map(item => {
      let score = 0;
      if (item.title.toLowerCase().includes(q)) score += 10;
      if (item.answer.toLowerCase().includes(q)) score += 5;
      if (item.category.toLowerCase().includes(q)) score += 4;
      
      item.keywords.forEach(kw => {
        if (q.includes(kw.toLowerCase()) || kw.toLowerCase().includes(q)) {
          score += 6;
        }
      });
      return { item, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(res => res.item);

    renderResults(matched, matched.length ? `ผลการค้นหาสำหรับ "${query}" (${matched.length} รายการ)` : `ไม่พบข้อมูลที่ตรงกับ "${query}"`);
    trackMarketingEvent('search_query_executed', { query, resultsCount: matched.length });
  }

  function renderResults(items, headerText) {
    if (!items.length) {
      searchResults.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; color: var(--ahc-text-muted);">
          <p style="font-size: 15px; margin-bottom: 8px;">ไม่พบข้อมูลที่ตรงกับการค้นหา</p>
          <p style="font-size: 13px;">สามารถโทรสอบถามเจ้าหน้าที่ได้โดยตรงที่ <a href="tel:0639204765" style="color: var(--ahc-blue); font-weight: 700;">063 920 4765</a> หรือแชททาง LINE</p>
        </div>
      `;
      return;
    }

    let html = `<div style="font-size: 12.5px; font-weight: 600; color: var(--ahc-blue); margin-bottom: 4px;">${headerText}</div>`;
    items.forEach(it => {
      html += `
        <div class="ahc-search-result-card">
          <div class="ahc-search-card-top">
            <h4 class="ahc-search-card-title">${it.title}</h4>
            <span class="ahc-search-match-badge">${it.category}</span>
          </div>
          <p class="ahc-search-card-snippet">${it.answer}</p>
          <button type="button" class="ahc-search-card-action" data-action="${it.actionType}" data-pkg="${it.actionPkg || 'pkg2'}">
            <span>${it.actionLabel}</span>
            <svg class="ahc-icon ahc-icon-sm" viewBox="0 0 24 24" style="width: 14px; height: 14px;">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      `;
    });
    searchResults.innerHTML = html;

    // Attach handlers for card action buttons
    searchResults.querySelectorAll('.ahc-search-card-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const pkg = btn.dataset.pkg;
        closeSearch();
        if (action === 'booking') {
          const bookingTrigger = document.querySelector(`[data-open-booking][data-pkg="${pkg}"]`) || document.querySelector('[data-open-booking]');
          if (bookingTrigger) bookingTrigger.click();
        } else if (action === 'line') {
          window.open('https://line.me/R/ti/p/~@aikcholnext', '_blank');
        } else if (action === 'call') {
          window.location.href = 'tel:0639204765';
        }
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    runSearch(e.target.value);
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      runSearch('');
    });
  }

  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.query || '';
      searchInput.value = q;
      runSearch(q);
    });
  });
}

/* --------------------------------------------------------------------------
   13. Mobile Hamburger Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('ahcMobileToggle');
  const menu = document.getElementById('ahcNavMenu');
}

/* --------------------------------------------------------------------------
   11. Mobile Hamburger Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('ahcMobileToggle');
  const menu = document.getElementById('ahcNavMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.style.display === 'flex';
    menu.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '74px';
      menu.style.left = '20px';
      menu.style.right = '20px';
      menu.style.background = '#ffffff';
      menu.style.padding = '20px 24px';
      menu.style.boxShadow = '0 16px 36px rgba(0, 70, 128, 0.18)';
      menu.style.borderRadius = '20px';
      menu.style.border = '1.5px solid var(--ahc-border)';
    }
  });

  document.querySelectorAll('.ahc-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && menu) {
        menu.style.display = 'none';
      }
    });
  });
}

