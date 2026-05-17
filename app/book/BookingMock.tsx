'use client'

import { useMemo, useState } from 'react'

import { appConfig, type AppService, type BookingTimeSlot } from '@/config/app'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

function getWeekdayIndexOfFirstOfMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex, 1).getDay()
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function BookingMock() {
  const services = appConfig.services
  const today = useMemo(() => new Date(), [])

  const [selectedServiceId, setSelectedServiceId] = useState<AppService['id']>(
    services[0].id
  )
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState(() => today)

  const initialSlot = appConfig.copy.bookingPage.timeSlots.find(
    (s) => s.status === 'selected'
  )
  const [selectedSlot, setSelectedSlot] = useState<string>(
    initialSlot?.label ?? appConfig.copy.bookingPage.timeSlots[0]?.label ?? ''
  )

  const monthTitle = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      month: 'long',
      year: 'numeric',
    }).format(visibleMonth)
  }, [visibleMonth])

  const year = visibleMonth.getFullYear()
  const monthIndex = visibleMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, monthIndex)
  const firstWeekday = getWeekdayIndexOfFirstOfMonth(year, monthIndex)

  const blanks = Array.from({ length: firstWeekday }, () => null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const dayButtons = [...blanks, ...days]

  return (
    <div className="space-y-6">
      <h1 className="text-h2 font-bold tracking-tight text-light md:text-h1">
        {appConfig.copy.bookingPage.heading}
      </h1>

      <Card>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Badge>{appConfig.copy.bookingPage.steps.step1Label}</Badge>
            <h2 className="text-lg font-bold text-light">
              {appConfig.copy.bookingPage.steps.step1Heading}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const selected = selectedServiceId === service.id
              return (
                <button
                  key={service.id}
                  type="button"
                  className={[
                    'text-left rounded-lg border p-6 transition-colors',
                    'bg-navy shadow-raised',
                    selected
                      ? 'border-blush bg-blush/5'
                      : 'border-taupe/30 hover:border-taupe/60',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush',
                    'active:scale-[0.97]',
                    'hover:-translate-y-0.5 hover:shadow-overlay transition-[transform,box-shadow] duration-200 ease',
                  ].join(' ')}
                  onClick={() => setSelectedServiceId(service.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-bold text-light">
                        {service.name}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-taupe">
                        {service.description}
                      </div>
                      <div className="mt-3 text-sm text-light/90">
                        {service.duration} min
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className={[
                        'mt-1 h-3 w-3 rounded-full border',
                        selected ? 'border-blush bg-blush' : 'border-taupe/60',
                      ].join(' ')}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Badge>{appConfig.copy.bookingPage.steps.step2Label}</Badge>
            <h2 className="text-lg font-bold text-light">
              {appConfig.copy.bookingPage.steps.step2Heading}
            </h2>
          </div>

          <div className="rounded-lg border border-taupe/30 bg-bark/30 p-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-taupe/40 text-light/90 hover:bg-bark/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush active:scale-[0.97]"
                aria-label={appConfig.copy.a11y.calendarPreviousMonth}
                onClick={() =>
                  setVisibleMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
                }
              >
                <span aria-hidden>‹</span>
              </button>
              <div className="text-sm font-bold text-light">{monthTitle}</div>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-taupe/40 text-light/90 hover:bg-bark/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush active:scale-[0.97]"
                aria-label={appConfig.copy.a11y.calendarNextMonth}
                onClick={() =>
                  setVisibleMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                }
              >
                <span aria-hidden>›</span>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-taupe">
              {appConfig.copy.bookingPage.calendar.weekdaysShort.map((d, idx) => (
                <div key={`${d}-${idx}`} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {dayButtons.map((day, idx) => {
                if (day === null) {
                  return <div key={`blank-${idx}`} />
                }

                const date = new Date(year, monthIndex, day)
                const selected = isSameDay(date, selectedDate)

                return (
                  <button
                    key={day}
                    type="button"
                    className={[
                      'h-12 w-12 rounded-md border text-label',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush',
                      'active:scale-[0.97]',
                      selected
                        ? 'border-blush bg-blush text-navy'
                        : 'border-taupe/40 bg-navy text-light hover:border-taupe/70',
                    ].join(' ')}
                    aria-pressed={selected}
                    onClick={() => setSelectedDate(date)}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {appConfig.copy.bookingPage.timeSlots.map((slot: BookingTimeSlot) => {
              const disabled = slot.status === 'disabled'
              const selected = selectedSlot === slot.label && !disabled
              return (
                <button
                  key={slot.label}
                  type="button"
                  disabled={disabled}
                  className={[
                    'rounded-md border px-5 py-3 text-label font-bold min-h-12 transition-colors',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush',
                    'active:scale-[0.97]',
                    disabled
                      ? 'cursor-not-allowed border-taupe/20 bg-bark/20 text-taupe/60'
                      : selected
                        ? 'border-blush bg-blush text-navy'
                        : 'border-taupe/50 bg-navy text-light hover:bg-bark/40',
                  ].join(' ')}
                  onClick={() => setSelectedSlot(slot.label)}
                >
                  {slot.label}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Badge>{appConfig.copy.bookingPage.steps.step3Label}</Badge>
            <h2 className="text-lg font-bold text-light">
              {appConfig.copy.bookingPage.steps.step3Heading}
            </h2>
          </div>

          <form className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-label font-medium text-light/90">
              {appConfig.copy.bookingPage.form.fullName}
              <input
                className="h-12 rounded-md border border-taupe bg-bark px-4 text-light placeholder:text-taupe focus:border-blush focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(202,170,152,0.2)]"
                name="fullName"
                autoComplete="name"
              />
            </label>

            <label className="grid gap-2 text-label font-medium text-light/90">
              {appConfig.copy.bookingPage.form.email}
              <input
                className="h-12 rounded-md border border-taupe bg-bark px-4 text-light placeholder:text-taupe focus:border-blush focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(202,170,152,0.2)]"
                name="email"
                type="email"
                autoComplete="email"
              />
            </label>

            <label className="grid gap-2 text-label font-medium text-light/90">
              {appConfig.copy.bookingPage.form.phone}
              <input
                className="h-12 rounded-md border border-taupe bg-bark px-4 text-light placeholder:text-taupe focus:border-blush focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(202,170,152,0.2)]"
                name="phone"
                type="tel"
                autoComplete="tel"
              />
            </label>

            <label className="grid gap-2 text-label font-medium text-light/90">
              {appConfig.copy.bookingPage.form.vehicleType}
              <select
                className="h-12 rounded-md border border-taupe bg-bark px-4 text-light focus:border-blush focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(202,170,152,0.2)]"
                name="vehicleType"
                defaultValue={appConfig.copy.bookingPage.form.vehicleTypes[0]}
              >
                {appConfig.copy.bookingPage.form.vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="md:col-span-2 grid gap-2 text-label font-medium text-light/90">
              {appConfig.copy.bookingPage.form.address}
              <input
                className="h-12 rounded-md border border-taupe bg-bark px-4 text-light placeholder:text-taupe focus:border-blush focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(202,170,152,0.2)]"
                name="address"
                autoComplete="street-address"
              />
            </label>

            <label className="md:col-span-2 grid gap-2 text-label font-medium text-light/90">
              {appConfig.copy.bookingPage.form.additionalNotes}
              <textarea
                className="min-h-28 rounded-md border border-taupe bg-bark px-4 py-3 text-light placeholder:text-taupe focus:border-blush focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(202,170,152,0.2)]"
                name="notes"
              />
            </label>

            <div className="md:col-span-2">
              <Button variant="primary" type="button">
                {appConfig.copy.ctas.confirmBooking}
              </Button>
            </div>

            <input type="hidden" name="serviceId" value={selectedServiceId} />
            <input type="hidden" name="date" value={selectedDate.toISOString()} />
            <input type="hidden" name="time" value={selectedSlot} />
          </form>
        </div>
      </Card>
    </div>
  )
}
