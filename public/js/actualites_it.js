// Version optimisée multi-RSS v2.1 — Compatible Astro + GitHub Pages

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

const rssToJsonAPI =
    "https://api.rss2json.com/v1/api.json?api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&count=50&rss_url=";

async function loadAllRSSFeeds() {
    const container = document.getElementById('rss-feeds-container');
    if (!container) return;

    container.innerHTML = "<p>Chargement des actualités...</p>";

    try {
        const fetchPromises = rssFeeds.map(([source, url]) =>
            fetch(rssToJsonAPI + encodeURIComponent(url))
                .then(res => res.json())
                .then(data => ({ source, items: data.items || [] }))
                .catch(() => ({ source, items: [] }))
        );

        const results = await Promise.all(fetchPromises);

        const allItems = results.flatMap(result =>
            result.items.map(item => ({
                source: result.source,
                title: item.title,
                link: item.link,
                pubDate: item.pubDate
            }))
        );

        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        let html = `
            <table class="security-updates-table w-full">
                <thead>
                    <tr>
                        <th class="text-left p-2">Date</th>
                        <th class="text-left p-2">Source</th>
                        <th class="text-left p-2">Titre</th>
                    </tr>
                </thead>
                <tbody>
        `;

        allItems.forEach(item => {
            const date = new Date(item.pubDate).toLocaleDateString('fr-FR');

            html += `
                <tr class="rss-row cursor-pointer hover:bg-gray-100">
                    <td class="p-2">${date}</td>
                    <td class="p-2">${item.source}</td>
                    <td class="p-2">
                        <a href="${item.link}" target="_blank" class="text-blue-600 underline">
                            ${truncateText(item.title, 100)}
                        </a>
                    </td>
                </tr>
                <tr><td colspan="3"><hr class="border-dashed border-gray-300 my-2"></td></tr>
            `;
        });

        html += "</tbody></table>";
        container.innerHTML = html;

        container.querySelectorAll('.rss-row').forEach(row => {
            row.addEventListener('click', () => {
                const link = row.querySelector('a');
                if (link) window.open(link.href, '_blank');
            });
        });

    } catch (error) {
        console.error("Erreur globale :", error);
        container.innerHTML = "<p class='text-red-600'>Impossible de charger les flux RSS.</p>";
    }
}

function truncateText(text, maxLength) {
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
}

document.addEventListener("DOMContentLoaded", loadAllRSSFeeds);
document.addEventListener("astro:navigate", loadAllRSSFeeds);
