const { useState, useMemo } = React;

const STATUS_CLS = {
  Live: 'status-live',
  Demo: 'status-demo',
  Beta: 'status-beta',
};
const TAG_CLS = ['tag-blue','tag-purple','tag-green','tag-yellow','tag-red'];

// ──────────── Project Card ────────────
function ProjectCard({ p, i }) {
  const tags = (p.tags || []).slice(0, 4);
  return (
    <article className={`project-card ${p.featured ? 'featured' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
      {p.featured && <span className="badge-featured">Featured</span>}
      <div className="project-thumb" style={{ background: p.thumb }}>
        <div className="thumb-title">{p.title[0]}</div>
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <h3 className="card-title">{p.title}</h3>
          <span className={`status-pill ${STATUS_CLS[p.status] || ''}`}>{p.status}</span>
        </div>
        <p className="project-desc">{p.description}</p>
        <div className="tag-row">
          {tags.map((t, j) => <span key={t} className={`chip-xs ${TAG_CLS[j % TAG_CLS.length]}`}>{t}</span>)}
        </div>
        <div className="project-footer">
          <a className="link-blue" href="#">View Project <span className="arrow">→</span></a>
          {p.github && <a className="link-muted" href="#">Code</a>}
        </div>
      </div>
    </article>
  );
}

// ──────────── Projects Section ────────────
function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('all');
  const shown = useMemo(() => {
    const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return filter === 'all' ? sorted : sorted.filter(p => p.category === filter);
  }, [filter, projects]);

  const filters = [
    { id: 'all', l: 'All Projects' },
    { id: 'ai', l: 'AI/ML' },
    { id: 'web', l: 'Web Dev' },
    { id: 'other', l: 'Other' },
  ];

  return (
    <section id="projects" className="section">
      <div className="container-lg">
        <h2 className="h2">Featured <span className="grad-text">Projects</span></h2>
        <p className="section-sub">Explore my latest work in AI, machine learning, and full-stack development</p>
        <p className="mono-meta">Auto-synced from GitHub · last updated 18 Apr 2026</p>

        <div className="filter-row">
          {filters.map(f => (
            <button key={f.id}
              className={`filter-pill ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}>
              {f.l}
            </button>
          ))}
        </div>

        {shown.length ? (
          <div className="project-grid">
            {shown.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        ) : (
          <div className="empty-state">No projects in this category yet.</div>
        )}
      </div>
    </section>
  );
}

// ──────────── Experience ────────────
function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container-md">
        <h2 className="h2">Experience</h2>
        <article className="exp-card">
          <div className="exp-head">
            <div>
              <h3 className="h3">Lead AI Engineer</h3>
              <p className="link-blue-text">DailyWellness AI</p>
            </div>
            <p className="meta-date">Nov 2024 – Feb 2025</p>
          </div>
          <ul className="exp-list">
            <li><span className="triangle">▸</span> Designed and deployed AI models including ML, DL, and NLP systems for personalized wellness recommendations</li>
            <li><span className="triangle">▸</span> Led technical roadmap development and maintained code quality standards through reviews</li>
            <li><span className="triangle">▸</span> Optimized models for scalability achieving 40% performance improvement in production</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

// ──────────── Skills ────────────
function SkillsSection() {
  const groups = [
    { head: 'Languages', color: 'blue',   items: ['Python','JavaScript','Java','C++','C'] },
    { head: 'AI/ML',     color: 'purple', items: ['TensorFlow','PyTorch','NLP','Deep Learning','Computer Vision'] },
    { head: 'Web & Cloud', color: 'green', items: ['React','Node.js','MongoDB','AWS','Docker'] },
  ];
  return (
    <section id="skills" className="section">
      <div className="container-md">
        <h2 className="h2">Skills &amp; Technologies</h2>
        <div className="skills-grid">
          {groups.map(g => (
            <div key={g.head} className="skill-card">
              <h3 className={`skill-head color-${g.color}`}>{g.head}</h3>
              <div className="tag-row">
                {g.items.map(i => <span key={i} className="chip-dark">{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProjectCard, ProjectsSection, ExperienceSection, SkillsSection });
