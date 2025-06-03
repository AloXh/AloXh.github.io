document.querySelectorAll(".service-title").forEach((title) => {
  title.addEventListener("click", () => {
    const item = title.parentElement;

    item.classList.toggle("active");
  });
});

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