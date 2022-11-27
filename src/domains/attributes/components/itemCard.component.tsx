import React, {ChangeEvent, ReactElement, useState} from 'react';
import {Card, Col, Row, Form} from "react-bootstrap";
import {ItemsDto} from "../dtos/items.dto";
import RangeSlider from 'react-bootstrap-range-slider';

export interface ItemCardProps {
  name: string,
  onChange: (dto: ItemsDto, active: boolean) => void
}

const ItemCardComponent: React.FC<ItemCardProps> = ({
                                                      name,
                                                      onChange
                                                    }): ReactElement => {
  const [active, setActive] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(0);

  const onChangeActive = (e: ChangeEvent<HTMLInputElement>) => {
    const isActive = e.target.checked;
    let newLevel = level;
    if (isActive && level === 0) {
      newLevel = 1;
      setLevel(1);
    }
    setActive(isActive)
    onChange(
      {name, level: newLevel},
      isActive
    )
  }
  const changeLevel = (e: ChangeEvent<HTMLInputElement>) => {
    let newLevel: number = parseInt(e.target.value, 10);
    if (Number.isNaN(newLevel)) {
      newLevel = 0;
    }

    if (newLevel > 30) {
      newLevel = 30;
    }
    setLevel(newLevel)
    if (newLevel === 0) {
      setActive(false);
      onChange(
        {name, level: newLevel},
        false
      )
    } else {
      setActive(true)
      onChange(
        {name, level: newLevel},
        true
      )
    }
  }
  //todo change on dto only when leave slider or press enter or leave input
  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Body>
        <Form.Group>
          <Row>
            <Col>
              <Form.Check
                type="switch"
                checked={active}
                id={`switch-active-item-${name}`}
                label="active"
                onChange={onChangeActive}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="9">
              <RangeSlider
                id={`slider-item-level-${name}`}
                min={0}
                max={30}
                value={level}
                onChange={changeLevel}
              />
            </Col>
            <Col xs="3">
              <Form.Control
                id={`input-item-level-${name}`}
                type="number" min={0} max={30} value={level} onChange={changeLevel}/>
            </Col>
          </Row>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default ItemCardComponent;
