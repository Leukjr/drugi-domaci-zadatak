// DOM targets
const nameValue = document.getElementById("inputMovie");
const yearValue = document.getElementById("inputYear");
const countryValue = document.getElementById("inputCountry");
const actorsValue = document.getElementById("inputActors");
const notesValue = document.getElementById("inputNotes");
const addNewMovie = document.getElementById("save_changes");
const modal = document.getElementById("myModal");

const movies = [
  {
    name: "Dune",
    year: 2021,
    country: "USA",
    actors: ["Timothée Chalamet", "Zendaya", "Jason Momoa"],
    notes: "Remake of a movie from 1984",
    watched: false,
  },
  {
    name: "The Many Saints of Newark",
    year: 2021,
    country: "USA",
    actors: ["Alessandro Nivola", "Jon Bernthal", "Michael Gandolfini"],
    notes: "Spinoff movie based on the TV Show 'The Sopranos'",
    watched: true,
  },
  {
    name: "The Batman",
    year: 2022,
    country: "USA",
    actors: ["Robert Pattinson", "Andy Serkis", "Zoë Kravitz"],
    notes: "Movie based on a DC Comic character",
    watched: false,
  },
];

// Funkcija za resetovanje input.value
const init = function () {
  nameValue.value = "";
  yearValue.value = "";
  countryValue.value = "";
  actorsValue.value = "";
  notesValue.value = "";
};

init();

// Funkcija za prikaz filmova
const displayMovies = function () {
  let tableContent = "";
  movies.forEach(
    (movie, i) =>
      (tableContent += `<tr class="movie_row red_color">
                          <th scope="row">${i + 1}</th>
                          <td><input type="checkbox" class="checkbox"></td>
                          <td>${movie.name}</td>
                          <td>${movie.year}</td>
                          <td>${movie.country}</td>
                          <td>${movie.actors.join(", ")}</td>
                          <td>${movie.notes}</td>
                          
                        </tr>`)
  );

  document.getElementById("movies_table_body").innerHTML = tableContent;
};
displayMovies();

// Validacija
const validateValues = function () {
  nameValue.classList.remove("is-invalid");
  yearValue.classList.remove("is-invalid");

  let result = true;
  // 1. Ako NAME value ne postoji, izbaciti error
  if (!nameValue.value) {
    nameValue.classList.add("is-invalid");
    result = false;
  }

  // 2. Ako je godina manja od 1930 i veca od 2021, izbaciti error
  if (!yearValue.value || yearValue.value < 1930 || yearValue.value > 2021) {
    yearValue.classList.add("is-invalid");
    result = false;
  }

  return result;
};

// Funkcija za dodavanje novog filma
const newMovieValues = function () {
  // Provjera da li su sve bitne informacije upisane
  if (!validateValues()) return;

  // Ako je sve u redu, uraditi push i pozvati displayMovies()
  movies.push({
    name: nameValue.value,
    year: yearValue.value,
    country: countryValue.value,
    actors: actorsValue.value.split(","),
    notes: notesValue.value,
    watched: false,
  });

  displayMovies();
};

// Dodavanje novog filma
addNewMovie.addEventListener("click", function () {
  newMovieValues();
  init();
});
modal.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    newMovieValues();
    init();
  }
});
