import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">What is Spectrum Hackathon?</h3>
            <p className="text-gray-300 mb-4">
              Spectrum Hackathon is a premier coding competition that brings together the brightest minds
              in technology to solve real-world problems through innovation and collaboration.
            </p>
            <p className="text-gray-300">
              Our mission is to foster creativity, promote learning, and create a platform for
              developers, designers, and entrepreneurs to showcase their talents and build
              solutions that can make a difference.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">Why Participate?</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Network with industry professionals and like-minded individuals</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Learn new technologies and enhance your skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Win exciting prizes and potential job opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Build your portfolio with innovative projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Make a positive impact through technology</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 