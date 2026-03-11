# Projects Section

This directory contains the projects showcase page built with **Bootstrap 5** and **GitHub API integration**.

## Structure

```
projects/
├── index.html          # Main projects page
├── css/
│   └── projects.css    # Custom theme overrides for Bootstrap
├── js/
│   └── carousel.js     # GitHub API loader and carousel builder
└── README.md           # This file
```

## Features

- **Bootstrap 5 Framework**: Professional, production-ready components
- **GitHub API Integration**: Automatically fetches your public repositories
- **Dynamic Carousels**: Auto-populated based on repository topics
- **Real Data**: Shows stars, forks, languages, and descriptions from GitHub
- **No Backend Required**: 100% client-side JavaScript
- **Auto-Updates**: Always shows your latest projects

## How It Works

### 1. Tag Your GitHub Repositories

Add topics to your GitHub repositories to categorize them:

**Production Projects:**
- Add topic: `portfelio-prod`
- Will appear in the 🚀 Production carousel
- Shows stars, forks, and link to project

**Development Projects:**
- Add topic: `portfelio-dev`  
- Will appear in the ⚙️ Development carousel
- Shows progress bar and completion status

**Backlog Projects:**
- Add topic: `portfelio-backlog`
- Will appear in the 📋 Backlog carousel
- Shows "Planned" badge

**University Projects:**
- Add topic: `portfelio-uni`
- Will appear in the 🎓 University carousel
- Shows university project indicator

### 2. Add Technology Tags

Add additional topics for technologies used (optional):
- `javascript`, `python`, `react`, `vue`, etc.
- First 3 topics (excluding portfolio-*) will show as tech badges
- If no topics, shows primary language instead

### 3. How to Add Topics to a Repo

On GitHub:
1. Go to your repository
2. Click the ⚙️ gear icon next to "About"
3. Add topics in the "Topics" field
4. Examples:
   - Production: `portfelio-prod`, `javascript`, `react`, `nodejs`
   - University: `portfelio-uni`, `python`, `machine-learning`

## API Details

- **Endpoint**: `https://api.github.com/users/felixmielcarek/repos`
- **Rate Limit**: 60 requests/hour (unauthenticated)
- **Data Fetched**: Name, description, topics, language, stars, forks, URL
- **Sorted By**: Recently updated repos first

## Customization

### Change GitHub Username

Edit `js/carousel.js`:
```javascript
const GITHUB_USERNAME = 'your-username';
```

### Change Topic Names

Edit `js/carousel.js`:
```javascript
const TOPICS = {
    production: 'your-production-topic',
    dev: 'your-dev-topic',
    backlog: 'your-backlog-topic'
};
```

### Adjust Cards Per Slide

Currently shows 3 cards per carousel slide. To change, modify the grouping logic in `populateCarousel()`:
```javascript
for (let i = 0; i < repos.length; i += 3) { // Change 3 to desired number
```

## Bootstrap Components Available

With Bootstrap 5 loaded, you can use any Bootstrap component:
- Modals, Tooltips, Popovers
- Tabs, Accordion
- Forms, Buttons
- Navbar, Dropdowns
- And 30+ more components

See [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/) for full component list.

## Troubleshooting

**No projects showing?**
- Check browser console for errors
- Verify GitHub username is correct
- Ensure repos have the correct topics
- Check GitHub API rate limit (60/hour)

**Loading spinner stuck?**
- Check browser console for API errors
- Verify internet connection
- GitHub API might be down (check status.github.com)

**Empty carousel?**
- No repositories have the required topic
- Add topics to your repos on GitHub
- Wait a few seconds and refresh
