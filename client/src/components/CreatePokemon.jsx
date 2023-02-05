import React from "react";



export const CreatePokemon = ()=>{
    return (
        <>
       <h2>Crear Pokemon</h2>
        <form action="" method="post">
       <label htmlFor="">Nombre </label>
       <input type="text" />
       <label htmlFor="">Vida</label>
       <input type="text" />
       <label htmlFor="">Ataque</label>
       <input type="text" />
       <label htmlFor="">Defensa</label>
       <input type="text" />
       <label htmlFor="">Velocidad</label>
       <input type="text" />
       <label htmlFor="">Altura</label>
       <input type="text" />
       <label htmlFor="">Peso</label>
       <input type="text" />
       <label htmlFor="">Tipo de Pokemon</label>
       <input type="text" />


<input type="submit" value="Crear Pokemon" />
        </form>
        </>
    )
}