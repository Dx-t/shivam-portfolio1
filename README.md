# Shivam Prakash &mdash; Student Portfolio Website
> **1st-Year B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning)**

A simple, clean, professional, and responsive portfolio website designed for **Shivam Prakash**.
Built with semantic **HTML5**, clean **Vanilla CSS**, and lightweight **JavaScript** (zero bulky frameworks or complex dependencies).

---

## 🚀 How to Run Locally

### Option 1: Direct in Browser (Fastest)
Double-click [`index.html`](file:///c:/Users/daksh/OneDrive/Desktop/Shivam/index.html) to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Python Local Server
Open your terminal in this directory and run:
```bash
python -m http.server 4321
```
Then open: **`http://localhost:4321`**

---

## ✏️ How to Edit & Update Your Portfolio

Every unknown detail is marked with clear bracketed placeholders (like `[Your College / Institute Name]`).
To personalize your portfolio, open **`index.html`** in your text editor (VS Code, Notepad, etc.) and edit the sections marked with comments:

### 1. Photo / Avatar
- Place your photo in the `assets/` folder (e.g. `assets/profile.jpg`).
- In `index.html` (around line 170), change:
  ```html
  <img src="assets/profile-placeholder.svg" alt="..." class="avatar-image">
  ```
  to:
  ```html
  <img src="assets/profile.jpg" alt="Shivam Prakash" class="avatar-image">
  ```

### 2. About Me (`#about`)
- Update the paragraphs and the quick info cards with your college name and city:
  - `[Your College / Institute Name]`
  - `[Your City, State, India]`

### 3. Education (`#education`)
- In the B.Tech section, add your college name and current CGPA/SGPA.
- In Class XII and Class X, replace the placeholders with your school names, board, and percentage.

### 4. Skills (`#skills`)
- Add or remove skill chips under Programming Languages, AI & ML, Web Technologies, and Tools.

### 5. Projects (`#projects`)
- Replace `[Project Title 1]`, `[Project Description]`, and tech tags.
- Update your GitHub repository links: `https://github.com/[your-github-username]/[project-repo]`.
- To update the popup details modal for each project, open `script.js` and edit the `projectData` object (lines 200–240).

### 6. Achievements & Certifications (`#certifications`)
- Replace the placeholder cards with your actual completed online courses, hackathon participations, or academic achievements.

### 7. Coding Profiles (`#profiles`)
- Replace `github.com/[your-github-username]` with your actual username.
- Replace `linkedin.com/in/[your-linkedin-username]`.
- Replace `leetcode.com/[your-leetcode-username]`.

### 8. Contact & Email (`#contact`)
- Replace `[your-email@example.com]` with your real contact email.
- The interactive contact form validates input and provides user feedback out-of-the-box.

### 9. Resume Modal (`#resume-modal`)
- The interactive resume preview modal contains an ATS-friendly layout. You can update the details directly in `index.html` and click **"Print / Save PDF"** to save a copy anytime.

---

## 📁 File Structure

```text
Shivam/
├── assets/
│   ├── profile-placeholder.svg  # Default profile image placeholder
│   └── project-placeholder.svg  # Clean project thumbnail placeholder
├── index.html                   # Semantic HTML5 structure (Well-commented for easy editing)
├── style.css                    # Responsive CSS design system (Dark & Light themes)
├── script.js                    # Theme toggling, typewriter effect, filter, & modals
└── README.md                    # This documentation guide
```

---

## 🌐 Free Hosting / Deployment

1. **GitHub Pages (Recommended)**:
   - Create a repository on GitHub (e.g. `shivam-portfolio`).
   - Push these files to the repository.
   - Go to **Settings > Pages > Branch: main / root** & click **Save**.
   - Your site will be live at `https://[your-username].github.io/shivam-portfolio/`.

2. **Vercel / Netlify**:
   - Drag and drop this folder directly onto [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant global hosting.
