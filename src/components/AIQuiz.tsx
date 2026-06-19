import { useState } from "react";
import { 
  Sparkles, Heart, Shield, Minimize2, Activity, 
  Eye, Droplets, Moon, Brain, Compass, Calendar, 
  Clock, RotateCcw, ArrowRight, CheckCircle2 
} from "lucide-react";
import { CONSULT_QUIZ, SERVICES, CLINICIANS } from "../data";
import { ServiceExperience, Clinician } from "../types";

// Map lucide-react icons dynamically
const ICON_MAP: Record<string, any> = {
  Sparkles,
  Heart,
  Shield,
  Minimize2,
  Activity,
  Eye,
  Droplets,
  Moon,
  Brain,
  Compass,
  Calendar,
  Clock
};

interface AIQuizProps {
  onRecommendationSelected: (service: ServiceExperience, clinician?: Clinician) => void;
}

export default function AIQuiz({ onRecommendationSelected }: AIQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const activeQuestion = CONSULT_QUIZ[currentStep];

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [activeQuestion.id]: value };
    setAnswers(updated);

    if (currentStep < CONSULT_QUIZ.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete & Analyze
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setIsCompleted(true);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Advanced Recommendation Engine logic
  const getRecommendation = () => {
    const mainConcern = answers["primary-concern"];
    const priority = answers["aesthetic-priority"];
    
    let targetServiceId = "veneers"; // defaults
    let targetDoctorId = "dr-elena";

    if (mainConcern === "smile") {
      if (priority === "purity") {
        targetServiceId = "whitening";
        targetDoctorId = "dr-elena";
      } else if (priority === "alignment") {
        targetServiceId = "invisalign";
        targetDoctorId = "dr-elena";
      } else {
        targetServiceId = "veneers";
        targetDoctorId = "dr-elena";
      }
    } else if (mainConcern === "dermal") {
      if (priority === "tension") {
        targetServiceId = "botox";
        targetDoctorId = "dr-marcus";
      } else {
        targetServiceId = "fillers";
        targetDoctorId = "dr-marcus";
      }
    } else if (mainConcern === "restorative") {
      targetServiceId = "hygiene";
      targetDoctorId = "dr-sophia";
    }

    const recommendedService = SERVICES.find(s => s.id === targetServiceId) || SERVICES[0];
    const recommendedClinician = CLINICIANS.find(c => c.id === targetDoctorId) || CLINICIANS[0];

    return {
      service: recommendedService,
      clinician: recommendedClinician,
      harmonyScore: 94 + Math.floor(Math.random() * 5), // 94% to 98%
    };
  };

  if (analyzing) {
    return (
      <div className="bg-alabaster rounded-3xl p-8 md:p-12 border border-champagne/15 text-center flex flex-col items-center justify-center min-h-[400px]">
        {/* Animated golden circles */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-champagne/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-champagne/40 animate-pulse flex items-center justify-center text-champagne">
            <Sparkles className="w-6 h-6 animate-spin duration-3000" />
          </div>
        </div>
        <h4 className="text-xl font-serif text-charcoal font-medium">
          Calibrating Perfect Facial Harmony...
        </h4>
        <p className="text-charcoal-light/60 text-xs mt-2 max-w-sm">
          Analyzing selected aesthetic priorities against our advanced dental alignment and dermal restoration frameworks.
        </p>
      </div>
    );
  }

  if (isCompleted) {
    const { service, clinician, harmonyScore } = getRecommendation();
    
    return (
      <div className="bg-alabaster rounded-3xl p-8 md:p-12 border border-champagne/15" id="consultation-result-card">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-widest font-sans text-sage font-semibold border border-sage/20 px-3 py-1 rounded-full bg-sage/5">
            Prescription Consultation Active
          </span>
          <h4 className="text-2xl md:text-3xl font-serif text-charcoal font-medium mt-4">
            Your Harmonized Treatment Outline
          </h4>
          <p className="text-charcoal-light/60 text-xs mt-1.5">
            Crafted specifically to support your clinical and sensory environment preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          {/* Main Recommended Service Card */}
          <div className="lg:col-span-7 bg-white rounded-2.5xl p-6 md:p-8 border border-champagne/15 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-start mb-4 gap-4">
                <span className="text-xs font-sans uppercase tracking-wider text-champagne bg-champagne/5 px-3 py-1.5 rounded-full border border-champagne/10 font-semibold">
                  Primary Recommendation
                </span>
                <span className="text-xs font-mono font-medium text-sage flex items-center gap-1 bg-sage/5 border border-sage/20 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {harmonyScore}% Match
                </span>
              </div>

              <h5 className="text-xl md:text-2xl font-serif text-charcoal font-medium leading-tight">
                {service.name}
              </h5>
              <p className="text-xs text-sage font-sans tracking-wide mt-1 italic">
                {service.tagline}
              </p>

              <p className="text-charcoal-light/80 text-xs md:text-sm mt-4 leading-relaxed line-clamp-4 md:line-clamp-none">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b border-charcoal/5 py-4 text-xs">
                <div>
                  <span className="text-charcoal/40 block uppercase tracking-wider">Durability</span>
                  <span className="text-charcoal-light font-medium mt-0.5 block">{service.longevity}</span>
                </div>
                <div>
                  <span className="text-charcoal/40 block uppercase tracking-wider">Sensory Level</span>
                  <span className="text-charcoal-light font-medium mt-0.5 block">{service.comfortLevel}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRecommendationSelected(service, clinician)}
              className="mt-6 w-full py-3 h-12 rounded-full bg-champagne hover:bg-champagne-hover text-white text-xs tracking-wider uppercase font-sans font-semibold flex items-center justify-center gap-2 shadow-sm"
              id="quiz-cta-book-service"
            >
              Secure Bespoke Treatment Booking
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recommended Craftsman & Next Steps Side Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2.5xl p-6 border border-champagne/15 flex flex-col justify-between flex-1 shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-charcoal/40 font-semibold mb-3 block">
                  Recommended Clinician
                </span>
                <div className="flex items-center gap-4">
                  <img
                    src={clinician.photo}
                    alt={clinician.name}
                    className="w-12 h-12 rounded-full object-cover border border-champagne/20 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h6 className="text-sm font-serif font-semibold text-charcoal leading-tight">
                      {clinician.name}
                    </h6>
                    <span className="text-[10px] text-charcoal-light/60 font-sans block">
                      {clinician.title}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-charcoal-light/75 italic mt-4 border-l-2 border-champagne/30 pl-3">
                  "{clinician.philosophy}"
                </p>
              </div>

              <div className="border-t border-charcoal/5 pt-4 mt-4 text-[11px] text-charcoal/60">
                Dr. {clinician.name.split(" ")[1]} is pre-calibrated to lead your session in "
                {answers["experience-preference"] === "meditative" ? "Deep Meditative Sanctuary" : answers["experience-preference"] === "scientific" ? "Scientific Dialogue" : "Concierge Luxury"}
                " mode.
              </div>
            </div>

            {/* Restart card */}
            <button
              onClick={resetQuiz}
              className="py-3 h-10 w-full border border-champagne/20 rounded-full hover:bg-white text-xs uppercase tracking-widest text-charcoal/70 hover:text-charcoal font-sans font-semibold flex items-center justify-center gap-2"
              id="quiz-cta-restart"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-Calibrate Consult Goals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-alabaster rounded-3xl p-6 md:p-10 border border-champagne/15" id="comprehensive-consult-quiz">
      {/* Quiz Header & Progress Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-charcoal/5 pb-6 gap-2">
        <div>
          <span className="text-[11px] font-mono text-champagne uppercase tracking-widest">
            Digital Consultation Profile
          </span>
          <h4 className="text-lg md:text-xl font-serif text-charcoal font-medium">
            AI-Lite Harmony Assessment
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-charcoal-light/50">
            Step {currentStep + 1} of {CONSULT_QUIZ.length}
          </span>
          <div className="w-24 h-1.5 bg-charcoal/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-champagne transition-all duration-300"
              style={{ width: `${((currentStep + 1) / CONSULT_QUIZ.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="mt-8">
        <div className="mb-6">
          <h5 className="text-xl md:text-2xl font-serif text-charcoal font-light leading-tight">
            {activeQuestion.text}
          </h5>
          {activeQuestion.subtitle && (
            <p className="text-xs text-charcoal-light/50 font-sans mt-1.5">
              {activeQuestion.subtitle}
            </p>
          )}
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8">
          {activeQuestion.options.map((opt, oIdx) => {
            const Icon = opt.icon ? ICON_MAP[opt.icon] : null;

            return (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(opt.value)}
                className="md:col-span-4 bg-white hover:bg-warm-ivory text-left p-5 rounded-2.5xl border border-champagne/15 hover:border-champagne/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4"
                id={`quiz-question-opt-${oIdx}`}
              >
                <div className="p-2.5 bg-champagne/5 border border-champagne/15 rounded-xl text-champagne shrink-0 self-start">
                  {Icon ? <Icon className="w-5 h-5 shrink-0" /> : <Sparkles className="w-5 h-5 shrink-0" />}
                </div>

                <div>
                  <h6 className="text-sm font-sans font-semibold text-charcoal leading-snug">
                    {opt.label}
                  </h6>
                  {opt.description && (
                    <p className="text-xs text-charcoal-light/60 mt-1 font-light leading-relaxed">
                      {opt.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-10 border-t border-charcoal/5 pt-6 text-xs text-charcoal/40">
          <span>We protect patient biometrics and strictly respect medical privacy laws.</span>
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="text-champagne font-sans hover:underline hover:text-champagne-hover font-medium flex items-center gap-1"
              id="quiz-back-btn"
            >
              Previous Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
