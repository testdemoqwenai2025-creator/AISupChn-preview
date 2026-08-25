# AI Supply Chain Risk Predictor - Development Workflow Guide

## ⚠️ EXCEPTIONALLY IMPORTANT RULES

### 🔒 PRIVATE REPOSITORY: `AISupChn`
- **Purpose**: Full development workspace
- **URL**: https://github.com/testdemoqwenai2025-creator/AISupChn
- **Local**: `/home/z/my-project/sandbox/AISupChn`
- **Contains**: 
  - Next.js source code (.tsx, .ts files)
  - Components, hooks, lib directories
  - Package configurations
  - Development tools and scripts
  - All assets and source CSS

### 🌐 PUBLIC REPOSITORY: `Demo2AISupChn`
- **Purpose**: Preview & Demo deployment only
- **URL**: https://github.com/testdemoqwenai2025-creator/Demo2AISupChn
- **GitHub Pages**: https://testdemoqwenai2025-creator.github.io/Demo2AISupChn/
- **Local**: `/home/z/my-project/sandbox/Demo2AISupChn`
- **Contains**:
  - `index.html` only (self-contained preview)
  - `.nojekyll` file
  - Minimum files for public display

---

## 📋 WORKFLOW PROCESS

### Step 1: Develop in Private Repo
```bash
cd /home/z/my-project/sandbox/AISupChn
# Make changes to Next.js source code
# Add new features, components, pages
git add .
git commit -m "Feature: New development"
git push origin main
```

### Step 2: Export Preview to Public Repo
```bash
# Build/compile your changes into self-contained HTML
# Copy ONLY the preview file to public repo
cp /path/to/built/preview.html /home/z/my-project/sandbox/Demo2AISupChn/index.html

cd /home/z/my-project/sandbox/Demo2AISupChn
git add .
git commit -m "Preview: Update demo"
git push origin main
```

### Step 3: Preview Live
- **GitHub Pages**: https://testdemoqwenai2025-creator.github.io/Demo2AISupChn/
- Updates automatically after push

---

## ✅ WHAT GOES WHERE

| File Type | Private (AISupChn) | Public (Demo2AISupChn) |
|-----------|-------------------|----------------------|
| `.tsx` / `.ts` files | ✅ YES | ❌ NO |
| Components | ✅ YES | ❌ NO |
| Source CSS | ✅ YES | ❌ NO |
| Config files | ✅ YES | ❌ NO |
| `package.json` | ✅ YES | ❌ NO |
| Built `index.html` | ❌ NO (source) | ✅ YES (preview) |
| Inline CSS in HTML | ❌ NO | ✅ YES |
| `.nojekyll` | Optional | ✅ YES |

---

## 🚨 CRITICAL REMINDERS

1. **NEVER** push source code to public repo
2. **ALWAYS** develop in private repo first
3. **ONLY** export compiled/previews to public repo
4. **KEEP** public repo minimal (index.html + .nojekyll)
5. **TEST** previews before pushing to public

---

## 📁 Current Sandbox Structure

```
/home/z/my-project/sandbox/
├── AISupChn/               ← 🔒 PRIVATE (Development)
├── Demo2AISupChn/          ← 🌐 PUBLIC (Previews)
├── AISupChn-preview/       ← 🌐 PUBLIC (Legacy)
├── ai-supply-chain-live/   ← 🌐 PUBLIC (Live)
└── aisupchn-v2/            ← 🌐 PUBLIC (Backup)
```

**Primary Workflow**: AISupChn (dev) → Demo2AISupChn (preview)
