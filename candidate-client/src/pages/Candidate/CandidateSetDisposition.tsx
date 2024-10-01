import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiService } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const dispositionSchema = z
    .object({
        disposition: z.enum(["hired", "rejected"], {
            errorMap: () => ({ message: "You must select a disposition" }),
        }),
        hire_type: z
            .enum(["internal", "external"], {
                errorMap: () => ({ message: "You must select a hire type" }),
            })
            .optional()
            .nullable(),
        fee: z
            .preprocess(
                (val) =>
                    val === "" || val === null || isNaN(val as number)
                        ? undefined
                        : Number(val),
                z.number().optional(),
            )
            .refine((val) => val === undefined || val > 0, {
                message: "Fee must be greater than zero",
            })
            .transform((val) => (val === undefined ? null : val)),
        currency: z.string().optional().nullable(),
        rejection_reason: z
            .enum(
                [
                    "Did not have desired education",
                    "Did not meet overall qualifications",
                    "Misrepresented qualifications",
                    "More qualified job candidate selected",
                    "Did not fit company culture",
                    "No show for interview",
                    "Did not have desired experience",
                    "Other",
                ],
                {
                    errorMap: () => ({ message: "You must select a reason" }),
                },
            )
            .optional()
            .nullable(),
    })
    .superRefine((data, ctx) => {
        if (data.disposition === "hired" && !data.hire_type) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["hire_type"],
                message: "Hiring type is required if disposition is hired.",
            });
        }

        if (data.fee && data.fee > 0 && !data.currency) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["currency"],
                message: "Currency is required if fee is greater than 0.",
            });
        }

        if (data.disposition === "rejected" && !data.rejection_reason) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["rejection_reason"],
                message:
                    "Rejected reason is required if disposition is rejected",
            });
        }
    });

type DispositionSchema = z.infer<typeof dispositionSchema>;

