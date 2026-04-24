// src/data/gl-assistance-data.ts
//
// GL = Guarantee Letter assistance sources for Philippine government hospitals
// NCMH = National Center for Mental Health
// NKTI = National Kidney and Transplant Institute
// Amounts are in PHP and represent typical assistance given per application
// Fields marked // VERIFY should be double-checked before going live
//
// HOW TO USE THIS FILE:
// - Import glAssistanceSources into any page that shows who can help patients
// - Filter by hospital using the .hospitals field
// - Filter by category: 'Senator' | 'Partylist' | 'Government' | 'Office'
// - Show contact details (email, viber, facebook, address) to the user
// - amount field = how much they typically give in PHP
// - refCode field = example GL reference code format (do NOT show to users as reusable)
// - If contact fields are null, the office has no publicly known contact — show "Walk-in only" or "No contact available"

export type ContactDetails = {
  email?: string | null;
  viber?: string | null;
  facebook?: string | null;
  address?: string | null;
  website?: string | null;
  note?: string | null;
};

export type AssistanceSource = {
  id: string;
  name: string;
  category: 'Senator' | 'Partylist' | 'Government' | 'Office';
  amount?: number | null; // in PHP, undefined means unknown
  contact: ContactDetails;
  hospitals?: string[]; // which hospitals they have GL codes for
  refCode?: string | null; // example only, not reusable
};

