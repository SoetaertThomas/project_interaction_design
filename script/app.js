//micro interaction vuisten tegen elkaar botsen en dan winnaar tonen

//globale variabelen
const types_colors = {
    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD'
};

let stats= [];

const number_pokemon_one = "one";
const number_pokemon_two = "two";

//show in frontend
function showPokemon(pokemon, color, img_pokemon, card_number){
    console.log(pokemon);
    //show img
    const img = document.querySelector(`.js-image--${card_number}`);
    img.setAttribute("src", img_pokemon);

    //show stats
    const names = document.querySelectorAll(`.js-name--${card_number}`);
    const height = document.querySelector(`.js-height--${card_number}`);
    const weight = document.querySelector(`.js-weight--${card_number}`);
    const hp = document.querySelector(`.js-hp--${card_number}`);
    const attack = document.querySelector(`.js-attack--${card_number}`);
    const defence = document.querySelector(`.js-defence--${card_number}`);

    names.forEach(name => {
        name.innerHTML = `${pokemon.name}`;
    });
    hp.innerHTML = `Hp: <span class="c-span-bar js-span-hp--${card_number}"></span><span class="c-span-value">${pokemon.stats[0].base_stat}</span>`;
    height.innerHTML = `Height: <span class="c-span-bar js-span-height--${card_number}"></span><span class="c-span-value">${pokemon.height} ft</span>`;
    weight.innerHTML = `Weight: <span class="c-span-bar js-span-weight--${card_number}"></span><span class="c-span-value">${pokemon.weight} lbs</span>`;
    attack.innerHTML = `Attack: <span class="c-span-bar js-span-attack--${card_number}"></span><span class="c-span-value">${pokemon.stats[1].base_stat}</span>`;
    defence.innerHTML = `Defence: <span class="c-span-bar js-span-defence--${card_number}"></span><span class="c-span-value">${pokemon.stats[2].base_stat}</span>`;

    //show color
    const border = document.querySelector(`.js-background--${card_number}`);
    //console.log(color);
    if(1 == color.length){
        border.style.backgroundColor = color[0];
    }else if(2 == color.length){
        border.style.backgroundImage = `linear-gradient(to right, ${color[0]} , ${color[1]})`;
    }

    //put stats one in array
    stats.push(pokemon.stats[0].base_stat);
    stats.push(pokemon.height);
    stats.push(pokemon.weight/10);
    stats.push(pokemon.stats[1].base_stat);
    stats.push(pokemon.stats[2].base_stat);
}

async function showStats(pok_one, pok_two) {
    //calculate width
    let width_height_one;
    let width_weight_one;
    let width_attack_one;
    let width_defence_one;
    let width_hp_one;

    let width_height_two;
    let width_weight_two;
    let width_attack_two;
    let width_defence_two;
    let width_hp_two;

    width_height_one =  calculateWidthBars(pok_one.height, pok_two.height, width_height_one);
    width_weight_one =  calculateWidthBars(pok_one.weight, pok_two.weight, width_weight_one);
    width_attack_one =  calculateWidthBars(pok_one.stats[1].base_stat, pok_two.stats[1].base_stat, width_attack_one);
    width_defence_one =  calculateWidthBars(pok_one.stats[2].base_stat, pok_two.stats[2].base_stat, width_defence_one);
    width_hp_one =  calculateWidthBars(pok_one.stats[0].base_stat, pok_two.stats[0].base_stat, width_hp_one);

    width_height_two =  calculateWidthBars(pok_two.height,pok_one.height, width_height_two);
    width_weight_two =  calculateWidthBars(pok_two.weight, pok_one.weight, width_weight_two);
    width_attack_two =  calculateWidthBars(pok_two.stats[1].base_stat, pok_one.stats[1].base_stat, width_attack_two);
    width_defence_two =  calculateWidthBars(pok_two.stats[2].base_stat, pok_one.stats[2].base_stat, width_defence_two);
    width_hp_two =  calculateWidthBars(pok_two.stats[0].base_stat, pok_one.stats[0].base_stat, width_hp_two);

    // console.log(width_height_one);
    // console.log(width_weight_one);
    // console.log(width_attack_one);
    // console.log(width_defence_one);
    // console.log(width_speed_one);

    const backgroundcolor_one = getColorPokemon(pok_one);
    const backgroundcolor_two = getColorPokemon(pok_two);
    

    //dom elementen
    const height_one = document.querySelector(".js-span-height--one");
    const weight_one = document.querySelector(".js-span-weight--one");
    const attack_one = document.querySelector(".js-span-attack--one");
    const defence_one = document.querySelector(".js-span-defence--one");
    const hp_one = document.querySelector(".js-span-hp--one");

    const height_two = document.querySelector(".js-span-height--two");
    const weight_two = document.querySelector(".js-span-weight--two");
    const attack_two = document.querySelector(".js-span-attack--two");
    const defence_two = document.querySelector(".js-span-defence--two");
    const hp_two = document.querySelector(".js-span-hp--two");

    //pokemon fill bars
    fillBars(height_one, width_height_one,backgroundcolor_one);
    fillBars(weight_one, width_weight_one,backgroundcolor_one);
    fillBars(attack_one, width_attack_one,backgroundcolor_one);
    fillBars(defence_one, width_defence_one,backgroundcolor_one);
    fillBars(hp_one, width_hp_one,backgroundcolor_one);

    fillBars(height_two, width_height_two,backgroundcolor_two);
    fillBars(weight_two, width_weight_two,backgroundcolor_two);
    fillBars(attack_two, width_attack_two,backgroundcolor_two);
    fillBars(defence_two, width_defence_two,backgroundcolor_two);
    fillBars(hp_two, width_hp_two,backgroundcolor_two);


}

