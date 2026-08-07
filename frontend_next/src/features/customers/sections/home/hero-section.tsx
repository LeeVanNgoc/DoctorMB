import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { SectionContainer } from "@/shared/components/common/section-container";

import { HERO_CONTENT } from "../../constants/hero";

export function HeroSection() {
  return (
    <section className="border-b bg-background">
      <SectionContainer spacing="lg">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="rounded-full border px-4 py-1 text-sm font-medium">
            {HERO_CONTENT.badge}
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            {HERO_CONTENT.title}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            {HERO_CONTENT.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={HERO_CONTENT.primaryAction.href}>
              <Button size="lg">
                {HERO_CONTENT.primaryAction.label}
              </Button>
            </Link>

            <Link href={HERO_CONTENT.secondaryAction.href}>
              <Button
                size="lg"
                variant="outline"
              >
                {HERO_CONTENT.secondaryAction.label}
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}