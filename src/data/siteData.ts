export interface PropertyItem {
  id: string;
  index: string;
  title: string;
  neighborhood: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  status: 'For Sale' | 'Sold';
  yearBuilt: string;
  lotSummary: string;
  architecturalNote: string;
  highlights: string[];
  images: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  index: string;
  quote: string;
  author: string;
  context: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_florida_residence_1795525231768.jpg';
export const AGENT_PORTRAIT = '/assets/aistudio/1795524904771_bcea92e0.jpg';

export const ACTIVE_LISTINGS: PropertyItem[] = [
  {
    id: 'bird-key-pavilion',
    index: '(01)',
    title: '418 Seagull Pavilion',
    neighborhood: 'Bird Key Waterfront',
    city: 'Sarasota, FL',
    price: '$5,450,000',
    beds: 4,
    baths: 4.5,
    sqft: '4,280 sq ft',
    status: 'For Sale',
    yearBuilt: '2024',
    lotSummary: '110 ft deep-water seawall · Private boat lift',
    architecturalNote:
      'Cantilevered cedar soffits, pocketed hurricane-rated glass, and honed travertine terraces frame uninterrupted views across Sarasota Bay.',
    highlights: [
      'Deep-water bayfront dockage with 24,000 lb lift',
      'Zero-edge saltwater lap pool & summer kitchen',
      'Fluted white oak millwork & Gaggenau culinary suite',
      '12-foot ceiling heights throughout main living pavilion',
    ],
    images: [
      '/src/assets/images/listing_sarasota_bay_1795525232723.jpg',
      '/src/assets/images/listing_interior_living_1795525236067.jpg',
      '/src/assets/images/listing_interior_kitchen_1795525235042.jpg',
    ],
  },
  {
    id: 'winter-park-courtyard',
    index: '(02)',
    title: '712 Via Salerno',
    neighborhood: 'Olde Winter Park',
    city: 'Winter Park, FL',
    price: '$3,290,000',
    beds: 4,
    baths: 4,
    sqft: '3,840 sq ft',
    status: 'For Sale',
    yearBuilt: '2023',
    lotSummary: '0.42 acre canopy lot · Brick-street frontage',
    architecturalNote:
      'Set beneath century-old live oaks, warm limewash plaster walls and blackened steel casements wrap a serene limestone courtyard pool.',
    highlights: [
      'Private central courtyard with heated 42-foot lap pool',
      'Detached guest casita opening to shaded garden loggia',
      'Custom steel-framed windows and reclaimed stone arches',
      'Two blocks from Park Avenue dining and Rollins College',
    ],
    images: [
      '/src/assets/images/listing_winter_park_1795525234363.jpg',
      '/src/assets/images/listing_interior_kitchen_1795525235042.jpg',
      '/src/assets/images/listing_interior_living_1795525236067.jpg',
    ],
  },
  {
    id: 'naples-gulf-shore',
    index: '(03)',
    title: '1905 Crayton Cove House',
    neighborhood: 'Aqualane Shores',
    city: 'Naples, FL',
    price: '$6,850,000',
    beds: 5,
    baths: 5.5,
    sqft: '4,910 sq ft',
    status: 'For Sale',
    yearBuilt: '2025',
    lotSummary: 'Southern exposure · Coastal tropical buffer',
    architecturalNote:
      'Architectural minimalism shaped for Gulf breezes—board-formed masonry, warm teak ceilings, and a black-basalt reflection pool.',
    highlights: [
      'Passive solar overhangs crafted in clear-grain Western Red Cedar',
      'Seamless indoor-outdoor pavilion with motorized screens',
      'Whole-home solar integration and Tesla backup storage',
      'Three-minute walk to Third Street South and Gulf beaches',
    ],
    images: [
      '/src/assets/images/listing_naples_coast_1795525234146.jpg',
      '/src/assets/images/listing_interior_living_1795525236067.jpg',
      '/src/assets/images/hero_florida_residence_1795525231768.jpg',
    ],
  },
  {
    id: 'longboat-coastal-modern',
    index: '(04)',
    title: '604 Lighthouse Point',
    neighborhood: 'Longboat Key',
    city: 'Longboat Key, FL',
    price: '$7,900,000',
    beds: 5,
    baths: 6,
    sqft: '5,420 sq ft',
    status: 'For Sale',
    yearBuilt: '2024',
    lotSummary: 'Direct Gulf frontage · Private dune walkover',
    architecturalNote:
      'Board-formed architectural concrete meets warm travertine stone in a dual-level coastal compound built for generational resilience.',
    highlights: [
      'Direct beachfront exposure with elevated concrete slab construction',
      'Cantilevered primary suite terrace overlooking the Gulf',
      'Elevator access across all three levels with climate-controlled wine room',
      'Private beach access path framed by native sea oats and palms',
    ],
    images: [
      '/src/assets/images/hero_florida_residence_1795525231768.jpg',
      '/src/assets/images/listing_interior_kitchen_1795525235042.jpg',
      '/src/assets/images/listing_sarasota_bay_1795525232723.jpg',
    ],
  },
];

export const SOLD_LISTINGS: PropertyItem[] = [
  {
    id: 'anna-maria-glass',
    index: '(01)',
    title: '214 Bayfront Terrace',
    neighborhood: 'Anna Maria Island',
    city: 'Anna Maria, FL',
    price: '$4,625,000',
    beds: 4,
    baths: 4,
    sqft: '3,650 sq ft',
    status: 'Sold',
    yearBuilt: '2023',
    lotSummary: 'Closed in 9 days · 101% of list price',
    architecturalNote:
      'Represented both architecture-focused buyer and seller off-market, securing a clean cash closing in nine days.',
    highlights: [
      'Double-height great room overlooking Tampa Bay channel',
      'Honed limestone floors and integrated oak cabinetry',
      'Negotiated post-inspection credits and dock permit transfer',
    ],
    images: [
      '/src/assets/images/listing_interior_living_1795525236067.jpg',
      '/src/assets/images/listing_sarasota_bay_1795525232723.jpg',
    ],
  },
  {
    id: 'coconut-grove-modern',
    index: '(02)',
    title: '3380 Poinciana Way',
    neighborhood: 'North Coconut Grove',
    city: 'Miami, FL',
    price: '$3,980,000',
    beds: 4,
    baths: 4.5,
    sqft: '3,920 sq ft',
    status: 'Sold',
    yearBuilt: '2022',
    lotSummary: 'Closed in 16 days · Multiple-offer negotiation',
    architecturalNote:
      'Targeted pre-market architectural staging and private broker previews drove three clean offers within the first ten days.',
    highlights: [
      'Custom fluted oak kitchen with clerestory natural daylight',
      'Shaded tropical courtyard with saltwater plunge pool',
      'Elevated flood-resilient mechanical systems and metal roof',
    ],
    images: [
      '/src/assets/images/listing_interior_kitchen_1795525235042.jpg',
      '/src/assets/images/listing_naples_coast_1795525234146.jpg',
    ],
  },
  {
    id: 'siesta-key-retreat',
    index: '(03)',
    title: '882 Sanderling Lane',
    neighborhood: 'Sanderling Club',
    city: 'Siesta Key, FL',
    price: '$5,150,000',
    beds: 4,
    baths: 5,
    sqft: '4,410 sq ft',
    status: 'Sold',
    yearBuilt: '2021',
    lotSummary: 'Closed in 12 days · Direct buyer representation',
    architecturalNote:
      'Sourced quietly ahead of MLS launch for relocating founders seeking Gulf access and low-maintenance concrete construction.',
    highlights: [
      'Private lagoon dockage plus deeded Gulf beach cabana',
      'Architectural cedar overhangs and floor-to-ceiling sliders',
      'Completed structural, seawall, and insurance underwriting prior to contract',
    ],
    images: [
      '/src/assets/images/listing_naples_coast_1795525234146.jpg',
      '/src/assets/images/hero_florida_residence_1795525231768.jpg',
    ],
  },
];

export const TRACK_RECORD_STATS = [
  {
    prefix: '$',
    value: '48',
    suffix: 'M+',
    label: 'Closed Residential & Waterfront Volume',
  },
  {
    prefix: '',
    value: '14',
    suffix: ' Days',
    label: 'Average Days on Market',
  },
  {
    prefix: '',
    value: '98',
    suffix: '%',
    label: 'List-to-Sale Price Ratio',
  },
];

export const BUYING_STEPS: ProcessStep[] = [
  {
    index: '(01)',
    title: 'Brief & Off-Market Sourcing',
    description:
      'We define architectural criteria, flood zones, and resale fundamentals—then unlock private pocket listings before they hit public portals.',
  },
  {
    index: '(02)',
    title: 'Diligence & Pricing Strategy',
    description:
      'I personally walk every property with you, vetting seawall integrity, wind-mitigation credits, and micro-street comps so you never overpay.',
  },
  {
    index: '(03)',
    title: 'Precision Negotiation to Keys',
    description:
      'From clean offer structuring to inspection credits and coastal insurance binding, I stay hands-on through the closing table.',
  },
];

export const SELLING_STEPS: ProcessStep[] = [
  {
    index: '(01)',
    title: 'Editorial Positioning & Prep',
    description:
      'Targeted pre-listing edits, architectural photography, and narrative pricing built to attract qualified design-conscious buyers.',
  },
  {
    index: '(02)',
    title: 'Curated Private & MLS Launch',
    description:
      'Direct outreach to vetted cash buyers, family offices, and top Florida brokers alongside a disciplined public release.',
  },
  {
    index: '(03)',
    title: 'Protected Terms & Clean Close',
    description:
      'Every showing, counteroffer, and appraisal walkthrough is handled directly by me—protecting your price and timeline.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    index: '(01)',
    quote:
      'Shaunda found our Bird Key property three weeks before it ever reached the MLS and negotiated $280K in seawall and closing adjustments without losing the deal.',
    author: 'Marcus & Elena Vance',
    context: 'Bought in Sarasota Bay · $5.2M Waterfront Residence',
  },
  {
    id: 't2',
    index: '(02)',
    quote:
      'Unlike large brokerages that hand you off to an assistant after signing, Shaunda showed up to every inspection, staged our Winter Park courtyard, and sold it in 11 days.',
    author: 'Dr. David Halvorsen',
    context: 'Sold in Winter Park · 100.4% of Asking Price',
  },
  {
    id: 't3',
    index: '(03)',
    quote:
      'Her command of Florida coastal construction, wind insurance, and neighborhood micro-pricing saved us from a costly mistake and steered us into a far stronger investment.',
    author: 'Claire & Henrik Lindqvist',
    context: 'Bought in Naples · Off-Market Coastal Acquisition',
  },
  {
    id: 't4',
    index: '(04)',
    quote:
      'Calm, direct, and extraordinarily prepared. Shaunda treated the sale of our family home with architectural respect and closed cleanly all-cash in fourteen days.',
    author: 'Patricia Delgado',
    context: 'Sold in Coconut Grove · $3.98M Closed',
  },
];
