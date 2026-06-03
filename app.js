'use strict';

/* ================================================================
   Mzanzi Cals — South Africa's Free Calculator Suite
   All data hardcoded — works from file:// with no server needed
================================================================ */

// ── SA Data (SARS 2026/2027) ─────────────────────────────────────
var D = {
  vatRate:     0.15,
  repoRate:    6.75,
  primeRate:   10.25,
  inflation:   3.4,
  petrol95:    26.63,
  petrol93:    25.80,
  diesel50i:   32.30,
  diesel50c:   31.54,

  brackets: [
    { from:       1, to:   245100, rate: 0.18, base:      0 },
    { from:  245101, to:   383100, rate: 0.26, base:  44118 },
    { from:  383101, to:   530200, rate: 0.31, base:  79998 },
    { from:  530201, to:   695800, rate: 0.36, base: 125599 },
    { from:  695801, to:   887000, rate: 0.39, base: 185215 },
    { from:  887001, to: 1878600,  rate: 0.41, base: 259783 },
    { from: 1878601, to: null,     rate: 0.45, base: 666339 }
  ],
  rebates:    { primary: 17820, secondary: 9765, tertiary: 3249 },
  thresholds: { u65: 99000, u75: 153250, o75: 171300 },
  medCredits: { main: 376, first: 376, extra: 254 },

  uifRate:     0.01,
  uifCeiling:  17712,

  transferDuty: [
    { from:        0, to:  1100000, rate: 0,    base:       0 },
    { from:  1100001, to:  1512500, rate: 0.03, base:       0 },
    { from:  1512501, to:  2117500, rate: 0.06, base:   12375 },
    { from:  2117501, to:  2722500, rate: 0.08, base:   48675 },
    { from:  2722500, to: 12100000, rate: 0.11, base:   97075 },
    { from: 12100001, to: null,     rate: 0.13, base: 1128600 }
  ],

  raRate:   0.275,
  raCap:    350000,

  cgtExclusion:    40000,
  cgtPrimaryExcl:  2000000,
  cgtInclIndiv:    0.40,
  cgtInclCompany:  0.80,

  overtimeWd:  1.5,
  overtimeSun: 2.0,
  earningsThreshold: 254371,

  eskomDirect:       2.2092,
  eskomMuniAvg:      3.50,
  eskomServiceDirect: 135,
  eskomServiceMuni:   220,

  cpi: {
    2000:51.4, 2001:55.6, 2002:61.9, 2003:65.8, 2004:67.0, 2005:69.5,
    2006:72.5, 2007:76.6, 2008:86.9, 2009:91.7, 2010:95.3, 2011:100.0,
    2012:105.7, 2013:111.0, 2014:116.5, 2015:120.3, 2016:126.8, 2017:132.7,
    2018:138.6, 2019:143.1, 2020:147.4, 2021:152.2, 2022:163.8, 2023:175.9,
    2024:183.2, 2025:192.4, 2026:198.9
  }
};

// ── SVG Icon Library (Lucide-style, 24×24 viewBox) ───────────────
var ICONS = {
  'file-text':    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  'briefcase':    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  'percent':      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  'shield':       '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  'home':         '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  'clipboard':    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
  'building':     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  'credit-card':  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  'car':          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  'map':          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
  'droplets':     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  'trending-up':  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  'landmark':     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>',
  'bar-chart':    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
  'heart':        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  'clock':        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'zap':          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  'activity':     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  'calculator':   '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="14" x2="16" y2="18"/></svg>',
  'graduation-cap': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  'layers': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  'book-open': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  'lightbulb':    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="9" y1="21" x2="15" y2="21"/><line x1="12" y1="21" x2="12" y2="17"/><path d="M12 2a7 7 0 0 1 7 7c0 2.9-1.8 5.4-4.4 6.5A2 2 0 0 1 13 17h-2a2 2 0 0 1-1.6-.5C6.8 15.4 5 12.9 5 10a7 7 0 0 1 7-7z"/></svg>',
  'tool':         '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  'dollar-sign':  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  'scale':        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 6l9 6 9-6"/><path d="M3 6l3 9H0L3 6z"/><path d="M21 6l3 9h-6l3-9z"/></svg>',
  'sun':          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  'trending-down':'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>',
  'users':        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'award':        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  'check-circle': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  'copy':         '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  'share':        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
};

// Maps emoji CTA icons to SVG icon names
var CTA_ICON_MAP = {
  '💡': 'lightbulb', '💼': 'briefcase', '🧾': 'file-text', '🛡️': 'shield',
  '🏠': 'home', '📋': 'clipboard', '🏘️': 'building', '🏗️': 'tool',
  '💸': 'dollar-sign', '💳': 'credit-card', '🚗': 'car', '🗺️': 'map',
  '⛽': 'droplets', '📈': 'trending-up', '📉': 'trending-down',
  '🏦': 'landmark', '📊': 'bar-chart', '🏥': 'heart', '❤️': 'heart',
  '⏰': 'clock', '⚡': 'zap', '☀️': 'sun', '⚖️': 'scale',
  '🎓': 'graduation-cap', '📐': 'tool'
};

// ── Search State ──────────────────────────────────────────────────
var _currentSearch = '';
var _activeCategory = 'all';
var _journeyCalcs   = null;   // null = show all; array of IDs = journey filter
var _activeJourney  = null;   // ID of active journey

// ── Journey Data ──────────────────────────────────────────────────
var JOURNEYS = [
  {
    id: 'homebuyer',
    label: 'Buying a Home',
    sub: 'Bond, transfer duty, building costs & rental yield',
    icon: 'home',
    gradient: '135deg,#0D9488,#0F766E',
    calcs: ['bond','transfer-duty','building-cost','rental-yield']
  },
  {
    id: 'mypay',
    label: 'My Pay & Tax',
    sub: 'PAYE, UIF, salary breakdown & medical aid',
    icon: 'briefcase',
    gradient: '135deg,#2563EB,#1D4ED8',
    calcs: ['paye','salary','uif','medical-aid','overtime']
  },
  {
    id: 'roadtrip',
    label: 'Road Trip',
    sub: 'Fuel costs, vehicle finance & trip planner',
    icon: 'map',
    gradient: '135deg,#DC2626,#B91C1C',
    calcs: ['trip-fuel','fuel','vehicle-finance']
  },
  {
    id: 'investing',
    label: 'Growing Money',
    sub: 'TFSA, RA, CGT & inflation calculator',
    icon: 'trending-up',
    gradient: '135deg,#7C3AED,#6D28D9',
    calcs: ['compound-interest','retirement-annuity','two-pot','cgt','inflation']
  },
  {
    id: 'business',
    label: 'Business & VAT',
    sub: 'VAT, electricity, overtime & loans',
    icon: 'building',
    gradient: '135deg,#EA580C,#C2410C',
    calcs: ['vat','electricity','loan','compound-interest']
  }
  ,{ id:'matric', label:'Matric & University', sub:'APS score, NSFAS bursary & student loans', icon:'graduation-cap', gradient:'135deg,#0C4A6E,#0284C7', calcs:['aps','nsfas','loan'] }
  ,{ id:'car', label:'Buying a Car', sub:'Vehicle finance, fuel running costs & loan comparison', icon:'car', gradient:'135deg,#92400E,#D97706', calcs:['vehicle-finance','fuel','loan','trip-fuel'] }
  ,{ id:'grants', label:'Social Grants & Support', sub:'SASSA eligibility, grant amounts & social relief', icon:'heart', gradient:'135deg,#BE185D,#DB2777', calcs:['sassa','nsfas','uif'] }
  ,{ id:'utilities', label:'Home & Utilities', sub:'Electricity bill, appliances & running costs', icon:'zap', gradient:'135deg,#0F766E,#0D9488', calcs:['appliances','electricity'] }
];

// ── Journey Article Content ───────────────────────────────────────
var JOURNEY_ARTICLES = {
  homebuyer: {
    title: 'Buying or Building a Home in SA',
    sub: '2026/27 guide to bonds, transfer duty, building costs and property',
    gradient: 'linear-gradient(150deg,#065F46 0%,#0D9488 100%)',
    facts: [
      { val: '10.25%', label: 'Prime Rate', note: 'Home loans priced at prime ± margin' },
      { val: 'R0', label: 'Transfer Duty', note: 'On properties under R1,100,000' },
      { val: 'R12,000', label: 'Standard Build/m²', note: 'ASAQS 2026 benchmark rate' },
      { val: '10–20%', label: 'Ideal Deposit', note: 'Secures a better interest rate' }
    ],
    sections: [
      {
        heading: 'How South African Home Loans Work',
        body: 'South African home loans (bonds) are priced at the prime lending rate plus or minus a margin based on your deposit and credit profile. With prime at 10.25% in 2026, most buyers pay between 9.75% and 11.25% per annum on a standard 20-year term. Banks use a guideline of roughly 30% of gross monthly income for bond repayments — so a R1.5 million bond at 10.25% requires around R55,000/month gross income for approval. Pre-approval from a bond originator (ooba, BetterBond) costs nothing and tells you your real budget before you fall in love with a property.'
      },
      {
        heading: 'Transfer Duty: What You Will Actually Pay',
        body: 'Transfer duty is the government\'s tax on property purchases. In 2026/27, properties priced at R1,100,000 or below pay zero transfer duty — a major saving for first-time buyers. Above that, a sliding scale runs from 3% on the amount over R1.1M up to 13% on amounts over R12.1M. If the seller is a VAT-registered developer (like many new developments), VAT at 15% replaces transfer duty and is usually built into the advertised price. Always ask your attorney which applies.'
      },
      {
        heading: 'Full Cost Breakdown: Beyond the Purchase Price',
        body: 'Budget an extra 7–10% of the purchase price for: conveyancing attorney fees (R15,000–R40,000+), bond registration costs (R10,000–R30,000+), rates clearance certificates, and occupational rent if you move in before registration. These costs must be paid from your own funds — they cannot be financed with the bond. Transfer duty is also settled from your own pocket, not from the loan. Most buyers are caught off-guard by these costs.',
        tip: 'Making just R500/month extra on a R1.5M bond at 10.25% saves over R250,000 in total interest and cuts 2–3 years off your loan. The bond calculator below shows the exact numbers.'
      },
      {
        heading: 'Building Your Own Home: Costs & What to Expect',
        body: 'Building a new home in South Africa typically costs R8,500–R23,000 per m² depending on finish quality and province, based on 2026 ASAQS benchmark rates. A standard 150m² home in Gauteng runs roughly R1.8 million in construction costs. Add architect fees (~8% of construction), a structural engineer (~2.5%), NHBRC enrolment (R2,500 + 1.3% of insured value), and municipality plan approval (R3,000–R12,000). Budget R2.2–R2.5 million all-in for a standard 150m² build. The Building Cost Calculator below estimates your full project cost.',
        tip: 'Always enrol your new home with the NHBRC (nhbrc.org.za) before construction starts. NHBRC enrolment is a legal requirement and provides a 5-year structural warranty. Never pay a builder who is not NHBRC-registered.'
      }
    ]
  },
  mypay: {
    title: 'My Pay, Tax & Take-Home',
    sub: 'PAYE, UIF, RA contributions and medical aid credits — decoded',
    gradient: 'linear-gradient(150deg,#1E3A5F 0%,#2563EB 100%)',
    facts: [
      { val: 'R99,000', label: 'Tax Threshold', note: 'Under-65s pay no tax below this' },
      { val: 'R17,820', label: 'Primary Rebate', note: 'Everyone gets this off their tax bill' },
      { val: '1%', label: 'UIF Rate', note: 'Capped at R177.12/month (ceiling R17,712)' },
      { val: 'R376/mo', label: 'Med Aid Credit', note: 'Per main member — rand-for-rand PAYE reduction' }
    ],
    sections: [
      {
        heading: 'How PAYE Works: The Seven Brackets',
        body: 'South Africa uses a progressive income tax system with seven brackets ranging from 18% on the first R245,100 of taxable income to 45% on amounts above R1,878,600 (2026/27 rates). The primary rebate of R17,820 per year is deducted directly from your tax — not from your income — which is why the effective tax-free threshold is R99,000/year, not zero. Your employer deducts estimated PAYE monthly based on your annual expected earnings, then you settle any difference when you file your annual return via SARS eFiling.'
      },
      {
        heading: 'Your Two Biggest Legal Tax Savers: RA and Medical Aid',
        body: 'Retirement Annuity (RA) contributions are deductible up to 27.5% of your taxable income, capped at R350,000/year. At a 36% marginal tax rate, a R1,000 RA contribution costs you only R640 — SARS funds the other R360. The medical scheme fees tax credit is not a deduction but a direct rand-for-rand reduction in your PAYE: R376/month for the main member, R376 for the first dependant, and R254 for each additional dependant. These credits are the same regardless of your income level.',
        tip: 'Maximise your RA contribution before end of February — the tax year runs March to February and contributions made before the deadline reduce your current year\'s tax. You may get a significant refund when you file.'
      },
      {
        heading: 'UIF: What It Is and Why It Matters',
        body: 'The Unemployment Insurance Fund deducts 1% of your monthly salary (capped at R177.12/month) and your employer matches it. This entitles you to claim income replacement if you are retrenched, dismissed, or unable to work due to illness. Maternity leave qualifies for 121 days of UIF benefit. You accumulate one credit day for every four days worked — the maximum claim period is 238 days (about eight months) after four consecutive years of contributions. All employees including domestic workers who work over 24 hours/month must be registered.'
      }
    ]
  },
  roadtrip: {
    title: 'SA Road Trip Cost Planner',
    sub: 'Fuel prices, vehicle running costs and trip budgets for South African roads',
    gradient: 'linear-gradient(150deg,#7C1D1D 0%,#DC2626 100%)',
    facts: [
      { val: 'R26.63', label: 'Petrol 95/L', note: 'DMRE inland pump price, May 2026' },
      { val: 'R32.30', label: 'Diesel 50ppm/L', note: 'Inland pump price, May 2026' },
      { val: 'First Wed', label: 'Price Change Day', note: 'DMRE adjusts prices monthly' },
      { val: '8–14 L', label: 'Typical Use /100km', note: 'Sedan: 8–10L · SUV: 10–13L · Bakkie: 12–15L' }
    ],
    sections: [
      {
        heading: 'How South African Fuel Prices Are Set',
        body: 'The Department of Mineral Resources and Energy (DMRE) sets South African fuel prices on the first Wednesday of each month. The formula is based on the international Brent crude oil price, the ZAR/USD exchange rate over the preceding month, and fixed statutory levies: the General Fuel Levy (R4.04/L), the Road Accident Fund levy (R2.18/L), customs and excise duties, and transport costs from coast to inland (which is why inland prices are slightly higher than coastal). When the rand weakens or Brent rises, South Africans pay more within weeks.'
      },
      {
        heading: 'Planning Your Trip Budget Accurately',
        body: 'To calculate fuel cost: total distance ÷ your vehicle\'s consumption (L/100km) × price per litre. Always add 10–15% for city traffic, headwinds, and air conditioning. Don\'t overlook toll fees — the N3 from Johannesburg to Durban (569km) costs approximately R600+ in e-tolls for a standard car. The N1 Cape Town to Johannesburg (1,402km) has multiple toll plazas. Budget R0.50–R1.00/km for tolls on major national routes. The Mzanzi Trip Calculator uses real OpenStreetMap road routing for accurate distances.',
        tip: 'In rural areas, fill up whenever you pass a petrol station. Some stretches of the N14, R30 and R37 have 100km+ gaps between fuel stops. Never start a rural leg with less than half a tank.'
      },
      {
        heading: 'Petrol vs Diesel: Real Running Costs Compared',
        body: 'Although diesel costs more per litre than petrol, diesel engines typically achieve 20–30% better fuel economy, making them cost-competitive over long distances. A diesel bakkie averaging 9L/100km at R32.30/L costs R2.91/km. A petrol SUV averaging 12L/100km at R26.63/L costs R3.20/km. Over a 1,000km trip that\'s R2,910 vs R3,200 — the diesel is actually cheaper despite the higher pump price. The Vehicle Finance calculator helps you compare the total cost of ownership.'
      }
    ]
  },
  investing: {
    title: 'Growing Your Money in South Africa',
    sub: 'TFSA, retirement annuities, compound growth and protecting against inflation',
    gradient: 'linear-gradient(150deg,#3B0764 0%,#7C3AED 100%)',
    facts: [
      { val: 'R36,000', label: 'TFSA Annual Limit', note: 'All growth, income and withdrawals tax-free' },
      { val: 'R500,000', label: 'TFSA Lifetime Cap', note: 'Penalties apply if exceeded — track carefully' },
      { val: 'R350,000', label: 'RA Max Deduction', note: '27.5% of income — reduces taxable income now' },
      { val: 'R40,000', label: 'CGT Annual Exclusion', note: 'First R40K capital gain per year is tax-free' }
    ],
    sections: [
      {
        heading: 'The Power of Compound Interest in Practice',
        body: 'South African equities have historically delivered CPI + 7% over 20-year periods. At current CPI of 3.4%, that implies roughly 10.4% nominal returns. Investing R2,000/month for 30 years at 10% annual return grows to over R4.5 million — yet your total contributions were only R720,000. The remaining R3.8 million is pure compound growth. The most powerful variable is time: starting 10 years earlier roughly doubles your final balance. Time in the market consistently beats timing the market.'
      },
      {
        heading: 'TFSA vs Retirement Annuity: How to Choose',
        body: 'Both are powerful tax wrappers but serve different purposes. A Tax-Free Savings Account (TFSA) is flexible — withdraw anytime, invest in ETFs, and all growth is genuinely tax-free forever with no lock-in. A Retirement Annuity (RA) gives you a tax deduction today (saving you tax now) but funds are locked until age 55. The general approach: max your RA first for the immediate tax saving on your highest-taxed income, then fill your TFSA for accessible long-term growth. Easy Equities and Satrix offer both with zero brokerage on ETFs.',
        tip: 'At a 36% marginal tax rate, a R1,000 RA contribution only costs you R640 out of pocket. That\'s an immediate 56% return on your actual cash outflow before any investment growth.'
      },
      {
        heading: 'Inflation: The Silent Wealth Destroyer',
        body: 'R1,000 in the year 2000 bought what costs R3,740 today — a 73% loss in purchasing power over 25 years. Any investment returning less than inflation is losing real value. The SARB targets CPI within the 3–6% band, but SA has historically averaged closer to 5–6%. This is why cash savings accounts (paying 7–8%) barely break even in real terms. Equity investments targeting CPI + 5% to CPI + 7% are the standard benchmark for long-term wealth accumulation in South Africa.'
      },
      {
        heading: 'Two-Pot Retirement System: Everything South Africans Need to Know (September 2024)',
        body: 'The Two-Pot Retirement System — created by the Revenue Laws Amendment Act 12/2024 and Pension Funds Amendment Act 31/2024 — took effect on 1 September 2024 (T-Day). All new contributions after T-Day are now split: one-third into the Savings Pot and two-thirds into the Retirement Pot. Your pre-September 2024 savings form a separate Vested Pot, which continues under the old rules (accessible on resignation, retrenchment or retirement). On T-Day, your fund automatically transferred 10% of your pre-T-Day balance, capped at R30,000, into your Savings Pot — this is the seeding amount. GEPF (Government Employees Pension Fund) members were seeded at R25,000 maximum. The Savings Pot can be accessed once per tax year (1 March to 28 February), with a minimum withdrawal of R2,000. The Retirement Pot is locked until retirement age — typically 55 under the Pension Funds Act — and cannot be accessed for any reason before then, including resignation, retrenchment or financial hardship. At retirement, your Savings Pot balance can be taken as a cash lump sum (within the R550,000 lump-sum tax table). Your Retirement Pot must be used to purchase an annuity if it exceeds R165,000 at retirement.',
        tip: 'The National Treasury and FSCA estimated that over 1.8 million South Africans made withdrawals within the first three months after T-Day, withdrawing approximately R40 billion collectively. Financial advisers report that the majority of early withdrawers were in higher tax brackets and received significantly less than expected once marginal tax was applied.'
      },
      {
        heading: 'Should You Withdraw from Your Savings Pot? The Real Decision Framework',
        body: 'The Savings Pot is not designed as an emergency fund — it is retirement savings with early-access allowed, not a bank account. Before withdrawing, calculate the exact net amount using the Two-Pot Calculator above. Consider: (1) Your marginal tax rate — at R500,000 annual salary, a R20,000 withdrawal yields only about R12,900 after admin fees and tax (35% loss). (2) Compound growth lost — R20,000 withdrawn at age 35 forfeits approximately R200,000 in retirement value by age 65 at 10% annual returns. (3) Admin fees are deducted before tax, making them effectively more expensive: a R300 fee on a R3,000 withdrawal means only R2,700 is taxable, but you still lose R300 off the top. When withdrawal may make sense: genuine financial emergency with no other options, you are nearing retirement and your marginal rate is low, or you face imminent loss greater than the tax cost. When it does not make sense: the tax alone exceeds what a personal loan would cost, you are more than 10 years from retirement, or the amount is small (admin fees represent a large percentage of small withdrawals).',
        tip: 'Compare the cost: A R10,000 withdrawal at a 36% marginal rate costs you R300 admin fee + R3,492 tax = R3,792 in total costs — you receive R6,208. A 12-month personal loan for R10,000 at prime+5% (17.75%) costs approximately R950 in total interest. The loan is cheaper. The Two-Pot withdrawal makes sense only when credit is unavailable or the alternative cost is higher.'
      },
      {
        heading: 'Admin Fees & Tax at Every Income Level: The Real Numbers',
        html: '<p class="ja-section-body">Admin fees are deducted <strong>before</strong> tax is calculated, making them more expensive than they appear. Using a R300 admin fee and a R10,000 withdrawal request:</p>' +
          '<div class="ja-tp-table-wrap"><table class="ja-tp-table">' +
            '<thead><tr><th>Annual Salary</th><th>Marginal Rate</th><th>Admin Fee</th><th>Tax Withheld</th><th>Net Received</th><th>% Kept</th></tr></thead>' +
            '<tbody>' +
            '<tr><td>R120,000</td><td>18%</td><td>R300</td><td>R1,746</td><td>R7,954</td><td class="tp-green-cell">79.5%</td></tr>' +
            '<tr><td>R250,000</td><td>26%</td><td>R300</td><td>R2,522</td><td>R7,178</td><td>71.8%</td></tr>' +
            '<tr><td>R400,000</td><td>31%</td><td>R300</td><td>R3,007</td><td>R6,693</td><td>66.9%</td></tr>' +
            '<tr><td>R600,000</td><td>36%</td><td>R300</td><td>R3,492</td><td>R6,208</td><td class="tp-amber-cell">62.1%</td></tr>' +
            '<tr><td>R900,000</td><td>39%</td><td>R300</td><td>R3,783</td><td>R5,917</td><td class="tp-amber-cell">59.2%</td></tr>' +
            '<tr><td>R1,817,001+</td><td>45%</td><td>R300</td><td>R4,365</td><td>R5,335</td><td class="tp-red-cell">53.4%</td></tr>' +
            '</tbody>' +
          '</table></div>' +
          '<p class="ja-section-body" style="margin-top:1rem"><strong>Admin fee comparison (2024/25):</strong> Old Mutual R250–R300 &nbsp;·&nbsp; Momentum R250 digital / R350 paper &nbsp;·&nbsp; 10X Investments R300 excl VAT (≈R345 incl) &nbsp;·&nbsp; Sanlam R330 + VAT (≈R380) &nbsp;·&nbsp; Discovery Retirement R300 &nbsp;·&nbsp; GEPF — no direct admin fee cited. GEPF members should allow up to 60 working days (≈ 3 months) for processing. All other funds are typically processed within 10 working days.</p>' +
          '<p class="ja-section-body">Sources: <strong>SARS Two-Pot withdrawal tax</strong> (sars.gov.za/two-pot) · <strong>National Treasury FAQ</strong> August 2024 · <strong>FSCA guidance</strong> on admin fees · Provider websites confirmed January 2025.</p>'
      }
    ]
  },
  business: {
    title: 'Running a South African Business',
    sub: 'VAT compliance, electricity costs, loan rates and employee obligations',
    gradient: 'linear-gradient(150deg,#7C2D12 0%,#EA580C 100%)',
    facts: [
      { val: 'R1M', label: 'VAT Threshold', note: 'Compulsory registration above R1M taxable turnover' },
      { val: '15%', label: 'Standard VAT Rate', note: 'Zero-rated: basic foods, exports, public transport' },
      { val: '+12.74%', label: 'Eskom Increase', note: 'NERSA-approved April 2025 tariff increase' },
      { val: 'Repo +21%', label: 'NCR Loan Cap', note: 'Maximum unsecured loan rate = 27.75% at current repo' }
    ],
    sections: [
      {
        heading: 'VAT Registration, Filing and Recovery',
        body: 'VAT registration is compulsory when your taxable supplies exceed R1,000,000 in any 12-month period. Voluntary registration is allowed above R50,000. Once registered, you add 15% to your invoices (output VAT), claim back the 15% you paid on business expenses (input VAT), and pay SARS the net difference bi-monthly via eFiling. A 10% penalty applies on late submissions. Zero-rated supplies (exports, basic food items) charge 0% VAT but you still recover all input VAT on your expenses — making exporting effectively VAT-free on the output side.',
        tip: 'If your business buys more than it sells in a VAT period (e.g. during a large equipment purchase), SARS owes you a refund. Always file on time even when you\'re owed money — delays in filing delay your refund.'
      },
      {
        heading: 'Managing South Africa\'s Rising Electricity Costs',
        body: 'Electricity is one of the fastest-growing overheads for South African businesses. Eskom direct customers pay an average of R2.21/kWh (2025/26 standard rate), but most businesses receive municipal supply at R2.50–R4.50/kWh. Cumulative tariff increases since 2010 total approximately 650%. Solar photovoltaic with battery storage typically offers a 3–5 year payback and provides load-shedding insurance. The Section 12B renewable energy tax incentive allows 125% depreciation in year one for qualifying solar installations under 1MW.'
      },
      {
        heading: 'BCEA Overtime: Your Legal Obligations',
        body: 'The Basic Conditions of Employment Act covers employees earning below R254,371/year. For covered employees: ordinary hours are capped at 45/week, overtime is capped at 10 hours/week, weekday overtime must be paid at 1.5× the hourly rate, and Sunday work (on a non-working day) at 2×. Employees above the BCEA earnings threshold are not covered by these minimum overtime rates — pay rates are negotiable but should always be agreed in writing. Non-compliance with BCEA can result in CCMA claims and Department of Labour penalties.'
      }
    ]
  }
  ,matric: {
    title: 'Matric, University Entry & Student Finance',
    sub: '2026 guide to APS scores, NSFAS eligibility and how to fund your studies',
    gradient: 'linear-gradient(150deg,#0C4A6E 0%,#0284C7 100%)',
    facts: [
      { val: '42', label: 'Max APS Score', note: '6 subjects × Level 7 (80%+) excluding Life Orientation' },
      { val: 'R600,000', label: 'NSFAS University', note: 'Max combined household income for university NSFAS' },
      { val: 'R350,000', label: 'NSFAS TVET', note: 'Max combined household income for TVET college NSFAS' },
      { val: '26', label: 'Public Universities', note: 'Each with different APS requirements by faculty' }
    ],
    sections: [
      {
        heading: 'How APS Works: From Marks to University Entry',
        body: 'Your Admission Point Score (APS) converts each of your NSC matric marks into a numerical level from 1 to 7. Level 7 requires 80% or above. You take your 6 best results — excluding Life Orientation — and add the levels together for a maximum of 42. Most degree programmes require between 24 and 36 APS points. Medicine, Engineering and Law at top universities (UCT, Wits, Stellenbosch) typically require 36–42. First-generation students: many universities offer foundational year programmes for students with lower APS who show potential — ask the admissions office directly.'
      },
      {
        heading: 'NSFAS: Who Qualifies, What You Get, and How to Apply',
        body: 'NSFAS provides non-repayable bursaries (not loans) to South African citizens at DHET-funded public universities and TVET colleges. To qualify, your combined household income must be R600,000 or less per year for university, or R350,000 or less for TVET. Qualifying students receive: living allowance (R15,750/year), book allowance (R5,460/year), accommodation support (up to R53,550/year at accredited residences), and transport support. Applications open in August each year — do not miss this window. Apply at nsfas.org.za using your ID number.',
        tip: 'Apply in August/September — even before you receive your matric results. You can submit conditional applications. Missing the November deadline means waiting a full year. Never pay anyone to apply on your behalf — the NSFAS application is free.'
      },
      {
        heading: 'Other Ways to Fund Your Studies: Beyond NSFAS',
        body: 'Students whose household income exceeds the NSFAS threshold are often called the "missing middle" — they earn too much for NSFAS but too little to pay university fees. Options for this group include: the Funza Lushaka bursary (for teaching degrees — fully funded including allowances), SETA bursaries (sector-specific, linked to working in that industry after graduation), corporate bursaries (many large SA companies offer bursaries to students studying toward their industry), and personal loans from banks (ABSA, Standard Bank, Nedbank all offer study loans at prime rate). The Ikusasa Student Financial Aid Programme (ISFAP) specifically targets the missing middle.'
      }
    ]
  },
  car: {
    title: 'Buying a Car in South Africa',
    sub: 'Vehicle finance, running costs & what you can really afford',
    gradient: 'linear-gradient(150deg,#92400E 0%,#D97706 100%)',
    facts: [
      { val: D.primeRate + '%', label: 'Prime Rate', note: 'Vehicle finance priced at prime + 0–3%', live: false },
      { val: '72 mo', label: 'Max Term', note: 'Most banks cap vehicle finance at 72 months' },
      { val: '10–20%', label: 'Deposit', note: 'Recommended deposit to reduce monthly cost' },
      { val: 'R' + D.petrol95.toFixed(2), label: 'Petrol 95/L', note: 'Major running cost factor', live: true }
    ],
    sections: [
      {
        heading: 'How Vehicle Finance Works in South Africa',
        body: 'Vehicle finance in South Africa comes in two main forms: Instalment Sale (IS) — you own the car throughout, pay fixed monthly instalments including interest, and the vehicle is yours outright when the term ends. A Lease (PFP/Operating Lease) — you pay to use the car and hand it back or settle a balloon payment at the end. Most consumers use Instalment Sale. Interest is charged at prime + a margin based on your credit score — with prime at ' + D.primeRate + '%, rates typically range from ' + D.primeRate + '% to ' + (D.primeRate + 3) + '%. A deposit of 10–20% significantly reduces your monthly repayment and the total interest paid.'
      },
      {
        heading: 'The Real Cost of Owning a Car: Beyond Repayments',
        body: 'Monthly repayments are only one part of the cost. Budget for: insurance (compulsory for financed vehicles, typically R600–R2,500/month depending on vehicle and driver), fuel (a car doing 1,500km/month at 10L/100km costs R' + Math.round(1500 * 0.1 * D.petrol95) + '/month at current prices), maintenance (R2,000–R5,000/year for services), licence and roadworthy fees, and tolls if you use the N1/N3/N4. Many buyers focus only on the monthly payment and underestimate total ownership cost by 40–60%.',
        tip: 'Use the Vehicle Finance calculator to test different deposit amounts, terms and balloon payments. Then use the Fuel calculator to estimate your monthly running costs. Together these give you the true monthly cost of owning the car.'
      },
      {
        heading: 'Balloon Payments: Tempting but Expensive',
        body: 'A balloon (residual value) of 20–30% at the end of the term makes monthly payments much lower but means you either pay a large lump sum, refinance at the end (paying interest again), or hand back the car. Over 72 months with a 30% balloon, you can end up paying 40–50% more in total interest than a standard deal with no balloon. Banks and dealerships sometimes push high balloons because they look attractive on paper. Run the numbers in the calculator before signing.'
      }
    ]
  },
  grants: {
    title: 'South African Social Grants & Support',
    sub: 'SASSA grants, eligibility criteria and how to apply',
    gradient: 'linear-gradient(150deg,#BE185D 0%,#DB2777 100%)',
    facts: [
      { val: 'R2,190', label: 'Old Age Grant', note: 'Per month for citizens aged 60–74 (2026)', live: false },
      { val: 'R560', label: 'Child Support', note: 'Per child per month, ages 0–18', live: false },
      { val: 'R93,192', label: 'Means Test (pa)', note: 'Max annual income for most SASSA grants', live: false },
      { val: '18M+', label: 'Grant Recipients', note: 'South Africans receive SASSA grants monthly', live: false }
    ],
    sections: [
      {
        heading: 'Who Qualifies for SASSA Grants',
        body: 'SASSA (South African Social Security Agency) administers seven permanent grants and one temporary relief grant. All require South African citizenship or permanent residency and a means test. The means test checks both income and assets: for the Old Age and Disability Grants, a single person\'s income must not exceed R93,192/year (R7,766/month), and movable assets cannot exceed R316,800. Your primary residence is excluded from the asset calculation. A married couple\'s combined income ceiling is R186,384/year. If you receive any other government pension, this counts toward the income limit.'
      },
      {
        heading: 'Child Support Grant: The Largest Grant Programme',
        body: 'The Child Support Grant (R560/month per child) is paid to the primary caregiver — not necessarily the biological parent. It covers children from birth to age 18. The means test for the caregiver is lower: R58,800/year single, R117,600/year married. There is no limit on how many children one caregiver can claim for, but each child must be registered individually. Apply at your nearest SASSA office with the child\'s birth certificate, your ID, and proof of income or an affidavit if unemployed. Many eligible families do not claim — if you have children and a household income below R10,000/month, check your eligibility.',
        tip: 'You can apply for the Child Support Grant for up to one year before the child was born (during pregnancy). Apply as soon as possible — grants are not backdated beyond the application date. A late application means lost income you cannot recover.'
      },
      {
        heading: 'How to Apply: SASSA Offices, Online and WhatsApp',
        body: 'Most grants require in-person application at a SASSA office. Bring: SA ID, proof of income or SASSA affidavit if unemployed, proof of residence (utility bill or lease), and bank details. The SRD (Social Relief of Distress) R370/month grant is the exception — apply online at srd.sassa.gov.za or via WhatsApp on 082 046 8553. SASSA offices are present in all towns — use the SASSA office locator on sassa.gov.za. Grant payments are made on a monthly schedule via SASSA card, bank transfer, or approved retail pay points (Shoprite, Pick n Pay).'
      }
    ]
  },
  utilities: {
    title: 'Home Electricity & Appliance Costs',
    sub: 'See exactly what each appliance costs and where to cut your bill',
    gradient: 'linear-gradient(150deg,#0F766E 0%,#0D9488 100%)',
    facts: [
      { val: 'R' + D.eskomDirect.toFixed(2) + '/kWh', label: 'Eskom Direct', note: 'Standard domestic rate 2025/26', live: false },
      { val: 'R3.50/kWh', label: 'Municipal Avg', note: 'Most households pay muni rate R2.50–R4.50/kWh', live: false },
      { val: '40–50%', label: 'Geyser Share', note: 'Geyser typically uses nearly half your electricity', live: false },
      { val: '3–5 yrs', label: 'Solar Payback', note: 'Typical rooftop solar return at current prices', live: false }
    ],
    sections: [
      {
        heading: 'Understanding Your South African Electricity Bill',
        body: 'Most South African households pay for electricity via their municipality, which buys in bulk from Eskom and adds a margin. Municipal tariffs typically range from R2.50 to R4.50/kWh. Prepaid meters show your balance in kWh — divide your purchase amount by the kWh received to find your effective rate. Many municipalities also charge a fixed service/availability fee regardless of consumption. If your bill seems high, start with the appliance calculator below: the geyser, stove and air conditioner together typically account for 60–70% of a household\'s total electricity use.'
      },
      {
        heading: 'Your Biggest Electricity Users and How to Cut Costs',
        body: 'The electric geyser is the single biggest target for savings. Installing a geyser timer (cutting heating to off-peak hours: 10pm–6am, 9am–4pm) alone reduces geyser electricity use by 25–30%. A heat pump geyser uses 60–70% less electricity than a standard element. LED bulbs use 80% less power than incandescent. If you have a pool, a variable-speed pump on a 6-hour timer (instead of running all day) can save R500–R1,500/month. Air conditioning costs 1.5–2.5kWh per hour — setting your thermostat to 24°C instead of 20°C can halve the running cost.',
        tip: 'The 25C Solar Tax Incentive allows individual taxpayers to claim 25% of solar panel installation costs as a tax credit (capped at R15,000 per person). Available for the 2024/25 tax year for installations completed before 28 February 2025.'
      }
    ]
  }
};

