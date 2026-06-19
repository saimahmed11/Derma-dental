import { useState } from "react";
import { Sparkles, Trophy, ShieldAlert, Wifi, Headphones, Compass } from "lucide-react";

interface GallerySpace {
  name: string;
  subtitle: string;
  description: string;
  feature: string;
  icon: any;
  img: string;
  tag: string;
}

const CLINIC_SPACES: GallerySpace[] = [
  {
    name: "The Sandalwood Lounge",
    subtitle: "Exquisite Waiting Sanctuary",
    description: "Replace clinical tension with modern residential opulence. Natural marble fireplaces, warm custom lighting, hand-gilded brushed finishes, and dynamic air filtration infused with natural sandalwood, lavender, and organic chamomile help calm your nerves.",
    feature: "Premium biological-spectrum ambient lighting",
    icon: Compass,
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    tag: "Lounge"
  },
  {
    name: "The Treatment Cocoon",
    subtitle: "Calibrated Ergonomic Recovery Suites",
    description: "Our custom ergonomic leather chairs support your back fully, surrounded by sensory relaxants. Experience routine cleanings or complex smile sculpting wrapped in cashmere throw blankets, therapeutic high-fidelity active noise-canceling headphones, and soothing aromatherapy.",
    feature: "High-fidelity noise-canceling & sensory calming",
    icon: Headphones,
    img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200",
    tag: "Care Cocoon"
  },
  {
    name: "The Aura Sterilization Suite",
    subtitle: "Zero-Bacteria Swiss Standards",
    description: "Transparency represents true integrity. Our glass-backed sterilization suite demonstrates medical-grade sanitation in plain sight. Combining Swiss autoclave equipment with triple-distilled pure water rinses ensures sanitization beyond standard metrics.",
    feature: "Zero-bacteria sterile autoclaves on display",
    icon: ShieldAlert,
    img: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200",
    tag: "Sanitation Standards"
  }
];

export default function EnvironmentalGallery() {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);

  const activeSpace = CLINIC_SPACES[activeSpaceIdx];
  const ActiveIcon = activeSpace.icon;

  return (
    <div className="bg-alabaster rounded-3xl p-8 md:p-12 border border-champagne/15" id="environmental-gallery-root">
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold flex items-center gap-1.5 mb-2">
          <Trophy className="w-3.5 h-3.5" /> Curative Environments
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-charcoal font-medium">
          The Sanctuary Environment
        </h3>
        <p className="text-charcoal-light/75 text-sm mt-2 leading-relaxed">
          Our clinic is designed to be a sensory buffer from the busy world outside. By considering lighting spectrums, acoustics, air filtration, and warm materials, we turn medical appointments into calming rituals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Toggle Panel Left */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-semibold mb-1 block">
            Select Space To Tour
          </span>
          {CLINIC_SPACES.map((space, idx) => (
            <button
              key={space.name}
              onClick={() => setActiveSpaceIdx(idx)}
              className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                activeSpaceIdx === idx
                  ? "bg-white border-champagne/40 shadow-sm"
                  : "bg-transparent border-transparent hover:bg-white/50 hover:border-champagne/10 text-charcoal-light/75"
              }`}
              id={`space-selector-${idx}`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${
                activeSpaceIdx === idx ? "bg-champagne/10 text-champagne" : "bg-charcoal/5 text-charcoal-light/60"
              }`}>
                <space.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-sans font-medium text-sage block mb-1">
                  {space.tag}
                </span>
                <h4 className={`text-base font-serif font-medium leading-tight ${
                  activeSpaceIdx === idx ? "text-charcoal" : "text-charcoal/80"
                }`}>
                  {space.name}
                </h4>
                <p className="text-xs text-charcoal/50 mt-1 line-clamp-1">
                  {space.subtitle}
                </p>
              </div>
            </button>
          ))}

          {/* Luxury Amenities Footer list */}
          <div className="mt-6 bg-warm-ivory border border-champagne/10 p-5 rounded-2xl">
            <h5 className="text-[11px] uppercase tracking-wider font-sans font-semibold text-charcoal mb-4">
              Signature Comfort Elements
            </h5>
            <div className="grid grid-cols-2 gap-3 text-xs text-charcoal-light/80">
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span>Fiber Guest Net</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span>Bose Headphones</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span>Tea & Sandalwood Oil</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span>Valet Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Showcase Right */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Main Showcase Image */}
          <div className="relative aspect-16/10 md:aspect-[16/9.5] rounded-3xl overflow-hidden border border-champagne/10 shadow-sm">
            <img
              src={activeSpace.img}
              alt={activeSpace.name}
              className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Soft dark visual fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />

            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <div className="flex items-center gap-2.5 mb-1.5 opacity-90">
                <ActiveIcon className="w-4 h-4 text-champagne shrink-0" />
                <span className="text-xs uppercase tracking-widest font-sans font-medium text-champagne font-semibold">
                  {activeSpace.tag}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-serif text-white font-medium mb-1">
                {activeSpace.name}
              </h4>
              <p className="text-white/80 text-xs md:text-sm font-light max-w-xl line-clamp-2">
                {activeSpace.subtitle} &bull; {activeSpace.feature}
              </p>
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-white rounded-2xl p-6 mt-6 border border-champagne/10 shadow-sm relative overflow-hidden">
            <span className="absolute -top-12 -right-4 text-9xl font-serif text-champagne/5 select-none pointer-events-none">
              {(activeSpaceIdx + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-xs font-sans uppercase tracking-widest text-sage font-medium block">
              Architectural Concept No. {activeSpaceIdx + 1}
            </span>
            <p className="text-charcoal-light/85 text-sm mt-3 leading-relaxed max-w-2xl">
              {activeSpace.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
