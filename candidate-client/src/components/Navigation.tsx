import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavigationProps {
    title: string;
    showButton: boolean;
    buttonText?: string;
    buttonLink?: string;
}

function Navigation({
    title,
    showButton,
    buttonText,
    buttonLink,
}: NavigationProps) {
    return (
        <Navbar bg="white" expand="lg" className="py-3 px-0">
            <Container fluid className="px-0">
                <Row className="w-100">
                    <Col className="text-left ">
                        <h4 className="pl-3">{title}</h4>
                    </Col>
                    {showButton && (
                        <Col className=" text-right">
                            <Link to={buttonLink ?? ""}>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-dark text-white"
                                >
                                    {buttonText}
                                </Button>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        </Navbar>
    );
}

export default Navigation;
