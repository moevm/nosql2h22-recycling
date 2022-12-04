import React, { useMemo, ReactNode } from "react";
import { Dropdown } from "react-bootstrap";

export type WasteType = {
    type: string;
    subtypes?: Array<String>;
};

export const useWasteType = (wasteTypes: WasteType[], setWasteType: React.Dispatch<React.SetStateAction<string>>): ReactNode => {
    return useMemo(() => {
        return (
            <Dropdown.Menu>
                {
                    wasteTypes.map((wasteType: WasteType) => {
                        return wasteType?.subtypes?.map((subtype) => {
                            return (
                                <Dropdown.Item onClick={() => {
                                    setWasteType(`${wasteType.type} ${subtype}`);
                                }}
                                >
                                    {`${wasteType.type} ${subtype}`}
                                </Dropdown.Item>
                            );
                        });
                    })
                }
            </Dropdown.Menu>
        );
    }, [wasteTypes, setWasteType]);
};

export const useReceptions = (receptions: Array<string>, setReception: React.Dispatch<React.SetStateAction<string>>): ReactNode => {
    return useMemo(() => {
        return (
            <Dropdown.Menu>
                {
                    receptions.map((reception) => {
                        return (
                            <Dropdown.Item onClick={() => {
                                setReception(reception);
                            }}
                            >
                                {reception}
                            </Dropdown.Item>
                        );
                    })
                }
            </Dropdown.Menu>
        );
    }, [receptions, setReception]);
};
