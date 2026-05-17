import type { ComponentPropsWithoutRef } from 'react'

type CardProps = ComponentPropsWithoutRef<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-lg shadow-raised border border-accent/20 bg-primary',
        'transition-[transform,box-shadow] duration-200 ease',
        'hover:-translate-y-0.5 hover:shadow-overlay',
        'p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
