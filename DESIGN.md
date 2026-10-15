# Design System Inspiration of GO CARES by AIKCHOL NEXT

## 1. Visual Theme & Atmosphere

GO CARES by AIKCHOL NEXT is an end-to-end medical companion and personal caregiver service established by Aikchol Hospital PLC (โรงพยาบาลเอกชล) in Chonburi, Thailand. Its design system embodies **Compassionate Clinical Warmth & Accessible Healthcare Mobility** — bridging the gap between sterile hospital professionalism and the intimate, reassuring comfort of family care. The experience departs radically from clinical, intimidating hospital software or cold corporate ride-hailing apps; it radiates dignity, security, and human warmth.

The canvas rests upon immaculate, breathable white surfaces (`#ffffff`) and tranquil sky-tinted surfaces (`#f0f7ff`, `#f8fafc`). The visual anchor is Aikchol's deep, authoritative Royal Blue (`#034393`) and Navy (`#004176`), balanced immediately by the signature GO CARES Turquoise-Cyan (`#67c2cc`). This cyan isn't an aggressive digital electric blue; it is an uplifting, restorative coastal aqua that echoes the seaside geography of Chonburi and connotes healing, calm, and fresh vitality. A vibrant solar amber dot (`#fab700` / `#f9b524`) from the Aikchol Next brand identity serves as the energetic spark — signifying watchful attention, warmth, and hope.

The typography is built around the modern Thai geometric typeface **DB Airy** (`DB Airy Medium`, `DB Airy Rounded Std`, and `DB Airy Rounded Std Light`), paired with clean humanist sans-serif numerals and Latin glyphs (`Calibri` / `SF Pro`). DB Airy's rounded terminals and generous x-height eliminate harsh industrial edges, ensuring maximum legibility for senior citizens and stressed family caretakers, while respecting Thai tone marks and ascender clearances.

Visual storytelling is further humanized through Japanese-inspired warm narrative digital illustrations (reminiscent of Makoto Shinkai / Studio Ghibli art direction). Depicting uniformed Aikchol caregivers actively supporting smiling elders in wheelchairs outside modern hospital facilities and entering dedicated GO CARES mobility vans, the artwork communicates tangible safety, familial kindness, and professional dignity.

**Key Characteristics:**
- **Primary Canvas**: Luminous pure white (`#ffffff`) framed by soft, airy healthcare tints (`#f0f7ff`, `#f8fafc`)
- **Dual Brand Color Core**: Deep authoritative Aikchol Royal Blue (`#034393`) paired with the signature uplifting GO CARES Cyan-Teal (`#67c2cc`)
- **Warm Solar Accent**: Golden Amber (`#fab700`) used for priority status, the signature Aikchol Next logo hub, and the recommended crown badge (`👑 แนะนำ`)
- **Typographic Voice**: DB Airy family with soft rounded terminals — friendly, human, clear, and specifically optimized for Thai reading flow and elder legibility
- **Elder-Accessible Sizing**: Generous body typography (minimum 16px–18px), prominent display headlines (35px–74px), and enlarged touch targets (minimum 48px–56px)
- **Blue-Tinted Elevation**: Multi-tiered box shadows tinted with deep royal blue (`rgba(3, 67, 147, 0.08)` to `0.16)`) instead of muddy neutral black
- **Pill-Centric Hierarchy**: High-radius badge pills (`border-radius: 9999px`) for sequence numbers, status labels, contact banners, and pricing indicators
- **Comparison & Journey Scaffolding**: 6-step horizontal-to-vertical linear journey steppers and 3-column contrast matrices (Risk vs Impact vs Caregiver Solution)
- **Familial Transparency**: Integrated LINE messaging green accents (`#06c755`) and live mobile service report timeline cards showing hourly patient care milestones

---

## 2. Color Palette & Roles

### Primary Brand
- **GO CARES Cyan** (`#67c2cc`): `--gc-color-primary-cyan`. The signature brand color of GO CARES. Used for the hero wordmark, secondary action pills, progress stepper accents, and active journey step highlights.
- **Aikchol Royal Blue** (`#034393`): `--gc-color-primary-royal`. The primary institutional anchor of Aikchol Next. Used for primary CTAs, main headlines, package card borders, and primary numbered circular badges.
- **Aikchol Hospital Navy** (`#004176`): `--gc-color-primary-navy`. The deepest brand tone. Used for top-level section titles, slide subheadings, and dark container backgrounds.
- **Pure White** (`#ffffff`): `--gc-color-surface-pure`. Primary canvas, elevated card backgrounds, and button text on dark surfaces.

### Brand Accents
- **Solar Amber / Logo Center** (`#fab700`): `--gc-color-accent-amber`. The central core of the Aikchol Next circular brand mark, question mark highlights, and rating stars.
- **Recommended Gold** (`#f9b524`): `--gc-color-accent-gold`. Used on the recommended package banner (`👑 แนะนำ`) and special highlight ribbons.
- **LINE Brand Green** (`#06c755`): `--gc-color-brand-line`. Dedicated to the LINE messaging badge and family update indicators (`รายงานครอบครัวผ่าน LINE`).

