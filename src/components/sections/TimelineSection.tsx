import React from 'react';

const timelineEvents = [
  {
    date: 'April 1, 2025',
    title: 'Registration Opens',
    description: 'Sign up for Spectrum Hackathon and start forming your teams.',
  },
  {
    date: 'April 15, 2025',
    title: 'Workshops Begin',
    description: 'Join our pre-hackathon workshops to learn new skills and prepare for the competition.',
  },
  {
    date: 'May 1, 2025',
    title: 'Registration Closes',
    description: 'Last day to register for the hackathon. Make sure your team is ready!',
  },
  {
    date: 'May 10, 2025',
    title: 'Opening Ceremony',
    description: 'Join us for the kickoff event where we\'ll announce the themes and challenges.',
  },
  {
    date: 'May 10-12, 2025',
    title: 'Hackathon Weekend',
    description: '48 hours of coding, collaboration, and creativity. Build your solution and compete for prizes.',
  },
  {
    date: 'May 12, 2025',
    title: 'Submission Deadline',
    description: 'All projects must be submitted by 3:00 PM for judging.',
  },
  {
    date: 'May 12, 2025',
    title: 'Presentations & Judging',
    description: 'Present your project to our panel of judges and showcase your innovation.',
  },
  {
    date: 'May 12, 2025',
    title: 'Awards Ceremony',
    description: 'Winners will be announced and prizes will be awarded during the closing ceremony.',
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Timeline</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Mark your calendars! Here's what to expect during the Spectrum Hackathon journey.
        </p>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 to-blue-500"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                {/* Circle marker */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-black"></div>
                
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} bg-gray-900 p-6 rounded-lg shadow-lg`}>
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-purple-900 text-purple-200">
                    {event.date}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 