function fillBars(source, width, backgroundcolor) {
    source.style.width = `${width}%`;
    if(1 == backgroundcolor.length){
        source.style.backgroundColor = backgroundcolor[0];
    }else if(2 == backgroundcolor.length){
        source.style.backgroundImage = `linear-gradient(to right, ${backgroundcolor[0]} , ${backgroundcolor[1]})`;
    }
}

//get in backend
function getImagePokemon(pokemonname){
    url = "https://img.pokemondb.net/artwork/large/" + pokemonname + ".jpg";
    return url;
}

function getColorPokemon(pokemon){
    let types = pokemon.types;
    let colors = [];
    types.forEach(element => {
        for (const [key, value] of Object.entries(types_colors)) {
        if(key == element.type.name){
                colors.push(value);
            };
}
    });
    return colors;
    //console.log(colors);
}

async function fetchRandomPokemon(number_one, number_two) {
    const loaders = document.querySelectorAll(".js-loader");
    const images = document.querySelectorAll(".js-image");
    const names = document.querySelectorAll(".js-name");

    //loaders before fetch
    images.forEach(image => {
        image.style.display = 'none';
    });
    names.forEach(name => {
        name.style.display = 'none';
    });
    loaders.forEach(loader => {
        loader.style.display = 'block';
    });
    
    //pokemon one fetch
    const response_one = await fetch(`https://pokeapi.co/api/v2/pokemon/${number_one}`);
    pokemon_one = await response_one.json();

    //pokemon two fetch
    const response_two = await fetch(`https://pokeapi.co/api/v2/pokemon/${number_two}`);
    pokemon_two = await response_two.json();

    //loaders after fetch
    images.forEach(image => {
        image.removeAttribute("style");
    });
    names.forEach(name => {
        name.removeAttribute("style");
    });
    loaders.forEach(loader => {
        loader.style.display = 'none';
    });
    //get images pokemon and show pokemon
    let img_one = getImagePokemon(pokemon_one.name);
    showPokemon(pokemon_one, getColorPokemon(pokemon_one), img_one, number_pokemon_one);
    let img_two = getImagePokemon(pokemon_two.name);
    showPokemon(pokemon_two, getColorPokemon(pokemon_two), img_two, number_pokemon_two);
    showStats(pokemon_one, pokemon_two);
}
//listeners
function toggle(number){
    const card = document.querySelector(`.js-card-toggle--${number}`);
    card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
    });
}

function listenToBattle() {
    const battle = document.querySelector(".js-battle");
    const card_one = document.querySelector(".js-card-one");
    const card_two = document.querySelector(".js-card-two");
    const card_two_toggle = document.querySelector('.js-card-toggle--two');
    const card_one_toggle = document.querySelector('.js-card-toggle--one');
    let winner = "";

    battle.addEventListener("click", function(){
        winner = calculateWinner(stats);
        if (winner == number_pokemon_one) {
            card_two.classList.add("pokemon-loss");
            card_one.classList.add("pokemon-win");
            card_one_toggle.classList.toggle('is-flipped');
        }else{
            card_one.classList.add("pokemon-loss");
            card_two.classList.add("pokemon-win");
            card_two_toggle.classList.toggle('is-flipped');
        }
    });
}

//calculate
function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(897);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateWinner(stats){
    let sum_one = 0;
    let sum_two = 0;

    for (let i = 0; i < 5; i++) {
    sum_one += stats[i];
    //console.log(stats[i]);
    }
    for (let i = 5; i < 10; i++) {
    sum_two += stats[i];
    //console.log(stats[i]);
    }
    console.log(sum_one);
    console.log(sum_two);

    if (sum_one > sum_two) {
        return number_pokemon_one;
    } else {
        return number_pokemon_two;
    }
    
}

function calculateWidthBars(statone, stattwo, variable) {
    if ((statone-stattwo) > 0) {
        variable = 100;
    } else {
        variable = Math.round(statone / stattwo*100);
    }
    return variable;
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    //fetch pokemon
    fetchRandomPokemon(getRandomInt(), getRandomInt());

    //img error fetch new random pokemon
    const images = document.querySelectorAll(".js-image");
    images.forEach(img => {
        img.addEventListener("error", function () {
        console.log("img error");
        pokemon_one = fetchRandomPokemon(getRandomInt(), getRandomInt());
        });
    });
    
    //toggle cards pokemon
    toggle(number_pokemon_one);
    toggle(number_pokemon_two);

    //battle button
    listenToBattle();
    
});