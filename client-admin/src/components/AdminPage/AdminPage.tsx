import React, {useState} from 'react';
import {Card, ButtonGroup, ToggleButton} from "react-bootstrap";
import {radios} from "./AdminPage.helpers";
import {MainStorage} from "../MainStorage/MainStorage";
import {Receptions} from "../Receptions/Receptions";
import {Transitions} from "../Transitions/Transitions";

export const AdminPage = () => {
    const [radioValue, setRadioValue] = useState('1');

    const showCurrentWidget = () => {
      if (radioValue === '1'){
          return (
              <MainStorage/>
          )
      }else if(radioValue === '2'){
          return (
              <Receptions/>
          )
      }else if(radioValue === '3'){
          return (
              <Transitions/>
          )
      }
    }

    return (
        <>
            <Card>
                <Card.Body>
                <ButtonGroup className="mb-2">
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="success"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                </Card.Body>
            </Card>
            <Card body>
                {showCurrentWidget()}
            </Card>
        </>
    );
};
