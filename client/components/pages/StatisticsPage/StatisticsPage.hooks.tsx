import React, { useMemo } from "react";
import { Dropdown } from "react-bootstrap";

export const useFilters = (
    filters: string[],
    setFilter: React.Dispatch<React.SetStateAction<string>>,
) => {
    return useMemo(() => {
        return filters.map((filter) => {
            return (
                <Dropdown.Item onClick={() => {
                    setFilter(filter);
                }}
                >
                    {filter}
                </Dropdown.Item>
            );
        });
    }, [filters]);
};
