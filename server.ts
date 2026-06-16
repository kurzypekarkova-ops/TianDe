import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Secure MLM Authentication Configuration
const VIP_USERS = [
  { registrationId: "700700", pin: "2026", name: "Kateřina Pekárková", role: "Kateřina Pekárková (Správce)" },
  { registrationId: "800800", pin: "4455", name: "Ivana Nohavová", role: "Ivana Nohavová (TOP Lídr)" },
  { registrationId: "900900", pin: "5566", name: "Zuzana Grygier", role: "Zuzana Grygier (TOP Lídr)" },
  { registrationId: "600600", pin: "6677", name: "Marta Neumannová", role: "Marta Neumannová (TOP Lídr)" },
  { registrationId: "test@apkatiande.cz", pin: "1234", name: "Testovací Uživatel", role: "Testér tianDe (Fiktivní Účet)" },
  { registrationId: "test", pin: "1234", name: "Testovací Uživatel", role: "Testér tianDe (Fiktivní Účet)" }
];

const LEADER_EMAILS: Record<string, string> = {
  "Kateřina Pekárková": "kurzypekarkova@gmail.com",
  "Ivana Nohavová": "ivana.nohavova@tiande-team.cz",
  "Zuzana Grygier": "zuzana.grygier@tiande-team.cz",
  "Marta Neumannová": "marta.neumannova@tiande-team.cz",
  "Testovací Lídři": "test@apkatiande.cz"
};

const PINS_FILE = path.join(process.cwd(), "authorized_pins.json");

function readAuthorizedPins(): Record<string, { pin: string; leaderName: string; createdAt: string }> {
  try {
    if (fs.existsSync(PINS_FILE)) {
      const data = fs.readFileSync(PINS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading PINs file, returning empty:", err);
  }
  return {};
}

function writeAuthorizedPins(pins: Record<string, any>) {
  try {
    fs.writeFileSync(PINS_FILE, JSON.stringify(pins, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing PINs file:", err);
  }
}

// Authentication API Endpoints
app.post("/api/auth/login", (req, res) => {
  const { registrationId, pin } = req.body;
  if (!registrationId || !pin) {
    return res.status(400).json({ success: false, error: "Vyplňte prosím registrační číslo a PIN kód." });
  }

  const cleanReg = registrationId.toString().trim();
  const cleanPin = pin.toString().trim();

  // Check VIP users
  const vip = VIP_USERS.find(v => v.registrationId === cleanReg && v.pin === cleanPin);
  if (vip) {
    return res.json({ 
      success: true, 
      user: { 
        registrationId: vip.registrationId, 
        name: vip.name, 
        role: "VIP",
        roleLabel: vip.role
      } 
    });
  }

  // Check Authorized dynamic PINs
  const pins = readAuthorizedPins();
  const entry = pins[cleanReg];
  if (entry && entry.pin === cleanPin) {
    return res.json({ 
      success: true, 
      user: { 
        registrationId: cleanReg, 
        name: `Člen tianDe #${cleanReg}`, 
        role: "Member", 
        roleLabel: `Registrovaný člen (Lídr: ${entry.leaderName})` 
      } 
    });
  }

  return res.status(401).json({ success: false, error: "Neplatné registrační číslo nebo PIN kód." });
});

app.post("/api/auth/request-access", (req, res) => {
  const { registrationId, leaderName } = req.body;
  if (!registrationId || !leaderName) {
    return res.status(400).json({ success: false, error: "Registrační číslo a výběr lídra jsou povinné." });
  }

  const cleanReg = registrationId.toString().trim();
  if (cleanReg.length < 3) {
    return res.status(400).json({ success: false, error: "Zadejte platné registrační číslo (minimálně 3 znaky)." });
  }

  // Generate 4-digit PIN
  const pin = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Save to persistent file
  const pins = readAuthorizedPins();
  pins[cleanReg] = {
    pin,
    leaderName,
    createdAt: new Date().toISOString()
  };
  writeAuthorizedPins(pins);

  const email = LEADER_EMAILS[leaderName] || "kurzypekarkova@gmail.com";

  res.json({
    success: true,
    pin,
    email,
    leaderName
  });
});

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, systemPrompt, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const genAI = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const chat = genAI.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message: message });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
