'use client';

import React from 'react';

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="min-h-screen pt-8 sm:pt-12 pb-12 sm:pb-16 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-center font-['Megrim'] text-white" style={{ fontSize: "4.3rem" }}>OUR SPONSORS</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-8" style={{ marginTop: "-1.5rem" }}></div>
        
        <p className="text-center text-gray-400 text-base sm:text-lg mb-6 sm:mb-10 max-w-2xl mx-auto">
          Meet the organizations empowering innovation at Spectrum. Our sponsors are the backbone of this hackathon, making incredible prizes and experiences possible.
        </p>

        {/* Gold Sponsors */}
        <h3 className="text-center text-yellow-400 text-3xl sm:text-4xl font-bold mb-8">Gold Sponsors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {/* JioSaavn Sponsor */}
          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex items-center justify-center">
              <img src="/Devfolio_Logo-White.png" alt="JioSaavn Logo" className="max-w-full max-h-16" />
            </div>
          </div>

          {/* Devfolio Sponsor */}
          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex items-center justify-center">
              <img src="/ethindia-light.png" alt="Devfolio Logo" className="max-w-full max-h-16" />
            </div>
          </div>

          {/* Coming Soon Sponsors */}
          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>

          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>
        </div>

        {/* Silver Sponsors */}
        <h3 className="text-center text-gray-300 text-3xl sm:text-4xl font-bold mb-8">Silver Sponsors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Coming Soon Sponsors */}
          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>

          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>

          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>
        </div>

        {/* Bronze Sponsors */}
        <h3 className="text-center text-amber-600 text-3xl sm:text-4xl font-bold mb-8">Bronze Sponsors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Coming Soon Sponsors */}
          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>

          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>

          <div className="sponsor-box relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="sponsor-content flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl mb-2">🔜</div>
              <p className="text-gray-300 text-sm sm:text-base">To Be Revealed Soon</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block relative">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <p className="relative text-base sm:text-lg text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2">
              More sponsorship opportunities available! Contact us to be part of Spectrum.
            </p>
          </div>
        </div>
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="unopaq">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          ></feColorMatrix>
        </filter>
      </svg>

      <style jsx>{`
        .sponsor-box {
          position: relative;
          background: #111;
          aspect-ratio: 16/9;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          animation: float 6s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .sponsor-box {
            animation: none;
          }
          
          .sponsor-content {
            padding: 0.75rem;
          }
          
          .a {
            --t: -8px;
            --w: 1px;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .sponsor-box:nth-child(2) {
          animation-delay: -2s;
        }

        .sponsor-box:nth-child(3) {
          animation-delay: -4s;
        }

        .sponsor-box:nth-child(4) {
          animation-delay: -1s;
        }

        .sponsor-content {
          position: relative;
          z-index: 1;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 1.5rem;
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
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          z-index: -2;
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
      `}</style>
    </section>
  );
}