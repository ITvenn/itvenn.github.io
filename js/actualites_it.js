const RSS_FEEDS = [
    {
        name: 'Le Monde Informatique',
        url: 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml',
        logo: 'https://images.itnewsinfo.com/lmi/site/sprite_logo-XL.png'
    },
    {
        name: 'Korben.info',
        url: 'https://korben.info/feed',
        logo: 'https://korben.info/img/logo-small.svg'
    },
    {
        name: 'ZDNet',
        url: 'https://www.zdnet.fr/feeds/rss/actualites/',
        logo: 'https://www.zdnet.fr/wp-content/themes/cnet-zdnet/zdnet/assets/images/icons/svg/zdnet-logo--midnght-horizontal.svg'
    },
    {
        name: 'ITConnect.fr',
        url: 'https://itconnect.fr/feed/',
        logo: 'https://www.it-connect.fr/wp-content-itc/uploads/2017/06/IT-Connect_Flat_072017_Small_v2.png'
    }
];

function createRSSFeedElement(feed) {
    const feedElement = document.createElement('div');
    feedElement.className = 'rss-feed';
    feedElement.innerHTML = `
        <div class="rss-feed-header">
            <img src="${feed.logo}" alt="${feed.name} logo" class="rss-feed-logo">
            <h2 class="rss-feed-title">${feed.name}</h2>
        </div>
        <ul class="rss-feed-list">
            <li>Chargement des actualités...</li>
        </ul>
    `;
    return feedElement;
}

function updateRSSFeedElement(feedElement, items) {
    const listElement = feedElement.querySelector('.rss-feed-list');
    listElement.innerHTML = items.map(item => `
        <li class="rss-feed-item">
            <a href="${item.link}" target="_blank">
                <div class="rss-feed-item-title">${item.title}</div>
                <div class="rss-feed-item-date">${new Date(item.pubDate).toLocaleDateString('fr-FR')}</div>
            </a>
        </li>
    `).join('');
}

async function fetchRSSFeed(feed) {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
    const data = await response.json();
    return data.items;
}

async function initRSSFeeds() {
    const container = document.getElementById('rss-feeds-container');
    
    for (const feed of RSS_FEEDS) {
        const feedElement = createRSSFeedElement(feed);
        container.appendChild(feedElement);
        
        try {
            const items = await fetchRSSFeed(feed);
            updateRSSFeedElement(feedElement, items.slice(0, 5));
        } catch (error) {
            console.error(`Erreur lors de la récupération du flux RSS pour ${feed.name}:`, error);
            feedElement.querySelector('.rss-feed-list').innerHTML = '<li>Impossible de charger les actualités pour le moment.</li>';
        }
    }
}

document.addEventListener('DOMContentLoaded', initRSSFeeds);