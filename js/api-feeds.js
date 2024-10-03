document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const anssiSecurityFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.cert.ssi.gouv.fr/alerte/feed/';

    fetch(anssiSecurityFeedURL)
        .then(response => response.json())
        .then(data => {
            let output = '<select class="security-updates-select" size="30">'; // Changé à size="10"
            data.items.forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                
                output += `
                    <option value="${item.link}">
                        ${formattedDate} - ${truncateText(item.title, 100)}
                    </option>
                `;
            });
            output += '</select>';
            securityUpdatesList.innerHTML = output;

            // Ajouter un gestionnaire d'événements pour ouvrir le lien sélectionné
            const select = securityUpdatesList.querySelector('.security-updates-select');
            select.addEventListener('change', function() {
                window.open(this.value, '_blank');
                this.selectedIndex = -1; // Réinitialiser la sélection
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