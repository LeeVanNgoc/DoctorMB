import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  BarChart,
} from "@/shared/components/charts/bar-chart";

import {
  MONTHLY_APPOINTMENTS_DATA,
} from "../constants/monthly-appointments";

export function MonthlyAppointmentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Monthly Appointments
        </CardTitle>
      </CardHeader>

      <CardContent>
        <BarChart
          data={MONTHLY_APPOINTMENTS_DATA}
        />
      </CardContent>
    </Card>
  );
}