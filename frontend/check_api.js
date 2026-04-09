import fs from "fs";

async function run() {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  const keyMatch = envContent.match(/VITE_GEMINI_API_KEY=["']?([^"'\n\r]+)/);
  if (!keyMatch) {
    console.log("No key found");
    process.exit(1);
  }
  const apiKey = keyMatch[1];
  
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey);
    const data = await res.json();
    const names = data.models.map(m => m.name);
    console.log(names.filter(n => n.includes('gemini') && !n.includes('embedding') && !n.includes('audio') && !n.includes('vision')));
  } catch (e) {
    console.log(e);
  }
}
run();
