'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import BeamsBackground client-side only
const ConditionalBeamsBackground = dynamic(
  () => import('@/components/ConditionalBeamsBackground'),
  { ssr: false }
);

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <ConditionalBeamsBackground>
      {children}
    </ConditionalBeamsBackground>
  );
} 