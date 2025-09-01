// Version améliorée v3.0
document.addEventListener("DOMContentLoaded", async () => {
  const securityUpdatesList = document.getElementById("security-updates-list");
  const anssiSecurityFeedURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cert.ssi.gouv.fr%2Falerte%2Ffeed%2F&api_key=h61rxauzqk5odbmiwtir1rq9dvlqdf5yzfxltyxm&order_dir=asc&count=100";

  try {
    const response = await fetch(anssiSecurityFeedURL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      securityUpdatesList.innerHTML =
        '<p class="text-gray-500">Aucune alerte disponible pour le moment.</p>';
      return;
    }

    // Construction du tableau
    let output = `
      <table class="security-updates-table w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 border-b font-semibold">Date</th>
            <th class="px-4 py-2 border-b font-semibold">Alerte</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.items.forEach((item) => {
      const date = new Date(item.pubDate);
      const formattedDate = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      output += `
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-4 py-2 align-top whitespace-nowrap">${formattedDate}</td>
          <td class="px-4 py-2">
            <a href="${item.link}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-blue-600 hover:underline"
               data-no-swup>
              ${truncateText(item.title, 120)}
            </a>
          </td>
        </tr>
      `;
    });

    output += "</tbody></table>";
    securityUpdatesList.innerHTML = output;

    // Ajout clic sur ligne entière
    const rows = securityUpdatesList.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.addEventListener("click", () => {
        const link = row.querySelector("a");
        if (link) window.open(link.href, "_blank");
      });
    });
  } catch (error) {
    console.error("Erreur lors du chargement des alertes de sécurité:", error);
    securityUpdatesList.innerHTML =
      '<p class="error-message text-red-600">⚠️ Erreur lors du chargement des alertes. Veuillez réessayer plus tard.</p>';
  }
});

function truncateText(text, maxLength) {
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
}
