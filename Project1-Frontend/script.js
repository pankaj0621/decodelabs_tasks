// Toggle Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Simple CSS toggle for mobile view could be added here
});

// Contact Form Logic
function sendMessage() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const msg = document.getElementById('formMsg');

  if (name === "" || email === "") {
    msg.style.color = "#ff4d4d";
    msg.textContent = "Please fill all fields.";
    return;
  }

  // Animation effect on button
  msg.style.color = "var(--primary)";
  msg.textContent = "Sending...";

  setTimeout(() => {
    msg.textContent = `Thank you, ${name}! Your message was sent successfully.`;
    document.getElementById('nameInput').value = "";
    document.getElementById('emailInput').value = "";
    document.getElementById('messageInput').value = "";
  }, 1500);
}

// Reveal Elements on Scroll
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "0.6s all ease-out";
  observer.observe(el);
});