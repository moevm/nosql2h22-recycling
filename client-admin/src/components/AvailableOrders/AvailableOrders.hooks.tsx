import {TableCellAvailableOrders} from "../TableData/TableData.types";
import {Button, Container, Row, Col} from "react-bootstrap";
import React, {useMemo} from "react";

export const useTableData = (data: Array<TableCellAvailableOrders>, show: any) => {

    return useMemo(() => {
        return data.map((elem,idx) => {
                return Object.fromEntries(Object.keys(elem).map((key) => {
                    if (key !== "action") {
                        // @ts-ignore
                        return [key, elem[key]];
                    }
                    return [key, <Container>
                        <Row>
                            <Col>
                                <Button onClick={show} variant='success' id={idx.toString()}>Yes</Button>
                            </Col>
                        </Row>
                    </Container>];
                }));
            });
    }, [data]);
}


