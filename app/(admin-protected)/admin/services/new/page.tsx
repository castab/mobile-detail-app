import { AdminServiceForm } from '@/components/admin/AdminServiceForm'
import { Card } from '@/components/ui/Card'

export default function NewAdminServicePage() {
  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <h2 className="text-h2 font-bold text-text">New Service</h2>
        <p className="mt-3 text-body text-text/70">
          Add a service that can be published to the marketing site and booking flow.
        </p>
      </section>

      <Card className="max-w-4xl hover:translate-y-0 hover:shadow-raised">
        <AdminServiceForm mode="create" />
      </Card>
    </div>
  )
}
