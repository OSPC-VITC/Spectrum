import React from 'react';

const mainPrizes = [
  {
    place: '1st Place',
    prize: '$10,000',
    description: 'Cash prize, mentorship opportunities, and exclusive access to investor networks.',
    color: 'from-yellow-400 to-yellow-600',
    icon: '🏆',
  },
  {
    place: '2nd Place',
    prize: '$5,000',
    description: 'Cash prize and premium subscriptions to developer tools and platforms.',
    color: 'from-gray-300 to-gray-500',
    icon: '🥈',
  },
  {
    place: '3rd Place',
    prize: '$2,500',
    description: 'Cash prize and access to exclusive workshops and networking events.',
    color: 'from-amber-600 to-amber-800',
    icon: '🥉',
  },
];

const specialPrizes = [
  {
    title: 'Best UI/UX Design',
    prize: '$1,500',
    description: 'For the team with the most intuitive and visually appealing user interface.',
    icon: '🎨',
  },
  {
    title: 'Most Innovative Solution',
    prize: '$1,500',
    description: 'For the most creative and groundbreaking approach to solving a problem.',
    icon: '💡',
  },
  {
    title: 'Best Technical Implementation',
    prize: '$1,500',
    description: 'For exceptional technical complexity and elegant code architecture.',
    icon: '⚙️',
  },
  {
    title: 'Social Impact Award',
    prize: '$1,500',
    description: 'For the solution with the greatest potential to create positive social change.',
    icon: '🌍',
  },
  {
    title: 'People\'s Choice',
    prize: '$1,000',
    description: 'Voted by all hackathon participants and attendees.',
    icon: '👥',
  },
  {
    title: 'Best Rookie Team',
    prize: '$1,000',
    description: 'For the best project by a team participating in their first hackathon.',
    icon: '🌟',
  },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Prizes</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Compete for a prize pool of over $25,000 and other exciting rewards!
        </p>
        
        {/* Main Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainPrizes.map((prize, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <div className={`h-2 bg-gradient-to-r ${prize.color}`}></div>
              <div className="p-6 text-center">
                <div className="text-5xl mb-4">{prize.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{prize.place}</h3>
                <div className="text-3xl font-bold mb-4 text-purple-400">{prize.prize}</div>
                <p className="text-gray-300">{prize.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Special Prizes */}
        <h3 className="text-2xl font-bold mb-8 text-center text-purple-300">Special Category Prizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialPrizes.map((prize, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-lg p-5 shadow-md flex items-start space-x-4"
            >
              <div className="text-3xl">{prize.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-white">{prize.title}</h4>
                <div className="text-purple-400 font-bold mb-1">{prize.prize}</div>
                <p className="text-sm text-gray-300">{prize.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 