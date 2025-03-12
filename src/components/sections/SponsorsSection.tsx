"use client";
import React, { useEffect, useRef } from 'react';
import "../../styles/prizesEffect.css";

export default function SponsorsSection() {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-popup');
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <section id="sponsors" className="min-h-screen pt-8 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Sponsors</h2>
        <h3 ref={textRef} className="prizes-text text-2xl text-center">
          Stay Tuned! <span className="highlight">Exciting Sponsors Await.</span>
        </h3>
      </div>
    </section>
  );
}