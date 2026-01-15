const elements = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.8s ease forwards';
    }
  });
});

elements.forEach(el => observer.observe(el))

const canvas = document.getElementById("fire");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Flame {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.radius = Math.random() * 6 + 4;
    this.speed = Math.random() * 1.5 + 0.5;
    this.life = 1;
  }

  update() {
    this.y -= this.speed;
    this.life -= 0.01;
    this.radius *= 0.99;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );

    gradient.addColorStop(0, "rgba(255, 255, 180, 1)"); // amarelo quente
    gradient.addColorStop(0.4, "rgba(255, 140, 0, 0.8)"); // laranja
    gradient.addColorStop(1, "rgba(180, 0, 0, 0.2)"); // vermelho escuro

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let flames = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (flames.length < 180) {
    flames.push(new Flame());
  }

  flames.forEach((flame, i) => {
    flame.update();
    flame.draw();

    if (flame.life <= 0 || flame.radius < 0.5) {
      flames.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
