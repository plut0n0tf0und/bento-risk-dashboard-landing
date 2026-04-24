// Handle Sticky Storytelling Section
const initStickyStorytelling = () => {
  const sections = document.querySelectorAll('.workflow-section');
  const menuItems = document.querySelectorAll('.menu-item');
  const visualImgs = document.querySelectorAll('.visual-img');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -20% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = entry.target.dataset.step;
        
        // Update menu items (Descriptions will sync via .active class in CSS)
        menuItems.forEach(item => {
          item.classList.toggle('active', item.dataset.step === step);
        });

        // Update visual images
        visualImgs.forEach(img => {
          img.classList.toggle('active', img.dataset.step === step);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
};

// Global scroll animations
const observeSections = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section:not(.workflow-section)').forEach(section => observer.observe(section));
};

// Smooth scroll for anchor links
const handleSmoothScroll = () => {
  document.querySelectorAll('.menu-item').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const step = this.dataset.step;
      const targetId = {
        '1': 'connect-section',
        '2': 'design-section',
        '3': 'map-section',
        '4': 'name-section',
        '5': 'dashboard-section'
      }[step];

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initStickyStorytelling();
  observeSections();
  handleSmoothScroll();
});