### Interactive & States
- **Primary CTA Background** (`#034393`): Standard button state for high-intent actions ("ติดต่อ สอบถาม", "จองบริการ").
- **Primary CTA Hover** (`#02306b`): Darkened royal blue for hover and focus states.
- **Primary CTA Active** (`#01214a`): Deep navy for active/pressed states.
- **Secondary CTA Background** (`#67c2cc`): Light teal background for secondary actions and badge pills.
- **Secondary CTA Hover** (`#53b0bc`): Slightly deeper teal for interactive feedback.
- **Focus Ring Color** (`rgba(103, 194, 204, 0.50)`): Soft cyan halo ring (`0 0 0 3px`) for keyboard accessibility.
- **Disabled Element Fill** (`#e2e8f0`): Slate neutral for disabled inputs or inactive buttons.
- **Disabled Text** (`#94a3b8`): Low-contrast gray for disabled text labels.

### Text Hierarchy
- **Heading Solid** (`#004176`): Major page titles, hero headers, and primary card titles.
- **Heading Accent** (`#034393`): Section titles, package prices, and secondary headers.
- **Body Primary** (`#1e293b`): Main descriptive paragraphs, checklist content, and table text.
- **Body Secondary** (`#334155`): Secondary descriptions, explanatory footnotes, and card details.
- **Muted / Captions** (`#64748b`): Slide numbers, metadata, distance labels, and timeline timestamps.
- **Inverse White** (`#ffffff`): Text placed over royal blue headers or deep navy badges.

### Medical Categories & Service Badges
- **Annual Health Checkup Blue** (`#034393` on `#e0f2fe`): Stethoscope icon and checkup cards.
- **Chronic Care Red** (`#e11d48` on `#ffe4e6`): Heart disease, diabetes, and hypertension tags.
- **Hemodialysis Coral** (`#f43f5e` on `#fff1f2`): Dialysis session badges and recurring appointment trackers.
- **Chemotherapy & Oncology Pink** (`#ec4899` on `#fdf2f8`): Cancer treatment and radiation companion badges.
- **Physical Therapy Teal** (`#0d9488` on `#ccfbf1`): Rehabilitation and mobility therapy indicators.
- **Pregnancy & Maternal Rose** (`#f43f5e` on `#ffe4e6`): Expectant mother specialized care pills.
- **Dental & Ophthalmology Sky** (`#0284c7` on `#e0f2fe`): Post-procedure low-vision/anesthesia assistance.
- **Specialty Department Indigo** (`#4f46e5` on `#eef2ff`): Orthopedics, neurology, and surgery clinic visits.

### Surface & Border Scale
- **Canvas Base** (`#ffffff`): Root container background.
- **Canvas Soft Tint** (`#f8fafc`): Subtle alternating section and table row background.
- **Container Ice Blue** (`#f0f7ff`): Tinted background for callout boxes, package containers, and summary banners.
- **Border Default** (`#e2e8f0`): Subtle neutral border for standard cards and table dividers.
- **Border Highlight** (`#034393`): 2px prominent border for the Recommended ("แนะนำ") package card.
- **Border Accent Soft** (`#bfe7ec`): Soft cyan border for featured highlights and tooltips.
- **Danger / Alert Surface** (`#fef2f2`): Soft red container fill for the Wheelchair/Ambulance warning and exclusion cards.
- **Danger / Alert Border** (`#fecaca`): Subtle red border for exclusions and risk alerts.
- **Danger Icon / Text** (`#dc2626`): Red exclamation points, 'X' exclusion badges, and risk headings.
- **Info Callout Surface** (`#f0f9ff`): Soft blue alert box for overtime care and pricing transparency notices.
- **Info Callout Border** (`#bae6fd`): Border for transparent pricing alert boxes.

### Shadow Definitions
- **Shadow Soft Blue** (`rgba(3, 67, 147, 0.06)`): Low elevation for standard cards and resting buttons.
- **Shadow Card Hover** (`rgba(3, 67, 147, 0.12)`): Medium elevation for hovered cards and active pills.
- **Shadow Recommended Highlight** (`rgba(3, 67, 147, 0.18)`): Distinctive elevation for the center package card.
- **Shadow Overlay Deep** (`rgba(0, 65, 118, 0.25)`): High elevation for modal dialogs and dropdown sheets.

---

## 3. Typography Rules

