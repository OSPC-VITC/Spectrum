'use client';

import React from 'react';

const tracks = [
  {
    title: 'AI/ML',
    description: 'Build innovative solutions using artificial intelligence and machine learning.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Web3/Blockchain',
    description: 'Create decentralized applications and explore blockchain technology.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: 'IoT/Hardware',
    description: 'Develop solutions combining hardware and software for real-world impact.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    title: 'Open Innovation',
    description: "Choose your own path and innovate in any domain you're passionate about.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function TracksSection() {
  return (
    <section id="tracks" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Hackathon Tracks</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Choose from our diverse range of tracks and build something amazing!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="text-purple-400 mr-4">
                  {track.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{track.title}</h3>
              </div>
              <p className="text-gray-300">{track.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 