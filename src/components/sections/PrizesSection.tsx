import React from 'react';
import "../../styles/prizesEffect.css"

export default function PrizesSection() {
  return (
    <section id="prizes" className="min-h-screen pt-8 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Prizes</h2>
        <h3 className="prizes-text text-2xl text-center">
          Stay Tuned! <span className="highlight">Exciting Prizes Await.</span>
        </h3>
      </div>
    </section>
  );
} 

