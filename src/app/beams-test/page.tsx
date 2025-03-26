'use client';

import { BeamsBackgroundDemo } from '@/components/ui/beams-background-demo';
import { motion } from 'framer-motion';

export default function BeamsTestPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BeamsBackgroundDemo />
    </motion.div>
  );
} 