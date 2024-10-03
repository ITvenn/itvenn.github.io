document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const microsoftSecurityFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://api.msrc.microsoft.com/update-guide/rss';

    fetch(microsoftSecurityFeedURL)
        .then(response => response.json())
        .then(data => {
            let output = '<ul class="security-updates-list">';
            data.items.slice(0, 20).forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                
                output += `
                    <li class="security-update-item">
                        <span class="update-date">${formattedDate}</span>
                        <a href="${item.link}" class="update-title" target="_blank">${truncateText(item.title, 80)}</a>
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