const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllPokemon,getPokemonById,createPokemon,getTypes} = require('../controllers/index.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons?', getAllPokemon);
router.get('/pokemons/:id', getPokemonById);
router.post('/pokemons', createPokemon);
router.get('/types',getTypes)
module.exports = router;
