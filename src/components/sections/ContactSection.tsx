'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        status: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }
    
    setFormStatus({
      status: 'loading',
      message: 'Sending your message...'
    });
    
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({
          status: 'success',
          message: 'Message sent successfully!'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Error sending message');
      }
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error sending message'
      });
    }
  };

  return (
    <section id="contact" className="pt-8 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="heading-container text-center">
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">CONTACT </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">US</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
          />
        </div>
        
        <div className="mt-12 w-full max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="input-box-container relative">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-black/30 text-white border-none px-8 py-4 focus:outline-none z-10 relative"
              />
            </div>
            
            {/* Email Field */}
            <div className="input-box-container relative">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-black/30 text-white border-none px-8 py-4 focus:outline-none z-10 relative"
              />
            </div>
            
            {/* Subject Field */}
            <div className="input-box-container relative">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-black/30 text-white border-none px-8 py-4 focus:outline-none z-10 relative"
              />
            </div>
            
            {/* Message Field */}
            <div className="input-box-container relative">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="w-full bg-black/30 text-white border-none px-8 py-4 resize-none focus:outline-none z-10 relative"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={formStatus.status === 'loading'}
                className="button-container relative"
              >
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="button-content px-10 py-3 text-white text-lg">
                  {formStatus.status === 'loading' ? 'Sending...' : 'Send Message'}
                </div>
              </button>
            </div>
            
            {formStatus.message && (
              <div className={`text-center mt-4 ${formStatus.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* SVG filter for animated borders */}
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
        .input-box-container {
          position: relative;
          background: rgba(17, 17, 17, 0.8);
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .input-box-container:hover {
          transform: translateY(-2px);
        }

        .input-box-container::before {
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

        .input-box-container:hover::before {
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

        .input-box-container:hover .a::after,
        .button-container:hover .a::after {
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

        /* Button styles */
        .button-container {
          position: relative;
          background: rgba(17, 17, 17, 0.8);
          transition: all 0.3s ease;
          display: inline-block;
          min-width: 180px;
        }

        .button-container:hover {
          transform: translateY(-2px);
        }

        .button-content {
          position: relative;
          z-index: 1;
        }

        .button-container::before {
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

        .button-container:hover::before {
          opacity: 0.2;
        }

        @media (max-width: 768px) {
          .input-box-container {
            width: calc(100% - 32px);
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
} 