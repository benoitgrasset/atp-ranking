import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsLoading() {
  return (
    <Card className="m-4 max-w-6xl">
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
        <p className="text-center">Loading...</p>
      </CardContent>
    </Card>
  );
}
