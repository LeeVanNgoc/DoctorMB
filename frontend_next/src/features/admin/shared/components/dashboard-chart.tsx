import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function DashboardChart() {
  return (
    <Card className="h-[350px]">
      <CardHeader>
        <CardTitle>Monthly Statistics</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">
          Chart will be implemented later.
        </p>
      </CardContent>
    </Card>
  );
}