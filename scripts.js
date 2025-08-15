// ...existing code...

// --- DATA SECTION ---
// You can load this from a JSON file or keep it here for now
const movies = [
  {
    title: "Stitch - The Experiment 626",
    image: "assets/stitch.jpg",
    video: "videos/stitch-trailer.mp4",
    genre: ["Animation", "Adventure", "Family"],
    year: 2025,
    description: "Follow the story of Stitch, a genetically engineered creature created for chaos, who learns about friendship, family, and love on the Hawaiian islands."
  },
  {
    title: "Happy Gilmore 2 - The Return",
    image: "assets/happy-gilmore.jpg",
    video: "videos/happygilmore2-trailer.mp4",
    genre: ["Comedy", "Sports"],
    year: 2025,
    description: "Happy Gilmore returns to the ice rink for an unexpected sequel filled with laughs, hockey, and heart."
  },
  {
    title: "M3GAN 2.0 - The Next Level",
    image: "assets/m3gan.jpg",
    video: "videos/m3gan2-trailer.mp4",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    year: 2025,
    description: "The upgraded AI doll M3GAN returns with more tricks, terror, and a mysterious new agenda."
  },
  {
    title: "Madea's Destination",
    image: "assets/madea.jpg",
    video: "videos/madeas-destination-trailer.mp4",
    genre: ["Comedy", "Drama"],
    year: 2025,
    description: "Madea takes a hilarious trip to a new town, bringing chaos and laughter along the way."
  },
  {
    title: "Ballerina - Grace in Motion",
    image: "assets/ballerina.jpg",
    video: "videos/ballerina-trailer.mp4",
    genre: ["Drama", "Music", "Coming-of-age"],
    year: 2025,
    description: "A young ballerina struggles to find her place in the competitive world of dance."
  },
  {
    title: "The Accountant 2",
    image: "assets/accountant.jpg",
    video: "videos/accountant2-trailer.mp4",
    genre: ["Action", "Crime", "Thriller"],
    year: 2025,
    description: "The Accountant returns for a high-stakes mission involving finance, espionage, and action."
  }
];

const tvShows = [
  {
    title: "Ironheart",
    image: "assets/ironheart.jpg",
    video: "videos/ironheart-trailer.mp4",
    genre: ["Sci-Fi", "Action"],
    year: 2025,
    description: "A genius teen engineer becomes Marvel’s next hero."
  },
  {
    title: "MobLand",
    image: "assets/mobland.jpg",
    video: "videos/mobland-trailer.mp4",
    genre: ["Crime", "Drama"],
    year: 2025,
    description: "Inside the rise and fall of a modern-day mafia family."
  },
  {
    title: "Wednesday",
    image: "assets/wednesday.jpg",
    video: "videos/wednesday-trailer.mp4",
    genre: ["Mystery", "Supernatural"],
    year: 2025,
    description: "Wednesday Addams returns to solve more chilling cases."
  },
  {
    title: "Dragon Balls Daima",
    image: "assets/daima.png",
    video: "videos/daima-trailer.mp4",
    genre: ["Anime", "Action"],
    year: 2025,
    description: "A new era of Dragon Ball begins with Daima saga."
  },
  {
    title: "Knuckles",
    image: "assets/knuckles.jpg",
    video: "videos/knuckles-trailer.mp4",
    genre: ["Adventure", "Comedy"],
    year: 2025,
    description: "Knuckles embarks on a solo journey full of surprises."
  }
];

const podcasts = [
  {
    title: "Podcast and Chill",
    image: "assets/chill.jpeg",
    video: "videos/podcast-chill.mp4",
    host: "MacG",
    description: "The uncensored podcast featuring real talk and celebs."
  },
  {
    title: "Popcorn and Cheese",
    image: "assets/popcorn.jpeg",
    video: "videos/popcorn-cheese.mp4",
    host: "Robot Boii & Mpho Popps",
    description: "Comedy, culture, and conversations with Mzansi's finest."
  },
  {
    title: "Musa on the Mic",
    image: "assets/musa.jpg",
    video: "videos/musa-mic.mp4",
    host: "Musa Keys",
    description: "Deep chats about music, hustle, and lifestyle."
  },
  {
    title: "The Hustlers Corner",
    image: "assets/hustlers.jpeg",
    video: "videos/hustlers-corner.mp4",
    host: "DJ Sbu",
    description: "Inspiration and knowledge from Africa's hustlers."
  },
  {
    title: "Life with Lebang",
    image: "assets/lebang.jpg",
    video: "videos/life-lebang.mp4",
    host: "Lebang Kgosana",
    description: "Heartfelt convos on parenting, love, and growth."
  }
];

// --- RENDERING SECTION ---
function renderContent(sectionId, contentArray) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  container.innerHTML = ''; // Clear old content

  contentArray.forEach(item => {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.setAttribute('data-title', item.title);

    card.innerHTML = `
      <a href="watch.html?title=${encodeURIComponent(item.title)}">
        <img src="${item.image}" alt="${item.title}" />
        <video class="preview-video" src="${item.video}" muted loop style="display:none"></video>
        <div class="card-info">
          <h3>${item.title}</h3>
          <p>${item.description || ''}</p>
        </div>
      </a>
    `;

    // Hover preview logic
    card.addEventListener('mouseenter', () => {
      const video = card.querySelector('.preview-video');
      if (video) video.style.display = 'block', video.play();
    });
    card.addEventListener('mouseleave', () => {
      const video = card.querySelector('.preview-video');
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
      }
    });

    container.appendChild(card);
  });
}

// --- MAIN LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  // Trending: show a mix of all
  const trending = [...movies, ...tvShows, ...podcasts].sort(() => Math.random() - 0.5).slice(0, 8);
  renderContent('featuredList', trending);
  renderContent('movieList', movies);
  renderContent('tvList', tvShows);
  renderContent('podcastList', podcasts);

  // Language switcher
  const langSelect = document.getElementById("language");
  if (langSelect) {
    langSelect.addEventListener("change", e => {
      const lang = e.target.value;
      document.getElementById("welcomeText").textContent = translations[lang].welcome;
      document.getElementById("watchBtn").textContent = translations[lang].watch;
      document.getElementById("loginBtn").textContent = translations[lang].login;
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
});

// ...existing code...