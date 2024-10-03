document.addEventListener('DOMContentLoaded', function() {
    const rssUrl = 'https://www.cert.ssi.gouv.fr/alerte/feed/';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=YOUR_API_KEY&callback=processRSS`;

    const securityUpdatesList = document.getElementById('security-updates-list');
    securityUpdatesList.innerHTML = '<p>Chargement des alertes de sécurité...</p>';

    // Créer et ajouter le script JSONP
    const script = document.createElement('script');
    script.src = apiUrl;
    document.body.appendChild(script);
});

function processRSS(data) {
    const securityUpdatesList = document.getElementById('security-updates-list');
    
    if (data.status !== 'ok') {
        securityUpdatesList.innerHTML = '<p class="error-message">Une erreur est survenue lors du chargement des alertes de sécurité. Veuillez réessayer plus tard.</p>';
        return;
    }

    const feedItems = data.items.map(item => ({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: new Date(item.pubDate)
    }));

    // Trier les éléments par date de publication (du plus récent au plus ancien)
    feedItems.sort((a, b) => b.pubDate - a.pubDate);

    securityUpdatesList.innerHTML = '';

    feedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('security-update-item');
        itemElement.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p class="pub-date">Date de publication : ${item.pubDate.toLocaleDateString('fr-FR')}</p>
            <p>${item.description}</p>
        `;
        securityUpdatesList.appendChild(itemElement);
    });
}
