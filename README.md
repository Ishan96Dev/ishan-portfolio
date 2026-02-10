# 🚀 Ishan Chakraborty - Portfolio

![Build Status](https://github.com/Ishan96Dev/ishan-portfolio/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

> 🌐 **Live Site**: [ishan96dev.github.io/ishan-portfolio](https://ishan96dev.github.io/ishan-portfolio/)

Official portfolio of Ishan Chakraborty - QA Engineer & AI/ML Specialist. Showcasing expertise in AI/ML testing, automation frameworks, and modern web development.

![Portfolio Demo](./public/portfolio-demo.webp)

## ✨ Features

*   **Cinematic Dark Mode**: Premium dark theme with glassmorphism and subtle grain effects
*   **Custom Scrollbar**: Themed gradient scrollbar with smooth teal-to-cyan design
*   **Tubelight Navbar**: Floating, glowing navigation bar with active state animations
*   **Interactive Hero**: Text scramble effects and sparkling text animations
*   **Bento Grid Projects**: 8 featured projects with custom-generated thumbnails and hover effects
*   **Experience Timeline**: Vertical timeline with company logos, glowing pulse animations, and smooth scroll effects
*   **Working Contact Form**: Functional contact form with validation and email integration
*   **Animated Skills**: Hover-interactive skill badges grouped by AI/ML & Testing categories
*   **Professional Branding**: Real company logos for Katonic.ai and Sectona
*   **Performance**: Optimized with Vite for lightning-fast HMR and build times

## 🆕 Recent Updates

*   ✅ Added 4 new projects from GitHub repositories with AI-generated thumbnails
*   ✅ Updated LinkedIn profile link
*   ✅ Integrated company logos (Katonic.ai, Sectona)
*   ✅ Enhanced experience timeline with scroll animations and professional branding
*   ✅ Implemented working contact form with validation
*   ✅ Added custom themed scrollbar with gradient effects
*   ✅ Made footer contact details clickable (email, phone)
*   ✅ Optimized animations for better performance

## 🛠️ Tech Stack

*   **Core**: React 19, Vite 5.x
*   **Styling**: Tailwind CSS v3, `clsx`, `tailwind-merge`
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Deployment**: GitHub Pages
*   **Build Tool**: Vite with SWC for fast compilation

## 📂 Project Structure

```
ishan-portfolio/
├── public/              # Static assets (favicons, images)
├── src/
│   ├── assets/          # Project images and global assets
│   │   ├── logos/       # Company logos (Katonic.ai, Sectona)
│   │   └── *.png        # Project thumbnails and profile images
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Generic UI primitives (BentoGrid, Navbar, Footer, etc.)
│   │   ├── hero-section.jsx
│   │   ├── experience-section.jsx
│   │   ├── projects-section.jsx
│   │   ├── contact-section.jsx
│   │   └── ...          # Other section components
│   ├── data/            # Static data content (resume.js)
│   ├── lib/             # Utility functions (utils.js)
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles and custom scrollbar
│   └── main.jsx         # Entry point
├── .github/
│   └── workflows/       # GitHub Actions for deployment
├── .gitignore           # Git ignore rules
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md            # Project documentation
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ishan96Dev/ishan-portfolio.git
    cd ishan-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Deployment

This project is configured for deployment to **GitHub Pages**.

1.  **Update Configuration:**
    *   Open `vite.config.js` and ensure the `base` property matches your repository name (e.g., `/ishan-portfolio/`).
    *   Open `package.json` and update the `homepage` URL.

2.  **Deploy:**
    ```bash
    npm run deploy
    ```
    This command will build the project and push the `dist` folder to the `gh-pages` branch.

## 📝 Customization

### Update Content
*   **Personal Info**: Edit `src/data/resume.js` to update name, title, contact details
*   **Experience**: Add/modify work experience with company logos in `resume.js`
*   **Projects**: Update projects array with new GitHub repositories
*   **Skills**: Customize skill categories and technologies

### Add Assets
*   **Project Images**: Place in `src/assets/` (PNG format recommended)
*   **Company Logos**: Add to `src/assets/logos/` for experience section
*   **Profile Image**: Replace `src/assets/profile.jpg`

### Modify Styles
*   **Global Styles**: Edit `src/index.css` for scrollbar, fonts, utilities
*   **Theme Colors**: Update CSS variables in `src/index.css` (`:root` section)
*   **Tailwind Config**: Modify `tailwind.config.js` for theme extensions

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Ishan96Dev/ishan-portfolio/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Email**: ishanchakraborty2496@gmail.com
- **LinkedIn**: [Ishan Chakraborty](https://www.linkedin.com/in/ishan-chakraborty-0085571a1)
- **GitHub**: [@Ishan96Dev](https://github.com/Ishan96Dev)

---

**Built with ❤️ by [Ishan Chakraborty](https://github.com/Ishan96Dev)**
