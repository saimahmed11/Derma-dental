import { ServiceExperience, Clinician, JournalArticle, QuizQuestion } from "./types";

export const SERVICES: ServiceExperience[] = [
  {
    id: "veneers",
    name: "Porcelain Veneers & Ceramic Artistry",
    category: "smile",
    tagline: "Hand-sculpted porcelain shells aligned with your facial symmetry.",
    description: "Every smile is a conversation; our porcelain veneers are custom-sculpted masterpieces designed to blend seamlessly with your native dental structure. Using ultra-thin, highly translucent premium Austrian ceramic, we focus on micro-textures and light reflection to ensure your veneers possess the natural organic depth of real enamel rather than an artificial, opaque gloss.",
    duration: "2-3 appointments of 2.5 hours",
    comfortLevel: "Absolute Comfort (Local aesthetic & noise-canceling lounge care)",
    longevity: "15 to 20 Years with custom conservation",
    features: [
      "Custom color, contour, and translucency scaling",
      "Minimal structure preparation for maximum preservation",
      "Temporary veneer trials to experience your new look before placement",
      "Hand-gilded finish matching your custom biometric profile"
    ],
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200",
    faqs: [
      {
        question: "How long is the adaptation period for new veneers?",
        answer: "Due to our highly precise digital facial integration, most patients adapt inside 48 hours. Your speech, chewing comfort, and lip posture are fully accounted for during our elite custom prototyping stage."
      },
      {
        question: "Will they stain over time?",
        answer: "No. The highly dense, non-porous Austrian glaze we use is absolute. Unlike natural teeth, premium porcelain is fully resistant to coffee, red wine, and deep tea staining."
      }
    ]
  },
  {
    id: "whitening",
    name: "Luxury Ruby-Laser Whitening & Micro-Abrasion",
    category: "smile",
    tagline: "Therapeutic shade lifting with calibrated thermal barrier protection.",
    description: "Traditional in-chair whitening can cause deep dental nerve shocks. Our signature Ruby-Laser whitening pairs a highly customized clinical peroxide serum infused with micronized minerals and botanical barriers. Calibrated lasers target deeper intrinsic stains without overheating the teeth, achieving up to 8 shades of lift safely and comfortably. Combined with a micro-abrasion clean to eliminate fine surface variations.",
    duration: "Single 75-minute treatment",
    comfortLevel: "High Comfort (Calibrated non-sensitizing warm gels)",
    longevity: "2 to 3 Years depending on dietary lifestyle",
    features: [
      "Botanical mineral barrier gel prevents sensitivity",
      "Multi-wave laser light reduces session time by 50%",
      "Custom take-home conservation serum set included",
      "Micro-abrasion smoothing for elegant, satin light reflection"
    ],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200",
    faqs: [
      {
        question: "Why doesn't this whitening trigger deep sensitivity?",
        answer: "We block the dentinal tubules using a proprietary pre-treatment calcium-phosphate serum. The cold-laser frequency is calibrated to break down stains without elevating core pulp temperatures."
      }
    ]
  },
  {
    id: "invisalign",
    name: "Elite Invisible Orthodontic Structuring",
    category: "smile",
    tagline: "Symphonic micro-movements plotted with state-of-the-art AI precision.",
    description: "Align your smile in complete secrecy. We don't just straighten teeth; we study how the dental arch supports your facial contours, from your chin prominence to your cheek volume. Utilizing modern digital orthodontic mapping, your clear path consists of discrete, medical-grade, high-elasticity smart-track material, ensuring teeth are guided precisely yet comfortably.",
    duration: "6 to 14 months of gentle progression",
    comfortLevel: "Very High (Gentle, calculated tension pathways)",
    longevity: "Lifetime with bespoke clear nocturnal retainer",
    features: [
      "Full digital 3D virtual pathway scan of each jaw line",
      "Anatomic dental arch expansions for a broader, fuller smile corridor",
      "Subtle attachment materials colored to match natural tooth undertone",
      "Nocturnal luxury retainers crafted to preserve align architecture"
    ],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    faqs: [
      {
        question: "How often must I wear my clear custom aligners?",
        answer: "For optimal, predictable results, we recommend wearing your custom clear aligners 20 to 22 hours daily, removing them only during meals and oral hygiene routines."
      }
    ]
  },
  {
    id: "botox",
    name: "Myofascial Botox & Organic Line Smoothing",
    category: "dermal",
    tagline: "Precise neuromodulation targeting natural movement over rigid freezing.",
    description: "We work with your movement, never against it. Our advanced myofascial Botox injection technique targets active facial lines without producing a frozen, expressionless appearance. Through micro-droplet placement of ultra-purified neuromodulators, we selectively soften hyper-functional muscle zones. Perfect for smoothing worry columns, horizontal brow bands, and relaxing masseter bands of the jaw to alleviate teeth-grinding stress.",
    duration: "30-minute session with diagnostic face-mapping",
    comfortLevel: "High Comfort (Sub-zero cold probe pre-anesthetic)",
    longevity: "4 to 6 Months depending on systemic metabolism",
    features: [
      "3D facial muscle path diagnostics before micro-injections",
      "Ultra-purified FDA approved formulation for zero cellular buildup",
      "Dual clinical effect: cosmetic smoothing and bruxism tension relief",
      "Complimentary micro-touch tracking after 14 days"
    ],
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200",
    faqs: [
      {
        question: "Will my face look frozen or overly artificial?",
        answer: "Our practice is highly centered on organic harmony. By using precise micro-dosages tailored to your specific muscle strength, you retain elegant, soft micro-expressions."
      },
      {
        question: "Does it help with persistent jaw tension?",
        answer: "Remarkably. Injecting the masseters deeply relaxes chronic teeth-clenching muscles, protecting your dental veneers and gently narrowing the facial lower third."
      }
    ]
  },
  {
    id: "fillers",
    name: "Architectural Dermal Silk & Sculpt",
    category: "dermal",
    tagline: "Hyaluronic volume restoration to rebuild structural facial support.",
    description: "Loss of facial volume can lead to an exhausted, gravity-pulled appearance. Our custom Dermal Silk and Sculpt therapy rebuilds deep padding utilizing bio-compatible, high-density hyaluronic acid. Placed precisely along the skeletal boundaries (the zygomatic arch, mandibular line, and deep temples), it mimics young tissue structure, lifting the mid-face naturally and refining shadows.",
    duration: "45-60 minutes including artistic facial marking",
    comfortLevel: "Excellent (Built-in therapeutic local anesthetic)",
    longevity: "12 to 18 Months with gentle biochemical reset",
    features: [
      "Precise deep placement preserves superficial skin mobility",
      "Infused hydration binds natural moisture molecules",
      "Cannula safety technique minimizes clinical bruising and downtime",
      "Designed to enhance profile definition and chin-jaw transition"
    ],
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200",
    faqs: [
      {
        question: "Is there immediate swelling after dermal placement?",
        answer: "Some mild swelling or soft tenderness is expected. However, using our specialized micro-cannula technique minimizes fine blood vessel disruption, allowing most patients to dine out that same evening."
      }
    ]
  },
  {
    id: "hygiene",
    name: "Sensory Holistic Hygiene & Air-Polishing",
    category: "restorative",
    tagline: "Sonic mineral cleanse with zero-heat ultrasonic vibration.",
    description: "Step away from noisy drills and abrasive scrapers. Our Sensory Hygiene clean utilizes warm-sprayed fine microforce mineral powders (calcium carbonate) together with specialized Swiss Piezon ultrasonic tips. It effortlessly floats away stain molecules, tartar, and sticky Bio-film while active aromatherapy, soft overhead screens, and high-fidelity noise-canceling headphones cocoon your senses.",
    duration: "60-minute therapeutic session",
    comfortLevel: "Absolute Relief (No cold sensitivity, completely dynamic warmth)",
    longevity: "Recommended every 4-6 Months",
    features: [
      "Ultrasonic warm Swiss technology feels like a soft massage",
      "Active tea-tree oil and chamomile soothing rinse",
      "Micro-polishing with soft mineral dust leaves enamel smooth",
      "High-definition clinical camera tracks progress transparently"
    ],
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200",
    faqs: [
      {
        question: "How does air-polishing feel compared to standard scale cleans?",
        answer: "The warm powder streams are virtually contactless, meaning there is zero standard enamel scraping sound, zero temperature shocks, and zero gum line friction."
      }
    ]
  }
];

