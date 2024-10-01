import { Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";

export function CandidateDisposition() {
    return (
        <Container fluid className="bg-light min-vh-100 px-0">
            <Navigation title="Set disposition" showButton={false} />
        </Container>
    );
}
