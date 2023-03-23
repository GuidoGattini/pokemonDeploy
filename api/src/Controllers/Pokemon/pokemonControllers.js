const axios = require("axios");
const { Pokemon, Type } = require('../../db')

//('https://pokeapi.co/api/v2/pokemon?limit=151',  {'Accept-Encoding': 'gzip,deflate,compress'},)

 const getApiPokemon = async () => {
     try {
         const respuesta01 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=602',  {'Accept-Encoding': 'gzip,deflate,compress'},)
         const respuesta02 = await axios.get(respuesta01.data.next)
         const data = respuesta01.data.results.concat(respuesta02.data.results)
         const pokemons = await Promise.all(data.map(async (obj) => {
             let poke = await axios(obj.url)
             return {
                 id: poke.data.id,
                 img: poke.data.sprites.front_default,
                 name: poke.data.name,
                 hp: poke.data.stats[0].base_stat,
                 ataque: poke.data.stats[1].base_stat,
                 defensa: poke.data.stats[2].base_stat,
                 velocidad: poke.data.stats[5].base_stat,
                 altura: poke.data.height,
                 peso: poke.data.weight,
                 types: poke.data.types.map((el) => el.type.name),
             }
         }))
         return pokemons;
     } catch (error) {
         console.log(error);
     }
 }
 
//  const getIdPokemon = async (id) => {
//     const api = await axios
//       .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
//       .then((data) => {
//         let dataTypes = data.data.types.map((type) => {
//           return type.type.name;
//         });
//         return {
//           id: data.data.id,
//           name: data.data.name,
//           img: data.data.sprites.front_default,
//           hp: data.data.stats[0].base_stat,
//           ataque: data.data.stats[1].base_stat,
//           defensa: data.data.stats[2].base_stat,
//           velocidad: data.data.stats[5].base_stat,
//           altura: data.data.height,
//           peso: data.data.weight,
//           types: dataTypes,
//         };
//       });
//     return api;
//   };


const getDbInfo = async () => {
    return await Pokemon.findAll({ //Buscamos
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [], // Compruebo según los atributos
            },
        }
    })
}



const getAllPokemon = async () => {
    let apiInfo = await getApiPokemon();
    let dbInfo = await getDbInfo();
    //let infoTotal = apiInfo.concat(dbInfo)
    let infoTotal = [apiInfo, dbInfo].flat();
    return infoTotal;
}







module.exports = {
    getApiPokemon,
    getDbInfo,
    getAllPokemon
    //getIdPokemon
};