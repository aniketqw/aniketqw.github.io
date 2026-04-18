const { useState } = React;

// ──────────── Nav ────────────
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo"><span className="grad-text">AS</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#" className="btn-resume">Resume</a></li>
        </ul>
      </div>
    </header>
  );
}

// ──────────── Hero ────────────
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-glow" />
      <div className="hero-inner">
        <h1 className="h-hero">Hi, I'm <span className="grad-text">Aniket</span></h1>
        <p className="hero-sub">AI Engineer &amp; Full-Stack Developer crafting intelligent solutions</p>
        <div className="hero-ctas">
          <a className="btn-primary btn-glow" href="#projects">View My Work</a>
          <a className="btn-ghost" href="#contact">Get In Touch</a>
        </div>
      </div>
      <div className="scroll-indicator"><div className="scroll-dot"/></div>
    </section>
  );
}

// ──────────── About ────────────
function AboutSection() {
  const stats = [
    { v: 3, l: 'Projects Completed' },
    { v: 1, l: 'Years Experience' },
    { v: 15, l: 'Technologies' },
    { v: 6, l: 'Certifications' },
  ];
  return (
    <section id="about" className="section">
      <div className="container-md">
        <h2 className="h2">About <span className="grad-text">Me</span></h2>
        <div className="about-grid">
          <div>
            <p className="body-lg">I'm a passionate AI and ML enthusiast with a strong foundation in computer science and hands-on experience in developing intelligent systems. Currently pursuing my B.Tech at VIT, I specialize in NLP, deep learning, and full-stack development.</p>
            <p className="body-lg">My journey in tech has been driven by curiosity and a desire to solve complex problems. From building personalized AI wellness platforms to developing real-time multiplayer applications, I enjoy creating solutions that make a meaningful impact.</p>
            <div className="tag-row">
              {['Python','Machine Learning','Full-Stack','Cloud'].map(t => <span key={t} className="chip-dark">{t}</span>)}
            </div>
          </div>
          <div className="portrait">
            <div className="portrait-glow" />
            <div className="portrait-img">AS</div>
          </div>
        </div>
        <div className="stats">
          {stats.map(s => (
            <div key={s.l} className="stat">
              <div className="stat-num grad-text">{s.v}</div>
              <p className="stat-lbl">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, AboutSection });
