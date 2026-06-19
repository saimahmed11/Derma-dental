import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";

interface SliderData {
  title: string;
  subtitle: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

const TRANSFORMATIONS: SliderData[] = [
  {
    title: "Smile Artistry Integration",
    subtitle: "Custom Hand-Refined Porcelain Porcelain Veneers",
    beforeImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200&sat=-40&blur=3",
    afterImg: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200",
    beforeLabel: "Restricted Light Ingress",
    afterLabel: "Vibrant Light Refraction",
    description: "Aligning dental axes, lifting opacity, and introducing custom micro-textures that emulate natural enamel depth."
  },
  {
    title: "Architectural Myofascial Rebalance",
    subtitle: "Volume Restoration & Dermal Silk Contour",
    beforeImg: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200&sat=-60&blur=2",
    afterImg: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200",
    beforeLabel: "Volume Deficit Shadows",
    afterLabel: "Luminous Structured Volume",
    description: "Rebuilding anatomical support along the mandibular boundaries to lift facial shadows and promote an organic refreshed profile."
  }
];

export default function AestheticSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeTrans = TRANSFORMATIONS[activeIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const startDrag = () => {
    isDragging.current = true;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, []);

  return (
    <div className="bg-alabaster rounded-3xl p-8 md:p-12 border border-champagne/15" id="aesthetic-slider-root">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Direct Clinical Outcomes
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-charcoal font-medium">
            The Signature Transformation
          </h3>
          <p className="text-charcoal-light/75 text-sm max-w-xl mt-2">
            Swipe or drag to witness the subtle, sophisticated harmony achievable with our personalized dental and facial restorations.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex gap-2 bg-warm-ivory p-1.5 rounded-full border border-champagne/10 self-start">
          {TRANSFORMATIONS.map((t, idx) => (
            <button
              key={t.title}
              onClick={() => {
                setActiveIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs font-sans font-medium rounded-full ${
                activeIndex === idx
                  ? "bg-champagne text-white shadow-sm"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
              id={`tab-slider-${idx}`}
            >
              {idx === 0 ? "Smile Artistry" : "Skin Contour"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Interactive Comparison Stage */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="relative w-full aspect-4/3 md:aspect-[3/2] rounded-2.5xl overflow-hidden shadow-md cursor-ew-resize select-none border border-champagne/15"
            id="drag-canvas-container"
          >
            {/* Safe overlay labels */}
            <div className="absolute top-4 left-4 z-20 bg-charcoal/60 filter backdrop-blur px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-white font-medium">
              Before: {activeTrans.beforeLabel}
            </div>
            <div className="absolute top-4 right-4 z-20 bg-champagne/80 filter backdrop-blur px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-white font-medium">
              After: {activeTrans.afterLabel}
            </div>

            {/* Before image (Background) */}
            <img
              src={activeTrans.beforeImg}
              alt="Before Treatment"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* After image (Overlay with clipPath) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-75"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={activeTrans.afterImg}
                alt="After Treatment"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Drag Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white/70 hover:bg-white cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-champagne border border-champagne/20 shadow-md flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Informative Side Card */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full">
          <div className="border-l border-champagne/35 pl-6 py-2">
            <span className="text-xs uppercase tracking-wider text-sage font-medium font-sans">
              Curated Detail
            </span>
            <h4 className="text-xl md:text-2xl font-serif text-charcoal font-medium mt-1">
              {activeTrans.subtitle}
            </h4>
            <p className="text-charcoal-light/80 text-sm mt-4 leading-relaxed">
              {activeTrans.description}
            </p>
          </div>

          <div className="mt-8 bg-warm-ivory/80 rounded-2xl p-5 border border-champagne/10">
            <h5 className="text-xs uppercase tracking-wider font-sans font-semibold text-charcoal mb-3">
              Included Clinical Advances
            </h5>
            <ul className="space-y-2 text-xs text-charcoal/85">
              <li className="flex items-start gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 shrink-0" />
                Expert micro-layering mimicking native dentine and light reflection.
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 shrink-0" />
                Calvated biometric profile mapping for perfect anatomical spacing.
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 shrink-0" />
                Minimally-invasive approach preserving native structural integrity.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
