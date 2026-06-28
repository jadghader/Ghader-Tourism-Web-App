import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy-loaded Gemini AI client helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured in the environment. Please add it via Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API endpoint for Custom Tour Itinerary Generation
  app.post("/api/gemini/generate-itinerary", async (req, res) => {
    try {
      const { days, interests, groupSize, vehicle } = req.body;

      if (!days || !interests || !groupSize || !vehicle) {
        return res.status(400).json({ error: "Missing required parameters: days, interests, groupSize, vehicle" });
      }

      let ai;
      try {
        ai = getGeminiClient();
      } catch (err: any) {
        // Safe fallback when API key is missing
        console.warn("Gemini Client initialization failed, using high-quality local fallback itinerary generator:", err.message);
        return res.json(getFallbackItinerary(days, interests, groupSize, vehicle));
      }

      const prompt = `You are an expert Lebanese travel concierge and tourism specialist representing Ghader Tourism (with over 20 years of experience). Create a highly detailed, personalized travel itinerary in Lebanon.
The user details:
- Number of Days: ${days}
- Interests: ${interests} (e.g. history, beaches, mountain hiking, religious sights, food)
- Group Size & Dynamic: ${groupSize} (e.g. solo, couple, family with kids, senior citizens)
- Selected Vehicle Category: ${vehicle} (from Economy Sedan, Executive Sedan, Luxury, Minivan, Van)

Please craft a fully tailored tour that makes incredible use of Ghader Tourism's professional private chauffeur service. Emphasize seamless transfers, local comfort, and customized routes. Make the locations realistic for Lebanon (e.g., Beirut, Jeita Grotto, Harissa, Byblos, Batroun, Cedars of God, Bcharre, Baalbek, Tyre, Sidon).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional luxury travel planner for Ghader Tourism in Lebanon. Generate pristine, highly engaging itineraries and tips.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A captivating, luxurious title for the custom tour."
              },
              summary: {
                type: Type.STRING,
                description: "A 2-3 sentence engaging overview of what makes this tour exceptional, emphasizing Ghader Tourism's professional service and 20+ years of local driver guidance."
              },
              days: {
                type: Type.ARRAY,
                description: "Daily breakdown of the itinerary.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING, description: "Theme/focus of the day (e.g., 'Discovering Phoenician Ruins in Byblos')" },
                    morning: { type: Type.STRING, description: "Morning activities starting with comfortable private hotel pickup by your Ghader Tourism chauffeur." },
                    afternoon: { type: Type.STRING, description: "Afternoon exploration, scenic stops, and traditional Lebanese lunch recommendations." },
                    evening: { type: Type.STRING, description: "Evening activities, authentic dining, and a smooth chauffeur transfer back to the hotel." },
                    highlights: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "List of 3 key attractions or landmarks visited today."
                    }
                  },
                  required: ["day", "title", "morning", "afternoon", "evening", "highlights"]
                }
              },
              recommendedVehicleReason: {
                type: Type.STRING,
                description: "Explain why the selected vehicle category is highly recommended for this specific itinerary (comfort, mountain terrain like Faraya/Cedars, luggage capacity, group size)."
              },
              localProTip: {
                type: Type.STRING,
                description: "A very helpful local tip for international travelers in Lebanon (currency exchange, local customs, best times for photography, or packing essentials)."
              }
            },
            required: ["title", "summary", "days", "recommendedVehicleReason", "localProTip"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content generated by Gemini.");
      }

      const itineraryData = JSON.parse(responseText.trim());
      res.json(itineraryData);

    } catch (error: any) {
      console.error("Error in generate-itinerary endpoint:", error);
      res.status(500).json({
        error: "Failed to generate custom itinerary.",
        details: error.message
      });
    }
  });

  // Local fallback itinerary generator in case of missing/invalid API key
  function getFallbackItinerary(days: number, interests: string, groupSize: string, vehicle: string) {
    const numDays = Math.min(Math.max(Number(days), 1), 7);
    const dayPlans = [
      {
        day: 1,
        title: "Beirut Historic Core & Coastal Charm",
        morning: "Your professional Ghader Tourism chauffeur picks you up from your hotel in a clean, air-conditioned vehicle. Head to the National Museum of Beirut for a deep dive into ancient Phoenician treasures.",
        afternoon: "Drive along the famous Corniche to see the iconic Pigeon Rocks (Raouche). Savor a luxurious Lebanese lunch overlooking the Mediterranean, then wander the historical streets of Downtown Beirut and Nejmeh Square.",
        evening: "Explore the vibrant Gemmayzeh or Mar Mikhael district, famous for its Ottoman-era houses, art galleries, and upscale local restaurants. Your driver ensures a safe, direct drop-off back at your lodging.",
        highlights: ["Beirut Corniche", "National Museum", "Pigeon Rocks"]
      },
      {
        day: 2,
        title: "Breathtaking Jeita Grotto & Panoramic Harissa Sights",
        morning: "Embark on a comfortable drive north with your private driver to the Jeita Grotto, one of the world's most spectacular natural caverns. Take a mystical boat ride through the lower caves and walk through the upper chambers.",
        afternoon: "Ascend further up to Harissa to visit the majestic Our Lady of Lebanon shrine. Enjoy the teleferique (cable car) ride offering sweeping, panoramic views of Jounieh Bay. Relish a fresh seafood lunch by the shore.",
        evening: "Stroll along Jounieh's historic stone-paved souk, filled with quaint cafes. Relax as your chauffeur navigates the coastal traffic, delivering you comfortably back to your hotel.",
        highlights: ["Jeita Grotto", "Harissa Shrine", "Jounieh Bay"]
      },
      {
        day: 3,
        title: "Ancient Byblos Port & Batroun Coastal Exploration",
        morning: "Depart early toward Byblos (Jbeil), one of the oldest continuously inhabited cities in the world. Walk through the Crusaders Castle, explore the atmospheric Phoenician ruins, and wander the ancient stone souks.",
        afternoon: "Continue north to Batroun. Wander Batroun's old Phoenician sea wall, check out Saint George church, and stop by the famous local lemonade stand. Feast on the catch-of-the-day at a beachside tavern.",
        evening: "Catch a spectacular sunset over Batroun's rocky beaches. Enjoy a smooth and stress-free evening transfer back to Beirut with Ghader Tourism, resting in your comfortable vehicle.",
        highlights: ["Byblos Castle", "Batroun Sea Wall", "Historic Souks"]
      },
      {
        day: 4,
        title: "Mystical Valley of Qadisha & The Ancient Cedars of God",
        morning: "Depart toward the high northern mountains of Mount Lebanon. Arrive in Bcharre, the birthplace of the famous poet Kahlil Gibran, and visit the Gibran Museum housed in an ancient monastery.",
        afternoon: "Step into the sacred Cedars of God forest, home to some of the oldest majestic cedar trees on earth. Enjoy a traditional mountain meal in Bcharre while taking in the fresh Alpine air.",
        evening: "Take a scenic drive through the Qadisha Valley, a UNESCO World Heritage site of ancient hermitages. Lean back and relax as your expert driver safely navigates the winding mountain slopes back to Beirut.",
        highlights: ["Cedars of God", "Gibran Museum", "Qadisha Valley"]
      },
      {
        day: 5,
        title: "Grand Baalbek Temples & Ksara Wine Tastings",
        morning: "Cross the Mount Lebanon range into the fertile Beqaa Valley. Arrive at Baalbek, home to Lebanon's most colossal Roman temple complex (Jupiter, Bacchus, and Venus) which are stunningly preserved.",
        afternoon: "Savor a traditional Beqaa lunch featuring sfiha (savory meat pastries). Afterward, visit the historic Chateau Ksara, Lebanon's oldest winery, and explore their natural Roman-era caves used for aging wine.",
        evening: "Take a scenic drive back over the mountains, stopping to admire the Bekaa valley sunset. Arrive back safely at your Beirut hotel, fully pampered by your chauffeur's executive care.",
        highlights: ["Baalbek Temples", "Chateau Ksara Caves", "Beqaa Valley"]
      },
      {
        day: 6,
        title: "Tyre Historical Ruins & Sidon Sea Castle",
        morning: "Head south along the coast to Sidon (Saida). Explore the 13th-century Sidon Sea Castle, walk through the enchanting labyrinth of the old covered souks, and visit the historical Soap Museum.",
        afternoon: "Continue south to the ancient Phoenician maritime city of Tyre (Sour). Visit the spectacular UNESCO-listed Roman hippodrome and seaside columns, then enjoy a freshly cooked seafood lunch on Tyre's vibrant harbor.",
        evening: "Walk along Tyre's sandy marine reserve beaches before your private chauffeur drives you comfortably back to Beirut, ensuring a serene, stress-free return.",
        highlights: ["Sidon Sea Castle", "Tyre Roman Hippodrome", "Soap Museum"]
      },
      {
        day: 7,
        title: "Charming Deir El Qamar & Beiteddine Palace",
        morning: "Drive into the green Chouf mountains. Visit Deir El Qamar, a picturesque stone-built village with rich history. Walk around its historic squares and see the ancient Fakhreddine Mosque.",
        afternoon: "Visit the stunning 19th-century Beiteddine Palace, a masterpiece of traditional Lebanese-Ottoman architecture featuring intricate mosaics, fountains, and beautiful courtyards. Enjoy a traditional mountain lunch.",
        evening: "Take a peaceful stroll through the dense Cedars of Barouk nature reserve. Conclude your amazing week with a final smooth drive down the mountain back to Beirut with Ghader Tourism.",
        highlights: ["Beiteddine Palace", "Deir El Qamar", "Chouf Cedar Reserve"]
      }
    ];

    // Select the requested number of days
    const finalDays = dayPlans.slice(0, numDays);

    return {
      title: `${numDays}-Day Elite Lebanon Exploration: ${interests.split(',')[0] || 'Grand Highlights'} Tour`,
      summary: `This exclusive ${numDays}-day tour is meticulously designed for a ${groupSize} traveling in Lebanon. Relax in complete peace of mind with Ghader Tourism's trusted chauffeurs, enjoying a premium, stress-free travel experience highlighting ${interests}.`,
      days: finalDays,
      recommendedVehicleReason: `The ${vehicle} is excellent for this ${numDays}-day tour. It provides superb legroom, premium air conditioning, and generous trunk space for your group's luggage. Its stability and performance are exceptionally suited for both coastal highways and winding mountain routes like the Cedars or Beqaa valley.`,
      localProTip: "We highly recommend carrying some local currency (Lebanese Lira) for small souk shops and tipping, though US Dollars are widely accepted. Your Ghader Tourism driver will gladly point you to reputable local exchange offices."
    };
  }

  // Vite Integration for Dev / Prod
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
