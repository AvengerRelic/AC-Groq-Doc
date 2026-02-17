# NexDash - AI KnowledgeBase RAG

NexDash is a modern Next.js dashboard featuring a powerful Retrieval-Augmented Generation (RAG) system called "KnowledgeBase". It allows users to upload PDF documents and interact with them using an AI chatbot powered by Groq (Llama 3) and Google Gemini (Embeddings).

## 🚀 Features

- **KnowledgeBase RAG**: Upload PDFs and chat with them.
- **AI-Powered**: Uses Groq for fast inference and Gemini `text-embedding-004` for high-quality search.
- **Authentication**: Secure login/signup via NextAuth v5.
- **Role-Based Access**: separate User and Admin dashboards.
- **Admin Management**: Approve/Reject user registrations.
- **Modern UI**: Built with Tailwind CSS, Shadcn/UI, and Framer Motion.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Neon) with `pgvector`
- **ORM**: Prisma
- **AI Models**: 
  - Chat: Groq (`llama3-8b-8192`)
  - Embeddings: Google Gemini (`text-embedding-004`)
- **Auth**: NextAuth v5 + Prisma Adapter

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AvengerRelic/AC-Groq-Doc.git
   cd AC-Groq-Doc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   # Database (PostgreSQL with pgvector)
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

   # AI API Keys
   GROQ_API_KEY="your_groq_api_key"
   GOOGLE_API_KEY="your_google_api_key"

   # Auth
   NEXTAUTH_SECRET="your_random_secret_string"
   ```

4. **Initialize Database:**
   ```bash
   npx prisma db push
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🚀 Deployment on Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository (`AC-Groq-Doc`).
4. In the **Environment Variables** section, add all keys from your `.env` file (`DATABASE_URL`, `GROQ_API_KEY`, etc.).
5. Click **Deploy**!

## 📄 License
MIT
