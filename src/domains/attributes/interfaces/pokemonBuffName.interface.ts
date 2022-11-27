import { PokemonBuffTypesEnum } from '../enums/pokemonBuffTypes.enum';

export interface PokemonBuffNameOptions {
  name: string;
  type: PokemonBuffTypesEnum;
}

export interface PokemonBuffName {
  name: string;
  options: PokemonBuffNameOptions[];
}
