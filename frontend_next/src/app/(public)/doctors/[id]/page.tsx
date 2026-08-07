import { DoctorDetailsPage } from "@/features/customers/pages/doctor-details-page";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;

  return <DoctorDetailsPage doctorId={id} />;
}