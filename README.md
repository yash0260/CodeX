<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</p>

<h1 align="center">⚡ CodeX - AI Code Analyzer</h1>

<p align="center">
  AI-driven code analyzer for quality evaluation and complexity assessment.
</p>

<p align="center">
  <a href="https://codex-liart-nine.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐 Live Demo-your--vercel--url.vercel.app-green?style=for-the-badge" />
  </a>
  &nbsp;
  <a href="https://github.com/yash0260/CodeX" target="_blank">
    <img src="https://img.shields.io/badge/📂 GitHub-yash0260/CodeX-181717?style=for-the-badge&logo=github" />
  </a>
</p>
## ✨ Features

- 🤖 **AI-Powered Analysis** — Google Gemini 1.5 AI analyzes your code instantly
- 📊 **Quality Scoring** — 0-100 score based on complexity, readability & best practices
- ⏱️ **Complexity Analysis** — Time & Space complexity with Big-O notation
- 🔍 **Algorithm Detection** — Automatically detects algorithms and patterns
- 💡 **Optimization Suggestions** — AI-powered recommendations to improve code
- 📜 **Analysis History** — Save and review all past analyses
- 🌐 **Multi-Language Support** — JavaScript, Python, C++, Java, and more
- 🔐 **Secure Authentication** — Supabase-powered login/signup
- 🌙 **Dark/Light Theme** — User preference toggle
- 🖥️ **Monaco Editor** — VS Code-like editor experience

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|-----------|-------|
| React 18 + Vite | UI Framework |
| Monaco Editor | Code Editor (VS Code) |
| Recharts | Data Visualization |
| Tailwind CSS | Styling |
| Supabase Auth | Authentication |

### Backend
| Technology | Usage |
|-----------|-------|
| Node.js + Express | Server Framework |
| MongoDB Atlas | Database |
| Google Gemini 1.5 AI | Code Analysis |
| Supabase | Authentication |

### Deployment
| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Auth | Supabase Cloud |

---
## 📁 Project Structure

```
CodeX/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page-level components
│   │   └── services/
│   │       └── api.js           # Axios API service
│   ├── .env.example
│   └── package.json
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── routes/              # Express route definitions
│   │   ├── controllers/         # Route controllers
│   │   ├── models/              # Mongoose models
│   │   └── services/
│   │       └── aiService.js     # Google Gemini AI integration
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```
---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key
- Supabase account

### 1. Clone Repository

```bash
git clone https://github.com/yash0260/CodeX.git
cd CodeX
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Add your credentials to .env
npm run dev
# Runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
cp .env.example .env
# Add your credentials to .env
npm run dev
# Runs on http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
NODE_ENV=development
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> 🔗 Get Gemini API Key: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health Check |
| `POST` | `/api/analyze` | Analyze Code |
| `GET` | `/api/history` | Get Analysis History |
| `POST` | `/api/history` | Save Analysis |
| `DELETE` | `/api/history/:id` | Delete Analysis |

### Example Request

```json
POST /api/analyze
{
  "code": "function sum(a, b) { return a + b; }",
  "language": "javascript"
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "explanation": "A simple function that adds two numbers",
    "complexity": {
      "time": "O(1) - constant time",
      "space": "O(1) - constant space",
      "qualityScore": 85
    },
    "algorithms": {
      "detected": [],
      "details": "No specific algorithm used"
    },
    "optimizations": "Code is already optimal",
    "scoreBreakdown": {
      "timeComplexity": 30,
      "spaceComplexity": 20,
      "readability": 18,
      "bestPractices": 10,
      "maintainability": 7
    }
  }
}
```

---

## 🚀 Deployment

### Backend (Render)

1. Connect GitHub repository on [render.com](https://render.com)
2. Set **Root Directory:** `server`
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `npm start`
5. Add all environment variables
6. Deploy!

### Frontend (Vercel)

1. Connect GitHub repository on [vercel.com](https://vercel.com)
2. Set **Root Directory:** `client`
3. Set **Build Command:** `npm run build`
4. Set **Output Directory:** `dist`
5. Add environment variables (use Render backend URL)
6. Deploy!

---

## 📊 Quality Score Breakdown

| Category | Max Points | Criteria |
|----------|-----------|----------|
| Time Complexity | 30 pts | O(1) = 30, O(n) = 25, O(n²) = 15 |
| Space Complexity | 20 pts | O(1) = 20, O(n) = 15, O(n²) = 10 |
| Readability | 20 pts | Variable names, indentation, comments |
| Best Practices | 15 pts | Conventions, no duplication, error handling |
| Maintainability | 15 pts | Modular, low complexity, extensible |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Yash**
- GitHub: [@yash0260](https://github.com/yash0260)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) — AI-powered code analysis
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Cloud database
- [Supabase](https://supabase.com/) — Authentication
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — Code editor
- [Vercel](https://vercel.com/) & [Render](https://render.com/) — Hosting

---

<p align="center">Made with ❤️ by Yash</p>
