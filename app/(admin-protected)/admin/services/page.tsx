import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { appConfig } from '@/config/app'
import { formatPriceFromCents, getAdminServices } from '@/lib/services'

function categoryLabel(category: keyof typeof appConfig.copy.servicesPage.categoryLabels) {
  return appConfig.copy.servicesPage.categoryLabels[category]
}

export default async function AdminServicesPage() {
  const services = await getAdminServices()

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-caption font-medium uppercase tracking-[0.2em] text-text/60">
            Admin Console
          </p>
          <h2 className="mt-2 text-h2 font-bold text-text">Services</h2>
          <p className="mt-3 text-body text-text/70">
            Create, edit, and disable services that appear across the marketing site and booking flow.
          </p>
        </div>

        <Button href="/admin/services/new">New Service</Button>
      </section>

      <section className="grid gap-5">
        {services.map((service) => (
          <Card key={service.id} className="hover:translate-y-0 hover:shadow-raised">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-h3 font-bold text-text">{service.name}</h3>
                  <Badge variant={service.isActive ? 'success' : 'warning'}>
                    {service.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                  <Badge>{categoryLabel(service.category)}</Badge>
                </div>

                <p className="max-w-3xl text-body text-text/72">{service.description}</p>

                <dl className="flex flex-wrap gap-x-6 gap-y-2 text-label text-text/80">
                  <div>
                    <dt className="font-medium text-text/65">Duration</dt>
                    <dd>{service.durationMinutes} min</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text/65">Price</dt>
                    <dd>{formatPriceFromCents(service.priceCents)}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex shrink-0 gap-3">
                <Button href={`/admin/services/${service.id}`} variant="ghost" size="sm">
                  Edit Service
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {services.length === 0 ? (
          <Card>
            <p className="text-body text-text/75">No services have been created yet.</p>
          </Card>
        ) : null}
      </section>
    </div>
  )
}
