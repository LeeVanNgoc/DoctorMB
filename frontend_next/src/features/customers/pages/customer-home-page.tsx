import { FeaturedDoctorsSection } from "../sections/home/featured-doctors-section";
import { FeaturedMedicinesSection } from "../sections/home/featured-medicines-section";
import { HeroSection } from "../sections/home/hero-section";
import { ServicesSection } from "../sections/home/services-section";
import { WhyChooseSection } from "../sections/home/why-choose-section";

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