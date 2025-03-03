import React from 'react';

// In a real application, you would replace these with actual sponsor logos
const platinumSponsors = [
  { name: 'TechGiant', logo: '🌐' },
  { name: 'InnovateCorp', logo: '🚀' },
  { name: 'FutureTech', logo: '⚡' },
];

const goldSponsors = [
  { name: 'CodeMasters', logo: '💻' },
  { name: 'DataSystems', logo: '📊' },
  { name: 'CloudNine', logo: '☁️' },
  { name: 'DevTools', logo: '🛠️' },
];

const silverSponsors = [
  { name: 'StartupHub', logo: '🏢' },
  { name: 'VentureX', logo: '💼' },
  { name: 'TechFund', logo: '💰' },
  { name: 'InnovateU', logo: '🎓' },
  { name: 'CodeLabs', logo: '🧪' },
  { name: 'ByteWorks', logo: '📱' },
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Sponsors</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Spectrum Hackathon is made possible by the generous support of our sponsors.
        </p>
        
        {/* Platinum Sponsors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-purple-300">Platinum Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platinumSponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">{sponsor.logo}</div>
                <h4 className="text-xl font-bold text-white">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gold Sponsors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-purple-300">Gold Sponsors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {goldSponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-3">{sponsor.logo}</div>
                <h4 className="text-lg font-bold text-white">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* Silver Sponsors */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center text-purple-300">Silver Sponsors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {silverSponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-2">{sponsor.logo}</div>
                <h4 className="text-base font-bold text-white text-center">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* Become a Sponsor */}
        <div className="mt-20 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">Become a Sponsor</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Interested in sponsoring Spectrum Hackathon? Reach out to us to learn about our sponsorship packages and how you can support the next generation of innovators.
          </p>
          <button className="bg-white text-purple-900 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
} 