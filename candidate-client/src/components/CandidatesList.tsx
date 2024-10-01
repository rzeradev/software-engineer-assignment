import { useState } from "react";
import NoCandidatesfound from "./NoCandidatesFound";

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

function CandidatesList() {
    const [candidates] = useState<Candidate[]>([]);
    return (
        <div className="mx-4">
            {candidates.length === 0 && <NoCandidatesfound />}
        </div>
    );
}

export default CandidatesList;
