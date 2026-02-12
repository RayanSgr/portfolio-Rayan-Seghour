document.addEventListener("DOMContentLoaded", () => {
  // Navigation scroll effect
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section, header")
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinksContainer = document.querySelector(".nav-links")

  // Skill bars animation
  const skillBars = document.querySelectorAll(".skill-progress")

  // Initialize skill bars with width 0
  skillBars.forEach((bar) => {
    bar.style.width = "0"
  })

  // Scroll event listener
  window.addEventListener("scroll", () => {
    // Active nav link on scroll
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })

    // Animate skill bars when in viewport
    const aboutSection = document.querySelector("#about")
    if (isInViewport(aboutSection)) {
      skillBars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width")
        if (targetWidth) {
          bar.style.width = targetWidth + "%"
        }
      })
    }
  })

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinksContainer.classList.toggle("active")

      // Animate hamburger menu
      const bars = document.querySelectorAll(".bar")
      if (menuToggle.classList.contains("active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
      } else {
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active")
      if (menuToggle) {
        menuToggle.classList.remove("active")

        const bars = document.querySelectorAll(".bar")
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })
  })

  // Modal functionality for projects
  const projectItems = document.querySelectorAll(".project-item")

  projectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const modalType = this.getAttribute("data-modal")
      openModal(modalType)
    })
  })

  // Modal functionality for stages
  const stageButtons = document.querySelectorAll(".stage-btn")

  stageButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation()
      const stageType = this.getAttribute("data-stage")
      openModal(stageType)
    })
  })

  // Download button functionality
  const downloadButtons = document.querySelectorAll(".download-btn")

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Simuler le téléchargement
      alert("Le téléchargement du rapport de stage va commencer...")
      // Ici vous pourriez ajouter la logique réelle de téléchargement
    })
  })

  // Contact button animation
  const contactButton = document.querySelector(".contact-button")
  if (contactButton) {
    contactButton.addEventListener("click", () => {
      alert("Formulaire de contact en cours de développement. Veuillez me contacter par email ou téléphone.")
    })
  }

  // Helper function to check if element is in viewport
  function isInViewport(element) {
    if (!element) return false
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Trigger initial scroll to set active nav link
  window.dispatchEvent(new Event("scroll"))
})

// Modal functions
function openModal(type) {
  const modal = document.getElementById(`${type}Modal`)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.classList.remove("show")
  })
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      closeModal()
    }
  })
})