// ── Formatters ────────────────────────────────────────────────────
function R(n, dec) {
  if (dec === undefined) dec = 0;
  var abs = Math.abs(n);
  var str = abs.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (n < 0 ? '−' : '') + 'R ' + str;
}
function pct(n, dec) {
  if (dec === undefined) dec = 2;
  return n.toFixed(dec) + '%';
}
function num(id) {
  var el = document.getElementById(id);
  return el ? (parseFloat(el.value) || 0) : 0;
}
function val(id) {
  var el = document.getElementById(id);
  return el ? el.value : '';
}
function intval(id) {
  var el = document.getElementById(id);
  return el ? (parseInt(el.value, 10) || 0) : 0;
}

// ── Slider fill ───────────────────────────────────────────────────
function syncSlider(slider) {
  var min = parseFloat(slider.min) || 0;
  var max = parseFloat(slider.max) || 100;
  var pct = Math.max(0, Math.min(100, ((parseFloat(slider.value) - min) / (max - min)) * 100));
  slider.style.background = 'linear-gradient(to right,#16a34a 0%,#16a34a ' + pct + '%,#e2e8f0 ' + pct + '%,#e2e8f0 100%)';
}
function syncAllSliders() {
  document.querySelectorAll('input[type="range"]').forEach(syncSlider);
}

// ── Tax Engine ────────────────────────────────────────────────────
function calcTax(annualIncome, age, medMembers) {
  var brackets = D.brackets;
  var tax = 0;
  for (var i = 0; i < brackets.length; i++) {
    var b = brackets[i];
    if (annualIncome >= b.from) {
      var upper = b.to !== null ? Math.min(annualIncome, b.to) : annualIncome;
      tax = b.base + (upper - b.from + 1) * b.rate;
    }
  }
  var rebate = D.rebates.primary;
  if (age >= 75) rebate += D.rebates.secondary + D.rebates.tertiary;
  else if (age >= 65) rebate += D.rebates.secondary;
  tax = Math.max(0, tax - rebate);

  var medCredit = 0;
  if (medMembers > 0) {
    medCredit = D.medCredits.main;
    if (medMembers > 1) medCredit += D.medCredits.first;
    if (medMembers > 2) medCredit += D.medCredits.extra * (medMembers - 2);
    medCredit *= 12;
    tax = Math.max(0, tax - medCredit);
  }
  return { tax: tax, rebate: rebate, medCredit: medCredit };
}

function calcUIF(monthlyGross) {
  return Math.min(monthlyGross, D.uifCeiling) * D.uifRate;
}

