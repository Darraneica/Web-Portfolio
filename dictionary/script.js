const dictionary = {
  "apple": "a round fruit with red or green skin and a crisp or soft flesh",
  "car": "a road vehicle, typically with four wheels, powered by an internal combustion engine",
};

function getRandomWord(dictionary) {
  const keys = Object.keys(dictionary);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

const apiKey = "tFVbM4Dc7oLPev5G1aZHJw==4h7jX6ahDmKDwEXz";
const apiUrl = "https://api.api-ninjas.com/v1/dictionary?word=";

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const wordHeading = document.getElementById("word");
const type = document.getElementById("type");
const definition = document.getElementById("definition");

const wordDisplay = document.getElementById('word');
const definitionDisplay = document.getElementById('definition');

// Get a random word from your dictionary
const randomWord = getRandomWord(dictionary);

// Display the random word and its definition when the page loads
wordDisplay.textContent = `${randomWord}`;
searchWord(randomWord);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = searchInput.value;
  if (word.length > 0) {
    searchWord(word);
  } else {
    showError("Please enter a word.");
  }
});

function searchWord(word) {
  const url = apiUrl + word;

  axios.get(url, {
    headers: {
      "X-Api-Key": apiKey,
    }
  })
  .then(response => {
    const data = response.data;
    if (data.error) {
      showError("Word not found.");
    } else {
      wordHeading.textContent = word;
      type.textContent = data.type ? `Type: ${data.type}` : "";
      definition.textContent = data.definition;
    }
  })
  .catch(error => {
    console.log(error);
    showError("An error occurred while fetching the data.");
  });
}

function showError(errorMessage) {
  wordHeading.textContent = "";
  type.textContent = "";
  definition.textContent = errorMessage;
}

