'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Who can participate in Spectrum Hackathon?',
    answer: 'Spectrum Hackathon is open to everyone, from students to professionals. Whether you\'re a beginner or an experienced developer, designer, or entrepreneur, you\'re welcome to join. We encourage diversity and inclusivity in our community.',
  },
  {
    question: 'Do I need to have a team to register?',
    answer: 'No, you can register as an individual and form a team later. We\'ll have team formation activities before the hackathon starts. Teams can have up to 4 members.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, participation in Spectrum Hackathon is completely free. We believe in making technology and innovation accessible to everyone.',
  },
  {
    question: 'What should I bring to the hackathon?',
    answer: 'You should bring your laptop, charger, any hardware you plan to use for your project, and your enthusiasm! We\'ll provide food, drinks, and a comfortable workspace.',
  },
  {
    question: 'Will there be food and accommodation?',
    answer: 'Yes, we\'ll provide meals during the hackathon. As for accommodation, we have partnerships with nearby hotels offering discounted rates for participants coming from out of town.',
  },
  {
    question: 'Can I work on a pre-existing project?',
    answer: 'All projects must be started during the hackathon. You can come with ideas and plans, but the actual coding and development should begin at the event. This ensures a fair competition for everyone.',
  },
  {
    question: 'What kind of projects can I build?',
    answer: 'You can build any type of project that fits within our tracks. This includes web applications, mobile apps, hardware projects, AI/ML solutions, blockchain applications, and more. We encourage creativity and innovation!',
  },
  {
    question: 'Will there be mentors and workshops?',
    answer: 'Yes, we\'ll have industry experts as mentors to guide you throughout the hackathon. We\'ll also organize workshops on various technologies and skills before and during the event.',
  },
  {
    question: 'How will the projects be judged?',
    answer: 'Projects will be judged based on innovation, technical complexity, design, practicality, and presentation. Our panel of judges includes industry professionals, sponsors, and tech experts.',
  },
  {
    question: 'What if I don\'t have much coding experience?',
    answer: 'That\'s perfectly fine! Spectrum Hackathon is a learning experience. We have tracks suitable for beginners, and our mentors will be available to help you. It\'s a great opportunity to learn and grow your skills.',
  },
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="min-h-screen pt-20 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Frequently Asked Questions</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Have questions about Spectrum Hackathon? Find answers to common queries below.
        </p>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-colors ${
                  openIndex === index ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-purple-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="mt-2 p-5 bg-gray-800 rounded-lg text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-4">
            Still have questions? Feel free to reach out to us.
          </p>
          <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
} 