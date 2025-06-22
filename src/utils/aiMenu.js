import { GoogleGenAI } from "@google/genai";

// Gemini setup
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
});

// 👇 helper: get image for an item name
async function fetchImageForItem(name) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scrape-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: `${name} food` }),
  }).catch((err) => {
    console.error("❌ Error fetching image:", err);
    throw new Error("Failed to fetch image for item.");
  });
  const data = await res.json();
  // Prefer `thumbnail` then `serpapi_thumbnail`
  return data.image?.thumbnail || data.image?.serpapi_thumbnail || "";
}

export async function generateMenuFromOCR(ocrText) {
  try {
    // 1️⃣ Ask Gemini for clean structured JSON
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Based on the given raw OCR text of a restaurant menu, return ONLY valid JSON in this format:
Generate nice and professional descriptions for each item.
{
  "items": [
    {
      "name": string,
      "description": string,
      "price": string
    }
  ]
}

OCR Text:
""" 
${ocrText}
"""`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  price: { type: "string" },
                },
                required: ["name", "description", "price"],
              },
            },
          },
          required: ["items"],
        },
      },
    });

    const content = res.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!content) throw new Error("No AI response found.");

    const parsed = JSON.parse(content);

    console.log("✅ Gemini structured menu:", parsed);

    // 2️⃣ For each item, get image URL
    const enrichedItems = await Promise.all(
      parsed.items.map(async (item) => {
        const img = await fetchImageForItem(item.name);
        return {
          ...item,
          image: img,
        };
      })
    );

    console.log("✅ Items with images:", enrichedItems);

    return { items: enrichedItems };
  } catch (err) {
    console.error("❌ Error generating menu:", err);
    throw new Error("Failed to generate menu from OCR.");
  }
}
