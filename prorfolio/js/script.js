/**
 * ==========================================================================
 * MOHAMED RAGAB HAMDY — DATA ANALYST PORTFOLIO
 * Vanilla JavaScript Functionality & Micro-Interactions
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initProjectModals();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGER (DARK / LIGHT MODE)
   Default is Dark Mode as required
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('mrh_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('mrh_portfolio_theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. NAVBAR SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      navMenu.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking on any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   5. SCROLL REVEAL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered reveal effect
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 40);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   6. PROJECT MODAL & CASE STUDY DATA (WITH IMAGES)
   -------------------------------------------------------------------------- */
const projectsData = {
  'modal-p1': {
    number: 'PROJECT 01',
    title: 'Salla Call Center Dashboard',
    industry: 'Call Center Operations',
    image: 'images/salla-dashboard.png',
    tools: ['Power BI', 'DAX', 'Data Modeling'],
    dataset: '450 Rows × 12 Columns',
    description: 'An interactive Power BI dashboard designed to analyze call center performance, monitor operational KPIs, and identify call volume patterns.',
    metrics: ['Calls Offered', 'Calls Handled', 'Calls Abandoned', 'ASA (Average Speed of Answer)', 'Answer Time'],
    kpis: ['Total Calls Offered (3M)', 'Service Level (92%)', 'Total Calls Handled (3M)', 'Abandon Rate (1.4%)'],
    keyInsight: 'Call volume tends to be significantly higher at the beginning of each month, putting peak load on customer support queues.',
    recommendation: 'Improve call-handling efficiency and prepare additional staff allocation and resources during the first week of the month.',
    github: 'https://github.com/Mohamed32213'
  },
  'modal-p2': {
    number: 'PROJECT 02',
    title: 'Adidas Sales Dashboard',
    industry: 'Sales & Retail Analytics',
    image: 'images/adidas-dashboard.png',
    tools: ['Power BI', 'Data Modeling', 'Geographic Mapping'],
    dataset: '9,648 Rows × 13 Columns',
    description: 'A sales analytics dashboard created to evaluate Adidas sales performance across US regions, identify changes in sales trends, and extract actionable business insights.',
    metrics: ['Retailer Name', 'State / Region', 'Price per Unit', 'Total Sales Volume', 'Operating Profit', 'Operating Margin %'],
    kpis: ['Total Sales Revenue ($900M)', 'Operating Profit ($332M)', 'Total Units Sold (2M)', 'Average Operating Margin (36.9%)'],
    keyInsight: 'The West region of the USA represents a major portion of overall sales ($270M), driving profitability while certain seasonal dips occur mid-year.',
    recommendation: 'Strengthen advertising and promotional activities during periods where sales performance is weaker, while maintaining strong inventory and retail presence in high-performing Western regions.',
    github: 'https://github.com/Mohamed32213'
  },
  'modal-p3': {
    number: 'PROJECT 03',
    title: 'Belabn Sales & Marketing Dashboard',
    industry: 'Marketing & Food Retail',
    image: 'images/belabn-dashboard.png',
    tools: ['Power BI', 'Microsoft Excel', 'Customer Segmentation'],
    dataset: '7,000 Rows × 31 Columns',
    description: 'A comprehensive sales and marketing dashboard focused on understanding product demand, sales performance, and customer purchasing patterns across branch networks.',
    metrics: ['Unit Price', 'Quantity Sold', 'Topping Type', 'Discount Rate', 'Payment Method', 'Region', 'Net Sales'],
    kpis: ['Total Gross Sales (7.26M)', 'Net Sales (6.61M)', 'Units Sold (42K)', 'Total Orders Volume (7K)'],
    keyInsight: 'Product sales proportions are relatively similar across locations and sales remain stable throughout the month. The Traditional category consistently generates the strongest baseline demand (33.88%).',
    recommendation: 'Focus marketing campaigns and featured placement on the high-demand Traditional category while continuing to monitor product-level margin performance and consumer demand fluctuations.',
    github: 'https://github.com/Mohamed32213'
  },
  'modal-p4': {
    number: 'PROJECT 04',
    title: 'Misuo E-commerce Dashboard',
    industry: 'E-commerce / Metal Furniture',
    image: 'images/misuo-dashboard.png',
    tools: ['Microsoft Excel', 'PivotTables', 'Power Query', 'Formulas'],
    dataset: '81 Rows × 13 Columns',
    description: 'An Excel-based e-commerce analysis designed to identify top-performing cities, customer color preferences, and best-selling product lines.',
    metrics: ['Customer Name', 'Sales Platform', 'Fabric Color', 'Product Name', 'Selling Price', 'Payment Method', 'Delivery Responsible'],
    kpis: ['Average Selling Price (10,916)', 'Total Orders (80)', 'Total Sales Revenue (873,275)', 'On-Time Delivery Rate'],
    keyInsight: 'Cairo and Giza generate the overwhelming majority of sales. Black and Brown are the most commonly selected fabric colors, and "HomeSmart" is the single best-selling furniture product.',
    recommendation: 'Expand targeted marketing activities and logistics into other governorates (Alexandria, Delta region) to reduce revenue dependence on Cairo and Giza and increase national sales coverage.',
    github: 'https://github.com/Mohamed32213'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!modalOverlay || !modalContent) return;

  const openModal = (modalKey) => {
    const data = projectsData[modalKey];
    if (!data) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <span style="color: var(--accent); font-weight: 700; font-size: 0.85rem;">${data.number}</span>
          <span style="font-size: 0.8rem; background: var(--bg-primary); padding: 0.25rem 0.65rem; border-radius: 9999px; border: 1px solid var(--border);">${data.industry}</span>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 0.75rem;">${data.title}</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem;">
          ${data.tools.map(t => `<span class="tool-badge">${t}</span>`).join('')}
          <span class="dataset-badge">${data.dataset}</span>
        </div>
      </div>

      <img src="${data.image}" alt="${data.title}" class="modal-img-preview" loading="lazy">

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.4rem; letter-spacing: 0.05em;">Project Summary</h4>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${data.description}</p>
      </div>

      <div style="background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Monitored KPIs & Metrics</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${data.kpis.map(k => `<span class="kpi-chip">${k}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.75rem;">
        <div style="background: var(--card-bg); border-left: 3px solid var(--cyan); padding: 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; border: 1px solid var(--border);">
          <strong style="color: var(--cyan); display: block; font-size: 0.85rem; margin-bottom: 0.25rem;">Key Analytical Insight</strong>
          <span style="font-size: 0.92rem; color: var(--text-secondary);">${data.keyInsight}</span>
        </div>
        <div style="background: var(--accent-subtle); border-left: 3px solid var(--accent); padding: 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; border: 1px solid var(--accent-glow);">
          <strong style="color: var(--accent); display: block; font-size: 0.85rem; margin-bottom: 0.25rem;">Business Recommendation</strong>
          <span style="font-size: 0.92rem; color: var(--text-secondary);">${data.recommendation}</span>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border); padding-top: 1.25rem; flex-wrap: wrap;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>View on GitHub</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM VALIDATION & SIMULATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMsg');
  const sendBtn = document.getElementById('sendMessageBtn');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.innerHTML = `<span>Sending...</span>`;
    }

    setTimeout(() => {
      statusMsg.classList.add('success');
      statusMsg.textContent = `Thank you, ${name}! Your message has been recorded. Feel free to connect directly on LinkedIn or Instagram.`;
      form.reset();

      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `
          <span>Message Sent!</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        setTimeout(() => {
          sendBtn.innerHTML = `
            <span>Send Message</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          `;
        }, 4000);
      }
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   8. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
