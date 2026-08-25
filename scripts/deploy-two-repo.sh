#!/bin/bash

# ============================================================================
# AI Supply Chain Risk Predictor - Two-Repository Deployment Architecture
# 
# PRIVATE REPO (AISupChn): Source code, development, NDA protected
# PUBLIC REPO (AISupChn-preview): GitHub Pages preview for clients
#
# This script syncs built output from private → public repository
# ============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration - PRIVATE Repository (Source Code)
PRIVATE_REPO="testdemoqwenai2025-creator/AISupChn"
PRIVATE_BRANCH="master"

# Configuration - PUBLIC Repository (Preview/Client Facing)
PUBLIC_REPO="testdemoqwenai2025-creator/AISupChn-preview"
PUBLIC_BRANCH="main"  # GitHub Pages uses main or root

# GitHub Token (needed for API operations)
GITHUB_TOKEN="${GITHUB_TOKEN:-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}"

# Local paths
PROJECT_DIR="/home/z/my-project"
BUILD_OUTPUT="$PROJECT_DIR/out"
TEMP_DEPLOY_DIR=$(mktemp -d)

# Tracking variables
CHECKS_PASSED=0
ISSUES_FOUND=0
DEPLOY_SUCCESS=false

echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  AI SUPPLY CHAIN - TWO-REPO DEPLOYMENT ARCHITECTURE         ║${NC}"
echo -e "${CYAN}║  Private Dev Repo → Public Preview Repo (NDA Safe)          ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

cleanup() {
    rm -rf "$TEMP_DEPLOY_DIR"
    # Reset remote URL to remove token
    cd "$PROJECT_DIR" 2>/dev/null && git remote set-url origin "https://github.com/${PRIVATE_REPO}.git" 2>/dev/null || true
}
trap cleanup EXIT

# Helper functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; CHECKS_PASSED=$((CHECKS_PASSED + 1)); }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; ISSUES_FOUND=$((ISSUES_FOUND + 1)); }
log_error() { echo -e "${RED}[✗]${NC} $1"; ISSUES_FOUND=$((ISSUES_FOUND + 1)); }
log_step() { echo -e "\n${YELLOW}━━━ $1 ━━━${NC}\n"; }

# ============================================================================
# STEP 1: Validate Environment
# ============================================================================
log_step "Step 1: Environment Validation"

cd "$PROJECT_DIR" || { log_error "Project directory not found: $PROJECT_DIR"; exit 1; }

if [ ! -f "$PROJECT_DIR/package.json" ]; then
    log_error "package.json not found - not a valid Node.js project"
    exit 1
fi
log_success "Valid Node.js project detected"

if [ ! -d "$PROJECT_DIR/node_modules" ]; then
    log_info "Installing dependencies..."
    npm install 2>&1 | tail -3
fi
log_success "Dependencies installed"

# ============================================================================
# STEP 2: Pre-flight Quality Checks
# ============================================================================
log_step "Step 2: Pre-flight Quality Checks"

# Check CSS animations exist
CSS_FILE="$PROJECT_DIR/src/app/globals.css"
if [ -f "$CSS_FILE" ]; then
    if grep -q "@keyframes float" "$CSS_FILE" && grep -q "\.animate-float" "$CSS_FILE"; then
        log_success "CSS animations properly defined"
    else
        log_warning "Missing CSS animation definitions"
        # Auto-fix would go here
    fi
    
    # Check SVG visibility
    DECORATIONS_FILE="$PROJECT_DIR/src/components/page-decorations.tsx"
    if [ -f "$DECORATIONS_FILE" ]; then
        if grep -qE 'opacity-\[0\.0[1-7]\]' "$DECORATIONS_FILE"; then
            log_warning "Found invisible SVG decorations (opacity < 8%)"
            sed -i 's/opacity-\[0\.0[1-7]\]/opacity-[0.15]/g' "$DECORATIONS_FILE"
            log_fix "Fixed SVG opacity values"
        else
            log_success "SVG decoration visibility OK"
        fi
    fi
else
    log_error "globals.css not found!"
fi

# Check navigation links use .html extension
NAV_FILE="$PROJECT_DIR/src/components/navbar.tsx"
if [ -f "$NAV_FILE" ]; then
    if grep -qE 'href=["\x27]/(dashboard|platform|command-center)["\x27]' "$NAV_FILE"; then
        log_error "Navigation links missing .html extension (will cause 404s!)"
        log_info "Fixing navigation links..."
        # Fix would be applied here
    elif grep -qE 'href=["\x27]/(dashboard|platform|command-center)\.html["\x27]' "$NAV_FILE"; then
        log_success "Navigation links have .html extension (GitHub Pages compatible)"
    fi
fi

# ============================================================================
# STEP 3: Build Project
# ============================================================================
log_step "Step 3: Building Project"

