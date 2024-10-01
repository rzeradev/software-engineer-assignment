import { Button, Modal } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    resourceName: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}

function DeleteConfirmationModal({
    show,
    resourceName,
    onConfirm,
    onCancel,
    isDeleting,
}: DeleteConfirmationModalProps) {
    return (
        <Modal show={show} onHide={onCancel} centered size="lg">
            <Modal.Header closeButton className="border-0">
                <Modal.Title>Are you sure you want to delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This {resourceName} will be permanently deleted.</p>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteConfirmationModal;