### Font Families
- **Primary Display & Headings**: `DB Airy`, `DB Airy Medium`, `DB Airy Rounded Std`
- **Primary Body & Interface**: `DB Airy Rounded Std Light`, `DB Airy Rounded Std`
- **Fallback Thai Stack**: `"DB Airy", "Sukhumvit Set", "LINE Seed Sans TH", "Prompt", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Latin & Numerical Companions**: `DB Airy`, `Calibri`, `"SF Pro Text"`, `Inter`, `sans-serif`
- **Monospace (Data / Codes)**: `"SF Mono"`, `"Roboto Mono"`, `Consolas`, `monospace`

### Typographic Hierarchy

| Role | Font Family | Size | Weight | Line Height | Letter Spacing | Color | Notes & Usage |
|------|-------------|------|--------|-------------|----------------|-------|---------------|
| **Display Hero** | DB Airy Medium | 74px (4.625rem) | 600 | 1.05 (tight) | -0.02em | `#67c2cc` | "GO CARES" masthead on covers and slide headers |
| **Section Heading Large** | DB Airy Medium | 44px (2.75rem) | 600 | 1.20 | -0.015em | `#004176` / `#034393` | Major section titles ("อัตราค่าบริการ", "สิ่งที่รวมอยู่ในราคา") |
| **Section Subtitle** | DB Airy Rounded Std | 35px (2.188rem) | 500 | 1.25 | -0.01em | `#034393` | Slide topic subtitles and "Patient Journey of GO CARES" |
| **Card / Package Title** | DB Airy Rounded Std | 26px (1.625rem) | 500 | 1.30 | normal | `#004176` / `#034393` | Package headings ("แพ็กเกจมาตรฐาน", "แพ็กเกจผู้ดูแล + รถ") |
| **Price Hero Number** | DB Airy Medium / Calibri | 34px (2.125rem) | 700 | 1.10 | -0.01em | `#034393` | Large numeric rate ("1,000 บาท", "1,800 บาท") |
| **Sub-heading / Question** | DB Airy Medium | 24px (1.50rem) | 500 | 1.35 | normal | `#004176` | Question headers ("บริการนี้เหมาะกับใคร ?", "ทำไมไม่ควรไปคนเดียว ?") |
| **Body Large / Lead** | DB Airy Rounded Std | 20px (1.25rem) | 400 | 1.50 | normal | `#1e293b` | Lead introductory paragraphs and value statements |
| **Body Standard** | DB Airy Rounded Std Light | 16px (1.00rem) | 300-400 | 1.55 | normal | `#334155` | Primary body reading text, bullet lists, step descriptions |
| **Card Detail / Small Body** | DB Airy Rounded Std Light | 14px (0.875rem) | 400 | 1.50 | normal | `#475569` | Supplementary notes, distance limits, bullet details |
| **Hotline / Contact Large** | DB Airy Medium / Calibri | 32px (2.00rem) | 700 | 1.10 | 0.02em | `#034393` | Phone number display ("063 920 4765") |
| **Button Label Standard** | DB Airy Rounded Std | 16px (1.00rem) | 500 | 1.00 | 0.01em | `#ffffff` | Primary CTA button label |
| **Pill Badge / Tag** | DB Airy Rounded Std | 13px (0.813rem) | 600 | 1.15 | 0.02em | Contextual | Crown recommendation badge, status indicators, step tags |
| **Micro Caption / Slide Num** | Calibri / DB Airy | 12px (0.75rem) | 400 | 1.30 | 0.03em | `#94a3b8` | Page numbering, copyright, and subtle disclaimers |

### Typographic Principles & Invariants
1. **Vertical Clearance for Thai Glyphs**: Thai script requires extended top and bottom vertical breathing space to accommodate tone marks (ไม้เอก, ไม้โท) and lower vowels (สระอุ, สระอู). Never clamp `line-height` below `1.40` for Thai body text, or diacritics will clip.
2. **Rounded Softness**: All headings utilize DB Airy with rounded terminal caps, reinforcing accessibility and reducing visual anxiety for families reviewing medical options.
3. **Numerals with High Distinction**: Financial rates and phone numbers (`063 920 4765`, `1,300 บาท`) use high-clarity weights (`600` or `700`) with proportional tabular spacing to prevent visual confusion between `8`, `0`, and `3`.
4. **Accent Punctuation**: Question marks and key emphasis points in headers feature the warm amber accent color (`#f9b524` / `#fab700`), transforming intimidating questions into welcoming invitations.

---

## 4. Component Stylings

### Buttons

#### 1. Primary Royal CTA
- **Background**: Solid `#034393`
- **Text Color**: `#ffffff`
- **Font**: 16px DB Airy Rounded Std, weight 500
- **Padding**: `14px 28px` (touch-friendly height: 48px–52px)
- **Border Radius**: `9999px` (Full Pill) or `12px`
- **Border**: None
- **Shadow**: `0 4px 12px rgba(3, 67, 147, 0.18)`
- **Hover State**: Background shifts to `#02306b`, shadow elevates to `0 6px 16px rgba(3, 67, 147, 0.25)`
- **Active State**: Background shifts to `#01214a`, transform scale `0.98`
- **Usage**: Main conversion actions ("จองผู้ดูแลทันที", "ติดต่อปรึกษาเคส")

#### 2. Secondary Cyan Pill Button
- **Background**: `#67c2cc`
- **Text Color**: `#004176` (High contrast navy on cyan)
- **Font**: 15px DB Airy Rounded Std, weight 600
- **Padding**: `10px 22px`
- **Border Radius**: `9999px`
- **Border**: None
- **Hover State**: Background shifts to `#53b0bc`
- **Usage**: Secondary actions, step filters, downloadable service brochures

#### 3. Ghost / Hotline Contact Pill
- **Background**: `transparent` or `#f0f7ff`
- **Text Color**: `#034393`
- **Border**: `1.5px solid #034393`
- **Padding**: `10px 20px`
- **Border Radius**: `9999px`
- **Hover State**: Background `#e0f2fe`
- **Icon**: Left telephone receiver icon (`063 920 4765`)

---

### Cards & Containers

