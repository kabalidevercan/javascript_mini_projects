const word_element = document.getElementById('word');
const correctLetters = ['j', 'a', 'v'];
const wrongLetters = [];

function getRandomWord() {
  const words = ['javascript', 'java', 'python'];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  const selectedWord = getRandomWord();

  word_element.innerHTML = `${selectedWord
    .split('')
    .map(
      letter => `
  <div class ="letter">
    ${correctLetters.includes(letter) ? letter : ''}
  </div>
  `
    )
    .join('')}`;

  const w = word_element.innerText.replace(/\n/g, '');
  if (w === selectedWord) {
    console.log('bildiniz..');
  }
}

displayWord();
