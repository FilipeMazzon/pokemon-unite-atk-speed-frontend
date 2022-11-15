import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {ButtonGroup, ToggleButton} from "react-bootstrap";

export interface RedEmblemsSelectProps {
  selected?: string;
  onChange?: (selected: string) => void | Promise<void>
}

const RedEmblemsSelectComponent: React.FC<RedEmblemsSelectProps> = ({
                                                                      onChange = () => {
                                                                      },
                                                                      selected = "0"
                                                                    }): ReactElement => {
  const [radioValue, setRadioValue] = useState<string>(selected);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setRadioValue(newValue);
    onChange(newValue);
  }
  useEffect(() => {
    setRadioValue(selected);
  }, [selected])
  const radios = [
    {name: '0', value: "0"},
    {name: '3', value: "3"},
    {name: '5', value: "5"},
    {name: '7', value: "7"},
  ];
  return (
    <ButtonGroup>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={'outline-danger'}
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={onChangeValue}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default RedEmblemsSelectComponent;