#### 1. Three-Tier Pricing Package Cards
The centerpiece pricing matrix features three side-by-side vertical cards:
- **Card 1: แพ็กเกจมาตรฐาน (Standard Package - Caregiver at Hospital)**
  - Background: `#ffffff`
  - Border: `1.5px solid #e2e8f0`
  - Border Radius: `20px`
  - Header Pill: Number `1` in solid navy circle (`#034393`) + Title in bold navy (`#034393`)
  - Price Split Pill: Two columns (5 ชม. = 1,000 บาท / 8 ชม. = 1,500 บาท) inside soft blue header container (`#e0f2fe`)
  - Features: Circular blue home and car icons (`#0066b2`), free round-trip within 10 km
  - Shadow: `0 4px 16px rgba(3, 67, 147, 0.06)`

- **Card 2: แพ็กเกจผู้ดูแล + รถ (Caregiver + Dedicated Mobility Vehicle - Recommended 👑)**
  - Background: `#ffffff`
  - Border: `2.5px solid #034393`
  - Border Radius: `20px`
  - Floating Badge: Crown badge (`👑 แนะนำ`) in bright solar amber (`#f9b524`), text `#004176`, positioned at top-left
  - Header Background: Solid royal blue `#034393` with crisp white text and white badge circle `2`
  - Price Split Pill: Two columns (5 ชม. = 1,300 บาท / 8 ชม. = 1,800 บาท) inside highlighted blue container
  - Features: Car pickup directly at home, accompaniment throughout hospital, safe return, includes 30 km round-trip
  - Shadow: `0 12px 28px rgba(3, 67, 147, 0.16)` (visually prominent lift)

- **Card 3: บริการพาผู้สูงอายุไปทำกิจกรรมต่างๆ (Errands & Social Companion)**
  - Background: `#ffffff`
  - Border: `1.5px solid #e2e8f0`
  - Border Radius: `20px`
  - Header Pill: Number `3` in solid navy circle (`#034393`)
  - Pricing Banner: Single primary tier: "อัตราค่าบริการเริ่มต้น 1,500 บาท / 8 ชั่วโมง"
  - Features: Accompaniment for personal errands, shopping, bank transactions, and social gatherings; travel expenses billed separately

#### 2. Persona Target Cards (บริการนี้เหมาะกับใคร ?)
- **Layout**: 4-card 2x2 grid or horizontal scroll on mobile
- **Container**: Solid `#ffffff` background with `1px solid #e2e8f0`, `border-radius: 16px`, padding `24px`
- **Header Elements**:
  - Number badge: Navy circle with white numeral (1 to 4)
  - Circular category icon: Blue circle (`#034393`, 48px) with white glyph (Suitcase, Home, Walking Cane, Calendar)
  - Title: 20px bold navy text (`#034393`)
- **Body**: 15px DB Airy Light (`#334155`) with clear, compassionate storytelling

#### 3. Step Feature Cards (6 สิ่งที่รวมอยู่ในราคาค่าบริการ)
- **Top Image**: 16:9 ratio anime-style illustration of the caregiver in navy uniform assisting an elder
- **Step Pill Badge**: Solid navy pill (`#034393`) with white text:
  1. `ไปรับที่บ้านและพากลับ`
  2. `วัดสัญญาณชีพก่อนออกเดินทาง`
  3. `อยู่ด้วยตลอดในโรงพยาบาล`
  4. `จดบันทึกคำแนะนำแพทย์`
  5. `รับยาและทวนวิธีใช้`
  6. `รายงานครอบครัวผ่าน LINE`
- **Icon Node**: Circular icon placed below the visual (`#004176`)
- **Container**: `#ffffff` background, `border-radius: 16px`, soft shadow

#### 4. Notice & Exclusion Cards
- **Wheelchair / Ambulance Alert**: Soft red background (`#fef2f2`), red wheelchair icon (`#dc2626`), border `#fecaca`. Indicates separate ambulance transport fees for bedridden or heavy mobility needs.
- **Service Exclusions Box**: Soft red background (`#fef2f2`), bold red `✖ สิ่งที่ไม่รวมในราคา`:
  - ค่ารักษาพยาบาลและค่ายา (Hospital medical bill)
  - ค่าที่จอดรถ (Parking fees)
  - ค่าอาหารระหว่างวัน (Meals during the day)
- **Fair Pricing Transparency Guarantee**: Soft blue callout (`#f0f9ff`, border `#bae6fd`) with blue exclamation badge (`!`). States that overtime or higher-acuity care will always be quoted and approved in advance, with no surprise post-service billing.

---

### Inputs & Forms

#### 1. Text & Phone Input Field
- **Height**: 48px–52px (optimized for elder/caregiver tap targets)
- **Background**: `#ffffff`
- **Border**: `1.5px solid #cbd5e1`
- **Border Radius**: `10px`
- **Padding**: `12px 16px`
- **Font**: 16px DB Airy Rounded Std
- **Placeholder**: `#94a3b8` ("ระบุเบอร์โทรศัพท์สำหรับติดต่อกลับ")
- **Focus State**: Border `#034393`, box-shadow `0 0 0 3px rgba(103, 194, 204, 0.35)`
- **Error State**: Border `#dc2626`, box-shadow `0 0 0 3px rgba(220, 38, 38, 0.20)`

