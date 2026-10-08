/* ============================================
   Luxe Glow Beauty Salon - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Preloader -----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // ----- Sticky Header -----
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });

  // ----- Mobile Menu -----
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ----- Active Nav Link on Scroll -----
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);

  // ----- Scroll Animations -----
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // Stagger children in grids
  document.querySelectorAll('.services-grid, .pricing-grid, .gallery-grid, .testimonials-slider').forEach(grid => {
    const children = grid.querySelectorAll('.animate-on-scroll');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  // ----- Gallery Filter -----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hide');
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // ----- Back to Top -----
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ----- Booking Form → WhatsApp -----
  const bookingForm = document.getElementById('booking-form');
  const WHATSAPP_NUMBER = '923001234567'; // Change to real number

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !service || !date || !time) {
      alert('Please fill all required fields.');
      return;
    }

    // Format date nicely
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-PK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let text = `*New Booking Request - Luxe Glow Beauty Salon*%0A%0A`;
    text += `*Name:* ${name}%0A`;
    text += `*Phone:* ${phone}%0A`;
    text += `*Service:* ${service}%0A`;
    text += `*Date:* ${formattedDate}%0A`;
    text += `*Time:* ${time}%0A`;
    if (message) {
      text += `*Special Request:* ${message}%0A`;
    }
    text += `%0APlease confirm my appointment. Thank you!`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(whatsappURL, '_blank');

    // Optional: reset form after short delay
    setTimeout(() => {
      bookingForm.reset();
    }, 1000);
  });

  // Set min date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // ----- Smooth scroll for all anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Fade-in keyframe for gallery (injected)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);
