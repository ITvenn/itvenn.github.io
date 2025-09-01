const RSS_FEEDS = [
  { name: 'IT-Connect', url: 'https://www.it-connect.fr/feed/', logo: '/image/logo_site_actualites/logo_itconnect.png' },
  { name: 'Le Monde Informatique', url: 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml', logo: '/image/logo_site_actualites/logo_lemondeinformatique.gif' },
  { name: 'Korben.info', url: 'https://korben.info/feed', logo: 'https://korben.info/img/logo-small.svg' },
  { name: 'ZDNet', url: 'https://www.zdnet.fr/feeds/rss/actualites/', logo: 'https://www.zdnet.fr/wp-content/themes/cnet-zdnet/zdnet/assets/images/icons/svg/zdnet-logo--midnght-horizontal.svg' },
  { name: 'LeBigData.fr', url: 'https://www.lebigdata.fr/feed', logo: '/image/logo_site_actualites/logo_lebigdata.gif' },
  { name: 'FrAndroid', url: 'https://www.frandroid.com/feed', logo: '/image/logo_site_actualites/logo_frandroid.gif' },
  { name: "Tom's Hardware", url: 'https://www.tomshardware.fr/feed/', logo: '/image/logo_site_actualites/logo_tomshardware.gif' },
  { name: 'Overclocking Made in France', url: 'https://www.overclocking.com/feed/', logo: '/image/logo_site_actualites/logo_overclocking.gif' },
  { name: 'Generation-NT', url: 'https://www.generation-nt.com/export/rss.xml', logo: '/image/logo_site_actualites/logo_gnt.gif' },
  { name: 'Les Numériques', url: 'https://www.lesnumeriques.com/rss.xml', logo: '/image/logo_site_actualites/logo_lesnumeriques.gif' }
];

function createRSSFeedElement(feed) {
  const feedElement = document.createElement('div');
  feedElement.className = 'rss-feed';
  feedElement.innerHTML = `
    <div class="rss-feed-header">
      <img src="${feed.logo}" alt="${feed.name} logo" class="rss-feed-logo">
      <h2 class="rss-feed-title">${feed.name}</h2>
    </div>
    <div class="rss-feed-table-container">
      <table class="rss-feed-table">
        <thead>
          <tr><th>Date</th><th>Titre</th></tr>
        </thead>
        <tbody>
          <tr><td colspan="2">Chargement des actualités...</td></tr>
        </tbody>
      </table>
    </div>
  `;
  return feedElement;
}

function isWithinLastWeek(dateString) {
  const articleDate = new Date(dateString);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return articleDate >= oneWeekAgo;
}

function updateRSSFeedElement(feedElement, items) {
  const tbody = feedElement.querySelector('tbody');
  const recentItems = items.filter(item => isWithinLastWeek(item.pubDate));

  if (recentItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="2">Pas d\'articles cette semaine</td></tr>';
    return;
  }

  tbody.innerHTML = recentItems.map(item => `
    <tr>
      <td>${new Date(item.pubDate).toLocaleDateString('fr-FR')}</td>
      <td><a href="${item.link}" target="_blank">${item.title}</a></td>
    </tr>
  `).join('');
}

async function fetchRSSFeed(feed) {
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&order_by=pubDate&order_dir=desc&count=100`);
  const data = await response.json();
  return data.items;
}

async function initRSSFeeds() {
  const container = document.getElementById('rss-feeds-container');
  const loader = document.getElementById('rss-loading');
  loader.style.display = 'none'; // Supprime le loader global

  for (const feed of RSS_FEEDS) {
    const feedElement = createRSSFeedElement(feed);
    container.appendChild(feedElement);

    try {
      const items = await fetchRSSFeed(feed);
      updateRSSFeedElement(feedElement, items);
    } catch (err) {
      console.error(`Erreur flux ${feed.name}:`, err);
      feedElement.querySelector('tbody').innerHTML = '<tr><td colspan="2">Impossible de charger les actualités</td></tr>';
    }
  }
}

document.addEventListener('DOMContentLoaded', initRSSFeeds);
