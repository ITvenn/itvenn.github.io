// Version multi-RSS v1.0

const rssFeeds = [
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

// Service de conversion RSS → JSON
const rssToJsonAPI = "https://api.rss2json.com/v1/api.json?api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&count=50&rss_url=";

async function loadAllRSSFeeds() {
    const container = document.getElementById('security-updates-list');
    if (!container) return;

    let allItems = [];

    // Charger chaque flux
    for (const [sourceName, feedURL] of rssFeeds) {
        try {
            const response = await fetch(rssToJsonAPI + encodeURIComponent(feedURL));
            const data = await response.json();

            if (data.items) {
                data.items.forEach(item => {
                    allItems.push({
                        source: sourceName,
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate
                    });
                });
            }
        } catch (error) {
            console.error(`Erreur lors du chargement du flux ${sourceName}:`, error);
        }
    }

    // Trier par date décroissante
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Générer le tableau
    let output = '<table class="security-updates-table">';
    output += '<thead><tr><th>Date</th><th>Source</th><th>Titre</th></tr></thead><tbody>';

    allItems.forEach(item => {
        const date = new Date(item.pubDate);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        output += `
            <tr class="rss-row">
                <td>${formattedDate}</td>
                <td>${item.source}</td>
                <td><a href="${item.link}" target="_blank">${truncateText(item.title, 100)}</a></td>
            </tr>
            <tr><td colspan="3"><hr style="border:1px dashed #ccc; margin: 8px 0;"></td></tr>
        `;
    });

    output += '</tbody></table>';
    container.innerHTML = output;

    // Rendre les lignes cliquables
    const rows = container.querySelectorAll('.rss-row');
    rows.forEach(row => {
        row.addEventListener('click', function () {
            const link = this.querySelector('a');
            if (link) window.open(link.href, '_blank');
        });
    });
}

function truncateText(text, maxLength) {
    return text.length <= maxLength ? text : text.substr(0, maxLength) + '...';
}

// Exécution immédiate
loadAllRSSFeeds();

// Pour Astro SPA-like
document.addEventListener('astro:navigate', () => {
    loadAllRSSFeeds();
});
