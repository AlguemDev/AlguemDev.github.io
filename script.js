const elements = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.8s ease forwards';
    }
  });
});

elements.forEach(el => observer.observe(el))

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = (Math.random() - 0.5) * 4;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.6;

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

setInterval(createFirework, 1200);
animate();
