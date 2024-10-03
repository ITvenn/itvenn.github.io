document.addEventListener('DOMContentLoaded', function() {
    const rssUrl = 'https://www.cert.ssi.gouv.fr/alerte/feed/';
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const feedUrl = corsProxy + rssUrl;

    fetch(feedUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const feedItems = [];

            items.forEach(el => {
                feedItems.push({
                    title: el.querySelector("title").textContent,
                    link: el.querySelector("link").textContent,
                    description: el.querySelector("description").textContent,
                    pubDate: new Date(el.querySelector("pubDate").textContent)
                });
            });

            // Trier les éléments par date de publication (du plus récent au plus ancien)
            feedItems.sort((a, b) => b.pubDate - a.pubDate);

            const securityUpdatesList = document.getElementById('security-updates-list');
            securityUpdatesList.innerHTML = ''; // Effacer le message de chargement

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
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du flux RSS:', error);
            const securityUpdatesList = document.getElementById('security-updates-list');
            securityUpdatesList.innerHTML = '<p class="error-message">Une erreur est survenue lors du chargement des alertes de sécurité. Veuillez réessayer plus tard.</p>';
        });
});