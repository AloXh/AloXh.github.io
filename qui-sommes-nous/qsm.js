//Section slide//

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("custom-slider");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
// changement texte
let isOriginal = true;
let originalHTML = "";

document.addEventListener("DOMContentLoaded", function () {
  const para = document.querySelector("#para");
  const buttons = document.querySelectorAll(".prev, .next");

  if (!para) return;

  originalHTML = para.innerHTML;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      para.classList.remove(
        "slide-in-right",
        "slide-out-left",
        "reset-position"
      );

      void para.offsetWidth;

      para.classList.add("slide-out-left");

      setTimeout(() => {
        para.innerHTML = isOriginal
          ? `<h3>David Morel – Co-fondateur & Responsable technique</h3>
             <p>Issu du monde du bâtiment, David a démarré comme technicien polyvalent...
             <br>Il veille à la qualité et à la sécurité des interventions de l’équipe.</p>`
          : originalHTML;

        para.classList.remove("slide-out-left");
        para.classList.add("slide-in-right");

        void para.offsetWidth;

        requestAnimationFrame(() => {
          para.classList.remove("slide-in-right");
          para.classList.add("reset-position");
        });

        isOriginal = !isOriginal;
      }, 500);
    });
  });
});
