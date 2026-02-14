# Copilot Instructions for Ritusmin Saikia's Portfolio

## Project Overview

This is a personal portfolio website for **Ritusmin Saikia**, a Class 9 student interested in Python, Linux, and cybersecurity. The portfolio is deployed to Netlify with visitor IP logging capabilities.

**Tech Stack:**
- HTML5 (structural content)
- CSS3 with CSS Variables (responsive design, dark/light theme)
- Vanilla JavaScript (interactivity, IP logging)
- Netlify Functions (serverless backend for IP logging)
- Netlify CLI (deployment and log retrieval)

**Deployment:** Netlify (static site with serverless functions)

---

## Key Features & Architecture

### 1. **Two-Tier Privacy Policy System**
- **Small popup** (`privacyPolicyPopup`): Shows on first visit with text "By clicking the accept button you agree to our privacy policy"
- **Full modal** (`privacyPolicyModal`): Detailed 9-section privacy policy that opens when user clicks "privacy policy" link
- **Consent Storage**: Uses `localStorage` key `privacyPolicyAccepted` to track acceptance
- **Location in Code**: 
  - HTML: index.html lines 781-863 (both modals)
  - JS: script.js lines 342-385 (all privacy functions)
  - CSS: style.css lines 752-793 (popup styling)

### 2. **Visitor IP Logging System**
- **Flow**: User accepts privacy → `logVisitorIP()` → fetches IP from ipify.org API → POSTs to Netlify Function → logged with timestamp
- **Function Location**: `netlify/functions/log-visitor.js` (47 lines)
- **Netlify Config**: `netlify.toml` (11 lines) - defines `/api/*` redirects to functions
- **Retrieval Script**: `get-visitor-ips.sh` (64 lines, executable) - uses `netlify status` to detect linked site
- **Data Captured**: IP address, timestamp, page URL, user agent
- **Fallback**: If Netlify function unavailable, stores to `localStorage.visitors` for testing

### 3. **Typing Animation (Hero Section)**
- **Current Skills Rotating**: "Python Developer", "Linux Enthusiast", "Cybersecurity Learner"
- **Function**: `setupTypingAnimation()` in script.js (lines 87-124)
- **Important Note**: "Security Engineer" was explicitly removed per user request
- **Mechanism**: Cycles through array, types character-by-character, deletes, then moves to next skill
- **HTML Element**: `span.typing-text` inside `h1.hero-title` (index.html line 60)

### 4. **Skills Alignment System**
- **Two Sections Must Match**:
  1. "Skills & Expertise" section (index.html lines 130-237)
  2. "Currently Learning" section (index.html lines 241-314)
- **Same 9 Skills in Both**: Python, Linux, Git & GitHub, Networking, Cybersecurity, Bash/Shell, HTML/CSS, System Design, AI/ML Foundations
- **Progress Bars**: CSS matches skill names with `skill-[skillname]` class to show percentages
- **Update Rule**: If changing a skill, update BOTH sections to maintain consistency
- **Critical**: Python is "Intermediate" (70%) in both sections - NOT Advanced

### 5. **Responsive Design & Theme System**
- **CSS Variables**: Defined in `:root` and `body.dark-mode` (style.css lines 1-50)
- **Color Scheme**: Blue theme (primary), with light/dark mode toggle
- **Responsive Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Theme Toggle**: `.theme-toggle` button triggers dark mode (JavaScript in script.js lines 69-85)
- **Storage**: Uses `localStorage` key `theme` to persist user preference

### 6. **Project Sections**
- **Active Projects**: Not currently implemented (template ready)
- **Under Development Section**: PhantomRAT-V2 project card with screenshot (index.html lines 463-495)
  - Screenshot path: `screenshot.jpg` (in portfolio root, not in subdirectory)
  - Uses responsive image styling: `width: 100%` and `height: auto`

---

## Content Guidelines

### About Section
- **Bio Location**: index.html lines 82-90
- **Current Bio**: Emphasizes Class 9 student status, passion for Python/Linux/cybersecurity, self-taught approach
- **Learning Journey Timeline**: Lines 96-123
  - Foundations (2024)
  - Python Programming (2025 Early)
  - Linux & System (2025 Mid)
  - Networking & Security Tools (Currently)
