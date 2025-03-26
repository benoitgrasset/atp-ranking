import { Card, CardContent } from "@/components/ui/card";

export const NoData = ({ children }: { children: React.ReactNode }) => (
  <Card className="p-4 max-w-3xl mx-auto mt-6">
    <CardContent>
      <p>{children}</p>
    </CardContent>
  </Card>
);
