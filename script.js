const pokedex = document.getElementById('pokedex');
const pokedetail = document.querySelector('.pokedetail');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        var pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};
const displayPokemon = (pokemon) => {
    console.log(pokemon);

    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.name}</h2>

        </li>`
        )
        .join('');

    pokedex.innerHTML = pokemonHTMLString;

    $(document).ready(function(){
        $(".card").slice(0, 12).show();
        $("#loadMore").on("click", function(e){
            e.preventDefault();
            $(".card:hidden").slice(0, 12).slideDown();
            if($(".card:hidden").length == 0) {
                $("#loadMore").text("No Content").addClass("noContent");
            }
        });

    })

};

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPopup(pokeman);
};
const displayPopup = (pokeman) => {
    console.log(pokeman);
    const  type = pokeman.types.map((type) =>
    type.type.name).join(',');

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokeman.stats.map(stat => {
        switch (stat.stat.name) {
            case 'hp':
                hp = stat['base_stat'];
                break;
            case 'attack':
                attack = stat['base_stat'];
                break;
            case 'defense':
                defense = stat['base_stat'];
                break;
            case 'speed':
                speed = stat['base_stat'];
                break;
            case 'special-attack':
                specialAttack = stat['base_stat'];
                break;
            case 'special-defense':
                specialDefense = stat['base_stat'];
                break;
            default:
                break;
        }
    });

    const image = pokeman.sprites['front_default'];
    const htmlString = `
    <div class="popup">
    <div class="cards">
    <img class="card-image" src="${image}"/>
            <h2 class="card-title">${pokeman.name} #00${pokeman.id}</h2>
            <table class="table"><tr>
            <td>Type</td>
            <td>${type}</td>
            </tr>
            <tr>
            <td>Atack</td>
            <td>${attack}</td>
</tr>
            <tr>
            <td>Defence</td>
            <td>${defense}</td>
</tr>
            <tr>
            <td>HP</td>
            <td>${defense}</td>
</tr>
            <tr>
            <td>SP Atack</td>
            <td>${specialAttack}</td>
</tr>
       <tr>
            <td>SP Defence</td>
            <td>${specialDefense}</td>
</tr>
       <tr>
            <td>Speed</td>
            <td>${speed}</td>
</tr>
       <tr>
            <td>Weight</td>
            <td>${pokeman.weight}</td>
</tr>
       <tr>
            <td>Total moves</td>
            <td>${pokeman.moves.length}</td>
</tr>

  </table>
            
            
</div>
</div>
`;
    pokedetail.innerHTML = htmlString ;
};
fetchPokemon();

