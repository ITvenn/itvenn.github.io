document.addEventListener('DOMContentLoaded', function() {
    const rssUrl = 'https://www.cert.ssi.gouv.fr/alerte/feed/';
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // À remplacer par ta propre solution
    const feedUrl = corsProxy + rssUrl;

    const securityUpdatesList = document.getElementById('security-updates-list');
    securityUpdatesList.innerHTML = '<p>Chargement des alertes de sécurité...</p>'; // Ajout d'un message de chargement

    // Fonction pour échapper les caractères spéciaux (protection XSS)
    function sanitizeHTML(text) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = text;
        return tempDiv.innerHTML;
    }

    fetch(feedUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const feedItems = [];

            items.forEach(el => {
                feedItems.push({
                    title: sanitizeHTML(el.querySelector("title").textContent),
                    link: sanitizeHTML(el.querySelector("link").textContent),
                    description: sanitizeHTML(el.querySelector("description").textContent),
                    pubDate: new Date(el.querySelector("pubDate").textContent)
                });
            });

            // Trier les éléments par date de publication (du plus récent au plus ancien)
            feedItems.sort((a, b) => b.pubDate - a.pubDate);

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
            securityUpdatesList.innerHTML = '<p class="error-message">Une erreur est survenue lors du chargement des alertes de sécurité. Veuillez réessayer plus tard.</p>';
        });
});