#### 2. Service Duration & Package Radio Pills
- Group of segmented rounded pills for `5 ชั่วโมง` vs `8 ชั่วโมง`
- **Inactive State**: Background `#f1f5f9`, text `#475569`, border `1px solid #e2e8f0`
- **Active Selected State**: Background `#034393`, text `#ffffff`, border `1.5px solid #034393`, shadow `0 2px 8px rgba(3, 67, 147, 0.20)`

#### 3. Chonburi District Selector (8 Service Areas)
- Styled `<select>` or custom picker with map pin icon
- Options: อำเภอเมืองชลบุรี, พานทอง, พนัสนิคม, บ่อทอง, บ้านบึง, ศรีราชา, หนองใหญ่, บางละมุง

---

### Distinctive Brand Components

#### 1. "Care Beyond the Hospital" Cursive Accent
- Artistic handwritten script placed dynamically beside hospital imagery
- Color: GO CARES Cyan (`#67c2cc`) with a warm solar amber brush stroke underline (`#fab700`)
- Emotion: Human warmth transcending institutional walls

#### 2. Live Mobile Service Report Timeline (Mockup Component)
- Smartphone container showcasing the real-time family transparency feed:
  - `08:00` — **Pick Up**: รถและผู้ดูแลถึงบ้านผู้รับบริการ
  - `08:30` — **Arrival & Registration**: ถึงโรงพยาบาลเอกชลและดำเนินการลงทะเบียน
  - `09:15` — **Consultation**: เข้าพบแพทย์พร้อมผู้ดูแลร่วมจดบันทึก
  - `10:00` — **Medication**: รับยา ทวนคำแนะนำกับเภสัชกร และถ่ายรูปฉลาก
  - `11:30` — **Send Back Home**: ส่งกลับถึงบ้านและส่งรายงานสรุปให้ครอบครัว

#### 3. 3-Column Senior Risk vs Caregiver Solution Table
- **Header Structure**:
  - Column 1: `ความเสี่ยงเมื่อไปพบแพทย์คนเดียว` (Red pill banner `#ef4444`, text `#ffffff`)
  - Column 2: `ผลกระทบที่อาจเกิดขึ้น` (Slate navy banner `#004176`, text `#ffffff`)
  - Column 3: `ผู้ดูแลช่วยตรงไหน` (Royal blue banner `#034393`, text `#ffffff`)
- **Row Cards**: Clean zebra layout with left red risk icon and right royal blue solution checkmark

#### 4. Pre-Visit 5-Item Preparation Checklist Pills
Numbered circular badges with specific distinct accents:
1. `1` **Royal Blue** (`#034393`): บัตรประชาชนและบัตรโรงพยาบาล
2. `2` **Cyan Teal** (`#008da5`): ใบนัดหรือข้อมูลนัด (ส่งผ่าน LINE)
3. `3` **Solar Amber** (`#f59e0b`): ยาที่ใช้อยู่ทั้งหมด (ป้องกันยาตีกัน)
4. `4` **Coral Red** (`#ef4444`): สิทธิการรักษาที่ใช้ (บัตรทอง/ประกันสังคม/ข้าราชการ/ประกันเอกชน)
5. `5` **Purple Violet** (`#8b5cf6`): เบอร์ติดต่อฉุกเฉิน (ญาติที่ตัดสินใจแทนได้)

---

## 5. Layout Principles

### Spacing System
Base spacing unit: **4px**

| Token | Pixel Value | Typical Application |
|-------|-------------|---------------------|
| `space-1` | 4px | Fine element gaps, inline badge padding |
| `space-2` | 8px | Icon-to-text spacing, tight pill padding |
| `space-3` | 12px | Compact component gutters, form helper text margins |
| `space-4` | 16px | Standard card inner padding, list item gaps |
| `space-5` | 20px | Sub-section margins, button inner horizontal padding |
| `space-6` | 24px | Card padding, grid gutter spacing |
| `space-8` | 32px | Section header spacing, desktop card padding |
| `space-10` | 40px | Major block separations |
| `space-12` | 48px | Column gutters, journey timeline node gaps |
| `space-16` | 64px | Page section vertical padding |
| `space-20` | 80px | Hero masthead and presentation slide margins |

### Grid & Containers
- **Slide / Presentation Aspect Ratio**: `16:9` widescreen canvas (optimally rendered at 1920×1080px or 2382×1684px).
- **Web App Max-Width**: `1280px` standard container width with `24px` gutter on mobile and `48px` on desktop.
- **Card Grids**:
  - Pricing Matrix: 3-column equal grid (`repeat(3, 1fr)`) with `28px` gap; center card features `-8px` vertical elevation offset.
  - Persona Matrix: 2-column or 4-column flexible grid (`repeat(auto-fit, minmax(260px, 1fr))`).
  - Journey Steps: 6-node horizontal chain on desktop, collapsing to an alternating vertical timeline on tablet and mobile.

### Whitespace Philosophy
Healthcare interfaces must avoid density-induced cognitive fatigue. The GO CARES layout adopts **Generous Breathable Whitespace**. Content cards never abut the screen border; text blocks maintain generous padding, giving each medical fact, price tier, and journey milestone autonomous visual space.

