import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function Unauthorized() {
  return (
    <div className="mx-auto flex flex-col gap-4 max-w-3xl w-full min-h-full p-4">
      <Alert>
        <AlertTitle>Unauthorized</AlertTitle>
        <AlertDescription>
          You are not authorized to view this page. Please sign in to continue.
        </AlertDescription>
      </Alert>
    </div>
  );
}
