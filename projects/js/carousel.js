/**
 * GitHub Repository Carousel Loader
 * Fetches public repositories and populates carousels based on topics
 *
 * Topics used:
 * - portfelio-prod: Live/production projects
 * - portfelio-dev: In-development projects
 * - portfelio-backlog: Planned/backlog projects
 * 
 * Caching: 
 * - Uses localStorage to cache ONLY portfolio repos (saves memory)
 * - Cache valid for 24 hours
 * - Filters at API fetch time, not at cache time
 */

const GITHUB_USERNAME = "felixmielcarek";
const TOPICS = {
  production: "portfelio-prod",
  dev: "portfelio-dev",
  backlog: "portfelio-backlog",
  university: "portfelio-uni",
};

const CACHE_KEY = 'github_repos_cache';
const CACHE_TIMESTAMP_KEY = 'github_repos_cache_timestamp';
const CACHE_VERSION_KEY = 'github_repos_cache_version';
const CACHE_VERSION = '2'; // Increment to invalidate old caches
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

class GitHubCarouselLoader {
  constructor(username) {
    this.username = username;
    this.repos = [];
    console.log('🚀 GitHubCarouselLoader initialized for user:', username);
  }

  // Check if cache is valid (less than 24 hours old)
  isCacheValid() {
    console.log('🔍 Checking cache validity...');
    
    // Check version first
    const version = localStorage.getItem(CACHE_VERSION_KEY);
    
    // If version exists and doesn't match, invalidate cache
    if (version !== null && version !== CACHE_VERSION) {
      console.log(`🔄 Cache version mismatch (${version} !== ${CACHE_VERSION}), invalidating...`);
      this.clearCache();
      return false;
    }
    
    // If version is null, it means first time or old cache without version
    if (version === null) {
      console.log('ℹ️ No cache version found (first time or old cache)');
      const hasCache = localStorage.getItem(CACHE_KEY) !== null;
      if (hasCache) {
        console.log('🔄 Clearing old cache (no version)...');
        this.clearCache();
      }
      return false;
    }
    
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!timestamp) {
      console.log('❌ No cache timestamp found');
      return false;
    }

    const cacheAge = Date.now() - parseInt(timestamp);
    const isValid = cacheAge < CACHE_DURATION;
    const hoursOld = (cacheAge / (60 * 60 * 1000)).toFixed(1);
    
