import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaUserCircle } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const ReviewBanner = () => {
  const testimonials = [
    {
      name: "Rosel Ahamed",
      position: "CEO",
      comment: "A posture corrector works by providing support and gentle alignment to your shoulders back and spine, encouraging you to maintain proper posture throughout the day."
    },
    {
      name: "Awlad Hossain",
      position: "Senior Product Designer",
      comment: "A posture corrector works by providing support and gentle alignment to your shoulders back and spine, encouraging you to maintain proper posture throughout the day."
    },
    {
      name: "Nasir Uddin",
      position: "CEO",
      comment: "A posture corrector works by providing support and gentle alignment to your shoulders back and spine, encouraging you to maintain proper posture throughout the day."
    },
    {
      name: "Awla",
      position: "Senior",
      comment: "A posture corrector works by providing support and gentle alignment to your shoulders back and spine, encouraging you to maintain proper posture throughout the day."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    let interval;
    if (autoScroll) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [autoScroll, testimonials.length]);

  const nextSlide = () => {
    setAutoScroll(false);
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setAutoScroll(true), 5000); // Resume auto-scroll after 5 seconds
  };

  const prevSlide = () => {
    setAutoScroll(false);
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setAutoScroll(true), 5000); // Resume auto-scroll after 5 seconds
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (index < 0) index = testimonials.length - 1;
      if (index >= testimonials.length) index = 0;
      cards.push(testimonials[index]);
    }
    return cards;
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What our customers are saying
        </h1>
        
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. 
          Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <div className="relative">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button 
              onClick={prevSlide}
              className="hidden md:flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 z-10 transition-all hover:scale-110"
            >
              <MdOutlineKeyboardArrowLeft className="text-2xl" />
            </button>

            <div className="flex overflow-hidden w-full max-w-4xl">
              <div className="flex w-full">
                {getVisibleCards().map((testimonial, index) => {
                  const isCenter = index === 1;
                  return (
                    <div 
                      key={`${testimonial.name}-${index}`}
                      className={`flex-shrink-0 w-full md:w-1/3 px-4 transition-all duration-500 ${
                        isCenter ? "scale-100" : "scale-90 opacity-70"
                      }`}
                    >
                      <div className={`bg-white p-6 rounded-lg shadow-md h-full ${
                        isCenter ? "border-2 border-blue-500" : "border border-gray-200"
                      }`}>
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4">
                            <FaUserCircle className={`text-5xl ${
                              isCenter ? "text-blue-500" : "text-gray-400"
                            }`} />
                          </div>
                          
                          <FaQuoteLeft className="text-gray-300 text-2xl mb-4" />
                          <p className="text-gray-600 mb-6">{testimonial.comment}</p>
                          <div className="border-t pt-4 w-full">
                            <h4 className={`font-semibold ${
                              isCenter ? "text-blue-600" : "text-gray-700"
                            }`}>{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={nextSlide}
              className="hidden md:flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 z-10 transition-all hover:scale-110"
            >
              <MdOutlineKeyboardArrowRight className="text-2xl" />
            </button>
          </div>

          {/* Mobile Arrows */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all hover:scale-110"
            >
              <MdOutlineKeyboardArrowLeft className="text-xl" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all hover:scale-110"
            >
              <MdOutlineKeyboardArrowRight className="text-xl" />
            </button>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoScroll(false);
                  setCurrentIndex(index);
                  setTimeout(() => setAutoScroll(true), 5000);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBanner;