document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const anssiSecurityFeedURL = 'https://www.cert.ssi.gouv.fr/alerte/feed/';

    fetchFeed(anssiSecurityFeedURL)
        .then(feed => {
            // Trier les éléments du plus récent au plus ancien
            feed.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

            let output = '<table class="security-updates-table">';
            output += '<thead><tr><th>Date</th><th>Alerte</th></tr></thead><tbody>';
            feed.items.forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                
                output += `
                    <tr>
                        <td>${formattedDate}</td>
                        <td><a href="${item.link}" target="_blank">${truncateText(item.title, 100)}</a></td>
                    </tr>
                `;
            });
            output += '</tbody></table>';
            securityUpdatesList.innerHTML = output;

            const rows = securityUpdatesList.querySelectorAll('tr');
            rows.forEach(row => {
                row.addEventListener('click', function() {
                    const link = this.querySelector('a');
                    if (link) {
                        window.open(link.href, '_blank');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des alertes de sécurité:', error);
            securityUpdatesList.innerHTML = '<p class="error-message">Erreur lors du chargement des alertes de sécurité. Veuillez réessayer plus tard.</p>';
        });
});

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}