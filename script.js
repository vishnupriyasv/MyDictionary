// https://api.dictionaryapi.dev/api/v2/entries/en/

const input = document.querySelector('input')
const button = document.querySelector('button')
const dictionary = document.querySelector('.dictionary')
const images = [
  './pictures/Image1.jpeg',
  './pictures/Image2.jpeg',
  './pictures/Image3.jpeg',
  './pictures/Image4.jpeg',
  './pictures/Image5.jpeg',
  './pictures/Image6.jpeg',
  './pictures/Image7.jpeg',
  './pictures/Image8.jpeg',
  './pictures/Image9.jpeg',
  './pictures/Image10.jpeg',
  './pictures/Image11.jpeg',
  './pictures/Image12.jpeg',
  './pictures/Image13.jpeg',
  './pictures/Image14.jpeg',
  './pictures/Image15.jpeg',
  './pictures/Image16.jpeg',
];

let current = 0

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  document.body.style.backgroundImage = `url('${randomImage}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
}
setRandomBackground();
setInterval(setRandomBackground, 5000);

button.addEventListener('click', dictionaryFn)

async function dictionaryFn() {
    const word = input.value;

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
    
    input.value = '';
    input.placeholder = 'Type and enter Search';

    // console.log(res)

    if (!Array.isArray(res) || !res[0].meanings) {
        dictionary.innerHTML = `
            <div class="card">
                No definition found!
            </div>`;
        return;
    }

    dictionary.innerHTML = `
        <div class="card">
            <div class="property">
                <span>${res[0].word}</span>
                <span>${res[0].phonetic}</span>
            </div>

            <div class="property">
                <span>
                    <audio controls src = "${res[0].phonetics[0].audio}"></audio>
                </span>  
            </div>

            <div class="property">
                <span>${res[0].meanings[0].definitions[0].definition}</span>
            </div>

            <div class="property">
                <span>Usage:</span>
                <span>${res[0].meanings[0].definitions[0].example}</span>
            </div>
        </div>`
    
}