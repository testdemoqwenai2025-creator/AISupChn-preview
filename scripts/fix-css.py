#!/usr/bin/env python3
"""Fix CSS loading by inlining critical styles into index.html"""

import re

# Read the main CSS file
with open('/tmp/main-css.css', 'r') as f:
    css_content = f.read()

# Read the current index.html
with open('/home/z/my-project/index.html', 'r') as f:
    html = f.read()

# Replace external CSS links with inline style tag
pattern = r'<link[^>]*href="[^"]*\.css"[^>]*>'

# Remove external CSS links (both of them)
html = re.sub(pattern, '', html)

# Add inline style tag right after <head>
style_tag = f'<style>\n{css_content}\n</style>\n'
html = html.replace('<head>', f'<head>\n{style_tag}', 1)

# Write fixed HTML
with open('/home/z/my-project/index.html', 'w') as f:
    f.write(html)

print(f"✅ Inlined {len(css_content)} chars of CSS into index.html")
print(f"✅ New file size: {len(html)} chars")
