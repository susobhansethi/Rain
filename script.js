document.addEventListener('DOMContentLoaded', () => {
  const chocolateContainer = document.querySelector('.chocolate-container');
  const birthdayMessage = document.getElementById('birthdayMessage');
  const fireworksCanvas = document.getElementById('fireworksCanvas');
  const ctx = fireworksCanvas.getContext('2d');

  // List of chocolate image file names
  const chocolateImages = [
    'chocolate1.png', 
    'chocolate2.png', 
    'chocolate3.png',
    'chocolate'
  ];

  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  window.onresize = () => {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  };

  let fireworks = [];
  let particles = [];

  // Firework constructor
  function Firework(x, y, size) {
    this.x = x;
    this.y = y;
    this.age = 0;
    this.maxAge = Math.random() * 40 + 60;
    this.size = size || 3; // Set default firework size
    this.exploded = false;

    this.update = function () {
      this.age++;
      if (this.age > this.maxAge) this.exploded = true;
    };

    this.draw = function () {
      if (!this.exploded) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(25, 100, 50, 1)';
        ctx.fill();
      }
    };
  }

  // Particle constructor (sparks after fireworks explode)
  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.life = 0;
    this.maxLife = Math.random() * 30 + 20;
    this.color = color;

    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
    };

    this.draw = function () {
      if (this.life < this.maxLife) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${1 - this.life / this.maxLife})`;
        ctx.fill();
      }
    };
  }

  // Generate big fireworks and particles
  function generateFireworks(big = false) {
    if (Math.random() < 0.1) {
      fireworks.push(new Firework(Math.random() * fireworksCanvas.width, Math.random() * fireworksCanvas.height, big ? 6 : 3));
    }

    fireworks.forEach((firework, i) => {
      firework.update();
      if (firework.exploded) {
        fireworks.splice(i, 1);
        for (let j = 0; j < (big ? 200 : 100); j++) {
          particles.push(new Particle(firework.x, firework.y, `255, 255, 255`));
        }
      }
    });

    particles.forEach((particle, i) => {
      particle.update();
      if (particle.life > particle.maxLife) {
        particles.splice(i, 1);
      }
    });
  }

  // Draw fireworks
  function drawFireworks() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    fireworks.forEach(firework => firework.draw());
    particles.forEach(particle => particle.draw());

    requestAnimationFrame(drawFireworks);
  }

  // Chocolate rain
  function createChocolate() {
    const chocolate = document.createElement('div');
    chocolate.classList.add('chocolate');
    chocolate.style.left = `${Math.random() * 100}vw`;
    chocolate.style.animationDuration = `${Math.random() * 2 + 3}s`;

    const randomImage = chocolateImages[Math.floor(Math.random() * chocolateImages.length)];
    chocolate.style.backgroundImage = `url(${randomImage})`;

    chocolateContainer.appendChild(chocolate);

    setTimeout(() => {
      chocolate.remove();
    }, 5000); // Remove after falling
  }

  // Start chocolate rain after 7 seconds
  setTimeout(() => {
    setInterval(createChocolate, 300); // Generate new chocolates every 300ms
    generateFireworks(); // Continue fireworks with smaller size
    setInterval(() => generateFireworks(), 100);
  }, 7000); // 7-second delay

  // Start big fireworks and message immediately
  setInterval(() => generateFireworks(true), 100);
  drawFireworks();
});
