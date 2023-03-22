import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import SpeedTableComponent, {SpeedTableData} from "./speedTable.component";
import {AtkSpeedColumnsEnum} from "../enums/atkSpeedColumns.enum";

export interface CompareStorageProps {
  pokemon: string;
  currentTable: SpeedTableData;
}

const CompareStorageComponent: React.FC<CompareStorageProps> = ({
                                                                  currentTable,
                                                                  pokemon
                                                                }): ReactElement => {
  const [name, setName] = useState<string>('');
  const initialStorage = (): SpeedTableData => {
    return {
      [AtkSpeedColumnsEnum.baseStats]: currentTable[AtkSpeedColumnsEnum.baseStats],
    }
  }
  const [storageCompare, setStorageCompare] = useState<SpeedTableData>(initialStorage());
  useEffect(() => {
    setStorageCompare(initialStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);
  }

  const onSaveStorage = () => {
    const newStorage = {
      ...storageCompare,
      [name]: currentTable[AtkSpeedColumnsEnum.allSelect]
    }
    setName('');
    setStorageCompare(newStorage);
  }
  const onClearStorage = () => {
    setStorageCompare(initialStorage())
  }
  return (
    <Card>
      <Card.Title>Compare table</Card.Title>
      <Card.Body>
        <Row className="justify-content-center">
          <Col>
            <>
              <Form.Label htmlFor="inputCompareTable">column name</Form.Label>
              <Form.Control
                type="text"
                id="compare-name-storage"
                value={name}
                onChange={onChangeName}
              />
              <Form.Text id="passwordHelpBlock" muted>
                ADD column name to save current all buffs columns
              </Form.Text>
            </>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button disabled={!name.length} onClick={onSaveStorage}>Save</Button>
          </Col>
          {Object.keys(storageCompare).length > 1 ?
            <Col md="3">
              <Button onClick={onClearStorage}>clear</Button>
            </Col> : null}

        </Row>
        {Object.keys(storageCompare).length > 1 ? <SpeedTableComponent data={storageCompare}/> : null}

      </Card.Body>
    </Card>
  );
};

export default CompareStorageComponent;
