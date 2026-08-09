import { FeaturedDoctorsSection } from "../sections/featured-doctors-section";
import { FeaturedMedicinesSection } from "../sections/featured-medicines-section";
import { HeroSection } from "../sections/hero-section";
import { ServicesSection } from "../sections/services-section";
import { WhyChooseSection } from "../sections/why-choose-section";

export function CustomerHomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedDoctorsSection />
      <FeaturedMedicinesSection />
      <WhyChooseSection />
    </>
  );
}