// ── DOM Helpers ───────────────────────────────────────────────────
function tip(text) {
  return '<span class="tip" role="tooltip" data-tip="' + text.replace(/"/g, '&quot;') + '">?</span>';
}

function field(id, label, inputHTML, hint, tooltip) {
  hint = hint ? ' <span class="hint">(' + hint + ')</span>' : '';
  var tipHTML = tooltip ? tip(tooltip) : '';
  return '<div class="field"><label for="' + id + '">' + label + hint + tipHTML + '</label>' + inputHTML + '</div>';
}

function fsect(label) {
  return '<div class="fsect">' + label + '</div>';
}

function donutSVG(segments) {
  var r = 34, cx = 50, cy = 50, C = 2 * Math.PI * r;
  var offset = -90;
  var arcs = segments.map(function(seg) {
    var dash = (Math.max(0, Math.min(100, seg.pct)) / 100) * C;
    var gap = C - dash;
    var arc = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none"' +
      ' stroke="' + seg.color + '" stroke-width="13"' +
      ' stroke-dasharray="' + dash.toFixed(2) + ' ' + gap.toFixed(2) + '"' +
      ' stroke-dashoffset="' + (-(offset / 360) * C).toFixed(2) + '"' +
      ' transform="rotate(-90 ' + cx + ' ' + cy + ')"' +
      ' style="transition:stroke-dasharray .5s ease"/>';
    offset += (seg.pct / 100) * 360;
    return arc;
  });
  return '<svg width="90" height="90" viewBox="0 0 100 100" class="donut-svg">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="13"/>' +
    arcs.join('') + '</svg>';
}

function donutCard(segments) {
  var svgHTML = donutSVG(segments);
  var legend = segments.map(function(s) {
    return '<div class="donut-leg-row">' +
      '<span class="donut-dot" style="background:' + s.color + '"></span>' +
      '<span class="donut-lbl">' + s.label + '</span>' +
      '<span class="donut-val">' + s.value + '</span></div>';
  }).join('');
  return '<div class="rc-donut">' + svgHTML + '<div class="donut-legend">' + legend + '</div></div>';
}

function statGrid(items) {
  return '<div class="rc-stats">' + items.map(function(item) {
    return '<div class="rc-stat">' +
      '<span class="rcs-label">' + item.label + '</span>' +
      '<span class="rcs-value' + (item.color ? ' ' + item.color : '') + '">' + item.value + '</span>' +
      '</div>';
  }).join('') + '</div>';
}

function contextBadge(text, type) {
  return '<div><span class="rc-badge badge-' + (type || 'good') + '">' + text + '</span></div>';
}

function copyBtn(text) {
  return '<button class="rc-copy" onclick="(function(b){navigator.clipboard&&navigator.clipboard.writeText(\'' +
    text.replace(/'/g, "\\'") + '\').then(function(){b.textContent=\'✓ Copied\';b.classList.add(\'copied\');setTimeout(function(){b.textContent=\'⎘ Copy result\';b.classList.remove(\'copied\');},1500)});})(this)">⎘ Copy result</button>';
}

function moneyInput(id, placeholder, value) {
  value = value !== undefined ? value : '';
  placeholder = placeholder || '0';
  return '<div class="iw pfx"><span class="ipfx">R</span><input type="number" id="' + id + '" placeholder="' + placeholder + '" value="' + value + '" min="0" step="any"></div>';
}

function pctInput(id, placeholder, value) {
  return '<div class="iw sfx"><input type="number" id="' + id + '" placeholder="' + placeholder + '" value="' + (value||'') + '" min="0" step="any"><span class="isfx">%</span></div>';
}

function plainInput(id, placeholder, value, suffix) {
  if (suffix) {
    return '<div class="iw sfx"><input type="number" id="' + id + '" placeholder="' + placeholder + '" value="' + (value||'') + '" min="0" step="any"><span class="isfx">' + suffix + '</span></div>';
  }
  return '<input type="number" id="' + id + '" placeholder="' + placeholder + '" value="' + (value||'') + '" min="0" step="any">';
}

function selectInput(id, options) {
  var opts = options.map(function(o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('');
  return '<select id="' + id + '">' + opts + '</select>';
}

function radioGroup(name, options) {
  return '<div class="radio-grp">' + options.map(function(o) {
    var checked = o[2] ? ' checked' : '';
    return '<label class="ro"><input type="radio" name="' + name + '" id="' + name + '_' + o[0] + '" value="' + o[0] + '"' + checked + '><label for="' + name + '_' + o[0] + '">' + o[1] + '</label></label>';
  }).join('') + '</div>';
}

function sliderField(id, label, min, max, step, value, hint, prefix, suffix, tooltip) {
  var pfx = prefix ? '<span class="ipfx">' + prefix + '</span>' : '';
  var sfx = suffix ? '<span class="isfx">' + suffix + '</span>' : '';
  var pfxClass = prefix ? ' pfx' : '';
  var sfxClass = suffix ? ' sfx' : '';
  var minLabel = prefix ? prefix + ' ' + min.toLocaleString() : min.toLocaleString();
  var maxLabel = prefix ? prefix + ' ' + max.toLocaleString() : max.toLocaleString() + (suffix ? suffix : '');
  var tipHTML = tooltip ? tip(tooltip) : '';
  return '<div class="field"><label>' + label + (hint ? ' <span class="hint">(' + hint + ')</span>' : '') + tipHTML + '</label>' +
    '<div class="sl-row">' +
    '<input type="range" id="' + id + '_sl" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '" oninput="document.getElementById(\'' + id + '\').value=this.value;syncSlider(this);window[\'_calc\']&&window[\'_calc\']()">' +
    '<div class="iw sl-num' + pfxClass + sfxClass + '">' + pfx + '<input type="number" id="' + id + '" value="' + value + '" min="' + min + '" max="' + max + '" step="' + step + '" oninput="var s=document.getElementById(\'' + id + '_sl\');if(s){s.value=this.value;syncSlider(s);}window[\'_calc\']&&window[\'_calc\']()">' + sfx + '</div>' +
    '</div>' +
    '<div class="sl-labels"><span>' + minLabel + '</span><span>' + maxLabel + '</span></div>' +
    '</div>';
}

function showResult(html) {
  var cta = _currentCTA ? renderCTA(_currentCTA) : '';
  document.getElementById('result-area').innerHTML = html + cta;
}

window._copyResult = function(btn, text) {
  if (!navigator.clipboard) {
    try { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); } catch(e){}
  } else {
    navigator.clipboard.writeText(text).catch(function(){});
  }
  btn.classList.add('copied');
  btn.innerHTML = ICONS['check-circle'] + ' Copied!';
  setTimeout(function() {
    btn.classList.remove('copied');
    btn.innerHTML = ICONS['copy'] + ' Copy result';
  }, 2200);
};

// ── Preset quick-pick chips ──────────────────────────────────────
function presetChips(fieldId, opts, label) {
  return '<div class="preset-chips" role="group" aria-label="' + (label || 'Quick select') + '">' +
    opts.map(function(o) {
      var v = typeof o === 'object' ? o.v : o;
      var l = typeof o === 'object' ? o.l : _chipLabel(v);
      return '<button type="button" class="preset-chip" onclick="window._setPreset(\'' + fieldId + '\',' + v + ',this)">' + l + '</button>';
    }).join('') + '</div>';
}
function _chipLabel(v) {
  if (v >= 1000000) return 'R' + (v/1000000) + 'M';
  if (v >= 1000)    return 'R' + (v/1000) + 'k';
  return String(v);
}
window._setPreset = function(fieldId, value, btn) {
  var el = document.getElementById(fieldId);
  if (!el) return;
  el.value = value;
  var sl = document.getElementById(fieldId + '_sl');
  if (sl) sl.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  if (window._calc) window._calc();
  if (btn) {
    var wrap = btn.closest('.preset-chips');
    if (wrap) wrap.querySelectorAll('.preset-chip').forEach(function(c) { c.classList.remove('active'); });
    btn.classList.add('active');
  }
};

function updateMobileBar(label, value) {
  var bar = document.getElementById('mobile-bar');
  if (!bar) return;
  bar.classList.add('visible');
  document.getElementById('mobile-bar-label').textContent = label;
  document.getElementById('mobile-bar-value').textContent = value;
}

function toggleAdv(btnId, sectionId) {
  var btn = document.getElementById(btnId);
  var section = document.getElementById(sectionId);
  if (!btn || !section) return;
  var open = section.classList.toggle('open');
  btn.classList.toggle('open', open);
}

function resultCard(label, value, sub, rows, barPct, barType) {
  var barHTML = '';
  if (barPct !== undefined) {
    barHTML = '<div class="rc-bar"><div class="rc-bar-label"><span>0%</span><span>100%</span></div><div class="bar-track"><div class="bar-fill ' + (barType||'bar-green') + '" style="width:' + Math.min(100,Math.max(0,barPct)) + '%"></div></div></div>';
  }
  var rowsHTML = '';
  if (rows && rows.length) {
    rowsHTML = '<div class="breakdown">' + rows.map(function(r) {
      if (!r) return '';
      var cls = r[2] ? ' ' + r[2] : '';
      var divider = r[3] ? ' br-divider' : '';
      return '<div class="br' + divider + '"><span class="bl">' + r[0] + '</span><span class="bv' + cls + '">' + r[1] + '</span></div>';
    }).join('') + '</div>';
  }
  var shareText = label + ': ' + value + (sub ? ' (' + sub + ')' : '') + ' — Mzanzi Cals (zacalc.co.za)';
  return '<div class="result-card">' +
    '<span class="rc-label">' + label + '</span>' +
    '<span class="rc-value">' + value + '</span>' +
    (sub ? '<span class="rc-sub">' + sub + '</span>' : '') +
    barHTML + rowsHTML +
    '<div class="rc-share-row">' +
      '<button class="rc-copy-btn" onclick="window._copyResult(this,\'' + shareText.replace(/'/g, "\\'") + '\')" aria-label="Copy result to clipboard">' +
        ICONS['copy'] + ' Copy result' +
      '</button>' +
    '</div>' +
    '</div>';
}

function on(ids, fn) {
  [].concat(ids).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.addEventListener('input', fn); el.addEventListener('change', fn); }
  });
}

// ── Trend charts ──────────────────────────────────────────────────
var _chartInstance = null;

function _rgba(hex, a) {
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return 'rgba('+r+','+g+','+b+','+a+')';
}

function renderCalcChart(h) {
  var wrap = document.getElementById('cv-chart');
  if (!wrap) return;
  if (!h || typeof Chart === 'undefined') { wrap.innerHTML = ''; return; }
  if (_chartInstance) { try { _chartInstance.destroy(); } catch(e){} _chartInstance = null; }

  wrap.innerHTML =
    '<div class="trend-card">' +
      '<div class="trend-head">' +
        '<p class="trend-title">' + h.title + '</p>' +
        (h.note ? '<p class="trend-note">' + h.note + '</p>' : '') +
      '</div>' +
      '<div class="trend-canvas-wrap"><canvas id="cv-trend-canvas"></canvas></div>' +
    '</div>';

  var ctx = document.getElementById('cv-trend-canvas');
  if (!ctx) return;

  var PALETTE = ['#007A4D','#FFB612','#DE3831','#002395'];
  var datasets;

  if (h.datasets) {
    datasets = h.datasets.map(function(ds, i) {
      var c = ds.color || PALETTE[i % PALETTE.length];
      return {
        label: ds.label, data: ds.data,
        borderColor: c, backgroundColor: i === 0 ? _rgba(c, 0.12) : 'transparent',
        pointBackgroundColor: c, tension: 0.35,
        fill: i === 0, pointRadius: 4, pointHoverRadius: 6, borderWidth: 2.5,
      };
    });
  } else {
    var c = h.color || '#007A4D';
    var isBar = h.type === 'bar';
    datasets = [{
      label: h.label || h.title, data: h.data,
      borderColor: c, backgroundColor: isBar ? _rgba(c, 0.75) : _rgba(c, 0.10),
      pointBackgroundColor: c, tension: 0.35,
      fill: !isBar, pointRadius: isBar ? 0 : 4, pointHoverRadius: isBar ? 0 : 6,
      borderWidth: isBar ? 0 : 2.5, borderRadius: isBar ? 5 : 0,
      hoverBackgroundColor: c,
    }];
  }

  var sfx = h.suffix || '', pfx = h.prefix || '';

  _chartInstance = new Chart(ctx, {
    type: h.type || 'line',
    data: { labels: h.labels, datasets: datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          display: !!(h.datasets && h.datasets.length > 1),
          labels: { font: { family: 'Inter, sans-serif', size: 11 }, color: '#4A4A68', boxWidth: 12, boxHeight: 2 }
        },
        tooltip: {
          callbacks: {
            label: function(ctx) { return ctx.dataset.label + ': ' + pfx + ctx.raw + sfx; }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#E8E8F0' },
          border: { display: false },
          ticks: { font: { family: 'Inter, sans-serif', size: 11 }, color: '#8888A8', maxRotation: 30 }
        },
        y: {
          grid: { color: '#E8E8F0' },
          border: { display: false },
          ticks: {
            font: { family: 'Inter, sans-serif', size: 11 }, color: '#8888A8',
            callback: function(v) { return pfx + v + sfx; }
          }
        }
      }
    }
  });
}

// ── Contextual CTAs ───────────────────────────────────────────────
var _currentCTA = null;

function renderCTA(cta) {
  var offers = cta.offers.map(function(o) {
    return '<a href="' + o.url + '" class="cta-offer-btn' + (o.secondary ? ' secondary' : '') + '" target="_blank" rel="noopener sponsored">' +
      o.label + ' <span class="cta-arrow">→</span></a>';
  }).join('');
  var ctaIconName = CTA_ICON_MAP[cta.icon] || 'lightbulb';
  var ctaIconSvg = ICONS[ctaIconName] || ICONS['lightbulb'];
  return '<div class="cta-card">' +
    '<div class="cta-head">' +
      '<span class="cta-icon" aria-hidden="true">' + ctaIconSvg + '</span>' +
      '<div><p class="cta-title">' + cta.title + '</p>' +
      '<p class="cta-sub">' + cta.sub + '</p></div>' +
    '</div>' +
    '<div class="cta-offers">' + offers + '</div>' +
    '<p class="cta-disc">Affiliate links · Opens in new tab · No extra cost to you</p>' +
  '</div>';
}

// ── Calculator Definitions ────────────────────────────────────────
var CALCS = [
  {
    id: 'paye', iconName: 'file-text', title: 'Income Tax / PAYE Calculator',
    icon: '🧾', cat: 'tax', popular: true,
    desc: 'Calculate your exact SARS income tax and monthly PAYE deduction for 2025/2026',
    info: '<h4>How SA income tax works</h4><p>South Africa uses a <strong>progressive tax system</strong> with 7 brackets ranging from 18% to 45%.</p><ul><li>Primary rebate: <strong>R17,235/year</strong> (everyone)</li><li>Secondary rebate: <strong>+R9,444</strong> (age 65+)</li><li>Medical aid credit: <strong>R364/month</strong> per member</li><li>Tax threshold 2025/26: <strong>R95,750</strong> (under 65)</li></ul>',
    faqs: [
      {q:'What is the tax threshold for 2025/2026?', a:'Individuals under 65 pay no tax if annual income is below R95,750. Age 65–74: R148,217. Age 75+: R165,689.'},
      {q:'How does the medical aid tax credit work?', a:'It\'s a direct credit against your tax (not a deduction). R364/month for main member, R364 for first dependent, R246 for each additional dependent. It reduces your tax rand-for-rand.'},
      {q:'Can I get a tax refund?', a:'Yes — if your employer deducted more PAYE than your actual liability (e.g. due to RA contributions or medical expenses), SARS will refund the difference when you file your annual return via eFiling.'}
    ],
    related: ['salary','retirement-annuity','medical-aid','uif'],
    cta: {
      icon: '💡', title: 'Save more tax this year',
      sub: 'RA contributions reduce your taxable income — file your return & claim every deduction',
      offers: [
        {label: 'File with TaxTim', url: 'https://www.taxtim.com/za/'},
        {label: 'Compare RA providers', url: 'https://www.10x.co.za/', secondary: true}
      ]
    },
    chart: {
      type: 'bar',
      title: 'Primary Tax Rebate — 2021 to 2027',
      note: 'SARS froze the rebate for three consecutive years (2021–2024), effectively increasing real tax burdens via bracket creep.',
      labels: ['2021/22', '2022/23', '2023/24', '2024/25', '2025/26', '2026/27'],
      data:   [15714,    15714,    15714,    16425,    17235,    17820],
      label: 'Primary rebate (R/year)',
      color: '#007A4D', prefix: 'R',
    },
    render: renderPAYE
  },
  {
    id: 'salary', iconName: 'briefcase', title: 'Salary / Take-Home Pay Calculator',
    icon: '💼', cat: 'tax', popular: true,
    desc: 'Full payslip breakdown: PAYE, UIF, medical aid, RA contributions and net take-home',
    info: '<h4>Payslip deductions explained</h4><ul><li><strong>PAYE</strong> — income tax deducted monthly</li><li><strong>UIF</strong> — 1% of salary (max R177.12/month)</li><li><strong>Medical aid</strong> — your contribution to your scheme</li><li><strong>Retirement fund</strong> — pension/provident/RA contribution</li></ul><p>SDL (Skills Development Levy) is paid entirely by your employer — it does not reduce your take-home.</p>',
    faqs: [
      {q:'What is UIF and how much is deducted?', a:'The Unemployment Insurance Fund provides income support if you lose your job. You contribute 1% of your monthly salary, capped at R177.12/month (earnings ceiling R17,712/month). Your employer also contributes 1%.'},
      {q:'Are retirement contributions tax deductible?', a:'Yes — up to 27.5% of the greater of your remuneration or taxable income, capped at R350,000/year. This reduces your taxable income and saves you tax.'}
    ],
    related: ['paye','uif','retirement-annuity'],
    cta: {
      icon: '💼', title: 'Maximise your take-home pay',
      sub: 'RA contributions & medical aid credits reduce your PAYE — file correctly and get every rand back',
      offers: [
        {label: 'File with TaxTim', url: 'https://www.taxtim.com/za/'},
        {label: 'Open an RA with 10X', url: 'https://www.10x.co.za/', secondary: true}
      ]
    },
    render: renderSalary
  },
  {
    id: 'vat', iconName: 'percent', title: 'VAT Calculator South Africa',
    icon: '🧮', cat: 'tax', popular: true,
    desc: 'Add or remove 15% VAT instantly — for invoices, quotes and shopping',
    info: '<h4>VAT in South Africa</h4><p>The standard VAT rate is <strong>15%</strong>. <strong>Zero-rated items</strong> (0% VAT) include brown bread, maize meal, milk, eggs, tinned pilchards, dried beans, edible oils, rice, and fruit &amp; vegetables.</p><p>VAT registration is mandatory when taxable supplies exceed <strong>R1 million/year</strong>.</p>',
    faqs: [
      {q:'How do I remove VAT from a price?', a:'Divide the VAT-inclusive price by 1.15. For example: R115 ÷ 1.15 = R100 net. The VAT is R15.'},
      {q:'What is the VAT rate in South Africa?', a:'The standard rate is 15%, applicable to most goods and services sold by VAT-registered vendors.'}
    ],
    related: ['loan','paye'],
    cta: {
      icon: '🧾', title: 'Automate your VAT returns',
      sub: 'VAT-compliant invoicing, submissions and payroll — built for South African businesses',
      offers: [
        {label: 'Try Sage Accounting', url: 'https://www.sage.com/en-za/products/sage-accounting/'},
        {label: 'Xero for SA businesses', url: 'https://www.xero.com/za/', secondary: true}
      ]
    },
    render: renderVAT
  },
  {
    id: 'uif', iconName: 'shield', title: 'UIF Calculator South Africa',
    icon: '🛡️', cat: 'tax', popular: true,
    desc: 'Calculate monthly UIF contributions and estimate your unemployment benefit payout',
    info: '<h4>UIF benefit claims</h4><p>You accumulate <strong>1 credit day per 4 days worked</strong> (about 17 days per month), up to a maximum of <strong>238 days</strong> benefit.</p><p><strong>Who can claim:</strong> unemployment, retrenchment, maternity (121 days), illness, and dependent benefits.</p><p>The replacement rate ranges from 38% to 60% — lower earners receive a higher percentage.</p>',
    faqs: [
      {q:'How long can I claim UIF for?', a:'The maximum is 238 days (about 8 months) for someone who contributed for 4 consecutive years. You earn 1 credit day for every 4 days worked as a contributor.'},
      {q:'Do domestic workers qualify for UIF?', a:'Yes. Since 2003, all employees including domestic workers who work more than 24 hours per month must be registered for UIF by their employer.'}
    ],
    related: ['salary','paye'],
    cta: {
      icon: '🛡️', title: 'Simplify payroll & UIF compliance',
      sub: 'Automate UIF submissions, payslips and SARS returns for your team',
      offers: [
        {label: 'Try SimplePay', url: 'https://www.simplepay.co.za/'},
        {label: 'PaySpace payroll', url: 'https://www.payspace.com/', secondary: true}
      ]
    },
    render: renderUIF
  },
  {
    id: 'bond', iconName: 'home', title: 'Bond / Home Loan Calculator',
    icon: '🏠', cat: 'property', popular: true,
    desc: 'Monthly repayments, total interest, and full year-by-year amortisation schedule',
    info: '<h4>Home loan rates in SA</h4><p>SA home loans are typically priced at <strong>prime ± x%</strong>. Current prime rate: <strong>11.00%</strong> (repo 7.50% + 3.5%).</p><p>Banks generally lend up to <strong>30% of gross monthly income</strong> for bond repayments. A 10–20% deposit significantly improves your rate.</p><p>Remember to budget for transfer duty, legal fees, and bond registration costs.</p>',
    faqs: [
      {q:'How much can I afford to borrow?', a:'South African banks typically limit bond repayments to 30% of your gross monthly income. A rough guide is that your maximum bond is approximately 100× your monthly gross salary.'},
      {q:'Should I make extra payments on my bond?', a:'Yes — extra payments directly reduce your outstanding capital, which significantly cuts total interest paid and shortens your loan term. Even R500/month extra on a R1.5M bond at 11% over 20 years saves over R300,000 in interest.'},
      {q:'What costs are involved in buying a property?', a:'Beyond the purchase price: transfer duty (if applicable), attorney/conveyancing fees, bond registration costs, rates clearance certificates, and moving costs. These can add 5–10% to the total outlay.'}
    ],
    related: ['transfer-duty','rental-yield','loan'],
    cta: {
      icon: '🏠', title: 'Ready to apply for a home loan?',
      sub: 'Get pre-approved and compare rates from SA\'s top banks — free, no obligation',
      offers: [
        {label: 'Apply via ooba', url: 'https://www.ooba.co.za/'},
        {label: 'BetterBond pre-approval', url: 'https://www.betterbond.co.za/', secondary: true}
      ]
    },
    chart: {
      type: 'line',
      title: 'SA Prime Lending Rate — 2020 to 2026',
      note: 'Home loans are priced at prime ± x%. Six SARB cuts from Sept 2024 cut 150bps off the 14-year peak. Every 25bps cut saves ~R150/month on a R1.5M bond.',
      labels: ['Apr 2020','Nov 2021','Nov 2022','May 2023','Sep 2024','Nov 2024','Jan 2025','May 2026'],
      data:   [7.00,      7.25,      10.50,     11.75,     11.25,     11.00,     10.75,     10.25],
      label: 'Prime rate (%)', color: '#007A4D', suffix: '%',
    },
    render: renderBond
  },
  {
    id: 'transfer-duty', iconName: 'clipboard', title: 'Transfer Duty Calculator',
    icon: '📋', cat: 'property', popular: false,
    desc: 'Calculate SARS transfer duty on property purchases for 2025/2026',
    info: '<h4>Transfer duty — key facts</h4><p><strong>Properties below R1,100,000 pay ZERO transfer duty</strong> in 2025/26.</p><p>Transfer duty does not apply if a VAT-registered developer is the seller — VAT (15%) applies instead (often included in the price).</p><p>Must be paid within 6 months of the transaction date.</p>',
    faqs: [
      {q:'What is the transfer duty threshold for 2025/26?', a:'No transfer duty is payable on properties purchased for R1,100,000 or less. Above this, transfer duty applies on a sliding scale up to 13% for properties over R12.1M.'},
      {q:'Do I pay transfer duty on a new development?', a:'Usually not. If the seller is a VAT-registered developer, VAT applies instead. However VAT is often built into the advertised price. Check with your attorney.'}
    ],
    related: ['bond','rental-yield'],
    cta: {
      icon: '📋', title: 'Need a conveyancing attorney?',
      sub: 'Connect with experienced SA property attorneys for transfers and bond registrations',
      offers: [
        {label: 'Find a property attorney', url: 'https://www.privateproperty.co.za/advice/property/articles/find-a-conveyancer/'},
        {label: 'Browse on Property24', url: 'https://www.property24.com/', secondary: true}
      ]
    },
    chart: {
      type: 'bar',
      title: 'Transfer Duty Zero-Rated Threshold',
      note: 'Properties below this price pay zero transfer duty. The threshold has risen by R350,000 (47%) since 2015/16 — a significant saving for first-time buyers.',
      labels: ['2015/16', '2017/18', '2019/20', '2021/22', '2023/24+'],
      data:   [750000,    900000,    900000,    1000000,   1100000],
      label: 'Zero-duty threshold (R)', color: '#007A4D', prefix: 'R',
    },
    render: renderTransferDuty
  },
  {
    id: 'rental-yield', iconName: 'building', title: 'Rental Yield Calculator',
    icon: '🏘️', cat: 'property', popular: false,
    desc: 'Calculate gross and net rental yield on South African investment properties',
    info: '<h4>What is a good yield in SA?</h4><p><strong>Gross yield</strong> = Annual rent ÷ Property value × 100. <strong>Net yield</strong> subtracts all costs.</p><p>South African residential property typically yields <strong>6–9% gross</strong> and <strong>3–5% net</strong> after expenses. Compare to the risk-free rate (fixed deposits at ~8–9%) when evaluating property investments.</p>',
    faqs: [
      {q:'What costs reduce my net yield?', a:'Rates & taxes, body corporate levies, insurance, maintenance (budget 1–1.5% of value annually), vacancy (typically 5–8%), managing agent fees (8–10% of rent), and bond interest if you have a mortgage.'}
    ],
    related: ['bond','transfer-duty','compound-interest'],
    cta: {
      icon: '🏘️', title: 'Manage or list your rental property',
      sub: 'Reach thousands of SA tenants — or let a professional manage your investment',
      offers: [
        {label: 'List on Private Property', url: 'https://www.privateproperty.co.za/'},
        {label: 'Advertise on Property24', url: 'https://www.property24.com/', secondary: true}
      ]
    },
    render: renderRentalYield
  },
  {
    id: 'building-cost', iconName: 'home', title: 'Building Cost Calculator South Africa',
    icon: '🏗️', cat: 'property', popular: false,
    desc: 'Estimate the full cost to build a new home — construction, architect, engineer & NHBRC fees',
    info: '<h4>SA Building Cost Rates (2026)</h4><p>Construction costs per m² vary widely by finish quality and province. The ASAQS (Association of SA Quantity Surveyors) publishes annual benchmarks.</p><ul><li><strong>Economy:</strong> R7,500–R9,500/m² — basic finishes</li><li><strong>Standard:</strong> R10,000–R14,000/m² — mid-range</li><li><strong>Prestige:</strong> R14,000–R19,000/m² — high-end</li><li><strong>Luxury:</strong> R19,000–R27,000/m² — top-spec</li></ul><p>Add 8–12% architect fees (SACAP), 2–3% structural engineer, NHBRC enrolment, and municipality plan approval. Always get 3 comparative quotes from registered builders.</p><p class="src-row"><span class="src-badge">ASAQS 2026</span><span class="src-badge">SACAP guidelines</span><span class="src-badge">NHBRC Act 29/1998</span></p>',
    faqs: [
      {q:'Do I need an architect to build a new home?', a:'Yes — a SACAP-registered architect or building professional is required to draw and certify building plans for new residential construction in South Africa. Plan approval from your local municipality is mandatory before any construction may begin.'},
      {q:'What is the NHBRC and why must I register?', a:'The National Home Builders Registration Council (NHBRC) is a statutory body that protects homeowners. All new homes must be enrolled with the NHBRC before construction. Developers/builders must be registered with the NHBRC. The fee is approximately 1.3% of the insured value plus a R2,500 registration fee. The enrolment provides a 5-year structural warranty and a 1-year finish warranty.'},
      {q:'How accurate is this estimate?', a:'This provides a planning-level estimate based on ASAQS published benchmarks. Actual costs depend heavily on site conditions (slope, soil), service connections, builder margins, and market demand. Always commission a professional quantity surveyor for a detailed estimate before applying for finance.'}
    ],
    related: ['bond','transfer-duty','rental-yield'],
    cta: {
      icon: '🏗️', title: 'Ready to build? Get a bond for your new home',
      sub: 'Many banks offer construction loans that pay out in stages as your home is built',
      offers: [
        {label: 'Apply via ooba', url: 'https://www.ooba.co.za/'},
        {label: 'SA Home Loans', url: 'https://www.sahomeloans.com/', secondary: true}
      ]
    },
    render: renderBuildingCost
  },
  {
    id: 'loan', iconName: 'credit-card', title: 'Loan / Personal Loan Calculator',
    icon: '💳', cat: 'loans', popular: true,
    desc: 'Monthly repayments, total interest and cost for any SA personal or business loan',
    info: '<h4>NCR maximum interest rates</h4><ul><li>Personal loans: repo + 21% = <strong>~28.5%</strong></li><li>Home loans: repo + 12% = <strong>~19.5%</strong></li><li>Credit cards: repo + 14% = <strong>~21.5%</strong></li></ul><p>Always compare your offered rate to these maximums. Better credit scores and secured loans attract lower rates.</p>',
    faqs: [
      {q:'What is the NCR maximum rate for personal loans?', a:'The NCR caps personal loan interest at the repo rate + 21%. At a repo rate of 7.5%, the maximum is 28.5% per annum. Most banks charge less than this for creditworthy borrowers.'}
    ],
    related: ['bond','vehicle-finance','compound-interest'],
    cta: {
      icon: '💸', title: 'Compare personal loan rates',
      sub: 'Find the lowest rate from SA\'s top lenders — check your rate without affecting your credit score',
      offers: [
        {label: 'Compare via Hippo', url: 'https://www.hippo.co.za/personal-loans/'},
        {label: 'Capitec personal loan', url: 'https://www.capitecbank.co.za/global-one/credit/personal-loans/', secondary: true}
      ]
    },
    chart: {
      type: 'line',
      title: 'NCR Maximum Unsecured Loan Rate — 2020 to 2026',
      note: 'Capped at Repo + 21% by the NCR. As the SARB cuts rates, the legal maximum falls — shop around for rates well below this ceiling.',
      labels: ['Apr 2020','Nov 2021','Nov 2022','May 2023','Sep 2024','Nov 2024','Jan 2025','May 2026'],
      data:   [24.50,     24.75,     28.00,     29.25,     28.75,     28.50,     28.25,     27.75],
      label: 'NCR max rate (%)', color: '#DE3831', suffix: '%',
    },
    render: renderLoan
  },
  {
    id: 'vehicle-finance', iconName: 'car', title: 'Vehicle Finance Calculator',
    icon: '🚗', cat: 'auto', popular: true,
    desc: 'Monthly car payments with balloon payment, deposit and interest calculation',
    info: '<h4>Vehicle finance in SA</h4><p>Most SA car loans are structured as an <strong>instalment sale</strong> at a fixed interest rate.</p><p>A <strong>balloon payment</strong> defers a lump sum (typically 20–30% of the vehicle price) to the end — it lowers monthly payments but you must settle it or refinance.</p><p>Comprehensive insurance is required by lenders for financed vehicles.</p>',
    faqs: [
      {q:'How does a balloon payment work?', a:'A balloon payment is a large sum deferred to the end of your loan term. It reduces monthly instalments but you still owe that amount at the end — you can pay it off, refinance it, or trade in the vehicle.'},
      {q:'72 months vs 60 months — which is better?', a:'Longer terms lower monthly payments but significantly increase total interest. A 72-month loan typically costs 20–35% more in interest than a 48-month loan for the same vehicle. Choose longer terms only if cash flow is the priority.'}
    ],
    related: ['loan','fuel'],
    cta: {
      icon: '🚗', title: 'Get vehicle finance pre-approval',
      sub: 'Compare rates from WesBank, ABSA, Nedbank & more — quick online application',
      offers: [
        {label: 'Apply via WesBank', url: 'https://www.wesbank.co.za/'},
        {label: 'ABSA vehicle finance', url: 'https://www.absa.co.za/loans-credit/vehicle-and-asset-finance/', secondary: true}
      ]
    },
    render: renderVehicleFinance
  },
  {
    id: 'trip-fuel', iconName: 'map', title: 'Trip Fuel Cost Calculator',
    icon: '🗺️', cat: 'auto', popular: true,
    desc: 'Plan any SA road trip — search start and end locations to get real driving distance and petrol cost',
    info: '<h4>How the Trip Calculator works</h4><p>Type any South African city or town in both fields and select from the suggestions. The calculator fetches the real <strong>road driving distance</strong> via OpenStreetMap routing (not a straight-line guess), then works out fuel cost at current DMRE prices.</p><p><strong>Current fuel prices (inland):</strong><br>Petrol 95: R26.63/L · Petrol 93: R25.80/L · Diesel 50ppm: R32.30/L</p><p>⚠️ Requires an internet connection for location search and routing.</p>',
    faqs: [
      {q: 'How accurate is the driving distance?', a: 'The calculator uses real road routing via OpenStreetMap/OSRM — it follows actual roads, not a straight line. Accuracy is typically within 2–5% of the actual driving distance.'},
      {q: 'Does this work offline?', a: 'No — location search, routing, and the map all require an internet connection. Works best when deployed online (e.g. via Netlify).'},
      {q: 'What fuel consumption should I enter?', a: 'Check your trip computer or owner\'s manual. Typical SA values: small hatchback 6–8 L/100km, sedan 8–10 L/100km, SUV/bakkie 10–14 L/100km.'}
    ],
    related: ['fuel', 'vehicle-finance'],
    cta: {
      icon: '🛡️', title: 'Is your car properly insured for this trip?',
      sub: 'Compare comprehensive car insurance quotes online — takes 2 minutes',
      offers: [
        {label: 'Compare via Hippo', url: 'https://www.hippo.co.za/car-insurance/'},
        {label: 'OUTsurance quote', url: 'https://www.outsurance.co.za/', secondary: true}
      ]
    },
    chart: {
      type: 'line',
      title: 'Petrol 95 Inland Price — 2020 to 2026',
      note: 'Source: DMRE inland pump prices. The Aug 2022 Russia-Ukraine peak (R26.74) has been matched again in 2026 due to rand weakness.',
      labels: ['Apr 2020','Apr 2021','Apr 2022','Aug 2022','Apr 2023','Apr 2024','May 2026'],
      data:   [13.57,     16.00,     21.60,     26.74,     20.32,     21.63,     26.63],
      label: 'Petrol 95 inland (R/L)', color: '#007A4D', prefix: 'R',
    },
    render: renderTripFuel
  },
  {
    id: 'fuel', iconName: 'droplets', title: 'Fuel Cost Calculator',
    icon: '⛽', cat: 'auto', popular: false,
    desc: 'Trip and monthly fuel costs based on current SA petrol and diesel prices',
    info: '<h4>SA fuel prices</h4><p>Fuel prices are set monthly by the <strong>Department of Mineral Resources and Energy (DMRE)</strong>, effective the first Wednesday of each month.</p><p>Inland (Gauteng) prices are slightly higher than coastal due to transport costs. Current petrol 95 inland: <strong>R21.45/litre</strong>.</p>',
    faqs: [
      {q:'When do South African fuel prices change?', a:'Prices are adjusted on the first Wednesday of each month, based on international crude oil prices (Brent) and the ZAR/USD exchange rate over the previous month.'}
    ],
    related: ['vehicle-finance'],
    cta: {
      icon: '🛡️', title: 'Compare car insurance quotes',
      sub: 'Protect your vehicle — get comprehensive cover quotes from top SA insurers in minutes',
      offers: [
        {label: 'Compare via Hippo', url: 'https://www.hippo.co.za/car-insurance/'},
        {label: 'OUTsurance quote', url: 'https://www.outsurance.co.za/', secondary: true}
      ]
    },
    chart: {
      type: 'line',
      title: 'SA Fuel Price History — 2020 to 2026',
      note: 'Source: DMRE inland pump prices. Driven by international crude (Brent) and the ZAR/USD exchange rate.',
      labels: ['Apr 2020','Apr 2021','Apr 2022','Aug 2022','Apr 2023','Apr 2024','May 2026'],
      datasets: [
        { label: 'Petrol 95 (R/L)', data: [13.57, 16.00, 21.60, 26.74, 20.32, 21.63, 26.63], color: '#007A4D' },
        { label: 'Diesel 50ppm (R/L)', data: [10.98, 13.90, 24.55, 29.20, 22.50, 23.80, 32.30], color: '#FFB612' },
      ],
      prefix: 'R', suffix: '/L',
    },
    render: renderFuel
  },
  {
    id: 'compound-interest', iconName: 'trending-up', title: 'Compound Interest Calculator',
    icon: '📈', cat: 'investment', popular: false,
    desc: 'See how your investments grow over time with compound interest and regular contributions',
    info: '<h4>SA investment options</h4><ul><li><strong>TFSA</strong>: R36,000/year, all growth tax-free, lifetime limit R500,000</li><li><strong>RA</strong>: Tax-deductible contributions, locked in until age 55</li><li><strong>Unit trusts / ETFs</strong>: Flexible, no limits</li></ul><p>JSE equities have historically returned <strong>CPI + 7%</strong> over 20+ year periods.</p>',
    faqs: [
      {q:'What is a realistic long-term return in SA?', a:'South African equity funds have historically returned roughly CPI + 7% per annum over long periods. Balanced funds return around CPI + 4–5%. Always compare returns to inflation — a 10% return with 6% inflation gives only 4% real growth.'},
      {q:'How does the Tax-Free Savings Account work?', a:'A TFSA lets you invest R36,000/year (lifetime cap R500,000) with all growth, dividends, and withdrawals completely tax-free. It\'s one of the most powerful savings tools for South Africans.'}
    ],
    related: ['retirement-annuity','inflation','loan'],
    cta: {
      icon: '📈', title: 'Start growing your money today',
      sub: 'Open a Tax-Free Savings Account (TFSA) or RA from just R100/month — zero brokerage',
      offers: [
        {label: 'Open with Easy Equities', url: 'https://www.easyequities.co.za/'},
        {label: 'Compare RAs via 10X', url: 'https://www.10x.co.za/', secondary: true}
      ]
    },
    render: renderCompoundInterest
  },
  {
    id: 'retirement-annuity', iconName: 'landmark', title: 'Retirement Annuity Tax Saving',
    icon: '🏦', cat: 'investment', popular: false,
    desc: 'Calculate exactly how much tax SARS saves you when you contribute to an RA',
    info: '<h4>RA tax deduction rules</h4><p>You can deduct <strong>27.5%</strong> of the greater of your taxable income or remuneration, up to <strong>R350,000/year</strong>.</p><p>Example: If you pay 36% tax and contribute R1,000 to your RA, your net cost is only R640. SARS effectively subsidises R360.</p>',
    faqs: [
      {q:'When can I access my RA?', a:'Retirement annuities may only be accessed from age 55. At retirement, you can take up to one-third as a lump sum (first R550,000 is tax-free per lifetime) and must invest the balance in a living or life annuity.'},
      {q:'What is the maximum RA deduction?', a:'You can deduct up to 27.5% of the greater of your taxable income or gross remuneration, capped at R350,000 per year. Excess contributions are carried forward to future tax years.'}
    ],
    related: ['paye','compound-interest','salary'],
    cta: {
      icon: '🏦', title: 'Open a Retirement Annuity',
      sub: 'Low-fee RAs from 10X and Easy Equities — save tax now while building your retirement nest egg',
      offers: [
        {label: 'Start an RA with 10X', url: 'https://www.10x.co.za/'},
        {label: 'Easy Equities RA', url: 'https://www.easyequities.co.za/tax-free-savings-account/', secondary: true}
      ]
    },
    render: renderRetirementAnnuity
  },
  {
    id: 'cgt', iconName: 'bar-chart', title: 'Capital Gains Tax Calculator',
    icon: '📊', cat: 'investment', popular: false,
    desc: 'Calculate CGT on shares, investment property, or any asset disposal in South Africa',
    info: '<h4>How CGT works</h4><p>Only <strong>40%</strong> of your net capital gain (after exclusions) is included in taxable income. You then pay your marginal income tax rate on that amount.</p><p><strong>Annual exclusion:</strong> R40,000 per individual.<br><strong>Primary residence:</strong> First R2M of gain excluded.<br><strong>Maximum effective CGT rate:</strong> 18% (45% × 40%).</p>',
    faqs: [
      {q:'Do I pay CGT when I sell shares?', a:'Yes — share disposals are subject to CGT (unless SARS reclassifies you as a trader, in which case it\'s normal income). The R40,000 annual exclusion applies. Long-term investors are generally taxed as capital gains, not income.'},
      {q:'What is the CGT exclusion on my primary residence?', a:'The first R2 million of gain on disposing of your primary residence is excluded from CGT. Gains above R2M are subject to CGT at the normal inclusion rate.'}
    ],
    related: ['paye','compound-interest','retirement-annuity'],
    cta: {
      icon: '💡', title: 'Need help with your SARS return?',
      sub: 'Declare CGT correctly and claim every allowable exclusion — let a pro handle it',
      offers: [
        {label: 'File with TaxTim', url: 'https://www.taxtim.com/za/'},
        {label: 'Find a tax practitioner', url: 'https://www.sait.org.za/find-a-tax-practitioner', secondary: true}
      ]
    },
    render: renderCGT
  },
  {
    id: 'medical-aid', iconName: 'heart', title: 'Medical Aid Tax Credit',
    icon: '🏥', cat: 'tax', popular: false,
    desc: 'Calculate your monthly SARS medical scheme fees tax credit for 2025/2026',
    info: '<h4>2025/26 Medical Credits</h4><ul><li>Main member: <strong>R364/month</strong></li><li>First dependant: <strong>R364/month</strong></li><li>Each additional dependant: <strong>R246/month</strong></li></ul><p>This is a credit against your tax — not a deduction from income. It reduces your PAYE rand-for-rand regardless of your income level.</p>',
    faqs: [
      {q:'Can I claim additional medical expense deductions?', a:'Yes. Qualifying out-of-pocket medical expenses (above the standard credit) may attract additional relief. The excess of medical expenses over 3× the annual credit, or the full excess for disabled persons, can be claimed on your annual return.'}
    ],
    related: ['paye','salary'],
    cta: {
      icon: '❤️', title: 'Compare medical aid plans',
      sub: 'Find the best cover at the lowest premium — free side-by-side comparison of all major SA schemes',
      offers: [
        {label: 'Compare on Hippo', url: 'https://www.hippo.co.za/medical-aid/'},
        {label: 'Discovery Health quote', url: 'https://www.discovery.co.za/medical-aid/medical-aid-plans', secondary: true}
      ]
    },
    chart: {
      type: 'line',
      title: 'Medical Aid Tax Credit (main member) per month',
      note: 'Source: SARS Budget Reviews. A direct rand-for-rand credit against your PAYE — unchanged for two years (2024–2026) before a R12 increase in 2026/27.',
      labels: ['2019/20','2020/21','2021/22','2022/23','2023/24','2024/25','2025/26','2026/27'],
      data:   [310,      310,      319,      332,      347,      364,      364,      376],
      label: 'Monthly credit per main member (R)', color: '#007A4D', prefix: 'R',
    },
    render: renderMedicalAid
  },
  {
    id: 'overtime', iconName: 'clock', title: 'Overtime Pay Calculator',
    icon: '⏰', cat: 'tax', popular: false,
    desc: 'Calculate overtime pay under the Basic Conditions of Employment Act (BCEA)',
    info: '<h4>BCEA overtime rules</h4><p>Applies to employees earning below <strong>R241,110/year</strong>. Above this threshold, overtime rates must be negotiated.</p><ul><li>Weekday OT: <strong>1.5×</strong> hourly rate</li><li>Sunday (non-working day): <strong>2×</strong> hourly rate</li><li>Public holiday: <strong>2×</strong> hourly rate</li><li>Maximum OT: 10 hours/week</li></ul>',
    faqs: [
      {q:'Who is covered by BCEA overtime provisions?', a:'Employees earning below R241,110 per annum. Those above this threshold must negotiate overtime pay with their employer as the BCEA minimum rates do not apply.'},
      {q:'How many overtime hours can I be required to work?', a:'The BCEA limits overtime to 10 hours per week. No employee may work more than 12 hours in any day including overtime.'}
    ],
    related: ['salary','paye','uif'],
    cta: {
      icon: '⚖️', title: 'Stay BCEA compliant',
      sub: 'Automate overtime calculations, payslips and SARS submissions for your team',
      offers: [
        {label: 'Try SimplePay', url: 'https://www.simplepay.co.za/'},
        {label: 'PaySpace HR & payroll', url: 'https://www.payspace.com/', secondary: true}
      ]
    },
    chart: {
      type: 'bar',
      title: 'BCEA Earnings Threshold — 2019 to 2024',
      note: 'Employees below this annual earnings threshold are entitled to statutory overtime rates. Gazetted annually by the Minister of Employment & Labour.',
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      data:   [205433, 205433, 205433, 211596, 224080, 241110],
      label: 'Threshold (R/year)', color: '#FFB612', prefix: 'R',
    },
    render: renderOvertime
  },
  {
    id: 'electricity', iconName: 'zap', title: 'Electricity Cost Calculator',
    icon: '⚡', cat: 'utilities', popular: false,
    desc: 'Calculate monthly Eskom electricity costs based on your kWh usage and tariff type',
    info: '<h4>Eskom 2025/26 Tariffs</h4><p>Eskom direct customer average standard rate: <strong>R2.21/kWh</strong> (effective 1 April 2025 — a 12.74% increase).</p><p>Most South Africans receive electricity through their municipality, which buys wholesale from Eskom and adds a margin. Municipal rates vary by area: typically <strong>R2.50–R4.50/kWh</strong>. Cape Town and Johannesburg average around R3.50/kWh.</p><ul><li>Eskom increased tariffs by <strong>12.74%</strong> from April 2025</li><li>Municipal bulk customers: <strong>11.32%</strong> increase from July 2025</li><li>Free Basic Electricity: <strong>50 kWh/month</strong> for qualifying low-income households</li></ul>',
    faqs: [
      {q:'How do I find my actual tariff rate?', a:'Check your electricity bill — it shows your rate in c/kWh. Eskom direct customers can check eskom.co.za/distribution/tariffs-and-charges/. Municipal customers should check their municipality\'s website as rates differ per town.'},
      {q:'What is the average South African household electricity consumption?', a:'The average South African household uses approximately 600–900 kWh per month, depending on whether they have electric geysers, air conditioning and electric stoves. An electric geyser alone uses about 150–300 kWh/month.'},
      {q:'Why is my municipal rate higher than Eskom\'s published rate?', a:'Municipalities buy electricity in bulk from Eskom and add their own margins to cover infrastructure and service costs. This typically results in rates 30–80% higher than Eskom\'s published tariffs.'}
    ],
    related: ['fuel','loan'],
    cta: {
      icon: '☀️', title: 'Cut your electricity bill with solar',
      sub: 'Compare quotes from vetted SA solar installers — typical payback period 3–5 years',
      offers: [
        {label: 'Get solar quotes', url: 'https://www.hohmenergy.co.za/'},
        {label: 'Compare via MyBroadband Solar', url: 'https://mybroadband.co.za/solar/', secondary: true}
      ]
    },
    chart: {
      type: 'bar',
      title: 'Eskom Tariff Increases Granted by NERSA',
      note: 'Source: NERSA decisions. The 2023/24 increase of 18.65% was the largest in a decade. Cumulatively, tariffs have risen ~650% since 2010.',
      labels: ['2019/20','2020/21','2021/22','2022/23','2023/24','2024/25','2025/26'],
      data:   [9.41,     6.90,     15.06,    9.61,     18.65,    12.74,    12.74],
      label: 'Tariff increase (%)', color: '#FFB612', suffix: '%',
    },
    render: renderElectricity
  },
  {
    id: 'inflation', iconName: 'activity', title: 'Inflation / CPI Calculator',
    icon: '📉', cat: 'investment', popular: false,
    desc: 'Calculate the real value of money over time using Stats SA CPI data (2000–2025)',
    info: '<h4>SA inflation context</h4><p>The SARB targets CPI inflation within the <strong>3–6% band</strong>. South Africa has historically experienced relatively high inflation.</p><p>R1,000 in 2000 is equivalent to approximately <strong>R3,740</strong> in 2025 — a loss of 73% purchasing power over 25 years.</p>',
    faqs: [
      {q:'What is South Africa\'s current inflation rate?', a:'South Africa\'s current CPI inflation rate is approximately 5.1%. The SARB uses monetary policy (repo rate adjustments) to keep inflation within the 3–6% target band.'},
      {q:'How does inflation affect my savings?', a:'If your savings account pays 5% and inflation is 6%, your real (inflation-adjusted) return is approximately −1%. Your money buys less each year. This is why equity investments targeting real returns above inflation are important for long-term wealth building.'}
    ],
    related: ['compound-interest','retirement-annuity'],
    cta: {
      icon: '📈', title: 'Beat inflation — invest smarter',
      sub: 'SA equities have historically returned CPI + 7%. Start building real wealth today',
      offers: [
        {label: 'Open a TFSA with Easy Equities', url: 'https://www.easyequities.co.za/'},
        {label: 'Low-fee ETFs on Satrix', url: 'https://www.satrix.co.za/', secondary: true}
      ]
    },
    chart: {
      type: 'line',
      title: 'SA CPI Inflation vs SARB Target Band — 2016 to 2025',
      note: 'Source: Stats SA. SARB target: 3–6%. 2022 breached the top of the band, forcing aggressive rate hikes. 2025 is back at the lower end.',
      labels: ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
      datasets: [
        { label: 'CPI inflation (%)',    data: [6.3, 5.3, 4.7, 4.1, 3.3, 4.5, 6.9, 6.0, 4.4, 3.4], color: '#007A4D' },
        { label: 'SARB target top (6%)', data: [6,   6,   6,   6,   6,   6,   6,   6,   6,   6  ], color: '#DE3831', tension: 0 },
      ],
      suffix: '%',
    },
    render: renderInflation
  }
,{
  id: 'aps', iconName: 'graduation-cap', title: 'APS / Matric Score Calculator',
  icon: '🎓', cat: 'education', popular: true,
  desc: 'Calculate your NSC Admission Point Score and see which of South Africa\'s 26 public universities you qualify for',
  info: '<h4>How APS works</h4><p>Your <strong>Admission Point Score (APS)</strong> is the sum of the NSC achievement levels for your best 6 subjects, <em>excluding</em> Life Orientation. The maximum APS is <strong>42</strong> (6 × Level 7).</p><table class="aps-scale-table"><tr><th>%</th><th>Level</th><th>Description</th></tr><tr><td>80–100</td><td>7</td><td>Outstanding</td></tr><tr><td>70–79</td><td>6</td><td>Meritorious</td></tr><tr><td>60–69</td><td>5</td><td>Substantial</td></tr><tr><td>50–59</td><td>4</td><td>Adequate</td></tr><tr><td>40–49</td><td>3</td><td>Moderate</td></tr><tr><td>30–39</td><td>2</td><td>Elementary</td></tr><tr><td>0–29</td><td>1</td><td>Not Achieved</td></tr></table>',
  faqs: [
    {q:'Does Life Orientation count toward my APS?', a:'No. Life Orientation (LO) is a compulsory subject but is excluded from your APS calculation at all 26 public universities. Your APS is based on your best 6 other subjects.'},
    {q:'What APS do I need for medicine?', a:'Medicine is the most competitive programme. UCT and Wits typically require an APS of 40+ with exceptional marks in Physical Sciences and Mathematics. Stellenbosch requires a perfect or near-perfect APS. Most medical schools have additional selection requirements beyond APS.'},
    {q:'What if I have more than 6 subjects?', a:'Your best 6 subjects (excluding LO) are used. If you take 7 electives plus HL, FAL, Math and LO, only your 6 highest-scoring non-LO subjects count toward your APS.'}
  ],
  related: ['nsfas','loan','compound-interest'],
  cta: {
    icon: '🎓', title: 'Fund your university studies',
    sub: 'Apply for bursaries and student loans — many are available beyond NSFAS',
    offers: [
      {label: 'Apply for NSFAS', url: 'https://www.nsfas.org.za/'},
      {label: 'Find bursaries on Bursaries SA', url: 'https://www.bursariesportal.co.za/', secondary: true}
    ]
  },
  render: renderAPS
},{
  id: 'two-pot', iconName: 'layers', title: 'Two-Pot Retirement Calculator',
  icon: '🏦', cat: 'investment', featured: true,
  desc: 'South Africa\'s most accurate Two-Pot calculator — exact withdrawal tax, seeding, pot projections and the real rand cost of accessing your savings pot early',
  info: '<h4>The Three-Pot System Explained (1 Sep 2024)</h4>' +
    '<p>From <strong>1 September 2024</strong> all new retirement fund contributions are split into three pots:</p>' +
    '<ul>' +
    '<li><strong>Savings Pot (1/3)</strong> — accessible once per tax year, minimum R2,000 withdrawal. Taxed at your marginal rate.</li>' +
    '<li><strong>Retirement Pot (2/3)</strong> — locked until retirement. Cannot be accessed for any reason before age 55+.</li>' +
    '<li><strong>Vested Pot</strong> — all savings before 31 Aug 2024 (less seeding). Old rules apply on resignation/retirement.</li>' +
    '</ul>' +
    '<p><strong>Seeding:</strong> On 1 Sept 2024, <em>10% of your pre-Sept 2024 balance (max R30,000)</em> was automatically moved into your Savings Pot.</p>' +
    '<p><strong>Tax Process:</strong> Your fund requests a SARS Tax Directive. The withdrawal is added to your annual taxable income. Admin fees are deducted first, then tax is withheld at your marginal rate. SARS also deducts any outstanding tax debt.</p>' +
    '<p class="src-row"><span class="src-badge">Revenue Laws Amendment Act 12/2024</span><span class="src-badge">Pension Funds Act 31/2024</span><span class="src-badge">SARS Two-Pot</span><span class="src-badge">National Treasury FAQ Aug 2024</span></p>',
  faqs: [
    {q:'How much tax will I pay on a Two-Pot withdrawal?', a:'Your withdrawal is added to your annual employment income and taxed at your combined marginal rate (18%–45%). There is no separate tax table or R27,500 exemption — it is fully included in your income for the year. High earners pay much more. An admin fee (typically R250–R350 + VAT) is deducted before tax. The calculator shows you the exact rand amount you will actually receive.'},
    {q:'Can I withdraw from my savings pot more than once per year?', a:'No. You may make only ONE withdrawal per tax year (1 March to end of February). You can withdraw the entire savings pot balance in one go, or a partial amount — but you cannot make a second withdrawal until the next tax year.'},
    {q:'What was the seeding amount and when did it happen?', a:'On 1 September 2024 (T-Day), your fund automatically transferred 10% of your accumulated retirement savings as at 31 August 2024 into your Savings Pot. This was capped at R30,000. GEPF defined-benefit members were capped at R25,000. No action was required — it happened automatically.'},
    {q:'When can I access my retirement pot?', a:'Never before retirement age (typically age 55 under the Pension Funds Act). The retirement pot is locked regardless of resignation, retrenchment, financial hardship or any other reason. This is the core design of the system — protecting two-thirds of contributions for actual retirement.'},
    {q:'Is GEPF (government employees) subject to the Two-Pot rules?', a:'Yes — GEPF is fully subject to the Two-Pot system. For every year of future pensionable service, 4 months are allocated to the savings component and 8 months to the retirement component. GEPF members who withdraw their full savings pot annually lose 4 months of pension service per year. Processing time: up to 60 working days.'},
    {q:'What happens to my savings pot at retirement?', a:'Any remaining savings pot balance at retirement can be taken as a cash lump sum (unlike the retirement pot which must be annuitised if over R165,000). This makes it a useful tax-deferred savings vehicle if you don\'t withdraw early — you get it tax-free at retirement within the R550,000 lump sum table.'},
    {q:'What admin fees do the major providers charge?', a:'Old Mutual: R250–R300; Momentum: R250 (digital) / R350 (paper); 10X: R300 excl. VAT; Sanlam: R330 + VAT; GEPF: no direct admin fee cited. Fees are deducted BEFORE tax is calculated. The FSCA has flagged concerns about high fees and is reviewing.'},
    {q:'Does my vested pot disappear?', a:'No. Your vested pot (all savings before 1 September 2024, less the seeding amount) remains intact under the old rules. It is preserved until retirement, resignation, retrenchment or death — the same rules as before September 2024. It is NOT split going forward.'}
  ],
  related: ['retirement-annuity','compound-interest','paye'],
  cta: {
    icon: '🏦', title: 'Don\'t pay more tax than you need to',
    sub: 'Low-fee RAs mean more in your retirement pot — compare SA\'s top-rated providers',
    offers: [
      {label: 'Invest with 10X (low fees)', url: 'https://www.10x.co.za/'},
      {label: 'Allan Gray retirement fund', url: 'https://www.allangray.co.za/', secondary: true}
    ]
  },
  render: renderTwoPot
},{
  id: 'nsfas', iconName: 'book-open', title: 'NSFAS Eligibility Calculator',
  icon: '📚', cat: 'education', popular: true,
  desc: 'Check if your household qualifies for NSFAS bursary funding — the R600,000 university and R350,000 TVET income thresholds explained',
  info: '<h4>NSFAS in brief</h4><p>The <strong>National Student Financial Aid Scheme</strong> provides bursaries (not loans) to qualifying South African students at public universities and TVET colleges.</p><ul><li>University students: household income ≤ <strong>R600,000/year</strong></li><li>TVET students: household income ≤ <strong>R350,000/year</strong></li><li>Maximum funding: up to <strong>R80,000+/year</strong> (accommodation, living, books, transport)</li></ul>',
  faqs: [
    {q:'Is NSFAS a loan or a bursary?', a:'NSFAS funding is a bursary — you do not repay it. Previous NSFAS loans issued before 2018 were converted to bursaries. Post-2018 NSFAS funding for DHET-funded programmes is entirely non-repayable if you pass your modules.'},
    {q:'What is the NSFAS application window?', a:'NSFAS applications typically open in August and close in November for the following academic year. Apply early — late applications are not accepted. Apply via the NSFAS website using your ID number and myNSFAS account.'},
    {q:'What documents do I need to apply?', a:'South African ID, parents\'/guardians\' salary slips or SASSA letter (if applicable), proof of household income (IRP5 or employer letter), proof of registration at a DHET-funded institution, and banking details.'}
  ],
  related: ['aps','loan'],
  cta: {
    icon: '📚', title: 'Apply for NSFAS and bursaries',
    sub: 'Don\'t miss the window — apply before November for the following year\'s funding',
    offers: [
      {label: 'Apply on nsfas.org.za', url: 'https://www.nsfas.org.za/'},
      {label: 'Find bursaries on Bursaries Portal', url: 'https://www.bursariesportal.co.za/', secondary: true}
    ]
  },
  render: renderNSFAS
},
{
  id: 'sassa', iconName: 'heart', title: 'SASSA Grant Eligibility Calculator',
  icon: '❤️', cat: 'grants', popular: true,
  desc: 'Check which SASSA social grants you or your family qualify for — old age, disability, child support, care dependency and more',
  info: '<h4>SASSA grants overview (2026)</h4><ul><li><strong>Old Age Grant:</strong> R2,190/month (60–74), R2,210/month (75+)</li><li><strong>Disability Grant:</strong> R2,190/month (18–59, SASSA medical assessment)</li><li><strong>Child Support Grant:</strong> R560/month per child (0–18)</li><li><strong>Foster Child Grant:</strong> R1,180/month per child (court order required)</li><li><strong>Care Dependency Grant:</strong> R2,190/month (child with severe disability)</li><li><strong>Grant-in-Aid:</strong> R530/month (additional for those needing full-time care)</li><li><strong>SRD Grant:</strong> R370/month (temporary relief while awaiting other grants)</li></ul>',
  faqs: [
    {q:'What income can I earn and still get an Old Age Grant?', a:'For the Old Age Grant (2026): single person income ≤ R93,192/year (R7,766/month). Married couple combined ≤ R186,384/year. Asset test also applies — movable assets ≤ R316,800 (single) or ≤ R633,600 (married). Your home does not count.'},
    {q:'How do I apply for SASSA grants?', a:'Visit your nearest SASSA office with: SA ID, proof of income (payslip, bank statements, or affidavit if unemployed), proof of residence, and bank details. SASSA also has a WhatsApp line (082 046 8553) and the SRD grant can be applied for online at srd.sassa.gov.za.'},
    {q:'Can I receive more than one SASSA grant?', a:'Usually only one main grant per person. However, you can receive the Grant-in-Aid in addition to an Old Age or Disability Grant if you need full-time care. Caregivers can receive a Child Support Grant for each qualifying child they care for.'}
  ],
  related: ['uif','nsfas'],
  cta: { icon: '❤️', title: 'Apply for SASSA grants', sub: 'Visit your nearest SASSA office or apply online for the SRD grant', offers: [
    {label:'SRD Grant online application', url:'https://srd.sassa.gov.za/'},
    {label:'Find a SASSA office', url:'https://www.sassa.gov.za/Pages/Office-Locator.aspx', secondary:true}
  ]},
  render: renderSASSA
},
{
  id: 'appliances', iconName: 'zap', title: 'Home Appliance Electricity Calculator',
  icon: '🔌', cat: 'utilities', popular: true,
  desc: 'Calculate your monthly electricity bill per appliance — see exactly which devices are costing you the most and where to save',
  info: '<h4>Where your electricity goes</h4><p>In a typical SA household:</p><ul><li><strong>Geyser</strong> — 40–50% of your electricity bill</li><li><strong>Stove/oven</strong> — 10–15%</li><li><strong>Air conditioner</strong> — 10–20% (if used)</li><li><strong>Fridge/freezer</strong> — 8–12% (runs 24/7)</li><li><strong>Lighting</strong> — 5–10%</li></ul><p>Switching your geyser to a heat pump or solar can cut your bill by 30–40%.</p>',
  faqs: [
    {q:'What is the biggest electricity user in my home?', a:'In most South African homes, the geyser accounts for 40–50% of electricity consumption. A standard 150L geyser on for 2–3 hours/day uses about 6–10 kWh/day. Installing a timer (cutting heating to off-peak hours) alone can reduce geyser electricity use by 30%.'},
    {q:'How do I read my prepaid electricity meter?', a:'Press the 0 button or # to see your current balance in kWh. Divide your prepaid purchase amount by the displayed kWh to get your effective rate (including admin fees). Compare this to the standard Eskom/muni rate to check for anomalies.'},
    {q:'Will solar reduce my bill?', a:'A typical 3–5kWp rooftop solar system with battery can reduce grid electricity consumption by 60–80%, paying back the installation cost in 3–5 years at current electricity prices. The Section 25C tax credit allows 25% of solar installation cost (up to R15,000) as a tax rebate.'}
  ],
  related: ['electricity','loan'],
  cta: { icon: '☀️', title: 'Consider solar and save', sub: 'Solar PV + battery payback is 3–5 years at current electricity rates', offers: [
    {label:'Get solar quotes on HeatMap', url:'https://www.heatmap.co.za/'},
    {label:'Compare inverters & batteries', url:'https://www.solar-shop.co.za/', secondary:true}
  ]},
  render: renderAppliances
}
];

// ═══════════════════════════════════════════════════════════════════
//  CALCULATOR RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

// 1. PAYE / Income Tax
function renderPAYE() {
  document.getElementById('calc-form').innerHTML =
    sliderField('paye_income','Annual gross income', 50000, 3000000, 1000, 400000, '', 'R',
      null, 'Your total salary/wages before any deductions. Use your CTC (cost to company) if unsure.') +
    presetChips('paye_income',[{l:'R5k/mo',v:60000},{l:'R10k/mo',v:120000},{l:'R20k/mo',v:240000},{l:'R30k/mo',v:360000},{l:'R50k/mo',v:600000},{l:'R80k/mo',v:960000}],'Monthly salary quick-pick') +
    '<div class="frow">' +
      field('paye_age', 'Age group', selectInput('paye_age', [['30','Under 65'],['65','65 – 74'],['75','75 or older']]),
        null, 'Determines your rebate. Age 65+ earns a secondary rebate of R9,444/year.') +
      field('paye_med', 'Medical aid members', selectInput('paye_med',[['0','0 — no medical aid'],['1','1 member (just me)'],['2','2 members'],['3','3 members'],['4','4 members'],['5','5 members'],['6','6+ members']]),'incl. yourself',
        'Include yourself + all dependants. Each member earns a monthly medical tax credit of R364 (main) or R246 (dependants) against your PAYE.') +
    '</div>' +
    '<button class="adv-toggle" id="paye_adv_btn" onclick="toggleAdv(\'paye_adv_btn\',\'paye_adv\')" type="button">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' +
      'Advanced options' +
      '<svg class="adv-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>' +
    '</button>' +
    '<div class="adv-section" id="paye_adv">' +
      field('paye_ra', 'Annual RA / pension contribution', moneyInput('paye_ra','0','0'), 'optional',
        'Contributions to a Retirement Annuity, pension or provident fund are tax-deductible up to 27.5% of income (max R350,000/year).') +
    '</div>';

  function calc() {
    var income = num('paye_income');
    var age = intval('paye_age') || 30;
    var med = num('paye_med') || 0;
    var ra = num('paye_ra') || 0;
    var raDeduct = Math.min(ra, Math.min(income * D.raRate, D.raCap));
    var taxable = Math.max(0, income - raDeduct);
    var r = calcTax(taxable, age, med);
    var tax = r.tax;
    var monthly = tax / 12;
    var netMonthly = (income / 12) - monthly;
    var effRate = income > 0 ? (tax / income) * 100 : 0;
    var takePct = income > 0 ? (netMonthly / (income/12)) * 100 : 100;
    var taxPct = 100 - takePct;

    var badgeText = effRate < 15 ? '✓ Low effective rate' : effRate < 30 ? '~ Average rate' : '▲ High effective rate';
    var badgeType = effRate < 15 ? 'good' : effRate < 30 ? 'warn' : 'high';

    var html =
      '<div class="result-card">' +
        '<span class="rc-label">Monthly Take-Home Pay</span>' +
        '<span class="rc-value">' + R(netMonthly) + '</span>' +
        '<span class="rc-sub">After PAYE deduction · Gross: ' + R(income/12) + '/month</span>' +
        contextBadge(badgeText + ' · ' + pct(effRate), badgeType) +
        donutCard([
          {pct: takePct, color: '#4ade80', label: 'Take-home', value: pct(takePct, 0)},
          {pct: taxPct,  color: '#f87171', label: 'Income tax', value: pct(taxPct, 0)}
        ]) +
        statGrid([
          {label: 'Annual Tax',    value: R(tax),           color: 'red'},
          {label: 'Monthly PAYE',  value: R(monthly),       color: 'red'},
          {label: 'Taxable Income',value: R(taxable),       color: ''},
          {label: 'Effective Rate',value: pct(effRate),     color: effRate > 30 ? 'amber' : 'green'},
        ]) +
        '<div class="breakdown">' +
          (raDeduct > 0 ? '<div class="br"><span class="bl">RA deduction</span><span class="bv blue">− ' + R(raDeduct) + '</span></div>' : '') +
          '<div class="br"><span class="bl">Tax before rebates</span><span class="bv">' + R(tax + r.rebate + r.medCredit) + '</span></div>' +
          '<div class="br"><span class="bl">Primary rebate</span><span class="bv blue">− ' + R(r.rebate) + '</span></div>' +
          (r.medCredit > 0 ? '<div class="br"><span class="bl">Medical credit</span><span class="bv blue">− ' + R(r.medCredit) + '</span></div>' : '') +
          '<div class="br br-divider"><span class="bl">Annual tax payable</span><span class="bv red">' + R(tax) + '</span></div>' +
        '</div>' +
        copyBtn('Annual tax: ' + R(tax) + ' | Monthly PAYE: ' + R(monthly) + ' | Take-home: ' + R(netMonthly) + '/month | Effective rate: ' + pct(effRate)) +
      '</div>';
    showResult(html);
    updateMobileBar('Monthly Take-Home', R(netMonthly));
  }
  window._calc = calc;
  on(['paye_income','paye_age','paye_med','paye_ra'], calc);
  calc();
}

// 2. Salary / Take-Home Pay
function renderSalary() {
  document.getElementById('calc-form').innerHTML =
    sliderField('sal_gross','Monthly gross salary', 5000, 200000, 500, 30000, '', 'R', null,
      'Your total monthly salary before any deductions (CTC or gross).') +
    fsect('Deductions') +
    '<div class="frow">' +
      field('sal_med_contrib','Medical aid contribution', moneyInput('sal_med_contrib','0','0'), null,
        'The amount deducted from your salary each month for medical aid premiums.') +
      field('sal_ra','Retirement contribution', moneyInput('sal_ra','0','0'), null,
        'Monthly RA, pension or provident fund deduction. Reduces your taxable income.') +
    '</div>' +
    fsect('Tax profile') +
    '<div class="frow">' +
      field('sal_med_members','Medical aid members', plainInput('sal_med_members','0','0','members'),'incl. yourself',
        'Number of people on your medical scheme. Each earns you a monthly tax credit.') +
      field('sal_age','Age bracket', selectInput('sal_age',[['30','Under 65'],['65','65–74'],['75','75+']])) +
    '</div>';

  function calc() {
    var monthly = num('sal_gross');
    var medContrib = num('sal_med_contrib');
    var raContrib = num('sal_ra');
    var medMembers = num('sal_med_members');
    var age = intval('sal_age') || 30;
    if (!monthly) return;

    var annual = monthly * 12;
    var annualRA = raContrib * 12;
    var raDeduct = Math.min(annualRA, Math.min(annual * D.raRate, D.raCap));
    var taxable = Math.max(0, annual - raDeduct);
    var tax = calcTax(taxable, age, medMembers).tax;
    var paye = tax / 12;
    var uif = calcUIF(monthly);
    var totalDeductions = paye + uif + medContrib + raContrib;
    var nett = monthly - totalDeductions;
    var effRate = (paye / monthly) * 100;
    var nettPct = (nett / monthly) * 100;
    var deductPct = 100 - nettPct;

    var html =
      '<div class="result-card">' +
        '<span class="rc-label">Monthly Take-Home Pay</span>' +
        '<span class="rc-value">' + R(nett) + '</span>' +
        '<span class="rc-sub">' + pct(nettPct, 0) + ' of your gross salary of ' + R(monthly) + '</span>' +
        donutCard([
          {pct: nettPct,   color: '#4ade80', label: 'Take-home',   value: R(nett)},
          {pct: deductPct, color: '#f87171', label: 'Deductions',  value: R(totalDeductions)}
        ]) +
        statGrid([
          {label: 'Monthly PAYE',      value: R(paye),        color: 'red'},
          {label: 'UIF',               value: R(uif),         color: 'red'},
          medContrib > 0 ? {label: 'Medical Aid', value: R(medContrib), color: 'red'} : {label: 'Annual Take-home', value: R(nett*12), color: 'green'},
          {label: 'Effective Rate',    value: pct(effRate),   color: effRate > 30 ? 'amber' : 'green'},
        ]) +
        '<div class="breakdown">' +
          '<div class="br"><span class="bl">Gross salary</span><span class="bv">' + R(monthly) + '</span></div>' +
          '<div class="br"><span class="bl">PAYE deduction</span><span class="bv red">− ' + R(paye) + '</span></div>' +
          '<div class="br"><span class="bl">UIF (1% capped)</span><span class="bv red">− ' + R(uif) + '</span></div>' +
          (medContrib > 0 ? '<div class="br"><span class="bl">Medical aid</span><span class="bv red">− ' + R(medContrib) + '</span></div>' : '') +
          (raContrib > 0 ? '<div class="br"><span class="bl">Retirement fund</span><span class="bv red">− ' + R(raContrib) + '</span></div>' : '') +
          '<div class="br br-divider"><span class="bl">Net take-home</span><span class="bv green">' + R(nett) + '</span></div>' +
        '</div>' +
        copyBtn('Take-home: ' + R(nett) + '/month | PAYE: ' + R(paye) + ' | Deductions: ' + R(totalDeductions)) +
      '</div>';
    showResult(html);
    updateMobileBar('Take-Home Pay', R(nett));
  }
  window._calc = calc;
  on(['sal_gross','sal_med_contrib','sal_ra','sal_med_members','sal_age'], calc);
  calc();
}

// 3. VAT
function renderVAT() {
  document.getElementById('calc-form').innerHTML =
    field('vat_amount', 'Amount', moneyInput('vat_amount','1000','1000')) +
    field('vat_dir', 'Direction',
      '<div class="radio-grp">' +
      '<label class="ro"><input type="radio" name="vat_dir" id="vat_add" value="add" checked><label for="vat_add">Add VAT (15%)</label></label>' +
      '<label class="ro"><input type="radio" name="vat_dir" id="vat_rem" value="remove"><label for="vat_rem">Remove VAT</label></label>' +
      '</div>'
    );

  function calc() {
    var amount = num('vat_amount');
    var dir = document.querySelector('input[name="vat_dir"]:checked');
    var adding = !dir || dir.value === 'add';
    var vatAmt, net, gross;
    if (adding) {
      net = amount;
      vatAmt = amount * D.vatRate;
      gross = amount + vatAmt;
      updateMobileBar('Total incl. VAT', R(gross, 2));
      showResult(resultCard('VAT-Inclusive Amount', R(gross, 2), 'After adding 15% VAT',
        [['Net amount (excl. VAT)', R(net, 2)],['VAT at 15%', R(vatAmt, 2),'blue'],['Total (incl. VAT)', R(gross, 2),'green',true]]));
    } else {
      gross = amount;
      net = amount / 1.15;
      vatAmt = gross - net;
      updateMobileBar('Excl. VAT', R(net, 2));
      showResult(resultCard('VAT-Exclusive Amount', R(net, 2), 'Price before VAT',
        [['Total incl. VAT', R(gross, 2)],['VAT component (15%)', R(vatAmt, 2),'red'],['Net excl. VAT', R(net, 2),'green',true]]));
    }
  }
  window._calc = calc;
  on(['vat_amount'], calc);
  document.querySelectorAll('input[name="vat_dir"]').forEach(function(r) { r.addEventListener('change', calc); });
  calc();
}

// 4. UIF
function renderUIF() {
  document.getElementById('calc-form').innerHTML =
    sliderField('uif_salary','Monthly gross salary', 2000, 50000, 100, 20000, '', 'R') +
    field('uif_months','Months contributed', plainInput('uif_months','48','48','months'),'max 48') +
    field('uif_type','Claim type', selectInput('uif_type',[
      ['unemp','Unemployment / Retrenchment'],
      ['mat','Maternity (max 121 days)'],
      ['ill','Illness (up to 238 days)']
    ]));

  function calc() {
    var salary = num('uif_salary');
    var months = Math.min(num('uif_months') || 48, 48);
    if (!salary) return;

    var base = Math.min(salary, D.uifCeiling);
    var empContrib = base * D.uifRate;
    var emplrContrib = base * D.uifRate;

    var daily = base * 12 / 365;
    var annualSal = salary * 12;
    var irr = Math.max(0.38, Math.min(0.60, 0.60 - (annualSal - 60000) / 1200000 * 0.22));
    var dailyBenefit = daily * irr;
    var credits = Math.min(months * 17, 238);
    var claimType = val('uif_type');
    var claimDays = claimType === 'mat' ? Math.min(121, credits) : credits;
    var totalBenefit = dailyBenefit * claimDays;

    updateMobileBar('UIF Benefit', R(totalBenefit));
    showResult(resultCard('Estimated Total UIF Benefit', R(totalBenefit),
      claimDays + ' credit days at ' + pct(irr*100,0) + ' replacement rate',
      [
        ['Monthly salary', R(salary)],
        ['UIF contribution base', R(base)],
        ['Your monthly contribution (1%)', R(empContrib)],
        ['Employer monthly contribution (1%)', R(emplrContrib)],
        null,
        ['Months contributed', months + ' months'],
        ['Credit days earned', claimDays + ' days'],
        ['Daily benefit', R(dailyBenefit, 2)],
        ['Total estimated benefit', R(totalBenefit), 'green', true],
      ]
    ));
  }
  window._calc = calc;
  on(['uif_salary','uif_months','uif_type'], calc);
  calc();
}

// 5. Bond / Home Loan
function renderBond() {
  document.getElementById('calc-form').innerHTML =
    sliderField('bond_price','Property purchase price', 300000, 5000000, 10000, 1500000, '', 'R', null,
      'The total purchase price of the property as agreed with the seller.') +
    sliderField('bond_deposit','Deposit', 0, 1000000, 5000, 150000, '', 'R', null,
      'Amount you pay upfront. A larger deposit means a smaller loan, lower monthly payments and often a better interest rate.') +
    '<div class="frow">' +
      field('bond_rate','Interest rate', pctInput('bond_rate','11.00','11.00'), 'prime = 11.00%',
        'Home loans are priced as prime ± a margin. Current prime rate is 11.00%. Your rate depends on your credit score and deposit size.') +
      field('bond_term','Loan term', selectInput('bond_term',[['10','10 years'],['15','15 years'],['20','20 years'],['25','25 years'],['30','30 years']])) +
    '</div>' +
    '<button class="adv-toggle" id="bond_adv_btn" onclick="toggleAdv(\'bond_adv_btn\',\'bond_adv\')" type="button">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' +
      'Extra payment calculator' +
      '<svg class="adv-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>' +
    '</button>' +
    '<div class="adv-section" id="bond_adv">' +
      field('bond_extra','Extra monthly payment', moneyInput('bond_extra','0','0'), 'optional',
        'Any extra amount you pay above the minimum. Goes directly off capital, saving significant interest over the loan term.') +
    '</div>' +
    '<div id="amort-toggle-area"></div>';

  function calc() {
    var price = num('bond_price');
    var deposit = num('bond_deposit');
    var rate = (num('bond_rate') || 11) / 100;
    var termYears = intval('bond_term') || 20;
    var extra = num('bond_extra');
    if (!price) return;

    var principal = Math.max(0, price - deposit);
    var mRate = rate / 12;
    var n = termYears * 12;
    var payment = mRate > 0 ? (principal * mRate * Math.pow(1+mRate,n)) / (Math.pow(1+mRate,n)-1) : principal/n;
    var totalPaid = payment * n;
    var totalInterest = totalPaid - principal;
    var ltvPct = price > 0 ? (principal/price)*100 : 0;

    var extraRows = [];
    if (extra > 0) {
      var bal = principal, mo = 0, totalE = 0;
      while (bal > 0 && mo < n) {
        var int2 = bal * mRate;
        var prin2 = Math.min(payment + extra - int2, bal);
        bal = Math.max(0, bal - prin2);
        totalE += Math.min(payment + extra, (payment + extra - Math.max(0, -bal)));
        mo++;
      }
      var savedMo = n - mo;
      var savedInt = totalInterest - (totalE - principal);
      extraRows = [
        null,
        ['With extra ' + R(extra) + '/month', ''],
        ['New term', Math.ceil(mo/12) + ' yrs (' + mo + ' months)', 'green'],
        ['Time saved', Math.floor(savedMo/12) + ' yrs ' + (savedMo%12) + ' months', 'green'],
        ['Interest saved', R(Math.max(0,savedInt)), 'green'],
      ];
    }

    var intPct = totalPaid > 0 ? (totalInterest / totalPaid) * 100 : 0;
    var bondBadgeType = intPct > 60 ? 'high' : intPct > 45 ? 'warn' : 'good';
    var bondBadgeText = intPct > 60 ? '▲ High interest burden' : intPct > 45 ? '~ Moderate interest' : '✓ Manageable interest';

    var extraHTML = '';
    if (extraRows.length) {
      extraRows.forEach(function(r) {
        if (!r || !r[0]) return;
        extraHTML += '<div class="br"><span class="bl">' + r[0] + '</span><span class="bv' + (r[2] ? ' ' + r[2] : '') + '">' + r[1] + '</span></div>';
      });
    }

    var html =
      '<div class="result-card">' +
        '<span class="rc-label">Monthly Bond Repayment</span>' +
        '<span class="rc-value">' + R(payment, 2) + '</span>' +
        '<span class="rc-sub">' + R(principal) + ' over ' + termYears + ' yrs at ' + pct(rate*100) + '</span>' +
        contextBadge(bondBadgeText, bondBadgeType) +
        donutCard([
          {pct: (principal/totalPaid)*100, color: '#4ade80', label: 'Principal',    value: R(principal)},
          {pct: intPct,                    color: '#f87171', label: 'Total interest',value: R(totalInterest)}
        ]) +
        statGrid([
          {label: 'Monthly Payment', value: R(payment,2),     color: 'green'},
          {label: 'Total Interest',  value: R(totalInterest), color: 'red'},
          {label: 'LTV Ratio',       value: pct(ltvPct,0),    color: ltvPct > 90 ? 'amber' : ''},
          {label: 'Total Repaid',    value: R(totalPaid),     color: ''},
        ]) +
        (extraHTML ? '<div class="breakdown">' + extraHTML + '</div>' : '') +
        copyBtn('Monthly payment: ' + R(payment,2) + ' | Total interest: ' + R(totalInterest) + ' | Total repaid: ' + R(totalPaid)) +
      '</div>';
    showResult(html);
    updateMobileBar('Monthly Repayment', R(payment, 2));

    // Amortisation toggle
    var toggleArea = document.getElementById('amort-toggle-area');
    if (toggleArea && !toggleArea.hasChildNodes()) {
      var btn = document.createElement('button');
      btn.className = 'amort-btn';
      btn.textContent = '📊 Show amortisation schedule';
      var tableDiv = document.createElement('div');
      btn.addEventListener('click', function() {
        if (tableDiv.style.display === 'none' || !tableDiv.innerHTML) {
          btn.textContent = '📊 Hide amortisation schedule';
          var rows2 = '';
          var b2 = principal;
          for (var y = 1; y <= termYears; y++) {
            var yi = 0, yp = 0;
            for (var m = 0; m < 12 && b2 > 0; m++) {
              var i2 = b2 * mRate;
              var p2 = Math.min(payment - i2, b2);
              yi += i2; yp += p2; b2 = Math.max(0, b2-p2);
            }
            rows2 += '<tr><td>Year ' + y + '</td><td>' + R(payment*12) + '</td><td>' + R(yp) + '</td><td>' + R(yi) + '</td><td>' + R(b2) + '</td></tr>';
          }
          tableDiv.innerHTML = '<div class="amort-wrap"><table class="amort-table"><thead><tr><th>Year</th><th>Payments</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody>' + rows2 + '</tbody></table></div>';
          tableDiv.style.display = 'block';
        } else {
          tableDiv.style.display = 'none';
          btn.textContent = '📊 Show amortisation schedule';
        }
      });
      tableDiv.style.display = 'none';
      toggleArea.appendChild(btn);
      toggleArea.appendChild(tableDiv);
    }
  }
  window._calc = calc;
  on(['bond_price','bond_deposit','bond_rate','bond_term','bond_extra'], calc);
  calc();
}

// 6. Transfer Duty
function renderTransferDuty() {
  document.getElementById('calc-form').innerHTML =
    sliderField('td_price','Property purchase price', 500000, 10000000, 10000, 2000000, '', 'R');

  function calc() {
    var price = num('td_price');
    if (!price) return;

    var duty = 0;
    for (var i = 0; i < D.transferDuty.length; i++) {
      var b = D.transferDuty[i];
      if (price > b.from) {
        var upper = b.to !== null ? Math.min(price, b.to) : price;
        duty = b.base + (upper - b.from) * b.rate;
      }
    }
    var conv = Math.max(6000, price * 0.012);
    var bondReg = Math.max(4000, price * 0.008);
    var total = duty + conv + bondReg;
    var bracket = price <= 1100000 ? 'Zero (exempt)' : price <= 1512500 ? '3%' : price <= 2117500 ? '6%' : price <= 2722500 ? '8%' : price <= 12100000 ? '11%' : '13%';

    updateMobileBar('Transfer Duty', R(duty));
    showResult(resultCard('Transfer Duty Payable', R(duty),
      price <= 1100000 ? 'Properties below R1.1M pay NO transfer duty! 🎉' : 'Bracket: ' + bracket,
      [
        ['Purchase price', R(price)],
        ['Transfer duty bracket', bracket],
        ['Transfer duty', R(duty), duty === 0 ? 'green' : 'red', true],
        null,
        ['Est. conveyancing fees', '~' + R(conv)],
        ['Est. bond registration', '~' + R(bondReg)],
        ['Est. total buying costs', '~' + R(total)],
        ['Costs as % of purchase price', pct((total/price)*100,1)],
      ]
    ));
  }
  window._calc = calc;
  on(['td_price'], calc);
  calc();
}

// 7. Rental Yield
function renderRentalYield() {
  document.getElementById('calc-form').innerHTML =
    field('ry_price','Property value / purchase price', moneyInput('ry_price','1500000','1500000')) +
    field('ry_rent','Monthly rental income', moneyInput('ry_rent','12000','12000')) +
    '<div class="frow">' +
      field('ry_rates','Monthly rates & taxes', moneyInput('ry_rates','1200','1200')) +
      field('ry_levies','Monthly levies / HOA', moneyInput('ry_levies','800','800')) +
    '</div>' +
    '<div class="frow">' +
      field('ry_insurance','Annual insurance', moneyInput('ry_insurance','5000','5000')) +
      field('ry_maintenance','Annual maintenance', moneyInput('ry_maintenance','15000','15000'), '~1% of value') +
    '</div>' +
    '<div class="frow">' +
      field('ry_vacancy','Vacancy rate', pctInput('ry_vacancy','8','8'), 'typically 5–10%') +
      field('ry_agent','Agent fee', pctInput('ry_agent','8','8'), 'of gross rent') +
    '</div>';

  function calc() {
    var price = num('ry_price') || 1;
    var rent = num('ry_rent');
    var rates = num('ry_rates');
    var levies = num('ry_levies');
    var insurance = num('ry_insurance');
    var maint = num('ry_maintenance');
    var vacancy = (num('ry_vacancy') || 8) / 100;
    var agentFee = (num('ry_agent') || 8) / 100;
    if (!rent) return;

    var grossAnnual = rent * 12;
    var vacancyLoss = grossAnnual * vacancy;
    var effectiveRent = grossAnnual - vacancyLoss;
    var agentCost = effectiveRent * agentFee;
    var annualCosts = rates*12 + levies*12 + insurance + maint + agentCost;
    var netIncome = effectiveRent - annualCosts;
    var grossYield = (grossAnnual / price) * 100;
    var netYield = (netIncome / price) * 100;

    updateMobileBar('Net Yield', pct(netYield));
    showResult(resultCard('Net Rental Yield', pct(netYield),
      'Gross yield: ' + pct(grossYield) + ' · Net annual income: ' + R(netIncome),
      [
        ['Property value', R(price)],
        ['Monthly rent', R(rent)],
        ['Gross annual rent', R(grossAnnual)],
        ['Gross yield', pct(grossYield), 'blue'],
        null,
        ['Vacancy loss', '− ' + R(vacancyLoss), 'red'],
        ['Agent fees (' + pct(agentFee*100,0) + ')', '− ' + R(agentCost), 'red'],
        ['Rates & taxes', '− ' + R(rates*12), 'red'],
        ['Levies', '− ' + R(levies*12), 'red'],
        ['Insurance + maintenance', '− ' + R(insurance + maint), 'red'],
        null,
        ['Net annual income', R(netIncome), netIncome >= 0 ? 'green' : 'red'],
        ['Net rental yield', pct(netYield), netYield >= 0 ? 'green' : 'red', true],
      ],
      Math.max(0, netYield / 15 * 100), 'bar-green'
    ));
  }
  window._calc = calc;
  on(['ry_price','ry_rent','ry_rates','ry_levies','ry_insurance','ry_maintenance','ry_vacancy','ry_agent'], calc);
  calc();
}

// 8. Personal Loan
function renderLoan() {
  document.getElementById('calc-form').innerHTML =
    '<div class="purpose-chips" role="group" aria-label="Loan purpose">' +
      ['🏠 Home repairs','🚗 Vehicle','📚 Education','🏥 Medical','💳 Debt consolidation','✈️ Holiday','📦 Other'].map(function(p,i) {
        return '<button type="button" class="purpose-chip' + (i===6?' active':'') + '" onclick="this.closest(\'.purpose-chips\').querySelectorAll(\'.purpose-chip\').forEach(function(c){c.classList.remove(\'active\')});this.classList.add(\'active\')">' + p + '</button>';
      }).join('') +
    '</div>' +
    sliderField('ln_amount','Loan amount', 5000, 500000, 5000, 100000, '', 'R') +
    presetChips('ln_amount',[{l:'R10k',v:10000},{l:'R25k',v:25000},{l:'R50k',v:50000},{l:'R100k',v:100000},{l:'R200k',v:200000},{l:'R500k',v:500000}]) +
    '<div class="frow">' +
      field('ln_rate','Annual interest rate', pctInput('ln_rate','11.00','11.00'),'NCR cap ≈ 27.75%') +
      field('ln_term','Loan term', selectInput('ln_term',[['6','6 months'],['12','1 year'],['24','2 years'],['36','3 years'],['48','4 years'],['60','5 years'],['72','6 years'],['84','7 years']]),'','Select 60 months (5 yrs) for most personal loans') +
    '</div>' +
    field('ln_fee','Initiation fee', moneyInput('ln_fee','0','0'), 'added to loan — typically R1,207 for R100k loans');

  function calc() {
    var amount = num('ln_amount');
    var rate = (num('ln_rate') || 11) / 100;
    var term = intval('ln_term') || 60;
    var fee = num('ln_fee');
    if (!amount) return;

    var principal = amount + fee;
    var mRate = rate / 12;
    var payment = mRate > 0 ? (principal * mRate * Math.pow(1+mRate,term)) / (Math.pow(1+mRate,term)-1) : principal/term;
    var totalPaid = payment * term;
    var totalInterest = totalPaid - principal;

    updateMobileBar('Monthly Repayment', R(payment, 2));
    showResult(resultCard('Monthly Repayment', R(payment, 2),
      R(amount) + ' over ' + term + ' months at ' + pct(rate*100),
      [
        ['Loan amount', R(amount)],
        ['Initiation fee', R(fee)],
        ['Total principal', R(principal)],
        ['Interest rate', pct(rate*100)],
        ['Term', term + ' months'],
        null,
        ['Monthly repayment', R(payment,2), 'green', true],
        ['Total repaid', R(totalPaid)],
        ['Total interest paid', R(totalInterest), 'red'],
        ['Interest as % of loan', pct((totalInterest/principal)*100,0)],
      ],
      (principal/totalPaid)*100, 'bar-green'
    ));
  }
  window._calc = calc;
  on(['ln_amount','ln_amount_sl','ln_rate','ln_term','ln_fee'], calc);
  syncAllSliders();
  calc();
}

// 9. Vehicle Finance
function renderVehicleFinance() {
  document.getElementById('calc-form').innerHTML =
    sliderField('vf_price','Vehicle price', 100000, 2000000, 5000, 450000, '', 'R') +
    presetChips('vf_price',[{l:'R150k',v:150000},{l:'R250k',v:250000},{l:'R350k',v:350000},{l:'R500k',v:500000},{l:'R750k',v:750000},{l:'R1M',v:1000000}]) +
    '<div class="frow">' +
      field('vf_deposit','Deposit', moneyInput('vf_deposit','45000','45000'),'10–20% recommended') +
      field('vf_balloon','Balloon payment', pctInput('vf_balloon','20','20'), '0 for none') +
    '</div>' +
    '<div class="preset-label">Balloon quick-pick</div>' +
    presetChips('vf_balloon',[{l:'None (0%)',v:0},{l:'20%',v:20},{l:'30%',v:30},{l:'40%',v:40}]) +
    '<div class="frow">' +
      field('vf_rate','Interest rate', pctInput('vf_rate','11.0','11.0')) +
      field('vf_term','Term', selectInput('vf_term',[['24','24 months'],['36','36 months'],['48','48 months'],['60','60 months'],['72','72 months (recommended)']]),'','72 months is the typical maximum offered by SA banks') +
    '</div>';

  function calc() {
    var price = num('vf_price');
    var deposit = num('vf_deposit');
    var balloonPct = (num('vf_balloon') || 0) / 100;
    var rate = (num('vf_rate') || 11) / 100;
    var term = intval('vf_term') || 72;
    if (!price) return;

    var balloonAmt = price * balloonPct;
    var principal = price - deposit - balloonAmt;
    var mRate = rate / 12;
    var factor = Math.pow(1+mRate, term);
    var payment = mRate > 0 ? (principal * mRate * factor + balloonAmt * mRate) / (factor - 1) : (principal - balloonAmt/factor) / term;
    var totalPaid = payment * term + balloonAmt;
    var totalInterest = totalPaid - (price - deposit);

    updateMobileBar('Monthly Payment', R(payment, 2));
    showResult(resultCard('Monthly Repayment', R(payment, 2),
      R(price - deposit) + ' financed over ' + term + ' months',
      [
        ['Vehicle price', R(price)],
        ['Deposit', R(deposit)],
        ['Balloon (' + pct(balloonPct*100,0) + ')', R(balloonAmt)],
        ['Amount financed', R(principal + balloonAmt)],
        ['Interest rate', pct(rate*100)],
        null,
        ['Monthly payment', R(payment,2), 'green', true],
        ['Balloon due at end', R(balloonAmt), balloonAmt > 0 ? 'red' : ''],
        ['Total repaid', R(totalPaid)],
        ['Total interest', R(totalInterest), 'red'],
      ]
    ));
  }
  window._calc = calc;
  on(['vf_price','vf_deposit','vf_balloon','vf_rate','vf_term'], calc);
  calc();
}

// 10. Fuel Cost
function _fuelPriceOpts() {
  return [
    ['p95',  'Petrol 95 inland — R' + D.petrol95.toFixed(2) + '/L'],
    ['p93',  'Petrol 93 inland — R' + D.petrol93.toFixed(2) + '/L'],
    ['d50i', 'Diesel 50ppm inland — R' + D.diesel50i.toFixed(2) + '/L'],
    ['d50c', 'Diesel 50ppm coastal — R' + D.diesel50c.toFixed(2) + '/L'],
  ];
}
function _fuelSourceBadge() {
  return D._fuelLive
    ? '<p class="fuel-live">⚡ Live price — Brent $' + D._brent + ' · ZAR/' + D._zarRate + '</p>'
    : '<p class="fuel-live fuel-stale">⚠️ Using last-known DMRE price — internet needed for live data</p>';
}

function renderFuel() {
  document.getElementById('calc-form').innerHTML =
    _fuelSourceBadge() +
    field('fuel_dist','Trip distance', plainInput('fuel_dist','500','500','km')) +
    presetChips('fuel_dist',[{l:'100km',v:100},{l:'300km',v:300},{l:'500km',v:500},{l:'1,000km',v:1000},{l:'1,500km',v:1500}],'Distance quick-pick') +
    field('fuel_cons','Fuel consumption', plainInput('fuel_cons','10','10','L/100km'), 'check your vehicle spec') +
    presetChips('fuel_cons',[{l:'Small (7L)',v:7},{l:'Sedan (10L)',v:10},{l:'SUV (13L)',v:13},{l:'Bakkie (15L)',v:15}],'Vehicle type') +
    field('fuel_type','Fuel type', selectInput('fuel_type', _fuelPriceOpts())) +
    field('fuel_monthly_km','Monthly kilometres', plainInput('fuel_monthly_km','1500','1500','km'), 'for monthly cost estimate') +
    presetChips('fuel_monthly_km',[{l:'500km',v:500},{l:'1,000km',v:1000},{l:'1,500km',v:1500},{l:'2,500km',v:2500},{l:'3,500km',v:3500}],'Monthly km quick-pick');

  function calc() {
    var dist = num('fuel_dist');
    var cons = num('fuel_cons') || 10;
    var type = val('fuel_type');
    var monthlyKm = num('fuel_monthly_km') || 1500;
    if (!dist) return;

    var prices = {p95:D.petrol95, p93:D.petrol93, d50i:D.diesel50i, d50c:D.diesel50c};
    var price = prices[type] || D.petrol95;
    var litres = dist * cons / 100;
    var tripCost = litres * price;
    var costPerKm = price * cons / 100;
    var monthlyCost = monthlyKm * costPerKm;

    updateMobileBar('Trip Fuel Cost', R(tripCost, 2));
    showResult(resultCard('Trip Fuel Cost', R(tripCost, 2),
      dist + ' km · ' + litres.toFixed(1) + ' litres · R' + price.toFixed(2) + '/L',
      [
        ['Distance', dist + ' km'],
        ['Fuel price', 'R' + price.toFixed(2) + '/L'],
        ['Consumption', cons + ' L/100km'],
        ['Litres needed', litres.toFixed(2) + ' L'],
        null,
        ['Trip fuel cost', R(tripCost, 2), 'green', true],
        ['Cost per km', R(costPerKm, 2)],
        ['Monthly cost (' + monthlyKm + ' km)', R(monthlyCost)],
        ['Annual fuel cost', R(monthlyCost * 12)],
      ]
    ));
  }
  window._calc = calc;
  on(['fuel_dist','fuel_cons','fuel_type','fuel_monthly_km'], calc);
  calc();
}

// 11. Compound Interest
function renderCompoundInterest() {
  document.getElementById('calc-form').innerHTML =
    field('ci_principal','Initial investment', moneyInput('ci_principal','50000','50000')) +
    field('ci_monthly','Monthly contribution', moneyInput('ci_monthly','1000','1000'), 'optional') +
    '<div class="frow">' +
      field('ci_rate','Annual return rate', pctInput('ci_rate','10','10')) +
      field('ci_years','Investment period', plainInput('ci_years','20','20','years')) +
    '</div>' +
    field('ci_compound','Compounding frequency', selectInput('ci_compound',[['12','Monthly'],['4','Quarterly'],['1','Annually']]));

  function calc() {
    var P = num('ci_principal');
    var monthly = num('ci_monthly');
    var rate = (num('ci_rate') || 10) / 100;
    var years = num('ci_years') || 20;
    var n = intval('ci_compound') || 12;
    if (!years) return;

    var rn = rate / n;
    var periods = n * years;
    var fvLump = P * Math.pow(1+rn, periods);
    var monthlyToN = monthly * (12/n);
    var fvContrib = monthlyToN > 0 && rn > 0 ? monthlyToN * (Math.pow(1+rn,periods)-1) / rn : monthlyToN * periods;
    var fv = fvLump + fvContrib;
    var totalContributed = P + monthly*12*years;
    var growth = fv - totalContributed;
    var roiPct = totalContributed > 0 ? (growth/totalContributed)*100 : 0;

    updateMobileBar('Future Value', R(fv));
    showResult(resultCard('Future Value', R(fv),
      'After ' + years + ' years at ' + pct(rate*100) + ' p.a.',
      [
        ['Initial investment', R(P)],
        ['Monthly contributions', R(monthly)],
        ['Annual return', pct(rate*100)],
        ['Investment period', years + ' years'],
        null,
        ['Total contributed', R(totalContributed)],
        ['Growth (interest earned)', R(growth), 'green'],
        ['Future value', R(fv), 'green', true],
        ['Return on contributions', pct(roiPct,0)],
      ],
      (totalContributed/fv)*100, 'bar-blue'
    ));
  }
  window._calc = calc;
  on(['ci_principal','ci_monthly','ci_rate','ci_years','ci_compound'], calc);
  calc();
}

// 12. Retirement Annuity
function renderRetirementAnnuity() {
  document.getElementById('calc-form').innerHTML =
    field('ra_income','Annual gross income', moneyInput('ra_income','600000','600000')) +
    presetChips('ra_income',[{l:'R240k',v:240000},{l:'R360k',v:360000},{l:'R600k',v:600000},{l:'R900k',v:900000},{l:'R1.2M',v:1200000}]) +
    field('ra_contrib','Annual RA contribution', moneyInput('ra_contrib','60000','60000')) +
    '<div class="preset-chips" role="group" aria-label="% of income">' +
      '<button type="button" class="preset-chip" onclick="window._setPreset(\'ra_contrib\',Math.round((num(\'ra_income\')||600000)*0.05),this)">5% of income</button>' +
      '<button type="button" class="preset-chip" onclick="window._setPreset(\'ra_contrib\',Math.round((num(\'ra_income\')||600000)*0.10),this)">10% of income</button>' +
      '<button type="button" class="preset-chip" onclick="window._setPreset(\'ra_contrib\',Math.round((num(\'ra_income\')||600000)*0.15),this)">15% of income</button>' +
      '<button type="button" class="preset-chip" onclick="window._setPreset(\'ra_contrib\',Math.min(Math.round((num(\'ra_income\')||600000)*0.275),350000),this)">27.5% (max)</button>' +
    '</div>' +
    '<div class="frow">' +
      field('ra_age','Current age', selectInput('ra_age',[['25','25'],['30','30'],['35','35'],['40','40'],['45','45'],['50','50'],['55','55']])) +
      field('ra_retire','Retirement age', selectInput('ra_retire',[['55','55 (earliest)'],['60','60'],['65','65 (standard)'],['70','70']])) +
    '</div>' +
    field('ra_growth','Expected growth inside RA', pctInput('ra_growth','10','10'), 'annual');

  function calc() {
    var income = num('ra_income');
    var contrib = num('ra_contrib');
    var age = num('ra_age') || 40;
    var retireAge = num('ra_retire') || 65;
    var growth = (num('ra_growth') || 10) / 100;
    if (!income || !contrib) return;

    var maxDeduct = Math.min(income * D.raRate, D.raCap);
    var deductible = Math.min(contrib, maxDeduct);
    var taxWithout = calcTax(income, age, 0).tax;
    var taxWith = calcTax(income - deductible, age, 0).tax;
    var taxSaving = taxWithout - taxWith;
    var netCost = contrib - taxSaving;
    var subsidy = (taxSaving / contrib) * 100;

    var years = Math.max(0, retireAge - age);
    var mRate = growth / 12;
    var periods = years * 12;
    var monthlyContrib = contrib / 12;
    var fv = mRate > 0 ? monthlyContrib * (Math.pow(1+mRate,periods)-1)/mRate : monthlyContrib * periods;

    updateMobileBar('Annual Tax Saving', R(taxSaving));
    showResult(resultCard('Annual Tax Saving', R(taxSaving),
      'SARS effectively subsidises ' + pct(subsidy,0) + ' of your RA contribution',
      [
        ['Annual gross income', R(income)],
        ['RA contribution', R(contrib)],
        ['Deductible portion', R(deductible)],
        null,
        ['Tax saving per year', R(taxSaving), 'green', true],
        ['Your actual net cost', R(netCost)],
        ['SARS subsidy rate', pct(subsidy,0)],
        null,
        ['Years to retirement', years + ' years'],
        ['Projected RA value at ' + retireAge, R(fv), 'blue'],
      ]
    ));
  }
  window._calc = calc;
  on(['ra_income','ra_contrib','ra_age','ra_retire','ra_growth'], calc);
  calc();
}

// 13. Capital Gains Tax
function renderCGT() {
  document.getElementById('calc-form').innerHTML =
    field('cgt_proceeds','Sale price (proceeds)', moneyInput('cgt_proceeds','2500000','2500000')) +
    field('cgt_base','Base cost (original cost + improvements)', moneyInput('cgt_base','1200000','1200000')) +
    '<div class="frow">' +
      field('cgt_age','Age', selectInput('cgt_age',[['30','Under 65'],['65','65–74'],['75','75+']])) +
      field('cgt_type','Asset type', selectInput('cgt_type',[
        ['ind','Individual — general asset'],
        ['res','Primary residence (R2M exclusion)'],
        ['co','Company / CC'],
        ['tr','Trust'],
      ])) +
    '</div>';

  function calc() {
    var proceeds = num('cgt_proceeds');
    var base = num('cgt_base');
    var age = intval('cgt_age') || 30;
    var type = val('cgt_type');
    if (!proceeds) return;

    var rawGain = proceeds - base;
    var primaryExcl = 0;
    if (type === 'res' && rawGain > 0) { primaryExcl = Math.min(rawGain, D.cgtPrimaryExcl); rawGain = Math.max(0, rawGain - primaryExcl); }
    var annualExcl = (type === 'ind' || type === 'res') ? D.cgtExclusion : 0;
    var netGain = Math.max(0, rawGain - annualExcl);
    var inclRate = (type === 'co' || type === 'tr') ? D.cgtInclCompany : D.cgtInclIndiv;
    var included = netGain * inclRate;
    var taxWith = calcTax(included, age, 0).tax;
    var taxWithout = calcTax(0, age, 0).tax;
    var cgtPayable = Math.max(0, taxWith - taxWithout);
    var effRate = (proceeds - base) > 0 ? (cgtPayable / (proceeds - base)) * 100 : 0;

    updateMobileBar('CGT Payable', R(cgtPayable));
    showResult(resultCard('CGT Payable', R(cgtPayable),
      'Effective CGT rate: ' + pct(effRate) + ' · Inclusion rate: ' + pct(inclRate*100,0),
      [
        ['Proceeds', R(proceeds)],
        ['Base cost', R(base)],
        ['Gross capital gain', R(proceeds - base)],
        primaryExcl > 0 ? ['Primary residence exclusion', '− ' + R(primaryExcl), 'blue'] : null,
        annualExcl > 0 ? ['Annual exclusion', '− ' + R(annualExcl), 'blue'] : null,
        ['Net gain', R(netGain)],
        ['Inclusion rate (' + pct(inclRate*100,0) + ')', R(included)],
        null,
        ['CGT payable', R(cgtPayable), 'red', true],
        ['Effective CGT rate', pct(effRate)],
        ['Maximum effective rate (45%×40%)', '18.00%'],
      ]
    ));
  }
  window._calc = calc;
  on(['cgt_proceeds','cgt_base','cgt_age','cgt_type'], calc);
  calc();
}

// 14. Medical Aid Tax Credit
function renderMedicalAid() {
  var c = D.medCredits;
  document.getElementById('calc-form').innerHTML =
    field('ma_members','Total scheme members', plainInput('ma_members','3','3','members'), 'including yourself') +
    field('ma_monthly','Your monthly medical aid contribution', moneyInput('ma_monthly','5000','5000')) +
    field('ma_income','Annual taxable income', moneyInput('ma_income','400000','400000'), 'for net saving calculation');

  function calc() {
    var members = Math.max(1, num('ma_members') || 1);
    var monthlyContrib = num('ma_monthly');
    var income = num('ma_income');

    var monthly = c.main;
    if (members >= 2) monthly += c.first;
    if (members > 2) monthly += c.extra * (members - 2);
    var annual = monthly * 12;

    var taxWithout = calcTax(income, 30, 0).tax;
    var taxWith = calcTax(income, 30, members).tax;
    var actualSaving = Math.max(0, taxWithout - taxWith);

    updateMobileBar('Monthly Credit', R(monthly));
    showResult(resultCard('Monthly Medical Tax Credit', R(monthly),
      'Annual credit: ' + R(annual) + ' · ' + members + ' member(s)',
      [
        ['Main member', R(c.main) + '/month'],
        members >= 2 ? ['First dependant', R(c.first) + '/month'] : null,
        members > 2 ? [(members-2) + ' additional dependant(s)', R(c.extra * (members-2)) + '/month'] : null,
        null,
        ['Total monthly credit', R(monthly), 'green', true],
        ['Annual tax credit', R(annual), 'green'],
        monthlyContrib > 0 ? ['Monthly contribution', R(monthlyContrib)] : null,
        monthlyContrib > 0 ? ['Net after-credit cost', R(monthlyContrib - monthly)] : null,
        income > 0 ? ['Annual tax saving (vs no med aid)', R(actualSaving), 'green'] : null,
      ]
    ));
  }
  window._calc = calc;
  on(['ma_members','ma_monthly','ma_income'], calc);
  calc();
}

// 15. Overtime Pay
function renderOvertime() {
  document.getElementById('calc-form').innerHTML =
    field('ot_monthly','Monthly gross salary', moneyInput('ot_monthly','20000','20000')) +
    field('ot_hrs','Normal hours per week', plainInput('ot_hrs','40','40','hrs')) +
    '<div class="frow">' +
      field('ot_weekday','Weekday OT hours', plainInput('ot_weekday','5','5','hrs')) +
      field('ot_sunday','Sunday / PH hours', plainInput('ot_sunday','0','0','hrs')) +
    '</div>';

  function calc() {
    var monthly = num('ot_monthly');
    var hoursWeek = num('ot_hrs') || 40;
    var wdOT = num('ot_weekday');
    var sunOT = num('ot_sunday');
    if (!monthly) return;

    var annualSal = monthly * 12;
    var belowThreshold = annualSal <= D.earningsThreshold;
    var hourly = monthly / (hoursWeek * 52 / 12);
    var wdPay = wdOT * hourly * D.overtimeWd;
    var sunPay = sunOT * hourly * D.overtimeSun;
    var totalOT = wdPay + sunPay;

    updateMobileBar('Overtime Pay', R(totalOT, 2));
    showResult(resultCard('Total Overtime Pay', R(totalOT, 2),
      'Hourly rate: ' + R(hourly, 2) + ' · BCEA ' + (belowThreshold ? '✅ applies' : '⚠️ threshold exceeded'),
      [
        ['Monthly salary', R(monthly)],
        ['Hourly rate', R(hourly, 2)],
        ['BCEA protection', belowThreshold ? 'Yes — below R241,110/year' : 'No — negotiate with employer'],
        null,
        ['Weekday OT (' + wdOT + ' hrs × 1.5)', R(wdPay, 2)],
        ['Sunday/PH OT (' + sunOT + ' hrs × 2.0)', R(sunPay, 2)],
        null,
        ['Total OT pay', R(totalOT, 2), 'green', true],
        ['Total monthly earnings', R(monthly + totalOT, 2), 'green'],
      ]
    ));
  }
  window._calc = calc;
  on(['ot_monthly','ot_hrs','ot_weekday','ot_sunday'], calc);
  calc();
}

// 17. Electricity Cost (Eskom)
function renderElectricity() {
  document.getElementById('calc-form').innerHTML =
    sliderField('elec_kwh','Monthly electricity usage', 0, 1500, 10, 600, '', '', 'kWh',
      'Check your electricity bill for your monthly kWh usage. Average SA home: 600–900 kWh/month.') +
    field('elec_type','Supplier / tariff type',
      selectInput('elec_type',[
        ['direct','Eskom direct — R2.21/kWh (standard)'],
        ['muni_avg','Municipality — R3.50/kWh (SA average)'],
        ['muni_cape','City of Cape Town — R3.22/kWh'],
        ['muni_jhb','City of Johannesburg — R3.68/kWh'],
        ['custom','Custom rate'],
      ]), null, 'Eskom direct customers are billed by Eskom. Most urban residents are billed by their municipality at higher rates.') +
    '<div id="elec_custom_wrap" style="display:none">' +
      field('elec_custom_rate','Your actual rate', plainInput('elec_custom_rate','3.50','3.50','R/kWh')) +
    '</div>' +
    field('elec_service','Monthly service/availability charge', moneyInput('elec_service','135','135'), 'R/month',
      'Fixed monthly charge regardless of usage. Check your bill — typically R135–R250/month.');

  document.getElementById('elec_type').addEventListener('change', function() {
    var custom = document.getElementById('elec_custom_wrap');
    if (custom) custom.style.display = this.value === 'custom' ? 'block' : 'none';
    window._calc && window._calc();
  });

  function calc() {
    var kwh = num('elec_kwh');
    var type = val('elec_type');
    var serviceCharge = num('elec_service') || 135;
    var rates = {direct: D.eskomDirect, muni_avg: D.eskomMuniAvg, muni_cape: 3.22, muni_jhb: 3.68, custom: num('elec_custom_rate') || 3.50};
    var rate = rates[type] || D.eskomDirect;
    if (!kwh) return;

    var energyCost = kwh * rate;
    var monthly = energyCost + serviceCharge;
    var annual = monthly * 12;
    var costPerDay = monthly / 30.4;
    var tier = kwh < 300 ? 'Low usage' : kwh < 700 ? 'Average usage' : kwh < 1200 ? 'High usage' : 'Very high usage';
    var tierType = kwh < 300 ? 'good' : kwh < 700 ? 'good' : kwh < 1200 ? 'warn' : 'high';

    var html =
      '<div class="result-card">' +
        '<span class="rc-label">Monthly Electricity Cost</span>' +
        '<span class="rc-value">' + R(monthly) + '</span>' +
        '<span class="rc-sub">' + kwh + ' kWh at R' + rate.toFixed(2) + '/kWh</span>' +
        contextBadge(tier + ' · ' + kwh + ' kWh/month', tierType) +
        statGrid([
          {label: 'Energy cost',    value: R(energyCost),  color: 'red'},
          {label: 'Service charge', value: R(serviceCharge), color: ''},
          {label: 'Annual cost',    value: R(annual),      color: 'red'},
          {label: 'Cost per day',   value: R(costPerDay, 2), color: ''},
        ]) +
        '<div class="breakdown">' +
          '<div class="br"><span class="bl">Rate per kWh</span><span class="bv">R' + rate.toFixed(4) + '</span></div>' +
          '<div class="br"><span class="bl">Energy (' + kwh + ' kWh)</span><span class="bv red">R' + energyCost.toFixed(2) + '</span></div>' +
          '<div class="br"><span class="bl">Service charge</span><span class="bv red">R' + serviceCharge.toFixed(2) + '</span></div>' +
          '<div class="br br-divider"><span class="bl">Monthly total</span><span class="bv green">' + R(monthly) + '</span></div>' +
          '<div class="br"><span class="bl">Annual total</span><span class="bv">' + R(annual) + '</span></div>' +
        '</div>' +
        copyBtn('Monthly electricity: ' + R(monthly) + ' | Annual: ' + R(annual) + ' | ' + kwh + ' kWh at R' + rate.toFixed(2) + '/kWh') +
      '</div>';
    showResult(html);
    updateMobileBar('Monthly Cost', R(monthly));
  }
  window._calc = calc;
  on(['elec_kwh','elec_type','elec_custom_rate','elec_service'], calc);
  calc();
}

// 16. Inflation / CPI
function renderInflation() {
  var years = Object.keys(D.cpi).sort();
  var fromOpts = years.map(function(y) { return [y, y]; });
  var toOpts = years.slice().reverse().map(function(y) { return [y, y]; });

  document.getElementById('calc-form').innerHTML =
    field('inf_amount','Amount', moneyInput('inf_amount','10000','10000')) +
    '<div class="frow">' +
      field('inf_from','From year', selectInput('inf_from', fromOpts)) +
      field('inf_to','To year', selectInput('inf_to', toOpts)) +
    '</div>' +
    '<p class="hint" style="margin-top:-.5rem;font-size:.78rem;color:var(--muted)">CPI data: Stats SA (base year 2011 = 100)</p>';

  function calc() {
    var amount = num('inf_amount');
    var fromY = val('inf_from');
    var toY = val('inf_to');
    var cpiFrom = D.cpi[fromY];
    var cpiTo = D.cpi[toY];
    if (!amount || !cpiFrom || !cpiTo || fromY === toY) return;

    var adjusted = amount * (cpiTo / cpiFrom);
    var totalChange = ((cpiTo - cpiFrom) / cpiFrom) * 100;
    var numYears = Math.abs(parseInt(toY) - parseInt(fromY));
    var annualRate = (Math.pow(cpiTo / cpiFrom, 1/numYears) - 1) * 100;

    updateMobileBar('Adjusted Value', R(adjusted));
    showResult(resultCard(
      fromY < toY ? 'Equivalent value in ' + toY : 'Equivalent value in ' + toY,
      R(adjusted),
      'Average annual inflation: ' + pct(annualRate) + ' over ' + numYears + ' years',
      [
        ['Amount in ' + fromY, R(amount)],
        ['Equivalent in ' + toY, R(adjusted), fromY < toY ? 'red' : 'green', true],
        null,
        ['CPI in ' + fromY, cpiFrom.toFixed(1)],
        ['CPI in ' + toY, cpiTo.toFixed(1)],
        ['Total inflation over period', pct(totalChange, 1)],
        ['Average annual inflation', pct(annualRate)],
        ['Purchasing power ' + (fromY < toY ? 'lost' : 'gained'), pct(Math.abs(100 - (adjusted/amount*100)), 1)],
      ],
      fromY < toY ? (amount/adjusted)*100 : (adjusted/amount)*100,
      fromY < toY ? 'bar-green' : 'bar-red'
    ));
  }
  window._calc = calc;
  on(['inf_amount','inf_from','inf_to'], calc);
  calc();
}


// ═══════════════════════════════════════════════════════════════════
//  18. Trip Fuel Cost Calculator
// ═══════════════════════════════════════════════════════════════════

var _tripMap = null;
var _tripRouteLayer = null;
var _tripMarkers = [];
var _tripFromCoords = null;
var _tripToCoords = null;
var _tripAcTimer = null;

function _tripInitMap() {
  if (_tripMap) { try { _tripMap.remove(); } catch(e) {} _tripMap = null; }
  _tripRouteLayer = null;
  _tripMarkers = [];
  _tripMap = L.map('trip-map').setView([-29.0, 25.0], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(_tripMap);
}

function _tripAutocomplete(inputId, dropId, onSelect) {
  var input = document.getElementById(inputId);
  var drop = document.getElementById(dropId);
  if (!input || !drop) return;

  input.addEventListener('input', function() {
    clearTimeout(_tripAcTimer);
    var q = this.value.trim();
    if (q.length < 3) { drop.innerHTML = ''; drop.style.display = 'none'; return; }
    var self = this;
    _tripAcTimer = setTimeout(function() {
      fetch('https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(q + ' South Africa') + '&countrycodes=za&format=json&limit=5&accept-language=en', {
        headers: { 'Accept': 'application/json' }
      })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (!data.length) {
            drop.innerHTML = '<div class="ac-item ac-none">No SA locations found</div>';
            drop.style.display = 'block';
            return;
          }
          drop.innerHTML = data.map(function(p) {
            var parts = p.display_name.split(', ');
            var name = parts[0];
            var sub = parts.slice(1, 3).join(', ');
            return '<div class="ac-item" data-lat="' + p.lat + '" data-lon="' + p.lon + '" data-display="' + (name + ', ' + sub).replace(/"/g,'&quot;') + '">' +
              '<span class="ac-name">' + name + '</span><span class="ac-sub">' + sub + '</span></div>';
          }).join('');
          drop.style.display = 'block';
          drop.querySelectorAll('.ac-item[data-lat]').forEach(function(el) {
            el.addEventListener('click', function() {
              var lat = parseFloat(this.dataset.lat);
              var lon = parseFloat(this.dataset.lon);
              var display = this.dataset.display;
              input.value = display;
              drop.innerHTML = '';
              drop.style.display = 'none';
              onSelect({ lat: lat, lon: lon, name: display });
            });
          });
        })
        .catch(function() { drop.innerHTML = ''; drop.style.display = 'none'; });
    }, 420);
  });

  document.addEventListener('click', function(e) {
    if (!drop.contains(e.target) && e.target !== input) {
      drop.innerHTML = '';
      drop.style.display = 'none';
    }
  });
}

