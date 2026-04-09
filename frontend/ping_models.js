import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from "fs";

async function run() {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  const keyMatch = envContent.match(/VITE_GEMINI_API_KEY=["']?([^"'\n\r]+)/);
  if (!keyMatch) { console.log("No key found"); process.exit(1); }
  const apiKey = keyMatch[1];
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const models = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-1.5-flash"
  ];
  
  for (const m of models) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Say 'pong'");
      const response = await result.response;
      console.log(`[SUCCESS] ${m}: ${response.text()}`);
    } catch (e) {
      console.log(`[FAIL] ${m}: ${e.message.split('\n')[0]}`);
    }
  }
}
run();
