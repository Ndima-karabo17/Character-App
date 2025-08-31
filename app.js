"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fetchCharacters(callback) {
    fetch('http://localhost:3000/items')
        .then(function (response) {
        if (!response.ok) {
            console.log("HTTP error: ", response.status);
            callback([]);
            return;
        }
        return response.json();
    })
        .then(function (data) {
        if (data && data.items) {
            callback(data.items);
        }
        else {
            callback([]);
        }
    })
        .catch(function (error) {
        console.error("Fetch error:", error);
        callback([]);
    });
}
function renderCharacters() {
    fetchCharacters(function (characters) {
        var gridContainer = document.getElementById('character-grid');
        if (!gridContainer) {
            console.error("Grid container with id 'character-grid' not found.");
            return;
        }
        gridContainer.innerHTML = '';
        characters.forEach(function (character) {
            var card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = "\n <img src=\"".concat(character.image, "\" alt=\"").concat(character.name, "\" class=\"character-image\">\n                <h2>").concat(character.name, "</h2>\n                <p><strong>Race:</strong> ").concat(character.race, "</p>\n                <p><strong>Gender:</strong> ").concat(character.gender, "</p>\n                <p><strong>Affiliation:</strong> ").concat(character.affiliation, "</p>\n                <p><strong>KI:</strong> ").concat(character.ki, "</p>\n                <p><strong>Max KI:</strong> ").concat(character.maxKi, "</p>\n                <p>").concat(character.description.slice(0, 150), "...</p>\n                <a href=\"./details.html?id=").concat(character.id, "\">See More</a>\n            ");
            gridContainer.appendChild(card);
        });
    });
}
