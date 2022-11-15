import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {getPokemonsNames} from "../services/pokemon.service";
import {Form} from 'react-bootstrap';

export interface SelectPokemonProps {
  selectedPokemon?: string;
  onChange?: (selectedPokemon: string) => void | Promise<void>
}

const SelectPokemonComponent: React.FC<SelectPokemonProps> = ({
                                                                onChange = () => {

                                                                },
                                                                selectedPokemon
                                                              }): ReactElement => {
  const [pokemon, setPokemon] = useState<string | undefined>(selectedPokemon);
  const [optionPokemon, setOptionPokemon] = useState<string[]>([]);
  useEffect(() => {
    if (selectedPokemon) {
      setPokemon(selectedPokemon);
    }
  }, [selectedPokemon])

  useEffect(() => {
    (async () => {
      const response = await getPokemonsNames();
      setOptionPokemon(response);
    })();
  }, []);

  const onChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPokemon = event.target.value;
    setPokemon(newPokemon);
    onChange(newPokemon)
  }
  return (
    <Form.Select value={pokemon} onChange={onChangeValue}>
      {optionPokemon.map((optionPokemon: string) => {
        return <option value={optionPokemon}>{optionPokemon}</option>
      })}
    </Form.Select>
  );
};

export default SelectPokemonComponent;
