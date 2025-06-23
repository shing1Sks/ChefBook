import { GoogleGenAI } from "@google/genai";

// Gemini setup
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
});

// 👉 fallback food images
const fallbackImages = [
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "http://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// ✅ helper: get real image if allowed, or fallback
async function fetchImageForItem(name) {
  const useFallbackOnly = true;

  if (useFallbackOnly) {
    const random =
      fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    return { url: random, alert: true };
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/scrape-image`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `${name} food` }),
      }
    );
    const data = await res.json();
    return {
      url:
        data.image?.thumbnail ||
        data.image?.serpapi_thumbnail ||
        fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
      alert: !data.image?.thumbnail, // if fallback used
    };
  } catch (err) {
    console.log("❌ Scrape failed, fallback used:", err);
    const random =
      fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    return { url: random, alert: true };
  }
}

// ✅ MAIN
export async function generateMenuFromOCR(ocrText) {
  try {
    // 1️⃣ Gemini: get clean JSON
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

    // 2️⃣ For each item, get image or fallback
    const enrichedItems = await Promise.all(
      parsed.items.map(async (item) => {
        const { url, alert } = await fetchImageForItem(item.name);
        return {
          ...item,
          image: url,
          alert,
        };
      })
    );

    console.log("✅ Items with images (some fallback):", enrichedItems);

    return { items: enrichedItems };
  } catch (err) {
    console.error("❌ Error generating menu:", err);
    // throw new Error("Failed to generate menu from OCR.");
  }
}
