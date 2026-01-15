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

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Flame {
  constructor(side) {
    this.side = side;
    this.reset();
  }

  reset() {
    this.y = canvas.height + Math.random() * 200;
    this.x =
      this.side === "left"
        ? Math.random() * 80
        : canvas.width - Math.random() * 80;

    this.size = Math.random() * 10 + 6;
    this.speed = Math.random() * 1.8 + 0.6;
    this.life = 1;
  }

  update() {
    this.y -= this.speed;
    this.life -= 0.01;

    if (this.life <= 0) this.reset();
  }

  draw() {
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    g.addColorStop(0, "rgba(255,255,180,1)");
    g.addColorStop(0.4, "rgba(255,140,0,0.9)");
    g.addColorStop(1, "rgba(180,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const flames = [];

for (let i = 0; i < 140; i++) {
  flames.push(new Flame("left"));
  flames.push(new Flame("right"));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  flames.forEach(f => {
    f.update();
    f.draw();
  });

  requestAnimationFrame(animate);
}

animate();
