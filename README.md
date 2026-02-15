# DevPortGen 🚀

**AI-Powered Portfolio Generator for Web3 Developers**

DevPortGen is a full-stack SaaS application that helps developers create professional portfolios in minutes using AI. Built with Next.js 14, Prisma, and Claude AI.

🔗 **Live Demo:** [dev-port-gen.vercel.app](https://dev-port-gen.vercel.app)

---

## ✨ Features

- 🔐 **GitHub OAuth Authentication** — Sign in with your GitHub account
- 🤖 **AI-Generated Content** — Claude AI writes your bio and project descriptions
- 📦 **GitHub Integration** — Import your repos with one click
- 🎨 **Beautiful Dark Template** — Professional Nova template with gradients
- 🚀 **Instant Publishing** — Get a live portfolio URL at `/p/your-username`
- 📱 **Fully Responsive** — Works perfectly on mobile and desktop
- 💾 **PostgreSQL Database** — Persistent storage with Neon
- 🔗 **Copy Link Feature** — Share your portfolio easily

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth.js

**AI & APIs:**
- Anthropic Claude API
- GitHub REST API

**Deployment:**
- Vercel (Frontend)
- Neon (Database)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- GitHub account
- Neon account (free)
- Anthropic API key (optional, uses mock by default)

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/YOUR-USERNAME/DevPortGen.git
   cd DevPortGen
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**

   Create a \`.env\` file:
   \`\`\`env
   DATABASE_URL="your-neon-connection-string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   ANTHROPIC_API_KEY="your-claude-api-key-or-mock"
   \`\`\`

4. **Set up database:**
   \`\`\`bash
   npx prisma db push
   npx prisma generate
   \`\`\`

5. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

\`\`\`
devportgen/
├── app/
│   ├── (auth)/login/          # Login page
│   ├── (dashboard)/           # Protected dashboard routes
│   ├── p/[slug]/              # Public portfolio pages
│   └── api/                   # API routes
├── components/
│   ├── builder/               # Multi-step form components
│   └── templates/nova/        # Portfolio template
├── lib/
│   ├── auth.ts                # NextAuth configuration
│   ├── prisma.ts              # Prisma client
│   ├── github.ts              # GitHub API helper
│   └── claude.ts              # Claude AI helper
└── prisma/
    └── schema.prisma          # Database schema
\`\`\`

---

## 🎯 Key Features Explained

### Multi-Step Builder
4-step form that collects:
1. Basic info (name, tagline, bio)
2. Projects (manual or GitHub import)
3. Skills (tag input)
4. Web3 address & social links

### AI Generation
- **Bio Generator:** Analyzes your skills and projects to write a professional bio
- **Project Descriptions:** Generates compelling descriptions from GitHub repo metadata
- **Mock Mode:** Uses intelligent mock responses (zero API cost)

### GitHub Integration
- Fetches all user repos via GitHub REST API
- Filters out forks
- Sorts by stars
- One-click import to portfolio

### Publishing System
- Portfolios start as drafts
- One-click publish/unpublish
- SEO-optimized metadata
- Shareable links

---

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy!

### Database Setup (Neon)

1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Add to Vercel env vars as \`DATABASE_URL\`

---

## 🔮 Future Improvements

- [ ] Multiple portfolio templates
- [ ] Custom domains
- [ ] Analytics dashboard
- [ ] Portfolio themes customization
- [ ] Export to PDF
- [ ] LinkedIn integration
- [ ] Image upload for projects
- [ ] SEO optimization tools



## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

## 👨‍💻 Author

**Imran Damare**
- GitHub: [@Imrexxx-OG](https://github.com/Imrexxx-OG)
- Portfolio: [dev-port-gen.vercel.app/p/imran-damare](https://dev-port-gen.vercel.app/p/imran-damare)

---

Built with ❤️ using Next.js, Prisma, and Claude AI