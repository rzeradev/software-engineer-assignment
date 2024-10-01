import { useCallback, useEffect, useState } from "react";
import NoCandidatesfound from "./NoCandidatesFound";
import { apiService } from "../services/ApiService";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Badge, Container, Dropdown, Image, Row, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TableFilter from "./TableFilters";
import { capitalizeFirstLetter } from "../utils/utils";

import sortDown from "../assets/sort-down.svg";
import sortUp from "../assets/sort-up.svg";

import userOne from "../assets/users-1.png";
import userTwo from "../assets/users-2.png";
import userThree from "../assets/users-3.png";
import userFour from "../assets/users-4.png";

const userImages = [userOne, userTwo, userThree, userFour];

interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    disposition: Disposition;
}

interface Disposition {
    id: number;
    disposition: string;
    hire_type: string;
    fee: number;
    currency: string;
    rejection_reason: string;
    created_at: string;
}

interface Meta {
    total: number;
}

function CandidatesList() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [selectedResource, setSelectedResource] = useState<string>("");
    const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
        null,
    );
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialized, setInitialized] = useState(false);

    const updateSearchParams = useCallback(
        (newParams: Record<string, string | number>) => {
            const updatedParams = new URLSearchParams(searchParams);
            Object.entries(newParams).forEach(([key, value]) => {
                updatedParams.set(key, String(value));
            });
            setSearchParams(updatedParams);
        },
        [searchParams, setSearchParams],
    );

    const handleSortAndOrderChange = (newSort: string) => {
        updateSearchParams({
            sort: newSort,
            order: searchParams.get("order") === "asc" ? "desc" : "asc",
        });
    };

    const fetchCandidates = useCallback(
        async (params: Record<string, string>) => {
            try {
                let { perPage, page, sort, order } = params;

                if (!perPage) perPage = "10";
                if (!page) page = "1";
                if (!sort) sort = "candidate";
                if (!order) order = "asc";

                const response: AxiosResponse = await apiService.get<{
                    data: Candidate[];
                }>(
                    `/api/v1/candidates?perPage=${perPage}&page=${page}&sort=${sort}&order=${order}`,
                );
                const candidates: Candidate[] = response.data.data;
                const meta: Meta = response.data.meta;
                setTotalItems(meta.total);
                setCandidates(candidates);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast.error("An error occurred while fetching candidates");
            }
        },
        [],
    );

    useEffect(() => {
        if (!initialized) {
            const paramsToUpdate: Record<string, string> = {};
            if (!searchParams.get("perPage")) paramsToUpdate.perPage = "10";
            if (!searchParams.get("page")) paramsToUpdate.page = "1";
            if (!searchParams.get("sort")) paramsToUpdate.sort = "candidate";
            if (!searchParams.get("order")) paramsToUpdate.order = "asc";

            if (Object.keys(paramsToUpdate).length > 0) {
                updateSearchParams(paramsToUpdate);
            }
            setInitialized(true);
        } else {
            fetchCandidates(Object.fromEntries(searchParams.entries()));
        }
    }, [searchParams, initialized, updateSearchParams, fetchCandidates]);

    const renderBadge = (status: string) => {
        switch (status) {
            case "hired":
                return (
                    <Badge variant="success" className="p-1 font-weight-light">
                        Hired
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="danger" className="p-1 font-weight-light">
                        Rejected
                    </Badge>
                );
            case "undecided":
                return (
                    <Badge
                        variant="secondary"
                        className="p-1 font-weight-light"
                    >
                        Undecided
                    </Badge>
                );
            default:
                return (
                    <Badge variant="light" className="p-1 font-weight-light">
                        Unknown
                    </Badge>
                );
        }
    };

    const handleDelete = (resource: string, resourceId: number) => {
        setSelectedResource(resource);
        setSelectedResourceId(resourceId);
        setShowModal(true);
    };

    const confirmDeleteCandidate = async () => {
        try {
            setIsDeleting(true);
            const response: AxiosResponse<void> = await apiService.delete<void>(
                `/api/v1/candidates/${selectedResourceId}`,
            );
            if (response.status === 204) {
                toast.success("Candidate deleted successfully");
                setCandidates(
                    candidates.filter(
                        (candidate) => candidate.id !== selectedResourceId,
                    ),
                );
            }
            setIsDeleting(false);
            setShowModal(false);
            setSelectedResource("");
            setSelectedResourceId(null);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An error occurred while deleting the candidate");
            setIsDeleting(false);
            setShowModal(false);
            setSelectedResource("");
            setSelectedResourceId(null);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedResource("");
    };

    const getSortIcon = (sort: string) => {
        if (searchParams.get("sort") === sort) {
            return searchParams.get("order") === "asc" ? sortDown : sortUp;
        }
        return sortDown;
    };

    return (
        <div className="mx-4">
            {candidates.length === 0 && <NoCandidatesfound />}

            {candidates.length !== 0 && (
                <Container fluid className="mt-4 pb-10">
                    <Row className="bg-white p-3 rounded-lg">
                        <TableFilter totalItems={totalItems} />
                        <Table
                            responsive
                            bordered
                            hover
                            className="mt-4 align-middle"
                        >
                            <thead>
                                <tr>
                                    <th
                                        onClick={() =>
                                            handleSortAndOrderChange(
                                                "candidate",
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        Candidate
                                        <img
                                            src={getSortIcon("candidate")}
                                            alt="sort"
                                            className="ml-2"
                                        />
                                    </th>
                                    <th>Phone</th>
                                    <th
                                        onClick={() =>
                                            handleSortAndOrderChange(
                                                "disposition",
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        Disposition
                                        <img
                                            src={getSortIcon("disposition")}
                                            alt="sort"
                                            className="ml-2"
                                        />
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortAndOrderChange(
                                                "hire_type",
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        Hire type
                                        <img
                                            src={getSortIcon("hire_type")}
                                            alt="sort"
                                            className="ml-2"
                                        />
                                    </th>
                                    <th>Fee</th>
                                    <th
                                        onClick={() =>
                                            handleSortAndOrderChange(
                                                "candidate_created",
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        Candidate created
                                        <img
                                            src={getSortIcon(
                                                "candidate_created",
                                            )}
                                            alt="sort"
                                            className="ml-2"
                                        />
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortAndOrderChange(
                                                "disposition_created",
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        Disposition created
                                        <img
                                            src={getSortIcon(
                                                "disposition_created",
                                            )}
                                            alt="sort"
                                            className="ml-2"
                                        />
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate, index) => (
                                    <tr key={candidate.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Image
                                                    src={
                                                        userImages[
                                                            Math.floor(
                                                                Math.random() *
                                                                    4,
                                                            )
                                                        ]
                                                    }
                                                    rounded
                                                    width="50"
                                                    height="50"
                                                />
                                                <div className="ml-2">
                                                    <strong>
                                                        {candidate.name}
                                                    </strong>
                                                    <br />
                                                    <small>
                                                        {candidate.email}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{candidate?.phone ?? "-"}</td>
                                        <td>
                                            {renderBadge(
                                                candidate.disposition
                                                    .disposition,
                                            )}
                                        </td>
                                        <td>
                                            {candidate.disposition?.hire_type
                                                ? capitalizeFirstLetter(
                                                      candidate.disposition
                                                          .hire_type,
                                                  )
                                                : "-"}
                                        </td>
                                        <td>
                                            {candidate.disposition?.fee ?? "-"}
                                        </td>
                                        <td>{candidate.created_at}</td>
                                        <td>
                                            {candidate.disposition
                                                ?.created_at ?? "-"}
                                        </td>
                                        <td>
                                            <Dropdown
                                                style={{
                                                    overflow: "visible",
                                                    zIndex: 100,
                                                }}
                                            >
                                                <Dropdown.Toggle
                                                    as="div"
                                                    className="text-muted font-weight-bold font-size-sm"
                                                    id={`dropdown-${index}`}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontSize: "1.5rem",
                                                        letterSpacing: "2px",
                                                    }}
                                                >
                                                    ...
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.ItemText>
                                                        <Link
                                                            to={`/candidate/${candidate.id}/update`}
                                                            className="text-dark text-decoration-none"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Dropdown.ItemText>
                                                    <Dropdown.ItemText>
                                                        <Link
                                                            to={`/candidate/${candidate.id}/disposition`}
                                                            className="text-dark text-decoration-none"
                                                        >
                                                            Set disposition
                                                        </Link>
                                                    </Dropdown.ItemText>
                                                    <Dropdown.ItemText
                                                        className="text-dark dropdown-hover"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleDelete(
                                                                "candidate",
                                                                candidate.id,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Dropdown.ItemText>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            )}

            <DeleteConfirmationModal
                show={showModal}
                resourceName={selectedResource}
                onConfirm={confirmDeleteCandidate}
                onCancel={cancelDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}

export default CandidatesList;
