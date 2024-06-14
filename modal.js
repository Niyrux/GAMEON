function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const forme = document.querySelectorAll(".test");
const close = document.querySelector(".close");
const btnSend = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
close.addEventListener('click', closeModal);
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//  ajout d'une animation a la modal + reset du formulaire a la fin de l'animation
function closeModal() {
  modalbg.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-150px)" }
    ],
    { duration: 1000 }
  ).onfinish = function () {
    modalbg.style.display = "none";
  };
  resetForm();
}

//  Reset de tous les champs du formulaire 
function resetForm() {
  forme.forEach(fore => {

    setTimeout(() => {
      fore.reset();
    }, 1001);
  });

}

const form = document.querySelector('form[name="reserve"]');
const successMessage = document.getElementById("success-message");
form.addEventListener("submit", function (event) {
  let isValid = true;

  const errorMessages = form.querySelectorAll(".error-message");
  errorMessages.forEach(msg => msg.textContent = "");


  const firstName = form.querySelector("#first");
  if (firstName.value.trim().length < 2) {
    displayError(firstName, "Le prénom doit contenir au moins 2 caractères.");
    isValid = false;
  }


  const lastName = form.querySelector("#last");
  if (lastName.value.trim().length < 2) {
    displayError(lastName, "Le nom doit contenir au moins 2 caractères.");
    isValid = false;
  }


  const email = form.querySelector("#email");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email.value.trim())) {
    displayError(email, "Veuillez entrer une adresse e-mail valide.");
    isValid = false;
  }


  const birthdate = form.querySelector("#birthdate");
  if (!birthdate.validity.valid) {
    displayError(birthdate, "Veuillez entrer une date de naissance valide.");
    isValid = false;
  }


  const quantity = form.querySelector("#quantity");
  if (!quantity.validity.valid) {
    displayError(quantity, "Veuillez entrer un nombre valide de tournois.");
    isValid = false;
  }


  const locations = form.querySelectorAll('input[name="location"]');
  if (!Array.from(locations).some(radio => radio.checked)) {
    displayError(locations[0], "Veuillez choisir un tournoi.");
    isValid = false;
  }


  const termsCheckbox = form.querySelector("#checkbox1");
  if (!termsCheckbox.checked) {
    displayError(termsCheckbox, "Vous devez accepter les conditions d'utilisation.");
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  } else {
    successMessage.style.display = "block";
    event.preventDefault();
    setTimeout(() => {
      closeModal();
    }, 1000)
    setTimeout(() => {
      successMessage.style.display = "none";

    }, 3000)

  }
});

function displayError(element, message) {
  const errorElement = element.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = message;
  }
}
