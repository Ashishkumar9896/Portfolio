import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, Linkedin, Mail, Phone, Moon, Sun, Download,
  Code, Database, Wifi, Terminal, ExternalLink,
  GraduationCap, Award, Users, ChevronDown,
  Cpu, Globe, FileText, Wrench, BookOpen, Sparkles, Briefcase,
  CheckCircle2, MapPin, Layers, ArrowUpRight
} from 'lucide-react'
import './App.css'

// Custom Professional Components
import SkillsMatrix from './components/SkillsMatrix'
import TiltCard from './components/TiltCard'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'experience', 'contact']
      const scrollPosition = window.scrollY + 120

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

  const projects = [
    {
      title: 'TruckBoss-Pro — Fleet Management System',
      subtitle: 'Real-World Client Project Deployed for Bihal Suppliers',
      badge: '★ INDUSTRY DEPLOYED SYSTEM',
      description: 'Developed and deployed an end-to-end enterprise fleet management platform for Bihal Suppliers. Centralizes truck tracking, driver trip assignments, fuel consumption logs, and maintenance scheduling.',
      features: [
        'Role-Based Driver & Admin Access with JWT Authentication',
        'Real-Time Live Driver Trip Assignment & Operational Tracking',
        'MySQL Relational Database Schema & Node.js REST API Backend',
        'Socket.IO Event Synchronization & Cloudinary Media Management'
      ],
      tech: ['Node.js', 'Express.js', 'MySQL', 'JavaScript (ES6+)', 'Socket.IO', 'Cloudinary', 'JWT Auth'],
      icon: <Database size={24} />,
      github: 'https://github.com/Ashishkumar9896/TruckBoss-Pro',
      color: '#3b82f6',
      featured: true
    },
    {
      title: 'IoT Smart Home Automation Controller',
      subtitle: 'Hardware & Microcontroller Embedded Firmware',
      description: 'Built an ESP32-powered home automation controller enabling remote wireless control of relays and high-voltage AC appliances via Arduino IoT Cloud infrastructure.',
      features: [
        'ESP32 Wi-Fi & GPIO Microcontroller Integration',
        'C++ Firmware Programming with Arduino IDE',
        'Arduino IoT Cloud Mobile & Web Controls'
      ],
      tech: ['C++', 'ESP32', 'Arduino IoT Cloud', 'Wi-Fi Protocols', 'GPIO & Relay Modules'],
      icon: <Wifi size={24} />,
      color: '#10b981'
    },
    {
      title: 'Engineering Technical Blog & Web Platform',
      subtitle: 'Semantic Web Architecture & Layout Engineering',
      description: 'Crafted a fast, highly accessible web platform showcasing responsive CSS grid layouts, semantic HTML5 structure, and cross-browser theme adaptations.',
      features: [
        'Semantic HTML5 & Accessible CSS Layouts',
        'Custom Dark/Light Contrast Themes',
        'Fully Mobile & Desktop Responsive Design'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive Web Design'],
      icon: <Globe size={24} />,
      color: '#6366f1'
    }
  ]

  const certifications = [
    { name: 'Introduction to AI', org: 'Infosys Springboard', date: 'Mar 2026', link: 'https://drive.google.com/file/d/1ZeSmuq1zMEe9ocGIAh6TXpArKXsWc7lk/view?usp=sharing' },
    { name: 'C Programming Mastery', org: 'iamNeo', date: 'Jan 2026', link: 'https://drive.google.com/file/d/1c4l_0lJetMSH6z65KhLvXsqQ6602CEbY/view?usp=sharing' },
    { name: 'WNS Cyber Smart Security', org: 'WNS Global', date: 'Jul 2026', link: 'https://drive.google.com/file/d/1FlSq-oWtC_akhuBkvavt3iDKe0-DKOmF/view?usp=drive_link' },
    { name: 'Time Management & Productivity', org: 'Tech Veda', date: 'Nov 2025', link: 'https://drive.google.com/file/d/1Ddk1DBTjKZjFuBcnRSTqaEoNXLtiKUuE/view?usp=sharing' }
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
    <div className={`app ${darkMode ? '' : 'light'}`}>
      {/* Executive Navigation Bar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="navbar"
      >
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <span className="logo-wordmark">ASHISH</span>
          </div>

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
            <a
              href="/CV_ASHISH.pdf"
              download
              className="btn btn-outline nav-cv-btn"
              title="Download Resume PDF"
            >
              <Download size={15} />
              <span>Resume</span>
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              aria-label="Toggle dark/light theme"
              title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Executive Hero Section */}
      <section id="home" className="hero-section">
        <div className="container hero-container">
          {/* Left Column: Executive Bio & Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-text-col"
          >
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              <span>Available for AI/ML & Software Engineering Opportunities</span>
            </div>

            <h1 className="hero-heading">
              Hi, I'm <span className="highlight-text">Ashish</span>
            </h1>

            <h2 className="hero-subtitle">
              Software Engineer & AI/ML Specialist
            </h2>

            <div className="institution-tag">
              <GraduationCap size={18} />
              <span>B.Tech Computer Science & Engineering @ <strong>Lovely Professional University</strong></span>
            </div>

            <p className="hero-summary">
              3rd-Semester CSE undergraduate maintaining a <strong>9.24 CGPA</strong>. Dedicated to building robust software systems, real-world enterprise platforms (<strong>TruckBoss-Pro</strong>), IoT controllers, and AI/ML algorithms.
            </p>

            <div className="hero-ctas">
              <a
                href="/CV_ASHISH.pdf"
                download
                className="btn btn-primary btn-large"
              >
                <Download size={18} />
                Download Resume (PDF)
              </a>

              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-secondary btn-large"
              >
                <Briefcase size={18} />
                View Featured Work
              </button>
            </div>

            <div className="social-links-strip">
              <a
                href="https://github.com/Ashishkumar9896"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="GitHub Profile"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/ashish-kumar-369b2536b"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:ashishkumarjha9896@gmail.com"
                className="social-btn"
                title="Send Email"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>

            {/* Metric Highlights Strip */}
            <div className="hero-metrics-grid">
              <div className="metric-card">
                <span className="metric-value">9.24</span>
                <span className="metric-label">CGPA (LPU B.Tech CSE)</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">3rd Sem</span>
                <span className="metric-label">Academic Standing</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">Deployed</span>
                <span className="metric-label">TruckBoss-Pro System</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">4+</span>
                <span className="metric-label">Verified Certifications</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Executive Developer Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hero-profile-col"
          >
            <div className="executive-card">
              <div className="profile-image-box">
                <img src="/profile.jpeg" alt="ASHISH" className="profile-img" />
                <div className="profile-img-overlay" />
              </div>

              <div className="profile-card-details">
                <h3 className="profile-card-name">ASHISH</h3>
                <p className="profile-card-role">B.Tech CSE Undergraduate</p>

                <div className="profile-specs-list">
                  <div className="spec-item">
                    <MapPin size={16} />
                    <span>Punjab / Haryana, India</span>
                  </div>
                  <div className="spec-item">
                    <BookOpen size={16} />
                    <span>Data Structures, Algorithms & AI/ML</span>
                  </div>
                  <div className="spec-item">
                    <Code size={16} />
                    <span>C++, Python, Node.js, SQL</span>
                  </div>
                  <div className="spec-item">
                    <Mail size={16} />
                    <span>ashishkumarjha9896@gmail.com</span>
                  </div>
                </div>

                <div className="profile-card-skills">
                  <span className="mini-tag">Python</span>
                  <span className="mini-tag">C++</span>
                  <span className="mini-tag">Node.js</span>
                  <span className="mini-tag">MySQL</span>
                  <span className="mini-tag">AI/ML</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={14} /> Professional Profile
            </span>
            <h2>About Me</h2>
          </div>

          <div className="about-grid">
            <div className="about-bio">
              <p>
                I am a 3rd-semester <strong>B.Tech Computer Science & Engineering</strong> student at <strong>Lovely Professional University (LPU)</strong> with a focused career goal in Artificial Intelligence, Machine Learning, and Software Systems Development.
              </p>
              <p>
                Maintaining a cumulative GPA of <strong>9.24 / 10</strong>, I prioritize core computer science fundamentals—mastering <strong>Data Structures & Algorithms (DSA)</strong> in <strong>C++</strong> and <strong>Python</strong> to solve complex computational challenges efficiently.
              </p>
              <p>
                Beyond academics, I have applied engineering principles in real-world environments—most notably designing, developing, and deploying <strong>TruckBoss-Pro</strong>, a commercial fleet management platform for <i>Bihal Suppliers</i>. My technical experience spans backend development, relational database modeling, real-time WebSockets, and IoT hardware controllers.
              </p>
            </div>

            <div className="about-pillars">
              <div className="pillar-card">
                <div className="pillar-icon">
                  <Cpu size={22} />
                </div>
                <div>
                  <h4>AI & Machine Learning Focus</h4>
                  <p>Exploring data pipelines, matrix computations in NumPy/Pandas, and predictive algorithms.</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <Code size={22} />
                </div>
                <div>
                  <h4>Core CS & Algorithmic Excellence</h4>
                  <p>Strong problem-solving foundation in Data Structures, OOP, and DBMS (MySQL).</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <Database size={22} />
                </div>
                <div>
                  <h4>Full-Stack & Hardware Systems</h4>
                  <p>End-to-end backend API design (Node.js/Express) and ESP32 microcontroller automation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Matrix Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Layers size={14} /> Technical Competencies
            </span>
            <h2>Skills & Technologies</h2>
          </div>

          <SkillsMatrix />
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Briefcase size={14} /> Practical Engineering
            </span>
            <h2>Featured Projects</h2>
          </div>

          <div className="projects-list">
            {projects.map((project) => (
              <TiltCard key={project.title} className={project.featured ? 'project-card-featured-wrap' : ''}>
                <div className={`project-card ${project.featured ? 'featured' : ''}`}>
                  <div className="project-card-header">
                    <div className="project-title-area">
                      {project.badge && <span className="project-badge">{project.badge}</span>}
                      <h3>{project.title}</h3>
                      <h4 className="project-subtitle">{project.subtitle}</h4>
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-github-btn"
                        title="View GitHub Repository"
                      >
                        <Github size={18} />
                        <span>View Repository</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  <p className="project-desc">{project.description}</p>

                  {project.features && (
                    <div className="project-features-list">
                      <h5>Key Technical Highlights:</h5>
                      <ul>
                        {project.features.map((feat, i) => (
                          <li key={i}>
                            <CheckCircle2 size={15} className="feat-check" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="project-tech-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="section education-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <GraduationCap size={14} /> Qualifications
            </span>
            <h2>Education & Industry Certifications</h2>
          </div>

          <div className="edu-cert-grid">
            {/* Left Column: Education Timeline */}
            <div className="edu-col">
              <h3 className="sub-section-title">
                <GraduationCap size={20} /> Academic History
              </h3>

              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-card">
                    <div className="timeline-top">
                      <h4>Bachelor of Technology - Computer Science & Engineering</h4>
                      <span className="cgpa-pill">CGPA: 9.24</span>
                    </div>
                    <span className="timeline-org">Lovely Professional University, Punjab</span>
                    <span className="timeline-date">August 2025 – Present (3rd Semester)</span>
                    <p className="timeline-details">
                      Focusing on Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Machine Learning foundations.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker secondary"></div>
                  <div className="timeline-card">
                    <div className="timeline-top">
                      <h4>Senior Secondary (Class 12)</h4>
                      <span className="score-pill">84.6%</span>
                    </div>
                    <span className="timeline-org">DAV Multipurpose Public School, Sonipat, Haryana</span>
                    <span className="timeline-date">Completed 2025</span>
                    <p className="timeline-details">
                      Core Stream: Physics, Chemistry, Mathematics, and Computer Science.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker secondary"></div>
                  <div className="timeline-card">
                    <div className="timeline-top">
                      <h4>Secondary School (Class 10)</h4>
                      <span className="score-pill">88.0%</span>
                    </div>
                    <span className="timeline-org">DAV Multipurpose Public School, Sonipat, Haryana</span>
                    <span className="timeline-date">Completed 2023</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Certifications */}
            <div className="cert-col">
              <h3 className="sub-section-title">
                <Award size={20} /> Verified Certifications
              </h3>

              <div className="certifications-grid">
                {certifications.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certification-card"
                  >
                    <div className="cert-card-header">
                      <Award size={18} className="cert-icon" />
                      <span className="cert-org-name">{cert.org}</span>
                    </div>
                    <h4 className="cert-name">{cert.name}</h4>
                    <div className="cert-card-footer">
                      <span className="cert-issue-date">{cert.date}</span>
                      <span className="cert-verify-link">
                        Verify PDF <ExternalLink size={12} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Practical Exposure Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={14} /> Practical Exposure
            </span>
            <h2>Experience & Technical Activities</h2>
          </div>

          <div className="experience-cards-grid">
            <div className="exp-card highlight-exp">
              <div className="exp-header">
                <div className="exp-icon">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3>Real-World Enterprise Software Development</h3>
                  <span className="exp-company">Bihal Suppliers — Commercial Deployment</span>
                </div>
              </div>
              <p>
                Architected and deployed <strong>TruckBoss-Pro</strong>, a web-based fleet operations management system. Responsible for database schema design in MySQL, backend REST APIs using Express.js/Node.js, role-based security with JWT, and live trip synchronization using Socket.IO.
              </p>
              <div className="exp-tech-list">
                <span>Node.js</span>
                <span>Express.js</span>
                <span>MySQL</span>
                <span>JavaScript</span>
                <span>Socket.IO</span>
                <span>JWT</span>
              </div>
            </div>

            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-icon">
                  <Code size={22} />
                </div>
                <div>
                  <h3>Data Structures & Algorithms Track</h3>
                  <span className="exp-company">Continuous Competitive Programming</span>
                </div>
              </div>
              <p>
                Actively strengthening analytical capabilities by solving algorithmic challenges in <strong>C++</strong> and <strong>Python</strong>. Focus areas include graph algorithms, dynamic programming, sorting/searching efficiency, and memory optimization.
              </p>
            </div>

            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-icon">
                  <Wifi size={22} />
                </div>
                <div>
                  <h3>IoT & Hardware Firmware Exploration</h3>
                  <span className="exp-company">Embedded Systems Prototyping</span>
                </div>
              </div>
              <p>
                Designed Wi-Fi integrated home automation hardware using ESP32 microcontrollers, Arduino IDE C++ programming, and Arduino IoT Cloud remote telemetry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Mail size={14} /> Get In Touch
            </span>
            <h2>Contact Information</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info-col">
              <h3>Let's Connect</h3>
              <p className="contact-intro">
                I am actively seeking software engineering internships, AI/ML project collaborations, and academic opportunities. Feel free to reach out directly via email, phone, or LinkedIn.
              </p>

              <div className="contact-channel-list">
                <a href="mailto:ashishkumarjha9896@gmail.com" className="channel-card">
                  <div className="channel-icon"><Mail size={20} /></div>
                  <div>
                    <span className="channel-title">Direct Email</span>
                    <span className="channel-detail">ashishkumarjha9896@gmail.com</span>
                  </div>
                </a>

                <div className="channel-card">
                  <div className="channel-icon"><Phone size={20} /></div>
                  <div>
                    <span className="channel-title">Phone Number</span>
                    <span className="channel-detail">+91-9896810805</span>
                  </div>
                </div>

                <a href="https://github.com/Ashishkumar9896" target="_blank" rel="noopener noreferrer" className="channel-card">
                  <div className="channel-icon"><Github size={20} /></div>
                  <div>
                    <span className="channel-title">GitHub</span>
                    <span className="channel-detail">github.com/Ashishkumar9896</span>
                  </div>
                </a>

                <a href="https://linkedin.com/in/ashish-kumar-369b2536b" target="_blank" rel="noopener noreferrer" className="channel-card">
                  <div className="channel-icon"><Linkedin size={20} /></div>
                  <div>
                    <span className="channel-title">LinkedIn</span>
                    <span className="channel-detail">linkedin.com/in/ashish-kumar-369b2536b</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Direct Contact Form */}
            <form
              className="contact-form-card"
              action="https://formsubmit.co/ashishkumarjha9896@gmail.com"
              method="POST"
            >
              <h3>Send a Message</h3>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. Dr. Sharma / Recruiter Name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. name@university.edu"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message here..."
                  rows="4"
                  required
                  className="form-input form-textarea"
                ></textarea>
              </div>

              <input type="hidden" name="_subject" value="New message from Professional Portfolio!" />
              <input type="hidden" name="_captcha" value="false" />

              <button type="submit" className="btn btn-primary btn-full">
                <Mail size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-left">
            <span className="footer-logo">ASHISH</span>
            <p>ASHISH — B.Tech CSE Student @ LPU (CGPA: 9.24)</p>
          </div>

          <div className="footer-links">
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('skills')}>Skills</button>
            <button onClick={() => scrollToSection('projects')}>Projects</button>
            <button onClick={() => scrollToSection('education')}>Education</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ASHISH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
