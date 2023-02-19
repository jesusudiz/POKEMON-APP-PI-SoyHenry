
const axios = require("axios").create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: { "Cache-Control": "public, max-age=300" } 
  });
  
// * function to get list of pokemon in the api.

const pokemonAPI = async () => {
    const totalPokemon = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data.results;
    const pokemonDetails = await Promise.all(totalPokemon.map(async ({ url }) => {
      const { data } = await axios.get(url);
      return {
        name: data.name,
        life: data.stats[0].base_stat,
        stroke: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        image: data.sprites.other["official-artwork"].front_default,
        type: data.types.map((element) => element.type.name)
      };
    }));
  
    return pokemonDetails.slice(0, 40);;
  };
  

// *function to get details of each pokemon.

// const pokemonAPI = async () => {
//     const listPokemon = await getPokemon();
//     const pokemon = listPokemon.map(pokemon => axios.get(pokemon.url))
//     const executePromise = await Promise.all(pokemon)
//     const request = executePromise.map(item => item.data)
//     const thePokemon = request.map(item => {
//         return {

//             name: item.name,
//             life: item.stats[0].base_stat,
//             stroke: item.stats[1].base_stat,
//             defense: item.stats[2].base_stat,
//             speed: item.stats[5].base_stat,
//             height: item.height,
//             weight: item.weight,
//             image: item.sprites.versions["generation-v"]["black-white"].animated
//                 .front_default,
//             type: item.types.map((element) => element.type.name)
//         }
//     });
//     return thePokemon;
// }


// *function to obtain the types of pokemon that exist in the api.

const getTypesPokemon = async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/type");
      return data.results.map(type => type.name);
    } catch (error) {
      console.error(error);
    }
  };
  

pokemonAPI();
module.exports = {
    getTypesPokemon,
    pokemonAPI,
}