import React, { useMemo } from "react";
import { Dropdown } from "react-bootstrap";
import {IFilters} from "./StatisticsPage";

export const useFilters = (
    filters: { type: string, value: string }[],
    setFilter: React.Dispatch<React.SetStateAction<IFilters>>,
) => {
    return useMemo(() => {
        return filters.map((filter) => {
            return (
                <Dropdown.Item onClick={() => {
                    setFilter((prevState) => {
                        return buildFilter(filter, prevState);
                    });
                }}
                >
                    {filter.value}
                </Dropdown.Item>
            );
        });
    }, [filters]);
};

const buildFilter = (filter: { type: string, value: string }, prevFilter: IFilters) => {
    const newFilter = Object.assign({}, prevFilter);
    // @ts-ignore
    newFilter[filter.type] = filter.value === "All" ? "." : filter.value;
    return newFilter;
}
