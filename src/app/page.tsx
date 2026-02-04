import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

export const metadata = {
  title: 'Home',
  description:
    'Professional car detailing and mobile valeting. Book a valet, full detail, or ceramic coating. Showroom finish, we come to you.',
  openGraph: {
    title: 'Premium Car Detailing | Valeting & Protection',
    description: 'Professional car detailing and mobile valeting. Showroom finish with ceramic coatings and paint correction.',
    url: '/',
  },
}

export default function Home() {
  return (
    <>
      <Hero backgroundImage="/Logo.jpg" />
      <Services />
      <Gallery />
      <Pricing />
      <Testimonials />
      <Contact />
    </>
  )
}
