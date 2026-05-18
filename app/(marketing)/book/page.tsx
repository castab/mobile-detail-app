import { BookingMock } from '@/app/book/BookingMock'
import { getPublicServices } from '@/lib/services'

export const dynamic = 'force-dynamic'

export default async function BookPage() {
  const services = await getPublicServices()

  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-page px-5 py-10 md:py-16">
        <BookingMock services={services} />
      </div>
    </div>
  )
}
