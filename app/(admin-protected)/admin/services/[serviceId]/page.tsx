import { notFound } from 'next/navigation'

import { AdminServiceForm } from '@/components/admin/AdminServiceForm'
import { Card } from '@/components/ui/Card'
import { getAdminServiceById } from '@/lib/services'

type EditAdminServicePageProps = {
  params: Promise<{
    serviceId: string
  }>
}

export default async function EditAdminServicePage({ params }: EditAdminServicePageProps) {
  const { serviceId } = await params
  const service = await getAdminServiceById(serviceId)

  if (!service) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <h2 className="text-h2 font-bold text-text">Edit Service</h2>
        <p className="mt-3 text-body text-text/70">
          Update pricing, timing, description, and public visibility for this service.
        </p>
      </section>

      <Card className="max-w-4xl hover:translate-y-0 hover:shadow-raised">
        <AdminServiceForm mode="edit" service={service} />
      </Card>
    </div>
  )
}
