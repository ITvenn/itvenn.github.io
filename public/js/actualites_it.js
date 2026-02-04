const RSS_FEEDS = [
  { name: 'IT-Connect', url: 'https://www.it-connect.fr/feed/'},
  { name: 'Le Monde Informatique', url: 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml'},
  { name: 'Korben.info', url: 'https://korben.info/feed',},
  { name: 'ZDNet', url: 'https://www.zdnet.fr/feeds/rss/actualites/',},
  { name: 'LeBigData.fr', url: 'https://www.lebigdata.fr/feed',},
  { name: 'FrAndroid', url: 'https://www.frandroid.com/feed',},
  { name: "Tom's Hardware", url: 'https://www.tomshardware.fr/feed/',},
  { name: 'Overclocking Made in France', url: 'https://www.overclocking.com/feed/',},
  { name: 'Generation-NT', url: 'https://www.generation-nt.com/export/rss.xml',},
  { name: 'Les Numériques', url: 'https://www.lesnumeriques.com/rss.xml',}
];

const API_BASE = "https://api.rss2json.com/v1/api.json?order_by=pubDate&order_dir=desc&count=100&api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&rss_url=";

const isWithinLast7Days = date =>
  new Date(date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

function createRSSFeedElement({ name, logo }) {
  const div = document.createElement('div');
  div.className = 'rss-feed mb-4';
  div.innerHTML = `
    <div class="rss-feed-header flex items-center gap-2 mb-2">
      <img src="${logo}" alt="${name} logo" class="rss-feed-logo w-10 h-10 object-contain">
      <h2 class="rss-feed-title text-xl font-semibold">${name}</h2>
    </div>
    <div class="rss-feed-table-container overflow-x-auto">
      <table class="rss-feed-table w-full text-left border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-2 py-1">Date</th>
            <th class="px-2 py-1">Titre</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colspan="2" class="px-2 py-1">Chargement...</td></tr>
        </tbody>
      </table>
    </div>
  `;
  return div;
}

function updateRSSFeedElement(feedElement, items) {
  const tbody = feedElement.querySelector('tbody');
  const recentItems = items.filter(i => isWithinLast7Days(i.pubDate));

  if (!recentItems.length) {
    tbody.innerHTML = `<tr><td colspan="2" class="px-2 py-1">Pas d'articles ces 7 derniers jours</td></tr>`;
    return;
  }

  tbody.innerHTML = recentItems.map(item => `
    <tr>
      <td class="px-2 py-1">${new Date(item.pubDate).toLocaleDateString('fr-FR')}</td>
      <td class="px-2 py-1">
        <a href="${item.link}" target="_blank" class="text-blue-600 hover:underline">${item.title}</a>
      </td>
    </tr>
  `).join('');
}

async function fetchRSSFeed(url) {
  try {
    const res = await fetch(API_BASE + encodeURIComponent(url));
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("Erreur flux:", url, err);
    return [];
  }
}

async function loadRSSFeeds() {
  const container = document.getElementById('rss-feeds-container');
  if (!container) return;

  container.innerHTML = ""; // Important pour Astro SPA

  const fragment = document.createDocumentFragment();

  const feedElements = RSS_FEEDS.map(feed => {
    const el = createRSSFeedElement(feed);
    fragment.appendChild(el);
    return { feed, el };
  });

  container.appendChild(fragment);

  const results = await Promise.all(
    RSS_FEEDS.map(f => fetchRSSFeed(f.url))
  );

  results.forEach((items, i) => {
    const { el } = feedElements[i];
    if (items.length) updateRSSFeedElement(el, items);
    else el.querySelector('tbody').innerHTML =
      `<tr><td colspan="2" class="px-2 py-1">Impossible de charger les actualités</td></tr>`;
  });
}

// Chargement initial
loadRSSFeeds();

// Support Astro SPA-like
document.addEventListener('astro:navigate', () => {
  loadRSSFeeds();
});
