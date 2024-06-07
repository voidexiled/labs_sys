import { Button } from "@/components/ui/button";

export const AcceptRequestButton = ({
  requestId,
  courseId,
}: {
  requestId: number;
  courseId: number;
}) => {
  return <Button variant="outline">Aceptar</Button>;
};
