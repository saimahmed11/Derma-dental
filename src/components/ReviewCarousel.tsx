import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Review {
  quote: string;
  author: string;
  location: string;
  service: string;
  stars: number;
}

const REVIEWS: Review[] = [
  {
    quote: "The contrast is day and night. Walking in felt like visiting an exquisite Swiss resort lounge, completely washing away my dental dread. Dr. Elena's meticulous detailing on my veneers is pure high art.",
    author: "Anastasia R.",
    location: "Kensington, London",
    service: "Porcelain Veneers Artistry",
    stars: 5
  },
  {
    quote: "Dr. Marcus is an absolute artist with masseter neuromodulation. My chronic morning jaw clenching has entirely disappeared, and my facial contours feel balanced and beautifully refined.",
    author: "Julian V.",
    location: "Bel Air, Los Angeles",
    service: "Myofascial Botox",
    stars: 5
  },
  {
    quote: "A truly extraordinary experience. The air-polishing was incredibly gentle and warm, completely painless. To listen to calm ambient sounds with high-end noise-canceling headphones made the routine hygiene feel like a spa session.",
    author: "Zara Montgomery",
    location: "Marina District, San Francisco",
    service: "Holistic Sensory Hygiene",
    stars: 5
  },
  {
    quote: "Their focus on preserving native tooth structures while accomplishing absolute cosmetic brilliance is commendable. Transparent pricing, pristine environment, and exquisite clinical care.",
    author: "Lord Charles B.",
    location: "Mayfair, London",
    service: "Elite Invisible Aligners",
    stars: 5
  }
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextReview, 8000);
    return () => clearInterval(timer);
  }, []);

  const active = REVIEWS[currentIndex];

  return (
    <div className="bg-[#1C1C1C] text-white rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col items-center justify-center border border-white/5" id="review-carousel-root">
      {/* Decorative luxury pattern */}
      <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-30 pointer-events-none" />
      
      <Quote className="w-12 h-12 text-champagne/30 mb-6 shrink-0" />
      
      <div className="max-w-3xl text-center md:px-6 relative h-[220px] md:h-[160px] flex flex-col justify-center items-center">
        {REVIEWS.map((review, idx) => (
          <div
            key={review.author}
            className={`absolute transition-all duration-700 ease-out flex flex-col items-center ${
              currentIndex === idx
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            <p className="text-lg md:text-2xl font-serif leading-relaxed italic text-alabaster max-w-2xl font-light">
              "{review.quote}"
            </p>
            
            <div className="flex items-center gap-1 mt-6">
              {[...Array(review.stars)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne shrink-0" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-widest text-champagne font-semibold font-sans">
          {active.author}
        </span>
        <span className="text-[11px] text-white/50 tracking-wide mt-1">
          {active.location} &bull; <span className="text-champagne/70">{active.service}</span>
        </span>
      </div>

      {/* Slide Navigation */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={prevReview}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-champagne/50 hover:text-champagne flex items-center justify-center text-white/60 focus:outline-none"
          id="review-prev"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-6 bg-champagne" : "w-1.5 bg-white/20"
              }`}
              id={`review-indicator-${idx}`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextReview}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-champagne/50 hover:text-champagne flex items-center justify-center text-white/60 focus:outline-none"
          id="review-next"
          aria-label="Next review"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
