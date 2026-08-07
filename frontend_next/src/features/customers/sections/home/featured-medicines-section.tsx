import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { SectionContainer } from "@/shared/components/common/section-container";
import { SectionHeader } from "@/shared/components/common/section-header";

import { MedicineCard } from "../../components/medicine-card";
import { FEATURED_MEDICINES } from "../../constants/featured-medicines";

export function FeaturedMedicinesSection() {
  return (
    <SectionContainer>
      <SectionHeader
        title="Featured Medicines"
        description="Discover our most popular medicines and healthcare products."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_MEDICINES.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            name={medicine.name}
            category={medicine.category}
            price={medicine.price}
            href={medicine.href}
            icon={medicine.icon}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/medicines">
          <Button variant="outline">
            View All Medicines
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}