// Variables globales
let currentSection = "home"

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeSkillBars()
  initializeScrollEffects()
  initializeModals()
})

// Navigation
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle menu mobile
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Navigation smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)

      // Fermer le menu mobile
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })
}

// Fonction de scroll vers une section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Compensation pour la navbar fixe
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Animation des barres de compétences
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const animateSkills = () => {
    const aboutSection = document.getElementById("about")
    const rect = aboutSection.getBoundingClientRect()

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        bar.style.width = width + "%"
      })
    }
  }

  // Observer pour déclencher l'animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills()
        }
      })
    },
    { threshold: 0.3 },
  )

  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    observer.observe(aboutSection)
  }
}

// Effets de scroll
function initializeScrollEffects() {
  window.addEventListener("scroll", () => {
    updateActiveNavLink()
    updateNavbarBackground()
  })
}

// Mise à jour du lien actif dans la navigation
function updateActiveNavLink() {
  const sections = ["home", "about", "projects", "stages", "contact"]
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = sectionId
      }
    }
  })

  if (current && current !== currentSection) {
    currentSection = current

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  }
}

// Mise à jour du background de la navbar
function updateNavbarBackground() {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  }
}

// Gestion des modales
function initializeModals() {
  // Fermer les modales en cliquant à l'extérieur
  window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  })
}

// Ouvrir une modale
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Animation d'entrée
    setTimeout(() => {
      modal.style.opacity = "1"
    }, 10)
  }
}

// Fermer une modale
function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

// Fonctions utilitaires
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Animation au scroll pour les éléments
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add("animated")
    }
  })
}

// Gestion des erreurs
window.addEventListener("error", (e) => {
  console.error("Erreur JavaScript:", e.error)
})

// Performance - Debounce pour le scroll
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Appliquer le debounce au scroll
const debouncedScroll = debounce(() => {
  updateActiveNavLink()
  updateNavbarBackground()
  animateOnScroll()
}, 10)

window.addEventListener("scroll", debouncedScroll)
