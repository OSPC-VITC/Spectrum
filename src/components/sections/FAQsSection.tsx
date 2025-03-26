'use client';

import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the team size?",
      answer: "4 - 6"
    },
    {
      question: "What's the registration cost?",
      answer: "Zero. Nil. Nada."
    },
    {
      question: "Who all can attend?",
      answer: "Spectrum'25 welcomes students and technology enthusiasts eager to explore innovation and solve complex problems. Whether you're just starting your journey or an experienced developer looking to push boundaries, this hackathon provides an inclusive platform for individuals and teams of all backgrounds to collaborate and create."
    },
    {
      question: "Will sleeping arrangements be provided?",
      answer: "No, but you'll be too engaged with exciting activities and high-energy coding to even think about sleep!"
    },
    {
      question: "What all should I bring to the event?",
      answer: "<ul class='list-disc pl-5'><li>Extension Boards (for power🔌)</li><li>Snacks and Drinks (for power⚡)</li><li>Laptops (for power👾)</li></ul>"
    },
    {
      question: "When will application close?",
      answer: "Applications will remain open until April 3rd, 2025.<br /><br />Our team will review applications continuously and notify you by email if you're accepted. Once accepted, you'll need to RSVP to confirm your in-person attendance."
    },
    {
      question: "It is my first hackathon, what's something i should know?",
      answer: "Your first hackathon is all about <strong>learning, collaborating, and exploring new possibilities</strong>. Focus on building something <strong>functional and impactful</strong> rather than striving for perfection. Engage with others, ask questions, and be open to refining your idea along the way. You might connect with like-minded individuals or even find a future co-founder for an idea you've been wanting to pursue. <strong>Spectrum'25 could be the gateway to incredible opportunities during your college years.</strong> Most importantly, enjoy the journey—it's not just about winning, but about the experience and growth you gain! 🚀"
    },
    {
      question: "Do we need to have the entire idea fully working?",
      answer: "It is not necessary to implement the complete idea. To enable the judges to assess the entry, it must, nevertheless, be operational."
    },
    {
      question: "What are the online and offline rounds?",
      answer: "<p class='font-semibold text-white'>Online Round</p><p class='mb-4'>Submit your idea presentations via the Devfolio platform. Registrations close on <em>April 3, 2025</em>, and shortlisted teams will be announced within two days after the deadline.</p><p class='font-semibold text-white'>Offline Round</p><p>Selected teams will gather at the venue on April 11 for an intense 24-hour hackathon, where they'll bring their ideas to life.</p>"
    }
  ];

  return (
    <section id="faqs" className="min-h-screen pt-8 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="heading-container text-center">
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">FREQUENTLY ASKED </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">QUESTIONS</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
          />
        </div>
        
        <div className="mt-12 space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-container w-full"
            >
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="faq-content">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 flex justify-between items-center"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white pr-8">{faq.question}</h3>
                  <FiChevronDown 
                    className={`text-2xl text-purple-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 px-6 ${openIndex === index ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div 
                    className="text-lg text-purple-300" 
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG filter for form containers - same as used in the timer */}
      <svg className="hidden">
        <filter id="unopaq" width="3000%" x="-1000%" height="3000%" y="-1000%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 2 0"
          ></feColorMatrix>
        </filter>
      </svg>

      <style jsx>{`
        .faq-container {
          position: relative;
          background: #111;
          width: 100%;
          transition: all 0.3s ease;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .faq-container:hover {
          transform: translateY(-2px);
        }

        .faq-content {
          position: relative;
          z-index: 1;
          color: rgba(255, 255, 255, 0.85);
          width: 100%;
        }

        .faq-container::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(
              circle at 50% 50%,
              #0000 0,
              #0000 20%,
              #111111aa 50%
            ),
            radial-gradient(ellipse 100% 100%, #fff, #fff0);
          background-size:
            3px 3px,
            auto auto;
          transition: 0.3s;
        }

        .faq-container:hover::before {
          opacity: 0.2;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -20px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(2px) url(#unopaq);
          z-index: -2;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(6px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }

        .faq-container:hover .a::after {
          opacity: 0.8;
        }

        .l {
          left: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .r {
          right: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .t {
          top: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .b {
          bottom: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        @media (max-width: 768px) {
          .faq-container {
            width: calc(100% - 32px);
            margin-left: auto;
            margin-right: auto;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
} 