export const glAssistanceSources: AssistanceSource[] = [

  // ════════════════════════════════
  // SENATORS
  // ════════════════════════════════

  {
    id: 'sen-alan-cayetano',
    name: 'Sen. Alan Peter S. Cayetano',
    category: 'Senator',
    amount: null,
    contact: {
      facebook: 'https://www.facebook.com/SenAlanPeterCayetanoTulongMedikal',
    },
  },
  {
    id: 'sen-bam-aquino',
    name: 'Sen. Bam Aquino',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-camille-villar',
    name: 'Sen. Camille A. Villar',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-bong-go',
    name: 'Sen. Christopher Lawrence T. Go',
    category: 'Senator',
    amount: 40000,
    contact: {
      address: '5th Floor, GSIS Financial Center, Diokno Blvd., Pasay City',
      note: 'Via BLC / DROPBOX — Constituency Services Unit',
    },
  },
  {
    id: 'sen-erwin-tulfo',
    name: 'Sen. Erwin T. Tulfo',
    category: 'Senator',
    amount: 10000,
    contact: {
      email: 'erwintulfo@senatorerwintulfo.com',
      address: '81 Mother Ignacia St., Quezon City',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260225-2826472HTN',
  },
  {
    id: 'sen-chiz-escudero',
    name: 'Sen. Francis G. Escudero',
    category: 'Senator',
    amount: 5000,
    contact: {
      email: 'sen.escudero@gmail.com',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260311-3325866IAS',
  },
  {
    id: 'sen-kiko-pangilinan',
    name: 'Sen. Francis Pangilinan',
    category: 'Senator',
    amount: 7000,
    contact: {
      // Primary: alex@kikopangilinan.com | Alt: assistance@kikopangilinan.com — VERIFY which is primary
      email: 'alex@kikopangilinan.com',
      note: 'Alt email: assistance@kikopangilinan.com — VERIFY which is primary',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-251203-162882OZUT',
  },
  {
    id: 'sen-imee-marcos',
    name: 'Sen. Imee R. Marcos',
    category: 'Senator',
    amount: null,
    contact: {
      email: 'medical.asimeemarcos@gmail.com',
    },
  },
  {
    id: 'sen-jinggoy-estrada',
    name: 'Sen. Jinggoy Ejercito Estrada',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-joel-villanueva',
    name: 'Sen. Joel Villanueva',
    category: 'Senator',
    amount: null,
    contact: {
      viber: '+639178747362',
      email: 'assistance.senjoelvillanueva@gmail.com',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260211-235448FDRT',
  },
  {
    id: 'sen-jvejercito',
    name: 'Sen. Joseph Victor G. Ejercito',
    category: 'Senator',
    amount: null,
    contact: {
      email: 'publicassistance2@jvejercito.com',
    },
  },
  {
    id: 'sen-zubiri',
    name: 'Sen. Juan Miguel F. Zubiri',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-loren-legarda',
    name: 'Sen. Loren Legarda',
    category: 'Senator',
    amount: 10000,
    contact: {
      note: 'Via Aji Viduya (FB Manager). Contact via FB Page or FB Messenger.',
      facebook: 'https://www.facebook.com/LegardaLoren', // VERIFY exact page
    },
    hospitals: ['NCMH', 'NKTI'],
    refCode: 'NCMH-260202-215581Z0CN',
  },
  {
    id: 'sen-manuel-lapid',
    name: 'Sen. Manuel Lapid',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-mark-villar',
    name: 'Sen. Mark A. Villar',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-lacson',
    name: 'Sen. Panfilo M. Lacson',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-pia-cayetano',
    name: 'Sen. Pia S. Cayetano',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-raffy-tulfo',
    name: 'Sen. Raffy T. Tulfo',
    category: 'Senator',
    amount: 10000,
    contact: {
      email: 'medical.assistance@teamtulfo.com',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260225-2826472HTN',
  },
  {
    id: 'sen-risa-hontiveros',
    name: 'Sen. Risa Hontiveros',
    category: 'Senator',
    amount: 5000,
    contact: {
      email: 'senhontiveros.conrel1@gmail.com',
    },
  },
  {
    id: 'sen-robin-padilla',
    name: 'Sen. Robinhood C. Padilla',
    category: 'Senator',
    amount: null,
    contact: {
      address: 'GSIS Bldg., Financial Center, Diokno Blvd., Pasay City',
      note: 'Walk-in senate office only',
    },
  },
  {
    id: 'sen-marcoleta',
    name: 'Sen. Rodante D. Marcoleta',
    category: 'Senator',
    amount: null,
    contact: {
      address: 'GSIS Bldg., Financial Center, Diokno Blvd., Pasay City',
      note: 'Walk-in senate office only',
    },
  },
  {
    id: 'sen-bato-dela-rosa',
    name: 'Sen. Ronaldo Dela Rosa',
    category: 'Senator',
    amount: 10000,
    contact: {
      email: 'medassistance.batodelarosa@gmail.com',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260205-221233BG91',
  },
  {
    id: 'sen-gatchalian',
    name: 'Sen. Sherwin Ting Gatchalian',
    category: 'Senator',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'sen-sotto',
    name: 'Sen. Vicente C. Sotto III',
    category: 'Senator',
    amount: 5000,
    contact: {
      email: 'spao.sottomaip@gmail.com',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260305-311442WELI',
  },

  // ════════════════════════════════
  // PARTY-LISTS
  // ════════════════════════════════

  {
    id: 'pl-4ps',
    name: 'PL - 4Ps',
    category: 'Partylist',
    amount: 1000,
    contact: {
      email: 'medicalassistance.4pspartylist@gmail.com',
      address: 'Unit 801, 8th Flr Bldg. MG Tower II, Shaw Blvd., cor L. Gonzales St., Brgy. Hagdan Bato Libis, Mandaluyong City',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260213-24079349CU',
  },
  {
    id: 'pl-lpgma',
    name: 'PL - LPGMA',
    category: 'Partylist',
    amount: 30000,
    contact: {
      viber: '+639176532022',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260128-208116G49Y',
  },
  {
    id: 'pl-ml',
    name: 'PL - ML',
    category: 'Partylist',
    amount: null,
    contact: {
      viber: '+639950541903',
      facebook: 'https://www.facebook.com/profile.php?id=61576013605045',
      note: 'Contact via FB Messenger or Viber',
    },
    hospitals: ['NKTI'],
    refCode: 'NKTI-260310-326135HBO2',
  },
  {
    id: 'pl-ml-pasay',
    name: 'ML PL Pasay',
    category: 'Partylist',
    amount: 10000,
    contact: {
      note: 'FB Messenger only',
      facebook: 'https://www.facebook.com/profile.php?id=61576013605045', // VERIFY
    },
  },
  {
    id: 'pl-sagip',
    name: 'PL - Sagip',
    category: 'Partylist',
    amount: 5000,
    contact: {
      viber: '+639603309340',
      email: 'sagippartylist@gmail.com',
    },
  },
  {
    id: 'pl-tingog',
    name: 'PL - Tingog',
    category: 'Partylist',
    amount: null,
    contact: {
      note: 'No contact details available — VERIFY',
    },
  },
  {
    id: 'pl-trabaho',
    name: 'PL - Trabaho',
    category: 'Partylist',
    amount: 5000,
    contact: {
      viber: '+639295174510',
    },
    hospitals: ['NKTI'],
    refCode: 'NKTI-260107-1865749DP4',
  },
  {
    id: 'pl-act-cis',
    name: 'ACT-CIS Partylist',
    category: 'Partylist',
    amount: 10000,
    contact: {
      note: 'No public email — VERIFY',
    },
    hospitals: ['NCMH'],
    refCode: 'NCMH-260120-1979471843',
  },

  // ════════════════════════════════
  // GOVERNMENT OFFICES
  // ════════════════════════════════

  {
    id: 'office-of-the-president',
    name: 'Office of the President (OP)',
    category: 'Government',
    amount: 50000,
    contact: {
      note: 'Via eGov PH app appointment or via LBC',
    },
  },
  {
    id: 'doh',
    name: 'Department of Health (DOH)',
    category: 'Government',
    amount: 20000,
    contact: {
      note: 'Via eGov PH app appointment',
    },
  },
  {
    id: 'dswd',
    name: 'DSWD',
    category: 'Government',
    amount: null,
    contact: {
      note: 'Walk-in or referral basis',
    },
  },
  {
    id: 'senate-assist-spao',
    name: 'Senate ASSIST / SPAO',
    category: 'Government',
    amount: 10000,
    contact: {
      website: 'https://assist.senate.gov.ph/',
      email: 'medicalassistance224@gmail.com',
      note: 'Apply online at assist.senate.gov.ph, follow up via email',
    },
  },

  // ════════════════════════════════
  // OTHER OFFICES
  // ════════════════════════════════

  {
    id: 'house-speaker-dy',
    name: 'House Speaker Bodjie Dy',
    category: 'Office',
    amount: 25000,
    contact: {
      email: 'speaker.bojiedy@house.gov.ph',
    },
  },
  {
    id: 'congressman',
    name: 'Congressman (Local District)',
    category: 'Office',
    amount: null,
    contact: {
      note: 'Contact your local district congressman directly — varies per district',
    },
  },
];
