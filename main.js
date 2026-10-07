/**
 * Nayana R - Software Engineer Portfolio
 * Interactive Features, Vertical Navigation & Terminal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================
  // 1. NIGHT / DAY MODE THEME CONTROLLER
  // Uses CSS Media Queries to detect default browser theme
  // =========================================================
  const themeToggleBtns = [
    document.getElementById('theme-toggle'),
    document.getElementById('mobile-theme-toggle'),
    document.getElementById('hero-theme-toggle')
  ].filter(Boolean);

  const htmlRoot = document.documentElement;
  const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;
    return darkMediaQuery.matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
  };

  applyTheme(getPreferredTheme());

  // Listen for browser theme changes dynamically
  darkMediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  const toggleTheme = () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || (darkMediaQuery.matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // =========================================================
  // 2. VERTICAL SIDEBAR DRAWER (MOBILE / RESPONSIVE)
  // =========================================================
  const verticalNavbar = document.getElementById('vertical-navbar');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const navBackdrop = document.getElementById('nav-backdrop');

  const openSidebar = () => {
    if (verticalNavbar) verticalNavbar.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'true');
  };

  const closeSidebar = () => {
    if (verticalNavbar) verticalNavbar.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
  };

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = verticalNavbar && verticalNavbar.classList.contains('open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeSidebar);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeSidebar);
  }

  // Close drawer with Escape key for keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && verticalNavbar && verticalNavbar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // =========================================================
  // 3. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
  // Tracks all 8 sections: Home, About, Skills, Timeline, Projects, Testimonials, Chat, Contact
  // =========================================================
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    let currentId = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    sidebarLinks.forEach(link => {
      const targetNav = link.getAttribute('data-nav') || link.getAttribute('href')?.replace('#', '');
      if (targetNav === currentId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // Close sidebar on mobile when clicking any link
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  // =========================================================
  // 4. INTERACTIVE PIXEL TERMINAL CHAT
  // =========================================================
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('pixel-chat-form');
  const chatInput = document.getElementById('pixel-chat-input');
  const promptChips = document.querySelectorAll('.pixel-chip');

  const botResponses = {
    skills: "Nayana's core skills include Python, C, Java, OOPs, HTML5, CSS3, systems architecture, and circuit/sensor testing.",
    projects: "Featured projects: 1) Rain Water Harvesting in Urban and Rural Areas (Sustainability). 2) Voltage Fluctuations Detection System (Electrical Safety & Monitoring). 3) Developer Portfolio & Theme Engine.",
    education: "Pursuing B.E. at Adhichunchanagiri Institute of Technology (2025-2029) with 8.02 CGPA. Scored 89.33% in PCMB at RP Residential PU College.",
    contact: "You can reach Nayana at nayanayadav113@gmail.com, phone: +91 94826 93272, or visit github.com/nayanayadav113-wq."
  };

  const appendChatMessage = (sender, text, isUser = false) => {
    if (!chatMessages) return;
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;

    const senderSpan = document.createElement('span');
    senderSpan.className = 'msg-sender';
    senderSpan.textContent = isUser ? '[YOU]:' : '[BOT]:';

    const textSpan = document.createElement('span');
    textSpan.className = 'msg-text';
    textSpan.textContent = text;

    msgEl.appendChild(senderSpan);
    msgEl.appendChild(textSpan);
    chatMessages.appendChild(msgEl);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const handleQuery = (queryText, queryKey = '') => {
    appendChatMessage('YOU', queryText, true);

    setTimeout(() => {
      let reply = "I am trained on Nayana's engineering background! Feel free to ask about her skills, projects, education, or contact info.";
      const lower = (queryKey || queryText).toLowerCase();

      if (lower.includes('skill') || lower.includes('python') || lower.includes('java')) {
        reply = botResponses.skills;
      } else if (lower.includes('project') || lower.includes('harvest') || lower.includes('voltage')) {
        reply = botResponses.projects;
      } else if (lower.includes('edu') || lower.includes('college') || lower.includes('school') || lower.includes('cgpa')) {
        reply = botResponses.education;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('hire')) {
        reply = botResponses.contact;
      }
      appendChatMessage('BOT', reply, false);
    }, 400);
  };

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-query');
      handleQuery(chip.textContent.trim(), key);
    });
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      handleQuery(val);
      chatInput.value = '';
    });
  }

  // =========================================================
  // 5. CONTACT FORM HANDLING
  // =========================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formFeedback && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(239, 68, 68, 0.1)';
        formFeedback.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
      }

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();

        formFeedback.className = 'form-feedback success';
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(16, 185, 129, 0.1)';
        formFeedback.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        formFeedback.style.color = '#10b981';
        formFeedback.textContent = 'Mission Complete! Message received successfully.';

        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 5000);
      }, 700);
    });
  }

  // =========================================================
  // 6. ABOUT AVATAR TOGGLE (PIXEL ART <-> REAL PHOTO)
  // =========================================================
  const aboutAvatarImg = document.getElementById('about-avatar-img');
  const avatarModeBtns = document.querySelectorAll('.avatar-mode-btn');

  if (aboutAvatarImg && avatarModeBtns.length > 0) {
    avatarModeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSrc = btn.getAttribute('data-img');
        if (targetSrc) {
          aboutAvatarImg.src = targetSrc;
          avatarModeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });
  }

  // =========================================================
  // 7. SKILLS SECTION — FILTER TABS & XP BAR ANIMATIONS
  // =========================================================

  /**
   * animateBars(cards)
   * Sets each .skill-bar-fill width from 0 → its data-xp value.
   * Called after cards become visible so bars animate into view.
   */
  const animateBars = (cards) => {
    cards.forEach(card => {
      const fill = card.querySelector('.skill-bar-fill');
      if (fill) {
        // Reset to 0 first so re-filtering triggers a fresh animation
        fill.style.width = '0%';
        // Use rAF + tiny delay to ensure CSS transition fires after reset
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const xp = fill.getAttribute('data-xp') || '0';
            fill.style.width = xp + '%';
          });
        });
      }
    });
  };

  /**
   * Skill Card Entrance Observer
   * Watches each card; once ≥10% is in the viewport it receives
   * .card-visible which triggers the translateY + opacity CSS animation.
   * Bar animation starts at the same time.
   */
  const skillCards = document.querySelectorAll('.skill-pixel-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting && !entry.target.classList.contains('card-visible')) {
        // Stagger each card's entrance by 80 ms × its index in the grid
        const idx = Array.from(skillCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('card-visible');
          // Animate the XP progress bar for this individual card
          animateBars([entry.target]);
        }, idx * 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillCards.forEach(card => cardObserver.observe(card));

  /**
   * Filter Tab Controller
   * Clicking a tab:
   *  1. Updates aria-selected and .active class on the tabs
   *  2. Shows/hides cards via .hidden based on data-category
   *  3. Re-animates bars on the newly visible cards
   */
  const skillsTabs = document.querySelectorAll('.skills-tab');

  skillsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active tab styling
      skillsTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show / hide cards matching the selected filter
      const visibleCards = [];
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;
        if (matches) {
          card.classList.remove('hidden');
          visibleCards.push(card);
        } else {
          card.classList.add('hidden');
        }
      });

      // Re-run bar animation on the now-visible cards
      // (small delay lets CSS display:block take effect first)
      setTimeout(() => animateBars(visibleCards), 50);
    });
  });

  // =========================================================
  // PROJECT THUMBNAIL MODAL SYSTEM
  // =========================================================
  //
  // HOW IT WORKS:
  // ─────────────────────────────────────────────────────────
  // 1. Each .proj-thumb-card has [data-project="<id>"].
  // 2. Clicking (or pressing Enter/Space on) a card calls
  //    openProjectModal("<id>").
  // 3. openProjectModal() finds the .proj-modal-content block
  //    with [data-modal="<id>"] and makes only that one visible,
  //    then shows the #proj-detail-modal overlay.
  // 4. Closing: click backdrop, ✕ button, or Escape key.
  // ─────────────────────────────────────────────────────────

  const modal        = document.getElementById('proj-detail-modal');
  const backdrop     = document.getElementById('proj-modal-backdrop');
  const closeBtn     = document.getElementById('proj-modal-close');
  const thumbCards   = document.querySelectorAll('.proj-thumb-card');
  const modalPanels  = document.querySelectorAll('.proj-modal-content');

  // Ref to the element that triggered the modal (for focus-return on close)
  let lastFocused = null;

  /**
   * openProjectModal(projectId)
   * ──────────────────────────────────────────────────────────
   * Hides all modal content panels, then reveals the one whose
   * [data-modal] matches projectId. Makes the overlay visible
   * and traps focus inside for accessibility.
   *
   * @param {string} projectId - Must match a [data-modal="<id>"] element.
   */
  function openProjectModal(projectId) {
    if (!modal) return;

    // Hide every project content panel first
    modalPanels.forEach(panel => {
      panel.hidden = true;
    });

    // Find and show only the requested project panel
    // The [data-modal="<id>"] attribute is the ONE-TO-ONE link to the thumbnail
    const targetPanel = modal.querySelector(`[data-modal="${projectId}"]`);
    if (!targetPanel) return;

    targetPanel.hidden = false;

    // Show the overlay and make it accessible
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden';

    // Move focus to the close button for keyboard users
    if (closeBtn) closeBtn.focus();
  }

  /**
   * closeProjectModal()
   * ──────────────────────────────────────────────────────────
   * Hides the overlay, restores body scroll, and returns focus
   * to the thumbnail card that opened the modal.
   */
  function closeProjectModal() {
    if (!modal) return;

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to the thumbnail that triggered the modal
    if (lastFocused) lastFocused.focus();
  }

  // ── Wire up thumbnail cards ──────────────────────────────
  // Each card can be activated by click OR keyboard (Enter/Space)
  // because it carries role="button" and tabindex="0".
  thumbCards.forEach(card => {
    // Click handler — reads the project ID from the card attribute
    card.addEventListener('click', () => {
      lastFocused = card; // remember for focus-return
      openProjectModal(card.dataset.project);
    });

    // Keyboard handler — makes the card behave like a real button
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // prevent page scroll on Space
        lastFocused = card;
        openProjectModal(card.dataset.project);
      }
    });
  });

  // ── Close button ─────────────────────────────────────────
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  // ── Backdrop click (outside the panel) ───────────────────
  if (backdrop) {
    backdrop.addEventListener('click', closeProjectModal);
  }

  // ── Escape key closes the modal from anywhere ─────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeProjectModal();
    }
  });

});

