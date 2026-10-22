import fs from 'fs';
import path from 'path';
import { SiteContent, DEFAULT_SITE_CONTENT } from './site-content-types';

export * from './site-content-types';

const dataDir = path.join(process.cwd(), 'data');
const siteConfigFile = path.join(dataDir, 'site-content.json');

export function getSiteContent(): SiteContent {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(siteConfigFile)) {
      fs.writeFileSync(siteConfigFile, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), 'utf-8');
      return DEFAULT_SITE_CONTENT;
    }
    const raw = fs.readFileSync(siteConfigFile, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      ...DEFAULT_SITE_CONTENT,
      ...parsed,
      menus: parsed.menus || DEFAULT_SITE_CONTENT.menus,
      hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
      contact: { ...DEFAULT_SITE_CONTENT.contact, ...(parsed.contact || {}) },
      packages: { ...DEFAULT_SITE_CONTENT.packages, ...(parsed.packages || {}) },
      moments: parsed.moments || DEFAULT_SITE_CONTENT.moments,
      personas: parsed.personas || DEFAULT_SITE_CONTENT.personas,
      serviceSteps: parsed.serviceSteps || DEFAULT_SITE_CONTENT.serviceSteps,
      appointments: parsed.appointments || DEFAULT_SITE_CONTENT.appointments,
      images: { ...DEFAULT_SITE_CONTENT.images, ...(parsed.images || {}) },
      announcement: { ...DEFAULT_SITE_CONTENT.announcement, ...(parsed.announcement || {}) },
    };
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  content.updatedAt = new Date().toISOString();
  fs.writeFileSync(siteConfigFile, JSON.stringify(content, null, 2), 'utf-8');
}
