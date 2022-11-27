import {BuffsRoutesEnum} from "../enums/buffsRoutes.enum";
import {get} from "../../../infraestructure/adapters/http.adapter";
import {PokemonBuffName} from "../interfaces/pokemonBuffName.interface";

export const getGenericBuffs = async (): Promise<string[]> => {
  const response = await get<string[]>(
    BuffsRoutesEnum.buffs
  );
  return response.data;
};

export const getPokemonBuffs = async (pokemon: string): Promise<PokemonBuffName[]> => {
  const response = await get<PokemonBuffName[]>(
    `${BuffsRoutesEnum.buffs}/${pokemon}`
  );
  return response.data;
};