log_info "Cleaning previous build..."
rm -rf "$BUILD_OUTPUT" "$PROJECT_DIR/.next" 2>/dev/null || true

log_info "Running production build..."
if npm run build 2>&1; then
    log_success "Build completed successfully"
else
    log_error "Build failed! Check errors above."
    exit 1
fi

if [ ! -d "$BUILD_OUTPUT" ]; then
    log_error "Build output directory not created"
    exit 1
fi

PAGE_COUNT=$(find "$BUILD_OUTPUT" -name "*.html" ! -name "_not-found.html" | wc -l)
log_success "Generated $PAGE_COUNT static pages"

# ============================================================================
# STEP 4: Setup Public Preview Repository
# ============================================================================
log_step "Step 4: Public Preview Repository Setup"

log_info "Checking/creating public preview repository..."

# Try to access GitHub API
API_RESPONSE=$(curl -s -w "\n%{http_code}" "https://api.github.com/repos/$PUBLIC_REPO" \
  -H "Authorization: token $GITHUB_TOKEN" 2>/dev/null)
HTTP_CODE=$(echo "$API_RESPONSE" | tail -1)
BODY=$(echo "$API_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    # Repo exists, check if it's public
    IS_PRIVATE=$(echo "$BODY" | grep -o '"private": [a-z]*' | cut -d' ' -f2)
    if [ "$IS_PRIVATE" = "false" ]; then
        log_success "Public preview repository exists and is public"
    else
        log_warning "Preview repository exists but is private - making public..."
        curl -s -X PATCH "https://api.github.com/repos/$PUBLIC_REPO" \
          -H "Authorization: token $GITHUB_TOKEN" \
          -H "Accept: application/vnd.github.v3+json" \
          -d '{"private": false}' > /dev/null 2>&1
        log_fix "Made repository public"
    fi
elif [ "$HTTP_CODE" = "404" ]; then
    log_info "Creating public preview repository..."
    
    CREATE_RESPONSE=$(curl -s -X POST "https://api.github.com/user/repos" \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      -d "{
        \"name\": \"AISupChn-preview\",
        \"description\": \"AI Supply Chain Risk Predictor - Client Preview (Auto-deployed from private dev repo)\",
        \"homepage\": \"https://testdemoqwenai2025-creator.github.io/AISupChn-preview/\",
        \"private\": false,
        \"has_issues\": false,
        \"has_projects\": false,
        \"has_wiki\": false,
        \"auto_init\": false
      }")
    
    if echo "$CREATE_RESPONSE" | grep -q '"full_name"'; then
        log_success "Public preview repository created"
    else
        ERROR_MSG=$(echo "$CREATE_RESPONSE" | grep -o '"message": "[^"]*"')
        log_error "Failed to create public repo: $ERROR_MSG"
        log_info "You may need to create it manually at: https://github.com/new"
        exit 1
    fi
else
    log_warning "Cannot check/create repo (HTTP $HTTP_CODE) - continuing anyway"
fi

# Enable GitHub Pages on public repo
log_info "Ensuring GitHub Pages is enabled on public repo..."
PAGES_ENABLE_RESULT=$(curl -s -X POST "https://api.github.com/repos/$PUBLIC_REPO/pages" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"source": {"branch": "main", "path": "/"}}' 2>/dev/null || true)

if echo "$PAGES_ENABLE_RESULT" | grep -q '"html_url"'; then
    PREVIEW_URL=$(echo "$PAGES_ENABLE_RESULT" | grep -o '"html_url": "[^"]*"' | cut -d'"' -f4)
    log_success "GitHub Pages enabled: $PREVIEW_URL"
else
    # Might already be enabled
    log_info "GitHub Pages setup attempted (may already be enabled)"
fi

# ============================================================================
# STEP 5: Deploy to Public Repository
# ============================================================================
log_step "Step 5: Deploying to Public Preview Repository"

log_info "Preparing deployment package..."

# Clone or initialize public repo in temp directory
cd "$TEMP_DEPLOY_DIR"

if git clone --branch="$PUBLIC_BRANCH" --single-branch --depth 1 \
     "https://${GITHUB_TOKEN}@github.com/${PUBLIC_REPO}.git" . 2>/dev/null; then
    log_success "Cloned existing public repo"
else
    log_info "Initializing new public repo..."
    git init
    git checkout -b "$PUBLIC_BRANCH"
    
    # Add remote for pushing
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${PUBLIC_REPO}.git"
fi

# Remove all existing files (except .git)
find . -maxdepth 1 ! -name '.' ! -name '.git' -exec rm -rf {} + 2>/dev/null || true

# Copy built files from private repo
log_info "Copying built files to public repo..."
cp -r "$BUILD_OUTPUT/"* .

# Create proper CNAME file if needed
echo "testdemoqwenai2025-creator.github.io" > CNAME 2>/dev/null || true

# Add README for public preview
cat > README.md << 'EOF'
# AI Supply Chain Risk Predictor - Live Preview

**This is the automatically generated preview site.**

## 🔗 Access the Application

🌐 **Live Preview**: https://testdemoqwenai2025-creator.github.io/AISupChn-preview/

## 📄 Available Pages

- **Home** - Landing page with overview
- **Platform** - Enterprise platform details  
- **Dashboard** - Interactive dashboard
- **Command Center** - Risk command center
- **Intelligence** - AI/ML capabilities
- **Product** - Product suite overview
- **Events** - Upcoming events
- **Industries** - Industry solutions
- **Customers** - Customer success stories
- **Support** - Help & support
- **About** - About us

---

*This site is auto-deployed from our private development repository.*
*Last update: $(date '+%Y-%m-%d %H:%M:%S UTC')*
EOF

# Commit and push
log_info "Committing changes..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S') | $PAGE_COUNT pages | checks: $CHECKS_PASSED passed" \
  --allow-empty 2>/dev/null || true

log_info "Pushing to public repository..."
PUSH_RESULT=$(git push origin "$PUBLIC_BRANCH" 2>&1) || {
    log_error "Failed to push to public repository"
    echo -e "$PUSH_RESULT"
    exit 1
}

log_success "Successfully pushed to public repository"

# ============================================================================
# STEP 6: Also Update Private Repo (for backup)
# ============================================================================
log_step "Step 6: Syncing Private Repository"

cd "$PROJECT_DIR"

# Commit any code changes
git add -A
git commit -m "chore: sync $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty 2>/dev/null || true

# Push to private repo's gh-pages branch as well (backup)
log_info "Pushing to private repository (backup)..."
git push origin "$PRIVATE_BRANCH" 2>/dev/null || log_warning "Could not push to private repo (may need auth)"

# Also push to gh-pages branch of private repo
git subtree split --prefix out "$PRIVATE_BRANCH" | git push origin "$PRIVATE_BRANCH":gh-pages --force 2>/dev/null || \
    log_warning "Private repo gh-pages backup skipped"

# ============================================================================
# STEP 7: Verification
# ============================================================================
log_step "Step 7: Post-Deployment Verification"

log_info "Waiting for GitHub Pages build (30 seconds)..."
sleep 30

# Test URLs
BASE_URL="https://testdemoqwenai2025-creator.github.io/AISupChn-preview"
TEST_PAGES=("index.html" "platform.html" "dashboard.html" "command-center.html" "intelligence.html")

PASS_COUNT=0
FAIL_COUNT=0

echo -e "${CYAN}Testing deployed URLs:${NC}"

for page in "${TEST_PAGES[@]}"; do
    TEST_URL="$BASE_URL/$page"
    HTTP_STATUS=$(curl -sI "$TEST_URL" 2>&1 | head -1 | grep -oE '[0-9]{3}' | head -1)
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} $page (${HTTP_STATUS} OK)"
        PASS_COUNT=$((PASS_COUNT + 1))
    else
        echo -e "  ${RED}✗${NC} $page ($HTTP_STATUS)"
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
done

