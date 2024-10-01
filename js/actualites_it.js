const RSS_URL = 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml';
const RSS2JSON_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

async function fetchRSSFeed() {
    try {
        const response = await axios.get(RSS2JSON_URL + encodeURIComponent(RSS_URL));
        const feed = response.data;
        displayRSSFeed(feed.items);
    } catch (error) {
        console.error('Erreur lors de la récupération du flux RSS:', error);
        document.getElementById('rss-feed').innerHTML = '<li>Impossible de charger les actualités pour le moment.</li>';
    }
}

function displayRSSFeed(items) {
    const feedContainer = document.getElementById('rss-feed');
    let feedHTML = '';

    items.slice(0, 10).forEach(item => {
        const date = new Date(item.pubDate).toLocaleDateString('fr-FR');
        feedHTML += `
            <li>
                <a href="${item.link}" target="_blank">
                    <h2>${item.title}</h2>
                    <p class="date">${date}</p>
                    <p>${item.description.slice(0, 150)}...</p>
                </a>
            </li>
        `;
    });

    feedContainer.innerHTML = feedHTML;
}

fetchRSSFeed();