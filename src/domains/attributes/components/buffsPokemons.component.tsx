import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {getPokemonBuffs} from "../services/buffs.service";
import {BuffDto} from "../dtos/buffDto";
import {PokemonBuffName} from "../interfaces/pokemonBuffName.interface";
import {PokemonBuffTypesEnum} from "../enums/pokemonBuffTypes.enum";


export interface GenericBuffsProps {
  pokemon: string,
  onChange?: (selected: BuffDto[]) => void | Promise<void>
}

const BuffPokemonsComponent: React.FC<GenericBuffsProps> = ({
                                                              pokemon,
                                                              onChange = () => {
                                                              }
                                                            }): ReactElement => {
  const [buffs, setBuffs] = useState<PokemonBuffName[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string>(pokemon);
  const [activeBuffs, setActiveBuffs] = useState<Map<string, BuffDto>>(new Map());

  const getDto = (
    buff: string,
    value: string,
    buffsList: PokemonBuffName[] = buffs
  ): BuffDto | undefined => {
    const buffSelected = buffsList.find(aux => {
      return aux.name === buff
    });
    if (!buffSelected) {
      return;
    }
    const optionSelected = buffSelected.options.find((
      option
    ) => {
      return option.name === value;
    })
    if (!optionSelected) {
      return;
    }
    if(optionSelected.type === PokemonBuffTypesEnum.default) {
      return {
        name: buff
      }
    }
    if (optionSelected.type === PokemonBuffTypesEnum.isPlus) {
      return {
        name: buff,
        isPlus: true
      }
    }
    if (optionSelected.type === PokemonBuffTypesEnum.stack) {
      const stackCount = parseInt(optionSelected.name);
      return {
        name: buff,
        stack: Number.isNaN(stackCount) ? 0 : stackCount
      }
    }
    if (optionSelected.type === PokemonBuffTypesEnum.form) {
      return {
        name: buff,
        form: optionSelected.name
      }
    }
  }

  const initialValue = (buffsInitial: PokemonBuffName[]) => {
    const activeBuffsMap = new Map();
    buffsInitial.forEach((buffInitial) => {
      if (buffInitial.options[0].name !== 'false') {
        const dto = getDto(buffInitial.name, buffInitial.options[0].name, buffsInitial);
        activeBuffsMap.set(buffInitial.name, dto);
      }
    })
    setActiveBuffs(activeBuffsMap);
  }
  useEffect(() => {
    (async () => {
      const response = await getPokemonBuffs(selectedPokemon);
      setBuffs(response);
      initialValue(response);
    })()
  }, [selectedPokemon]);


  useEffect(() => {
    if (pokemon !== selectedPokemon) {
      setSelectedPokemon(pokemon);
    }
  }, [selectedPokemon, pokemon])


  const onChangeBuff = (buff: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newMap = new Map(activeBuffs);
    if (value === 'false') {
      newMap.delete(buff);
    } else {
      const dto = getDto(buff, value);
      if (!dto) {
        return;
      }
      newMap.set(buff, dto)
    }
    setActiveBuffs(newMap);
    onChange([...newMap.values()]);
  }
  return (
    <Card>
      <Card.Title>{pokemon} Buffs</Card.Title>
      <Card.Body>
        <ListGroup>
          {buffs.map((buff: PokemonBuffName) => {
            return <ListGroup.Item>
              <Row>
                <Col>
                  {buff.name}
                </Col>
                <Col>
                  <Form.Select
                    size="sm"
                    onChange={onChangeBuff(buff.name)}>
                    {buff.options.map((option) => {
                      return <option value={option.name}>{option.name}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </ListGroup.Item>
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BuffPokemonsComponent;
