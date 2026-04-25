// Handle Sticky Storytelling Section
const initStickyStorytelling = () => {
  if (window.innerWidth <= 768) return;
  
  const triggers = document.querySelectorAll('.trigger');
  const menuItems = document.querySelectorAll('.menu-item');
  const visualImgs = document.querySelectorAll('.visual-img');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = entry.target.dataset.step;
        
        // Update menu items
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

  triggers.forEach(trigger => observer.observe(trigger));
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

  document.querySelectorAll('section').forEach(section => observer.observe(section));
};

// Smooth scroll for anchor links
const handleSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.startsWith('#step')) {
        // Special handling for sticky steps
        e.preventDefault();
        const targetId = href.startsWith('#step-') ? href : `#step-${this.dataset.step}`;
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
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
