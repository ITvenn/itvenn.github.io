function loadRSSFeed(feedUrl, containerId, errorMessage) {
    const rss2jsonApiKey = 'YOUR_API_KEY'; // Remplacez par votre clé API RSS2JSON
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=${rss2jsonApiKey}`;

    $.ajax({
        url: rss2jsonUrl,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.status === 'ok') {
                let html = '<ul>';
                data.items.slice(0, 5).forEach(function(item) {
                    html += `<li>
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.description}</p>
                    </li>`;
                });
                html += '</ul>';
                $(containerId).html(html);
            } else {
                $(containerId).html(`<p>${errorMessage}</p>`);
            }
        },
        error: function() {
            $(containerId).html(`<p>${errorMessage}</p>`);
        }
    });
}

$(document).ready(function() {
    loadRSSFeed(
        "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml",
        "#cve-feed",
        "Impossible de charger le flux CVE. Veuillez réessayer plus tard."
    );

    loadRSSFeed(
        "https://www.nist.gov/blogs/cybersecurity-insights/rss.xml",
        "#nist-feed",
        "Impossible de charger le flux NIST. Veuillez réessayer plus tard."
    );
});