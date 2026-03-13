# GitHub Projects Setup Guide

Your portfolio now automatically fetches projects from GitHub! Here's how to set it up.

## 🏷️ How to Tag Your Repositories

### Step 1: Choose a Repository

Go to any of your public repositories on GitHub.

### Step 2: Add Topics

1. On the repository page, find the "About" section (top right)
2. Click the ⚙️ **gear icon** next to "About"
3. In the "Topics" field, add relevant topics

### Step 3: Add Portfolio Topics

Add **ONE** of these topics to categorize your project:

| Topic | Where it appears | When to use |
|-------|-----------------|-------------|
| `portfelio-prod` | 🚀 Production carousel | Live, deployed projects |
| `portfelio-dev` | ⚙️ Development carousel | Projects actively in development |
| `portfelio-backlog` | 📋 Backlog carousel | Planned or future projects |
| `portfelio-uni` | 🎓 University carousel | Academic university projects |

### Step 4: Add Technology Topics (Optional)

Add additional topics for technologies:
- `javascript`, `python`, `react`, `vue`, `nodejs`, etc.
- First 3 will show as badges on your project card
- Use lowercase and hyphens (e.g., `machine-learning`)

## 📋 Example Setup

**For a production React app:**
```
Topics: portfelio-prod, javascript, react, nodejs, mongodb
```

**For a Python project in development:**
```
Topics: portfelio-dev, python, flask, postgresql
```

**For a planned mobile app:**
```
Topics: portfelio-backlog, react-native, typescript, firebase
```

**For a university project:**
```
Topics: portfelio-uni, python, machine-learning, data-science
```

## ✅ Complete Example

Let's say you have a weather app that's live:

1. Go to: `github.com/felixmielcarek/weather-app`
2. Click ⚙️ next to "About"
3. Add topics: `portfelio-prod`, `javascript`, `react`, `api`
4. Save

Your project will now automatically appear in the Production carousel! 🎉

## 🔄 Updates

Changes are reflected:
- **Immediately** on page refresh
- **Description** pulled from repo description
- **Stars/Forks** always current
- **Language** from GitHub's detection

## 💡 Tips

**Good repository names:**
- Use descriptive names (they become the card title)
- Example: `task-manager` instead of `project-1`

**Good descriptions:**
- Write a clear 1-sentence description
- It appears as the card text
- Example: "A modern task management app with real-time sync"

**Keep it updated:**
- Remove `portfelio-dev` and add `portfelio-prod` when you deploy
- Archive old projects by removing the portfolio topic

## 🚀 Test It Now!

1. Add `portfelio-prod` to one of your repos
2. Refresh your portfolio page
3. Watch it appear automatically!

## ❓ FAQ

**Q: My project isn't showing up?**
- Wait a few seconds after adding topics
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console for errors

**Q: Can I have a project in multiple carousels?**
- No, use only ONE portfolio-* topic per repo
- It will appear in the first matching carousel

**Q: What if I have no topics?**
- The primary language will be used as a badge
- Example: Python, JavaScript, Java, etc.

**Q: How many projects can I show?**
- Unlimited! The API fetches up to 100 repos
- Carousels automatically paginate (3 per slide)

**Q: Can I exclude some repos?**
- Yes! Simply don't add any `portfelio-*` topic
- Only tagged repos appear in your portfolio
