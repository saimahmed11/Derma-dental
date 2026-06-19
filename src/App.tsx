import React, { useState, useEffect } from "react";
import { 
  Sparkles, Calendar, BookOpen, Layers, Users, Home, 
  ArrowRight, Check, ChevronRight, MapPin, Phone, Mail, 
  Clock, ShieldCheck, Star, Sparkle, Heart, ChevronDown,
  Moon, Brain, Compass
} from "lucide-react";
import { SERVICES, CLINICIANS, ARTICLES } from "./data";
import { ServiceExperience, Clinician, JournalArticle, AppointmentRequest } from "./types";
import AestheticSlider from "./components/AestheticSlider";
import ReviewCarousel from "./components/ReviewCarousel";
import EnvironmentalGallery from "./components/EnvironmentalGallery";
import AIQuiz from "./components/AIQuiz";
import ConsciousConcierge from "./components/ConsciousConcierge";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "services" | "clinic" | "journal" | "booking">("home");
  const [selectedService, setSelectedService] = useState<ServiceExperience | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    concernCategory: "",
    clinicianId: "",
    date: "",
    timeSlot: "",
    specialNotes: "",
    sensoryPreference: "meditative"
  });
  
  const [bookings, setBookings] = useState<AppointmentRequest[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Active FAQ accordion state inside service view
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  // Persistent bookings loading from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("derma_dental_bookings");
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookings:", e);
      }
    }
  }, []);

  // Handle route scrolling safety
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, selectedService, selectedArticle]);

  // Pre-fill booking details from Service/Quiz recommendation
  const handlePrefillBooking = (service: ServiceExperience, clinician?: Clinician) => {
    setBookingForm((prev) => ({
      ...prev,
      concernCategory: service.category,
      clinicianId: clinician ? clinician.id : (service.category === "dermal" ? "dr-marcus" : "dr-elena"),
      specialNotes: `Recommended via aesthetic assessment: ${service.name}`
    }));
    setActiveTab("booking");
    // Scroll to booking form
    setTimeout(() => {
      document.getElementById("booking-wizard-portal")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.patientName || !bookingForm.patientEmail || !bookingForm.patientPhone) return;

    setBookingLoading(true);
    
    // Simulate luxury appointment scheduling response
    setTimeout(() => {
      const newBooking: AppointmentRequest = {
        id: `apt-${Date.now()}`,
        patientName: bookingForm.patientName,
        patientEmail: bookingForm.patientEmail,
        patientPhone: bookingForm.patientPhone,
        concernCategory: bookingForm.concernCategory,
        clinicianId: bookingForm.clinicianId || "dr-elena",
        date: bookingForm.date || "2026-06-30",
        timeSlot: bookingForm.timeSlot || "Solstice Midday (11:30 AM)",
        specialNotes: `${bookingForm.specialNotes}. Sensory mode chosen: ${bookingForm.sensoryPreference}`,
        status: "confirmed"
      };

      const updated = [newBooking, ...bookings];
      setBookings(updated);
      localStorage.setItem("derma_dental_bookings", JSON.stringify(updated));
      setBookingSuccess(true);
      setBookingLoading(false);
    }, 1500);
  };

  const clearActiveBooking = () => {
    setBookingForm({
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      concernCategory: "",
      clinicianId: "",
      date: "",
      timeSlot: "",
      specialNotes: "",
      sensoryPreference: "meditative"
    });
    setBookingSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans relative overflow-x-hidden" id="applet-viewport">
      
      {/* EXQUISITE LUXURY NAV HEADER */}
      <header className="sticky top-0 z-40 bg-warm-ivory/80 backdrop-blur-md border-b border-champagne/15" id="luxury-navigation-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo Brand / Branding */}
          <button 
            onClick={() => { setActiveTab("home"); setSelectedService(null); setSelectedArticle(null); }}
            className="flex items-center gap-3 group text-left cursor-pointer"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-full border border-champagne/30 bg-alabaster flex items-center justify-center text-champagne font-serif font-semibold tracking-tighter group-hover:bg-champagne group-hover:text-white transition-all duration-300">
              DD
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-serif tracking-[0.25em] font-medium text-charcoal uppercase leading-none">
                Derma Dental
              </h1>
              <span className="text-[9px] uppercase tracking-[0.18em] text-sage font-medium block mt-1">
                Clinical Aesthetics &bull; London
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-charcoal/75">
            <button 
              onClick={() => { setActiveTab("home"); setSelectedService(null); setSelectedArticle(null); }}
              className={`hover:text-champagne relative py-1 ${activeTab === "home" ? "text-champagne" : ""}`}
              id="link-home"
            >
              The Sanctuary
              {activeTab === "home" && <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-champagne rounded" />}
            </button>
            <button 
              onClick={() => { setActiveTab("services"); setSelectedService(null); }} 
              className={`hover:text-champagne relative py-1 ${activeTab === "services" ? "text-champagne" : ""}`}
              id="link-services"
            >
              Curated Menu
              {activeTab === "services" && <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-champagne rounded" />}
            </button>
            <button 
              onClick={() => { setActiveTab("clinic"); setSelectedService(null); }} 
              className={`hover:text-champagne relative py-1 ${activeTab === "clinic" ? "text-champagne" : ""}`}
              id="link-clinic"
            >
              Artisans & Clinic
              {activeTab === "clinic" && <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-champagne rounded" />}
            </button>
            <button 
              onClick={() => { setActiveTab("journal"); setSelectedArticle(null); }} 
              className={`hover:text-champagne relative py-1 ${activeTab === "journal" ? "text-champagne" : ""}`}
              id="link-journal"
            >
              Insights
              {activeTab === "journal" && <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-champagne rounded" />}
            </button>
          </nav>

          {/* Navigation CTA button */}
          <div>
            <button
              onClick={() => { setActiveTab("booking"); clearActiveBooking(); }}
              className={`text-[10px] uppercase font-sans font-semibold tracking-widest border border-champagne/40 px-5 py-3 rounded-full hover:bg-champagne hover:text-white ${activeTab === "booking" ? "bg-champagne text-white" : "text-charcoal bg-transparent"}`}
              id="nav-cta-booking"
            >
              Bespoke Booking
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE PANEL NAVIGATION FOOTER BAR */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 bg-charcoal/90 text-white filter backdrop-blur-md h-12 rounded-full border border-white/10 px-4 flex items-center justify-around text-[10px] tracking-wider uppercase font-sans font-semibold shadow-2xl" id="mobile-nav-bar">
        <button 
          onClick={() => { setActiveTab("home"); setSelectedService(null); setSelectedArticle(null); }}
          className={`flex items-center gap-1.5 focus:outline-none ${activeTab === "home" ? "text-champagne" : "text-white/60"}`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <button 
          onClick={() => { setActiveTab("services"); setSelectedService(null); }}
          className={`flex items-center gap-1.5 focus:outline-none ${activeTab === "services" ? "text-champagne" : "text-white/60"}`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Services</span>
        </button>
        <button 
          onClick={() => { setActiveTab("clinic"); setSelectedService(null); }}
          className={`flex items-center gap-1.5 focus:outline-none ${activeTab === "clinic" ? "text-champagne" : "text-white/60"}`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Clinic</span>
        </button>
        <button 
          onClick={() => { setActiveTab("journal"); setSelectedArticle(null); }}
          className={`flex items-center gap-1.5 focus:outline-none ${activeTab === "journal" ? "text-champagne" : "text-white/60"}`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Journal</span>
        </button>
      </div>

      {/* RENDER DYNAMIC PAGES CORES */}
      <main className="flex-grow pb-16 md:pb-0" id="main-content-layout">
        
        {/* ==============================================
            1. HOME TAB (THE MASTERPIECE CORE)
         ============================================== */}
        {activeTab === "home" && (
          <div className="fade-in-on-load space-y-24" id="home-view-core">
            
            {/* Cinematic Hero Stage */}
            <div className="relative bg-alabaster/40 h-[520px] md:h-[720px] flex items-center overflow-hidden border-b border-champagne/15" id="hero-section">
              {/* Back ambient luxury texture background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1920" 
                  alt="Derma Dental Luxury Interior"
                  className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-all duration-1000 opacity-20 filter blur-[1px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-warm-ivory via-warm-ivory/95 to-transparent z-10" />
              </div>

              {/* Dynamic slow motion floating golden accent particles background layout */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block z-10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[450px] h-[450px] rounded-full border border-champagne/15 relative animate-spin duration-30000 opacity-60">
                    <div className="absolute top-1/2 left-0 w-3 h-3 bg-champagne rounded-full" />
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-sage rounded-full" />
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Editorial Skin Smile radiant"
                  className="absolute right-12 top-16 w-[380px] h-[440px] rounded-[100px] object-cover shadow-2xl border border-champagne/20 transform hover:-translate-y-2 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Core Hero copy */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
                <div className="max-w-2xl py-12">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne flex items-center gap-2 mb-4">
                    <Sparkle className="w-4 h-4 text-champagne fill-champagne/15" /> Clinical Excellence Meets Aesthetic Artistry
                  </span>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-charcoal font-light leading-[1.1] tracking-tight">
                    Where Medical Rigor Meets <br />
                    <span className="italic font-normal font-serif text-champagne">Creative Precision</span>
                  </h2>

                  <p className="text-charcoal-light/80 text-sm md:text-base mt-6 leading-relaxed font-light">
                    Derma Dental represents the pinnacle of premium facial design. Inside our tranquil conservatory, elite dentists and medical aesthetic physicians integrate Hand-Crafted Veneers with Dermal Volume therapies to compose absolute symmetry based on your organic anatomy.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button
                      onClick={() => { setActiveTab("booking"); clearActiveBooking(); }}
                      className="px-8 py-4 h-14 rounded-full bg-champagne hover:bg-champagne-hover text-white text-xs uppercase tracking-widest font-sans font-semibold flex items-center justify-center gap-2.5 shadow-md"
                      id="hero-cta-booking"
                    >
                      Experience Derma Dental
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab("services")}
                      className="px-8 py-4 h-14 rounded-full border border-champagne/30 text-charcoal hover:bg-alabaster text-xs uppercase tracking-widest font-sans font-semibold flex items-center justify-center gap-1.5"
                      id="hero-cta-menu"
                    >
                      Explore Curated Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Philosophy section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="philosophy-section">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                    alt="Clinical Minimalist Luxury details"
                    className="w-full aspect-[4/5] rounded-3xl object-cover shadow-lg border border-champagne/15"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white border border-champagne/20 p-5 rounded-2xl shadow-xl flex items-center gap-4 text-left max-w-xs">
                    <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                        Biomimetic Integrity
                      </h4>
                      <p className="text-[10px] text-charcoal-light/60 mt-0.5">
                        Hand-built solutions preserving native structures above all.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center lg:pl-10">
                  <span className="text-[11px] uppercase tracking-widest text-sage font-semibold font-sans mb-3">
                    Bespoke Harmony Formulation
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-medium leading-[1.2]">
                    The Philosophy Behind Our Composition
                  </h3>
                  <div className="h-0.5 w-16 bg-champagne/40 my-6" />
                  
                  <p className="text-charcoal-light/80 text-sm md:text-base leading-relaxed font-light">
                    We believe true beauty represents a state of holistic anatomical alignment. Traditional aesthetics often treat the smile and the skin in complete isolation, leaving mismatch shadows along the cheeks or a smile shape that clashes with facial motion rules.
                  </p>
                  
                  <p className="text-charcoal-light/80 text-sm md:text-base leading-relaxed font-light mt-4">
                    Our master clinicians study how your dental arches behave in tandem with active lines. By combining elite dental restorations with precise neuromodulators, we restore balance softly. This dual-composition framework yields results that appear radiantly natural and elegant.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="border-t border-champagne/25 pt-4">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal font-sans">
                        Facial Analysis
                      </span>
                      <p className="text-xs text-charcoal/50 mt-1">
                        Analyzing biological rules, lip posture, and active movement.
                      </p>
                    </div>
                    <div className="border-t border-champagne/25 pt-4">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal font-sans">
                        Zero-Heat Care
                      </span>
                      <p className="text-xs text-charcoal/50 mt-1">
                        Utilizing calibrated cold laser and ultrasonic Swiss hygiene tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual Pathway Split Cards */}
            <div className="bg-alabaster/40 py-20 border-t border-b border-champagne/15" id="dual-focus-split">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold">
                    Curated Pillars Of Restoration
                  </span>
                  <h3 className="text-3xl font-serif text-charcoal font-medium mt-3 leading-snug">
                    Two Disciplines, One Harmonious Portrait
                  </h3>
                  <p className="text-charcoal-light/60 text-xs mt-2">
                    Click through any pathway to find specific curated procedures tailored to your personal goals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Column 1: Dentistry */}
                  <div 
                    onClick={() => { setActiveTab("services"); setSelectedService(null); }}
                    className="group bg-white rounded-3xl overflow-hidden border border-champagne/15 hover:border-champagne/50 hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
                    id="split-dentistry-card"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200" 
                        alt="Advanced Dentistry"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-4 left-6 text-xs uppercase tracking-widest font-sans text-champagne font-semibold bg-white/10 filter backdrop-blur px-3.5 py-1.5 rounded-full">
                        Clinical Science
                      </span>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl md:text-2xl font-serif text-charcoal font-semibold group-hover:text-champagne transition-colors">
                        Advanced Smile Artistry
                      </h4>
                      <p className="text-xs text-charcoal-light/70 mt-3 leading-relaxed">
                        Redesign your smile’s balance with hand-sculpted porcelain shells, AI-plotted invisible alignments, and non-sensitizing Ruby-laser whitening gel.
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-champagne font-bold group-hover:underline flex items-center gap-1 mt-6">
                        Explore Smile Artistry <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Column 2: Aesthetics */}
                  <div 
                    onClick={() => { setActiveTab("services"); setSelectedService(null); }}
                    className="group bg-white rounded-3xl overflow-hidden border border-champagne/15 hover:border-champagne/50 hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
                    id="split-aesthetics-card"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200" 
                        alt="Facial Aesthetics"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-4 left-6 text-xs uppercase tracking-widest font-sans text-champagne font-semibold bg-white/10 filter backdrop-blur px-3.5 py-1.5 rounded-full">
                        Dermal Harmony
                      </span>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl md:text-2xl font-serif text-charcoal font-semibold group-hover:text-champagne transition-colors">
                        Elite Facial & Skin Aesthetics
                      </h4>
                      <p className="text-xs text-charcoal-light/70 mt-3 leading-relaxed">
                        Softon hyper-functional wrinkles, alleviate nocturnal jaw tension, and re-inflate elegant contours organically utilizing high-density hyaluronic silk.
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-champagne font-bold group-hover:underline flex items-center gap-1 mt-6">
                        Explore Dermal Artistry <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Before / After comparison slider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AestheticSlider />
            </div>

            {/* Social Proof - Magazine review carousel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ReviewCarousel />
            </div>

            {/* Bottom Invitation Segment */}
            <div className="bg-alabaster py-16 border-t border-champagne/15 text-center px-4" id="home-invitation-banner">
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                An Invitation To Absolute Calm
              </span>
              <h3 className="text-3xl font-serif text-charcoal font-medium mt-3 max-w-xl mx-auto">
                Ready to Experience Your Authentic Reconstruction?
              </h3>
              <p className="text-charcoal-light/60 text-xs max-w-md mx-auto mt-2 font-light">
                Secure your bespoke diagnostic appointment or calibrate your ideal treatment options today.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => { setActiveTab("booking"); clearActiveBooking(); }}
                  className="px-6 py-3.5 bg-champagne hover:bg-champagne-hover text-white text-[11px] uppercase tracking-widest font-sans font-semibold rounded-full shadow-sm flex items-center gap-2"
                  id="bot-cta-booking"
                >
                  Book Private Consult
                </button>
                <a
                  href="#floating-concierge"
                  onClick={() => {
                    const conciergeBtn = document.getElementById("concierge-launcher-btn");
                    if (conciergeBtn) conciergeBtn.click();
                  }}
                  className="px-6 py-3.5 border border-champagne/30 text-charcoal hover:bg-white text-[11px] uppercase tracking-widest font-sans font-semibold rounded-full flex items-center gap-1.5"
                  id="bot-cta-chat"
                >
                  Message Sofia
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ==============================================
            2. SERVICES TAB (THE menu CORES)
         ============================================== */}
        {activeTab === "services" && (
          <div className="fade-in-on-load max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="services-view-core">
            
            {/* Show individual detailed sub-page if selected */}
            {selectedService ? (
              <div className="space-y-12" id="expanded-service-subpage">
                {/* Back button */}
                <button
                  onClick={() => { setSelectedService(null); setFaqOpenIdx(null); }}
                  className="text-xs text-charcoal/60 hover:text-champagne font-sans font-semibold flex items-center gap-2 mb-4 uppercase tracking-widest"
                  id="btn-back-to-services"
                >
                  &larr; Back to Curated Menu
                </button>

                {/* Main Hero grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-16/10 rounded-2.5xl overflow-hidden border border-champagne/15 shadow-sm">
                      <img 
                        src={selectedService.image} 
                        alt={selectedService.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-medium mt-8 leading-tight">
                      {selectedService.name}
                    </h3>
                    <p className="text-sage text-xs tracking-wide uppercase font-sans font-semibold mt-1.5">
                      Category: {selectedService.category === "smile" ? "Smile Artistry" : selectedService.category === "dermal" ? "Dermal Aesthetics" : "General & Restorative Care"}
                    </p>

                    <p className="text-charcoal-light/90 text-sm md:text-base leading-relaxed font-light mt-6">
                      {selectedService.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-8 bg-alabaster rounded-2.5xl p-6 md:p-8 border border-champagne/15">
                      <h4 className="text-sm uppercase tracking-wider text-charcoal font-semibold font-sans mb-4">
                        What to Expect During Your Session
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedService.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5 text-xs text-charcoal/85">
                            <div className="w-5 h-5 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Informational sidebar info details */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white rounded-2.5xl p-6 border border-champagne/15 shadow-sm">
                      <h4 className="text-xs uppercase tracking-widest text-champagne font-semibold mb-6">
                        Anatomical Specifications
                      </h4>
                      
                      <div className="space-y-4 text-xs font-sans">
                        <div className="flex justify-between border-b border-charcoal/5 pb-3">
                          <span className="text-charcoal/45">Treatment Duration:</span>
                          <span className="text-charcoal-light font-medium">{selectedService.duration}</span>
                        </div>
                        <div className="flex justify-between border-b border-charcoal/5 pb-3">
                          <span className="text-charcoal/45">Clinical Comfort:</span>
                          <span className="text-charcoal-light font-medium">{selectedService.comfortLevel}</span>
                        </div>
                        <div className="flex justify-between border-b border-charcoal/5 pb-3">
                          <span className="text-charcoal/45">Aesthetic Longevity:</span>
                          <span className="text-charcoal-light font-medium">{selectedService.longevity}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-charcoal/45">Consult Requirement:</span>
                          <span className="text-charcoal-light font-medium">Mandatory 3D Mapping</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handlePrefillBooking(selectedService)}
                        className="mt-8 w-full py-3.5 h-12 bg-champagne hover:bg-champagne-hover text-white text-[11px] uppercase tracking-widest font-sans font-semibold rounded-full shadow-sm flex items-center justify-center gap-2"
                        id="btn-book-expanded-service"
                      >
                        Book Selected Treatment
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subpage custom FAQ Accordion click */}
                    <div className="bg-white rounded-2.5xl p-6 border border-champagne/15 shadow-sm">
                      <h4 className="text-xs uppercase tracking-widest text-charcoal/40 font-semibold mb-4">
                        Frequently Answered Queries
                      </h4>
                      <div className="space-y-3">
                        {selectedService.faqs.map((faq, fIdx) => (
                          <div 
                            key={faq.question}
                            className="border border-champagne/10 rounded-xl overflow-hidden bg-alabaster/40"
                          >
                            <button
                              onClick={() => setFaqOpenIdx(faqOpenIdx === fIdx ? null : fIdx)}
                              className="w-full text-left p-4 flex justify-between items-center text-xs text-charcoal font-sans font-medium focus:outline-none"
                              id={`faq-btn-${fIdx}`}
                            >
                              <span>{faq.question}</span>
                              <ChevronDown className={`w-4 h-4 text-champagne shrink-0 transition-transform ${faqOpenIdx === fIdx ? "transform rotate-180" : ""}`} />
                            </button>
                            {faqOpenIdx === fIdx && (
                              <div className="p-4 pt-0 border-t border-champagne/5 text-xs text-charcoal-light/75 leading-relaxed bg-white">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-16" id="services-main-menu">
                {/* Title and Intro */}
                <div className="max-w-2xl">
                  <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold block mb-2">
                    Curated Care Aesthetics
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-medium">
                    The Curated Experience Menu
                  </h3>
                  <p className="text-charcoal-light/75 text-sm mt-3 leading-relaxed">
                    We organize our menu not as simple lists of treatments, but as tailored aesthetic transformations crafted to respect your native features and personal comfort.
                  </p>
                </div>

                {/* Categories grids loop */}
                {(["smile", "dermal", "restorative"] as const).map((cat) => {
                  const filtered = SERVICES.filter(s => s.category === cat);
                  const title = cat === "smile" ? "I. Smile Artistry & Restoration" : cat === "dermal" ? "II. Dermal & Facial Aesthetics" : "III. Restorative Sensory Care";
                  const subtitle = cat === "smile" ? "Austria ceramics alignment and Ruby-Laser lift" : cat === "dermal" ? "Organic wrinkles modulation and mandibular silk sculpture" : "Aqueous ultrasonic Swiss piezon diagnostic hygiene";

                  return (
                    <div key={cat} className="space-y-8" id={`service-cat-section-${cat}`}>
                      <div className="border-b border-champagne/20 pb-4">
                        <h4 className="text-xl md:text-2xl font-serif text-charcoal font-medium">
                          {title}
                        </h4>
                        <p className="text-xs text-charcoal/45 mt-1 font-sans">{subtitle}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((service, sIndex) => (
                          <div 
                            key={service.id}
                            className="bg-alabaster hover:bg-white rounded-2.5xl overflow-hidden border border-champagne/15 hover:border-champagne/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            id={`service-card-${cat}-${sIndex}`}
                          >
                            <div>
                              <div className="relative aspect-16/10 overflow-hidden bg-charcoal/10">
                                <img 
                                  src={service.image} 
                                  alt={service.name}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="p-6">
                                <span className="text-[10px] uppercase font-mono tracking-widest text-cage text-sage font-semibold">
                                  {service.longevity}
                                </span>
                                <h5 className="text-lg font-serif font-semibold text-charcoal leading-snug mt-1">
                                  {service.name}
                                </h5>
                                <p className="text-xs text-charcoal-light/70 italic font-sans mt-1">
                                  "{service.tagline}"
                                </p>
                                <p className="text-xs text-charcoal/60 mt-3 line-clamp-3 leading-relaxed">
                                  {service.description}
                                </p>
                              </div>
                            </div>

                            <div className="p-6 pt-0 flex gap-2">
                              <button
                                onClick={() => setSelectedService(service)}
                                className="flex-1 py-2.5 h-10 border border-champagne/30 text-charcoal hover:bg-champagne hover:text-white rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1"
                                id={`btn-details-${service.id}`}
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handlePrefillBooking(service)}
                                className="px-4 py-2.5 h-10 bg-champagne/10 text-champagne hover:bg-champagne hover:text-white rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center"
                                id={`btn-quick-book-${service.id}`}
                                title="Quick Book"
                              >
                                Book +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==============================================
            3. THE CLINIC & TEAM TAB (THE TRUST BUILDER)
         ============================================== */}
        {activeTab === "clinic" && (
          <div className="fade-in-on-load space-y-24" id="clinic-view-core">
            
            {/* Meet the Artisans section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="meet-clinicians">
              <div className="max-w-2xl mb-12">
                <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold block mb-2">
                  Elite Board-Certified Masters
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-medium">
                  Meet the Clinical Artisans
                </h3>
                <p className="text-charcoal-light/75 text-sm mt-3 leading-relaxed">
                  Our professional clinicians possess dual qualifications in medical specialties, combining academic credentials with structural artistic insights.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {CLINICIANS.map((clinician, cIndex) => (
                  <div 
                    key={clinician.id}
                    className="bg-alabaster rounded-3xl overflow-hidden border border-champagne/15 p-6 flex flex-col justify-between"
                    id={`clinician-card-${cIndex}`}
                  >
                    <div>
                      {/* Unified Professional warm photo */}
                      <div className="relative aspect-square rounded-2xl overflow-hidden border border-champagne/10 mb-6 bg-charcoal/5">
                        <img 
                          src={clinician.photo} 
                          alt={clinician.name}
                          className="w-full h-full object-cover grayscale opacity-95 group-hover:grayscale-0 filter saturate-90 brightness-95"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none" />
                      </div>

                      <h4 className="text-lg md:text-xl font-serif font-bold text-charcoal leading-tight">
                        {clinician.name}
                      </h4>
                      <span className="text-xs text-champagne font-sans font-medium block mt-1">
                        {clinician.title}
                      </span>

                      <blockquote className="text-xs text-charcoal-light/75 italic mt-4 border-l-2 border-champagne/30 pl-3 leading-relaxed">
                        "{clinician.philosophy}"
                      </blockquote>

                      <p className="text-xs text-charcoal/60 mt-4 leading-relaxed font-light">
                        {clinician.bio}
                      </p>
                    </div>

                    <div className="border-t border-champagne/20 pt-4 mt-6">
                      <span className="text-[10px] uppercase tracking-widest text-sage font-semibold font-sans mb-2 block">
                        Credentials & Societies
                      </span>
                      <ul className="space-y-1.5">
                        {clinician.credentials.map((cred, crIdx) => (
                          <li key={crIdx} className="text-[10px] text-charcoal-light/80 leading-relaxed flex items-start gap-2">
                            <span className="inline-block w-1 h-1 rounded-full bg-champagne mt-1.5 shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curative environment walkthrough gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <EnvironmentalGallery />
            </div>

            {/* Certifications and Sterilization detailed block */}
            <div className="bg-alabaster py-16 border-t border-champagne/15" id="sanitary-certification-banner">
              <div className="max-w-3xl mx-auto px-4 text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-sage/10 text-sage mb-4 flex items-center justify-center mx-auto border border-sage/20">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h4 className="text-2xl font-serif text-charcoal font-medium leading-snug">
                  The Swiss Autoclave Calibration Protocol
                </h4>
                <p className="text-charcoal-light/75 text-sm mt-3 leading-relaxed max-w-2xl mx-auto font-light">
                  Patient security represents our baseline metric. We operate far beyond municipal sanitation regulations, utilizing clinical glass-walled Swiss autoclave chambers. Every diagnostic device undergoes triple molecular cycles under strict monitoring, with real-time biometric telemetry logs permanently recorded on safe archives.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ==============================================
            4. THE JOURNAL TAB (INSIGHTS & EDUCATION)
         ============================================== */}
        {activeTab === "journal" && (
          <div className="fade-in-on-load max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="journal-view-core">
            
            {selectedArticle ? (
              <div className="max-w-3xl mx-auto space-y-8" id="expanded-journal-article">
                {/* Back Link */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs text-charcoal/60 hover:text-champagne font-sans font-semibold flex items-center gap-2 uppercase tracking-widest mb-4"
                  id="btn-back-to-journal"
                >
                  &larr; Back to Insights list
                </button>

                <div className="space-y-4">
                  <span className="text-xs uppercase font-sans tracking-wider text-champagne font-semibold bg-champagne/5 border border-champagne/20 px-3 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif font-light text-charcoal leading-tight mt-3">
                    {selectedArticle.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-charcoal/50 font-sans border-b border-charcoal/5 pb-6 pt-2">
                    <span>By {selectedArticle.author}</span>
                    <span>&bull;</span>
                    <span>{selectedArticle.date}</span>
                    <span>&bull;</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                <div className="relative aspect-16/10 rounded-2.5xl overflow-hidden border border-champagne/15 shadow-sm">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <article className="prose prose-stone max-w-none text-charcoal-light/95 leading-relaxed text-sm md:text-base font-light space-y-6">
                  {selectedArticle.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </article>

                <div className="border-t border-champagne/25 pt-8 mt-12 text-center bg-alabaster p-6 rounded-2xl">
                  <h4 className="text-sm font-serif font-semibold text-charcoal">
                    Interested in exploring the treatment related to this study?
                  </h4>
                  <button
                    onClick={() => {
                      // Redirect to specific book or general portal
                      setActiveTab("booking");
                      clearActiveBooking();
                    }}
                    className="mt-4 px-6 py-3 bg-champagne hover:bg-champagne-hover text-white text-[11px] uppercase tracking-widest font-sans font-semibold rounded-full shadow-sm"
                    id="btn-article-book-action"
                  >
                    Bespoke Consultation
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Title */}
                <div className="max-w-2xl">
                  <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold block mb-2">
                    Expert Scientific Insights
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-medium">
                    The Journal of Aesthetics & Restorative Science
                  </h3>
                  <p className="text-charcoal-light/75 text-sm mt-2 leading-relaxed">
                    Explore studies on micro-layer light dynamics, dermal volume architectures, and clinical neuro-anatomy written directly by our practitioners.
                  </p>
                </div>

                {/* Journal posts list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ARTICLES.map((article, aIndex) => (
                    <div 
                      key={article.id}
                      className="bg-alabaster hover:bg-white rounded-3xl overflow-hidden border border-champagne/15 hover:border-champagne/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                      id={`article-card-${aIndex}`}
                    >
                      <div>
                        {/* Article photo card */}
                        <div className="relative aspect-16/10 overflow-hidden bg-charcoal/10">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="p-6">
                          <span className="text-[10px] uppercase tracking-widest font-semibold text-sage">
                            {article.category}
                          </span>
                          <h4 className="text-base md:text-lg font-serif font-bold text-charcoal mt-1 line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                          <p className="text-xs text-charcoal-light/70 mt-3 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-charcoal/5 flex items-center justify-between text-[11px]">
                        <span className="text-charcoal/45 font-mono">{article.date}</span>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="text-champagne uppercase font-sans font-semibold hover:underline flex items-center gap-1 focus:outline-none"
                          id={`btn-read-article-${article.id}`}
                        >
                          Read Study &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==============================================
            5. BESPOKE BOOKING TAB (THE DECO hub CORE)
         ============================================== */}
        {activeTab === "booking" && (
          <div className="fade-in-on-load max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="booking-view-core">
            
            {/* Split layout: Visual Assessment / Booking Core Form */}
            <div className="space-y-16">
              
              {/* Introduction header info */}
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-widest font-sans text-champagne font-semibold block mb-2">
                  Exquisite Client Access
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-medium">
                  Bespoke Consultation Hub
                </h3>
                <p className="text-charcoal-light/75 text-sm mt-3 leading-relaxed">
                  Every customized transformation begins with dynamic diagnostic assessment mapping. Use our AI-Lite Consult assessment below to calibrate your concerns, or schedule directly.
                </p>
              </div>

              {/* Assessment Quiz Stage */}
              <div id="quiz-assessment-panel">
                <AIQuiz onRecommendationSelected={handlePrefillBooking} />
              </div>

              {/* Booking form stage */}
              <div className="bg-white rounded-3xl p-6 md:p-12 border border-champagne/15 shadow-sm scroll-mt-28" id="booking-wizard-portal">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-10">
                    <span className="text-xs uppercase tracking-widest text-champagne font-semibold">
                      Admission Portal
                    </span>
                    <h4 className="text-2xl font-serif text-charcoal font-medium mt-2">
                      Request Signature Private Appointment
                    </h4>
                    <p className="text-charcoal-light/50 text-xs mt-1">
                      Our private desk manager will contact you within two active hours of submission.
                    </p>
                  </div>

                  {bookingSuccess ? (
                    <div className="border border-champagne/20 bg-alabaster rounded-25xl p-8 text-center space-y-6" id="booking-confirmation-box">
                      <div className="w-16 h-16 rounded-full bg-champagne/10 text-champagne mx-auto flex items-center justify-center border border-champagne/25">
                        <Check className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-xl font-serif text-charcoal font-bold">
                          Appointment Proposal Documented
                        </h5>
                        <p className="text-xs text-charcoal-light/60 max-w-md mx-auto leading-relaxed">
                          We are reviewing clinical schedules to ensure your requested time slot is preserved. A private concierge desk officer will notify you shortly via encrypted link.
                        </p>
                      </div>

                      {/* Display scheduled list summary */}
                      <div className="max-w-md mx-auto bg-white border border-champagne/10 text-left p-5 rounded-2xl space-y-2.5 text-xs">
                        <span className="text-[10px] uppercase font-semibold text-sage block tracking-widest border-b border-charcoal/5 pb-2">
                          Reservation Coordinates
                        </span>
                        <div className="flex justify-between">
                          <span className="text-charcoal/45">Guest:</span>
                          <span className="text-charcoal-light font-medium">{bookingForm.patientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal/45">Proposed Date:</span>
                          <span className="text-charcoal-light font-medium">{bookingForm.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal/45">Sensory Class:</span>
                          <span className="text-charcoal-light font-medium italic">
                            {bookingForm.sensoryPreference === "meditative" ? "Deep Meditative Sanctuary" : bookingForm.sensoryPreference === "scientific" ? "Scientific Dialogue" : "Concierge Luxury"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal/45">Practitioner Slot:</span>
                          <span className="text-charcoal-light font-medium">
                            {CLINICIANS.find(c => c.id === bookingForm.clinicianId)?.name || "Dr. Elena Vance"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={clearActiveBooking}
                        className="py-3 h-10 px-6 border border-champagne/20 rounded-full text-xs uppercase tracking-widest text-charcoal hover:bg-white font-sans font-semibold"
                        id="booking-confirm-restart-btn"
                      >
                        File Additional Treatment Proposal
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-6" id="booking-portal-form">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Guest Name */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Complete Legal Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bookingForm.patientName}
                            onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                            placeholder="e.g. Sebastian Montgomery"
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11"
                            id="input-booking-name"
                          />
                        </div>

                        {/* Guest Email */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Secure Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={bookingForm.patientEmail}
                            onChange={(e) => setBookingForm({ ...bookingForm, patientEmail: e.target.value })}
                            placeholder="e.g. sebastian@luxurycorp.com"
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11"
                            id="input-booking-email"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Guest Phone */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Private Mobile Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={bookingForm.patientPhone}
                            onChange={(e) => setBookingForm({ ...bookingForm, patientPhone: e.target.value })}
                            placeholder="e.g. +44 20 7946 0958"
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11"
                            id="input-booking-phone"
                          />
                        </div>

                        {/* Category of Concern */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Pathway Canvas *
                          </label>
                          <select
                            required
                            value={bookingForm.concernCategory}
                            onChange={(e) => setBookingForm({ ...bookingForm, concernCategory: e.target.value })}
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11 appearance-none"
                            id="input-booking-category"
                          >
                            <option value="">-- Choose Pathway --</option>
                            <option value="smile">Porcelain Smile Artistry</option>
                            <option value="dermal">Facial Aesthetics & Skin Silk</option>
                            <option value="restorative">Sensory Biomimetic Care</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Clinician */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Desired Practitioner
                          </label>
                          <select
                            value={bookingForm.clinicianId}
                            onChange={(e) => setBookingForm({ ...bookingForm, clinicianId: e.target.value })}
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11"
                            id="input-booking-practitioner"
                          >
                            <option value="">First Available Specialist</option>
                            {CLINICIANS.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Preferred proposed Date */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Preferred Proposed Date
                          </label>
                          <input
                            type="date"
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11"
                            id="input-booking-date"
                          />
                        </div>

                        {/* Preferred Time block */}
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                            Curated Time Slot
                          </label>
                          <select
                            value={bookingForm.timeSlot}
                            onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                            className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300 h-11"
                            id="input-booking-timeslot"
                          >
                            <option value="">-- Choose Slot --</option>
                            <option value="Aura Morning (8:00 AM - 11:30 AM)">Aura Morning (8:00 AM - 11:30 AM)</option>
                            <option value="Solstice Midday (11:30 AM - 3:00 PM)">Solstice Midday (11:30 AM - 3:00 PM)</option>
                            <option value="Sienne Sunset (3:00 PM - 6:30 PM)">Sienne Sunset (3:00 PM - 6:30 PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* Sensory Environmental Selection */}
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                          Acoustic & Sensory Room Preset (Nervous System Profile Selection)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, sensoryPreference: "meditative" })}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 ${bookingForm.sensoryPreference === "meditative" ? "bg-champagne/5 border-champagne text-charcoal shadow-sm" : "bg-alabaster/40 border-transparent text-charcoal/60"}`}
                          >
                            <h6 className="text-xs font-semibold uppercase flex items-center gap-1.5">
                              <Moon className="w-3.5 h-3.5 text-champagne" /> Meditative Sanctuary
                            </h6>
                            <p className="text-[10px] text-charcoal-light/60 mt-1">Aromatherapy active, minimal prose, calming loops.</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, sensoryPreference: "scientific" })}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 ${bookingForm.sensoryPreference === "scientific" ? "bg-champagne/5 border-champagne text-charcoal shadow-sm" : "bg-alabaster/40 border-transparent text-charcoal/60"}`}
                          >
                            <h6 className="text-xs font-semibold uppercase flex items-center gap-1.5">
                              <Brain className="w-3.5 h-3.5 text-champagne" /> Scientific Dialogue
                            </h6>
                            <p className="text-[10px] text-charcoal-light/60 mt-1">Full 3D mapping telemetry descriptions, step-by-step.</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, sensoryPreference: "luxury" })}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 ${bookingForm.sensoryPreference === "luxury" ? "bg-champagne/5 border-champagne text-charcoal shadow-sm" : "bg-alabaster/40 border-transparent text-charcoal/60"}`}
                          >
                            <h6 className="text-xs font-semibold uppercase flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5 text-champagne" /> Concierge Pacing
                            </h6>
                            <p className="text-[10px] text-charcoal-light/60 mt-1">Slow relaxed consultations, tailored drink menu.</p>
                          </button>
                        </div>
                      </div>

                      {/* Special Notes / Aesthetic History */}
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-charcoal/65 tracking-wider block mb-2 font-sans">
                          Surgical History or Specific Facial Goals (Confidential)
                        </label>
                        <textarea
                          rows={3}
                          value={bookingForm.specialNotes}
                          onChange={(e) => setBookingForm({ ...bookingForm, specialNotes: e.target.value })}
                          placeholder="Please mention any prior dental veneer material, dermal fillers applied in past 12 months, or specific aesthetic symmetry priorities you are targeting..."
                          className="w-full bg-alabaster focus:bg-white border border-champagne/15 hover:border-champagne/30 focus:border-champagne focus:outline-none rounded-xl px-4 py-3 text-xs text-charcoal transition-all duration-300"
                          id="input-booking-notes"
                        />
                      </div>

                      {/* Submit */}
                      <div>
                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="w-full py-4 h-14 bg-charcoal text-white hover:text-champagne hover:bg-charcoal/95 text-xs uppercase tracking-widest font-sans font-semibold rounded-full flex items-center justify-center gap-2.5 transition-all duration-300"
                          id="btn-booking-submit"
                        >
                          {bookingLoading ? (
                            <span className="flex items-center gap-1.5 animate-pulse">
                              Transmitting Reservation Securely...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Complete Reservation Proposal <ChevronRight className="w-4 h-4 text-champagne" />
                            </span>
                          )}
                        </button>
                      </div>

                    </form>
                  )}

                </div>
              </div>

              {/* Saved appointments list showing local persistence */}
              {bookings.length > 0 && (
                <div className="bg-alabaster rounded-3xl p-6 border border-champagne/15" id="persistent-appointments-log">
                  <span className="text-[10px] font-mono text-sage uppercase tracking-widest block mb-4">
                    Authorized Clinical Invitations (Local Secure Ledger)
                  </span>
                  <div className="space-y-4">
                    {bookings.map((booking) => {
                      const doc = CLINICIANS.find(c => c.id === booking.clinicianId);

                      return (
                        <div 
                          key={booking.id}
                          className="bg-white border border-champagne/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                        >
                          <div>
                            <span className="text-[10px] uppercase bg-sage/15 border border-sage/20 text-sage px-2.5 py-0.5 rounded-full font-mono mb-1 inline-block">
                              Proposal Status: {booking.status}
                            </span>
                            <h5 className="text-sm font-serif font-bold text-charcoal mt-1">
                              Guest: {booking.patientName} &bull; <span className="font-light">{booking.patientPhone}</span>
                            </h5>
                            <p className="text-charcoal-light/60 mt-1 max-w-xl">
                              Pathway: {booking.concernCategory === "smile" ? "Porcelain Smile Artistry" : booking.concernCategory === "dermal" ? "Dermal Aesthetics" : "Holistic Sensory Hygiene"} &bull; Recommended Expert: {doc ? doc.name : "Dr. Elena Vance"}
                            </p>
                            {booking.specialNotes && (
                              <p className="text-[10px] text-champagne italic mt-1.5">
                                Metadata: {booking.specialNotes}
                              </p>
                            )}
                          </div>

                          <div className="bg-alabaster border border-champagne/10 p-3 rounded-xl shrink-0 text-right font-sans">
                            <span className="text-[10px] text-charcoal/40 block">Time & Date Slot</span>
                            <span className="font-semibold text-charcoal block mt-0.5">{booking.date}</span>
                            <span className="text-[10px] text-sage block leading-none mt-1">{booking.timeSlot.split(" (")[0]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* FLOATING CONSCIOUS CONCIERGE WIDGET */}
      <ConsciousConcierge />

      {/* LUXURY BRUSHED FOOTER DECK */}
      <footer className="bg-charcoal text-white/90 border-t border-champagne/15 font-sans pt-16 pb-24 md:pb-12" id="luxury-page-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-[11px] font-mono tracking-widest text-champagne uppercase font-bold">
              About Derma Dental
            </h5>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              We stand as an artistic clinical collaboration. By uniting board-certified cosmetic dental sculptors with master aesthetic practitioners, we coordinate full-face facial harmony under strict biological standards inside calming sanctuaries.
            </p>
            <span className="text-[10px] text-champagne font-mono block pt-2">
              Copyright &copy; 2026 Derma Dental Clinic. All Rights Preserved.
            </span>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="text-[11px] font-mono tracking-widest text-champagne uppercase font-bold">
              Harley Street Sanctuary Coordinates
            </h5>
            <div className="space-y-3.5 text-xs text-white/65">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                <span>Harley Street Aesthetics Wing, Suite 104, Marylebone, London, W1G 9QD</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <span>+44 20 7946 0958 (Symmetry Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <span>care@dermadental-london.com</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="text-[11px] font-mono tracking-widest text-champagne uppercase font-bold">
              Lounge Sanctuary Access
            </h5>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>The Solstice Days (Mon - Fri)</span>
                <span className="text-champagne font-mono">08:00 - 20:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>The Sienne Days (Saturday)</span>
                <span className="text-champagne font-mono">09:00 - 17:00</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Sabbath Reflections (Sunday)</span>
                <span className="text-white/30">Quiet Conservatory</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-[10px] uppercase text-sage font-semibold flex items-center gap-1.5 leading-snug">
                <ShieldCheck className="w-4 h-4 text-sage" /> Zero-Bacteria Molecular Standards
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
