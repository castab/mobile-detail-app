import { appConfig } from '@/config/app'

export function TrustBar() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-page px-5 py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-label text-text/70 md:justify-between">
          {appConfig.copy.home.trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-text/40" />
              <span>{signal}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
