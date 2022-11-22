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

const defaultPokemon = "absol";
const SpeedCalculatorPage: React.FC = (): ReactElement => {
  const [pokemon, setPokemon] = useState<string>(defaultPokemon);
  const [data, setData] = useState<SpeedTableData>({});
  const [redEmblem, setRedEmblem] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [additionalBuff, setAdditionalBuff] = useState<number>(0);
  const [genericBuffs, setGenericBuffs] = useState<BuffDto[]>([]);
  const [pokemonBuffs, setPokemonBuffs] = useState<BuffDto[]>([]);
  console.log(data);
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
    if (valueEmblem === "0") {
      const keys = Object.keys(data);
      const indexKey = keys.indexOf(AtkSpeedColumnsEnum.redEmblems);
      if (indexKey !== -1) {
        const makeCopy = {...data};
        delete makeCopy[keys[indexKey]];
        setData(makeCopy);
      }
    } else {
      const response = await handleRedEmblemsStats(pokemon, valueEmblem);
      setData({
        ...data,
        [AtkSpeedColumnsEnum.redEmblems]: response
      })
    }
  }


  const onChangeAdditional = async (additional: number) => {
    setAdditionalBuff(additional);
    if (additional) {
      const response = await handleAdditionalBuffsStats(pokemon, additional);
      setData({
        ...data,
        [AtkSpeedColumnsEnum.additional]: response
      })
    }
  }

  const onChangeBuffs = async (genericBuff: BuffDto[], pokeBuffs: BuffDto[] = []) => {
    const response = await handleBuffs(pokemon, [
      ...genericBuff,
      ...pokeBuffs
    ]);
    setData({
      ...data,
      [AtkSpeedColumnsEnum.buffs]: response
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

  const onChangePokemon = async (newPokemon: string) => {
    setPokemon(newPokemon);
    const baseStats = await handleBaseStats(newPokemon);
    const newData: SpeedTableData = {
      [AtkSpeedColumnsEnum.baseStats]: baseStats
    };

    if (redEmblem !== "0") {
      newData[AtkSpeedColumnsEnum.redEmblems] = await handleRedEmblemsStats(newPokemon);
    }
    if(additionalBuff) {
      newData[AtkSpeedColumnsEnum.additional] = await handleAdditionalBuffsStats(pokemon, additionalBuff);
    }
    if(genericBuffs.length) {
      newData[AtkSpeedColumnsEnum.buffs] = await handleBuffs(pokemon, genericBuffs);
    }
    setData(newData)
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
        <Col>
          <GenericBuffsComponent onChange={onChangeGeneric}/>
        </Col>
      </Row>
      <Row>
        {isLoading ? <Spinner animation="border"/> : <SpeedTableComponent data={data}/>}
      </Row>
    </Container>
  );
};

export default SpeedCalculatorPage;
