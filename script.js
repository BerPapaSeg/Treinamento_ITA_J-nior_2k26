document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll("main > section")];
  const nav = document.querySelector("body > header nav");
  const siteHeader = document.querySelector("body > header");
  const navLinks = [...document.querySelectorAll("body > header nav ul a")];
  const footerText = document.querySelector("body > footer p");
  const heroSubtitle = document.querySelector("main > section:first-of-type header h2");
  const allImages = [...document.querySelectorAll("figure img, section > div img")];

  const sectionIds = ["inicio", "feitos", "skills", "curiosidades"];
  const githubUrl = "assets/compe.png"; // troca aqui pelo seu GitHub

  /* adiciona ids nas seções automaticamente */
  sections.forEach((section, index) => {
    if (!section.id) {
      section.id = sectionIds[index] || `secao-${index + 1}`;
    }
    section.classList.add("reveal-start");
  });

  /* botão mobile criado por JS */
  const menuButton = document.createElement("button");
  menuButton.className = "menu-toggle";
  menuButton.setAttribute("aria-label", "Abrir menu");
  menuButton.textContent = "☰";
  nav.appendChild(menuButton);

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    siteHeader.classList.add("show-header");
    menuButton.textContent = nav.classList.contains("open") ? "✕" : "☰";
  });

  document.addEventListener("mousemove", (event) => {
  if (event.clientY <= 40) {
    siteHeader.classList.add("show-header");
  } else if (!siteHeader.matches(":hover") && !nav.classList.contains("open")) {
    siteHeader.classList.remove("show-header");
  }
});

siteHeader.addEventListener("mouseleave", () => {
  if (!nav.classList.contains("open")) {
    siteHeader.classList.remove("show-header");
  }
});

  /* links do menu */
  navLinks.forEach((link, index) => {
    link.style.cursor = "pointer";

    if (index < 4) {
      const targetId = sectionIds[index];

      link.addEventListener("click", () => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        nav.classList.remove("open");
        menuButton.textContent = "☰";
      });
    } else {
      link.addEventListener("click", () => {
        window.open(githubUrl, "_blank");
      });
    }
  });

  /* observer para revelar seções */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  sections.forEach((section) => revealObserver.observe(section));

  /* observer para link ativo */
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.id;

        navLinks.forEach((link, index) => {
          link.classList.remove("active");

          if (index < 4 && sectionIds[index] === activeId) {
            link.classList.add("active");
          }
        });
      });
    },
    {
      threshold: 0.45
    }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* efeito digitando no subtítulo principal */
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent.trim();
    heroSubtitle.textContent = "";

    let charIndex = 0;

    function typeWriter() {
      if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 36);
      }
    }

    typeWriter();
  }

  /* leve efeito 3D nas imagens */
  allImages.forEach((img, index) => {
    img.classList.add(index % 2 === 0 ? "glow-green" : "glow-red");

    img.addEventListener("mousemove", (event) => {
      const rect = img.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      img.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  /* ano automático no footer */
  if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = footerText.textContent.replace("2026", currentYear);
  }
});