    console.log(`📅 Cache age: ${hoursOld} hours (Valid: ${isValid})`);
    return isValid;
  }

  // Clear cache
  clearCache() {
    console.log('🗑️ Clearing old cache...');
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    localStorage.removeItem(CACHE_VERSION_KEY);
  }

  // Get cached repositories data
  getCachedRepos() {
    console.log('📦 Attempting to load from cache...');
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const repos = JSON.parse(cached);
        const sizeKB = (cached.length / 1024).toFixed(2);
        console.log(`✅ Loaded ${repos.length} portfolio repositories from cache (${sizeKB} KB)`);
        return repos;
      }
      console.log('❌ No cached data found');
      return null;
    } catch (error) {
      console.error('❌ Error reading cache:', error);
      return null;
    }
  }

  // Save repositories to cache
  saveToCache(repos) {
    console.log(`💾 Saving ${repos.length} portfolio repositories to cache...`);
    try {
      const dataStr = JSON.stringify(repos);
      const sizeKB = (dataStr.length / 1024).toFixed(2);
      
      localStorage.setItem(CACHE_KEY, dataStr);
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);
      
      console.log(`✅ Cache saved successfully (${sizeKB} KB, version ${CACHE_VERSION})`);
    } catch (error) {
      console.error('❌ Error saving to cache:', error);
      if (error.name === 'QuotaExceededError') {
        console.error('⚠️ localStorage quota exceeded. Cache not saved.');
      }
    }
  }

  async fetchRepositories() {
    console.log('🌐 Starting repository fetch...');
    
    // Check cache first
    if (this.isCacheValid()) {
      const cached = this.getCachedRepos();
      if (cached) {
        console.log('⚡ Using cached data (no API call needed)');
        this.repos = cached;
        return this.repos;
      }
    }

    console.log('📡 Fetching fresh data from GitHub API...');
    console.log(`URL: https://api.github.com/users/${this.username}/repos`);
    
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.username}/repos?per_page=100&sort=updated`,
      );

      console.log(`📊 API Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const allRepos = await response.json();
      console.log(`✅ Fetched ${allRepos.length} repositories from GitHub`);
      
      // Filter to only keep repos with portfolio topics
      this.repos = allRepos.filter(repo => 
        repo.topics && repo.topics.some(topic => 
          topic === TOPICS.production || 
          topic === TOPICS.dev || 
          topic === TOPICS.backlog ||
          topic === TOPICS.university
        )
      );
      
      console.log(`🎯 Filtered to ${this.repos.length} portfolio repos (saved ${allRepos.length - this.repos.length} from cache)`);
      
      // Log first few repo names for debugging
      if (this.repos.length > 0) {
        console.log('📋 Portfolio repos:', this.repos.map(r => r.name));
      }

      // Save only filtered repos to cache
      this.saveToCache(this.repos);
      
      return this.repos;
    } catch (error) {
      console.error('❌ Error fetching repositories:', error);
      this.showError();
      return [];
    }
  }

  filterByTopic(topic) {
    console.log(`🔍 Filtering ${this.repos.length} portfolio repos by topic: "${topic}"`);
    
    const filtered = this.repos.filter(
      (repo) => {
        const hasTopics = repo.topics && repo.topics.includes(topic);
        if (hasTopics) {
          console.log(`  ✓ Found: ${repo.name} (topics: ${repo.topics.join(', ')})`);
        }
        return hasTopics;
      }
    );
    
    console.log(`📊 Found ${filtered.length} repos with topic "${topic}"`);
    
    // If no repos found, log all available topics for debugging
    if (filtered.length === 0 && this.repos.length > 0) {
      console.log('💡 Available topics in cached portfolio repos:');
      const allTopics = new Set();
      this.repos.forEach(repo => {
        if (repo.topics) {
          repo.topics.forEach(topic => allTopics.add(topic));
        }
      });
      console.log('  ', Array.from(allTopics).sort().join(', '));
    }
    
    return filtered;
  }

  createProjectCard(repo, type) {
    const card = document.createElement("div");
    card.className = "col-md-4";

    // Extract languages from repo (primary language)
    const language = repo.language || "N/A";

    // Create badges from topics (exclude portfolio- topics)
    const techTopics = repo.topics.filter(
      (topic) => !topic.startsWith("portfelio-"),
    );
    const badges = techTopics
      .slice(0, 3)
      .map(
        (topic) =>
          `<span class="badge bg-secondary me-1">${this.capitalize(topic)}</span>`,
      )
      .join("");

    // Build card based on type
    let extraContent = "";
    if (type === "university") {
      extraContent = `
                <div class="d-flex gap-3 mb-2">
                    <small class="text-muted">Created: ${new Date(repo.created_at).toLocaleDateString()}</small>
                </div>
                <a href="${repo.html_url}" target="_blank" class="text-decoration-none">View Project →</a>
            `;
    } else if (type === "production") {
      extraContent = `
                <div class="d-flex gap-3 mb-2">
                    <small class="text-muted">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</small>
                </div>
                <a href="${repo.html_url}" target="_blank" class="text-decoration-none">View Project →</a>
            `;
    } else if (type === "dev") {
      extraContent = `
                <div class="d-flex gap-3 mb-2">
                    <small class="text-muted">🐛 ${repo.open_issues_count} open issues</small>
                </div>
                <a href="${repo.html_url}" target="_blank" class="text-decoration-none">View on GitHub →</a>
            `;
    } else if (type === "backlog") {
      extraContent = `
                <div class="d-flex gap-3 mb-2">
                    <small class="text-muted">⭐ ${repo.stargazers_count}</small>
                    <small class="text-muted">👁️ ${repo.watchers_count}</small>
                </div>
                <a href="${repo.html_url}" target="_blank" class="text-decoration-none small">View on GitHub →</a>
            `;
    }

    card.innerHTML = `
            <div class="card project-card h-100">
                <div class="card-body">
                    <h3 class="card-title">${repo.name}</h3>
                    <p class="card-text">${repo.description || "No description available"}</p>
                    <div class="mb-3">
                        ${badges || `<span class="badge bg-secondary">${language}</span>`}
                    </div>
                    ${extraContent}
                </div>
            </div>
        `;

    return card;
  }

  capitalize(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  populateCarousel(carouselId, repos, type) {
    console.log(`🎠 Populating ${carouselId} with ${repos.length} repos`);
    
    const carousel = document.getElementById(carouselId);
    if (!carousel) {
      console.error(`❌ Carousel not found: ${carouselId}`);
      return;
    }

    const carouselInner = carousel.querySelector(".carousel-inner");
    carouselInner.innerHTML = "";

    if (repos.length === 0) {
      console.log(`⚠️ No repos for ${type}, showing empty state`);
      this.showEmptyState(carouselInner, type);
      return;
    }

    // Group repos into slides (3 per slide)
    const slidesData = [];
    for (let i = 0; i < repos.length; i += 3) {
      slidesData.push(repos.slice(i, i + 3));
    }

    console.log(`  Creating ${slidesData.length} slides`);

    // Create carousel items
    slidesData.forEach((slideRepos, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item${index === 0 ? " active" : ""}`;

      const row = document.createElement("div");
      row.className = "row g-4";

      slideRepos.forEach((repo) => {
        row.appendChild(this.createProjectCard(repo, type));
      });

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    });

    // Hide carousel controls if only one slide
    if (slidesData.length <= 1) {
      const prevBtn = carousel.querySelector(".carousel-control-prev");
      const nextBtn = carousel.querySelector(".carousel-control-next");
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
    }
    
    console.log(`✅ ${carouselId} populated successfully`);
  }

  showEmptyState(container, type) {
    const typeNames = {
      production: "production",
      dev: "development",
      backlog: "backlog",
      university: "university",
    };

    container.innerHTML = `
            <div class="carousel-item active">
                <div class="text-center py-5">
                    <p class="text-muted">No ${typeNames[type]} projects yet.</p>
                    <small class="text-muted">
                        Add the topic <code>${TOPICS[type]}</code> to your GitHub repositories to display them here.
                    </small>
                </div>
            </div>
        `;
  }

  showError() {
    console.error('⛔ Showing error state');
    const sections = document.querySelectorAll(".carousel-container");
    sections.forEach((section) => {
      const inner = section.querySelector(".carousel-inner");
      if (inner) {
        inner.innerHTML = `
                    <div class="carousel-item active">
                        <div class="text-center py-5">
                            <p class="text-danger">Failed to load projects from GitHub.</p>
                            <small class="text-muted">Please try again later or check the browser console.</small>
                        </div>
                    </div>
                `;
      }
    });
  }

  showLoading() {
    console.log('⏳ Showing loading state');
    const sections = document.querySelectorAll(".carousel-inner");
    sections.forEach((inner) => {
      inner.innerHTML = `
                <div class="carousel-item active">
                    <div class="text-center py-5">
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="text-muted mt-3">Loading projects from GitHub...</p>
                    </div>
                </div>
            `;
    });
  }

  async init() {
    console.log('═══════════════════════════════════════');
    console.log('🎯 Starting GitHub Carousel Loader');
    console.log('═══════════════════════════════════════');
    
    this.showLoading();

    await this.fetchRepositories();

    console.log('\n📊 Filtering repositories by topics...');
    // Filter and populate each carousel
    const prodRepos = this.filterByTopic(TOPICS.production);
    const devRepos = this.filterByTopic(TOPICS.dev);
    const backlogRepos = this.filterByTopic(TOPICS.backlog);
    const uniRepos = this.filterByTopic(TOPICS.university);

    console.log('\n🎨 Populating carousels...');
    this.populateCarousel("prodCarousel", prodRepos, "production");
    this.populateCarousel("devCarousel", devRepos, "dev");
    this.populateCarousel("backlogCarousel", backlogRepos, "backlog");
    this.populateCarousel("uniCarousel", uniRepos, "university");

    console.log('\n═══════════════════════════════════════');
    console.log(`✅ Loaded ${this.repos.length} portfolio repositories`);
    console.log(`📦 Production: ${prodRepos.length} | Dev: ${devRepos.length} | Backlog: ${backlogRepos.length} | University: ${uniRepos.length}`);
    
    // Show cache info
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const cacheSize = (cachedData.length / 1024).toFixed(2);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      const cacheAge = timestamp ? ((Date.now() - parseInt(timestamp)) / (60 * 60 * 1000)).toFixed(1) : 'unknown';
      console.log(`💾 Cache: ${cacheSize} KB (${cacheAge} hours old)`);
    }
    
    console.log('═══════════════════════════════════════\n');
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log('📄 DOM loaded, initializing carousel loader...');
  const loader = new GitHubCarouselLoader(GITHUB_USERNAME);
  loader.init();
});
