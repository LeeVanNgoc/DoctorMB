import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  LineChart,
} from "@/shared/components/charts/line-chart";

import {
  PATIENT_GROWTH_DATA,
} from "../constants/patient-growth";

export function PatientGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Patient Growth (1 Year)
        </CardTitle>
      </CardHeader>

      <CardContent>
        <LineChart
          data={PATIENT_GROWTH_DATA}
        />
      </CardContent>
    </Card>
  );
}