export function CandidateDisposition() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<DispositionSchema>({
        resolver: zodResolver(dispositionSchema),
    });

    const disposition = watch("disposition");
    const hire_type = watch("hire_type");
    const fee = watch("fee");
    const rejected_reason = watch("rejection_reason");

    if (disposition === "rejected" && hire_type) {
        reset({ disposition: "rejected", rejection_reason: null });
    }

    if (disposition === "hired" && rejected_reason) {
        reset({ disposition: "hired" });
    }

    if (disposition === "hired" && hire_type === "internal" && fee) {
        reset({ disposition: "hired", hire_type: "internal" });
    }

    const getCandidate = async () => {
        try {
            if (!id) {
                return;
            }

            const response = await apiService.get<{
                data: { disposition: DispositionSchema };
            }>(`/api/v1/candidates/${id}`);

            if (response.status === 200) {
                const candidateDisposition: DispositionSchema =
                    response.data.data.disposition;
                reset({
                    disposition: candidateDisposition.disposition,
                    hire_type: candidateDisposition.hire_type,
                    fee: candidateDisposition.fee,
                    currency: candidateDisposition.currency,
                    rejection_reason: candidateDisposition.rejection_reason,
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An error occurred while fetching the candidate");
        }
    };

    useEffect(() => {
        getCandidate();
    }, []);

    const handleUpdateDisposition = async (data: DispositionSchema) => {
        try {
            if (!id) {
                return;
            }

            setLoading(true);

            if (loading) {
                return;
            }

            const filteredData = Object.entries(data).reduce(
                (acc, [key, value]) => {
                    if (value !== null) {
                        acc[key] = value;
                    }
                    return acc;
                },
                {} as Record<string, unknown>,
            );

            const response = await apiService.put(
                `/api/v1/candidates/${id}/disposition`,
                {
                    id,
                    ...filteredData,
                },
            );

            if (response.status === 200) {
                toast.success("Candidate Disposition updated successfully");
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
            <Navigation title="Candidate disposition" showButton={false} />

            <div className="mx-4">
                <Container fluid className="mt-4 bg-white p-3 rounded-lg">
                    <h5>Set disposition</h5>
                    <Form onSubmit={handleSubmit(handleUpdateDisposition)}>
                        <Row className="mt-4">
                            <Col>
                                <Form.Group controlId="disposition">
                                    <Form.Label style={{ fontWeight: 500 }}>
                                        Would you like to mark this candidate as
                                        hired or rejected?
                                    </Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Hired"
                                            id="hired"
                                            value="hired"
                                            {...register("disposition")}
                                            isInvalid={!!errors.disposition}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Rejected"
                                            id="rejected"
                                            value="rejected"
                                            {...register("disposition")}
                                            isInvalid={!!errors.disposition}
                                        />
                                        {errors.disposition && (
                                            <Form.Control.Feedback
                                                type="invalid"
                                                style={{ display: "block" }}
                                            >
                                                {errors.disposition.message}
                                            </Form.Control.Feedback>
                                        )}
                                    </div>
                                </Form.Group>

                                {disposition === "hired" && (
                                    <Form.Group
                                        controlId="hire_type"
                                        className="mt-3"
                                    >
                                        <Form.Label style={{ fontWeight: 500 }}>
                                            Is the candidate being hired
                                            internally or externally?
                                        </Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Internal"
                                                id="internal"
                                                value="internal"
                                                {...register("hire_type")}
                                                isInvalid={!!errors.hire_type}
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="External"
                                                id="external"
                                                value="external"
                                                {...register("hire_type")}
                                                isInvalid={!!errors.hire_type}
                                            />
                                            {errors.hire_type && (
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    style={{ display: "block" }}
                                                >
                                                    {errors.hire_type.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </div>
                                    </Form.Group>
                                )}

                                {disposition === "hired" &&
                                    hire_type === "external" && (
                                        <Row>
                                            <Col className="col-4">
                                                <Form.Group
                                                    controlId="fee"
                                                    className="mt-3"
                                                >
                                                    <Form.Label
                                                        style={{
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Placement fee earned
                                                        (optional)
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        step={0.01}
                                                        min={0}
                                                        max={999999999}
                                                        {...register("fee", {
                                                            valueAsNumber: true,
                                                        })}
                                                        placeholder="$0.00"
                                                        isInvalid={!!errors.fee}
                                                    />
                                                    {errors.fee && (
                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            {errors.fee.message}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col className="col-2">
                                                <Form.Group
                                                    controlId="currency"
                                                    className="mt-3"
                                                >
                                                    <Form.Label
                                                        style={{
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Currency
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        {...register(
                                                            "currency",
                                                        )}
                                                    >
                                                        <option value="">
                                                            Select currency
                                                        </option>
                                                        <option value="USD">
                                                            USD
                                                        </option>
                                                        <option value="EUR">
                                                            EUR
                                                        </option>
                                                        <option value="GBP">
                                                            GBP
                                                        </option>
                                                        <option value="CAD">
                                                            CAD
                                                        </option>
                                                    </Form.Control>
                                                    {errors.currency && (
                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            {
                                                                errors.currency
                                                                    .message
                                                            }
                                                        </Form.Control.Feedback>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )}

                                {disposition === "rejected" && (
                                    <Col className="col-6 p-0">
                                        <Form.Group
                                            style={{ fontWeight: 500 }}
                                            controlId="rejection_reason"
                                        >
                                            <Form.Label>
                                                What is the reason for
                                                rejection?
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                {...register(
                                                    "rejection_reason",
                                                )}
                                            >
                                                <option value="">
                                                    Select reason
                                                </option>
                                                <option value="Did not have desired education">
                                                    Did not have desired
                                                    education
                                                </option>
                                                <option value="Did not meet overall qualifications">
                                                    Did not meet overall
                                                    qualifications
                                                </option>
                                                <option value="Misrepresented qualifications">
                                                    Misrepresented
                                                    qualifications
                                                </option>
                                                <option value="More qualified job candidate selected">
                                                    More qualified job candidate
                                                    selected
                                                </option>
                                                <option value="Did not fit company culture">
                                                    Did not fit company culture
                                                </option>
                                                <option value="No show for interview">
                                                    No show for interview
                                                </option>
                                                <option value="Did not have desired experience">
                                                    Did not have desired
                                                    experience
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </Form.Control>
                                            {errors.rejection_reason && (
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    style={{ display: "block" }}
                                                >
                                                    {
                                                        errors.rejection_reason
                                                            .message
                                                    }
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                )}
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
                                    {loading ? "Saving..." : "Save disposition"}
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
