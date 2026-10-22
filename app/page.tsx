import '../style.css';
import LegacyScripts from './components/LegacyScripts';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import MomentsTabSlider from './components/MomentsTabSlider';
import VideoSection from './components/VideoSection';
import ComparisonSection from './components/ComparisonSection';
import PersonasSection from './components/PersonasSection';
import PricingSection from './components/PricingSection';
import StepFeatures from './components/StepFeatures';
import AppointmentsSection from './components/AppointmentsSection';
import CoverageSection from './components/CoverageSection';
import ReportSection from './components/ReportSection';
import FaqSection from './components/FaqSection';
import ClimaxCta from './components/ClimaxCta';
import LegacyBookingModal from './components/LegacyBookingModal';
import MobileStickyBar from './components/MobileStickyBar';
import Footer from './components/Footer';
import { getSiteContent } from './lib/site-content';

export default function HomePage() {
  const content = getSiteContent();

  return (
    <>
      <TopBar content={content} />
      <Header content={content} />
      <Hero content={content} />
      <MomentsTabSlider content={content} />
      <VideoSection content={content} />
      <ComparisonSection />
      <PersonasSection content={content} />
      <PricingSection content={content} />
      <StepFeatures content={content} />
      <AppointmentsSection content={content} />
      <CoverageSection content={content} />
      <ReportSection content={content} />
      <FaqSection />
      <ClimaxCta content={content} />
      <LegacyBookingModal content={content} />
      <MobileStickyBar content={content} />
      <Footer content={content} />
      <LegacyScripts siteContent={content} />
    </>
  );
}
