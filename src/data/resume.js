import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";
import projectPortfolio from "@/assets/project-portfolio.webp";
import projectFinance from "@/assets/project-finance.webp";
import projectRobot from "@/assets/project-robot.webp";
import projectSentiment from "@/assets/project-sentiment.webp";
import projectSentimentScope from "@/assets/project-sentimentscope.webp";
import projectDocForge from "@/assets/project-docforge.webp";
import projectAISentiment from "@/assets/project-ai-sentiment.webp";
import projectDocumentRAG from "@/assets/project-document-rag.webp";
import projectMcpImageGen from "@/assets/project-mcp-image-gen.webp";
import projectYesBill from "@/assets/project-yesbill.webp";
import projectHeliosConnect from "@/assets/project-heliosconnect.webp";
import katonicLogo from "@/assets/logos/katonic-logo.png";
import sectonaLogo from "@/assets/logos/sectona-logo.png";
import mseiLogo from "@/assets/logos/msei-logo.svg";

export const resumeData = {
    name: "Ishan Chakraborty",
    title: "QA Engineer & AI/ML Developer | Python Backend Developer",
    subtitle: "AI/ML Testing Specialist | RAG & Agentic AI Enthusiast | Full Stack Developer",
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
            url: "https://www.linkedin.com/in/ishan-chakraborty-0085571a1",
            icon: Linkedin
        },
        {
            name: "Email",
            url: "mailto:ishanchakraborty2496@gmail.com",
            icon: Mail
        }
    ],
    summary: "Results-driven QA Engineer, AI/ML Developer & Python Backend Developer with 4+ years of experience. Specialized in building and testing AI/ML systems — from developing RAG pipelines, Agentic AI workflows, and NLP applications to validating LLM models and Generative AI platforms. Hands-on expertise across all major AI providers: OpenAI (GPT, DALL-E, Whisper, TTS), Google Gemini (Pro, Flash, Embedding), and Anthropic Claude. Skilled in embedding models, RAG architectures, Text-to-Speech, Speech-to-Text, and image generation models. Proficient in Python backend development (FastAPI, Flask), frontend technologies (React.js, Next.js), and CI/CD pipelines.",
    experience: [
        {
            company: "Metropolitan Stock Exchange of India (MSEI)",
            logo: mseiLogo,
            role: "Freelance Python Backend Developer",
            period: "April 2026 – Present",
            description: "Architected a robust Python backend service with REST API endpoints for real-time stock market ticker data including SX40 Index, Forex rates, and financial instrument pricing. Integrated the API with a Next.js website and developed an animated LED Ticker UI. Engineered real-time financial data pipelines for equity, currency derivatives, and debt market segments.",
            tags: ["Python", "FastAPI", "REST API", "Next.js", "Real-time Data", "FinTech", "Stock Market"]
        },
        {
            company: "Katonic.ai",
            logo: katonicLogo,
            role: "QA Engineer",
            period: "January 2024 – December 2025",
            description: "Executed specialized testing of Large Language Models and Generative AI systems. Validated RAG system performance and tested Agentic AI workflows. Developed automation frameworks using Robot Framework with Docker. Performed extensive API and performance testing using Postman, Locust, and JMeter.",
            tags: ["AI/ML Testing", "Robot Framework", "Docker", "RAG", "LLM", "API Testing"]
        },
        {
            company: "Katonic.ai",
            logo: katonicLogo,
            role: "Data Scientist",
            period: "September 2021 – January 2024",
            description: "Led predictive analytics projects and deployed production-ready ML applications using Streamlit. Built Sentiment Analyzer and Mask Detection applications. Contributed to Katonic MLOps & GENAI Platform QA. Developed NLP models and computer vision solutions for real-world business problems.",
            tags: ["Data Science", "Python", "Streamlit", "NLP", "Computer Vision", "MLOps"]
        },
        {
            company: "Sectona",
            logo: sectonaLogo,
            role: "Test Engineer Intern",
            period: "January 2020 – March 2020",
            description: "Conducted thorough testing of security-related user interfaces for Privileged Access Management (PAM) software. Integrated and tested UI compatibility across Linux and Windows environments. Documented test cases and reported defects using bug tracking tools.",
            tags: ["Security Testing", "Manual Testing", "UI Validation", "PAM"]
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
            title: "MCP OpenAI Image Generator",
            description: "A secure MCP (Model Context Protocol) server for generating images using OpenAI GPT Image models. Integrates with Claude Code, Cursor, VS Code & GitHub Copilot. Features rate limiting, API key validation, automatic workspace image saving, and production-ready deployment on Render.",
            tech: ["Python", "MCP", "OpenAI API", "DALL-E 3", "Docker", "Render"],
            link: "https://github.com/Ishan96Dev/mcp-openai-image-generator",
            image: projectMcpImageGen
        },
        {
            title: "YesBill – AI Billing Tracker",
            description: "Full-stack AI-powered household service billing tracker. Mark YES/NO deliveries, auto-calculate monthly bills, export PDF invoices, and get AI-generated summaries. Built with React, FastAPI, Supabase & GPT — supports OpenAI, Anthropic, and Google AI.",
            tech: ["React", "FastAPI", "Supabase", "PostgreSQL", "OpenAI GPT", "Python"],
            link: "https://github.com/Ishan96Dev/YesBill",
            image: projectYesBill
        },
        {
            title: "SentimentScope NLP Analyzer",
            description: "AI-powered sentiment analysis web app built with Streamlit & TextBlob NLP. Real-time emotion detection with confidence scoring, security features, and professional UI.",
            tech: ["Streamlit", "TextBlob", "NLP", "Python"],
            link: "https://github.com/Ishan96Dev/SentimentScope-NLP-Sentiment-Analysis-App",
            image: projectSentimentScope
        },
        {
            title: "DocForge Web-to-PDF",
            description: "Open-source intelligent web-to-PDF converter. Transform entire websites into professional PDF documents with smart crawling, sitemap detection, and beautiful formatting.",
            tech: ["React", "FastAPI", "TypeScript", "Python"],
            link: "https://github.com/Ishan96Dev/DocForge",
            image: projectDocForge
        },
        {
            title: "AI Sentiment Analyzer",
            description: "Advanced AI sentiment analysis with OpenAI GPT-4/GPT-5. Features real-time validation, reasoning transparency, 4-type classification, and confidence metrics.",
            tech: ["OpenAI API", "Streamlit", "Python", "GPT-4"],
            link: "https://github.com/Ishan96Dev/AI-Sentiment-Analyzer",
            image: projectAISentiment
        },
        {
            title: "Document Knowledge Retrieval",
            description: "A RAG-powered document analysis tool using OpenAI, CrewAI, and Milvus for intelligent document querying and knowledge extraction from large document corpora.",
            tech: ["RAG", "OpenAI", "CrewAI", "Milvus", "Python"],
            link: "https://github.com/Ishan96Dev/document-knowledge-retrieval",
            image: projectDocumentRAG
        },
        {
            title: "HeliosConnect – AI Networking Agent",
            description: "AI-powered LinkedIn networking agent that automates intelligent connection requests and personalized outreach messages using GPT-4, driving professional network growth.",
            tech: ["Python", "GPT-4", "LinkedIn API", "Agentic AI"],
            link: "https://github.com/Ishan96Dev",
            image: projectHeliosConnect
        },
        {
            title: "Robot Framework GitHub Action",
            description: "GitHub Action for running Robot Framework tests using Docker containerization for seamless CI/CD pipeline integration and automated test reporting.",
            tech: ["Docker", "GitHub Actions", "Robot Framework", "CI/CD"],
            link: "https://github.com/Ishan96Dev/robotframework-github-action",
            image: projectRobot
        },
        {
            title: "EA Stock Dashboard",
            description: "Interactive dashboard combining EA stock data with user behavior analysis, featuring dynamic charts and filters powered by Streamlit and data analytics.",
            tech: ["Streamlit", "Data Analytics", "Python", "Visualization"],
            link: "https://github.com/Ishan96Dev/ea-stock-streamlit-dashboard",
            image: projectFinance
        },
        {
            title: "Digital Portfolio App",
            description: "A modern, interactive digital portfolio built with Streamlit featuring dual themes, AI/ML-inspired visual effects, and dynamic project showcasing.",
            tech: ["Streamlit", "Python", "CSS Animations"],
            link: "https://github.com/Ishan96Dev/digital-portfolio-app",
            image: projectPortfolio
        },
        {
            title: "Sentiment Analyzer (ML)",
            description: "NLP-based machine learning application for interpreting text sentiment, leveraging natural language processing and supervised learning techniques.",
            tech: ["NLP", "Python", "Machine Learning", "scikit-learn"],
            link: "https://github.com/Ishan96Dev/ML-Projects",
            image: projectSentiment
        }
    ],
    skills: {
        ai_ml: ["LLM", "NLP", "RAG Systems", "Agentic AI", "Generative AI", "Robot Framework", "Selenium", "Playwright", "Postman", "Locust", "JMeter"],
        languages: [],
        frontend: [],
        backend: [],
        testing: [],
        tools: []
    },
    customSkills: {
        "AI/ML Development": [
            "LLM (GPT, Gemini, Claude)", "RAG Systems", "Agentic AI", "Generative AI", "NLP",
            "OpenAI API", "Google Gemini API", "Anthropic Claude API",
            "Embedding Models", "Image Generation (DALL-E, Imagen)",
            "Text-to-Speech (TTS)", "Speech-to-Text (STT / Whisper)",
            "LangChain", "LlamaIndex", "CrewAI", "HuggingFace",
            "Milvus", "ChromaDB", "scikit-learn", "Streamlit"
        ],
        "QA & Testing": [
            "Robot Framework", "Selenium", "Playwright",
            "Postman", "Locust", "JMeter", "API Testing", "Performance Testing"
        ],
        "Languages & Tools": [
            "Python", "JavaScript", "Java", "C#", "React.js", "Next.js",
            "FastAPI", "Flask", "Docker", "Kubernetes", "Git", "SQL", "HTML/CSS"
        ]
    },
    certifications: [
        { name: "Python Programming", issuer: "Udemy" },
        { name: "Docker & Containerization", issuer: "Udemy" },
        { name: "Google Analytics", issuer: "Basic & Advanced" }
    ],
    activities: [
        "Football", "Chess", "Game Development (Unity & C#)", "Testing Emerging AI Technologies",
        "Photography", "Video Gaming", "Video Editing", "Cooking"
    ]
}
