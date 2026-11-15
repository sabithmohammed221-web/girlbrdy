const song = document.getElementById('birthdaySong');
const musicToggle = document.getElementById('musicToggle');
let musicStarted = false;

function showPage(number) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('page' + number).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function startMusic() {
  if (musicStarted) return;
  try {
    await song.play();                 // Starts after the visitor clicks the first button
    musicStarted = true;
    musicToggle.textContent = '♫';
  } catch (error) {
    musicToggle.textContent = '♪';
    console.log('Music could not start. Use the music button to try again.', error);
  }
}

document.getElementById('openBtn').addEventListener('click', async () => {
  await startMusic();
  showPage(2);
});

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => showPage(Number(button.dataset.next)));
});

musicToggle.addEventListener('click', async () => {
  if (song.paused) {
    try { await song.play(); musicToggle.textContent = '♫'; }
    catch (e) { console.log(e); }
  } else {
    song.pause();
    musicToggle.textContent = '♪';
  }
});

// Twinkling background stars
const stars = document.getElementById('stars');
for (let i = 0; i < 75; i++) {
  const star = document.createElement('span');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  stars.appendChild(star);
}

// Soft floating hearts / petals
function makePetal() {
  const el = document.createElement('span');
  el.className = 'petal';
  el.textContent = ['♡', '♥', '✧', '❀'][Math.floor(Math.random() * 4)];
  el.style.left = Math.random() * 100 + '%';
  el.style.fontSize = (13 + Math.random() * 19) + 'px';
  el.style.animationDuration = (7 + Math.random() * 5) + 's';
  document.getElementById('petals').appendChild(el);
  setTimeout(() => el.remove(), 12500);
}
setInterval(makePetal, 650);

// Instant birthday celebration — starts immediately on the click.
let wishCelebrationRunning = false;
document.getElementById('wishBtn').addEventListener('click', () => {
  if (wishCelebrationRunning) return;
  wishCelebrationRunning = true;

  document.getElementById('finalNote').textContent =
    'May every beautiful wish in your heart find its way to you, Baby. ❤️';

  const icons = ['💗', '💖', '💕', '🌸', '🌷', '🌹', '✨', '♥', '💐', '🩷'];
  const layer = document.createElement('div');
  layer.className = 'wish-burst-layer';
  document.body.appendChild(layer);

  const fragment = document.createDocumentFragment();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const buttonRect = document.getElementById('wishBtn').getBoundingClientRect();
  const originX = buttonRect.left + buttonRect.width / 2;
  const originY = buttonRect.top + buttonRect.height / 2;

  // Fill the whole viewport immediately, including the sides and centre.
  for (let i = 0; i < 190; i++) {
    const piece = document.createElement('span');
    piece.className = 'wish-piece';
    piece.textContent = icons[Math.floor(Math.random() * icons.length)];

    // Most pieces burst from the button; the rest appear throughout the screen.
    const fromButton = i < 110;
    const x = fromButton ? originX : Math.random() * w;
    const y = fromButton ? originY : Math.random() * h;
    const angle = Math.random() * Math.PI * 2;
    const distance = fromButton ? 120 + Math.random() * 420 : 70 + Math.random() * 230;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.setProperty('--dx', dx + 'px');
    piece.style.setProperty('--dy', dy + 'px');
    piece.style.setProperty('--rot', (Math.random() * 900 - 450) + 'deg');
    piece.style.setProperty('--duration', (1.7 + Math.random() * 1.1) + 's');
    piece.style.fontSize = (18 + Math.random() * 24) + 'px';
    fragment.appendChild(piece);
  }

  layer.appendChild(fragment);
  // Remove the burst after its animation; allow the button to be used again.
  setTimeout(() => {
    layer.remove();
    wishCelebrationRunning = false;
  }, 3200);
});
