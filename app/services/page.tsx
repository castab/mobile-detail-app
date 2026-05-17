import { appConfig } from '@/config/app'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

function categoryLabel(category: (typeof appConfig.services)[number]['category']) {
  switch (category) {
    case 'EXTERIOR_WASH':
      return appConfig.copy.servicesPage.exteriorLabel
    case 'INTERIOR_CLEANING':
      return appConfig.copy.servicesPage.interiorLabel
  }
}

export default function ServicesPage() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-page px-5 py-10 md:py-16">
        <h1 className="text-h2 font-bold tracking-tight text-text md:text-h1">
          {appConfig.copy.servicesPage.heading}
        </h1>

        <div className="mt-8 space-y-5">
          {appConfig.services.map((service) => (
            <div key={service.id} className="space-y-3">
              <Badge>{categoryLabel(service.category)}</Badge>
              <Card>
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="text-h3 font-bold text-text">
                      {service.name}
                    </h2>
                    <p className="mt-3 text-body text-text/75">
                      {service.description}
                    </p>
                    <div className="mt-4 text-label text-text/80">
                      {service.duration} min
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button href="/book" variant="primary">
                      {appConfig.copy.ctas.bookThisService}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Card className="mt-10 bg-transparent">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-h3 font-bold text-text">
                {appConfig.copy.servicesPage.readyToBookHeading}
              </h2>
            </div>
            <Button href="/book" variant="primary">
              {appConfig.copy.ctas.bookNow}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
