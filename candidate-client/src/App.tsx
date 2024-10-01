import { Container } from "react-bootstrap";
import "./App.css";
import Navigation from "./components/Navigation";
import CandidatesList from "./components/CandidatesList";

function App() {
    return (
        <Container fluid className="bg-light min-vh-100 px-0">
            <Navigation
                title="Candidates list"
                showButton={true}
                buttonText="Create candidate"
                buttonLink="/candidate/create"
            />

            <CandidatesList />
        </Container>
    );
}

export default App;
