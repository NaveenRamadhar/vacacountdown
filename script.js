// Countdown timer logic
const targetDate = new Date("January 30, 2025 15:00:00").getTime();
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
let confettiActive = false;
let audio = new Audio("Party Me Say (Me Nice).mp3");

// Resize confetti canvas
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  if (timeLeft < 0 && !confettiActive) {
    confettiActive = true;
    launchConfetti();
    document.getElementById("countdown").textContent =
      "🎉 The vacation has started! 🎉";
  }
}

// Confetti animation
function launchConfetti() {
  const confettiColors = ["#ff9a9e", "#fad0c4", "#fbc2eb", "#ffd700"];
  const confettiCount = 300;
  const particles = [];

  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * confettiCount,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    });
  }

  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += 2;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// Music toggle
document.getElementById("music-toggle").addEventListener("click", () => {
  if (audio.paused) {
    // If the audio is paused, play it
    audio.play();
  } else {
    // If the audio is playing, stop it
    audio.pause();
    audio.currentTime = 0; // Reset to the beginning
  }
});

setInterval(updateCountdown, 1000);
