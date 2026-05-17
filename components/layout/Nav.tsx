'use client'

import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

import { appConfig } from '@/config/app'
import type { AppNavItem } from '@/config/app'

export type NavProps = {
  items: readonly AppNavItem[]
}

export function Nav({ items }: NavProps) {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    // Prevent background scroll while drawer is open.
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a[href]')
    // Avoid scroll jumping on mobile when focusing.
    firstLink?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    if (!open) return

    function onFocusIn(e: FocusEvent) {
      const panel = panelRef.current
      if (!panel) return
      const target = e.target
      if (!(target instanceof Node)) return
      if (!panel.contains(target)) {
        const focusable = panel.querySelector<HTMLElement>('a[href], button:not([disabled])')
        focusable?.focus({ preventScroll: true })
      }
    }

    document.addEventListener('focusin', onFocusIn)
    return () => document.removeEventListener('focusin', onFocusIn)
  }, [open])

  function openDrawer() {
    // On some mobile browsers, relying purely on `click` can be flaky during
    // scroll/gesture handling. Mount first so the portal is ready.
    setMounted(true)
    setOpen(true)
  }

  function closeDrawer() {
    setOpen(false)
  }

  function toggleDrawer() {
    if (open) closeDrawer()
    else openDrawer()
  }

  function onPanelKeyDown(e: ReactKeyboardEvent) {
    if (e.key !== 'Tab') return
    const panel = panelRef.current
    if (!panel) return

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement

    if (e.shiftKey) {
      if (active === first || !panel.contains(active)) {
        e.preventDefault()
        last.focus({ preventScroll: true })
      }
      return
    }

    if (active === last) {
      e.preventDefault()
      first.focus({ preventScroll: true })
    }
  }

  return (
    <nav
      aria-label={appConfig.copy.a11y.navLabel}
      className="flex items-center gap-2"
    >
      <div className="hidden md:flex items-center gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-light/90 hover:text-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        ref={toggleButtonRef}
        className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-md border border-taupe/50 text-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush touch-manipulation select-none"
        aria-label={
          open ? appConfig.copy.a11y.menuCloseLabel : appConfig.copy.a11y.menuOpenLabel
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => {
          e.stopPropagation()
          toggleDrawer()
        }}
      >
        <span aria-hidden className="text-lg leading-none">
          {open ? '×' : '☰'}
        </span>
      </button>

      {mounted
        ? createPortal(
            <div
              className={[
                'fixed inset-0 z-50 md:hidden',
                open ? 'pointer-events-auto' : 'pointer-events-none',
              ].join(' ')}
              aria-hidden={!open}
            >
              <button
                type="button"
                className={[
                  'absolute inset-0 bg-black/50 transition-opacity duration-[250ms] ease',
                  open ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
                aria-label={appConfig.copy.a11y.menuOverlayCloseLabel}
                onClick={closeDrawer}
              />

              <div
                id={panelId}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className={[
                  'absolute right-0 top-0 h-full w-[min(20rem,85vw)] border-l border-taupe/30 bg-[color:var(--color-navy-footer)] shadow-overlay',
                  'transition-transform duration-[250ms] ease will-change-transform',
                  open ? 'translate-x-0' : 'translate-x-full',
                ].join(' ')}
                onKeyDown={onPanelKeyDown}
                onTransitionEnd={(e) => {
                  if (e.propertyName !== 'transform') return
                  if (!open) {
                    setMounted(false)
                    toggleButtonRef.current?.focus({ preventScroll: true })
                  }
                }}
              >
                <div className="flex items-center justify-between border-b border-taupe/30 px-5 py-4">
                  <div className="text-label font-bold tracking-wide text-light">
                    {appConfig.name}
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-taupe/50 text-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
                    aria-label={appConfig.copy.a11y.menuCloseLabel}
                    onClick={closeDrawer}
                  >
                    <span aria-hidden className="text-xl leading-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="flex flex-col p-4">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-md px-4 py-4 text-label font-medium text-light/90 hover:bg-bark hover:text-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
                      onClick={closeDrawer}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </nav>
  )
}
