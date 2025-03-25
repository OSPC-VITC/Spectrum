import React from 'react';

const VideoSection = () => {
  // Note: Autoplay often requires mute=1 on most browsers due to restrictions
  const videoUrl = `https://www.youtube.com/embed/YzFK7x_LGKk?autoplay=1&mute=1&enablejsapi=1`;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Spectrum25 Introduction
        </h2>
        <div className="aspect-w-16 aspect-h-9 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-[514px]"
            src={videoUrl}
            title="Spectrum25 Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Watch our introductory video to learn more about Spectrum25
        </p>
      </div>
    </section>
  );
};

export default VideoSection;