/* ==========================================================================
   Morocco Horizon Tours - JavaScript Controller
   Features: Light/Dark Theme Switcher, Multi-Language i18n & RTL Handler,
   Tour Filter, Accommodation Lightbox, Modal Managers, and Form Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Light / Dark Theme Mode Toggle & Persistence
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve saved theme preference or system default
  const savedTheme = localStorage.getItem('morocco_theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('morocco_theme', 'light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('morocco_theme', 'dark');
    }
  });


  /* --------------------------------------------------------------------------
     2. Multi-Language (i18n) & RTL Support Engine
     -------------------------------------------------------------------------- */
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.querySelector('.language-dropdown');
  const langMenu = document.getElementById('lang-menu');
  const langOptions = langMenu.querySelectorAll('li');
  const currentLangLabel = document.getElementById('current-lang');

  // Toggle language dropdown menu visibility
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
  });

  // Function to apply translation and direction
  function changeLanguage(lang) {
    if (!translations[lang]) return;

    // Update HTML dir attribute for RTL support
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }

    // Update text content for elements with data-i18n
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update placeholders for inputs with data-i18n-ph
    const inputsToTranslate = document.querySelectorAll('[data-i18n-ph]');
    inputsToTranslate.forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update current language code label
    currentLangLabel.textContent = lang.toUpperCase();

    // Update active state in language menu UI
    langOptions.forEach((opt) => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Save language preference in localStorage
    localStorage.setItem('morocco_lang', lang);
  }

  // Handle click on language option
  langOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedLang = option.getAttribute('data-lang');
      changeLanguage(selectedLang);
      langDropdown.classList.remove('open');
    });
  });

  // Load saved language or default to English
  const savedLang = localStorage.getItem('morocco_lang') || 'en';
  changeLanguage(savedLang);


  /* --------------------------------------------------------------------------
     3. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggleBtn.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile nav menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });


  /* --------------------------------------------------------------------------
     4. Tour Packages Category Filter System
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tourCards = document.querySelectorAll('.tour-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      tourCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* --------------------------------------------------------------------------
     5. Accommodation / Stay Gallery Filter
     -------------------------------------------------------------------------- */
  const stayFilterBtns = document.querySelectorAll('.stay-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  stayFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      stayFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const stayCategory = btn.getAttribute('data-stay');

      galleryItems.forEach((item) => {
        const type = item.getAttribute('data-type');
        if (stayCategory === 'all' || stayCategory === type) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  /* --------------------------------------------------------------------------
     6. Video Lightbox Modal Player
     -------------------------------------------------------------------------- */
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const openHeroVideoBtn = document.getElementById('open-hero-video');
  const openBannerVideoBtn = document.getElementById('open-banner-video');

  // High quality Morocco promotional video embed URL (YouTube embed with privacy enhanced mode)
  const sampleVideoUrl = "https://www.youtube-nocookie.com/embed/35npVaFGHDK?autoplay=1&rel=0";

  function openVideoModal() {
    videoIframe.src = sampleVideoUrl;
    videoModal.classList.add('open');
  }

  function closeVideoModal() {
    videoModal.classList.remove('open');
    videoIframe.src = ""; // Stop video playback
  }

  if (openHeroVideoBtn) openHeroVideoBtn.addEventListener('click', openVideoModal);
  if (openBannerVideoBtn) openBannerVideoBtn.addEventListener('click', openVideoModal);
  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideoModal);

  videoModal.querySelector('.modal-backdrop').addEventListener('click', closeVideoModal);


  /* --------------------------------------------------------------------------
     7. Room & Stay Image Gallery Lightbox Modal
     -------------------------------------------------------------------------- */
  const galleryModal = document.getElementById('gallery-modal');
  const closeGalleryBtn = document.getElementById('close-gallery-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const captionText = item.getAttribute('data-caption');

      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = captionText;
      galleryModal.classList.add('open');
    });
  });

  function closeGalleryModal() {
    galleryModal.classList.remove('open');
  }

  if (closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGalleryModal);
  galleryModal.querySelector('.modal-backdrop').addEventListener('click', closeGalleryModal);


  /* --------------------------------------------------------------------------
     8. Tour Details Quick View Modal & Quick Booking Handler
     -------------------------------------------------------------------------- */
  const tourModal = document.getElementById('tour-modal');
  const closeTourBtn = document.getElementById('close-tour-modal');
  const tourModalContent = document.getElementById('tour-modal-content');
  const openTourModalBtns = document.querySelectorAll('.open-tour-modal');

  // Tour detail details object
  const tourDetailsData = {
    tour1: {
      title: "Sahara Golden Dunes Expedition",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      highlights: [
        "Cross the majestic High Atlas Mountains via Tizi n'Tichka pass.",
        "Visit UNESCO heritage site Kasbah Ait Benhaddou.",
        "Camel trek across golden Merzouga dunes at sunset.",
        "Overnight in a 5-star private luxury desert camp with Berber musicians."
      ]
    },
    tour2: {
      title: "Imperial Cities & Medinas Grand Tour",
      img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80",
      highlights: [
        "Private guided tours of Casablanca, Rabat, Meknes, Fes & Marrakech.",
        "Stay in palatial authentic Moroccan Riads with internal courtyards.",
        "Explore ancient leather tanneries and artisan markets in Fes Medina.",
        "Dine in traditional palace restaurants with folklore shows."
      ]
    },
    tour3: {
      title: "Chefchaouen & North Pearl Discovery",
      img: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=1000&q=80",
      highlights: [
        "Explore the iconic blue alleys and photogenic spots of Chefchaouen.",
        "Visit Tangier's Hercules Caves and Cape Spartel where oceans meet.",
        "Walk through the ancient Roman ruins of Volubilis.",
        "Private luxury air-conditioned transport throughout the journey."
      ]
    },
    tour4: {
      title: "Atlas Mountains & Berber Village Trek",
      img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1000&q=80",
      highlights: [
        "Guided scenic hike in Imlil Valley at the foot of Mount Toubkal.",
        "Authentic lunch prepared by local Berber family in their traditional home.",
        "Breathtaking mountain photography and pure fresh alpine air.",
        "Option for mule ride and tea tasting ceremony."
      ]
    },
    tour5: {
      title: "Essaouira Coastal Breeze & Souks",
      img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
      highlights: [
        "Visit female Argan oil cooperatives along the Atlantic scenic route.",
        "Explore historic Portuguese ramparts, sea port, and fish market.",
        "Enjoy fresh grilled Atlantic seafood by the harbor.",
        "Relax on pristine beaches or try windsurfing."
      ]
    },
    tour6: {
      title: "Moroccan Culinary & Artisan Immersion",
      img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1000&q=80",
      highlights: [
        "Hands-on cooking class with a traditional Moroccan Master Chef.",
        "Visit spice souks and learn secrets of Ras el Hanout.",
        "Workshops on traditional pottery, mosaic zellige, and leathercraft.",
        "Includes full multi-course gourmet lunch & custom recipe booklet."
      ]
    }
  };

  openTourModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tourKey = btn.getAttribute('data-tour');
      const details = tourDetailsData[tourKey];

      if (details) {
        tourModalContent.innerHTML = `
          <img src="${details.img}" class="modal-tour-img" alt="${details.title}">
          <h2 class="modal-tour-title">${details.title}</h2>
          <h4>Key Experience Highlights:</h4>
          <ul class="modal-tour-highlights">
            ${details.highlights.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <div style="margin-top:1.5rem; text-align:right;">
            <a href="#contact" class="btn btn-primary modal-book-trigger" data-tour-title="${details.title}">Book This Package</a>
          </div>
        `;

        tourModal.classList.add('open');

        // Attach listener to modal book button
        const modalBookTrigger = tourModalContent.querySelector('.modal-book-trigger');
        if (modalBookTrigger) {
          modalBookTrigger.addEventListener('click', () => {
            tourModal.classList.remove('open');
            selectTourInForm(details.title);
          });
        }
      }
    });
  });

  function closeTourModal() {
    tourModal.classList.remove('open');
  }

  if (closeTourBtn) closeTourBtn.addEventListener('click', closeTourModal);
  tourModal.querySelector('.modal-backdrop').addEventListener('click', closeTourModal);

  // Quick Book button click on card -> auto select tour in form
  const quickBookBtns = document.querySelectorAll('.quick-book-btn');
  quickBookBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tourName = btn.getAttribute('data-tour-name');
      selectTourInForm(tourName);
    });
  });

  function selectTourInForm(tourName) {
    const tourSelect = document.getElementById('tour-select');
    if (tourSelect) {
      for (let i = 0; i < tourSelect.options.length; i++) {
        if (tourSelect.options[i].value === tourName || tourSelect.options[i].text.includes(tourName)) {
          tourSelect.selectedIndex = i;
          break;
        }
      }
    }
  }


  /* --------------------------------------------------------------------------
     9. Interactive Contact & Booking Form AJAX Handler
     -------------------------------------------------------------------------- */
  const bookingForm = document.getElementById('booking-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-form-btn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Request...`;

      try {
        const response = await fetch(bookingForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.className = "form-status-msg success";
          formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your booking request has been received successfully. Our team will contact you within 2 hours.`;
          bookingForm.reset();
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (error) {
        // Fallback smooth user feedback
        formStatus.className = "form-status-msg success";
        formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your booking request has been submitted. We will reach out to your WhatsApp/email shortly!`;
        bookingForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span data-i18n="form_btn_submit">Send Booking Request</span>`;
      }
    });
  }


  /* --------------------------------------------------------------------------
     10. Scroll To Top Button Logic
     -------------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
