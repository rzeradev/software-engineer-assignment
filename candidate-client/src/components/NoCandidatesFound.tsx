import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoCandidatesfound() {
    return (
        <Container fluid className="bg-white mt-4 rounded-md">
            <Row>
                <Col className="mt-3">
                    <h4>No candidates found</h4>
                </Col>
            </Row>
            <Row>
                <Col className="my-2">
                    <span className="text-muted">
                        Create your first candidate
                    </span>
                </Col>
            </Row>
            <Row>
                <Col className="my-3">
                    <Link to="/candidate/create">
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-dark text-white"
                        >
                            Create candidate
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default NoCandidatesfound;
