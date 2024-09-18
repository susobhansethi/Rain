document.addEventListener('DOMContentLoaded', () => {
  const chocolateContainer = document.querySelector('.chocolate-container');

  // List of chocolate image file names
  const chocolateImages = [
    'chocolate.png', 
    'toffee.png', 
    'chocolate1.png' ,// Add as many as you want
    'chocolate2.png'
  ];

  function createChocolate() {
    const chocolate = document.createElement('div');
    chocolate.classList.add('chocolate');
    chocolate.style.left = `${Math.random() * 100}vw`;
    chocolate.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random falling speed

    // Randomly select a chocolate image from the array
    const randomImage = chocolateImages[Math.floor(Math.random() * chocolateImages.length)];
    chocolate.style.backgroundImage = `url(${randomImage})`;

    chocolateContainer.appendChild(chocolate);

    setTimeout(() => {
      chocolate.remove();
    }, 5000); // Remove chocolate after it falls out of view
  }

  setInterval(createChocolate, 300); // Generate new chocolates every 300ms
});
