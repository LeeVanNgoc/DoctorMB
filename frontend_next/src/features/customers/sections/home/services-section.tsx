import { SectionContainer } from "@/shared/components/common/section-container";
import { SectionHeader } from "@/shared/components/common/section-header";

import { FeatureCard } from "../../components/feature-card";
import { SERVICES } from "../../constants/services";

export function ServicesSection() {
  return (
    <SectionContainer>
      <SectionHeader
        title="Our Services"
        description="Everything you need for your healthcare journey."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <FeatureCard
            key={service.title}
            title={service.title}
            description={service.description}
            href={service.href}
            icon={service.icon}
          />
        ))}
      </div>
    </SectionContainer>
  );
}