# Jibesh Tharu - Portfolio Website

A sleek, modern, and fully responsive single-page portfolio website for **Jibesh Tharu** (Digital Creator, Researcher & Administrative Professional) built with pure **HTML5, CSS3, and JavaScript** (zero external frameworks or dependencies).

---

## 🚀 Features

- **Full-Screen Sections (`min-height: 100vh`)**:
  - **Hero**: Striking introduction, availability badge, dynamic CTA buttons, social links, and scroll-down prompt.
  - **About**: Profile card with avatar frame (automatically displays `AI gen 11.png` or fallback initials), biography, quick stats, and core engineering pillars.
  - **Skills**: Categorized skill pills covering Higgsfield AI, Canva, Make.com, Google Sheets, Research, and Administration.
  - **Experience**: Vertical timeline with glowing nodes, role descriptions (Administrative Officer at Devops Technology Pvt. Ltd.), milestone badges, and tech tags.
  - **Projects**: Responsive 3-card grid featuring styled browser mockups, project tags, and interactive links.
  - **Contact**: Direct contact information (Email, Call, Instagram `@jibeshtharu`, LinkedIn) with one-click email copy to clipboard, and an interactive contact form with client-side validation.

- **Navigation & Scroll Interactions**:
  - **Sticky Glassmorphic Navigation Bar**: Stays at the top with a subtle backdrop blur.
  - **Smooth Scrolling**: Nav links smoothly scroll to each section with an offset calculated for the sticky header height.
  - **Scroll Spy**: Automatically highlights the active nav link as you scroll down the page.
  - **Scroll Progress Bar**: A gradient progress indicator at the top of the viewport tracking scroll depth from 0% to 100%.
  - **Section Entrance Animations**: Subtle fade-in and slide-up reveals powered by the modern `IntersectionObserver` API.
  - **Floating "Back to Top" Button**: Appears smoothly when scrolling down past 350px.

- **Theme & Responsiveness**:
  - **Dark / Light Mode Toggle**: One-click toggle with animated sun/moon icons, respecting system preferences and saving user choice in `localStorage`.
  - **Mobile Hamburger Menu**: Accessible hamburger button animating into an 'X', slide-down mobile menu drawer, backdrop overlay, and keyboard navigation support (`Escape` key to close).
  - **Accessibility (a11y)**: Built with semantic HTML5 elements, `:focus-visible` styling, ARIA attributes, and `prefers-reduced-motion` compliance.

---

## 📁 File Structure

```text
Portfolio website/
├── index.html        # Main HTML structure with semantic sections and placeholder comments
├── styles.css        # Clean CSS with CSS custom properties (variables) for dark/light themes
├── script.js         # Vanilla JavaScript handling theme, scroll spy, progress, mobile nav, and form
├── AI gen 11.png     # Avatar image (automatically displayed in the About section)
└── README.md         # Documentation and customization guide
```

---

## ⚡ How to Run

Because this project uses vanilla web standards with no build step:
1. Simply double-click **`index.html`** to open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, you can use any local web server (e.g. VS Code Live Server extension).

---

## ✏️ How to Customize Your Content

All files are structured and commented with `<!-- EDIT: ... -->` markers to make customization effortless:

1. **Name & Title**: Your name is set to `Jibesh Tharu` across `index.html`. You can further refine titles or role designations anytime.
2. **Avatar Image**: Replace `AI gen 11.png` with your portrait or picture, or change the `src` attribute in `index.html` inside the `.avatar-frame` container.
3. **Links & Socials**: Update the `href` attributes in the Hero, Contact, and Footer sections.
4. **Skills**: Add or adjust skill pills in `#skills` inside `index.html`.
5. **Projects**: Edit the titles, descriptions, and URLs in the `#projects` grid.
6. **Theme Colors**: If you want to change the primary accent colors (e.g., from indigo/cyan to emerald/violet), modify the `--accent-primary` and `--accent-secondary` variables at the top of `styles.css`.
