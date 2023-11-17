const container = document.createElement('div');
container.className = 'container';

const title = document.createElement('h1');
title.textContent = 'Nationalize API';

const input = document.createElement('input');
input.type = 'text';
input.id = 'searchInput';
input.placeholder = 'Enter the name';

const button = document.createElement('button');
button.innerHTML = 'Search';
button.addEventListener('click',search)

const results = document.createElement('div');
results.id = 'results';


container.appendChild(title);
container.appendChild(input);
container.appendChild(button);
container.appendChild(results);


document.body.appendChild(container);




async function search() {
    try {
        const inputElement = document.getElementById('searchInput');
        const name = inputElement.value.trim() ;

        if (name === '') {
            alert('Please enter a name to search.');
            return;
        }

        const apiUrl = `https://api.nationalize.io/?name=${name}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function displayResults(data) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';

    if (data.country && data.country.length > 0) {
        const topCountries = data.country.slice(0, 2);

        topCountries.forEach(country => {
            const probability = country.probability.toFixed(2);

            
            const resultItem = document.createElement('div');
            resultItem.setAttribute('id','country');
            resultItem.innerHTML = `
                <p>Country: ${country.country_id}</p>
                <p>Probability: ${probability}</p>
            `;
            resultsElement.appendChild(resultItem);
        });

        
        const inputElement = document.getElementById('searchInput');
        const name = inputElement.value.trim().toLowerCase();

        resultsElement.innerHTML = resultsElement.innerHTML.replace(
            new RegExp(name, 'gi'),
            match => `<span class="highlight">${match}</span>`
        );
    } else {
        resultsElement.innerHTML = '<p><h3>No results found.</h3></p>';
        setTimeout(() => {
            resultsElement.innerHTML = '';
        }, 2000);
    }
}


