import React, { useMemo, ReactNode } from "react";
import { Dropdown } from "react-bootstrap";

export type WasteType = {
    type: string;
    subtypes?: Array<String>;
};

export const useWasteType = (wasteTypes: WasteType[]): ReactNode => {
    return useMemo(() => {
        return (
            <Dropdown.Menu>
                { wasteTypes.map((wasteType: WasteType) => {
                    return (
                        <Dropdown.Item>
                            <Dropdown>
                                <span>
                                    {wasteType.type}
                                </span>
                                <Dropdown.Menu>
                                    {wasteType?.subtypes?.map((subtype) => {
                                        return (
                                            <Dropdown.Item>
                                                {subtype}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Dropdown.Item>
                    );
                }) }
            </Dropdown.Menu>
        );
    }, [wasteTypes]);
};

export const useReceptions = (receptions: Array<string>): ReactNode => {
    return useMemo(() => {
        return (
            <Dropdown.Menu>
                {
                    receptions.map((reception) => {
                        return (<Dropdown.Item>{reception}</Dropdown.Item>);
                    })
                }
            </Dropdown.Menu>
        );
    }, [receptions]);
};
