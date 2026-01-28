# Shopify Theme Development Setup Template for Claude Code

Use this template to set up new Shopify stores with Claude Code. Copy the prompt below and customize the variables for your specific store.

---

## Prerequisites

Before starting, ensure you have:
1. Shopify CLI installed (`npm install -g @shopify/cli`)
2. Authenticated with Shopify (`shopify auth login --store YOUR_STORE.myshopify.com`)
3. Access to both old and new theme IDs (find in Shopify Admin > Online Store > Themes)
4. A GitHub repository for the theme

---

## Initial Setup Prompt

Copy and customize this prompt for Claude Code:

```
I need help setting up a Shopify theme development environment for my store.

## Store Details
- Store URL: [YOUR_STORE].myshopify.com
- GitHub Repo: [USERNAME]/[REPO_NAME]
- Old Theme ID: [OLD_THEME_ID] (the theme with existing styling I want to preserve)
- New/Development Theme ID: [NEW_THEME_ID] (the theme I'm building)

## Setup Tasks

### 1. Clone and Initialize Repository
Clone the repo and set up the local development environment.

### 2. Pull Theme Files
Pull the new development theme files:
```bash
shopify theme pull --theme [NEW_THEME_ID]
```

### 3. Sync Styling from Old Theme
Compare and sync these files from the old theme to the new theme:

**Settings & Colors** (config/settings_data.json):
- Fonts (body, heading, subheading)
- Color schemes (backgrounds, text, buttons)
- Button styling (border radius, colors)
- Page width settings

**Header** (sections/header-group.json):
- Menu position
- Transparent header settings
- Search/country/language visibility
- Color schemes

**Footer** (sections/footer-group.json):
- Newsletter section settings
- Email signup style
- Color schemes
- Social links

### 4. Migrate Page Templates
Pull and copy any custom page templates from the old theme:
```bash
mkdir -p /tmp/old-theme
shopify theme pull --theme [OLD_THEME_ID] --only "templates/page.*.json" --path /tmp/old-theme
cp /tmp/old-theme/templates/page.*.json templates/
```

### 5. Configure Collection Template
Add color swatches to product cards in templates/collection.json if needed.

### 6. Push to Shopify
```bash
shopify theme push --theme [NEW_THEME_ID]
```

### 7. Commit to GitHub
Ensure config/settings_data.json is NOT in .gitignore so styling is version controlled.
Commit all changes to GitHub.

## Expected Files to Track in Git
- config/settings_data.json (fonts, colors, button styles)
- sections/header-group.json
- sections/footer-group.json
- templates/*.json (all page templates)
- All other theme files
```

---

## Quick Reference Commands

### Pull from Shopify
```bash
# Pull entire theme
shopify theme pull --theme [THEME_ID]

# Pull specific files
shopify theme pull --theme [THEME_ID] --only "config/settings_data.json"

# Pull to different directory
shopify theme pull --theme [THEME_ID] --path /tmp/theme-backup
```

### Push to Shopify
```bash
# Push entire theme
shopify theme push --theme [THEME_ID]

# Push specific files
shopify theme push --theme [THEME_ID] --only "templates/page.values.json"
```

### Theme Development Server
```bash
shopify theme dev --theme [THEME_ID]
```

### List Themes
```bash
shopify theme list
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `config/settings_data.json` | Global theme settings: fonts, colors, button styles, page width |
| `sections/header-group.json` | Header configuration: menu, transparency, selectors |
| `sections/footer-group.json` | Footer configuration: newsletter, social links |
| `templates/collection.json` | Collection page layout and product card blocks |
| `templates/page.*.json` | Custom page templates (e.g., page.values.json) |
| `templates/index.json` | Homepage sections and layout |

---

## Common Styling Settings (settings_data.json)

### Fonts
```json
"type_body_font": "archivo_n4",
"type_heading_font": "archivo_black_n4",
"type_subheading_font": "inter_n4"
```

### Button Styling (Straight Corners, Black)
```json
"button_border_radius_primary": 0,
"button_border_radius_secondary": 0
```

### Color Scheme Button Colors
```json
"primary_button_background": "#000000",
"primary_button_text": "#ffffff",
"primary_button_border": "#000000",
"primary_button_hover_background": "#333333"
```

### Page Width
```json
"page_width": "wide"
```

---

## Troubleshooting

### File not syncing to GitHub
Check if it's in `.gitignore`. Remove the entry if you want to track it:
```bash
# Check gitignore
cat .gitignore

# Remove specific entry (e.g., settings_data.json)
# Edit .gitignore and remove the line
```

### Theme changes not appearing
1. Verify you're pushing to the correct theme ID
2. Clear browser cache or use incognito
3. Check the preview URL: `https://[STORE].myshopify.com/?preview_theme_id=[THEME_ID]`

### Comparing themes
Pull both themes to different directories and use diff:
```bash
shopify theme pull --theme [OLD_ID] --path /tmp/old-theme
shopify theme pull --theme [NEW_ID] --path /tmp/new-theme
diff /tmp/old-theme/config/settings_data.json /tmp/new-theme/config/settings_data.json
```

---

## Session Workflow Summary

1. **Identify differences**: Compare old and new theme files
2. **Sync settings**: Copy settings_data.json values from old to new
3. **Sync sections**: Copy header-group.json and footer-group.json
4. **Migrate templates**: Copy custom page templates
5. **Add features**: Add swatches, customize blocks as needed
6. **Push to Shopify**: `shopify theme push --theme [THEME_ID]`
7. **Commit to GitHub**: Stage, commit, and push all changes
8. **Verify**: Preview the development theme and confirm changes

---

## Example: Complete Store Setup Prompt

```
Set up my Shopify store theme development:

Store: my-awesome-store.myshopify.com
GitHub: myusername/my-awesome-store-theme
Old Theme ID: 123456789 (current live theme with my branding)
New Theme ID: 987654321 (new Canyon theme I'm customizing)

Please:
1. Pull the new theme files locally
2. Compare settings between old and new themes
3. Sync fonts, colors, and button styles from old to new
4. Sync header and footer configurations
5. Migrate any custom page templates (values, about, etc.)
6. Add color swatches to collection product cards
7. Push all changes to Shopify development theme
8. Ensure settings_data.json is tracked in git (not ignored)
9. Commit and push everything to GitHub

After setup, provide a summary of what was synced.
```
