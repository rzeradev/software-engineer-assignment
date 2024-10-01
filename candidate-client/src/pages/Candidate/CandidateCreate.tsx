import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiService } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useState } from "react";

const candidateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});

type CandidateSchema = z.infer<typeof candidateSchema>;

export function CandidateCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CandidateSchema>({
        resolver: zodResolver(candidateSchema),
    });

    const handleCreateCandidate = async (data: CandidateSchema) => {
        try {
            setLoading(true);

            if (loading) {
                return;
            }

            const response = await apiService.post("/api/v1/candidates", data);

            if (response.status === 201) {
                toast.success("Candidate created successfully");
            }

            setLoading(false);
            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred while creating the candidate");
        }
    };

    return (
        <Container fluid className="bg-light min-vh-100 px-0">
            <Navigation title="Create candidate" showButton={false} />

            <div className="mx-4">
                <Container fluid className="mt-4 bg-white p-3 rounded-lg">
                    <h5>Candidate information</h5>
                    <Form onSubmit={handleSubmit(handleCreateCandidate)}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label className="font-weight-bold">
                                        Name
                                        <span className="font-italic font-weight-normal">
                                            {" "}
                                            (required)
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder="Full name"
                                        {...register("name")}
                                        isInvalid={!!errors.name}
                                    />
                                    {errors.name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <Form.Group controlId="formEmail">
                                    <Form.Label className="font-weight-bold">
                                        Email
                                        <span className="font-italic font-weight-normal">
                                            {" "}
                                            (required)
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="email"
                                        placeholder="name@email"
                                        {...register("email")}
                                        isInvalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <Form.Group controlId="formPhone">
                                    <Form.Label className="font-weight-bold">
                                        Phone
                                    </Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="tel"
                                        placeholder="XXX-XXX-XXXX"
                                        {...register("phone")}
                                        isInvalid={!!errors.phone}
                                    />
                                    {errors.phone && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-dark text-white"
                                    type="submit"
                                >
                                    {loading
                                        ? "Creating..."
                                        : "Create candidate"}
                                </Button>
                            </Col>
                            <Col className="text-right">
                                <Link to="/">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="ms-2"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </Container>
    );
}