export const CLINICIANS: Clinician[] = [
  {
    id: "dr-elena",
    name: "Dr. Elena Vance, DDS",
    title: "Master of Cosmetic Dentistry & Orthodontics",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    credentials: [
      "DDS from Columbia University School of Dental Medicine",
      "Post-Graduate Diploma in Facial Aesthetics, London",
      "12+ Years Dedicated to Smile Artistry Design",
      "Fellow of the American Academy of Cosmetic Dentistry (AACD)"
    ],
    bio: "Dr. Elena Vance treats smile reconstruction like fine sculpture, analyzing facial proportions, skin tones, and lip dynamics to craft smiles that look radiant, organic, and entirely natural.",
    philosophy: "A gorgeous smile is not about uniform white blocks. It is about how porcelain catches light, aligning seamlessly with the movement of your eyes, jaw, and unique spirit.",
    services: ["veneers", "whitening", "invisalign", "hygiene"]
  },
  {
    id: "dr-marcus",
    name: "Dr. Marcus Sterling, MD",
    title: "Chief Facial Aesthetic Physician",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    credentials: [
      "MD with Distinction from Yale School of Medicine",
      "Board Certification in Aesthetic Medicine",
      "International Key Opinion Leader on Myofascial Rebalance",
      "Expert on Non-Invasive Anti-Aging Procedures"
    ],
    bio: "Dr. Marcus Sterling focuses on custom facial harmony and deep non-surgical tissue rejuvenation. His unique anatomical approach addresses lines, shadows, and myofascial tension beneath the skin.",
    philosophy: "Elite aesthetics should never announce themselves. True success is when your friends comment on how remarkably rested you look, completely unaware of clinical intervention.",
    services: ["botox", "fillers"]
  },
  {
    id: "dr-sophia",
    name: "Dr. Sophia Lin",
    title: "Holistic Restorative Clinician",
    photo: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800",
    credentials: [
      "DDS from University of California, San Francisco (UCSF)",
      "Master of Implantology & Advanced Biomimetic Care",
      "Certified Holistic Wellness Integration Specialist",
      "Developer of the Sensory-Guided Clinic Protocols"
    ],
    bio: "Dr. Sophia Lin bridges dental science with deep patient sensory comfort, designing low-stress restorative procedures that safeguard system-wide health and utilize zero-metal biocompatible ceramics.",
    philosophy: "Healing is a physical and neurological journey. Our clinic is an oasis created to calm the nervous system, turning routine appointments into restorative sessions.",
    services: ["veneers", "hygiene"]
  }
];

