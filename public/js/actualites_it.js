const RSS_FEEDS = [
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

const API = "https://api.rss2json.com/v1/api.json?order_by=pubDate&order_dir=desc&count=100&api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&rss_url=";
const last7days = d => new Date(d) >= Date.now() - 7*24*3600*1000;

const tpl = (name) => `
  <div class="rss-feed mb-4">
    <h2 class="text-xl font-semibold mb-2">${name}</h2>
    <table class="w-full text-left">
      <thead><tr><th>Date</th><th>Titre</th></tr></thead>
      <tbody><tr><td colspan="2">Chargement...</td></tr></tbody>
    </table>
  </div>
`;

async function loadRSSFeeds() {
  const container = document.getElementById('rss-feeds-container');
  if (!container) return;
  container.innerHTML = "";

  const elements = RSS_FEEDS.map(([name]) => {
    const div = document.createElement('div');
    div.innerHTML = tpl(name);
    container.appendChild(div);
    return div;
  });

  const results = await Promise.all(
    RSS_FEEDS.map(([, url]) =>
      fetch(API + encodeURIComponent(url))
        .then(r => r.json())
        .then(d => d.items || [])
        .catch(() => [])
    )
  );

  results.forEach((items, i) => {
    const tbody = elements[i].querySelector('tbody');
    const recent = items.filter(x => last7days(x.pubDate));

    tbody.innerHTML = recent.length
      ? recent.map(x => `
          <tr>
            <td>${new Date(x.pubDate).toLocaleDateString('fr-FR')}</td>
            <td><a href="${x.link}" target="_blank" class="text-blue-600 hover:underline">${x.title}</a></td>
          </tr>
        `).join('')
      : `<tr><td colspan="2">Pas d'articles ces 7 derniers jours</td></tr>`;
  });
}

loadRSSFeeds();
document.addEventListener('astro:navigate', loadRSSFeeds);
