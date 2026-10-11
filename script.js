// Reveal-on-scroll for content sections
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{ threshold:0.2 });
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  // Click a nav link -> smoothly move to that section (and only that section)
  const navLinks = document.querySelectorAll('nav .links a');
  navLinks.forEach(link=>{
    link.addEventListener('click', (e)=>{
      const targetId = link.getAttribute('href');
      if(targetId && targetId.startsWith('#')){
        const target = document.querySelector(targetId);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior:'smooth', block:'start' });
        }
      }
    });
  });

  // Highlight the nav link for whichever section is currently in view
  const trackedSections = document.querySelectorAll('section[id], footer[id]');
  const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = entry.target.getAttribute('id');
      const matchingLink = document.querySelector(`nav .links a[href="#${id}"]`);
      if(!matchingLink) return;
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('active'));
        matchingLink.classList.add('active');
      }
    });
  },{ rootMargin:'-45% 0px -45% 0px', threshold:0 });
  trackedSections.forEach(sec=>sectionObserver.observe(sec));