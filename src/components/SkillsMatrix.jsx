import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'programming', label: 'Programming Languages', color: '#3b82f6' },
  { id: 'coreCs', label: 'Core CS Fundamentals', color: '#8b5cf6' },
  { id: 'aiMl', label: 'AI & Machine Learning', color: '#06b6d4' },
  { id: 'webDev', label: 'Web & Backend Dev', color: '#10b981' },
  { id: 'tools', label: 'Tools & DevOps', color: '#f59e0b' },
]

const skillsData = {
  programming: [
    { name: 'C++', level: 85, tag: 'Advanced' },
    { name: 'Python', level: 80, tag: 'Proficient' },
    { name: 'C', level: 75, tag: 'Strong' },
    { name: 'SQL', level: 78, tag: 'Proficient' },
    { name: 'JavaScript (ES6+)', level: 72, tag: 'Proficient' },
  ],
  coreCs: [
    { name: 'Data Structures & Algorithms', level: 85, tag: 'Core Focus' },
    { name: 'Object-Oriented Programming', level: 82, tag: 'Advanced' },
    { name: 'DBMS & Normalization', level: 75, tag: 'Proficient' },
    { name: 'Problem Solving & Logic', level: 80, tag: 'Continuous' },
    { name: 'Operating Systems (Basics)', level: 65, tag: 'Academic' },
  ],
  aiMl: [
    { name: 'Python for AI/ML', level: 78, tag: 'Core Interest' },
    { name: 'NumPy', level: 72, tag: 'Proficient' },
    { name: 'Pandas', level: 70, tag: 'Proficient' },
    { name: 'ML Fundamentals', level: 65, tag: 'Academic' },
    { name: 'Google Colab / Jupyter', level: 75, tag: 'Proficient' },
  ],
  webDev: [
    { name: 'Node.js & Express.js', level: 80, tag: 'Applied Project' },
    { name: 'MySQL (Backend)', level: 78, tag: 'Applied Project' },
    { name: 'REST APIs & WebSockets', level: 75, tag: 'Applied Project' },
    { name: 'HTML5 & CSS3', level: 82, tag: 'Strong' },
    { name: 'React.js (Basics)', level: 60, tag: 'Learning' },
  ],
  tools: [
    { name: 'Git & GitHub', level: 82, tag: 'Daily Workflow' },
    { name: 'VS Code', level: 90, tag: 'Primary IDE' },
    { name: 'ESP32 & Arduino IDE', level: 70, tag: 'Hardware' },
    { name: 'Cloudinary & JWT Auth', level: 68, tag: 'Security' },
    { name: 'Postman / API Testing', level: 65, tag: 'Tooling' },
  ],
}

function SkillBar({ name, level, tag, color, index }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="skill-row"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <div className="skill-row-header">
        <span className="skill-row-name">{name}</span>
        <div className="skill-row-meta">
          <span className="skill-row-tag" style={{ color, borderColor: `${color}33`, background: `${color}12` }}>{tag}</span>
          <span className="skill-row-pct">{level}%</span>
        </div>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 0.8, delay: index * 0.07, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('programming')
  const activeCat = categories.find(c => c.id === activeTab)

  return (
    <div className="skills-pro-wrapper">
      {/* Left: Category Sidebar */}
      <div className="skills-sidebar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`skills-side-btn ${activeTab === cat.id ? 'active' : ''}`}
            style={activeTab === cat.id ? {
              borderLeftColor: cat.color,
              color: cat.color,
              background: `${cat.color}10`,
            } : {}}
          >
            <span className="side-btn-dot" style={{ background: activeTab === cat.id ? cat.color : 'var(--border-color)' }} />
            <span>{cat.label}</span>
            <span className="side-btn-count">{skillsData[cat.id].length}</span>
          </button>
        ))}

        {/* Summary Stats */}
        <div className="skills-summary-box">
          <div className="skills-stat">
            <span className="skills-stat-val">22+</span>
            <span className="skills-stat-label">Total Skills</span>
          </div>
          <div className="skills-stat">
            <span className="skills-stat-val">5</span>
            <span className="skills-stat-label">Domains</span>
          </div>
          <div className="skills-stat">
            <span className="skills-stat-val">1+</span>
            <span className="skills-stat-label">Yr Experience</span>
          </div>
        </div>
      </div>

      {/* Right: Skill Bars Panel */}
      <div className="skills-panel">
        <div className="skills-panel-header">
          <div className="skills-panel-title-row">
            <span className="skills-panel-dot" style={{ background: activeCat.color }} />
            <h3 className="skills-panel-title">{activeCat.label}</h3>
          </div>
          <span className="skills-panel-desc">
            {activeTab === 'programming' && 'Core languages for algorithms, backend systems & scripting'}
            {activeTab === 'coreCs' && 'Foundational computer science disciplines & problem solving'}
            {activeTab === 'aiMl' && 'Data science libraries & machine learning pipeline tools'}
            {activeTab === 'webDev' && 'Full-stack web technologies used in real-world deployments'}
            {activeTab === 'tools' && 'Development environment, version control & hardware tools'}
          </span>
        </div>

        <div className="skills-bar-list">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {skillsData[activeTab].map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  tag={skill.tag}
                  color={activeCat.color}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom legend */}
        <div className="skills-legend">
          <span>Beginner</span>
          <div className="skills-legend-bar">
            <div style={{ flex: 1, height: 3, background: 'var(--border-color)', borderRadius: 4 }}>
              <div style={{ width: '65%', height: '100%', background: `linear-gradient(90deg, ${activeCat.color}55, ${activeCat.color})`, borderRadius: 4, transition: 'background 0.3s' }} />
            </div>
          </div>
          <span>Expert</span>
        </div>
      </div>
    </div>
  )
}
