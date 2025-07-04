import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FaqBanner = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
    },
    {
      question: "Is it suitable for all ages and body types?",
      subQuestions: [
        "Yes, our posture corrector is designed to accommodate various body types and can be adjusted for different ages.",
        "The adjustable straps allow for customization to fit different body shapes comfortably."
      ]
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer: "Absolutely. Clinical studies show that consistent use of posture correctors can significantly reduce back pain and improve posture alignment within 4-6 weeks of regular use."
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer: "Our premium model includes smart vibration alerts that notify you when you're slouching, helping to train your muscles for better posture throughout the day."
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer: "You can sign up for our restock notifications by entering your email on the product page. We'll send you an immediate alert when inventory becomes available."
    },
    {
      question: "How long should I wear it each day?",
      answer: "We recommend starting with 30-60 minutes per day and gradually increasing to 2-4 hours as your body adjusts. Never wear for more than 6 consecutive hours."
    },
    {
      question: "Can I wear it under clothing?",
      answer: "Yes, our low-profile design is specifically made to be discreet under most clothing types without showing through."
    },
    {
      question: "What's the return policy if it doesn't work for me?",
      answer: "We offer a 60-day money-back guarantee. If you're not satisfied with your results, you can return it for a full refund, no questions asked."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Frequently Asked Questions (FAQ)
        </h1>
        
        <p className="text-lg text-gray-600 text-center mb-12">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. 
          Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-200"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-gray-500 ml-4">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              <div 
                id={`faq-content-${index}`}
                className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  {faq.answer && <p className="text-gray-600">{faq.answer}</p>}
                  
                  {faq.subQuestions && (
                    <ul className="mt-4 space-y-3 pl-5">
                      {faq.subQuestions.map((subQ, subIndex) => (
                        <li key={subIndex} className="text-gray-600 list-disc">
                          {subQ}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300">
            Contact Our Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqBanner;