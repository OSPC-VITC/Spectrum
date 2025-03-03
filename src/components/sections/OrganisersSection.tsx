import React from 'react';

const organisers = [
  {
    name: 'Alex Johnson',
    role: 'Event Director',
    bio: 'Tech entrepreneur with over 10 years of experience organizing hackathons and tech events.',
    image: '👨‍💼',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Samantha Lee',
    role: 'Technical Lead',
    bio: 'Full-stack developer and open source contributor passionate about building inclusive tech communities.',
    image: '👩‍💻',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Marcus Chen',
    role: 'Sponsorship Coordinator',
    bio: 'Business development professional with a strong network in the tech industry.',
    image: '👨‍💼',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Priya Patel',
    role: 'Marketing Director',
    bio: 'Digital marketing specialist with expertise in community building and social media strategy.',
    image: '👩‍💼',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'David Kim',
    role: 'Operations Manager',
    bio: 'Event management professional ensuring smooth logistics and participant experience.',
    image: '👨‍💼',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Olivia Rodriguez',
    role: 'Judging Coordinator',
    bio: 'Product manager and former hackathon winner who oversees the judging process.',
    image: '👩‍💼',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
];

export default function OrganisersSection() {
  return (
    <section id="organisers" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Organisers</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Meet the dedicated team behind Spectrum Hackathon who work tirelessly to create an amazing experience.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {organisers.map((organiser, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 text-center">
                <div className="text-6xl mb-4 mx-auto">{organiser.image}</div>
                <h3 className="text-xl font-bold mb-1 text-white">{organiser.name}</h3>
                <p className="text-purple-400 font-medium mb-3">{organiser.role}</p>
                <p className="text-gray-300 mb-4 text-sm">{organiser.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  <a href={organiser.social.twitter} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href={organiser.social.linkedin} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href={organiser.social.github} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Volunteer Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">Join Our Team</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Interested in helping organize Spectrum Hackathon? We're always looking for passionate volunteers to join our team!
          </p>
          <button className="bg-white text-purple-900 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition-colors">
            Apply as Volunteer
          </button>
        </div>
      </div>
    </section>
  );
} 