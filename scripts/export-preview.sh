#!/bin/bash
# =============================================================================
# EXPORT PREVIEW SCRIPT
# =============================================================================
# Exports preview from private repo (AISupChn) to public repo (Demo2AISupChn)
# 
# Usage: ./export-preview.sh [source-file]
# Example: ./export-preview.sh actual-page.html
# =============================================================================

set -e

# Configuration
PRIVATE_REPO="/home/z/my-project/sandbox/AISupChn"
PUBLIC_REPO="/home/z/my-project/sandbox/Demo2AISupChn"
SOURCE_FILE="${1:-/home/z/my-project/actual-page.html}"

echo "🚀 Export Preview Script"
echo "═══════════════════════════════════════"
echo ""

# Validate source file
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Error: Source file not found: $SOURCE_FILE"
    exit 1
fi

echo "📋 Source: $SOURCE_FILE"
echo "📋 Target: $PUBLIC_REPO/index.html"
echo ""

# Check if we're in the right directories
if [ ! -d "$PUBLIC_REPO" ]; then
    echo "❌ Error: Public repository not found at $PUBLIC_REPO"
    exit 1
fi

# Copy file to public repo
echo "📄 Copying preview to public repository..."
cp "$SOURCE_FILE" "$PUBLIC_REPO/index.html"

# Ensure .nojekyll exists
touch "$PUBLIC_REPO/.nojekyll"

# Change to public repo and commit
cd "$PUBLIC_REPO"

echo ""
echo "🔍 Checking for changes..."
if git diff --quiet && git diff --cached --quiet; then
    echo "✅ No changes to commit. Preview is up to date."
    exit 0
fi

echo ""
echo "📦 Committing changes to public repository..."
git add index.html .nojekyll

# Generate commit message with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MSG="🔄 Preview update - ${TIMESTAMP}

Generated from private repository development build."

git commit -m "$COMMIT_MSG"

echo ""
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "═══════════════════════════════════════"
echo "✅ Preview exported successfully!"
echo ""
echo "🌐 Live Preview URL:"
echo "   https://testdemoqwenai2025-creator.github.io/Demo2AISupChn/"
echo ""
echo "📦 Public Repository:"
echo "   https://github.com/testdemoqwenai2025-creator/Demo2AISupChn"
echo "═══════════════════════════════════════"
