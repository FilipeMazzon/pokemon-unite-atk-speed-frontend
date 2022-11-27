import React, {ReactElement, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {getItemsNames} from "../services/itemService";
import {ItemsDto} from "../dtos/items.dto";
import ItemCardComponent from "./itemCard.component";

export interface ItemsProps {
  onChange: (dto: ItemsDto[]) => void | Promise<void>
}

const ItemsComponent: React.FC<ItemsProps> = ({
                                                onChange
}): ReactElement => {
  const [itemNames, setItemsNames] = useState<string[]>([]);
  const [itemMap, setItemMap] = useState<Map<string, ItemsDto>>(new Map());
  useEffect(() => {
    (async () => {
      const response = await getItemsNames();
      setItemsNames(response);
    })()
  }, []);

  const onChangeItems = (dto: ItemsDto, active: boolean) => {
    const newMap: Map<string, ItemsDto> = new Map(itemMap);
    if (!active) {
      newMap.delete(dto.name);
    } else {
      newMap.set(dto.name, dto)
    }
    setItemMap(newMap);
    onChange([...newMap.values()])
  }
  return (
    <Row>
      {itemNames.map((itemName: string) => {
        return <Col md={6}>
          <ItemCardComponent name={itemName} onChange={onChangeItems}/>
        </Col>
      })}
    </Row>
  );
};

export default ItemsComponent;
