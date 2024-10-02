function loadRSSFeed(feedUrl, containerId, errorMessage) {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    $.ajax({
        url: corsProxy + feedUrl,
        type: 'GET',
        dataType: 'xml',
        success: function(data) {
            let html = '<ul>';
            $(data).find('item').slice(0, 5).each(function() {
                const title = $(this).find('title').text();
                const link = $(this).find('link').text();
                const description = $(this).find('description').text();
                html += `<li>
                    <h3><a href="${link}" target="_blank">${title}</a></h3>
                    <p>${description}</p>
                </li>`;
            });
            html += '</ul>';
            $(containerId).html(html);
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
        "https://www.nist.gov/news-events/cybersecurity/rss.xml",
        "#nist-feed",
        "Impossible de charger le flux NIST. Veuillez réessayer plus tard."
    );
});