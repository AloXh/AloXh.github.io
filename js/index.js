document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.createElement("div");
  messageBox.id = "form-message";
  messageBox.className = "message-box";
  form.appendChild(messageBox);

  function showMessage(message, type = "success") {
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const honeypot = form.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value !== "") {
      console.warn("Formulaire bloqué (spam détecté)");
      return;
    }

    const token = grecaptcha.getResponse(); // ✅ ici !
    if (!token) {
      alert("Merci de valider le captcha.");
      return;
    }

    // Ajoute le token comme champ caché si nécessaire
    let captchaInput = form.querySelector('input[name="g-recaptcha-response"]');
    if (!captchaInput) {
      captchaInput = document.createElement("input");
      captchaInput.type = "hidden";
      captchaInput.name = "g-recaptcha-response";
      form.appendChild(captchaInput);
    }
    captchaInput.value = token;

    // Envoi via EmailJS
    emailjs.sendForm("service_c8lnq97", "template_4vpm8yn", form, "2-lX1haMopJEX4C8J")
      .then(() => {
        showMessage("✅ Message envoyé avec succès !");
        form.reset();
        grecaptcha.reset(); // ✅ ici aussi !
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


