

const { Pokemon, Type } = require('../db.js')
const { getTypesPokemon,pokemonAPI } = require('../services/api.js')


// * 1. función para guardar los datos obtenidos de la API, la lista de pokemones más la lista de los tipos

const saveAllPokemon = async function (pokemon = pokemonAPI,type = getTypesPokemon) {
    const datos = await pokemon();
    const types = await type();
    for (let item of datos) {
        let dato = await Pokemon.create({

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
        await dato.save();
    }

    for(let type of types){
        let infoType = await Type.create({nombre: type })
        await infoType.save();
    }

}

async function saveInDB() {
  await saveAllPokemon(); 
}

saveInDB();

//* 2. función para obtener listado de pokemones de la base de datos.

const getAllPokemon = async (req, res) => {
    
    try {
        const {nombre} = req.query;
        if (nombre){
            const pokemon = await Pokemon.findOne({
                where:{
                    nombre:nombre
                }
            })
            return res.status(200).json(pokemon);
        } else {

            const pokemonDB = await Pokemon.findAll();
    
            return res.json(pokemonDB)
        }
    } catch (error) {
        res.status(404).json({message:'Lo sentimos, No hay información disponible'})
    }
}

//* 3. función para obtener pokemon por id
const getPokemonById= async (req, res)=>{
    try {
        const {id} = req.params;
        const searchedId = await Pokemon.findByPk(id);
        res.status(200).json(searchedId);
    } catch (error) {
        res.status(404).json({message:'El ID ingresado no existe, por favor intente con otro'})
    }
}

//* 4. función para crear pokemon en la base de datos.

const createPokemon = async (req,res)=>{
    try {
        const {nombre,vida,ataque,defensa,velocidad,altura,peso,imagen,tipo}= req.body;

        if(!(nombre,vida,ataque,defensa,velocidad,altura,peso,imagen,tipo)){
            throw new Error("faltan parametros para poder crear el Pokemon ingresado")
        } else {
            const newPokemon = await Pokemon.create({
                   nombre: nombre,
                   vida: vida,
                   ataque: ataque,
                   defensa: defensa,
                   velocidad: velocidad,
                   altura: altura,
                   peso: peso,
                   imagen: imagen,
                   tipo:[tipo]
        })
        newPokemon.save();
        return res.status(201).json(newPokemon);
    }
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
module.exports = {
    getAllPokemon,
    getPokemonById,
    createPokemon,
}