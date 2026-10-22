import React from 'react';
import { SiteContent } from '../lib/site-content-types';

const chapters = [
  { time: '0.0', step: 'Step 1', clock: '0:00', title: '1. นัดหมาย & วางแผน' },
  { time: '21.0', step: 'Step 2', clock: '0:21', title: '2. รับจากบ้านตรงเวลา' },
  { time: '42.0', step: 'Step 3', clock: '0:42', title: '3. ถึง รพ. & ลงทะเบียน' },
  { time: '64.0', step: 'Step 4', clock: '1:04', title: '4. เคียงข้างพบแพทย์' },
  { time: '86.0', step: 'Step 5', clock: '1:26', title: '5. รับยา & ส่งกลับบ้าน' },
];

export default function VideoSection({ content }: { content: SiteContent }) {
  const first = content.moments[0];

  return (
    <section className="ahc-video-section" id="video-tour">
      <div className="ahc-container">
        <div className="ahc-section-header ahc-reveal">
          <span className="ahc-badge-medical" style={{ marginBottom: '12px' }}>
            <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>VDO PRESENTATION • 1:47 นาที</span>
          </span>
          <h2 className="ahc-section-title">สัมผัสประสบการณ์ GO CARES ใน 1:47 นาที</h2>
          <p className="ahc-section-subtitle">
            วิดีโอจำลองเส้นทางการดูแลผู้รับบริการ ตั้งแต่โทรนัดหมาย วางแผนการเดินทาง รับจากบ้าน เข้าพบแพทย์
            จนถึงส่งกลับบ้านอย่างปลอดภัย คลิกเลือกดูแต่ละขั้นตอนได้ทันที
          </p>
        </div>

        <div className="ahc-video-player-container ahc-reveal ahc-delay-1">
          <div className="ahc-video-ambient-glow"></div>

          <div className="ahc-video-frame paused">
            <video
              id="ahcMainVideo"
              className="ahc-main-video"
              poster={content.images.videoPoster}
              playsInline
              preload="none"
            >
              <source src="assets/ahc_next03_web_720p.mp4" media="(max-width: 768px)" type="video/mp4" />
              <source src="assets/ahc_next03_web_1080p.mp4" type="video/mp4" />
              เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ HTML5
            </video>

            <button id="ahcBigPlayBtn" className="ahc-big-play-btn" aria-label="เล่นวิดีโอ">
              <svg className="ahc-icon ahc-icon-xl" viewBox="0 0 24 24" style={{ stroke: '#ffffff', fill: '#ffffff' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>

            <div className="ahc-video-controls-overlay">
              <div className="ahc-video-top-bar">
                <span className="ahc-video-current-chapter" id="ahcCurrentChapterPill">ขั้นตอนที่ 1: Book & Plan</span>
                <button id="ahcRestartBtn" className="ahc-ctrl-icon-btn" title="เล่นใหม่ตั้งแต่ต้น">
                  <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  <span style={{ fontSize: '12px', marginLeft: '4px' }}>เล่นใหม่</span>
                </button>
              </div>

              <div className="ahc-video-bottom-bar">
                <div className="ahc-video-progress-track" id="ahcProgressTrack">
                  <div className="ahc-video-progress-fill" id="ahcProgressFill"></div>
                </div>

                <div className="ahc-video-control-buttons">
                  <div className="ahc-ctrl-left">
                    <button id="ahcPlayIconBtn" className="ahc-ctrl-icon-btn" aria-label="Play/Pause">
                      <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                    <button id="ahcMuteBtn" className="ahc-ctrl-icon-btn" aria-label="Mute/Unmute">
                      <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    </button>
                    <span id="ahcTimeDisplay" style={{ fontFamily: 'var(--ahc-font-latin)', fontSize: '13px' }}>
                      0:00 / 1:47
                    </span>
                  </div>
                  <div className="ahc-ctrl-right">
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
                      Aikchol Hospital Care Journey
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ahc-chapter-timeline-nav">
            {chapters.map((ch, index) => (
              <button key={ch.step} className={`ahc-chapter-btn ${index === 0 ? 'active' : ''}`} data-time={ch.time}>
                <div className="ahc-chapter-step-num">
                  <span>{ch.step}</span>
                  <span className="ahc-chapter-step-time">{ch.clock}</span>
                </div>
                <div className="ahc-chapter-title">{ch.title}</div>
              </button>
            ))}
          </div>

          <div className="ahc-chapter-live-card">
            <div className="ahc-live-card-body">
              <img
                id="ahcLiveStepThumb"
                src={first.image}
                alt="1. นัดหมาย & วางแผนการเดินทาง"
                className="ahc-live-card-thumb"
              />
              <div className="ahc-live-card-info">
                <h4 id="ahcLiveStepTitle">1. นัดหมาย & วางแผนการเดินทาง (Book & Plan)</h4>
                <p id="ahcLiveStepDesc">
                  ทีมงานสอบถามประวัติและวางแผนการเดินทาง ยืนยันข้อมูลผู้รับบริการและเวลานัดหมายล่วงหน้า
                </p>
              </div>
            </div>
            <button className="ahc-btn ahc-btn-green" data-open-booking data-pkg="pkg2">
              <span>สอบถามขั้นตอนนี้</span>
              <svg className="ahc-icon ahc-icon-sm" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
