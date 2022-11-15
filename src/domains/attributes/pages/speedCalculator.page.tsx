import React, {ReactElement, useState} from 'react';
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import SelectPokemonComponent from "../../pokemon/components/selectPokemon.component";
import SpeedTableComponent, {SpeedTableData} from "../components/speedTable.component";
import {getAtkSpeed} from "../services/speed.service";
import RedEmblemsSelectComponent from "../components/redEmblemsSelect.component";

const SpeedCalculatorPage: React.FC = (): ReactElement => {
  const [pokemon, setPokemon] = useState<string>();
  const [data, setData] = useState<SpeedTableData>({});
  const [redEmblem, setRedEmblem] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleBaseStats = async (requestPokemon: string = pokemon || '') => {
    try {
      if (requestPokemon) {
        setIsLoading(true);
        const data = await getAtkSpeed(requestPokemon);
        setData({
          'Base Stats': data
        })
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  const onChangePokemon = async (newPokemon: string) => {
    setPokemon(newPokemon);
    await handleBaseStats(newPokemon);
  }
  const onChangeEmblem = async (valueEmblem: string) => {
    setRedEmblem(valueEmblem);
  }
  return (
    <Container>
      <Row>
        <Col>
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
        <Col>
          <RedEmblemsSelectComponent selected={redEmblem} onChange={onChangeEmblem}/>
        </Col>
      </Row>

      <Row>
        {isLoading ? <Spinner animation="border"/> : <SpeedTableComponent data={data}/>}
      </Row>
    </Container>
  );
};

export default SpeedCalculatorPage;
