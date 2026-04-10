# For_Hogwarts
# 🥗 Nutri: AI-Powered Personalized Nutrition Platform
## 🌟 Overview
### Nutri is an innovative, AI-driven platform designed to personalize the dining and food-ordering experience. By leveraging the power of Large Language Models (LLMs), Nutri analyzes a user’s health profile—such as diabetes, hypertension, or allergies—to recommend safe, nutritious, and delicious meal options.

#### Mission: To empower individuals with dietary restrictions to make safe and healthy food choices with the help of Artificial Intelligence.

## 🛠 Technical Stack
The platform is built using a modern, scalable full-stack architecture:

Frontend: Next.js 14 (App Router) for high-performance rendering.

Styling: Tailwind CSS for a responsive and aesthetic UI.

AI Engine: Groq SDK featuring the Llama-3-70b model for real-time nutritional analysis.

Backend: Node.js via Next.js API Routes for secure server-side logic.

## 🚀 Getting Started
Follow these steps to set up the project locally:

1️⃣ Clone the Repository
Bash
git clone https://github.com/your-username/nutri.git
cd nutri
2️⃣ Install Dependencies
Bash
npm install or
yarn install
3️⃣ Configure Environment Variables
Create a .env.local file in the root directory and add your Groq API key:

Code snippet
GROQ_API_KEY=your_actual_api_key_here
Note: For security reasons, the .env file is excluded from version control.

4️⃣ Run the Development Server
Bash
npm run dev
Open http://localhost:3000 in your browser to see the result.

## 🛡 Security & API Protection
Security is a core priority in Nutri:

Server-Side Logic: All AI-related API calls are executed on the server-side to prevent the exposure of API keys in the client’s browser.

Environment Protection: Sensitive data is managed through environment variables, ensuring that credentials remain private.

## 📄 Documentation
For a deep dive into the project's architecture, LLM workflows, and technical challenges, please refer to the 7. Conclusion (1).pdf file included in this repository.
