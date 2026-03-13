# Portfolio - Félix Mielcarek

My personal portfolio website showcasing projects, built with Bootstrap 5 and GitHub API integration.

## ✨ Features

- **Responsive Design**: Silver, pink, and chrome aesthetic with glass morphism effects
- **GitHub Integration**: Projects automatically fetched from GitHub repositories
- **Smart Categorization**: Projects organized by development stage (Production, Development, Backlog, University)
- **Modern UI**: Monsieur La Doulaise font for titles, minimalist carousel navigation
- **Client-Side Only**: No backend required, 100% static site

## 🗂️ Project Structure

```
root/
├── index.html                  # Homepage
├── assets/
│   ├── css/
│   │   ├── common.css         # Global styles
│   │   ├── home.css           # Homepage styles
│   │   └── projects.css       # Projects page styles
│   └── js/
│       └── carousel.js        # GitHub API integration
├── pages/
│   └── projects/
│       └── index.html         # Projects showcase page
├── docs/
│   └── SETUP.md              # User guide for tagging GitHub repos
├── fel/                       # Other projects
├── LICENSE
└── README.md                  # This file
```

## 🚀 Setup

1. **Tag Your GitHub Repositories**
   - Add topics to categorize projects: `portfelio-prod`, `portfelio-dev`, `portfelio-backlog`, `portfelio-uni`
   - See [docs/SETUP.md](docs/SETUP.md) for detailed instructions

2. **Update Username**
   - In `assets/js/carousel.js`, change `GITHUB_USERNAME` to your GitHub username

3. **Deploy**
   - Push to GitHub Pages or any static hosting service

## 🎨 Design System

- **Colors**: Silver (#c0c0c0), Pink (#ffc0cb, #ff69b4), Chrome gradients
- **Typography**: Monsieur La Doulaise (titles), Montserrat (body)
- **Effects**: Glass morphism, pink glow on hover, smooth transitions

## 📚 Documentation

- [GitHub Setup Guide](docs/SETUP.md) - How to tag repositories and configure the portfolio
- [Figma Roadmap](https://www.figma.com/board/3e1bdz0uogVl3Pql49cHFy/Portfelio?node-id=1-70&t=XSTc918sXK7byMcH-1) - Design and development roadmap

## 🛠️ Technologies

- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.0
- GitHub REST API
- LocalStorage for caching

## 📄 License

See [LICENSE](LICENSE) file for details.