function _tripCalcRoute() {
  if (!_tripFromCoords || !_tripToCoords) {
    showResult('<div class="result-placeholder"><div class="placeholder-icon">📍</div><p>Please select both a start and end location from the dropdown suggestions.</p></div>');
    return;
  }

  var fuelType = val('trip_fuel');
  var consumption = num('trip_consumption') || 10;
  var passengers = Math.max(1, num('trip_passengers') || 1);
  var returnTrip = document.getElementById('trip_return') && document.getElementById('trip_return').checked;
  var prices = { p95: D.petrol95, p93: D.petrol93, diesel: D.diesel50i };
  var pricePerL = prices[fuelType] || D.petrol95;
  var fuelNames = { p95: 'Petrol 95', p93: 'Petrol 93', diesel: 'Diesel 50ppm' };

  var btn = document.getElementById('trip-calc-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Calculating route…'; }

  var url = 'https://router.project-osrm.org/route/v1/driving/' +
    _tripFromCoords.lon + ',' + _tripFromCoords.lat + ';' +
    _tripToCoords.lon + ',' + _tripToCoords.lat +
    '?overview=full&geometries=geojson';

  fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (btn) { btn.disabled = false; btn.textContent = '🗺️ Calculate Route & Cost'; }
      if (!data.routes || !data.routes.length) {
        showResult('<div class="result-placeholder"><div class="placeholder-icon">⚠️</div><p>No route found between these locations. Try more specific place names.</p></div>');
        return;
      }
      var route = data.routes[0];
      var distKm = route.distance / 1000;
      var durationSecs = route.duration;
      var totalDistKm = returnTrip ? distKm * 2 : distKm;
      var litresNeeded = (totalDistKm * consumption) / 100;
      var totalCost = litresNeeded * pricePerL;
      var costPerPerson = totalCost / passengers;

      var hrs = Math.floor(durationSecs / 3600);
      var mins = Math.round((durationSecs % 3600) / 60);
      var durationStr = hrs > 0 ? hrs + 'h ' + mins + 'm' : mins + ' min';

      if (_tripMap) {
        if (_tripRouteLayer) { _tripMap.removeLayer(_tripRouteLayer); }
        _tripMarkers.forEach(function(m) { _tripMap.removeLayer(m); });
        _tripMarkers = [];
        _tripRouteLayer = L.geoJSON(route.geometry, {
          style: { color: '#007A4D', weight: 5, opacity: 0.85 }
        }).addTo(_tripMap);
        _tripMap.fitBounds(_tripRouteLayer.getBounds(), { padding: [30, 30] });
        var fromIcon = L.divIcon({ className: '', html: '<div class="trip-dot trip-dot-from"></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
        var toIcon = L.divIcon({ className: '', html: '<div class="trip-dot trip-dot-to"></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
        _tripMarkers.push(L.marker([_tripFromCoords.lat, _tripFromCoords.lon], { icon: fromIcon }).bindTooltip(_tripFromCoords.name.split(',')[0]).addTo(_tripMap));
        _tripMarkers.push(L.marker([_tripToCoords.lat, _tripToCoords.lon], { icon: toIcon }).bindTooltip(_tripToCoords.name.split(',')[0]).addTo(_tripMap));
      }

      showResult(resultCard(
        'Total Fuel Cost',
        R(totalCost),
        (returnTrip ? 'Return trip' : 'One-way') + ' · ' + totalDistKm.toFixed(0) + ' km · ' + fuelNames[fuelType],
        [
          ['From', _tripFromCoords.name.split(',')[0]],
          ['To', _tripToCoords.name.split(',')[0]],
          ['Driving distance (one way)', distKm.toFixed(0) + ' km'],
          returnTrip ? ['Total distance (return)', totalDistKm.toFixed(0) + ' km'] : null,
          ['Est. drive time (one way)', durationStr],
          null,
          ['Fuel consumption', consumption + ' L/100km'],
          ['Fuel type', fuelNames[fuelType] + ' @ R' + pricePerL.toFixed(2) + '/L'],
          ['Litres needed', litresNeeded.toFixed(1) + ' L'],
          null,
          ['Total fuel cost', R(totalCost), 'red', true],
          passengers > 1 ? ['Cost per person (' + passengers + ' passengers)', R(costPerPerson), 'green'] : null,
        ]
      ));
      updateMobileBar('Fuel Cost', R(totalCost));
    })
    .catch(function() {
      if (btn) { btn.disabled = false; btn.textContent = '🗺️ Calculate Route & Cost'; }
      showResult('<div class="result-placeholder"><div class="placeholder-icon">⚠️</div><p>Could not connect to routing service. Check your internet connection and try again.</p></div>');
    });
}

function renderTripFuel() {
  var fuelOpts = [
    ['p95',  'Petrol 95 — R' + D.petrol95.toFixed(2) + '/L'],
    ['p93',  'Petrol 93 — R' + D.petrol93.toFixed(2) + '/L'],
    ['diesel','Diesel 50ppm — R' + D.diesel50i.toFixed(2) + '/L'],
  ];

  document.getElementById('calc-form').innerHTML =
    _fuelSourceBadge() +
    '<div class="ac-wrap">' +
      '<label class="flabel">Start location</label>' +
      '<input id="trip_from" class="finput ac-input" type="text" placeholder="Type a city, town or suburb…" autocomplete="off">' +
      '<div id="trip_from_drop" class="ac-dropdown" style="display:none"></div>' +
    '</div>' +
    '<div class="ac-wrap">' +
      '<label class="flabel">End location</label>' +
      '<input id="trip_to" class="finput ac-input" type="text" placeholder="Type a city, town or suburb…" autocomplete="off">' +
      '<div id="trip_to_drop" class="ac-dropdown" style="display:none"></div>' +
    '</div>' +
    '<div class="trip-map-wrap"><div id="trip-map"></div></div>' +
    '<div class="frow">' +
      field('trip_fuel', 'Fuel type', selectInput('trip_fuel', fuelOpts)) +
      field('trip_consumption', 'Consumption', plainInput('trip_consumption', '10', '10', 'L/100km'), '8–12 L/100km typical') +
    '</div>' +
    '<div class="frow">' +
      field('trip_passengers', 'Passengers', plainInput('trip_passengers', '1', '1', 'people'), 'split cost') +
      '<div class="field"><label class="flabel">Return trip?</label>' +
        '<label class="trip-toggle"><input type="checkbox" id="trip_return"> <span>Calculate both ways</span></label>' +
      '</div>' +
    '</div>' +
    '<button id="trip-calc-btn" class="calc-route-btn" onclick="_tripCalcRoute()">🗺️ Calculate Route &amp; Cost</button>';

  _tripFromCoords = null;
  _tripToCoords = null;

  setTimeout(function() {
    if (typeof L === 'undefined') {
      var mapEl = document.getElementById('trip-map');
      if (mapEl) mapEl.innerHTML = '<p style="padding:1rem;color:var(--muted);text-align:center">Map requires an internet connection</p>';
      return;
    }
    _tripInitMap();
    _tripAutocomplete('trip_from', 'trip_from_drop', function(loc) { _tripFromCoords = loc; });
    _tripAutocomplete('trip_to', 'trip_to_drop', function(loc) { _tripToCoords = loc; });
  }, 80);
}

// ═══════════════════════════════════════════════════════════════════
//  ROUTER & GRID
// ═══════════════════════════════════════════════════════════════════

function showHome() {
  window._calc = null;
  if (_chartInstance) { try { _chartInstance.destroy(); } catch(e){} _chartInstance = null; }
  document.getElementById('home-view').style.display = '';
  document.getElementById('calc-view').style.display = 'none';
  var jv = document.getElementById('journey-view');
  if (jv) jv.style.display = 'none';
  var bar = document.getElementById('mobile-bar');
  if (bar) bar.classList.remove('visible');
  _activeJourney = null;
  document.title = 'Mzanzi Cals — South Africa\'s Free Calculator Suite';
  window.location.hash = '';
}

function calcBack() {
  if (_activeJourney) {
    showJourneyArticle(_activeJourney);
  } else {
    showHome();
  }
}

// ── Did You Know nuggets ─────────────────────────────────────────
var CALC_DYK = {
  'paye':             [{text:'SARS collected R1.86 trillion in total tax revenue in 2023/24. Personal income tax was the single largest contributor at 38.8% of all tax collected.',src:'SARS Annual Report 2023/24',url:'https://www.sars.gov.za/about/sars-annual-reports/'},{text:'The 2026/27 personal income tax threshold — below which you pay zero tax — is R95,750/year for people under 65. Age 65–74 enjoy a secondary rebate, and 75+ a tertiary rebate.',src:'SARS Tax Tables',url:'https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/'},{text:"South Africa's top marginal income tax rate of 45% applies to income above R1,817,000 per year. Fewer than 1% of taxpayers pay at this bracket.",src:'SARS',url:'https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/'}],
  'bond':             [{text:"South Africa's prime lending rate is always set 1.5% above the SARB repo rate. The Monetary Policy Committee meets 6 times a year to decide on rate changes.",src:'SARB',url:'https://www.resbank.co.za/en/home/what-we-do/monetary-policy/monetary-policy-committee'},{text:'First-time homebuyers with a combined household income below R22,000/month may qualify for a FLISP (Finance Linked Individual Subsidy) of up to R121,626 from the NHFC.',src:'NHFC FLISP',url:'https://www.nhfc.co.za/flisp/'},{text:'Paying just R1,000 extra per month on a R1.5 million bond at prime can save over R340,000 in interest and cut 4–5 years off your repayment term.',src:'SARB Financial Literacy',url:'https://www.resbank.co.za/en/home/what-we-do/financial-education'}],
  'transfer-duty':    [{text:'Transfer duty is paid to SARS within 6 months of the transaction date. Late payment attracts 10% interest per year on the outstanding amount.',src:'SARS',url:'https://www.sars.gov.za/businesses-and-employers/transfer-duty/'},{text:'Properties below R1,100,000 are exempt from transfer duty in 2026/27. This exemption threshold is adjusted in the national budget each year.',src:'SARS Transfer Duty',url:'https://www.sars.gov.za/businesses-and-employers/transfer-duty/'},{text:'New property bought from a VAT-registered developer is exempt from transfer duty — you pay VAT (included in the price) instead. You cannot pay both.',src:'SARS',url:'https://www.sars.gov.za/businesses-and-employers/transfer-duty/'}],
  'building-cost':    [{text:'All new homes must be enrolled with the NHBRC before construction begins. NHBRC enrolment protects buyers against major structural defects for 5 years.',src:'NHBRC',url:'https://www.nhbrc.org.za/enrolment/'},{text:'South African building costs rose approximately 8–12% in 2024/25, driven by steel, cement and labour. The ASAQS (quantity surveyors) publishes quarterly cost indices.',src:'ASAQS',url:'https://asaqs.co.za/'},{text:'The Section 25C solar energy tax credit allows homeowners to claim 25% of new solar panel costs (up to R15,000) directly against income tax.',src:'SARS Solar Credit',url:'https://www.sars.gov.za/types-of-tax/personal-income-tax/solar-energy-tax-credit/'}],
  'rental-yield':     [{text:'Rental income must be declared to SARS. You may deduct bond interest, rates, levies, repairs, insurance and agent fees. Keep all receipts — SARS may audit rental income claims.',src:'SARS Rental Income',url:'https://www.sars.gov.za/types-of-tax/personal-income-tax/rental-income/'},{text:'South African residential property gross yields typically run 6–9%. Net yields (after rates, levies, maintenance and vacancy) are usually 1.5–2.5% lower than gross.',src:'FNB Property Barometer',url:'https://www.fnb.co.za/downloads/economics/propertynewsletter.html'},{text:'A 5–8% vacancy rate is typical for SA residential rentals. The Western Cape coastal market has historically had lower vacancies and stronger nominal price growth.',src:'TPN Credit Bureau',url:'https://www.tpn.co.za/'}],
  'loan':             [{text:'The National Credit Act caps personal loan interest at the repo rate + 21%. At current rates that is approximately 27.75% per year — know your maximum before signing.',src:'National Credit Regulator',url:'https://www.ncr.org.za/'},{text:'A R50,000 loan at 24% over 60 months costs R82,700 in total repayments — R32,700 in interest alone. Paying it off in 36 months cuts the interest bill to R19,900.',src:'NCR Consumer Education',url:'https://www.ncr.org.za/'},{text:'South Africa had R2.4 trillion in total consumer credit outstanding in 2024. Impaired accounts (3+ months in arrears) represent approximately 25% of all active credit agreements.',src:'NCR Credit Bureau Monitor',url:'https://www.ncr.org.za/statistics/credit-bureau-monitor/'}],
  'vehicle-finance':  [{text:'A 30% balloon payment on a R350,000 vehicle over 72 months can cost you R80,000–R120,000 more than no balloon — because you defer capital, re-finance it, and pay interest twice.',src:'NAAMSA',url:'https://naamsa.co.za/'},{text:'South Africa sells approximately 500,000 new vehicles per year. Banks require an affordability assessment under the NCA before approving vehicle finance.',src:'NAAMSA / NCR',url:'https://naamsa.co.za/'},{text:"Vehicle finance rates are typically prime + 0–3% for new vehicles and prime + 1–5% for used. Your deposit size and credit score determine where in that range you'll land.",src:'SARB',url:'https://www.resbank.co.za/'}],
  'fuel-cost':        [{text:"South Africa's fuel price is adjusted on the first Wednesday of each month by the DMRE, based on the international Brent crude price and the rand/dollar exchange rate.",src:'DMRE',url:'https://www.energy.gov.za/files/esources/petroleum/petroleum_frame.html'},{text:'The General Fuel Levy + Road Accident Fund Levy total approximately R6.16/L on petrol 95 in 2025/26 — government collects roughly 40% of what you spend on fuel.',src:'National Treasury',url:'https://www.treasury.gov.za/'},{text:'Driving at 120 km/h instead of 100 km/h increases fuel consumption by approximately 20%. On a 1,000 km trip, that is 4–6 extra litres of fuel.',src:'AA South Africa',url:'https://www.aa.co.za/'}],
  'electricity':      [{text:"Eskom's average tariff has increased by over 650% cumulatively since 2010 — far above CPI inflation. NERSA approves tariff increases through a regulatory process each year.",src:'NERSA',url:'https://www.nersa.org.za/'},{text:'Your geyser accounts for roughly 40–50% of your electricity bill. A geyser timer (R800–R1,500 installed) typically pays back in 3–6 months.',src:'Eskom Energy Advice',url:'https://www.eskom.co.za/distribution/customer-service/energy-advice/home-energy-management/'},{text:'The Section 25C tax credit allows homeowners to claim 25% of new solar PV panel costs (up to R15,000 credit) against income tax for qualifying years.',src:'SARS Solar Credit',url:'https://www.sars.gov.za/types-of-tax/personal-income-tax/solar-energy-tax-credit/'}],
  'two-pot':          [{text:'Over 1.8 million South Africans made Two-Pot savings pot withdrawals in the first 3 months after 1 September 2024, collectively withdrawing approximately R40 billion.',src:'National Treasury',url:'https://www.treasury.gov.za/'},{text:'The FSCA estimates that a 35-year-old who withdraws R30,000 today will forgo approximately R240,000 in retirement value by age 65 — assuming a 10% annual return.',src:'FSCA Two-Pot Guidance',url:'https://www.fsca.co.za/Regulatory%20Frameworks/Pages/Two-Pot-Retirement-System.aspx'},{text:'SARS deducts any outstanding tax debt from a Two-Pot withdrawal before you receive it. Your fund must request a SARS Tax Directive before any payment can be made.',src:'SARS Two-Pot',url:'https://www.sars.gov.za/two-pot/'}],
  'retirement-annuity':[{text:'RA contributions are deductible up to 27.5% of your taxable income, capped at R350,000/year. Unused deductions roll forward — they are never permanently lost.',src:'SARS Retirement',url:'https://www.sars.gov.za/types-of-tax/personal-income-tax/retirement/'},{text:'At retirement, the first R550,000 of lump sum withdrawals across all retirement funds is tax-free. This is a once-in-a-lifetime combined exemption.',src:'SARS Retirement Lump Sums',url:'https://www.sars.gov.za/tax-rates/income-tax/retirement-fund-lump-sum-benefits/'},{text:'Only about 6% of South Africans can maintain their standard of living in retirement. The rest rely on family support, SASSA, or continued employment.',src:'National Treasury / ASISA',url:'https://www.treasury.gov.za/'}],
  'compound-interest':[{text:"South African equities (JSE All Share Index) have delivered approximately CPI + 7% over rolling 20-year periods — roughly 10–11% nominal annually at current inflation.",src:'JSE / ASISA',url:'https://www.jse.co.za/'},{text:'Starting R500/month at age 25 instead of 35 roughly doubles your retirement balance by age 65 at 10% returns. Time beats contribution size.',src:'ASISA',url:'https://www.asisa.org.za/'},{text:'R1,000 invested at 10% annually becomes R17,449 after 30 years with zero additional contributions — the remaining R16,449 is pure compound growth.',src:'SARB Financial Education',url:'https://www.resbank.co.za/en/home/what-we-do/financial-education'}],
  'cgt':              [{text:"South Africa's annual CGT exclusion is R40,000 for individuals — your first R40,000 of capital gains each year is completely tax-free.",src:'SARS CGT',url:'https://www.sars.gov.za/types-of-tax/capital-gains-tax/'},{text:'Your primary residence has a special R2,000,000 CGT exclusion on disposal. Only gains above R2 million are included in your taxable income.',src:'SARS Primary Residence Exclusion',url:'https://www.sars.gov.za/types-of-tax/capital-gains-tax/primary-residence-exclusion/'},{text:'For individuals, only 40% of a capital gain is included in taxable income (the inclusion rate). At a 45% marginal rate, the effective CGT rate is 18%, not 45%.',src:'SARS CGT',url:'https://www.sars.gov.za/types-of-tax/capital-gains-tax/'}],
  'inflation':        [{text:'The SARB targets CPI within a 3–6% band. Since adopting the inflation-targeting framework in 2000, SA CPI has averaged approximately 5.3% per year.',src:'SARB Inflation Target',url:'https://www.resbank.co.za/en/home/what-we-do/monetary-policy/inflation-target'},{text:'Stats SA measures CPI monthly using approximately 400 goods and services. Housing (26%), food and non-alcoholic beverages (21%) and transport (19%) are the biggest components.',src:'Stats SA CPI',url:'https://www.statssa.gov.za/?page_id=1866&PPN=P0141'},{text:'R1,000 in 2000 had the same purchasing power as approximately R3,740 in 2024 — a 73% erosion over 24 years. Any savings growing below inflation is losing real value.',src:'Stats SA',url:'https://www.statssa.gov.za/'}],
  'uif':              [{text:'Both employee and employer each contribute 1% of monthly remuneration to UIF, capped at a ceiling of R17,712/month. Maximum UIF benefit is approximately R8,160/month.',src:'UIF / Department of Labour',url:'https://www.labour.gov.za/uif'},{text:'You need at least 13 weeks of UIF contributions in the 36 months before claiming to qualify for unemployment benefits.',src:'UIF',url:'https://www.labour.gov.za/uif'},{text:'UIF maternity benefits cover up to 17.32 weeks and can be claimed from one month before the expected birth date. Illness benefits kick in after 14 consecutive sick days.',src:'UIF',url:'https://www.labour.gov.za/uif'}],
  'vat':              [{text:"South Africa raised the standard VAT rate from 14% to 15% on 1 April 2018 — the first increase in 25 years. Zero-rated items include 19 basic foods, paraffin and public transport.",src:'SARS VAT',url:'https://www.sars.gov.za/businesses-and-employers/vat/'},{text:'VAT registration is compulsory once taxable supplies exceed R1 million in any 12-month period. Voluntary registration is allowed above R50,000.',src:'SARS VAT Registration',url:'https://www.sars.gov.za/businesses-and-employers/vat/registering-for-vat/'},{text:'A 10% penalty applies to late VAT submissions, plus interest at the prescribed rate. Filing on time — even when SARS owes you a refund — avoids delays and penalties.',src:'SARS',url:'https://www.sars.gov.za/businesses-and-employers/vat/'}],
  'fuel-levy':        [{text:'The General Fuel Levy + Road Accident Fund Levy total approximately R6.16/L on petrol 95 in 2025/26. Government collects around 40 cents of every rand spent on fuel.',src:'National Treasury Budget Review',url:'https://www.treasury.gov.za/'},{text:'The Road Accident Fund levy is ring-fenced to compensate road accident victims. The RAF paid out R31.5 billion in claims in 2023/24.',src:'Road Accident Fund',url:'https://www.raf.co.za/'},{text:"South Africa's fuel levy has not been increased since 2022 as part of government's relief measures on rising fuel costs.",src:'National Treasury',url:'https://www.treasury.gov.za/'}],
  'fuel-efficiency':  [{text:'South Africa spent approximately R289 billion on petroleum imports in 2023. The country imports roughly 40% of its petrol.',src:'DMRE',url:'https://www.energy.gov.za/'},{text:"South Africa's average light vehicle fuel consumption improved from about 9.5 L/100km in 2010 to approximately 8.5 L/100km in 2024 due to more efficient engines.",src:'NAAMSA',url:'https://naamsa.co.za/'},{text:'Under-inflated tyres can increase fuel consumption by 3–5%. Correct tyre pressure is the cheapest and easiest improvement to your fuel economy.',src:'AA South Africa',url:'https://www.aa.co.za/'}],
  'appliances':       [{text:'A 5-star heat pump uses approximately 3–4 times less electricity than a conventional resistance element geyser to produce the same hot water.',src:'SABS / SANS 941',url:'https://www.sabs.co.za/'},{text:'Eskom direct residential customers pay approximately R2.25/kWh in 2025/26. Most municipal customers pay R2.50–R4.50/kWh depending on their municipality.',src:'NERSA / Eskom',url:'https://www.nersa.org.za/'},{text:'Switching off the geyser for 8 hours overnight (via a timer) typically saves R200–R400/month depending on geyser size and usage habits.',src:'Eskom Energy Advice',url:'https://www.eskom.co.za/distribution/customer-service/energy-advice/home-energy-management/'}],
  'nsfas':            [{text:'NSFAS funded approximately 923,000 students in 2024 at a total cost of over R50 billion — the largest student bursary scheme in Africa.',src:'NSFAS',url:'https://www.nsfas.org.za/'},{text:'The NSFAS university income threshold was raised to R600,000/year in 2023, bringing an estimated 200,000 additional students into eligibility.',src:'DHET',url:'https://www.dhet.gov.za/'},{text:'Missing the NSFAS application window means waiting a full year. Applications open in August. The application is completely free on nsfas.org.za — never pay an agent to apply.',src:'NSFAS',url:'https://www.nsfas.org.za/content/how-to-apply.html'}],
  'sassa':            [{text:'SASSA distributes grants to approximately 18.6 million South Africans every month — roughly 1 in 3 people. Total annual grants expenditure exceeds R250 billion.',src:'SASSA',url:'https://www.sassa.gov.za/'},{text:'Research shows the Child Support Grant improves school attendance, nutrition and long-term earnings of the children who receive it.',src:'DSD / SASSA',url:'https://www.dsd.gov.za/'},{text:'SASSA grant amounts are adjusted annually in the national budget, usually tracking CPI. The Old Age and Disability Grants are the highest value at R2,190/month in 2026.',src:'SASSA Grant Values',url:'https://www.sassa.gov.za/Pages/Social-Grants.aspx'}],
  'aps':              [{text:'South Africa has 26 public universities, each setting their own APS requirements by faculty. Medical degrees at UCT and Wits typically require 36–42 APS.',src:'DHET',url:'https://www.dhet.gov.za/'},{text:'Life Orientation is excluded from most university APS calculations. Your 6 best subjects (excluding LO) determine your score — maximum 42 points.',src:'UMALUSI',url:'https://www.umalusi.org.za/'},{text:"A National Senior Certificate 'Bachelor's pass' requires 50%+ in your home language plus 3 other designated subjects, plus 40% in 2 other subjects.",src:'DBE',url:'https://www.education.gov.za/'}],
  'overtime':         [{text:'BCEA overtime provisions apply only to employees earning below R254,371/year (2024/25). Employees above this threshold must negotiate overtime contractually.',src:'Department of Employment and Labour',url:'https://www.labour.gov.za/'},{text:'The BCEA caps overtime at 10 hours per week (3 hours per day). Employers cannot legally require more than this from covered employees.',src:'BCEA',url:'https://www.labour.gov.za/'},{text:'Sunday work by an employee who does not ordinarily work Sundays must be paid at 2× the ordinary rate. Regular Sunday workers are paid at 1.5×.',src:'BCEA',url:'https://www.labour.gov.za/'}],
  'salary-split':     [{text:'The national minimum wage is R28.79/hour from March 2025 — approximately R5,000/month for a full-time worker. It is reviewed annually by the National Minimum Wage Commission.',src:'Department of Employment and Labour',url:'https://www.labour.gov.za/minimum-wage'},{text:"South Africa's Gini coefficient is one of the highest in the world. The top 10% of earners receive approximately 65% of all income; the bottom 40% receive under 7%.",src:'Stats SA',url:'https://www.statssa.gov.za/'},{text:"CTC (Cost to Company) packages are common in SA and include employer UIF, pension contributions, medical aid subsidy and other benefits — not just your cash salary.",src:'SARS',url:'https://www.sars.gov.za/types-of-tax/personal-income-tax/'}]
};

function renderDYK(calcId) {
  var el = document.getElementById('cv-dyk');
  if (!el) return;
  var nuggets = CALC_DYK[calcId];
  if (!nuggets || !nuggets.length) { el.innerHTML = ''; return; }
  el.innerHTML =
    '<div class="dyk-section">' +
      '<div class="dyk-heading">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/></svg>' +
        'Did you know?' +
      '</div>' +
      nuggets.map(function(n) {
        return '<div class="dyk-item">' +
          '<p class="dyk-text">' + _escHTML(n.text) + '</p>' +
          '<a class="dyk-source" href="' + n.url + '" target="_blank" rel="noopener noreferrer">' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
            'Source: ' + _escHTML(n.src) +
          '</a>' +
        '</div>';
      }).join('') +
    '</div>';
}

function showCalc(id) {
  var calc = CALCS.find(function(c) { return c.id === id; });
  if (!calc) { showHome(); return; }

  document.getElementById('home-view').style.display = 'none';
  var jv = document.getElementById('journey-view');
  if (jv) jv.style.display = 'none';
  var backLabel = document.getElementById('calc-back-label');
  if (backLabel) {
    if (_activeJourney) {
      var aj = JOURNEYS.find(function(j) { return j.id === _activeJourney; });
      backLabel.textContent = aj ? aj.label : 'Back';
    } else {
      backLabel.textContent = 'Back';
    }
  }
  var cv = document.getElementById('calc-view');
  cv.style.display = '';
  cv.classList.remove('calc-view-entering');
  void cv.offsetWidth; // reflow to restart animation
  cv.classList.add('calc-view-entering');
  var iconEl = document.getElementById('cv-icon');
  iconEl.innerHTML = ICONS[calc.iconName] || calc.icon;
  iconEl.className = 'calc-icon-big ' + calc.cat + '-bg';
  document.getElementById('cv-title').textContent = calc.title;
  document.getElementById('cv-desc').textContent = calc.desc;
  document.getElementById('cv-info').innerHTML = '<h4>About this calculator</h4>' + (calc.info || '');
  document.title = calc.title + ' | Mzanzi Cals';
  _currentCTA = calc.cta || null;

  // Source attribution
  var CAT_SOURCES = {
    tax:        ['SARS 2026/27','SARB','NCA'],
    property:   ['SARS 2026/27','SARB','ASAQS 2026','NHBRC'],
    loans:      ['SARB','NCR 2026'],
    auto:       ['DMRE 2026','SARB','NCR'],
    investment: ['SARS 2026/27','SARB','JSE data'],
    utilities:  ['Eskom 2025/26','Stats SA CPI'],
    education:  ['DHET 2026','NSFAS','NSC/CAPS'],
    grants:     ['SASSA 2026/27','DSD']
  };
  var sources = CAT_SOURCES[calc.cat] || ['Official SA data'];
  var discEl = document.getElementById('calc-disclaimer');
  if (discEl) {
    discEl.innerHTML = 'For informational purposes only. All calculations are estimates. ' +
      '<span class="src-row">' +
      sources.map(function(s) { return '<span class="src-badge">' + s + '</span>'; }).join('') +
      '</span>';
  }

  // Related
  var rel = document.getElementById('cv-related');
  if (calc.related && calc.related.length) {
    rel.innerHTML = '<p class="related-label">Related Calculators</p><div class="related-chips">' +
      calc.related.map(function(rid) {
        var rc = CALCS.find(function(c) { return c.id === rid; });
        return rc ? '<span class="rchip" onclick="showCalc(\'' + rc.id + '\')">' + (ICONS[rc.iconName] || '') + ' ' + rc.title.split('/')[0].trim() + '</span>' : '';
      }).join('') + '</div>';
  } else { rel.innerHTML = ''; }

  // FAQ
  var faqEl = document.getElementById('cv-faq');
  if (calc.faqs && calc.faqs.length) {
    faqEl.innerHTML = '<div class="faq-section"><h3>Frequently Asked Questions</h3>' +
      calc.faqs.map(function(f) {
        return '<div class="faq-item"><button class="faq-q" onclick="window._toggleFaq(this)" aria-expanded="false">' + f.q + ' <span class="faq-chevron" aria-hidden="true">▼</span></button><div class="faq-a">' + f.a + '</div></div>';
      }).join('') + '</div>';
  } else { faqEl.innerHTML = ''; }

  // Reset result area
  document.getElementById('result-area').innerHTML = '<div class="result-placeholder"><div class="placeholder-icon">' + ICONS['bar-chart'] + '</div><p>Fill in the fields to see your result</p></div>';

  // Render calculator
  document.getElementById('calc-form').innerHTML = '';
  window._calc = null;
  if (_chartInstance) { try { _chartInstance.destroy(); } catch(e){} _chartInstance = null; }
  var cvChart = document.getElementById('cv-chart');
  if (cvChart) cvChart.innerHTML = '';
  calc.render();
  syncAllSliders();
  if (calc.chart) renderCalcChart(calc.chart);
  renderDYK(id);

  window.location.hash = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Category metadata ────────────────────────────────────────────
var CAT_LABELS    = { tax:'Tax & Income', property:'Property', loans:'Loans', auto:'Automotive', investment:'Investment', utilities:'Utilities', education:'Education & Study', grants:'Social Grants' };
var CAT_ICON_NAMES = { tax:'file-text', property:'home', loans:'credit-card', auto:'car', investment:'trending-up', utilities:'zap', education:'graduation-cap', grants:'heart' };
var CAT_ORDER     = ['tax','property','loans','auto','investment','utilities','education','grants'];

function _escHTML(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderGrid() {
  var grid    = document.getElementById('calc-grid');
  var countEl = document.getElementById('calc-count');
  var q   = _currentSearch.toLowerCase().trim();
  var cat = _activeCategory;

  var filtered = CALCS.filter(function(c) {
    // Journey filter takes precedence — show only those calc IDs
    if (_journeyCalcs !== null) {
      if (_journeyCalcs.indexOf(c.id) === -1) return false;
    }
    var matchCat = (cat === 'all') || c.cat === cat;
    var matchQ   = !q || c.title.toLowerCase().indexOf(q) !== -1 || c.desc.toLowerCase().indexOf(q) !== -1;
    return matchCat && matchQ;
  });

  if (countEl) {
    countEl.textContent = filtered.length === CALCS.length
      ? CALCS.length + ' calculators'
      : filtered.length + ' of ' + CALCS.length + ' calculators';
  }

  if (!filtered.length) {
    grid.innerHTML = '<div class="no-results"><p>No calculators match &ldquo;<strong>' + _escHTML(q) + '</strong>&rdquo;</p>' +
      '<button onclick="_currentSearch=\'\';_activeCategory=\'all\';' +
        'var s=document.getElementById(\'search\');if(s)s.value=\'\';' +
        'var cb=document.getElementById(\'search-clear\');if(cb)cb.style.opacity=\'0\';' +
        'document.querySelectorAll(\'.cat-pill\').forEach(function(b){b.classList.toggle(\'active\',b.getAttribute(\'data-cat\')===\'all\');});' +
        'renderGrid();">Clear search</button></div>';
    return;
  }

  var groups = {};
  CAT_ORDER.forEach(function(k) { groups[k] = []; });
  filtered.forEach(function(c) { if (groups[c.cat]) groups[c.cat].push(c); });

  var html = '';
  CAT_ORDER.forEach(function(catKey) {
    var calcs = groups[catKey];
    if (!calcs.length) return;
    var label    = CAT_LABELS[catKey]    || catKey;
    var iconName = CAT_ICON_NAMES[catKey] || 'calculator';
    html += '<section class="cat-section" data-cat="' + catKey + '">' +
      '<div class="cat-head">' +
        '<span class="cat-section-icon ' + catKey + '-bg" aria-hidden="true">' + (ICONS[iconName] || '') + '</span>' +
        '<h2 class="cat-section-title">' + label + '</h2>' +
        '<span class="cat-section-count">(' + calcs.length + ')</span>' +
      '</div>' +
      '<div class="cat-cards">' +
      calcs.map(function(c) {
        var iconHtml = ICONS[c.iconName] || c.icon;
        var shortTitle = c.title.replace(/ Calculator\b.*$/,'').replace(/ South Africa\b.*$/,'').trim();
        return '<button class="calc-card" onclick="showCalc(\'' + c.id + '\')" aria-label="Open ' + _escHTML(c.title) + '">' +
          '<span class="card-emoji ' + c.cat + '-bg" aria-hidden="true">' + iconHtml + '</span>' +
          '<h3>' + shortTitle + '</h3>' +
          '<p>' + c.desc + '</p>' +
          (c.featured ? '<span class="featured-badge" aria-label="Featured">&#9733; Featured</span>' : c.popular ? '<span class="popular-badge" aria-label="Popular">Popular</span>' : '') +
        '</button>';
      }).join('') +
      '</div></section>';
  });

  grid.innerHTML = html;

  // Trigger scroll animations for newly rendered sections
  if (_scrollObserver) {
    document.querySelectorAll('.cat-section').forEach(function(el) {
      _scrollObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.cat-section').forEach(function(el) {
      el.classList.add('visible');
    });
  }
}

// ── Search & Filter ───────────────────────────────────────────────
function initSearch() {
  var searchEl = document.getElementById('search');
  var clearBtn = document.getElementById('search-clear');
  var pillsEl  = document.getElementById('cat-pills');

  var pillLabels = Object.assign({ all: 'All' }, CAT_LABELS);
  var pillKeys   = ['all'].concat(CAT_ORDER);

  if (pillsEl) {
    pillsEl.innerHTML = pillKeys.map(function(k) {
      return '<button class="cat-pill' + (k === _activeCategory ? ' active' : '') +
        '" data-cat="' + k + '" type="button">' + pillLabels[k] + '</button>';
    }).join('');

    pillsEl.addEventListener('click', function(e) {
      var btn = e.target.closest('.cat-pill');
      if (!btn) return;
      _activeCategory = btn.getAttribute('data-cat');
      pillsEl.querySelectorAll('.cat-pill').forEach(function(b) {
        b.classList.toggle('active', b === btn);
      });
      renderGrid();
    });
  }

  if (searchEl) {
    searchEl.addEventListener('input', function() {
      _currentSearch = this.value;
      if (clearBtn) clearBtn.style.opacity = this.value ? '1' : '0';
      renderGrid();
    });
    searchEl.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        _currentSearch = '';
        if (clearBtn) clearBtn.style.opacity = '0';
        renderGrid();
      }
    });
  }

  if (clearBtn) {
    clearBtn.style.opacity = '0';
    clearBtn.addEventListener('click', function() {
      if (searchEl) { searchEl.value = ''; searchEl.focus(); }
      _currentSearch = '';
      clearBtn.style.opacity = '0';
      renderGrid();
    });
  }
}

// ── Live fuel price ────────────────────────────────────────────────
function fetchLiveFuel() {
  var FIXED = 12.80; // SA levies + margins (R/L) — General Fuel Levy + RAF + other fixed costs
  Promise.all([
    fetch('https://api.frankfurter.app/latest?from=USD&to=ZAR').then(function(r) { return r.json(); }),
    fetch('https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=5d').then(function(r) { return r.json(); })
  ]).then(function(res) {
    var zar = res[0].rates && res[0].rates.ZAR;
    var result = res[1].chart && res[1].chart.result && res[1].chart.result[0];
    var closes = result && result.indicators && result.indicators.quote && result.indicators.quote[0].close;
    if (!zar || !closes) return;
    var brent = closes.filter(function(v) { return v != null; }).pop();
    if (!brent || brent <= 0) return;
    var p95 = Math.round(((brent * zar / 158.987) + FIXED) * 100) / 100;
    if (p95 < 12 || p95 > 60) return;
    D.petrol95  = p95;
    D.petrol93  = Math.round((p95 - 0.83) * 100) / 100;
    D.diesel50i = Math.round(p95 * 1.213 * 100) / 100;
    D.diesel50c = Math.round(p95 * 1.184 * 100) / 100;
    D._fuelLive = true;
    D._brent    = Math.round(brent);
    D._zarRate  = zar.toFixed(2);
    renderRates();
    updateHeroBento();
    if (window._calc) window._calc();
  }).catch(function() { /* keep hardcoded values */ });
}

// ── Rates Strip ────────────────────────────────────────────────────
function renderRates() {
  var inner = document.getElementById('rates-inner');
  if (!inner) return;
  var fuelLive = D._fuelLive
    ? ' <span class="rate-live" title="Live market data" aria-label="live">&#9679;</span>'
    : '';
  var rateLive = D._ratesLive
    ? ' <span class="rate-live" title="Live data" aria-label="live">&#9679;</span>'
    : '';
  var inflLive = D._inflationLive
    ? ' <span class="rate-live" title="Live data" aria-label="live">&#9679;</span>'
    : '';
  inner.innerHTML =
    '<div class="rate-item"><span class="rv">' + D.primeRate + '%' + rateLive + '</span><span class="rl">Prime Rate</span></div>' +
    '<div class="rate-item"><span class="rv">' + D.repoRate + '%' + rateLive + '</span><span class="rl">Repo Rate</span></div>' +
    '<div class="rate-item"><span class="rv">' + (D.vatRate * 100) + '%</span><span class="rl">VAT Rate</span></div>' +
    '<div class="rate-item"><span class="rv">' + D.inflation + '%' + inflLive + '</span><span class="rl">CPI Inflation</span></div>' +
    '<div class="rate-item"><span class="rv">R' + D.petrol95.toFixed(2) + fuelLive + '</span><span class="rl">Petrol 95/L</span></div>' +
    '<div class="rate-item"><span class="rv">R' + D.diesel50i.toFixed(2) + fuelLive + '</span><span class="rl">Diesel/L</span></div>' +
    '<div class="rate-item rates-updated"><span class="rl">SARS 2026/27</span></div>';
  updateHeroBento();
  // Refresh open journey article facts in-place
  if (_activeJourney) {
    var factsEl = document.getElementById('ja-facts-' + _activeJourney);
    if (factsEl) factsEl.innerHTML = _buildFactsHTML(_activeJourney);
  }
}

// ── Scroll animations (IntersectionObserver) ─────────────────────
var _scrollObserver = null;
var _SPRING_EASE    = 'cubic-bezier(.16,1,.3,1)';

function _staggerSectionCards(section) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  section.querySelectorAll('.calc-card').forEach(function(card, ci) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(16px)';
    card.style.transition = 'none';
    var d = ci * 45;
    setTimeout(function() {
      card.style.transition = 'opacity .42s ' + _SPRING_EASE + ',transform .42s ' + _SPRING_EASE;
      card.style.opacity    = '';
      card.style.transform  = '';
    }, d);
    setTimeout(function() { card.style.transition = ''; }, d + 520);
  });
}

