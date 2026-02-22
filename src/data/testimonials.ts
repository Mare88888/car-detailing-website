/**
 * Testimonials from real customers.
 * Add new entries here when you get permission to use a review (Google, Facebook, WhatsApp, email).
 * Keep author as first name + initial (e.g. "James M.") and role as car/model or "Customer" if preferred.
 */

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'The car came back looking better than when I bought it. Paint correction and ceramic coating were worth every penny.',
    author: 'James M.',
    role: 'BMW 3 Series owner',
  },
  {
    quote: 'Mobile service meant I didn’t have to take time off. They turned up on time and left the car spotless.',
    author: 'Sarah K.',
    role: 'Audi A4 owner',
  },
  {
    quote: 'Professional, knowledgeable, and the finish on my Porsche is incredible. Will use again.',
    author: 'David R.',
    role: 'Porsche Cayman owner',
  },
  {
    quote: 'Headlight restoration made a huge difference. Like having new lights. Very fair price.',
    author: 'Marko L.',
    role: 'VW Golf owner',
  },
  {
    quote: 'Interior detail was thorough – seats, carpets, everything. Car smells and looks new.',
    author: 'Ana K.',
    role: 'Škoda Octavia owner',
  },
  {
    quote: 'Ceramic coating still beads water after a year. Best investment for the paint.',
    author: 'Peter S.',
    role: 'Mercedes C-Class owner',
  },
  {
    quote: 'They came to my office. Zero hassle. The car looked showroom-ready by the time I finished work.',
    author: 'Maja P.',
    role: 'Audi A3 owner',
  },
  {
    quote: 'Fixed the swirl marks I thought were permanent. Paint looks deep and glossy now.',
    author: 'Luka T.',
    role: 'BMW 5 Series owner',
  },
]
