import React, {ReactElement, useEffect, useState} from 'react';
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import SelectPokemonComponent from "../../pokemon/components/selectPokemon.component";
import SpeedTableComponent, {SpeedTableData} from "../components/speedTable.component";
import {getAtkSpeed} from "../services/speed.service";
import RedEmblemsSelectComponent from "../components/redEmblemsSelect.component";
import {AtkSpeedColumnsEnum} from "../enums/atkSpeedColumns.enum";
import AdditionalBuffComponent from "../components/additionalBuff.component";
import GenericBuffsComponent from "../components/genericBuffs.component";
import {BuffDto} from "../dtos/buffDto";
import {AtkSpeedDto} from "../dtos/atkSpeed.dto";
import BuffPokemonsComponent from "../components/buffsPokemons.component";
import ItemsComponent from "../components/items.component";
import {ItemsDto} from "../dtos/items.dto";
import CompareStorageComponent from "../components/compareStorage.component";

const defaultPokemon = "absol";
const SpeedCalculatorPage: React.FC = (): ReactElement => {
  const [pokemon, setPokemon] = useState<string>(defaultPokemon);
  const [data, setData] = useState<SpeedTableData>({});
  const [redEmblem, setRedEmblem] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [additionalBuff, setAdditionalBuff] = useState<number>(0);
  const [genericBuffs, setGenericBuffs] = useState<BuffDto[]>([]);
  const [pokemonBuffs, setPokemonBuffs] = useState<BuffDto[]>([]);
  const [itemsDto, setItemsDto] = useState<ItemsDto[]>([]);

  const handleBaseStats = async (requestPokemon: string = pokemon || '') => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const response = await getAtkSpeed(requestPokemon);

        setIsLoading(false);
        return response;
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    return [];
  }

  const handleRedEmblemsStats = async (
    requestPokemon: string = pokemon || '',
    emblems = redEmblem
  ): Promise<number[]> => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const response = await getAtkSpeed(requestPokemon, {
          emblems: {
            level: parseInt(emblems, 10)
          }
        });
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    return [];
  }

  const handleAll = async (
    requestPokemon: string = pokemon || '',
    emblems: string = redEmblem,
    buffs: BuffDto[] = genericBuffs,
    additional: number = additionalBuff,
    items: ItemsDto[] = itemsDto
  ) => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const dto: AtkSpeedDto = {};
        if (emblems && emblems !== "0") {
          dto.emblems = {
            level: parseInt(emblems, 10)
          }
        }
        if (buffs.length) {
          dto.buffs = buffs;
        }
        if (additional) {
          dto.additionalBuff = additional;
        }
        if (items && items.length) {
          dto.items = items;
        }

        const response = await getAtkSpeed(requestPokemon, dto);
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    return [];
  }

  const handleAdditionalBuffsStats = async (
    requestPokemon: string = pokemon || '',
    additional: number = additionalBuff
  ): Promise<number[]> => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const response = await getAtkSpeed(requestPokemon, {
          additionalBuff: additional
        });
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    return [];
  }
  const handleItems = async (
    requestPokemon: string = pokemon || '',
    items: ItemsDto[] = itemsDto
  ) => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const response = await getAtkSpeed(requestPokemon, {
          items
        });
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    return [];
  }
  const handleBuffs = async (
    requestPokemon: string = pokemon || '',
    buffs: BuffDto[] = [],
  ): Promise<number[]> => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const response = await getAtkSpeed(requestPokemon, {
          buffs
        });
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    return [];
  }


  const onChangeEmblem = async (valueEmblem: string) => {
    setRedEmblem(valueEmblem);

    const [response, allResponse] = await Promise.all([
      handleRedEmblemsStats(pokemon, valueEmblem),
      handleAll(pokemon, valueEmblem, [...pokemonBuffs, ...genericBuffs], additionalBuff)
    ])
    setData({
      ...data,
      [AtkSpeedColumnsEnum.redEmblems]: response,
      [AtkSpeedColumnsEnum.allSelect]: allResponse
    })
  }

  const onChangeAdditional = async (additional: number) => {
    setAdditionalBuff(additional);
    if (additional) {
      const [response, allResponse] = await Promise.all([
        handleAdditionalBuffsStats(pokemon, additional),
        handleAll(pokemon, redEmblem, [...pokemonBuffs, ...genericBuffs], additional)
      ]);
      setData({
        ...data,
        [AtkSpeedColumnsEnum.additional]: response,
        [AtkSpeedColumnsEnum.allSelect]: allResponse
      })
    } else {
      const allResponse = await handleAll(pokemon, redEmblem, [...pokemonBuffs, ...genericBuffs], 0);
      setData({
        ...data,
        [AtkSpeedColumnsEnum.additional]: data[AtkSpeedColumnsEnum.baseStats],
        [AtkSpeedColumnsEnum.allSelect]: allResponse
      })
    }
  }

  const onChangeBuffs = async (genericBuff: BuffDto[], pokeBuffs: BuffDto[] = []) => {
    const [response, allResponse] = await Promise.all([
      handleBuffs(pokemon, [
        ...genericBuff,
        ...pokeBuffs
      ]),
      handleAll(pokemon, redEmblem, [
        ...genericBuff,
        ...pokeBuffs
      ])
    ]);
    setData({
      ...data,
      [AtkSpeedColumnsEnum.buffs]: response,
      [AtkSpeedColumnsEnum.allSelect]: allResponse
    })
  }
  const onChangeGeneric = async (buffs: BuffDto[]) => {
    setGenericBuffs(buffs);
    await onChangeBuffs(buffs, pokemonBuffs);
  }

  const onChangePokeBuffs = async (buffs: BuffDto[]) => {
    setPokemonBuffs(buffs);
    await onChangeBuffs(genericBuffs, buffs);
  }

  const onChangeItems = async (items: ItemsDto[]) => {
    setItemsDto(items);
    const [response, allResponse] = await Promise.all([
      handleItems(pokemon, items),
      handleAll(pokemon, redEmblem, [...pokemonBuffs, ...genericBuffs], additionalBuff, items)
    ]);
    setData({
      ...data,
      [AtkSpeedColumnsEnum.items]: response,
      [AtkSpeedColumnsEnum.allSelect]: allResponse
    })
  }

  const onChangePokemon = async (newPokemon: string) => {
    setPokemon(newPokemon);
    setPokemonBuffs([]);
    const [
      baseStats,
      emblemsResponse,
      buffsResponse,
      additionalResponse,
      itemsResponse,
      allResponse
    ] = await Promise.all([
      handleBaseStats(newPokemon),
      handleRedEmblemsStats(newPokemon),
      handleBuffs(newPokemon, genericBuffs),
      handleAdditionalBuffsStats(newPokemon, additionalBuff),
      handleItems(newPokemon, itemsDto),
      handleAll(newPokemon)
    ]);
    const newData: SpeedTableData = {
      [AtkSpeedColumnsEnum.baseStats]: baseStats,
      [AtkSpeedColumnsEnum.redEmblems]: emblemsResponse,
      [AtkSpeedColumnsEnum.buffs]: buffsResponse,
      [AtkSpeedColumnsEnum.items]: itemsResponse,
      [AtkSpeedColumnsEnum.additional]: additionalResponse,
      [AtkSpeedColumnsEnum.allSelect]: allResponse
    };
    setData(newData);
  }

  useEffect(() => {
    (async () => {
      await onChangePokemon(defaultPokemon)
    })();
  }, [])
  return (
    <Container>
      <Row>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <SelectPokemonComponent selectedPokemon={pokemon} onChange={onChangePokemon}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Row>
            <Col>
              <h5>Red Emblems</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <RedEmblemsSelectComponent selected={redEmblem} onChange={onChangeEmblem}/>
            </Col>
          </Row>
        </Col>
        <Col md="3">
          <Card>
            <Card.Title>Additional buff</Card.Title>
            <Card.Body>
              <Row>
                <Col>
                  <AdditionalBuffComponent selected={additionalBuff} onChange={onChangeAdditional}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <ItemsComponent onChange={onChangeItems}/>
      </Row>
      <Row>
        <Col>
          <GenericBuffsComponent onChange={onChangeGeneric}/>
        </Col>
        <Col>
          <BuffPokemonsComponent pokemon={pokemon} onChange={onChangePokeBuffs}/>
        </Col>
      </Row>
      <Row>
        {isLoading ? <Spinner animation="border"/> : <SpeedTableComponent data={data}/>}
      </Row>
      <Row>
        <CompareStorageComponent pokemon={pokemon} currentTable={data}/>
      </Row>
    </Container>
  );
};

export default SpeedCalculatorPage;
