const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

//search-bar
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    //searches by filtering with included letters //toLowerCase makes it case-insensitive
    const filteredCharacters = hpCharacters.filter((character) => { 
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)||
            character.ancestry.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters); //displays the filtered characters when u start typing letters in the search bar
});

//fetch api
const loadCharacters = async () => {
   
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
};

//displays the name and pic etc of characters
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}, Ancestry: ${character.ancestry}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
    console.log(characters);
};

loadCharacters();