function initScrollAnimations() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.cat-section').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }
  _scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        _staggerSectionCards(e.target);
        _scrollObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.cat-section').forEach(function(el) {
    _scrollObserver.observe(el);
  });
}

// ── Quick-Launch: top 6 most-used calculators ─────────────────────
function renderQuickLaunch() {
  var el = document.getElementById('quick-launch-section');
  if (!el) return;
  var TOP = ['paye','bond','vat','two-pot','vehicle-finance','fuel'];
  var catColors = {
    tax:        {bg:'rgba(51,138,243,.18)', border:'rgba(51,138,243,.3)', color:'#93c5fd'},
    property:   {bg:'rgba(13,148,136,.18)', border:'rgba(13,148,136,.3)', color:'#5eead4'},
    investment: {bg:'rgba(255,182,18,.18)', border:'rgba(255,182,18,.3)', color:'#FFB612'},
    auto:       {bg:'rgba(220,38,38,.18)',  border:'rgba(220,38,38,.3)',  color:'#fca5a5'},
    loans:      {bg:'rgba(234,88,12,.18)',  border:'rgba(234,88,12,.3)',  color:'#fdba74'},
    utilities:  {bg:'rgba(202,138,4,.18)',  border:'rgba(202,138,4,.3)',  color:'#fde68a'},
    education:  {bg:'rgba(12,74,110,.28)',  border:'rgba(12,74,110,.4)',  color:'#7dd3fc'},
  };
  var html = '<div class="quick-launch-section">' +
    '<div class="ql-heading">Most used calculators</div>' +
    '<div class="ql-grid">' +
    TOP.map(function(id) {
      var c = CALCS.find(function(x){ return x.id === id; });
      if (!c) return '';
      var col = catColors[c.cat] || catColors.tax;
      var shortName = c.title.replace(/ Calculator\b.*$/,'').replace(/ South Africa\b.*$/,'').replace(/ Tax Saving\b.*$/,'').trim();
      var ico = ICONS[c.iconName] || '';
      return '<button class="ql-card" onclick="showCalc(\'' + c.id + '\')" aria-label="Open ' + _escHTML(c.title) + '" style="--ql-border:' + col.border + ';--ql-bg:' + col.bg + '">' +
        '<span class="ql-icon" style="background:' + col.bg + ';border:1px solid ' + col.border + ';color:' + col.color + '">' + ico.replace('width="20" height="20"','width="16" height="16"') + '</span>' +
        '<span class="ql-name">' + shortName + '</span>' +
        (c.featured ? '<span class="ql-badge">Featured</span>' : c.popular ? '<span class="ql-badge" style="background:rgba(99,102,241,.2);color:#a5b4fc">Popular</span>' : '') +
      '</button>';
    }).join('') +
    '</div></div>';
  el.innerHTML = html;
}