export const ARTICLES: JournalArticle[] = [
  {
    id: "science-behind-veneers",
    title: "The Architecture of Light: How Translucent Austrian Ceramics Emulate Natural Enamel",
    category: "Smile Artistry",
    excerpt: "Why flat-white veneers are a cosmetic tragedy, and how micro-textures replicate natural dental refraction.",
    content: [
      "For decades, dental cosmetics focused exclusively on flat, solid opacity. The result was often dental blocks that was far too white, static, and synthetic. Real dental enamel, however, is a masterpiece of complex geological layers, with clear crystalline minerals filtering and bouncing light.",
      "At Derma Dental, we reject static opacity. Our team partners with premium lab technicians who utilize hand-painted Austrian porcelain. Each veneer consists of up to nine microscopic layers, mimicking the natural transitions from the deep tinted dentine to the cool translucent bluish edge of young teeth.",
      "Furthermore, custom micro-texture is added directly onto the porcelain surface. When light hits these microscopic irregularities, it diffuses softly, eradicating the mirror-like artificial sheen. The result is a vibrant smile that remains fully alive under romantic candlelight, direct sunlight, and flash photography alike."
    ],
    readTime: "4 min read",
    date: "June 12, 2026",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200",
    author: "Dr. Elena Vance, DDS"
  },
  {
    id: "botox-for-jaw-clenching",
    title: "Beyond the Brow: Softening Jaw Tension and Refining Lower Facial Contours with Dysport & Botox",
    category: "Facial Aesthetics",
    excerpt: "Exploring the dual restorative-cosmetic power of masseter neuromodulation to protect veneers and relax the jaw.",
    content: [
      "Stress manifests physically, and the masseter muscle—the primary chewing driver located at the hinge of the jaw—is a primary recipient of systemic tension. Chronic nocturnal teeth-grinding, known as bruxism, not only wears down natural teeth and cracks veneers; it also physically thickens the muscle, widening the lower face.",
      "Micro-doses of purified neuromodulation (Botox, Dysport) target this exact issue. By strategically relaxing deep masseter fibers, we immediately reduce grinding forces without affecting your ability to speak or enjoy your favorite meals.",
      "Over the course of 4 to 6 weeks, as the hyper-inflated muscle returns to a relaxed state, the lower face undergoes a gentle, organic contouring process. This dual-purpose therapy alleviates persistent morning headaches while restoring soft, elegant, balanced angles to your lower face."
    ],
    readTime: "5 min read",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200",
    author: "Dr. Marcus Sterling, MD"
  },
  {
    id: "sensory-medical-anxiety",
    title: "Designing Calm: How Neurology and Custom Aromatherapy Elevate Clinical Care",
    category: "The Clinic Philosophy",
    excerpt: "Why the standard clinical environment triggers fight-or-flight, and the sensory details we curated to reset nerves.",
    content: [
      "The classic dental office scent—a combination of sharp alcohol sanitizers and clove-based chemical cements—triggers an immediate, instinctual warning system in the human brain. Coupled with bright fluorescent lighting and shrill, high-pitched turbine dental drills, dental anxiety is a completely logical neural response.",
      "When designing our flagship lounge, we set out to build an environment that acts as an active sensory antidote. We replaced flat blue-tinted lights with calibrated, warm, biological spectrum lighting. At our thresholds, customizable aromatherapy, featuring fine lavender, warm sandalwood, and organic chamomile, signals metabolic relaxation to your limbic system.",
      "Furthermore, patients can submerge in complete peace using high-fidelity active noise-canceling headphones playing a curated selection of ambient acoustics. Routine care is no longer a chore; it is an restorative ritual designed for total physical and mental harmony."
    ],
    readTime: "6 min read",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200",
    author: "Dr. Sophia Lin"
  }
];

