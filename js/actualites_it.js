const RSS_FEEDS = [
    {
        name: 'Le Monde Informatique',
        url: 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml'
    },
    {
        name: 'Korben.info',
        url: 'https://korben.info/feed'
    }
];

const RSS2JSON_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

async function fetchRSSFeeds() {
    const feedContainer = document.getElementById('rss-feed');
    feedContainer.innerHTML = '<li>Chargement des actualités...</li>';

    try {
        const feedPromises = RSS_FEEDS.map(feed => 
            axios.get(RSS2JSON_URL + encodeURIComponent(feed.url))
        );

        const responses = await Promise.all(feedPromises);
        const feeds = responses.map(response => response.data);

        displayRSSFeeds(feeds);
    } catch (error) {
        console.error('Erreur lors de la récupération des flux RSS:', error);
        feedContainer.innerHTML = '<li>Impossible de charger les actualités pour le moment.</li>';
    }
}

function displayRSSFeeds(feeds) {
    const feedContainer = document.getElementById('rss-feed');
    let feedHTML = '';

    feeds.forEach((feed, index) => {
        feedHTML += `<h2>${RSS_FEEDS[index].name}</h2>`;
        feed.items.slice(0, 5).forEach(item => {
            const date = new Date(item.pubDate).toLocaleDateString('fr-FR');
            feedHTML += `
                <li>
                    <a href="${item.link}" target="_blank">
                        <h3>${item.title}</h3>
                        <p class="date">${date}</p>
                        <p>${item.description.slice(0, 150)}...</p>
                    </a>
                </li>
            `;
        });
    });

    feedContainer.innerHTML = feedHTML;
}

console.log('Script loaded and executed');
fetchRSSFeeds();