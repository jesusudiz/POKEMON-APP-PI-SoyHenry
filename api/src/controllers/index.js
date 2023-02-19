

const { Pokemon, Type } = require('../db.js')
const { getTypesPokemon,pokemonAPI } = require('../services/api.js')




// * 1. función para guardar los datos obtenidos de la API de mi archivo '../services/api.js'

  
const saveAllPokemon = async function () {
  const datos = await pokemonAPI();
  const types = await getTypesPokemon();
  for (let item of datos) {
    await Pokemon.create({
      nombre: item.name,
      vida: item.life,
      ataque: item.stroke,
      defensa: item.defense,
      velocidad: item.speed,
      altura: item.height,
      peso: item.weight,
      imagen: item.image,
      tipo: item.type
    })
  }

  for(let type in types){
    await Type.create({nombre: types[type] })
  }
}

  
async function saveInDB() {
  await saveAllPokemon(); 
}

saveInDB();

// 2. función para obtener listado de pokemones de la base de datos.

const getAllPokemon = async (req, res) => {
    try {
      const { nombre, page } = req.query;
      const limit = 12;
      const offset = (page - 1) * limit;
      if (nombre) {
        const pokemon = await Pokemon.findAll({
          where: {
            nombre: nombre
          },
          limit,
          offset
        });
        return res.status(200).json(pokemon);
      } else {
        const pokemonDB = await Pokemon.findAll({
          limit,
          offset
        });
        return res.json(pokemonDB);
      }
    } catch (error) {
      res.status(404).json({ message: 'Lo sentimos, No hay información disponible' });
    }
  };
  


//* 3. función para obtener pokemon por id
const getPokemonById= async (req, res)=>{
    try {
        const {id} = req.params;
        const searchedId = await Pokemon.findByPk(id);
        if(!searchedId) throw new Error('ID ingresado no Existe')
        res.status(200).json(searchedId);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

//* 4. función para crear pokemon en la base de datos.

const formatPokemonData = (data) => {
    const { nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, tipo } = data;
  
    return {
      nombre,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      imagen,
      tipo: [...tipo],
    };
  };
  
  const createPokemon = async (req, res) => {
    try {
      const { body } = req;
  
      // Formatear los datos del Pokemon antes de guardarlo en la base de datos
      const formattedData = formatPokemonData(body);
  
      // Crear un nuevo Pokemon en la base de datos
      const newPokemon = await Pokemon.create(formattedData);
  
      return res.status(201).json(newPokemon);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  
  
  
  

const getTypes = async ( req, res)=>{
    try{
        const getTypesInDB = await Type.findAll()

    return res.status(200).json(getTypesInDB)
    } catch(error){
        return res.status(404).json(error.message)
    }
        
}
module.exports = {
    getAllPokemon,
    getPokemonById,
    createPokemon,
    getTypes,
    saveInDB
}