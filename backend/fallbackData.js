// fallbackData.js
// ─────────────────────────────────────────────────────────────
//  This file is the "offline brain" of the app.
//  When the Groq API is not available (no key, quota hit, etc.)
//  we still give users a useful, personalized response.
// ─────────────────────────────────────────────────────────────

const CONDITIONS = {
  diabetes: {
    label: "Diabetes",
    avoid: ["sugar", "white bread", "white rice", "soda", "candy", "cake", "chips"],
    recommend: [
      { name: "Grilled chicken with vegetables", reason: "Low glycemic, high protein" },
      { name: "Lentil soup (mosh shorva)", reason: "Slow-digesting carbs, fiber-rich" },
      { name: "Greek yogurt with nuts", reason: "Stabilizes blood sugar" },
    ],
    tip: "Eat small portions every 3–4 hours instead of two large meals. This keeps blood sugar stable throughout the day.",
  },
  hypertension: {
    label: "Hypertension (High Blood Pressure)",
    avoid: ["salt", "pickles", "canned food", "sausage", "fast food", "alcohol"],
    recommend: [
      { name: "Steamed fish with herbs", reason: "Omega-3 reduces blood pressure naturally" },
      { name: "Banana and oat porridge", reason: "Potassium and fiber lower pressure" },
      { name: "Vegetable salad with olive oil", reason: "Anti-inflammatory, heart-healthy fats" },
    ],
    tip: "The DASH diet works well for hypertension: focus on fruits, vegetables, whole grains, and low-fat dairy.",
  },
  allergy_gluten: {
    label: "Gluten Allergy / Celiac",
    avoid: ["wheat bread", "pasta", "barley", "rye", "regular soy sauce", "beer"],
    recommend: [
      { name: "Rice pilaf (plov without wheat)", reason: "Naturally gluten-free Uzbek classic" },
      { name: "Corn tortilla with grilled meat", reason: "Safe grain alternative" },
      { name: "Buckwheat porridge with eggs", reason: "High protein, completely gluten-free" },
    ],
    tip: "Always check food labels for 'hidden gluten' — it appears in sauces, seasonings, and processed meats.",
  },
  weight_loss: {
    label: "Weight Loss",
    avoid: ["fried food", "sugary drinks", "white bread", "alcohol", "processed snacks"],
    recommend: [
      { name: "Grilled chicken salad", reason: "High protein keeps you full longer" },
      { name: "Vegetable soup (mastava)", reason: "Low calorie, high volume — you eat less" },
      { name: "Boiled eggs with cucumber", reason: "Perfect low-calorie snack" },
    ],
    tip: "Drink a glass of water before each meal. Studies show this reduces calorie intake by 13% at that meal.",
  },
  healthy: {
    label: "General Healthy Eating",
    avoid: [],
    recommend: [
      { name: "Samsa (baked, not fried)", reason: "Traditional, balanced meal" },
      { name: "Mixed vegetable stir-fry with beef", reason: "Complete nutrition in one dish" },
      { name: "Fresh fruit bowl with yogurt", reason: "Vitamins, probiotics, natural energy" },
    ],
    tip: "Follow the plate method: ½ vegetables, ¼ protein, ¼ whole grains. Simple and proven.",
  },
};

/**
 * Generate a fallback response based on user profile.
 * This runs entirely offline — no API needed.
 *
 * @param {object} profile - { name, condition, age, goal }
 * @returns {object} - { message, foods, tip, source }
 */
function generateFallbackResponse(profile) {
  const { name, condition = "healthy", age, goal } = profile;

  // Normalize condition key
  const key = Object.keys(CONDITIONS).find((k) =>
    condition.toLowerCase().includes(k.replace("_", " ")) ||
    condition.toLowerCase().includes(k)
  ) || "healthy";

  const data = CONDITIONS[key];

  // Build personalized intro
  let intro = `Hello${name ? `, ${name}` : ""}! `;
  if (age) {
    intro += `As someone who is ${age} years old `;
  }
  intro += `with **${data.label}**, here are my personalized food recommendations for you:`;

  // Build avoid list if relevant
  const avoidSection =
    data.avoid.length > 0
      ? `\n\n⚠️ **Foods to avoid:** ${data.avoid.join(", ")}`
      : "";

  return {
    intro,
    foods: data.recommend,
    tip: data.tip,
    avoidSection,
    source: "fallback", // tells frontend this came from local logic
  };
}

module.exports = { generateFallbackResponse, CONDITIONS };
