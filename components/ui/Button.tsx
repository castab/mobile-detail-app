import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'danger'
type ButtonSize = 'default' | 'sm'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    href?: undefined
  }

type ButtonAsLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'> & {
    href: string
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const sizeClasses: Record<ButtonSize, string> = {
  // Spec padding: 14px 28px (default), 10px 20px (small)
  default: 'px-7 py-3.5 text-label min-h-12',
  sm: 'px-5 py-2.5 text-label min-h-12',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cx(
    'bg-blush text-navy',
    'hover:bg-[color:var(--color-blush-hover)]',
    'active:scale-[0.97]'
  ),
  ghost: cx(
    'bg-transparent text-blush border border-taupe/70',
    'hover:bg-bark hover:border-taupe/50',
    'active:scale-[0.97]'
  ),
  danger: cx(
    'bg-[color:var(--color-danger)] text-white',
    'hover:brightness-95',
    'active:scale-[0.97]'
  ),
}

export function Button({
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-md font-bold',
    'cursor-pointer',
    'transition',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  if ('href' in props && typeof props.href === 'string') {
    const { href, children, ...rest } = props
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { children, type, ...rest } = props
  return (
    <button className={classes} type={type ?? 'button'} {...rest}>
      {children}
    </button>
  )
}
