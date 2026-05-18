import type { ServiceRecord } from '@/lib/services'

import { appConfig } from '@/config/app'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

type ServicesPreviewProps = {
  services: ServiceRecord[]
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-page px-5 py-10 md:py-16">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {services.map((service) => (
            <Card key={service.id} className="flex h-full flex-col">
              <div className="flex-1">
                <h2 className="text-h3 font-bold tracking-tight text-text">
                  {service.name}
                </h2>
                <p className="mt-3 text-body text-text/75">
                  {service.description}
                </p>
                <div className="mt-4 text-label text-text/80">
                  {service.durationMinutes} min
                </div>
              </div>

              <div className="mt-6">
                <Button href="/book" variant="ghost" size="sm">
                  {appConfig.copy.ctas.bookThisService}
                </Button>
              </div>
            </Card>
          ))}

          {services.length === 0 ? (
            <Card>
              <p className="text-body text-text/75">
                Service availability is being updated. Please check back soon.
              </p>
            </Card>
          ) : null}
        </div>
      </div>
    </section>
  )
}
