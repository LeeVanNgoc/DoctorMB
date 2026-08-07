import { SectionContainer } from "@/shared/components/common/section-container";
import { SectionHeader } from "@/shared/components/common/section-header";

import { WhyChooseCard } from "../../components/why-choose-card";
import { WHY_CHOOSE_ITEMS } from "../../constants/why-choose";

export function WhyChooseSection() {
  return (
    <SectionContainer>
      <SectionHeader
        title="Why Choose DoctorM"
        description="We make healthcare more accessible, reliable, and convenient."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE_ITEMS.map((item) => (
          <WhyChooseCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </SectionContainer>
  );
}