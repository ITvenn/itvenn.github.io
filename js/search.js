// Liste des pages à rechercher
const pages = [
    { title: "Accueil", url: "index.html", content: "Contenu de la page d'accueil..." },
    { title: "Projets GitHub", url: "projets_github.html", content: "Liste des projets GitHub..." },
    { title: "Actualités IT", url: "actualites_it.html", content: "Dernières actualités IT..." },
    { title: "Vulnérabilités Cyber", url: "vulnerabilites_cyber.html", content: "Informations sur les vulnérabilités cyber..." },
    { title: "Ressources", url: "ressources.html", content: "Liste des ressources utiles..." },
    { title: "À propos", url: "about.html", content: "Informations sur ITvenn..." }
];

function search(query) {
    query = query.toLowerCase();
    return pages.filter(page => 
        page.title.toLowerCase().includes(query) || 
        page.content.toLowerCase().includes(query)
    );
}

function displayResults(results) {
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.style.position = 'absolute';
    resultsContainer.style.top = '60px';
    resultsContainer.style.right = '20px';
    resultsContainer.style.backgroundColor = 'white';
    resultsContainer.style.border = '1px solid #ddd';
    resultsContainer.style.borderRadius = '4px';
    resultsContainer.style.padding = '10px';
    resultsContainer.style.maxHeight = '300px';
    resultsContainer.style.overflowY = 'auto';
    resultsContainer.style.zIndex = '1000';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Aucun résultat trouvé</p>';
    } else {
        const resultList = document.createElement('ul');
        resultList.style.listStyleType = 'none';
        resultList.style.padding = '0';
        results.forEach(result => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = result.url;
            a.textContent = result.title;
            li.appendChild(a);
            resultList.appendChild(li);
        });
        resultsContainer.appendChild(resultList);
    }

    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }
    document.body.appendChild(resultsContainer);
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value;
        if (query.length > 0) {
            const results = search(query);
            displayResults(results);
        } else {
            const existingResults = document.getElementById('search-results');
            if (existingResults) {
                existingResults.remove();
            }
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Fermer les résultats de recherche lorsqu'on clique en dehors
    document.addEventListener('click', function(event) {
        const searchResults = document.getElementById('search-results');
        if (searchResults && !searchResults.contains(event.target) && event.target !== searchInput && event.target !== searchButton) {
            searchResults.remove();
        }
    });
});