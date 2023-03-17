const image = document.querySelector('#music-image');
const title = document.querySelector('#title');
const singer = document.querySelector('#singer');
const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const container = document.querySelector('.container');
const duration = document.querySelector('#duration');
const current_time = document.querySelector('#current-time');
const progressBar = document.querySelector('#progress-bar');

const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
  let music = player.getMusic();
  displayMusic(music);
});

function displayMusic(music) {
  title.innerText = music.title;
  singer.innerText = music.singer;
  image.src = 'img/' + music.img;
  audio.src = 'mp3/' + music.file;
}

play.addEventListener('click', () => {
  const isMusicPlay = container.classList.contains('playing');
  isMusicPlay ? pauseMusic() : playMusic();
});

function pauseMusic() {
  container.classList.remove('playing');
  play.classList = 'fa-solid fa-play';
  audio.pause();
}

function playMusic() {
  container.classList.add('playing');
  play.classList = 'fa-solid fa-pause';
  audio.play();
}

prev.addEventListener('click', () => {
  prevMusic();
});

next.addEventListener('click', () => {
  nextMusic();
});

function prevMusic() {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
}

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
}

function calculateTime(toplamSaniye) {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
}
audio.addEventListener('loadedmetadata', () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = Math.floor(audio.currentTime);
  current_time.textContent = calculateTime(progressBar.value);
});
