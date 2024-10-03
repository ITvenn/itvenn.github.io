document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const microsoftSecurityFeedURL = 'https://api.msrc.microsoft.com/update-guide/rss';

    fetch(microsoftSecurityFeedURL)
        .then(response => response.json())
        .then(data => {
            let output = '<div class="security-updates-grid">';
            data.items.slice(0, 6).forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
                
                output += `
                    <div class="security-update-card">
                        <h3 class="update-title">${item.title}</h3>
                        <p class="update-date">${formattedDate}</p>
                        <p class="update-description">${truncateText(item.description, 150)}</p>
                        <a href="${item.link}" target="_blank" class="read-more-btn">Lire plus</a>
                    </div>
                `;
            });
            output += '</div>';
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