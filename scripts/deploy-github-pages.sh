#!/bin/bash

# AI Supply Chain Risk Predictor - GitHub Pages Deployment Script
# This script automates the complete deployment process

set -e

echo "🚀 AI Supply Chain Risk Predictor - Deployment Script"
echo "====================================================="
echo ""

# Configuration
REPO="testdemoqwenai2025-creator/AISupChn"
DEMO_REPO="testdemoqwenai2025-creator/DemoAISupChn"
BUILD_DIR="/home/z/my-project"
OUT_DIR="${BUILD_DIR}/out"

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable is required"
    echo ""
    echo "Please run: export GITHUB_TOKEN='your-github-personal-access-token'"
    echo ""
    echo "Get your token from: https://github.com/settings/tokens"
    echo "Required scopes: repo, workflow"
    exit 1
fi

echo "✅ GitHub token found"

# Step 1: Ensure we're on master/main branch
cd "${BUILD_DIR}"
git checkout master 2>/dev/null || git checkout main 2>/dev/null || true

# Step 2: Stage all changes
echo ""
echo "📦 Staging changes..."
git add -A

# Step 3: Commit if there are changes
if git diff --cached --quiet; then
    echo "✅ No new changes to commit"
else
    echo "📝 Creating commit..."
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Complete AI Supply Chain application

- Fixed CSS rendering issue for GitHub Pages
- Added impressive SVG side decorations to all pages
- Complete 12-page enterprise SaaS application
- Navigation: Product dropdown, Company dropdown, Login/Get Started/Contact/AI Chat
- AI Agent Chat widget: 'Supply Chain Expert'
- Dark/Light mode support
- Glass morphism design throughout"
fi

# Step 4: Configure Git for authentication
echo ""
echo "🔐 Configuring Git authentication..."
git config user.email "deploy@aisupplychain.ai"
git config user.name "AI Supply Chain Bot"
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${REPO}.git"

# Step 5: Push to main repository
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u origin master --force 2>&1 || {
    # If master fails, try main
    git branch -M main
    git push -u origin main --force 2>&1
}

echo "✅ Code pushed successfully!"

# Step 6: Deploy to GitHub Pages (gh-pages branch)
echo ""
echo "🌐 Deploying to GitHub Pages..."

# Create temporary directory for gh-pages branch
TEMP_DIR=$(mktemp -d)

# Clone the demo repository (or use same repo with gh-pages branch)
git clone --depth 1 --branch gh-pages "https://${GITHUB_TOKEN}@github.com/${DEMO_REPO}.git" "${TEMP_DIR}" 2>/dev/null || {
    # If gh-pages doesn't exist yet, create it
    cd "${TEMP_DIR}"
    git init
    git checkout --orphan gh-pages
}

# Copy build output to temp directory
echo "📋 Copying build files..."
rm -rf "${TEMP_DIR}"/*
cp -r "${OUT_DIR}"/* "${TEMP_DIR}/"
cp "${OUT_DIR}"/.htaccess "${TEMP_DIR}/" 2>/dev/null || true

# Add CNAME file if custom domain needed
# echo "your-domain.com" > "${TEMP_DIR}/CNAME"

# Commit and push to gh-pages
cd "${TEMP_DIR}"
git add -A
git commit -m "GitHub Pages deploy: $(date '+%Y-%m-%d %H:%M:%S')

AI Supply Chain Risk Predictor - Static Site Deployment

Pages deployed:
- Landing Page (/)
- Dashboard (/dashboard) 
- Command Center (/command-center)
- Platform (/platform)
- Intelligence (/intelligence)
- Product Suite (/product)
- Events (/events)
- Industries (/industries)
- Customers (/customers)
- Support (/support)
- About (/about)

Features:
- CSS rendering fixed (relative paths)
- SVG side decorations on all pages
- Enterprise navigation ribbon
- AI Expert chat widget
- Dark/Light mode support
- Mobile responsive design" || echo "No changes to deploy"

git remote add origin "https://${GITHUB_TOKEN}@github.com/${DEMO_REPO}.git" 2>/dev/null || true
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${DEMO_REPO}.git"
git push origin gh-pages --force 2>&1

# Cleanup
rm -rf "${TEMP_DIR}"

echo ""
echo "====================================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "====================================================="
echo ""
echo "🌐 Your site is live at:"
echo "   https://testdemoqwenai2025-creator.github.io/DemoAISupChn/"
echo ""
echo "📄 Pages available:"
echo "   • Landing Page: / or /index.html"
echo "   • Dashboard:   /dashboard.html"
echo "   • Command Center: /command-center.html"
echo "   • Platform:    /platform.html"
echo "   • Intelligence: /intelligence.html"
echo "   • Product:     /product.html"
echo "   • Events:      /events.html"
echo "   • Industries:  /industries.html"
echo "   • Customers:   /customers.html"
echo "   • Support:     /support.html"
echo "   • About:       /about.html"
echo ""
echo "🎨 Features deployed:"
echo "   ✓ CSS rendering fix applied"
echo "   ✓ Left/right side decorations on all pages"
echo "   ✓ Enterprise navigation with dropdowns"
echo "   ✓ Login, Get Started, Contact buttons"
echo "   ✓ AI Expert Chat widget ('Supply Chain Expert')"
echo "   ✓ Dark/Light mode toggle"
echo "   ✓ Mobile responsive design"
echo ""
echo "⏱️  Allow 2-3 minutes for GitHub Pages to update"
echo ""
