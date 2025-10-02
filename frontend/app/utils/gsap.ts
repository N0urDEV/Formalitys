import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Keywords banner simple animation
export const animateKeywordsBanner = () => {
  // Simple scroll-triggered fade in animation
  ScrollTrigger.create({
    trigger: '.keywords-banner',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.keywords-banner', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });
};

// How It Works section animations
export const animateHowItWorks = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.how-it-works-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.how-it-works-section .section-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.how-it-works-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.how-it-works-section .section-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });

  // Steps cards staggered animation
  ScrollTrigger.create({
    trigger: '.how-it-works-section .steps-grid',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.how-it-works-section .step-card', 
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15
      }
    )
  });

  // CTA button animation
  ScrollTrigger.create({
    trigger: '.how-it-works-section .cta-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.how-it-works-section .cta-button', 
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1
      }
    )
  });
};

// Services section animations
export const animateServices = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.services-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.services-section .section-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.services-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.services-section .section-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });

  // Service cards staggered animation
  ScrollTrigger.create({
    trigger: '.services-section .services-grid',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.services-section .service-card', 
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2
      }
    )
  });
};

// Discount section animations
export const animateDiscountSection = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.discount-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.discount-section .discount-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.discount-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.discount-section .discount-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });

  // Tier cards staggered animation
  ScrollTrigger.create({
    trigger: '.discount-section .discount-tiers',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.discount-section .tier-card', 
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2
      }
    )
  });

  // Bottom info section animation
  ScrollTrigger.create({
    trigger: '.discount-section .discount-bottom-info',
    start: 'top 70%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.discount-section .discount-bottom-info', 
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      }
    )
  });
};

// Why Choose Us section animations
export const animateWhyChooseUs = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.why-choose-us-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.why-choose-us-section .section-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.why-choose-us-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.why-choose-us-section .section-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });

  // Feature cards staggered animation
  ScrollTrigger.create({
    trigger: '.why-choose-us-section .features-grid',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.why-choose-us-section .feature-card', 
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15
      }
    )
  });
};

// Blog section animations
export const animateBlog = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.blog-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.blog-section .section-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.blog-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.blog-section .section-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });

  // Blog cards staggered animation
  ScrollTrigger.create({
    trigger: '.blog-section .blog-grid',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.blog-section .blog-card', 
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2
      }
    )
  });

  // View all button animation
  ScrollTrigger.create({
    trigger: '.blog-section .blog-cta',
    start: 'top 70%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.blog-section .blog-cta-button', 
      {
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1
      }
    )
  });
};

// FAQ section animations
export const animateFAQ = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.faq-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.faq-section .section-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.faq-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.faq-section .section-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });

  // FAQ items staggered animation
  ScrollTrigger.create({
    trigger: '.faq-section .faq-items',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.faq-section .faq-item', 
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1
      }
    )
  });

  // CTA button animation
  ScrollTrigger.create({
    trigger: '.faq-section .faq-cta',
    start: 'top 70%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.faq-section .faq-cta-button', 
      {
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1
      }
    )
  });
};

// CTA Section animations
export const animateCTA = () => {
  // Title animation
  ScrollTrigger.create({
    trigger: '.cta-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.cta-section .section-title', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  });

  // Subtitle animation
  ScrollTrigger.create({
    trigger: '.cta-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.cta-section .section-subtitle', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  });
};

// Footer animations
export const animateFooter = () => {
  // Footer content staggered animation
  ScrollTrigger.create({
    trigger: '.footer-section',
    start: 'top 90%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.footer-section .footer-content', 
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15
      }
    )
  });

  // Footer bottom animation
  ScrollTrigger.create({
    trigger: '.footer-section .footer-bottom',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo('.footer-section .footer-bottom', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      }
    )
  });
};

// Hero section animations
export const animateHeroSection = () => {
  const tl = gsap.timeline();
  
  // Navbar slides down from top
  tl.fromTo('.navbar', {
    y: -100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Title slides up from bottom with delay
  tl.fromTo('.hero-title', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.4');

  // Keyword chips slide up with delay
  tl.fromTo('.hero-chips', {
    y: 60,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  // Subtitle slides up with delay
  tl.fromTo('.hero-subtitle', {
    y: 80,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4');

  // Buttons slide up with delay
  tl.fromTo('.hero-buttons', {
    y: 60,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4');

  // Decorative elements fade in
  tl.fromTo('.hero-decorative', {
    opacity: 0,
    scale: 0.8
  }, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.8');

  return tl;
};

export default gsap;
