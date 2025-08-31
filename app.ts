export interface Character { 
    id: number;
     name: string; 
     ki: string; 
     maxKi: string; 
     race: string; 
     gender: string; 
     description: string; 
     image: string; 
     affiliation: string; 
     deletedAt: string | null; 
    }
function fetchCharacters(callback: (characters: Character[]) => void): void {
    fetch('http://localhost:3000/items')
        .then(response => {
            if (!response.ok) {
                console.log("HTTP error: ", response.status);
                callback([]);
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.items) {
                callback(data.items);
            } else {
                callback([]);
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            callback([]);
        });
}

function renderCharacters(): void {
    fetchCharacters((characters: Character[]) => {
        const gridContainer = document.getElementById('character-grid');

        if (!gridContainer) {
            console.error("No details found.");
            return;
        }

        gridContainer.innerHTML = '';

        characters.forEach((character: Character) => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
                <img src="${character.image}" alt="${character.name}" class="character-image">
                <h2>${character.name}</h2>
                <p><strong>Race:</strong> ${character.race}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Affiliation:</strong> ${character.affiliation}</p>
                <p><strong>KI:</strong> ${character.ki}</p>
                <p><strong>Max KI:</strong> ${character.maxKi}</p>
                <p>${character.description.slice(0, 150)}...</p>
                <a href="./details.html?id=${character.id}">See More</a>
            `;

            gridContainer.appendChild(card);
        });
    });
}
