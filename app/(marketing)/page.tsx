import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { TrustBar } from '@/components/sections/TrustBar'
import { getPublicServices } from '@/lib/services'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const services = await getPublicServices()

  return (
    <>
      <Hero />
      <ServicesPreview services={services} />
      <HowItWorks />
      <TrustBar />
    </>
  )
}
