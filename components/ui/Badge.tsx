import type { ComponentPropsWithoutRef } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'

export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border-taupe/40 text-taupe',
  success: 'border-blush/50 text-blush',
  warning: 'border-taupe/50 text-light/90',
  danger: 'border-[color:var(--color-danger)] text-[color:var(--color-danger)]',
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium tracking-wide',
        'bg-bark/30',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
