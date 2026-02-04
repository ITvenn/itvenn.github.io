// Version optimisée multi-RSS v2.0

const rssFeeds = [
    ['IT-Connect', 'https://www.it-connect.fr/feed/'],
    ['Le Monde Informatique', 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml'],
    ['Korben.info', 'https://korben.info/feed'],
    ['ZDNet', 'https://www.zdnet.fr/feeds/rss/actualites/'],
    ['LeBigData.fr', 'https://www.lebigdata.fr/feed'],
    ['FrAndroid', 'https://www.frandroid.com/feed'],
    ["Tom's Hardware", 'https://www.tomshardware.fr/feed/'],
    ['Overclocking Made in France', 'https://www.overclocking.com/feed/'],
    ['Generation-NT', 'https://www.generation-nt.com/export/rss.xml'],
    ['Les Numériques', 'https://www.lesnumeriques.com/rss.xml']
];

const rssToJsonAPI = "https://api.rss2json.com/v1/api.json?api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&count=50&rss_url=";

async function loadAllRSSFeeds() {
    const container = document.getElementById('security-updates-list');
    if (!container) return;

    container.innerHTML = "<p>Chargement des flux...</p>";

    try {
        // Charger tous les flux en parallèle
        const fetchPromises = rssFeeds.map(([source, url]) =>
            fetch(rssToJsonAPI + encodeURIComponent(url))
                .then(res => res.json())
                .then(data => ({ source, items: data.items || [] }))
                .catch(() => ({ source, items: [] }))
        );

        const results = await Promise.all(fetchPromises);

        // Fusionner tous les articles
        const allItems = results.flatMap(result =>
            result.items.map(item => ({
                source: result.source,
                title: item.title,
                link: item.link,
                pubDate: item.pubDate
            }))
        );

        // Trier par date décroissante
        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Générer le tableau
        let html = `
            <table class="security-updates-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Titre</th>
                    </tr>
                </thead>
                <tbody>
        `;

        allItems.forEach(item => {
            const date = new Date(item.pubDate).toLocaleDateString('fr-FR');
            html += `
                <tr class="rss-row">
                    <td>${date}</td>
                    <td>${item.source}</td>
                    <td><a href="${item.link}" target="_blank">${truncateText(item.title, 100)}</a></td>
                </tr>
                <tr><td colspan="3"><hr style="border:1px dashed #ccc; margin: 8px 0;"></td></tr>
            `;
        });

        html += "</tbody></table>";
        container.innerHTML = html;

        // Rendre les lignes cliquables
        container.querySelectorAll('.rss-row').forEach(row => {
            row.addEventListener('click', () => {
                const link = row.querySelector('a');
                if (link) window.open(link.href, '_blank');
            });
        });

    } catch (error) {
        console.error("Erreur globale :", error);
        container.innerHTML = "<p class='error-message'>Impossible de charger les flux RSS.</p>";
    }
}

function truncateText(text, maxLength) {
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
}

// Chargement initial
document.addEventListener("DOMContentLoaded", loadAllRSSFeeds);

// Pour Astro SPA-like
document.addEventListener("astro:navigate", loadAllRSSFeeds);
