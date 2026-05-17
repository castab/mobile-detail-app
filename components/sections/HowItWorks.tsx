import { appConfig } from '@/config/app'
import { Card } from '@/components/ui/Card'

export function HowItWorks() {
  return (
    <section className="bg-bark">
      <div className="mx-auto max-w-page px-5 py-10 md:py-16">
        <h2 className="text-h3 font-bold tracking-tight text-light md:text-h2">
          {appConfig.copy.home.howItWorks.heading}
        </h2>

        <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3">
          {appConfig.copy.home.howItWorks.steps.map((step, idx) => (
            <Card key={step.title} className="bg-navy">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md border border-blush/40 bg-blush/10 text-sm font-bold text-blush">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-label font-bold text-light">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-body text-taupe">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
