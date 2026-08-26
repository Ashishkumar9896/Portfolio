import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, Linkedin, Mail, Phone, Moon, Sun, Download, 
  Code, Database, BarChart3,Wifi ,Terminal, ExternalLink, 
  GraduationCap, Award, Heart, Users, Trophy, ChevronDown,
  Cpu, Globe, FileText, Wrench, BookOpen, Sparkles, Briefcase
} from 'lucide-react'
import './App.css'

// 3D and Interactive Custom Components
import ThreeDNeuralNetwork from './components/ThreeDNeuralNetwork'
import AIAssistantTerminal from './components/AIAssistantTerminal'
import ThreeDTagCloud from './components/ThreeDTagCloud'
import TiltCard from './components/TiltCard'
import CustomCursor from './components/CustomCursor'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const skills = {
    programming: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 95 },
      { name: 'C', level: 85 },
      { name: 'C++', level: 80 },
    ],
    dataTools: [
      { name: 'Pandas', level: 90 },
      { name: 'NumPy', level: 85 },
      { name: 'Matplotlib', level: 80 },
      { name: 'PostgreSQL', level: 75 }
    ],
    tools: [
      { name: 'Jupyter Notebook' },
      { name: 'Google Colab' },
      { name: 'Google Cloud Platform' },
      { name: 'Arduino IDE' },
      { name: 'VS Code' },
      { name: 'Git & GitHub' },
    ],
    softSkills: [
      'Problem-Solving',
      'Analytical Thinking',
      'Decision Making',
      'Communication',
      'Team Collaboration',
      'Adaptability'
    ]
  }

  const projects = [
    {
      title: 'Fleet Management System',
      description: 'Built a full-stack fleet management system to streamline truck, driver, trip, fuel, and maintenance operations. Implemented secure authentication, real-time updates, interactive analytics, cloud file storage, and automated PDF/Excel report generation for efficient fleet management.',
      tech: ['SQL','JavaScript','Cloud Computing','API Integration','JWT Authentication'],
      icon: <Database size={24} />,
      github: 'https://github.com/Ashishkumar9896/TruckBoss-Pro',
      color: '#3b82f6'
    },
    {
      title: 'Smart Home Automation System',
      description: 'Built an ESP32-based smart home automation system to control two LEDs and an AC lamp remotely through Arduino IoT Cloud. Integrated GPIO-controlled LEDs and a relay with Wi-Fi connectivity, enabling real-time appliance control through an IoT dashboard.',
      tech: ['ESP32', 'Arduino', 'IoT', 'Wi-Fi', 'GPIO','C++'],
      icon: <Wifi size={24} />,
      color: '#10b981'
    }
  ]

  const certifications = [
    { name: 'Introduction to Ai', org: 'Infosys', date: 'Mar 2026', link: 'https://drive.google.com/file/d/1ZeSmuq1zMEe9ocGIAh6TXpArKXsWc7lk/view?usp=sharing' },
    { name: 'C programming', org: 'iamNeo', date: 'Jan 2026', link: 'https://drive.google.com/file/d/1c4l_0lJetMSH6z65KhLvXsqQ6602CEbY/view?usp=sharing' },
    { name: 'WNS Cyber Smart', org: 'WNS', date: 'Jul 2026', link: 'https://drive.google.com/file/d/1FlSq-oWtC_akhuBkvavt3iDKe0-DKOmF/view?usp=drive_link' },
    { name: 'Time Management', org: 'Tech Veda', date: 'Nov 2025', link: 'https://drive.google.com/file/d/1Ddk1DBTjKZjFuBcnRSTqaEoNXLtiKUuE/view?usp=sharing' }
  ]

  const activities = [
    {
      title: 'Open Source Contributor',
      description: 'Actively contributing to open-source projects on GitHub, collaborating with developers worldwide, and enhancing coding skills through real-world project contributions.',
      icon: <Code size={20} />
    },
    {
      title: 'Problem Solver',
      description: 'Participating in coding challenges and competitions on platforms like LeetCode, HackerRank, and Codeforces to enhance problem-solving skills and algorithmic thinking.',
      icon: <Sparkles size={20} />
    },
    {
      title: 'Certified in Google Skillshop Courses',
      description: 'Completed various Google Skillshop courses to enhance digital marketing, analytics, and cloud computing skills, earning certifications to validate expertise.',
      icon: <Trophy size={20} />,
      link: 'https://www.skills.google/public_profiles/95015f26-bce7-4b4c-9339-5ab384e00c29'
    },
  ]

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <ThreeDNeuralNetwork />
      <CustomCursor />
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="navbar"
      >
        <div className="nav-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            <span className="logo-text">AS</span>
          </motion.div>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <motion.div 
              className="profile-photo-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="profile-photo-wrapper">
                <img src="/profile.jpeg" alt="ASHISH" className="profile-photo" />
                <div className="profile-photo-ring"></div>
              </div>
            </motion.div>

            <motion.span 
              className="greeting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ashish
            </motion.h1>
            
            <motion.div 
              className="title-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Cpu size={18} />
              <span>Building AI-Powered Tools | LPU CS Student</span>
            </motion.div>
            
            <motion.p 
              className="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Passionate about problem-solving, data analytics, and creating innovative solutions through technology.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </motion.button>
              <motion.a
                href="/CV_ASHISH.pdf"
                download
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Resume
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a 
                href="https://github.com/Ashishkumar9896" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="social-link"
              >
                <Github size={22} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/ashish-kumar-369b2536b" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="social-link"
              >
                <Linkedin size={22} />
              </motion.a>
              <motion.a 
                href="mailto:ashishkumarjha9896@gmail.com"
                whileHover={{ scale: 1.1, y: -3 }}
                className="social-link"
              >
                <Mail size={22} />
              </motion.a>
            </motion.div>

            {/* Hero Credentials Stats Strip */}
            <motion.div 
              className="hero-stats-strip"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <div className="hero-stat-card">
                <span className="stat-num">9.24</span>
                <span className="stat-lbl">CGPA (LPU)</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">B.Tech</span>
                <span className="stat-lbl">CSE Student</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">IoT & Web</span>
                <span className="stat-lbl">Focus Areas</span>
              </div>
            </motion.div>

            {/* Quick Category Navigation */}
            <motion.div 
              className="category-nav"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="category-nav-label">Quick Navigate</span>
              <div className="category-icons">
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('about')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  title="About Me"
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                    <Users size={20} />
                  </div>
                  <span>About Me</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('skills')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Skills"
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}>
                    <Code size={20} />
                  </div>
                  <span>Skills</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('skills')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Tools"
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}>
                    <Wrench size={20} />
                  </div>
                  <span>Tools</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('projects')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Projects"
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' }}>
                    <Briefcase size={20} />
                  </div>
                  <span>Projects</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('education')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Education"
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }}>
                    <GraduationCap size={20} />
                  </div>
                  <span>Education</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('education')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Certifications"
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}>
                    <Award size={20} />
                  </div>
                  <span>Certifications</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('experience')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' }}>
                    <Sparkles size={20} />
                  </div>
                  <span>Experience</span>
                </motion.button>
                
                <motion.button 
                  className="category-item"
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="category-icon" style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)' }}>
                    <Mail size={20} />
                  </div>
                  <span>Contact</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive AI Assistant Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-terminal"
          >
            <AIAssistantTerminal />
          </motion.div>
        </div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-tag">About Me</span>
            <h2>Let me introduce myself</h2>
          </motion.div>
          
          <div className="about-content">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                I’m a <strong>Computer Science Engineering</strong> student at Lovely Professional University, 
                pursuing my B.Tech with a strong interest in Artificial Intelligence and Machine Learning.
                 My journey in technology is driven by curiosity, continuous learning, and a desire to understand how intelligent systems can solve real-world problems.
              </p>
              <p>
                I have built a strong foundation in <strong>Data Structures and Algorithms</strong>, 
                which has strengthened my problem-solving, logical reasoning, and ability 
                to develop efficient solutions. 
                Alongside core computer science concepts, 
                I’m actively exploring <strong>Python</strong>, <strong>Artificial Intelligence</strong>, and <strong>Machine Learning</strong>, with a keen interest in understanding how data, algorithms, and intelligent models come together to create impactful applications.
              </p>
              <p>
               I’m continuously expanding my technical expertise through hands-on learning,
                problem-solving, and project development. 
                I aspire to grow as a versatile software engineer with a specialization in AI and ML, 
                while contributing to innovative projects that transform ideas into practical, intelligent solutions.
              </p>
              
                <div className="stat">
              {/* <div className="about-stats">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years of Learning</span>
                </div>
                <div className="stat">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Certifications</span>
                </div> */}
              </div>
            </motion.div> 
            
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="image-card">
                <div className="image-placeholder">
                  <Code size={48} />
                  <span>Ashish</span>
                </div>
                <div className="floating-card card-1">
                  <Terminal size={16} />
                  <span>Coding</span>
                </div>
                <div className="floating-card card-2">
                  <Database size={16} />
                  <span>AI & ML</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-tag">My Skills</span>
            <h2>Technologies I work with</h2>
          </motion.div>
          
          <div className="skills-grid">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {/* Programming */}
              <TiltCard>
                <motion.div 
                  className="skill-category"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ height: '100%' }}
                >
                  <div className="skill-header">
                    <Code className="skill-icon" size={24} />
                    <h3>Programming Languages</h3>
                  </div>
                  <div className="skill-list">
                    {skills.programming.map((skill, index) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percent">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div 
                            className="skill-progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
              
              {/* Data Tools */}
              <TiltCard>
                <motion.div 
                  className="skill-category"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <div className="skill-header">
                    <BarChart3 className="skill-icon" size={24} />
                    <h3>Data Tools</h3>
                  </div>
                  <div className="skill-list">
                    {skills.dataTools.map((skill, index) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percent">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div 
                            className="skill-progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
              
              {/* Tools */}
              <TiltCard>
                <motion.div 
                  className="skill-category"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ height: '100%' }}
                >
                  <div className="skill-header">
                    <Terminal className="skill-icon" size={24} />
                    <h3>Tools & Platforms</h3>
                  </div>
                  <div className="skill-tags">
                    {skills.tools.map((skill) => (
                      <motion.span 
                        key={skill.name}
                        className="skill-tag"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
              
              {/* Soft Skills */}
              <TiltCard>
                <motion.div 
                  className="skill-category"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ height: '100%' }}
                >
                  <div className="skill-header">
                    <Users className="skill-icon" size={24} />
                    <h3>Soft Skills</h3>
                  </div>
                  <div className="skill-tags">
                    {skills.softSkills.map((skill) => (
                      <motion.span 
                        key={skill}
                        className="skill-tag soft"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            </div>

            <div className="skills-globe-column">
              <ThreeDTagCloud />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-tag">Featured Work</span>
            <h2>Projects I've built</h2>
          </motion.div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <TiltCard key={project.title}>
                <motion.div
                  className="project-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="project-icon" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                    {project.icon}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {project.github && (
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ x: 5 }}
                    >
                      <Github size={16} />
                      View on GitHub
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section education-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-tag">Education</span>
            <h2>My academic journey</h2>
          </motion.div>
          
          <div className="education-content">
            <div className="education-timeline">
              <motion.div 
                className="education-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="education-marker"></div>
                <div className="education-card">
                  <div className="education-icon">
                    <GraduationCap size={24} />
                  </div>
                  <div className="education-info">
                    <h3>Bachelor of Technology - Computer Science and Engineering</h3>
                    <span className="institution">Lovely Professional University, Punjab</span>
                    <span className="duration">August 2025 - Present</span>
                    <span className="grade">CGPA: 9.24</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="education-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="education-marker"></div>
                <div className="education-card">
                  <div className="education-icon secondary">
                    <FileText size={24} />
                  </div>
                  <div className="education-info">
                    <h3>Intermediate (Class 12)</h3>
                    <span className="institution">DAV Multipurpose PUB SCH ,Sonipat,Haryana</span>
                    <span className="grade">Percentage: 84.6%</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="education-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="education-marker"></div>
                <div className="education-card">
                  <div className="education-icon secondary">
                    <Award size={24} />
                  </div>
                  <div className="education-info">
                    <h3>Matriculation (Class 10)</h3>
                    <span className="institution">DAV Multipurpose PUB SCH ,Sonipat,Haryana</span>
                    {/*<span className="duration">April 2020 - March 2021</span>*/}
                    <span className="grade">Percentage: 88%</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Certifications */}
            <motion.div 
              className="certifications-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="cert-title">
                <Award size={20} />
                Certifications
              </h3>
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <TiltCard key={cert.name}>
                    <motion.a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      style={{ display: 'block', height: '100%' }}
                    >
                      <div className="cert-header">
                        <Award size={16} />
                        <span className="cert-org">{cert.org}</span>
                      </div>
                      <h4>{cert.name}</h4>
                      <span className="cert-date">{cert.date}</span>
                      <div className="cert-link">
                        <ExternalLink size={12} />
                        <span>View Certificate</span>
                      </div>
                    </motion.a>
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience/Activities Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-tag">Experience & Activities</span>
            <h2>Beyond academics</h2>
          </motion.div>
          
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <TiltCard key={activity.title}>
                <motion.div
                  className="activity-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onClick={() => activity.link && window.open(activity.link, '_blank')}
                  style={{ cursor: activity.link ? 'pointer' : 'default', height: '100%' }}
                >
                  <div className="activity-icon">
                    {activity.icon}
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  {activity.link && (
                    <div className="activity-link">
                      <ExternalLink size={12} />
                      <span>View Certificate</span>
                    </div>
                  )}
                </motion.div>
              </TiltCard>
            ))}
          </div>
          
          <motion.div 
            className="training-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TiltCard>
              <div className="training-card" onClick={() => window.open('https://truckboss-pro.onrender.com/', '_blank')} style={{ cursor: 'pointer' }}>
                <div className="training-header">
                  <Code size={24} />
                  <div>
                    <h3>Real-World Software Development</h3>
                    <span className="website">Fleet Management System — Bihal Suppliers</span>
                  </div>
                </div>
                <p>
                 Developed and deployed a production-oriented fleet management system for Bihal Suppliers, streamlining the management of trucks, drivers, customers, trips, fuel records, revenue, and vehicle maintenance. Engineered the application using Node.js, Express.js, MySQL, Socket.IO, Cloudinary, and JavaScript, gaining hands-on experience in translating real-world business requirements into a scalable software solution.
                </p>
                <div className="training-tech">
                  <span>MySQL</span>
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>Socket.IO</span>
                  <span>Cloudinary</span>
                </div>
                <div className="training-link">
                  <ExternalLink size={14} />
                  <span>View Project</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-tag">Get In Touch</span>
            <h2>Let's work together</h2>
          </motion.div>
          
          <div className="contact-content">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="contact-text">
                I'm currently open to new opportunities, internships, and collaborations. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              {/* Contact Form */}
              <motion.form 
                className="contact-form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                action="https://formsubmit.co/ashishkumarjha9896@gmail.com"
                method="POST"
              >
                <h3>Send Me a Message</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    rows="4" 
                    required 
                    className="form-input form-textarea"
                  ></textarea>
                </div>
                <input type="hidden" name="_subject" value="New message from Portfolio!" />
                <input type="hidden" name="_captcha" value="false" />
                <motion.button 
                  type="submit"
                  className="btn btn-primary btn-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={18} />
                  Send Message
                </motion.button>
              </motion.form>
              
              <div className="contact-methods">
                <motion.a 
                  href="mailto:ashishkumarjha9896@gmail.com"
                  className="contact-method"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="method-label">Email</span>
                    <span className="method-value">ashishkumarjha9896@gmail.com</span>
                  </div>
                </motion.a>
                
                <motion.div 
                  className="contact-method"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="method-label">Phone</span>
                    <span className="method-value">+91-9896810805</span>
                  </div>
                </motion.div>
                
                <motion.a 
                  href="https://github.com/Ashishkumar9896"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <Github size={20} />
                  </div>
                  <div>
                    <span className="method-label">GitHub</span>
                    <span className="method-value">github.com/Ashishkumar9896</span>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://www.linkedin.com/in/ashish-kumar-369b2536b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <span className="method-label">LinkedIn</span>
                    <span className="method-value">linkedin.com/in/ashish-kumar-369b2536b</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
            

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">AS</span>
              <p>Building the future, one line of code at a time.</p>
            </div>
            
            <div className="footer-social">
              <motion.a 
                href="https://github.com/Ashishkumar9896"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/ashish-kumar-369b2536b/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="mailto:ashishkumarjha9896@gmail.com"
                whileHover={{ y: -3 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ashish. All rights reserved.</p>
            <p className="footer-credit">Made with passion and code</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
