document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const microsoftSecurityFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://api.msrc.microsoft.com/update-guide/rss';

    fetch(microsoftSecurityFeedURL)
        .then(response => response.json())
        .then(data => {
            let output = '<ul class="security-updates-list">';
            data.items.forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
                
                output += `
                    <li class="security-update-item">
                        <h3 class="update-title">${item.title}</h3>
                        <p class="update-date">${formattedDate}</p>
                        ${item.description ? `<p class="update-description">${truncateText(item.description, 150)}</p>` : ''}
                        <a href="${item.link}" class="read-more-link" target="_blank">Lire plus</a>
                    </li>
                `;
            });
            output += '</ul>';
            securityUpdatesList.innerHTML = output;
        })
        .catch(error => {
            console.error('Erreur lors du chargement des mises à jour de sécurité:', error);
            securityUpdatesList.innerHTML = '<p class="error-message">Erreur lors du chargement des mises à jour de sécurité. Veuillez réessayer plus tard.</p>';
        });
});

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}