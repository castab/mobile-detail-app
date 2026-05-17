import { appConfig } from '@/config/app'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="mx-auto max-w-page px-5 py-10 md:py-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-h1 font-bold tracking-tight text-text md:text-display">
            {appConfig.tagline}
          </h1>
          <p className="mt-5 text-body text-text/75 md:text-body-lg">
            {appConfig.copy.home.supportingText}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book" variant="primary">
              {appConfig.copy.ctas.bookNow}
            </Button>
            <Button href="/services" variant="ghost">
              {appConfig.copy.ctas.ourServices}
            </Button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl md:-right-16 md:-top-16 md:h-[28rem] md:w-[28rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-secondary/70 blur-3xl md:-bottom-24 md:-left-16 md:h-[28rem] md:w-[28rem]"
      />
    </section>
  )
}
