const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");
const likeCountElement = document.getElementById('like-count');
const dislikeCountElement = document.getElementById('dislike-count');
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let jokes = []; 
let currentJokeIndex = 0; 

const resetCounts = () => {
  likeCountElement.textContent = '0 like';
  dislikeCountElement.textContent = '0 dislike';
};

const generateJoke = async () => {
  const config = {
    headers: { Accept: "application/json" },
  };
  const res = await fetch("https://icanhazdadjoke.com/", config);
  const data = await res.json();
  jokes.push(data.joke);
  currentJokeIndex = jokes.length - 1;
  jokeEl.innerHTML = data.joke;
  resetCounts();
};

generateJoke();

jokeBtn.addEventListener("click", () => generateJoke());

document.getElementById('like-button').addEventListener('click', function() {
    var likeCount = parseInt(likeCountElement.textContent);
    likeCount++;
    likeCountElement.textContent = likeCount + ' like';
});

document.getElementById('dislike-button').addEventListener('click', function() {
    var dislikeCount = parseInt(dislikeCountElement.textContent);
    dislikeCount++;
    dislikeCountElement.textContent = dislikeCount + ' dislike';
});

nextButton.addEventListener("click", () => {
  if (currentJokeIndex < jokes.length - 1) {
    currentJokeIndex++;
    jokeEl.innerHTML = jokes[currentJokeIndex];
    resetCounts();
  }
});

prevButton.addEventListener("click", () => {
  if (currentJokeIndex > 0) {
    currentJokeIndex--;
    jokeEl.innerHTML = jokes[currentJokeIndex];
    resetCounts();
  }
});