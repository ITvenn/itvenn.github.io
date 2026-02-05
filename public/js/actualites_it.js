const feeds = [
  ['IT-Connect', 'https://www.it-connect.fr/feed/'],
  ['Le Monde Informatique', 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml'],
  ['Korben.info', 'https://korben.info/feed'],
  ['ZDNet', 'https://www.zdnet.fr/feeds/rss/actualites/'],
  ['LeBigData.fr', 'https://www.lebigdata.fr/feed'],
  ['FrAndroid', 'https://www.frandroid.com/feed'],
  ["Tom's Hardware", 'https://www.tomshardware.fr/feed/'],
  ['Overclocking Made in France', 'https://www.overclocking.com/feed/'],
  ['Generation-NT', 'https://www.generation-nt.com/export/rss.xml'],
  ['Les Numériques', 'https://www.lesnumeriques.com/rss.xml']
];

const container = document.getElementById("rss-feeds-container");

async function fetchFeed(name, url) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map(item => ({
      source: name,
      title: item.title,
      link: item.link,
      date: new Date(item.pubDate),
    }));
  } catch (err) {
    console.error(`Erreur lors du chargement du flux : ${name}`, err);
    return [];
  }
}

async function loadAllFeeds() {
  container.innerHTML = "<p>Chargement des actualités...</p>";

  let allArticles = [];

  for (const [name, url] of feeds) {
    const articles = await fetchFeed(name, url);
    allArticles = allArticles.concat(articles);
  }

  // Tri par date décroissante
  allArticles.sort((a, b) => b.date - a.date);

  // Affichage
  container.innerHTML = allArticles.slice(0, 50).map(article => `
    <article class="mb-6 p-4 border rounded-lg shadow-sm bg-white">
      <h3 class="text-xl font-semibold">
        <a href="${article.link}" target="_blank" class="text-blue-600 hover:underline">
          ${article.title}
        </a>
      </h3>
      <p class="text-sm text-gray-500">
        ${article.source} — ${article.date.toLocaleString("fr-FR")}
      </p>
    </article>
  `).join("");
}

loadAllFeeds();

// Optionnel : pour Astro SPA-like, réexécution à chaque navigation interne
document.addEventListener('astro:navigate', () => {
    loadAllFeed();
});
