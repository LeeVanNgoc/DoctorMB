import { notFound } from "next/navigation";

import { InfoSection } from "@/shared/components/common/info-section";
import { PageBanner } from "@/shared/components/common/page-banner";
import { SectionContainer } from "@/shared/components/common/section-container";

import { DoctorProfileCard } from "../components/doctor-profile-card";
import { DOCTOR_DETAILS } from "../constants/doctor-details";

interface DoctorDetailsPageProps {
  doctorId: string;
}

export function DoctorDetailsPage({
  doctorId,
}: DoctorDetailsPageProps) {
  const doctor = DOCTOR_DETAILS.find(
    (item) => item.id === doctorId,
  );

  if (!doctor) {
    notFound();
  }

  return (
    <>
      <PageBanner
        title={doctor.name}
        description={doctor.specialty}
      />

      <SectionContainer spacing="lg">
        <div className="space-y-8">
        <DoctorProfileCard doctor={doctor} />

        <InfoSection title="About">
          <p className="leading-7 text-muted-foreground">
            {doctor.about}
          </p>
        </InfoSection>

        <InfoSection title="Education">
          <ul className="list-disc space-y-2 pl-5">
            {doctor.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Professional Experience">
          <ul className="list-disc space-y-2 pl-5">
            {doctor.experience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Working Schedule">
          <div className="space-y-3">
            {doctor.schedule.map((item) => (
              <div
                key={item.day}
                className="flex justify-between rounded-lg border p-3"
              >
                <span>{item.day}</span>

                <span className="font-medium">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
          </InfoSection>
          </div>
      </SectionContainer>
    </>
  );
}