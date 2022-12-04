import React, {useState} from 'react';
import {ButtonGroup, Card, ToggleButton} from "react-bootstrap";
import {ManagerReception} from "../ManagerReception/ManagerReception";
import {TransitionRequests} from "../TransitionRequests/TransitionRequests";

export const ManagerPage = () => {
    const [radioValue, setRadioValue] = useState<string>('1');

    const showCurrentWidget = () => {
        switch (radioValue) {
            case '1':
                return(
                    <ManagerReception/>
                )
            case '2':
                return(
                    <TransitionRequests/>
                )
        }
    }

    return (
        <>
            <Card style={{width: '100%'}}>
                <Card.Body>
                    <ButtonGroup className="mb-2">
                        <ToggleButton
                            key="1"
                            id={`radio-1`}
                            type="radio"
                            variant="success"
                            name="radio"
                            value='1'
                            checked={radioValue === "1"}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            Receptions
                        </ToggleButton>
                        <ToggleButton
                            key="2"
                            id={`radio-2`}
                            type="radio"
                            variant="success"
                            name="radio"
                            value='2'
                            checked={radioValue === "2"}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            Requests
                        </ToggleButton>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <>
                {showCurrentWidget()}
            </>
        </>
    );
};
