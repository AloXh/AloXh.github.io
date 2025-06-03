document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  // Ajoute la boîte de message une fois pour toutes
 const messageBox = document.getElementById("messageBox");


  function showMessage(message, type = "success") {
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
  }
  let captchaInput = form.querySelector('input[name="g-recaptcha-response"]');
if (!captchaInput) {
  captchaInput = document.createElement("input");
  captchaInput.type = "hidden";
  captchaInput.name = "g-recaptcha-response";
  form.appendChild(captchaInput);
}
captchaInput.value = token;

  // Ajoute le champ g-recaptcha-response dès le chargement
  let captchaInput = form.querySelector('input[name="g-recaptcha-response"]');
  if (!captchaInput) {
    captchaInput = document.createElement("input");
    captchaInput.type = "hidden";
    captchaInput.name = "g-recaptcha-response";
    form.appendChild(captchaInput);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Vérifie le champ "honeypot" pour bloquer les bots
    const honeypot = form.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value !== "") {
      console.warn("Formulaire bloqué (spam détecté)");
      return;
    }

    // Récupère le token reCAPTCHA
    const token = grecaptcha.getResponse();
    if (!token) {
      alert("Merci de valider le captcha.");
      return;
    }

    // Ajoute la valeur du token dans le champ caché
    captchaInput.value = token;

    // Envoi via EmailJS
    emailjs.sendForm("service_c8lnq97", "template_4vpm8yn", form, "2-lX1haMopJEX4C8J")
      .then(() => {
        showMessage("✅ Message envoyé avec succès !");
        form.reset();
        grecaptcha.reset(); // Réinitialise le captcha pour une nouvelle soumission
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        showMessage("❌ Une erreur est survenue.", "error");
      });
  });
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


