
document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('results').innerHTML = '';
});



let data;

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data)
    })
    .catch(error => console.error('There was an error fetching the data:', error));

document.getElementById('btnSearch').addEventListener('click', function() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    let results = [];

    if (!data) {
        console.error('Data not yet fetched');
        return;
    }

    if(input == "beach" || input == "beaches"){
        data.beaches.forEach(beach => {
            results.push(beach)
        });
    }else if(input == "temples" || input == "temple"){
        data.temples.forEach(temple => {
            results.push(temple);
        });
    }else if(input == "country" || input == "countries"){
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push(city);
            });
        });
    }

    console.log(results)
    displaySearchResults(results);
});


function displaySearchResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results for your input found.';
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>${result.name}</h2>
            <img src="${result.imageUrl}" alt="${result.name}" class="img-fluid">
            <p>${result.description}</p>
            <a href=\"${result.imageUrl}\"><button>See Picture</button></a><br><br>
        `;
        resultsDiv.appendChild(item);
    });
}