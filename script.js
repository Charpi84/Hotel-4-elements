document.querySelectorAll('.carousel .slides img').forEach((img) => {
  img.addEventListener('click', function () {
    img.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'center'
    });
  });
});

document.querySelectorAll('.hotel').forEach((hotel, index) => {
  if ((index + 1) % 2 === 0) { // paire (car index commence à 0)
    let carousel = hotel.querySelector('.carousel .slides');
    if (carousel) {
      // scroll jusqu’à la fin
      carousel.scrollLeft = carousel.scrollWidth;
    }
  }
});


let form = document.getElementById("reservation-form");
let repas = document.getElementById("repas");
let petitdej = document.getElementById("petitdej");
let regimeOptions = document.getElementById("regime-options");
let restrictionsOptions = document.getElementById("restrictions-options");

let prix = {
  igloo: 500,
  laponie: 850,
  chauffeur: 11,
  petitdej: 15,
  repas: 15,
  visite: 15,
};

function toggleDietOptions() {
  if (repas.checked || petitdej.checked) {
    regimeOptions.classList.remove("d-none");
    restrictionsOptions.classList.remove("d-none");
  } else {
    regimeOptions.classList.add("d-none");
    restrictionsOptions.classList.add("d-none");
  }
}

repas.addEventListener("change", toggleDietOptions);
petitdej.addEventListener("change", toggleDietOptions);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let prenom = form.prenom.value.trim();
  let nom = form.nom.value.trim();
  let email = form.email.value.trim();
  let telephone = form.telephone.value.trim();
  let adresse = form.adresse.value.trim();
  let codepostal = form.codepostal.value.trim();
  let ville = form.ville.value.trim();
  let hotel = form.hotel.value;
  let chambre = form.chambre.value;
  let personnes = parseInt(form.personnes.value);
  let arrivee = new Date(form.arrivee.value);
  let depart = new Date(form.depart.value);

  let error = [];
  const regexNom = /^[A-Za-zÀ-ÿ\-\'\s]+$/;
  const regexAdresse = /^[A-Za-z0-9À-ÿ\s,'\-]+$/;
  const emailRegex = /^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const phoneRegex = /^[0-9\s-/]{10,14}$/;
  const cpRegex = /^\d{5}$/;
  const villeRegex = /^[A-Za-z0-9À-ÿ\s,'\-]+$/


  if (nom.length < 2 || nom.length > 30 || !regexNom.test(prenom)) {
    error.push("Votre nom doit faire entre 2 et 30 caractères");
  }
  if (prenom.length < 2 || prenom.length > 30 || !regexNom.test(nom)) {
    error.push("Votre prénom doit faire entre 2 et 30 caractères");
  }
  if (!emailRegex.test(email)) {
    error.push("Merci d'entrer une adresse email valide");
  }
  if (!phoneRegex.test(telephone)) {
    error.push("Merci d'entrer un numéro de téléphone valide");
  }
  if (adresse.length < 5 || !regexAdresse.test(adresse)) {
    error.push("L'adresse n'est pas correcte, verifiez votre saisie");
  }
  if (!cpRegex.test(codepostal)) {
    error.push("Le code postale n'est pas valide");
  }
  if (!villeRegex.test(ville)) {
    error.push("Entrez une ville valide");
  }

  if (!hotel || !chambre || !personnes) {
    error.push("Veuillez selectionner les champs vide");
  }
  if (dateArrivee === "" || dateDepart === "") {
    error.push("Dates manquantes");
  } else if (new Date(dateDepart) <= new Date(dateArrivee)) {
    error.push("La date de départ doit être après l'arrivée");
  }


  let difference = depart - arrivee;
  let nombreDeNuits = difference / (1000 * 60 * 60 * 24);
  let total = prix[chambre] * nombreDeNuits;

  if (form.chauffeur.checked) total += prix.chauffeur * nuits;
  if (form.visite.checked) total += prix.visite;

  if (petitdej.checked) total += prix.petitdej * personnes * nuits;
  if (repas.checked && form["repas-type"].value !== "ponctuel") {
    total += prix.repas * personnes * nuits;
  }

  // Récapitulatif simple
  alert(`Réservation validée !\nMontant total : ${total}€\nMerci ${prenom} ${nom}`);
  form.reset();
  regimeOptions.classList.add("d-none");
  restrictionsOptions.classList.add("d-none");
});

