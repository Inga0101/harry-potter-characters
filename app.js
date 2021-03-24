const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

//search-bar function
searchBar.addEventListener('keyup', (e) => {
    const letters = e.target.value.toLowerCase();

    //searches by checking which characters contain the typed in letters //toLowerCase makes it case-insensitive
    const filteredCharacters = hpCharacters.filter((character) => { 
        return (
            character.name.toLowerCase().includes(letters) || character.house.toLowerCase().includes(letters) || character.ancestry.toLowerCase().includes(letters)
        );
    });
    displayCharacters(filteredCharacters); 
});

//fetch api
const fetchCharacters = async () => {
   
        const res = await fetch('http://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
};

//function to display the name and pic etc of characters
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => { //converts the objects/info in the api to html
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}, Ancestry: ${character.ancestry}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join(' ');
    charactersList.innerHTML = htmlString;
};

fetchCharacters(); 


