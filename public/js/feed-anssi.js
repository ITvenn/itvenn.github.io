// Version v2.1
function loadAnssiFeed() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const anssiSecurityFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cert.ssi.gouv.fr%2Falerte%2Ffeed%2F&api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&order_dir=asc&count=100';

    if (!securityUpdatesList) return;

    fetch(anssiSecurityFeedURL)
        .then(response => response.json())
        .then(data => {
            let output = '<table class="security-updates-table">';
            output += '<thead><tr><th>Date</th><th>Alerte</th></tr></thead><tbody>';
            data.items.forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

                output += `
                    <tr>
                        <td style="padding-right: 20px;">${formattedDate}</td>
                        <td><a href="${item.link}" target="_blank">${truncateText(item.title, 100)}</a></td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr style="border:1px dashed #ccc; margin: 8px 0;"></td>
                    </tr>
                `;
            });
            output += '</tbody></table>';
            securityUpdatesList.innerHTML = output;

            const rows = securityUpdatesList.querySelectorAll('tr');
            rows.forEach(row => {
                row.addEventListener('click', function() {
                    const link = this.querySelector('a');
                    if (link) window.open(link.href, '_blank');
                });
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des alertes de sécurité:', error);
            securityUpdatesList.innerHTML = '<p class="error-message">Erreur lors du chargement des alertes de sécurité. Veuillez réessayer plus tard.</p>';
        });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Exécution immédiate
loadAnssiFeed();

// Optionnel : pour Astro SPA-like, réexécution à chaque navigation interne
document.addEventListener('astro:navigate', () => {
    loadAnssiFeed();
});
