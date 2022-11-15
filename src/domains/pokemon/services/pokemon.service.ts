import {get} from "../../../infraestructure/adapters/http.adapter";
import {PokemonRoutesEnum} from "../enums/pokemonRoutes.enum";

export const getPokemonsNames = async ():
  Promise<string[]> => {
  const response = await get<string[]>(
    PokemonRoutesEnum.name,
  );
  return response.data;
};
