
// Section EmailJS //
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  emailjs.init("2-" + "lX1h" + "aMopJEX4C8J"); // Obfuscation

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Anti-bot : champ honeypot
    const honeypot = form.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value !== "") {
      console.warn("Formulaire bloqué (spam détecté)");
      return;
    }

    // Vérification hCaptcha
    const token = hcaptcha.getResponse();
    if (!token) {
      alert("Merci de valider le captcha.");
      return;
    }

    // Envoi via EmailJS
    emailjs.sendForm("service_c8lnq97", "template_4vpm8yn", form).then(
      () => {
        messageBox.textContent = "✅ Message envoyé avec succès !";
        form.reset();
        hcaptcha.reset();
      },
      (error) => {
        messageBox.textContent = "❌ Une erreur est survenue.";
        console.error("EmailJS error:", error);
      }
    );
  });
});
//section scroll

window.addEventListener("scroll", function () {
  const topBtn = document.querySelector(".back-to-top");
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

// défilement fluide
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        console.log("✅ Scroll vers :", targetId);
      } else {
        console.warn("⚠️ ID introuvable :", targetId);
      }
    });
  });
});
// animation autoShow
const elements = document.querySelectorAll(".autoShow");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);
elements.forEach((el) => observer.observe(el));

// animation accordion service
document.querySelectorAll(".service-title").forEach((title) => {
  title.addEventListener("click", () => {
    const item = title.parentElement;

    item.classList.toggle("active");
  });
});

// essaie
