// Select elements for the scroll animation and typing effect
const animatedSections = document.querySelectorAll('[data-anim]');
const typingText = document.querySelector('.typing-text');
const typePhrases = [
  'Artificial Intelligence',
  'Personalized Learning',
  'Career Success'
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

// IntersectionObserver to fade in elements when they enter the viewport
const observerOptions = {
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedSections.forEach((section) => observer.observe(section));

// Simple typing animation for the hero heading
function typeWriter() {
  const currentPhrase = typePhrases[typeIndex];
  const displayedText = isDeleting
    ? currentPhrase.substring(0, charIndex - 1)
    : currentPhrase.substring(0, charIndex + 1);

  typingText.textContent = displayedText;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(typeWriter, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 40);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
    } else {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % typePhrases.length;
      setTimeout(typeWriter, 500);
    }
  }
}

// Start the typing effect once the page is loaded
window.addEventListener('load', () => {
  if (typingText) {
    typeWriter();
  }
});

// Mobile navigation toggle for small screens
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    navToggle.classList.toggle('open');
  });
}

// Smoothly highlight active navigation link while scrolling
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < top + height) {
      navItems.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
});

// Prevent form submission while keeping the UI responsive and beginner-friendly
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('.btn-submit');
    submitButton.textContent = 'Message Sent';
    submitButton.classList.add('sent');
    setTimeout(() => {
      submitButton.textContent = 'Send Message';
      submitButton.classList.remove('sent');
    }, 2200);
  });
}

// Add interactive tilt effect for topic cards in the topics section
const topicCards = document.querySelectorAll('.topic-card');
if (topicCards.length) {
  topicCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.setProperty('--tilt-x', `${y}deg`);
      card.style.setProperty('--tilt-y', `${x}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

// Add smooth hover animation for how-it-works cards
const howCards = document.querySelectorAll('.how-card');
howCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Add glow effect for math-ai cards
const mathAiCards = document.querySelectorAll('.math-ai-card');
mathAiCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 60px rgba(124, 231, 255, 0.25)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// Add enhanced animation for career cards
const careerCards = document.querySelectorAll('.career-card');
careerCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-fill');
if (progressBars.length > 0) {
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach((bar) => progressObserver.observe(bar));
}

// Close mobile nav when a link is clicked
navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    navToggle.classList.remove('open');
  });
});
