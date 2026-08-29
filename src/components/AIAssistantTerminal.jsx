import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Cpu, Play, Trash2 } from 'lucide-react';

export default function AIAssistantTerminal() {
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Initializing Neural Network Interface...' },
    { role: 'system', text: 'Profile Loaded: Ashish\nB.Tech CSE | LPU | 3rd Semester\nCGPA: 9.24\nCurrent Focus: AI/ML\nSkills: Python • C++ • DSA • SQL\nProjects: Full-Stack Web • IoT' },
    { role: 'assistant', text: 'Hello! I am Ashish\'s AI Agent. Ashish is a 3rd-semester B.Tech CSE student at LPU with a strong interest in AI/ML, hands-on software development, and IoT. How can I help you explore his work today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const terminalBodyRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Quick command list
  const quickCommands = [
    { label: '🚀 AI Projects', command: '/projects' },
    { label: '🎓 CGPA & College', command: '/academics' },
    { label: '🛠️ Tech Stack', command: '/skills' },
    { label: '📞 Contact Details', command: '/contact' }
  ];

  // Scroll the terminal body container directly to the bottom when messages or text changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  // Clean up interval on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // AI responses lookup database
  const getAIResponse = (input) => {
    const cleanInput = input.toLowerCase().trim();

    if (cleanInput.includes('project') || cleanInput.includes('work') || cleanInput.includes('/projects')) {
      return `Ashish has built notable hands-on projects:
1. **TruckBoss-Pro — Fleet Management System**: A real-world project for Bihal Suppliers built using Node.js, Express.js, MySQL, JavaScript, Socket.IO, Cloudinary, and JWT. It automates trips, driver management, fuel tracking, and prints PDF/Excel reports.
2. **IoT Smart Home Controller**: Built an ESP32-based smart home automation system to remotely control LEDs and an AC lamp through Arduino IoT Cloud using Wi-Fi, GPIO, and relay modules.
3. **Responsive Blog Website**: Crafted a responsive blog website using semantic HTML5 and modern CSS, with adaptive layouts for desktop and mobile screens.`;
    }

    if (cleanInput.includes('cgpa') || cleanInput.includes('education') || cleanInput.includes('academics') || cleanInput.includes('college') || cleanInput.includes('university') || cleanInput.includes('lpu') || cleanInput.includes('/academics')) {
      return `Ashish is a 3rd-semester B.Tech CSE student at Lovely Professional University (LPU), Punjab.
- **Academic Standard**: Currently maintaining a CGPA of **9.24**.
- **Schooling**: Completed Class 12 (84.6%) and Class 10 (88%) from DAV Multipurpose Public School, Haryana.`;
    }

    if (cleanInput.includes('skill') || cleanInput.includes('tech') || cleanInput.includes('programming') || cleanInput.includes('language') || cleanInput.includes('/skills')) {
      return `Ashish's technical skills include:
- **Programming**: Python, C++, C, SQL
- **Core CS**: Data Structures & Algorithms, OOP, DBMS, Problem Solving
- **AI/ML**: NumPy, Pandas, Machine Learning Fundamentals, Python for AI/ML, Google Colab
- **Web Development**: HTML, CSS, JavaScript, Node.js, Express.js, REST APIs
- **Tools**: Git, GitHub, VS Code, MySQL, Arduino IDE, Cloudinary`;
    }

    if (cleanInput.includes('contact') || cleanInput.includes('email') || cleanInput.includes('phone') || cleanInput.includes('linkedin') || cleanInput.includes('/contact')) {
      return `Here is how you can get in touch with Ashish directly:
- **Email**: ashishkumarjha9896@gmail.com
- **Phone**: +91-9896810805
- **LinkedIn**: linkedin.com/in/ashish-kumar-369b2536b
- **GitHub**: github.com/Ashishkumar9896`;
    }

    if (cleanInput.includes('hello') || cleanInput.includes('hi') || cleanInput.includes('hey')) {
      return "Hi there! I'm ready to stream data. Ask me about Ashish's '/projects', '/skills', '/academics', or '/contact'. What would you like to explore?";
    }

    // Default response
    return `Query processed. Ashish is a 3rd-semester B.Tech CSE student at LPU and an AI/ML enthusiast exploring software development, AI/ML, and intelligent applications. He combines a solid DSA foundation with hands-on web development (Node.js/MySQL) and IoT (ESP32). Contact him at ashishkumarjha9896@gmail.com to collaborate!`;
  };

  // Simulate streaming response
  const handleQuery = (queryText) => {
    if (isTyping) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: queryText }]);
    setIsTyping(true);
    setStreamingText('');

    const fullResponse = getAIResponse(queryText);
    let index = 0;
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    // Stream response char by char to mimic LLM behavior
    typingIntervalRef.current = setInterval(() => {
      if (index < fullResponse.length) {
        setStreamingText(prev => prev + fullResponse.charAt(index));
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setMessages(prev => [...prev, { role: 'assistant', text: fullResponse }]);
        setStreamingText('');
        setIsTyping(false);
      }
    }, 12);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const query = inputValue;
    setInputValue('');
    handleQuery(query);
  };

  // Clear terminal console history
  const handleClear = () => {
    if (isTyping) return;
    setMessages([
      { role: 'system', text: 'Neural Interface Cleared. Active Session Restored.' }
    ]);
  };

  // Parse markdown bold text and newlines into formatted elements
  const renderFormattedText = (text) => {
    if (!text) return '';
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2);
        const bulletParts = bulletText.split(/(\*\*.*?\*\*)/g);
        const formattedBullet = bulletParts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        return (
          <div key={i} style={{ paddingLeft: '12px', margin: '4px 0', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>•</span>
            <div>{formattedBullet}</div>
          </div>
        );
      }

      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={i} style={{ margin: '6px 0', paddingLeft: '4px', lineHeight: '1.6' }}>
            {formattedLine}
          </div>
        );
      }

      return (
        <div key={i} style={{ margin: '4px 0', minHeight: '1.2em', lineHeight: '1.6' }}>
          {formattedLine}
        </div>
      );
    });
  };

  return (
    <div className="terminal-widget">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" onClick={handleClear} title="Clear terminal" style={{ cursor: 'pointer' }}></span>
          <span className="dot yellow" onClick={handleClear} title="Clear terminal" style={{ cursor: 'pointer' }}></span>
          <span className="dot green" onClick={handleClear} title="Clear terminal" style={{ cursor: 'pointer' }}></span>
        </div>
        <div className="terminal-title">
          <Terminal size={14} className="icon-terminal" style={{ color: 'var(--accent-primary)' }} />
          <span>ashish-ai-agent:~ core-neural-net</span>
        </div>
        <div className="terminal-status" onClick={handleClear} style={{ cursor: 'pointer' }} title="Reset interface">
          <div className="terminal-waveform">
            <span className="wave-bar bar-1"></span>
            <span className="wave-bar bar-2"></span>
            <span className="wave-bar bar-3"></span>
            <span className="wave-bar bar-4"></span>
          </div>
          <Trash2 size={12} style={{ marginRight: '4px', opacity: 0.8 }} />
          <span className="status-blink"></span>
          <span className="status-text">ACTIVE</span>
        </div>
      </div>

      {/* Terminal Logs/Console */}
      <div className="terminal-body" ref={terminalBodyRef}>
        <div className="terminal-scroll-area">
          {messages.map((msg, i) => (
            <div key={i} className={`terminal-bubble ${msg.role}`}>
              <div className="bubble-header">
                {msg.role === 'user' && (
                  <span className="bubble-tag tag-user">visitor@client:~$</span>
                )}
                {msg.role === 'assistant' && (
                  <span className="bubble-tag tag-ai">
                    <Cpu size={10} style={{ marginRight: '4px', color: 'var(--accent-primary)' }} />
                    neural_core
                  </span>
                )}
                {msg.role === 'system' && (
                  <span className="bubble-tag tag-sys">[system_event]</span>
                )}
                <span className="bubble-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </span>
              </div>
              <div className="bubble-body">
                {renderFormattedText(msg.text)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="terminal-bubble assistant typing">
              <div className="bubble-header">
                <span className="bubble-tag tag-ai">
                  <Cpu size={10} style={{ marginRight: '4px', color: 'var(--accent-primary)' }} />
                  neural_core
                </span>
                <span className="bubble-time">processing...</span>
              </div>
              <div className="bubble-body">
                {renderFormattedText(streamingText)}
                <span className="cursor-blink">|</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Interactive Actions */}
      <div className="terminal-quick-actions">
        <span className="quick-label">Execute Command:</span>
        <div className="quick-buttons">
          {quickCommands.map((qc) => (
            <button
              key={qc.command}
              onClick={() => handleQuery(qc.command)}
              disabled={isTyping}
              className="quick-btn"
            >
              <Play size={8} className="play-icon" />
              {qc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field Form */}
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="input-prompt">CORE_NET &gt;</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Query Ashish's credentials, projects, stack..."
          disabled={isTyping}
          className="terminal-input-field"
        />
        <button type="submit" disabled={isTyping || !inputValue.trim()} className="terminal-send-btn">
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
