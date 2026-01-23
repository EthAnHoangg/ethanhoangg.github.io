# 🎯 Personal Portfolio - Van-An Hoang

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://ethanhoangg.github.io)

> An interactive personal portfolio website featuring an innovative maze-based navigation system powered by A* pathfinding algorithm. Explore my professional journey through a unique, gamified experience!

## 🌟 Features

### Interactive Maze Navigation
- **Gamified Portfolio Experience**: Navigate through an interactive maze to discover different sections of my portfolio
- **AI Pathfinding**: Toggle between manual navigation and A* algorithm-powered automatic pathfinding
- **Portal System**: Use teleportation portals for quick navigation shortcuts
- **Progress Tracking**: Real-time step counter and section discovery tracker
- **Performance Metrics**: Compare your navigation efficiency against the optimal path

### Portfolio Sections
- **About**: Background, expertise, and professional highlights
- **Experience**: Detailed work history with major projects and achievements
- **Education**: Academic credentials and scholarships
- **Skills**: Technical skills categorized by domain
- **Projects**: Featured projects with descriptions and live links
- **Blog**: Technical articles on AI, ML, and optimization
- **References**: Professional recommendations
- **Contact**: Get in touch information and social links

### Technical Highlights
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎮 **Interactive Tutorial**: Step-by-step guide for first-time visitors
- 🎨 **Modern UI/UX**: Clean design with smooth animations and transitions
- ⚡ **Performance Optimized**: Fast loading with efficient rendering
- ♿ **Accessible**: Following web accessibility best practices
- 🌐 **Cross-browser Compatible**: Works seamlessly across all modern browsers

## 🚀 Quick Start

