'use client';

import { motion } from 'framer-motion';
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
    <motion.main 
      className="min-h-screen overflow-x-hidden relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />
      <motion.div 
        className="space-y-0 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
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
      </motion.div>
    </motion.main>
  );
}