### Border-Radius Scale
- **Extra Small (`4px`)**: Subtle inner tags, table cell highlights
- **Small (`8px`)**: Form inputs, select dropdowns
- **Medium (`12px`)**: Sub-cards, modal dialog corners
- **Large (`16px`)**: Standard feature cards, persona containers, timeline boxes
- **Extra Large (`20px`)**: Pricing tier cards, hero presentation panels
- **Full Pill (`9999px`)**: All status badges, step numbers, package selection pills, and primary CTAs

---

## 6. Depth & Elevation

### Elevation System

```
Level 0: Flat Canvas (Base background #ffffff / #f8fafc)
Level 1: Resting Cards & Standard Badges
         box-shadow: 0 2px 8px rgba(3, 67, 147, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04)
Level 2: Hovered Cards & Selected Buttons
         box-shadow: 0 6px 18px rgba(3, 67, 147, 0.10), 0 2px 6px rgba(0, 0, 0, 0.04)
Level 3: Recommended Package Card / Floating Action Bar
         box-shadow: 0 12px 32px rgba(3, 67, 147, 0.16), 0 4px 10px rgba(0, 0, 0, 0.06)
Level 4: Modals, Dialogs & Mobile Bottom Booking Sheets
         box-shadow: 0 24px 48px rgba(0, 65, 118, 0.24), 0 8px 16px rgba(0, 0, 0, 0.08)
```

### Depth & Surface Philosophy
1. **Blue-Tinted Shadow Harmony**: In standard software design, shadows are neutral black or gray. GO CARES utilizes a signature royal blue shadow tint (`rgba(3, 67, 147, alpha)`). This prevents dirty grays on pure white cards and reinforces the Aikchol brand presence through ambient lighting.
2. **Surface Layering**:
   - `Canvas Base`: `#f8fafc` or `#ffffff`
   - `Secondary Region`: `#f0f7ff` (subtle ice blue section containers)
   - `Card Layer`: `#ffffff` resting at Level 1 elevation
   - `Hero Highlight`: `#034393` solid fill with Level 3 elevation
3. **Card Rim Lighting**: On high-contrast cards, a subtle `1px` inner highlight border (`inset 0 1px 0 rgba(255, 255, 255, 0.60)`) creates a tactile, clean finish.

---

## 7. Do's and Don'ts

### Do:
- **Do lead with empathy and dignity**: Frame the elderly patient and their family as respected partners; emphasize warmth, companionship, and peace of mind.
- **Do preserve DB Airy's vertical clearance**: Always allocate ample line-height (`>= 1.45`) to preserve Thai tone marks and vowel diacritics.
- **Do feature the Aikchol Royal Blue (`#034393`) alongside GO CARES Cyan (`#67c2cc`)**: Maintain the balance between hospital credibility and friendly mobility companionship.
- **Do provide complete price transparency**: Display both 5-hour and 8-hour tiers clearly, specify the inclusive kilometer allowances (10 km vs 30 km), and prominently list inclusions and exclusions.
- **Do highlight the Recommended Package 2**: Ensure the Caregiver + Car package stands out with the crown badge (`👑 แนะนำ`) and prominent blue card header.
- **Do use high-contrast color pairs**: Text on cyan must always be dark navy (`#004176`), never pure white or low-contrast gray.
- **Do prioritize elder accessibility**: Maintain minimum 48px touch targets, clear tabular figures for prices, and direct phone contact links.

### Don't:
- **Don't treat GO CARES as a standard ride-hailing app**: Never present the service as a simple driver or taxi; the core value is the trained healthcare caregiver who stays by the patient's side inside the hospital.
- **Don't use cold clinical grays or sterile greens**: Avoid clinical hospital greens or desaturated institutional grays that evoke anxiety or illness.
- **Don't hide service exclusions**: Never conceal parking, medication, or food exclusions in tiny fine print; present them openly in dedicated notice containers.
- **Don't truncate Thai strings arbitrarily**: Thai words cannot be hyphenated by character; use appropriate zero-width space boundaries and word-wrap rules.
- **Don't use sharp, aggressive 90-degree corners**: Keep containers softened with 12px–20px radii and pills at 9999px.
- **Don't clutter the screen with medical jargon**: Use plain, reassuring language (e.g. "วัดสัญญาณชีพก่อนออกเดินทาง", "ช่วยทวนวิธีใช้ยากับเภสัชกร").

---

## 8. Responsive Behavior

### Breakpoints
- **Mobile (`xs`/`sm`)**: `< 640px` (single-column cards, vertical journey flow, sticky bottom hotline CTA)
- **Tablet (`md`)**: `640px – 1023px` (2-column grids, collapsed comparison matrix)
- **Desktop (`lg`)**: `1024px – 1279px` (3-column pricing matrix, horizontal 6-step stepper)
- **Wide Display (`xl`)**: `>= 1280px` (full widescreen presentation layout, 16:9 desktop container)

### Touch Targets & Accessibility
- **Minimum Interactive Target**: `48px × 48px`
- **Recommended Button Height**: `52px – 56px` for primary booking and hotline dialing
- **Font Scale Floor**: Body text never scales below `15px` on mobile screens to ensure effortless reading for elderly users without zooming.

### Responsive Component Adaptation
- **Pricing Matrix**:
  - *Desktop*: 3 cards side-by-side with the center card elevated and crowned.
  - *Mobile*: Vertical stack ordered: 1. Recommended Package 2 (pinned first), 2. Standard Package 1, 3. Errands Package 3. Alternatively, a swipeable horizontal card carousel with pagination dots.
