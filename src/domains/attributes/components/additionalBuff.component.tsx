import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';

export interface RedEmblemsSelectProps {
  selected?: number;
  onChange?: (selected: number) => void | Promise<void>
}

const AdditionalBuffComponent: React.FC<RedEmblemsSelectProps> = ({
                                                                    selected,
                                                                    onChange = () => {
                                                                    }
                                                                  }): ReactElement => {
  const [additionalBuff, setAdditionalBuff] = useState<number>(0);
  useEffect(() => {
    if (selected) {
      setAdditionalBuff(selected)
    }
  }, [selected]);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value);
    if (Number.isNaN(newValue)) {
      setAdditionalBuff(0);
    } else {
      setAdditionalBuff(newValue);
    }
  }

  const onFocus = () => {
    if (Number.isNaN(additionalBuff)) {
      onChange(0);
    } else {
      onChange(additionalBuff || 0);
    }
  }
  return (
    <>
      <Form.Label htmlFor="inputPassword5">Bonus AS from buffs:</Form.Label>
      <Form.Control
        type="number"
        min="0" max="500"
        id="additionalBuff-speed"
        value={additionalBuff}
        onChange={onChangeValue}
        onBlur={onFocus}
      />
      <Form.Text id="passwordHelpBlock" muted>
        ADD BUFFS NOT LISTED HERE
      </Form.Text>
    </>
  );
};

export default AdditionalBuffComponent;