// ── Journey Functions ──────────────────────────────────────────────

function renderJourneys() {
  var el = document.getElementById('journey-section');
  if (!el) return;

  var cards = JOURNEYS.map(function(j) {
    var ico = ICONS[j.icon] || '';
    // Replace the icon's width/height with 24 for journey display
    var icoLarge = ico.replace(/width="20" height="20"/g, 'width="24" height="24"');
    var count = j.calcs.filter(function(id) {
      return CALCS.find(function(c) { return c.id === id; });
    }).length;
    return '<button class="journey-card" onclick="showJourney(\'' + j.id + '\')" aria-label="Explore ' + _escHTML(j.label) + '">' +
      '<div class="journey-ico-wrap" style="background:linear-gradient(' + j.gradient + ')">' + icoLarge + '</div>' +
      '<div class="journey-title">' + _escHTML(j.label) + '</div>' +
      '<div class="journey-sub">' + _escHTML(j.sub) + '</div>' +
      '<div class="journey-count">&#8594; ' + count + ' calculator' + (count !== 1 ? 's' : '') + '</div>' +
      '</button>';
  }).join('');

  el.innerHTML =
    '<div class="journey-heading">Start your journey <span>— pick a category below</span></div>' +
    '<div class="journey-grid">' + cards + '</div>' +
    '<button class="journey-browse-all" onclick="clearJourney()" aria-label="Browse all calculators">' +
      'Browse all 17 calculators &#8594;' +
    '</button>';
}

