document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const handleScroll = () => {
      if (window.scrollY > 0) {
        nav.classList.add('navbar-fixed');
      } else {
        nav.classList.remove('navbar-fixed');
      }
    };
    window.addEventListener('scroll', handleScroll);
  });
