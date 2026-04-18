const { useState, useMemo } = React;

const LANG_COLORS = { Python:'#3572A5', JavaScript:'#f1e05a', TypeScript:'#2b7489', Java:'#b07219', 'C++':'#f34b7d', HTML:'#e34c26' };

const FAKE_REPOS = [
  { id: 1, name: 'EmotionKeyFacialPointDetection', description: 'Used CNN and ResNet to detect key facial points.', language: 'Python', stars: 4, category: 'ai', topics: ['cnn','resnet','cv'] },
  { id: 2, name: 'websocket_mcqs1', description: 'WebSocket-powered multiplayer quiz platform.', language: 'JavaScript', stars: 2, category: 'web', topics: ['websocket','react','mongodb'] },
  { id: 3, name: 'Chronos', description: 'Time-series forecasting with transformer backbone.', language: 'Python', stars: 1, category: 'ai', topics: ['ml','forecasting'] },
  { id: 4, name: 'GithubRepoAnalyzer', description: 'Analyze any repo with AI-powered NL search.', language: 'JavaScript', stars: 5, category: 'web', topics: ['react','docker','ai'] },
  { id: 5, name: 'ragBotn', description: 'RAG-based chatbot experiments.', language: 'Python', stars: 0, category: 'ai', topics: ['rag','langchain'] },
  { id: 6, name: 'AgenticAIWorkshop', description: 'Creative tasks from the Agentic AI workshop.', language: 'Python', stars: 0, category: 'ai', topics: ['agentic'] },
  { id: 7, name: 'Booking-System', description: 'Spring Boot booking API.', language: 'Java', stars: 0, category: 'web', topics: ['spring','java'] },
  { id: 8, name: 'DSA_daily_Code', description: 'Daily DSA practice.', language: 'C++', stars: 0, category: 'other', topics: ['dsa'] },
];

function Sidebar({ stats, onFetch, fetched }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header"><div className="logo">Portfolio <span>Admin</span></div></div>
      <div className="token-box">
        <div className="token-label">GitHub Username</div>
        <input className="token-input" defaultValue="aniketqw" />
      </div>
      <div className="token-box">
        <div className="token-label">Personal Access Token (optional)</div>
        <input className="token-input" type="password" placeholder="ghp_..." />
      </div>
      <button className="fetch-btn" onClick={onFetch}>{fetched ? 'Refresh Repos' : 'Fetch My Repos'}</button>
      {fetched && (
        <div className="sidebar-section">
          <div className="section-title">Summary</div>
          <div className="stat-row"><span className="stat-label">Total repos</span><span className="stat-val">{stats.total}</span></div>
          <div className="stat-row"><span className="stat-label">Pinned</span><span className="stat-val amber">{stats.pinned}</span></div>
          <div className="stat-row"><span className="stat-label">Included</span><span className="stat-val green">{stats.included}</span></div>
          <div className="stat-row"><span className="stat-label">Excluded</span><span className="stat-val red">{stats.excluded}</span></div>
        </div>
      )}
      <div className="legend">
        <div className="section-title">Legend</div>
        <div className="legend-item"><span className="dot pinned"/>Pinned — shown first, featured badge</div>
        <div className="legend-item"><span className="dot included"/>Included — appears in projects list</div>
        <div className="legend-item"><span className="dot excluded"/>Excluded — hidden from portfolio</div>
      </div>
    </aside>
  );
}

function RepoCard({ r, pinned, excluded, onPin, onExcl }) {
  const cls = excluded ? 'excluded' : pinned ? 'pinned' : 'included';
  return (
    <div className={`repo-card ${cls}`}>
      <div className="card-actions">
        <button className={`action-btn pin-btn ${pinned ? 'active' : ''}`} onClick={() => onPin(r.id)}>★ Pin</button>
        <button className={`action-btn excl-btn ${excluded ? 'active' : ''}`} onClick={() => onExcl(r.id)}>✕</button>
      </div>
      <div className="card-header">
        <span className="card-icon">📦</span>
        <div className="card-name">{r.name}</div>
      </div>
      <div className="card-desc">{r.description}</div>
      <div className="card-meta">
        <span className="meta-item"><span className="lang-dot" style={{ background: LANG_COLORS[r.language] || '#666' }} />{r.language}</span>
        {r.stars > 0 && <span className="meta-item">★ {r.stars}</span>}
      </div>
      <div className="topic-chips">{r.topics.slice(0, 3).map(t => <span key={t} className="chip">{t}</span>)}</div>
    </div>
  );
}

function App() {
  const [fetched, setFetched] = useState(false);
  const [pinned, setPinned] = useState(new Set([1, 4]));
  const [excluded, setExcluded] = useState(new Set([8]));
  const [filter, setFilter] = useState('all');

  const repos = fetched ? FAKE_REPOS : [];
  const shown = useMemo(() => {
    return repos.filter(r => {
      if (filter === 'all') return !excluded.has(r.id);
      if (filter === 'pinned') return pinned.has(r.id);
      if (filter === 'excluded') return excluded.has(r.id);
      return r.category === filter && !excluded.has(r.id);
    });
  }, [repos, filter, pinned, excluded]);

  const stats = {
    total: repos.length,
    pinned: pinned.size,
    excluded: excluded.size,
    included: repos.length - excluded.size,
  };

  const togglePin = id => setPinned(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleExcl = id => setExcluded(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const json = JSON.stringify({
    generated_at: new Date().toISOString(),
    projects: repos.filter(r => !excluded.has(r.id)).map(r => ({
      id: r.name.toLowerCase(), title: r.name, category: r.category,
      status: 'Live', featured: pinned.has(r.id), stars: r.stars,
      tags: r.topics, description: r.description,
    })),
  }, null, 2);

  return (
    <div className="shell">
      <Sidebar stats={stats} onFetch={() => setFetched(true)} fetched={fetched} />
      <main className="main">
        <div className="toolbar">
          <div className="toolbar-title">Repo Manager</div>
          {fetched && <>
            <input className="search-input" placeholder="Search repos…" />
            <button className="export-btn">↓ Export projects_config.json</button>
          </>}
        </div>
        {fetched && (
          <div className="filter-row">
            {[{ id:'all',l:'All' },{ id:'ai',l:'AI / ML' },{ id:'web',l:'Web Dev' },{ id:'other',l:'Other' },{ id:'pinned',l:'★ Pinned' },{ id:'excluded',l:'✕ Excluded' }].map(f =>
              <button key={f.id} className={`filter-btn ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>{f.l}</button>
            )}
          </div>
        )}
        {!fetched ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-msg">Enter your username and fetch repos</div>
            <div className="empty-sub">Then pin the ones you want featured and exclude the rest</div>
          </div>
        ) : (
          <>
            <div className="repo-grid">
              {shown.map(r => <RepoCard key={r.id} r={r} pinned={pinned.has(r.id)} excluded={excluded.has(r.id)} onPin={togglePin} onExcl={toggleExcl} />)}
            </div>
            <div className="output-panel">
              <div className="output-header">
                <span className="output-title mono">projects_config.json — copy → commit to your repo</span>
                <button className="copy-btn">Copy JSON</button>
              </div>
              <pre className="output-pre">{json}</pre>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