// Returns live-sourced fact objects for a journey (reads from D)
function buildJourneyFacts(id) {
  var fuel = D._fuelLive;
  var rates = D._ratesLive;
  var infl  = D._inflationLive;
  var zarStr = D._zarRate ? 'R' + D._zarRate + '/USD' : 'First Wed';
  var zarLbl = D._zarRate ? 'USD/ZAR Live' : 'Price Change';
  var zarNote = D._zarRate ? 'Live exchange rate · Brent calc' : 'DMRE adjusts fuel monthly';
  return {
    homebuyer: [
      { val: D.primeRate + '%',          label: 'Prime Rate',        note: 'Home loans priced at prime ± margin',             live: rates },
      { val: 'R0',                        label: 'Transfer Duty',     note: 'On properties under R1,100,000 · SARS 2026/27',   live: false },
      { val: '~30%',                      label: 'Bond-to-Income',    note: 'Max banks typically approve',                     live: false },
      { val: '10–20%',                    label: 'Ideal Deposit',     note: 'Secures a better interest rate',                  live: false }
    ],
    mypay: [
      { val: 'R' + D.thresholds.u65.toLocaleString(), label: 'Tax Threshold', note: 'Under-65s pay no tax below this · SARS 2026/27', live: false },
      { val: 'R' + D.rebates.primary.toLocaleString(), label: 'Primary Rebate', note: 'Everyone gets this off their tax bill',          live: false },
      { val: (D.uifRate * 100) + '%',     label: 'UIF Rate',          note: 'Capped at R' + (D.uifCeiling * D.uifRate).toFixed(2) + '/mo', live: false },
      { val: 'R' + D.medCredits.main + '/mo', label: 'Med Aid Credit', note: 'Per main member — rand-for-rand PAYE reduction', live: false }
    ],
    roadtrip: [
      { val: 'R' + D.petrol95.toFixed(2), label: 'Petrol 95/L',      note: 'DMRE inland' + (fuel ? ' · Live est. via Brent/ZAR' : ''), live: fuel },
      { val: 'R' + D.diesel50i.toFixed(2), label: 'Diesel 50ppm/L',  note: 'Inland pump price' + (fuel ? ' · Live est.' : ''),        live: fuel },
      { val: zarStr,                       label: zarLbl,              note: zarNote,                                                   live: !!D._zarRate },
      { val: '8–14 L',                     label: 'Typical /100km',   note: 'Sedan 8–10 · SUV 10–13 · Bakkie 12–15',                  live: false }
    ],
    investing: [
      { val: 'R36,000',   label: 'TFSA Annual Limit',  note: 'All growth, income and withdrawals tax-free · SARS 2026/27', live: false },
      { val: 'R500,000',  label: 'TFSA Lifetime Cap',  note: 'Penalties apply if exceeded — track carefully',              live: false },
      { val: 'R350,000',  label: 'RA Max Deduction',   note: '27.5% of income — reduces taxable income now',              live: false },
      { val: D.inflation + '%', label: 'CPI Inflation', note: 'SARB target 3–6%' + (infl ? ' · World Bank ' + (D._inflationYear || '') : ''), live: infl }
    ],
    business: [
      { val: 'R1M',                         label: 'VAT Threshold',    note: 'Compulsory registration above R1M taxable turnover',    live: false },
      { val: (D.vatRate * 100) + '%',        label: 'VAT Rate',         note: 'Zero-rated: basic foods, exports, public transport',    live: false },
      { val: 'R' + D.eskomDirect.toFixed(2) + '/kWh', label: 'Eskom Direct', note: 'Most businesses pay muni rate R2.50–R4.50/kWh', live: false },
      { val: (D.repoRate + 21).toFixed(2) + '%', label: 'NCR Loan Cap', note: 'Max unsecured: Repo (' + D.repoRate + '%) + 21%',      live: rates }
    ]
  }[id] || [];
}

function _buildFactsHTML(id) {
  return buildJourneyFacts(id).map(function(f) {
    var liveTag = f.live ? ' <span class="jaf-live" title="Live data">&#9679;</span>' : '';
    return '<div class="ja-fact">' +
      '<div class="jaf-val">' + _escHTML(f.val) + liveTag + '</div>' +
      '<div class="jaf-label">' + _escHTML(f.label) + '</div>' +
      '<div class="jaf-note">' + _escHTML(f.note) + '</div>' +
    '</div>';
  }).join('');
}

// Fetch live SA rates from World Bank (free, CORS-open, annual data)
function fetchLiveRates() {
  // SA CPI inflation
  fetch('https://api.worldbank.org/v2/country/ZA/indicator/FP.CPI.TOTL.ZG?format=json&mrv=3')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var rows = d && d[1];
      if (!rows) return;
      var latest = rows.filter(function(r) { return r.value != null; })
                       .sort(function(a, b) { return b.date - a.date; })[0];
      if (!latest) return;
      D.inflation = Math.round(latest.value * 10) / 10;
      D._inflationLive = true;
      D._inflationYear = latest.date;
      renderRates();
    }).catch(function() {});

  // SA lending rate (prime-rate proxy, annual avg)
  fetch('https://api.worldbank.org/v2/country/ZA/indicator/FR.INR.LEND?format=json&mrv=3')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var rows = d && d[1];
      if (!rows) return;
      var latest = rows.filter(function(r) { return r.value != null; })
                       .sort(function(a, b) { return b.date - a.date; })[0];
      if (!latest) return;
      var p = Math.round(latest.value * 100) / 100;
      if (p < 5 || p > 30) return; // sanity check
      D.primeRate = p;
      D.repoRate  = Math.round((p - 3.5) * 100) / 100;
      D._ratesLive = true;
      D._ratesYear = latest.date;
      renderRates();
      updateHeroBento();
    }).catch(function() {});
}

