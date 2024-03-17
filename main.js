const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
  else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = 'Error';
  }
}

const renderPokemon = async (pokemon) => {

  removeAllTypes();
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  const firstType = (data['types']['0']['type']['name'])

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
  
    input.value = '';
    searchPokemon = data.id;

    switch (firstType) {
      case 'normal':
        pokemonName.classList.add('normal');
        break
      case 'water':
        pokemonName.classList.add('water');
        break
      case 'fire':
        pokemonName.classList.add('fire');
        break
      case 'grass':
        pokemonName.classList.add('grass');
        break
      case 'flying':
        pokemonName.classList.add('flying');
        break
      case 'fighting':
        pokemonName.classList.add('fighting');
        break
      case 'poison':
        pokemonName.classList.add('poison');
        break
      case 'electric':
        pokemonName.classList.add('electric');
        break
      case 'ground':
        pokemonName.classList.add('ground');
        break
      case 'rock':
        pokemonName.classList.add('rock');
        break
      case 'psychic':
        pokemonName.classList.add('psychic');
        break
      case 'ice':
        pokemonName.classList.add('ice');
        break
      case 'bug':
        pokemonName.classList.add('bug');
        break
      case 'ghost':
        pokemonName.classList.add('ghost');
        break
      case 'steel':
        pokemonName.classList.add('steel');
        break
      case 'dragon':
        pokemonName.classList.add('dragon');
        break
      case 'dark':
        pokemonName.classList.add('dark');
        break
      case 'fairy':
        pokemonName.classList.add('fairy');
        break
    }
}

function removeAllTypes() {

  const removeAll = ['normal', 'water', 'fire', 'grass', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 'ice', 'bug',
  'ghost', 'steel', 'dragon', 'dark', 'fairy'];

  removeAll.forEach(type => {
    pokemonName.classList.remove(type)
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
