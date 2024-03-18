const elements = {
  pokemonName: document.querySelector('.pokemon__name'),
  pokemonNumber: document.querySelector('.pokemon__number'),
  pokemonImage: document.querySelector('.pokemon__image'),
  form: document.querySelector('.form'),
  input: document.querySelector('.input__search'),
  buttonPrev: document.querySelector('.btn-prev'),
  buttonNext: document.querySelector('.btn-next'),
};

let searchPokemon = 1;

const typeClasses = {
  normal: 'normal',
  water: 'water',
  fire: 'fire',
  grass: 'grass',
  flying: 'flying',
  fighting: 'fighting',
  poison: 'poison',
  electric: 'electric',
  ground: 'ground',
  rock: 'rock',
  psychic: 'psychic',
  ice: 'ice',
  bug: 'bug',
  ghost: 'ghost',
  steel: 'steel',
  dragon: 'dragon',
  dark: 'dark',
  fairy: 'fairy',
};

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.ok) {
    return await APIResponse.json();
  } else {
    throw new Error('Pokemon not found');
  }
};

const renderPokemon = async (pokemon) => {
  removeAllTypes();
  elements.pokemonName.innerHTML = 'Loading...';
  elements.pokemonNumber.innerHTML = '';

  try {
    const data = await fetchPokemon(pokemon);
    const firstType = data.types[0].type.name;
    const imageUrl = data.sprites.versions['generation-v']['black-white'].front_default;

    elements.pokemonName.innerHTML = data.name;
    elements.pokemonNumber.innerHTML = data.id;
    elements.pokemonImage.src = imageUrl;
    elements.pokemonImage.style.display = 'block';

    elements.input.value = '';
    searchPokemon = data.id;

    addType(firstType);
  } catch (error) {
    elements.pokemonImage.style.display = 'none';
    elements.pokemonName.innerHTML = 'Not found :c';
    elements.pokemonNumber.innerHTML = 'Error';
  }
};

function addType(type) {
  const typeClass = typeClasses[type];
  
  elements.pokemonName.classList.add(typeClass);
}

function removeAllTypes() {
  for (const typeClass of Object.values(typeClasses)) {
    elements.pokemonName.classList.remove(typeClass);
  }
}

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(elements.input.value.toLowerCase());
});

elements.buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

elements.buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