- **Important**: Keep authentic tone - student perspective, not professional engineer pretense

### Contact Information
- **Social Links**: index.html lines 733-739
- **Current Methods**: GitHub, Email, Instagram, Telegram
- **Telegram Details**: Username `@Unknown325k`, Channel `https://t.me/phantomratv2`
- **Email Form**: Lines 658-672 (currently non-functional per summary, may need integration)

### Dates & Legal
- **Copyright Year**: 2026 (footer line 783)
- **Privacy Policy Date**: "Last updated February 2026" (index.html line 781)
- **Name Format**: Always "Ritusmin Saikia" (not "Ritus Min" - that was a bug)

---

## File Structure & Conventions

```
/home/kali/Portfolio/
├── index.html              # Main page (889 lines)
├── style.css               # Styling (1646 lines)
├── script.js               # JavaScript logic (422 lines)
├── netlify.toml            # Netlify config
├── netlify/functions/
│   └── log-visitor.js      # IP logging serverless function
├── get-visitor-ips.sh      # Terminal script for retrieving logs
├── screenshot.jpg          # Project screenshot
├── IP-LOGGING-SETUP.md     # IP logging documentation
└── .github/
    └── copilot-instructions.md (this file)
```

### File Modification Rules

**HTML (index.html)**:
- Sections marked by `<!-- SECTION_NAME -->` comments
- IDs follow kebab-case: `#hero-section`, `#about-section`, etc.
- Classes follow BEM-lite convention: `.card`, `.card-title`, `.skill-card`
- Modal structure: `.modal` with `.modal-content` and close button

**CSS (style.css)**:
- Variables defined once at top (`:root`)
- Organized by component: utilities → layout → typography → components → animations
- Z-index hierarchy clearly documented (z-index: 9999 for privacy modals)
- Media queries at bottom for each breakpoint
- Don't use `!important` unless absolutely necessary

**JavaScript (script.js)**:
- Functions are concise and single-purpose
- Event listeners attached after DOM ready
- localStorage is the only persistent client storage
- No API keys hardcoded (IP fetch uses public ipify.org API)
- Error handling includes console.error() for debugging

**Netlify Function (netlify/functions/log-visitor.js)**:
- Handler must accept `event` and `context` parameters
- POST method expected with JSON body
- Returns `{ statusCode: 200, body: JSON.stringify(...) }`
- Function logs to Netlify console (visible via `netlify logs --tail`)

**Bash Script (get-visitor-ips.sh)**:
- Uses `netlify status` command to detect linked site
- Greps for "Site name:" and "Site ID:" in output
- Must remain executable (chmod +x)
- Provides clear error messages if site not linked

---

## Common Development Tasks

### Adding a New Skill to Both Sections
1. Add to "Currently Learning" section HTML with progress bar and description
2. Add matching `.skill-[skillname]` CSS class with percentage
3. Add to "Skills & Expertise" section with same details
4. Verify typing animation doesn't reference this skill (unless intentional)
5. Test responsive layout at mobile (768px) and desktop

### Updating Contact Information
- Telegram: Update lines 733-739 in index.html
- Email: Update in contact form (lines 658-672) and footer attribution
- GitHub: Update links in "Get In Touch" section and relevant cards
- Instagram: Update link if present
- Always test that links are clickable and open correctly

### Changing Privacy Policy Text
- Small popup text: index.html lines 814-815
- Full policy sections: index.html lines 849-860 (9 sections)
- Date: Index.html line 781 (last updated text)
- After changes, test by:
  1. Clear localStorage (`localStorage.clear()`)
  2. Refresh page
  3. Verify popup appears
  4. Click "privacy policy" link
  5. Verify full modal opens

### Modifying Theme Colors
- Located in `:root { }` section of style.css (first 30 lines)
- CSS variables: `--primary-color`, `--text-color`, `--bg-color`, etc.
- Dark mode overrides in `body.dark-mode { }`
- Test changes in both light and dark modes
- Ensure sufficient contrast for accessibility

### Adding New Project to Under Development Section
1. Copy existing PhantomRAT-V2 card structure (lines 476-493)
2. Update project name, description, and screenshot path
3. Add new screenshot image to portfolio root
4. Update nav links in hero if needed (line 73)
5. Test responsive layout at all breakpoints

