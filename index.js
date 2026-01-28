import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Set default Gemini model
const GEMINI_MODEL = "gemini-2.5-flash";

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));

// Endpoint chat
app.post("/api/chat", async (req, res) => {
  const { conversation } = req.body;

  try {
    if (!Array.isArray(conversation)) throw new Error("Message must be array!");

    const contents = conversation.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
      config: {
        temperature: 0.9,
        systemInstruction: "Jawab hanya menggunakan bahasa Indonesia.",
      },
    });

    res.status(200).json({ result: response.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
