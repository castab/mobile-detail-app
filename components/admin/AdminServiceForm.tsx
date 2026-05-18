'use client'

import { useActionState } from 'react'

import type { ServiceFormState } from '@/app/(admin-protected)/admin/services/actions'
import {
  createServiceAction,
  updateServiceAction,
} from '@/app/(admin-protected)/admin/services/actions'
import { Button } from '@/components/ui/Button'
import {
  formatPriceForInput,
  serviceCategories,
  type ServiceRecord,
} from '@/lib/services'

const initialServiceFormState: ServiceFormState = {
}

type AdminServiceFormProps = {
  mode: 'create' | 'edit'
  service?: ServiceRecord
}

const categoryLabels = {
  EXTERIOR_WASH: 'Exterior',
  INTERIOR_CLEANING: 'Interior',
} as const

const fieldClasses =
  'min-h-12 w-full rounded-md border border-accent/25 bg-primary px-4 py-3 text-body text-text shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'

export function AdminServiceForm({ mode, service }: AdminServiceFormProps) {
  const action = mode === 'create' ? createServiceAction : updateServiceAction
  const [state, formAction, pending] = useActionState(action, initialServiceFormState)

  return (
    <form action={formAction} className="space-y-5">
      {service ? <input type="hidden" name="serviceId" value={service.id} /> : null}

      <div className="space-y-2">
        <label htmlFor="name" className="text-label font-medium text-text">
          Service Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={service?.name ?? ''}
          className={fieldClasses}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-label font-medium text-text">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={service?.description ?? ''}
          className={`${fieldClasses} min-h-32`}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="durationMinutes" className="text-label font-medium text-text">
            Duration (minutes)
          </label>
          <input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min="1"
            step="1"
            required
            defaultValue={service?.durationMinutes ?? 60}
            className={fieldClasses}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="text-label font-medium text-text">
            Price
          </label>
          <input
            id="price"
            name="price"
            inputMode="decimal"
            required
            defaultValue={service ? formatPriceForInput(service.priceCents) : '0.00'}
            className={fieldClasses}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-label font-medium text-text">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={service?.category ?? serviceCategories[0]}
            className={fieldClasses}
          >
            {serviceCategories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex min-h-12 items-center gap-3 rounded-md border border-accent/20 px-4 py-3 text-label font-medium text-text">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={service?.isActive ?? true}
          className="h-4 w-4 rounded border-accent/30 bg-primary text-highlight focus:ring-0"
        />
        Active on public pages and booking selections
      </label>

      {state.message ? (
        <p className="rounded-md border border-[color:var(--color-danger)]/25 bg-[color:var(--color-danger)]/10 px-4 py-3 text-label text-[color:var(--color-danger)]">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving...' : mode === 'create' ? 'Create Service' : 'Save Changes'}
        </Button>
        <Button href="/admin/services" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  )
}
