import { useEffect } from 'react';

const useScrollAnimations = () => {
  useEffect(() => {
    let ctx;
    let isReverted = false;

    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (isReverted) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const sections = document.querySelectorAll('.gsap-reveal');
        sections.forEach((section) => {
          const children = section.children;
          gsap.fromTo(
            children,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        const parallaxEls = document.querySelectorAll('.gsap-parallax');
        parallaxEls.forEach((el) => {
          gsap.to(el, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        const counters = document.querySelectorAll('.gsap-count');
        counters.forEach((counter) => {
          const target = parseInt(counter.dataset.count) || 0;
          const obj = { value: 0 };
          
          ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(obj, {
                value: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  counter.textContent = Math.round(obj.value);
                },
              });
            },
            once: true,
          });
        });
      });
    };

    const scheduleInit = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          initAnimations();
        });
      } else {
        setTimeout(initAnimations, 200);
      }
    };

    if (document.readyState === 'complete') {
      scheduleInit();
    } else {
      window.addEventListener('load', scheduleInit, { once: true });
    }

    return () => {
      isReverted = true;
      window.removeEventListener('load', scheduleInit);
      if (ctx) ctx.revert();
      
      // Dynamically clean up ScrollTrigger if it has been loaded
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }).catch(() => {});
    };
  }, []);
};

export default useScrollAnimations;
