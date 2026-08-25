# AI Supply Chain Risk Predictor - Work Log

---

## Task ID: WORKFLOW-ESTABLISHMENT
**Agent: Main Agent**
**Task: Establish dual-repository development workflow**

Work Log:
- Created Demo2AISupChn public repository for previews
- Made AISupChn repository private for development
- Established clear separation between private (dev) and public (preview) repos
- Created workflow guide at `/home/z/my-project/workflow-guide.md`
- Created export script at `/home/z/my-project/scripts/export-preview.sh`

Stage Summary:
- **CRITICAL RULE**: All development happens in private repo (AISupChn)
- **CRITICAL RULE**: Only preview code goes to public repo (Demo2AISupChn)
- Private Repo URL: https://github.com/testdemoqwenai2025-creator/AISupChn
- Public Repo URL: https://github.com/testdemoqwenai2025-creator/Demo2AISupChn
- GitHub Pages Preview: https://testdemoqwenai2025-creator.github.io/Demo2AISupChn/
- Export Command: `bash /home/z/my-project/scripts/export-preview.sh [source-file]`

---

## Repository Structure

### 🔒 PRIVATE - Development
| Property | Value |
|----------|-------|
| Name | AISupChn |
| Local Path | `/home/z/my-project/sandbox/AISupChn` |
| Purpose | Full source code development |
| Contains | Next.js .tsx files, components, configs |

### 🌐 PUBLIC - Previews
| Property | Value |
|----------|-------|
| Name | Demo2AISupChn |
| Local Path | `/home/z/my-project/sandbox/Demo2AISupChn` |
| Purpose | Public demos and previews |
| Contains | index.html only (self-contained) |
| GitHub Pages | https://testdemoqwenai2025-creator.github.io/Demo2AISupChn/ |

---

## Important Commands

```bash
# Export preview from private to public
bash /home/z/my-project/scripts/export-preview.sh /path/to/preview.html

# Develop in private repo
cd /home/z/my-project/sandbox/AISupChn

# Update public preview
cd /home/z/my-project/sandbox/Demo2AISupChn
```
