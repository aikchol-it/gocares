/**
 * CR4: Client-side Tracking Utility
 * Pushes events to window.dataLayer (GTM-compatible) AND to server /api/tracking
 * 
 * Usage:
 *   import { track } from '@/app/lib/tracking';
 *   track('booking_modal_open', { package: 'pkg2' });
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export interface TrackEventPayload {
  event: string;
  [key: string]: unknown;
}

/**
 * Push event to dataLayer (for GTM/GA4) AND server-side storage
 */
export function track(event: string, data: Record<string, unknown> = {}): void {
  const payload: TrackEventPayload = {
    event,
    ...data,
    tracked_at: new Date().toISOString(),
  };

  // 1. Push to dataLayer (GTM/GA4 compatible)
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  // 2. POST to server-side /api/tracking for dashboard analytics
  if (typeof window !== 'undefined') {
    const sessionId = getOrCreateSessionId();
    fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        data,
        sessionId,
        page: window.location.pathname,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => {
      // Silent fail — tracking should never break UX
    });
  }
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let sid = sessionStorage.getItem('ahc_session_id');
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      sessionStorage.setItem('ahc_session_id', sid);
    }
    return sid;
  } catch {
    return 'unknown';
  }
}

/* ============================================================
   Pre-built Event Helpers (CR4 Marketing Tracking Plan)
   ============================================================ */

/** User opens Booking Modal */
export const trackBookingModalOpen = (pkg: string) =>
  track('booking_modal_open', { selected_package: pkg });

/** User submits Booking Form */
export const trackLeadFormSubmitted = (data: {
  packageName: string;
  patientRelation: string;
  district: string;
  hospital: string;
  isOtherHospital: boolean;
  hasLineId: boolean;
}) => track('lead_form_submitted', data);

/** User opens AI Search */
export const trackAiSearchOpen = () => track('ai_search_open');

/** User types query in AI Search */
export const trackAiSearchQuery = (query: string, resultCount: number) =>
  track('ai_search_query', { query, result_count: resultCount });

/** User clicks action button in AI Search result */
export const trackAiSearchAction = (actionType: string, itemTitle: string) =>
  track('ai_search_action_click', { action_type: actionType, item_title: itemTitle });

/** User clicks LINE OA button (any location) */
export const trackLineOaClick = (source: string) =>
  track('line_oa_click', { click_source: source });

/** User clicks phone call link */
export const trackPhoneCallClick = (source: string) =>
  track('phone_call_click', { click_source: source });

/** User clicks on a pricing package card */
export const trackPackageView = (pkg: string) =>
  track('package_view', { package: pkg });

/** User scrolls to a section */
export const trackSectionView = (sectionName: string) =>
  track('section_view', { section: sectionName });

/** User clicks CTA button */
export const trackCtaClick = (ctaLabel: string, ctaLocation: string) =>
  track('cta_click', { cta_label: ctaLabel, cta_location: ctaLocation });

