import { Button } from "@/components/ui/button";

export const DeclineRequestButton = ({
  requestId,
  courseId,
}: {
  requestId: number;
  courseId: number;
}) => {
  return <Button variant="outline">Rechazar</Button>;
};
