import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {getGenericBuffs} from "../services/buffs.service";
import {BuffDto} from "../dtos/buffDto";


export interface GenericBuffsProps {
  onChange?: (selected: BuffDto[]) => void | Promise<void>
}

const GenericBuffsComponent: React.FC<GenericBuffsProps> = ({
                                                              onChange = () => {
                                                              }
                                                            }): ReactElement => {
  const [buffs, setBuffs] = useState<string[]>([]);
  const [activeBuffs, SetActiveBuffs] = useState<Set<string>>(new Set<string>());
  useEffect(() => {
    (async () => {
      const response = await getGenericBuffs();
      setBuffs(response);
    })()
  }, [])

  const onChangeBuff = (buff: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newBuffs = new Set([...activeBuffs]);
    if (value === '1') {
      newBuffs.add(buff);
    } else {
      newBuffs.delete(buff)
    }
    SetActiveBuffs(newBuffs);
    const dto: BuffDto[] = [...newBuffs].map((buff: string) => {
      return {
        name: buff
      }
    })
    onChange(dto)
  }
  return (
    <Card>
      <Card.Title>Generic Buffs</Card.Title>
      <Card.Body>
        <ListGroup>
          {buffs.map((buff) => {
            return <ListGroup.Item>
              <Row>
                <Col>
                  {buff}
                </Col>
                <Col>
                  <Form.Select
                    size="sm"
                    value={activeBuffs.has(buff) ? '1' : '0'}
                    onChange={onChangeBuff(buff)}>
                    <option value="1">true</option>
                    <option value="0">false</option>
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

export default GenericBuffsComponent;
