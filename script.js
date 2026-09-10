/**
 * Shivam Prakash - Student Portfolio JavaScript
 * Clean, modular logic for Theme Toggling, Typewriter Effect, Project Filtering, Modals, Form Validation, and Scroll Spy.
 * All project and personal fields are structured as easy-to-edit templates without invented demo data.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initScrollEffects();
  initMobileDrawer();
  initProjectFilters();
  initProjectModal();
  initResumeModal();
  initContactForm();
  initClipboardCopy();
  initCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to dark theme or user preference
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  // Sync with OS theme if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect (Clean, relevant student topics)
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const phrases = [
    'AI & Machine Learning.',
    'Python & C++ Programming.',
    'Data Structures & Algorithms.',
    'Web Technologies & Git.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* --------------------------------------------------------------------------
   3. Scroll Effects (Progress Bar, Scroll-Spy, Back-to-Top)
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Top scroll progress bar
    if (progressBar && windowHeight > 0) {
      const progressPercent = (scrollY / windowHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Back to top floating button
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll-spy active link indicator
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerResumeBtn = document.getElementById('drawer-resume-btn');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  if (drawerResumeBtn) {
    drawerResumeBtn.addEventListener('click', () => {
      closeDrawer();
      if (window.openResumeModal) window.openResumeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   5. Projects Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Modal Data (Pure Placeholder Template - Easy to Edit)
   -------------------------------------------------------------------------- */
