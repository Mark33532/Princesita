const hearts = document.getElementById("hearts");
const sparkles = document.getElementById("sparkles");
const heroCard = document.getElementById("heroCard");
const quoteLine = document.getElementById("quoteLine");
const typewriter = document.getElementById("typewriter");
const longLove = document.getElementById("longLove");
const dynamicMessage = document.getElementById("dynamicMessage");
const loveTag = document.getElementById("loveTag");
const scrollProgress = document.getElementById("scrollProgress");

const quoteText = "Tú llegaste y mi vida se volvió más bonita, más serena y más feliz. Gracias por existir, mi princesita hermosa.";
const typeText = "Vamos por más meses, más abrazos, más risas, más crecimiento, más amor del bonito... siempre más, siempre nosotros.";

const tagPhrases = [
  "5 de febrero -> nuestra fecha más bonita",
  "1:28 a.m. -> el inicio de lo nuestro",
  "Tú y yo -> mi lugar favorito",
  "Siempre más amor para ti"
];

const buttonNotes = {
  love: "Te amo con todito el corazón, con intención y con verdad.",
  thanks: "Gracias por regalarme tu tiempo, tu calma y tu amor todo bonito.",
  future: "Quiero un futuro contigo que cada año se vea más fuerte y más tierno."
};

const longVersions = {
  love: "Si hoy tuviera que resumir lo que siento por ti en una sola frase, diría que te amo de la manera más sincera que conozco. Te amo en la calma y en la emoción, en la distancia y en la cercanía, en los días fáciles y en los días retadores. Te amo porque eres luz en mi camino, porque tu manera de querer es noble y porque a tu lado descubrí que el amor más bonito también puede ser el más real.",
  thanks: "Agradecerte a ti no es solo decir gracias. Es reconocer todo lo que haces por mi corazón: cómo me escuchas, cómo me cuidas, cómo celebras mis pequeños avances y cómo me recuerdas que merezco amor bonito. Gracias por ser mi refugio, por darme ternura sin medida y por enseñarme que una relación sana se construye con paciencia y muchísima verdad.",
  future: "Cuando pienso en el futuro, me ilusiona imaginarlo contigo creciendo juntos, aprendiendo juntos, cuidándonos mutuamente y formando una relación cada día más fuerte. Quiero que sigamos siendo equipo, que resolvamos todo conversando, que nunca falte el respeto, y que siempre sobre el amor. Mi meta no es solo estar contigo, sino amarte cada día mejor."
};

function createHeart() {
  const node = document.createElement("span");
  node.className = "heart";
  const symbols = ["❤", "❥", "♥"];
  node.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  node.style.left = Math.random() * 100 + "vw";
  node.style.fontSize = 12 + Math.random() * 20 + "px";
  node.style.animationDuration = 6 + Math.random() * 6 + "s";
  hearts.appendChild(node);
  setTimeout(() => node.remove(), 13000);
}

function createSpark() {
  const node = document.createElement("span");
  node.className = "spark";
  node.style.left = Math.random() * 100 + "vw";
  node.style.width = 4 + Math.random() * 5 + "px";
  node.style.height = node.style.width;
  node.style.animationDuration = 7 + Math.random() * 6 + "s";
  sparkles.appendChild(node);
  setTimeout(() => node.remove(), 14000);
}

setInterval(createHeart, 260);
setInterval(createSpark, 380);

function typeTextEffect(element, text, speed, delay) {
  let i = 0;
  setTimeout(() => {
    const writer = setInterval(() => {
      element.textContent = text.slice(0, i + 1);
      i += 1;
      if (i >= text.length) clearInterval(writer);
    }, speed);
  }, delay);
}

typeTextEffect(quoteLine, quoteText, 23, 450);
typeTextEffect(typewriter, typeText, 30, 1250);

function paintMessage(kind) {
  dynamicMessage.textContent = buttonNotes[kind];
  longLove.textContent = longVersions[kind];
}

document.getElementById("btnLove").addEventListener("click", () => paintMessage("love"));
document.getElementById("btnThanks").addEventListener("click", () => paintMessage("thanks"));
document.getElementById("btnFuture").addEventListener("click", () => paintMessage("future"));

let tagIndex = 0;
setInterval(() => {
  tagIndex = (tagIndex + 1) % tagPhrases.length;
  loveTag.textContent = tagPhrases[tagIndex];
}, 3500);

function setHeroGlow(clientX, clientY) {
  if (!heroCard) return;
  const rect = heroCard.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  heroCard.style.setProperty("--mx", `${Math.max(0, Math.min(100, x))}%`);
  heroCard.style.setProperty("--my", `${Math.max(0, Math.min(100, y))}%`);
}

heroCard?.addEventListener("mousemove", (event) => setHeroGlow(event.clientX, event.clientY));
heroCard?.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  if (touch) setHeroGlow(touch.clientX, touch.clientY);
}, { passive: true });

function updateTimeTogether() {
  const startDate = new Date("2026-02-05T01:28:00");
  const now = new Date();

  if (now < startDate) {
    const futureMs = startDate - now;
    const totalSeconds = Math.floor(futureMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const countdown = `${days} días, ${hours}h ${minutes}m ${seconds}s para comenzar`;
    document.getElementById("timeTogether").textContent = countdown;
    return;
  }

  let years = now.getFullYear() - startDate.getFullYear();
  const anniversary = new Date(startDate);
  anniversary.setFullYear(startDate.getFullYear() + years);
  if (anniversary > now) {
    years -= 1;
    anniversary.setFullYear(startDate.getFullYear() + years);
  }

  const diffMs = now - anniversary;
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const yearsLabel = years === 1 ? "1 año" : `${years} años`;
  document.getElementById("timeTogether").textContent = `${yearsLabel}, ${days} días, ${hours}h ${minutes}m ${seconds}s`;
}

updateTimeTogether();
setInterval(updateTimeTogether, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const tiltItems = Array.from(document.querySelectorAll(".tilt"));

function applyTilt(el, clientX, clientY) {
  const rect = el.getBoundingClientRect();
  const px = (clientX - rect.left) / rect.width;
  const py = (clientY - rect.top) / rect.height;
  const rx = (0.5 - py) * 5;
  const ry = (px - 0.5) * 6;
  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
}

tiltItems.forEach((el) => {
  el.addEventListener("mousemove", (event) => applyTilt(el, event.clientX, event.clientY));
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
  el.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    applyTilt(el, touch.clientX, touch.clientY);
  }, { passive: true });
  el.addEventListener("touchend", () => {
    el.style.transform = "";
  });
});