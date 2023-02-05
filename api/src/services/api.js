const axios = require("axios")

// * function to get list of pokemon in the api.
let id = 1;
const getPokemon = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonList = data.results
    const nextData = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
    const pokemonList2 = nextData.data.results

    const totalPokemon = [...pokemonList, ...pokemonList2];
    return totalPokemon;
}

// *function to get details of each pokemon.

const pokemonAPI = async () => {
    const listPokemon = await getPokemon();
    const pokemon = listPokemon.map(pokemon => axios.get(pokemon.url))
    const executePromise = await Promise.all(pokemon)
    const request = executePromise.map(item => item.data)
    const thePokemon = request.map(item => {
        return {

            name: item.name,
            life: item.stats[0].base_stat,
            stroke: item.stats[1].base_stat,
            defense: item.stats[2].base_stat,
            speed: item.stats[5].base_stat,
            height: item.height,
            weight: item.weight,
            image: item.sprites.versions["generation-v"]["black-white"].animated
                .front_default,
            type: item.types.map((element) => element.type.name)
        }
    });
    return thePokemon;
}


// *function to obtain the types of pokemon that exist in the api.

const getTypesPokemon = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type")
    const results = data.results;
    const listTypes = results.map(type => type.name)


    return listTypes;
}



module.exports = {
    getTypesPokemon,
    pokemonAPI,
}