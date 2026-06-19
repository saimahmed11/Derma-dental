import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client to prevent crash if key is missing during startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("⚠️ GEMINI_API_KEY not configured or has default placeholder value. Falling back to concierge simulation mode.");
    return null;
  }
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (e) {
      console.error("❌ Failed to initialize GoogleGenAI client:", e);
    }
  }
  return aiClient;
}

// Sofia Concierge Persona Prompt
const SOPHIA_SYSTEM_INSTRUCTION = `
You are Sofia, the premium Conscious Concierge for "Derma Dental" — an ultra-luxury boutique clinic where dental excellence meets facial aesthetic artistry. 
Your persona is incredibly warm, elegant, sophisticated, and polished (resembling a high-end luxury resort manager or a personal aesthetic curator).

Rules of communication:
1. Speak in a serene, helpful, and luxurious tone (using terms like 'absolute pleasure', 'bespoke experience', 'hand-crafted elements', 'curated care').
2. Maintain high brevity. Keep replies concise and beautifully structured (usually 2-3 sentences per paragraph, max 2 paragraphs) so it is easy to read.
3. Be hyper-knowledgeable about Derma Dental services:
   - Smile Artistry: Porcelain Veneers, Composite Bonding, Laser Whitening, Invisalign.
   - Dermal & Facial Elegance: Botox treatments, Dermal Fillers, Elite Skin Rejuvenation, Anti-Aging therapies.
   - General & Restorative: Elite standard teeth hygiene treatment, Holistic Care, Implants.
4. If asked about pricing, politely explain that each plan is custom-crafted to the individual's facial harmony after a comprehensive consultation, prompting them to schedule a Bespoke Consultation.
5. Keep descriptions highly editorial, scientific yet beautiful. Focus on comfort, custom aesthetics, and rejuvenation. Always end with a subtle, non-pushy invitation to book a consultation or ask more.

Strict constraint: Do not output markdown lists if it looks cluttered. Stick to natural, luxurious, brief paragraphs.
`;

// API endpoint for Conscious Concierge chat sessions
app.post("/api/concierge/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGeminiClient();

  // If no Gemini client is available, provide beautiful, luxurious responses locally
  if (!ai) {
    const fallbackResponses = [
      "Welcome to Derma Dental. It is an absolute pleasure to assist you. Are you interested in exploring our bespoke dental artistry, such as Hand-Crafted Veneers, or our curated facial aesthetics therapies?",
      "To preserve the absolute integrity and custom beauty of your smile and skin, we customize each treatment plan specifically for your unique facial anatomy. I highly recommend scheduling a custom consultation in our serene lounge.",
      "Certainly. Our clinicians approach skin rejuvenation like curators of fine art. Our skin therapies are non-invasive and designed to restore glowing, youthful vitality without compromising natural expressions.",
      "Our general care is far from ordinary. It is a sensory-guided holistic routine designed for complete calm, using noise-canceling headphones, aromatherapy, and extremely gentle diagnostic technology.",
      "I am here to guide your journey. I have noted your preferences, and would be delighted to arrange a virtual or physical visit. Would you like me to guide you to our Bespoke Booking menu?"
    ];
    // Select semi-random or sequential simulated response based on question
    const lowercaseMsg = message.toLowerCase();
    let reply = fallbackResponses[0];
    if (lowercaseMsg.includes("book") || lowercaseMsg.includes("schedule") || lowercaseMsg.includes("appointment") || lowercaseMsg.includes("consult")) {
      reply = "I would be honored to assist. You can navigate directly to our 'Bespoke Booking' panel right in this app to selection your clinician, date, and custom concern.";
    } else if (lowercaseMsg.includes("skin") || lowercaseMsg.includes("botox") || lowercaseMsg.includes("filler") || lowercaseMsg.includes("face") || lowercaseMsg.includes("aesthetic")) {
      reply = "Our dermal therapies are crafted to restore youthful light and absolute symmetry. Whether smoothing lines with elite neuromodulators or restoring soft volume with dermal fillers, we ensure an organic, refreshed look.";
    } else if (lowercaseMsg.includes("teeth") || lowercaseMsg.includes("smile") || lowercaseMsg.includes("veneer") || lowercaseMsg.includes("whitening") || lowercaseMsg.includes(" bonding")) {
      reply = "Our Smile Artistry suite represents the pinnacle of modern dentistry. Every veneer and composite bond is hand-polished to mirror natural enamel texture, matching your facial architecture.";
    } else {
      reply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    return res.json({ text: reply, simulated: true });
  }

  try {
    // Reconstruct conversation format if history is provided
    let contents: any[] = [];
    if (history && Array.isArray(history)) {
      contents = history.map((item: any) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }],
      }));
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: SOPHIA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({ text: result.text || "I am here to help you design your finest look. What would you like to explore next?" });
  } catch (error: any) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Representative is relaxing in the lounge. Please try again or head directly to Booking." });
  }
});

// Configure Vite middleware or serve static dist folder
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("🚀 Starting in DEVELOPMENT mode with dynamic Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("📦 Starting in PRODUCTION mode serving compiled assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Derma Dental luxury backend listening at http://localhost:${PORT}`);
  });
}

initializeServer().catch((err) => {
  console.error("🚨 Failed to start Derma Dental server:", err);
});