export const CONSULT_QUIZ: QuizQuestion[] = [
  {
    id: "primary-concern",
    text: "Where would you like to concentrate your aesthetic focus?",
    subtitle: "Select the canvas you wish to refine with our team.",
    options: [
      {
        label: "The Perfect Smile",
        description: "Focus on veneer artistry, transparent alignment, laser whitening, or tooth design.",
        value: "smile",
        icon: "Sparkles"
      },
      {
        label: "Facial Harmony & Skin Elite",
        description: "Injectables, wrinkle-smoothing, hydration fillers, jaw contouring, and skin lift.",
        value: "dermal",
        icon: "Heart"
      },
      {
        label: "Biomimetic & Complete Restorative",
        description: "Zero-noise hygiene spa, ceramic implants, metal-free restoration, holistic care.",
        value: "restorative",
        icon: "Shield"
      }
    ]
  },
  {
    id: "aesthetic-priority",
    text: "Define your absolute aesthetic priority",
    subtitle: "What is your main artistic or physical goal?",
    options: [
      {
        label: "Radiant Optical Alignment",
        description: "Correcting offsets, restoring symmetry, and custom tooth coloration.",
        value: "alignment",
        icon: "Minimize2"
      },
      {
        label: "Rejuvenating Soft Volume",
        description: "Softening shadows, re-inflating lost cheek or lip volume organically.",
        value: "volume",
        icon: "Activity"
      },
      {
        label: "Soothed Muscle & Stress Relief",
        description: "Eliminating clenching strain, headaches, and masseter fatigue.",
        value: "tension",
        icon: "Eye"
      },
      {
        label: "Pristine Biological Cleansing",
        description: "Removing plaque bio-film and intrinsic staining in absolute serenity.",
        value: "purity",
        icon: "Droplets"
      }
    ]
  },
  {
    id: "experience-preference",
    text: "Choose your desired clinical experience mode",
    subtitle: "We tailor the room's energy to your custom nervous system profile.",
    options: [
      {
        label: "Deep Meditative Sanctuary",
        description: "Aromatherapy, warm blankets, immersive soundtrack, and minimal verbal intrusion.",
        value: "meditative",
        icon: "Moon"
      },
      {
        label: "Scientific Dialogue",
        description: "High-definition camera analysis, micro-mechanics, and step-by-step progress metrics.",
        value: "scientific",
        icon: "Brain"
      },
      {
        label: "Concierge Bespoke Pace",
        description: "Relaxed pacing, slow consultations, exquisite details, custom beverages.",
        value: "luxury",
        icon: "Compass"
      }
    ]
  },
  {
    id: "timeline-goal",
    text: "When are you hoping to realize your transformation?",
    subtitle: "This helps us coordinate clinical resources and specialized labs.",
    options: [
      {
        label: "Bespoke Immediate Transformation",
        description: "Preparing for a signature life milestone, wedding, or photo debut soon.",
        value: "immediate",
        icon: "Calendar"
      },
      {
        label: "Thoughtful Gradual Enrichment",
        description: "Coordinating a step-by-step aesthetic outline over the current season.",
        value: "gradual",
        icon: "Clock"
      }
    ]
  }
];