function showJourneyArticle(id) {
  var journey = JOURNEYS.find(function(j) { return j.id === id; });
  var article = JOURNEY_ARTICLES[id];
  if (!journey || !article) return;

  _activeJourney = id;
  _journeyCalcs  = journey.calcs;

  // Full calc cards (primary content — this is a calculator site)
  var calcCards = journey.calcs.map(function(cid) {
    var c = CALCS.find(function(x) { return x.id === cid; });
    if (!c) return '';
    var ico = (ICONS[c.iconName] || '').replace(/width="20" height="20"/g, 'width="28" height="28"');
    return '<button class="ja-calc-card" onclick="showCalc(\'' + c.id + '\')" aria-label="Open ' + _escHTML(c.title) + '">' +
      '<div class="ja-cc-icon ' + c.cat + '-bg">' + ico + '</div>' +
      '<div class="ja-cc-body">' +
        '<div class="ja-cc-title">' + _escHTML(c.title) + '</div>' +
        '<div class="ja-cc-desc">' + _escHTML(c.desc) + '</div>' +
      '</div>' +
      '<div class="ja-cc-arrow">&#8594;</div>' +
    '</button>';
  }).join('');

  // Article sections (at bottom — supplementary context)
  var sections = article.sections.map(function(s) {
    var tip = s.tip ? '<div class="ja-tip-box">' + _escHTML(s.tip) + '</div>' : '';
    return '<div class="ja-section">' +
      '<h3 class="ja-section-heading">' + _escHTML(s.heading) + '</h3>' +
      (s.html ? '<div class="ja-section-body ja-section-html">' + s.html + '</div>' : '<p class="ja-section-body">' + _escHTML(s.body) + '</p>') +
      tip +
    '</div>';
  }).join('');

  var sourceSuffix = D._ratesYear ? ' · World Bank ' + D._ratesYear : '';

  var html =
    '<div class="ja-wrap">' +
      '<div class="ja-banner" style="background:' + article.gradient + '">' +
        '<button class="ja-back" onclick="showHome()" aria-label="Back to home">' +
          ICONS['home'] + ' Home' +
        '</button>' +
        '<div class="ja-banner-inner">' +
          '<div class="ja-hero-ico">' + (ICONS[journey.icon] || '') + '</div>' +
          '<h1 class="ja-title">' + _escHTML(article.title) + '</h1>' +
          '<p class="ja-sub">' + _escHTML(article.sub) + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="ja-facts-strip" id="ja-facts-' + id + '">' + _buildFactsHTML(id) + '</div>' +

      '<div class="ja-body">' +
        '<div class="ja-calcs-section">' +
          '<p class="ja-section-label">Calculators</p>' +
          '<div class="ja-calcs-list">' + calcCards + '</div>' +
        '</div>' +

        '<div class="ja-guide-separator"><span class="ja-guide-label">SA Financial Guide</span></div>' +
        '<div class="ja-article">' + sections + '</div>' +

        '<div class="ja-sources">Sources: SARS 2026/27 · DMRE · SARB · Stats SA · National Credit Act' + sourceSuffix + '</div>' +
      '</div>' +
    '</div>';

  var container = document.getElementById('journey-article-content');
  if (container) container.innerHTML = html;

  document.getElementById('home-view').style.display = 'none';
  document.getElementById('calc-view').style.display = 'none';
  var jv = document.getElementById('journey-view');
  if (jv) jv.style.display = '';

  document.title = article.title + ' | Mzanzi Cals';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showJourney(id) {
  showJourneyArticle(id);
}

function clearJourney() {
  showHome();
}

// ── Hero Bento Update ─────────────────────────────────────────────
function updateHeroBento() {
  var elPrime = document.getElementById('hb-prime');
  var elP95   = document.getElementById('hb-p95');
  if (elPrime) elPrime.textContent = D.primeRate + '%';
  if (elP95) {
    var live = D._fuelLive
      ? '<span class="hb-live" aria-label="live data">&#9679;</span>'
      : '';
    elP95.innerHTML = 'R' + D.petrol95.toFixed(2) + live;
  }
}

// ═══════════════════════════════════════════════════════════════════
//  APS — Admission Point Score Calculator
// ═══════════════════════════════════════════════════════════════════

var UNI_APS_DATA = [
  { name:'UCT',              min:28, diploma:0,  notes:'Science/Eng/Med: 38–42' },
  { name:'Wits',             min:26, diploma:0,  notes:'Eng/Med/Law: 38+' },
  { name:'Stellenbosch',     min:28, diploma:0,  notes:'Medicine: 42; Law: 36' },
  { name:'UP (Pretoria)',    min:24, diploma:0,  notes:'Engineering: 34+' },
  { name:'UJ',               min:26, diploma:20, notes:'Engineering: 32+' },
  { name:'UKZN',             min:24, diploma:18, notes:'' },
  { name:'NWU',              min:24, diploma:20, notes:'' },
  { name:'UFS',              min:24, diploma:20, notes:'' },
  { name:'UWC',              min:25, diploma:20, notes:'' },
  { name:'Nelson Mandela',   min:24, diploma:20, notes:'' },
  { name:'Rhodes',           min:25, diploma:0,  notes:'Degree university only' },
  { name:'Fort Hare',        min:22, diploma:20, notes:'' },
  { name:'WSU',              min:20, diploma:18, notes:'' },
  { name:'Limpopo (UL)',     min:22, diploma:20, notes:'' },
  { name:'UNIZULU',          min:20, diploma:18, notes:'' },
  { name:'UNIVEN',           min:20, diploma:18, notes:'' },
  { name:'SMU',              min:22, diploma:20, notes:'Health sciences focus' },
  { name:'Sol Plaatje',      min:20, diploma:18, notes:'' },
  { name:'UMP',              min:20, diploma:18, notes:'' },
  { name:'UNISA',            min:23, diploma:20, notes:'Distance learning; uses all 7 subjs' },
  { name:'DUT',              min:24, diploma:20, notes:'' },
  { name:'TUT',              min:20, diploma:18, notes:'' },
  { name:'CPUT',             min:22, diploma:18, notes:'' },
  { name:'CUT',              min:20, diploma:18, notes:'' },
  { name:'VUT',              min:20, diploma:18, notes:'' },
  { name:'MUT',              min:20, diploma:18, notes:'' }
];

var APS_ROWS = [
  { id:'hl',   label:'Home Language',               lo:false },
  { id:'fal',  label:'First Additional Language',   lo:false },
  { id:'math', label:'Mathematics / Math Literacy', lo:false },
  { id:'s4',   label:'Subject 4 (Elective)',         lo:false },
  { id:'s5',   label:'Subject 5 (Elective)',         lo:false },
  { id:'s6',   label:'Subject 6 (Elective)',         lo:false },
  { id:'lo',   label:'Life Orientation',             lo:true  }
];

function _markToLevel(m) {
  if (m >= 80) return 7;
  if (m >= 70) return 6;
  if (m >= 60) return 5;
  if (m >= 50) return 4;
  if (m >= 40) return 3;
  if (m >= 30) return 2;
  return 1;
}

function renderAPS() {
  var rows = APS_ROWS.map(function(s) {
    var rightEl = s.lo
      ? '<span class="aps-lo-tag">not counted</span>'
      : '<span class="aps-lvl" id="aps_' + s.id + '_lvl">–</span>';
    return '<div class="aps-row">' +
      '<span class="aps-row-lbl">' + _escHTML(s.label) + '</span>' +
      '<div class="aps-row-right">' +
        '<div class="iw sfx">' +
          '<input type="number" id="aps_' + s.id + '" min="0" max="100" placeholder="%" ' +
            'class="aps-pct" oninput="_calcAPS()">' +
          '<span class="isfx">%</span>' +
        '</div>' +
        rightEl +
      '</div>' +
    '</div>';
  }).join('');

  document.getElementById('calc-form').innerHTML =
    '<div class="aps-intro">Enter your NSC percentage for each subject. Life Orientation is excluded. ' +
    'APS = sum of levels for your 6 counted subjects (max <strong>42</strong>).</div>' +
    '<div class="aps-scale">' +
      '<span class="asc asc-7">80%+ = L7</span><span class="asc asc-6">70–79% = L6</span>' +
      '<span class="asc asc-5">60–69% = L5</span><span class="asc asc-4">50–59% = L4</span>' +
      '<span class="asc asc-3">40–49% = L3</span><span class="asc asc-2">30–39% = L2</span>' +
    '</div>' +
    '<div class="aps-subjects">' + rows + '</div>';

  window._calcAPS = function() {
    var scored = APS_ROWS.filter(function(s){ return !s.lo; }).map(function(s) {
      var el = document.getElementById('aps_' + s.id);
      var v  = el ? parseFloat(el.value) : NaN;
      var m  = (!isNaN(v) && v >= 0 && v <= 100) ? v : null;
      var lvl = m !== null ? _markToLevel(m) : 0;
      var badge = document.getElementById('aps_' + s.id + '_lvl');
      if (badge) {
        badge.textContent = m !== null ? 'L' + lvl : '–';
        badge.className   = 'aps-lvl' + (m !== null ? ' alvl-' + lvl : '');
      }
      return { label: s.label, mark: m, level: lvl, entered: m !== null };
    });

    var entered = scored.filter(function(s){ return s.entered; });
    if (!entered.length) return;

    var aps = entered.reduce(function(sum,s){ return sum + s.level; }, 0);
    var note = entered.length >= 6 ? 'All 6 subjects entered' : entered.length + ' of 6 subjects — enter all for a complete APS';

    var studyGuide;
    if      (aps >= 36) studyGuide = 'Eligible for Medicine, Law and Engineering at UCT, Wits and Stellenbosch. Top programmes in any faculty.';
    else if (aps >= 30) studyGuide = 'Eligible for degree programmes at most SA universities. Competitive professional degrees need 36–42.';
    else if (aps >= 26) studyGuide = 'Eligible for degree programmes at UJ, UKZN, NWU, UFS, UNISA and many others.';
    else if (aps >= 22) studyGuide = 'Eligible for diploma programmes at universities of technology. UNISA distance degrees may be an option.';
    else if (aps >= 18) studyGuide = 'TVET N1–N6 programmes and certificate courses. Consider a bridging year at some universities.';
    else                studyGuide = 'Focus on supplementary exams or rewriting key subjects. TVET colleges offer bridging and skills programmes.';

    var breakdownRows = entered.map(function(s){
      return [s.label, 'Level ' + s.level + ' (' + s.mark + '%)'];
    });
    breakdownRows.push(null);
    breakdownRows.push(['APS Total', aps + ' / ' + (entered.length * 7), aps >= 28 ? 'green' : aps >= 20 ? '' : 'red', true]);

    var qualDeg = UNI_APS_DATA.filter(function(u){ return u.min > 0 && aps >= u.min; }).length;

    var uniGrid = '<div class="aps-uni-grid">' +
      UNI_APS_DATA.map(function(u) {
        var deg = u.min > 0 && aps >= u.min;
        var dip = u.diploma > 0 && aps >= u.diploma && !deg;
        var cls = deg ? 'au-deg' : (dip ? 'au-dip' : 'au-no');
        return '<div class="aps-uni ' + cls + '">' +
          '<span class="au-name">' + _escHTML(u.name) + '</span>' +
          '<span class="au-status">' + (deg ? 'Degree ✓' : dip ? 'Diploma ○' : 'Below min') + '</span>' +
          (u.notes ? '<span class="au-note">' + _escHTML(u.notes) + '</span>' : '') +
        '</div>';
      }).join('') +
    '</div>';

    showResult(
      resultCard('Your APS Score', aps + ' / 42', note, breakdownRows, (aps/42)*100, aps>=28?'bar-green':aps>=20?'bar-amber':'bar-red') +
      '<div class="aps-study-box"><strong>What you can study:</strong> ' + studyGuide + '</div>' +
      '<h4 class="aps-uni-heading">University Eligibility &mdash; ' + qualDeg + '/26 for degree</h4>' +
      uniGrid
    );
    updateMobileBar('APS Score', aps + ' / 42');
  };
  window._calc = window._calcAPS;
}

// ═══════════════════════════════════════════════════════════════════
//  Two-Pot Retirement Calculator
// ═══════════════════════════════════════════════════════════════════
function renderTwoPot() {
  // T-Day: 1 September 2024 (Revenue Laws Amendment Act 12/2024)
  var TDAY = new Date(2024, 8, 1);
  var NOW  = new Date();
  var monthsSinceTDay = Math.max(0,
    (NOW.getFullYear() - TDAY.getFullYear()) * 12 + (NOW.getMonth() - TDAY.getMonth()));

  document.getElementById('calc-form').innerHTML =
    fsect('Your retirement fund') +
    '<div class="tp-fund-row">' +
      '<span class="tp-fund-label">Fund type</span>' +
      '<div class="radio-grp tp-fund-grp">' +
        '<label class="ro"><input type="radio" name="tp_ft" id="tp_ft_pen" value="pension" checked onchange="_calcTwoPot()"><label for="tp_ft_pen">Pension Fund</label></label>' +
        '<label class="ro"><input type="radio" name="tp_ft" id="tp_ft_pro" value="provident" onchange="_calcTwoPot()"><label for="tp_ft_pro">Provident Fund</label></label>' +
        '<label class="ro"><input type="radio" name="tp_ft" id="tp_ft_ra" value="ra" onchange="_calcTwoPot()"><label for="tp_ft_ra">Retirement Annuity</label></label>' +
        '<label class="ro"><input type="radio" name="tp_ft" id="tp_ft_gep" value="gepf" onchange="_calcTwoPot()"><label for="tp_ft_gep">GEPF (Government)</label></label>' +
      '</div>' +
    '</div>' +
    field('tp_vested','Balance at 31 August 2024',moneyInput('tp_vested','','500000'),'total fund on T-Day · seeding was automatic on 1 Sep 2024',
      'Your total retirement fund balance as at 31 August 2024. The system automatically transferred 10% (max R30,000; GEPF: R25,000) to your Savings Pot on 1 September 2024.') +
    field('tp_contrib','Monthly contribution (your share)',moneyInput('tp_contrib','','3000'),'after T-Day: 1/3 → savings pot · 2/3 → retirement pot') +
    sliderField('tp_rate','Expected annual return',4,18,0.5,10,'','','%','Balanced 8–12% · Conservative 5–8% · Aggressive 12–16% · SA equity avg ≈ CPI+7%') +
    field('tp_age','Current age',plainInput('tp_age','35','35',' yrs')) +
    sliderField('tp_years','Years until retirement',1,40,1,20,'','','yrs') +

    fsect('Savings pot withdrawal (this tax year)') +
    '<p class="field-hint">Once per tax year (1 Mar–28 Feb) · Minimum R2,000 · Admin fee deducted before tax · Taxed at your marginal rate · SARS Tax Directive issued by your fund</p>' +
    '<div class="radio-grp">' +
      '<label class="ro"><input type="radio" name="tp_wopt" id="tp_wno" value="no" checked onchange="_calcTwoPot()"><label for="tp_wno">No withdrawal this year</label></label>' +
      '<label class="ro"><input type="radio" name="tp_wopt" id="tp_wyes" value="yes" onchange="document.getElementById(\'tp_wsec\').style.display=\'\';_calcTwoPot()"><label for="tp_wyes">Calculate a withdrawal</label></label>' +
    '</div>' +
    '<div id="tp_wsec" style="display:none">' +
      field('tp_wamt','Amount to withdraw',moneyInput('tp_wamt','','10000'),'minimum R2,000 · cannot exceed your savings pot balance') +
      presetChips('tp_wamt',[{l:'R2k (min)',v:2000},{l:'R5k',v:5000},{l:'R10k',v:10000},{l:'R20k',v:20000},{l:'R30k (max seed)',v:30000}]) +
      field('tp_salary','Annual taxable income (before withdrawal)',moneyInput('tp_salary','','350000'),'salary/wages before the withdrawal — withdrawal adds on top for marginal rate calculation',
        'Enter your gross employment income. The Two-Pot withdrawal amount is added on top and the combined total determines your marginal tax rate for the withdrawal.') +
      field('tp_admin','Admin fee charged by your fund',moneyInput('tp_admin','','300'),'deducted BEFORE tax · Old Mutual R250–R300 · Momentum R250–R350 · 10X R300 excl VAT · Sanlam R330+VAT') +
    '</div>';

  function _calcTwoPot() {
    var vested   = num('tp_vested')  || 0;
    var contrib  = num('tp_contrib') || 0;
    var rate     = (num('tp_rate')   || 10) / 100;
    var years    = intval('tp_years')|| 20;
    var age      = num('tp_age')     || 35;
    var wNo      = document.getElementById('tp_wno');
    var doW      = wNo && !wNo.checked;
    var wAmt     = num('tp_wamt')    || 0;
    var salary   = num('tp_salary')  || 0;
    var adminFee = num('tp_admin')   || 300;
    var gepfEl   = document.getElementById('tp_ft_gep');
    var isGEPF   = gepfEl && gepfEl.checked;

    // Seeding: 10% of vested balance, capped at R30,000 (GEPF: R25,000)
    var seedCap   = isGEPF ? 25000 : 30000;
    var seeding   = Math.min(vested * 0.10, seedCap);
    var vestedRem = Math.max(0, vested - seeding);

    // Contribution split: 1/3 savings pot, 2/3 retirement pot
    var mRate = rate / 12;
    var savC  = contrib / 3;
    var retC  = contrib * 2 / 3;

    // Current pot estimates (compound growth since T-Day + monthly contributions)
    var curSav = seeding;
    var curRet = vestedRem;
    for (var m = 0; m < monthsSinceTDay; m++) {
      curSav = curSav * (1 + mRate) + savC;
      curRet = curRet * (1 + mRate) + retC;
    }

    // Project both pots forward to retirement
    var savPot = curSav;
    var retPot = curRet;
    var futMo  = years * 12;
    for (var m2 = 0; m2 < futMo; m2++) {
      savPot = savPot * (1 + mRate) + savC;
      retPot = retPot * (1 + mRate) + retC;
    }

    // Withdrawal tax: admin fee deducted FIRST, then marginal tax on remainder
    var adminDed = 0, withdrawTax = 0, netW = 0;
    var margPct = 0, salTax = 0, combTax = 0, bracketWarn = false;
    if (doW && wAmt >= 2000) {
      adminDed     = Math.min(adminFee, wAmt);
      var taxableW = Math.max(0, wAmt - adminDed);
      salTax       = calcTax(salary, age, 0).tax;
      combTax      = calcTax(salary + taxableW, age, 0).tax;
      withdrawTax  = Math.max(0, combTax - salTax);
      netW         = wAmt - adminDed - withdrawTax;
      margPct      = taxableW > 0 ? (withdrawTax / taxableW) : 0;
      bracketWarn  = margPct >= 0.36;
    }

    var retireAge = Math.min(100, age + years);

    // ── Pot visualisation bar ──────────────────────────────────
    var totalNow = curSav + curRet + vestedRem;
    var pieHTML  = '';
    if (totalNow > 0 && vested > 0) {
      var sp = Math.round((curSav   / totalNow) * 100);
      var rp = Math.round((curRet   / totalNow) * 100);
      var vp = Math.max(0, 100 - sp - rp);
      pieHTML =
        '<div class="tp-pots-visual">' +
          '<div class="tp-pots-title">Estimated current pot breakdown</div>' +
          '<div class="tp-pot-bar">' +
            '<div class="tp-pot-seg tp-seg-sav" style="width:' + sp + '%" title="Savings Pot: ' + R(Math.round(curSav)) + '"></div>' +
            '<div class="tp-pot-seg tp-seg-ret" style="width:' + rp + '%" title="Retirement Pot: ' + R(Math.round(curRet)) + '"></div>' +
            (vp > 0 ? '<div class="tp-pot-seg tp-seg-ves" style="width:' + vp + '%" title="Vested Pot: ' + R(Math.round(vestedRem)) + '"></div>' : '') +
          '</div>' +
          '<div class="tp-pot-legend">' +
            '<span class="tp-leg tp-leg-sav">Savings Pot <strong>' + R(Math.round(curSav)) + '</strong><em>accessible once/year</em></span>' +
            '<span class="tp-leg tp-leg-ret">Retirement Pot <strong>' + R(Math.round(curRet)) + '</strong><em>locked until 55+</em></span>' +
            (vestedRem > 0 ? '<span class="tp-leg tp-leg-ves">Vested Pot <strong>' + R(Math.round(vestedRem)) + '</strong><em>old rules</em></span>' : '') +
          '</div>' +
        '</div>';
    }

    // ── Withdrawal breakdown panel ─────────────────────────────
    var wdrawHTML = '';
    if (doW && wAmt >= 2000) {
      var effPct  = (margPct * 100).toFixed(1);
      var keepPct = Math.max(0, 100 - margPct * 100).toFixed(0);
      var netSafe = Math.max(0, netW);
      wdrawHTML =
        '<div class="tp-withdraw-result">' +
          '<div class="tp-net-box">' +
            '<span class="tp-net-label">You\'ll actually receive</span>' +
            '<span class="tp-net-value' + (netW < 0 ? ' tp-red' : '') + '">' + R(Math.round(netSafe)) + '</span>' +
            '<span class="tp-net-pct">You keep ' + keepPct + 'c of every rand withdrawn</span>' +
          '</div>' +
          '<table class="tp-tax-table">' +
            '<tr><td>Withdrawal requested</td><td>' + R(wAmt) + '</td></tr>' +
            '<tr class="tp-row-fee"><td>Admin fee (deducted first)</td><td class="tp-red">&#8722;' + R(Math.round(adminDed)) + '</td></tr>' +
            '<tr><td>Taxable withdrawal amount</td><td>' + R(Math.round(wAmt - adminDed)) + '</td></tr>' +
            '<tr><td class="tp-muted" colspan="2"></td></tr>' +
            '<tr class="tp-muted"><td>PAYE on salary only (' + R(salary) + ')</td><td>' + R(Math.round(salTax)) + '</td></tr>' +
            '<tr class="tp-muted"><td>PAYE on salary + withdrawal</td><td>' + R(Math.round(combTax)) + '</td></tr>' +
            '<tr class="tp-row-tax"><td>Tax withheld (marginal ' + effPct + '%)</td><td class="tp-red">&#8722;' + R(Math.round(withdrawTax)) + '</td></tr>' +
            '<tr class="tp-row-net"><td><strong>Net amount received</strong></td><td class="tp-green"><strong>' + R(Math.round(netSafe)) + '</strong></td></tr>' +
          '</table>' +
          (bracketWarn ?
            '<div class="tp-warn-box"><strong>High-tax alert:</strong> At your income level, ' + effPct + '% of every rand withdrawn goes to SARS. You keep only ' + keepPct + 'c per rand. Consider withdrawing less, or wait until a lower-income year (e.g. after retirement when you may be in a lower bracket).</div>'
          : (margPct >= 0.26 ?
            '<div class="tp-info-box">At a ' + effPct + '% marginal rate you keep ' + keepPct + 'c of every rand. Factor this into your decision — a personal loan at prime+5% may cost less in total than the tax on this withdrawal.</div>'
          : '')) +
          (isGEPF ? '<div class="tp-info-box"><strong>GEPF:</strong> Allow up to 60 working days for processing. Each annual withdrawal reduces your GEPF pension by approximately 4 months of pensionable service.</div>' : '') +
        '</div>';
    }

    // ── Main result rows ───────────────────────────────────────
    var rows = [
      ['Seeding on 1 Sep 2024',              R(Math.round(seeding))],
      ['Estimated savings pot (now)',        R(Math.round(curSav)),  'green'],
      ['Estimated retirement pot (now)',     R(Math.round(curRet)),  'green'],
      null,
      ['Savings pot at age ' + retireAge,    R(Math.round(savPot)),  'green'],
      ['Retirement pot at age ' + retireAge, R(Math.round(retPot)),  'green', true],
      ['Vested pot (pre-Sep 2024, old rules)',R(Math.round(vestedRem))],
      null,
      ['Monthly → savings (1/3)',            R(Math.round(savC))],
      ['Monthly → retirement (2/3)',         R(Math.round(retC))],
    ];

    showResult(
      pieHTML +
      resultCard(
        'Retirement pot at age ' + retireAge, R(Math.round(retPot)),
        'Savings pot: ' + R(Math.round(savPot)) + ' · ' + years + ' yrs at ' + (rate*100).toFixed(1) + '% p.a.',
        rows,
        Math.min(100, (retPot / (retPot + savPot + 1)) * 100), 'bar-green'
      ) +
      wdrawHTML
    );
    updateMobileBar('Retirement Pot', R(Math.round(retPot)));
  }

  window._calcTwoPot = _calcTwoPot;
  window._calc = _calcTwoPot;
  on(['tp_vested','tp_contrib','tp_rate','tp_rate_sl','tp_years','tp_years_sl','tp_wamt','tp_salary','tp_age','tp_admin'], _calcTwoPot);
  syncAllSliders();
  _calcTwoPot();
}

// ═══════════════════════════════════════════════════════════════════
//  NSFAS Eligibility Calculator
// ═══════════════════════════════════════════════════════════════════
function renderNSFAS() {
  document.getElementById('calc-form').innerHTML =
    field('ns_income','Combined annual household income',moneyInput('ns_income','','180000'),
      'all earners in your home — salaries, grants, rentals, SASSA', 'Include income from parents, guardians and any other adults in the household.') +
    field('ns_type','Programme type',
      '<div class="radio-grp">' +
        '<label class="ro"><input type="radio" name="ns_type" id="ns_uni" value="university" checked onchange="_calcNSFAS()"><label for="ns_uni">University (degree / diploma)</label></label>' +
        '<label class="ro"><input type="radio" name="ns_type" id="ns_tvet" value="tvet" onchange="_calcNSFAS()"><label for="ns_tvet">TVET College (N1–N6)</label></label>' +
      '</div>') +
    field('ns_dis','Disability',
      '<div class="radio-grp">' +
        '<label class="ro"><input type="radio" name="ns_dis" id="ns_dis_no" value="no" checked onchange="_calcNSFAS()"><label for="ns_dis_no">No disability</label></label>' +
        '<label class="ro"><input type="radio" name="ns_dis" id="ns_dis_yes" value="yes" onchange="_calcNSFAS()"><label for="ns_dis_yes">I qualify for disability allowance</label></label>' +
      '</div>');

  function _calcNSFAS() {
    var income = num('ns_income');
    var uniEl  = document.getElementById('ns_uni');
    var disEl  = document.getElementById('ns_dis_yes');
    var isUni  = !uniEl || uniEl.checked;
    var isDis  = disEl && disEl.checked;

    if (!income) return;

    var threshold = isUni ? 600000 : 350000;
    var eligible  = income <= threshold;

    var allocs = {
      living:  15750,
      books:    5460,
      accomm:  isUni ? 53550 : 25000,
      transport: 7700,
      disability: isDis ? 8950 : 0
    };
    var totalMax = allocs.living + allocs.books + allocs.accomm + allocs.transport + allocs.disability;

    var rows, extra;
    if (eligible) {
      rows = [
        ['Living allowance / year',         R(allocs.living)],
        ['Book allowance / year',            R(allocs.books)],
        ['Accommodation support / year',     'Up to ' + R(allocs.accomm)],
        ['Transport support / year',         'Up to ' + R(allocs.transport)],
        isDis ? ['Disability allowance / year', R(allocs.disability)] : null,
        null,
        ['Maximum NSFAS funding / year',     R(totalMax), 'green', true],
      ];
      extra = '<div class="nsfas-tip">' +
        '<strong>Apply at nsfas.org.za</strong> — window opens August, closes November. ' +
        'Applications are free. Required: SA ID, household income proof (salary slips or SASSA letter), proof of registration or acceptance letter.' +
      '</div>';
    } else {
      rows = [
        ['Your household income',    R(income)],
        [isUni ? 'University threshold' : 'TVET threshold', R(threshold)],
        ['Above threshold by',       R(income - threshold), 'red', true],
      ];
      extra = '<div class="nsfas-tip">' +
        '<strong>You may be "missing middle".</strong> Options: Funza Lushaka (teaching bursary — fully funded), ' +
        'ISFAP bursary programme, SETA sector bursaries, corporate bursaries (FNB, Nedbank, Sasol, etc.), ' +
        'and student loans from ABSA, Standard Bank or Nedbank at prime rate.' +
      '</div>';
    }

    showResult(
      resultCard(
        'NSFAS Eligibility',
        eligible ? 'Likely qualifies' : 'Income too high',
        'Household income ' + R(income) + ' vs ' + (isUni?'university':'TVET') + ' threshold ' + R(threshold),
        rows,
        Math.min(100, (threshold / income) * 100),
        eligible ? 'bar-green' : 'bar-red'
      ) + extra
    );
    updateMobileBar('NSFAS', eligible ? 'Likely qualifies' : 'Above threshold');
  }

  window._calcNSFAS = _calcNSFAS;
  window._calc = _calcNSFAS;
  on(['ns_income'], _calcNSFAS);
  _calcNSFAS();
}

// ═══════════════════════════════════════════════════════════════════
//  SASSA Grant Eligibility Calculator
// ═══════════════════════════════════════════════════════════════════
var SASSA_GRANTS_DATA = {
  oldAge:        { name:'Old Age Grant (60–74)',     amount:2190 },
  oldAge75:      { name:'Old Age Grant (75+)',        amount:2210 },
  disability:    { name:'Disability Grant',           amount:2190 },
  childSupport:  { name:'Child Support Grant',        amount:560, perChild:true },
  foster:        { name:'Foster Child Grant',         amount:1180, perChild:true },
  careDep:       { name:'Care Dependency Grant',      amount:2190, perChild:true },
  grantInAid:    { name:'Grant-in-Aid (add-on)',      amount:530 },
  srd:           { name:'SRD Grant (temp. relief)',   amount:370 }
};

function renderSASSA() {
  document.getElementById('calc-form').innerHTML =
    fsect('About you') +
    field('sa_age',  'Your age', plainInput('sa_age','35','35',' years')) +
    field('sa_inc',  'Your monthly income (all sources)', moneyInput('sa_inc','0','0'), 'pensions, wages, rent etc. — 0 if unemployed') +
    field('sa_marr', 'Marital status',
      '<div class="radio-grp"><label class="ro"><input type="radio" name="sa_marr" id="sa_single" value="single" checked onchange="_calcSASSA()"><label for="sa_single">Single / unmarried</label></label>' +
      '<label class="ro"><input type="radio" name="sa_marr" id="sa_married" value="married" onchange="_calcSASSA()"><label for="sa_married">Married / partner</label></label></div>') +
    field('sa_spouse_inc', 'Spouse/partner monthly income', moneyInput('sa_spouse_inc','0','0'), 'if applicable') +
    fsect('Disability & care') +
    field('sa_dis', 'Do you have a disability (age 18–59)?',
      '<div class="radio-grp"><label class="ro"><input type="radio" name="sa_dis" id="sa_dis_no" value="no" checked onchange="_calcSASSA()"><label for="sa_dis_no">No</label></label>' +
      '<label class="ro"><input type="radio" name="sa_dis" id="sa_dis_yes" value="yes" onchange="_calcSASSA()"><label for="sa_dis_yes">Yes — SASSA medical assessment required</label></label></div>') +
    field('sa_care', 'Do you need full-time care from another person?',
      '<div class="radio-grp"><label class="ro"><input type="radio" name="sa_care" id="sa_care_no" value="no" checked onchange="_calcSASSA()"><label for="sa_care_no">No</label></label>' +
      '<label class="ro"><input type="radio" name="sa_care" id="sa_care_yes" value="yes" onchange="_calcSASSA()"><label for="sa_care_yes">Yes</label></label></div>') +
    fsect('Children') +
    field('sa_kids', 'Number of children you support (0–18 years)', plainInput('sa_kids','0','0',' children')) +
    field('sa_foster', 'Number of foster children (court order)', plainInput('sa_foster','0','0',' children')) +
    field('sa_caredep', 'Children with severe disability (Care Dependency)', plainInput('sa_caredep','0','0',' children'));

  function _calcSASSA() {
    var age       = num('sa_age');
    var myInc     = num('sa_inc');
    var married   = document.getElementById('sa_married') && document.getElementById('sa_married').checked;
    var spInc     = num('sa_spouse_inc');
    var disabled  = document.getElementById('sa_dis_yes') && document.getElementById('sa_dis_yes').checked;
    var needsCare = document.getElementById('sa_care_yes') && document.getElementById('sa_care_yes').checked;
    var kids      = Math.max(0, intval('sa_kids'));
    var foster    = Math.max(0, intval('sa_foster'));
    var careDep   = Math.max(0, intval('sa_caredep'));

    var annualInc = (myInc + (married ? spInc : 0)) * 12;

    var grants = [];
    var total  = 0;

    // Old Age Grant — income thresholds (2026)
    var oaLimit = married ? 186384 : 93192;
    if (age >= 75 && annualInc <= oaLimit) {
      grants.push({ name: 'Old Age Grant (75+)', amount: 2210, note: 'Highest rate for 75 and older' });
      total += 2210;
      if (needsCare) { grants.push({ name: 'Grant-in-Aid (add-on)', amount: 530, note: 'For those needing full-time care' }); total += 530; }
    } else if (age >= 60 && annualInc <= oaLimit) {
      grants.push({ name: 'Old Age Grant (60–74)', amount: 2190, note: 'Income within R' + oaLimit.toLocaleString() + '/yr threshold' });
      total += 2190;
      if (needsCare) { grants.push({ name: 'Grant-in-Aid (add-on)', amount: 530, note: 'For those needing full-time care' }); total += 530; }
    }

    // Disability Grant — age 18–59
    var disLimit = married ? 186384 : 93192;
    if (disabled && age >= 18 && age <= 59 && annualInc <= disLimit && grants.length === 0) {
      grants.push({ name: 'Disability Grant', amount: 2190, note: 'Subject to SASSA medical assessment' });
      total += 2190;
      if (needsCare) { grants.push({ name: 'Grant-in-Aid (add-on)', amount: 530, note: 'For those needing full-time care' }); total += 530; }
    }

    // Child Support Grant — caregiver income threshold lower
    var csLimit = married ? 117600 : 58800;
    if (kids > 0 && annualInc <= csLimit) {
      grants.push({ name: 'Child Support Grant ×' + kids, amount: 560 * kids, note: 'R560/child/month for ' + kids + ' child' + (kids > 1 ? 'ren' : '') });
      total += 560 * kids;
    } else if (kids > 0) {
      grants.push({ name: 'Child Support Grant', amount: 0, note: 'Income R' + (annualInc/12).toLocaleString() + '/month may exceed R' + (csLimit/12).toLocaleString() + '/month threshold — verify at SASSA office' });
    }

    // Foster Child Grant
    if (foster > 0) {
      grants.push({ name: 'Foster Child Grant ×' + foster, amount: 1180 * foster, note: 'R1,180/child/month — court order required' });
      total += 1180 * foster;
    }

    // Care Dependency Grant
    if (careDep > 0) {
      grants.push({ name: 'Care Dependency Grant ×' + careDep, amount: 2190 * careDep, note: 'R2,190/child/month for severely disabled children' });
      total += 2190 * careDep;
    }

    // SRD fallback
    if (grants.length === 0 && myInc === 0) {
      grants.push({ name: 'SRD Grant (Social Relief of Distress)', amount: 370, note: 'Temporary — while unemployed and awaiting another grant. Apply at srd.sassa.gov.za' });
      total += 370;
    }

    var rows = grants.map(function(g) {
      return [g.name, g.amount > 0 ? R(g.amount) + '/month' : 'Check at SASSA', g.amount > 0 ? 'green' : ''];
    });
    rows.push(null);
    rows.push(['Total SASSA income', R(total) + '/month', 'green', true]);

    var sub = grants.length > 0 && total > 0
      ? 'Estimated monthly SASSA income: ' + R(total)
      : grants.length > 0 ? 'Some grants may apply — verify at your nearest SASSA office'
      : 'No grants found based on inputs — verify at your nearest SASSA office';

    showResult(resultCard(
      grants.length > 0 && total > 0 ? 'Estimated Monthly SASSA Total' : 'SASSA Eligibility',
      total > 0 ? R(total) + '/month' : 'Visit SASSA office',
      sub, rows,
      total > 0 ? Math.min(100, (total / 5000) * 100) : 0,
      total > 0 ? 'bar-green' : 'bar-amber'
    ) +
    '<div class="sassa-note"><strong>Important:</strong> This is an estimate only. Final eligibility is determined by SASSA based on a full means test, asset assessment and (for disability) medical evaluation. All amounts are 2026 rates. Visit <a href="https://www.sassa.gov.za" target="_blank" rel="noopener" style="color:#4ADE80">sassa.gov.za</a> or call 0800 60 10 11 (toll-free).</div>');
    updateMobileBar('SASSA Total', total > 0 ? R(total) + '/month' : 'Check at SASSA');
  }

  window._calc = _calcSASSA;
  on(['sa_age','sa_inc','sa_spouse_inc','sa_kids','sa_foster','sa_caredep'], _calcSASSA);
  _calcSASSA();
}

// ═══════════════════════════════════════════════════════════════════
//  Home Appliance Electricity Calculator
// ═══════════════════════════════════════════════════════════════════
var APPLIANCE_LIST = [
  { id:'geyser',  name:'Geyser (150L)',       watts:3500,  defaultHrs:2,   cat:'heating' },
  { id:'stove',   name:'Electric Stove/Oven', watts:2500,  defaultHrs:1,   cat:'cooking' },
  { id:'kettle',  name:'Kettle',              watts:2200,  defaultHrs:0.5, cat:'cooking' },
  { id:'micro',   name:'Microwave',           watts:1100,  defaultHrs:0.25,cat:'cooking' },
  { id:'fridge',  name:'Fridge/Freezer',      watts:150,   defaultHrs:24,  cat:'cooling', always:true },
  { id:'aircon',  name:'Air Conditioner',     watts:1800,  defaultHrs:4,   cat:'cooling', off:true },
  { id:'heater',  name:'Heater/Radiator',     watts:2000,  defaultHrs:4,   cat:'heating', off:true },
  { id:'wash',    name:'Washing Machine',     watts:2000,  defaultHrs:1,   cat:'laundry' },
  { id:'dryer',   name:'Tumble Dryer',        watts:2500,  defaultHrs:1,   cat:'laundry', off:true },
  { id:'tv',      name:'TV (LED 50")',         watts:120,   defaultHrs:4,   cat:'entertainment' },
  { id:'dstv',    name:'DStv Decoder',        watts:30,    defaultHrs:6,   cat:'entertainment' },
  { id:'laptop',  name:'Laptop',              watts:65,    defaultHrs:8,   cat:'entertainment' },
  { id:'lights',  name:'Lights (×8 LED)',     watts:64,    defaultHrs:5,   cat:'lighting' },
  { id:'pool',    name:'Pool Pump',           watts:1200,  defaultHrs:6,   cat:'other', off:true },
  { id:'iron',    name:'Iron',                watts:1800,  defaultHrs:0.5, cat:'laundry' },
  { id:'hair',    name:'Hair Dryer',          watts:1800,  defaultHrs:0.25,cat:'other' },
  { id:'dishw',   name:'Dishwasher',          watts:1500,  defaultHrs:1,   cat:'cooking', off:true },
  { id:'eblanket',name:'Electric Blanket',    watts:120,   defaultHrs:8,   cat:'heating', off:true }
];

function renderAppliances() {
  var tariffOpts = [['2.21','Eskom Direct (R2.21/kWh)'],['2.80','Muni Low (R2.80/kWh)'],['3.50','Muni Avg (R3.50/kWh)'],['4.20','Muni High (R4.20/kWh)'],['custom','Custom rate']];

  var appRows = APPLIANCE_LIST.map(function(a) {
    var checked = !a.off ? ' checked' : '';
    return '<div class="app-row" id="approw_' + a.id + '">' +
      '<label class="app-check"><input type="checkbox" id="app_on_' + a.id + '" ' + checked + ' onchange="_calcAppl()">' +
        '<span class="app-name">' + _escHTML(a.name) + '</span>' +
      '</label>' +
      '<div class="app-inputs">' +
        '<div class="iw sfx app-watts-w"><input type="number" id="app_w_' + a.id + '" value="' + a.watts + '" min="0" step="10" oninput="_calcAppl()"><span class="isfx">W</span></div>' +
        '<div class="iw sfx app-hrs-w"><input type="number" id="app_h_' + a.id + '" value="' + a.defaultHrs + '" min="0" max="24" step="0.25" oninput="_calcAppl()"><span class="isfx">hrs/day</span></div>' +
        '<span class="app-cost" id="app_cost_' + a.id + '">—</span>' +
      '</div>' +
    '</div>';
  }).join('');

  document.getElementById('calc-form').innerHTML =
    '<div class="app-header-row">' +
      field('ap_tariff', 'Electricity rate', selectInput('ap_tariff', tariffOpts)) +
      '<div id="ap_custom_wrap" style="display:none">' +
        field('ap_custom', 'Custom rate', '<div class="iw sfx"><input type="number" id="ap_custom" value="3.50" step="0.01" min="0" oninput="_calcAppl()"><span class="isfx">R/kWh</span></div>') +
      '</div>' +
    '</div>' +
    '<div class="app-col-labels"><span>Appliance</span><span>Watts</span><span>Hrs/day</span><span>R/month</span></div>' +
    '<div class="app-list">' + appRows + '</div>';

  document.getElementById('ap_tariff').addEventListener('change', function() {
    var cw = document.getElementById('ap_custom_wrap');
    if (cw) cw.style.display = this.value === 'custom' ? '' : 'none';
    _calcAppl();
  });

  function _calcAppl() {
    var tariffEl = document.getElementById('ap_tariff');
    var tariffV  = tariffEl ? tariffEl.value : '3.50';
    var rate = tariffV === 'custom' ? (num('ap_custom') || 3.50) : parseFloat(tariffV);

    var items = [];
    APPLIANCE_LIST.forEach(function(a) {
      var onEl = document.getElementById('app_on_' + a.id);
      var wEl  = document.getElementById('app_w_'  + a.id);
      var hEl  = document.getElementById('app_h_'  + a.id);
      var costEl = document.getElementById('app_cost_' + a.id);
      if (!onEl || !wEl || !hEl) return;
      var active = onEl.checked;
      var watts  = parseFloat(wEl.value) || 0;
      var hrs    = parseFloat(hEl.value) || 0;
      var kwh_day  = (watts / 1000) * hrs;
      var kwh_mo   = kwh_day * 30;
      var cost_mo  = kwh_mo * rate;
      if (costEl) costEl.textContent = active ? 'R ' + cost_mo.toFixed(0) : '—';
      if (active && watts > 0 && hrs > 0) items.push({ name:a.name, kwhDay:kwh_day, costMo:cost_mo });
    });

    var totalKwh = items.reduce(function(s,i){ return s + i.kwhDay; }, 0);
    var totalMo  = items.reduce(function(s,i){ return s + i.costMo; }, 0);
    var totalAnn = totalMo * 12;

    items.sort(function(a,b){ return b.costMo - a.costMo; });
    var topRows = items.slice(0,8).map(function(i) {
      return [i.name, 'R ' + i.costMo.toFixed(0) + '/mo  (' + (i.kwhDay * 30).toFixed(0) + ' kWh)'];
    });
    topRows.push(null);
    topRows.push(['Total daily usage', (totalKwh).toFixed(2) + ' kWh/day']);
    topRows.push(['Total monthly cost', R(Math.round(totalMo)), 'green', true]);
    topRows.push(['Total annual cost', R(Math.round(totalAnn))]);

    showResult(resultCard(
      'Monthly Electricity Cost', R(Math.round(totalMo)),
      (totalKwh * 30).toFixed(0) + ' kWh/month · at R' + rate.toFixed(2) + '/kWh',
      topRows,
      Math.min(100, (totalMo / 5000) * 100),
      totalMo < 1000 ? 'bar-green' : totalMo < 2500 ? 'bar-amber' : 'bar-red'
    ));
    updateMobileBar('Monthly Cost', R(Math.round(totalMo)));
  }

  window._calcAppl = _calcAppl;
  window._calc = _calcAppl;
  _calcAppl();
}

// ── Building Cost Calculator ───────────────────────────────────────
var BUILDING_QUALITY = [
  { id:'economy',  label:'Economy',   rate:8500,  note:'Basic finishes, brick & mortar, standard fixtures' },
  { id:'standard', label:'Standard',  rate:12000, note:'Mid-range finishes, tiled floors, decent kitchen' },
  { id:'prestige', label:'Prestige',  rate:16500, note:'High-end finishes, granite, aluminium windows' },
  { id:'luxury',   label:'Luxury',    rate:23000, note:'Top-spec, custom design, premium everything' }
];
var BUILDING_PROVINCES = [
  ['gauteng','Gauteng (baseline)',1.00],
  ['western-cape','Western Cape',1.08],
  ['kwazulu-natal','KwaZulu-Natal',0.96],
  ['eastern-cape','Eastern Cape',0.93],
  ['free-state','Free State',0.90],
  ['north-west','North West',0.90],
  ['mpumalanga','Mpumalanga',0.93],
  ['limpopo','Limpopo',0.89],
  ['northern-cape','Northern Cape',0.91]
];

function renderBuildingCost() {
  var _quality = 'standard';

  var qualityCards = BUILDING_QUALITY.map(function(q) {
    return '<button class="bc-q-card' + (q.id === _quality ? ' active' : '') + '" id="bcq_' + q.id + '" onclick="_selectBCQ(\'' + q.id + '\')" type="button">' +
      '<span class="bc-q-name">' + q.label + '</span>' +
      '<span class="bc-q-rate">R' + q.rate.toLocaleString() + '/m²</span>' +
      '<span class="bc-q-note">' + q.note + '</span>' +
    '</button>';
  }).join('');

  var provOpts = BUILDING_PROVINCES.map(function(p) { return [p[0], p[1]]; });

  document.getElementById('calc-form').innerHTML =
    '<div class="fsect">Build quality</div>' +
    '<div class="bc-quality-grid" id="bc_quality_grid">' + qualityCards + '</div>' +

    fsect('Project details') +
    field('bc_area', 'Floor area', plainInput('bc_area', '150', '150', 'm²'), 'total floor area incl. garage') +
    '<div class="frow">' +
      field('bc_storey', 'Storeys', selectInput('bc_storey', [['single','Single storey'],['double','Double storey (+15%)']])) +
      field('bc_province', 'Province', selectInput('bc_province', provOpts)) +
    '</div>' +

    fsect('Professional fees') +
    '<div class="frow">' +
      sliderField('bc_arch', 'Architect fee', 4, 12, 0.5, 8, '% of construction cost', '', '%',
        'SACAP minimum: 8% for full service. Some firms charge 6–10% depending on project size.') +
      sliderField('bc_eng', 'Structural engineer', 1, 5, 0.5, 2.5, '% of construction cost', '', '%',
        'Required for all new builds. Fees range from 2–3% of construction cost.') +
    '</div>' +

    fsect('Additional costs') +
    '<div class="frow">' +
      field('bc_plans', 'Building plans approval', moneyInput('bc_plans', '8000', '8000'), 'municipality charge') +
      field('bc_nhbrc', 'NHBRC enrolment fee', '<div class="iw"><input type="text" id="bc_nhbrc_disp" readonly style="cursor:default" tabindex="-1"></div>', 'auto-calculated') +
    '</div>';

  function _selectBCQ(id) {
    _quality = id;
    BUILDING_QUALITY.forEach(function(q) {
      var btn = document.getElementById('bcq_' + q.id);
      if (btn) btn.classList.toggle('active', q.id === id);
    });
    _calcBC();
  }
  window._selectBCQ = _selectBCQ;

  function _calcBC() {
    var qualObj = BUILDING_QUALITY.find(function(q) { return q.id === _quality; }) || BUILDING_QUALITY[1];
    var area = num('bc_area') || 150;
    var storeyEl = document.getElementById('bc_storey');
    var provEl   = document.getElementById('bc_province');
    var archPct  = (num('bc_arch') || 8) / 100;
    var engPct   = (num('bc_eng')  || 2.5) / 100;
    var plansAmt = num('bc_plans') || 8000;

    var storeyMult = (storeyEl && storeyEl.value === 'double') ? 1.15 : 1.0;
    var provPair = BUILDING_PROVINCES.find(function(p) { return p[0] === (provEl ? provEl.value : 'gauteng'); });
    var provMult = provPair ? provPair[2] : 1.0;

    var baseRate = qualObj.rate;
    var adjRate  = baseRate * storeyMult * provMult;
    var construction = adjRate * area;

    // NHBRC: R2,500 registration + 1.3% of insured value (capped at R1.5M home value)
    var nhbrcInsured = Math.min(construction, 1500000);
    var nhbrc = 2500 + nhbrcInsured * 0.013;
    var nhbrcDisp = document.getElementById('bc_nhbrc_disp');
    if (nhbrcDisp) nhbrcDisp.value = 'R ' + Math.round(nhbrc).toLocaleString();

    var archFee   = construction * archPct;
    var engFee    = construction * engPct;
    var profFees  = archFee + engFee;
    var totalProj = construction + profFees + nhbrc + plansAmt;
    var perSqm    = Math.round(totalProj / area);

    updateMobileBar('Project Total', R(Math.round(totalProj)));
    showResult(resultCard(
      'Total Project Cost', R(Math.round(totalProj)),
      qualObj.label + ' finish · ' + area + 'm² · R' + Math.round(perSqm).toLocaleString() + '/m² all-in',
      [
        ['Floor area', area + ' m²'],
        ['Build quality', qualObj.label],
        ['Adjusted rate (incl. storey & province)', R(Math.round(adjRate)) + '/m²'],
        ['Construction cost', R(Math.round(construction)), 'blue', true],
        null,
        ['Architect fee (' + pct(archPct*100, 1) + ')', R(Math.round(archFee))],
        ['Structural engineer (' + pct(engPct*100, 1) + ')', R(Math.round(engFee))],
        ['NHBRC enrolment fee', R(Math.round(nhbrc))],
        ['Building plan approval', R(Math.round(plansAmt))],
        ['Total professional & admin', R(Math.round(profFees + nhbrc + plansAmt)), 'red', true],
        null,
        ['Total project cost', R(Math.round(totalProj)), 'green', true],
        ['Cost per m² (all-in)', R(perSqm) + '/m²'],
      ],
      Math.min(100, (totalProj / 5000000) * 100),
      'bar-green'
    ));
  }

  window._calc = _calcBC;
  on(['bc_area','bc_storey','bc_province','bc_arch','bc_eng','bc_plans'], _calcBC);
  _calcBC();
}

// ── Disclaimer dismiss ─────────────────────────────────────────────
function dismissDisclaimer() {
  var el = document.getElementById('disc-banner');
  if (el) {
    el.classList.add('dismissed');
    try { localStorage.setItem('mzanzi_disc_dismissed', '1'); } catch(e) {}
  }
}
function _initDisclaimer() {
  try {
    if (localStorage.getItem('mzanzi_disc_dismissed') === '1') {
      var el = document.getElementById('disc-banner');
      if (el) el.style.display = 'none';
    }
  } catch(e) {}
}

// ── Init ───────────────────────────────────────────────────────────
function init() {
  _initDisclaimer();
  initScrollAnimations();
  renderRates();
  renderJourneys();
  renderQuickLaunch();
  initSearch();
  renderGrid();
  updateHeroBento();
  fetchLiveFuel();
  fetchLiveRates();
  var hash = window.location.hash.replace('#', '');
  if (hash && CALCS.find(function(c) { return c.id === hash; })) {
    showCalc(hash);
  }
}

document.addEventListener('DOMContentLoaded', init);

// ═══════════════════════════════════════════════════════════════════
//  ANIMATION SYSTEM — counters, stagger, ripple, spring interactions
// ═══════════════════════════════════════════════════════════════════

// ── 1. FAQ smooth accordion ───────────────────────────────────────
window._toggleFaq = function(btn) {
  var item   = btn.closest ? btn.closest('.faq-item') : btn.parentNode;
  var answer = item && item.querySelector('.faq-a');
  if (!item) return;

  var noMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!answer || noMotion) { item.classList.toggle('open'); return; }

  var isOpen = item.classList.contains('open');
  var sp     = 'cubic-bezier(.16,1,.3,1)';

  if (isOpen) {
    var h = answer.scrollHeight;
    answer.style.cssText = 'display:block;overflow:hidden;max-height:' + h + 'px;transition:max-height .3s ' + sp;
    requestAnimationFrame(function() { answer.style.maxHeight = '0'; });
    setTimeout(function() { item.classList.remove('open'); answer.style.cssText = ''; }, 320);
    btn.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('open');
    answer.style.cssText = 'display:block;overflow:hidden;max-height:0';
    var sh = answer.scrollHeight;
    requestAnimationFrame(function() {
      answer.style.transition = 'max-height .38s ' + sp;
      answer.style.maxHeight  = sh + 'px';
    });
    setTimeout(function() { if (item.classList.contains('open')) answer.style.cssText = ''; }, 420);
    btn.setAttribute('aria-expanded', 'true');
  }
};

// ── 2. Number counter on result cards ────────────────────────────
function _countUp(el) {
  if (!el || el._counting) return;
  var orig    = el.textContent.trim();
  var isRand  = orig.charAt(0) === 'R';
  var isPct   = orig.slice(-1) === '%';
  var cleaned = orig.replace(/[R,%\s ]/g, '').replace(/,/g, '');
  var target  = parseFloat(cleaned);
  if (!isFinite(target) || target < 100) return;

  el._counting = true;
  var dec  = cleaned.includes('.') ? (cleaned.split('.')[1] || '').length : 0;
  var dur  = Math.max(500, Math.min(950, 300 + target * 0.008));
  var st   = null;
  function eoc(t) { return 1 - Math.pow(1 - t, 3); }
  (function tick(ts) {
    if (!st) st = ts;
    var p = Math.min((ts - st) / dur, 1);
    var v = target * eoc(p);
    el.textContent = (isRand ? 'R' : '') +
      (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-ZA')) +
      (isPct ? '%' : '');
    if (p < 1) requestAnimationFrame(tick);
    else { el.textContent = orig; el._counting = false; }
  })(performance.now());
}

// ── 3. Breakdown row stagger ──────────────────────────────────────
function _staggerRows() {
  document.querySelectorAll('#result-area .br').forEach(function(row, i) {
    row.style.opacity    = '0';
    row.style.transform  = 'translateX(-7px)';
    row.style.transition = 'none';
    var d = 65 + i * 38;
    setTimeout(function() {
      row.style.transition = 'opacity .26s cubic-bezier(.16,1,.3,1),transform .26s cubic-bezier(.16,1,.3,1)';
      row.style.opacity    = '';
      row.style.transform  = '';
    }, d);
    setTimeout(function() { row.style.transition = ''; }, d + 340);
  });
}

// Patch showResult to trigger result animations
var _srOrig = showResult;
showResult = function(html) {
  _srOrig(html);
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  _staggerRows();
  setTimeout(function() {
    document.querySelectorAll('#result-area .rc-big, #result-area .tp-net-value').forEach(_countUp);
  }, 55);
};

// ── 4. Ripple on buttons / pills ──────────────────────────────────
document.addEventListener('click', function(e) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var t = e.target.closest('.cat-pill,.hero-chip,.btn,.calc-route-btn,.ja-back,.cta-offer-btn,.calc-card');
  if (!t) return;
  var rect = t.getBoundingClientRect();
  var rip  = document.createElement('span');
  rip.className = 'ripple-wave';
  rip.style.left = (e.clientX - rect.left - 25) + 'px';
  rip.style.top  = (e.clientY - rect.top  - 25) + 'px';
  if (!getComputedStyle(t).position || getComputedStyle(t).position === 'static') t.style.position = 'relative';
  t.style.overflow = 'hidden';
  t.appendChild(rip);
  setTimeout(function() { if (rip.parentNode) rip.parentNode.removeChild(rip); }, 650);
}, false);

// ── 5. Navbar scroll glass state + scroll-to-top button ──────────
(function() {
  var hdr = document.querySelector('.site-header');
  var stb = document.getElementById('scroll-top-btn');
  var lastHdr = false, lastStb = false;

  window.addEventListener('scroll', function() {
    var sy   = window.scrollY;
    var nowH = sy > 30;
    var nowS = sy > 320;
    if (hdr && nowH !== lastHdr) { hdr.classList.toggle('nav-scrolled', nowH); lastHdr = nowH; }
    if (stb && nowS !== lastStb) { stb.classList.toggle('visible', nowS); lastStb = nowS; }
  }, { passive: true });
})();

// ── 6. Keyboard shortcut: press / to focus search ────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    var homeView = document.getElementById('home-view');
    if (!homeView || homeView.style.display === 'none') return;
    var activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) return;
    e.preventDefault();
    var searchEl = document.getElementById('search');
    if (searchEl) {
      searchEl.focus();
      searchEl.select();
    }
  }
});

// ── 7. Mobile bar slide-up on first show ─────────────────────────
var _umbOrig = updateMobileBar;
updateMobileBar = function(label, value) {
  var bar     = document.getElementById('mobile-bar');
  var wasVis  = bar && bar.classList.contains('visible');
  _umbOrig(label, value);
  if (bar && !wasVis && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    bar.classList.remove('mrb-pop');
    void bar.offsetWidth;
    bar.classList.add('mrb-pop');
  }
};
