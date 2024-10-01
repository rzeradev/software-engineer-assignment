import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import caretLeft from "../assets/caret-left.svg";
import caretRight from "../assets/caret-right.svg";

interface TableFilterProps {
    totalItems: number;
}

const TableFilter: React.FC<TableFilterProps> = ({ totalItems }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const perPage = searchParams.get("perPage") || "10";
    const page = searchParams.get("page") || "1";

    const totalPages = Math.ceil(totalItems / parseInt(perPage));

    const updateSearchParams = (newParams: Record<string, string | number>) => {
        const updatedParams = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            updatedParams.set(key, String(value));
        });
        setSearchParams(updatedParams);
    };

    const handlePerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const newPerPage = event.target.value;
        updateSearchParams({ perPage: newPerPage, page: 1 });
    };

    const handlePageChange = (newPage: number) => {
        updateSearchParams({ page: newPage });
    };

    return (
        <Row className="w-100">
            <Col className="text-left">
                <Form.Control
                    size="sm"
                    as="select"
                    value={perPage}
                    onChange={handlePerPageChange}
                    className="d-inline-block w-auto"
                >
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                </Form.Control>
            </Col>
            <Col className="text-right">
                <img
                    src={caretLeft}
                    alt="Previous"
                    onClick={() =>
                        handlePageChange(Math.max(1, parseInt(page) - 1))
                    }
                    style={{ cursor: "pointer", width: "10px" }}
                />
                <span className="mx-2" style={{ fontSize: "0.9rem" }}>
                    {page} / {totalPages}
                </span>
                <img
                    src={caretRight}
                    alt="Next"
                    onClick={() =>
                        handlePageChange(Math.max(1, parseInt(page) + 1))
                    }
                    style={{ cursor: "pointer", width: "10px" }}
                />
            </Col>
        </Row>
    );
};

export default TableFilter;
