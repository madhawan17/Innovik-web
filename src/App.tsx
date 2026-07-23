import { useState, useEffect, useRef } from "react";
import { VolumetricHero } from "@/components/ui/volumetric-hero";

// 10 Core Problem Statements data
const problemStatements = [
  {
    num: "01",
    theme: "Academic & Education",
    title: "Intelligent Academic Planning & Student Success Platform",
    desc: "A smart web-based system that helps students effectively plan their academic journey, track progress, predict performance risks, and receive personalized interventions. The platform uses AI/ML, analytics, and cloud technologies to provide institutions, faculty, and students with a comprehensive ecosystem for academic success management, early warning systems, and data-driven educational insights.",
    categories: ["software", "ai-ml", "cloud", "analytics"],
    icons: ["fa-code", "fa-brain", "fa-cloud", "fa-chart-simple"],
    labels: ["Software", "AI/ML", "Cloud", "Analytics"]
  },
  {
    num: "02",
    theme: "Smart Healthcare",
    title: "Smart Healthcare Assistance & Patient Monitoring System",
    desc: "An intelligent, end-to-end healthcare platform that enables remote patient monitoring through wearable IoT sensors, provides AI-powered health analytics, connects patients with healthcare providers through telemedicine, and supports chronic disease management. The system should reduce healthcare accessibility barriers while improving diagnostic accuracy and patient outcomes.",
    categories: ["software", "hardware", "ai-ml", "iot", "cloud"],
    icons: ["fa-code", "fa-microchip", "fa-wifi", "fa-brain"],
    labels: ["Software", "Hardware", "IoT", "AI"]
  },
  {
    num: "03",
    theme: "Sustainable Agriculture",
    title: "Sustainable Agriculture Advisory Platform",
    desc: "A comprehensive digital platform that empowers farmers with AI-driven insights for crop planning, soil health analysis, weather adaptation, pest management, and market guidance. The platform integrates satellite imagery, IoT sensor data, and expert knowledge to optimize agricultural productivity while promoting environmentally sustainable farming practices.",
    categories: ["software", "ai-ml", "iot", "cloud", "analytics"],
    icons: ["fa-code", "fa-brain", "fa-wifi", "fa-chart-simple"],
    labels: ["Software", "AI", "IoT", "Analytics"]
  },
  {
    num: "04",
    theme: "Transportation & Mobility",
    title: "Intelligent Transportation & Traffic Optimization System",
    desc: "An AI-powered intelligent transportation system that optimizes traffic flow, predicts congestion, manages public transit efficiency, and reduces urban mobility challenges. The system should incorporate real-time data processing, adaptive signal control, route optimization, and multi-modal transportation integration to create a seamless and sustainable urban mobility ecosystem.",
    categories: ["software", "ai-ml", "iot", "cloud", "analytics"],
    icons: ["fa-code", "fa-brain", "fa-wifi", "fa-chart-simple"],
    labels: ["Software", "AI", "IoT", "Analytics"]
  },
  {
    num: "05",
    theme: "Digital Tourism & Culture",
    title: "Digital Tourism & Cultural Heritage Experience",
    desc: "An innovative digital platform that revolutionizes tourism experiences through AI personalization, AR/VR immersive technologies, and intelligent cultural heritage preservation. The solution should enable virtual exploration of historical sites, provide personalized travel recommendations, support multilingual assistance, and create engaging digital narratives that make cultural heritage accessible to global audiences.",
    categories: ["software", "ai-ml", "cloud"],
    icons: ["fa-code", "fa-brain", "fa-vr-cardboard", "fa-mobile-screen-button"],
    labels: ["Software", "AI", "AR/VR", "Mobile"]
  },
  {
    num: "06",
    theme: "Waste & Environment",
    title: "Smart Waste Management & Environmental Monitoring",
    desc: "An intelligent waste management ecosystem that leverages AI, IoT sensors, and predictive analytics to optimize waste collection routes, monitor landfill capacity, track recycling rates, and provide real-time environmental quality monitoring. The system should reduce operational costs, minimize environmental impact, and engage citizens in sustainable waste practices.",
    categories: ["software", "hardware", "ai-ml", "iot", "cloud"],
    icons: ["fa-code", "fa-microchip", "fa-wifi", "fa-brain"],
    labels: ["Software", "Hardware", "IoT", "AI"]
  },
  {
    num: "07",
    theme: "Disaster Management",
    title: "Disaster Preparedness & Emergency Response Platform",
    desc: "A comprehensive disaster management platform that combines AI-powered risk prediction, real-time emergency coordination, resource allocation optimization, and community resilience building. The system should integrate satellite data, IoT sensor networks, GIS mapping, and communication systems to provide early warning alerts, coordinate emergency responders, and support recovery operations.",
    categories: ["software", "ai-ml", "iot", "cloud"],
    icons: ["fa-code", "fa-brain", "fa-wifi", "fa-earth-americas"],
    labels: ["Software", "AI", "IoT", "GIS"]
  },
  {
    num: "08",
    theme: "Digital Governance",
    title: "Citizen Engagement & Public Grievance Management",
    desc: "A sophisticated digital governance platform that enables transparent citizen-government interaction, streamlines public service delivery, manages grievances intelligently, and uses AI to analyze public feedback for policy improvement. The solution should promote inclusive digital governance that is accessible, responsive, and transparent.",
    categories: ["software", "ai-ml", "cloud", "analytics"],
    icons: ["fa-code", "fa-brain", "fa-cloud", "fa-mobile-screen-button"],
    labels: ["Software", "AI", "Cloud", "Mobile"]
  },
  {
    num: "09",
    theme: "Workforce & Education",
    title: "Future Workforce & Career Guidance Ecosystem",
    desc: "An AI-powered career development platform that provides personalized skill assessment, identifies skill gaps, recommends learning pathways, predicts industry trends, and connects individuals with opportunities. The system should help students, job-seekers, and professionals navigate the rapidly evolving job market through intelligent career planning and continuous learning.",
    categories: ["software", "ai-ml", "cloud", "analytics"],
    icons: ["fa-code", "fa-brain", "fa-cloud", "fa-chart-simple"],
    labels: ["Software", "AI", "Cloud", "Analytics"]
  },
  {
    num: "10",
    theme: "Cyber Security",
    title: "Cyber Security & Digital Trust Framework",
    desc: "An advanced cybersecurity framework that leverages AI for real-time threat detection, vulnerability assessment, automated incident response, and digital trust management. The system should protect critical infrastructure, detect emerging cyber threats, ensure data privacy compliance, and build resilient digital systems for organizations and individuals.",
    categories: ["software", "ai-ml", "cloud"],
    icons: ["fa-code", "fa-brain", "fa-shield-halved", "fa-cubes"],
    labels: ["Software", "AI", "Security", "Blockchain"]
  }
];