- **6-Step Patient Journey**:
  - *Desktop*: 6 horizontal node cards linked with a cyan-to-royal-blue connecting line.
  - *Mobile*: Vertical chronological timeline with active step pulses and expandable step summaries.
- **3-Column Risk vs Solution Table**:
  - *Desktop*: Full 3-column side-by-side matrix.
  - *Mobile*: Collapsible accordion cards with a toggle: "ความเสี่ยงหากไปคนเดียว" vs "วิธีที่ GO CARES ดูแล".

---

## 9. Agent Prompt Guide

### Quick Color Reference

| Semantic Name | Hex Code | Primary Usage |
|---------------|----------|---------------|
| `GO CARES Cyan` | `#67c2cc` | Hero wordmark, secondary pills, active step borders |
| `Aikchol Royal Blue` | `#034393` | Primary CTAs, section titles, card borders, step numbers |
| `Aikchol Hospital Navy` | `#004176` | Deep headers, dark badges, text on cyan backgrounds |
| `Solar Amber` | `#fab700` | Logo central hub, question marks, emphasis badges |
| `Recommended Gold` | `#f9b524` | Crown badge (`👑 แนะนำ`) on the Caregiver + Car package |
| `LINE Green` | `#06c755` | Family LINE reporting badges and status indicators |
| `Surface Pure` | `#ffffff` | Primary card surfaces and background canvas |
| `Surface Ice Blue` | `#f0f7ff` | Container tints, callouts, and table alternate rows |
| `Alert Red` | `#dc2626` | Risks, medical exclusions, and ambulance warning badges |

---

### Ready-to-Use Component Prompts

#### Prompt 1: The Recommended Caregiver + Car Pricing Card
```text
Build a high-conversion pricing card for GO CARES by AIKCHOL NEXT representing the 'แพ็กเกจผู้ดูแล + รถ' (Caregiver + Dedicated Car) tier.
- Container: White background (#ffffff), 20px rounded corners, 2.5px solid border in Aikchol Royal Blue (#034393), elevated shadow (0 12px 28px rgba(3,67,147,0.16)).
- Top Badge: A golden amber pill (#f9b524) at top-left reading '👑 แนะนำ' with navy text (#004176) and 13px font weight 600.
- Header Block: Solid royal blue (#034393) background with 16px padding. Inside, display a white circular badge with the numeral '2', followed by title 'แพ็กเกจผู้ดูแล + รถ' (22px, white) and subtitle 'พาผู้สูงอายุไปพบแพทย์ พร้อมรถรับ-ส่ง' (14px, #e0f2fe).
- Pricing Row: Split into two rounded columns inside a soft blue box (#f0f7ff):
  * Left: '5 ชั่วโมง' (14px, #475569) over '1,300 บาท' (26px bold #034393)
  * Right: '8 ชั่วโมง' (14px, #475569) over '1,800 บาท' (26px bold #034393)
- Features List:
  * Circular blue car icon (#0066b2) with text: 'รถไปรับที่บ้านไปส่งโรงพยาบาล ให้บริการระหว่างอยู่โรงพยาบาล และส่งกลับบ้าน'
  * Circular blue pin icon (#0066b2) with text: 'รวมค่าเดินทางไป-กลับ จากโรงพยาบาลจนถึงที่พัก ในระยะทาง 30 กม.'
- CTA Button: Full-width pill button (#034393) with white text 'จองแพ็กเกจนี้' (16px, 52px height).
```

#### Prompt 2: Mobile Service Report Real-Time Timeline
```text
Generate a mobile smartphone preview card illustrating the GO CARES 'Service Report' provided to families via LINE.
- Frame: White rounded smartphone card (#ffffff), 24px corner radius, soft border (#e2e8f0), shadow (0 8px 24px rgba(3,67,147,0.12)).
- Top App Header: Aikchol Next logo beside 'Aikchol GO CARES Service Report', with a pill badge '#06c755' showing 'อัปเดตผ่าน LINE'.
- Patient Profile Subhead: 'คุณแม่สมศรี เจริญสุข' | จุดหมาย: 'โรงพยาบาลเอกชล' | วันที่: วันนี้.
- Chronological Timeline Nodes (vertical line in #67c2cc):
  1. 08:00 - 'Pick Up at Home': รถและผู้ดูแลถึงบ้านผู้รับบริการ ตรวจวัดความดัน 125/82 ปกติ
  2. 08:30 - 'Arrival & Registration': ถึงโรงพยาบาลเอกชล อำนวยความสะดวกเปิดสิทธิและรับบัตรคิว
  3. 09:15 - 'During Consultation': เข้าห้องตรวจพร้อมแพทย์ บันทึกการปรับลดยาลดไขมัน
  4. 10:00 - 'Medication & Pharmacy': รับยา ทวนการใช้กับเภสัชกร พร้อมรูปถ่ายฉลากยา 3 รายการ
  5. 11:30 - 'Send Back Home': ส่งกลับถึงบ้านอย่างปลอดภัย นั่งพักเรียบร้อย
- Bottom Action: Button pill with green border 'ดูรูปถ่ายและฉลากยาทั้งหมดใน LINE'.
```

