const RSS_FEEDS = [
  { name: 'IT-Connect', url: 'https://www.it-connect.fr/feed/', logo: 'https://www.it-connect.fr/wp-content-itc/uploads/2017/06/IT-Connect_Flat_072017_Small_v2.png' },
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
  const div = document.createElement('div');
  div.className = 'rss-feed';
  div.innerHTML = `
    <div class="rss-feed-header flex items-center gap-2 mb-2">
      <img src="${feed.logo}" alt="${feed.name} logo" class="rss-feed-logo w-10 h-10 object-contain">
      <h2 class="rss-feed-title text-xl font-semibold">${feed.name}</h2>
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

function isWithinLastWeek(dateString) {
  const articleDate = new Date(dateString);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return articleDate >= oneWeekAgo;
}

function updateRSSFeedElement(feedElement, items) {
  const tbody = feedElement.querySelector('tbody');
  const recentItems = items.filter(item => isWithinLastWeek(item.pubDate));

  if (!recentItems.length) {
    tbody.innerHTML = '<tr><td colspan="2" class="px-2 py-1">Pas d\'articles cette semaine</td></tr>';
    return;
  }

  tbody.innerHTML = recentItems.map(item => `
    <tr>
      <td class="px-2 py-1">${new Date(item.pubDate).toLocaleDateString('fr-FR')}</td>
      <td class="px-2 py-1"><a href="${item.link}" target="_blank" class="text-blue-600 hover:underline">${item.title}</a></td>
    </tr>
  `).join('');
}

async function fetchRSSFeed(feed) {
  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&order_by=pubDate&order_dir=desc&count=100`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error(`Erreur flux ${feed.name}:`, err);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('rss-feeds-container');

  RSS_FEEDS.forEach(async feed => {
    const feedElement = createRSSFeedElement(feed);
    container.appendChild(feedElement);

    const items = await fetchRSSFeed(feed);
    if (items.length) updateRSSFeedElement(feedElement, items);
    else feedElement.querySelector('tbody').innerHTML = '<tr><td colspan="2" class="px-2 py-1">Impossible de charger les actualités</td></tr>';
  });
});
