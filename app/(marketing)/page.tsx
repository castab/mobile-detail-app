import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { TrustBar } from '@/components/sections/TrustBar'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <HowItWorks />
      <TrustBar />
    </>
  )
}
