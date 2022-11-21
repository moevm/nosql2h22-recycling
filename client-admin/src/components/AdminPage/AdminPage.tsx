import React from 'react';
import {Card, ButtonGroup, ToggleButton} from "react-bootstrap";
import {radios} from "./AdminPage.helpers";

export const AdminPage = () => {
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
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                </Card.Body>
            </Card>
        </>
    );
};