const projectData = {
  p1: {
    title: '[Project Title 1: AI / ML Project]',
    category: 'AI & Machine Learning',
    image: 'assets/project-placeholder.svg',
    description: '[Enter a detailed description of your first project. Mention what motivated the project, the dataset or concept behind it, and what problem it solves.]',
    highlights: [
      '[Key architectural point or model used e.g., Linear Regression, Decision Trees, Neural Network]',
      '[Data preprocessing steps or libraries utilized e.g., Pandas, NumPy, Scikit-learn]',
      '[Key feature or outcome achieved e.g., Evaluation metrics, web demo, or visualization]'
    ],
    tech: ['Python', 'AI / ML', '[Library 1]', '[Library 2]'],
    github: 'https://github.com/[your-github-username]/[project-repo-1]',
    demo: 'https://[your-demo-url-1]'
  },
  p2: {
    title: '[Project Title 2: Web Project]',
    category: 'Web Development',
    image: 'assets/project-placeholder.svg',
    description: '[Enter a detailed description of your web project. Outline what the website or application does, how users interact with it, and its design.]',
    highlights: [
      '[Frontend layout and styling methodology e.g., Semantic HTML5, CSS Flexbox/Grid]',
      '[Interactive functionality e.g., Dynamic DOM manipulation, form validation, or API fetch]',
      '[Mobile responsiveness and accessibility considerations]'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/[your-github-username]/[project-repo-2]',
    demo: 'https://[your-demo-url-2]'
  },
  p3: {
    title: '[Project Title 3: C++ / Core Tool]',
    category: 'Algorithms & Tools',
    image: 'assets/project-placeholder.svg',
    description: '[Enter a detailed description of your programming or algorithmic project. Explain the data structures or logic implemented.]',
    highlights: [
      '[Core data structures or algorithms implemented e.g., Linked List, Binary Tree, Sorting algorithm]',
      '[Time and space complexity optimizations]',
      '[Command-line interface or test cases implemented]'
    ],
    tech: ['C / C++', 'Data Structures', 'Git'],
    github: 'https://github.com/[your-github-username]/[project-repo-3]',
    demo: 'https://[your-demo-url-3]'
  }
};

function initProjectModal() {
  const projectModal = document.getElementById('project-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalTitle = document.getElementById('project-modal-title');
  const detailButtons = document.querySelectorAll('.project-details-trigger');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    projectModalTitle.textContent = data.title;
    projectModalBody.innerHTML = `
      <div class="modal-project-view">
        <img src="${data.image}" alt="${data.title}" class="modal-project-img" style="width:100%; border-radius:12px; margin-bottom:1.2rem; aspect-ratio:16/9; object-fit:cover; border:1px solid var(--border-subtle);">
        <span class="tag-pill tag-primary" style="margin-bottom:0.8rem; display:inline-block;">${data.category}</span>
        <p style="color:var(--text-secondary); margin-bottom:1.2rem; font-size:0.95rem; line-height:1.6;">${data.description}</p>
        
        <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.6rem; color:var(--text-primary);">Key Project Highlights:</h4>
        <ul style="list-style:disc; padding-left:1.2rem; margin-bottom:1.4rem; color:var(--text-secondary); font-size:0.9rem;">
          ${data.highlights.map(h => `<li style="margin-bottom:0.4rem;">${h}</li>`).join('')}
        </ul>

        <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.6rem; color:var(--text-primary);">Technologies:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:1.6rem;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; padding-top:1rem; border-top:1px solid var(--border-subtle);">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub Repository</span>
          </a>
          <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span>Live Demonstration</span>
          </a>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Resume Modal & Handlers
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const headerResumeBtn = document.getElementById('header-resume-btn');
  const heroResumeBtn = document.getElementById('hero-cta-resume');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const downloadResumeBtn = document.getElementById('download-resume-btn');

  function openResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openResumeModal = openResume;

  if (headerResumeBtn) headerResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });

  // Print button
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Download Resume text template
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      const resumeContent = `=====================================================
SHIVAM PRAKASH
1st-Year B.Tech CSE (Artificial Intelligence & Machine Learning)
Email: [your-email@example.com]
Phone: [Your Phone Number]
Location: [Your City, State, India]
GitHub: https://github.com/[your-github-username]
LinkedIn: https://linkedin.com/in/[your-linkedin-username]
LeetCode: https://leetcode.com/[your-leetcode-username]
=====================================================

CAREER OBJECTIVE:
1st-year B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning) student with an interest in Python, C/C++, core computer science fundamentals, and data structures. Eager to expand practical knowledge, build software projects, and contribute to collaborative engineering teams.

EDUCATION:
- Bachelor of Technology (B.Tech) in CSE (AI & ML)
  [Your College / University Name, City]
  Duration: 2024 - 2028 (Expected) | 1st Year (CGPA: [Your CGPA]/10.0)
  Coursework: Programming in C/C++, Python, Linear Algebra, Data Structures Basics.

- Senior Secondary (Class XII - Science Stream)
  [Your School / Junior College Name, City]
  Year: [2022 - 2024] | Score: [Your Percentage / Grade]

- Secondary School (Class X)
  [Your High School Name, City]
  Year: [2021 - 2022] | Score: [Your Percentage / Grade]

TECHNICAL SKILLS:
- Languages: Python, C, C++, JavaScript, HTML, CSS
- AI & Data: AI/ML Fundamentals, NumPy, Pandas, Scikit-learn Basics
- Developer Tools: Git, GitHub, VS Code
- CS Fundamentals: Data Structures & Algorithms Basics, Problem Solving

PROJECTS:
- [Project Title 1]: [Technologies Used]
  * [Describe key contribution, architecture, or model in this project.]
  * [Describe the outcome, accuracy, or user interface implemented.]

- [Project Title 2]: [Technologies Used]
  * [Describe what this project accomplishes and technologies used.]

CERTIFICATIONS & ACHIEVEMENTS:
- [Certification / Course Title] - [Issuing Organization] ([Year])
- [Hackathon / Competition / Award] - [Organization] ([Year])
=====================================================`;

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Shivam_Prakash_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Resume text template downloaded!', 'success');
    });
  }
}

/* --------------------------------------------------------------------------
   8. Contact Form Validation & Simulated Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('form-submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('error');
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('error');
      nameError.classList.remove('visible');
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailInput.classList.remove('error');
      emailError.classList.remove('visible');
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
      messageInput.classList.add('error');
      messageError.classList.add('visible');
      isValid = false;
    } else {
      messageInput.classList.remove('error');
      messageError.classList.remove('visible');
    }

    if (!isValid) return;

    // Submit state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      const senderName = nameInput.value.trim();
      form.reset();
      showToast(`Thank you, ${senderName}! Your message form has been tested successfully.`, 'success');
    }, 1000);
  });

  // Clear errors when typing
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const err = input.closest('.form-group').querySelector('.form-error-msg');
      if (err) err.classList.remove('visible');
    });
  });
}

/* --------------------------------------------------------------------------
   9. Copy Email to Clipboard
   -------------------------------------------------------------------------- */
function initClipboardCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('contact-email-link');

  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', () => {
      const email = emailLink.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!', 'success');
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          `;
        }, 2000);
      }).catch(() => {
        showToast('Please copy email manually.', 'info');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   10. Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  
  const icon = type === 'success' ? '✅' : '⚡';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/* --------------------------------------------------------------------------
   11. Footer Current Year
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
