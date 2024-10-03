document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const anssiSecurityFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.cert.ssi.gouv.fr/alerte/feed/';

    fetch(anssiSecurityFeedURL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = Array.from(data.querySelectorAll("item"));
            items.sort((a, b) => {
                const dateA = new Date(a.querySelector("pubDate").textContent);
                const dateB = new Date(b.querySelector("pubDate").textContent);
                return dateB - dateA;
            });

            let output = '<table class="security-updates-table">';
            output += '<thead><tr><th>Date</th><th>Alerte</th></tr></thead><tbody>';
            items.forEach(item => {
                const title = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;
                const pubDate = new Date(item.querySelector("pubDate").textContent);
                const formattedDate = pubDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                
                output += `
                    <tr>
                        <td>${formattedDate}</td>
                        <td><a href="${link}" target="_blank">${truncateText(title, 100)}</a></td>
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