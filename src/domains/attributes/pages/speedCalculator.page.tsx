import React, {ReactElement} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SelectPokemonComponent from "../../pokemon/components/selectPokemon.component";

const SpeedCalculatorPage: React.FC = (): ReactElement => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <SelectPokemonComponent/>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SpeedCalculatorPage;