---

## Testing Checklist

**Before any deployment:**
- [ ] Privacy popup appears on first visit
- [ ] Clicking "privacy policy" opens full modal
- [ ] Accepting privacy stores to localStorage
- [ ] Typing animation cycles correctly (3 skills only)
- [ ] Dark/light mode toggle works and persists
- [ ] All social links clickable and correct URLs
- [ ] Skills sections match between "Currently Learning" and "Skills & Expertise"
- [ ] Dates are 2026 throughout
- [ ] Name is "Ritusmin Saikia" (not "Ritus Min")
- [ ] Responsive at 320px (mobile), 768px (tablet), 1920px (desktop)
- [ ] All images load (screenshot.jpg, logo if present)
- [ ] Form submission (if functional) works or shows appropriate message

**After Netlify deployment:**
- [ ] Site loads at custom domain
- [ ] Privacy policy popup appears for first visitor
- [ ] IP logging function deployed (check via `netlify functions:list`)
- [ ] `./get-visitor-ips.sh` script can retrieve logs
- [ ] Test visitor IP appears in logs after accepting privacy

---

## Known Limitations & Future Work

**Current Limitations:**
- Email form doesn't have backend integration (displays message but doesn't send)
- IP logging only works after Netlify deployment (localStorage fallback for testing locally)
- No database persistence - logs only visible via Netlify console/CLI
- No authentication system

**Suggested Future Enhancements:**
- Integrate email form with service like Formspree, Netlify Forms, or SendGrid
- Migrate IP logs to external database (MongoDB, Firebase, Supabase) for persistent storage
- Add dark mode toggle persistence across sessions (already uses localStorage)
- Expand "Projects" section with completed projects and case studies
- Add blog/articles section with markdown support
- Integrate GitHub API to display live project repos
- Add resume download feature
- Implement search functionality if content grows

---

## Important Notes

1. **No Text Files in Root**: Per user request, don't create `.txt` or `.md` files in portfolio root directory (only in `.github/` or `netlify/`)

2. **Netlify Site Linking**: For IP logging to work:
   ```bash
   netlify login
   netlify link  # Link this directory to your Netlify site
   netlify deploy --prod
   ```

3. **localStorage Keys Used**:
   - `theme`: "light" or "dark" (theme preference)
   - `privacyPolicyAccepted`: "true" (privacy acceptance)
   - `visitors`: JSON array (fallback IP storage for testing)

4. **Color Scheme**: Blue is the primary brand color. User prefers the existing blue theme. Any UI additions should use this color palette.

5. **Mobile-First Design**: CSS is written mobile-first (base styles for mobile, then media queries for larger screens)

6. **User Preferences**:
   - Class 9 student, not professional developer
   - Interested in security and systems
   - Self-taught through experimentation
   - Values practical tools and automation
   - Prefers authentic over polished corporate tone

---

## Debugging Tips

**Privacy policy not showing:**
- Check z-index in style.css (should be 9999)
- Clear localStorage: `localStorage.clear()`
- Check browser console for JS errors

**Typing animation not working:**
- Verify `span.typing-text` exists in HTML
- Check that `setupTypingAnimation()` is called on page load
- Verify skills array has 3 items (not more, not less)

**IP logging not working:**
- Check that Netlify function deployed: `netlify functions:list`
- Open browser DevTools → Network tab, check POST to `/.netlify/functions/log-visitor`
- Verify `ipify.org` API is accessible (may be blocked by corporate firewalls)
- Check Netlify logs: `netlify logs --tail`

**Styling issues:**
- Check CSS variable values in `:root` and `body.dark-mode`
- Verify all color references use CSS variables (not hardcoded hex)
- Check responsive breakpoints (768px boundary)
- Use browser DevTools to inspect computed styles

---

## Contact & Questions

For future sessions, refer to:
- **IP Logging Details**: IP-LOGGING-SETUP.md
- **Architecture**: This file (copilot-instructions.md)
- **Technical Implementation**: Inline comments in HTML/CSS/JS
- **Netlify Deployment**: netlify.toml and official Netlify docs

**Key Contact**: Ritusmin Saikia (@Unknown325k on Telegram, https://t.me/phantomratv2)
