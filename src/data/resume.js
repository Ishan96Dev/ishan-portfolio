import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";
import projectPortfolio from "@/assets/project-portfolio.png";
import projectFinance from "@/assets/project-finance.png";
import projectRobot from "@/assets/project-robot.png";
import projectSentiment from "@/assets/project-sentiment.png";

export const resumeData = {
    name: "Ishan Chakraborty",
    title: "QA Engineer & AI/ML Testing Specialist",
    subtitle: "RAG & Agentic AI Enthusiast | Full Stack Developer",
    email: "ishanchakraborty2496@gmail.com",
    phone: "+91 7021133070",
    location: "Kolkata, West Bengal",
    social: [
        {
            name: "GitHub",
            url: "https://github.com/Ishan96Dev",
            icon: Github
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/ishan-chakraborty",
            icon: Linkedin
        },
        {
            name: "Email",
            url: "mailto:ishanchakraborty2496@gmail.com",
            icon: Mail
        }
    ],
    summary: "Results-driven QA Engineer with 3+ years of experience specializing in AI/ML testing, automation frameworks, and full-stack quality assurance. Proven expertise in testing Generative AI platforms, LLM models, RAG systems, and multi-agent AI workflows. Proficient in both frontend (Node.js, React.js) and backend (Python) testing with comprehensive knowledge of API testing, containerization, and CI/CD pipelines.",
    experience: [
        {
            company: "Katonic.ai",
            role: "QA Engineer",
            period: "January 2024 – Present",
            description: "Executed specialized testing of Large Language Models and Generative AI systems. Validated RAG system performance and tested Agentic AI workflows. Developed automation frameworks using Robot Framework with Docker. Performed extensive API and performance testing.",
            tags: ["AI/ML Testing", "Robot Framework", "Docker", "RAG", "LLM"]
        },
        {
            company: "Katonic.ai",
            role: "Data Scientist",
            period: "September 2021 – January 2024",
            description: "Led predictive analytics projects and deployed production-ready applications using Streamlit. Built Sentiment Analyzer and Mask Detection applications. Contributed to Katonic MLOps & GENAI Platform QA.",
            tags: ["Data Science", "Python", "Streamlit", "NLP", "Computer Vision"]
        },
        {
            company: "Sectona",
            role: "Test Engineer Intern",
            period: "January 2020 – March 2020",
            description: "Conducted thorough testing of security-related user interfaces. Integrated and tested UI compatibility with Linux and Windows environments.",
            tags: ["Security Testing", "Manual Testing", "UI Validation"]
        }
    ],
    education: [
        {
            degree: "Bachelor of Engineering (Electronics & Communication)",
            school: "RKDF University, Bhopal",
            year: "2019"
        },
        {
            degree: "Higher Secondary Certificate",
            school: "Lords Universal Junior College, Mumbai",
            year: "2015"
        }
    ],
    projects: [
        {
            title: "Digital Portfolio App",
            description: "A modern, interactive digital portfolio built with Streamlit featuring dual themes and AI/ML-inspired effects.",
            tech: ["Streamlit", "Python", "CSS Animations"],
            link: "https://github.com/Ishan96Dev/digital-portfolio-app",
            image: projectPortfolio
        },
        {
            title: "EA Stock Dashboard",
            description: "Interactive dashboard combining EA stock data with user behavior analysis, featuring dynamic charts and filters.",
            tech: ["Streamlit", "Data Analytics", "Visualization"],
            link: "https://github.com/Ishan96Dev/ea-stock-streamlit-dashboard",
            image: projectFinance
        },
        {
            title: "Robot Framework Action",
            description: "GitHub Action for running Robot Framework tests using Docker containerization for CI/CD pipelines.",
            tech: ["Docker", "GitHub Actions", "Robot Framework"],
            link: "https://github.com/Ishan96Dev/robotframework-github-action",
            image: projectRobot
        },
        {
            title: "Sentiment Analyzer",
            description: "NLP-based application interpreting text sentiment using natural language processing techniques.",
            tech: ["NLP", "Python", "Machine Learning"],
            link: "https://github.com/Ishan96Dev/ML-Projects",
            image: projectSentiment
        }
    ],
    skills: {
        ai_ml: ["LLM", "NLP", "RAG Systems", "Agentic AI", "Generative AI", "Robot Framework", "Selenium", "Playwright", "Postman", "Locust", "JMeter"],
        languages: [], // Merged into others as per request logic, or keeping empty if not specified
        frontend: [],
        backend: [],
        testing: [], // Merged into AI/ML or separate? User grouped them under "AI/ML & Testing"
        tools: []
    },
    // Redefining skills structure based on user request to match their specific categories
    // The user provided specific lists. I will create custom categories to match.
    customSkills: {
        "AI/ML & Testing": [
            "LLM", "NLP", "RAG Systems", "Agentic AI", "Generative AI",
            "Robot Framework", "Selenium", "Playwright", "Postman", "Locust", "JMeter"
        ],
        "Languages & Tools": [
            "Python", "Java", "JavaScript", "C#", "C++", "Docker",
            "Kubernetes", "Git", "Jenkins", "SQL", "React.js", "Node.js",
            "Streamlit", "HTML/CSS"
        ]
    },
    certifications: [
        { name: "Python Programming", issuer: "Udemy" },
        { name: "Docker & Containerization", issuer: "Udemy" },
        { name: "Google Analytics", issuer: "Basic & Advanced" }
    ],
    activities: [
        "Football", "Chess", "Game Development (Unity & C#)", "Testing Emerging Technologies", "Photography", "Video Gaming", "Video Editing", "Cooking"
    ]
}
