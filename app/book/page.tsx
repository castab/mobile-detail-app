import { BookingMock } from '@/app/book/BookingMock'

export default function BookPage() {
  return (
    <div className="bg-navy">
      <div className="mx-auto max-w-page px-5 py-10 md:py-16">
        <BookingMock />
      </div>
    </div>
  )
}
