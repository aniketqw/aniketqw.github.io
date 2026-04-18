"""
fetch_repos.py
--------------
Fetches all public repos for GITHUB_USERNAME, filters them using
projects_config.json (which you control), then writes projects.json
that the portfolio HTML reads from.
"""

import os
import json
import requests
from datetime import datetime

GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "aniketqw")
GITHUB_TOKEN    = os.environ.get("GITHUB_TOKEN", "")
CONFIG_FILE     = "projects_config.json"
OUTPUT_FILE     = "projects.json"

HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}
if GITHUB_TOKEN:
    HEADERS["Authorization"] = f"Bearer {GITHUB_TOKEN}"

# ── Category heuristics ──────────────────────────────────────────────────────
AI_KEYWORDS  = {"ml", "ai", "nlp", "deep", "learning", "neural", "cv",
                 "vision", "llm", "torch", "tensorflow", "model", "detect"}
WEB_KEYWORDS = {"web", "react", "node", "flask", "django", "next", "api",
                 "frontend", "backend", "full", "stack", "express"}

def guess_category(repo: dict) -> str:
    text = " ".join(filter(None, [
        repo.get("name", ""),
        repo.get("description", ""),
        " ".join(repo.get("topics", [])),
    ])).lower()
    words = set(text.split())
    if words & AI_KEYWORDS:
        return "ai"
    if words & WEB_KEYWORDS:
        return "web"
    return "other"

def guess_status(repo: dict) -> str:
    topics = [t.lower() for t in repo.get("topics", [])]
    if "live" in topics or "production" in topics:
        return "Live"
    if repo.get("homepage"):
        return "Live"
    return "Demo"

# ── Load config ───────────────────────────────────────────────────────────────
def load_config() -> dict:
    """
    projects_config.json structure:
    {
      "pinned":    ["repo-name", ...],   // always include, show first
      "excluded":  ["repo-name", ...],   // never include
      "overrides": {                     // per-repo manual overrides
        "repo-name": {
          "title":       "Custom Title",
          "description": "Custom desc",
          "category":    "ai",
          "status":      "Live",
          "image":       "images/custom.png"
        }
      }
    }
    """
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE) as f:
            return json.load(f)
    return {"pinned": [], "excluded": [], "overrides": {}}

# ── Fetch repos ───────────────────────────────────────────────────────────────
def fetch_all_repos() -> list[dict]:
    repos, page = [], 1
    while True:
        url = (
            f"https://api.github.com/users/{GITHUB_USERNAME}/repos"
            f"?per_page=100&page={page}&sort=updated"
        )
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        batch = resp.json()
        if not batch:
            break
        repos.extend(batch)
        page += 1
    return repos

# ── Build project entry ───────────────────────────────────────────────────────
def repo_to_project(repo: dict, config: dict, is_pinned: bool) -> dict:
    name      = repo["name"]
    overrides = config.get("overrides", {}).get(name, {})

    # Prefer HuggingFace / homepage over GitHub link for demo projects
    demo_link = repo.get("homepage") or repo["html_url"]

    return {
        "id":          name,
        "title":       overrides.get("title",       repo.get("name", "").replace("-", " ").title()),
        "description": overrides.get("description", repo.get("description") or "No description provided."),
        "image":       overrides.get("image",       ""),  # portfolio admin can set this
        "link":        demo_link,
        "github":      repo["html_url"],
        "status":      overrides.get("status",   guess_status(repo)),
        "category":    overrides.get("category", guess_category(repo)),
        "tags":        overrides.get("tags",     repo.get("topics", [])[:4]) or ["Code"],
        "stars":       repo.get("stargazers_count", 0),
        "forks":       repo.get("forks_count", 0),
        "language":    repo.get("language") or "",
        "featured":    is_pinned,
        "updated_at":  repo.get("updated_at", ""),
    }

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print(f"Fetching repos for @{GITHUB_USERNAME}…")
    config   = load_config()
    excluded = set(config.get("excluded", []))
    pinned   = config.get("pinned", [])
    pinned_set = set(pinned)

    all_repos = fetch_all_repos()
    print(f"  Found {len(all_repos)} public repos")

    # Filter
    filtered = [r for r in all_repos
                if not r.get("fork")          # skip forks
                and r["name"] not in excluded  # skip excluded
                and not r.get("archived")]     # skip archived

    # Sort: pinned first (in config order), then by stars desc
    pinned_repos  = []
    for p in pinned:
        match = next((r for r in filtered if r["name"] == p), None)
        if match:
            pinned_repos.append(match)

    rest = sorted(
        [r for r in filtered if r["name"] not in pinned_set],
        key=lambda r: r.get("stargazers_count", 0),
        reverse=True
    )

    ordered = pinned_repos + rest

    projects = [
        repo_to_project(r, config, r["name"] in pinned_set)
        for r in ordered
    ]

    output = {
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "username":     GITHUB_USERNAME,
        "total":        len(projects),
        "projects":     projects,
    }

    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f, indent=2)

    print(f"  Written {len(projects)} projects → {OUTPUT_FILE}")
    for p in projects[:5]:
        print(f"    {'★' if p['featured'] else ' '} {p['id']} [{p['category']}]")
    if len(projects) > 5:
        print(f"    … and {len(projects) - 5} more")

if __name__ == "__main__":
    main()