### View Online
Visit the live portfolio: [https://ethanhoangg.github.io](https://ethanhoangg.github.io)

### Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/EthAnHoangg/personal-web.git
cd personal-web
```

2. **Open in browser**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply open index.html in your browser
open index.html
```

3. **Navigate to**
```
http://localhost:8000
```

## 📁 Project Structure

```
personal-web/
├── index.html              # Main portfolio page (traditional view)
├── maze.html              # Interactive maze navigation
├── simplexmethod.html     # Blog post on Simplex Method
├── assets/
│   ├── documents/         # CV and other documents
│   │   └── Van_An_Hoang_2026.pdf
│   └── images/           # Portfolio images and icons
│       ├── avatar.png
│       ├── favicon.png
│       └── portrait.jpeg
├── css/
│   ├── styles.css        # Main portfolio styles
│   ├── maze.css          # Maze game styles
│   └── shared.css        # Shared styles across pages
├── js/
│   ├── script.js         # Main portfolio JavaScript
│   ├── maze.js           # Maze game logic and state management
│   ├── constants.js      # Maze configuration and data
│   ├── pathfinding.js    # A* pathfinding algorithm implementation
│   ├── tutorial.js       # Interactive tutorial system
│   └── blog.js           # Blog section functionality
└── data/
    └── portfolio.json    # Structured portfolio data
```

## 🎮 Maze Navigation Guide

### Controls
- **Desktop**: 
  - Click adjacent cells to move
  - Use Arrow Keys or WASD for keyboard navigation
  - Toggle AI mode for automatic pathfinding
- **Mobile**: 
  - Tap adjacent cells to move step-by-step
  - Enable AI mode and tap anywhere to auto-navigate

### Game Features
- **8 Hotspots**: Discover all portfolio sections scattered throughout the maze
- **Portal Shortcuts**: Purple portals teleport you between connected locations
- **AI Toggle**: Switch between manual and AI-assisted navigation
- **Efficiency Score**: Track your performance against the optimal 34-step solution
- **Tutorial Mode**: Interactive guide for first-time players

### Winning the Game
1. Navigate through the maze and discover all 8 hotspots
2. Reach the golden trophy at the finish line
3. View your performance metrics and efficiency score
4. Challenge yourself to find the optimal path!

## 💻 Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations, gradients, and flexbox/grid
- **JavaScript (ES6+)**: Vanilla JS with modules for clean architecture
- **Font Awesome**: Icon library for visual elements

### Algorithms
- **A* Pathfinding**: Intelligent navigation with heuristic search
- **Graph Traversal**: Maze representation and pathfinding
- **State Management**: Game state handling and event-driven architecture

### Design
- **Responsive Design**: Mobile-first approach with breakpoints
- **CSS Variables**: Dynamic theming and consistent styling
- **CSS Animations**: Smooth transitions and interactive effects
- **Accessibility**: ARIA labels and keyboard navigation support

## 🧩 Key Components

### 1. A* Pathfinding Algorithm
```javascript
// Intelligent pathfinding with Manhattan distance heuristic
// Handles portal teleportation and obstacle avoidance
// Optimized for real-time navigation
```

### 2. Responsive Grid System
```javascript
// Dynamic cell sizing based on viewport
// Maintains aspect ratio across all devices
// Smooth scaling and positioning
```

### 3. State Management
```javascript
// Game state tracking
// Movement queue processing
// Progress persistence
```

### 4. Interactive Tutorial
```javascript
// Step-by-step onboarding
// Contextual hints and tooltips
// Progressive disclosure of features
```

## 📊 Portfolio Highlights

### Professional Experience
- **AI Research Engineer** at PIXTA (Oct 2023 - Aug 2024)
  - Deployed semantic search engine using OpenSearch and Weaviate
  - Developed automated review system with Vision-Language Models
  - Achieved 90% search result acceptance rate
  
- **Research Assistant** at DSLab, BKAI (Nov 2022 - July 2024)
  - Research on efficient training methods for diffusion models
  - Published technical blog on InstaFlow diffusion model

### Education
- **Master of Artificial Intelligence** - University of Technology Sydney (2025 - Present)
  - UTS Academic Excellence International Scholarship
- **Bachelor in Data Science & AI** - HUST (2020 - 2024)
  - GPA: 3.66/4.0, Excellent Scholarship (Top 5%)

### Technical Expertise
- **AI/ML**: PyTorch, TensorFlow, Diffusion Models, Vision-Language Models
- **MLOps**: AWS SageMaker, Docker, ClearML, CI/CD
- **Computer Vision**: Object Detection, Semantic Segmentation, Multi-modal AI
- **Search**: OpenSearch, ElasticSearch, Weaviate with vector embeddings

## 🔧 Customization

### Updating Portfolio Content
Edit `data/portfolio.json` to update:
- Personal information
- Work experience
- Education
- Skills
- Projects
- Blog posts
- References

### Modifying Maze Layout
Edit `js/constants.js` to customize:
- Maze grid dimensions
- Hotspot positions
- Portal locations
- Difficulty level
- Optimal path steps

### Styling
- `css/styles.css`: Main portfolio styling
- `css/maze.css`: Maze-specific styles
- `css/shared.css`: Common styles across pages

## 🎨 Color Scheme

```css
/* Primary Colors */
--primary-color: #2563eb      /* Blue */
--secondary-color: #10b981    /* Green */
--accent-color: #f59e0b       /* Amber */

/* Background */
--bg-dark: #0f172a           /* Navy */
--bg-light: #1e293b          /* Slate */

/* Text */
--text-color: #e2e8f0        /* Light gray */
--text-light: #94a3b8        /* Muted gray */
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

**Van-An Hoang**
- 📧 Email: [jimmyhan2610@gmail.com](mailto:jimmyhan2610@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/van-an-hoang](https://linkedin.com/in/van-an-hoang)
- 🐙 GitHub: [@EthAnHoangg](https://github.com/EthAnHoangg)
- 📱 Phone: +61 431 061 203
- 📍 Location: Sydney, NSW, Australia

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from interactive portfolio designs
- UTS for academic support

---

<div align="center">

**⭐ If you found this portfolio interesting, consider starring the repository!**

Made with ❤️ by Van-An Hoang

[View Portfolio](https://ethanhoangg.github.io) • [Download CV](assets/documents/Van_An_Hoang_2026.pdf) • [Connect on LinkedIn](https://linkedin.com/in/van-an-hoang)

</div>