#### Prompt 3: Senior Risk vs Caregiver Solution Comparison Matrix
```text
Create a 3-column responsive comparison table illustrating why seniors should not visit the hospital alone:
- Column Headers (Pill-shaped badges):
  * Col 1: Red pill (#ef4444) 'ความเสี่ยงเมื่อไปพบแพทย์คนเดียว' (white text)
  * Col 2: Navy pill (#004176) 'ผลกระทบที่อาจเกิดขึ้น' (white text)
  * Col 3: Royal Blue pill (#034393) 'ผู้ดูแลช่วยตรงไหน' (white text)
- Row 1:
  * Risk: Red falling icon + 'ลื่นล้มระหว่างทาง หรือในโรงพยาบาล'
  * Impact: 'การล้มเป็นสาเหตุการบาดเจ็บอันดับต้นในผู้สูงอายุ และพื้นโรงพยาบาลที่ลื่นยิ่งเพิ่มความเสี่ยง'
  * Solution: Blue checkmark icon + 'ผู้ดูแลพยุงและเดินคู่ตลอด รวมถึงช่วยขึ้นลงรถและใช้ลิฟต์อย่างถูกวิธี'
- Row 2:
  * Risk: Brain/Memory icon + 'จำคำแนะนำแพทย์ได้ไม่ครบ'
  * Impact: 'ในห้องตรวจมีข้อมูลจำนวนมากในเวลาสั้น ผู้สูงอายุอาจเข้าใจคลาดเคลื่อน'
  * Solution: Notepad icon + 'ผู้ดูแลจดบันทึกทุกคำแนะนำ ถามซ้ำจุดที่ไม่ชัดเจน และส่งให้ครอบครัวอ่านทันที'
- Row 3:
  * Risk: Pill bottle icon + 'กินยาผิดหลังกลับบ้าน'
  * Impact: 'พลาดบ่อยที่สุดเมื่อแพทย์ปรับยาใหม่ แล้วยังกินยาเดิมซ้ำซ้อน'
  * Solution: Camera & Rx icon + 'ผู้ดูแลทวนวิธีใช้ยากับเภสัชกร ถ่ายรูปฉลากยา และแจ้งชัดเจนว่ายาตัวไหนหยุด ตัวไหนเริ่มใหม่'
- Row Styling: White card rows with subtle bottom borders (#e2e8f0), 16px padding, rounded-lg hover highlight.
```

#### Prompt 4: Chonburi Province Service Coverage Section
```text
Design the 'พื้นที่ให้บริการ จังหวัดชลบุรี' (Service Area) section for GO CARES:
- Left Column: Illustrated watercolor-style map card featuring Chonburi province with 8 interactive location pin badges (#034393): เมืองชลบุรี, พานทอง, พนัสนิคม, บ่อทอง, บ้านบึง, ศรีราชา, หนองใหญ่, บางละมุง.
- Right Column: 'สิ่งที่ต้องเตรียมให้เรา' checklist card:
  * Header: Title 'เตรียม 5 อย่างก่อนเดินทาง' in bold navy (#004176) with helper text highlighting: 'ที่มักลืมกันมากที่สุดคือยาที่กินอยู่ ซึ่งแพทย์จำเป็นต้องเห็นก่อนสั่งยาใหม่เพื่อไม่ให้ยาตีกัน'.
  * 5 Numbered Pills with white bold numerals:
    1. Blue (#034393) - 'บัตรประชาชนและบัตรโรงพยาบาล' (วางไว้จุดที่หยิบง่าย)
    2. Teal (#008da5) - 'ใบนัดหรือข้อมูลนัด' (ถ่ายรูปส่งทาง LINE ตอนจอง)
    3. Amber (#f59e0b) - 'ยาที่ใช้อยู่ทั้งหมด' (รวมวิตามินและอาหารเสริม จัดใส่ถุงเดียว)
    4. Red (#ef4444) - 'สิทธิการรักษาที่ใช้' (บัตรทอง, ประกันสังคม, ข้าราชการ, ประกันเอกชน)
    5. Purple (#8b5cf6) - 'เบอร์ติดต่อฉุกเฉิน' (เบอร์ญาติที่ตัดสินใจแทนได้)
  * Bottom Alert Pill (#f0f9ff with #0284c7 icon): '! แจ้งเพิ่มถ้ามี: ประวัติแพ้ยา, ต้องงดน้ำงดอาหาร, ใช้รถเข็น/ออกซิเจน หรือมีภาวะความจำถดถอย'.
```

---

### Iteration & Refinement Guidance
- **Senior Contrast Standard (WCAG AAA)**: Always check text contrast against background. Headings in `#004176` and `#034393` achieve high contrast (`> 7:1`) on `#ffffff` and `#f0f7ff`. Never place white text over `#67c2cc` cyan without verifying sufficient contrast; use `#004176` text on cyan backgrounds for buttons and badges.
- **Thai Font Rendering**: Always verify that `font-family` includes fallbacks `Sukhumvit Set` and `LINE Seed Sans TH` so that mobile devices without DB Airy render clean, loopless/semi-rounded Thai glyphs.
- **Transparent Hotline Callouts**: Display the direct booking hotline `063 920 4765` prominently in the navigation bar and footer with a dedicated telephone icon to allow immediate telephone booking for senior family members who prefer phone conversations over digital forms.
