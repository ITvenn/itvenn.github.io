document.addEventListener('DOMContentLoaded', function() {
    const securityUpdatesList = document.getElementById('security-updates-list');
    const microsoftSecurityFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://msrc-blog.microsoft.com/feed/';

    fetch(microsoftSecurityFeedURL)
        .then(response => response.json())
        .then(data => {
            let output = '';
            data.items.forEach(item => {
                output += `
                    <div class="security-update">
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.pubDate}</p>
                        <p>${item.description}</p>
                    </div>
                `;
            });
            securityUpdatesList.innerHTML = output;
        })
        .catch(error => {
            console.error('Erreur lors du chargement des mises à jour de sécurité:', error);
            securityUpdatesList.innerHTML = '<p>Erreur lors du chargement des mises à jour de sécurité. Veuillez réessayer plus tard.</p>';
        });
});