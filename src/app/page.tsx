import Navbar from '@/components/Navbar';
import AboutSection from '@/components/sections/AboutSection';
import TracksSection from '@/components/sections/TracksSection';
import TimelineSection from '@/components/sections/TimelineSection';
import PrizesSection from '@/components/sections/PrizesSection';
import JudgesSection from '@/components/sections/JudgesSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import OrganisersSection from '@/components/sections/OrganisersSection';
import FAQsSection from '@/components/sections/FAQsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/Hero';

export default function Home() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="space-y-0 pt-16">
        <HeroSection />
        <AboutSection />
        <TracksSection />
        <TimelineSection />
        <PrizesSection />
        <JudgesSection />
        <OrganisersSection />
        <SponsorsSection />
        <FAQsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