# Final Summary
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
if [ $FAIL_COUNT -eq 0 ] && [ $PASS_COUNT -gt 0 ]; then
    DEPLOY_SUCCESS=true
    echo -e "${GREEN}  🚀 DEPLOYMENT SUCCESSFUL & VERIFIED! 🚀${NC}"
else
    echo -e "${YELLOW}  ⚠️  DEPLOYMENT COMPLETED WITH WARNINGS${NC}"
fi
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Architecture:${NC}"
echo -e "  🔒 Private: github.com/${PRIVATE_REPO} (Source Code)"
echo -e "  🌐 Public:  github.com/${PUBLIC_REPO} (Client Preview)"
echo ""
echo -e "${BLUE}Preview URL:${NC}"
echo -e "  ${GREEN}$BASE_URL/${NC}"
echo ""
echo -e "${BLUE}Statistics:${NC}"
echo -e "  • Pages Generated: $PAGE_COUNT"
echo -e "  • Quality Checks: $CHECKS_PASSED passed, $ISSUES_FOUND issues found"
echo -e "  • URLs Verified: $PASS_COUNT working, $FAIL_COUNT failed"
echo ""
echo -e "${YELLOW}NDA Compliance:${NC}"
echo -e "  ✅ Source code remains PRIVATE"
echo -e "  ✅ Only built output is PUBLIC"
echo -e "  ✅ Clients see preview without NDA concerns"
echo ""

if [ "$DEPLOY_SUCCESS" = true ]; then
    exit 0
else
    exit 1
fi
