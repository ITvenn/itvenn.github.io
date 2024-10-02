function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function loadVulnerabilities() {
    const apiUrl = 'https://services.nvd.nist.gov/rest/json/cves/1.0?resultsPerPage=5';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            let html = '<ul>';
            data.result.CVE_Items.forEach(function(item) {
                const cve = item.cve;
                const description = cve.description.description_data[0].value;
                const publishedDate = formatDate(item.publishedDate);
                html += `<li>
                    <h3><a href="https://nvd.nist.gov/vuln/detail/${cve.CVE_data_meta.ID}" target="_blank">${cve.CVE_data_meta.ID}</a></h3>
                    <p><strong>Date de publication :</strong> ${publishedDate}</p>
                    <p>${description}</p>
                </li>`;
            });
            html += '</ul>';
            $('#cve-list').html(html);
        },
        error: function() {
            $('#cve-list').html('<p>Impossible de charger les vulnérabilités. Veuillez réessayer plus tard.</p>');
        }
    });
}

$(document).ready(function() {
    loadVulnerabilities();
});