const leaders = [
  {
    name: "Shri R.S. Rathore",
    designation: "Chairman, VGI",
    quote: '"Empowering youth through world-class technical education..."',
    desc: "Empowering youth through world-class technical education and visionary leadership, steering VGI institutions toward global excellence."
  },
  {
    name: "Shri Nitin Singh Tomar",
    designation: "Managing Director, VGI",
    quote: '"Pioneering collaborative academic partnerships..."',
    desc: "Pioneering collaborative academic partnerships and industry integrations, building modern campus infrastructures for future engineering talent."
  },
  {
    name: "Smt. Garima Singh Tomar",
    designation: "Treasurer, VITM",
    quote: '"Managing strategic financial growth..."',
    desc: "Managing strategic financial growth and resource allocation, ensuring optimal learning ecosystems and support systems for student innovators."
  },
  {
    name: "Dr. Sandeep Shukla",
    designation: "Joint Managing Director, VITM",
    quote: '"Cultivating academic research and innovation..."',
    desc: "Cultivating academic research and innovation projects, driving technology-centric program designs across Vikrant portals."
  },
  {
    name: "Dr. Jitendra Singh Dodiya",
    designation: "Principal, VITM",
    quote: '"Championing institutional excellence..."',
    desc: "Championing institutional excellence, academic discipline, and comprehensive engineering curricula to guide students to global careers."
  },
  {
    name: "Dr. Sanmati Jain",
    designation: "Head of Department – CSE, VITM",
    quote: '"Fostering advanced research in AI/ML..."',
    desc: "Fostering advanced research in AI/ML, cybersecurity, and cloud platforms, coordinating student hackathons to prepare them for next-generation tech environments."
  }
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Active category filter for problem statements
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Active problem card index (filtered deck)
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  
  // Active schedule timeline tab
  const [activeTimelineTab, setActiveTimelineTab] = useState<"day1" | "day2">("day1");

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
    
    setTheme(initialTheme);
    if (initialTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, []);

  // Scroll listener for progress bar and back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Update top progress bar
      const progressEl = document.getElementById("scroll-progress");
      if (progressEl && scrollHeight > 0) {
        const percentage = (scrollPosition / scrollHeight) * 100;
        progressEl.style.width = `${percentage}%`;
      }
      
      // Update back-to-top visibility
      setShowBackToTop(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme utility
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  };

  // Filtered list of problems
  const filteredProblems = problemStatements.filter(
    (prob) => activeCategory === "all" || prob.categories.includes(activeCategory)
  );

  // Reset index when category changes
  useEffect(() => {
    setActiveProblemIndex(0);
  }, [activeCategory]);

  const handlePrevProblem = () => {
    setActiveProblemIndex((prev) => (prev === 0 ? filteredProblems.length - 1 : prev - 1));
  };

  const handleNextProblem = () => {
    setActiveProblemIndex((prev) => (prev === filteredProblems.length - 1 ? 0 : prev + 1));
  };

  // Leadership carousel state and refs
  const [selectedLeader, setSelectedLeader] = useState<typeof leaders[0] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Modal scroll lock effect
  useEffect(() => {
    if (selectedLeader) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollYString = document.body.dataset.scrollY;
      const scrollY = scrollYString ? parseInt(scrollYString, 10) : 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY > 0) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    }
  }, [selectedLeader]);

  // Key listener for modal close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLeader(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div id="scroll-progress" aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, height: "4px", backgroundColor: "var(--primary)", width: "0%", zIndex: 10000, transition: "width 0.1s ease-out" }} />

      {/* Navigation Header */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo" aria-label="INNOVIK 6.0 Home">
            <span className="logo-accent">INNOVIK</span> 6.0
          </a>
          
          <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`} id="nav-menu" role="navigation" aria-label="Main Navigation">
            <ul className="nav-list">
              <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
              <li><a href="#problems" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Problems</a></li>
              <li><a href="#schedule" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Schedule</a></li>
              <li><a href="#rules" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Rules</a></li>
              <li><a href="#prizes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Prizes</a></li>
              <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button id="theme-toggle" className="theme-toggle-btn" aria-label="Toggle theme" onClick={toggleTheme}>
              <i className={`fa-solid ${theme === "light" ? "fa-sun" : "fa-moon"}`} id="theme-icon"></i>
            </button>
            <a href="https://forms.gle/nBespXoUn4PGBpcW9" target="_blank" rel="noopener noreferrer" className="btn btn-secondary nav-cta">Register Now!</a>
            
            <button className="mobile-toggle" id="mobile-toggle" aria-expanded={mobileMenuOpen} aria-controls="nav-menu" aria-label="Toggle navigation menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="bar" style={mobileMenuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : undefined}></span>
              <span className="bar" style={mobileMenuOpen ? { opacity: 0 } : undefined}></span>
              <span className="bar" style={mobileMenuOpen ? { transform: 'rotate(-45deg) translate(6px, -6px)' } : undefined}></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section containing Volumetric Spotlight Room */}
        <section id="home" className="hero-section" style={{ minHeight: "650px", height: "auto" }}>
          <div className="hero-bg-glow" style={{ pointerEvents: "none" }}></div>
          <VolumetricHero />
        </section>

        {/* Stats Bar */}
        <div className="stats-bar-wrapper">
          <div className="container">
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
                <div className="stat-content">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Participants</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><i className="fa-solid fa-clock"></i></div>
                <div className="stat-content">
                  <span className="stat-number">24 Hours</span>
                  <span className="stat-label">Non-Stop Coding</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><i className="fa-solid fa-lightbulb"></i></div>
                <div className="stat-content">
                  <span className="stat-number">10</span>
                  <span className="stat-label">Problem Statements</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><i className="fa-solid fa-trophy"></i></div>
                <div className="stat-content">
                  <span className="stat-number">Rs. 2,00,000</span>
                  <span className="stat-label">Total Prize Pool</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="about-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">About the Event</span>
              <h2 className="section-title">Global Innovation Challenge</h2>
              <div className="header-bar"></div>
            </div>
            
            <div className="about-grid">
              <div className="about-card main-about">
                <h3>INNOVIK 6.0 – International Hackathon 2026</h3>
                <p>INNOVIK 6.0 is a global innovation challenge designed to bring together students, innovators, developers, researchers, and technology enthusiasts to develop impactful solutions for real-world challenges through emerging technologies and intelligent systems. The hackathon aims to foster innovation, creativity, collaboration, entrepreneurship, and technology-driven problem solving while providing participants with national and international exposure.</p>
                
                <div className="event-details-grid">
                  <div className="detail-box">
                    <i className="fa-solid fa-calendar-days"></i>
                    <div>
                      <h4>Event Dates</h4>
                      <p>15–16 September 2026</p>
                    </div>
                  </div>
                  <div className="detail-box">
                    <i className="fa-solid fa-map-location-dot"></i>
                    <div>
                      <h4>Venue</h4>
                      <p>VITM, Indore Campus</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="about-card theme-about">
                <div className="theme-icon"><i className="fa-solid fa-brain"></i></div>
                <span className="theme-tag">Main Theme</span>
                <h3>Agentic AI for Smart Solutions</h3>
                <p>This year, INNOVIK 6.0 places special emphasis on <strong>Agentic AI</strong> — autonomous intelligent systems designed to plan, decide, act, and collaborate to achieve complex objectives. Innovators will harness autonomous agents, multi-agent frameworks, machine learning models, and smart infrastructure to pioneer the next generation of solutions across industry sectors.</p>
                
                <div className="theme-visuals">
                  <div className="tech-tag">Autonomous Agents</div>
                  <div className="tech-tag">Multi-Agent Systems</div>
                  <div className="tech-tag">Machine Learning</div>
                  <div className="tech-tag">Cloud Integration</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statements Section */}
        <section id="problems" className="problems-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">Problem Statements</span>
              <h2 className="section-title">Explore the Challenges</h2>
              <div className="header-bar"></div>
              <p className="section-desc">Select tags below to filter the 10 core problem statements by technology, platform, or theme.</p>
            </div>

            {/* Filter Controls */}
            <div className="filter-controls" id="filter-controls">
              {[
                { filter: "all", label: "All Challenges" },
                { filter: "ai-ml", label: "AI/ML" },
                { filter: "iot", label: "IoT" },
                { filter: "software", label: "Software" },
                { filter: "hardware", label: "Hardware" },
                { filter: "cloud", label: "Cloud Computing" },
                { filter: "analytics", label: "Data Analytics" }
              ].map((btn) => (
                <button
                  key={btn.filter}
                  className={`filter-btn ${activeCategory === btn.filter ? "active" : ""}`}
                  onClick={() => setActiveCategory(btn.filter)}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Problems Filterable Deck Slider */}
            <div className="problems-carousel-section">
              <div className="problems-deck-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <button className="carousel-control prev" id="carousel-prev" aria-label="Previous challenge" onClick={handlePrevProblem}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                
                <div className="problems-deck" style={{ position: "relative", minHeight: "440px", width: "100%", maxWidth: "680px", display: "flex", justifyContent: "center" }}>
                  {filteredProblems.map((prob, idx) => (
                    <div 
                      key={prob.num} 
                      className={`problem-card ${idx === activeProblemIndex ? "active" : ""}`}
                      style={{ 
                        display: idx === activeProblemIndex ? "flex" : "none", 
                        flexDirection: "column",
                        width: "100%",
                        animation: "fadeIn 0.5s ease-in-out"
                      }}
                    >
                      <div className="problem-num">{prob.num}</div>
                      <div className="problem-header">
                        <span className="problem-theme-tag">{prob.theme}</span>
                        <h3>{prob.title}</h3>
                      </div>
                      <p className="problem-desc">{prob.desc}</p>
                      <div className="problem-footer">
                        {prob.labels.map((lbl, i) => (
                          <span className="category-tag" key={i}>
                            <i className={`fa-solid ${prob.icons[i]}`}></i> {lbl}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {filteredProblems.length === 0 && (
                    <div style={{ color: "var(--zinc-500)", alignSelf: "center", textAlign: "center" }}>No problem statements match the selected filter.</div>
                  )}
                </div>

                <button className="carousel-control next" id="carousel-next" aria-label="Next challenge" onClick={handleNextProblem}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              
              {filteredProblems.length > 0 && (
                <div className="carousel-indicator">
                  <div className="indicator-dots">
                    {filteredProblems.map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`indicator-dot ${idx === activeProblemIndex ? "active" : ""}`}
                        onClick={() => setActiveProblemIndex(idx)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="schedule-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">Event Timeline</span>
              <h2 className="section-title">Hackathon Schedule</h2>
              <div className="header-bar"></div>
            </div>

            <div className="schedule-tabs">
              <button 
                className={`tab-btn ${activeTimelineTab === "day1" ? "active" : ""}`} 
                aria-controls="day1-timeline"
                onClick={() => setActiveTimelineTab("day1")}
              >
                <span className="tab-day">Day 1</span>
                <span className="tab-date">Sept 15, 2026</span>
              </button>
              
              <button 
                className={`tab-btn ${activeTimelineTab === "day2" ? "active" : ""}`} 
                aria-controls="day2-timeline"
                onClick={() => setActiveTimelineTab("day2")}
              >
                <span className="tab-day">Day 2</span>
                <span className="tab-date">Sept 16, 2026</span>
              </button>
            </div>

            <div className="timeline-container">
              {/* Day 1 Timeline */}
              {activeTimelineTab === "day1" && (
                <div className="timeline active" id="day1-timeline" role="tabpanel" aria-label="Day 1 Schedule">
                  <div className="timeline-item">
                    <div className="time-meta">08:00 AM – 09:30 AM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Registration & Reporting</h3>
                      <p>Arrival of teams, scanning confirmations, kit distribution, and allotment of workstations.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">09:30 AM – 11:00 AM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Inaugural Ceremony</h3>
                      <p>Welcome address by leadership and formal commencement of INNOVIK 6.0.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">11:00 AM – 11:30 AM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Orientation Session</h3>
                      <p>Detailed brief on judging criteria, submit guidelines, mentor rules, and support setup.</p>
                    </div>
                  </div>
                  <div className="timeline-item highlight">
                    <div className="time-meta">11:30 AM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Hackathon Starts! <i className="fa-solid fa-play"></i></h3>
                      <p>The 24-hour development clock officially begins. Code engines start firing!</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">01:00 PM – 02:00 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Lunch Break</h3>
                      <p>Refuel at the main dining arena.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">02:00 PM – 04:00 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Mentorship Session – I</h3>
                      <p>Industry mentors visit student desks to review architectures, logic flows, and technology selections.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">04:00 PM – 05:00 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Review Round – I</h3>
                      <p>Initial progress check. Panels of internal judges review basic UI mockups and design direction.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">05:00 PM – 07:30 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Development Sprint</h3>
                      <p>Active coding and hardware integrations.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">07:30 PM – 08:30 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Dinner</h3>
                      <p>Networking dinner at the campus courtyard.</p>
                    </div>
                  </div>
                  <div className="timeline-item highlight">
                    <div className="time-meta">08:30 PM Onwards</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Overnight Development Sprint <i className="fa-solid fa-moon"></i></h3>
                      <p>Late night coding sprint. Collaborative environments active, with tea/coffee support.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">11:00 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Tea Break</h3>
                      <p>Quick caffeine boost for the late-night warriors.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">11:30 PM Onwards</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Coding Continues</h3>
                      <p>Development rolls on through the night with dynamic tech-support on standby.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Day 2 Timeline */}
              {activeTimelineTab === "day2" && (
                <div className="timeline active" id="day2-timeline" role="tabpanel" aria-label="Day 2 Schedule">
                  <div className="timeline-item">
                    <div className="time-meta">07:00 AM – 08:00 AM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Breakfast</h3>
                      <p>Fuel up for the final push.</p>
                    </div>
                  </div>
                  <div className="timeline-item highlight">
                    <div className="time-meta">08:00 AM – 10:00 AM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Final Development & Submission</h3>
                      <p>Final testing, bug fixes, preparation of presentation slide decks, and code commit submission.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">10:00 AM – 12:00 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Project Demonstration</h3>
                      <p>Teams present interactive demos and codebases to external jury members at their booths.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">12:00 PM – 01:00 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Final Evaluation by Jury</h3>
                      <p>Jury panels review marks, deliberate top designs, and run comparative scoring audits.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">01:00 PM – 01:30 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Result Finalization</h3>
                      <p>Ranking aggregation and consolidation of official awards sheet.</p>
                    </div>
                  </div>
                  <div className="timeline-item highlight-prizes">
                    <div className="time-meta">01:30 PM – 02:30 PM</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Valedictory Ceremony & Prize Distribution <i className="fa-solid fa-award"></i></h3>
                      <p>Announcement of winners and presentation of trophies, certificates, and cash prizes.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time-meta">02:30 PM Onwards</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-info">
                      <h3>Lunch & Departure</h3>
                      <p>Post-event lunch and official check-out from Indore campus.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section id="rules" className="rules-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">Guidelines</span>
              <h2 className="section-title">Rules & Regulations</h2>
              <div className="header-bar"></div>
            </div>

            <div className="rules-grid">
              <div className="rule-card">
                <div className="rule-icon-wrapper">
                  <div className="icon-badge">
                    <i className="fa-solid fa-people-group"></i>
                  </div>
                </div>
                <h3>Team Size</h3>
                <p>Up to 4 members per team. In alignment with promoting diversity in STEM fields, <strong>at least 1 female member is compulsory</strong> in every team.</p>
              </div>
              <div className="rule-card">
                <div className="rule-icon-wrapper">
                  <div className="icon-badge">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                </div>
                <h3>Eligibility</h3>
                <p>The innovation challenge is open to students, developers, researchers, and technology enthusiasts from colleges, universities, and organizations across India.</p>
              </div>
              <div className="rule-card">
                <div className="rule-icon-wrapper">
                  <div className="icon-badge">
                    <i className="fa-solid fa-copyright"></i>
                  </div>
                </div>
                <h3>Originality</h3>
                <p>All code, design systems, APIs, and digital assets must be original or properly licensed. Any form of plagiarism or pre-built system copying will lead to disqualification.</p>
              </div>
              <div className="rule-card">
                <div className="rule-icon-wrapper">
                  <div className="icon-badge">
                    <i className="fa-solid fa-gavel"></i>
                  </div>
                </div>
                <h3>Judging Criteria</h3>
                <p>Projects will be evaluated by an esteemed panel of experts based on <strong>Innovation</strong>, <strong>Real-world Impact</strong>, <strong>Technical Feasibility</strong>, <strong>User Experience (UX)</strong>, and <strong>Pitch Presentation</strong>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="prizes-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">Rewards</span>
              <h2 className="section-title">Prizes & Pools</h2>
              <div className="header-bar"></div>
            </div>

            {/* Prize Podium Layout */}
            <div className="prize-podium">
              {/* 2nd Place */}
              <div className="podium-card silver">
                <div className="prize-trophy"><i className="fa-solid fa-award"></i></div>
                <div className="prize-place">First Runner-Up</div>
                <div className="prize-amt">Rs. 50,000</div>
                <p className="prize-desc">Awarded to the second-highest scoring team for outstanding prototype complexity and technical design.</p>
              </div>

              {/* 1st Place */}
              <div className="podium-card gold">
                <div className="prize-badge"><i className="fa-solid fa-crown"></i> CHAMPION</div>
                <div className="prize-trophy"><i className="fa-solid fa-trophy"></i></div>
                <div className="prize-place">Winner (1st Place)</div>
                <div className="prize-amt">Rs. 80,000</div>
                <p className="prize-desc">Presented to the overall winner who delivers the most innovative, viable, and stunningly executed Agentic AI solution.</p>
              </div>

              {/* 3rd Place */}
              <div className="podium-card bronze">
                <div className="prize-trophy"><i className="fa-solid fa-award"></i></div>
                <div className="prize-place">Second Runner-Up</div>
                <div className="prize-amt">Rs. 30,000</div>
                <p className="prize-desc">Awarded to the third-highest scoring team demonstrating strong UX execution and market feasibility.</p>
              </div>
            </div>

            {/* Consolation & Total Pool */}
            <div className="prize-footer-grid">
              <div className="consolation-box">
                <div className="c-icon"><i className="fa-solid fa-circle-check"></i></div>
                <div>
                  <h4>Consolation Prize</h4>
                  <p className="c-amt">Rs. 40,000</p>
                  <p className="c-details">Allocated to recognize special mentions, out-of-the-box hardware hacks, or high-potential ideas.</p>
                </div>
              </div>
              
              <div className="pool-box">
                <span className="pool-title">TOTAL PRIZE POOL</span>
                <span className="pool-amount">Rs. 2,00,000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership / Organizers Section */}
        <section id="leadership" className="leadership-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">VITM Indore</span>
              <h2 className="section-title">Organizers & Leadership</h2>
              <div className="header-bar"></div>
            </div>

            {/* Scrollable Track */}
            <div className="testimonial-carousel-wrapper">
              <div className="testimonial-carousel-track" id="testimonial-carousel-track" ref={trackRef}>
                {leaders.map((leader, index) => (
                  <div 
                    key={index}
                    className="retro-card" 
                    onClick={() => setSelectedLeader(leader)}
                  >
                    <div className="retro-card-bg"></div>
                    <div className="retro-card-content">
                      <div className="retro-avatar-wrapper">
                        <div className="retro-avatar">
                          <i className="fa-solid fa-user-tie"></i>
                        </div>
                      </div>
                      <p className="retro-desc">{leader.quote}</p>
                      <h3 className="retro-name">{leader.name}</h3>
                      <p className="retro-designation">{leader.designation}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="testimonial-carousel-controls">
                <button className="carousel-control prev" id="testi-prev" aria-label="Scroll left" onClick={() => scrollTrack("left")}>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className="carousel-control next" id="testi-next" aria-label="Scroll right" onClick={() => scrollTrack("right")}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Expand Overlay Modal */}
        {selectedLeader && (
          <div className="leader-modal show" id="leader-modal" role="dialog" aria-modal="true">
            <div className="leader-modal-backdrop" id="leader-modal-backdrop" onClick={() => setSelectedLeader(null)}></div>
            <div className="leader-modal-content">
              <button className="leader-modal-close" id="leader-modal-close" aria-label="Close details" onClick={() => setSelectedLeader(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="leader-modal-body">
                <p className="modal-designation" id="modal-designation">{selectedLeader.designation}</p>
                <h3 className="modal-name" id="modal-name">{selectedLeader.name}</h3>
                <div className="modal-quote-wrapper">
                  <i className="fa-solid fa-quote-left modal-quote-icon"></i>
                  <p className="modal-desc" id="modal-desc">{selectedLeader.desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contact" className="contact-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-tag">Get in Touch</span>
              <h2 className="section-title">Contact & Help</h2>
              <div className="header-bar"></div>
            </div>

            <div className="contact-layout">
              {/* Contact Info */}
              <div className="contact-info-card">
                <h3>Connect with Organizers</h3>
                <p>Have questions about registration details, eligibility, or local transport arrangements? Reach out via phone, email, or explore official channels.</p>
                
                <div className="contact-links">
                  <a href="tel:+918889997217" className="contact-item">
                    <span className="c-icon"><i className="fa-solid fa-phone"></i></span>
                    <div>
                      <h4>Phone (Primary Contact)</h4>
                      <p>+91 8889997217</p>
                    </div>
                  </a>
                  <a href="tel:+919926465107" className="contact-item">
                    <span className="c-icon"><i className="fa-solid fa-phone-volume"></i></span>
                    <div>
                      <h4>Phone (Alternative Contact)</h4>
                      <p>+91 9926465107</p>
                    </div>
                  </a>
                  <a href="mailto:hackathon@vitmindore.com" className="contact-item">
                    <span className="c-icon"><i className="fa-solid fa-envelope"></i></span>
                    <div>
                      <h4>Official Email</h4>
                      <p>hackathon@vitmindore.com</p>
                    </div>
                  </a>
                  <a href="https://www.vitm.edu.in/" target="_blank" rel="noopener noreferrer" className="contact-item">
                    <span className="c-icon"><i className="fa-solid fa-globe"></i></span>
                    <div>
                      <h4>Official Website</h4>
                      <p>https://www.vitm.edu.in/</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="contact-form-card">
                <h3>Inquire Online</h3>
                <form id="contact-form" onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for reaching out! We will contact you soon.");
                  (e.target as HTMLFormElement).reset();
                }}>
                  <div className="form-group">
                    <label htmlFor="form-name">Full Name</label>
                    <input type="text" id="form-name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email">Email Address</label>
                    <input type="email" id="form-email" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-msg">Your Message</label>
                    <textarea id="form-msg" rows={4} placeholder="How can we assist you with INNOVIK 6.0?" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary ripple form-btn">Send Message <i className="fa-solid fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="logo-accent">INNOVIK</span> 6.0
            </a>
            <p>Organized by Vikrant Institute of Technology & Management (VITM), Indore. Fostering future solutions using Agentic AI and Intelligent Systems.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/vikrant.institutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://www.instagram.com/vikrant.indore/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://www.vitm.edu.in/" target="_blank" rel="noopener noreferrer" aria-label="VITM Portal"><i className="fa-solid fa-building-columns"></i></a>
            </div>
          </div>
          
          <div className="footer-quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#problems">Problem Statements</a></li>
              <li><a href="#schedule">Timeline</a></li>
              <li><a href="#rules">Rules</a></li>
              <li><a href="#prizes">Prizes</a></li>
            </ul>
          </div>

          <div className="footer-meta">
            <h3>Details</h3>
            <p><strong>Venue:</strong> Indore Campus, Vikrant Institute of Technology & Management, Indore</p>
            <p><strong>Official Forms:</strong> <a href="https://forms.gle/nBespXoUn4PGBpcW9" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "underline" }}>Registration Link</a></p>
            <p><strong>Dates:</strong> 15–16 September 2026</p>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>&copy; 2026 Vikrant Institute of Technology & Management (VITM), Indore. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          id="back-to-top" 
          aria-label="Back to top" 
          title="Scroll to top" 
          style={{ display: "block" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}
