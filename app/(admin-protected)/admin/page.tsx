import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

const dashboardSections = [
  {
    title: 'Schedules',
    status: 'Next',
    description: 'Block dates, review upcoming appointments, and shape technician availability.',
  },
  {
    title: 'Customers',
    status: 'Next',
    description: 'Track repeat clients, vehicle history, and contact notes in one place.',
  },
  {
    title: 'Services',
    status: 'Next',
    description: 'Tune packages, pricing, and add-on options without touching the marketing site.',
  },
  {
    title: 'Bookings',
    status: 'Planned',
    description: 'Review requests, confirm appointments, and keep the daily route organized.',
  },
] as const

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <h2 className="text-h2 font-bold text-text">Admin Dashboard</h2>
        <p className="mt-3 text-body text-text/70">
          This first version is intentionally lightweight. The auth flow is live, and these panels mark the admin tools that will be implemented next.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {dashboardSections.map((section) => (
          <Card key={section.title} className="bg-secondary/10 hover:translate-y-0 hover:shadow-raised">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-h3 font-bold text-text">{section.title}</h3>
              <Badge>{section.status}</Badge>
            </div>
            <p className="mt-4 text-body text-text/72">{section.description}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}
