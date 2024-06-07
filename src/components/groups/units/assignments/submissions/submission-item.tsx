import type { Tables } from "@/lib/types/supabase";

type SubmissionItemProps = {
    submission: {
        assignment_id: number;
        created_at: string;
        description: string | null;
        feedback: string | null;
        feedback_score: number | null;
        file_name: string;
        id: number;
        submitted_at: string;
        submitted_by: string;
        updated_at: string;
        users: Tables<"users"> | null;
    }
}

export const SubmissionItem = ({ submission }: SubmissionItemProps) => {
    return (
        <div className="border p-3">
            {submission.users?.display_name}
        </div>
    );
}