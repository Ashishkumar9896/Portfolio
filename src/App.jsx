import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, Linkedin, Mail, Phone, Moon, Sun, Download, 
  Code, Database, BarChart3, Terminal, ExternalLink, 
  GraduationCap, Award, Heart, Users, Trophy, ChevronDown,
  Cpu, Globe, FileText, Wrench, BookOpen, Sparkles, Briefcase
} from 'lucide-react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
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
      { name: 'C++', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 75 }
    ],
    dataTools: [
      { name: 'Power BI', level: 85 },
      { name: 'Pandas', level: 90 },
      { name: 'NumPy', level: 85 },
      { name: 'Matplotlib', level: 80 },
      { name: 'Seaborn', level: 75 }
    ],
    tools: [
      { name: 'Jupyter Notebook', level: 90 },
      { name: 'Google Colab', level: 85 },
      { name: 'Excel', level: 80 }
    ],
    softSkills: [
      'Problem-Solving',
      'Analytical Thinking',
      'Communication',
      'Team Collaboration',
      'Time Management'
    ]
  }

  const projects = [
    {
      title: 'Diet Recommendation & Health Analytics Dashboard',
      description: 'Built an interactive Power BI dashboard to analyze BMI, dietary habits, physical activity levels, and chronic disease patterns. Analyzed relationships between caloric intake, exercise hours, diet adherence, and nutrient imbalance to identify health risks.',
      tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
      icon: <BarChart3 size={24} />,
      github: 'https://github.com/shankarsaikrishna/DIET-RECOMMENDATION-DASHBOARD',
      color: '#f59e0b'
    },
    {
      title: 'Sales and Performance Dashboard - Clothing Store',
      description: 'Built an interactive Excel dashboard for clothing store sales analysis using PivotTables, slicers, timelines, and charts. Analyzed sales trends, profit margins, discount effectiveness, and regional performance with dynamic visualizations.',
      tech: ['Excel', 'PivotTables', 'Data Visualization', 'Dashboard Design'],
      icon: <Database size={24} />,
      github: 'https://github.com/shankarsaikrishna/INT-217-',
      color: '#10b981'
    },
    {
      title: 'Predictive Analysis of Customer Shopping Behavior',
      description: 'Built regression and classification models to predict purchase amounts and classify customers into high/low value segments. Used Decision Tree, Linear Regression, KNN, and Naive Bayes models with 80:20 train-test split for accurate predictions.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning'],
      icon: <Cpu size={24} />,
      github: 'https://github.com/shankarsaikrishna/INT234',
      color: '#10b981'
    },
    {
      title: 'Exploratory Data Analysis on Clothing Stores',
      description: 'Performed comprehensive EDA using Python to uncover sales trends, profit distribution, and category-wise performance. Created visualizations including line, bar, pie, box plots, and heatmaps for trend and correlation analysis.',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      icon: <FileText size={24} />,
      github: 'https://github.com/shankarsaikrishna/Clothing-Stores',
      color: '#10b981'
    }
  ]

  const certifications = [
    { name: 'Data Analytics Essentials', org: 'Cisco', date: 'Jan 2026', link: 'https://drive.google.com/file/d/15NvQkzmjyheomnIx7XbwrjJ-SbJe2qzt/view?usp=drive_link' },
    { name: 'Privacy and Security in Online Social Media', org: 'NPTEL', date: 'Oct 2025', link: 'https://drive.google.com/file/d/1hdF7I9FRZ5IDCAYgoHCFt9N_cWFKqAOc/view?usp=drive_link' },
    { name: 'ChatGPT-4 Prompt Engineering', org: 'Infosys', date: 'Aug 2025', link: 'https://drive.google.com/file/d/1i6b1fwQU25hWc7Z8jk9ugkmsn00TF6Ut/view?usp=drive_link' },
    { name: 'Python Database Programming', org: 'Mind Luster', date: 'Nov 2023', link: 'https://www.mindluster.com/student/certificate/12847093736' },
    { name: 'Legacy Responsive Web Design V8', org: 'FreeCodeCamp', date: 'Nov 2023', link: 'https://www.freecodecamp.org/certification/fcc198d4e0c-263e-40cf-9fc3-ef082e86e12f/responsive-web-design' }
  ]

  const activities = [
    {
      title: 'Volunteer Work',
      description: 'Undurthi Paul Foundation International - Supporting food distribution, tree plantation, and clothes distribution initiatives for underprivileged communities.',
      icon: <Heart size={20} />
    },
    {
      title: 'Hackathon Participant',
      description: 'Code-A-Haunt Hackathon organized by Code Blocks LPU',
      icon: <Trophy size={20} />,
      link: 'https://drive.google.com/file/d/1B9ojl8StHV14a1xw_DWcMyr_dQZ6_NIS/view?usp=drive_link'
    },
    {
      title: 'Problem Solving',
      description: 'Active problem solver on HackerRank platform',
      icon: <Code size={20} />
    }
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
            <span className="logo-text">SSK</span>
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
                <img src="/profile.jpg" alt="Shankar Sai Krishna Allumolu" className="profile-photo" />
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
              Shankar Sai Krishna
              <span className="highlight"> Allumolu</span>
            </motion.h1>
            
            <motion.div 
              className="title-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Cpu size={18} />
              <span>Aspiring Software Developer | Data Analyst</span>
            </motion.div>
            
            <motion.p 
              className="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Passionate about problem-solving, data analytics, and building impactful solutions
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
                href="/CV_ASSK.pdf"
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
                href="https://github.com/shankarsaikrishna" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="social-link"
              >
                <Github size={22} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/shankarsaikrishna" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="social-link"
              >
                <Linkedin size={22} />
              </motion.a>
              <motion.a 
                href="mailto:allumolushankarsaikrishna@gmail.com"
                whileHover={{ scale: 1.1, y: -3 }}
                className="social-link"
              >
                <Mail size={22} />
              </motion.a>
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
                I'm a passionate <strong>Computer Science Engineering student</strong> at Lovely Professional University, 
                currently pursuing my B.Tech degree. My journey in tech has been driven by a deep curiosity for 
                understanding how things work and a desire to create meaningful solutions.
              </p>
              <p>
                With a strong foundation in <strong>Data Structures and Algorithms</strong>, I enjoy tackling complex 
                problems and optimizing solutions. My interest in <strong>Data Analytics</strong> has led me to work 
                with various tools and technologies to extract insights from data and drive data-informed decisions.
              </p>
              <p>
                I'm constantly learning and exploring new technologies, with a particular focus on software development 
                and data science. I believe in the power of technology to transform lives and am excited to contribute 
                to innovative projects that make a difference.
              </p>
              
              <div className="about-stats">
                <div className="stat">
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
                </div>
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
                  <span>Shankar Sai Krishna</span>
                </div>
                <div className="floating-card card-1">
                  <Terminal size={16} />
                  <span>Coding</span>
                </div>
                <div className="floating-card card-2">
                  <Database size={16} />
                  <span>Data Analysis</span>
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
            {/* Programming */}
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
            
            {/* Data Tools */}
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="skill-header">
                <BarChart3 className="skill-icon" size={24} />
                <h3>Data Analytics</h3>
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
            
            {/* Tools */}
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
            
            {/* Soft Skills */}
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
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
              </motion.div>
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
                    <span className="duration">August 2023 - Present</span>
                    <span className="grade">CGPA: 6.23</span>
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
                    <span className="institution">Aditya Junior College, Bhimavaram, Andhra Pradesh</span>
                    <span className="duration">April 2021 - March 2023</span>
                    <span className="grade">Percentage: 81.2%</span>
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
                    <span className="institution">Vidya Jyothi Merit School, Ganapavaram, Andhra Pradesh</span>
                    <span className="duration">April 2020 - March 2021</span>
                    <span className="grade">Percentage: 90%</span>
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
                  <motion.a 
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                    whileHover={{ scale: 1.02 }}
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
              <motion.div
                key={activity.title}
                className="activity-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                onClick={() => activity.link && window.open(activity.link, '_blank')}
                style={{ cursor: activity.link ? 'pointer' : 'default' }}
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
            ))}
          </div>
          
          <motion.div 
            className="training-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="training-card" onClick={() => window.open('https://mail.google.com/mail/u/0/#search/cse+pathshal/FMfcgzQbgcQTkKMQSjmMTCHWbhZShWQX', '_blank')} style={{ cursor: 'pointer' }}>
              <div className="training-header">
                <Code size={24} />
                <div>
                  <h3>C++ Programming: OOPs and DSA</h3>
                  <span className="training-org">CSE Pathshala</span>
                </div>
              </div>
              <p>
                Completed 35+ hours of live summer training covering Object-Oriented Programming in C++ 
                and core Data Structures & Algorithms. Gained hands-on experience in implementing OOP 
                concepts, solving DSA problems, and applying structured programming techniques.
              </p>
              <div className="training-tech">
                <span>C++</span>
                <span>OOP</span>
                <span>DSA</span>
                <span>Algorithms</span>
                <span>STL</span>
              </div>
              <div className="training-link">
                <ExternalLink size={14} />
                <span>View Certificate</span>
              </div>
            </div>
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
              
              <div className="contact-methods">
                <motion.a 
                  href="mailto:allumolushankarsaikrishna@gmail.com"
                  className="contact-method"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="method-label">Email</span>
                    <span className="method-value">allumolushankarsaikrishna@gmail.com</span>
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
                    <span className="method-value">+91-6301833876</span>
                  </div>
                </motion.div>
                
                <motion.a 
                  href="https://github.com/shankarsaikrishna"
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
                    <span className="method-value">github.com/shankarsaikrishna</span>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com/in/shankarsaikrishna"
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
                    <span className="method-value">linkedin.com/in/shankarsaikrishna</span>
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
              <span className="footer-logo">SSK</span>
              <p>Building the future, one line of code at a time.</p>
            </div>
            
            <div className="footer-social">
              <motion.a 
                href="https://github.com/shankarsaikrishna"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/shankarsaikrishna"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="mailto:allumolushankarsaikrishna@gmail.com"
                whileHover={{ y: -3 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Shankar Sai Krishna Allumolu. All rights reserved.</p>
            <p className="footer-credit">Made with passion and code</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
