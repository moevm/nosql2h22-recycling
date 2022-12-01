import paginationFactory from "react-bootstrap-table2-paginator";

export const pagination = paginationFactory({
    sizePerPageList: [{
        text: "5", value: 5,
    }, {
        text: "7", value: 7,
    }, {
        text: "10", value: 10,
    }],
});
